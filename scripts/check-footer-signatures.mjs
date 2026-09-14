import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..');

function getAllHtml(dir, list = []) {
  const files = fs.readdirSync(dir);
  for (const f of files) {
    const p = path.join(dir, f);
    if (fs.statSync(p).isDirectory()) {
      if (f !== 'node_modules' && f !== '.git' && f !== 'dist') getAllHtml(p, list);
    } else if (f.endsWith('.html')) {
      list.push(p);
    }
  }
  return list;
}

const allFiles = getAllHtml(rootDir);
for (const file of allFiles) {
  const html = fs.readFileSync(file, 'utf8');
  const signatureMatch = html.match(/<div class="footer-signature"[^>]*>([\s\S]*?)<\/div>/i);
  if (signatureMatch) {
    console.log(path.relative(rootDir, file) + ' -> ' + signatureMatch[0].replace(/\s+/g, ' '));
  }
}
