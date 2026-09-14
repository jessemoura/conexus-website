import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  root: './',
  publicDir: 'public',
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        servicos: resolve(__dirname, 'servicos/index.html'),
        criacaoDeSites: resolve(__dirname, 'servicos/criacao-de-sites/index.html'),
        siteOnePage: resolve(__dirname, 'servicos/site-one-page/index.html'),
        conexusGuestHub: resolve(__dirname, 'servicos/conexus-guest-hub/index.html'),
        seo: resolve(__dirname, 'servicos/seo/index.html'),
        seoLocal: resolve(__dirname, 'servicos/seo-local-google-meu-negocio/index.html'),
        branding: resolve(__dirname, 'servicos/branding-identidade-visual/index.html'),
        gestaoRedes: resolve(__dirname, 'servicos/gestao-redes-sociais/index.html'),
        sobre: resolve(__dirname, 'sobre/index.html'),
        portfolio: resolve(__dirname, 'portfolio/index.html'),
        portfolioDiPiallato: resolve(__dirname, 'portfolio/di-piallato/index.html'),
        portfolioWelcomeBook: resolve(__dirname, 'portfolio/welcome-book-apartamento-41/index.html'),
        portfolioNikkiStudio: resolve(__dirname, 'portfolio/nikki-studio/index.html'),
        portfolioCrafix: resolve(__dirname, 'portfolio/crafix/index.html'),
        portfolioSosAberturas: resolve(__dirname, 'portfolio/sos-aberturas/index.html'),
        portfolioMichellyCorrea: resolve(__dirname, 'portfolio/michelly-correa/index.html'),
        portfolioLumora: resolve(__dirname, 'portfolio/lumora-cleaning-services/index.html'),
        portfolioConexxusUk: resolve(__dirname, 'portfolio/conexxus-uk/index.html'),
        blog: resolve(__dirname, 'blog/index.html'),
        blogComoUsarSiteAtrairClientesGoogle: resolve(__dirname, 'blog/como-usar-site-para-atrair-clientes-google/index.html'),
        blogQuantoCustaSite: resolve(__dirname, 'blog/quanto-custa-site-profissional-2026/index.html'),
        blogPorQueEmpresaPrecisaDeSite: resolve(__dirname, 'blog/por-que-sua-empresa-precisa-de-um-site/index.html'),
        blogSeoLocalSaoJose: resolve(__dirname, 'blog/como-colocar-empresa-no-google-sao-jose-dos-pinhais/index.html'),
        blogGuestHub: resolve(__dirname, 'blog/conexus-guest-hub-guia-digital-para-hospedagens/index.html'),
        blogHospedagem: resolve(__dirname, 'blog/importancia-hospedagem-de-qualidade/index.html'),
        blogRedesSociais: resolve(__dirname, 'blog/redes-sociais-para-empresas/index.html'),
        blogMarketingDigital: resolve(__dirname, 'blog/marketing-digital-para-empresas/index.html'),
        faq: resolve(__dirname, 'faq/index.html'),
        contato: resolve(__dirname, 'contato/index.html'),
        granaPoliticaPrivacidade: resolve(__dirname, 'grana/politica-de-privacidade/index.html')
      }
    }
  },
  server: {
    port: 3000,
    open: true
  }
});
