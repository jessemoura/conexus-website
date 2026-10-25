const fs = require('fs');

// 1. ATTHOS COMEX
function updateAtthos() {
  let html = fs.readFileSync('portfolio/atthos-comex/index.html', 'utf8');

  // Fix duplicate header in atthos-comex if present
  const headerCount = (html.match(/<header class="header">/g) || []).length;
  if (headerCount > 1) {
    const firstHeaderEnd = html.indexOf('</header>') + '</header>'.length;
    const secondHeaderEnd = html.indexOf('</header>', firstHeaderEnd) + '</header>'.length;
    // Also remove the extra mobile-menu between or after
    const mainStart = html.indexOf('<main>');
    const beforeFirst = html.substring(0, firstHeaderEnd);
    // Find mobile menu after first header
    const mobileMenuEnd = html.indexOf('</div>', html.indexOf('<div id="mobile-menu"')) + '</div>'.length;
    const cleanHeaderSection = html.substring(0, mobileMenuEnd);
    const afterMain = html.substring(mainStart);
    html = cleanHeaderSection + '\n\n  ' + afterMain;
    console.log('Cleaned duplicate header from atthos-comex');
  }

  // Update <main> with data-i18n attributes
  html = html.replace('<span>Atthos Comex</span>', '<span data-i18n="autoContent.portfolio_atthos_comex.k1">Atthos Comex</span>');
  html = html.replace(
    '<span class="badge" style="background: rgba(0, 191, 165, 0.12); color: var(--color-brand-primary); border: 1px solid rgba(0, 191, 165, 0.3); margin-bottom: 1rem; display: inline-block; padding: 0.4rem 1rem; border-radius: 50px; font-weight: 600; font-size: 0.85rem;">CASE STUDY • COMÉRCIO EXTERIOR • SÃO JOSÉ DOS PINHAIS/PR</span>',
    '<span class="badge" style="background: rgba(0, 191, 165, 0.12); color: var(--color-brand-primary); border: 1px solid rgba(0, 191, 165, 0.3); margin-bottom: 1rem; display: inline-block; padding: 0.4rem 1rem; border-radius: 50px; font-weight: 600; font-size: 0.85rem;" data-i18n="autoContent.portfolio_atthos_comex.k2">CASE STUDY • COMÉRCIO EXTERIOR • SÃO JOSÉ DOS PINHAIS/PR</span>'
  );
  html = html.replace(
    '<h1 class="hero-title" style="font-size: clamp(2.2rem, 5vw, 3.4rem); line-height: 1.15; margin-bottom: 1.25rem;">Atthos Comex — Website Multilíngue para Comércio Exterior</h1>',
    '<h1 class="hero-title" style="font-size: clamp(2.2rem, 5vw, 3.4rem); line-height: 1.15; margin-bottom: 1.25rem;" data-i18n="autoContent.portfolio_atthos_comex.k3">Atthos Comex — Website Multilíngue para Comércio Exterior</h1>'
  );
  html = html.replace(
    '<p class="hero-subtitle" style="font-size: 1.15rem; color: var(--color-text-secondary); max-width: 760px; margin: 0 auto 2rem;">Projeto digital de autoridade corporativa desenvolvido para a Atthos Comex, reunindo soluções integradas em comércio exterior, estrutura multilíngue (PT/EN/ES) e presença digital estratégica.</p>',
    '<p class="hero-subtitle" style="font-size: 1.15rem; color: var(--color-text-secondary); max-width: 760px; margin: 0 auto 2rem;" data-i18n="autoContent.portfolio_atthos_comex.k4">Projeto digital de autoridade corporativa desenvolvido para a Atthos Comex, reunindo soluções integradas em comércio exterior, estrutura multilíngue (PT/EN/ES) e presença digital estratégica.</p>'
  );

  // Metadata labels
  html = html.replace(
    '<span style="font-size: 0.8rem; text-transform: uppercase; letter-spacing: 0.05em; color: var(--color-text-muted); display: block; margin-bottom: 0.25rem;">Cliente</span>',
    '<span style="font-size: 0.8rem; text-transform: uppercase; letter-spacing: 0.05em; color: var(--color-text-muted); display: block; margin-bottom: 0.25rem;" data-i18n="autoContent.portfolio_atthos_comex.k5">Cliente</span>'
  );
  html = html.replace(
    '<span style="font-size: 0.8rem; text-transform: uppercase; letter-spacing: 0.05em; color: var(--color-text-muted); display: block; margin-bottom: 0.25rem;">Localização</span>',
    '<span style="font-size: 0.8rem; text-transform: uppercase; letter-spacing: 0.05em; color: var(--color-text-muted); display: block; margin-bottom: 0.25rem;" data-i18n="autoContent.portfolio_atthos_comex.k7">Localização</span>'
  );
  html = html.replace(
    '<strong style="font-size: 1rem; color: var(--color-text-main);">São José dos Pinhais — PR 🇧🇷</strong>',
    '<strong style="font-size: 1rem; color: var(--color-text-main);" data-i18n="autoContent.portfolio_atthos_comex.k8">São José dos Pinhais — PR 🇧🇷</strong>'
  );
  html = html.replace(
    '<span style="font-size: 0.8rem; text-transform: uppercase; letter-spacing: 0.05em; color: var(--color-text-muted); display: block; margin-bottom: 0.25rem;">Segmento</span>',
    '<span style="font-size: 0.8rem; text-transform: uppercase; letter-spacing: 0.05em; color: var(--color-text-muted); display: block; margin-bottom: 0.25rem;" data-i18n="autoContent.portfolio_atthos_comex.k9">Segmento</span>'
  );
  html = html.replace(
    '<strong style="font-size: 1rem; color: var(--color-text-main);">Comércio Exterior • Logística Internacional • Assessoria Aduaneira</strong>',
    '<strong style="font-size: 1rem; color: var(--color-text-main);" data-i18n="autoContent.portfolio_atthos_comex.k10">Comércio Exterior • Logística Internacional • Assessoria Aduaneira</strong>'
  );
  html = html.replace(
    '<span style="font-size: 0.8rem; text-transform: uppercase; letter-spacing: 0.05em; color: var(--color-text-muted); display: block; margin-bottom: 0.25rem;">Projeto</span>',
    '<span style="font-size: 0.8rem; text-transform: uppercase; letter-spacing: 0.05em; color: var(--color-text-muted); display: block; margin-bottom: 0.25rem;" data-i18n="autoContent.portfolio_atthos_comex.k11">Projeto</span>'
  );
  html = html.replace(
    '<strong style="font-size: 1rem; color: var(--color-text-main);">Website Multilíngue • SEO • Presença Digital</strong>',
    '<strong style="font-size: 1rem; color: var(--color-text-main);" data-i18n="autoContent.portfolio_atthos_comex.k12">Website Multilíngue • SEO • Presença Digital</strong>'
  );
  html = html.replace(
    '<span style="font-size: 0.8rem; text-transform: uppercase; letter-spacing: 0.05em; color: var(--color-text-muted); display: block; margin-bottom: 0.25rem;">Desenvolvimento</span>',
    '<span style="font-size: 0.8rem; text-transform: uppercase; letter-spacing: 0.05em; color: var(--color-text-muted); display: block; margin-bottom: 0.25rem;" data-i18n="autoContent.portfolio_atthos_comex.k13">Desenvolvimento</span>'
  );

  // O Projeto
  html = html.replace(
    '<span class="badge" style="background: rgba(0, 191, 165, 0.12); color: var(--color-brand-primary); border: 1px solid rgba(0, 191, 165, 0.3); margin-bottom: 1rem; display: inline-block; padding: 0.35rem 0.9rem; border-radius: 50px; font-weight: 600; font-size: 0.8rem;">VISÃO GERAL</span>',
    '<span class="badge" style="background: rgba(0, 191, 165, 0.12); color: var(--color-brand-primary); border: 1px solid rgba(0, 191, 165, 0.3); margin-bottom: 1rem; display: inline-block; padding: 0.35rem 0.9rem; border-radius: 50px; font-weight: 600; font-size: 0.8rem;" data-i18n="autoContent.portfolio_atthos_comex.k15">VISÃO GERAL</span>'
  );
  html = html.replace(
    '<h2 style="font-size: clamp(1.6rem, 3.5vw, 2.2rem); margin-bottom: 1.25rem; color: var(--color-text-main);">O Projeto</h2>',
    '<h2 style="font-size: clamp(1.6rem, 3.5vw, 2.2rem); margin-bottom: 1.25rem; color: var(--color-text-main);" data-i18n="autoContent.portfolio_atthos_comex.k16">O Projeto</h2>'
  );
  html = html.replace(
    '<p style="color: var(--color-text-secondary); font-size: 1.05rem; line-height: 1.7; margin-bottom: 1.25rem;">A Atthos Comex é uma empresa especializada em comércio exterior com sede estratégica em São José dos Pinhais/PR, polo de conexão logística e aduaneira no Paraná. A empresa atua oferecendo assessoria consultiva, desembaraço aduaneiro, gestão logística e coordenação de transportes internacionais para organizações que operam no mercado global.</p>',
    '<p style="color: var(--color-text-secondary); font-size: 1.05rem; line-height: 1.7; margin-bottom: 1.25rem;" data-i18n="autoContent.portfolio_atthos_comex.k17">A Atthos Comex é uma empresa especializada em comércio exterior com sede estratégica em São José dos Pinhais/PR, polo de conexão logística e aduaneira no Paraná. A empresa atua oferecendo assessoria consultiva, desembaraço aduaneiro, gestão logística e coordenação de transportes internacionais para organizações que operam no mercado global.</p>'
  );
  html = html.replace(
    '<p style="color: var(--color-text-secondary); font-size: 1.05rem; line-height: 1.7; margin: 0;">A CONEXUS foi responsável por estruturar e desenvolver a plataforma digital corporativa da Atthos Comex, projetando um website moderno com arquitetura multilíngue (Português, Inglês e Espanhol), apresentação técnica dos serviços e posicionamento voltado à autoridade e segurança operacional.</p>',
    '<p style="color: var(--color-text-secondary); font-size: 1.05rem; line-height: 1.7; margin: 0;" data-i18n="autoContent.portfolio_atthos_comex.k18">A CONEXUS foi responsável por estruturar e desenvolver a plataforma digital corporativa da Atthos Comex, projetando um website moderno com arquitetura multilíngue (Português, Inglês e Espanhol), apresentação técnica dos serviços e posicionamento voltado à autoridade e segurança operacional.</p>'
  );

  // Desafio Estratégico
  html = html.replace(
    '<h2 style="font-size: 1.6rem; margin-bottom: 1rem; color: var(--color-text-main);">Desafio Estratégico</h2>',
    '<h2 style="font-size: 1.6rem; margin-bottom: 1rem; color: var(--color-text-main);" data-i18n="autoContent.portfolio_atthos_comex.k19">Desafio Estratégico</h2>'
  );
  html = html.replace(
    '<p style="color: var(--color-text-secondary); line-height: 1.6; margin-bottom: 1rem;">No comércio exterior, a credibilidade institucional, clareza regulatória e segurança jurídica são determinantes. A presença online precisava refletir a solidez e a experiência da Atthos Comex tanto para o mercado nacional quanto para parceiros e clientes no exterior.</p>',
    '<p style="color: var(--color-text-secondary); line-height: 1.6; margin-bottom: 1rem;" data-i18n="autoContent.portfolio_atthos_comex.k20">No comércio exterior, a credibilidade institucional, clareza regulatória e segurança jurídica são determinantes. A presença online precisava refletir a solidez e a experiência da Atthos Comex tanto para o mercado nacional quanto para parceiros e clientes no exterior.</p>'
  );
  html = html.replace(
    '<p style="color: var(--color-text-secondary); line-height: 1.6;">O projeto exigia uma navegação fluida em três idiomas, organização intuitiva de cada frente de serviço e carregamento veloz para atender tomadores de decisão em diferentes fusos horários e dispositivos.</p>',
    '<p style="color: var(--color-text-secondary); line-height: 1.6;" data-i18n="autoContent.portfolio_atthos_comex.k21">O projeto exigia uma navegação fluida em três idiomas, organização intuitiva de cada frente de serviço e carregamento veloz para atender tomadores de decisão em diferentes fusos horários e dispositivos.</p>'
  );

  // Solução Desenvolvida
  html = html.replace(
    '<h2 style="font-size: 1.6rem; margin-bottom: 1rem; color: var(--color-text-main);">Solução Desenvolvida</h2>',
    '<h2 style="font-size: 1.6rem; margin-bottom: 1rem; color: var(--color-text-main);" data-i18n="autoContent.portfolio_atthos_comex.k22">Solução Desenvolvida</h2>'
  );
  html = html.replace(
    '<p style="color: var(--color-text-secondary); line-height: 1.6; margin-bottom: 1rem;">A CONEXUS implementou uma plataforma digital corporativa com suporte multilíngue nativo, tipografia refinada, estética alinhada ao setor de logística global e arquitetura modular de alta performance.</p>',
    '<p style="color: var(--color-text-secondary); line-height: 1.6; margin-bottom: 1rem;" data-i18n="autoContent.portfolio_atthos_comex.k23">A CONEXUS implementou uma plataforma digital corporativa com suporte multilíngue nativo, tipografia refinada, estética alinhada ao setor de logística global e arquitetura modular de alta performance.</p>'
  );
  html = html.replace(
    '<p style="color: var(--color-text-secondary); line-height: 1.6;">Cada segmento de atuação — assessoria, despacho aduaneiro, frete internacional, seguro de cargas e transporte rodoviário — recebeu detalhamento estruturado, com canais diretos de contato comercial e conformidade com as melhores práticas de SEO internacional.</p>',
    '<p style="color: var(--color-text-secondary); line-height: 1.6;" data-i18n="autoContent.portfolio_atthos_comex.k24">Cada segmento de atuação — assessoria, despacho aduaneiro, frete internacional, seguro de cargas e transporte rodoviário — recebeu detalhamento estruturado, com canais diretos de contato comercial e conformidade com as melhores práticas de SEO internacional.</p>'
  );

  // Serviços Apresentados
  html = html.replace(
    '<span class="badge" style="margin-bottom: 0.75rem; display: inline-block;">ESCOPO DO PROJETO</span>',
    '<span class="badge" style="margin-bottom: 0.75rem; display: inline-block;" data-i18n="autoContent.portfolio_atthos_comex.k25">ESCOPO DO PROJETO</span>'
  );
  html = html.replace(
    '<h2 style="font-size: 2.2rem; margin-bottom: 1rem; color: var(--color-text-main);">Serviços e Soluções Apresentados</h2>',
    '<h2 style="font-size: 2.2rem; margin-bottom: 1rem; color: var(--color-text-main);" data-i18n="autoContent.portfolio_atthos_comex.k26">Serviços e Soluções Apresentados</h2>'
  );
  html = html.replace(
    '<p style="color: var(--color-text-secondary); font-size: 1.05rem;">Estruturação técnica e institucional das frentes de atuação da Atthos Comex.</p>',
    '<p style="color: var(--color-text-secondary); font-size: 1.05rem;" data-i18n="autoContent.portfolio_atthos_comex.k27">Estruturação técnica e institucional das frentes de atuação da Atthos Comex.</p>'
  );

  // Cards
  html = html.replace('<h3 style="font-size: 1.1rem; margin-bottom: 0.35rem; color: var(--color-text-main);">Assessoria em Comércio Exterior</h3>', '<h3 style="font-size: 1.1rem; margin-bottom: 0.35rem; color: var(--color-text-main);" data-i18n="autoContent.portfolio_atthos_comex.k28">Assessoria em Comércio Exterior</h3>');
  html = html.replace('<p style="color: var(--color-text-secondary); font-size: 0.9rem; line-height: 1.5; margin: 0;">Consultoria estratégica para planejamento, conformidade e redução de custos aduaneiros.</p>', '<p style="color: var(--color-text-secondary); font-size: 0.9rem; line-height: 1.5; margin: 0;" data-i18n="autoContent.portfolio_atthos_comex.k29">Consultoria estratégica para planejamento, conformidade e redução de custos aduaneiros.</p>');

  html = html.replace('<h3 style="font-size: 1.1rem; margin-bottom: 0.35rem; color: var(--color-text-main);">Despacho Aduaneiro</h3>', '<h3 style="font-size: 1.1rem; margin-bottom: 0.35rem; color: var(--color-text-main);" data-i18n="autoContent.portfolio_atthos_comex.k30">Despacho Aduaneiro</h3>');
  html = html.replace('<p style="color: var(--color-text-secondary); font-size: 0.9rem; line-height: 1.5; margin: 0;">Gestão documental e desembaraço ágil de importações e exportações nos principais recintos.</p>', '<p style="color: var(--color-text-secondary); font-size: 0.9rem; line-height: 1.5; margin: 0;" data-i18n="autoContent.portfolio_atthos_comex.k31">Gestão documental e desembaraço ágil de importações e exportações nos principais recintos.</p>');

  html = html.replace('<h3 style="font-size: 1.1rem; margin-bottom: 0.35rem; color: var(--color-text-main);">Transporte Internacional</h3>', '<h3 style="font-size: 1.1rem; margin-bottom: 0.35rem; color: var(--color-text-main);" data-i18n="autoContent.portfolio_atthos_comex.k32">Transporte Internacional</h3>');
  html = html.replace('<p style="color: var(--color-text-secondary); font-size: 0.9rem; line-height: 1.5; margin: 0;">Agenciamento e coordenação de fretes marítimos, aéreos e rodoviários internacionais.</p>', '<p style="color: var(--color-text-secondary); font-size: 0.9rem; line-height: 1.5; margin: 0;" data-i18n="autoContent.portfolio_atthos_comex.k33">Agenciamento e coordenação de fretes marítimos, aéreos e rodoviários internacionais.</p>');

  html = html.replace('<h3 style="font-size: 1.1rem; margin-bottom: 0.35rem; color: var(--color-text-main);">Seguro Internacional de Cargas</h3>', '<h3 style="font-size: 1.1rem; margin-bottom: 0.35rem; color: var(--color-text-main);" data-i18n="autoContent.portfolio_atthos_comex.k34">Seguro Internacional de Cargas</h3>');
  html = html.replace('<p style="color: var(--color-text-secondary); font-size: 0.9rem; line-height: 1.5; margin: 0;">Proteção e cobertura patrimonial personalizada para mercadorias em trânsito global.</p>', '<p style="color: var(--color-text-secondary); font-size: 0.9rem; line-height: 1.5; margin: 0;" data-i18n="autoContent.portfolio_atthos_comex.k35">Proteção e cobertura patrimonial personalizada para mercadorias em trânsito global.</p>');

  html = html.replace('<h3 style="font-size: 1.1rem; margin-bottom: 0.35rem; color: var(--color-text-main);">Transporte Rodoviário de Cargas</h3>', '<h3 style="font-size: 1.1rem; margin-bottom: 0.35rem; color: var(--color-text-main);" data-i18n="autoContent.portfolio_atthos_comex.k36">Transporte Rodoviário de Cargas</h3>');
  html = html.replace('<p style="color: var(--color-text-secondary); font-size: 0.9rem; line-height: 1.5; margin: 0;">Integração logística ponto a ponto entre portos, aeroportos, plantas e centros de distribuição.</p>', '<p style="color: var(--color-text-secondary); font-size: 0.9rem; line-height: 1.5; margin: 0;" data-i18n="autoContent.portfolio_atthos_comex.k37">Integração logística ponto a ponto entre portos, aeroportos, plantas e centros de distribuição.</p>');

  html = html.replace('<h3 style="font-size: 1.1rem; margin-bottom: 0.35rem; color: var(--color-text-main);">Soluções Integradas</h3>', '<h3 style="font-size: 1.1rem; margin-bottom: 0.35rem; color: var(--color-text-main);" data-i18n="autoContent.portfolio_atthos_comex.k38">Soluções Integradas</h3>');
  html = html.replace('<p style="color: var(--color-text-secondary); font-size: 0.9rem; line-height: 1.5; margin: 0;">Coordenação de toda a cadeia de suprimentos internacional com visão unificada.</p>', '<p style="color: var(--color-text-secondary); font-size: 0.9rem; line-height: 1.5; margin: 0;" data-i18n="autoContent.portfolio_atthos_comex.k39">Coordenação de toda a cadeia de suprimentos internacional com visão unificada.</p>');

  html = html.replace('<h3 style="font-size: 1.1rem; margin-bottom: 0.35rem; color: var(--color-text-main);">Estrutura Multilíngue (PT/EN/ES)</h3>', '<h3 style="font-size: 1.1rem; margin-bottom: 0.35rem; color: var(--color-text-main);" data-i18n="autoContent.portfolio_atthos_comex.k40">Estrutura Multilíngue (PT/EN/ES)</h3>');
  html = html.replace('<p style="color: var(--color-text-secondary); font-size: 0.9rem; line-height: 1.5; margin: 0;">Apresentação corporativa clara para negociações com clientes no Brasil e no exterior.</p>', '<p style="color: var(--color-text-secondary); font-size: 0.9rem; line-height: 1.5; margin: 0;" data-i18n="autoContent.portfolio_atthos_comex.k41">Apresentação corporativa clara para negociações com clientes no Brasil e no exterior.</p>');

  html = html.replace('<h3 style="font-size: 1.1rem; margin-bottom: 0.35rem; color: var(--color-text-main);">SEO Técnico e Corporativo</h3>', '<h3 style="font-size: 1.1rem; margin-bottom: 0.35rem; color: var(--color-text-main);" data-i18n="autoContent.portfolio_atthos_comex.k42">SEO Técnico e Corporativo</h3>');
  html = html.replace('<p style="color: var(--color-text-secondary); font-size: 0.9rem; line-height: 1.5; margin: 0;">Posicionamento qualificado nos mecanismos de busca para empresas importadoras e exportadoras.</p>', '<p style="color: var(--color-text-secondary); font-size: 0.9rem; line-height: 1.5; margin: 0;" data-i18n="autoContent.portfolio_atthos_comex.k43">Posicionamento qualificado nos mecanismos de busca para empresas importadoras e exportadoras.</p>');

  // Autoridade
  html = html.replace('<h2 style="font-size: clamp(1.6rem, 3.5vw, 2.2rem); margin-bottom: 1.25rem; color: var(--color-text-main);">Posicionamento estratégico para o comércio global</h2>', '<h2 style="font-size: clamp(1.6rem, 3.5vw, 2.2rem); margin-bottom: 1.25rem; color: var(--color-text-main);" data-i18n="autoContent.portfolio_atthos_comex.k44">Posicionamento estratégico para o comércio global</h2>');
  html = html.replace('<p style="color: var(--color-text-secondary); font-size: 1.05rem; line-height: 1.7; margin-bottom: 1.25rem;">A plataforma da Atthos Comex foi concebida para atender à sofisticação e exigência do ambiente corporativo internacional. Cada detalhe visual e textual transmite o rigor técnico e a transparência necessários para operações aduaneiras complexas.</p>', '<p style="color: var(--color-text-secondary); font-size: 1.05rem; line-height: 1.7; margin-bottom: 1.25rem;" data-i18n="autoContent.portfolio_atthos_comex.k45">A plataforma da Atthos Comex foi concebida para atender à sofisticação e exigência do ambiente corporativo internacional. Cada detalhe visual e textual transmite o rigor técnico e a transparência necessários para operações aduaneiras complexas.</p>');
  html = html.replace('<p style="color: var(--color-text-secondary); font-size: 1.05rem; line-height: 1.7; margin: 0;">Com desempenho veloz e navegação responsiva em qualquer dispositivo, o projeto consolida a Atthos Comex como referência em assessoria e logística internacional.</p>', '<p style="color: var(--color-text-secondary); font-size: 1.05rem; line-height: 1.7; margin: 0;" data-i18n="autoContent.portfolio_atthos_comex.k46">Com desempenho veloz e navegação responsiva em qualquer dispositivo, o projeto consolida a Atthos Comex como referência em assessoria e logística internacional.</p>');

  // CTA
  html = html.replace('<h2 style="font-size: clamp(1.8rem, 4vw, 2.8rem); line-height: 1.2; margin-bottom: 1.25rem; color: var(--color-text-main);">Conheça a Atthos Comex</h2>', '<h2 style="font-size: clamp(1.8rem, 4vw, 2.8rem); line-height: 1.2; margin-bottom: 1.25rem; color: var(--color-text-main);" data-i18n="autoContent.portfolio_atthos_comex.k47">Conheça a Atthos Comex</h2>');
  html = html.replace('<p style="font-size: 1.1rem; color: var(--color-text-secondary); max-width: 680px; margin: 0 auto 2.5rem; line-height: 1.6;">Explore a plataforma web e a experiência digital desenvolvida pela CONEXUS para a Atthos Comex.</p>', '<p style="font-size: 1.1rem; color: var(--color-text-secondary); max-width: 680px; margin: 0 auto 2.5rem; line-height: 1.6;" data-i18n="autoContent.portfolio_atthos_comex.k48">Explore a plataforma web e a experiência digital desenvolvida pela CONEXUS para a Atthos Comex.</p>');
  html = html.replace('Visitar Website ↗</a>', '<span data-i18n="common.visitWebsite">Visitar Website ↗</span></a>');

  fs.writeFileSync('portfolio/atthos-comex/index.html', html, 'utf8');
  console.log('Successfully updated portfolio/atthos-comex/index.html');
}

