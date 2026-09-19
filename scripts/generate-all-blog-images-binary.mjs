import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import sharp from 'sharp';
import { cluster1Articles } from './data-cluster-1.mjs';
import { cluster2Articles } from './data-cluster-2.mjs';
import { cluster3Articles } from './data-cluster-3.mjs';
import { cluster4Articles } from './data-cluster-4.mjs';
import { cluster5Articles } from './data-cluster-5.mjs';
import { cluster6Articles } from './data-cluster-6.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const assetsImagesDir = path.resolve(rootDir, 'assets', 'images');
const publicImagesDir = path.resolve(rootDir, 'public', 'assets', 'images');

for (const dir of [assetsImagesDir, publicImagesDir]) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

// First, ensure all existing assets/images/ files (including previous PNGs, JPGs, SVGs) are copied to public/assets/images
const existingAssets = fs.readdirSync(assetsImagesDir);
for (const file of existingAssets) {
  const src = path.join(assetsImagesDir, file);
  const dst = path.join(publicImagesDir, file);
  if (fs.statSync(src).isFile()) {
    fs.copyFileSync(src, dst);
  }
}

const all60Articles = [
  ...cluster1Articles,
  ...cluster2Articles,
  ...cluster3Articles,
  ...cluster4Articles,
  ...cluster5Articles,
  ...cluster6Articles
];

