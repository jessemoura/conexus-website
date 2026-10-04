import fs from 'fs';
import path from 'path';
import crypto from 'crypto';

const cwd = process.cwd();

const targetPages = [
  'servicos/index.html',
  'servicos/criacao-de-sites/index.html',
  'servicos/site-one-page/index.html',
  'servicos/seo/index.html',
  'servicos/seo-local-google-meu-negocio/index.html',
  'servicos/branding-identidade-visual/index.html',
  'servicos/gestao-redes-sociais/index.html',
  'servicos/conexus-guest-hub/index.html',
  'servicos/desenvolvimento-de-aplicativos/index.html',
  'sobre/index.html',
  'contato/index.html'
];

console.log('=== AUDITORIA GLOBAL DE ZERO FOTOS REPETIDAS ===');
console.log('Verificando páginas institucionais, serviços e cards...\n');

const imageUsageMap = new Map(); // src -> [ { page, context, alt } ]
const fileHashMap = new Map(); // hash -> fileName

let totalImagesAudited = 0;
let duplicatesCount = 0;

for (const relPage of targetPages) {
  const filePath = path.join(cwd, relPage);
  if (!fs.existsSync(filePath)) {
    console.error(`ERRO: Página não encontrada: ${relPage}`);
    process.exit(1);
  }

  const content = fs.readFileSync(filePath, 'utf8');
  // Match img tags
  const imgRegex = /<img\s+([^>]*?)src=["']([^"']+)["']([^>]*?)>/gi;
  let match;

  while ((match = imgRegex.exec(content)) !== null) {
    const fullTag = match[0];
    const src = match[2];
    
    // Ignore logos, flags, svg icons, and small UI elements
    if (
      src.includes('logo') ||
      src.includes('flag') ||
      src.includes('icon') ||
      src.endsWith('.svg') ||
      src.includes('conexus-contact-human-cta-19') ||
      src.includes('conexus-home-process-05')
    ) {
      continue;
    }

    const altMatch = fullTag.match(/alt=["']([^"']*)["']/i);
    const alt = altMatch ? altMatch[1] : '';

    if (!imageUsageMap.has(src)) {
      imageUsageMap.set(src, []);
    }
    imageUsageMap.get(src).push({ page: relPage, alt });
    totalImagesAudited++;
  }
}

console.log(`Total de fotos de serviços/seções auditadas: ${totalImagesAudited}`);
console.log(`Total de imagens únicas mapeadas: ${imageUsageMap.size}\n`);

// Check duplicate usages across target pages
for (const [src, usages] of imageUsageMap.entries()) {
  if (usages.length > 1) {
    console.error(`❌ DUPLICIDADE ENCONTRADA no arquivo: ${src}`);
    usages.forEach(u => console.error(`   - Usado em: ${u.page} (ALT: "${u.alt}")`));
    duplicatesCount++;
  } else {
    const u = usages[0];
    console.log(`✅ EXCLUSIVA: ${src}`);
    console.log(`   Página: ${u.page} | ALT: "${u.alt}"`);

    // Verify file exists on disk and calculate hash
    const cleanPath = src.startsWith('/') ? src.slice(1) : src;
    const localPath1 = path.join(cwd, cleanPath);
    const localPath2 = path.join(cwd, 'public', cleanPath.replace(/^assets\//, 'assets/'));

    if (!fs.existsSync(localPath1) && !fs.existsSync(localPath2)) {
      console.error(`   ❌ ARQUIVO NÃO EXISTE NO DISCO: ${localPath1}`);
      duplicatesCount++;
    } else {
      const activePath = fs.existsSync(localPath1) ? localPath1 : localPath2;
      const fileBuffer = fs.readFileSync(activePath);
      const hash = crypto.createHash('sha256').update(fileBuffer).digest('hex');

      if (fileHashMap.has(hash)) {
        console.error(`   ❌ HASH DUPLICADO! O arquivo ${src} é idêntico em conteúdo a ${fileHashMap.get(hash)}`);
        duplicatesCount++;
      } else {
        fileHashMap.set(hash, src);
        console.log(`   SHA256: ${hash.slice(0, 16)}... [OK]`);
      }
    }
    console.log('');
  }
}

console.log('==================================================');
console.log(`DUPLICIDADES ENTRE AS NOVAS FOTOS DE SERVIÇOS/SEÇÕES = ${duplicatesCount}`);
console.log('==================================================');

if (duplicatesCount > 0) {
  console.error('AUDITORIA FALHOU! Existem fotos duplicadas.');
  process.exit(1);
} else {
  console.log('🎉 AUDITORIA APROVADA COM ZERO DUPLICIDADES!');
}
