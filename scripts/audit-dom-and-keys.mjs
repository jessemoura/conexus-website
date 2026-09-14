import fs from 'fs';
import path from 'path';
import { pt } from '../src/i18n/pt.js';
import { en } from '../src/i18n/en.js';
import { es } from '../src/i18n/es.js';

function getTranslation(dict, key) {
  const keys = key.split('.');
  let result = dict;
  for (const k of keys) {
    if (result && typeof result === 'object' && k in result) {
      result = result[k];
    } else {
      return null;
    }
  }
  return result;
}

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

const htmlFiles = getHtmlFiles('.');

console.log('=== AUDIT OF ALL 30 HTML FILES ===');
for (const file of htmlFiles) {
  const content = fs.readFileSync(file, 'utf-8');
  
  // Find all data-i18n attributes
  const regex = /data-i18n=["']([^"']+)["']/g;
  let match;
  const keys = [];
  while ((match = regex.exec(content)) !== null) {
    keys.push(match[1]);
  }
  
  let missingEn = 0;
  let missingEs = 0;
  let enShorter = 0;
  let esShorter = 0;
  
  for (const k of keys) {
    const ptVal = getTranslation(pt, k);
    const enVal = getTranslation(en, k);
    const esVal = getTranslation(es, k);
    if (!enVal) missingEn++;
    if (!esVal) missingEs++;
    if (ptVal && enVal && typeof ptVal === 'string' && typeof enVal === 'string') {
      if (ptVal.length > 50 && enVal.length < ptVal.length * 0.4) {
        enShorter++;
      }
      if (ptVal.length > 50 && esVal && esVal.length < ptVal.length * 0.4) {
        esShorter++;
      }
    }
  }
  
  console.log(`${file}:`);
  console.log(`  - Total keys: ${keys.length}`);
  console.log(`  - Missing in EN: ${missingEn}`);
  console.log(`  - Missing in ES: ${missingEs}`);
  if (enShorter > 0 || esShorter > 0) {
    console.log(`  - WARNING: Significantly shorter texts: EN(${enShorter}), ES(${esShorter})`);
  }
}
