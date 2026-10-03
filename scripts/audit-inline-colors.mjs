import fs from 'fs';
import path from 'path';

function getHtmlFiles(dir) {
  let results = [];
  const list = fs.readdirSync(dir, { withFileTypes: true });
  for (const item of list) {
    if (item.isDirectory()) {
      if (item.name !== 'node_modules' && item.name !== '.git' && item.name !== 'dist' && item.name !== 'scratch') {
        results = results.concat(getHtmlFiles(path.join(dir, item.name)));
      }
    } else if (item.name.endsWith('.html')) {
      results.push(path.join(dir, item.name));
    }
  }
  return results;
}

const htmlFiles = getHtmlFiles('.');
const hardcodedColorRegex = /style="[^"]*color:\s*#([0-9a-fA-F]{3,8})[^"]*"/g;

const found = [];
for (const file of htmlFiles) {
  const content = fs.readFileSync(file, 'utf8');
  let match;
  while ((match = hardcodedColorRegex.exec(content)) !== null) {
    found.push({ file, snippet: match[0] });
  }
}

console.log(`Total hardcoded inline text colors found: ${found.length}`);
const unique = [...new Set(found.map(f => f.snippet))];
console.log('Unique inline color snippets:', unique);
