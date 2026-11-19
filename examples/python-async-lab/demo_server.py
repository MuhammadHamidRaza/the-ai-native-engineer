"""Deterministic paginated JSON API for local practice (stdlib only).

Run:  python demo_server.py
Then: python -c "import asyncio; from asyncolabs import fetch_all; print(asyncio.run(fetch_all('http://127.0.0.1:8799/items')))"
"""

import json
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
from urllib.parse import urlparse, parse_qs

ITEMS = [{"id": f"item-{i:04d}", "name": f"Product {i}"} for i in range(1, 26)]
PAGE_SIZE = 10

class Handler(BaseHTTPRequestHandler):
    def do_GET(self):
        parsed = urlparse(self.path)
        if parsed.path != "/items":
            self.send_response(404); self.end_headers(); return
        qs = parse_qs(parsed.query)
        cursor = qs.get("cursor", [None])[0]
        start = int(cursor) if cursor else 0
        chunk = ITEMS[start:start + PAGE_SIZE]
        next_cursor = str(start + PAGE_SIZE) if start + PAGE_SIZE < len(ITEMS) else None
        body = json.dumps({"items": chunk, "next_cursor": next_cursor}).encode()
        self.send_response(200)
        self.send_header("Content-Type", "application/json")
        self.send_header("Content-Length", str(len(body)))
        self.end_headers()
        self.wfile.write(body)

    def log_message(self, fmt, *args):  # keep test output readable
        pass

if __name__ == "__main__":
    server = ThreadingHTTPServer(("127.0.0.1", 8799), Handler)
    print("Demo API on http://127.0.0.1:8799/items (Ctrl+C to stop)")
    server.serve_forever()
