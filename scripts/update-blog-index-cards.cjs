const fs = require('fs');

const caseSlugToKey = {
  'case-atthos-comex-site-institucional-comercio-exterior': 'blog_caseAtthosComex',
  'case-di-piallato-presenca-digital-gelateria-artesanal': 'blog_caseDiPiallato',
  'case-soquindins-presenca-digital-confeitaria-tradicional-curitiba': 'blog_caseSoquindins',
  'case-michelly-correa-website-autoridade-comunicacao-jornalismo': 'blog_caseMichellyCorrea',
  'case-little-pet-presenca-digital-pet-shop-estetica-animal': 'blog_caseLittlePet',
  'case-fast-guincho-conversao-emergencial-seo-local-curitiba': 'blog_caseFastGuincho',
  'case-nikki-studio-identidade-visual-plataforma-estetica-uk': 'blog_caseNikkiStudio',
  'case-lumora-cleaning-services-plataforma-orcamentos-limpeza-uk': 'blog_caseLumoraCleaning',
  'case-sos-aberturas-arquitetura-conversao-emergencial-portugal': 'blog_caseSosAberturas',
  'solucao-welcome-book-digital-experiencia-do-hospede-anfitrioes': 'blog_solucaoWelcomeBook'
};

function run() {
  let html = fs.readFileSync('blog/index.html', 'utf8');

  // Split into articles and rebuild
  const cardRegex = /<article[\s\S]*?<\/article>/g;
  let count = 0;

  const newHtml = html.replace(cardRegex, (cardHtml) => {
    count++;
    let updated = cardHtml;

    // 1. Get slug
    const linkMatch = updated.match(/href="\/blog\/([^\/"]+)\/?"/);
    const slug = linkMatch ? linkMatch[1] : '';
    const normSlug = 'blog_' + slug.replace(/-/g, '_');

    // 2. Determine badge key
    let badgeKey = null;
    if (caseSlugToKey[slug]) {
      badgeKey = `${caseSlugToKey[slug]}_category`;
    } else if (slug === 'case-grana-aplicativo-gestao-financeira-google-play') {
      badgeKey = 'blog.granaBadge';
    } else if (slug === 'curitipao-2026-festival-panificacao-curitiba') {
      badgeKey = 'autoContent.blog.curitipaoCardBadge';
    } else if (updated.includes('class="badge"')) {
      const existingBadgeI18n = updated.match(/<span[^>]*class="badge"[^>]*data-i18n="([^"]+)"/);
      if (existingBadgeI18n) {
        badgeKey = existingBadgeI18n[1];
      } else {
        badgeKey = `autoContent.${normSlug}.k1`;
      }
    }

    if (badgeKey) {
      updated = updated.replace(/<span([^>]*)class="badge"([^>]*)>([\s\S]*?)<\/span>/, (m, p1, p2, inner) => {
        if (m.includes('data-i18n=')) {
          return m.replace(/data-i18n="[^"]+"/, `data-i18n="${badgeKey}"`);
        }
        return `<span${p1}class="badge"${p2} data-i18n="${badgeKey}">${inner}</span>`;
      });
    }

    // 3. Determine time key
    const timeMatch = updated.match(/<span[^>]*margin-left:\s*auto;?[^>]*>([\s\S]*?)<\/span>/);
    if (timeMatch) {
      const rawText = timeMatch[1].replace(/<[^>]+>/g, '').trim();
      const numMatch = rawText.match(/\d+/);
      const mins = numMatch ? numMatch[0] : '8';
      const timeKey = (slug === 'curitipao-2026-festival-panificacao-curitiba') 
        ? 'autoContent.blog.curitipaoCardReadTime' 
        : `common.readTime${mins}`;

      updated = updated.replace(/<span([^>]*margin-left:\s*auto;?[^>]*)>([\s\S]*?)<\/span>/, (m, p1) => {
        return `<span style="font-size: 0.85rem; color: var(--color-text-muted); margin-left: auto;" data-i18n="${timeKey}">${mins} min de leitura</span>`;
      });
    }

    // 4. Determine title key
    let titleKey = null;
    if (caseSlugToKey[slug]) {
      titleKey = `${caseSlugToKey[slug]}_title`;
    } else if (slug === 'case-grana-aplicativo-gestao-financeira-google-play') {
      titleKey = 'blog.granaTitle';
    } else if (slug === 'curitipao-2026-festival-panificacao-curitiba') {
      titleKey = 'autoContent.blog.curitipaoCardTitle';
    } else {
      const existingTitleI18n = updated.match(/<h3[^>]*>[\s\S]*?data-i18n="([^"]+)"/);
      if (existingTitleI18n) {
        titleKey = existingTitleI18n[1];
      } else {
        titleKey = `autoContent.${normSlug}.k3`;
      }
    }

    if (titleKey) {
      updated = updated.replace(/<h3([^>]*)>([\s\S]*?)<\/h3>/, (m, p1, inner) => {
        if (m.includes('data-i18n=')) {
          return m.replace(/data-i18n="[^"]+"/, `data-i18n="${titleKey}"`);
        }
        return `<h3${p1}><a href="/blog/${slug}/" data-i18n="${titleKey}">${inner.replace(/<[^>]+>/g, '').trim()}</a></h3>`;
      });
    }

    // 5. Determine desc key
    let descKey = null;
    if (caseSlugToKey[slug]) {
      descKey = `${caseSlugToKey[slug]}_desc`;
    } else if (slug === 'case-grana-aplicativo-gestao-financeira-google-play') {
      descKey = 'blog.granaDesc';
    } else if (slug === 'curitipao-2026-festival-panificacao-curitiba') {
      descKey = 'autoContent.blog.curitipaoCardDesc';
    } else {
      const existingDescI18n = updated.match(/<p[^>]*class="[^"]*card-description[^"]*"[^>]*data-i18n="([^"]+)"/);
      if (existingDescI18n) {
        descKey = existingDescI18n[1];
      } else {
        descKey = `autoContent.${normSlug}.k4`;
      }
    }

    if (descKey) {
      updated = updated.replace(/<p([^>]*)class="([^"]*card-description[^"]*)"([^>]*)>([\s\S]*?)<\/p>/, (m, p1, cls, p2, inner) => {
        if (m.includes('data-i18n=')) {
          return m.replace(/data-i18n="[^"]+"/, `data-i18n="${descKey}"`);
        }
        return `<p${p1}class="${cls}"${p2} data-i18n="${descKey}">${inner.trim()}</p>`;
      });
    }

    // 6. Button
    if (updated.includes('Ler Artigo')) {
      updated = updated.replace(/<span([^>]*)>Ler Artigo<\/span>/, '<span$1 data-i18n="common.readArticle">Ler Artigo</span>');
      updated = updated.replace(/Ler Artigo\s*→/, '<span data-i18n="common.readArticle">Ler Artigo</span> →');
    }
    if (updated.includes('Ver Case Completo')) {
      updated = updated.replace(/Ver Case Completo\s*→/, '<span data-i18n="portfolio.viewCase">Ver Case Completo</span> →');
    }

    return updated;
  });

  fs.writeFileSync('blog/index.html', newHtml, 'utf8');
  console.log(`Successfully updated ${count} cards in blog/index.html`);
}

run();
