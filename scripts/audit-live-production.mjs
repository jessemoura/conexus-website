async function testProd() {
  const urls = [
    'https://www.conexus.press/blog/',
    'https://conexus.press/blog/'
  ];
  
  for (const pageUrl of urls) {
    console.log(`\n========================================`);
    console.log(`Fetching live page: ${pageUrl}`);
    console.log(`========================================`);
    try {
      const res = await fetch(pageUrl, {
        headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' },
        cache: 'no-store'
      });
      console.log(`Status: ${res.status}`);
      console.log(`Server header: ${res.headers.get('server')}`);
      console.log(`Cache-Control: ${res.headers.get('cache-control')}`);
      console.log(`ETag: ${res.headers.get('etag')}`);
      console.log(`Last-Modified: ${res.headers.get('last-modified')}`);
      
      const html = await res.text();
      console.log(`HTML size: ${html.length} bytes`);

      // Extract all img tags
      const imgRegex = /<img[^>]+src=["']([^"']+)["'][^>]*>/gi;
      let match;
      const imgs = [];
      while ((match = imgRegex.exec(html)) !== null) {
        imgs.push({ full: match[0], src: match[1] });
      }

      console.log(`Found ${imgs.length} <img> tags in HTML.`);
      const uniqueSrcs = [...new Set(imgs.map(i => i.src))];
      console.log(`Unique image sources: ${uniqueSrcs.length}`);

      console.log(`\n--- Testing image URLs on ${new URL(pageUrl).origin} ---`);
      let count200 = 0;
      let countBroken = 0;

      for (const src of uniqueSrcs) {
        const fullUrl = src.startsWith('http') ? src : `${new URL(pageUrl).origin}${src.startsWith('/') ? '' : '/'}${src}`;
        try {
          const imgRes = await fetch(fullUrl, {
            headers: { 'User-Agent': 'Mozilla/5.0' },
            cache: 'no-store'
          });
          const ct = imgRes.headers.get('content-type') || '';
          const cl = imgRes.headers.get('content-length') || '';
          
          if (imgRes.status === 200 && (ct.includes('image') || ct.includes('webp') || ct.includes('png') || ct.includes('jpeg'))) {
            count200++;
          } else {
            countBroken++;
            console.log(`BROKEN: [HTTP ${imgRes.status}] [Content-Type: ${ct}] [Length: ${cl}] -> ${fullUrl}`);
          }
        } catch (err) {
          countBroken++;
          console.log(`ERROR: ${fullUrl} -> ${err.message}`);
        }
      }

      console.log(`\nSummary for ${pageUrl}:`);
      console.log(`  ✓ Working (200 + Image Content-Type): ${count200}`);
      console.log(`  ✗ Broken: ${countBroken}`);

    } catch (e) {
      console.error(`Failed to fetch ${pageUrl}:`, e.message);
    }
  }
}

testProd();
