import fs from 'fs';
import path from 'path';
import { pt } from '../src/i18n/pt.js';
import { en } from '../src/i18n/en.js';
import { es } from '../src/i18n/es.js';

function getTranslation(dict, key) {
  const keys = key.split('.');
  let result = dict;
  for (const k of keys) {
    if (result && typeof result === 'object' && k in result) {
      result = result[k];
    } else {
      return null;
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

for (const file of articleFiles) {
  const content = fs.readFileSync(file, 'utf-8');
  console.log(`\n========================================`);
  console.log(`ANALYZING: ${file}`);
  console.log(`========================================`);
  
  // Extract all data-i18n keys inside this file
  const keyMatches = [...content.matchAll(/data-i18n=["']([^"']+)["']/g)].map(m => m[1]);
  console.log(`Total data-i18n elements: ${keyMatches.length}`);
  
  // Check autoContent group
  const autoKeys = keyMatches.filter(k => k.startsWith('autoContent.'));
  console.log(`autoContent keys: ${autoKeys.length}`);
  
  // Find paragraphs, h2, h3, li that might be missing data-i18n
  const lines = content.split('\n');
  const untranslated = [];
  lines.forEach((l, idx) => {
    const trimmed = l.trim();
    if ((trimmed.startsWith('<p') || trimmed.startsWith('<h2') || trimmed.startsWith('<h3') || trimmed.startsWith('<h4') || trimmed.startsWith('<li')) && !trimmed.includes('data-i18n') && !trimmed.includes('data-i18n-html')) {
      const text = trimmed.replace(/<[^>]+>/g, '').trim();
      if (text.length > 5) {
        untranslated.push({ line: idx + 1, text, full: trimmed });
      }
    }
  });
  
  console.log(`Untranslated text elements (missing data-i18n): ${untranslated.length}`);
  if (untranslated.length > 0) {
    untranslated.forEach(u => console.log(`  Line ${u.line}: ${u.text.slice(0, 80)}`));
  }
}
