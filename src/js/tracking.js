/**
 * Módulo de Preparação de Tracking (GA4 & GTM) - CONEXUS
 * 
 * Captura interações via data-attributes sem depender de bibliotecas externas.
 */

export function initTracking() {
  document.addEventListener('click', (event) => {
    const trackElement = event.target.closest('[data-track]');
    if (!trackElement) return;

    const eventName = trackElement.getAttribute('data-track');
    const serviceName = trackElement.getAttribute('data-service-name') || '';
    const ctaPosition = trackElement.getAttribute('data-cta-position') || '';
    const ctaText = trackElement.textContent.trim();

    const payload = {
      event: eventName,
      page_location: window.location.pathname,
      service_name: serviceName,
      cta_position: ctaPosition,
      cta_text: ctaText
    };
    // Dispara para dataLayer (GTM) e/ou gtag (GA4 direto)
    if (window.dataLayer && Array.isArray(window.dataLayer)) {
      window.dataLayer.push(payload);
    }
    if (typeof window.gtag === 'function') {
      window.gtag('event', eventName, payload);
    }
  });
}
