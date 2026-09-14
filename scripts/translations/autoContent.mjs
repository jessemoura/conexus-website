import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..');

import { pt } from '../src/i18n/pt.js';

// Let's create complete sentence translation maps for all autoContent groups
export const autoContentTranslations = {
  en: {},
  es: {}
};

// We will populate all 30 groups with full, natural translations
