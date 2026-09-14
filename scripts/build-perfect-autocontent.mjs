import fs from 'fs';
import path from 'path';
import { pt } from '../src/i18n/pt.js';
import { en as oldEn } from '../src/i18n/en.js';
import { es as oldEs } from '../src/i18n/es.js';
import { perfectBlogHub, perfectServicesHub } from './translations/perfectHubs.mjs';
import { perfectServicesSubpages } from './translations/perfectServicesSubpages.mjs';

// We also load all the high quality existing translations from other modules
import { groupPortfolioAutoContent } from './translations/groupPortfolioAutoContent.mjs';
import { groupInstitutionalAutoContent } from './translations/groupInstitutionalAutoContent.mjs';

console.log('Building perfect autoContent maps for EN and ES...');

// Let's create dictionaries
const enAuto = {};
const esAuto = {};

// 1. Hubs (blog & servicos)
enAuto.blog = perfectBlogHub.en;
esAuto.blog = perfectBlogHub.es;
enAuto.servicos = perfectServicesHub.en;
esAuto.servicos = perfectServicesHub.es;

// 2. Services subpages
for (const sub in perfectServicesSubpages.en) {
  enAuto[sub] = perfectServicesSubpages.en[sub];
  esAuto[sub] = perfectServicesSubpages.es[sub];
}

// 3. Institutional (sobre, faq, contato)
if (groupInstitutionalAutoContent && groupInstitutionalAutoContent.en) {
  for (const group in groupInstitutionalAutoContent.en) {
    enAuto[group] = groupInstitutionalAutoContent.en[group];
    esAuto[group] = groupInstitutionalAutoContent.es[group];
  }
}

// 4. Portfolio groups
if (groupPortfolioAutoContent && groupPortfolioAutoContent.en) {
  for (const group in groupPortfolioAutoContent.en) {
    enAuto[group] = groupPortfolioAutoContent.en[group];
    esAuto[group] = groupPortfolioAutoContent.es[group];
  }
}

// Now let's verify which groups remain and need complete perfect mappings
const allGroups = Object.keys(pt.autoContent);
const missingGroups = allGroups.filter(g => !enAuto[g] && g !== 'index');
console.log('Groups still to define in perfectAutoContent:', missingGroups);

fs.writeFileSync('./scripts/translations/collectedAutoContent.json', JSON.stringify({ enAuto, esAuto, missingGroups }, null, 2));