// 2. CURITIPAO
function updateCuritipao() {
  let html = fs.readFileSync('portfolio/curitipao/index.html', 'utf8');

  html = html.replace('<span>CuritiPão 2026</span>', '<span data-i18n="autoContent.portfolio_curitipao.k1">CuritiPão 2026</span>');
  html = html.replace(
    '<span class="badge" style="background: rgba(230, 126, 34, 0.12); color: #E67E22; border: 1px solid rgba(230, 126, 34, 0.3); margin-bottom: 1rem; display: inline-block; padding: 0.4rem 1rem; border-radius: 50px; font-weight: 600; font-size: 0.85rem;">CASE STUDY • GASTRONOMIA & EVENTOS • CURITIBA/PR</span>',
    '<span class="badge" style="background: rgba(230, 126, 34, 0.12); color: #E67E22; border: 1px solid rgba(230, 126, 34, 0.3); margin-bottom: 1rem; display: inline-block; padding: 0.4rem 1rem; border-radius: 50px; font-weight: 600; font-size: 0.85rem;" data-i18n="autoContent.portfolio_curitipao.k2">CASE STUDY • GASTRONOMIA & EVENTOS • CURITIBA/PR</span>'
  );
  html = html.replace(
    '<h1 class="hero-title" style="font-size: clamp(2.2rem, 5vw, 3.4rem); line-height: 1.15; margin-bottom: 1.25rem;">CuritiPão — Festival de Panificação de Curitiba</h1>',
    '<h1 class="hero-title" style="font-size: clamp(2.2rem, 5vw, 3.4rem); line-height: 1.15; margin-bottom: 1.25rem;" data-i18n="autoContent.portfolio_curitipao.k3">CuritiPão — Festival de Panificação de Curitiba</h1>'
  );
  html = html.replace(
    '<p class="hero-subtitle" style="font-size: 1.15rem; color: var(--color-text-secondary); max-width: 760px; margin: 0 auto 2rem;">O CuritiPão nasce como uma iniciativa dedicada a valorizar a cultura da panificação, aproximando público, padarias e experiências gastronômicas em Curitiba.</p>',
    '<p class="hero-subtitle" style="font-size: 1.15rem; color: var(--color-text-secondary); max-width: 760px; margin: 0 auto 2rem;" data-i18n="autoContent.portfolio_curitipao.k4">O CuritiPão nasce como uma iniciativa dedicada a valorizar a cultura da panificação, aproximando público, padarias e experiências gastronômicas em Curitiba.</p>'
  );

  // Metadata labels
  html = html.replace(
    '<span style="font-size: 0.8rem; text-transform: uppercase; letter-spacing: 0.05em; color: var(--color-text-muted); display: block; margin-bottom: 0.25rem;">Cliente</span>',
    '<span style="font-size: 0.8rem; text-transform: uppercase; letter-spacing: 0.05em; color: var(--color-text-muted); display: block; margin-bottom: 0.25rem;" data-i18n="autoContent.portfolio_curitipao.k5">Cliente</span>'
  );
  html = html.replace(
    '<span style="font-size: 0.8rem; text-transform: uppercase; letter-spacing: 0.05em; color: var(--color-text-muted); display: block; margin-bottom: 0.25rem;">Localização</span>',
    '<span style="font-size: 0.8rem; text-transform: uppercase; letter-spacing: 0.05em; color: var(--color-text-muted); display: block; margin-bottom: 0.25rem;" data-i18n="autoContent.portfolio_curitipao.k7">Localização</span>'
  );
  html = html.replace(
    '<strong style="font-size: 1rem; color: var(--color-text-main);">Curitiba – PR 🇧🇷</strong>',
    '<strong style="font-size: 1rem; color: var(--color-text-main);" data-i18n="autoContent.portfolio_curitipao.k8">Curitiba – PR 🇧🇷</strong>'
  );
  html = html.replace(
    '<span style="font-size: 0.8rem; text-transform: uppercase; letter-spacing: 0.05em; color: var(--color-text-muted); display: block; margin-bottom: 0.25rem;">Segmento</span>',
    '<span style="font-size: 0.8rem; text-transform: uppercase; letter-spacing: 0.05em; color: var(--color-text-muted); display: block; margin-bottom: 0.25rem;" data-i18n="autoContent.portfolio_curitipao.k9">Segmento</span>'
  );
  html = html.replace(
    '<strong style="font-size: 1rem; color: var(--color-text-main);">Festival Gastronômico • Panificação • Eventos</strong>',
    '<strong style="font-size: 1rem; color: var(--color-text-main);" data-i18n="autoContent.portfolio_curitipao.k10">Festival Gastronômico • Panificação • Eventos</strong>'
  );
  html = html.replace(
    '<span style="font-size: 0.8rem; text-transform: uppercase; letter-spacing: 0.05em; color: var(--color-text-muted); display: block; margin-bottom: 0.25rem;">Projeto</span>',
    '<span style="font-size: 0.8rem; text-transform: uppercase; letter-spacing: 0.05em; color: var(--color-text-muted); display: block; margin-bottom: 0.25rem;" data-i18n="autoContent.portfolio_curitipao.k11">Projeto</span>'
  );
  html = html.replace(
    '<strong style="font-size: 1rem; color: var(--color-text-main);">Presença Digital • Website • Experiência Responsiva</strong>',
    '<strong style="font-size: 1rem; color: var(--color-text-main);" data-i18n="autoContent.portfolio_curitipao.k12">Presença Digital • Website • Experiência Responsiva</strong>'
  );
  html = html.replace(
    '<span style="font-size: 0.8rem; text-transform: uppercase; letter-spacing: 0.05em; color: var(--color-text-muted); display: block; margin-bottom: 0.25rem;">Desenvolvimento</span>',
    '<span style="font-size: 0.8rem; text-transform: uppercase; letter-spacing: 0.05em; color: var(--color-text-muted); display: block; margin-bottom: 0.25rem;" data-i18n="autoContent.portfolio_curitipao.k13">Desenvolvimento</span>'
  );

  // O Projeto
  html = html.replace(
    '<span class="badge" style="background: rgba(230, 126, 34, 0.12); color: #E67E22; border: 1px solid rgba(230, 126, 34, 0.3); margin-bottom: 1rem; display: inline-block; padding: 0.35rem 0.9rem; border-radius: 50px; font-weight: 600; font-size: 0.8rem;">VISÃO GERAL</span>',
    '<span class="badge" style="background: rgba(230, 126, 34, 0.12); color: #E67E22; border: 1px solid rgba(230, 126, 34, 0.3); margin-bottom: 1rem; display: inline-block; padding: 0.35rem 0.9rem; border-radius: 50px; font-weight: 600; font-size: 0.8rem;" data-i18n="autoContent.portfolio_curitipao.k15">VISÃO GERAL</span>'
  );
  html = html.replace(
    '<h2 style="font-size: clamp(1.6rem, 3.5vw, 2.2rem); margin-bottom: 1.25rem; color: var(--color-text-main);">O Projeto</h2>',
    '<h2 style="font-size: clamp(1.6rem, 3.5vw, 2.2rem); margin-bottom: 1.25rem; color: var(--color-text-main);" data-i18n="autoContent.portfolio_curitipao.k16">O Projeto</h2>'
  );
  html = html.replace(
    '<p style="color: var(--color-text-secondary); font-size: 1.05rem; line-height: 1.7; margin-bottom: 1.25rem;">O CuritiPão nasce como uma iniciativa dedicada a valorizar a cultura da panificação, aproximando público, padarias e experiências gastronômicas em Curitiba.</p>',
    '<p style="color: var(--color-text-secondary); font-size: 1.05rem; line-height: 1.7; margin-bottom: 1.25rem;" data-i18n="autoContent.portfolio_curitipao.k17">O CuritiPão nasce como uma iniciativa dedicada a valorizar a cultura da panificação, aproximando público, padarias e experiências gastronômicas em Curitiba.</p>'
  );
  html = html.replace(
    '<p style="color: var(--color-text-secondary); font-size: 1.05rem; line-height: 1.7; margin: 0;">A CONEXUS foi responsável pelo desenvolvimento da presença digital do projeto, criando uma plataforma preparada para apresentar o festival de maneira clara, atrativa e acessível em diferentes dispositivos.</p>',
    '<p style="color: var(--color-text-secondary); font-size: 1.05rem; line-height: 1.7; margin: 0;" data-i18n="autoContent.portfolio_curitipao.k18">A CONEXUS foi responsável pelo desenvolvimento da presença digital do projeto, criando uma plataforma preparada para apresentar o festival de maneira clara, atrativa e acessível em diferentes dispositivos.</p>'
  );

  // Desafio Estratégico
  html = html.replace(
    '<h2 style="font-size: 1.6rem; margin-bottom: 1rem; color: var(--color-text-main);">Desafio Estratégico</h2>',
    '<h2 style="font-size: 1.6rem; margin-bottom: 1rem; color: var(--color-text-main);" data-i18n="autoContent.portfolio_curitipao.k19">Desafio Estratégico</h2>'
  );
  html = html.replace(
    '<p style="color: var(--color-text-secondary); line-height: 1.6; margin-bottom: 1rem;">O desafio foi transformar a identidade e a proposta do CuritiPão em uma experiência digital capaz de comunicar rapidamente o conceito do festival e despertar o interesse do público.</p>',
    '<p style="color: var(--color-text-secondary); line-height: 1.6; margin-bottom: 1rem;" data-i18n="autoContent.portfolio_curitipao.k20">O desafio foi transformar a identidade e a proposta do CuritiPão em uma experiência digital capaz de comunicar rapidamente o conceito do festival e despertar o interesse do público.</p>'
  );
  html = html.replace(
    '<p style="color: var(--color-text-secondary); line-height: 1.6;">Além de apresentar o evento, a plataforma precisava criar uma base digital que pudesse acompanhar a evolução do CuritiPão e futuramente comportar novos conteúdos, participantes, parceiros e informações relacionadas ao festival.</p>',
    '<p style="color: var(--color-text-secondary); line-height: 1.6;" data-i18n="autoContent.portfolio_curitipao.k21">Além de apresentar o evento, a plataforma precisava criar uma base digital que pudesse acompanhar a evolução do CuritiPão e futuramente comportar novos conteúdos, participantes, parceiros e informações relacionadas ao festival.</p>'
  );

  // Solução Desenvolvida
  html = html.replace(
    '<h2 style="font-size: 1.6rem; margin-bottom: 1rem; color: var(--color-text-main);">Solução Desenvolvida</h2>',
    '<h2 style="font-size: 1.6rem; margin-bottom: 1rem; color: var(--color-text-main);" data-i18n="autoContent.portfolio_curitipao.k22">Solução Desenvolvida</h2>'
  );
  html = html.replace(
    '<p style="color: var(--color-text-secondary); line-height: 1.6; margin-bottom: 1rem;">A CONEXUS desenvolveu uma experiência digital responsiva, priorizando navegação simples, identidade visual consistente e apresentação clara das principais informações do CuritiPão.</p>',
    '<p style="color: var(--color-text-secondary); line-height: 1.6; margin-bottom: 1rem;" data-i18n="autoContent.portfolio_curitipao.k23">A CONEXUS desenvolveu uma experiência digital responsiva, priorizando navegação simples, identidade visual consistente e apresentação clara das principais informações do CuritiPão.</p>'
  );
  html = html.replace(
    '<p style="color: var(--color-text-secondary); line-height: 1.6;">A estrutura foi pensada não apenas para a edição atual do festival, mas também como uma base digital preparada para evoluir junto com o projeto.</p>',
    '<p style="color: var(--color-text-secondary); line-height: 1.6;" data-i18n="autoContent.portfolio_curitipao.k24">A estrutura foi pensada não apenas para a edição atual do festival, mas também como uma base digital preparada para evoluir junto com o projeto.</p>'
  );

  // Principais Entregas
  html = html.replace(
    '<h2 style="font-size: 2.2rem; margin-bottom: 1rem; color: var(--color-text-main);">Principais Entregas</h2>',
    '<h2 style="font-size: 2.2rem; margin-bottom: 1rem; color: var(--color-text-main);" data-i18n="autoContent.portfolio_curitipao.k26">Principais Entregas</h2>'
  );
  html = html.replace(
    '<p style="color: var(--color-text-secondary); font-size: 1.05rem;">Soluções digitais implementadas pela CONEXUS para a consolidação da presença online do festival.</p>',
    '<p style="color: var(--color-text-secondary); font-size: 1.05rem;" data-i18n="autoContent.portfolio_curitipao.k27">Soluções digitais implementadas pela CONEXUS para a consolidação da presença online do festival.</p>'
  );

  // Cards
  html = html.replace('<h3 style="font-size: 1.1rem; margin-bottom: 0.35rem; color: var(--color-text-main);">Desenvolvimento da presença digital</h3>', '<h3 style="font-size: 1.1rem; margin-bottom: 0.35rem; color: var(--color-text-main);" data-i18n="autoContent.portfolio_curitipao.k28">Desenvolvimento da presença digital</h3>');
  html = html.replace('<p style="color: var(--color-text-secondary); font-size: 0.9rem; line-height: 1.5; margin: 0;">Criação e estruturação da presença digital do CuritiPão.</p>', '<p style="color: var(--color-text-secondary); font-size: 0.9rem; line-height: 1.5; margin: 0;" data-i18n="autoContent.portfolio_curitipao.k29">Criação e estruturação da presença digital do CuritiPão.</p>');

  html = html.replace('<h3 style="font-size: 1.1rem; margin-bottom: 0.35rem; color: var(--color-text-main);">Website responsivo</h3>', '<h3 style="font-size: 1.1rem; margin-bottom: 0.35rem; color: var(--color-text-main);" data-i18n="autoContent.portfolio_curitipao.k30">Website responsivo</h3>');
  html = html.replace('<p style="color: var(--color-text-secondary); font-size: 0.9rem; line-height: 1.5; margin: 0;">Carregamento ágil e adaptação perfeita a qualquer resolução.</p>', '<p style="color: var(--color-text-secondary); font-size: 0.9rem; line-height: 1.5; margin: 0;" data-i18n="autoContent.portfolio_curitipao.k31">Carregamento ágil e adaptação perfeita a qualquer resolução.</p>');

  html = html.replace('<h3 style="font-size: 1.1rem; margin-bottom: 0.35rem; color: var(--color-text-main);">Experiência Desktop e Mobile</h3>', '<h3 style="font-size: 1.1rem; margin-bottom: 0.35rem; color: var(--color-text-main);" data-i18n="autoContent.portfolio_curitipao.k32">Experiência Desktop e Mobile</h3>');
  html = html.replace('<p style="color: var(--color-text-secondary); font-size: 0.9rem; line-height: 1.5; margin: 0;">Navegação fluida e intuitiva em smartphones, tablets e computadores.</p>', '<p style="color: var(--color-text-secondary); font-size: 0.9rem; line-height: 1.5; margin: 0;" data-i18n="autoContent.portfolio_curitipao.k33">Navegação fluida e intuitiva em smartphones, tablets e computadores.</p>');

  html = html.replace('<h3 style="font-size: 1.1rem; margin-bottom: 0.35rem; color: var(--color-text-main);">Aplicação da identidade visual do festival</h3>', '<h3 style="font-size: 1.1rem; margin-bottom: 0.35rem; color: var(--color-text-main);" data-i18n="autoContent.portfolio_curitipao.k34">Aplicação da identidade visual do festival</h3>');
  html = html.replace('<p style="color: var(--color-text-secondary); font-size: 0.9rem; line-height: 1.5; margin: 0;">Harmonia estética alinhada ao conceito acolhedor da panificação.</p>', '<p style="color: var(--color-text-secondary); font-size: 0.9rem; line-height: 1.5; margin: 0;" data-i18n="autoContent.portfolio_curitipao.k35">Harmonia estética alinhada ao conceito acolhedor da panificação.</p>');

  html = html.replace('<h3 style="font-size: 1.1rem; margin-bottom: 0.35rem; color: var(--color-text-main);">Estruturação do conteúdo digital</h3>', '<h3 style="font-size: 1.1rem; margin-bottom: 0.35rem; color: var(--color-text-main);" data-i18n="autoContent.portfolio_curitipao.k36">Estruturação do conteúdo digital</h3>');
  html = html.replace('<p style="color: var(--color-text-secondary); font-size: 0.9rem; line-height: 1.5; margin: 0;">Organização de seções para leitura rápida e direta das informações.</p>', '<p style="color: var(--color-text-secondary); font-size: 0.9rem; line-height: 1.5; margin: 0;" data-i18n="autoContent.portfolio_curitipao.k37">Organização de seções para leitura rápida e direta das informações.</p>');

  html = html.replace('<h3 style="font-size: 1.1rem; margin-bottom: 0.35rem; color: var(--color-text-main);">CTAs claros</h3>', '<h3 style="font-size: 1.1rem; margin-bottom: 0.35rem; color: var(--color-text-main);" data-i18n="autoContent.portfolio_curitipao.k38">CTAs claros</h3>');
  html = html.replace('<p style="color: var(--color-text-secondary); font-size: 0.9rem; line-height: 1.5; margin: 0;">Pontos de contato e engajamento bem posicionados na interface.</p>', '<p style="color: var(--color-text-secondary); font-size: 0.9rem; line-height: 1.5; margin: 0;" data-i18n="autoContent.portfolio_curitipao.k39">Pontos de contato e engajamento bem posicionados na interface.</p>');

  html = html.replace('<h3 style="font-size: 1.1rem; margin-bottom: 0.35rem; color: var(--color-text-main);">Preparação técnica para indexação</h3>', '<h3 style="font-size: 1.1rem; margin-bottom: 0.35rem; color: var(--color-text-main);" data-i18n="autoContent.portfolio_curitipao.k40">Preparação técnica para indexação</h3>');
  html = html.replace('<p style="color: var(--color-text-secondary); font-size: 0.9rem; line-height: 1.5; margin: 0;">Boas práticas de SEO estrutural e semântica web.</p>', '<p style="color: var(--color-text-secondary); font-size: 0.9rem; line-height: 1.5; margin: 0;" data-i18n="autoContent.portfolio_curitipao.k41">Boas práticas de SEO estrutural e semântica web.</p>');

  html = html.replace('<h3 style="font-size: 1.1rem; margin-bottom: 0.35rem; color: var(--color-text-main);">Estrutura preparada para futuras expansões</h3>', '<h3 style="font-size: 1.1rem; margin-bottom: 0.35rem; color: var(--color-text-main);" data-i18n="autoContent.portfolio_curitipao.k42">Estrutura preparada para futuras expansões</h3>');
  html = html.replace('<p style="color: var(--color-text-secondary); font-size: 0.9rem; line-height: 1.5; margin: 0;">Arquitetura modular que suporta novas áreas e funcionalidades.</p>', '<p style="color: var(--color-text-secondary); font-size: 0.9rem; line-height: 1.5; margin: 0;" data-i18n="autoContent.portfolio_curitipao.k43">Arquitetura modular que suporta novas áreas e funcionalidades.</p>');

  // Plataforma que cresce
  html = html.replace('<h2 style="font-size: clamp(1.6rem, 3.5vw, 2.2rem); margin-bottom: 1.25rem; color: var(--color-text-main);">Uma plataforma que pode crescer com o festival</h2>', '<h2 style="font-size: clamp(1.6rem, 3.5vw, 2.2rem); margin-bottom: 1.25rem; color: var(--color-text-main);" data-i18n="autoContent.portfolio_curitipao.k44">Uma plataforma que pode crescer com o festival</h2>');
  html = html.replace('<p style="color: var(--color-text-secondary); font-size: 1.05rem; line-height: 1.7; margin-bottom: 1.25rem;">A primeira versão digital do CuritiPão foi concebida de maneira objetiva, concentrando as principais informações do projeto em uma experiência direta e acessível.</p>', '<p style="color: var(--color-text-secondary); font-size: 1.05rem; line-height: 1.7; margin-bottom: 1.25rem;" data-i18n="autoContent.portfolio_curitipao.k45">A primeira versão digital do CuritiPão foi concebida de maneira objetiva, concentrando as principais informações do projeto em uma experiência direta e acessível.</p>');
  html = html.replace('<p style="color: var(--color-text-secondary); font-size: 1.05rem; line-height: 1.7; margin: 0;">Com a evolução do festival, a mesma presença digital poderá incorporar novas áreas, conteúdos, participantes, parceiros, galerias, notícias, mapas e informações relacionadas às futuras edições.</p>', '<p style="color: var(--color-text-secondary); font-size: 1.05rem; line-height: 1.7; margin: 0;" data-i18n="autoContent.portfolio_curitipao.k46">Com a evolução do festival, a mesma presença digital poderá incorporar novas áreas, conteúdos, participantes, parceiros, galerias, notícias, mapas e informações relacionadas às futuras edições.</p>');

  // CTA
  html = html.replace('<h2 style="font-size: clamp(1.8rem, 4vw, 2.8rem); line-height: 1.2; margin-bottom: 1.25rem; color: var(--color-text-main);">Conheça o CuritiPão</h2>', '<h2 style="font-size: clamp(1.8rem, 4vw, 2.8rem); line-height: 1.2; margin-bottom: 1.25rem; color: var(--color-text-main);" data-i18n="autoContent.portfolio_curitipao.k47">Conheça o CuritiPão</h2>');
  html = html.replace('<p style="font-size: 1.1rem; color: var(--color-text-secondary); max-width: 680px; margin: 0 auto 2.5rem; line-height: 1.6;">Explore a experiência digital desenvolvida pela CONEXUS para o Festival de Panificação de Curitiba.</p>', '<p style="font-size: 1.1rem; color: var(--color-text-secondary); max-width: 680px; margin: 0 auto 2.5rem; line-height: 1.6;" data-i18n="autoContent.portfolio_curitipao.k48">Explore a experiência digital desenvolvida pela CONEXUS para o Festival de Panificação de Curitiba.</p>');
  html = html.replace('Visitar Website ↗</a>', '<span data-i18n="common.visitWebsite">Visitar Website ↗</span></a>');

  fs.writeFileSync('portfolio/curitipao/index.html', html, 'utf8');
  console.log('Successfully updated portfolio/curitipao/index.html');
}

