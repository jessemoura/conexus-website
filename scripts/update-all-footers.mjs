import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..');

function updateFooter(html) {
  return html.replace(/<footer[\s\S]*?<\/footer>/g, (footerBlock) => {
    let f = footerBlock;

    // 1. Taglines
    f = f.replace(
      /<p class="footer-text">(\s*Agência de marketing digital especializada em websites profissionais, SEO, Google Meu Negócio, branding e gestão de redes sociais\.\s*)<\/p>/g,
      '<p class="footer-text" data-i18n="footer.articleTagline">$1</p>'
    );
    f = f.replace(
      /<p>(\s*Estratégia e marketing digital conectando websites profissionais, SEO, branding e redes sociais para fortalecer empresas\.\s*)<\/p>/g,
      '<p data-i18n="footer.tagline">$1</p>'
    );

    // 2. Headings
    f = f.replace(/<h4>Navegação<\/h4>/g, '<h4 data-i18n="footer.colNavTitle">Navegação</h4>');
    f = f.replace(/<h4 class="footer-heading">Navegação<\/h4>/g, '<h4 class="footer-heading" data-i18n="footer.colNavTitle">Navegação</h4>');
    
    f = f.replace(/<h4>Serviços<\/h4>/g, '<h4 data-i18n="footer.colServicesTitle">Serviços</h4>');
    f = f.replace(/<h4 class="footer-heading">Serviços<\/h4>/g, '<h4 class="footer-heading" data-i18n="footer.colServicesTitle">Serviços</h4>');
    
    f = f.replace(/<h4>Contato & Redes<\/h4>/g, '<h4 data-i18n="footer.colContactTitle">Contato & Redes</h4>');
    f = f.replace(/<h4 class="footer-heading">Contato & Redes<\/h4>/g, '<h4 class="footer-heading" data-i18n="footer.colContactTitle">Contato & Redes</h4>');

    f = f.replace(/<h4>Institucional<\/h4>/g, '<h4 data-i18n="footer.colInstTitle">Institucional</h4>');
    f = f.replace(/<h4 class="footer-heading">Institucional<\/h4>/g, '<h4 class="footer-heading" data-i18n="footer.colInstTitle">Institucional</h4>');

    f = f.replace(/<h4>Contato<\/h4>/g, '<h4 data-i18n="footer.colContactOnlyTitle">Contato</h4>');
    f = f.replace(/<h4 class="footer-heading">Contato<\/h4>/g, '<h4 class="footer-heading" data-i18n="footer.colContactOnlyTitle">Contato</h4>');

    // 3. Navigation column links
    f = f.replace(/<li><a href="\/"(?![^>]*data-i18n)>Início<\/a><\/li>/g, '<li><a href="/" data-i18n="nav.home">Início</a></li>');
    f = f.replace(/<li><a href="\/servicos\/"(?![^>]*data-i18n)>Serviços<\/a><\/li>/g, '<li><a href="/servicos/" data-i18n="nav.services">Serviços</a></li>');
    f = f.replace(/<li><a href="\/sobre\/"(?![^>]*data-i18n)>Sobre a CONEXUS<\/a><\/li>/g, '<li><a href="/sobre/" data-i18n="footer.aboutConexus">Sobre a CONEXUS</a></li>');
    f = f.replace(/<li><a href="\/sobre\/"(?![^>]*data-i18n)>Sobre<\/a><\/li>/g, '<li><a href="/sobre/" data-i18n="nav.about">Sobre</a></li>');
    f = f.replace(/<li><a href="\/portfolio\/"(?![^>]*data-i18n)>Portfólio<\/a><\/li>/g, '<li><a href="/portfolio/" data-i18n="nav.portfolio">Portfólio</a></li>');
    f = f.replace(/<li><a href="\/blog\/"(?![^>]*data-i18n)>Blog<\/a><\/li>/g, '<li><a href="/blog/" data-i18n="nav.blog">Blog</a></li>');
    f = f.replace(/<li><a href="\/faq\/"(?![^>]*data-i18n)>Perguntas Frequentes<\/a><\/li>/g, '<li><a href="/faq/" data-i18n="footer.faq">Perguntas Frequentes</a></li>');
    f = f.replace(/<li><a href="\/faq\/"(?![^>]*data-i18n)>FAQ<\/a><\/li>/g, '<li><a href="/faq/" data-i18n="nav.faq">FAQ</a></li>');
    f = f.replace(/<li><a href="\/contato\/"(?![^>]*data-i18n)>Contato<\/a><\/li>/g, '<li><a href="/contato/" data-i18n="nav.contact">Contato</a></li>');
    f = f.replace(/<li><a href="\/contato\/"(?![^>]*data-i18n)>Fale Conosco<\/a><\/li>/g, '<li><a href="/contato/" data-i18n="footer.contactUs">Fale Conosco</a></li>');

    // 4. Services column links
    f = f.replace(/<li><a href="\/servicos\/criacao-de-sites\/"(?![^>]*data-i18n)>Criação de Sites<\/a><\/li>/g, '<li><a href="/servicos/criacao-de-sites/" data-i18n="footer.serviceWebsites">Criação de Sites</a></li>');
    f = f.replace(/<li><a href="\/servicos\/site-one-page\/"(?![^>]*data-i18n)>Site One Page<\/a><\/li>/g, '<li><a href="/servicos/site-one-page/" data-i18n="footer.serviceOnePage">Site One Page</a></li>');
    f = f.replace(/<li><a href="\/servicos\/conexus-guest-hub\/"(?![^>]*data-i18n)>CONEXUS Guest Hub<\/a><\/li>/g, '<li><a href="/servicos/conexus-guest-hub/" data-i18n="footer.serviceGuestHub">CONEXUS Guest Hub</a></li>');
    f = f.replace(/<li><a href="\/servicos\/conexus-guest-hub\/"(?![^>]*data-i18n)>Conexus Guest Hub<\/a><\/li>/g, '<li><a href="/servicos/conexus-guest-hub/" data-i18n="footer.serviceGuestHub">Conexus Guest Hub</a></li>');
    f = f.replace(/<li><a href="\/servicos\/seo\/"(?![^>]*data-i18n)>SEO para Empresas<\/a><\/li>/g, '<li><a href="/servicos/seo/" data-i18n="footer.serviceSEO">SEO para Empresas</a></li>');
    f = f.replace(/<li><a href="\/servicos\/seo\/"(?![^>]*data-i18n)>SEO<\/a><\/li>/g, '<li><a href="/servicos/seo/" data-i18n="footer.serviceSEOShort">SEO</a></li>');
    f = f.replace(/<li><a href="\/servicos\/seo-local-google-meu-negocio\/"(?![^>]*data-i18n)>SEO Local & Google<\/a><\/li>/g, '<li><a href="/servicos/seo-local-google-meu-negocio/" data-i18n="footer.serviceSEOLocal">SEO Local & Google</a></li>');
    f = f.replace(/<li><a href="\/servicos\/branding-identidade-visual\/"(?![^>]*data-i18n)>Branding & Identidade<\/a><\/li>/g, '<li><a href="/servicos/branding-identidade-visual/" data-i18n="footer.serviceBranding">Branding & Identidade</a></li>');
    f = f.replace(/<li><a href="\/servicos\/gestao-redes-sociais\/"(?![^>]*data-i18n)>Gestão de Redes Sociais<\/a><\/li>/g, '<li><a href="/servicos/gestao-redes-sociais/" data-i18n="footer.serviceSocialMedia">Gestão de Redes Sociais</a></li>');
    f = f.replace(/<li><a href="\/servicos\/gestao-redes-sociais\/"(?![^>]*data-i18n)>Redes Sociais<\/a><\/li>/g, '<li><a href="/servicos/gestao-redes-sociais/" data-i18n="footer.serviceSocialMediaShort">Redes Sociais</a></li>');

    // 5. Contact location
    f = f.replace(
      /<p class="footer-text">São José dos Pinhais - PR<br>Atendimento Nacional e Internacional<\/p>/g,
      '<p class="footer-text" data-i18n-html="footer.locationAndCoverage">São José dos Pinhais - PR<br>Atendimento Nacional e Internacional</p>'
    );

    // 6. Copyright & Legal
    f = f.replace(
      /<p class="copyright">(&copy; 2026 CONEXUS\. Todos os direitos reservados\.)<\/p>/g,
      '<p class="copyright"><span data-i18n="footer.rights">$1</span></p>'
    );
    f = f.replace(
      /<p class="copyright">(© 2026 CONEXUS\. Todos os direitos reservados\.)<\/p>/g,
      '<p class="copyright"><span data-i18n="footer.rights">$1</span></p>'
    );

    if (!f.includes('data-i18n="footer.rights"') && f.includes('© 2026 CONEXUS. Todos os direitos reservados.')) {
      f = f.replace(
        /(© 2026 CONEXUS\. Todos os direitos reservados\.)/g,
        '<span data-i18n="footer.rights">$1</span>'
      );
    }
    if (!f.includes('data-i18n="footer.rights"') && f.includes('&copy; 2026 CONEXUS. Todos os direitos reservados.')) {
      f = f.replace(
        /(&copy; 2026 CONEXUS\. Todos os direitos reservados\.)/g,
        '<span data-i18n="footer.rights">$1</span>'
      );
    }

    if (!f.includes('data-i18n="footer.devBy"') && f.includes('Desenvolvido por')) {
      f = f.replace(
        /Desenvolvido por\s*<a href="\/"/g,
        '<span data-i18n="footer.devBy">Desenvolvido por</span> <a href="/"'
      );
    }

    if (!f.includes('data-i18n="footer.privacy"') && f.includes('Política de Privacidade')) {
      f = f.replace(
        />Política de Privacidade<\/a>/g,
        ' data-i18n="footer.privacy">Política de Privacidade</a>'
      );
    }

    if (!f.includes('data-i18n="footer.terms"') && f.includes('Termos de Uso')) {
      f = f.replace(
        />Termos de Uso<\/a>/g,
        ' data-i18n="footer.terms">Termos de Uso</a>'
      );
    }

    return f;
  });
}

function processAllHtmlFiles(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    if (entry.name === 'node_modules' || entry.name === 'dist' || entry.name === '.git') continue;
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      processAllHtmlFiles(fullPath);
    } else if (entry.name.endsWith('.html')) {
      const original = fs.readFileSync(fullPath, 'utf8');
      const updated = updateFooter(original);
      if (original !== updated) {
        fs.writeFileSync(fullPath, updated, 'utf8');
        console.log(`Updated footer in: ${path.relative(rootDir, fullPath)}`);
      }
    }
  }
}

processAllHtmlFiles(rootDir);
console.log('All footers across all HTML files successfully updated!');
