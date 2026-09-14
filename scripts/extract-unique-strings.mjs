import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..');

import { pt } from '../src/i18n/pt.js';

// Extract all unique strings from pt.autoContent
const allUniquePt = {};

for (const g in pt.autoContent || {}) {
  for (const k in pt.autoContent[g]) {
    const val = String(pt.autoContent[g][k] || '').trim();
    if (!allUniquePt[val]) {
      allUniquePt[val] = [];
    }
    allUniquePt[val].push({ group: g, key: k });
  }
}

console.log('Total unique Portuguese strings across all 30 subpages:', Object.keys(allUniquePt).length);
fs.writeFileSync(path.join(rootDir, 'scripts', 'unique-strings.json'), JSON.stringify(allUniquePt, null, 2), 'utf8');
