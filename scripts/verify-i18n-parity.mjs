import { pt } from '../src/i18n/pt.js';
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

const flatPt = flattenObject(pt);
const flatEn = flattenObject(en);
const flatEs = flattenObject(es);

const ptKeys = Object.keys(flatPt);
const enKeys = Object.keys(flatEn);
const esKeys = Object.keys(flatEs);

console.log('Flat Key counts:');
console.log('PT:', ptKeys.length);
console.log('EN:', enKeys.length);
console.log('ES:', esKeys.length);

const missingInEn = ptKeys.filter(k => !(k in flatEn));
const missingInEs = ptKeys.filter(k => !(k in flatEs));
const extraInEn = enKeys.filter(k => !(k in flatPt));
const extraInEs = esKeys.filter(k => !(k in flatPt));

if (missingInEn.length > 0) console.error('Missing in EN:', missingInEn);
if (missingInEs.length > 0) console.error('Missing in ES:', missingInEs);
if (extraInEn.length > 0) console.warn('Extra in EN:', extraInEn);
if (extraInEs.length > 0) console.warn('Extra in ES:', extraInEs);

if (missingInEn.length === 0 && missingInEs.length === 0) {
  console.log('PERFECT 100% PARITY! All keys exist in PT, EN, and ES.');
}
