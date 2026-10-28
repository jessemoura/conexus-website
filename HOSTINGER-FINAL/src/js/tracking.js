/**
 * CONEXUS DIGITAL SOLUTIONS - Módulo de Rastreamento Comercial GA4
 * ID oficial de medição GA4: G-04S0NFMW2M | Stream ID: 16149300226
 * 
 * Implementa o ecossistema completo de mensuração de conversões comerciais:
 * - conexus_whatsapp_click: Cliques em botões e links WhatsApp (floating, header, footer, contato, serviços, portfólio, blog, orçamentos)
 * - conexus_email_click: Cliques em links de e-mail (mailto)
 * - conexus_service_click: Interesse qualificado em serviços
 * - conexus_portfolio_click: Abertura e interação com projetos do portfólio
 * - conexus_plan_click: Interesse e seleção de planos comerciais
 * - conexus_cta_click: Cliques em CTAs comerciais relevantes
 * - conexus_blog_commercial_click: Cliques comerciais originados no blog
 * - conexus_form_submit: Envio efetivamente concluído de formulários
 * 
 * Total conformidade LGPD & Google Consent Mode v2:
 * - Nenhum dado de identificação pessoal (PII) é enviado.
 * - Desduplicação inteligente com janela de debounce (600ms).
 * - Suporte nativo a múltiplos idiomas (PT / EN / ES).
 */

const GA_MEASUREMENT_ID = 'G-04S0NFMW2M';
const DEDUPLICATION_WINDOW_MS = 600;
const recentEvents = new Map();

/**
 * Retorna o idioma atualmente ativo no documento ou preferência salva
 */
export function getActiveLanguage() {
  if (typeof document === 'undefined') return 'pt';
  const htmlLang = document.documentElement.getAttribute('data-current-lang');
  if (htmlLang) return htmlLang;
  try {
    const saved = localStorage.getItem('conexus_lang');
    if (saved) return saved;
  } catch (e) {}
  return 'pt';
}

/**
 * Sanitiza URLs removendo parâmetros potencialmente sensíveis (PII)
 */
export function sanitizeUrl(urlString) {
  if (!urlString) return '';
  const isRelative = urlString.startsWith('/') && !urlString.startsWith('//');
  try {
    const url = new URL(urlString, typeof window !== 'undefined' ? window.location.origin : 'https://www.conexus.press');
    const sensitiveParams = [
      'phone', 'email', 'nome', 'name', 'cpf', 'user', 'token',
      'pass', 'password', 'senha', 'rg', 'msg', 'mensagem'
    ];
    sensitiveParams.forEach(p => url.searchParams.delete(p));
    return isRelative ? (url.pathname + (url.search ? url.search : '')) : url.toString();
  } catch {
    return urlString.split('?')[0];
  }
}

/**
 * Envia evento comercial padronizado para o GA4 e dataLayer
 */
export function sendGA4Event(eventName, rawParams = {}) {
  try {
    const now = Date.now();
    const eventSignature = `${eventName}::${rawParams.button_name || ''}::${rawParams.destination_url || ''}::${rawParams.service_name || ''}::${rawParams.portfolio_project || ''}::${rawParams.plan_name || ''}`;

    const lastTimestamp = recentEvents.get(eventSignature);
    if (lastTimestamp && (now - lastTimestamp) < DEDUPLICATION_WINDOW_MS) {
      // Ignora clique repetido ou duplo-clique dentro da janela de debounce
      return;
    }
    recentEvents.set(eventSignature, now);

    // Limpeza periódica do mapa de debounce
    if (recentEvents.size > 50) {
      for (const [key, timestamp] of recentEvents.entries()) {
        if (now - timestamp > 5000) {
          recentEvents.delete(key);
        }
      }
    }

    const lang = getActiveLanguage();
    const sanitizedParams = {
      page_location: (typeof window !== 'undefined' ? window.location.pathname : '/'),
      page_language: lang,
      ...rawParams
    };

    if (sanitizedParams.destination_url) {
      sanitizedParams.destination_url = sanitizeUrl(sanitizedParams.destination_url);
    }

    // dataLayer (GTM / logging)
    if (typeof window !== 'undefined') {
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        event: eventName,
        event_category: 'commercial_conversion',
        event_label: sanitizedParams.button_name || eventName,
        ...sanitizedParams
      });

      // Alias para compatibilidade com auditorias e tags legadas de whatsapp_click
      if (eventName === 'conexus_whatsapp_click') {
        window.dataLayer.push({
          event: 'whatsapp_click',
          ...sanitizedParams
        });
      }
    }

    // Verificação de consentimento LGPD antes do envio ao GA4
    let isConsentGranted = false;
    try {
      if (typeof localStorage !== 'undefined') {
        isConsentGranted = localStorage.getItem('conexus_analytics_consent') === 'granted';
      }
    } catch (e) {}

    if (isConsentGranted && typeof window !== 'undefined' && typeof window.gtag === 'function') {
      window.gtag('event', eventName, sanitizedParams);
    }

    if (typeof window !== 'undefined' && (window.__CONEXUS_GA4_DEBUG__ || (typeof localStorage !== 'undefined' && localStorage.getItem('conexus_ga4_debug') === 'true'))) {
      console.log('%c[GA4 CONEXUS]%c ' + eventName, 'background: #0284C7; color: #fff; padding: 2px 6px; border-radius: 3px; font-weight: bold;', 'color: #0369A1; font-weight: bold;', sanitizedParams);
    }
  } catch (err) {
    console.warn('[CONEXUS Analytics] Falha ao despachar evento GA4:', err);
  }
}

