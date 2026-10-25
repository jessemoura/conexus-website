const fs = require('fs');

const dirs = [
  'atthos-comex',
  'conexxus-uk',
  'crafix',
  'curitipao',
  'di-piallato',
  'fast-guincho',
  'grana',
  'lumora-cleaning-services',
  'michelly-correa',
  'nikki-studio',
  'soquindins',
  'sos-aberturas',
  'welcome-book-apartamento-41'
];

dirs.forEach(dir => {
  const filePath = `portfolio/${dir}/index.html`;
  const html = fs.readFileSync(filePath, 'utf8');
  const mainMatch = html.match(/<main[\s\S]*?<\/main>/);
  const mainHtml = mainMatch ? mainMatch[0] : '';
  const i18nInMain = mainHtml.match(/data-i18n(?:-html)?="([^"]+)"/g) || [];
  
  // Count headings and paragraphs in main
  const headings = mainHtml.match(/<h[1-4][^>]*>[\s\S]*?<\/h[1-4]>/g) || [];
  const paragraphs = mainHtml.match(/<p[^>]*>[\s\S]*?<\/p>/g) || [];
  
  console.log(`\n[portfolio/${dir}]`);
  console.log(`  i18n tags in <main>: ${i18nInMain.length}`);
  console.log(`  Headings in <main>: ${headings.length}`);
  console.log(`  Paragraphs in <main>: ${paragraphs.length}`);
});
