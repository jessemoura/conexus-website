const pt = require('../src/i18n/pt.js').pt;
const en = require('../src/i18n/en.js').en;
const es = require('../src/i18n/es.js').es;

const prefix = 'blog_caseAtthosComex';
const keys = Object.keys(pt).filter(k => k.startsWith(prefix));

console.log(`Found ${keys.length} keys for ${prefix}:`);
keys.forEach(k => {
  console.log(`\n--- Key: ${k} ---`);
  console.log('  PT:', pt[k]);
  console.log('  EN:', en[k]);
  console.log('  ES:', es[k]);
});