/**
 * Identifica a seção visual ou container da interação no DOM
 */
export function resolveSectionLocation(el) {
  if (!el || typeof el.closest !== 'function') return 'page_body';

  const ctaPos = el.getAttribute('data-cta-position');
  if (ctaPos) return ctaPos;

  if (el.classList.contains('whatsapp-float') || el.closest('.whatsapp-float')) return 'floating_button';
  if (el.closest('header') || el.closest('.header') || el.closest('.site-header')) return 'header';
  if (el.closest('#mobile-menu') || el.closest('.mobile-menu')) return 'mobile_menu';
  if (el.closest('footer') || el.closest('.footer') || el.closest('.site-footer')) return 'footer';
  if (el.closest('.article-cta-box')) return 'article_cta_box';
  if (el.closest('.article-container') || el.closest('.article-content') || el.closest('article')) return 'article_body';
  if (el.closest('.hero') || el.closest('.home-hero')) return 'hero';
  if (el.closest('.services-grid') || el.closest('#hub-servicos') || el.closest('#servicos')) return 'services_grid';
  if (el.closest('.portfolio-grid') || el.closest('#portfolio')) return 'portfolio_grid';
  if (el.closest('.diag-cards-grid') || el.closest('#o-que-analisamos')) return 'diagnostico_section';
  if (el.closest('.final-cta')) return 'final_cta';
  if (el.closest('.faq-item-card') || el.closest('#faq')) return 'faq';

  return 'page_body';
}

/**
 * Determina o tipo de contato padronizado (contact_type) baseado no elemento e contexto
 */
export function resolveContactType(el) {
  if (!el) return 'atendimento_geral';

  const waKey = el.getAttribute('data-whatsapp-key') || '';
  const ctaPos = el.getAttribute('data-cta-position') || '';
  const path = typeof window !== 'undefined' ? window.location.pathname.toLowerCase() : '';

  // 1. Orçamento de site / desenvolvimento web
  if (
    waKey === 'serviceWebsites' || 
    waKey === 'serviceOnePage' || 
    waKey === 'siteMultipage' ||
    ctaPos.includes('web_') ||
    ctaPos.includes('onepage_') ||
    path.includes('/criacao-de-sites') ||
    path.includes('/site-one-page')
  ) {
    return 'orcamento_site';
  }

  // 2. SEO & SEO Local
  if (
    waKey === 'serviceSEO' || 
    waKey === 'serviceSEOLocal' ||
    ctaPos.includes('seo_') ||
    path.includes('/servicos/seo')
  ) {
    return 'seo_local';
  }

  // 3. Portfólio & Cases
  if (
    waKey === 'portfolio' || 
    waKey === 'portfolioGeneral' || 
    waKey === 'nikkiCase' ||
    ctaPos.includes('portfolio') ||
    ctaPos.includes('case_') ||
    path.includes('/portfolio')
  ) {
    return 'portfolio';
  }

  // 4. Diagnóstico gratuito
  if (
    waKey === 'diagnosticoGratuito' ||
    ctaPos.includes('diagnostico') ||
    path.includes('/diagnostico-gratuito')
  ) {
    return 'diagnostico';
  }

  // 5. Blog
  if (
    ctaPos.startsWith('article_') || 
    ctaPos.startsWith('blog_') || 
    path.includes('/blog/')
  ) {
    return 'blog';
  }

  // 6. Demais serviços (App Dev, Branding, Redes Sociais, Guest Hub)
  if (
    waKey === 'serviceAppDev' || 
    waKey === 'serviceBranding' || 
    waKey === 'serviceSocialMedia' ||
    waKey === 'serviceGeneral' ||
    ctaPos.includes('app_') ||
    ctaPos.includes('branding_') ||
    ctaPos.includes('social_media_') ||
    ctaPos.includes('guest_hub_') ||
    path.includes('/servicos/')
  ) {
    return 'servicos';
  }

  return 'atendimento_geral';
}

