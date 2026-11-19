"""Cursor-paginated async HTTP fetching with bounded retries.

Design rules (why the code looks like this):

- One client, lifetime managed by a context manager — not a new client per page.
- Retries only for transient conditions: HTTP 429 and 5xx, and transport errors.
  4xx errors (other than 429) are almost always bugs in the request — retrying
  them just burns quota and hides the real failure.
- Backoff is bounded: at most `max_retries` extra attempts with growing waits,
  capped at 10 seconds. An unbounded retry loop turns a downstream outage
  into a self-inflicted denial of service.
- Every exception path raises or returns honestly — no silent truncation.
"""

from __future__ import annotations

import asyncio
from dataclasses import dataclass
from typing import Any

import httpx

BACKOFF_S = (0.5, 1.0, 2.0)  # wait before attempt 1, 2, 3; then give up
RETRYABLE_STATUS = {429, 500, 502, 503, 504}


def validate_item(raw: Any) -> dict:
    """Validate one item from the API envelope. Raises ValueError on bad data."""
    if not isinstance(raw, dict):
        raise ValueError(f"item must be a JSON object, got {type(raw).__name__}")
    item_id = raw.get("id")
    if not isinstance(item_id, str) or not item_id.strip():
        raise ValueError("item is missing a non-empty string 'id'")
    return raw


@dataclass
class Page:
    items: list[dict]
    next_cursor: str | None


def parse_page(data: Any) -> Page:
    if not isinstance(data, dict):
        raise ValueError("expected a JSON object envelope, got "
                         f"{type(data).__name__}")
    items = data.get("items")
    if not isinstance(items, list):
        raise ValueError("envelope is missing the 'items' list")
    cursor = data.get("next_cursor")
    if cursor is not None and not isinstance(cursor, str):
        raise ValueError("'next_cursor' must be a string or null")
    return Page(items=[validate_item(i) for i in items], next_cursor=cursor)


async def fetch_all(
    url: str,
    *,
    headers: dict[str, str] | None = None,
    max_pages: int = 50,
    timeout_s: float = 10.0,
    max_retries: int = 3,
    client: httpx.AsyncClient | None = None,
) -> list[dict]:
    """Fetch every page of a cursor-paginated JSON API.

    The API envelope is `{"items": [...], "next_cursor": "..." | null}`.
    Raises httpx.HTTPStatusError for non-retryable failures and ValueError
    for malformed payloads. `client` may be injected (used by the tests with
    httpx.MockTransport) — the caller then owns its lifetime.
    """
    owns_client = client is None
    client = client or httpx.AsyncClient(timeout=timeout_s, headers=headers)
    results: list[dict] = []
    try:
        cursor: str | None = None
        for _ in range(max_pages):
            params = {"cursor": cursor} if cursor else None
            attempt = 0
            while True:
                try:
                    resp = await client.get(url, params=params)
                    resp.raise_for_status()
                    break
                except httpx.HTTPStatusError as exc:
                    status = exc.response.status_code
                    if status in RETRYABLE_STATUS and attempt < max_retries:
                        wait = BACKOFF_S[min(attempt, len(BACKOFF_S) - 1)]
                        if status == 429:
                            retry_after = exc.response.headers.get("Retry-After")
                            if retry_after and retry_after.isdigit():
                                wait = min(float(retry_after), 10.0)
                        await asyncio.sleep(wait)
                        attempt += 1
                        continue
                    raise
                except httpx.TransportError:
                    if attempt < max_retries:
                        await asyncio.sleep(BACKOFF_S[min(attempt, len(BACKOFF_S) - 1)])
                        attempt += 1
                        continue
                    raise
            page = parse_page(resp.json())
            results.extend(page.items)
            if not page.next_cursor:
                return results
            cursor = page.next_cursor
        raise RuntimeError(f"pagination exceeded max_pages={max_pages} — refusing to loop forever")
    finally:
        if owns_client:
            await client.aclose()