const clusterStyles = {
  1: {
    grad1: '#0B2545',
    grad2: '#134074',
    accent: '#00F0FF',
    badge: 'WEBSITES & DESIGN',
    icon: '<rect x="180" y="80" width="440" height="260" rx="12" fill="none" stroke="#00F0FF" stroke-width="3" opacity="0.8"/><line x1="180" y1="130" x2="620" y2="130" stroke="#00F0FF" stroke-width="2" opacity="0.5"/><circle cx="210" cy="105" r="5" fill="#00F0FF"/><circle cx="230" cy="105" r="5" fill="#00F0FF" opacity="0.6"/><circle cx="250" cy="105" r="5" fill="#00F0FF" opacity="0.3"/><rect x="210" y="160" width="180" height="120" rx="6" fill="#00F0FF" opacity="0.15" stroke="#00F0FF" stroke-width="1.5"/><rect x="420" y="160" width="170" height="20" rx="4" fill="#00F0FF" opacity="0.7"/><rect x="420" y="195" width="150" height="12" rx="3" fill="#FFFFFF" opacity="0.4"/><rect x="420" y="220" width="160" height="12" rx="3" fill="#FFFFFF" opacity="0.4"/><rect x="420" y="250" width="100" height="30" rx="6" fill="#00F0FF" opacity="0.85"/>'
  },
  2: {
    grad1: '#071A2F',
    grad2: '#0F4C81',
    accent: '#38BDF8',
    badge: 'SEO & GOOGLE',
    icon: '<circle cx="400" cy="200" r="90" fill="none" stroke="#38BDF8" stroke-width="4" opacity="0.8"/><circle cx="400" cy="200" r="60" fill="none" stroke="#38BDF8" stroke-width="2" stroke-dasharray="6,6" opacity="0.5"/><path d="M470 270 L550 350" stroke="#38BDF8" stroke-width="12" stroke-linecap="round"/><path d="M370 200 L390 220 L440 170" fill="none" stroke="#38BDF8" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/>'
  },
  3: {
    grad1: '#111827',
    grad2: '#1E3A8A',
    accent: '#60A5FA',
    badge: 'MARKETING DIGITAL',
    icon: '<path d="M220 300 L320 220 L420 260 L580 120" fill="none" stroke="#60A5FA" stroke-width="6" stroke-linecap="round"/><polygon points="580,120 540,130 570,160" fill="#60A5FA"/><circle cx="220" cy="300" r="8" fill="#60A5FA"/><circle cx="320" cy="220" r="8" fill="#60A5FA"/><circle cx="420" cy="260" r="8" fill="#60A5FA"/><circle cx="580" cy="120" r="10" fill="#FFFFFF"/>'
  },
  4: {
    grad1: '#0F172A',
    grad2: '#312E81',
    accent: '#818CF8',
    badge: 'INTELIGÊNCIA ARTIFICIAL',
    icon: '<circle cx="400" cy="180" r="25" fill="#818CF8" opacity="0.9"/><circle cx="300" cy="260" r="18" fill="#818CF8" opacity="0.7"/><circle cx="500" cy="260" r="18" fill="#818CF8" opacity="0.7"/><circle cx="350" cy="340" r="14" fill="#818CF8" opacity="0.5"/><circle cx="450" cy="340" r="14" fill="#818CF8" opacity="0.5"/><line x1="400" y1="180" x2="300" y2="260" stroke="#818CF8" stroke-width="3" opacity="0.6"/><line x1="400" y1="180" x2="500" y2="260" stroke="#818CF8" stroke-width="3" opacity="0.6"/><line x1="300" y1="260" x2="350" y2="340" stroke="#818CF8" stroke-width="2" opacity="0.4"/><line x1="500" y1="260" x2="450" y2="340" stroke="#818CF8" stroke-width="2" opacity="0.4"/><line x1="350" y1="340" x2="450" y2="340" stroke="#818CF8" stroke-width="2" opacity="0.4"/><line x1="300" y1="260" x2="500" y2="260" stroke="#818CF8" stroke-width="2" stroke-dasharray="4,4" opacity="0.3"/>'
  },
  5: {
    grad1: '#091E3A',
    grad2: '#1E293B',
    accent: '#2DD4BF',
    badge: 'TRANSFORMAÇÃO DIGITAL',
    icon: '<rect x="250" y="140" width="120" height="120" rx="16" fill="none" stroke="#2DD4BF" stroke-width="3" opacity="0.8"/><rect x="430" y="140" width="120" height="120" rx="16" fill="none" stroke="#2DD4BF" stroke-width="3" opacity="0.8"/><rect x="340" y="240" width="120" height="120" rx="16" fill="#2DD4BF" opacity="0.2" stroke="#2DD4BF" stroke-width="3"/><path d="M370 200 L430 200" stroke="#2DD4BF" stroke-width="3" stroke-dasharray="4,4"/><path d="M310 260 L340 300" stroke="#2DD4BF" stroke-width="3"/><path d="M490 260 L460 300" stroke="#2DD4BF" stroke-width="3"/>'
  },
  6: {
    grad1: '#071426',
    grad2: '#164E63',
    accent: '#22D3EE',
    badge: 'CRESCIMENTO & TECNOLOGIA',
    icon: '<circle cx="400" cy="220" r="100" fill="none" stroke="#22D3EE" stroke-width="2" stroke-dasharray="8,8" opacity="0.4"/><circle cx="400" cy="220" r="50" fill="none" stroke="#22D3EE" stroke-width="3" opacity="0.8"/><polygon points="400,140 430,220 400,200 370,220" fill="#22D3EE"/><polygon points="400,300 430,220 400,240 370,220" fill="#22D3EE" opacity="0.5"/>'
  }
};