/**
 * Identifica o nome do serviço associado à interação
 */
export function resolveServiceName(targetElement, href = '') {
  if (targetElement && targetElement.getAttribute('data-service-name')) {
    return targetElement.getAttribute('data-service-name');
  }

  const waKey = targetElement ? targetElement.getAttribute('data-whatsapp-key') || '' : '';
  const ctaPos = targetElement ? targetElement.getAttribute('data-cta-position') || '' : '';

  if (waKey === 'serviceWebsites' || waKey === 'serviceOnePage' || waKey === 'siteMultipage' || ctaPos.includes('web_') || ctaPos.includes('onepage_')) {
    return 'Criação de Sites';
  }
  if (waKey === 'serviceSEO' || ctaPos.includes('seo_hero') || ctaPos.includes('seo_footer')) {
    return 'SEO para Empresas';
  }
  if (waKey === 'serviceSEOLocal' || ctaPos.includes('seo_local_')) {
    return 'SEO Local & Google Meu Negócio';
  }
  if (waKey === 'serviceBranding' || ctaPos.includes('branding_')) {
    return 'Branding & Identidade Visual';
  }
  if (waKey === 'serviceSocialMedia' || ctaPos.includes('social_media_')) {
    return 'Gestão de Redes Sociais';
  }
  if (waKey === 'serviceAppDev' || ctaPos.includes('app_')) {
    return 'Desenvolvimento de Aplicativos';
  }
  if (ctaPos.includes('guest_hub_')) {
    return 'CONEXUS Guest Hub';
  }

  const cleanHref = href || (targetElement ? targetElement.getAttribute('href') || '' : '');
  const path = (cleanHref + ' ' + (typeof window !== 'undefined' ? window.location.pathname : '')).toLowerCase();

  if (path.includes('criacao-de-sites')) return 'Criação de Sites';
  if (path.includes('site-one-page')) return 'Site One Page';
  if (path.includes('seo-local-google-meu-negocio')) return 'SEO Local & Google Meu Negócio';
  if (path.includes('/servicos/seo')) return 'SEO para Empresas';
  if (path.includes('branding-identidade-visual')) return 'Branding & Identidade Visual';
  if (path.includes('gestao-redes-sociais')) return 'Gestão de Redes Sociais';
  if (path.includes('desenvolvimento-de-aplicativos')) return 'Desenvolvimento de Aplicativos';
  if (path.includes('conexus-guest-hub')) return 'CONEXUS Guest Hub';

  const card = targetElement ? targetElement.closest('.service-card, .card, [class*="service"]') : null;
  if (card) {
    const heading = card.querySelector('h2, h3, h4');
    if (heading && heading.textContent.trim()) {
      return heading.textContent.trim();
    }
  }

  return '';
}

/**
 * Identifica o projeto do portfólio associado à interação
 */
export function resolvePortfolioProject(targetElement, href = '') {
  const cleanHref = href || (targetElement ? targetElement.getAttribute('href') || '' : '');
  const path = (cleanHref + ' ' + (typeof window !== 'undefined' ? window.location.pathname : '')).toLowerCase();

  if (path.includes('soquindins')) return 'SÓQUINDINS';
  if (path.includes('curitipao')) return 'CuritiPão 2026';
  if (path.includes('fast-guincho') || path.includes('fastguincho')) return 'FAST GUINCHO';
  if (path.includes('atthos-comex') || path.includes('atthoscomex')) return 'Atthos Comex';
  if (path.includes('di-piallato') || path.includes('dipiallatogelateria')) return 'Di Piallato Gelateria';
  if (path.includes('michelly-correa') || path.includes('michelly')) return 'Michelly Correa';
  if (path.includes('welcome-book')) return 'Welcome Book Digital';
  if (path.includes('sos-aberturas')) return 'SOS Aberturas';
  if (path.includes('nikki-studio')) return 'Nikki Studio';
  if (path.includes('conexxus-uk')) return 'CONEXXUS Digital Marketing UK';
  if (path.includes('crafix')) return 'Crafix';
  if (path.includes('lumora')) return 'Lumora Cleaning Services';

  const card = targetElement ? targetElement.closest('[style*="border-radius: 16px"], .card, .portfolio-item') : null;
  if (card) {
    const heading = card.querySelector('h3, h2, .client-instagram-link');
    if (heading && heading.textContent.trim()) {
      return heading.textContent.trim();
    }
  }

  return '';
}

