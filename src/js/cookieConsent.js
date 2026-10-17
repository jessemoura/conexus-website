/**
 * Gestão de Consentimento de Cookies & LGPD / Google Consent Mode v2 - CONEXUS
 * Medição oficial GA4: G-04S0NFMW2M
 */

const CONSENT_KEY = 'conexus_analytics_consent';
const GA_MEASUREMENT_ID = 'G-04S0NFMW2M';

const I18N_TEXTS = {
  pt: {
    title: 'Privacidade e Cookies',
    message: 'Utilizamos cookies essenciais e métricas anônimas para aprimorar sua experiência e avaliar o desempenho do site, em conformidade com a LGPD.',
    accept: 'Aceitar',
    decline: 'Recusar',
    privacyLink: 'Política de Privacidade',
    privacyUrl: '/grana/politica-de-privacidade/',
    statusGranted: 'Consentimento ativo (Métricas autorizadas)',
    statusDenied: 'Consentimento recusado (Métricas bloqueadas)'
  },
  en: {
    title: 'Privacy & Cookies',
    message: 'We use essential and anonymous analytics cookies to improve your browsing experience and measure site performance in compliance with privacy regulations.',
    accept: 'Accept',
    decline: 'Decline',
    privacyLink: 'Privacy Policy',
    privacyUrl: '/grana/politica-de-privacidade/',
    statusGranted: 'Consent active (Analytics allowed)',
    statusDenied: 'Consent declined (Analytics blocked)'
  },
  es: {
    title: 'Privacidad y Cookies',
    message: 'Utilizamos cookies esenciales y analíticas anónimas para mejorar su experiencia y medir el rendimiento del sitio web de acuerdo con las normativas de privacidad.',
    accept: 'Aceptar',
    decline: 'Rechazar',
    privacyLink: 'Política de Privacidad',
    privacyUrl: '/grana/politica-de-privacidade/',
    statusGranted: 'Consentimiento activo (Métricas autorizadas)',
    statusDenied: 'Consentimiento rechazado (Métricas bloqueadas)'
  }
};

function getActiveLanguage() {
  const htmlLang = document.documentElement.getAttribute('data-current-lang');
  if (htmlLang && I18N_TEXTS[htmlLang]) return htmlLang;
  
  try {
    const saved = localStorage.getItem('conexus_lang');
    if (saved && I18N_TEXTS[saved]) return saved;
  } catch (e) {}

  return 'pt';
}

/**
 * Injeta dinamicamente a biblioteca oficial gtag.js e dispara o page_view inicial
 */
export function loadGoogleAnalytics() {
  if (typeof window === 'undefined') return;

  // Garante dataLayer e gtag
  window.dataLayer = window.dataLayer || [];
  if (typeof window.gtag !== 'function') {
    window.gtag = function() { window.dataLayer.push(arguments); };
  }

  // Verifica se o script do GA4 já foi inserido
  const existingScript = document.querySelector(`script[src*="googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}"]`);
  if (!existingScript) {
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
    document.head.appendChild(script);
  }

  // Atualiza Consent Mode v2 e configura medição
  window.gtag('consent', 'update', {
    'analytics_storage': 'granted'
  });

  window.gtag('config', GA_MEASUREMENT_ID, {
    send_page_view: true
  });
}

/**
 * Concede consentimento analítico
 */
export function grantConsent() {
  try {
    localStorage.setItem(CONSENT_KEY, 'granted');
  } catch (e) {}

  loadGoogleAnalytics();
  closeBanner();
}

/**
 * Recusa ou revoga consentimento analítico
 */
export function denyConsent() {
  try {
    localStorage.setItem(CONSENT_KEY, 'denied');
  } catch (e) {}

  if (typeof window.gtag === 'function') {
    window.gtag('consent', 'update', {
      'analytics_storage': 'denied'
    });
  }

  closeBanner();
}

