/**
 * Reviews Section Interactions
 * - Carousel navigation (prev/next buttons)
 * - Touch swipe & smooth scroll
 * - Discrete pagination dots
 * - Expand / Collapse long review texts (with internal scroll)
 * - Autoplay (6s interval, pause on hover / expansion / touch, prefers-reduced-motion)
 */

import { getTranslation } from './i18n.js';

let autoplayTimer = null;
const AUTOPLAY_INTERVAL = 6000;

export function initReviews() {
  initReviewsExpand();
  initReviewsCarousel();

  // Atualiza os textos dos botões quando o idioma muda
  window.addEventListener('conexus:languageChange', () => {
    const expandButtons = document.querySelectorAll('.review-expand-btn');
    expandButtons.forEach(btn => {
      const isExpanded = btn.getAttribute('aria-expanded') === 'true';
      const btnLabel = btn.querySelector('span');
      if (btnLabel) {
        btnLabel.textContent = isExpanded 
          ? getTranslation('reviews.readLess') 
          : getTranslation('reviews.readMore');
      }
    });
  });
}

function hasAnyExpandedCard() {
  return !!document.querySelector('.review-card.is-expanded');
}

function isCarouselHovered() {
  const wrapper = document.querySelector('.reviews-carousel-wrapper');
  return wrapper ? wrapper.matches(':hover') : false;
}

function initReviewsExpand() {
  const expandButtons = document.querySelectorAll('.review-expand-btn');
  if (!expandButtons.length) return;

  expandButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const card = btn.closest('.review-card');
      if (!card) return;

      const isExpanded = btn.getAttribute('aria-expanded') === 'true';
      const truncatedText = card.querySelector('.review-text-truncated');
      const fullText = card.querySelector('.review-text-full');
      const btnLabel = btn.querySelector('span');
      const icon = btn.querySelector('svg');

      if (!isExpanded) {
        btn.setAttribute('aria-expanded', 'true');
        card.classList.add('is-expanded');
        if (truncatedText) truncatedText.style.display = 'none';
        if (fullText) {
          fullText.style.display = 'block';
          fullText.scrollTop = 0;
        }
        if (btnLabel) btnLabel.textContent = getTranslation('reviews.readLess');
        if (icon) icon.style.transform = 'rotate(180deg)';
        stopReviewsAutoplay();
      } else {
        btn.setAttribute('aria-expanded', 'false');
        card.classList.remove('is-expanded');
        if (truncatedText) truncatedText.style.display = 'block';
        if (fullText) {
          fullText.style.display = 'none';
          fullText.scrollTop = 0;
        }
        if (btnLabel) btnLabel.textContent = getTranslation('reviews.readMore');
        if (icon) icon.style.transform = 'rotate(0deg)';
        if (!hasAnyExpandedCard() && !isCarouselHovered()) {
          startReviewsAutoplay();
        }
      }
    });
  });
}

function stopReviewsAutoplay() {
  if (autoplayTimer) {
    clearInterval(autoplayTimer);
    autoplayTimer = null;
  }
}

function startReviewsAutoplay() {
  stopReviewsAutoplay();

  const prefersReducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) return;

  const container = document.querySelector('.reviews-track-container');
  const track = document.getElementById('reviewsTrack');
  if (!container || !track) return;

  const cards = Array.from(track.querySelectorAll('.review-card'));
  if (!cards.length) return;

  function getVisibleCount() {
    const w = window.innerWidth;
    if (w >= 992) return 3;
    if (w >= 641) return 2;
    return 1;
  }

  function getStepWidth() {
    const card = cards[0];
    if (!card) return 0;
    const cardRect = card.getBoundingClientRect();
    const style = window.getComputedStyle(track);
    const gap = parseFloat(style.columnGap || style.gap || '24') || 24;
    return cardRect.width + gap;
  }

  function getPageCount() {
    const visible = getVisibleCount();
    return Math.max(1, cards.length - visible + 1);
  }

  autoplayTimer = setInterval(() => {
    if (document.hidden || hasAnyExpandedCard() || isCarouselHovered()) {
      return;
    }

    const step = getStepWidth();
    if (step <= 0) return;

    const maxScroll = container.scrollWidth - container.clientWidth - 10;
    const currentIndex = Math.round(container.scrollLeft / step);
    const pageCount = getPageCount();

    if (container.scrollLeft >= maxScroll || currentIndex >= pageCount - 1) {
      container.scrollTo({ left: 0, behavior: 'smooth' });
    } else {
      container.scrollTo({ left: (currentIndex + 1) * step, behavior: 'smooth' });
    }
  }, AUTOPLAY_INTERVAL);
}

