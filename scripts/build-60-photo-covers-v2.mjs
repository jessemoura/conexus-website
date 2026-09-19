import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

// 60 curated, distinct, 100% human camera photography IDs (Unsplash)
// All tested and returning 200 image/jpeg
const photoIds = [
  // Cluster 1: Criação de Sites / Web Design
  'photo-1497215728101-856f4ea42174', // 1. [APPROVED] Site one page vs multipáginas (Escritório moderno amplo, luz natural, mesas de madeira)
  'photo-1460925895917-afdab827c52f', // 2. 10 sinais novo site (Laptop com análise de performance em mesa de escritório)
  'photo-1551836022-d5d88e9218df', // 3. Site profissional gera clientes (Consultor em reunião de negócios com cliente)
  'photo-1555421689-491a97ff2040', // 4. Site responsivo mobile first (Dispositivos móveis e laptop em mesa de trabalho)
  'photo-1507238691740-187a5b1d37b8', // 5. Landing page vs site completo (Designer trabalhando em tela de alta resolução)
  'photo-1531403009284-440f080d1e12', // 6. Quanto tempo leva para criar site (Planejamento de projeto, wireframes e café)
  'photo-1486406146926-c627a92ad1ab', // 7. Como escolher domínio profissional (Fachada de edifício corporativo / centro financeiro)
  'photo-1551288049-bebda4e38f71', // 8. Velocidade do site influencia vendas (Métricas de performance em monitor moderno)
  'photo-1451187580459-43490279c0fa', // 9. Site multilíngue mercados internacionais (Conectividade global em tela digital)
  'photo-1554224155-6726b3ff858f', // 10. Como calcular ROI de site (Análise financeira e cálculo de retorno sobre investimento)

  // Cluster 2: SEO & Google
  'photo-1542744094-3a31f272c490', // 11. SEO para pequenas empresas (Equipe analisando gráficos de tráfego de busca)
  'photo-1556742502-ec7c0e9f34b1', // 12. [APPROVED] SEO local conquistar clientes (Empresário no balcão de loja com terminal)
  'photo-1444723121867-7a241cacace9', // 13. Como aparecer no Google Curitiba (Vista aérea urbana da cidade comercial)
  'photo-1556742044-3c52d6e88c62', // 14. Google Perfil da Empresa guia (Lojista atendendo cliente presencialmente no balcão)
  'photo-1534536281715-e28d76689b4d', // 15. Mais avaliações no Google (Pessoa segurando celular com feedback de clientes)
  'photo-1573497019940-1c28c88b4f3e', // 16. Como responder avaliações Google (Profissional no laptop respondendo clientes)
  'photo-1504868584819-f8e8b4b6d7e3', // 17. Google Search Console guia (Gráficos de cliques e impressões de busca no monitor)
  'photo-1455390582262-044cdead277a', // 18. Palavras-chave pesquisa de clientes (Anotações estratégicas e teclado de computador)
  'photo-1498050108023-c5249f4df085', // 19. SEO técnico fatores de crescimento (Programador analisando código no notebook)
  'photo-1521791136064-7986c2920216', // 20. SEO para prestadores de serviços (Aperto de mão corporativo e parceria)

  // Cluster 3: Marketing Digital & Redes Sociais
  'photo-1611162617474-5b21e879e113', // 21. Site ou Instagram qual mais importante (Celular com redes sociais ao lado de notebook)
  'photo-1611162616305-c69b3fa7fbe0', // 22. Instagram substitui site profissional (Mesa de marketing digital e produção de conteúdo)
  'photo-1557804506-669a67965ba0', // 23. Como criar autoridade digital (Apresentação executiva em sala de reuniões moderna)
  'photo-1553877522-43269d4ea984', // 24. Transformar visitantes em clientes (Consultoria de conversão CRO e jornada do lead)
  'photo-1556155092-490a1ba16284', // 25. [APPROVED] Botão de WhatsApp no site (Executivo segurando smartphone corporativo)
  'photo-1499750310107-5fef28a66643', // 26. Marketing de conteúdo atrair clientes (Redator em mesa de café com notebook)
  'photo-1486312338219-ce68d2c6f44d', // 27. Blog empresarial vale a pena (Profissional escrevendo artigo em laptop)
  'photo-1552664730-d307ca884978', // 28. Estratégia digital negócios locais (Reunião de equipe sobre crescimento comercial)
  'photo-1519389950473-47ba0277781c', // 29. Presença digital pilares obrigatórios (Ambiente moderno com múltiplos dispositivos integrados)
  'photo-1542744173-8e7e53415bb0', // 30. Funil de vendas digital (Apresentação de funil e pipeline comercial na tela)

  // Cluster 4: Inteligência Artificial & Automação
  'photo-1531482615713-2afd69097998', // 31. IA para pequenas empresas (Equipe em sala de tecnologia analisando IA)
  'photo-1581091226825-a6a2a5aee158', // 32. Como usar ChatGPT dia a dia empresa (Profissional trabalhando com IA no notebook)
  'photo-1573164713988-8665fc963095', // 33. 15 maneiras práticas usar IA (Profissional em espaço moderno de inovação)
  'photo-1549923746-c502d488b3ea', // 34. IA no atendimento ao cliente (Atendente profissional com headset e laptop)
  'photo-1522071820081-009f0129c71c', // 35. [APPROVED] Automação de marketing piloto automático (Equipe corporativa colaborando)
  'photo-1504639725590-34d0984388bd', // 36. IA vai substituir sites mitos (Engenheiro de software desenvolvendo em computadores)
  'photo-1552581234-26160f608093', // 37. Como IA transforma marketing digital (Equipe discutindo estratégias inovadoras)
  'photo-1516321318423-f06f85e504b3', // 38. IA e SEO mudanças no Google (Análise de algoritmos de busca e dados)
  'photo-1517245386807-bb43f82c33c4', // 39. Como preparar empresa era IA (Workshop executivo em sala corporativa)
  'photo-1485827404703-89b55fcc595e', // 40. Agentes autônomos de IA empresas (Engenharia de automação e robótica)

  // Cluster 5: Negócios & Transformação Digital
  'photo-1522202176988-66273c2fd55f', // 41. Transformação digital pequenas empresas (Grupo de trabalho colaborando com tablet e laptop)
  'photo-1497366216548-37526070297c', // 42. Profissionalizar empresa tecnologia (Escritório executivo clean e iluminado)
  'photo-1573496359142-b8d87734a5a2', // 43. [APPROVED] E-mail profissional abandonar gratuitos (Executiva focada no laptop)
  'photo-1507679799987-c73779587ccf', // 44. Construir confiança na marca (Executivo em ambiente corporativo sofisticado)
  'photo-1512941937669-90a1b58e7e9c', // 45. Gestão de reputação online (Smartphone com app de reputação e feedback)
  'photo-1521737604893-d14cc237f11d', // 46. Como escolher agência marketing (Reunião estratégica entre fundadores e agência)
  'photo-1515378791036-0648a3ef77b2', // 47. Agência ou freelancer comparativo (Profissional independente focado em workstation)
  'photo-1450133064473-71024230f91b', // 48. Tecnologia reduz custos operacionais (Documentos digitais e eficiência de processos)
  'photo-1454165804606-c3d57bc86b40', // 49. Digitalização de processos corporativos (Mapeamento de processos e planejamento)
  'photo-1531297484001-80022131f5a1', // 50. Tendências digitais pequenas empresas (Tecnologia moderna em mesa de trabalho)

  // Cluster 6: Crescimento, Vendas & Tecnologia
  'photo-1556761175-5973dc0f32e7', // 51. Como conseguir mais clientes internet (Reunião comercial de metas e aquisição)
  'photo-1516321497487-e288fb19713f', // 52. Transformar Google canal aquisição (Análise de funil orgânico no notebook)
  'photo-1551836022-deb4988cc6c0', // 53. Como medir resultados do site (Apresentação de métricas e ROI no tablet)
  'photo-1543286386-713bdd548da4', // 54. Google Analytics GA4 métricas (Visualização de relatórios de tráfego no computador)
  'photo-1522542550221-31fd19575a2d', // 55. Formulário ou WhatsApp conversão (Interface de formulário e experiência do usuário)
  'photo-1558494949-ef010cbdcc31', // 56. [APPROVED] Segurança de websites e proteção (Racks de servidores físicos em datacenter)
  'photo-1550751827-4bd374c3f58b', // 57. LGPD para sites pequenas empresas (Privacidade de dados e conformidade jurídica)
  'photo-1551650975-87deedd944c3', // 58. Aplicativos para empresas quando vale (Protótipo de app corporativo em smartphone)
  'photo-1517694712202-14dd9538aa97', // 59. Software personalizado sob medida (Desenvolvedor programando sistema personalizado)
  'photo-1526374965328-7f61d4dc18c5'  // 60. O futuro dos negócios digitais (Inovação, dados e tecnologia avançada)
];

