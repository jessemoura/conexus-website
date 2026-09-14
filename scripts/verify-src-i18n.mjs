import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..');

import { pt } from '../src/i18n/pt.js';
import { en } from '../src/i18n/en.js';
import { es } from '../src/i18n/es.js';

function flatten(obj, prefix = '') {
  let res = {};
  for (let k in obj) {
    const full = prefix ? prefix + '.' + k : k;
    if (typeof obj[k] === 'object' && obj[k] !== null && !Array.isArray(obj[k])) {
      Object.assign(res, flatten(obj[k], full));
    } else {
      res[full] = obj[k];
    }
  }
  return res;
}

const flatPt = flatten(pt);
const flatEn = flatten(en);
const flatEs = flatten(es);

console.log('Flat PT total keys in src/i18n/pt.js:', Object.keys(flatPt).length);
console.log('Flat EN total keys in src/i18n/en.js:', Object.keys(flatEn).length);
console.log('Flat ES total keys in src/i18n/es.js:', Object.keys(flatEs).length);

function getAllHtmlFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat.isDirectory()) {
      if (file !== 'node_modules' && file !== '.git' && file !== 'dist') {
        getAllHtmlFiles(filePath, fileList);
      }
    } else if (file.endsWith('.html')) {
      fileList.push(filePath);
    }
  }
  return fileList;
}

const htmlFiles = getAllHtmlFiles(rootDir);
const usedKeys = new Set();

for (const file of htmlFiles) {
  const html = fs.readFileSync(file, 'utf8');
  const i18nMatches = html.matchAll(/data-i18n=["']([^"']+)["']/g);
  for (const m of i18nMatches) usedKeys.add(m[1]);
  const htmlMatches = html.matchAll(/data-i18n-html=["']([^"']+)["']/g);
  for (const m of htmlMatches) usedKeys.add(m[1]);
}

console.log('Used keys count in HTML:', usedKeys.size);
let missingPt = 0, missingEn = 0, missingEs = 0;
const missingList = [];
for (const k of usedKeys) {
  if (flatPt[k] === undefined) { missingPt++; missingList.push(k); }
  if (flatEn[k] === undefined) missingEn++;
  if (flatEs[k] === undefined) missingEs++;
}

console.log('Missing in src/i18n/pt.js:', missingPt);
console.log('Missing in src/i18n/en.js:', missingEn);
console.log('Missing in src/i18n/es.js:', missingEs);

console.log('\n--- ALL MISSING KEYS (' + missingList.length + ') ---');
missingList.forEach(k => console.log('  ' + k));

