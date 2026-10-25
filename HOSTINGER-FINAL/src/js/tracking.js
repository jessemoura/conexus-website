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

    // Se o GTM / GA4 dataLayer estiver ativo no futuro, dispara o evento
    if (window.dataLayer && Array.isArray(window.dataLayer)) {
      window.dataLayer.push(payload);
    }
  });
}