// 3. FAST GUINCHO
function updateFastGuincho() {
  let html = fs.readFileSync('portfolio/fast-guincho/index.html', 'utf8');

  html = html.replace('<span>FAST GUINCHO</span>', '<span data-i18n="autoContent.portfolio_fast_guincho.k1">FAST GUINCHO</span>');
  html = html.replace(
    '<span class="badge" style="background: rgba(230, 126, 34, 0.12); color: #E67E22; border: 1px solid rgba(230, 126, 34, 0.3); margin-bottom: 1rem; display: inline-block; padding: 0.4rem 1rem; border-radius: 50px; font-weight: 600; font-size: 0.85rem;">CASE STUDY • SERVIÇOS AUTOMOTIVOS • CURITIBA E REGIÃO METROPOLITANA</span>',
    '<span class="badge" style="background: rgba(230, 126, 34, 0.12); color: #E67E22; border: 1px solid rgba(230, 126, 34, 0.3); margin-bottom: 1rem; display: inline-block; padding: 0.4rem 1rem; border-radius: 50px; font-weight: 600; font-size: 0.85rem;" data-i18n="autoContent.portfolio_fast_guincho.k2">CASE STUDY • SERVIÇOS AUTOMOTIVOS • CURITIBA E REGIÃO METROPOLITANA</span>'
  );
  html = html.replace(
    '<h1 class="hero-title" style="font-size: clamp(2.2rem, 5vw, 3.4rem); line-height: 1.15; margin-bottom: 1.25rem;">FAST GUINCHO — Website e Presença Digital em Curitiba</h1>',
    '<h1 class="hero-title" style="font-size: clamp(2.2rem, 5vw, 3.4rem); line-height: 1.15; margin-bottom: 1.25rem;" data-i18n="autoContent.portfolio_fast_guincho.k3">FAST GUINCHO — Website e Presença Digital em Curitiba</h1>'
  );
  html = html.replace(
    '<p class="hero-subtitle" style="font-size: 1.15rem; color: var(--color-text-secondary); max-width: 760px; margin: 0 auto 2rem;">Website de alta performance desenvolvido para a FAST GUINCHO, com foco em atendimento 24 horas, rapidez de contato via WhatsApp, SEO local e cobertura em Curitiba e Região Metropolitana.</p>',
    '<p class="hero-subtitle" style="font-size: 1.15rem; color: var(--color-text-secondary); max-width: 760px; margin: 0 auto 2rem;" data-i18n="autoContent.portfolio_fast_guincho.k4">Website de alta performance desenvolvido para a FAST GUINCHO, com foco em atendimento 24 horas, rapidez de contato via WhatsApp, SEO local e cobertura em Curitiba e Região Metropolitana.</p>'
  );

  // Metadata labels
  html = html.replace(
    '<span style="font-size: 0.8rem; text-transform: uppercase; letter-spacing: 0.05em; color: var(--color-text-muted); display: block; margin-bottom: 0.25rem;">Cliente</span>',
    '<span style="font-size: 0.8rem; text-transform: uppercase; letter-spacing: 0.05em; color: var(--color-text-muted); display: block; margin-bottom: 0.25rem;" data-i18n="autoContent.portfolio_fast_guincho.k5">Cliente</span>'
  );
  html = html.replace(
    '<span style="font-size: 0.8rem; text-transform: uppercase; letter-spacing: 0.05em; color: var(--color-text-muted); display: block; margin-bottom: 0.25rem;">Localização</span>',
    '<span style="font-size: 0.8rem; text-transform: uppercase; letter-spacing: 0.05em; color: var(--color-text-muted); display: block; margin-bottom: 0.25rem;" data-i18n="autoContent.portfolio_fast_guincho.k7">Localização</span>'
  );
  html = html.replace(
    '<strong style="font-size: 1rem; color: var(--color-text-main);">Curitiba e Região Metropolitana — PR 🇧🇷</strong>',
    '<strong style="font-size: 1rem; color: var(--color-text-main);" data-i18n="autoContent.portfolio_fast_guincho.k8">Curitiba e Região Metropolitana — PR 🇧🇷</strong>'
  );
  html = html.replace(
    '<span style="font-size: 0.8rem; text-transform: uppercase; letter-spacing: 0.05em; color: var(--color-text-muted); display: block; margin-bottom: 0.25rem;">Segmento</span>',
    '<span style="font-size: 0.8rem; text-transform: uppercase; letter-spacing: 0.05em; color: var(--color-text-muted); display: block; margin-bottom: 0.25rem;" data-i18n="autoContent.portfolio_fast_guincho.k9">Segmento</span>'
  );
  html = html.replace(
    '<strong style="font-size: 1rem; color: var(--color-text-main);">Guincho • Transporte de Veículos • Atendimento 24 Horas</strong>',
    '<strong style="font-size: 1rem; color: var(--color-text-main);" data-i18n="autoContent.portfolio_fast_guincho.k10">Guincho • Transporte de Veículos • Atendimento 24 Horas</strong>'
  );
  html = html.replace(
    '<span style="font-size: 0.8rem; text-transform: uppercase; letter-spacing: 0.05em; color: var(--color-text-muted); display: block; margin-bottom: 0.25rem;">Projeto</span>',
    '<span style="font-size: 0.8rem; text-transform: uppercase; letter-spacing: 0.05em; color: var(--color-text-muted); display: block; margin-bottom: 0.25rem;" data-i18n="autoContent.portfolio_fast_guincho.k11">Projeto</span>'
  );
  html = html.replace(
    '<strong style="font-size: 1rem; color: var(--color-text-main);">Website • SEO Local • Presença Digital</strong>',
    '<strong style="font-size: 1rem; color: var(--color-text-main);" data-i18n="autoContent.portfolio_fast_guincho.k12">Website • SEO Local • Presença Digital</strong>'
  );
  html = html.replace(
    '<span style="font-size: 0.8rem; text-transform: uppercase; letter-spacing: 0.05em; color: var(--color-text-muted); display: block; margin-bottom: 0.25rem;">Desenvolvimento</span>',
    '<span style="font-size: 0.8rem; text-transform: uppercase; letter-spacing: 0.05em; color: var(--color-text-muted); display: block; margin-bottom: 0.25rem;" data-i18n="autoContent.portfolio_fast_guincho.k13">Desenvolvimento</span>'
  );

  // O Projeto
  html = html.replace(
    '<p style="color: var(--color-text-secondary); font-size: 1.05rem; line-height: 1.7; margin-bottom: 1.25rem;">A FAST GUINCHO é uma empresa especializada em serviços de guincho, reboque e transporte de veículos leves, utilitários, SUVs e motocicletas com plantão 24 horas em Curitiba e Região Metropolitana.</p>',
    '<p style="color: var(--color-text-secondary); font-size: 1.05rem; line-height: 1.7; margin-bottom: 1.25rem;" data-i18n="autoContent.portfolio_fast_guincho.k17">A FAST GUINCHO é uma empresa especializada em serviços de guincho, reboque e transporte de veículos leves, utilitários, SUVs e motocicletas com plantão 24 horas em Curitiba e Região Metropolitana.</p>'
  );
  html = html.replace(
    '<p style="color: var(--color-text-secondary); font-size: 1.05rem; line-height: 1.7; margin: 0;">A CONEXUS foi responsável pela concepção e desenvolvimento integral do website e da estratégia de presença digital da FAST GUINCHO, criando uma estrutura focada em rapidez de carregamento, clareza dos serviços oferecidos e facilidade de acionamento imediato em situações de emergência.</p>',
    '<p style="color: var(--color-text-secondary); font-size: 1.05rem; line-height: 1.7; margin: 0;" data-i18n="autoContent.portfolio_fast_guincho.k18">A CONEXUS foi responsável pela concepção e desenvolvimento integral do website e da estratégia de presença digital da FAST GUINCHO, criando uma estrutura focada em rapidez de carregamento, clareza dos serviços oferecidos e facilidade de acionamento imediato em situações de emergência.</p>'
  );

  // Desafio Estratégico
  html = html.replace(
    '<h2 style="font-size: 1.6rem; margin-bottom: 1rem; color: var(--color-text-main);">Desafio Estratégico</h2>',
    '<h2 style="font-size: 1.6rem; margin-bottom: 1rem; color: var(--color-text-main);" data-i18n="autoContent.portfolio_fast_guincho.k19">Desafio Estratégico</h2>'
  );
  html = html.replace(
    '<p style="color: var(--color-text-secondary); line-height: 1.6; margin-bottom: 1rem;">No segmento de guincho 24 horas, grande parte dos acessos ocorre via smartphone por motoristas que necessitam de socorro rápido na via pública ou em rodovias. A interface não pode gerar fricção nem demoras de carregamento.</p>',
    '<p style="color: var(--color-text-secondary); line-height: 1.6; margin-bottom: 1rem;" data-i18n="autoContent.portfolio_fast_guincho.k20">No segmento de guincho 24 horas, grande parte dos acessos ocorre via smartphone por motoristas que necessitam de socorro rápido na via pública ou em rodovias. A interface não pode gerar fricção nem demoras de carregamento.</p>'
  );
  html = html.replace(
    '<p style="color: var(--color-text-secondary); line-height: 1.6;">O desafio foi estruturar uma página extremamente ágil, com botões de chamada e WhatsApp visíveis imediatamente, além de construir uma base técnica robusta de SEO Local para que a empresa seja encontrada com facilidade em Curitiba e cidades vizinhas.</p>',
    '<p style="color: var(--color-text-secondary); line-height: 1.6;" data-i18n="autoContent.portfolio_fast_guincho.k21">O desafio foi estruturar uma página extremamente ágil, com botões de chamada e WhatsApp visíveis imediatamente, além de construir uma base técnica robusta de SEO Local para que a empresa seja encontrada com facilidade em Curitiba e cidades vizinhas.</p>'
  );

  // Solução Desenvolvida
  html = html.replace(
    '<h2 style="font-size: 1.6rem; margin-bottom: 1rem; color: var(--color-text-main);">Solução Desenvolvida</h2>',
    '<h2 style="font-size: 1.6rem; margin-bottom: 1rem; color: var(--color-text-main);" data-i18n="autoContent.portfolio_fast_guincho.k22">Solução Desenvolvida</h2>'
  );
  html = html.replace(
    '<p style="color: var(--color-text-secondary); line-height: 1.6; margin-bottom: 1rem;">A CONEXUS implementou um website com arquitetura mobile-first sem dependências pesadas, priorizando botões de contato com um toque, apresentação clara das modalidades de transporte e informações transparentes de cobertura.</p>',
    '<p style="color: var(--color-text-secondary); line-height: 1.6; margin-bottom: 1rem;" data-i18n="autoContent.portfolio_fast_guincho.k23">A CONEXUS implementou um website com arquitetura mobile-first sem dependências pesadas, priorizando botões de contato com um toque, apresentação clara das modalidades de transporte e informações transparentes de cobertura.</p>'
  );
  html = html.replace(
    '<p style="color: var(--color-text-secondary); line-height: 1.6;">A estrutura técnica foi otimizada para SEO local, contemplando dados estruturados, metatags direcionadas a Curitiba e municípios da Região Metropolitana, além de uma identidade visual limpa e profissional que transmite segurança.</p>',
    '<p style="color: var(--color-text-secondary); line-height: 1.6;" data-i18n="autoContent.portfolio_fast_guincho.k24">A estrutura técnica foi otimizada para SEO local, contemplando dados estruturados, metatags direcionadas a Curitiba e municípios da Região Metropolitana, além de uma identidade visual limpa e profissional que transmite segurança.</p>'
  );

  // Principais Entregas
  html = html.replace(
    '<h2 style="font-size: 2.2rem; margin-bottom: 1rem; color: var(--color-text-main);">Principais Entregas</h2>',
    '<h2 style="font-size: 2.2rem; margin-bottom: 1rem; color: var(--color-text-main);" data-i18n="autoContent.portfolio_fast_guincho.k26">Principais Entregas</h2>'
  );
  html = html.replace(
    '<p style="color: var(--color-text-secondary); font-size: 1.05rem;">Soluções digitais implementadas pela CONEXUS para a consolidação da presença online da FAST GUINCHO.</p>',
    '<p style="color: var(--color-text-secondary); font-size: 1.05rem;" data-i18n="autoContent.portfolio_fast_guincho.k27">Soluções digitais implementadas pela CONEXUS para a consolidação da presença online da FAST GUINCHO.</p>'
  );

  // Cards
  html = html.replace('<h3 style="font-size: 1.1rem; margin-bottom: 0.35rem; color: var(--color-text-main);">Website ágil mobile-first</h3>', '<h3 style="font-size: 1.1rem; margin-bottom: 0.35rem; color: var(--color-text-main);" data-i18n="autoContent.portfolio_fast_guincho.k28">Website ágil mobile-first</h3>');
  html = html.replace('<p style="color: var(--color-text-secondary); font-size: 0.9rem; line-height: 1.5; margin: 0;">Carregamento ultrarrápido para motoristas que necessitam de atendimento em trânsito.</p>', '<p style="color: var(--color-text-secondary); font-size: 0.9rem; line-height: 1.5; margin: 0;" data-i18n="autoContent.portfolio_fast_guincho.k29">Carregamento ultrarrápido para motoristas que necessitam de atendimento em trânsito.</p>');

  html = html.replace('<h3 style="font-size: 1.1rem; margin-bottom: 0.35rem; color: var(--color-text-main);">Contato imediato 24 Horas</h3>', '<h3 style="font-size: 1.1rem; margin-bottom: 0.35rem; color: var(--color-text-main);" data-i18n="autoContent.portfolio_fast_guincho.k30">Contato imediato 24 Horas</h3>');
  html = html.replace('<p style="color: var(--color-text-secondary); font-size: 0.9rem; line-height: 1.5; margin: 0;">Botões de WhatsApp e ligação telefônica direta em posições estratégicas.</p>', '<p style="color: var(--color-text-secondary); font-size: 0.9rem; line-height: 1.5; margin: 0;" data-i18n="autoContent.portfolio_fast_guincho.k31">Botões de WhatsApp e ligação telefônica direta em posições estratégicas.</p>');

  html = html.replace('<h3 style="font-size: 1.1rem; margin-bottom: 0.35rem; color: var(--color-text-main);">SEO Local Curitiba e RMC</h3>', '<h3 style="font-size: 1.1rem; margin-bottom: 0.35rem; color: var(--color-text-main);" data-i18n="autoContent.portfolio_fast_guincho.k32">SEO Local Curitiba e RMC</h3>');
  html = html.replace('<p style="color: var(--color-text-secondary); font-size: 0.9rem; line-height: 1.5; margin: 0;">Otimização semântica para buscas de guincho e reboque na capital e cidades vizinhas.</p>', '<p style="color: var(--color-text-secondary); font-size: 0.9rem; line-height: 1.5; margin: 0;" data-i18n="autoContent.portfolio_fast_guincho.k33">Otimização semântica para buscas de guincho e reboque na capital e cidades vizinhas.</p>');

  html = html.replace('<h3 style="font-size: 1.1rem; margin-bottom: 0.35rem; color: var(--color-text-main);">Catálogo de serviços automotivos</h3>', '<h3 style="font-size: 1.1rem; margin-bottom: 0.35rem; color: var(--color-text-main);" data-i18n="autoContent.portfolio_fast_guincho.k34">Catálogo de serviços automotivos</h3>');
  html = html.replace('<p style="color: var(--color-text-secondary); font-size: 0.9rem; line-height: 1.5; margin: 0;">Detalhamento para carros de passeio, caminhonetes, utilitários e motos.</p>', '<p style="color: var(--color-text-secondary); font-size: 0.9rem; line-height: 1.5; margin: 0;" data-i18n="autoContent.portfolio_fast_guincho.k35">Detalhamento para carros de passeio, caminhonetes, utilitários e motos.</p>');

  html = html.replace('<h3 style="font-size: 1.1rem; margin-bottom: 0.35rem; color: var(--color-text-main);">Área de cobertura transparente</h3>', '<h3 style="font-size: 1.1rem; margin-bottom: 0.35rem; color: var(--color-text-main);" data-i18n="autoContent.portfolio_fast_guincho.k36">Área de cobertura transparente</h3>');
  html = html.replace('<p style="color: var(--color-text-secondary); font-size: 0.9rem; line-height: 1.5; margin: 0;">Apresentação clara dos bairros de Curitiba e municípios atendidos na RMC.</p>', '<p style="color: var(--color-text-secondary); font-size: 0.9rem; line-height: 1.5; margin: 0;" data-i18n="autoContent.portfolio_fast_guincho.k37">Apresentação clara dos bairros de Curitiba e municípios atendidos na RMC.</p>');

  html = html.replace('<h3 style="font-size: 1.1rem; margin-bottom: 0.35rem; color: var(--color-text-main);">Design profissional e seguro</h3>', '<h3 style="font-size: 1.1rem; margin-bottom: 0.35rem; color: var(--color-text-main);" data-i18n="autoContent.portfolio_fast_guincho.k38">Design profissional e seguro</h3>');
  html = html.replace('<p style="color: var(--color-text-secondary); font-size: 0.9rem; line-height: 1.5; margin: 0;">Visual limpo que gera confiança para motoristas e frotistas em situações críticas.</p>', '<p style="color: var(--color-text-secondary); font-size: 0.9rem; line-height: 1.5; margin: 0;" data-i18n="autoContent.portfolio_fast_guincho.k39">Visual limpo que gera confiança para motoristas e frotistas em situações críticas.</p>');

  html = html.replace('<h3 style="font-size: 1.1rem; margin-bottom: 0.35rem; color: var(--color-text-main);">Envio simplificado de localização</h3>', '<h3 style="font-size: 1.1rem; margin-bottom: 0.35rem; color: var(--color-text-main);" data-i18n="autoContent.portfolio_fast_guincho.k40">Envio simplificado de localização</h3>');
  html = html.replace('<p style="color: var(--color-text-secondary); font-size: 0.9rem; line-height: 1.5; margin: 0;">Orientações para o cliente compartilhar ponto no mapa com agilidade.</p>', '<p style="color: var(--color-text-secondary); font-size: 0.9rem; line-height: 1.5; margin: 0;" data-i18n="autoContent.portfolio_fast_guincho.k41">Orientações para o cliente compartilhar ponto no mapa com agilidade.</p>');

  html = html.replace('<h3 style="font-size: 1.1rem; margin-bottom: 0.35rem; color: var(--color-text-main);">Base preparada para tráfego local</h3>', '<h3 style="font-size: 1.1rem; margin-bottom: 0.35rem; color: var(--color-text-main);" data-i18n="autoContent.portfolio_fast_guincho.k42">Base preparada para tráfego local</h3>');
  html = html.replace('<p style="color: var(--color-text-secondary); font-size: 0.9rem; line-height: 1.5; margin: 0;">Estrutura técnica pronta para campanhas de busca e anúncios geolocalizados.</p>', '<p style="color: var(--color-text-secondary); font-size: 0.9rem; line-height: 1.5; margin: 0;" data-i18n="autoContent.portfolio_fast_guincho.k43">Estrutura técnica pronta para campanhas de busca e anúncios geolocalizados.</p>');

  // Decisões rápidas
  html = html.replace('<h2 style="font-size: clamp(1.6rem, 3.5vw, 2.2rem); margin-bottom: 1.25rem; color: var(--color-text-main);">Presença digital projetada para decisões rápidas</h2>', '<h2 style="font-size: clamp(1.6rem, 3.5vw, 2.2rem); margin-bottom: 1.25rem; color: var(--color-text-main);" data-i18n="autoContent.portfolio_fast_guincho.k44">Presença digital projetada para decisões rápidas</h2>');
  html = html.replace('<p style="color: var(--color-text-secondary); font-size: 1.05rem; line-height: 1.7; margin-bottom: 1.25rem;">A estratégia da FAST GUINCHO comprova que em setores emergenciais a simplicidade, velocidade técnica e clareza da proposta são os fatores decisivos para conectar clientes e prestadores em poucos segundos.</p>', '<p style="color: var(--color-text-secondary); font-size: 1.05rem; line-height: 1.7; margin-bottom: 1.25rem;" data-i18n="autoContent.portfolio_fast_guincho.k45">A estratégia da FAST GUINCHO comprova que em setores emergenciais a simplicidade, velocidade técnica e clareza da proposta são os fatores decisivos para conectar clientes e prestadores em poucos segundos.</p>');
  html = html.replace('<p style="color: var(--color-text-secondary); font-size: 1.05rem; line-height: 1.7; margin: 0;">Com navegação direta e canais de atendimento integrados, a plataforma digital cumpre seu papel de forma confiável 24 horas por dia em todo o território de Curitiba e Região Metropolitana.</p>', '<p style="color: var(--color-text-secondary); font-size: 1.05rem; line-height: 1.7; margin: 0;" data-i18n="autoContent.portfolio_fast_guincho.k46">Com navegação direta e canais de atendimento integrados, a plataforma digital cumpre seu papel de forma confiável 24 horas por dia em todo o território de Curitiba e Região Metropolitana.</p>');

  // CTA
  html = html.replace('<h2 style="font-size: clamp(1.8rem, 4vw, 2.8rem); line-height: 1.2; margin-bottom: 1.25rem; color: var(--color-text-main);">Conheça a FAST GUINCHO</h2>', '<h2 style="font-size: clamp(1.8rem, 4vw, 2.8rem); line-height: 1.2; margin-bottom: 1.25rem; color: var(--color-text-main);" data-i18n="autoContent.portfolio_fast_guincho.k47">Conheça a FAST GUINCHO</h2>');
  html = html.replace('<p style="font-size: 1.1rem; color: var(--color-text-secondary); max-width: 680px; margin: 0 auto 2.5rem; line-height: 1.6;">Explore a plataforma web e a experiência digital desenvolvida pela CONEXUS para o serviço de guincho 24 horas em Curitiba e RMC.</p>', '<p style="font-size: 1.1rem; color: var(--color-text-secondary); max-width: 680px; margin: 0 auto 2.5rem; line-height: 1.6;" data-i18n="autoContent.portfolio_fast_guincho.k48">Explore a plataforma web e a experiência digital desenvolvida pela CONEXUS para o serviço de guincho 24 horas em Curitiba e RMC.</p>');
  html = html.replace('Visitar Website ↗</a>', '<span data-i18n="common.visitWebsite">Visitar Website ↗</span></a>');

  fs.writeFileSync('portfolio/fast-guincho/index.html', html, 'utf8');
  console.log('Successfully updated portfolio/fast-guincho/index.html');
}

