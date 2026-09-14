import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..');

import { pt } from '../src/i18n/pt.js';

// Let's create full, professional translations for all autoContent and all dictionary keys
// We will export modular translation objects.

export function buildCompleteTranslations() {
  console.log('Building complete professional translations for EN and ES...');
}
