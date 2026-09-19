import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..');

let totalTests = 0;
let passedTests = 0;
let failedTests = 0;

function assert(condition, message) {
  totalTests++;
  if (condition) {
    passedTests++;
    console.log(`  ✅ PASS: ${message}`);
  } else {
    failedTests++;
    console.error(`  ❌ FAIL: ${message}`);
  }
}

console.log('====================================================');
console.log('   SUÍTE DE TESTES DE VALIDAÇÃO CONEXUS - FASE 1');
console.log('====================================================\n');

// TEST 1: Verificação da Marca Pública (Proibido "CONEXUS Brasil")
console.log('[TEST 1] Verificação de Nomenclatura da Marca');
function scanDirForForbiddenTerms(dir) {
  const files = fs.readdirSync(dir);
  let found = false;

  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      if (file !== 'node_modules' && file !== '.git' && file !== 'docs') {
        if (scanDirForForbiddenTerms(fullPath)) found = true;
      }
    } else if (file.endsWith('.html') || file.endsWith('.js') || file.endsWith('.css')) {
      if (fullPath.includes('validate-site.js')) continue;
      const content = fs.readFileSync(fullPath, 'utf8');
      const forbiddenStr1 = 'CONEXUS' + ' Brasil';
      const forbiddenStr2 = 'Conexus' + ' Brasil';
      if (content.includes(forbiddenStr1) || content.includes(forbiddenStr2)) {
        console.error(`     Termo proibido encontrado em: ${fullPath}`);
        found = true;
      }
    }
  }
  return found;
}
const brandTermFound = scanDirForForbiddenTerms(rootDir);
assert(!brandTermFound, 'Nenhum arquivo público contém a expressão "CONEXUS Brasil".');

// TEST 2: Configuração de Indexação de Produção (index, follow)
console.log('\n[TEST 2] Verificação de Indexação de Produção (index, follow)');
const indexHtmlContent = fs.readFileSync(path.join(rootDir, 'index.html'), 'utf8');
const hasIndexFollow = indexHtmlContent.includes('<meta name="robots" content="index, follow">');
assert(hasIndexFollow, 'Página Home contém a tag meta robots="index, follow".');

// TEST 3: Validação de SEO On-Page
console.log('\n[TEST 3] Validação de SEO On-Page (Home)');
const h1Matches = indexHtmlContent.match(/<h1[^>]*>([\s\S]*?)<\/h1>/gi) || [];
assert(h1Matches.length === 1, `A Home possui exatamente 1 tag H1 (Encontrado: ${h1Matches.length}).`);

const hasTitle = indexHtmlContent.includes('<title>Agência de Marketing Digital para Empresas | CONEXUS</title>');
assert(hasTitle, 'Home contém o Title tag oficial exatamente como especificado no briefing.');

const hasMetaDesc = indexHtmlContent.includes('Websites profissionais, SEO, presença no Google, branding e redes sociais para empresas que querem fortalecer sua presença digital e gerar oportunidades.');
assert(hasMetaDesc, 'Home contém a Meta Description oficial exatamente como especificado.');

const hasCanonical = indexHtmlContent.includes('<link rel="canonical" href="https://www.conexus.press/">') || indexHtmlContent.includes('<link rel="canonical" href="https://conexus.press/">');
assert(hasCanonical, 'Canonical tag presente e configurada para o domínio oficial https://www.conexus.press/.');

const hasSchemaOrg = indexHtmlContent.includes('"@type": "Organization"') && indexHtmlContent.includes('"@type": "WebSite"');
assert(hasSchemaOrg, 'Schemas JSON-LD (Organization e WebSite) incorporados corretamente.');

// TEST 4: Verificação de Exibição de Telefone/Celular (Privacidade)
console.log('\n[TEST 4] Verificação de Privacidade de Contatos');
const phoneRegex = /\+?55\s?\(?\d{2}\)?\s?9?\d{4}[-\s]?\d{4}/g;
const hasRawPhone = phoneRegex.test(indexHtmlContent);
assert(!hasRawPhone, 'Nenhum número de celular ou telefone está exposto como texto puro na Home.');

const hasEmail = indexHtmlContent.includes('comercial@conexus.press');
assert(hasEmail, 'E-mail oficial (comercial@conexus.press) está presente nos canais secundários.');

// TEST 5: Integridade dos Assets de Imagens e Logos
console.log('\n[TEST 5] Integridade dos Assets Fornecidos');
const requiredAssets = [
  'assets/logos/conexus-logo-light.png',
  'assets/images/conexus-home-hero-01.png.png',
  'assets/images/conexus-home-websites-02.png.png',
  'assets/images/conexus-home-seo-03.png.png',
  'assets/images/conexus-home-about-06.png.png',
  'assets/images/conexus-home-process-05.png.png',
  'assets/images/conexus-portfolio-projects-13.png.png',
  'assets/images/conexus-blog-content-14.png.png',
  'assets/icons/favicon.ico',
  'assets/icons/conexus-favicon-32x32.png',
  'assets/icons/conexus-icon-180x180.png.png'
];

