const fs = require('fs');

const html = fs.readFileSync('blog/index.html', 'utf8');
const cardRegex = /<article[\s\S]*?<\/article>/g;
const cards = html.match(cardRegex) || [];

console.log(`Found ${cards.length} cards in blog/index.html`);

const cardInventory = [];

cards.forEach((card, idx) => {
  const linkMatch = card.match(/href="(\/blog\/[^\/"]+\/)"/);
  const link = linkMatch ? linkMatch[1] : '';
  const slug = link ? link.replace('/blog/', '').replace('/', '') : `card_${idx}`;

  const titleMatch = card.match(/<h3[^>]*>([\s\S]*?)<\/h3>/);
  const rawTitle = titleMatch ? titleMatch[1].replace(/<[^>]+>/g, '').trim() : '';

  const titleI18n = titleMatch && titleMatch[1].match(/data-i18n="([^"]+)"/);
  const titleKey = titleI18n ? titleI18n[1] : null;

  const descMatch = card.match(/<p[^>]*class="[^"]*card-description[^"]*"[^>]*>([\s\S]*?)<\/p>/);
  const rawDesc = descMatch ? descMatch[1].replace(/<[^>]+>/g, '').trim() : '';
  const descI18n = descMatch && descMatch[0].match(/data-i18n="([^"]+)"/);
  const descKey = descI18n ? descI18n[1] : null;

  const badgeMatch = card.match(/<span[^>]*class="badge"[^>]*>([\s\S]*?)<\/span>/);
  const rawBadge = badgeMatch ? badgeMatch[1].replace(/<[^>]+>/g, '').trim() : '';
  const badgeI18n = badgeMatch && badgeMatch[0].match(/data-i18n="([^"]+)"/);
  const badgeKey = badgeI18n ? badgeI18n[1] : null;

  const timeMatch = card.match(/<span[^>]*margin-left:\s*auto;?[^>]*>([\s\S]*?)<\/span>/);
  const rawTime = timeMatch ? timeMatch[1].replace(/<[^>]+>/g, '').trim() : '';
  const timeI18n = timeMatch && timeMatch[0].match(/data-i18n="([^"]+)"/);
  const timeKey = timeI18n ? timeI18n[1] : null;

  cardInventory.push({
    idx,
    slug,
    link,
    rawBadge,
    badgeKey,
    rawTime,
    timeKey,
    rawTitle,
    titleKey,
    rawDesc,
    descKey
  });
});

fs.writeFileSync('scripts/card-inventory.json', JSON.stringify(cardInventory, null, 2), 'utf8');
console.log('Saved card inventory to scripts/card-inventory.json');

// Stats
const missingTitle = cardInventory.filter(c => !c.titleKey).length;
const missingDesc = cardInventory.filter(c => !c.descKey).length;
const missingBadge = cardInventory.filter(c => !c.badgeKey).length;
const missingTime = cardInventory.filter(c => !c.timeKey).length;

console.log(`Missing titleKey: ${missingTitle}`);
console.log(`Missing descKey: ${missingDesc}`);
console.log(`Missing badgeKey: ${missingBadge}`);
console.log(`Missing timeKey: ${missingTime}`);
