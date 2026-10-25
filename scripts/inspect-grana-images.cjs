const fs = require('fs');

const files = [
  'portfolio/grana/index.html',
  'blog/case-grana-aplicativo-gestao-financeira-google-play/index.html',
  'portfolio/index.html',
  'blog/index.html',
  'servicos/desenvolvimento-de-aplicativos/index.html',
  'index.html'
];

files.forEach(file => {
  if (!fs.existsSync(file)) return;
  const content = fs.readFileSync(file, 'utf8');
  console.log(`\n=== FILE: ${file} ===`);
  const imgMatches = content.match(/<img[^>]+grana[^>]+>/gi) || [];
  imgMatches.forEach(img => {
    console.log('  IMG:', img.replace(/\s+/g, ' '));
  });
});