let allAssetsExist = true;
for (const assetPath of requiredAssets) {
  const fullPath = path.join(rootDir, assetPath);
  if (!fs.existsSync(fullPath)) {
    console.error(`     Asset não encontrado: ${assetPath}`);
    allAssetsExist = false;
  }
}
assert(allAssetsExist, 'Todos os 11 assets principais de imagem, logo e favicon existem no disco.');

// TEST 6: Estrutura das 12 Rotas Técnicas Futuras
console.log('\n[TEST 6] Verificação das Rotas Técnicas Futuras');
const expectedRoutes = [
  'servicos/index.html',
  'servicos/criacao-de-sites/index.html',
  'servicos/site-one-page/index.html',
  'servicos/seo/index.html',
  'servicos/seo-local-google-meu-negocio/index.html',
  'servicos/branding-identidade-visual/index.html',
  'servicos/gestao-redes-sociais/index.html',
  'sobre/index.html',
  'portfolio/index.html',
  'blog/index.html',
  'faq/index.html',
  'contato/index.html'
];

let allRoutesExist = true;
for (const routePath of expectedRoutes) {
  const fullPath = path.join(rootDir, routePath);
  if (!fs.existsSync(fullPath)) {
    console.error(`     Rota não encontrada: ${routePath}`);
    allRoutesExist = false;
  }
}
assert(allRoutesExist, 'Todas as 12 rotas de suporte foram criadas.');

// TEST 7: Validação da Fase 2A (/servicos/ e /servicos/criacao-de-sites/)
console.log('\n[TEST 7] Validação de SEO & Estrutura da Fase 2A');
const servicosHtml = fs.readFileSync(path.join(rootDir, 'servicos/index.html'), 'utf8');
const criacaoSitesHtml = fs.readFileSync(path.join(rootDir, 'servicos/criacao-de-sites/index.html'), 'utf8');

const servicosH1 = servicosHtml.match(/<h1[^>]*>([\s\S]*?)<\/h1>/gi) || [];
assert(servicosH1.length === 1, `Página /servicos/ possui exatamente 1 tag H1 (Encontrado: ${servicosH1.length}).`);
assert(servicosHtml.includes('content="index, follow"'), 'Página /servicos/ contém a tag meta robots="index, follow".');
assert(servicosHtml.includes('<title>Serviços de Marketing Digital | CONEXUS</title>'), 'Página /servicos/ contém o Title tag oficial.');

const criacaoH1 = criacaoSitesHtml.match(/<h1[^>]*>([\s\S]*?)<\/h1>/gi) || [];
assert(criacaoH1.length === 1, `Página /servicos/criacao-de-sites/ possui exatamente 1 tag H1 (Encontrado: ${criacaoH1.length}).`);
assert(criacaoSitesHtml.includes('content="index, follow"'), 'Página /servicos/criacao-de-sites/ contém a tag meta robots="index, follow".');
assert(criacaoSitesHtml.includes('<title>Criação de Sites Profissionais para Empresas | CONEXUS</title>'), 'Página /servicos/criacao-de-sites/ contém o Title tag oficial.');

// TEST 8: Validação da Página Desenvolvimento de Aplicativos
console.log('\n[TEST 8] Validação de SEO & Estrutura de Desenvolvimento de Aplicativos');
const appDevHtml = fs.readFileSync(path.join(rootDir, 'servicos/desenvolvimento-de-aplicativos/index.html'), 'utf8');
const appDevH1 = appDevHtml.match(/<h1[^>]*>([\s\S]*?)<\/h1>/gi) || [];
assert(appDevH1.length === 1, `Página /servicos/desenvolvimento-de-aplicativos/ possui exatamente 1 tag H1 (Encontrado: ${appDevH1.length}).`);
assert(appDevHtml.includes('content="index, follow"'), 'Página /servicos/desenvolvimento-de-aplicativos/ contém a tag meta robots="index, follow".');
assert(appDevHtml.includes('<title>Desenvolvimento de Aplicativos para Empresas | CONEXUS</title>'), 'Página /servicos/desenvolvimento-de-aplicativos/ contém o Title tag oficial.');
assert(appDevHtml.includes('schema.org'), 'Página /servicos/desenvolvimento-de-aplicativos/ contém dados estruturados Schema.org JSON-LD.');

// SUMÁRIO DOS TESTES
console.log('\n====================================================');
console.log(` RESULTADO DOS TESTES: ${passedTests}/${totalTests} PASSOU (${failedTests} FALHAS)`);
console.log('====================================================\n');

if (failedTests > 0) {
  process.exit(1);
} else {
  process.exit(0);
}
