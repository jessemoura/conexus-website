import fs from 'fs';
import path from 'path';

async function diagnose() {
  const targetArticles = [
    { name: 'Automação de marketing', searchStr: 'automacao-de-marketing' },
    { name: 'Inteligência Artificial vai substituir os sites', searchStr: 'ia-vai-substituir-sites' },
    { name: 'Como a IA está transformando o marketing digital', searchStr: 'como-ia-transforma-marketing-digital' }
  ];

  console.log('=== 1. FETCHING LIVE PRODUCTION HTML ===');
  const res = await fetch('https://www.conexus.press/blog/?lang=pt', {
    headers: { 'User-Agent': 'Mozilla/5.0' },
    cache: 'no-store'
  });
  const html = await res.text();
  console.log('Live HTML fetched, size:', html.length, 'bytes');

  for (const item of targetArticles) {
    console.log('\n========================================');
    console.log(`DIAGNOSING: ${item.name}`);
    console.log('========================================');

    const slugIdx = html.indexOf(item.searchStr);
    if (slugIdx === -1) {
      console.log(`SLUG NOT FOUND IN HTML: ${item.searchStr}`);
      continue;
    }

    const startArticle = html.lastIndexOf('<article', slugIdx);
    const endArticle = html.indexOf('</article>', slugIdx);
    const block = html.substring(startArticle, endArticle + 10);

    const imgMatch = block.match(/<img[^>]+src=["']([^"']+)["'][^>]*>/i);
    if (!imgMatch) {
      console.log('NO IMG TAG FOUND IN ARTICLE BLOCK!');
      continue;
    }

    const src = imgMatch[1];
    const fullUrl = src.startsWith('http') ? src : `https://www.conexus.press${src.startsWith('/') ? '' : '/'}${src}`;
    const filename = path.basename(src);

    console.log(`1. src EXATO no HTML publicado: "${src}"`);
    console.log(`2. URL pública completa: "${fullUrl}"`);

    // Fetch the image from production
    try {
      const imgRes = await fetch(fullUrl, {
        headers: { 'User-Agent': 'Mozilla/5.0' },
        cache: 'no-store'
      });
      const ab = await imgRes.arrayBuffer();
      const buf = Buffer.from(ab);
      const ct = imgRes.headers.get('content-type');
      const cl = imgRes.headers.get('content-length');

      console.log(`3. Status HTTP: ${imgRes.status}`);
      console.log(`4. Content-Type: ${ct}`);
      console.log(`5. Tamanho em bytes da resposta: ${buf.length} bytes (Header Content-Length: ${cl})`);
      
      const hexFirst16 = buf.slice(0, 16).toString('hex');
      const asciiFirst16 = buf.slice(0, 16).toString('binary').replace(/[^\x20-\x7E]/g, '.');
      console.log(`6. Primeiros 16 bytes (hex): ${hexFirst16}`);
      console.log(`   Primeiros 16 bytes (ASCII): ${asciiFirst16}`);

      // Check file in local repository
      const localPublic = path.resolve('public/assets/images', filename);
      const localAssets = path.resolve('assets/images', filename);
      const localDist = path.resolve('dist/assets/images', filename);
      const localHostinger = path.resolve('HOSTINGER-FINAL/assets/images', filename);

      console.log(`7. Nome exato no repositório (public/assets/images/): "${filename}" (Existe: ${fs.existsSync(localPublic)})`);
      console.log(`8. Nome exato implantado (HOSTINGER-FINAL/assets/images/): "${filename}" (Existe: ${fs.existsSync(localHostinger)})`);

      // Check case sensitivity
      const actualPublicFiles = fs.readdirSync(path.resolve('public/assets/images'));
      const exactMatch = actualPublicFiles.find(f => f === filename);
      const caseInsensitiveMatch = actualPublicFiles.find(f => f.toLowerCase() === filename.toLowerCase());
      console.log(`9. Diferença maiúsculas/minúsculas: Exato="${exactMatch}", Case-insensitive="${caseInsensitiveMatch}" (Diferença: ${exactMatch !== filename})`);

      const isRealWebp = buf.length >= 12 && buf.slice(0, 4).toString() === 'RIFF' && buf.slice(8, 12).toString() === 'WEBP';
      const isHtml = buf.slice(0, 64).toString().toLowerCase().includes('<!doctype') || buf.slice(0, 64).toString().toLowerCase().includes('<html');

      console.log(`10. É realmente imagem WebP binária?: ${isRealWebp}`);
      console.log(`    É página HTML de erro retornando 200?: ${isHtml}`);
      if (isHtml) {
        console.log(`    Trecho do HTML retornado:\n${buf.slice(0, 300).toString()}`);
      }

      // Check local file size vs server size
      if (fs.existsSync(localPublic)) {
        const localBuf = fs.readFileSync(localPublic);
        console.log(`    Tamanho local no repositório: ${localBuf.length} bytes`);
        console.log(`    Tamanho no servidor é idêntico?: ${localBuf.length === buf.length}`);
      }

    } catch (e) {
      console.log(`Erro ao fazer fetch: ${e.message}`);
    }
  }
}

diagnose();
