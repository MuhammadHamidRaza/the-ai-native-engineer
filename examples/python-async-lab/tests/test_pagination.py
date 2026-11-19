"""Offline tests — no network. httpx.MockTransport fakes every response."""

import asyncio
import json

import httpx
import pytest

from asyncolabs import fetch_all
from asyncolabs.pagination import parse_page, validate_item


def make_client(handler):
    transport = httpx.MockTransport(handler)
    return httpx.AsyncClient(transport=transport, timeout=2.0)


def page_body(items, next_cursor):
    return json.dumps({"items": items, "next_cursor": next_cursor}).encode()


def run(coro):
    return asyncio.run(coro)


def test_following_all_pages():
    calls = []

    def handler(request: httpx.Request) -> httpx.Response:
        calls.append(str(request.url))
        cursor = request.url.params.get("cursor")
        if cursor is None:
            return httpx.Response(200, content=page_body([{"id": "a"}, {"id": "b"}], "2"))
        if cursor == "2":
            return httpx.Response(200, content=page_body([{"id": "c"}], None))
        return httpx.Response(400, content=b'{"error":"bad cursor"}')

    async def scenario():
        async with make_client(handler) as client:
            return await fetch_all("http://testserver/items", client=client)

    result = run(scenario())
    assert [i["id"] for i in result] == ["a", "b", "c"]
    assert len(calls) == 2


def test_retries_on_429_then_succeeds(monkeypatch):
    attempts = []

    async def fake_sleep(_seconds):
        return None  # never actually wait in tests

    monkeypatch.setattr(asyncio, "sleep", fake_sleep)

    def handler(request: httpx.Request) -> httpx.Response:
        attempts.append(request.url)
        if len(attempts) <= 2:
            return httpx.Response(429, headers={"Retry-After": "1"},
                                  content=b'{"error":"slow down"}')
        return httpx.Response(200, content=page_body([{"id": "x"}], None))

    async def scenario():
        async with make_client(handler) as client:
            return await fetch_all("http://testserver/items", client=client,
                                   max_retries=3)

    result = run(scenario())
    assert [i["id"] for i in result] == ["x"]
    assert len(attempts) == 3


def test_persistent_500_gives_up_after_retries(monkeypatch):
    async def fake_sleep(_seconds):
        return None

    monkeypatch.setattr(asyncio, "sleep", fake_sleep)

    def handler(request: httpx.Request) -> httpx.Response:
        return httpx.Response(500, content=b'{"error":"boom"}')

    async def scenario():
        async with make_client(handler) as client:
            return await fetch_all("http://testserver/items", client=client,
                                   max_retries=2)

    with pytest.raises(httpx.HTTPStatusError):
        run(scenario())


def test_4xx_other_than_429_is_not_retried():
    calls = []

    def handler(request: httpx.Request) -> httpx.Response:
        calls.append(request.url)
        return httpx.Response(403, content=b'{"error":"forbidden"}')

    async def scenario():
        async with make_client(handler) as client:
            return await fetch_all("http://testserver/items", client=client)

    with pytest.raises(httpx.HTTPStatusError):
        run(scenario())
    assert len(calls) == 1  # no wasteful retrying of a permissions problem


def test_malformed_item_raises():
    with pytest.raises(ValueError, match="missing a non-empty string 'id'"):
        validate_item({"name": "no id here"})


def test_malformed_envelope_raises():
    with pytest.raises(ValueError):
        parse_page(["not", "an", "object"])


def test_missing_items_list_raises():
    with pytest.raises(ValueError, match="'items'"):
        parse_page({"next_cursor": None})