/**
 * Fecha e remove o banner da tela com animação suave
 */
export function closeBanner() {
  const banner = document.getElementById('conexus-cookie-banner');
  if (banner) {
    banner.style.opacity = '0';
    banner.style.transform = 'translateY(16px)';
    setTimeout(() => {
      if (banner && banner.parentNode) {
        banner.parentNode.removeChild(banner);
      }
    }, 250);
  }
}

/**
 * Renderiza o banner de consentimento de cookies discreto e responsivo
 */
export function renderCookieBanner(isRevocationMode = false) {
  // Evita duplicar o banner se já estiver aberto
  if (document.getElementById('conexus-cookie-banner')) return;

  const lang = getActiveLanguage();
  const texts = I18N_TEXTS[lang] || I18N_TEXTS.pt;
  const currentStatus = getStoredConsent();

  // Injeta estilos específicos caso ainda não existam
  if (!document.getElementById('conexus-cookie-banner-styles')) {
    const styleEl = document.createElement('style');
    styleEl.id = 'conexus-cookie-banner-styles';
    styleEl.textContent = `
      #conexus-cookie-banner {
        position: fixed;
        bottom: 24px;
        left: 24px;
        max-width: 440px;
        width: calc(100% - 48px);
        background: rgba(17, 24, 39, 0.94);
        border: 1px solid rgba(255, 255, 255, 0.12);
        border-radius: 14px;
        box-shadow: 0 12px 32px -4px rgba(0, 0, 0, 0.5), 0 4px 12px rgba(0, 0, 0, 0.25);
        backdrop-filter: blur(12px);
        -webkit-backdrop-filter: blur(12px);
        padding: 1.15rem 1.25rem;
        z-index: 9998;
        font-family: inherit;
        color: #F9FAFB;
        transition: opacity 0.25s ease, transform 0.25s ease;
        animation: conexusSlideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1);
      }
      [data-theme="light"] #conexus-cookie-banner {
        background: rgba(255, 255, 255, 0.96);
        border: 1px solid rgba(0, 0, 0, 0.12);
        color: #111827;
        box-shadow: 0 12px 32px -4px rgba(0, 0, 0, 0.15), 0 4px 12px rgba(0, 0, 0, 0.08);
      }
      @keyframes conexusSlideUp {
        from { opacity: 0; transform: translateY(16px); }
        to { opacity: 1; transform: translateY(0); }
      }
      .conexus-cb-header {
        display: flex;
        align-items: center;
        gap: 8px;
        margin-bottom: 0.5rem;
      }
      .conexus-cb-title {
        font-size: 0.95rem;
        font-weight: 700;
        letter-spacing: -0.01em;
      }
      .conexus-cb-body {
        font-size: 0.84rem;
        line-height: 1.5;
        opacity: 0.9;
        margin-bottom: 0.85rem;
      }
      .conexus-cb-link {
        color: var(--color-primary, #06B6D4);
        text-decoration: underline;
        text-underline-offset: 2px;
      }
      .conexus-cb-status {
        font-size: 0.78rem;
        padding: 4px 8px;
        border-radius: 6px;
        background: rgba(255, 255, 255, 0.08);
        margin-bottom: 0.75rem;
        display: inline-block;
      }
      [data-theme="light"] .conexus-cb-status {
        background: rgba(0, 0, 0, 0.05);
      }
      .conexus-cb-actions {
        display: flex;
        align-items: center;
        gap: 8px;
      }
      .conexus-cb-btn {
        flex: 1;
        padding: 7px 14px;
        border-radius: 8px;
        font-size: 0.85rem;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.2s ease;
        text-align: center;
        border: none;
      }
      .conexus-cb-btn-accept {
        background: #0284C7;
        color: #FFFFFF;
      }
      .conexus-cb-btn-accept:hover {
        background: #0369A1;
      }
      .conexus-cb-btn-decline {
        background: transparent;
        color: inherit;
        border: 1px solid rgba(255, 255, 255, 0.2);
      }
      [data-theme="light"] .conexus-cb-btn-decline {
        border-color: rgba(0, 0, 0, 0.2);
      }
      .conexus-cb-btn-decline:hover {
        background: rgba(255, 255, 255, 0.1);
      }
      [data-theme="light"] .conexus-cb-btn-decline:hover {
        background: rgba(0, 0, 0, 0.05);
      }
      @media (max-width: 640px) {
        #conexus-cookie-banner {
          left: 12px;
          right: 12px;
          bottom: 12px;
          width: calc(100% - 24px);
          max-width: none;
        }
      }
    `;
    document.head.appendChild(styleEl);
  }

  const banner = document.createElement('div');
  banner.id = 'conexus-cookie-banner';
  banner.setAttribute('role', 'dialog');
  banner.setAttribute('aria-label', texts.title);

  let statusBadge = '';
  if (isRevocationMode && currentStatus) {
    const statusText = currentStatus === 'granted' ? texts.statusGranted : texts.statusDenied;
    statusBadge = `<div class="conexus-cb-status">${statusText}</div>`;
  }

  banner.innerHTML = `
    <div class="conexus-cb-header">
      <span aria-hidden="true" style="font-size: 1.1rem;">🛡️</span>
      <strong class="conexus-cb-title">${texts.title}</strong>
    </div>
    <div class="conexus-cb-body">
      ${texts.message}
      <a href="${texts.privacyUrl}" class="conexus-cb-link">${texts.privacyLink}</a>.
    </div>
    ${statusBadge}
    <div class="conexus-cb-actions">
      <button class="conexus-cb-btn conexus-cb-btn-accept" id="conexus-cookie-accept" aria-label="${texts.accept}">
        ${texts.accept}
      </button>
      <button class="conexus-cb-btn conexus-cb-btn-decline" id="conexus-cookie-decline" aria-label="${texts.decline}">
        ${texts.decline}
      </button>
    </div>
  `;

  document.body.appendChild(banner);

  document.getElementById('conexus-cookie-accept')?.addEventListener('click', () => {
    grantConsent();
  });

  document.getElementById('conexus-cookie-decline')?.addEventListener('click', () => {
    denyConsent();
  });
}

