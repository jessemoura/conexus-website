const fs = require('fs');

const cases = [
  'atthos-comex',
  'curitipao',
  'fast-guincho',
  'soquindins'
];

cases.forEach(c => {
  const file = `portfolio/${c}/index.html`;
  const html = fs.readFileSync(file, 'utf8');
  const mainMatch = html.match(/<main[\s\S]*?<\/main>/);
  if (!mainMatch) {
    console.log(`No <main> in ${file}`);
    return;
  }
  const main = mainMatch[0];
  const h1 = (main.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i) || [])[1] || '';
  const heroSub = (main.match(/<p class="hero-subtitle"[^>]*>([\s\S]*?)<\/p>/i) || [])[1] || '';
  const badge = (main.match(/<span class="badge"[^>]*>([\s\S]*?)<\/span>/i) || [])[1] || '';
  
  console.log(`\n================== ${c} ==================`);
  console.log('Badge:', badge.replace(/<[^>]+>/g, '').trim());
  console.log('H1:', h1.replace(/<[^>]+>/g, '').trim());
  console.log('HeroSub:', heroSub.replace(/<[^>]+>/g, '').trim());

  const h2s = (main.match(/<h2[^>]*>([\s\S]*?)<\/h2>/gi) || []).map(h => h.replace(/<[^>]+>/g, '').trim());
  console.log('H2s:', h2s);
});
