#!/usr/bin/env python3
"""Local dev server that disables caching so every refresh shows the latest
changes (CSS/JS/HTML are never served from the browser cache).

Usage:
    python serve.py            # serves on http://localhost:8000
    python serve.py 8080       # custom port

This is for local development only. Do not use it for deployment.
"""
import sys
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer


class NoCacheHandler(SimpleHTTPRequestHandler):
    def end_headers(self):
        # Tell the browser to never cache these responses.
        self.send_header("Cache-Control", "no-store, no-cache, must-revalidate, max-age=0")
        self.send_header("Pragma", "no-cache")
        self.send_header("Expires", "0")
        super().end_headers()


if __name__ == "__main__":
    port = int(sys.argv[1]) if len(sys.argv) > 1 else 8000
    print(f"Serving with no-cache on http://localhost:{port}  (Ctrl+C to stop)")
    ThreadingHTTPServer(("", port), NoCacheHandler).serve_forever()
