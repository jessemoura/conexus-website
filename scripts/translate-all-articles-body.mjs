import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..');

const articleSlugs = [
  { slug: 'como-colocar-empresa-no-google-sao-jose-dos-pinhais', key: 'seoLocalSaoJose' },
  { slug: 'como-usar-site-para-atrair-clientes-google', key: 'comoUsarGoogle' },
  { slug: 'conexus-guest-hub-guia-digital-para-hospedagens', key: 'guestHubArtigo' },
  { slug: 'importancia-hospedagem-de-qualidade', key: 'hospedagem' },
  { slug: 'marketing-digital-para-empresas', key: 'marketingDigital' },
  { slug: 'por-que-sua-empresa-precisa-de-um-site', key: 'porQueSite' },
  { slug: 'quanto-custa-site-profissional-2026', key: 'quantoCusta' },
  { slug: 'redes-sociais-para-empresas', key: 'redesSociais' }
];

console.log('Processing 8 blog articles body content...');

const articlesBody = {
  pt: {},
  en: {},
  es: {}
};

articleSlugs.forEach(({ slug, key }) => {
  const filePath = path.join(rootDir, 'blog', slug, 'index.html');
  if (!fs.existsSync(filePath)) return;

  let content = fs.readFileSync(filePath, 'utf8');

  // Match <article>...</article>
  const match = content.match(/<article[\s\S]*?<\/article>/i);
  if (!match) return;

  let articleHtml = match[0];

  // Store PT
  articlesBody.pt[key] = articleHtml.replace(/<article[^>]*>/i, '').replace(/<\/article>/i, '').trim();

  // Create EN
  let enHtml = articlesBody.pt[key]
    // General terms
    .replace(/Nos últimos anos,/g, 'In recent years,')
    .replace(/No entanto,/g, 'However,')
    .replace(/Além disso,/g, 'Furthermore,')
    .replace(/Por isso,/g, 'Therefore,')
    .replace(/Por outro lado,/g, 'On the other hand,')
    .replace(/Em resumo,/g, 'In summary,')
    .replace(/Em conclusão,/g, 'In conclusion,')
    .replace(/Como começar\?/g, 'How to get started?')
    .replace(/O que é/g, 'What is')
    .replace(/Como funciona/g, 'How it works')
    .replace(/Quais empresas/g, 'Which businesses')
    .replace(/Artigos Relacionados/g, 'Related Articles')
    .replace(/Tempo de leitura/g, 'Read time')
    .replace(/Voltar para o Blog/g, 'Back to Blog')
    .replace(/Falar com a CONEXUS/g, 'Talk to CONEXUS')
    .replace(/Falar com Especialista/g, 'Speak with a Specialist')
    .replace(/Quero um site/g, 'I want a website')
    .replace(/Quero melhorar/g, 'I want to improve')
    .replace(/Pronto para/g, 'Ready to')
    .replace(/São José dos Pinhais/g, 'São José dos Pinhais')
    .replace(/Curitiba/g, 'Curitiba')
    .replace(/minutos de leitura/g, 'min read')
    .replace(/min de leitura/g, 'min read');

  // Create ES
  let esHtml = articlesBody.pt[key]
    // General terms
    .replace(/Nos últimos anos,/g, 'En los últimos años,')
    .replace(/No entanto,/g, 'Sin embargo,')
    .replace(/Além disso,/g, 'Además,')
    .replace(/Por isso,/g, 'Por ello,')
    .replace(/Por outro lado,/g, 'Por otro lado,')
    .replace(/Em resumo,/g, 'En resumen,')
    .replace(/Em conclusão,/g, 'En conclusión,')
    .replace(/Como começar\?/g, '¿Cómo empezar?')
    .replace(/O que é/g, 'Qué es')
    .replace(/Como funciona/g, 'Cómo funciona')
    .replace(/Quais empresas/g, 'Qué empresas')
    .replace(/Artigos Relacionados/g, 'Artículos Relacionados')
    .replace(/Tempo de leitura/g, 'Tiempo de lectura')
    .replace(/Voltar para o Blog/g, 'Volver al Blog')
    .replace(/Falar com a CONEXUS/g, 'Hablar con CONEXUS')
    .replace(/Falar com Especialista/g, 'Hablar con un Especialista')
    .replace(/Quero um site/g, 'Quiero un sitio web')
    .replace(/Quero melhorar/g, 'Quiero mejorar')
    .replace(/Pronto para/g, '¿Listo para')
    .replace(/São José dos Pinhais/g, 'São José dos Pinhais')
    .replace(/Curitiba/g, 'Curitiba')
    .replace(/minutos de leitura/g, 'min de lectura')
    .replace(/min de leitura/g, 'min de lectura');

  articlesBody.en[key] = enHtml;
  articlesBody.es[key] = esHtml;

  // Add data-i18n-html to <article> in the HTML file
  if (!content.includes(`data-i18n-html="articlesBody.${key}"`)) {
    content = content.replace(/<article([^>]*)>/i, `<article$1 data-i18n-html="articlesBody.${key}">`);
    fs.writeFileSync(filePath, content, 'utf8');
  }
});

// Update dictionaries
import { pt } from '../src/i18n/pt.js';
import { en } from '../src/i18n/en.js';
import { es } from '../src/i18n/es.js';

pt.articlesBody = articlesBody.pt;
en.articlesBody = articlesBody.en;
es.articlesBody = articlesBody.es;

fs.writeFileSync(path.join(rootDir, 'src', 'i18n', 'pt.js'), `export const pt = ${JSON.stringify(pt, null, 2)};\n`, 'utf8');
fs.writeFileSync(path.join(rootDir, 'src', 'i18n', 'en.js'), `export const en = ${JSON.stringify(en, null, 2)};\n`, 'utf8');
fs.writeFileSync(path.join(rootDir, 'src', 'i18n', 'es.js'), `export const es = ${JSON.stringify(es, null, 2)};\n`, 'utf8');

console.log('Successfully embedded articlesBody into dictionaries and HTML files!');
