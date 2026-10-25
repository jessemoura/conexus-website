const fs = require('fs');
const pt = require('../src/i18n/pt.js').pt;
const en = require('../src/i18n/en.js').en;
const es = require('../src/i18n/es.js').es;

function getTranslation(key, langObj) {
  if (!key || typeof key !== 'string') return null;
  const keys = key.split('.');
  let result = langObj;
  for (const k of keys) {
    if (result && typeof result === 'object' && k in result) {
      result = result[k];
    } else {
      return null;
    }
  }
  return typeof result === 'string' ? result : null;
}

const html = fs.readFileSync('blog/index.html', 'utf8');
const cardRegex = /<article[\s\S]*?<\/article>/g;
const cards = html.match(cardRegex) || [];

console.log(`Total cards found in blog/index.html: ${cards.length}`);

let totalCards = cards.length;
let cardsWithoutTitleI18n = 0;
let cardsWithoutDescI18n = 0;
let cardsWithEnMissing = 0;
let cardsWithEnEqualPt = 0;
let cardsFullyWorkingEn = 0;

const issues = [];

cards.forEach((card, idx) => {
  const linkMatch = card.match(/href="(\/blog\/[^"]+)"/);
  const link = linkMatch ? linkMatch[1] : `Card #${idx}`;
  
  // Title
  const titleTagMatch = card.match(/<h3[^>]*>([\s\S]*?)<\/h3>/);
  const titleHtml = titleTagMatch ? titleTagMatch[1] : '';
  const titleI18nMatch = titleHtml.match(/data-i18n="([^"]+)"/);
  const titleKey = titleI18nMatch ? titleI18nMatch[1] : null;

  // Desc
  const descTagMatch = card.match(/<p[^>]*class="[^"]*card-description[^"]*"[^>]*>([\s\S]*?)<\/p>/);
  const descTag = descTagMatch ? descTagMatch[0] : '';
  const descI18nMatch = descTag.match(/data-i18n="([^"]+)"/);
  const descKey = descI18nMatch ? descI18nMatch[1] : null;

  // Badge
  const badgeMatch = card.match(/<span[^>]*class="badge"[^>]*>([\s\S]*?)<\/span>/);
  const badgeTag = badgeMatch ? badgeMatch[0] : '';
  const badgeI18nMatch = badgeTag.match(/data-i18n="([^"]+)"/);
  const badgeKey = badgeI18nMatch ? badgeI18nMatch[1] : null;

  let issue = { link, idx };
  let hasIssue = false;

  if (!titleKey) {
    cardsWithoutTitleI18n++;
    issue.missingTitleKey = true;
    hasIssue = true;
  } else {
    const ptTitle = getTranslation(titleKey, pt);
    const enTitle = getTranslation(titleKey, en);
    if (!enTitle) {
      cardsWithEnMissing++;
      issue.enTitleMissing = titleKey;
      hasIssue = true;
    } else if (enTitle === ptTitle && ptTitle.length > 10) {
      cardsWithEnEqualPt++;
      issue.enTitleEqualPt = { titleKey, ptTitle, enTitle };
      hasIssue = true;
    }
  }

  if (!descKey) {
    cardsWithoutDescI18n++;
    issue.missingDescKey = true;
    hasIssue = true;
  }

  if (!hasIssue) {
    cardsFullyWorkingEn++;
  } else {
    issues.push(issue);
  }
});

console.log('\n=== BLOG/INDEX.HTML CARDS AUDIT RESULTS ===');
console.log(`Total Cards: ${totalCards}`);
console.log(`Fully Working in EN: ${cardsFullyWorkingEn}`);
console.log(`Cards WITHOUT Title data-i18n: ${cardsWithoutTitleI18n}`);
console.log(`Cards WITHOUT Desc data-i18n: ${cardsWithoutDescI18n}`);
console.log(`Cards where EN translation is MISSING: ${cardsWithEnMissing}`);
console.log(`Cards where EN translation is EQUAL TO PT: ${cardsWithEnEqualPt}`);
console.log('\nSample Issues (first 10):', JSON.stringify(issues.slice(0, 10), null, 2));
