const fs = require('fs');
const inv = require('./card-inventory.json');
const pt = require('../src/i18n/pt.js').pt;
const en = require('../src/i18n/en.js').en;
const es = require('../src/i18n/es.js').es;

function getVal(dict, keyStr) {
  if (!dict || !keyStr) return null;
  return keyStr.split('.').reduce((o, i) => (o ? o[i] : null), dict);
}

const withKeys = inv.filter(c => c.titleKey);
console.log('Cards with titleKey:', withKeys.length);

const untranslatedInEn = [];

withKeys.forEach(c => {
  const ptTitle = getVal(pt, c.titleKey);
  const enTitle = getVal(en, c.titleKey);
  const esTitle = getVal(es, c.titleKey);

  const ptDesc = getVal(pt, c.descKey);
  const enDesc = getVal(en, c.descKey);
  const esDesc = getVal(es, c.descKey);

  const titleEqual = ptTitle && enTitle && ptTitle === enTitle;
  const descEqual = ptDesc && enDesc && ptDesc === enDesc;

  if (titleEqual || descEqual || !enTitle || !enDesc) {
    untranslatedInEn.push({
      slug: c.slug,
      titleKey: c.titleKey,
      ptTitle,
      enTitle,
      titleEqual,
      descKey: c.descKey,
      ptDesc: ptDesc ? ptDesc.slice(0, 50) : null,
      enDesc: enDesc ? enDesc.slice(0, 50) : null,
      descEqual
    });
  }
});

console.log(`Of the ${withKeys.length} cards, ${untranslatedInEn.length} have untranslated or missing EN fields:`);
console.log(JSON.stringify(untranslatedInEn, null, 2));
