const fs = require('fs');
const path = require('path');
const { exactTitleMap, translateTitle, translateDesc } = require('./translate-helpers.cjs');

// Read files as strings and parse/import
async function run() {
  const ptMod = await import('../src/i18n/pt.js');
  const enMod = await import('../src/i18n/en.js');
  const esMod = await import('../src/i18n/es.js');

  const pt = ptMod.pt;
  const en = enMod.en;
  const es = esMod.es;

  console.log('Original sizes - PT autoContent keys:', Object.keys(pt.autoContent || {}).length);

  // 1. Common read times & buttons
  const readTimes = [
    { k: 'readTime5', pt: '5 min de leitura', en: '5 min read', es: '5 min de lectura' },
    { k: 'readTime6', pt: '6 min de leitura', en: '6 min read', es: '6 min de lectura' },
    { k: 'readTime7', pt: '7 min de leitura', en: '7 min read', es: '7 min de lectura' },
    { k: 'readTime8', pt: '8 min de leitura', en: '8 min read', es: '8 min de lectura' },
    { k: 'readTime9', pt: '9 min de leitura', en: '9 min read', es: '9 min de lectura' },
    { k: 'readTime10', pt: '10 min de leitura', en: '10 min read', es: '10 min de lectura' },
    { k: 'readTime12', pt: '12 min de leitura', en: '12 min read', es: '12 min de lectura' },
    { k: 'readTime15', pt: '15 min de leitura', en: '15 min read', es: '15 min de lectura' },
    { k: 'visitWebsite', pt: 'Visitar Website ↗', en: 'Visit Website ↗', es: 'Visitar Sitio Web ↗' }
  ];

  readTimes.forEach(rt => {
    pt.common[rt.k] = rt.pt;
    en.common[rt.k] = rt.en;
    es.common[rt.k] = rt.es;
  });

  // 2. Portfolio Home & Listing cards
  const portfolioCardKeys = {
    c9Tag: {
      pt: 'APLICATIVO MOBILE • GOOGLE PLAY',
      en: 'MOBILE APP • GOOGLE PLAY',
      es: 'APLICACIÓN MÓVIL • GOOGLE PLAY'
    },
    c9Desc: {
      pt: 'Aplicativo de controle financeiro pessoal desenvolvido pela CONEXUS e publicado na Google Play Store, com interface moderna, metas, relatórios analíticos e foco total na privacidade do usuário.',
      en: 'Personal finance management application developed by CONEXUS and published on Google Play Store, featuring a modern UI, budget goals, analytical reports, and total privacy.',
      es: 'Aplicación de control financiero personal desarrollada por CONEXUS y publicada en Google Play Store, con interfaz moderna, metas, reportes analíticos y total privacidad.'
    },
    soquindinsTag: {
      pt: 'GASTRONOMIA & CONFEITARIA • CURITIBA/PR',
      en: 'GASTRONOMY & CONFECTIONERY • CURITIBA/PR',
      es: 'GASTRONOMÍA Y REPOSTERÍA • CURITIBA/PR'
    },
    soquindinsDesc: {
      pt: 'Website desenvolvido para fortalecer a presença digital da tradicional confeitaria curitibana, valorizando sua história, seus produtos artesanais e sua conexão com Curitiba.',
      en: 'Website developed to strengthen the digital presence of this traditional Curitiba confectionery, celebrating its history, handcrafted products, and local heritage.',
      es: 'Sitio web desarrollado para fortalecer la presencia digital de la tradicional repostería de Curitiba, valorando su historia, productos artesanales y su conexión local.'
    },
    curitipaoTag: {
      pt: 'GASTRONOMIA & EVENTOS • CURITIBA/PR',
      en: 'GASTRONOMY & EVENTS • CURITIBA/PR',
      es: 'GASTRONOMÍA Y EVENTOS • CURITIBA/PR'
    },
    curitipaoDesc: {
      pt: 'Presença digital desenvolvida para o CuritiPão, Festival de Panificação de Curitiba, conectando padarias, gastronomia e público em uma experiência digital responsiva.',
      en: 'Digital platform developed for CuritiPão, Curitiba\'s Bakery Festival, connecting bakeries, gastronomy, and the public in a responsive digital experience.',
      es: 'Presencia digital desarrollada para CuritiPão, Festival de Panadería de Curitiba, conectando panaderías, gastronomía y público en una experiencia digital responsiva.'
    },
    fastguinchoTag: {
      pt: 'SERVIÇOS AUTOMOTIVOS • CURITIBA E REGIÃO METROPOLITANA',
      en: 'AUTOMOTIVE SERVICES • CURITIBA & METROPOLITAN AREA',
      es: 'SERVICIOS AUTOMOTRICES • CURITIBA Y ÁREA METROPOLITANA'
    },
    fastguinchoDesc: {
      pt: 'Website desenvolvido para uma operação de guincho 24 horas em Curitiba e Região Metropolitana, com foco em atendimento rápido, contato imediato e presença digital local.',
      en: 'High-performance website developed for a 24-hour towing operation in Curitiba and surrounding area, focused on rapid dispatch, instant contact, and local SEO.',
      es: 'Sitio web de alto rendimiento desarrollado para auxilio mecánico 24 horas en Curitiba y área metropolitana, enfocado en atención rápida, contacto inmediato y SEO local.'
    },
    atthosTag: {
      pt: 'COMÉRCIO EXTERIOR • SÃO JOSÉ DOS PINHAIS/PR',
      en: 'FOREIGN TRADE • SÃO JOSÉ DOS PINHAIS/PR',
      es: 'COMERCIO EXTERIOR • SÃO JOSÉ DOS PINHAIS/PR'
    },
    atthosDesc: {
      pt: 'Projeto digital desenvolvido para fortalecer a presença da Atthos Comex no mercado de comércio exterior, apresentando suas soluções, atuação internacional e experiência de forma profissional e multilíngue.',
      en: 'Corporate digital project developed to reinforce Atthos Comex\'s authority in international trade, presenting its solutions, global operations, and experience across a multilingual platform.',
      es: 'Proyecto digital corporativo desarrollado para fortalecer la presencia de Atthos Comex en el comercio exterior, presentando sus soluciones, alcance global y experiencia de forma profesional y multilingüe.'
    }
  };

  for (const [k, v] of Object.entries(portfolioCardKeys)) {
    pt.portfolio[k] = v.pt;
    en.portfolio[k] = v.en;
    es.portfolio[k] = v.es;
  }

  // 3. 10 prominent case study keys in en.js and es.js
  const casesMap = {
    AtthosComex: {
      title: {
        en: 'Success Case: Atthos Comex — Corporate Website and Global Presence',
        es: 'Caso de Éxito: Atthos Comex — Sitio Web Institucional y Presencia Global'
      },
      desc: {
        en: 'Discover the corporate digital project developed by CONEXUS for Atthos Comex in São José dos Pinhais, featuring multilingual architecture and international trade solutions.',
        es: 'Conozca el proyecto digital corporativo desarrollado por CONEXUS para Atthos Comex en São José dos Pinhais, con arquitectura multilingüe y soluciones de comercio exterior.'
      },
      cat: {
        pt: 'Comércio Exterior',
        en: 'Foreign Trade',
        es: 'Comercio Exterior'
      }
    },
    DiPiallato: {
      title: {
        en: 'Success Case: Di Piallato — Digital Presence and Foot Traffic for Artisanal Gelateria',
        es: 'Caso de Éxito: Di Piallato — Presencia Digital y Tráfico para Heladería Artesanal'
      },
      desc: {
        en: 'How CONEXUS structured Di Piallato\'s digital presence in Matinhos/PR: modern responsive website, Google reputation, and local SEO driving visitors from the coast.',
        es: 'Cómo CONEXUS estructuró la presencia digital de Di Piallato en Matinhos/PR: sitio web moderno, reputación en Google y SEO local atrayendo visitantes de la costa.'
      },
      cat: {
        pt: 'SEO Local & Gastronomia',
        en: 'Local SEO & Gastronomy',
        es: 'SEO Local y Gastronomía'
      }
    },
    SosAberturas: {
      title: {
        en: 'Success Case: SOS Aberturas — Emergency Conversion Architecture in Portugal',
        es: 'Caso de Éxito: SOS Aberturas — Arquitectura de Conversión de Emergencia en Portugal'
      },
      desc: {
        en: 'Digital conversion platform engineered by CONEXUS for 24h locksmith and emergency door opening services across Lisbon and surrounding regions in Portugal.',
        es: 'Plataforma de conversión digital desarrollada por CONEXUS para cerrajería 24h y aperturas de emergencia en Lisboa y regiones metropolitanas de Portugal.'
      },
      cat: {
        pt: 'Arquitetura Web',
        en: 'Web Architecture',
        es: 'Arquitectura Web'
      }
    },
    WelcomeBook: {
      prefix: 'blog_solucaoWelcomeBook',
      title: {
        en: 'Solution: Digital Welcome Book — Enhancing Guest Experience for Property Hosts',
        es: 'Solución: Welcome Book Digital — Elevando la Experiencia del Huésped para Anfitriones'
      },
      desc: {
        en: 'Discover the Digital Welcome Book, a proprietary CONEXUS technology designed to elevate vacation rental and short-term stay guest experience with digital guides.',
        es: 'Conozca el Welcome Book Digital, solución tecnológica propietaria de CONEXUS para enriquecer la experiencia de huéspedes y anfitriones de alquiler temporario.'
      },
      cat: {
        pt: 'Solução CONEXUS',
        en: 'CONEXUS Solution',
        es: 'Solución CONEXUS'
      }
    },
    FastGuincho: {
      title: {
        en: 'Success Case: Fast Guincho — Emergency Conversion and Local SEO in Curitiba',
        es: 'Caso de Éxito: Fast Guincho — Conversión de Emergencia y SEO Local en Curitiba'
      },
      desc: {
        en: 'How CONEXUS engineered Fast Guincho\'s platform: 24/7 emergency dispatch, one-tap WhatsApp contact, and prominent Google Maps rankings in Curitiba.',
        es: 'Cómo CONEXUS diseñó la plataforma de Fast Guincho: auxilio mecánico 24 horas, contacto directo por WhatsApp y posicionamiento destacado en Curitiba.'
      },
      cat: {
        pt: 'Alta Conversão',
        en: 'High Conversion',
        es: 'Alta Conversión'
      }
    },
    NikkiStudio: {
      title: {
        en: 'Success Case: Nikki Studio — Visual Identity and Aesthetic Web Platform in the UK',
        es: 'Caso de Éxito: Nikki Studio — Identidad Visual y Plataforma Web de Estética en el Reino Unido'
      },
      desc: {
        en: 'Nikki Studio in Swindon (UK): bespoke visual identity, sophisticated rosé palette, procedure catalogue, and integrated booking experience.',
        es: 'Nikki Studio en Swindon (Reino Unido): identidad visual sofisticada, catálogo de tratamientos estéticos y experiencia de reservas integrada.'
      },
      cat: {
        pt: 'Design Internacional',
        en: 'International Design',
        es: 'Diseño Internacional'
      }
    },
    LumoraCleaning: {
      title: {
        en: 'Success Case: Lumora Cleaning Services — Quote Platform and UK Local Presence',
        es: 'Caso de Éxito: Lumora Cleaning Services — Plataforma de Cotizaciones y Presencia en Reino Unido'
      },
      desc: {
        en: 'Digital presence developed for Lumora Cleaning Services in Bristol (UK): responsive high-converting One Page website, transparent pricing, and local SEO.',
        es: 'Presencia digital desarrollada para Lumora Cleaning Services en Bristol (UK): sitio web One Page responsivo de alta conversión, cotizaciones claras y SEO local.'
      },
      cat: {
        pt: 'Serviços & B2B',
        en: 'Services & B2B',
        es: 'Servicios y B2B'
      }
    },
    Soquindins: {
      title: {
        en: 'Success Case: Sóquindins — Digital Presence for Traditional Confectionery in Curitiba',
        es: 'Caso de Éxito: Sóquindins — Presencia Digital para Pastelería Tradicional en Curitiba'
      },
      desc: {
        en: 'See how CONEXUS translated over 50 years of traditional confectionery excellence in Curitiba into an elegant digital presence, online menu, and local SEO.',
        es: 'Descubra cómo CONEXUS tradujo más de cinco décadas de tradición pastelera en Curitiba en una presencia digital moderna, menú digital y visibilidad local.'
      },
      cat: {
        pt: 'Tradição & Web',
        en: 'Tradition & Web',
        es: 'Tradición y Web'
      }
    },
    MichellyCorrea: {
      title: {
        en: 'Success Case: Michelly Correa — Authority Website for Journalism and Media Relations',
        es: 'Caso de Éxito: Michelly Correa — Sitio Web de Autoridad para Periodismo y Comunicación'
      },
      desc: {
        en: 'Discover CONEXUS\'s strategy for journalist and PR consultant Michelly Correa: institutional authority, editorial career portfolio, and corporate advisory.',
        es: 'Conozca la estrategia de CONEXUS para la periodista y comunicadora Michelly Correa: sitio de autoridad institucional, portafolio editorial y asesoría de prensa.'
      },
      cat: {
        pt: 'Branding & Autoridade',
        en: 'Branding & Authority',
        es: 'Branding y Autoridad'
      }
    },
    LittlePet: {
      title: {
        en: 'Success Case: Little Pet — Digital Presence and Bookings for Pet Shop and Pet Care',
        es: 'Caso de Éxito: Little Pet — Presencia Digital y Reservas para Pet Shop y Estética Animal'
      },
      desc: {
        en: 'How CONEXUS structured Little Pet\'s digital presence in São José dos Pinhais: mobile-friendly website, WhatsApp booking, and Google business optimization.',
        es: 'Cómo CONEXUS estructuró la presencia digital de Little Pet en São José dos Pinhais: sitio web ágil, reservas por WhatsApp y perfil optimizado en Google.'
      },
      cat: {
        pt: 'Presença Local',
        en: 'Local Presence',
        es: 'Presencia Local'
      }
    }
  };

  for (const [caseName, data] of Object.entries(casesMap)) {
    const pfx = data.prefix || `blog_case${caseName}`;
    en[`${pfx}_title`] = data.title.en;
    es[`${pfx}_title`] = data.title.es;
    en[`${pfx}_desc`] = data.desc.en;
    es[`${pfx}_desc`] = data.desc.es;
    pt[`${pfx}_category`] = data.cat.pt;
    en[`${pfx}_category`] = data.cat.en;
    es[`${pfx}_category`] = data.cat.es;
  }

  // 4. Update k3 and k4 for all 100 autoContent posts in en.js and es.js
  let translatedPosts = 0;
  for (const [key, ptPost] of Object.entries(pt.autoContent)) {
    if (key.startsWith('blog_') && ptPost && ptPost.k3) {
      const ptTitle = ptPost.k3;
      const ptDesc = ptPost.k4;
      
      const tTitle = translateTitle(ptTitle);
      const tDesc = translateDesc(ptDesc, ptTitle);

      if (!en.autoContent[key]) en.autoContent[key] = { ...ptPost };
      if (!es.autoContent[key]) es.autoContent[key] = { ...ptPost };

      en.autoContent[key].k3 = tTitle.en;
      es.autoContent[key].k3 = tTitle.es;

      en.autoContent[key].k4 = tDesc.en;
      es.autoContent[key].k4 = tDesc.es;

      // Also ensure k1 (category badge) and k2 (read time) are translated
      if (ptPost.k2 && ptPost.k2.includes('min')) {
        const numMatch = ptPost.k2.match(/\d+/);
        const mins = numMatch ? numMatch[0] : '8';
        en.autoContent[key].k2 = `${mins} min read`;
        es.autoContent[key].k2 = `${mins} min de lectura`;
      }

      translatedPosts++;
    }
  }
  console.log(`Updated translations for ${translatedPosts} autoContent posts in EN and ES.`);

  // 5. Add dictionaries for the 4 portfolio cases:
  // atthos-comex, curitipao, fast-guincho, soquindins
  const { atthosPt, atthosEn, atthosEs } = require('./portfolio-atthos-data.cjs');
  const { curitipaoPt, curitipaoEn, curitipaoEs } = require('./portfolio-curitipao-data.cjs');
  const { fastGuinchoPt, fastGuinchoEn, fastGuinchoEs } = require('./portfolio-fastguincho-data.cjs');
  const { soquindinsPt, soquindinsEn, soquindinsEs } = require('./portfolio-soquindins-data.cjs');

  pt.autoContent.portfolio_atthos_comex = atthosPt;
  en.autoContent.portfolio_atthos_comex = atthosEn;
  es.autoContent.portfolio_atthos_comex = atthosEs;

  pt.autoContent.portfolio_curitipao = curitipaoPt;
  en.autoContent.portfolio_curitipao = curitipaoEn;
  es.autoContent.portfolio_curitipao = curitipaoEs;

  pt.autoContent.portfolio_fast_guincho = fastGuinchoPt;
  en.autoContent.portfolio_fast_guincho = fastGuinchoEn;
  es.autoContent.portfolio_fast_guincho = fastGuinchoEs;

  pt.autoContent.portfolio_soquindins = soquindinsPt;
  en.autoContent.portfolio_soquindins = soquindinsEn;
  es.autoContent.portfolio_soquindins = soquindinsEs;

  // Write files back cleanly
  fs.writeFileSync('src/i18n/pt.js', 'export const pt = ' + JSON.stringify(pt, null, 2) + ';\n', 'utf8');
  fs.writeFileSync('src/i18n/en.js', 'export const en = ' + JSON.stringify(en, null, 2) + ';\n', 'utf8');
  fs.writeFileSync('src/i18n/es.js', 'export const es = ' + JSON.stringify(es, null, 2) + ';\n', 'utf8');

  console.log('Successfully updated src/i18n/pt.js, src/i18n/en.js, src/i18n/es.js!');
}

run().catch(console.error);
