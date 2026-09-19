import urllib.request
import ssl
import hashlib
import json

ctx = ssl.create_default_context()
ctx.check_hostname = False
ctx.verify_mode = ssl.CERT_NONE

urls = [
    'https://www.conexus.press/',
    'https://conexus.press/',
    'https://www.conexus.press/src/styles/components.css',
    'https://www.conexus.press/src/js/main.js',
    'https://www.conexus.press/src/styles/base.css',
    'https://www.conexus.press/diagnostico-gratuito/',
]

print("=== CHECKING PRODUCTION URLS ===")
for url in urls:
    try:
        req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0', 'Cache-Control': 'no-cache', 'Pragma': 'no-cache'})
        with urllib.request.urlopen(req, context=ctx) as resp:
            content = resp.read()
            md5 = hashlib.md5(content).hexdigest()
            print(f"\nURL: {url}")
            print(f"Status: {resp.status}, Length: {len(content)} bytes, MD5: {md5}")
            print("Headers:")
            for k, v in resp.info().items():
                if k.lower() in ['cache-control', 'etag', 'last-modified', 'cf-cache-status', 'server', 'age', 'x-cache', 'content-type']:
                    print(f"  {k}: {v}")
            if url.endswith('.css'):
                text = content.decode('utf-8', errors='ignore')
                has_dropdown_fix = '100003' in text or 'lang-menu' in text
                print(f"  Contains 100003: {'100003' in text}")
                print(f"  Contains .lang-menu: {'.lang-menu' in text}")
                # check z-index in .lang-menu
                if '.lang-menu' in text:
                    idx = text.find('.lang-menu')
                    print(f"  Snippet around .lang-menu: {repr(text[idx:idx+300])}")
            elif url.endswith('.js'):
                text = content.decode('utf-8', errors='ignore')
                print(f"  JS first 100 chars: {repr(text[:100])}")
    except Exception as e:
        print(f"URL: {url} ERROR: {e}")