async function generateAll() {
  console.log(`Starting generation of ${all60Articles.length} binary WebP covers...`);
  let successCount = 0;

  for (const article of all60Articles) {
    const style = clusterStyles[article.clusterId] || clusterStyles[1];
    const baseName = path.basename(article.image, '.webp');
    
    // Format title and badge with proper XML escaping
    const cleanBadge = (style.badge || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    const rawTitle = (article.pt.title || '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
    const words = rawTitle.split(' ');
    let line1 = '';
    let line2 = '';
    for (let i = 0; i < words.length; i++) {
      if (i < 6) {
        line1 += (line1 ? ' ' : '') + words[i];
      } else {
        line2 += (line2 ? ' ' : '') + words[i];
      }
    }

    const svgContent = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 860 440" width="860" height="440">
  <defs>
    <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${style.grad1}" />
      <stop offset="100%" stop-color="${style.grad2}" />
    </linearGradient>
    <linearGradient id="glowGrad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="${style.accent}" stop-opacity="0.8" />
      <stop offset="100%" stop-color="#2563EB" stop-opacity="0" />
    </linearGradient>
    <pattern id="gridPattern" width="40" height="40" patternUnits="userSpaceOnUse">
      <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255, 255, 255, 0.04)" stroke-width="1"/>
    </pattern>
  </defs>

  <!-- Background -->
  <rect width="860" height="440" fill="url(#bgGrad)" />
  <rect width="860" height="440" fill="url(#gridPattern)" />

  <!-- Ambient Glow -->
  <circle cx="700" cy="120" r="180" fill="${style.accent}" opacity="0.12" filter="blur(40px)" />
  <circle cx="150" cy="350" r="140" fill="#2563EB" opacity="0.1" filter="blur(30px)" />

  <!-- Graphical Element -->
  <g transform="translate(140, 20)">
    ${style.icon}
  </g>

  <!-- Darkening Gradient Overlay at Bottom -->
  <rect x="0" y="200" width="860" height="240" fill="url(#bgGrad)" opacity="0.85" />

  <!-- Content Box / Card Header -->
  <g transform="translate(50, 260)">
    <!-- Badge -->
    <rect x="0" y="0" width="${style.badge.length * 9.5 + 24}" height="26" rx="4" fill="${style.accent}" fill-opacity="0.15" stroke="${style.accent}" stroke-width="1.2" />
    <text x="12" y="17" fill="${style.accent}" font-family="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="11" font-weight="700" letter-spacing="1">${cleanBadge}</text>
    
    <!-- Title Line 1 -->
    <text x="0" y="65" fill="#FFFFFF" font-family="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="25" font-weight="800">${line1}</text>
    ${line2 ? `<text x="0" y="98" fill="#E2E8F0" font-family="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="23" font-weight="700">${line2}</text>` : ''}
    
    <!-- Footer Brand & Date -->
    <text x="0" y="${line2 ? '135' : '110'}" fill="#94A3B8" font-family="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="13" font-weight="500">CONEXUS • Guia Estratégico Digital • 2026</text>
  </g>

  <!-- Top Brand Watermark -->
  <text x="790" y="50" fill="#FFFFFF" opacity="0.3" font-family="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="16" font-weight="800" text-anchor="end" letter-spacing="2">CONEXUS</text>
</svg>`;

    const svgBuffer = Buffer.from(svgContent);
    
    // Convert to true binary WebP buffer
    const webpBuffer = await sharp(svgBuffer)
      .webp({ quality: 92, lossless: false })
      .toBuffer();

    // Verify WebP header (RIFF ... WEBP)
    const isWebP = webpBuffer.slice(0, 4).toString('ascii') === 'RIFF' && webpBuffer.slice(8, 12).toString('ascii') === 'WEBP';
    if (!isWebP) {
      throw new Error(`Generated buffer for ${baseName} is not a valid WebP binary!`);
    }

    // Save SVG file
    const svgFilename = `${baseName}.svg`;
    fs.writeFileSync(path.join(assetsImagesDir, svgFilename), svgContent, 'utf-8');
    fs.writeFileSync(path.join(publicImagesDir, svgFilename), svgContent, 'utf-8');

    // Save genuine binary WebP file
    const webpFilename = `${baseName}.webp`;
    fs.writeFileSync(path.join(assetsImagesDir, webpFilename), webpBuffer);
    fs.writeFileSync(path.join(publicImagesDir, webpFilename), webpBuffer);

    successCount++;
  }

  console.log(`\nSuccessfully generated ${successCount} binary WebP covers in:`);
  console.log(`- ${assetsImagesDir}`);
  console.log(`- ${publicImagesDir}`);
}

generateAll().catch(err => {
  console.error('Fatal Error:', err);
  process.exit(1);
});
