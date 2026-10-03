import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const brainDir = 'C:/Users/Jesse/.gemini/antigravity-ide/brain/2733a1f4-5d24-4acf-b2ef-6cf48e8993cd';

const images = [
  { prefix: 'criacao_sites_conexus', name: 'criacao-sites-conexus.webp' },
  { prefix: 'site_one_page_conexus', name: 'site-one-page-conexus.webp' },
  { prefix: 'seo_conexus', name: 'seo-conexus.webp' },
  { prefix: 'seo_local_google', name: 'seo-local-empresa-google.webp' },
  { prefix: 'branding_identidade_visual', name: 'branding-identidade-visual-conexus.webp' },
  { prefix: 'social_media_conteudo', name: 'social-media-conteudo-conexus.webp' },
  { prefix: 'marketing_digital_equipe', name: 'marketing-digital-estrategia-conexus.webp' }
];

async function processImages() {
  const brainFiles = fs.readdirSync(brainDir);
  for (const item of images) {
    const matched = brainFiles.find(f => f.startsWith(item.prefix) && f.endsWith('.jpg'));
    if (!matched) {
      console.error('File not found for:', item.prefix);
      continue;
    }
    const srcPath = path.join(brainDir, matched);
    const dest1 = path.join('assets/images', item.name);
    const dest2 = path.join('public/assets/images', item.name);

    await sharp(srcPath)
      .resize(1200, 675, { fit: 'cover' })
      .webp({ quality: 82 })
      .toFile(dest1);

    await sharp(srcPath)
      .resize(1200, 675, { fit: 'cover' })
      .webp({ quality: 82 })
      .toFile(dest2);

    const stat = fs.statSync(dest1);
    console.log(`Processed ${item.name}: ${(stat.size / 1024).toFixed(1)} KB`);
  }
}

processImages().then(() => console.log('All images converted to WebP successfully!'));
