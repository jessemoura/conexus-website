import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..');

// 1. Tag direct text matches across all HTML files
function tagAllMatches() {
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

  const exactReplacements = [
    { search: '>Falar com a CONEXUS<', attr: 'data-i18n="common.talkToConexus"', key: 'common.talkToConexus' },
    { search: '>Conversar pelo WhatsApp<', attr: 'data-i18n="common.chatWhatsapp"', key: 'common.chatWhatsapp' },
    { search: '>Falar no WhatsApp<', attr: 'data-i18n="common.talkWhatsApp"', key: 'common.talkWhatsApp' },
    { search: '>Falar com a CONEXUS no WhatsApp<', attr: 'data-i18n="common.talkWhatsAppConexus"', key: 'common.talkWhatsAppConexus' },
    { search: '>Tirar Dúvidas pelo WhatsApp<', attr: 'data-i18n="faq.askOnWhatsapp"', key: 'faq.askOnWhatsapp' },
    { search: '>Voltar para o Blog<', attr: 'data-i18n="blog.backToBlog"', key: 'blog.backToBlog' },
    { search: '>Voltar para o Portfólio<', attr: 'data-i18n="portfolio.backToPortfolio"', key: 'portfolio.backToPortfolio' },
    { search: '>Ver Case Completo<', attr: 'data-i18n="portfolio.viewCase"', key: 'portfolio.viewCase' },
    { search: '>Iniciar Projeto Semelhante<', attr: 'data-i18n="portfolio.startSimilarProject"', key: 'portfolio.startSimilarProject' },
    { search: '>Ler Artigo<', attr: 'data-i18n="blog.readArticle"', key: 'blog.readArticle' },
    { search: '>Solicitar Orçamento de Site<', attr: 'data-i18n="services.requestSiteQuote"', key: 'services.requestSiteQuote' },
    { search: '>Conversar sobre meu projeto<', attr: 'data-i18n="services.talkAboutProject"', key: 'services.talkAboutProject' },
    { search: '>Solicitar Proposta Integrada<', attr: 'data-i18n="services.requestIntegratedProposal"', key: 'services.requestIntegratedProposal' },
    { search: '>Solicitar CONEXUS Guest Hub<', attr: 'data-i18n="services.guestHub.request"', key: 'services.guestHub.request' },
    { search: '>Ver Demonstração Vila Serena<', attr: 'data-i18n="services.guestHub.viewDemo"', key: 'services.guestHub.viewDemo' },
    { search: '>Ver Demo Vila Serena<', attr: 'data-i18n="services.guestHub.viewDemo"', key: 'services.guestHub.viewDemo' },
    { search: '>Páginas de links genéricas<', attr: 'data-i18n="services.guestHub.compGenericTitle"', key: 'services.guestHub.compGenericTitle' },
    { search: '>Quero criar meu site profissional<', attr: 'data-i18n="services.criacaoSites.cta"', key: 'services.criacaoSites.cta' },
    { search: '>Quero fortalecer minhas redes sociais<', attr: 'data-i18n="services.redesSociais.cta"', key: 'services.redesSociais.cta' },
    { search: '>Quero fortalecer minha marca<', attr: 'data-i18n="services.branding.cta"', key: 'services.branding.cta' },
    { search: '>Quero melhorar minha presença no Google<', attr: 'data-i18n="services.seo.cta"', key: 'services.seo.cta' },
    { search: '>Quero ser encontrado na minha região<', attr: 'data-i18n="services.seoLocal.cta"', key: 'services.seoLocal.cta' },
    { search: '>Quero meu site One Page<', attr: 'data-i18n="services.siteOnePage.cta"', key: 'services.siteOnePage.cta' },
    { search: '>Conversar com a Equipe<', attr: 'data-i18n="common.talkToTeam"', key: 'common.talkToTeam' }
  ];

  for (const file of allFiles) {
    let html = fs.readFileSync(file, 'utf8');
    let mod = false;

    for (const item of exactReplacements) {
      // Regex to find tag with this exact inner text where the tag doesn't already have data-i18n
      const regex = new RegExp(`(<([a-zA-Z1-6]+)([^>]*?))(${item.search})`, 'g');
      html = html.replace(regex, (full, opening, tag, attrs, textMatch) => {
        if (attrs.includes('data-i18n') || attrs.includes('data-i18n-html')) {
          return full;
        }
        mod = true;
        return `${opening} ${item.attr}${textMatch}`;
      });
    }

    if (mod) {
      fs.writeFileSync(file, html, 'utf8');
      console.log(`Updated exact matches in ${path.relative(rootDir, file)}`);
    }
  }
}