// 4. SOQUINDINS
function updateSoquindins() {
  let html = fs.readFileSync('portfolio/soquindins/index.html', 'utf8');

  html = html.replace('<span>SÓQUINDINS</span>', '<span data-i18n="autoContent.portfolio_soquindins.k1">SÓQUINDINS</span>');
  html = html.replace(
    '<span class="badge" style="background: rgba(230, 126, 34, 0.12); color: #E67E22; border: 1px solid rgba(230, 126, 34, 0.3); margin-bottom: 1rem; display: inline-block; padding: 0.4rem 1rem; border-radius: 50px; font-weight: 600; font-size: 0.85rem;">CASE STUDY • GASTRONOMIA & CONFEITARIA • CURITIBA/PR</span>',
    '<span class="badge" style="background: rgba(230, 126, 34, 0.12); color: #E67E22; border: 1px solid rgba(230, 126, 34, 0.3); margin-bottom: 1rem; display: inline-block; padding: 0.4rem 1rem; border-radius: 50px; font-weight: 600; font-size: 0.85rem;" data-i18n="autoContent.portfolio_soquindins.k2">CASE STUDY • GASTRONOMIA & CONFEITARIA • CURITIBA/PR</span>'
  );
  html = html.replace(
    '<h1 class="hero-title" style="font-size: clamp(2.2rem, 5vw, 3.4rem); line-height: 1.15; margin-bottom: 1.25rem;">SÓQUINDINS — Presença Digital para Confeitaria em Curitiba</h1>',
    '<h1 class="hero-title" style="font-size: clamp(2.2rem, 5vw, 3.4rem); line-height: 1.15; margin-bottom: 1.25rem;" data-i18n="autoContent.portfolio_soquindins.k3">SÓQUINDINS — Presença Digital para Confeitaria em Curitiba</h1>'
  );
  html = html.replace(
    '<p class="hero-subtitle" style="font-size: 1.15rem; color: var(--color-text-secondary); max-width: 760px; margin: 0 auto 2rem;">Presença digital desenvolvida para a SÓQUINDINS, tradicional confeitaria de Curitiba, unindo mais de cinco décadas de história familiar, produtos artesanais de referência, cardápio digital, experiência responsiva e presença local.</p>',
    '<p class="hero-subtitle" style="font-size: 1.15rem; color: var(--color-text-secondary); max-width: 760px; margin: 0 auto 2rem;" data-i18n="autoContent.portfolio_soquindins.k4">Presença digital desenvolvida para a SÓQUINDINS, tradicional confeitaria de Curitiba, unindo mais de cinco décadas de história familiar, produtos artesanais de referência, cardápio digital, experiência responsiva e presença local.</p>'
  );

  // Metadata labels
  html = html.replace(
    '<span style="font-size: 0.8rem; text-transform: uppercase; letter-spacing: 0.05em; color: var(--color-text-muted); display: block; margin-bottom: 0.25rem;">Cliente</span>',
    '<span style="font-size: 0.8rem; text-transform: uppercase; letter-spacing: 0.05em; color: var(--color-text-muted); display: block; margin-bottom: 0.25rem;" data-i18n="autoContent.portfolio_soquindins.k5">Cliente</span>'
  );
  html = html.replace(
    '<span style="font-size: 0.8rem; text-transform: uppercase; letter-spacing: 0.05em; color: var(--color-text-muted); display: block; margin-bottom: 0.25rem;">Localização</span>',
    '<span style="font-size: 0.8rem; text-transform: uppercase; letter-spacing: 0.05em; color: var(--color-text-muted); display: block; margin-bottom: 0.25rem;" data-i18n="autoContent.portfolio_soquindins.k7">Localização</span>'
  );
  html = html.replace(
    '<strong style="font-size: 1rem; color: var(--color-text-main);">Curitiba — PR 🇧🇷</strong>',
    '<strong style="font-size: 1rem; color: var(--color-text-main);" data-i18n="autoContent.portfolio_soquindins.k8">Curitiba — PR 🇧🇷</strong>'
  );
  html = html.replace(
    '<span style="font-size: 0.8rem; text-transform: uppercase; letter-spacing: 0.05em; color: var(--color-text-muted); display: block; margin-bottom: 0.25rem;">Segmento</span>',
    '<span style="font-size: 0.8rem; text-transform: uppercase; letter-spacing: 0.05em; color: var(--color-text-muted); display: block; margin-bottom: 0.25rem;" data-i18n="autoContent.portfolio_soquindins.k9">Segmento</span>'
  );
  html = html.replace(
    '<strong style="font-size: 1rem; color: var(--color-text-main);">Confeitaria • Gastronomia • Produtos Artesanais</strong>',
    '<strong style="font-size: 1rem; color: var(--color-text-main);" data-i18n="autoContent.portfolio_soquindins.k10">Confeitaria • Gastronomia • Produtos Artesanais</strong>'
  );
  html = html.replace(
    '<span style="font-size: 0.8rem; text-transform: uppercase; letter-spacing: 0.05em; color: var(--color-text-muted); display: block; margin-bottom: 0.25rem;">Projeto</span>',
    '<span style="font-size: 0.8rem; text-transform: uppercase; letter-spacing: 0.05em; color: var(--color-text-muted); display: block; margin-bottom: 0.25rem;" data-i18n="autoContent.portfolio_soquindins.k11">Projeto</span>'
  );
  html = html.replace(
    '<strong style="font-size: 1rem; color: var(--color-text-main);">Website • Presença Digital • SEO Local • Experiência Responsiva</strong>',
    '<strong style="font-size: 1rem; color: var(--color-text-main);" data-i18n="autoContent.portfolio_soquindins.k12">Website • Presença Digital • SEO Local • Experiência Responsiva</strong>'
  );
  html = html.replace(
    '<span style="font-size: 0.8rem; text-transform: uppercase; letter-spacing: 0.05em; color: var(--color-text-muted); display: block; margin-bottom: 0.25rem;">Desenvolvimento</span>',
    '<span style="font-size: 0.8rem; text-transform: uppercase; letter-spacing: 0.05em; color: var(--color-text-muted); display: block; margin-bottom: 0.25rem;" data-i18n="autoContent.portfolio_soquindins.k13">Desenvolvimento</span>'
  );

  // O Projeto
  html = html.replace(
    '<p style="color: var(--color-text-secondary); font-size: 1.05rem; line-height: 1.7; margin-bottom: 1.25rem;">Fundada em 1969, a SÓQUINDINS é uma das marcas mais tradicionais e queridas da confeitaria de Curitiba. Com mais de 50 anos de história e três gerações dedicadas a receitas artesanais, o estabelecimento tornou-se referência absoluta em quindins, na célebre receita do Bolo Martha Rocha — sendo reconhecida como a Casa da Martha Rocha —, além de fios de ovos, tortinhas, doces finos e salgados artesanais.</p>',
    '<p style="color: var(--color-text-secondary); font-size: 1.05rem; line-height: 1.7; margin-bottom: 1.25rem;" data-i18n="autoContent.portfolio_soquindins.k17">Fundada em 1969, a SÓQUINDINS é uma das marcas mais tradicionais e queridas da confeitaria de Curitiba. Com mais de 50 anos de história e três gerações dedicadas a receitas artesanais, o estabelecimento tornou-se referência absoluta em quindins, na célebre receita do Bolo Martha Rocha — sendo reconhecida como a Casa da Martha Rocha —, além de fios de ovos, tortinhas, doces finos e salgados artesanais.</p>'
  );
  html = html.replace(
    '<p style="color: var(--color-text-secondary); font-size: 1.05rem; line-height: 1.7; margin: 0;">A CONEXUS assumiu o desafio de conceber e desenvolver a nova presença digital da SÓQUINDINS, construindo uma plataforma web moderna, rápida e intuitiva, capaz de traduzir a afetividade e a credibilidade da marca para o universo digital, facilitando o acesso ao cardápio, a visualização de produtos e a realização de encomendas diretamente pelo WhatsApp.</p>',
    '<p style="color: var(--color-text-secondary); font-size: 1.05rem; line-height: 1.7; margin: 0;" data-i18n="autoContent.portfolio_soquindins.k18">A CONEXUS assumiu o desafio de conceber e desenvolver a nova presença digital da SÓQUINDINS, construindo uma plataforma web moderna, rápida e intuitiva, capaz de traduzir a afetividade e a credibilidade da marca para o universo digital, facilitando o acesso ao cardápio, a visualização de produtos e a realização de encomendas diretamente pelo WhatsApp.</p>'
  );

  // Desafio Estratégico
  html = html.replace(
    '<h2 style="font-size: 1.6rem; margin-bottom: 1rem; color: var(--color-text-main);">Desafio Estratégico</h2>',
    '<h2 style="font-size: 1.6rem; margin-bottom: 1rem; color: var(--color-text-main);" data-i18n="autoContent.portfolio_soquindins.k19">Desafio Estratégico</h2>'
  );
  html = html.replace(
    '<p style="color: var(--color-text-secondary); line-height: 1.6; margin-bottom: 1rem;">O principal desafio foi honrar cinco décadas de história, afeto e tradição familiar da SÓQUINDINS sem cair em modelos digitais genéricos. A marca precisava de uma vitrine virtual acolhedora e que transmitisse a excelência dos ingredientes e do processo artesanal.</p>',
    '<p style="color: var(--color-text-secondary); line-height: 1.6; margin-bottom: 1rem;" data-i18n="autoContent.portfolio_soquindins.k20">O principal desafio foi honrar cinco décadas de história, afeto e tradição familiar da SÓQUINDINS sem cair em modelos digitais genéricos. A marca precisava de uma vitrine virtual acolhedora e que transmitisse a excelência dos ingredientes e do processo artesanal.</p>'
  );
  html = html.replace(
    '<p style="color: var(--color-text-secondary); line-height: 1.6;">Além disso, era fundamental simplificar a experiência do cliente que busca encomendar bolos, quindins e salgados para celebrações e ocasiões especiais, garantindo navegação mobile impecável e canal ágil de atendimento local em Curitiba.</p>',
    '<p style="color: var(--color-text-secondary); line-height: 1.6;" data-i18n="autoContent.portfolio_soquindins.k21">Além disso, era fundamental simplificar a experiência do cliente que busca encomendar bolos, quindins e salgados para celebrações e ocasiões especiais, garantindo navegação mobile impecável e canal ágil de atendimento local em Curitiba.</p>'
  );

  // Solução Desenvolvida
  html = html.replace(
    '<h2 style="font-size: 1.6rem; margin-bottom: 1rem; color: var(--color-text-main);">Solução Desenvolvida</h2>',
    '<h2 style="font-size: 1.6rem; margin-bottom: 1rem; color: var(--color-text-main);" data-i18n="autoContent.portfolio_soquindins.k22">Solução Desenvolvida</h2>'
  );
  html = html.replace(
    '<p style="color: var(--color-text-secondary); line-height: 1.6; margin-bottom: 1rem;">A CONEXUS desenvolveu uma plataforma personalizada com arquitetura mobile-first, tipografia elegante e elementos visuais alinhados à identidade da confeitaria, valorizando fotografias reais de alta qualidade dos produtos.</p>',
    '<p style="color: var(--color-text-secondary); line-height: 1.6; margin-bottom: 1rem;" data-i18n="autoContent.portfolio_soquindins.k23">A CONEXUS desenvolveu uma plataforma personalizada com arquitetura mobile-first, tipografia elegante e elementos visuais alinhados à identidade da confeitaria, valorizando fotografias reais de alta qualidade dos produtos.</p>'
  );
  html = html.replace(
    '<p style="color: var(--color-text-secondary); line-height: 1.6;">A interface integra cardápio interativo, botões de ação direta para o WhatsApp com mensagens personalizadas por produto, mapas interativos para a unidade na Rua Alferes Poli e otimização completa de SEO local para buscas em Curitiba e região.</p>',
    '<p style="color: var(--color-text-secondary); line-height: 1.6;" data-i18n="autoContent.portfolio_soquindins.k24">A interface integra cardápio interativo, botões de ação direta para o WhatsApp com mensagens personalizadas por produto, mapas interativos para a unidade na Rua Alferes Poli e otimização completa de SEO local para buscas em Curitiba e região.</p>'
  );

  // Principais Entregas
  html = html.replace(
    '<h2 style="font-size: 2.2rem; margin-bottom: 1rem; color: var(--color-text-main);">Principais Entregas</h2>',
    '<h2 style="font-size: 2.2rem; margin-bottom: 1rem; color: var(--color-text-main);" data-i18n="autoContent.portfolio_soquindins.k26">Principais Entregas</h2>'
  );
  html = html.replace(
    '<p style="color: var(--color-text-secondary); font-size: 1.05rem;">Soluções digitais implementadas pela CONEXUS para a consolidação da presença online da SÓQUINDINS.</p>',
    '<p style="color: var(--color-text-secondary); font-size: 1.05rem;" data-i18n="autoContent.portfolio_soquindins.k27">Soluções digitais implementadas pela CONEXUS para a consolidação da presença online da SÓQUINDINS.</p>'
  );

  // Cards
  html = html.replace('<h3 style="font-size: 1.1rem; margin-bottom: 0.35rem; color: var(--color-text-main);">Presença digital completa</h3>', '<h3 style="font-size: 1.1rem; margin-bottom: 0.35rem; color: var(--color-text-main);" data-i18n="autoContent.portfolio_soquindins.k28">Presença digital completa</h3>');
  html = html.replace('<p style="color: var(--color-text-secondary); font-size: 0.9rem; line-height: 1.5; margin: 0;">Estruturação da presença web oficial para a tradicional confeitaria curitibana.</p>', '<p style="color: var(--color-text-secondary); font-size: 0.9rem; line-height: 1.5; margin: 0;" data-i18n="autoContent.portfolio_soquindins.k29">Estruturação da presença web oficial para a tradicional confeitaria curitibana.</p>');

  html = html.replace('<h3 style="font-size: 1.1rem; margin-bottom: 0.35rem; color: var(--color-text-main);">Website responsivo e ágil</h3>', '<h3 style="font-size: 1.1rem; margin-bottom: 0.35rem; color: var(--color-text-main);" data-i18n="autoContent.portfolio_soquindins.k30">Website responsivo e ágil</h3>');
  html = html.replace('<p style="color: var(--color-text-secondary); font-size: 0.9rem; line-height: 1.5; margin: 0;">Performance otimizada com carregamento rápido e navegação fluida em qualquer tela.</p>', '<p style="color: var(--color-text-secondary); font-size: 0.9rem; line-height: 1.5; margin: 0;" data-i18n="autoContent.portfolio_soquindins.k31">Performance otimizada com carregamento rápido e navegação fluida em qualquer tela.</p>');

  html = html.replace('<h3 style="font-size: 1.1rem; margin-bottom: 0.35rem; color: var(--color-text-main);">Experiência Desktop e Mobile</h3>', '<h3 style="font-size: 1.1rem; margin-bottom: 0.35rem; color: var(--color-text-main);" data-i18n="autoContent.portfolio_soquindins.k32">Experiência Desktop e Mobile</h3>');
  html = html.replace('<p style="color: var(--color-text-secondary); font-size: 0.9rem; line-height: 1.5; margin: 0;">Usabilidade adaptada para consultas em smartphones, tablets e computadores.</p>', '<p style="color: var(--color-text-secondary); font-size: 0.9rem; line-height: 1.5; margin: 0;" data-i18n="autoContent.portfolio_soquindins.k33">Usabilidade adaptada para consultas em smartphones, tablets e computadores.</p>');

  html = html.replace('<h3 style="font-size: 1.1rem; margin-bottom: 0.35rem; color: var(--color-text-main);">Apresentação de produtos artesanais</h3>', '<h3 style="font-size: 1.1rem; margin-bottom: 0.35rem; color: var(--color-text-main);" data-i18n="autoContent.portfolio_soquindins.k34">Apresentação de produtos artesanais</h3>');
  html = html.replace('<p style="color: var(--color-text-secondary); font-size: 0.9rem; line-height: 1.5; margin: 0;">Destaque para os quindins, o Bolo Martha Rocha, fios de ovos, tortas e salgados.</p>', '<p style="color: var(--color-text-secondary); font-size: 0.9rem; line-height: 1.5; margin: 0;" data-i18n="autoContent.portfolio_soquindins.k35">Destaque para os quindins, o Bolo Martha Rocha, fios de ovos, tortas e salgados.</p>');

  html = html.replace('<h3 style="font-size: 1.1rem; margin-bottom: 0.35rem; color: var(--color-text-main);">Canal direto de encomendas</h3>', '<h3 style="font-size: 1.1rem; margin-bottom: 0.35rem; color: var(--color-text-main);" data-i18n="autoContent.portfolio_soquindins.k36">Canal direto de encomendas</h3>');
  html = html.replace('<p style="color: var(--color-text-secondary); font-size: 0.9rem; line-height: 1.5; margin: 0;">Integração com WhatsApp facilitando pedidos, encomendas e dúvidas do cliente.</p>', '<p style="color: var(--color-text-secondary); font-size: 0.9rem; line-height: 1.5; margin: 0;" data-i18n="autoContent.portfolio_soquindins.k37">Integração com WhatsApp facilitando pedidos, encomendas e dúvidas do cliente.</p>');

  html = html.replace('<h3 style="font-size: 1.1rem; margin-bottom: 0.35rem; color: var(--color-text-main);">SEO Local para Curitiba</h3>', '<h3 style="font-size: 1.1rem; margin-bottom: 0.35rem; color: var(--color-text-main);" data-i18n="autoContent.portfolio_soquindins.k38">SEO Local para Curitiba</h3>');
  html = html.replace('<p style="color: var(--color-text-secondary); font-size: 0.9rem; line-height: 1.5; margin: 0;">Estruturação técnica para buscas geolocalizadas de confeitaria e encomendas.</p>', '<p style="color: var(--color-text-secondary); font-size: 0.9rem; line-height: 1.5; margin: 0;" data-i18n="autoContent.portfolio_soquindins.k39">Estruturação técnica para buscas geolocalizadas de confeitaria e encomendas.</p>');

  html = html.replace('<h3 style="font-size: 1.1rem; margin-bottom: 0.35rem; color: var(--color-text-main);">Informações locais e localização</h3>', '<h3 style="font-size: 1.1rem; margin-bottom: 0.35rem; color: var(--color-text-main);" data-i18n="autoContent.portfolio_soquindins.k40">Informações locais e localização</h3>');
  html = html.replace('<p style="color: var(--color-text-secondary); font-size: 0.9rem; line-height: 1.5; margin: 0;">Endereço na Rua Alferes Poli, 1115, rotas de mapa e horários de funcionamento.</p>', '<p style="color: var(--color-text-secondary); font-size: 0.9rem; line-height: 1.5; margin: 0;" data-i18n="autoContent.portfolio_soquindins.k41">Endereço na Rua Alferes Poli, 1115, rotas de mapa e horários de funcionamento.</p>');

  html = html.replace('<h3 style="font-size: 1.1rem; margin-bottom: 0.35rem; color: var(--color-text-main);">Identidade e tradição preservadas</h3>', '<h3 style="font-size: 1.1rem; margin-bottom: 0.35rem; color: var(--color-text-main);" data-i18n="autoContent.portfolio_soquindins.k42">Identidade e tradição preservadas</h3>');
  html = html.replace('<p style="color: var(--color-text-secondary); font-size: 0.9rem; line-height: 1.5; margin: 0;">Narrativa de mais de 50 anos de história e três gerações em ambiente digital refinado.</p>', '<p style="color: var(--color-text-secondary); font-size: 0.9rem; line-height: 1.5; margin: 0;" data-i18n="autoContent.portfolio_soquindins.k43">Narrativa de mais de 50 anos de história e três gerações em ambiente digital refinado.</p>');

  // História e Eficiência
  html = html.replace('<h2 style="font-size: clamp(1.6rem, 3.5vw, 2.2rem); margin-bottom: 1.25rem; color: var(--color-text-main);">Unindo história artesanal e eficiência tecnológica</h2>', '<h2 style="font-size: clamp(1.6rem, 3.5vw, 2.2rem); margin-bottom: 1.25rem; color: var(--color-text-main);" data-i18n="autoContent.portfolio_soquindins.k44">Unindo história artesanal e eficiência tecnológica</h2>');
  html = html.replace('<p style="color: var(--color-text-secondary); font-size: 1.05rem; line-height: 1.7; margin-bottom: 1.25rem;">A presença digital da SÓQUINDINS foi planejada para refletir a mesma dedicação e carinho presentes em cada receita desde 1969. O website estabelece uma comunicação clara e direta com clientes antigos e novas gerações de apreciadores da boa gastronomia.</p>', '<p style="color: var(--color-text-secondary); font-size: 1.05rem; line-height: 1.7; margin-bottom: 1.25rem;" data-i18n="autoContent.portfolio_soquindins.k45">A presença digital da SÓQUINDINS foi planejada para refletir a mesma dedicação e carinho presentes em cada receita desde 1969. O website estabelece uma comunicação clara e direta com clientes antigos e novas gerações de apreciadores da boa gastronomia.</p>');
  html = html.replace('<p style="color: var(--color-text-secondary); font-size: 1.05rem; line-height: 1.7; margin: 0;">Com uma estrutura semântica otimizada e navegação limpa, o projeto garante que quem busca pelos melhores quindins e doces tradicionais de Curitiba encontre rapidamente o cardápio, os detalhes dos produtos e o caminho mais curto para fazer a sua encomenda.</p>', '<p style="color: var(--color-text-secondary); font-size: 1.05rem; line-height: 1.7; margin: 0;" data-i18n="autoContent.portfolio_soquindins.k46">Com uma estrutura semântica otimizada e navegação limpa, o projeto garante que quem busca pelos melhores quindins e doces tradicionais de Curitiba encontre rapidamente o cardápio, os detalhes dos produtos e o caminho mais curto para fazer a sua encomenda.</p>');

  // CTA
  html = html.replace('<h2 style="font-size: clamp(1.8rem, 4vw, 2.8rem); line-height: 1.2; margin-bottom: 1.25rem; color: var(--color-text-main);">Conheça a SÓQUINDINS</h2>', '<h2 style="font-size: clamp(1.8rem, 4vw, 2.8rem); line-height: 1.2; margin-bottom: 1.25rem; color: var(--color-text-main);" data-i18n="autoContent.portfolio_soquindins.k47">Conheça a SÓQUINDINS</h2>');
  html = html.replace('<p style="font-size: 1.1rem; color: var(--color-text-secondary); max-width: 680px; margin: 0 auto 2.5rem; line-height: 1.6;">Explore o website e a presença digital desenvolvida pela CONEXUS para a tradicional confeitaria de Curitiba.</p>', '<p style="font-size: 1.1rem; color: var(--color-text-secondary); max-width: 680px; margin: 0 auto 2.5rem; line-height: 1.6;" data-i18n="autoContent.portfolio_soquindins.k48">Explore o website e a presença digital desenvolvida pela CONEXUS para a tradicional confeitaria de Curitiba.</p>');
  html = html.replace('Visitar Website ↗</a>', '<span data-i18n="common.visitWebsite">Visitar Website ↗</span></a>');

  fs.writeFileSync('portfolio/soquindins/index.html', html, 'utf8');
  console.log('Successfully updated portfolio/soquindins/index.html');
}

updateAtthos();
updateCuritipao();
updateFastGuincho();
updateSoquindins();
