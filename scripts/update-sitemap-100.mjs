import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const posts = JSON.parse(fs.readFileSync(path.join(rootDir, 'scratch/posts_with_images_100.json'), 'utf8'));
const sitemapPath = path.join(rootDir, 'sitemap.xml');
const publicSitemapPath = path.join(rootDir, 'public/sitemap.xml');

let sitemap = fs.readFileSync(sitemapPath, 'utf8');

// Check which posts are not yet in sitemap
let addedCount = 0;
let newEntries = '';

for (const post of posts) {
  const url = `https://www.conexus.press/blog/${post.slug}/`;
  if (!sitemap.includes(`<loc>${url}</loc>`)) {
    const baseDay = 1 + (post.post_number % 28);
    const baseMonth = post.post_number <= 40 ? '08' : post.post_number <= 80 ? '09' : '10';
    const pubDateIso = `2026-${baseMonth}-${String(baseDay).padStart(2, '0')}`;
    
    newEntries += `  <url>
    <loc>${url}</loc>
    <lastmod>${pubDateIso}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>\n`;
    addedCount++;
  }
}

if (addedCount > 0) {
  sitemap = sitemap.replace('</urlset>', `${newEntries}</urlset>`);
  fs.writeFileSync(sitemapPath, sitemap, 'utf8');
  if (fs.existsSync(publicSitemapPath)) {
    fs.writeFileSync(publicSitemapPath, sitemap, 'utf8');
  }
  console.log(`✅ Added ${addedCount} new URLs to sitemap.xml!`);
} else {
  console.log(`All 100 posts already present in sitemap.xml.`);
}
