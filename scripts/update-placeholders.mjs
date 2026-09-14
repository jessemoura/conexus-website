import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..');

const routes = [
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

const headerHtml = `  <!-- HEADER -->
  <header class="header">
    <div class="container header-container">
      <a href="/" class="brand-logo" aria-label="CONEXUS - Página Inicial">
        <img src="/assets/logos/conexus-logo-transparent.png" alt="CONEXUS Logo" width="180" height="44" loading="eager">
      </a>

      <nav class="nav-desktop" aria-label="Navegação Principal">
        <a href="/" class="nav-link">Início</a>
        <a href="/servicos/" class="nav-link">Serviços</a>
        <a href="/sobre/" class="nav-link">Sobre</a>
        <a href="/portfolio/" class="nav-link">Portfólio</a>
        <a href="/blog/" class="nav-link">Blog</a>
        <a href="/faq/" class="nav-link">FAQ</a>
        <a href="/contato/" class="nav-link">Contato</a>

        <div class="header-social-links">
          <a href="https://www.linkedin.com/in/jesse-ribeiro-a49666409/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" class="social-icon-link" data-track="social_click" data-cta-position="header_linkedin">
            <svg width="25" height="25" viewBox="0 0 24 24" fill="#0A66C2"><path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.25V10.9H6.46M7.86 6.7a1.63 1.63 0 1 0 0 3.26 1.63 1.63 0 0 0 0-3.26Z"/></svg>
          </a>
          <a href="https://instagram.com/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" class="social-icon-link" data-track="social_click" data-cta-position="header_instagram">
            <svg width="25" height="25" viewBox="0 0 24 24">
              <defs>
                <linearGradient id="igHeaderGrad" x1="0%" y1="100%" x2="100%" y2="0%">
                  <stop offset="0%" stop-color="#f09433"/>
                  <stop offset="25%" stop-color="#e6683c"/>
                  <stop offset="50%" stop-color="#dc2743"/>
                  <stop offset="75%" stop-color="#cc2366"/>
                  <stop offset="100%" stop-color="#bc1888"/>
                </linearGradient>
              </defs>
              <path fill="url(#igHeaderGrad)" d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
            </svg>
          </a>
        </div>
      </nav>

      <div class="header-actions">
        <a href="#" class="btn btn-primary" data-whatsapp-key="homeHero" data-track="whatsapp_click" data-cta-position="header">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="#FFFFFF" viewBox="0 0 448 512" style="margin-right: 4px;">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3 18.6-68.1-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z"/>
          </svg>
          Falar com a CONEXUS
        </a>
        <button id="mobile-toggle" class="mobile-toggle" aria-label="Abrir Menu de Navegação" aria-expanded="false">
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </div>
  </header>

  <!-- MOBILE MENU DRAWER -->
  <div id="mobile-menu" class="mobile-menu" aria-label="Menu Mobile">
    <a href="/" class="nav-link">Início</a>
    <a href="/servicos/" class="nav-link">Serviços</a>
    <a href="/sobre/" class="nav-link">Sobre</a>
    <a href="/portfolio/" class="nav-link">Portfólio</a>
    <a href="/blog/" class="nav-link">Blog</a>
    <a href="/faq/" class="nav-link">FAQ</a>
    <a href="/contato/" class="nav-link">Contato</a>
    <div style="display: flex; gap: 1rem; margin-top: 0.5rem; padding-top: 0.5rem; border-top: 1px solid var(--color-border-subtle);">
      <a href="https://www.linkedin.com/in/jesse-ribeiro-a49666409/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" class="social-icon-link" data-track="social_click" data-cta-position="mobile_linkedin">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="#0A66C2"><path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.25V10.9H6.46M7.86 6.7a1.63 1.63 0 1 0 0 3.26 1.63 1.63 0 0 0 0-3.26Z"/></svg>
      </a>
      <a href="https://instagram.com/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" class="social-icon-link" data-track="social_click" data-cta-position="mobile_instagram">
        <svg width="22" height="22" viewBox="0 0 24 24">
          <defs>
            <linearGradient id="igMobileGrad" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stop-color="#f09433"/>
              <stop offset="25%" stop-color="#e6683c"/>
              <stop offset="50%" stop-color="#dc2743"/>
              <stop offset="75%" stop-color="#cc2366"/>
              <stop offset="100%" stop-color="#bc1888"/>
            </linearGradient>
          </defs>
          <path fill="url(#igMobileGrad)" d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
        </svg>
      </a>
    </div>
    <div style="margin-top: 1rem;">
      <a href="#" class="btn btn-primary" style="width: 100%;" data-whatsapp-key="homeHero" data-track="whatsapp_click" data-cta-position="mobile_menu">
        Falar com a CONEXUS
      </a>
    </div>
  </div>`;

const footerHtml = `  <!-- FOOTER -->
  <footer class="footer">
    <div class="container">
      <div class="footer-grid">
        <div class="footer-brand">
          <a href="/" aria-label="CONEXUS Logo Footer">
            <img src="/assets/logos/conexus-logo-transparent.png" alt="CONEXUS Logo" width="160" height="40" loading="lazy">
          </a>
          <p>
            Estratégia e marketing digital conectando websites profissionais, SEO, branding e redes sociais para fortalecer empresas.
          </p>
        </div>

        <div class="footer-column">
          <h4>Navegação</h4>
          <ul class="footer-links">
            <li><a href="/">Início</a></li>
            <li><a href="/servicos/">Serviços</a></li>
            <li><a href="/sobre/">Sobre a CONEXUS</a></li>
            <li><a href="/portfolio/">Portfólio</a></li>
            <li><a href="/blog/">Blog</a></li>
            <li><a href="/faq/">Perguntas Frequentes</a></li>
            <li><a href="/contato/">Contato</a></li>
          </ul>
        </div>

        <div class="footer-column">
          <h4>Serviços</h4>
          <ul class="footer-links">
            <li><a href="/servicos/criacao-de-sites/">Criação de Sites</a></li>
            <li><a href="/servicos/site-one-page/">Site One Page</a></li>
            <li><a href="/servicos/seo/">SEO para Empresas</a></li>
            <li><a href="/servicos/seo-local-google-meu-negocio/">SEO Local & Google</a></li>
            <li><a href="/servicos/branding-identidade-visual/">Branding & Identidade</a></li>
            <li><a href="/servicos/gestao-redes-sociais/">Gestão de Redes Sociais</a></li>
          </ul>
        </div>

        <div class="footer-column">
          <h4>Contato & Redes</h4>
          <ul class="footer-links">
            <li>
              <a href="mailto:comercial@conexus.press" data-track="email_click" data-cta-position="footer" style="display: inline-flex; align-items: center; gap: 0.5rem;">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
                comercial@conexus.press
              </a>
            </li>
            <li style="display: flex; align-items: center; gap: 0.85rem; margin-top: 0.5rem;">
              <a href="https://www.linkedin.com/in/jesse-ribeiro-a49666409/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" class="footer-social-icon" data-track="social_click" data-cta-position="footer_linkedin">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="#0A66C2"><path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.25V10.9H6.46M7.86 6.7a1.63 1.63 0 1 0 0 3.26 1.63 1.63 0 0 0 0-3.26Z"/></svg>
              </a>
              <a href="https://instagram.com/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" class="footer-social-icon" data-track="social_click" data-cta-position="footer_instagram">
                <svg width="22" height="22" viewBox="0 0 24 24">
                  <defs>
                    <linearGradient id="igFooterGrad" x1="0%" y1="100%" x2="100%" y2="0%">
                      <stop offset="0%" stop-color="#f09433"/>
                      <stop offset="25%" stop-color="#e6683c"/>
                      <stop offset="50%" stop-color="#dc2743"/>
                      <stop offset="75%" stop-color="#cc2366"/>
                      <stop offset="100%" stop-color="#bc1888"/>
                    </linearGradient>
                  </defs>
                  <path fill="url(#igFooterGrad)" d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div class="footer-bottom">
        <div>
          © 2026 CONEXUS. Todos os direitos reservados.
        </div>
        <div class="footer-signature">
          Desenvolvido por <a href="/" class="signature-link">CONEXUS</a>
        </div>
        <div style="display: flex; gap: 1.5rem;">
          <a href="#" style="color: var(--color-text-muted);">Política de Privacidade</a>
          <a href="#" style="color: var(--color-text-muted);">Termos de Uso</a>
        </div>
      </div>
    </div>
  </footer>

  <!-- FLOATING WHATSAPP BUTTON -->
  <a href="#" class="whatsapp-float" aria-label="Conversar pelo WhatsApp" data-whatsapp-key="contactFinal" data-track="whatsapp_click" data-cta-position="floating_button">
    <span class="whatsapp-tooltip">Conversar pelo WhatsApp</span>
    <svg xmlns="http://www.w3.org/2000/svg" width="34" height="34" fill="#FFFFFF" viewBox="0 0 448 512">
      <path fill-rule="evenodd" clip-rule="evenodd" d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3 18.6-68.1-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z"/>
    </svg>
  </a>`;

for (const routePath of routes) {
  const filePath = path.join(rootDir, routePath);
  if (!fs.existsSync(filePath)) continue;

  let content = fs.readFileSync(filePath, 'utf8');

  // Replace Header
  content = content.replace(/<!-- HEADER -->[\s\S]*?<!-- MOBILE MENU DRAWER -->[\s\S]*?<\/div>/, headerHtml);
  content = content.replace(/<header class="header">[\s\S]*?<\/header>/, headerHtml);

  // Replace Footer
  content = content.replace(/<!-- FOOTER -->[\s\S]*?<\/footer>/, footerHtml);
  content = content.replace(/<footer class="footer">[\s\S]*?<\/footer>/, footerHtml);

  fs.writeFileSync(filePath, content, 'utf8');
}

console.log('✅ Todas as 12 rotas de suporte foram atualizadas com o Header e Footer padronizados!');
