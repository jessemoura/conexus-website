import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const blogDir = path.join(rootDir, 'blog');
const blogIndexPath = path.join(blogDir, 'index.html');

export function syncBlogCatalog() {
  console.log('[sync-blog-catalog] Iniciando verificação e sincronização do catálogo do blog...');

  if (!fs.existsSync(blogIndexPath)) {
    throw new Error(`[sync-blog-catalog] blog/index.html não encontrado em: ${blogIndexPath}`);
  }

  // 1. Identificar todos os artigos válidos existentes no disco
  const postEntries = fs.readdirSync(blogDir, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name)
    .filter(name => fs.existsSync(path.join(blogDir, name, 'index.html')));

  console.log(`[sync-blog-catalog] Total de diretórios de artigos detectados em /blog/: ${postEntries.length}`);

  let blogHtml = fs.readFileSync(blogIndexPath, 'utf8');

  // 2. Limpar qualquer conteúdo órfão acidental após </html>
  const htmlCloseIdx = blogHtml.indexOf('</html>');
  if (htmlCloseIdx !== -1) {
    const afterHtml = blogHtml.slice(htmlCloseIdx + '</html>'.length).trim();
    if (afterHtml.length > 0) {
      console.warn(`[sync-blog-catalog] Removendo ${afterHtml.length} caracteres de conteúdo órfão após </html>...`);
      blogHtml = blogHtml.slice(0, htmlCloseIdx + '</html>'.length).trim() + '\n';
    }
  }

  // 3. Extrair slugs já presentes no grid de artigos
  const gridMarker = '<div class="grid grid-3" id="blog-grid">';
  const gridStart = blogHtml.indexOf(gridMarker);
  if (gridStart === -1) {
    throw new Error('[sync-blog-catalog] Tag #blog-grid não encontrada no blog/index.html!');
  }

  const sectionEnd = blogHtml.indexOf('</section>', gridStart);
  if (sectionEnd === -1) {
    throw new Error('[sync-blog-catalog] Fechamento da section do grid não encontrado!');
  }

  const gridContent = blogHtml.slice(gridStart, sectionEnd);
  const cardRegex = /<article class="card blog-post-card"[^>]*>[\s\S]*?<\/article>/g;
  const existingCards = gridContent.match(cardRegex) || [];

  const existingSlugsInGrid = new Set();
  const slugRegex = /href="\/blog\/([^\/"]+)\/?"/g;
  let match;
  while ((match = slugRegex.exec(gridContent)) !== null) {
    existingSlugsInGrid.add(match[1]);
  }

  console.log(`[sync-blog-catalog] Cards existentes dentro do #blog-grid: ${existingCards.length}`);

  // 4. Identificar artigos que faltam no grid
  const missingSlugs = postEntries.filter(slug => !existingSlugsInGrid.has(slug));

  if (missingSlugs.length > 0) {
    console.warn(`[sync-blog-catalog] Artigos pendentes de incorporação no catálogo: ${missingSlugs.join(', ')}`);

    for (const slug of missingSlugs) {
      const postHtmlPath = path.join(blogDir, slug, 'index.html');
      const postHtml = fs.readFileSync(postHtmlPath, 'utf8');

      // Extrair metadados do post
      const titleMatch = postHtml.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i) || postHtml.match(/<title>([\s\S]*?)<\/title>/i);
      const rawTitle = titleMatch ? titleMatch[1].replace(/<[^>]+>/g, '').replace(/\s*\|\s*CONEXUS.*$/i, '').trim() : slug;

      const descMatch = postHtml.match(/<meta\s+name=["']description["']\s+content=["']([^"']+)["']/i);
      const rawDesc = descMatch ? descMatch[1].trim() : '';

      const badgeMatch = postHtml.match(/<span[^>]*class=["'][^"']*badge[^"']*["'][^>]*>([\s\S]*?)<\/span>/i);
      const rawBadge = badgeMatch ? badgeMatch[1].replace(/<[^>]+>/g, '').trim() : 'TECNOLOGIA';

      const readTimeMatch = postHtml.match(/(\d+\s*min(?:\s*de\s*leitura)?)/i);
      const rawReadTime = readTimeMatch ? readTimeMatch[1].trim() : '8 min de leitura';

      const imgMatch = postHtml.match(/<meta\s+property=["']og:image["']\s+content=["']([^"']+)["']/i) ||
                       postHtml.match(/<img[^>]+src=["']([^"']+)["'][^>]*class=["'][^"']*hero/i);
      let rawImg = imgMatch ? imgMatch[1].trim() : '/assets/images/marketing-digital-estrategia-conexus.webp';
      if (rawImg.startsWith('https://conexus.press')) {
        rawImg = rawImg.replace('https://conexus.press', '');
      }

      const dateMatch = postHtml.match(/(\d{2}\/\d{2}\/\d{4})/);
      const pubDate = dateMatch ? dateMatch[1] : '16/11/2026';

      const normSlug = 'blog_' + slug.replace(/-/g, '_');

      const newCardHtml = `          <!-- CARD: ${slug} -->
          <article class="card blog-post-card" data-category="websites business" style="display: flex; flex-direction: column; height: 100%;">
            <a href="/blog/${slug}/" aria-label="Ler artigo: ${rawTitle.replace(/"/g, '&quot;')}" class="case-cover-wrapper">
              <img src="${rawImg}" alt="${rawTitle.replace(/"/g, '&quot;')}" width="380" height="214" loading="lazy" class="case-cover-img">
            </a>
            <div style="display: flex; gap: 0.75rem; align-items: center; margin-bottom: 0.75rem;">
              <span class="badge" style="background: var(--color-cyan-glow); color: var(--color-cyan); font-size: 0.75rem; padding: 0.25rem 0.5rem; border-radius: var(--radius-sm);" data-i18n="${normSlug}_tag">${rawBadge}</span>
              <span style="font-size: 0.85rem; color: var(--color-text-muted);">${pubDate}</span>
              <span style="font-size: 0.85rem; color: var(--color-text-muted); margin-left: auto;" data-i18n="${normSlug}_readTime">${rawReadTime}</span>
            </div>
            <h3 class="card-title" style="font-size: 1.15rem; line-height: 1.4; margin-bottom: 0.75rem;">
              <a href="/blog/${slug}/" style="color: inherit; text-decoration: none;" data-i18n="${normSlug}_title">${rawTitle}</a>
            </h3>
            <p class="card-description" style="flex-grow: 1; font-size: 0.95rem; line-height: 1.6;" data-i18n="${normSlug}_desc">${rawDesc}</p>
            <div style="margin-top: 1.25rem;">
              <a href="/blog/${slug}/" class="btn btn-secondary" style="width: 100%; justify-content: center; text-align: center;">
                <span data-i18n="common.readArticle">Ler Artigo</span>
                <svg class="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="margin-left: 6px;"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </a>
            </div>
          </article>\n`;

      // Insere no topo do grid
      blogHtml = blogHtml.replace(gridMarker + '\n', gridMarker + '\n\n' + newCardHtml);
      console.log(`[sync-blog-catalog] Artigo "${slug}" inserido no topo do catálogo.`);
    }
  }

  // 5. Contar novamente o total de cards e atualizar o botão "Todos (N)"
  const updatedGridContent = blogHtml.slice(blogHtml.indexOf(gridMarker), blogHtml.indexOf('</section>', blogHtml.indexOf(gridMarker)));
  const finalCards = updatedGridContent.match(cardRegex) || [];
  const totalCount = finalCards.length;

  blogHtml = blogHtml.replace(
    /(<button class="filter-btn active" data-filter="all"[^>]*>)[^<]*(<\/button>)/,
    `$1Todos (${totalCount})$2`
  );

  fs.writeFileSync(blogIndexPath, blogHtml, 'utf8');
  console.log(`[sync-blog-catalog] Catálogo sincronizado com sucesso! Total verificado: ${totalCount} artigos.`);
  return totalCount;
}

// Execução direta via CLI
if (process.argv[1] === fileURLToPath(import.meta.url)) {
  syncBlogCatalog();
}
