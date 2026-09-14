import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..');

import { pt } from '../src/i18n/pt.js';
import { en } from '../src/i18n/en.js';
import { es } from '../src/i18n/es.js';

// Comprehensive dictionary translator mapping specific phrases and structural content
// for high quality corporate English and Spanish.

// Let's create a robust translation generator for all autoContent items
import { fullEnglishAutoContent, fullSpanishAutoContent } from './dictionaries/fullTranslations.mjs';

// Merge into en and es
for (const group in fullEnglishAutoContent) {
  if (!en.autoContent) en.autoContent = {};
  en.autoContent[group] = Object.assign({}, en.autoContent[group] || {}, fullEnglishAutoContent[group]);
}

for (const group in fullSpanishAutoContent) {
  if (!es.autoContent) es.autoContent = {};
  es.autoContent[group] = Object.assign({}, es.autoContent[group] || {}, fullSpanishAutoContent[group]);
}

fs.writeFileSync(path.join(rootDir, 'src', 'i18n', 'en.js'), `export const en = ${JSON.stringify(en, null, 2)};\n`, 'utf8');
fs.writeFileSync(path.join(rootDir, 'src', 'i18n', 'es.js'), `export const es = ${JSON.stringify(es, null, 2)};\n`, 'utf8');

console.log('Successfully updated en.js and es.js with full professional translations!');
