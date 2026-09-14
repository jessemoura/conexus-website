import fs from 'fs';
import { pt } from '../src/i18n/pt.js';
import { commonPagesTranslations } from './translations/commonPages.mjs';
import { servicesPagesTranslations } from './translations/servicesPages.mjs';
import { portfolioPagesTranslations } from './translations/portfolioPages.mjs';
import { blogPagesTranslations } from './translations/blogPages.mjs';
import { articlesBodyTranslations } from './translations/articlesBody.mjs';
import { groupServicesTranslations } from './translations/groupServicesTranslations.mjs';
import { groupPortfolioAutoContent } from './translations/groupPortfolioAutoContent.mjs';
import { groupBlogAutoContent } from './translations/groupBlogAutoContent.mjs';
import { groupInstitutionalAutoContent } from './translations/groupInstitutionalAutoContent.mjs';

function flattenObject(obj, prefix = '') {
  let res = {};
  for (const [k, v] of Object.entries(obj)) {
    const fullKey = prefix ? `${prefix}.${k}` : k;
    if (v !== null && typeof v === 'object' && !Array.isArray(v)) {
      Object.assign(res, flattenObject(v, fullKey));
    } else {
      res[fullKey] = v;
    }
  }
  return res;
}

const flatPt = flattenObject(pt);

const enSources = {
  ...flattenObject(commonPagesTranslations.en),
  ...flattenObject(servicesPagesTranslations.en),
  ...flattenObject(portfolioPagesTranslations.en),
  ...flattenObject(blogPagesTranslations.en),
  ...flattenObject(articlesBodyTranslations.en, 'articlesBody'),
  ...flattenObject({
    autoContent: {
      ...groupServicesTranslations.en,
      ...groupPortfolioAutoContent.en,
      ...groupBlogAutoContent.en,
      ...groupInstitutionalAutoContent.en,
      index: {}
    }
  })
};

const esSources = {
  ...flattenObject(commonPagesTranslations.es),
  ...flattenObject(servicesPagesTranslations.es),
  ...flattenObject(portfolioPagesTranslations.es),
  ...flattenObject(blogPagesTranslations.es),
  ...flattenObject(articlesBodyTranslations.es, 'articlesBody'),
  ...flattenObject({
    autoContent: {
      ...groupServicesTranslations.es,
      ...groupPortfolioAutoContent.es,
      ...groupBlogAutoContent.es,
      ...groupInstitutionalAutoContent.es,
      index: {}
    }
  })
};

// Let's dump all unmapped keys with their PT values so we can translate them fully and accurately
const unmapped = {};
for (const [k, v] of Object.entries(flatPt)) {
  if (k === 'langCode' || k === 'langName' || k === 'flag' || k === 'flagAlt' || k === 'htmlLang') continue;
  if (!enSources[k]) {
    unmapped[k] = v;
  }
}

console.log('Total unmapped keys:', Object.keys(unmapped).length);
fs.writeFileSync('scripts/unmapped-keys-pt.json', JSON.stringify(unmapped, null, 2), 'utf-8');
console.log('Saved unmapped keys to scripts/unmapped-keys-pt.json');