/**
 * Identifica o plano comercial selecionado
 */
export function resolvePlanName(targetElement) {
  if (!targetElement) return '';
  if (targetElement.getAttribute('data-plan-name')) {
    return targetElement.getAttribute('data-plan-name');
  }
  const ctaPos = targetElement.getAttribute('data-cta-position') || '';
  if (ctaPos === 'guest_hub_plan_basic') return 'Guest Hub';
  if (ctaPos === 'guest_hub_plan_combo') return 'Guest Hub + Welcome Book';
  if (ctaPos === 'guest_hub_plan_premium') return 'Premium';

  const card = targetElement.closest('div[style*="background: var(--color-surface-navy)"], .plan-card, .pricing-card');
  if (card) {
    const heading = card.querySelector('h3, h2');
    if (heading && heading.textContent.trim()) {
      return heading.textContent.trim();
    }
  }
  return '';
}

/**
 * Retorna o título do artigo quando a página atual for um artigo do blog
 */
export function getArticleTitle() {
  if (typeof document === 'undefined') return '';
  const path = typeof window !== 'undefined' ? window.location.pathname.toLowerCase() : '';
  const isArticlePage = path.includes('/blog/') && !path.endsWith('/blog/') && !path.endsWith('/blog/index.html');
  
  if (isArticlePage) {
    const h1 = document.querySelector('h1.article-h1, h1.article-title, .article-header h1, h1');
    if (h1 && h1.textContent.trim()) {
      return h1.textContent.trim();
    }
  }
  return '';
}

/**
 * Resolve o nome amigável do botão para dimensões personalizadas
 */
export function resolveButtonName(el) {
  if (!el) return 'button';
  const text = (el.textContent || el.getAttribute('aria-label') || el.getAttribute('title') || '').trim();
  const clean = text.replace(/\s+/g, ' ');
  if (clean.length > 50) {
    return clean.slice(0, 47) + '...';
  }
  return clean || el.getAttribute('data-cta-position') || 'button';
}

/**
 * Inicializa os ouvintes de eventos para todo o site
 */
