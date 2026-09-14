const fs = require('fs');
const path = require('path');

function getAllHtml(dir) {
  let files = [];
  fs.readdirSync(dir).forEach(file => {
    const full = path.join(dir, file);
    if (file === 'node_modules' || file === 'dist' || file === '.git' || file === 'backup-conexus-website-snapshot') return;
    if (fs.statSync(full).isDirectory()) files = files.concat(getAllHtml(full));
    else if (file.endsWith('.html')) files.push(full);
  });
  return files;
}

const htmlFiles = getAllHtml('.');
console.log('HTML files count:', htmlFiles.length);

let updated = 0;
htmlFiles.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  let original = content;
  
  // Standardize canonical: https://conexus.press/ -> https://www.conexus.press/
  content = content.replace(/(<link\s+rel=["']canonical["']\s+href=["'])https:\/\/(?:www\.)?conexus\.press([^"']*["']>)/gi, '$1https://www.conexus.press$2');
  
  // Standardize hreflang: https://conexus.press/ -> https://www.conexus.press/
  content = content.replace(/(<link\s+rel=["']alternate["']\s+hreflang=["'][^"']+["']\s+href=["'])https:\/\/(?:www\.)?conexus\.press([^"']*["']>)/gi, '$1https://www.conexus.press$2');
  
  if (content !== original) {
    fs.writeFileSync(file, content, 'utf8');
    updated++;
  }
});
console.log('Updated HTML files for Canonical & Hreflang:', updated);

// Also standardize robots.txt
['robots.txt', 'public/robots.txt'].forEach(rf => {
  if (fs.existsSync(rf)) {
    let rContent = fs.readFileSync(rf, 'utf8');
    rContent = rContent.replace(/Sitemap:\s*https:\/\/(?:www\.)?conexus\.press\/sitemap\.xml/gi, 'Sitemap: https://www.conexus.press/sitemap.xml');
    fs.writeFileSync(rf, rContent, 'utf8');
    console.log('Standardized', rf);
  }
});

// Also standardize sitemap.xml and public/sitemap.xml
['sitemap.xml', 'public/sitemap.xml'].forEach(sf => {
  if (fs.existsSync(sf)) {
    let sContent = fs.readFileSync(sf, 'utf8');
    sContent = sContent.replace(/<loc>https:\/\/(?:www\.)?conexus\.press([^<]*)<\/loc>/gi, '<loc>https://www.conexus.press$1</loc>');
    fs.writeFileSync(sf, sContent, 'utf8');
    console.log('Standardized', sf);
  }
});

// Update validate-site.js to check for https://www.conexus.press/ or https://conexus.press/
const validateFile = path.join(__dirname, 'validate-site.js');
if (fs.existsSync(validateFile)) {
  let vContent = fs.readFileSync(validateFile, 'utf8');
  vContent = vContent.replace(
    /indexHtmlContent\.includes\('<link rel="canonical" href="https:\/\/conexus\.press\/'\)/g,
    "indexHtmlContent.includes('<link rel=\"canonical\" href=\"https://www.conexus.press/\">') || indexHtmlContent.includes('<link rel=\"canonical\" href=\"https://conexus.press/\">')"
  );
  fs.writeFileSync(validateFile, vContent, 'utf8');
  console.log('Updated validate-site.js assertion.');
}
