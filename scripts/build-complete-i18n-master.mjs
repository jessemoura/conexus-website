import fs from 'fs';
import { pt } from '../src/i18n/pt.js';
import { commonPagesTranslations } from './translations/commonPages.mjs';
import { servicesPagesTranslations } from './translations/servicesPages.mjs';
import { portfolioPagesTranslations } from './translations/portfolioPages.mjs';
import { blogPagesTranslations } from './translations/blogPages.mjs';
import { articlesBodyTranslations } from './translations/articlesBody.mjs';
import { perfectBlogHub, perfectServicesHub } from './translations/perfectHubs.mjs';
import { perfectServicesSubpages } from './translations/perfectServicesSubpages.mjs';
import { perfectBlogArticles } from './translations/perfectBlogArticles.mjs';
import { groupPortfolioAutoContent } from './translations/groupPortfolioAutoContent.mjs';
import { groupInstitutionalAutoContent } from './translations/groupInstitutionalAutoContent.mjs';
import { supplementalTranslations } from './translations/supplementalTranslations.mjs';

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

function buildCompleteLanguage(lang) {
  const isEn = lang === 'en';
  
  const blogFlat = flattenObject(blogPagesTranslations[lang]);
  const mappedArticleMeta = {};
  const metaMap = {
    'artigoPorQueSite': 'articlesMeta.porQueSite',
    'artigoQuantoCusta': 'articlesMeta.quantoCusta',
    'artigoComoUsarGoogle': 'articlesMeta.comoUsarGoogle',
    'artigoSeoLocalSaoJose': 'articlesMeta.seoLocalSaoJose',
    'artigoGuestHub': 'articlesMeta.guestHubArtigo',
    'artigoGuestHubArtigo': 'articlesMeta.guestHubArtigo',
    'artigoHospedagem': 'articlesMeta.hospedagem',
    'artigoMarketingDigital': 'articlesMeta.marketingDigital',
    'artigoRedesSociais': 'articlesMeta.redesSociais'
  };
  for (const [srcPrefix, dstPrefix] of Object.entries(metaMap)) {
    if (blogFlat[`${srcPrefix}.title`]) mappedArticleMeta[`${dstPrefix}.title`] = blogFlat[`${srcPrefix}.title`];
    if (blogFlat[`${srcPrefix}.excerpt`]) mappedArticleMeta[`${dstPrefix}.lead`] = blogFlat[`${srcPrefix}.excerpt`];
    if (blogFlat[`${srcPrefix}.lead`]) mappedArticleMeta[`${dstPrefix}.lead`] = blogFlat[`${srcPrefix}.lead`];
    if (blogFlat[`${srcPrefix}.date`]) mappedArticleMeta[`${dstPrefix}.date`] = blogFlat[`${srcPrefix}.date`];
    if (blogFlat[`${srcPrefix}.category`]) mappedArticleMeta[`${dstPrefix}.badge`] = blogFlat[`${srcPrefix}.category`];
    if (blogFlat[`${srcPrefix}.badge`]) mappedArticleMeta[`${dstPrefix}.badge`] = blogFlat[`${srcPrefix}.badge`];
  }

  const sources = {
    ...flattenObject(commonPagesTranslations[lang]),
    ...flattenObject(servicesPagesTranslations[lang]),
    ...flattenObject(portfolioPagesTranslations[lang]),
    ...flattenObject(blogPagesTranslations[lang]),
    ...mappedArticleMeta,
    ...flattenObject(articlesBodyTranslations[lang], 'articlesBody'),
    ...flattenObject({
      autoContent: {
        blog: perfectBlogHub[lang],
        servicos: perfectServicesHub[lang],
        ...perfectServicesSubpages[lang],
        ...perfectBlogArticles[lang],
        ...groupPortfolioAutoContent[lang],
        ...groupInstitutionalAutoContent[lang],
        index: {}
      }
    }),
    ...supplementalTranslations[lang]
  };

  const flatResult = {};
  let missingCount = 0;

  for (const [key, ptVal] of Object.entries(flatPt)) {
    if (key === 'langCode') {
      flatResult[key] = isEn ? 'EN' : 'ES';
    } else if (key === 'langName') {
      flatResult[key] = isEn ? 'English' : 'Español';
    } else if (key === 'flag') {
      flatResult[key] = isEn ? '/assets/images/flags/gb.svg' : '/assets/images/flags/es.svg';
    } else if (key === 'flagAlt') {
      flatResult[key] = isEn ? 'English' : 'Español';
    } else if (key === 'htmlLang') {
      flatResult[key] = isEn ? 'en' : 'es';
    } else if (key === 'footer.devBy') {
      flatResult[key] = isEn ? 'Developed by' : 'Desarrollado por';
    } else if (sources[key] !== undefined) {
      flatResult[key] = sources[key];
    } else {
      // If legacy HTML block in articlesMeta, casesBody, etc.
      console.warn(`[${lang}] Fallback for key: ${key}`);
      flatResult[key] = ptVal;
      missingCount++;
    }
  }

  console.log(`[${lang}] Build complete. Total keys: ${Object.keys(flatResult).length}, Fallbacks: ${missingCount}`);
  return unflattenObject(flatResult);
}

const completeEn = buildCompleteLanguage('en');
const completeEs = buildCompleteLanguage('es');

// Write src/i18n/en.js
const enContent = `export const en = ${JSON.stringify(completeEn, null, 2)};
`;
fs.writeFileSync('src/i18n/en.js', enContent, 'utf-8');
console.log('Successfully written src/i18n/en.js');

// Write src/i18n/es.js
const esContent = `export const es = ${JSON.stringify(completeEs, null, 2)};
`;
fs.writeFileSync('src/i18n/es.js', esContent, 'utf-8');
console.log('Successfully written src/i18n/es.js');
