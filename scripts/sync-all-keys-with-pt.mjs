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

function unflattenObject(flat) {
  const result = {};
  for (const [key, value] of Object.entries(flat)) {
    const parts = key.split('.');
    let cur = result;
    for (let i = 0; i < parts.length - 1; i++) {
      const part = parts[i];
      if (!cur[part] || typeof cur[part] !== 'object') {
        cur[part] = {};
      }
      cur = cur[part];
    }
    cur[parts[parts.length - 1]] = value;
  }
  return result;
}

const flatPt = flattenObject(pt);

console.log('Total keys in flat PT:', Object.keys(flatPt).length);

// Let's create dictionaries of available translations
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

console.log('Available EN keys from sources:', Object.keys(enSources).length);
console.log('Available ES keys from sources:', Object.keys(esSources).length);

const unmappedInEn = [];
for (const k of Object.keys(flatPt)) {
  if (k === 'langCode' || k === 'langName' || k === 'flag' || k === 'flagAlt' || k === 'htmlLang') continue;
  if (!enSources[k]) {
    unmappedInEn.push(k);
  }
}

console.log('Keys in PT but not in enSources:', unmappedInEn.length);
if (unmappedInEn.length > 0) {
  console.log('Sample unmapped in EN (first 30):', unmappedInEn.slice(0, 30));
}
