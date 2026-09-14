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

const grouped = {};
for (const k of Object.keys(flatPt)) {
  if (k === 'langCode' || k === 'langName' || k === 'flag' || k === 'flagAlt' || k === 'htmlLang') continue;
  if (!enSources[k]) {
    const top = k.split('.')[0];
    grouped[top] = (grouped[top] || 0) + 1;
  }
}
console.log('Unmapped by top section:', grouped);
