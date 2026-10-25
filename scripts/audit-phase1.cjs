const fs = require('fs');
const path = require('path');

// 1. Audit blog/index.html cards
const blogHtml = fs.readFileSync('blog/index.html', 'utf8');
const cardRegex = /<article[\s\S]*?<\/article>/g;
const allArticles = blogHtml.match(cardRegex) || [];
console.log('Total articles found in blog/index.html:', allArticles.length);

let withDataI18n = 0;
let withoutDataI18n = 0;
const cardsWithoutI18n = [];

allArticles.forEach((card, idx) => {
  const hasI18n = card.includes('data-i18n="') || card.includes('data-i18n-html="');
  const titleMatch = card.match(/<h3[^>]*>([\s\S]*?)<\/h3>/);
  const titleText = titleMatch ? titleMatch[1].replace(/<[^>]+>/g, '').trim() : 'No title';
  const linkMatch = card.match(/href="([^"]+)"/);
  const link = linkMatch ? linkMatch[1] : '';

  if (hasI18n) {
    withDataI18n++;
  } else {
    withoutDataI18n++;
    if (cardsWithoutI18n.length < 15) {
      cardsWithoutI18n.push({ idx, link, titleText });
    }
  }
});

console.log(`Cards with data-i18n: ${withDataI18n}`);
console.log(`Cards without data-i18n: ${withoutDataI18n}`);
console.log('Sample cards without i18n:', cardsWithoutI18n);
