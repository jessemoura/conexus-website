import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..');

import { ptDict } from './dictionaries/pt.mjs';
import { enDict } from './dictionaries/en.mjs';
import { esDict } from './dictionaries/es.mjs';

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

const flatPt = flatten(ptDict);
const flatEn = flatten(enDict);
const flatEs = flatten(esDict);

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
  
  // data-i18n
  const i18nMatches = html.matchAll(/data-i18n=["']([^"']+)["']/g);
  for (const m of i18nMatches) usedKeys.add(m[1]);

  // data-i18n-html
  const htmlMatches = html.matchAll(/data-i18n-html=["']([^"']+)["']/g);
  for (const m of htmlMatches) usedKeys.add(m[1]);

  // data-i18n-attr
  const attrMatches = html.matchAll(/data-i18n-attr=["']([^"']+)["']/g);
  for (const m of attrMatches) {
    const pairs = m[1].split(',');
    for (const p of pairs) {
      const parts = p.split(':');
      if (parts[1]) usedKeys.add(parts[1].trim());
    }
  }
}

console.log(`Total unique i18n keys used across all 30 HTML pages: ${usedKeys.size}`);

const missingPt = [];
const missingEn = [];
const missingEs = [];

for (const key of usedKeys) {
  if (flatPt[key] === undefined) missingPt.push(key);
  if (flatEn[key] === undefined) missingEn.push(key);
  if (flatEs[key] === undefined) missingEs.push(key);
}

console.log(`Keys missing in PT dictionary: ${missingPt.length}`);
if (missingPt.length > 0) console.log('Sample missing in PT:', missingPt);

console.log(`Keys missing in EN dictionary: ${missingEn.length}`);
if (missingEn.length > 0) console.log('Sample missing in EN:', missingEn);

console.log(`Keys missing in ES dictionary: ${missingEs.length}`);
if (missingEs.length > 0) console.log('Sample missing in ES:', missingEs);