const targetDirs = [
  path.resolve('assets/images'),
  path.resolve('public/assets/images'),
  path.resolve('dist/assets/images'),
  path.resolve('HOSTINGER-FINAL/assets/images')
];

targetDirs.forEach(d => {
  if (!fs.existsSync(d)) fs.mkdirSync(d, { recursive: true });
});

async function main() {
  console.log('=== 1. LOADING ALL 60 ARTICLES ===');
  const [c1, c2, c3, c4, c5, c6] = await Promise.all([
    import(`./data-cluster-1.mjs?v=${Date.now()}`),
    import(`./data-cluster-2.mjs?v=${Date.now()}`),
    import(`./data-cluster-3.mjs?v=${Date.now()}`),
    import(`./data-cluster-4.mjs?v=${Date.now()}`),
    import(`./data-cluster-5.mjs?v=${Date.now()}`),
    import(`./data-cluster-6.mjs?v=${Date.now()}`)
  ]);

  const all60Articles = [
    ...c1.cluster1Articles,
    ...c2.cluster2Articles,
    ...c3.cluster3Articles,
    ...c4.cluster4Articles,
    ...c5.cluster5Articles,
    ...c6.cluster6Articles
  ];

  console.log(`Total articles to process: ${all60Articles.length}`);
  console.log(`Total photo IDs: ${photoIds.length}, Unique: ${new Set(photoIds).size}`);

  console.log('\n=== 2. DOWNLOADING & CONVERTING 60 PHOTOGRAPHIC COVERS TO 860x440px WebP ===');
  for (let i = 0; i < all60Articles.length; i++) {
    const art = all60Articles[i];
    const photoId = photoIds[i];
    const filename = path.basename(art.image);
    const url = `https://images.unsplash.com/${photoId}?auto=format&fit=crop&w=1400&q=85`;

    console.log(`[${i + 1}/60] Downloading ${photoId} -> ${filename}...`);
    const res = await fetch(url);
    if (!res.ok) throw new Error(`Failed to fetch ${url} (HTTP ${res.status})`);
    const rawBuffer = Buffer.from(await res.arrayBuffer());

    const webpBuffer = await sharp(rawBuffer)
      .resize(860, 440, {
        fit: 'cover',
        position: 'center'
      })
      .webp({
        quality: 90,
        effort: 6
      })
      .toBuffer();

    for (const d of targetDirs) {
      fs.writeFileSync(path.join(d, filename), webpBuffer);
    }
    console.log(`  ✓ Saved ${filename} (${webpBuffer.length} bytes, 860x440 px).`);
  }

  console.log('\n=== 3. GENERATING PREVIEW GALLERY WITH 60 COVERS ===');
  const { execSync } = await import('child_process');
  execSync('node scripts/update-blog-index.mjs', { stdio: 'inherit' });
  execSync('node scripts/generate-blog-pages-full.mjs', { stdio: 'inherit' });
  execSync('node scripts/generate-preview-gallery.mjs', { stdio: 'inherit' });

  console.log('\n============================================================');
  console.log('ALL 60 NEW PHOTOGRAPHIC COVERS (-v2.webp) SUCCESSFULLY READY');
  console.log('============================================================');
}

main().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
