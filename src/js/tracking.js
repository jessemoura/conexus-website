/**
 * Módulo de Rastreamento de Eventos (GA4 & GTM) - CONEXUS
 * ID oficial de medição GA4: G-04S0NFMW2M | Stream ID: 16149300226
 */

export function initTracking() {
  document.addEventListener('click', (event) => {
    // 1. Elemento com atributo data-track explícito
    const trackElement = event.target.closest('[data-track]');
    
    // 2. Elemento âncora direcionado para WhatsApp
    const waLinkElement = event.target.closest('a[href*="wa.me"], a[href*="api.whatsapp.com"]');
    
    if (!trackElement && !waLinkElement) return;

    let eventName = '';
    let ctaPosition = '';
    let serviceName = '';
    let ctaText = '';

    if (trackElement) {
      eventName = trackElement.getAttribute('data-track') || '';
      ctaPosition = trackElement.getAttribute('data-cta-position') || '';
      serviceName = trackElement.getAttribute('data-service-name') || '';
      ctaText = (trackElement.textContent || '').trim();
    }

    if (waLinkElement) {
      // Garante que todo clique em link de WhatsApp envie o evento 'whatsapp_click'
      if (!eventName) {
        eventName = 'whatsapp_click';
      }
      if (!ctaPosition) {
        if (waLinkElement.classList.contains('whatsapp-float') || waLinkElement.closest('.whatsapp-float')) {
          ctaPosition = 'floating_button';
        } else if (waLinkElement.closest('header') || waLinkElement.closest('.header')) {
          ctaPosition = 'header';
        } else if (waLinkElement.closest('footer') || waLinkElement.closest('.footer')) {
          ctaPosition = 'footer';
        } else if (waLinkElement.closest('.hero') || waLinkElement.closest('.home-hero')) {
          ctaPosition = 'hero';
        } else {
          ctaPosition = 'page_body';
        }
      }
      if (!ctaText) {
        ctaText = (waLinkElement.textContent || waLinkElement.getAttribute('aria-label') || 'WhatsApp').trim();
      }
    }

    const payload = {
      event: eventName,
      event_category: 'engagement',
      event_label: ctaText || eventName,
      page_location: window.location.href,
      page_path: window.location.pathname,
      service_name: serviceName,
      cta_position: ctaPosition,
      cta_text: ctaText,
      link_url: waLinkElement ? waLinkElement.href : (trackElement ? trackElement.getAttribute('href') || '' : '')
    };

    // Disparo para dataLayer (GTM / logging interno)
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push(payload);

    // Disparo direto para gtag (GA4) - somente quando houver consentimento explícito e ativo
    let isConsentGranted = false;
    try {
      isConsentGranted = localStorage.getItem('conexus_analytics_consent') === 'granted';
    } catch (e) {}

    if (isConsentGranted && typeof window.gtag === 'function') {
      window.gtag('event', eventName, payload);
    }
  });
}

