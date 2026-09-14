import fs from 'fs';
import path from 'path';

function getHtmlFiles(dir) {
  let files = [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    if (entry.name === 'node_modules' || entry.name === 'dist' || entry.name === '.git') continue;
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files = files.concat(getHtmlFiles(fullPath));
    } else if (entry.name.endsWith('.html')) {
      files.push(fullPath);
    }
  }
  return files;
}

for (const f of getHtmlFiles('.')) {
  const content = fs.readFileSync(f, 'utf-8');
  const matches = [...content.matchAll(/data-i18n-html=["']([^"']+)["']/g)].map(m => m[1]);
  if (matches.length > 0) {
    console.log(`${f} has data-i18n-html: ${matches.join(', ')}`);
  }
}