function initReviewsCarousel() {
  const container = document.querySelector('.reviews-track-container');
  const track = document.getElementById('reviewsTrack');
  const wrapper = document.querySelector('.reviews-carousel-wrapper');
  const prevBtn = document.querySelector('.reviews-nav-prev');
  const nextBtn = document.querySelector('.reviews-nav-next');
  const dotsContainer = document.getElementById('reviewsDots');

  if (!container || !track) return;

  const cards = Array.from(track.querySelectorAll('.review-card'));
  if (!cards.length) return;

  function getVisibleCount() {
    const w = window.innerWidth;
    if (w >= 992) return 3;
    if (w >= 641) return 2;
    return 1;
  }

  function getStepWidth() {
    const card = cards[0];
    if (!card) return 0;
    const cardRect = card.getBoundingClientRect();
    const style = window.getComputedStyle(track);
    const gap = parseFloat(style.columnGap || style.gap || '24') || 24;
    return cardRect.width + gap;
  }

  function getPageCount() {
    const visible = getVisibleCount();
    return Math.max(1, cards.length - visible + 1);
  }

  function createDots() {
    if (!dotsContainer) return;
    dotsContainer.innerHTML = '';
    const pageCount = getPageCount();

    for (let i = 0; i < pageCount; i++) {
      const dot = document.createElement('button');
      dot.type = 'button';
      dot.className = `reviews-dot ${i === 0 ? 'active' : ''}`;
      dot.setAttribute('aria-label', `Ir para página ${i + 1} de avaliações`);
      dot.addEventListener('click', () => {
        scrollToIndex(i);
        if (!hasAnyExpandedCard()) {
          startReviewsAutoplay();
        }
      });
      dotsContainer.appendChild(dot);
    }
  }

  function updateActiveDot() {
    if (!dotsContainer) return;
    const step = getStepWidth();
    if (step <= 0) return;
    const currentIndex = Math.round(container.scrollLeft / step);
    const dots = dotsContainer.querySelectorAll('.reviews-dot');
    dots.forEach((dot, idx) => {
      dot.classList.toggle('active', idx === currentIndex);
    });

    if (prevBtn) {
      prevBtn.disabled = container.scrollLeft <= 10;
      prevBtn.style.opacity = prevBtn.disabled ? '0.35' : '1';
    }
    if (nextBtn) {
      const maxScroll = container.scrollWidth - container.clientWidth - 10;
      nextBtn.disabled = container.scrollLeft >= maxScroll;
      nextBtn.style.opacity = nextBtn.disabled ? '0.35' : '1';
    }
  }

  function scrollToIndex(index) {
    const step = getStepWidth();
    container.scrollTo({
      left: index * step,
      behavior: 'smooth'
    });
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      const step = getStepWidth();
      container.scrollBy({ left: -step, behavior: 'smooth' });
      if (!hasAnyExpandedCard()) startReviewsAutoplay();
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      const step = getStepWidth();
      container.scrollBy({ left: step, behavior: 'smooth' });
      if (!hasAnyExpandedCard()) startReviewsAutoplay();
    });
  }

  if (wrapper) {
    wrapper.addEventListener('mouseenter', () => {
      stopReviewsAutoplay();
    });

    wrapper.addEventListener('mouseleave', () => {
      if (!hasAnyExpandedCard()) {
        startReviewsAutoplay();
      }
    });

    wrapper.addEventListener('touchstart', () => {
      stopReviewsAutoplay();
    }, { passive: true });

    wrapper.addEventListener('touchend', () => {
      if (!hasAnyExpandedCard()) {
        startReviewsAutoplay();
      }
    }, { passive: true });
  }

  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      stopReviewsAutoplay();
    } else {
      if (!hasAnyExpandedCard() && !isCarouselHovered()) {
        startReviewsAutoplay();
      }
    }
  });

  let scrollTimeout;
  container.addEventListener('scroll', () => {
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(updateActiveDot, 50);
  }, { passive: true });

  window.addEventListener('resize', () => {
    createDots();
    updateActiveDot();
  });

  createDots();
  updateActiveDot();
  startReviewsAutoplay();
}