/**
 * Retorna o estado atual de consentimento no localStorage
 */
export function getStoredConsent() {
  try {
    return localStorage.getItem(CONSENT_KEY);
  } catch (e) {
    return null;
  }
}

/**
 * Inicializa a gestão de consentimento
 */
export function initCookieConsent() {
  if (typeof window === 'undefined') return;

  // Expõe métodos globais para testes, auditoria e revogação
  window.conexusGrantConsent = grantConsent;
  window.conexusDenyConsent = denyConsent;
  window.conexusRevokeConsent = denyConsent;
  window.conexusOpenConsentBanner = () => renderCookieBanner(true);

  // Vincula cliques em links de Privacidade ou Preferências de Cookies no rodapé para revogação
  document.addEventListener('click', (event) => {
    const trigger = event.target.closest('[data-action="cookie-consent"], #manage-cookies, a[href*="politica-de-privacidade"]');
    if (trigger && !event.defaultPrevented && trigger.getAttribute('data-action') === 'cookie-consent') {
      event.preventDefault();
      renderCookieBanner(true);
    }
  });

  const consent = getStoredConsent();

  if (consent === 'granted') {
    // Consentimento já existente: carrega GA4 imediatamente
    loadGoogleAnalytics();
  } else if (consent === 'denied') {
    // Consentimento recusado: não exibe banner, mantém GA4 bloqueado
    if (typeof window.gtag === 'function') {
      window.gtag('consent', 'update', { 'analytics_storage': 'denied' });
    }
  } else {
    // Primeira visita (sem consentimento registrado): exibe banner de escolha
    renderCookieBanner(false);
  }
}
