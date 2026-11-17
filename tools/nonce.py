#!/usr/bin/env python3
"""Print the publish nonce for an item id: HMAC-SHA256(SCORE_SECRET, item)[:16].

The same value is computed inside the Worker, so only items published with this
nonce can receive a score.
"""
import hashlib
import hmac
import os
import sys
from pathlib import Path


def secret() -> str:
    if os.environ.get("SCORE_SECRET"):
        return os.environ["SCORE_SECRET"]
    env = Path.home() / ".hermes/.env"
    for line in env.read_text().splitlines():
        if line.startswith("SCORE_SECRET="):
            return line.split("=", 1)[1].strip()
    raise SystemExit("SCORE_SECRET not found in environment or ~/.hermes/.env")


if __name__ == "__main__":
    if len(sys.argv) < 2:
        raise SystemExit("usage: nonce.py <item-id>")
    print(hmac.new(secret().encode(), sys.argv[1].encode(), hashlib.sha256).hexdigest()[:16])
