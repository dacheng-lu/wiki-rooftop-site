#!/usr/bin/env python3
"""Validate the voice manifest, or sign its pending entries before publication."""

import argparse
import hashlib
import hmac
import json
import os
import re
from pathlib import Path
from tempfile import NamedTemporaryFile

ID = re.compile(r"[a-z0-9-]{1,120}")
NONCE = re.compile(r"[0-9a-f]{16}")
REF_V2_ENGLISH = re.compile(r"audio/gsv-v5turbo_(en[12])_v2\.mp3")


def validate(manifest):
    entries = manifest["entries"]
    if manifest["count"] != len(entries):
        raise ValueError("count differs from the number of voice entries")

    ids = set()
    audio_paths = set()
    aliases = set()
    for entry in entries:
        item = entry["id"]
        audio = entry["audio"]
        nonce = entry["nonce"]
        if not ID.fullmatch(item) or item in ids:
            raise ValueError(f"invalid or duplicate item ID: {item}")
        if not audio or audio in audio_paths:
            raise ValueError(f"missing or duplicate audio path: {audio}")

        ref = REF_V2_ENGLISH.fullmatch(audio)
        if ref and (item != f"voice-gsv-v5turbo-{ref.group(1)}-refv2"
                    or entry.get("method") != "refv2" or entry.get("legacy")):
            raise ValueError(f"reference-v2 sample must use its own ID and score history: {audio}")
        if nonce is not None and not NONCE.fullmatch(nonce):
            raise ValueError(f"invalid nonce for {item}")

        alias = entry.get("legacy")
        if alias:
            if not ID.fullmatch(alias) or alias in aliases:
                raise ValueError(f"invalid or duplicate legacy ID: {alias}")
            aliases.add(alias)
        ids.add(item)
        audio_paths.add(audio)

    conflicts = ids & aliases
    if conflicts:
        raise ValueError(f"legacy IDs overlap current IDs: {', '.join(sorted(conflicts))}")


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("manifest", type=Path, nargs="?", default=Path("gallery/voice/entries.json"))
    parser.add_argument("--sign-pending", action="store_true",
                        help="sign null nonces with SCORE_SECRET from the local environment")
    args = parser.parse_args()

    try:
        manifest = json.loads(args.manifest.read_text(encoding="utf-8"))
        validate(manifest)
        pending = [entry for entry in manifest["entries"] if entry["nonce"] is None]
        if args.sign_pending and pending:
            secret = os.environ.get("SCORE_SECRET")
            if not secret:
                parser.error("SCORE_SECRET must be set in the local environment to sign pending entries")
            for entry in pending:
                entry["nonce"] = hmac.new(
                    secret.encode(), entry["id"].encode(), hashlib.sha256
                ).hexdigest()[:16]
            # Publish the complete manifest atomically for readers of a local preview.
            with NamedTemporaryFile(mode="w", encoding="utf-8", dir=args.manifest.parent, delete=False) as tmp:
                temporary_path = Path(tmp.name)
                try:
                    json.dump(manifest, tmp, ensure_ascii=False, indent=1)
                    tmp.write("\n")
                    tmp.close()
                    temporary_path.chmod(args.manifest.stat().st_mode & 0o777)
                    temporary_path.replace(args.manifest)
                finally:
                    temporary_path.unlink(missing_ok=True)
            print(f"Signed {len(pending)} pending voice entries")
        else:
            print(f"Validated {manifest['count']} voice entries ({len(pending)} unsigned)")
    except (OSError, ValueError, KeyError, TypeError) as exc:
        parser.error(str(exc))


if __name__ == "__main__":
    main()
