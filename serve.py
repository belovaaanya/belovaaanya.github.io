#!/usr/bin/env python3
"""Static dev server that disables caching (so edits show up on reload)."""
import os
import sys
from http.server import HTTPServer, SimpleHTTPRequestHandler


class NoCacheHandler(SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header("Cache-Control", "no-store, must-revalidate")
        self.send_header("Pragma", "no-cache")
        self.send_header("Expires", "0")
        super().end_headers()


if __name__ == "__main__":
    # Explicit CLI arg wins; else honor $PORT (e.g. Claude Code preview); else default.
    port = int(sys.argv[1]) if len(sys.argv) > 1 else int(os.environ.get("PORT", 5555))
    # Bind to all interfaces so other devices on the same LAN/Wi-Fi can reach it.
    host = sys.argv[2] if len(sys.argv) > 2 else "0.0.0.0"
    print(f"Serving on http://{host}:{port}  (Ctrl+C to stop)")
    HTTPServer((host, port), NoCacheHandler).serve_forever()
