import fs from 'fs';
import path from 'path';

function getHtmlFiles(dir) {
  let files = [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    if (entry.name === 'node_modules' || entry.name === 'dist' || entry.name === '.git') continue;
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files = files.concat(getHtmlFiles(fullPath));
    } else if (entry.name.endsWith('.html')) {
      files.push(fullPath);
    }
  }
  return files;
}

const htmlFiles = getHtmlFiles('.');

console.log('=== FINDING HARDCODED INLINE COLOR ATTRIBUTES ===\n');

for (const file of htmlFiles) {
  const content = fs.readFileSync(file, 'utf-8');
  const lines = content.split('\n');
  const hardcoded = [];
  
  lines.forEach((line, idx) => {
    // Look for style="..." containing color: #FFF, #CBD5E1, #F5F8FC, etc.
    if (/style=["'][^"']*color:\s*(#FFF|#FFFFFF|#F5F8FC|#CBD5E1|#B8C5D3|#E2E8F0|white)/i.test(line)) {
      // Exclude svg fills or buttons with explicit dark background
      if (!line.includes('<svg') && !line.includes('btn-primary') && !line.includes('fill=')) {
        hardcoded.push({ line: idx + 1, code: line.trim() });
      }
    }
  });
  
  if (hardcoded.length > 0) {
    console.log(`📁 ${file} (${hardcoded.length} instances):`);
    hardcoded.forEach(h => console.log(`   L${h.line}: ${h.code.slice(0, 100)}`));
  }
}
