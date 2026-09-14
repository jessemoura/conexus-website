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
  { text: 'Falar com a CONEXUS', key: 'common.talkToConexus' },
  { text: 'Voltar para o Blog', key: 'blog.backToBlog' },
  { text: 'Voltar para o Portfólio', key: 'portfolio.backToPortfolio' },
  { text: 'Voltar aos Serviços', key: 'common.backToServices' },
  { text: 'Falar com a CONEXUS no WhatsApp', key: 'common.talkWhatsAppConexus' },
  { text: 'Falar no WhatsApp', key: 'common.talkWhatsApp' },
  { text: 'Conversar pelo WhatsApp', key: 'common.chatWhatsapp' },
  { text: 'Tirar Dúvidas pelo WhatsApp', key: 'faq.askOnWhatsapp' },
  { text: 'Solicitar Orçamento de Site', key: 'services.requestSiteQuote' },
  { text: 'Solicitar Proposta Integrada', key: 'services.requestIntegratedProposal' },
  { text: 'Conversar sobre meu projeto', key: 'services.talkAboutProject' },
  { text: 'Iniciar Projeto Semelhante', key: 'portfolio.startSimilarProject' },
  { text: 'Ver Case Completo', key: 'portfolio.viewCase' },
  { text: 'Ler Artigo', key: 'blog.readArticle' },
  { text: 'Conheça a demonstração Vila Serena', key: 'blog.articles.conexusGuestHub.demoBtn' },
  { text: 'Conheça o CONEXUS Guest Hub', key: 'blog.articles.conexusGuestHub.serviceBtn' },
  { text: 'Solicitar CONEXUS Guest Hub', key: 'services.guestHub.request' },
  { text: 'Ver Demonstração Vila Serena', key: 'services.guestHub.viewDemo' },
  { text: 'Ver Demo Vila Serena', key: 'services.guestHub.viewDemo' },
  { text: 'Páginas de links genéricas', key: 'services.guestHub.compGenericTitle' },
  { text: 'Quero criar meu site profissional', key: 'services.criacaoSites.cta' },
  { text: 'Quero fortalecer minhas redes sociais', key: 'services.redesSociais.cta' },
  { text: 'Quero fortalecer minha marca', key: 'services.branding.cta' },
  { text: 'Quero melhorar minha presença no Google', key: 'services.seo.cta' },
  { text: 'Quero ser encontrado na minha região', key: 'services.seoLocal.cta' },
  { text: 'Quero meu site One Page', key: 'services.siteOnePage.cta' }
];

for (const file of allFiles) {
  let html = fs.readFileSync(file, 'utf8');
  let mod = false;

  for (const { text, key } of itemsToWrap) {
    const escaped = text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

    // Case 1: Preceded by SVG or closing tag and not already inside a data-i18n span/tag
    // Pattern: (</svg>\s*)(TEXT)(\s*</[a-zA-Z1-6]+>)
    const svgFollowedRegex = new RegExp(`(<\\/svg>\\s*)(${escaped})(\\s*<\\/[a-zA-Z1-6]+>)`, 'gi');
    if (svgFollowedRegex.test(html)) {
      html = html.replace(svgFollowedRegex, `$1<span data-i18n="${key}">$2</span>$3`);
      mod = true;
    }

    // Case 2: In a direct leaf tag like <a ...> TEXT </a> without svg or data-i18n
    const directLeafRegex = new RegExp(`(<([a-zA-Z1-6]+)([^>]*?)>)\\s*(${escaped})\\s*(<\\/\\2>)`, 'gi');
    html = html.replace(directLeafRegex, (match, openTag, tagName, attrs, innerText, closeTag) => {
      if (attrs.includes('data-i18n') || attrs.includes('data-i18n-html')) return match;
      mod = true;
      return `<${tagName}${attrs} data-i18n="${key}">${innerText}${closeTag}`;
    });
  }

  if (mod) {
    fs.writeFileSync(file, html, 'utf8');
    console.log(`Wrapped and tagged items in ${path.relative(rootDir, file)}`);
  }
}
