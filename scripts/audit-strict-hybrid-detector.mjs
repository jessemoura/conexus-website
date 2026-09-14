import { en } from '../src/i18n/en.js';
import { es } from '../src/i18n/es.js';

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

const flatEn = flattenObject(en);
const flatEs = flattenObject(es);

// Portuguese words that must NOT appear in English (excluding brand/proper names and URLs)
const ptWordsInEn = [
  /\bpara\b/i,
  /\bcom\b(?!\.|\/)/i, // ignore .com
  /\bsua\b/i,
  /\bseu\b/i,
  /\bseus\b/i,
  /\bsuas\b/i,
  /\buma\b/i,
  /\bum\b/i,
  /\bnão\b/i,
  /\bempresa\b/i,
  /\bnegócio\b/i,
  /\bmais\b/i,
  /\bcomo\b/i,
  /\bvocê\b/i,
  /\bserviços\b/i,
  /\bcriação\b/i,
  /\borçamento\b/i,
  /\bhospedagem\b/i,
  /\bhospedagens\b/i,
  /\bconheça\b/i,
  /\bfale\b/i,
  /\bsaiba\b/i,
  /\batendimento\b/i,
  /\bdesenvolvimento\b/i,
  /\bpresença\b/i,
  /\bdepoimentos\b/i,
  /\bperguntas\b/i,
  /\bfrequentes\b/i,
  /\bdúvidas\b/i,
  /\bqualidade\b/i,
  /\bsegurança\b/i,
  /\bvisibilidade\b/i,
  /\bproposta\b/i,
  /\binício\b/i,
  /\bcontato\b/i,
  /\bsobre\b/i,
  /\bportfólio\b/i,
  /\bpolítica\b/i,
  /\bprivacidade\b/i,
  /\btermos\b/i,
  /\buso\b/i,
  /\btodos os direitos\b/i,
  /\bdireitos reservados\b/i
];

// Portuguese words that must NOT appear in Spanish
const ptWordsInEs = [
  /\bpara a\b/i,
  /\bpara o\b/i,
  /\bcom a\b/i,
  /\bcom o\b/i,
  /\bsua\b/i,
  /\bseu\b/i,
  /\bseus\b/i,
  /\bsuas\b/i,
  /\buma\b/i,
  /\bnão\b/i,
  /\bcriação\b/i,
  /\borçamento\b/i,
  /\bhospedagem\b/i,
  /\bhospedagens\b/i,
  /\bconheça\b/i,
  /\bfale\b/i,
  /\bsaiba\b/i,
  /\batendimento\b/i,
  /\bdesenvolvimento\b/i,
  /\bpresença\b/i,
  /\bdepoimentos\b/i,
  /\bdúvidas\b/i,
  /\bcontato\b/i,
  /\bsobre a\b/i,
  /\bportfólio\b/i,
  /\bdireitos\b/i,
  /\bdesenvolvido por\b/i
];

// Keys to ignore (legacy html blobs or brand names or email or URLs)
function shouldIgnoreKey(key) {
  if (key.startsWith('casesBody.') || key.startsWith('servicesBody.') || key.startsWith('infoPagesBody.') || key.startsWith('hubsBody.') || key.startsWith('articlesMeta.')) {
    return true; // legacy raw HTML block
  }
  return false;
}

function cleanTextForCheck(text) {
  if (typeof text !== 'string') return '';
  // Strip out URLs and emails
  return text
    .replace(/https?:\/\/[^\s]+/g, '')
    .replace(/www\.[^\s]+/g, '')
    .replace(/[\w.-]+@[\w.-]+\.\w+/g, '')
    .replace(/Booking\.com/gi, '')
    .replace(/Airbnb/gi, '');
}

console.log('=== AUDITING ENGLISH (EN) DICTIONARY ===');
let enErrors = 0;
for (const [k, v] of Object.entries(flatEn)) {
  if (shouldIgnoreKey(k)) continue;
  if (typeof v !== 'string') continue;
  
  const cleaned = cleanTextForCheck(v);
  for (const regex of ptWordsInEn) {
    if (regex.test(cleaned)) {
      console.error(`[EN LEAK] Key: ${k} | Match: ${regex} | Value: "${v}"`);
      enErrors++;
      break;
    }
  }
}

console.log('=== AUDITING SPANISH (ES) DICTIONARY ===');
let esErrors = 0;
for (const [k, v] of Object.entries(flatEs)) {
  if (shouldIgnoreKey(k)) continue;
  if (typeof v !== 'string') continue;
  
  const cleaned = cleanTextForCheck(v);
  for (const regex of ptWordsInEs) {
    if (regex.test(cleaned)) {
      console.error(`[ES LEAK] Key: ${k} | Match: ${regex} | Value: "${v}"`);
      esErrors++;
      break;
    }
  }
}

console.log(`\nAudit Results:`);
console.log(`EN Leaks Found: ${enErrors}`);
console.log(`ES Leaks Found: ${esErrors}`);

if (enErrors === 0 && esErrors === 0) {
  console.log('SUCCESS: 0 Portuguese leaks and 0 hybrid phrases across all active EN and ES keys!');
} else {
  process.exit(1);
}