export function initTracking() {
  if (typeof document === 'undefined') return;

  // Evita anexar múltiplos listeners caso initTracking seja chamado repetidamente
  if (window.__conexusTrackingInitialized) return;
  window.__conexusTrackingInitialized = true;

  document.addEventListener('click', (event) => {
    const target = event.target;
    if (!target) return;

    // Identifica o elemento âncora, botão ou marcado com data-track
    const link = target.closest('a');
    const button = target.closest('button, [role="button"]');
    const trackElement = target.closest('[data-track]');
    const interactive = link || button || trackElement;

    if (!interactive) return;

    const href = link ? (link.getAttribute('href') || '') : '';
    const isWhatsApp = href.includes('wa.me') || href.includes('api.whatsapp.com') || href.includes('whatsapp.com');
    const isMailto = href.startsWith('mailto:');
    const articleTitle = getArticleTitle();
    const isInsideBlogArticle = Boolean(articleTitle);

    // 1. WhatsApp Clicks (conexus_whatsapp_click)
    if (isWhatsApp) {
      const buttonName = resolveButtonName(link);
      const location = resolveSectionLocation(link);
      const contactType = resolveContactType(link);
      const serviceName = resolveServiceName(link, href);
      const portfolioProject = resolvePortfolioProject(link, href);
      const planName = resolvePlanName(link);

      sendGA4Event('conexus_whatsapp_click', {
        button_name: buttonName,
        interaction_location: location,
        destination_url: href,
        contact_type: contactType,
        ...(serviceName ? { service_name: serviceName } : {}),
        ...(portfolioProject ? { portfolio_project: portfolioProject } : {}),
        ...(planName ? { plan_name: planName } : {}),
        ...(articleTitle ? { article_title: articleTitle } : {})
      });

      // Se originado no blog, registra também a conversão comercial de blog
      if (isInsideBlogArticle) {
        sendGA4Event('conexus_blog_commercial_click', {
          article_title: articleTitle,
          button_name: buttonName,
          interaction_location: location,
          destination_url: href,
          contact_type: 'blog'
        });
      }

      // Se originado na seleção de planos, registra também o interesse no plano
      if (planName) {
        sendGA4Event('conexus_plan_click', {
          plan_name: planName,
          button_name: buttonName,
          interaction_location: location,
          destination_url: href,
          contact_type: 'orcamento_plano'
        });
      }
      return;
    }

    // 2. Email Clicks (conexus_email_click)
    if (isMailto) {
      const email = href.replace('mailto:', '').split('?')[0].trim();
      const location = resolveSectionLocation(link);
      sendGA4Event('conexus_email_click', {
        button_name: email,
        interaction_location: location,
        destination_url: href,
        contact_type: 'email_comercial'
      });
      return;
    }

    // 3. Plan Clicks (conexus_plan_click - botões/links de planos que não sejam diretamente WhatsApp)
    const planName = resolvePlanName(interactive);
    if (planName && (interactive.getAttribute('data-track') === 'conexus_plan_click' || interactive.getAttribute('data-cta-position')?.includes('plan'))) {
      sendGA4Event('conexus_plan_click', {
        plan_name: planName,
        button_name: resolveButtonName(interactive),
        interaction_location: resolveSectionLocation(interactive),
        destination_url: href || window.location.pathname,
        contact_type: 'orcamento_plano'
      });
    }

    // 4. Portfolio Clicks (conexus_portfolio_click)
    const isPortfolioLink = href.includes('/portfolio/') && !href.endsWith('/portfolio/') && !href.endsWith('/portfolio/index.html');
    const isClientExternalLink = link && (link.classList.contains('client-instagram-link') || link.closest('.portfolio-grid, [style*="border-radius: 16px"]'));

    if ((isPortfolioLink || (isClientExternalLink && href.startsWith('http'))) && !isWhatsApp && !isMailto) {
      const project = resolvePortfolioProject(interactive, href);
      if (project) {
        sendGA4Event('conexus_portfolio_click', {
          portfolio_project: project,
          button_name: resolveButtonName(interactive),
          interaction_location: resolveSectionLocation(interactive),
          destination_url: href
        });
      }
    }

    // 5. Service Clicks (conexus_service_click)
    // Exclui link da barra de navegação superior (header nav) e do rodapé básico
    const isNavHeaderOrFooter = interactive.closest('nav, .nav-menu, .mobile-menu, footer, .footer');
    const isServiceRouteLink = href.includes('/servicos/') && !href.endsWith('/servicos/') && !href.endsWith('/servicos/index.html');

    if (isServiceRouteLink && !isNavHeaderOrFooter && !isWhatsApp && !isMailto) {
      const serviceName = resolveServiceName(interactive, href);
      if (serviceName) {
        sendGA4Event('conexus_service_click', {
          service_name: serviceName,
          button_name: resolveButtonName(interactive),
          interaction_location: resolveSectionLocation(interactive),
          destination_url: href
        });
      }
    }

    // 6. Blog Commercial Clicks (conexus_blog_commercial_click)
    if (isInsideBlogArticle && link) {
      const isCommercialDestination = 
        href.includes('/contato') || 
        href.includes('/servicos') || 
        href.includes('/diagnostico-gratuito') || 
        href.includes('/portfolio');

      if (isCommercialDestination && !isWhatsApp && !isMailto) {
        sendGA4Event('conexus_blog_commercial_click', {
          article_title: articleTitle,
          button_name: resolveButtonName(link),
          interaction_location: resolveSectionLocation(link),
          destination_url: href,
          contact_type: 'blog'
        });
      }
    }

    // 7. Commercial CTA Clicks (conexus_cta_click)
    const isCommercialCta = 
      interactive.getAttribute('data-track') === 'cta_click' ||
      href.includes('/diagnostico-gratuito') ||
      (href.includes('/contato') && !isNavHeaderOrFooter) ||
      interactive.classList.contains('btn-primary') ||
      interactive.getAttribute('data-cta-position')?.includes('cta') ||
      interactive.getAttribute('data-cta-position')?.includes('hero');

    if (isCommercialCta && !isWhatsApp && !isMailto && !isPortfolioLink && !isServiceRouteLink) {
      sendGA4Event('conexus_cta_click', {
        button_name: resolveButtonName(interactive),
        interaction_location: resolveSectionLocation(interactive),
        destination_url: href || window.location.pathname,
        contact_type: resolveContactType(interactive)
      });
    }
  }, { passive: true });

  // 8. Form Submissions (conexus_form_submit)
  document.addEventListener('submit', (event) => {
    const form = event.target;
    if (!form || form.tagName !== 'FORM') return;

    const formId = form.getAttribute('id') || form.id || form.getAttribute('name') || 'contact_form';
    const submitBtn = form.querySelector('button[type="submit"], input[type="submit"]');
    const buttonName = submitBtn ? (submitBtn.textContent || submitBtn.value || 'submit').trim() : 'submit_button';

    sendGA4Event('conexus_form_submit', {
      button_name: buttonName,
      interaction_location: formId,
      destination_url: window.location.pathname,
      contact_type: resolveContactType(form)
    });
  });
}
