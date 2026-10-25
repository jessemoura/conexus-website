const fs = require('fs');

const html = fs.readFileSync('portfolio/index.html', 'utf8');
// Find each case card
const cards = html.match(/<!--\s*Case\s*\d+:[\s\S]*?(?=<!--\s*Case\s*\d+:|<!--\s*CONEXUS\s*DEVELOPER|<\/section>)/gi) || [];
console.log(`Found ${cards.length} case blocks in portfolio/index.html`);

cards.forEach((c, idx) => {
  const caseComment = c.match(/<!--\s*(Case\s*\d+:[^>]+)-->/i);
  const name = caseComment ? caseComment[1].trim() : `Case #${idx + 1}`;
  const i18nTags = c.match(/data-i18n(?:-html)?="([^"]+)"/g) || [];
  console.log(`\n${name}:`);
  console.log(`  Total i18n tags: ${i18nTags.length}`);
  i18nTags.forEach(t => console.log('   ', t));
});