// 2. Tag SVG + list items
function tagListItems() {
  const fileListMappings = [
    {
      file: 'servicos/conexus-guest-hub/index.html',
      items: [
        { text: 'Central digital 100% Mobile-First', key: 'services.guestHub.f1' },
        { text: 'Regras da casa, Wi-Fi e check-in/out', key: 'services.guestHub.f2' },
        { text: 'Guia gastronômico e atrações locais', key: 'services.guestHub.f3' },
        { text: 'Botão direto de WhatsApp com anfitrião', key: 'services.guestHub.f4' },
        { text: 'QR Code para imprimir e dispor no local', key: 'services.guestHub.f5' },
        { text: 'Tudo incluso no plano Guest Hub Digital', key: 'services.guestHub.f6' },
        { text: 'Welcome Book em PDF diagramado em alta resolução', key: 'services.guestHub.f7' },
        { text: 'Arquivo pronto para impressão em gráfica / encadernação', key: 'services.guestHub.f8' },
        { text: 'Placa elegante com QR Code para balcão ou mesa', key: 'services.guestHub.f9' },
        { text: 'Todas as funcionalidades do pacote completo', key: 'services.guestHub.f10' },
        { text: 'Personalização avançada de seções e fotos', key: 'services.guestHub.f11' },
        { text: 'Suporte prioritário na implementação', key: 'services.guestHub.f12' }
      ]
    },
    {
      file: 'servicos/criacao-de-sites/index.html',
      items: [
        { text: 'Apresentação direta da proposta', key: 'services.criacaoSites.b1' },
        { text: 'Seções em âncoras personalizadas', key: 'services.criacaoSites.b2' },
        { text: 'Alta taxa de conversão direta', key: 'services.criacaoSites.b3' },
        { text: 'Arquitetura SEO expansível', key: 'services.criacaoSites.b4' },
        { text: 'Páginas exclusivas para cada serviço', key: 'services.criacaoSites.b5' },
        { text: 'Preparado para estratégias de conteúdo', key: 'services.criacaoSites.b6' }
      ]
    },
    {
      file: 'servicos/index.html',
      items: [
        { text: 'Design exclusivo e Mobile-First', key: 'services.s1.b1' },
        { text: 'Estrutura pronta para SEO no Google', key: 'services.s1.b2' },
        { text: 'Integração direta com WhatsApp', key: 'services.s1.b3' },
        { text: 'Navegação fluida em página única', key: 'services.s2.b1' },
        { text: 'Foco total em conversão e agilidade', key: 'services.s2.b2' },
        { text: 'Pesquisa avançada de palavras-chave', key: 'services.s3.b1' },
        { text: 'Otimização On-Page e técnica', key: 'services.s3.b2' },
        { text: 'Crescimento orgânico sustentável', key: 'services.s3.b3' },
        { text: 'Otimização do Perfil da Empresa', key: 'services.s4.b1' },
        { text: 'Destaque no Google Maps regional', key: 'services.s4.b2' },
        { text: 'Atração de clientes nas proximidades', key: 'services.s4.b3' },
        { text: 'Criação de logotipo profissional', key: 'services.s5.b1' },
        { text: 'Manual de marca e guia de cores', key: 'services.s5.b2' },
        { text: 'Posicionamento de imagem premium', key: 'services.s5.b3' },
        { text: 'Planejamento mensal de conteúdo', key: 'services.s6.b1' },
        { text: 'Design visual alinhado à marca', key: 'services.s6.b2' },
        { text: 'Fortalecimento de autoridade social', key: 'services.s6.b3' },
        { text: 'Centraliza informações da hospedagem', key: 'services.s7.b1' },
        { text: 'Reduz dúvidas repetitivas', key: 'services.s7.b2' },
        { text: 'Experiência otimizada para celular', key: 'services.s7.b3' }
      ]
    }
  ];

  for (const { file, items } of fileListMappings) {
    const fullPath = path.join(rootDir, file);
    if (!fs.existsSync(fullPath)) continue;
    let html = fs.readFileSync(fullPath, 'utf8');
    let mod = false;

    for (const item of items) {
      // Look for: </svg> Text</li> or similar
      const rawText = item.text;
      const pattern = new RegExp(`(</svg>\\s*)(${rawText.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})(\\s*</li>)`, 'g');
      if (pattern.test(html)) {
        html = html.replace(pattern, `$1<span data-i18n="${item.key}">$2</span>$3`);
        mod = true;
      }
    }

    if (mod) {
      fs.writeFileSync(fullPath, html, 'utf8');
      console.log(`Updated list items in ${file}`);
    }
  }
}

tagAllMatches();
tagListItems();
