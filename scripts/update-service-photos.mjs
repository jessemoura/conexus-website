import fs from 'fs';
import path from 'path';

// 1. servicos/criacao-de-sites/index.html
let p1 = 'servicos/criacao-de-sites/index.html';
if (fs.existsSync(p1)) {
  let c = fs.readFileSync(p1, 'utf8');
  c = c.replace(/src="\/assets\/images\/conexus-service-websites-hero-human-[^"]*"/g, 'src="/assets/images/criacao-sites-conexus.webp"');
  fs.writeFileSync(p1, c, 'utf8');
  console.log('Updated criacao-de-sites hero image');
}

// 2. servicos/site-one-page/index.html
let p2 = 'servicos/site-one-page/index.html';
if (fs.existsSync(p2)) {
  let c = fs.readFileSync(p2, 'utf8');
  c = c.replace(/src="\/assets\/images\/conexus-service-one-page-[^"]*"/g, 'src="/assets/images/site-one-page-conexus.webp"');
  fs.writeFileSync(p2, c, 'utf8');
  console.log('Updated site-one-page hero image');
}

// 3. servicos/seo/index.html
let p3 = 'servicos/seo/index.html';
if (fs.existsSync(p3)) {
  let c = fs.readFileSync(p3, 'utf8');
  c = c.replace(/src="\/assets\/images\/conexus-service-seo-[^"]*"/g, 'src="/assets/images/seo-conexus.webp"');
  fs.writeFileSync(p3, c, 'utf8');
  console.log('Updated seo hero image');
}

// 4. servicos/seo-local-google-meu-negocio/index.html
let p4 = 'servicos/seo-local-google-meu-negocio/index.html';
if (fs.existsSync(p4)) {
  let c = fs.readFileSync(p4, 'utf8');
  c = c.replace(/src="\/assets\/images\/conexus-service-local-seo-[^"]*"/g, 'src="/assets/images/seo-local-empresa-google.webp"');
  fs.writeFileSync(p4, c, 'utf8');
  console.log('Updated seo-local hero image');
}

// 5. servicos/branding-identidade-visual/index.html
let p5 = 'servicos/branding-identidade-visual/index.html';
if (fs.existsSync(p5)) {
  let c = fs.readFileSync(p5, 'utf8');
  c = c.replace(/src="\/assets\/images\/conexus-service-branding-[^"]*"/g, 'src="/assets/images/branding-identidade-visual-conexus.webp"');
  fs.writeFileSync(p5, c, 'utf8');
  console.log('Updated branding hero image');
}

// 6. servicos/gestao-redes-sociais/index.html
let p6 = 'servicos/gestao-redes-sociais/index.html';
if (fs.existsSync(p6)) {
  let c = fs.readFileSync(p6, 'utf8');
  c = c.replace(/src="\/assets\/images\/conexus-service-social-media-[^"]*"/g, 'src="/assets/images/social-media-conteudo-conexus.webp"');
  fs.writeFileSync(p6, c, 'utf8');
  console.log('Updated redes-sociais hero image');
}

// 7. servicos/index.html
let p7 = 'servicos/index.html';
if (fs.existsSync(p7)) {
  let c = fs.readFileSync(p7, 'utf8');
  // Hero image
  c = c.replace(/src="\/assets\/images\/conexus-services-hero-human-[^"]*"/g, 'src="/assets/images/marketing-digital-estrategia-conexus.webp"');
  
  // Card 1: Criacao de Sites
  c = c.replace(/src="\/assets\/images\/conexus-home-websites-02\.png\.png"/g, 'src="/assets/images/criacao-sites-conexus.webp"');
  
  // Card 2: Site One Page (add media if only icon)
  if (!c.includes('/assets/images/site-one-page-conexus.webp')) {
    c = c.replace(
      /(<article class="service-card"[^>]*>[\s\r\n]*)(<div class="service-icon">)/g,
      `$1<div class="service-card-media"><img src="/assets/images/site-one-page-conexus.webp" alt="Site One Page para Empresas" width="400" height="190" loading="lazy" style="border-radius: var(--radius-sm); width: 100%; height: 180px; object-fit: cover; margin-bottom: 1rem;"></div>\n            $2`
    );
  }

  // Card 3: SEO para Empresas
  c = c.replace(/src="\/assets\/images\/conexus-home-seo-03\.png\.png"/g, 'src="/assets/images/seo-conexus.webp"');

  // Card 4: SEO Local (add media if only icon)
  if (!c.includes('/assets/images/seo-local-empresa-google.webp')) {
    c = c.replace(
      /(<h3 data-i18n="autoContent\.servicos\.k24">SEO Local & Google Meu Negócio<\/h3>)/g,
      `$1`
    );
    // Let's replace the card structure for SEO Local
    c = c.replace(
      /(<!-- Card 4: SEO Local & Google Meu Negócio -->[\s\S]*?<article class="service-card">[\s\r\n]*)(<div class="service-icon">)/g,
      `$1<div class="service-card-media"><img src="/assets/images/seo-local-empresa-google.webp" alt="SEO Local e Google Meu Negócio" width="400" height="190" loading="lazy" style="border-radius: var(--radius-sm); width: 100%; height: 180px; object-fit: cover; margin-bottom: 1rem;"></div>\n            $2`
    );
  }

  // Card 5: Branding
  if (!c.includes('/assets/images/branding-identidade-visual-conexus.webp')) {
    c = c.replace(
      /(<!-- Card 5: Branding & Identidade Visual -->[\s\S]*?<article class="service-card">[\s\r\n]*)(<div class="service-icon">)/g,
      `$1<div class="service-card-media"><img src="/assets/images/branding-identidade-visual-conexus.webp" alt="Branding e Identidade Visual" width="400" height="190" loading="lazy" style="border-radius: var(--radius-sm); width: 100%; height: 180px; object-fit: cover; margin-bottom: 1rem;"></div>\n            $2`
    );
  }

  // Card 6: Gestao Redes Sociais
  if (!c.includes('/assets/images/social-media-conteudo-conexus.webp')) {
    c = c.replace(
      /(<!-- Card 6: Gestão de Redes Sociais -->[\s\S]*?<article class="service-card">[\s\r\n]*)(<div class="service-icon">)/g,
      `$1<div class="service-card-media"><img src="/assets/images/social-media-conteudo-conexus.webp" alt="Gestão de Redes Sociais" width="400" height="190" loading="lazy" style="border-radius: var(--radius-sm); width: 100%; height: 180px; object-fit: cover; margin-bottom: 1rem;"></div>\n            $2`
    );
  }

  fs.writeFileSync(p7, c, 'utf8');
  console.log('Updated servicos/index.html hero and cards');
}
