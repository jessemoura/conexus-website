import { defineConfig } from 'vite';
import path, { resolve, join } from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function getHtmlInputs(dir, base = '') {
  let entries = {};
  const items = fs.readdirSync(dir, { withFileTypes: true });
  for (const item of items) {
    if (item.name === 'node_modules' || item.name === '.git' || item.name === 'dist' || item.name === 'HOSTINGER-FINAL' || item.name === 'scratch') continue;
    const fullPath = join(dir, item.name);
    const relPath = base ? `${base}/${item.name}` : item.name;
    if (item.isDirectory()) {
      Object.assign(entries, getHtmlInputs(fullPath, relPath));
    } else if (item.name.endsWith('.html')) {
      let key = relPath.replace(/\.html$/, '').replace(/[\/\\]index$/, '').replace(/[\/\\]/g, '_');
      if (!key) key = 'main';
      entries[key] = fullPath;
    }
  }
  return entries;
}

export default defineConfig({
  root: './',
  publicDir: 'public',
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: getHtmlInputs(__dirname),
      output: {
        manualChunks(id) {
          if (id.includes('src/i18n/pt.js') || id.includes('src\\i18n\\pt.js')) return 'i18n-pt';
          if (id.includes('src/i18n/en.js') || id.includes('src\\i18n\\en.js')) return 'i18n-en';
          if (id.includes('src/i18n/es.js') || id.includes('src\\i18n\\es.js')) return 'i18n-es';
          if (id.includes('src/js/cookieConsent.js') || id.includes('src\\js\\cookieConsent.js')) return 'cookieConsent';
        }
      }
    }
  },
  server: {
    port: 3000,
    open: true
  }
});
