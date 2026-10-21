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
    revoke: 'Revogar Consentimento',
    privacyLink: 'Política de Privacidade',
    privacyUrl: '/grana/politica-de-privacidade/',
    manageBtn: 'Preferências de Cookies',
    statusGranted: 'Consentimento atual: Concedido (Métricas ativas)',
    statusDenied: 'Consentimento atual: Recusado (Métricas bloqueadas)'
  },
  en: {
    title: 'Privacy & Cookies',
    message: 'We use essential and anonymous analytics cookies to improve your browsing experience and measure site performance in compliance with privacy regulations.',
    accept: 'Accept',
    decline: 'Decline',
    revoke: 'Revoke Consent',
    privacyLink: 'Privacy Policy',
    privacyUrl: '/grana/politica-de-privacidade/',
    manageBtn: 'Cookie Preferences',
    statusGranted: 'Current status: Granted (Analytics active)',
    statusDenied: 'Current status: Declined (Analytics blocked)'
  },
  es: {
    title: 'Privacidad y Cookies',
    message: 'Utilizamos cookies esenciales y analíticas anónimas para mejorar su experiencia y medir el rendimiento del sitio web de acuerdo con las normativas de privacidad.',
    accept: 'Aceptar',
    decline: 'Rechazar',
    revoke: 'Revocar Consentimiento',
    privacyLink: 'Política de Privacidad',
    privacyUrl: '/grana/politica-de-privacidade/',
    manageBtn: 'Preferencias de Cookies',
    statusGranted: 'Estado actual: Concedido (Métricas activas)',
    statusDenied: 'Estado actual: Rechazado (Métricas bloqueadas)'
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

    // Atualiza Consent Mode v2 e configura medição com page_view inicial
    window.gtag('consent', 'update', {
      'analytics_storage': 'granted'
    });

    window.gtag('config', GA_MEASUREMENT_ID, {
      send_page_view: true
    });
  } else {
    // Se o script já existe (carregado via inline head na inicialização), apenas garante consent granted sem duplicar config/page_view
    window.gtag('consent', 'update', {
      'analytics_storage': 'granted'
    });
  }
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
 * Recusa ou revoga consentimento analítico na mesma sessão sem recarregar
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
  // Se o banner já estiver no DOM, remove antes de reabrir atualizado
  const existing = document.getElementById('conexus-cookie-banner');
  if (existing) {
    existing.remove();
  }

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
        justify-content: space-between;
        margin-bottom: 0.5rem;
      }
      .conexus-cb-header-left {
        display: flex;
        align-items: center;
        gap: 8px;
      }
      .conexus-cb-title {
        font-size: 0.95rem;
        font-weight: 700;
        letter-spacing: -0.01em;
      }
      .conexus-cb-close {
        background: none;
        border: none;
        color: inherit;
        opacity: 0.6;
        cursor: pointer;
        font-size: 1.1rem;
        padding: 2px 6px;
        border-radius: 4px;
      }
      .conexus-cb-close:hover {
        opacity: 1;
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
        padding: 5px 10px;
        border-radius: 6px;
        background: rgba(255, 255, 255, 0.08);
        margin-bottom: 0.85rem;
        display: flex;
        align-items: center;
        gap: 6px;
        font-weight: 500;
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
        padding: 8px 14px;
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
      /* MOBILE: Posicionamento acima do botão WhatsApp flutuante sem sobreposição */
      @media (max-width: 640px) {
        #conexus-cookie-banner {
          left: 12px;
          right: 12px;
          bottom: 88px;
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
  if (isRevocationMode || currentStatus) {
    const isGranted = currentStatus === 'granted';
    const statusText = isGranted ? texts.statusGranted : texts.statusDenied;
    const dotColor = isGranted ? '#10B981' : '#EF4444';
    statusBadge = `
      <div class="conexus-cb-status">
        <span style="display:inline-block; width:8px; height:8px; border-radius:50%; background:${dotColor};"></span>
        <span>${statusText}</span>
      </div>`;
  }

  const closeButton = isRevocationMode ? `<button class="conexus-cb-close" id="conexus-cookie-close" aria-label="Fechar">✕</button>` : '';

  banner.innerHTML = `
    <div class="conexus-cb-header">
      <div class="conexus-cb-header-left">
        <span aria-hidden="true" style="font-size: 1.1rem;">🛡️</span>
        <strong class="conexus-cb-title">${texts.title}</strong>
      </div>
      ${closeButton}
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

  document.getElementById('conexus-cookie-close')?.addEventListener('click', () => {
    closeBanner();
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
 * Garante a presença do botão visível de Preferências de Cookies no rodapé
 */
export function ensureManageCookiesButton() {
  if (typeof document === 'undefined') return;

  if (document.getElementById('manage-cookies')) return;

  const lang = getActiveLanguage();
  const texts = I18N_TEXTS[lang] || I18N_TEXTS.pt;

  const targetContainer = document.querySelector('.footer-legal') || 
                          document.querySelector('.footer-bottom > div:last-child') || 
                          document.querySelector('.footer-bottom');

  if (targetContainer) {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.id = 'manage-cookies';
    btn.className = 'cookie-prefs-btn';
    btn.setAttribute('data-action', 'cookie-consent');
    btn.setAttribute('aria-label', texts.manageBtn);
    btn.style.cssText = 'background:none; border:none; padding:0; color:var(--color-text-muted, #94A3B8); cursor:pointer; font-size:0.85rem; text-decoration:underline; margin-left:1rem; display:inline-block; font-family:inherit;';
    btn.textContent = texts.manageBtn;
    targetContainer.appendChild(btn);
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

  // Garante a presença do botão acessível no rodapé
  ensureManageCookiesButton();

  // Vincula cliques em links de Privacidade ou Preferências de Cookies para reabrir gerenciador
  document.addEventListener('click', (event) => {
    const trigger = event.target.closest('[data-action="cookie-consent"], #manage-cookies, .cookie-prefs-btn');
    if (trigger) {
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
