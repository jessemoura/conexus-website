import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..');

import { pt } from '../src/i18n/pt.js';

// Sentence-level professional translation mapping table
// Every key is mapped to its full, authentic corporate English and Spanish translation.

import { commonPagesTranslations } from './translations/commonPages.mjs';
import { servicesPagesTranslations } from './translations/servicesPages.mjs';
import { portfolioPagesTranslations } from './translations/portfolioPages.mjs';
import { blogPagesTranslations } from './translations/blogPages.mjs';
import { articlesBodyTranslations } from './translations/articlesBody.mjs';

// Build complete EN and ES objects
const completeEn = {
  langCode: 'en',
  langName: 'English',
  flag: '/assets/icons/flags/gb.svg',
  flagAlt: 'United Kingdom Flag',
  htmlLang: 'en-GB',
  ...commonPagesTranslations.en,
  ...servicesPagesTranslations.en,
  ...portfolioPagesTranslations.en,
  ...blogPagesTranslations.en,
  articlesBody: articlesBodyTranslations.en,
  autoContent: {}
};

const completeEs = {
  langCode: 'es',
  langName: 'Español',
  flag: '/assets/icons/flags/es.svg',
  flagAlt: 'Bandera de España',
  htmlLang: 'es-ES',
  ...commonPagesTranslations.es,
  ...servicesPagesTranslations.es,
  ...portfolioPagesTranslations.es,
  ...blogPagesTranslations.es,
  articlesBody: articlesBodyTranslations.es,
  autoContent: {}
};

// Also ensure PT has the corrected footer.devBy (without duplicate CONEXUS)
pt.footer.devBy = 'Desenvolvido por';
completeEn.footer.devBy = 'Developed by';
completeEs.footer.devBy = 'Desarrollado por';

fs.writeFileSync(path.join(rootDir, 'src', 'i18n', 'pt.js'), `export const pt = ${JSON.stringify(pt, null, 2)};\n`, 'utf8');

console.log('PT base updated with clean footer signature!');
