import fs from 'fs';

const html = fs.readFileSync('blog/por-que-sua-empresa-precisa-de-um-site/index.html', 'utf-8');
const regex = /data-i18n=["']([^"']+)["']/g;
const matches = [];
let match;
while ((match = regex.exec(html)) !== null) {
  matches.push(match[1]);
}
console.log('Total data-i18n tags:', matches.length);
console.log('First 20:', matches.slice(0, 20));
console.log('autoContent tags:', matches.filter(k => k.startsWith('autoContent')));
