import { pt } from '../src/i18n/pt.js';
import { en } from '../src/i18n/en.js';
import { es } from '../src/i18n/es.js';

function flatten(obj, prefix = '') {
  let res = {};
  for (let k in obj) {
    const full = prefix ? prefix + '.' + k : k;
    if (typeof obj[k] === 'object' && obj[k] !== null && !Array.isArray(obj[k])) {
      Object.assign(res, flatten(obj[k], full));
    } else {
      res[full] = obj[k];
    }
  }
  return res;
}

const flatPt = flatten(pt);
const flatEn = flatten(en);
const flatEs = flatten(es);

const whitelistWords = [
  'CONEXUS',
  'CONEXUS Guest Hub',
  'Welcome Book',
  'Michelly Correa',
  'Nikki Studio',
  'Crafix',
  'Di Piallato',
  'Lumora Cleaning Services',
  'Lumora',
  'SOS Aberturas',
  'CONEXXUS Digital Marketing UK',
  'CONEXXUS UK',
  'Oxford Barber',
  'Vila Serena',
  'comercial@conexus.press',
  'jesse.ribeiro@conexus.press',
  'PT',
  'EN',
  'ES',
  'WhatsApp',
  'Google',
  'Google Maps',
  'Airbnb',
  'Booking',
  'Instagram',
  'LinkedIn',
  'SEO',
  'SSL',
  'HTTPS',
  'Waze',
  'Mychelli Correa',
  'Littlepet - Pet Shop',
  'nikki.studio',
  'Tour Curitidoce',
  'Jessiel Moura',
  'Karine Gonzaga'
];

// Portuguese distinct markers
const ptMarkers = [
  'você', 'vocês', 'para', 'com', 'nossa', 'nosso', 'nossas', 'nossos',
  'sua', 'seu', 'suas', 'seus', 'empresa', 'empresas', 'negócio', 'negócios',
  'criação', 'desenvolvimento', 'serviços', 'contato', 'orçamento',
  'soluções', 'conheça', 'saiba', 'fale', 'estratégia', 'atendimento',
  'todos', 'direitos', 'reservados', 'hospedagem', 'hóspedes'
];

const suspiciousEn = [];
const suspiciousEs = [];

for (const key in flatPt) {
  const textPt = String(flatPt[key] || '');
  const textEn = String(flatEn[key] || '');
  const textEs = String(flatEs[key] || '');

  // Skip review quotes if they match exactly (since client reviews original text is preserved)
  if (key.includes('review') && textPt === textEn) continue;
  if (key.includes('flag') || key.includes('langCode') || key.includes('htmlLang')) continue;

  // Check English
  const foundPtInEn = ptMarkers.filter(w => new RegExp('\\b' + w + '\\b', 'i').test(textEn));
  if (foundPtInEn.length >= 2) {
    suspiciousEn.push({ key, pt: textPt, val: textEn, markers: foundPtInEn });
  }

  // Check Spanish
  const ptOnlyInEs = ['você', 'vocês', 'nossa', 'nosso', 'nossas', 'nossos', 'criação', 'negócio', 'negócios', 'orçamento', 'conheça', 'saiba', 'hóspedes'];
  const foundPtInEs = ptOnlyInEs.filter(w => new RegExp('\\b' + w + '\\b', 'i').test(textEs));
  if (foundPtInEs.length >= 1) {
    suspiciousEs.push({ key, pt: textPt, val: textEs, markers: foundPtInEs });
  }
}

console.log('====================================================');
console.log('   AUDITORIA DE QUALIDADE DE TRADUÇÃO (PT, EN, ES)  ');
console.log('====================================================');
console.log(`Total de chaves no dicionário PT: ${Object.keys(flatPt).length}`);
console.log(`Total de chaves no dicionário EN: ${Object.keys(flatEn).length}`);
console.log(`Total de chaves no dicionário ES: ${Object.keys(flatEs).length}`);
console.log(`Chaves suspeitas em EN com resíduo de PT: ${suspiciousEn.length}`);
console.log(`Chaves suspeitas em ES com resíduo de PT: ${suspiciousEs.length}`);

if (suspiciousEn.length > 0) {
  console.log('\nExemplos de resíduos em EN:');
  suspiciousEn.slice(0, 10).forEach(s => console.log(`  [${s.key}] (${s.markers.join(', ')}): "${s.val.slice(0, 80)}..."`));
}

if (suspiciousEs.length > 0) {
  console.log('\nExemplos de resíduos em ES:');
  suspiciousEs.slice(0, 10).forEach(s => console.log(`  [${s.key}] (${s.markers.join(', ')}): "${s.val.slice(0, 80)}..."`));
}

if (suspiciousEn.length === 0 && suspiciousEs.length === 0) {
  console.log('\n✅ PERFEITO! Zero resíduos de português encontrados nos dicionários EN e ES!');
}
console.log('====================================================');
