import fs from 'fs';
import path from 'path';
import { pt } from '../src/i18n/pt.js';
import { en } from '../src/i18n/en.js';
import { es } from '../src/i18n/es.js';

const files = [];
function scan(dir) {
  for (const f of fs.readdirSync(dir)) {
    const full = path.join(dir, f);
    if (fs.statSync(full).isDirectory()) {
      if (f !== 'node_modules' && f !== '.git' && f !== 'dist') scan(full);
    } else if (f.endsWith('.html')) {
      files.push(full);
    }
  }
}
scan('.');

console.log('Total HTML files found:', files.length);

const pageKeyMap = {};

for (const file of files) {
  const content = fs.readFileSync(file, 'utf8');
  const regex = /data-i18n="autoContent\.([a-zA-Z0-9_-]+)\.([a-zA-Z0-9_-]+)"/g;
  let match;
  while ((match = regex.exec(content)) !== null) {
    const group = match[1];
    const key = match[2];
    if (!pageKeyMap[group]) {
      pageKeyMap[group] = { file: path.relative('.', file), keys: [] };
    }
    pageKeyMap[group].keys.push(key);
  }
}

console.log('\n--- Group Summary ---');
for (const group in pageKeyMap) {
  const info = pageKeyMap[group];
  const ptCount = pt.autoContent && pt.autoContent[group] ? Object.keys(pt.autoContent[group]).length : 0;
  const enCount = en.autoContent && en.autoContent[group] ? Object.keys(en.autoContent[group]).length : 0;
  const esCount = es.autoContent && es.autoContent[group] ? Object.keys(es.autoContent[group]).length : 0;
  console.log(`${group} (${info.file}): HTML keys=${info.keys.length}, PT=${ptCount}, EN=${enCount}, ES=${esCount}`);
}
