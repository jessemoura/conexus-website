const fs = require('fs');
const path = require('path');

function getAllFiles(dir, exts) {
  let files = [];
  fs.readdirSync(dir).forEach(file => {
    const fullPath = path.join(dir, file);
    if (file === 'node_modules' || file === 'dist' || file === '.git' || file === 'backup-conexus-website-snapshot') return;
    if (fs.statSync(fullPath).isDirectory()) {
      files = files.concat(getAllFiles(fullPath, exts));
    } else if (exts.some(ext => file.endsWith(ext))) {
      files.push(fullPath);
    }
  });
  return files;
}

const allFiles = getAllFiles('.', ['.html', '.js', '.mjs']);
console.log('Total files inspected:', allFiles.length);

const linkRegex = /href=["\\'](\/[^"\\'#?]+)/g;
const allLinks = new Set();
const fileLinkMap = [];

allFiles.forEach(file => {
  const content = fs.readFileSync(file, 'utf8');
  let match;
  while ((match = linkRegex.exec(content)) !== null) {
    let link = match[1].replace(/\\$/, '').replace(/\\"/g, '');
    if (!link.startsWith('/')) continue;
    if (link.startsWith('/assets/') || link.startsWith('/src/')) continue;
    allLinks.add(link);
    fileLinkMap.push({ file, link });
  }
});

console.log('Unique internal routes found:', allLinks.size);
const broken = [];
allLinks.forEach(link => {
  let target = link.startsWith('/') ? link.slice(1) : link;
  let exists = false;
  if (fs.existsSync(target) && fs.statSync(target).isFile()) exists = true;
  else if (fs.existsSync(path.join(target, 'index.html'))) exists = true;
  else if (fs.existsSync(target) && fs.statSync(target).isDirectory()) exists = true;
  
  if (!exists) {
    broken.push(link);
  }
});

console.log('Broken routes found:', broken.length);
broken.forEach(b => console.log('BROKEN:', b));
if (broken.length > 0) {
  console.log('\nOccurrences:');
  fileLinkMap.filter(x => broken.includes(x.link)).forEach(b => {
    console.log('In ' + b.file + ' -> ' + b.link);
  });
}
