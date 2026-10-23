import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const SITEMAP_ROOT = path.join(rootDir, 'sitemap.xml');
const SITEMAP_PUBLIC = path.join(rootDir, 'public/sitemap.xml');
const SITEMAP_HOSTINGER = path.join(rootDir, 'HOSTINGER-FINAL/sitemap.xml');

// 1. Gather all existing sitemap entries
const existingEntries = new Map();
if (fs.existsSync(SITEMAP_ROOT)) {
  const content = fs.readFileSync(SITEMAP_ROOT, 'utf8');
  const urlBlockRegex = /<url>([\s\S]*?)<\/url>/g;
  let match;
  while ((match = urlBlockRegex.exec(content)) !== null) {
    const block = match[1];
    const locMatch = block.match(/<loc>(https:\/\/www\.conexus\.press\/[^<]*)<\/loc>/);
    if (locMatch) {
      const loc = locMatch[1];
      const lastmodMatch = block.match(/<lastmod>([^<]+)<\/lastmod>/);
      const changefreqMatch = block.match(/<changefreq>([^<]+)<\/changefreq>/);
      const priorityMatch = block.match(/<priority>([^<]+)<\/priority>/);
      existingEntries.set(loc, {
        loc,
        lastmod: lastmodMatch ? lastmodMatch[1] : new Date().toISOString().split('T')[0],
        changefreq: changefreqMatch ? changefreqMatch[1] : 'monthly',
        priority: priorityMatch ? priorityMatch[1] : '0.7'
      });
    }
  }
}

// 2. Scan all public HTML files
function getHtmlFiles(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  for (const file of list) {
    if (['node_modules', '.git', 'dist', 'HOSTINGER-FINAL', 'scratch', 'public'].includes(file)) continue;
    const full = path.join(dir, file);
    const stat = fs.statSync(full);
    if (stat.isDirectory()) {
      results = results.concat(getHtmlFiles(full));
    } else if (file.endsWith('.html')) {
      results.push(full);
    }
  }
  return results;
}

const allHtmlFiles = getHtmlFiles(rootDir);
const publicFiles = allHtmlFiles.filter(f => !path.basename(f).startsWith('preview-'));

// Determine route priority & frequency defaults
function getRouteMetadata(urlPath) {
  if (urlPath === 'https://www.conexus.press/') {
    return { priority: '1.0', changefreq: 'weekly' };
  }
  if (urlPath === 'https://www.conexus.press/servicos/') {
    return { priority: '0.9', changefreq: 'monthly' };
  }
  if (urlPath.startsWith('https://www.conexus.press/servicos/')) {
    return { priority: '0.9', changefreq: 'monthly' };
  }
  if (urlPath === 'https://www.conexus.press/blog/') {
    return { priority: '0.85', changefreq: 'weekly' };
  }
  if (urlPath === 'https://www.conexus.press/portfolio/') {
    return { priority: '0.85', changefreq: 'monthly' };
  }
  if (urlPath.startsWith('https://www.conexus.press/portfolio/')) {
    return { priority: '0.8', changefreq: 'monthly' };
  }
  if (urlPath.startsWith('https://www.conexus.press/blog/case-') || urlPath.includes('curitipao-2026')) {
    return { priority: '0.8', changefreq: 'monthly' };
  }
  if (urlPath === 'https://www.conexus.press/sobre/' || urlPath === 'https://www.conexus.press/contato/') {
    return { priority: '0.8', changefreq: 'monthly' };
  }
  if (urlPath.startsWith('https://www.conexus.press/blog/')) {
    return { priority: '0.7', changefreq: 'monthly' };
  }
  if (urlPath.includes('politica-de-privacidade')) {
    return { priority: '0.5', changefreq: 'monthly' };
  }
  return { priority: '0.7', changefreq: 'monthly' };
}

const todayIso = new Date().toISOString().split('T')[0];
const targetEntries = [];

for (const filePath of publicFiles) {
  const rel = path.relative(rootDir, filePath).replace(/\\/g, '/');
  let url = 'https://www.conexus.press/';
  if (rel === 'index.html') {
    url = 'https://www.conexus.press/';
  } else if (rel.endsWith('/index.html')) {
    url = 'https://www.conexus.press/' + rel.replace(/\/index\.html$/, '/');
  } else {
    url = 'https://www.conexus.press/' + rel;
  }

  const existing = existingEntries.get(url);
  const defaults = getRouteMetadata(url);

  targetEntries.push({
    loc: url,
    lastmod: existing ? existing.lastmod : todayIso,
    changefreq: existing ? existing.changefreq : defaults.changefreq,
    priority: existing ? existing.priority : defaults.priority
  });
}

// Sort alphabetically, with home first
targetEntries.sort((a, b) => {
  if (a.loc === 'https://www.conexus.press/') return -1;
  if (b.loc === 'https://www.conexus.press/') return 1;
  return a.loc.localeCompare(b.loc);
});

// Build XML
let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';
for (const entry of targetEntries) {
  xml += '  <url>\n';
  xml += `    <loc>${entry.loc}</loc>\n`;
  xml += `    <lastmod>${entry.lastmod}</lastmod>\n`;
  xml += `    <changefreq>${entry.changefreq}</changefreq>\n`;
  xml += `    <priority>${entry.priority}</priority>\n`;
  xml += '  </url>\n';
}
xml += '</urlset>\n';

// Write files
fs.writeFileSync(SITEMAP_ROOT, xml, 'utf8');
if (fs.existsSync(path.dirname(SITEMAP_PUBLIC))) {
  fs.writeFileSync(SITEMAP_PUBLIC, xml, 'utf8');
}
if (fs.existsSync(path.dirname(SITEMAP_HOSTINGER))) {
  fs.writeFileSync(SITEMAP_HOSTINGER, xml, 'utf8');
}

console.log(`✅ Automated sitemap generation complete!`);
console.log(`   Total URLs: ${targetEntries.length}`);
console.log(`   Synchronized in: root, public/, and HOSTINGER-FINAL/`);
