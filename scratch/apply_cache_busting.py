import os
import re

VERSION = "20260919.02"

all_html = []
for root, dirs, files in os.walk("."):
    dirs[:] = [d for d in dirs if d not in ["node_modules", "dist", "HOSTINGER-FINAL", ".git", ".gemini", "scratch"]]
    for file in files:
        if file.endswith(".html"):
            all_html.append(os.path.join(root, file))

print(f"Total HTML files found: {len(all_html)}")

modified_count = 0
for filepath in all_html:
    with open(filepath, "r", encoding="utf-8") as f:
        content = f.read()

    new_content = content
    # Replace /src/styles/components.css with /src/styles/components.css?v=20260919.02
    new_content = re.sub(r'(/src/styles/components\.css)(\?v=[^"\'\s>]+)?', rf'\1?v={VERSION}', new_content)
    # Replace /src/styles/base.css with /src/styles/base.css?v=20260919.02
    new_content = re.sub(r'(/src/styles/base\.css)(\?v=[^"\'\s>]+)?', rf'\1?v={VERSION}', new_content)
    # Replace /src/js/main.js with /src/js/main.js?v=20260919.02
    new_content = re.sub(r'(/src/js/main\.js)(\?v=[^"\'\s>]+)?', rf'\1?v={VERSION}', new_content)
    # Replace /src/js/i18n.js with /src/js/i18n.js?v=20260919.02
    new_content = re.sub(r'(/src/js/i18n\.js)(\?v=[^"\'\s>]+)?', rf'\1?v={VERSION}', new_content)

    if new_content != content:
        with open(filepath, "w", encoding="utf-8") as f:
            f.write(new_content)
        modified_count += 1
        print(f"Updated: {filepath}")

print(f"\nDone! Modified {modified_count} HTML files with version {VERSION}.")
