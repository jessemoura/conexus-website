import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const dirs = [
  path.join(rootDir, 'public', 'assets', 'icons', 'flags'),
  path.join(rootDir, 'assets', 'icons', 'flags')
];

dirs.forEach(d => {
  if (!fs.existsSync(d)) fs.mkdirSync(d, { recursive: true });
});

const brSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 720 480" width="100%" height="100%">
  <rect width="720" height="480" fill="#009b3a"/>
  <polygon points="360,36 684,240 360,444 36,240" fill="#fedf00"/>
  <circle cx="360" cy="240" r="120" fill="#002776"/>
  <path d="M 240,240 C 270,215 390,215 480,250 C 390,230 270,230 240,240 Z" fill="#ffffff"/>
  <g fill="#ffffff">
    <circle cx="360" cy="270" r="4"/>
    <circle cx="330" cy="255" r="3.5"/>
    <circle cx="390" cy="255" r="3.5"/>
    <circle cx="310" cy="275" r="3"/>
    <circle cx="410" cy="275" r="3"/>
    <circle cx="345" cy="290" r="3"/>
    <circle cx="375" cy="290" r="3"/>
    <circle cx="360" cy="305" r="3"/>
  </g>
</svg>`;

const gbSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 60 30" width="100%" height="100%">
  <clipPath id="s">
    <path d="M0,0 v30 h60 v-30 z"/>
  </clipPath>
  <clipPath id="t">
    <path d="M30,15 h30 v15 z v15 h-30 z h-30 v-15 z v-15 h30 z"/>
  </clipPath>
  <g clip-path="url(#s)">
    <path d="M0,0 v30 h60 v-30 z" fill="#012169"/>
    <path d="M0,0 L60,30 M60,0 L0,30" stroke="#fff" stroke-width="6"/>
    <path d="M0,0 L60,30 M60,0 L0,30" clip-path="url(#t)" stroke="#C8102E" stroke-width="4"/>
    <path d="M30,0 v30 M0,15 h60" stroke="#fff" stroke-width="10"/>
    <path d="M30,0 v30 M0,15 h60" stroke="#C8102E" stroke-width="6"/>
  </g>
</svg>`;

const esSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 750 500" width="100%" height="100%">
  <rect width="750" height="500" fill="#c60b1e"/>
  <rect width="750" height="250" y="125" fill="#ffc400"/>
  <g transform="translate(200, 250) scale(0.95)">
    <path d="M-28,-75 L28,-75 L22,-50 L-22,-50 Z" fill="#c60b1e" stroke="#8b0000" stroke-width="2"/>
    <circle cx="0" cy="-82" r="6" fill="#ffc400"/>
    <circle cx="-24" cy="-78" r="4" fill="#ffc400"/>
    <circle cx="24" cy="-78" r="4" fill="#ffc400"/>
    <path d="M-32,-45 L32,-45 L32,10 C32,45 0,55 0,55 C0,55 -32,45 -32,10 Z" fill="#c60b1e" stroke="#8b0000" stroke-width="3"/>
    <path d="M-28,-40 L28,-40 L28,8 C28,38 0,48 0,48 C0,48 -28,38 -28,8 Z" fill="#ffc400"/>
    <rect x="-25" y="-37" width="23" height="35" fill="#c60b1e"/>
    <rect x="2" y="-37" width="23" height="35" fill="#ffffff"/>
    <rect x="-25" y="0" width="23" height="38" fill="#ffc400"/>
    <rect x="2" y="0" width="23" height="38" fill="#c60b1e"/>
    <circle cx="0" cy="0" r="8" fill="#002776" stroke="#ffc400" stroke-width="1.5"/>
    <rect x="-52" y="-40" width="8" height="80" fill="#e0e0e0" stroke="#999" rx="2"/>
    <rect x="44" y="-40" width="8" height="80" fill="#e0e0e0" stroke="#999" rx="2"/>
    <path d="M-56, -45 L-40, -45 L-44, -38 L-52, -38 Z" fill="#ffc400"/>
    <path d="M40, -45 L56, -45 L52, -38 L44, -38 Z" fill="#ffc400"/>
  </g>
</svg>`;

dirs.forEach(d => {
  fs.writeFileSync(path.join(d, 'br.svg'), brSvg, 'utf8');
  fs.writeFileSync(path.join(d, 'gb.svg'), gbSvg, 'utf8');
  fs.writeFileSync(path.join(d, 'es.svg'), esSvg, 'utf8');
});

console.log('Flag SVGs generated successfully in both public/assets/icons/flags and assets/icons/flags!');
