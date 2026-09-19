import { pt } from '../src/i18n/pt.js';
import { en } from '../src/i18n/en.js';
import { es } from '../src/i18n/es.js';

const untranslated = [];

const whitelist = [
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
  'Waze'
];

for (const g in pt.autoContent || {}) {
  for (const k in pt.autoContent[g]) {
    const ptVal = String(pt.autoContent[g][k] || '').trim();
    const enVal = String(en.autoContent?.[g]?.[k] || '').trim();
    const esVal = String(es.autoContent?.[g]?.[k] || '').trim();

    if (/^[0-9\s.,\-_+–—/%$€£✓()·•→←|↗★@:]+$/.test(ptVal)) continue;
    if (whitelist.some(w => ptVal === w)) continue;

    if (ptVal === enVal || ptVal === esVal) {
      untranslated.push({ group: g, key: k, text: ptVal });
    }
  }
}

console.log(`Total untranslated autoContent sentences remaining: ${untranslated.length}`);
if (untranslated.length > 0) {
  console.log('\nGrouped by page:');
  const byGroup = {};
  untranslated.forEach(u => byGroup[u.group] = (byGroup[u.group] || 0) + 1);
  console.log(byGroup);

  console.log('\nSample items:');
  untranslated.slice(0, 20).forEach(u => console.log(`  [${u.group}.${u.key}] "${u.text}"`));
}
