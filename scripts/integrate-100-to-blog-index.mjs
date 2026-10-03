import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const posts = JSON.parse(fs.readFileSync(path.join(rootDir, 'scratch/posts_with_images_100.json'), 'utf8'));
const blogIndexPath = path.join(rootDir, 'blog/index.html');
let blogHtml = fs.readFileSync(blogIndexPath, 'utf8');

// Map post categories to filter categories:
function getCategoryTag(postNum, categoryStr) {
  if (postNum <= 20) return 'marketing';
  if (postNum <= 40) return 'websites';
  if (postNum <= 60) return 'seo';
  if (postNum <= 80) return 'business';
  return 'tech';
}

function escapeHtml(str) {
  if (!str) return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

let newCardsHtml = '          <!-- 100 NOVOS POSTS (LOTES 01 A 05) -->\n';

for (const post of posts) {
  const catFilter = getCategoryTag(post.post_number, post.category);
  const baseDay = 1 + (post.post_number % 28);
  const baseMonth = post.post_number <= 40 ? '08' : post.post_number <= 80 ? '09' : '10';
  const pubDateFormatted = `${String(baseDay).padStart(2, '0')}/${baseMonth}/2026`;
  const readTimeMin = Math.ceil(post.word_count / 220);
  
  newCardsHtml += `
          <!-- CARD: ${post.slug} -->
          <article class="card blog-post-card" data-category="${catFilter}" style="display: flex; flex-direction: column; height: 100%;">
            <a href="/blog/${post.slug}/" aria-label="Ler artigo: ${escapeHtml(post.h1)}">
              <img src="${post.image_path}" alt="${escapeHtml(post.image_alt)}" width="380" height="220" loading="lazy" style="border-radius: var(--radius-md); margin-bottom: 1.25rem; object-fit: cover; width: 100%; height: 220px; display: block;">
            </a>
            <div style="display: flex; gap: 0.75rem; align-items: center; margin-bottom: 0.75rem;">
              <span class="badge" style="background: var(--color-cyan-glow); color: var(--color-cyan); font-size: 0.75rem; padding: 0.25rem 0.5rem; border-radius: var(--radius-sm);">${escapeHtml(post.category)}</span>
              <span style="font-size: 0.85rem; color: var(--color-text-muted);">${pubDateFormatted}</span>
              <span style="font-size: 0.8rem; color: var(--color-text-muted); margin-left: auto;">${readTimeMin} min</span>
            </div>
            <h3 class="card-title" style="font-size: 1.15rem; line-height: 1.4; margin-bottom: 0.75rem;">
              <a href="/blog/${post.slug}/" style="color: inherit; text-decoration: none;">${escapeHtml(post.h1)}</a>
            </h3>
            <p class="card-description" style="flex-grow: 1; font-size: 0.95rem; line-height: 1.6;">${escapeHtml(post.meta_description)}</p>
            <div style="margin-top: 1.25rem;">
              <a href="/blog/${post.slug}/" class="btn btn-secondary" style="width: 100%; justify-content: center; text-align: center;">
                <span>Ler Artigo</span>
                <svg class="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="margin-left: 6px;"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </a>
            </div>
          </article>
`;
}

// Check if 100 posts block already exists to avoid duplicates
if (blogHtml.includes('<!-- 100 NOVOS POSTS (LOTES 01 A 05) -->')) {
  blogHtml = blogHtml.replace(/<!-- 100 NOVOS POSTS \(LOTES 01 A 05\) -->[\s\S]*?(?=<\/div>\s*<\/div>\s*<\/section>)/, newCardsHtml);
} else {
  // Inject right before the closing of #blog-grid (</div>\n      </div>\n    </section>)
  blogHtml = blogHtml.replace(/(<div class="grid grid-3" id="blog-grid">[\s\S]*?)(<\/div>\s*<\/div>\s*<\/section>)/, (match, p1, p2) => {
    return `${p1}\n${newCardsHtml}\n        ${p2}`;
  });
}

// Update filter count from "Todos (69)" to "Todos (169)"
blogHtml = blogHtml.replace(/Todos \(\d+\)/g, 'Todos (169)');

fs.writeFileSync(blogIndexPath, blogHtml, 'utf8');
console.log('✅ blog/index.html updated successfully with 100 new cards! (Total: 169 posts)');
