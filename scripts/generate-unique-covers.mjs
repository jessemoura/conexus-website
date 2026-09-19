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
const distImagesDir = path.resolve(rootDir, 'dist', 'assets', 'images');
const hostingerImagesDir = path.resolve(rootDir, 'HOSTINGER-FINAL', 'assets', 'images');

for (const dir of [assetsImagesDir, publicImagesDir, distImagesDir, hostingerImagesDir]) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
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

// Map 60 distinct bespoke illustrations tailored to each exact topic
const uniqueIllustrations = {
  // CLUSTER 1: WEBSITES & WEB DESIGN
  'site-one-page-ou-multipaginas-qual-escolher': `
    <g transform="translate(100, 30)">
      <!-- One page continuous card -->
      <rect x="50" y="30" width="180" height="240" rx="8" fill="#0B2545" stroke="#00F0FF" stroke-width="2" opacity="0.85"/>
      <rect x="70" y="50" width="140" height="20" rx="4" fill="#00F0FF" opacity="0.7"/>
      <rect x="70" y="85" width="140" height="45" rx="4" fill="#134074" stroke="#00F0FF" stroke-width="1" opacity="0.5"/>
      <rect x="70" y="145" width="140" height="45" rx="4" fill="#134074" stroke="#00F0FF" stroke-width="1" opacity="0.5"/>
      <rect x="70" y="205" width="140" height="45" rx="4" fill="#134074" stroke="#00F0FF" stroke-width="1" opacity="0.5"/>
      <text x="140" y="260" fill="#00F0FF" font-size="12" font-family="sans-serif" font-weight="700" text-anchor="middle">ONE PAGE</text>
      <!-- VS divider -->
      <circle cx="310" cy="150" r="24" fill="#00F0FF" opacity="0.2"/>
      <text x="310" y="156" fill="#00F0FF" font-size="16" font-family="sans-serif" font-weight="900" text-anchor="middle">VS</text>
      <!-- Multi-page hierarchy tree -->
      <rect x="370" y="30" width="180" height="70" rx="8" fill="#0B2545" stroke="#38BDF8" stroke-width="2" opacity="0.85"/>
      <rect x="390" y="45" width="140" height="16" rx="3" fill="#38BDF8" opacity="0.8"/>
      <rect x="390" y="70" width="100" height="12" rx="3" fill="#FFFFFF" opacity="0.4"/>
      <line x1="460" y1="100" x2="460" y2="140" stroke="#38BDF8" stroke-width="2"/>
      <line x1="380" y1="140" x2="540" y2="140" stroke="#38BDF8" stroke-width="2"/>
      <line x1="380" y1="140" x2="380" y2="160" stroke="#38BDF8" stroke-width="2"/>
      <line x1="460" y1="140" x2="460" y2="160" stroke="#38BDF8" stroke-width="2"/>
      <line x1="540" y1="140" x2="540" y2="160" stroke="#38BDF8" stroke-width="2"/>
      <rect x="340" y="160" width="75" height="55" rx="6" fill="#134074" stroke="#38BDF8" stroke-width="1.5"/>
      <rect x="425" y="160" width="75" height="55" rx="6" fill="#134074" stroke="#38BDF8" stroke-width="1.5"/>
      <rect x="510" y="160" width="75" height="55" rx="6" fill="#134074" stroke="#38BDF8" stroke-width="1.5"/>
      <text x="460" y="260" fill="#38BDF8" font-size="12" font-family="sans-serif" font-weight="700" text-anchor="middle">MULTIPÁGINAS</text>
    </g>`,

  '10-sinais-empresa-precisa-novo-site': `
    <g transform="translate(120, 20)">
      <!-- Diagnostic Monitor -->
      <rect x="80" y="20" width="460" height="260" rx="14" fill="#0B2545" stroke="#EF4444" stroke-width="2.5" opacity="0.9"/>
      <line x1="80" y1="65" x2="540" y2="65" stroke="#EF4444" stroke-width="1.5" opacity="0.4"/>
      <circle cx="110" cy="42" r="6" fill="#EF4444"/>
      <circle cx="130" cy="42" r="6" fill="#F59E0B"/>
      <circle cx="150" cy="42" r="6" fill="#10B981"/>
      <text x="310" y="48" fill="#EF4444" font-size="13" font-family="sans-serif" font-weight="800" text-anchor="middle">AUDITORIA DE OBSOLESCÊNCIA</text>
      <!-- Error / Alert rows -->
      <rect x="110" y="85" width="400" height="36" rx="6" fill="rgba(239, 68, 68, 0.15)" stroke="#EF4444" stroke-width="1"/>
      <text x="130" y="108" fill="#EF4444" font-size="13" font-weight="700">⚠️ ALERTA: Tempo de carregamento &gt; 3.8s</text>
      <rect x="110" y="135" width="400" height="36" rx="6" fill="rgba(239, 68, 68, 0.15)" stroke="#EF4444" stroke-width="1"/>
      <text x="130" y="158" fill="#EF4444" font-size="13" font-weight="700">⚠️ ALERTA: Quebra de layout mobile detectada</text>
      <rect x="110" y="185" width="400" height="36" rx="6" fill="rgba(239, 68, 68, 0.15)" stroke="#EF4444" stroke-width="1"/>
      <text x="130" y="208" fill="#EF4444" font-size="13" font-weight="700">⚠️ ALERTA: Ausência de certificado SSL seguro</text>
      <rect x="110" y="235" width="180" height="28" rx="6" fill="#00F0FF" opacity="0.9"/>
      <text x="200" y="254" fill="#071A2F" font-size="12" font-weight="800" text-anchor="middle">REFORMULAÇÃO NECESSÁRIA</text>
    </g>`,

  'como-site-profissional-gera-mais-clientes': `
    <g transform="translate(120, 20)">
      <!-- Sales & Client Generation Flow -->
      <path d="M 80 40 L 480 40 L 400 130 L 160 130 Z" fill="rgba(0, 240, 255, 0.15)" stroke="#00F0FF" stroke-width="2"/>
      <text x="280" y="85" fill="#00F0FF" font-size="14" font-weight="800" text-anchor="middle">VISITANTES QUALIFICADOS (GOOGLE / REDES)</text>
      <path d="M 170 145 L 390 145 L 340 220 L 220 220 Z" fill="rgba(56, 189, 248, 0.25)" stroke="#38BDF8" stroke-width="2"/>
      <text x="280" y="185" fill="#38BDF8" font-size="14" font-weight="800" text-anchor="middle">AUTORIDADE &amp; PROPOSTA DE VALOR</text>
      <rect x="200" y="235" width="160" height="50" rx="10" fill="#10B981" stroke="#34D399" stroke-width="2"/>
      <text x="280" y="266" fill="#FFFFFF" font-size="15" font-weight="900" text-anchor="middle">🤝 NOVOS CLIENTES</text>
      <!-- Sparkle indicators -->
      <polygon points="490,90 510,95 495,110 500,130 480,115 460,125 470,105 455,90 475,95 485,75" fill="#F59E0B" transform="scale(0.5) translate(400, 40)"/>
    </g>`,

  'site-responsivo-mobile-first-indispensavel': `
    <g transform="translate(80, 25)">
      <!-- Desktop Monitor -->
      <rect x="50" y="30" width="300" height="190" rx="10" fill="#0B2545" stroke="#00F0FF" stroke-width="2"/>
      <line x1="50" y1="65" x2="350" y2="65" stroke="#00F0FF" stroke-width="1" opacity="0.4"/>
      <rect x="70" y="85" width="120" height="60" rx="4" fill="#00F0FF" opacity="0.2"/>
      <rect x="210" y="85" width="120" height="15" rx="3" fill="#FFFFFF" opacity="0.4"/>
      <rect x="210" y="110" width="100" height="15" rx="3" fill="#FFFFFF" opacity="0.4"/>
      <rect x="210" y="135" width="70" height="20" rx="4" fill="#00F0FF" opacity="0.8"/>
      <!-- Monitor Stand -->
      <path d="M 180 220 L 170 250 L 230 250 L 220 220 Z" fill="#00F0FF" opacity="0.6"/>
      <!-- Tablet -->
      <rect x="310" y="70" width="130" height="170" rx="10" fill="#071A2F" stroke="#38BDF8" stroke-width="2"/>
      <circle cx="375" cy="228" r="4" fill="#38BDF8"/>
      <rect x="325" y="85" width="100" height="30" rx="4" fill="#38BDF8" opacity="0.2"/>
      <rect x="325" y="125" width="100" height="12" rx="3" fill="#FFFFFF" opacity="0.4"/>
      <!-- Smartphone -->
      <rect x="420" y="100" width="80" height="150" rx="10" fill="#0B2545" stroke="#22D3EE" stroke-width="2.5"/>
      <circle cx="460" cy="238" r="3.5" fill="#22D3EE"/>
      <rect x="430" y="115" width="60" height="30" rx="4" fill="#22D3EE" opacity="0.3"/>
      <rect x="430" y="155" width="60" height="8" rx="2" fill="#FFFFFF" opacity="0.5"/>
      <rect x="430" y="170" width="40" height="14" rx="3" fill="#22D3EE" opacity="0.9"/>
    </g>`,

  'landing-page-ou-site-completo-diferencas': `
    <g transform="translate(100, 30)">
      <!-- Landing Page Target -->
      <rect x="50" y="30" width="190" height="230" rx="10" fill="#0B2545" stroke="#F59E0B" stroke-width="2"/>
      <circle cx="145" cy="100" r="45" fill="none" stroke="#F59E0B" stroke-width="3" stroke-dasharray="4,4"/>
      <circle cx="145" cy="100" r="28" fill="none" stroke="#F59E0B" stroke-width="4"/>
      <circle cx="145" cy="100" r="10" fill="#F59E0B"/>
      <path d="M 145 100 L 195 60" stroke="#FFFFFF" stroke-width="3" stroke-linecap="round"/>
      <rect x="75" y="180" width="140" height="35" rx="6" fill="#F59E0B"/>
      <text x="145" y="202" fill="#071A2F" font-size="12" font-weight="900" text-anchor="middle">CONVERSÃO ÚNICA</text>
      <text x="145" y="245" fill="#F59E0B" font-size="12" font-weight="700" text-anchor="middle">LANDING PAGE</text>
      <!-- Site Completo Structure -->
      <rect x="330" y="30" width="220" height="230" rx="10" fill="#0B2545" stroke="#00F0FF" stroke-width="2"/>
      <rect x="350" y="50" width="180" height="30" rx="4" fill="#00F0FF" opacity="0.2" stroke="#00F0FF" stroke-width="1"/>
      <rect x="350" y="90" width="85" height="40" rx="4" fill="#134074" stroke="#00F0FF" stroke-width="1"/>
      <rect x="445" y="90" width="85" height="40" rx="4" fill="#134074" stroke="#00F0FF" stroke-width="1"/>
      <rect x="350" y="140" width="85" height="40" rx="4" fill="#134074" stroke="#00F0FF" stroke-width="1"/>
      <rect x="445" y="140" width="85" height="40" rx="4" fill="#134074" stroke="#00F0FF" stroke-width="1"/>
      <text x="440" y="210" fill="#00F0FF" font-size="12" font-weight="800" text-anchor="middle">ECOSSISTEMA COMPLETO</text>
      <text x="440" y="245" fill="#00F0FF" font-size="12" font-weight="700" text-anchor="middle">SITE INSTITUCIONAL</text>
    </g>`,

  'quanto-tempo-leva-para-criar-site-profissional': `
    <g transform="translate(100, 30)">
      <!-- Timeline / Sprint calendar -->
      <rect x="50" y="40" width="460" height="210" rx="12" fill="#0B2545" stroke="#00F0FF" stroke-width="2"/>
      <line x1="50" y1="90" x2="510" y2="90" stroke="#00F0FF" stroke-width="1.5" opacity="0.4"/>
      <!-- Milestone nodes -->
      <circle cx="110" cy="140" r="16" fill="#00F0FF"/>
      <text x="110" y="145" fill="#071A2F" font-size="12" font-weight="900" text-anchor="middle">1</text>
      <text x="110" y="175" fill="#FFFFFF" font-size="11" font-weight="700" text-anchor="middle">Briefing</text>
      <line x1="126" y1="140" x2="214" y2="140" stroke="#00F0FF" stroke-width="3"/>
      
      <circle cx="230" cy="140" r="16" fill="#00F0FF"/>
      <text x="230" y="145" fill="#071A2F" font-size="12" font-weight="900" text-anchor="middle">2</text>
      <text x="230" y="175" fill="#FFFFFF" font-size="11" font-weight="700" text-anchor="middle">Design UI/UX</text>
      <line x1="246" y1="140" x2="334" y2="140" stroke="#00F0FF" stroke-width="3"/>

      <circle cx="350" cy="140" r="16" fill="#00F0FF"/>
      <text x="350" y="145" fill="#071A2F" font-size="12" font-weight="900" text-anchor="middle">3</text>
      <text x="350" y="175" fill="#FFFFFF" font-size="11" font-weight="700" text-anchor="middle">Código &amp; SEO</text>
      <line x1="366" y1="140" x2="444" y2="140" stroke="#00F0FF" stroke-width="3"/>

      <circle cx="460" cy="140" r="18" fill="#10B981" stroke="#34D399" stroke-width="2"/>
      <text x="460" y="146" fill="#FFFFFF" font-size="14" font-weight="900" text-anchor="middle">✓</text>
      <text x="460" y="175" fill="#10B981" font-size="11" font-weight="800" text-anchor="middle">Deploy</text>
      <!-- Clock indicator -->
      <text x="280" y="70" fill="#00F0FF" font-size="14" font-weight="800" text-anchor="middle">⏱️ CRONOGRAMA ÁGIL: 7 A 25 DIAS ÚTEIS</text>
    </g>`,

  'como-escolher-dominio-profissional-para-empresa': `
    <g transform="translate(100, 30)">
      <!-- URL Domain Browser Bar -->
      <rect x="40" y="40" width="480" height="80" rx="14" fill="#0B2545" stroke="#00F0FF" stroke-width="2.5"/>
      <rect x="65" y="60" width="30" height="38" rx="6" fill="#10B981"/>
      <text x="80" y="85" fill="#FFFFFF" font-size="18" font-weight="900" text-anchor="middle">🔒</text>
      <text x="110" y="85" fill="#FFFFFF" font-size="22" font-family="monospace" font-weight="700">https://suaempresa</text>
      <text x="380" y="85" fill="#00F0FF" font-size="22" font-family="monospace" font-weight="900">.com.br</text>
      <!-- Domain extension pills -->
      <rect x="60" y="150" width="110" height="40" rx="8" fill="#134074" stroke="#00F0FF" stroke-width="1.5"/>
      <text x="115" y="175" fill="#00F0FF" font-size="14" font-weight="800" text-anchor="middle">.com.br</text>
      <rect x="190" y="150" width="100" height="40" rx="8" fill="#134074" stroke="#38BDF8" stroke-width="1.5"/>
      <text x="240" y="175" fill="#38BDF8" font-size="14" font-weight="800" text-anchor="middle">.press</text>
      <rect x="310" y="150" width="100" height="40" rx="8" fill="#134074" stroke="#818CF8" stroke-width="1.5"/>
      <text x="360" y="175" fill="#818CF8" font-size="14" font-weight="800" text-anchor="middle">.com</text>
      <rect x="430" y="150" width="100" height="40" rx="8" fill="#134074" stroke="#2DD4BF" stroke-width="1.5"/>
      <text x="480" y="175" fill="#2DD4BF" font-size="14" font-weight="800" text-anchor="middle">.tech</text>
    </g>`,

  'por-que-velocidade-do-site-influencia-vendas': `
    <g transform="translate(100, 20)">
      <!-- Speed Gauge & Core Web Vitals -->
      <circle cx="280" cy="160" r="110" fill="none" stroke="#134074" stroke-width="18"/>
      <path d="M 190 220 A 110 110 0 1 1 370 220" fill="none" stroke="#00F0FF" stroke-width="18" stroke-linecap="round"/>
      <line x1="280" y1="160" x2="350" y2="100" stroke="#00F0FF" stroke-width="6" stroke-linecap="round"/>
      <circle cx="280" cy="160" r="16" fill="#00F0FF"/>
      <text x="280" y="210" fill="#00F0FF" font-size="32" font-weight="900" text-anchor="middle">99/100</text>
      <text x="280" y="240" fill="#FFFFFF" font-size="13" font-weight="700" text-anchor="middle">PERFORMANCE CORE WEB VITALS</text>
      <!-- Lightning bolt -->
      <polygon points="430,60 400,120 425,120 395,190 450,110 425,110" fill="#F59E0B"/>
    </g>`,

  'site-multilingue-como-alcancar-clientes-internacionais': `
    <g transform="translate(100, 20)">
      <!-- Globe with Language Nodes -->
      <circle cx="280" cy="140" r="95" fill="none" stroke="#00F0FF" stroke-width="2.5" opacity="0.8"/>
      <ellipse cx="280" cy="140" rx="45" ry="95" fill="none" stroke="#00F0FF" stroke-width="1.5" opacity="0.6"/>
      <line x1="185" y1="140" x2="375" y2="140" stroke="#00F0FF" stroke-width="1.5" opacity="0.6"/>
      <line x1="200" y1="90" x2="360" y2="90" stroke="#00F0FF" stroke-width="1.2" opacity="0.4"/>
      <line x1="200" y1="190" x2="360" y2="190" stroke="#00F0FF" stroke-width="1.2" opacity="0.4"/>
      <!-- Flag / Language Badges -->
      <rect x="70" y="90" width="85" height="40" rx="8" fill="#0B2545" stroke="#10B981" stroke-width="2"/>
      <text x="112" y="115" fill="#10B981" font-size="14" font-weight="900" text-anchor="middle">🇧🇷 PT-BR</text>
      <line x1="155" y1="110" x2="210" y2="120" stroke="#10B981" stroke-width="2" stroke-dasharray="3,3"/>
      
      <rect x="410" y="60" width="85" height="40" rx="8" fill="#0B2545" stroke="#3B82F6" stroke-width="2"/>
      <text x="452" y="85" fill="#3B82F6" font-size="14" font-weight="900" text-anchor="middle">🇬🇧 EN</text>
      <line x1="410" y1="80" x2="340" y2="100" stroke="#3B82F6" stroke-width="2" stroke-dasharray="3,3"/>

      <rect x="400" y="170" width="85" height="40" rx="8" fill="#0B2545" stroke="#EF4444" stroke-width="2"/>
      <text x="442" y="195" fill="#EF4444" font-size="14" font-weight="900" text-anchor="middle">🇪🇸 ES</text>
      <line x1="400" y1="190" x2="330" y2="170" stroke="#EF4444" stroke-width="2" stroke-dasharray="3,3"/>
    </g>`,

  'como-calcular-roi-site-profissional': `
    <g transform="translate(100, 25)">
      <!-- ROI Calculator & Growth Charts -->
      <rect x="60" y="30" width="200" height="210" rx="10" fill="#0B2545" stroke="#10B981" stroke-width="2"/>
      <text x="160" y="65" fill="#10B981" font-size="15" font-weight="800" text-anchor="middle">RETORNO LÍQUIDO</text>
      <rect x="80" y="85" width="160" height="40" rx="6" fill="#134074"/>
      <text x="160" y="112" fill="#FFFFFF" font-size="18" font-family="monospace" font-weight="700" text-anchor="middle">ROI = 480%</text>
      <text x="160" y="160" fill="#A7F3D0" font-size="11" text-anchor="middle">(Ganho - Custo) / Custo</text>
      <rect x="80" y="180" width="160" height="35" rx="6" fill="#10B981"/>
      <text x="160" y="202" fill="#071A2F" font-size="12" font-weight="900" text-anchor="middle">RETORNO PREVISÍVEL</text>
      <!-- Rising Bars Chart -->
      <rect x="310" y="170" width="35" height="70" rx="4" fill="#134074" stroke="#00F0FF" stroke-width="1.5"/>
      <rect x="360" y="130" width="35" height="110" rx="4" fill="#00F0FF" opacity="0.6"/>
      <rect x="410" y="90" width="35" height="150" rx="4" fill="#00F0FF" opacity="0.85"/>
      <rect x="460" y="50" width="35" height="190" rx="4" fill="#10B981"/>
      <polyline points="325,160 375,120 425,80 475,40" fill="none" stroke="#F59E0B" stroke-width="4"/>
      <circle cx="475" cy="40" r="6" fill="#F59E0B"/>
    </g>`,

  // CLUSTER 2: SEO & GOOGLE
  'seo-para-pequenas-empresas-guia-completo': `
    <g transform="translate(100, 20)">
      <!-- Google Top Search Ranking Card -->
      <rect x="50" y="30" width="460" height="220" rx="12" fill="#071A2F" stroke="#38BDF8" stroke-width="2"/>
      <rect x="80" y="55" width="400" height="35" rx="18" fill="#0F4C81" stroke="#38BDF8" stroke-width="1"/>
      <circle cx="105" cy="72" r="7" fill="#38BDF8"/>
      <line x1="110" y1="77" x2="118" y2="85" stroke="#38BDF8" stroke-width="2.5"/>
      <text x="130" y="78" fill="#FFFFFF" font-size="13" font-family="sans-serif">serviços em são josé dos pinhais</text>
      <!-- #1 Search Result Badge -->
      <rect x="80" y="110" width="400" height="110" rx="8" fill="rgba(56, 189, 248, 0.15)" stroke="#38BDF8" stroke-width="1.5"/>
      <rect x="100" y="125" width="45" height="20" rx="4" fill="#10B981"/>
      <text x="122" y="139" fill="#071A2F" font-size="11" font-weight="900" text-anchor="middle">#1 TOP</text>
      <text x="160" y="140" fill="#38BDF8" font-size="16" font-weight="800">Sua Empresa - Website Oficial</text>
      <text x="100" y="170" fill="#94A3B8" font-size="12">https://suaempresa.com.br/servicos/</text>
      <text x="100" y="195" fill="#E2E8F0" font-size="12">Líder no segmento com atendimento especializado e orçamentos rápidos...</text>
    </g>`,

  'seo-local-como-conquistar-clientes-regiao': `
    <g transform="translate(100, 20)">
      <!-- Local Map Pin & Radar Radius -->
      <circle cx="280" cy="140" r="100" fill="none" stroke="#38BDF8" stroke-width="2" opacity="0.3"/>
      <circle cx="280" cy="140" r="65" fill="none" stroke="#38BDF8" stroke-width="2" stroke-dasharray="4,4" opacity="0.6"/>
      <!-- Giant Local Pin -->
      <path d="M 280 60 C 245 60 220 88 220 120 C 220 160 280 220 280 220 C 280 220 340 160 340 120 C 340 88 315 60 280 60 Z" fill="#38BDF8"/>
      <circle cx="280" cy="115" r="22" fill="#071A2F"/>
      <text x="280" y="122" fill="#38BDF8" font-size="18" font-weight="900" text-anchor="middle">★</text>
      <!-- Nearby satellite pins -->
      <circle cx="160" cy="100" r="8" fill="#10B981"/>
      <circle cx="390" cy="90" r="8" fill="#10B981"/>
      <circle cx="380" cy="190" r="8" fill="#10B981"/>
      <text x="280" y="250" fill="#FFFFFF" font-size="14" font-weight="800" text-anchor="middle">RAIO DE ATRAÇÃO LOCAL 5KM - 20KM</text>
    </g>`,

  'como-aparecer-no-google-curitiba': `
    <g transform="translate(100, 20)">
      <!-- Curitiba Skyline & Google Pin -->
      <path d="M 70 210 L 110 160 L 140 210 L 180 130 L 220 210 L 260 110 L 300 210 L 340 150 L 380 210 L 420 120 L 460 210 L 500 170 L 500 230 L 70 230 Z" fill="#0F4C81" opacity="0.7"/>
      <!-- Jardim Botanico Silhouette Dome -->
      <path d="M 240 210 Q 280 130 320 210 Z" fill="none" stroke="#38BDF8" stroke-width="3"/>
      <path d="M 260 210 Q 280 150 300 210 Z" fill="none" stroke="#38BDF8" stroke-width="2"/>
      <!-- Google Local Pin on Curitiba -->
      <path d="M 280 50 C 255 50 235 70 235 95 C 235 130 280 170 280 170 C 280 170 325 130 325 95 C 325 70 305 50 280 50 Z" fill="#38BDF8"/>
      <circle cx="280" cy="90" r="14" fill="#071A2F"/>
      <text x="280" y="96" fill="#38BDF8" font-size="14" font-weight="900" text-anchor="middle">CWB</text>
      <text x="280" y="255" fill="#FFFFFF" font-size="15" font-weight="800" text-anchor="middle">DOMÍNIO DE BUSCAS EM CURITIBA &amp; REGIÃO</text>
    </g>`,

  'google-perfil-da-empresa-guia-completo': `
    <g transform="translate(100, 20)">
      <!-- Google Business Profile Card -->
      <rect x="70" y="30" width="420" height="220" rx="12" fill="#071A2F" stroke="#38BDF8" stroke-width="2"/>
      <rect x="95" y="55" width="65" height="65" rx="10" fill="#38BDF8"/>
      <text x="127" y="98" fill="#071A2F" font-size="34" font-weight="900" text-anchor="middle">G</text>
      <text x="175" y="75" fill="#FFFFFF" font-size="17" font-weight="800">Perfil da Empresa no Google</text>
      <text x="175" y="100" fill="#F59E0B" font-size="15">★★★★★ <tspan fill="#38BDF8" font-size="13" font-weight="700">5.0 (148 avaliações)</tspan></text>
      <text x="175" y="120" fill="#10B981" font-size="12" font-weight="700">✓ Aberto agora • Empresa Verificada</text>
      <line x1="95" y1="140" x2="465" y2="140" stroke="#38BDF8" stroke-width="1" opacity="0.3"/>
      <!-- Action buttons -->
      <rect x="95" y="160" width="110" height="35" rx="6" fill="#38BDF8"/>
      <text x="150" y="182" fill="#071A2F" font-size="12" font-weight="900" text-anchor="middle">🌐 Website</text>
      <rect x="220" y="160" width="110" height="35" rx="6" fill="#0F4C81" stroke="#38BDF8" stroke-width="1.5"/>
      <text x="275" y="182" fill="#FFFFFF" font-size="12" font-weight="800" text-anchor="middle">📍 Rotas</text>
      <rect x="345" y="160" width="120" height="35" rx="6" fill="#10B981"/>
      <text x="405" y="182" fill="#FFFFFF" font-size="12" font-weight="900" text-anchor="middle">📞 Ligar</text>
    </g>`,

  'como-conseguir-mais-avaliacoes-no-google': `
    <g transform="translate(100, 25)">
      <!-- 5 Glowing Stars and Reviews Magnet -->
      <g transform="translate(40, 20)">
        <text x="50" y="60" fill="#F59E0B" font-size="48">★</text>
        <text x="110" y="60" fill="#F59E0B" font-size="48">★</text>
        <text x="170" y="60" fill="#F59E0B" font-size="48">★</text>
        <text x="230" y="60" fill="#F59E0B" font-size="48">★</text>
        <text x="290" y="60" fill="#F59E0B" font-size="48">★</text>
      </g>
      <!-- Review speech bubble cards -->
      <rect x="60" y="110" width="210" height="85" rx="10" fill="#0B2545" stroke="#10B981" stroke-width="1.5"/>
      <text x="80" y="135" fill="#F59E0B" font-size="12">★★★★★</text>
      <text x="80" y="155" fill="#E2E8F0" font-size="11">"Atendimento impecável e site veloz!"</text>
      <text x="80" y="175" fill="#94A3B8" font-size="10">- Cliente Verificado</text>

      <rect x="290" y="110" width="210" height="85" rx="10" fill="#0B2545" stroke="#38BDF8" stroke-width="1.5"/>
      <text x="310" y="135" fill="#F59E0B" font-size="12">★★★★★</text>
      <text x="310" y="155" fill="#E2E8F0" font-size="11">"Aumentou nossos contatos em 300%."</text>
      <text x="310" y="175" fill="#94A3B8" font-size="10">- Diretor Comercial</text>
      <text x="280" y="235" fill="#10B981" font-size="14" font-weight="800" text-anchor="middle">+ REPUTAÇÃO = + VENDAS NO GOOGLE</text>
    </g>`,

  'como-responder-avaliacoes-google-reputacao': `
    <g transform="translate(100, 20)">
      <!-- Review Response Dialogue UI -->
      <rect x="50" y="20" width="460" height="230" rx="12" fill="#071A2F" stroke="#38BDF8" stroke-width="2"/>
      <!-- Client review -->
      <rect x="75" y="45" width="410" height="70" rx="8" fill="#0B2545" stroke="#64748B" stroke-width="1"/>
      <text x="95" y="68" fill="#F59E0B" font-size="13">★★★★★ <tspan fill="#E2E8F0">"Excelente suporte e entrega rápida!"</tspan></text>
      <text x="95" y="95" fill="#94A3B8" font-size="11">Avaliado há 2 horas por Marcos Silva</text>
      <!-- Official response box -->
      <rect x="115" y="130" width="370" height="85" rx="8" fill="rgba(56, 189, 248, 0.15)" stroke="#38BDF8" stroke-width="1.5"/>
      <text x="135" y="155" fill="#38BDF8" font-size="12" font-weight="800">Resposta do Proprietário (CONEXUS):</text>
      <text x="135" y="178" fill="#FFFFFF" font-size="11">"Olá Marcos, obrigado pela confiança! Nosso compromisso</text>
      <text x="135" y="196" fill="#FFFFFF" font-size="11">é garantir máxima eficiência e crescimento ao seu negócio."</text>
    </g>`,

  'google-search-console-guia-para-empresarios': `
    <g transform="translate(100, 20)">
      <!-- GSC Dashboard & Click Graph -->
      <rect x="50" y="20" width="460" height="230" rx="12" fill="#071A2F" stroke="#38BDF8" stroke-width="2"/>
      <!-- Stats pills -->
      <rect x="75" y="45" width="95" height="50" rx="8" fill="#0B2545" stroke="#38BDF8" stroke-width="1"/>
      <text x="122" y="65" fill="#94A3B8" font-size="10" text-anchor="middle">Total de Cliques</text>
      <text x="122" y="86" fill="#38BDF8" font-size="16" font-weight="900" text-anchor="middle">14.8K</text>

      <rect x="180" y="45" width="95" height="50" rx="8" fill="#0B2545" stroke="#818CF8" stroke-width="1"/>
      <text x="227" y="65" fill="#94A3B8" font-size="10" text-anchor="middle">Impressões</text>
      <text x="227" y="86" fill="#818CF8" font-size="16" font-weight="900" text-anchor="middle">382K</text>

      <rect x="285" y="45" width="95" height="50" rx="8" fill="#0B2545" stroke="#10B981" stroke-width="1"/>
      <text x="332" y="65" fill="#94A3B8" font-size="10" text-anchor="middle">CTR Médio</text>
      <text x="332" y="86" fill="#10B981" font-size="16" font-weight="900" text-anchor="middle">3.9%</text>

      <rect x="390" y="45" width="95" height="50" rx="8" fill="#0B2545" stroke="#F59E0B" stroke-width="1"/>
      <text x="437" y="65" fill="#94A3B8" font-size="10" text-anchor="middle">Posição Média</text>
      <text x="437" y="86" fill="#F59E0B" font-size="16" font-weight="900" text-anchor="middle">4.2</text>
      <!-- Click Trend Graph Line -->
      <path d="M 75 200 Q 150 180 220 160 T 350 130 T 485 110" fill="none" stroke="#38BDF8" stroke-width="4"/>
      <circle cx="485" cy="110" r="5" fill="#38BDF8"/>
    </g>`,

  'palavras-chave-como-descobrir-pesquisas-clientes': `
    <g transform="translate(100, 20)">
      <!-- Search intent & Keyword Cloud -->
      <rect x="60" y="25" width="440" height="60" rx="30" fill="#0B2545" stroke="#38BDF8" stroke-width="2.5"/>
      <circle cx="100" cy="55" r="12" fill="none" stroke="#38BDF8" stroke-width="3"/>
      <line x1="109" y1="64" x2="120" y2="75" stroke="#38BDF8" stroke-width="3"/>
      <text x="135" y="62" fill="#FFFFFF" font-size="17" font-weight="700">criação de sites para empresas |</text>
      <!-- Floating keyword tags -->
      <rect x="60" y="110" width="160" height="35" rx="8" fill="#134074" stroke="#00F0FF" stroke-width="1.5"/>
      <text x="140" y="132" fill="#00F0FF" font-size="12" font-weight="700" text-anchor="middle">🏷️ empresa de TI curitiba</text>

      <rect x="240" y="110" width="170" height="35" rx="8" fill="#134074" stroke="#38BDF8" stroke-width="1.5"/>
      <text x="325" y="132" fill="#38BDF8" font-size="12" font-weight="700" text-anchor="middle">🏷️ consultoria SEO local</text>

      <rect x="110" y="160" width="180" height="35" rx="8" fill="#134074" stroke="#818CF8" stroke-width="1.5"/>
      <text x="200" y="182" fill="#818CF8" font-size="12" font-weight="700" text-anchor="middle">🏷️ quanto custa um website</text>

      <rect x="310" y="160" width="170" height="35" rx="8" fill="#134074" stroke="#10B981" stroke-width="1.5"/>
      <text x="395" y="182" fill="#10B981" font-size="12" font-weight="700" text-anchor="middle">🏷️ agência de sites B2B</text>
    </g>`,

  'seo-tecnico-fatores-crescimento-google': `
    <g transform="translate(100, 20)">
      <!-- Code brackets, schema and server gears -->
      <rect x="60" y="25" width="440" height="220" rx="12" fill="#071A2F" stroke="#38BDF8" stroke-width="2"/>
      <text x="100" y="70" fill="#38BDF8" font-size="28" font-family="monospace" font-weight="900">&lt;SEO Técnico /&gt;</text>
      <!-- Technical checklist -->
      <text x="100" y="110" fill="#10B981" font-size="14" font-family="monospace">✔ Schema.org JSON-LD Estruturado</text>
      <text x="100" y="140" fill="#10B981" font-size="14" font-family="monospace">✔ Canonical Tags &amp; Hreflang</text>
      <text x="100" y="170" fill="#10B981" font-size="14" font-family="monospace">✔ Sitemap.xml &amp; Robots.txt Válidos</text>
      <text x="100" y="200" fill="#10B981" font-size="14" font-family="monospace">✔ Compressão Brotli &amp; Cache L2</text>
      <!-- Gear -->
      <circle cx="430" cy="80" r="30" fill="none" stroke="#38BDF8" stroke-width="4" stroke-dasharray="8,6"/>
      <circle cx="430" cy="80" r="10" fill="#38BDF8"/>
    </g>`,

  'seo-para-prestadores-de-servicos': `
    <g transform="translate(100, 20)">
      <!-- Service Provider Local SEO -->
      <rect x="70" y="30" width="420" height="210" rx="12" fill="#071A2F" stroke="#38BDF8" stroke-width="2"/>
      <!-- Service icons -->
      <circle cx="140" cy="90" r="35" fill="#0B2545" stroke="#38BDF8" stroke-width="2"/>
      <text x="140" y="100" fill="#38BDF8" font-size="30" text-anchor="middle">🔧</text>
      <text x="140" y="145" fill="#FFFFFF" font-size="13" font-weight="700" text-anchor="middle">Serviços</text>
      
      <circle cx="280" cy="90" r="35" fill="#0B2545" stroke="#10B981" stroke-width="2"/>
      <text x="280" y="100" fill="#10B981" font-size="30" text-anchor="middle">📍</text>
      <text x="280" y="145" fill="#FFFFFF" font-size="13" font-weight="700" text-anchor="middle">Busca Local</text>

      <circle cx="420" cy="90" r="35" fill="#0B2545" stroke="#00F0FF" stroke-width="2"/>
      <text x="420" y="100" fill="#00F0FF" font-size="30" text-anchor="middle">📲</text>
      <text x="420" y="145" fill="#FFFFFF" font-size="13" font-weight="700" text-anchor="middle">WhatsApp</text>
      
      <line x1="180" y1="90" x2="240" y2="90" stroke="#38BDF8" stroke-width="2"/>
      <line x1="320" y1="90" x2="380" y2="90" stroke="#10B981" stroke-width="2"/>
      <text x="280" y="195" fill="#38BDF8" font-size="14" font-weight="800" text-anchor="middle">CAPTANDO CLIENTES COM ALTA INTENÇÃO</text>
    </g>`,

  // CLUSTER 3: MARKETING DIGITAL & AUTORIDADE
  'site-ou-instagram-qual-mais-importante': `
    <g transform="translate(100, 20)">
      <!-- Balanced Scales of Marketing -->
      <line x1="280" y1="50" x2="280" y2="210" stroke="#60A5FA" stroke-width="5"/>
      <line x1="160" y1="90" x2="400" y2="90" stroke="#60A5FA" stroke-width="5"/>
      <circle cx="280" cy="50" r="10" fill="#60A5FA"/>
      <!-- Instagram Pan -->
      <line x1="160" y1="90" x2="160" y2="130" stroke="#E1306C" stroke-width="2"/>
      <rect x="110" y="130" width="100" height="70" rx="10" fill="#0B2545" stroke="#E1306C" stroke-width="2"/>
      <text x="160" y="160" fill="#E1306C" font-size="20" text-anchor="middle">📷</text>
      <text x="160" y="185" fill="#E1306C" font-size="11" font-weight="800" text-anchor="middle">INSTAGRAM</text>
      <!-- Website Pan -->
      <line x1="400" y1="90" x2="400" y2="130" stroke="#00F0FF" stroke-width="2"/>
      <rect x="350" y="130" width="100" height="70" rx="10" fill="#0B2545" stroke="#00F0FF" stroke-width="2"/>
      <text x="400" y="160" fill="#00F0FF" font-size="20" text-anchor="middle">🌐</text>
      <text x="400" y="185" fill="#00F0FF" font-size="11" font-weight="800" text-anchor="middle">SITE PRÓPRIO</text>
      <text x="280" y="240" fill="#FFFFFF" font-size="13" font-weight="700" text-anchor="middle">TERRENO PRÓPRIO VS REDE SOCIAL</text>
    </g>`,

  'instagram-substitui-site-profissional': `
    <g transform="translate(100, 20)">
      <!-- Instagram Limitations vs Website Hub -->
      <rect x="70" y="30" width="180" height="210" rx="10" fill="#0B2545" stroke="#E1306C" stroke-width="2"/>
      <text x="160" y="65" fill="#E1306C" font-size="14" font-weight="800" text-anchor="middle">INSTAGRAM</text>
      <text x="160" y="105" fill="#EF4444" font-size="12" text-anchor="middle">⚠️ Algoritmo Instável</text>
      <text x="160" y="135" fill="#EF4444" font-size="12" text-anchor="middle">⚠️ Sem SEO no Google</text>
      <text x="160" y="165" fill="#EF4444" font-size="12" text-anchor="middle">⚠️ Sem Domínio Próprio</text>
      <text x="160" y="205" fill="#94A3B8" font-size="11" text-anchor="middle">Canal Complementar</text>

      <rect x="310" y="30" width="180" height="210" rx="10" fill="#0B2545" stroke="#00F0FF" stroke-width="2"/>
      <text x="400" y="65" fill="#00F0FF" font-size="14" font-weight="800" text-anchor="middle">SITE PROFISSIONAL</text>
      <text x="400" y="105" fill="#10B981" font-size="12" text-anchor="middle">✔ Ativo Permanente</text>
      <text x="400" y="135" fill="#10B981" font-size="12" text-anchor="middle">✔ #1 nas Buscas Google</text>
      <text x="400" y="165" fill="#10B981" font-size="12" text-anchor="middle">✔ Máxima Credibilidade</text>
      <text x="400" y="205" fill="#00F0FF" font-size="11" font-weight="800" text-anchor="middle">Hub Central da Marca</text>
    </g>`,

  'como-criar-autoridade-digital-marca': `
    <g transform="translate(100, 20)">
      <!-- Digital Authority Pillars & Diamond Crown -->
      <polygon points="280,30 330,70 300,120 260,120 230,70" fill="#60A5FA" opacity="0.85"/>
      <polygon points="280,30 295,70 280,120 265,70" fill="#FFFFFF" opacity="0.6"/>
      <!-- Pillars of Authority -->
      <rect x="80" y="140" width="90" height="80" rx="6" fill="#111827" stroke="#60A5FA" stroke-width="1.5"/>
      <text x="125" y="175" fill="#60A5FA" font-size="18" text-anchor="middle">🏛️</text>
      <text x="125" y="205" fill="#FFFFFF" font-size="11" font-weight="700" text-anchor="middle">Website</text>

      <rect x="200" y="140" width="90" height="80" rx="6" fill="#111827" stroke="#60A5FA" stroke-width="1.5"/>
      <text x="245" y="175" fill="#60A5FA" font-size="18" text-anchor="middle">🎯</text>
      <text x="245" y="205" fill="#FFFFFF" font-size="11" font-weight="700" text-anchor="middle">Conteúdo</text>

      <rect x="320" y="140" width="90" height="80" rx="6" fill="#111827" stroke="#60A5FA" stroke-width="1.5"/>
      <text x="365" y="175" fill="#60A5FA" font-size="18" text-anchor="middle">⭐</text>
      <text x="365" y="205" fill="#FFFFFF" font-size="11" font-weight="700" text-anchor="middle">Depoimentos</text>

      <rect x="440" y="140" width="90" height="80" rx="6" fill="#111827" stroke="#60A5FA" stroke-width="1.5"/>
      <text x="485" y="175" fill="#60A5FA" font-size="18" text-anchor="middle">🏆</text>
      <text x="485" y="205" fill="#FFFFFF" font-size="11" font-weight="700" text-anchor="middle">Projetos</text>
    </g>`,

  'como-transformar-visitantes-do-site-em-clientes': `
    <g transform="translate(100, 20)">
      <!-- Conversion Rate Optimization Heatmap & CTA Clicks -->
      <rect x="70" y="30" width="420" height="210" rx="12" fill="#0B2545" stroke="#60A5FA" stroke-width="2"/>
      <circle cx="280" cy="110" r="45" fill="rgba(239, 68, 68, 0.4)" filter="blur(10px)"/>
      <circle cx="280" cy="110" r="25" fill="rgba(245, 158, 11, 0.6)" filter="blur(5px)"/>
      <!-- High Converting Button -->
      <rect x="180" y="90" width="200" height="48" rx="24" fill="#10B981" stroke="#34D399" stroke-width="2"/>
      <text x="280" y="120" fill="#FFFFFF" font-size="14" font-weight="900" text-anchor="middle">FALAR COM CONSULTOR</text>
      <!-- Cursor Clicking Pointer -->
      <polygon points="320,130 340,165 330,170 345,195 335,200 320,175 305,185" fill="#FFFFFF" stroke="#000000" stroke-width="1.5"/>
      <text x="280" y="215" fill="#60A5FA" font-size="14" font-weight="800" text-anchor="middle">CRO: OTIMIZAÇÃO DE TAXA DE CONVERSÃO</text>
    </g>`,

  'whatsapp-no-site-aumentar-contatos-conversoes': `
    <g transform="translate(100, 20)">
      <!-- WhatsApp Conversion Hub -->
      <circle cx="280" cy="130" r="60" fill="#25D366"/>
      <path d="M 280 85 C 255 85 235 105 235 130 C 235 139 238 147 242 154 L 236 175 L 258 169 C 265 173 272 175 280 175 C 305 175 325 155 325 130 C 325 105 305 85 280 85 Z" fill="#FFFFFF"/>
      <!-- Ping waves -->
      <circle cx="280" cy="130" r="80" fill="none" stroke="#25D366" stroke-width="3" opacity="0.6"/>
      <circle cx="280" cy="130" r="105" fill="none" stroke="#25D366" stroke-width="2" opacity="0.3"/>
      <!-- Notification badge -->
      <circle cx="330" cy="80" r="16" fill="#EF4444"/>
      <text x="330" y="86" fill="#FFFFFF" font-size="14" font-weight="900" text-anchor="middle">+3</text>
      <text x="280" y="240" fill="#FFFFFF" font-size="15" font-weight="800" text-anchor="middle">ATENDIMENTO IMEDIATO = + CONVERSÕES</text>
    </g>`,

  'marketing-de-conteudo-atrair-sem-anuncios': `
    <g transform="translate(100, 20)">
      <!-- Content Inbound Magnet -->
      <path d="M 120 70 L 180 70 L 180 110 L 150 110 L 150 170 Q 150 200 180 200 L 380 200 Q 410 200 410 170 L 410 110 L 380 110 L 380 70 L 440 70 L 440 170 Q 440 240 380 240 L 180 240 Q 120 240 120 170 Z" fill="#60A5FA"/>
      <rect x="120" y="70" width="60" height="25" fill="#EF4444"/>
      <rect x="380" y="70" width="60" height="25" fill="#EF4444"/>
      <!-- Inbound client particles -->
      <circle cx="280" cy="60" r="12" fill="#10B981"/>
      <circle cx="240" cy="100" r="10" fill="#00F0FF"/>
      <circle cx="320" cy="100" r="10" fill="#00F0FF"/>
      <circle cx="280" cy="130" r="14" fill="#F59E0B"/>
      <text x="280" y="180" fill="#071A2F" font-size="14" font-weight="900" text-anchor="middle">ATRAÇÃO ORGÂNICA</text>
    </g>`,

  'blog-empresarial-vale-a-pena-2026': `
    <g transform="translate(100, 20)">
      <!-- Corporate Blog Post Card with Readership Growth -->
      <rect x="60" y="30" width="220" height="200" rx="10" fill="#0B2545" stroke="#60A5FA" stroke-width="2"/>
      <rect x="80" y="50" width="180" height="60" rx="6" fill="#1E3A8A"/>
      <line x1="80" y1="125" x2="260" y2="125" stroke="#FFFFFF" stroke-width="3" opacity="0.6"/>
      <line x1="80" y1="145" x2="220" y2="145" stroke="#FFFFFF" stroke-width="3" opacity="0.4"/>
      <line x1="80" y1="165" x2="240" y2="165" stroke="#FFFFFF" stroke-width="3" opacity="0.4"/>
      <!-- Readership Growth Graph -->
      <rect x="310" y="30" width="190" height="200" rx="10" fill="#071A2F" stroke="#10B981" stroke-width="2"/>
      <text x="405" y="65" fill="#10B981" font-size="13" font-weight="800" text-anchor="middle">TRÁFEGO ORGÂNICO</text>
      <polyline points="330,190 370,160 410,120 450,140 480,80" fill="none" stroke="#10B981" stroke-width="4"/>
      <circle cx="480" cy="80" r="6" fill="#10B981"/>
      <text x="405" y="215" fill="#FFFFFF" font-size="12" font-weight="700" text-anchor="middle">+450% LEITORES / MÊS</text>
    </g>`,

  'como-criar-estrategia-digital-negocios-locais': `
    <g transform="translate(100, 20)">
      <!-- Local Strategy Compass & Channels -->
      <circle cx="280" cy="130" r="85" fill="#0B2545" stroke="#60A5FA" stroke-width="2"/>
      <polygon points="280,60 295,120 280,110 265,120" fill="#EF4444"/>
      <polygon points="280,200 295,140 280,150 265,140" fill="#60A5FA"/>
      <circle cx="280" cy="130" r="10" fill="#FFFFFF"/>
      <!-- 4 Channel nodes -->
      <rect x="60" y="110" width="80" height="40" rx="6" fill="#134074" stroke="#00F0FF" stroke-width="1.5"/>
      <text x="100" y="135" fill="#00F0FF" font-size="11" font-weight="800" text-anchor="middle">Website</text>

      <rect x="420" y="110" width="80" height="40" rx="6" fill="#134074" stroke="#38BDF8" stroke-width="1.5"/>
      <text x="460" y="135" fill="#38BDF8" font-size="11" font-weight="800" text-anchor="middle">Google</text>

      <rect x="240" y="10" width="80" height="35" rx="6" fill="#134074" stroke="#818CF8" stroke-width="1.5"/>
      <text x="280" y="32" fill="#818CF8" font-size="11" font-weight="800" text-anchor="middle">Redes</text>

      <rect x="240" y="215" width="80" height="35" rx="6" fill="#134074" stroke="#10B981" stroke-width="1.5"/>
      <text x="280" y="237" fill="#10B981" font-size="11" font-weight="800" text-anchor="middle">WhatsApp</text>
    </g>`,

  'presenca-digital-o-que-empresa-precisa-2026': `
    <g transform="translate(100, 20)">
      <!-- 5 Core Digital Pillars -->
      <rect x="50" y="140" width="80" height="90" rx="6" fill="#0B2545" stroke="#00F0FF" stroke-width="2"/>
      <text x="90" y="175" fill="#00F0FF" font-size="20" text-anchor="middle">🌐</text>
      <text x="90" y="205" fill="#FFFFFF" font-size="11" font-weight="700" text-anchor="middle">Site</text>

      <rect x="145" y="120" width="80" height="110" rx="6" fill="#0B2545" stroke="#38BDF8" stroke-width="2"/>
      <text x="185" y="165" fill="#38BDF8" font-size="20" text-anchor="middle">🔍</text>
      <text x="185" y="195" fill="#FFFFFF" font-size="11" font-weight="700" text-anchor="middle">SEO</text>

      <rect x="240" y="90" width="80" height="140" rx="6" fill="#0B2545" stroke="#60A5FA" stroke-width="2"/>
      <text x="280" y="145" fill="#60A5FA" font-size="20" text-anchor="middle">📱</text>
      <text x="280" y="175" fill="#FFFFFF" font-size="11" font-weight="700" text-anchor="middle">Social</text>

      <rect x="335" y="120" width="80" height="110" rx="6" fill="#0B2545" stroke="#818CF8" stroke-width="2"/>
      <text x="375" y="165" fill="#818CF8" font-size="20" text-anchor="middle">⚡</text>
      <text x="375" y="195" fill="#FFFFFF" font-size="11" font-weight="700" text-anchor="middle">Tráfego</text>

      <rect x="430" y="140" width="80" height="90" rx="6" fill="#0B2545" stroke="#10B981" stroke-width="2"/>
      <text x="470" y="175" fill="#10B981" font-size="20" text-anchor="middle">🤖</text>
      <text x="470" y="205" fill="#FFFFFF" font-size="11" font-weight="700" text-anchor="middle">IA / CRM</text>
    </g>`,

  'funil-de-vendas-digital-pequenas-empresas': `
    <g transform="translate(100, 20)">
      <!-- 4 Stages Sales Funnel -->
      <polygon points="80,40 480,40 420,95 140,95" fill="#3B82F6" opacity="0.85"/>
      <text x="280" y="72" fill="#FFFFFF" font-size="14" font-weight="800" text-anchor="middle">1. ATRAÇÃO (GOOGLE &amp; SOCIAL)</text>

      <polygon points="145,100 415,100 365,150 195,150" fill="#60A5FA" opacity="0.85"/>
      <text x="280" y="130" fill="#071A2F" font-size="13" font-weight="900" text-anchor="middle">2. ENGAJAMENTO NO SITE</text>

      <polygon points="200,155 360,155 320,200 240,200" fill="#F59E0B" opacity="0.9"/>
      <text x="280" y="182" fill="#071A2F" font-size="12" font-weight="900" text-anchor="middle">3. PROPOSTA</text>

      <rect x="235" y="205" width="90" height="35" rx="6" fill="#10B981"/>
      <text x="280" y="228" fill="#FFFFFF" font-size="13" font-weight="900" text-anchor="middle">4. VENDA 💰</text>
    </g>`,

  // CLUSTER 4: INTELIGÊNCIA ARTIFICIAL & AUTOMAÇÃO
  'inteligencia-artificial-para-pequenas-empresas': `
    <g transform="translate(100, 20)">
      <!-- AI Neural Microchip and Brain Nodes -->
      <rect x="200" y="50" width="160" height="160" rx="16" fill="#0F172A" stroke="#818CF8" stroke-width="3"/>
      <circle cx="280" cy="130" r="40" fill="none" stroke="#818CF8" stroke-width="3"/>
      <text x="280" y="138" fill="#818CF8" font-size="26" font-weight="900" text-anchor="middle">AI</text>
      <!-- Neural Pins -->
      <line x1="200" y1="80" x2="150" y2="80" stroke="#818CF8" stroke-width="3"/>
      <line x1="200" y1="130" x2="150" y2="130" stroke="#818CF8" stroke-width="3"/>
      <line x1="200" y1="180" x2="150" y2="180" stroke="#818CF8" stroke-width="3"/>
      <line x1="360" y1="80" x2="410" y2="80" stroke="#818CF8" stroke-width="3"/>
      <line x1="360" y1="130" x2="410" y2="130" stroke="#818CF8" stroke-width="3"/>
      <line x1="360" y1="180" x2="410" y2="180" stroke="#818CF8" stroke-width="3"/>
      <circle cx="140" cy="80" r="8" fill="#00F0FF"/>
      <circle cx="140" cy="130" r="8" fill="#00F0FF"/>
      <circle cx="140" cy="180" r="8" fill="#00F0FF"/>
      <circle cx="420" cy="80" r="8" fill="#38BDF8"/>
      <circle cx="420" cy="130" r="8" fill="#38BDF8"/>
      <circle cx="420" cy="180" r="8" fill="#38BDF8"/>
      <text x="280" y="245" fill="#FFFFFF" font-size="14" font-weight="800" text-anchor="middle">INTELIGÊNCIA COMPUTACIONAL APLICADA</text>
    </g>`,

  'como-usar-chatgpt-dia-a-dia-da-empresa': `
    <g transform="translate(100, 20)">
      <!-- ChatGPT Prompt Engineering Dialogue -->
      <rect x="60" y="25" width="440" height="210" rx="12" fill="#0F172A" stroke="#818CF8" stroke-width="2"/>
      <!-- User Prompt -->
      <rect x="85" y="45" width="390" height="60" rx="8" fill="#1E293B" stroke="#64748B" stroke-width="1"/>
      <text x="105" y="70" fill="#38BDF8" font-size="12" font-weight="800">PROMPT ESTRATÉGICO:</text>
      <text x="105" y="90" fill="#FFFFFF" font-size="11">"Estruture um plano de atendimento e scripts para WhatsApp..."</text>
      <!-- AI Response -->
      <rect x="85" y="115" width="390" height="95" rx="8" fill="rgba(129, 140, 248, 0.15)" stroke="#818CF8" stroke-width="1.5"/>
      <text x="105" y="140" fill="#818CF8" font-size="12" font-weight="800">RESPOSTA DA IA CONEXUS:</text>
      <text x="105" y="165" fill="#E2E8F0" font-size="11">1. Qualificação imediata do lead em 3 perguntas-chave</text>
      <text x="105" y="185" fill="#E2E8F0" font-size="11">2. Envio automático de tabela de preços e portfólio</text>
    </g>`,

  '15-maneiras-usar-ia-nos-negocios': `
    <g transform="translate(100, 20)">
      <!-- 15 Modular AI Capabilities Grid -->
      <g transform="translate(50, 25)">
        <rect x="0" y="0" width="80" height="50" rx="6" fill="#1E293B" stroke="#818CF8" stroke-width="1"/>
        <text x="40" y="30" fill="#818CF8" font-size="10" font-weight="800" text-anchor="middle">Copywriting</text>

        <rect x="90" y="0" width="80" height="50" rx="6" fill="#1E293B" stroke="#818CF8" stroke-width="1"/>
        <text x="130" y="30" fill="#818CF8" font-size="10" font-weight="800" text-anchor="middle">Atendimento</text>

        <rect x="180" y="0" width="80" height="50" rx="6" fill="#1E293B" stroke="#818CF8" stroke-width="1"/>
        <text x="220" y="30" fill="#818CF8" font-size="10" font-weight="800" text-anchor="middle">Automação</text>

        <rect x="270" y="0" width="80" height="50" rx="6" fill="#1E293B" stroke="#818CF8" stroke-width="1"/>
        <text x="310" y="30" fill="#818CF8" font-size="10" font-weight="800" text-anchor="middle">Análise Dados</text>

        <rect x="360" y="0" width="80" height="50" rx="6" fill="#1E293B" stroke="#818CF8" stroke-width="1"/>
        <text x="400" y="30" fill="#818CF8" font-size="10" font-weight="800" text-anchor="middle">SEO &amp; Blog</text>

        <rect x="0" y="60" width="80" height="50" rx="6" fill="#1E293B" stroke="#818CF8" stroke-width="1"/>
        <text x="40" y="90" fill="#818CF8" font-size="10" font-weight="800" text-anchor="middle">Finanças</text>

        <rect x="90" y="60" width="80" height="50" rx="6" fill="#1E293B" stroke="#818CF8" stroke-width="1"/>
        <text x="130" y="90" fill="#818CF8" font-size="10" font-weight="800" text-anchor="middle">Contratos</text>

        <rect x="180" y="60" width="80" height="50" rx="6" fill="#818CF8"/>
        <text x="220" y="90" fill="#071A2F" font-size="12" font-weight="900" text-anchor="middle">15 MODOS</text>

        <rect x="270" y="60" width="80" height="50" rx="6" fill="#1E293B" stroke="#818CF8" stroke-width="1"/>
        <text x="310" y="90" fill="#818CF8" font-size="10" font-weight="800" text-anchor="middle">Triagem</text>

        <rect x="360" y="60" width="80" height="50" rx="6" fill="#1E293B" stroke="#818CF8" stroke-width="1"/>
        <text x="400" y="90" fill="#818CF8" font-size="10" font-weight="800" text-anchor="middle">Imagens</text>

        <rect x="0" y="120" width="80" height="50" rx="6" fill="#1E293B" stroke="#818CF8" stroke-width="1"/>
        <text x="40" y="150" fill="#818CF8" font-size="10" font-weight="800" text-anchor="middle">Follow-up</text>

        <rect x="90" y="120" width="80" height="50" rx="6" fill="#1E293B" stroke="#818CF8" stroke-width="1"/>
        <text x="130" y="150" fill="#818CF8" font-size="10" font-weight="800" text-anchor="middle">Propostas</text>

        <rect x="180" y="120" width="80" height="50" rx="6" fill="#1E293B" stroke="#818CF8" stroke-width="1"/>
        <text x="220" y="150" fill="#818CF8" font-size="10" font-weight="800" text-anchor="middle">CRM</text>

        <rect x="270" y="120" width="80" height="50" rx="6" fill="#1E293B" stroke="#818CF8" stroke-width="1"/>
        <text x="310" y="150" fill="#818CF8" font-size="10" font-weight="800" text-anchor="middle">Suporte 24/7</text>

        <rect x="360" y="120" width="80" height="50" rx="6" fill="#1E293B" stroke="#818CF8" stroke-width="1"/>
        <text x="400" y="150" fill="#818CF8" font-size="10" font-weight="800" text-anchor="middle">Predição</text>
      </g>
    </g>`,

  'ia-no-atendimento-ao-cliente-vantagens-cuidados': `
    <g transform="translate(100, 20)">
      <!-- AI Customer Support Agent -->
      <circle cx="280" cy="110" r="55" fill="#1E293B" stroke="#818CF8" stroke-width="3"/>
      <!-- Headset & Face -->
      <circle cx="280" cy="105" r="28" fill="#818CF8"/>
      <path d="M 240 110 A 40 40 0 0 1 320 110" fill="none" stroke="#FFFFFF" stroke-width="4"/>
      <rect x="235" y="105" width="10" height="20" rx="3" fill="#FFFFFF"/>
      <rect x="315" y="105" width="10" height="20" rx="3" fill="#FFFFFF"/>
      <path d="M 320 115 L 305 130" stroke="#FFFFFF" stroke-width="3"/>
      <circle cx="302" cy="132" r="4" fill="#00F0FF"/>
      <!-- Stats tags -->
      <rect x="70" y="180" width="180" height="35" rx="6" fill="#10B981"/>
      <text x="160" y="202" fill="#071A2F" font-size="12" font-weight="900" text-anchor="middle">✔ RESPOSTA INSTANTÂNEA</text>

      <rect x="310" y="180" width="180" height="35" rx="6" fill="#F59E0B"/>
      <text x="400" y="202" fill="#071A2F" font-size="12" font-weight="900" text-anchor="middle">⚠️ SUPERVISÃO HUMANA</text>
    </g>`,

  'automacao-de-marketing-economizar-tempo-vender-mais': `
    <g transform="translate(100, 20)">
      <!-- Marketing Automation Workflow & Gears -->
      <rect x="60" y="40" width="100" height="60" rx="8" fill="#1E293B" stroke="#818CF8" stroke-width="2"/>
      <text x="110" y="65" fill="#818CF8" font-size="14" text-anchor="middle">Lead Entra</text>
      <text x="110" y="85" fill="#FFFFFF" font-size="11" font-weight="700" text-anchor="middle">No Site</text>

      <line x1="160" y1="70" x2="210" y2="70" stroke="#818CF8" stroke-width="3"/>
      <polygon points="210,70 200,65 200,75" fill="#818CF8"/>

      <rect x="210" y="40" width="120" height="60" rx="8" fill="#1E293B" stroke="#38BDF8" stroke-width="2"/>
      <text x="270" y="65" fill="#38BDF8" font-size="14" text-anchor="middle">Qualificação</text>
      <text x="270" y="85" fill="#FFFFFF" font-size="11" font-weight="700" text-anchor="middle">Automática</text>

      <line x1="330" y1="70" x2="380" y2="70" stroke="#38BDF8" stroke-width="3"/>
      <polygon points="380,70 370,65 370,75" fill="#38BDF8"/>

      <rect x="380" y="40" width="120" height="60" rx="8" fill="#1E293B" stroke="#10B981" stroke-width="2"/>
      <text x="440" y="65" fill="#10B981" font-size="14" text-anchor="middle">Disparo</text>
      <text x="440" y="85" fill="#FFFFFF" font-size="11" font-weight="700" text-anchor="middle">WhatsApp / CRM</text>
      <!-- Output results -->
      <rect x="150" y="150" width="260" height="50" rx="10" fill="#818CF8"/>
      <text x="280" y="181" fill="#071A2F" font-size="15" font-weight="900" text-anchor="middle">VENDAS NO PILOTO AUTOMÁTICO</text>
    </g>`,

  'inteligencia-artificial-vai-substituir-sites': `
    <g transform="translate(100, 20)">
      <!-- AI Engine Interfacing with Website Hub -->
      <rect x="60" y="30" width="180" height="210" rx="12" fill="#0F172A" stroke="#818CF8" stroke-width="2"/>
      <circle cx="150" cy="90" r="35" fill="none" stroke="#818CF8" stroke-width="3"/>
      <text x="150" y="98" fill="#818CF8" font-size="22" font-weight="900" text-anchor="middle">IA</text>
      <text x="150" y="150" fill="#FFFFFF" font-size="12" font-weight="700" text-anchor="middle">Mecanismo de Busca</text>
      <text x="150" y="170" fill="#A5B4FC" font-size="11" text-anchor="middle">AI Overviews &amp; Chat</text>
      <text x="150" y="210" fill="#818CF8" font-size="12" font-weight="800" text-anchor="middle">Consome Dados</text>
      <!-- Arrow connecting to Website Hub -->
      <line x1="240" y1="135" x2="320" y2="135" stroke="#00F0FF" stroke-width="4"/>
      <polygon points="320,135 310,128 310,142" fill="#00F0FF"/>

      <rect x="320" y="30" width="180" height="210" rx="12" fill="#0B2545" stroke="#00F0FF" stroke-width="2"/>
      <rect x="345" y="60" width="130" height="60" rx="6" fill="#134074" stroke="#00F0FF" stroke-width="1.5"/>
      <text x="410" y="95" fill="#00F0FF" font-size="14" font-weight="800" text-anchor="middle">WEBSITE OFICIAL</text>
      <text x="410" y="150" fill="#FFFFFF" font-size="12" font-weight="700" text-anchor="middle">Fonte Primária Oficial</text>
      <text x="410" y="170" fill="#94A3B8" font-size="11" text-anchor="middle">Transações &amp; Confiança</text>
      <text x="410" y="210" fill="#10B981" font-size="12" font-weight="800" text-anchor="middle">Insubstituível</text>
    </g>`,

  'como-ia-esta-transformando-marketing-digital': `
    <g transform="translate(100, 20)">
      <!-- AI Marketing Waves & Predictive Targeting -->
      <path d="M 60 180 Q 160 80 280 140 T 500 90" fill="none" stroke="#818CF8" stroke-width="4"/>
      <circle cx="280" cy="140" r="10" fill="#818CF8"/>
      <circle cx="500" cy="90" r="10" fill="#00F0FF"/>
      <!-- Target lenses -->
      <circle cx="180" cy="110" r="45" fill="none" stroke="#00F0FF" stroke-width="2"/>
      <line x1="180" y1="55" x2="180" y2="165" stroke="#00F0FF" stroke-width="1.5" stroke-dasharray="3,3"/>
      <line x1="125" y1="110" x2="235" y2="110" stroke="#00F0FF" stroke-width="1.5" stroke-dasharray="3,3"/>
      <text x="180" y="115" fill="#00F0FF" font-size="12" font-weight="900" text-anchor="middle">LEAD B2B</text>

      <rect x="310" y="140" width="180" height="85" rx="8" fill="#0F172A" stroke="#818CF8" stroke-width="1.5"/>
      <text x="400" y="165" fill="#818CF8" font-size="12" font-weight="800" text-anchor="middle">HIPERPERSONALIZAÇÃO</text>
      <text x="400" y="188" fill="#FFFFFF" font-size="11" text-anchor="middle">Conversão em tempo real</text>
      <text x="400" y="206" fill="#10B981" font-size="11" font-weight="700" text-anchor="middle">+68% Eficiência de CAC</text>
    </g>`,

  'ia-e-seo-mudancas-mecanismos-de-busca': `
    <g transform="translate(100, 20)">
      <!-- Google AI Overviews & Generative Engine Optimization (GEO) -->
      <rect x="50" y="25" width="460" height="220" rx="12" fill="#0F172A" stroke="#818CF8" stroke-width="2"/>
      <!-- AI Overview Header -->
      <rect x="75" y="45" width="410" height="40" rx="8" fill="rgba(129, 140, 248, 0.2)" stroke="#818CF8" stroke-width="1.2"/>
      <text x="95" y="70" fill="#818CF8" font-size="13" font-weight="900">✨ VISÃO GERAL GERADA POR IA (GOOGLE GEO)</text>
      <!-- Citation Cards -->
      <rect x="75" y="100" width="125" height="120" rx="6" fill="#1E293B" stroke="#00F0FF" stroke-width="1.5"/>
      <text x="137" y="130" fill="#00F0FF" font-size="11" font-weight="800" text-anchor="middle">FONTE #1 CITADA</text>
      <text x="137" y="155" fill="#FFFFFF" font-size="11" font-weight="700" text-anchor="middle">Sua Marca</text>
      <text x="137" y="180" fill="#94A3B8" font-size="9" text-anchor="middle">conexus.press</text>
      <rect x="95" y="195" width="85" height="16" rx="4" fill="#10B981"/>
      <text x="137" y="207" fill="#071A2F" font-size="9" font-weight="900" text-anchor="middle">AUTORIDADE</text>

      <rect x="215" y="100" width="270" height="120" rx="6" fill="#1E293B"/>
      <text x="230" y="128" fill="#E2E8F0" font-size="11">Como otimizar seu site para ser a</text>
      <text x="230" y="148" fill="#E2E8F0" font-size="11">resposta recomendada pelas IAs</text>
      <text x="230" y="168" fill="#E2E8F0" font-size="11">do Google em 2026.</text>
      <text x="230" y="198" fill="#818CF8" font-size="12" font-weight="800">→ Estratégia GEO &amp; AEO</text>
    </g>`,

  'como-preparar-empresa-para-era-da-ia': `
    <g transform="translate(100, 20)">
      <!-- AI Readiness Roadmap & Digital Transformation -->
      <rect x="60" y="40" width="440" height="180" rx="12" fill="#0F172A" stroke="#818CF8" stroke-width="2"/>
      <line x1="60" y1="120" x2="500" y2="120" stroke="#818CF8" stroke-width="2" stroke-dasharray="4,4"/>
      <!-- 3 Stage Readiness Pillars -->
      <circle cx="130" cy="120" r="22" fill="#3B82F6"/>
      <text x="130" y="126" fill="#FFFFFF" font-size="14" font-weight="900" text-anchor="middle">1</text>
      <text x="130" y="165" fill="#FFFFFF" font-size="12" font-weight="800" text-anchor="middle">Dados Limpos</text>

      <circle cx="280" cy="120" r="22" fill="#818CF8"/>
      <text x="280" y="126" fill="#FFFFFF" font-size="14" font-weight="900" text-anchor="middle">2</text>
      <text x="280" y="165" fill="#FFFFFF" font-size="12" font-weight="800" text-anchor="middle">Ferramentas IA</text>

      <circle cx="430" cy="120" r="22" fill="#10B981"/>
      <text x="430" y="126" fill="#FFFFFF" font-size="14" font-weight="900" text-anchor="middle">3</text>
      <text x="430" y="165" fill="#FFFFFF" font-size="12" font-weight="800" text-anchor="middle">Escala &amp; Lucro</text>
      <text x="280" y="75" fill="#818CF8" font-size="14" font-weight="800" text-anchor="middle">ROADMAP DE PREPARAÇÃO CORPORATIVA 2026</text>
    </g>`,

  'agentes-de-ia-o-que-sao-como-ajudam-empresas': `
    <g transform="translate(100, 20)">
      <!-- Autonomous AI Agents Feedback Loop -->
      <circle cx="280" cy="125" r="90" fill="none" stroke="#818CF8" stroke-width="2.5" stroke-dasharray="8,6"/>
      <!-- 4 Agent Execution Nodes -->
      <circle cx="280" cy="35" r="22" fill="#3B82F6"/>
      <text x="280" y="41" fill="#FFFFFF" font-size="12" font-weight="900" text-anchor="middle">Percepção</text>

      <circle cx="370" cy="125" r="22" fill="#818CF8"/>
      <text x="370" y="131" fill="#FFFFFF" font-size="12" font-weight="900" text-anchor="middle">Decisão</text>

      <circle cx="280" cy="215" r="22" fill="#10B981"/>
      <text x="280" y="221" fill="#FFFFFF" font-size="12" font-weight="900" text-anchor="middle">Execução</text>

      <circle cx="190" cy="125" r="22" fill="#F59E0B"/>
      <text x="190" y="131" fill="#071A2F" font-size="12" font-weight="900" text-anchor="middle">Ajuste</text>
      <text x="280" y="131" fill="#FFFFFF" font-size="13" font-weight="800" text-anchor="middle">AGENTE IA</text>
    </g>`,

  // CLUSTER 5: NEGÓCIOS & TRANSFORMAÇÃO DIGITAL
  'transformacao-digital-pequenas-empresas-guia': `
    <g transform="translate(100, 20)">
      <!-- Paper to Cloud Digital Transformation Portal -->
      <rect x="60" y="50" width="140" height="160" rx="8" fill="#1E293B" stroke="#64748B" stroke-width="2"/>
      <text x="130" y="90" fill="#94A3B8" font-size="12" font-weight="700" text-anchor="middle">📄 PROCESSOS</text>
      <text x="130" y="120" fill="#94A3B8" font-size="12" font-weight="700" text-anchor="middle">MANUAIS &amp;</text>
      <text x="130" y="150" fill="#94A3B8" font-size="12" font-weight="700" text-anchor="middle">PLANILHAS</text>
      <text x="130" y="190" fill="#EF4444" font-size="11" font-weight="800" text-anchor="middle">Passado</text>
      <!-- Digital Portal Arrow -->
      <path d="M 220 130 L 320 130" stroke="#2DD4BF" stroke-width="6"/>
      <polygon points="320,130 305,120 305,140" fill="#2DD4BF"/>

      <rect x="340" y="50" width="160" height="160" rx="8" fill="#0B2545" stroke="#2DD4BF" stroke-width="2.5"/>
      <text x="420" y="90" fill="#2DD4BF" font-size="13" font-weight="900" text-anchor="middle">☁️ ECOSSISTEMA</text>
      <text x="420" y="120" fill="#FFFFFF" font-size="12" font-weight="700" text-anchor="middle">DIGITAL EM NUVEM</text>
      <text x="420" y="150" fill="#00F0FF" font-size="11" font-weight="700" text-anchor="middle">Site • CRM • IA</text>
      <text x="420" y="190" fill="#10B981" font-size="11" font-weight="800" text-anchor="middle">Alta Rentabilidade</text>
    </g>`,

  'como-profissionalizar-pequena-empresa-com-tecnologia': `
    <g transform="translate(100, 20)">
      <!-- Enterprise Toolkit modernization badge -->
      <circle cx="280" cy="125" r="85" fill="#0B2545" stroke="#2DD4BF" stroke-width="3"/>
      <text x="280" y="110" fill="#2DD4BF" font-size="34" text-anchor="middle">⚡</text>
      <text x="280" y="145" fill="#FFFFFF" font-size="15" font-weight="900" text-anchor="middle">PROFISSIONALIZAÇÃO</text>
      <text x="280" y="168" fill="#2DD4BF" font-size="12" font-weight="700" text-anchor="middle">TECNOLÓGICA 2026</text>
      <!-- 4 Badges on corners -->
      <rect x="50" y="50" width="120" height="35" rx="6" fill="#1E293B" stroke="#2DD4BF" stroke-width="1.2"/>
      <text x="110" y="72" fill="#2DD4BF" font-size="11" font-weight="800" text-anchor="middle">Domínio Próprio</text>

      <rect x="390" y="50" width="120" height="35" rx="6" fill="#1E293B" stroke="#2DD4BF" stroke-width="1.2"/>
      <text x="450" y="72" fill="#2DD4BF" font-size="11" font-weight="800" text-anchor="middle">E-mail Corporativo</text>

      <rect x="50" y="170" width="120" height="35" rx="6" fill="#1E293B" stroke="#2DD4BF" stroke-width="1.2"/>
      <text x="110" y="192" fill="#2DD4BF" font-size="11" font-weight="800" text-anchor="middle">Site de Alta Vel.</text>

      <rect x="390" y="170" width="120" height="35" rx="6" fill="#1E293B" stroke="#2DD4BF" stroke-width="1.2"/>
      <text x="450" y="192" fill="#2DD4BF" font-size="11" font-weight="800" text-anchor="middle">CRM &amp; WhatsApp</text>
    </g>`,

  'email-profissional-abandonar-enderecos-genericos': `
    <g transform="translate(100, 20)">
      <!-- Corporate Email vs Generic Webmail -->
      <rect x="50" y="40" width="200" height="170" rx="10" fill="#1E293B" stroke="#EF4444" stroke-width="2"/>
      <text x="150" y="75" fill="#EF4444" font-size="13" font-weight="800" text-anchor="middle">❌ E-MAIL GENÉRICO</text>
      <text x="150" y="115" fill="#94A3B8" font-size="11" font-family="monospace" text-anchor="middle">empresa@gmail.com</text>
      <text x="150" y="155" fill="#EF4444" font-size="11" text-anchor="middle">Passa amadorismo</text>
      <text x="150" y="180" fill="#EF4444" font-size="11" text-anchor="middle">e baixa confiança</text>

      <rect x="310" y="40" width="200" height="170" rx="10" fill="#0B2545" stroke="#10B981" stroke-width="2.5"/>
      <text x="410" y="75" fill="#10B981" font-size="13" font-weight="800" text-anchor="middle">✔ E-MAIL CORPORATIVO</text>
      <text x="410" y="115" fill="#FFFFFF" font-size="11" font-family="monospace" font-weight="700" text-anchor="middle">contato@suaempresa.com.br</text>
      <text x="410" y="155" fill="#10B981" font-size="11" font-weight="700" text-anchor="middle">Autoridade Imediata</text>
      <text x="410" y="180" fill="#10B981" font-size="11" font-weight="700" text-anchor="middle">Segurança e Prestígio</text>
    </g>`,

  'como-construir-confianca-marca-ambiente-digital': `
    <g transform="translate(100, 20)">
      <!-- Vault of Trust & Brand Credibility Shield -->
      <path d="M 280 40 L 370 80 L 370 160 Q 280 230 280 230 Q 190 160 190 80 Z" fill="#0B2545" stroke="#2DD4BF" stroke-width="3"/>
      <circle cx="280" cy="120" r="30" fill="none" stroke="#2DD4BF" stroke-width="3"/>
      <text x="280" y="128" fill="#2DD4BF" font-size="24" font-weight="900" text-anchor="middle">✓</text>
      <!-- Proof Badges -->
      <rect x="50" y="80" width="110" height="40" rx="6" fill="#1E293B" stroke="#2DD4BF" stroke-width="1"/>
      <text x="105" y="105" fill="#2DD4BF" font-size="11" font-weight="700" text-anchor="middle">🔒 SSL Seguro</text>

      <rect x="400" y="80" width="110" height="40" rx="6" fill="#1E293B" stroke="#2DD4BF" stroke-width="1"/>
      <text x="455" y="105" fill="#2DD4BF" font-size="11" font-weight="700" text-anchor="middle">⭐ 5 Estrelas</text>

      <rect x="50" y="150" width="110" height="40" rx="6" fill="#1E293B" stroke="#2DD4BF" stroke-width="1"/>
      <text x="105" y="175" fill="#2DD4BF" font-size="11" font-weight="700" text-anchor="middle">📋 CNPJ Ativo</text>

      <rect x="400" y="150" width="110" height="40" rx="6" fill="#1E293B" stroke="#2DD4BF" stroke-width="1"/>
      <text x="455" y="175" fill="#2DD4BF" font-size="11" font-weight="700" text-anchor="middle">⚖️ LGPD OK</text>
    </g>`,

  'reputacao-online-como-proteger-imagem-empresa': `
    <g transform="translate(100, 20)">
      <!-- Reputation Radar Scanner -->
      <circle cx="280" cy="125" r="95" fill="#0B2545" stroke="#2DD4BF" stroke-width="2"/>
      <circle cx="280" cy="125" r="60" fill="none" stroke="#2DD4BF" stroke-width="1.5" stroke-dasharray="4,4"/>
      <circle cx="280" cy="125" r="25" fill="#2DD4BF" opacity="0.3"/>
      <!-- Sweep line -->
      <line x1="280" y1="125" x2="360" y2="65" stroke="#2DD4BF" stroke-width="3"/>
      <circle cx="340" cy="80" r="6" fill="#10B981"/>
      <circle cx="210" cy="160" r="6" fill="#10B981"/>
      <circle cx="330" cy="170" r="6" fill="#10B981"/>
      <text x="280" y="245" fill="#FFFFFF" font-size="14" font-weight="800" text-anchor="middle">MONITORAMENTO DE REPUTAÇÃO E SENTIMENTO</text>
    </g>`,

  'como-escolher-agencia-de-marketing-digital': `
    <g transform="translate(100, 20)">
      <!-- Agency Evaluation Checklist & Magnifying Glass -->
      <rect x="60" y="30" width="440" height="210" rx="12" fill="#0B2545" stroke="#2DD4BF" stroke-width="2"/>
      <text x="90" y="70" fill="#2DD4BF" font-size="15" font-weight="800">CRITÉRIOS DE ESCOLHA DA AGÊNCIA:</text>
      <text x="90" y="105" fill="#FFFFFF" font-size="12">✔ Portfólio real com cases comprovados</text>
      <text x="90" y="135" fill="#FFFFFF" font-size="12">✔ Engenharia de código próprio (sem modelos lentos)</text>
      <text x="90" y="165" fill="#FFFFFF" font-size="12">✔ Foco em ROI financeiro e aquisição de clientes</text>
      <text x="90" y="195" fill="#FFFFFF" font-size="12">✔ Transparência de métricas e suporte contínuo</text>
      <!-- Seal -->
      <circle cx="430" cy="135" r="40" fill="#1E293B" stroke="#2DD4BF" stroke-width="2"/>
      <text x="430" y="132" fill="#2DD4BF" font-size="12" font-weight="900" text-anchor="middle">CONEXUS</text>
      <text x="430" y="148" fill="#FFFFFF" font-size="9" font-weight="700" text-anchor="middle">QUALIDADE</text>
    </g>`,

  'agencia-ou-freelancer-qual-melhor-para-projeto': `
    <g transform="translate(100, 20)">
      <!-- Agency vs Freelancer Comparison Matrix -->
      <rect x="50" y="30" width="200" height="210" rx="10" fill="#0B2545" stroke="#2DD4BF" stroke-width="2.5"/>
      <text x="150" y="65" fill="#2DD4BF" font-size="14" font-weight="900" text-anchor="middle">AGÊNCIA CONEXUS</text>
      <text x="150" y="100" fill="#10B981" font-size="12" text-anchor="middle">✔ Equipe Multidisciplinar</text>
      <text x="150" y="130" fill="#10B981" font-size="12" text-anchor="middle">✔ Garantia &amp; SLA de Suporte</text>
      <text x="150" y="160" fill="#10B981" font-size="12" text-anchor="middle">✔ Visão Estratégica Completa</text>
      <text x="150" y="195" fill="#2DD4BF" font-size="11" font-weight="800" text-anchor="middle">Segurança Total</text>

      <rect x="310" y="30" width="200" height="210" rx="10" fill="#1E293B" stroke="#64748B" stroke-width="1.5"/>
      <text x="410" y="65" fill="#94A3B8" font-size="14" font-weight="800" text-anchor="middle">FREELANCER</text>
      <text x="410" y="100" fill="#E2E8F0" font-size="12" text-anchor="middle">Trabalho Individual</text>
      <text x="410" y="130" fill="#E2E8F0" font-size="12" text-anchor="middle">Risco de Indisponibilidade</text>
      <text x="410" y="160" fill="#E2E8F0" font-size="12" text-anchor="middle">Escopo Geralmente Limitado</text>
      <text x="410" y="195" fill="#94A3B8" font-size="11" text-anchor="middle">Para Tarefas Pontuais</text>
    </g>`,

  'como-tecnologia-reduz-custos-pequena-empresa': `
    <g transform="translate(100, 20)">
      <!-- Cost Reduction & Profit Surge -->
      <rect x="60" y="30" width="440" height="210" rx="12" fill="#0B2545" stroke="#10B981" stroke-width="2"/>
      <!-- Descending Cost Line -->
      <path d="M 90 80 L 220 150 L 300 180" fill="none" stroke="#EF4444" stroke-width="4"/>
      <circle cx="300" cy="180" r="6" fill="#EF4444"/>
      <text x="130" y="105" fill="#EF4444" font-size="13" font-weight="800">CUSTOS OPERACIONAIS (-35%)</text>
      <!-- Ascending Profit Line -->
      <path d="M 90 180 L 240 120 L 450 65" fill="none" stroke="#10B981" stroke-width="5"/>
      <circle cx="450" cy="65" r="7" fill="#10B981"/>
      <text x="310" y="95" fill="#10B981" font-size="14" font-weight="900">MARGEM DE LUCRO LÍQUIDO (+180%)</text>
      <!-- Automation Scissors -->
      <text x="240" y="215" fill="#FFFFFF" font-size="14" font-weight="800">✂️ ELIMINAÇÃO DE DESPERDÍCIOS</text>
    </g>`,

  'digitalizacao-de-processos-como-comecar': `
    <g transform="translate(100, 20)">
      <!-- Process Digitization Step Blueprint -->
      <rect x="50" y="50" width="110" height="75" rx="8" fill="#1E293B" stroke="#2DD4BF" stroke-width="1.5"/>
      <text x="105" y="80" fill="#2DD4BF" font-size="12" font-weight="800" text-anchor="middle">1. MAPEAR</text>
      <text x="105" y="105" fill="#FFFFFF" font-size="11" text-anchor="middle">Gargalos</text>

      <line x1="160" y1="87" x2="220" y2="87" stroke="#2DD4BF" stroke-width="3"/>
      <polygon points="220,87 210,82 210,92" fill="#2DD4BF"/>

      <rect x="220" y="50" width="120" height="75" rx="8" fill="#1E293B" stroke="#2DD4BF" stroke-width="1.5"/>
      <text x="280" y="80" fill="#2DD4BF" font-size="12" font-weight="800" text-anchor="middle">2. DIGITALIZAR</text>
      <text x="280" y="105" fill="#FFFFFF" font-size="11" text-anchor="middle">Formulários Web</text>

      <line x1="340" y1="87" x2="400" y2="87" stroke="#2DD4BF" stroke-width="3"/>
      <polygon points="400,87 390,82 390,92" fill="#2DD4BF"/>

      <rect x="400" y="50" width="110" height="75" rx="8" fill="#10B981"/>
      <text x="455" y="80" fill="#071A2F" font-size="12" font-weight="900" text-anchor="middle">3. AUTOMATIZAR</text>
      <text x="455" y="105" fill="#071A2F" font-size="11" font-weight="800" text-anchor="middle">WhatsApp / CRM</text>

      <text x="280" y="195" fill="#FFFFFF" font-size="15" font-weight="800" text-anchor="middle">OPERAÇÃO PADRONIZADA E SEGURA</text>
    </g>`,

  'tendencias-digitais-pequenas-empresas-acompanhar': `
    <g transform="translate(100, 20)">
      <!-- 2026 Tech Trends Radar -->
      <circle cx="280" cy="125" r="95" fill="#0B2545" stroke="#2DD4BF" stroke-width="2"/>
      <text x="280" y="130" fill="#2DD4BF" font-size="28" font-weight="900" text-anchor="middle">2026</text>
      <!-- Trend nodes around radar -->
      <rect x="50" y="40" width="120" height="35" rx="6" fill="#1E293B" stroke="#00F0FF" stroke-width="1.2"/>
      <text x="110" y="62" fill="#00F0FF" font-size="11" font-weight="800" text-anchor="middle">🚀 Web Vitals 99+</text>

      <rect x="390" y="40" width="120" height="35" rx="6" fill="#1E293B" stroke="#818CF8" stroke-width="1.2"/>
      <text x="450" y="62" fill="#818CF8" font-size="11" font-weight="800" text-anchor="middle">🤖 Agentes de IA</text>

      <rect x="50" y="170" width="120" height="35" rx="6" fill="#1E293B" stroke="#10B981" stroke-width="1.2"/>
      <text x="110" y="192" fill="#10B981" font-size="11" font-weight="800" text-anchor="middle">💬 Conversão WA</text>

      <rect x="390" y="170" width="120" height="35" rx="6" fill="#1E293B" stroke="#38BDF8" stroke-width="1.2"/>
      <text x="450" y="192" fill="#38BDF8" font-size="11" font-weight="800" text-anchor="middle">🔍 SEO GEO/AEO</text>
    </g>`,

  // CLUSTER 6: CRESCIMENTO & TECNOLOGIA
  'como-conseguir-mais-clientes-pela-internet': `
    <g transform="translate(100, 20)">
      <!-- Inbound Customer Acquisition Machine -->
      <rect x="60" y="30" width="440" height="210" rx="12" fill="#071426" stroke="#22D3EE" stroke-width="2"/>
      <circle cx="150" cy="110" r="45" fill="#0F4C81" stroke="#22D3EE" stroke-width="2"/>
      <text x="150" y="118" fill="#22D3EE" font-size="32" text-anchor="middle">🧲</text>
      <text x="150" y="180" fill="#FFFFFF" font-size="12" font-weight="800" text-anchor="middle">Imã de Tráfego</text>

      <line x1="205" y1="110" x2="310" y2="110" stroke="#22D3EE" stroke-width="4"/>
      <polygon points="310,110 300,103 300,117" fill="#22D3EE"/>

      <rect x="310" y="70" width="160" height="90" rx="10" fill="#10B981"/>
      <text x="390" y="105" fill="#FFFFFF" font-size="14" font-weight="900" text-anchor="middle">CLIENTES PAGANTES</text>
      <text x="390" y="130" fill="#071A2F" font-size="12" font-weight="800" text-anchor="middle">Pipeline Previsível</text>
      <text x="280" y="215" fill="#22D3EE" font-size="13" font-weight="700" text-anchor="middle">AQUISIÇÃO PREVISÍVEL E ESCALÁVEL</text>
    </g>`,

  'como-transformar-google-canal-aquisicao-clientes': `
    <g transform="translate(100, 20)">
      <!-- Google as Primary Acquisition Engine -->
      <rect x="50" y="30" width="460" height="210" rx="12" fill="#071426" stroke="#22D3EE" stroke-width="2"/>
      <text x="90" y="75" fill="#FFFFFF" font-size="20" font-weight="900">Google <tspan fill="#22D3EE">→ Canal #1 de Clientes</tspan></text>
      <rect x="90" y="100" width="380" height="35" rx="6" fill="#0F4C81"/>
      <text x="110" y="123" fill="#22D3EE" font-size="12" font-weight="800">1. Busca do Cliente:</text>
      <text x="230" y="123" fill="#FFFFFF" font-size="12">"preciso de empresa para..."</text>

      <rect x="90" y="145" width="380" height="35" rx="6" fill="#0F4C81"/>
      <text x="110" y="168" fill="#10B981" font-size="12" font-weight="800">2. Encontra Seu Site:</text>
      <text x="240" y="168" fill="#FFFFFF" font-size="12">#1 Posição Orgânica no Topo</text>

      <rect x="90" y="190" width="380" height="35" rx="6" fill="#10B981"/>
      <text x="280" y="213" fill="#071A2F" font-size="13" font-weight="900" text-anchor="middle">3. Conversão Imediata no WhatsApp</text>
    </g>`,

  'como-medir-se-site-traz-resultados': `
    <g transform="translate(100, 20)">
      <!-- Financial Results & Attribution Dashboard -->
      <rect x="60" y="30" width="440" height="210" rx="12" fill="#071426" stroke="#22D3EE" stroke-width="2"/>
      <text x="280" y="65" fill="#22D3EE" font-size="15" font-weight="800" text-anchor="middle">MÉTRICAS FINANCEIRAS DO WEBSITE</text>
      <!-- 3 Metrics boxes -->
      <rect x="80" y="85" width="110" height="70" rx="8" fill="#0F4C81" stroke="#22D3EE" stroke-width="1"/>
      <text x="135" y="110" fill="#94A3B8" font-size="10" text-anchor="middle">Contatos/Mês</text>
      <text x="135" y="138" fill="#22D3EE" font-size="20" font-weight="900" text-anchor="middle">+142</text>

      <rect x="225" y="85" width="110" height="70" rx="8" fill="#0F4C81" stroke="#10B981" stroke-width="1"/>
      <text x="280" y="110" fill="#94A3B8" font-size="10" text-anchor="middle">Vendas Fechadas</text>
      <text x="280" y="138" fill="#10B981" font-size="20" font-weight="900" text-anchor="middle">38</text>

      <rect x="370" y="85" width="110" height="70" rx="8" fill="#0F4C81" stroke="#F59E0B" stroke-width="1"/>
      <text x="425" y="110" fill="#94A3B8" font-size="10" text-anchor="middle">Receita Gerada</text>
      <text x="425" y="138" fill="#F59E0B" font-size="18" font-weight="900" text-anchor="middle">R$ 84k</text>

      <text x="280" y="205" fill="#FFFFFF" font-size="13" font-weight="700" text-anchor="middle">SITE COMO CENTRO DE LUCRO, NÃO CUSTO</text>
    </g>`,

  'google-analytics-metricas-que-realmente-importam': `
    <g transform="translate(100, 20)">
      <!-- GA4 Essential Metrics -->
      <rect x="60" y="30" width="440" height="210" rx="12" fill="#071426" stroke="#22D3EE" stroke-width="2"/>
      <text x="100" y="68" fill="#F59E0B" font-size="16" font-weight="900">GA4 <tspan fill="#FFFFFF">Google Analytics 4</tspan></text>
      <!-- Key events list -->
      <rect x="90" y="90" width="380" height="30" rx="6" fill="#0F4C81"/>
      <text x="110" y="110" fill="#10B981" font-size="11" font-weight="800">✔ clique_whatsapp</text>
      <text x="380" y="110" fill="#FFFFFF" font-size="11" font-weight="700">184 eventos</text>

      <rect x="90" y="130" width="380" height="30" rx="6" fill="#0F4C81"/>
      <text x="110" y="150" fill="#10B981" font-size="11" font-weight="800">✔ envio_formulario</text>
      <text x="380" y="150" fill="#FFFFFF" font-size="11" font-weight="700">62 eventos</text>

      <rect x="90" y="170" width="380" height="30" rx="6" fill="#0F4C81"/>
      <text x="110" y="190" fill="#10B981" font-size="11" font-weight="800">✔ tempo_engajamento</text>
      <text x="380" y="190" fill="#FFFFFF" font-size="11" font-weight="700">2m 45s média</text>
    </g>`,

  'formulario-ou-whatsapp-qual-gera-mais-contatos': `
    <g transform="translate(100, 20)">
      <!-- Form vs WhatsApp Conversion A/B Test -->
      <rect x="60" y="30" width="190" height="210" rx="10" fill="#071426" stroke="#38BDF8" stroke-width="2"/>
      <text x="155" y="65" fill="#38BDF8" font-size="13" font-weight="800" text-anchor="middle">FORMULÁRIO WEB</text>
      <rect x="80" y="85" width="150" height="20" rx="4" fill="#0F4C81"/>
      <rect x="80" y="115" width="150" height="20" rx="4" fill="#0F4C81"/>
      <rect x="80" y="145" width="150" height="35" rx="4" fill="#38BDF8"/>
      <text x="155" y="167" fill="#071426" font-size="11" font-weight="900" text-anchor="middle">Enviar Mensagem</text>
      <text x="155" y="210" fill="#94A3B8" font-size="11" text-anchor="middle">Para B2B Complexo</text>

      <rect x="310" y="30" width="190" height="210" rx="10" fill="#071426" stroke="#25D366" stroke-width="2.5"/>
      <text x="405" y="65" fill="#25D366" font-size="13" font-weight="800" text-anchor="middle">BOTÃO WHATSAPP</text>
      <circle cx="405" cy="115" r="30" fill="#25D366"/>
      <text x="405" y="125" fill="#FFFFFF" font-size="28" text-anchor="middle">💬</text>
      <rect x="330" y="160" width="150" height="35" rx="6" fill="#25D366"/>
      <text x="405" y="182" fill="#FFFFFF" font-size="11" font-weight="900" text-anchor="middle">Chamar no WhatsApp</text>
      <text x="405" y="215" fill="#10B981" font-size="11" font-weight="800" text-anchor="middle">Resposta Imediata</text>
    </g>`,

  'seguranca-de-sites-como-proteger-empresa-clientes': `
    <g transform="translate(100, 20)">
      <!-- Cybersecurity Firewall & Encryption Shield -->
      <path d="M 280 35 L 380 75 L 380 165 Q 280 235 280 235 Q 180 165 180 75 Z" fill="#071426" stroke="#22D3EE" stroke-width="3"/>
      <rect x="255" y="105" width="50" height="40" rx="6" fill="#22D3EE"/>
      <path d="M 265 105 L 265 90 Q 280 70 295 90 L 295 105" fill="none" stroke="#22D3EE" stroke-width="4"/>
      <circle cx="280" cy="122" r="5" fill="#071426"/>
      <!-- Security tags -->
      <rect x="50" y="80" width="110" height="35" rx="6" fill="#0F4C81" stroke="#22D3EE" stroke-width="1.2"/>
      <text x="105" y="102" fill="#22D3EE" font-size="11" font-weight="800" text-anchor="middle">🔒 SSL / TLS 1.3</text>

      <rect x="400" y="80" width="110" height="35" rx="6" fill="#0F4C81" stroke="#22D3EE" stroke-width="1.2"/>
      <text x="455" y="102" fill="#22D3EE" font-size="11" font-weight="800" text-anchor="middle">🛡️ WAF Firewall</text>

      <rect x="50" y="150" width="110" height="35" rx="6" fill="#0F4C81" stroke="#22D3EE" stroke-width="1.2"/>
      <text x="105" y="172" fill="#22D3EE" font-size="11" font-weight="800" text-anchor="middle">💾 Backups Diários</text>

      <rect x="400" y="150" width="110" height="35" rx="6" fill="#0F4C81" stroke="#22D3EE" stroke-width="1.2"/>
      <text x="455" y="172" fill="#22D3EE" font-size="11" font-weight="800" text-anchor="middle">⚡ Anti-DDoS</text>
    </g>`,

  'lgpd-para-sites-pequenas-empresas': `
    <g transform="translate(100, 20)">
      <!-- LGPD Privacy Shield and Compliance Protocol -->
      <rect x="70" y="30" width="420" height="210" rx="12" fill="#071426" stroke="#22D3EE" stroke-width="2"/>
      <text x="110" y="75" fill="#22D3EE" font-size="20" font-weight="900">LGPD <tspan fill="#FFFFFF">Conformidade Legal</tspan></text>
      <!-- Compliance check items -->
      <text x="110" y="115" fill="#10B981" font-size="13">✔ Banner de Cookies com Gestão de Consentimento</text>
      <text x="110" y="145" fill="#10B981" font-size="13">✔ Política de Privacidade e Termos de Uso Claros</text>
      <text x="110" y="175" fill="#10B981" font-size="13">✔ Armazenamento Criptografado de Leads</text>
      <text x="110" y="205" fill="#10B981" font-size="13">✔ Direitos dos Titulares de Dados Resguardados</text>
      <!-- Stamp -->
      <rect x="360" y="45" width="110" height="35" rx="6" fill="#10B981"/>
      <text x="415" y="67" fill="#071A2F" font-size="12" font-weight="900" text-anchor="middle">100% SEGURO</text>
    </g>`,

  'aplicativos-para-empresas-quando-vale-a-pena': `
    <g transform="translate(100, 20)">
      <!-- Smartphone App UI vs Mobile Web -->
      <rect x="180" y="25" width="200" height="220" rx="20" fill="#071426" stroke="#22D3EE" stroke-width="3"/>
      <rect x="235" y="35" width="90" height="10" rx="5" fill="#0F4C81"/>
      <!-- App widgets -->
      <rect x="200" y="55" width="160" height="35" rx="6" fill="#22D3EE" opacity="0.2"/>
      <text x="280" y="77" fill="#22D3EE" font-size="11" font-weight="800" text-anchor="middle">📱 App Nativo</text>
      <rect x="200" y="100" width="75" height="50" rx="6" fill="#0F4C81"/>
      <rect x="285" y="100" width="75" height="50" rx="6" fill="#0F4C81"/>
      <rect x="200" y="160" width="160" height="35" rx="6" fill="#10B981"/>
      <text x="280" y="182" fill="#071A2F" font-size="11" font-weight="900" text-anchor="middle">Push Notifications</text>
      <!-- Decision comparison -->
      <rect x="50" y="90" width="110" height="70" rx="8" fill="#0F4C81" stroke="#38BDF8" stroke-width="1"/>
      <text x="105" y="120" fill="#38BDF8" font-size="11" font-weight="800" text-anchor="middle">Site Web</text>
      <text x="105" y="145" fill="#FFFFFF" font-size="10" text-anchor="middle">Aquisição Topo</text>

      <rect x="400" y="90" width="110" height="70" rx="8" fill="#0F4C81" stroke="#10B981" stroke-width="1"/>
      <text x="455" y="120" fill="#10B981" font-size="11" font-weight="800" text-anchor="middle">App Próprio</text>
      <text x="455" y="145" fill="#FFFFFF" font-size="10" text-anchor="middle">Retenção &amp; Uso</text>
    </g>`,

  'software-personalizado-quando-empresa-precisa': `
    <g transform="translate(100, 20)">
      <!-- Custom Software Architecture & APIs -->
      <rect x="60" y="30" width="440" height="210" rx="12" fill="#071426" stroke="#22D3EE" stroke-width="2"/>
      <text x="100" y="70" fill="#22D3EE" font-size="18" font-weight="900">SISTEMA SOB MEDIDA (CUSTOM SOFTWARE)</text>
      <!-- Architecture blocks -->
      <rect x="90" y="95" width="100" height="60" rx="8" fill="#0F4C81" stroke="#22D3EE" stroke-width="1.5"/>
      <text x="140" y="122" fill="#22D3EE" font-size="11" font-weight="800" text-anchor="middle">Front-end</text>
      <text x="140" y="140" fill="#FFFFFF" font-size="10" text-anchor="middle">Custom UI</text>

      <line x1="190" y1="125" x2="230" y2="125" stroke="#22D3EE" stroke-width="3"/>

      <rect x="230" y="95" width="100" height="60" rx="8" fill="#0F4C81" stroke="#22D3EE" stroke-width="1.5"/>
      <text x="280" y="122" fill="#22D3EE" font-size="11" font-weight="800" text-anchor="middle">Back-end API</text>
      <text x="280" y="140" fill="#FFFFFF" font-size="10" text-anchor="middle">Regras Negócio</text>

      <line x1="330" y1="125" x2="370" y2="125" stroke="#22D3EE" stroke-width="3"/>

      <rect x="370" y="95" width="100" height="60" rx="8" fill="#0F4C81" stroke="#22D3EE" stroke-width="1.5"/>
      <text x="420" y="122" fill="#22D3EE" font-size="11" font-weight="800" text-anchor="middle">Banco Dados</text>
      <text x="420" y="140" fill="#FFFFFF" font-size="10" text-anchor="middle">Postgres/Nuvem</text>
      <text x="280" y="205" fill="#10B981" font-size="13" font-weight="800" text-anchor="middle">PROCESSO EXCLUSIVO = VANTAGEM COMPETITIVA</text>
    </g>`,

  'futuro-negocios-digitais-sites-apps-automacao-ia': `
    <g transform="translate(100, 20)">
      <!-- Master Convergence Nexus (Web + Apps + Automation + AI) -->
      <circle cx="280" cy="125" r="95" fill="#071426" stroke="#22D3EE" stroke-width="3"/>
      <circle cx="280" cy="125" r="35" fill="#10B981"/>
      <text x="280" y="132" fill="#071A2F" font-size="13" font-weight="900" text-anchor="middle">CONEXUS</text>
      <!-- 4 Converging satellite nodes -->
      <rect x="50" y="40" width="110" height="40" rx="6" fill="#0F4C81" stroke="#00F0FF" stroke-width="1.5"/>
      <text x="105" y="65" fill="#00F0FF" font-size="12" font-weight="800" text-anchor="middle">🌐 Websites</text>
      <line x1="160" y1="60" x2="250" y2="105" stroke="#00F0FF" stroke-width="2"/>

      <rect x="400" y="40" width="110" height="40" rx="6" fill="#0F4C81" stroke="#38BDF8" stroke-width="1.5"/>
      <text x="455" y="65" fill="#38BDF8" font-size="12" font-weight="800" text-anchor="middle">📱 Apps</text>
      <line x1="400" y1="60" x2="310" y2="105" stroke="#38BDF8" stroke-width="2"/>

      <rect x="50" y="170" width="110" height="40" rx="6" fill="#0F4C81" stroke="#818CF8" stroke-width="1.5"/>
      <text x="105" y="195" fill="#818CF8" font-size="12" font-weight="800" text-anchor="middle">⚡ Automação</text>
      <line x1="160" y1="190" x2="250" y2="145" stroke="#818CF8" stroke-width="2"/>

      <rect x="400" y="170" width="110" height="40" rx="6" fill="#0F4C81" stroke="#2DD4BF" stroke-width="1.5"/>
      <text x="455" y="195" fill="#2DD4BF" font-size="12" font-weight="800" text-anchor="middle">🤖 IA</text>
      <line x1="400" y1="190" x2="310" y2="145" stroke="#2DD4BF" stroke-width="2"/>
    </g>`
};

