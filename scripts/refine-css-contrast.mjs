import fs from 'fs';

let css = fs.readFileSync('src/styles/components.css', 'utf8');

// 1. Refine brand-logo
css = css.replace(
  /\.brand-logo\s*\{[\s\S]*?filter:\s*drop-shadow[^\}]+\}/,
  `.brand-logo {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  text-decoration: none;
}

.brand-logo img {
  height: 44px;
  width: auto;
  max-width: 155px;
  object-fit: contain;
  filter: drop-shadow(0 2px 8px rgba(0, 0, 0, 0.25));
  transition: transform var(--transition-fast);
}

.brand-logo:hover img {
  transform: scale(1.02);
}

@media (max-width: 768px) {
  .brand-logo img {
    height: 38px;
    max-width: 135px;
  }
}`
);

// 2. Add service-card-media styles
if (!css.includes('.service-card-media')) {
  css += `\n
/* SERVICE CARD MEDIA */
.service-card-media {
  width: 100%;
  height: 180px;
  border-radius: var(--radius-sm);
  overflow: hidden;
  margin-bottom: 1.25rem;
  background-color: var(--color-surface-navy);
}

.service-card-media img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  transition: transform var(--transition-normal);
  display: block;
}

.service-card:hover .service-card-media img {
  transform: scale(1.03);
}
`;
}

// 3. Add Comprehensive Contrast Enhancements for both Dark and Light Modes
if (!css.includes('/* GLOBAL THEME CONTRAST REINFORCEMENTS */')) {
  css += `\n
/* GLOBAL THEME CONTRAST REINFORCEMENTS */

/* DARK MODE CONTRAST (Default) */
.card,
.service-card,
.portfolio-card,
.process-step,
.faq-item,
.diag-card {
  background-color: var(--color-surface-navy);
  border: 1px solid var(--color-border-subtle);
  color: var(--color-text-white);
}

.card h2, .card h3, .card h4,
.service-card h2, .service-card h3, .service-card h4,
.portfolio-card h2, .portfolio-card h3, .portfolio-card h4,
.process-step h2, .process-step h3, .process-step h4,
.faq-item h2, .faq-item h3, .faq-item h4 {
  color: #F5F8FC;
}

.card p,
.service-card p,
.portfolio-card p,
.process-step p,
.faq-item p {
  color: #B8C5D3;
  line-height: 1.65;
}

/* Form controls dark mode */
input, textarea, select {
  background-color: #0B2340;
  border: 1px solid rgba(184, 197, 211, 0.25);
  color: #F5F8FC;
  border-radius: var(--radius-sm);
  padding: 0.75rem 1rem;
}

input::placeholder, textarea::placeholder {
  color: #8898AA;
}

input:focus, textarea:focus, select:focus {
  border-color: var(--color-primary-cyan);
  outline: none;
  box-shadow: 0 0 0 3px rgba(33, 184, 246, 0.25);
}

/* LIGHT MODE GLOBAL CONTRAST OVERRIDES */
[data-theme="light"] {
  --color-bg-dark: #F4F7FA;
  --color-bg-body: #F4F7FA;
  --color-surface-navy: #FFFFFF;
  --color-surface-graphite: #FFFFFF;
  --color-text-white: #07182D;
  --color-text-muted: #35465A;
  --color-border-subtle: rgba(0, 58, 112, 0.16);
}

[data-theme="light"] input,
[data-theme="light"] textarea,
[data-theme="light"] select {
  background-color: #FFFFFF !important;
  border: 1px solid rgba(0, 58, 112, 0.25) !important;
  color: #07182D !important;
}

[data-theme="light"] input::placeholder,
[data-theme="light"] textarea::placeholder {
  color: #64748B !important;
}

[data-theme="light"] input:focus,
[data-theme="light"] textarea:focus,
[data-theme="light"] select:focus {
  border-color: #0066B3 !important;
  box-shadow: 0 0 0 3px rgba(0, 102, 179, 0.2) !important;
}

/* Light mode breadcrumbs & meta links */
[data-theme="light"] a[style*="--color-brand-primary"],
[data-theme="light"] a[style*="--color-primary-cyan"],
[data-theme="light"] a[style*="--color-cyan"] {
  color: #0066B3 !important;
}

[data-theme="light"] a[style*="--color-brand-primary"]:hover,
[data-theme="light"] a[style*="--color-primary-cyan"]:hover {
  color: #003A70 !important;
}

/* Light mode list items */
[data-theme="light"] ul,
[data-theme="light"] ol {
  color: #35465A;
}

[data-theme="light"] li {
  color: #35465A;
}

/* Fix any inline styles that used hardcoded light text colors in light mode */
[data-theme="light"] [style*="color: #CBD5E1"],
[data-theme="light"] [style*="color: #cbd5e1"] {
  color: #35465A !important;
}

[data-theme="light"] [style*="color: #FFFFFF"],
[data-theme="light"] [style*="color: #ffffff"] {
  color: #07182D !important;
}

/* Preserve white text on primary buttons and dark headers in light mode */
[data-theme="light"] .btn-primary,
[data-theme="light"] .btn-primary *,
[data-theme="light"] .header,
[data-theme="light"] .header .nav-link,
[data-theme="light"] .footer,
[data-theme="light"] .footer * {
  color: #FFFFFF;
}

[data-theme="light"] .header .nav-link:hover,
[data-theme="light"] .header .nav-link.active {
  color: #70D7FF;
}

/* Light mode cards and boxes */
[data-theme="light"] .service-card,
[data-theme="light"] .card,
[data-theme="light"] .portfolio-card,
[data-theme="light"] .faq-item,
[data-theme="light"] .process-step {
  background-color: #FFFFFF !important;
  border-color: rgba(0, 58, 112, 0.16) !important;
  box-shadow: 0 4px 20px rgba(7, 24, 45, 0.06) !important;
}

[data-theme="light"] .faq-item-question {
  color: #07182D !important;
}

[data-theme="light"] .faq-item-answer,
[data-theme="light"] .faq-item-answer p {
  color: #35465A !important;
}
`;
}

fs.writeFileSync('src/styles/components.css', css, 'utf8');
console.log('src/styles/components.css successfully updated with contrast and responsive logo rules!');
