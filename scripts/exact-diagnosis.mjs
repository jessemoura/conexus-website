import fs from 'fs';
import path from 'path';

const targets = [
  {
    title: 'Automação de marketing: como economizar tempo e vender mais no piloto automático',
    slug: 'automacao-de-marketing-economizar-tempo-vender-mais',
    imgName: 'conexus-automacao-de-marketing.webp'
  },
  {
    title: 'Inteligência Artificial vai substituir os sites? Mitos e realidades',
    slug: 'inteligencia-artificial-vai-substituir-sites',
    imgName: 'conexus-ia-vai-substituir-sites.webp'
  },
  {
    title: 'Como a IA está transformando o marketing digital em 2026',
    slug: 'como-ia-esta-transformando-marketing-digital',
    imgName: 'conexus-como-ia-transforma-marketing-digital.webp'
  }
];

async function report() {
  const pageRes = await fetch('https://www.conexus.press/blog/?lang=pt', { cache: 'no-store' });
  const html = await pageRes.text();

  for (const t of targets) {
    console.log('================================================================');
    console.log('ARTIGO: ' + t.title);
    console.log('================================================================');

    const slugIdx = html.indexOf(t.slug);
    let srcInHtml = 'NÃO ENCONTRADO';
    if (slugIdx !== -1) {
      const artStart = html.lastIndexOf('<article', slugIdx);
      const artEnd = html.indexOf('</article>', slugIdx);
      const artBlock = html.substring(artStart, artEnd + 10);
      const m = artBlock.match(/<img[^>]+src=["']([^"']+)["']/i);
      if (m) srcInHtml = m[1];
    }

    console.log('1. src EXATO no HTML publicado:', srcInHtml);
    const fullUrl = 'https://www.conexus.press' + (srcInHtml.startsWith('/') ? '' : '/') + srcInHtml;
    console.log('2. URL pública completa:', fullUrl);

    const imgRes = await fetch(fullUrl, { cache: 'no-store' });
    console.log('3. Status HTTP:', imgRes.status);
    console.log('4. Content-Type:', imgRes.headers.get('content-type'));

    const arrayBuf = await imgRes.arrayBuffer();
    const buf = Buffer.from(arrayBuf);
    console.log('5. Tamanho em bytes da resposta recebida:', buf.length, 'bytes');

    const magicHex = buf.slice(0, 16).toString('hex');
    const magicAscii = buf.slice(0, 16).toString('binary').replace(/[^\x20-\x7E]/g, '.');
    console.log('6. Primeiros bytes (hex):', magicHex);
    console.log('   Primeiros bytes (ASCII):', magicAscii);

    const localRepoPath = path.resolve('public/assets/images', t.imgName);
    const localHostingerPath = path.resolve('HOSTINGER-FINAL/assets/images', t.imgName);
    console.log('7. Nome exato no repositório (public/assets/images):', t.imgName, '(Existe:', fs.existsSync(localRepoPath) + ')');
    console.log('8. Nome exato implantado (HOSTINGER-FINAL/assets/images):', t.imgName, '(Existe:', fs.existsSync(localHostingerPath) + ')');

    const repoFiles = fs.readdirSync(path.resolve('public/assets/images'));
    const hasExact = repoFiles.includes(t.imgName);
    console.log('9. Diferença de maiúsculas/minúsculas:', hasExact ? 'Nenhuma (Correspondência 100% exata em minúsculas)' : 'Diferença detectada');

    const isRiff = buf.slice(0, 4).toString() === 'RIFF';
    const isWebp = buf.slice(8, 12).toString() === 'WEBP';
    const isHtml = buf.slice(0, 50).toString().toLowerCase().includes('<!doctype') || buf.slice(0, 50).toString().toLowerCase().includes('<html');

    if (isRiff && isWebp) {
      console.log('10. Tipo real retornado: Imagem WebP binária autêntica (NÃO é HTML mascarado)');
    } else if (isHtml) {
      console.log('10. Tipo real retornado: PÁGINA HTML DE ERRO mascarada com HTTP 200');
    } else {
      console.log('10. Tipo real retornado: Outro formato (' + buf.slice(0, 10).toString() + ')');
    }
  }
}

report().catch(console.error);
