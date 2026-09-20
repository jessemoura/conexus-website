import re

with open('diagnostico-gratuito/index.html', 'r', encoding='utf-8') as f:
    html = f.read()

# Extract all classes
class_matches = re.findall(r'class=["\']([^"\']+)["\']', html)
all_cls = set()
for cm in class_matches:
    for c in cm.split():
        all_cls.add(c)

print('=== ALL CLASSES IN DIAGNOSTICO-GRATUITO/INDEX.HTML ===')
print(sorted(list(all_cls)))

# Extract all inline styles
style_matches = re.findall(r'style=["\']([^"\']+)["\']', html)
print('\n=== ALL INLINE STYLES IN DIAGNOSTICO-GRATUITO/INDEX.HTML ===')
for s in style_matches:
    print('  -', s)
