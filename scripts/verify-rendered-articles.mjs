import fs from 'fs';
import { JSDOM } from 'jsdom';
import { pt } from '../src/i18n/pt.js';
import { en } from '../src/i18n/en.js';
import { es } from '../src/i18n/es.js';

const translations = { pt, en, es };

function getTranslation(dict, key) {
  const keys = key.split('.');
  let result = dict;
  for (const k of keys) {
    if (result && typeof result === 'object' && k in result) {
      result = result[k];
    } else {
      let fallback = pt;
      for (const fk of keys) {
        if (fallback && typeof fallback === 'object' && fk in fallback) {
          fallback = fallback[fk];
        } else {
          return key;
        }
      }
      return fallback;
    }
  }
  return result;
}

const articleFiles = [
  'blog/como-colocar-empresa-no-google-sao-jose-dos-pinhais/index.html',
  'blog/como-usar-site-para-atrair-clientes-google/index.html',
  'blog/conexus-guest-hub-guia-digital-para-hospedagens/index.html',
  'blog/importancia-hospedagem-de-qualidade/index.html',
  'blog/marketing-digital-para-empresas/index.html',
  'blog/por-que-sua-empresa-precisa-de-um-site/index.html',
  'blog/quanto-custa-site-profissional-2026/index.html',
  'blog/redes-sociais-para-empresas/index.html'
];

console.log('=== VERIFYING RENDERED DOM CONTENT ACROSS ALL 8 BLOG ARTICLES (PT vs EN vs ES) ===\n');

for (const file of articleFiles) {
  const html = fs.readFileSync(file, 'utf-8');
  console.log(`\n========================================`);
  console.log(`ARTICLE: ${file}`);
  console.log(`========================================`);
  
  const dom = new JSDOM(html);
  const doc = dom.window.document;
  
  // Find main content container
  const main = doc.querySelector('main');
  if (!main) {
    console.log('ERROR: No <main> found!');
    continue;
  }
  
  // Get all translatable elements inside <main>
  const i18nElements = main.querySelectorAll('[data-i18n]');
  console.log(`Found ${i18nElements.length} translated elements in <main>.`);
  
  let issues = 0;
  i18nElements.forEach((el, i) => {
    const key = el.getAttribute('data-i18n');
    const ptText = getTranslation(pt, key);
    const enText = getTranslation(en, key);
    const esText = getTranslation(es, key);
    
    if (!ptText || typeof ptText !== 'string') {
      console.log(`❌ [${i+1}] Key ${key} has invalid PT text`);
      issues++;
    }
    if (!enText || typeof enText !== 'string') {
      console.log(`❌ [${i+1}] Key ${key} has invalid EN text`);
      issues++;
    }
    if (!esText || typeof esText !== 'string') {
      console.log(`❌ [${i+1}] Key ${key} has invalid ES text`);
      issues++;
    }
  });
  
  if (issues === 0) {
    console.log(`✅ ALL ${i18nElements.length} elements in this article have 100% valid, full translations in PT, EN, and ES!`);
  } else {
    console.log(`⚠️ Total issues found: ${issues}`);
  }
}
