import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..');

function getAllHtml(dir, list = []) {
  const files = fs.readdirSync(dir);
  for (const f of files) {
    const p = path.join(dir, f);
    if (fs.statSync(p).isDirectory()) {
      if (f !== 'node_modules' && f !== '.git' && f !== 'dist') getAllHtml(p, list);
    } else if (f.endsWith('.html')) {
      list.push(p);
    }
  }
  return list;
}

const allFiles = getAllHtml(rootDir);

const itemsToWrap = [
  { text: 'Ler Artigo', key: 'blog.readArticle' },
  { text: 'Quero criar meu site profissional', key: 'services.criacaoSites.cta' },
  { text: 'Quero fortalecer minhas redes sociais', key: 'services.redesSociais.cta' },
  { text: 'Quero fortalecer minha marca', key: 'services.branding.cta' },
  { text: 'Quero melhorar minha presença no Google', key: 'services.seo.cta' },
  { text: 'Quero ser encontrado na minha região', key: 'services.seoLocal.cta' },
  { text: 'Quero meu site One Page', key: 'services.siteOnePage.cta' },
  { text: 'Solicitar Proposta Integrada', key: 'services.requestIntegratedProposal' },
  { text: 'Conversar sobre meu projeto', key: 'services.talkAboutProject' },
  { text: 'Solicitar CONEXUS Guest Hub', key: 'services.guestHub.request' },
  { text: 'Ver Demonstração Vila Serena', key: 'services.guestHub.viewDemo' },
  { text: 'Ver Demo Vila Serena', key: 'services.guestHub.viewDemo' },
  { text: 'Conheça a demonstração Vila Serena', key: 'blog.articles.conexusGuestHub.demoBtn' },
  { text: 'Conheça o CONEXUS Guest Hub', key: 'blog.articles.conexusGuestHub.serviceBtn' },
  { text: 'Ver Case Completo', key: 'portfolio.viewCase' },
  { text: 'Iniciar Projeto Semelhante', key: 'portfolio.startSimilarProject' },
  { text: 'Falar com a CONEXUS no WhatsApp', key: 'common.talkWhatsAppConexus' },
  { text: 'Falar no WhatsApp', key: 'common.talkWhatsApp' },
  { text: 'Conversar pelo WhatsApp', key: 'common.chatWhatsapp' },
  { text: 'Tirar Dúvidas pelo WhatsApp', key: 'faq.askOnWhatsapp' },
  { text: 'Solicitar Orçamento de Site', key: 'services.requestSiteQuote' },
  { text: 'Falar com a CONEXUS', key: 'common.talkToConexus' }
];

for (const file of allFiles) {
  let html = fs.readFileSync(file, 'utf8');
  let mod = false;

  for (const { text, key } of itemsToWrap) {
    const escaped = text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

    // Case: text followed by <svg (not yet inside data-i18n)
    // Pattern: (<[a-zA-Z1-6]+[^>]*?>\s*)(TEXT)(\s*<svg)
    const textBeforeSvgRegex = new RegExp(`(<([a-zA-Z1-6]+)([^>]*?)>\\s*)(${escaped})(\\s*<svg)`, 'gi');
    html = html.replace(textBeforeSvgRegex, (match, openTag, tagName, attrs, innerText, svgStart) => {
      if (attrs.includes('data-i18n') || attrs.includes('data-i18n-html')) return match;
      mod = true;
      return `<${tagName}${attrs}><span data-i18n="${key}">${innerText}</span>${svgStart}`;
    });

    // Case: text after </svg>
    const textAfterSvgRegex = new RegExp(`(<\\/svg>\\s*)(${escaped})(\\s*<\\/([a-zA-Z1-6]+)>)`, 'gi');
    html = html.replace(textAfterSvgRegex, (match, svgEnd, innerText, closeTag, tagName) => {
      mod = true;
      return `${svgEnd}<span data-i18n="${key}">${innerText}</span>${closeTag}`;
    });
  }

  if (mod) {
    fs.writeFileSync(file, html, 'utf8');
    console.log(`Updated SVG-linked text in ${path.relative(rootDir, file)}`);
  }
}
