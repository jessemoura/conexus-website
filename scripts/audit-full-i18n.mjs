import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..');

import { pt } from '../src/i18n/pt.js';
import { en } from '../src/i18n/en.js';
import { es } from '../src/i18n/es.js';

function getNestedValue(obj, keyPath) {
  const keys = keyPath.split('.');
  let current = obj;
  for (const k of keys) {
    if (current && typeof current === 'object' && k in current) {
      current = current[k];
    } else {
      return undefined;
    }
  }
  return current;
}

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
console.log(`Auditing ${htmlFiles.length} HTML files against i18n dictionaries...\n`);

let totalKeysAudited = 0;
let missingPt = 0;
let missingEn = 0;
let missingEs = 0;
const missingDetails = [];

htmlFiles.forEach(file => {
  const relPath = path.relative(rootDir, file).replace(/\\/g, '/');
  const html = fs.readFileSync(file, 'utf8');

  // Find all data-i18n="key"
  const i18nMatches = [...html.matchAll(/data-i18n="([^"]+)"/g)].map(m => m[1]);
  // Find all data-i18n-html="key"
  const i18nHtmlMatches = [...html.matchAll(/data-i18n-html="([^"]+)"/g)].map(m => m[1]);
  // Find all data-i18n-attr="attr:key"
  const i18nAttrMatches = [...html.matchAll(/data-i18n-attr="([^"]+)"/g)].flatMap(m => m[1].split(',').map(pair => pair.split(':')[1]?.trim()).filter(Boolean));

  const allKeys = [...new Set([...i18nMatches, ...i18nHtmlMatches, ...i18nAttrMatches])];

  allKeys.forEach(key => {
    totalKeysAudited++;
    const ptVal = getNestedValue(pt, key);
    const enVal = getNestedValue(en, key);
    const esVal = getNestedValue(es, key);

    if (ptVal === undefined) {
      missingPt++;
      missingDetails.push({ file: relPath, key, lang: 'PT' });
    }
    if (enVal === undefined) {
      missingEn++;
      missingDetails.push({ file: relPath, key, lang: 'EN' });
    }
    if (esVal === undefined) {
      missingEs++;
      missingDetails.push({ file: relPath, key, lang: 'ES' });
    }
  });
});

console.log('====================================================');
console.log('         RELATÓRIO DE AUDITORIA i18n FINAL          ');
console.log('====================================================');
console.log(`Total de páginas auditadas: ${htmlFiles.length}`);
console.log(`Total de chaves validadas no DOM: ${totalKeysAudited}`);
console.log(`Chaves faltantes em Português: ${missingPt}`);
console.log(`Chaves faltantes em Inglês: ${missingEn}`);
console.log(`Chaves faltantes em Espanhol: ${missingEs}`);

if (missingDetails.length > 0) {
  console.log('\nDetalhes de chaves faltantes:');
  missingDetails.forEach(d => console.log(`  - [${d.lang}] ${d.file} -> chave: ${d.key}`));
} else {
  console.log('\n✅ 100% DAS CHAVES EXISTEM EM PT, EN E ES!');
}
console.log('====================================================');
