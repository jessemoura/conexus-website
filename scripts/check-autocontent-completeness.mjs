import fs from 'fs';
import { pt } from '../src/i18n/pt.js';
import { en } from '../src/i18n/en.js';
import { es } from '../src/i18n/es.js';

console.log('=== CHECKING ALL 30 AUTOCONTENT GROUPS TEXT COMPLETENESS ===\n');

let totalKeys = 0;
let suspiciousEn = 0;
let suspiciousEs = 0;

for (const group of Object.keys(pt.autoContent)) {
  const ptGroup = pt.autoContent[group];
  const enGroup = (en.autoContent && en.autoContent[group]) || {};
  const esGroup = (es.autoContent && es.autoContent[group]) || {};
  
  for (const [k, ptVal] of Object.entries(ptGroup)) {
    totalKeys++;
    const enVal = enGroup[k];
    const esVal = esGroup[k];
    
    if (!enVal) {
      console.log(`❌ [EN Missing] ${group}.${k}`);
      suspiciousEn++;
    } else if (ptVal.length > 60 && enVal.length < ptVal.length * 0.4) {
      console.log(`⚠️ [EN Truncated?] ${group}.${k} (PT: ${ptVal.length} chars, EN: ${enVal.length} chars)`);
      console.log(`   PT: ${ptVal.slice(0, 70)}...`);
      console.log(`   EN: ${enVal.slice(0, 70)}...`);
      suspiciousEn++;
    }
    
    if (!esVal) {
      console.log(`❌ [ES Missing] ${group}.${k}`);
      suspiciousEs++;
    } else if (ptVal.length > 60 && esVal.length < ptVal.length * 0.4) {
      console.log(`⚠️ [ES Truncated?] ${group}.${k} (PT: ${ptVal.length} chars, ES: ${esVal.length} chars)`);
      console.log(`   PT: ${ptVal.slice(0, 70)}...`);
      console.log(`   ES: ${esVal.slice(0, 70)}...`);
      suspiciousEs++;
    }
  }
}

console.log(`\nTotal autoContent keys verified: ${totalKeys}`);
console.log(`Suspicious EN: ${suspiciousEn}`);
console.log(`Suspicious ES: ${suspiciousEs}`);
