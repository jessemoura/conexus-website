const fs = require('fs');
const pt = require('../src/i18n/pt.js').pt;
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
let cardsWithEsMissing = 0;
let cardsWithEsEqualPt = 0;
let cardsFullyWorkingEs = 0;

const issues = [];

cards.forEach((card, idx) => {
  const linkMatch = card.match(/href="(\/blog\/[^"]+)"/);
  const link = linkMatch ? linkMatch[1] : `Card #${idx}`;
  
  const titleTagMatch = card.match(/<h3[^>]*>([\s\S]*?)<\/h3>/);
  const titleHtml = titleTagMatch ? titleTagMatch[1] : '';
  const titleI18nMatch = titleHtml.match(/data-i18n="([^"]+)"/);
  const titleKey = titleI18nMatch ? titleI18nMatch[1] : null;

  const descTagMatch = card.match(/<p[^>]*class="[^"]*card-description[^"]*"[^>]*>([\s\S]*?)<\/p>/);
  const descTag = descTagMatch ? descTagMatch[0] : '';
  const descI18nMatch = descTag.match(/data-i18n="([^"]+)"/);
  const descKey = descI18nMatch ? descI18nMatch[1] : null;

  let issue = { link, idx };
  let hasIssue = false;

  if (!titleKey) {
    cardsWithoutTitleI18n++;
    issue.noTitleI18n = true;
    hasIssue = true;
  }
  if (!descKey) {
    cardsWithoutDescI18n++;
    issue.noDescI18n = true;
    hasIssue = true;
  }

  if (titleKey && descKey) {
    const ptTitle = getTranslation(titleKey, pt);
    const esTitle = getTranslation(titleKey, es);
    const ptDesc = getTranslation(descKey, pt);
    const esDesc = getTranslation(descKey, es);

    if (!esTitle || !esDesc) {
      cardsWithEsMissing++;
      issue.esMissing = { titleKey, esTitle, descKey, esDesc };
      hasIssue = true;
    } else if (ptTitle === esTitle && ptTitle && ptTitle.length > 5) {
      cardsWithEsEqualPt++;
      issue.esTitleEqualPt = { titleKey, ptTitle, esTitle };
      hasIssue = true;
    } else {
      cardsFullyWorkingEs++;
    }
  }

  if (hasIssue) {
    issues.push(issue);
  }
});

console.log(`\n=== BLOG/INDEX.HTML CARDS ES AUDIT RESULTS ===`);
console.log(`Total Cards: ${totalCards}`);
console.log(`Fully Working in ES: ${cardsFullyWorkingEs}`);
console.log(`Cards WITHOUT Title data-i18n: ${cardsWithoutTitleI18n}`);
console.log(`Cards WITHOUT Desc data-i18n: ${cardsWithoutDescI18n}`);
console.log(`Cards where ES translation is MISSING: ${cardsWithEsMissing}`);
console.log(`Cards where ES translation is EQUAL TO PT: ${cardsWithEsEqualPt}`);
console.log(`\nSample Issues (first 10):`, JSON.stringify(issues.slice(0, 10), null, 2));
