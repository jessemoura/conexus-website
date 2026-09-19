import os
import shutil
import zipfile
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent.parent
DIST_DIR = BASE_DIR / "dist"
HOSTINGER_DIR = BASE_DIR / "HOSTINGER-FINAL"
ZIP_PATH = BASE_DIR / "CONEXUS-HOSTINGER-FINAL.zip"

print(f"Base dir: {BASE_DIR}")
print(f"Dist dir: {DIST_DIR}")

# 1. Create/Update HOSTINGER-FINAL folder
HOSTINGER_DIR.mkdir(parents=True, exist_ok=True)
shutil.copytree(DIST_DIR, HOSTINGER_DIR, dirs_exist_ok=True)
print(f"Copied dist to: {HOSTINGER_DIR}")

# 2. Create ZIP with POSIX '/' forward slashes
if ZIP_PATH.exists():
    ZIP_PATH.unlink()

with zipfile.ZipFile(ZIP_PATH, 'w', zipfile.ZIP_DEFLATED) as zf:
    for root, dirs, files in os.walk(DIST_DIR):
        for file in files:
            full_path = Path(root) / file
            # Relative path from dist
            rel_path = full_path.relative_to(DIST_DIR)
            # Ensure POSIX '/' separators
            posix_path = rel_path.as_posix()
            zf.write(full_path, arcname=posix_path)

print(f"Created ZIP: {ZIP_PATH}")

# 3. Validate ZIP Entries
print("\n--- Validating ZIP Entries ---")
backslash_count = 0
entries = []
with zipfile.ZipFile(ZIP_PATH, 'r') as zf:
    for info in zf.infolist():
        entries.append(info.filename)
        if "\\" in info.filename:
            backslash_count += 1
            print(f"ERROR: Entry contains backslash: {info.filename}")

print(f"Total entries in ZIP: {len(entries)}")
print(f"Entries with backslash '\\': {backslash_count}")

required_samples = [
    "index.html",
    "blog/index.html",
    "blog/quanto-custa-site-profissional-2026/index.html",
    "diagnostico-gratuito/index.html",
    "portfolio/index.html",
    "portfolio/di-piallato/index.html",
    "grana/politica-de-privacidade/index.html",
    "servicos/index.html",
    "sitemap.xml",
    "robots.txt"
]

all_found = True
for sample in required_samples:
    found = sample in entries
    status = "OK" if found else "MISSING"
    if not found:
        all_found = False
    print(f"[{status}] {sample}")

assert backslash_count == 0, "ZIP contains backslashes!"
assert all_found, "Some required files are missing in ZIP!"
assert (HOSTINGER_DIR / "index.html").exists(), "index.html missing in HOSTINGER-FINAL"
assert (HOSTINGER_DIR / "assets").is_dir(), "assets folder missing in HOSTINGER-FINAL"
assert (HOSTINGER_DIR / "blog").is_dir(), "blog folder missing in HOSTINGER-FINAL"
assert (HOSTINGER_DIR / "portfolio").is_dir(), "portfolio folder missing in HOSTINGER-FINAL"
assert (HOSTINGER_DIR / "diagnostico-gratuito").is_dir(), "diagnostico-gratuito folder missing in HOSTINGER-FINAL"
assert (HOSTINGER_DIR / "grana").is_dir(), "grana folder missing in HOSTINGER-FINAL"

print("\n--- ALL VALIDATIONS PASSED SUCCESSFULLY ---")
