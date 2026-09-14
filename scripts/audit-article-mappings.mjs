import fs from 'fs';
import path from 'path';
import { pt } from '../src/i18n/pt.js';
import { en } from '../src/i18n/en.js';
import { es } from '../src/i18n/es.js';

const articleFiles = [
  { file: 'blog/como-colocar-empresa-no-google-sao-jose-dos-pinhais/index.html', group: 'blog_como_colocar_empresa_no_google_sao_jose_dos_pinhais' },
  { file: 'blog/como-usar-site-para-atrair-clientes-google/index.html', group: 'blog_como_usar_site_para_atrair_clientes_google' },
  { file: 'blog/conexus-guest-hub-guia-digital-para-hospedagens/index.html', group: 'blog_conexus_guest_hub_guia_digital_para_hospedagens' },
  { file: 'blog/importancia-hospedagem-de-qualidade/index.html', group: 'blog_importancia_hospedagem_de_qualidade' },
  { file: 'blog/marketing-digital-para-empresas/index.html', group: 'blog_marketing_digital_para_empresas' },
  { file: 'blog/por-que-sua-empresa-precisa-de-um-site/index.html', group: 'blog_por_que_sua_empresa_precisa_de_um_site' },
  { file: 'blog/quanto-custa-site-profissional-2026/index.html', group: 'blog_quanto_custa_site_profissional_2026' },
  { file: 'blog/redes-sociais-para-empresas/index.html', group: 'blog_redes_sociais_para_empresas' }
];

console.log('=== AUDITING 8 BLOG ARTICLES DETAILED MAPPINGS ===\n');

for (const art of articleFiles) {
  const content = fs.readFileSync(art.file, 'utf-8');
  const ptGroup = pt.autoContent[art.group] || {};
  const enGroup = en.autoContent[art.group] || {};
  const esGroup = es.autoContent[art.group] || {};
  
  const ptKeyCount = Object.keys(ptGroup).length;
  const enKeyCount = Object.keys(enGroup).length;
  const esKeyCount = Object.keys(esGroup).length;
  
  // Extract all data-i18n occurrences in the HTML
  const domKeys = [...content.matchAll(/data-i18n=["']([^"']+)["']/g)].map(m => m[1]);
  const domAutoKeys = domKeys.filter(k => k.startsWith(`autoContent.${art.group}.`)).map(k => k.replace(`autoContent.${art.group}.`, ''));
  
  console.log(`📁 ${art.file}:`);
  console.log(`   DOM autoContent keys: ${domAutoKeys.length} (Max key: ${domAutoKeys[domAutoKeys.length - 1]})`);
  console.log(`   Dictionary keys -> PT: ${ptKeyCount}, EN: ${enKeyCount}, ES: ${esKeyCount}`);
  
  // Check if any DOM key is missing in dicts
  let missingInPt = 0, missingInEn = 0, missingInEs = 0;
  for (const k of domAutoKeys) {
    if (!ptGroup[k]) missingInPt++;
    if (!enGroup[k]) missingInEn++;
    if (!esGroup[k]) missingInEs++;
  }
  if (missingInPt || missingInEn || missingInEs) {
    console.log(`   ⚠️ MISSING KEYS: PT(${missingInPt}), EN(${missingInEn}), ES(${missingInEs})`);
  } else {
    console.log(`   ✅ 100% of DOM keys exist in PT, EN, and ES.`);
  }
}
