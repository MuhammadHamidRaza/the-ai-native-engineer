# 09.3.3 Async HTTP & Pagination Lab

The runnable reference for the `09.3.3 asyncio and Concurrent I/O` lesson in Part 03.
Everything here runs **offline** — the test suite mocks the network with `httpx.MockTransport`.

## Layout

```text
examples/python-async-lab/
├── pyproject.toml              # uv/pip metadata, pytest config
├── demo_server.py              # stdlib paginated JSON API on :8799 (optional manual demo)
├── src/asyncolabs/
│   ├── __init__.py             # public API: fetch_all
│   └── pagination.py           # the client you study and extend
└── tests/
    └── test_pagination.py      # offline pytest suite (no network)
```

## Setup & run

```bash
cd examples/python-async-lab
python -m venv .venv
. .venv/Scripts/activate        # Windows PowerShell: .venv\Scripts\Activate.ps1
pip install -e ".[dev]"
pytest
```

Expected (indicative): `7 passed`.

## What the tests prove

- Pages are followed in order until `next_cursor` is null.
- `429` (and 5xx) retry with bounded backoff; persistent 500 gives up after `max_retries`.
- Non-429 4xx errors are **not** retried.
- Malformed items / envelopes raise `ValueError` instead of silently passing.

## Honest limitations

- `demo_server.py` exists for manual exploration only; the automated suite never touches the network.
- The `Retry-After` cap is 10s; real deployments may want to honor larger windows or a dead-letter path.
