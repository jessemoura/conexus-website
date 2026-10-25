const fs = require('fs');
const inv = require('./card-inventory.json');
const pt = require('../src/i18n/pt.js').pt;

const withoutKeys = inv.filter(c => !c.titleKey);
console.log('Cards without titleKey:', withoutKeys.length);

let matchedAutoContent = 0;
let unmatched = [];

withoutKeys.forEach(c => {
  const normalizedSlug = 'blog_' + c.slug.replace(/-/g, '_');
  if (pt.autoContent && pt.autoContent[normalizedSlug]) {
    matchedAutoContent++;
  } else {
    unmatched.push(c);
  }
});

console.log('Matched in pt.autoContent:', matchedAutoContent);
console.log('Unmatched count:', unmatched.length);
console.log('Unmatched cards:', unmatched.map(u => ({ slug: u.slug, title: u.rawTitle })));
