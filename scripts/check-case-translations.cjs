const pt = require('../src/i18n/pt.js').pt;
const en = require('../src/i18n/en.js').en;
const es = require('../src/i18n/es.js').es;

const cases = [
  'blog_caseDiPiallato',
  'blog_caseSoquindins',
  'blog_caseMichellyCorrea',
  'blog_caseLittlePet',
  'blog_caseFastGuincho',
  'blog_caseNikkiStudio',
  'blog_caseLumoraCleaning',
  'blog_caseSosAberturas',
  'blog_solucaoWelcomeBook'
];

cases.forEach(prefix => {
  const keys = Object.keys(pt).filter(k => k.startsWith(prefix));
  console.log(`\n=== ${prefix} (${keys.length} keys in pt) ===`);
  const enSameKeys = keys.filter(k => pt[k] === en[k] && (pt[k] || '').length > 5);
  console.log('  Keys where EN == PT:', enSameKeys);
  const enMissingKeys = keys.filter(k => !en[k]);
  console.log('  Keys where EN is missing:', enMissingKeys);
});