const clusterStyles = {
  1: { grad1: '#0B2545', grad2: '#134074', accent: '#00F0FF', badge: 'WEBSITES & DESIGN' },
  2: { grad1: '#071A2F', grad2: '#0F4C81', accent: '#38BDF8', badge: 'SEO & GOOGLE' },
  3: { grad1: '#111827', grad2: '#1E3A8A', accent: '#60A5FA', badge: 'MARKETING DIGITAL' },
  4: { grad1: '#0F172A', grad2: '#312E81', accent: '#818CF8', badge: 'INTELIGÊNCIA ARTIFICIAL' },
  5: { grad1: '#091E3A', grad2: '#1E293B', accent: '#2DD4BF', badge: 'TRANSFORMAÇÃO DIGITAL' },
  6: { grad1: '#071426', grad2: '#164E63', accent: '#22D3EE', badge: 'CRESCIMENTO & TECNOLOGIA' }
};

async function generateAllCovers() {
  console.log(`Starting bespoke generation of ${all60Articles.length} unique differentiated covers...`);
  let count = 0;

  for (const article of all60Articles) {
    const style = clusterStyles[article.clusterId] || clusterStyles[1];
    const baseName = path.basename(article.image, '.webp');
    const illustration = uniqueIllustrations[article.slug] || `
      <g transform="translate(140, 20)">
        <rect x="250" y="140" width="120" height="120" rx="16" fill="none" stroke="${style.accent}" stroke-width="3" opacity="0.8"/>
        <text x="310" y="205" fill="${style.accent}" font-size="28" font-weight="900" text-anchor="middle">CONEXUS</text>
      </g>`;

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
    <linearGradient id="bgGrad_${article.slug.replace(/-/g, '_')}" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${style.grad1}" />
      <stop offset="100%" stop-color="${style.grad2}" />
    </linearGradient>
    <pattern id="gridPattern_${article.slug.replace(/-/g, '_')}" width="40" height="40" patternUnits="userSpaceOnUse">
      <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255, 255, 255, 0.04)" stroke-width="1"/>
    </pattern>
  </defs>

  <!-- Background -->
  <rect width="860" height="440" fill="url(#bgGrad_${article.slug.replace(/-/g, '_')})" />
  <rect width="860" height="440" fill="url(#gridPattern_${article.slug.replace(/-/g, '_')})" />

  <!-- Ambient Glow -->
  <circle cx="700" cy="120" r="180" fill="${style.accent}" opacity="0.12" />
  <circle cx="150" cy="350" r="140" fill="#2563EB" opacity="0.1" />

  <!-- Unique Thematic Graphical Element -->
  ${illustration}

  <!-- Darkening Gradient Overlay at Bottom -->
  <rect x="0" y="240" width="860" height="200" fill="${style.grad1}" opacity="0.9" />

  <!-- Content Box / Card Header -->
  <g transform="translate(50, 270)">
    <!-- Badge -->
    <rect x="0" y="0" width="${style.badge.length * 9.5 + 24}" height="26" rx="4" fill="${style.accent}" fill-opacity="0.15" stroke="${style.accent}" stroke-width="1.2" />
    <text x="12" y="17" fill="${style.accent}" font-family="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="11" font-weight="700" letter-spacing="1">${cleanBadge}</text>
    
    <!-- Title Line 1 -->
    <text x="0" y="60" fill="#FFFFFF" font-family="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="24" font-weight="800">${line1}</text>
    ${line2 ? `<text x="0" y="90" fill="#E2E8F0" font-family="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="22" font-weight="700">${line2}</text>` : ''}
    
    <!-- Footer Brand & Date -->
    <text x="0" y="${line2 ? '125' : '100'}" fill="#94A3B8" font-family="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="13" font-weight="500">CONEXUS • Guia Estratégico Digital • 2026</text>
  </g>

  <!-- Top Brand Watermark -->
  <text x="790" y="50" fill="#FFFFFF" opacity="0.3" font-family="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="16" font-weight="800" text-anchor="end" letter-spacing="2">CONEXUS</text>
</svg>`;

    const svgBuffer = Buffer.from(svgContent);
    const webpBuffer = await sharp(svgBuffer)
      .webp({ quality: 92, lossless: false })
      .toBuffer();

    // Verify header
    const isWebp = webpBuffer.slice(0, 4).toString('ascii') === 'RIFF' && webpBuffer.slice(8, 12).toString('ascii') === 'WEBP';
    if (!isWebp) {
      throw new Error(`Buffer for ${baseName} failed WebP header check!`);
    }

    const svgName = `${baseName}.svg`;
    const webpName = `${baseName}.webp`;

    for (const targetDir of [assetsImagesDir, publicImagesDir, distImagesDir, hostingerImagesDir]) {
      fs.writeFileSync(path.join(targetDir, svgName), svgContent, 'utf-8');
      fs.writeFileSync(path.join(targetDir, webpName), webpBuffer);
    }

    count++;
  }

  console.log(`\nSuccessfully generated ${count}/60 unique differentiated WebP covers across all target directories!`);
}

generateAllCovers().catch(err => {
  console.error('Fatal Error:', err);
  process.exit(1);
});
