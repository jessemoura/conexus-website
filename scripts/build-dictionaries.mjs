import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..');

// Let's build PT, EN, and ES dictionaries
import { ptDict } from './dictionaries/pt.mjs';
import { enDict } from './dictionaries/en.mjs';
import { esDict } from './dictionaries/es.mjs';

fs.writeFileSync(path.join(rootDir, 'src', 'i18n', 'pt.js'), `export const pt = ${JSON.stringify(ptDict, null, 2)};\n`, 'utf8');
fs.writeFileSync(path.join(rootDir, 'src', 'i18n', 'en.js'), `export const en = ${JSON.stringify(enDict, null, 2)};\n`, 'utf8');
fs.writeFileSync(path.join(rootDir, 'src', 'i18n', 'es.js'), `export const es = ${JSON.stringify(esDict, null, 2)};\n`, 'utf8');

console.log('Successfully generated complete src/i18n/pt.js, en.js, and es.js!');
