import fs from 'fs';

const articleFiles = [
  'blog/como-colocar-empresa-no-google-sao-jose-dos-pinhais/index.html',
  'blog/como-usar-site-para-atrair-clientes-google/index.html',
  'blog/conexus-guest-hub-guia-digital-para-hospedagens/index.html',
  'blog/importancia-hospedagem-de-qualidade/index.html',
  'blog/marketing-digital-para-empresas/index.html',
  'blog/por-que-sua-empresa-precisa-de-um-site/index.html',
  'blog/quanto-custa-site-profissional-2026/index.html',
  'blog/redes-sociais-para-empresas/index.html'
];

for (const file of articleFiles) {
  let content = fs.readFileSync(file, 'utf-8');
  const original = content;
  // Remove data-i18n-html="articlesBody.xxx" from <article ...>
  content = content.replace(/<article([^>]*)\s+data-i18n-html=["']articlesBody\.[^"']+["']([^>]*)>/g, '<article$1$2>');
  if (content !== original) {
    fs.writeFileSync(file, content, 'utf-8');
    console.log(`✅ Removed articlesBody data-i18n-html from ${file}`);
  } else {
    console.log(`ℹ️ No articlesBody data-i18n-html found in ${file}`);
  }
}
