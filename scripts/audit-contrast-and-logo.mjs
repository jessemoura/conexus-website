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
const hexBgRegex = /style="[^"]*background(-color)?:\s*#([0-9a-fA-F]{3,8})[^"]*"/g;

let foundCount = 0;
const details = [];

for (const file of htmlFiles) {
  const content = fs.readFileSync(file, 'utf8');
  let match;
  while ((match = hexBgRegex.exec(content)) !== null) {
    foundCount++;
    details.push({ file, snippet: match[0] });
  }
}

console.log(`Total hardcoded hex backgrounds found in HTML: ${foundCount}`);
const uniqueSnippets = [...new Set(details.map(d => d.snippet))];
console.log('Unique background snippets:', uniqueSnippets);
