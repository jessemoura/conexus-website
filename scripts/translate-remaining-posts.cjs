const fs = require('fs');

const remainingTranslations = {
  blog_curitipao_2026_festival_panificacao_curitiba: {
    title: {
      en: 'CuritiPão 2026: Discover the 15 Bakeries and Featured Breads in Curitiba',
      es: 'CuritiPão 2026: Conozca las 15 Panaderías y los Panes del Festival en Curitiba'
    },
    desc: {
      en: 'Discover CuritiPão 2026, Curitiba\'s artisanal bakery festival, featuring 15 craft bakeries, exclusive recipes, addresses, and event details.',
      es: 'Conozca CuritiPão 2026, festival de panadería en Curitiba con 15 panaderías artesanales, recetas exclusivas, direcciones y detalles del evento.'
    }
  },
  blog_site_one_page_ou_multipaginas_qual_escolher: {
    title: {
      en: 'One Page vs Multi-Page Website: Which is Best for Your Business?',
      es: 'Sitio Web One Page o Multipáginas: ¿Cuál es la Mejor Opción para su Empresa?'
    },
    desc: {
      en: 'Understand web architecture, user behavior, and ROI potential to make a strategic decision for your company\'s digital platform.',
      es: 'Comprenda la arquitectura web, comportamiento del usuario y ROI para tomar una decisión estratégica para su presencia digital.'
    }
  },
  blog_10_sinais_empresa_precisa_novo_site: {
    title: {
      en: '10 Clear Signs Your Business Urgently Needs a New Website',
      es: '10 Señales Claras de que su Empresa Necesita un Nuevo Sitio Web Urgente'
    },
    desc: {
      en: 'Discover whether your current website is turning potential customers away and hurting your brand\'s digital credibility.',
      es: 'Descubra si su sitio web actual está alejando clientes potenciales y perjudicando la credibilidad de su marca.'
    }
  },
  blog_como_site_profissional_gera_mais_clientes: {
    title: {
      en: 'How a Professional Website Generates Qualified Leads Every Day',
      es: 'Cómo un Sitio Web Profesional Genera Más Clientes Todos los Días'
    },
    desc: {
      en: 'Learn how to structure your web platform to attract qualified visitors, validate your authority, and convert sales on autopilot.',
      es: 'Aprenda a estructurar su plataforma web para atraer visitas cualificadas, validar autoridad y cerrar negocios continuamente.'
    }
  },
  blog_site_responsivo_mobile_first_indispensavel: {
    title: {
      en: 'Responsive Web Design: Why Mobile-First is Essential in 2026',
      es: 'Sitio Web Responsivo: Por Qué Mobile-First es Indispensable en 2026'
    },
    desc: {
      en: 'Understand how Google indexes websites mobile-first and why smartphone ergonomics define business success in 2026.',
      es: 'Entienda cómo Google indexa sitios web por su versión móvil y por qué la ergonomía para smartphones define el éxito comercial.'
    }
  },
  blog_landing_page_ou_site_completo_diferencas: {
    title: {
      en: 'Landing Page vs Full Website: Which to Choose for Your Campaigns?',
      es: 'Landing Page o Sitio Completo: ¿Cuál Elegir para sus Campañas?'
    },
    desc: {
      en: 'Understand the distinct roles of landing pages and multi-page websites to optimize your advertising spend and maximize conversions.',
      es: 'Comprenda la función exacta de cada herramienta para no desperdiciar presupuesto publicitario y maximizar conversiones.'
    }
  },
  blog_quanto_tempo_leva_para_criar_site_profissional: {
    title: {
      en: 'How Long Does It Take to Build a Custom Professional Website?',
      es: '¿Cuánto Tiempo Lleva Desarrollar un Sitio Web Profesional a Medida?'
    },
    desc: {
      en: 'Explore each technical milestone and discover which factors accelerate or delay the delivery of your digital project.',
      es: 'Conozca cada etapa del cronograma técnico y los factores que aceleran o retrasan la entrega de su proyecto digital.'
    }
  },
  blog_como_escolher_dominio_profissional_para_empresa: {
    title: {
      en: 'How to Choose the Perfect Professional Domain Name for Your Company',
      es: 'Cómo Elegir el Dominio Profesional Perfecto para su Empresa'
    },
    desc: {
      en: 'Your domain name is your brand\'s primary digital asset. Learn how to choose a web address that inspires trust and aids SEO.',
      es: 'El nombre de dominio es el activo digital más importante de su marca. Aprenda a elegir la dirección web adecuada para inspirar confianza y potenciar su SEO.'
    }
  },
  blog_por_que_velocidade_do_site_influencia_vendas: {
    title: {
      en: 'Why Website Speed Directly Impacts Your Sales and Google Rankings',
      es: 'Por Qué la Velocidad del Sitio Web Influye Directamente en sus Ventas y Posicionamiento'
    },
    desc: {
      en: 'Understand the science of web performance: how ultra-fast pages increase commercial conversion rates and lower ad acquisition costs.',
      es: 'Entienda la ciencia del rendimiento web: cómo páginas ultrarrápidas aumentan conversiones comerciales y reducen costos publicitarios.'
    }
  },
  blog_site_multilingue_como_alcancar_clientes_internacionais: {
    title: {
      en: 'Multilingual Websites: How to Structure Your Digital Presence for Global Clients',
      es: 'Sitios Web Multilingües: Cómo Estructurar su Presencia para Clientes Internacionales'
    },
    desc: {
      en: 'Discover how to expand cross-border business with international architecture, multilingual SEO, and contextualized translations.',
      es: 'Descubra cómo expandir fronteras con arquitectura internacional, SEO multilingüe y traducción contextualizada.'
    }
  },
  blog_como_calcular_roi_site_profissional: {
    title: {
      en: 'How to Calculate the ROI of a Professional Website',
      es: 'Cómo Calcular el Retorno de Inversión (ROI) de un Sitio Web Profesional'
    },
    desc: {
      en: 'Understand the numbers behind digital presence and learn how to quantify your website\'s direct impact on top-line revenue.',
      es: 'Comprenda las métricas financieras de su presencia digital y aprenda a medir el impacto directo del sitio web en sus ingresos.'
    }
  },
  blog_seo_para_pequenas_empresas_guia_completo: {
    title: {
      en: 'SEO for Small Businesses: The Complete Guide to Organic Growth',
      es: 'SEO para Pequeñas Empresas: La Guía Completa para Crecer Orgánicamente'
    },
    desc: {
      en: 'Learn how to position your company in front of customers actively searching for your services every day on Google.',
      es: 'Descubra cómo posicionar su empresa frente a clientes que buscan sus servicios todos los días en Google.'
    }
  },
  blog_seo_local_como_conquistar_clientes_regiao: {
    title: {
      en: 'Local SEO: How to Win Customers in Your Neighborhood, City, and Region',
      es: 'SEO Local: Cómo Conquistar Clientes en su Región, Ciudad y Barrio'
    },
    desc: {
      en: 'Learn how to transform Google Maps and proximity searches into your business\'s primary customer acquisition engine.',
      es: 'Aprenda a convertir Google Maps y búsquedas de proximidad en el principal canal de captación de su negocio.'
    }
  },
  blog_como_aparecer_no_google_curitiba: {
    title: {
      en: 'How to Rank Your Business on Google in Curitiba and Metropolitan Area',
      es: 'Cómo Posicionar su Empresa en Google en Curitiba y Área Metropolitana'
    },
    desc: {
      en: 'Advanced geo-targeted SEO strategies to outrank competitors across the Curitiba capital and neighboring cities.',
      es: 'Estrategias avanzadas de SEO geolocalizado para superar a la competencia en Curitiba y municipios vecinos.'
    }
  },
  blog_google_perfil_da_empresa_guia_completo: {
    title: {
      en: 'Google Business Profile: Practical Guide to Dominating Google Maps',
      es: 'Perfil de Empresa en Google: Guía Práctica para Dominar Google Maps'
    },
    desc: {
      en: 'Discover how to turn Google\'s most powerful local tool into a daily source of inquiries, phone calls, and foot traffic.',
      es: 'Descubra cómo transformar la herramienta local más potente de Google en una fuente diaria de consultas y ventas.'
    }
  },
  blog_como_conseguir_mais_avaliacoes_no_google: {
    title: {
      en: 'How to Ethically Earn More 5-Star Reviews on Google',
      es: 'Cómo Conseguir Más Reseñas de 5 Estrellas en Google de Forma Ética'
    },
    desc: {
      en: 'Discover how to create a simple, repeatable process that turns satisfied customers into active brand advocates.',
      es: 'Descubra cómo crear un proceso sencillo para convertir a clientes satisfechos en promotores de su marca.'
    }
  },
  blog_como_responder_avaliacoes_google_reputacao: {
    title: {
      en: 'How to Respond to Google Reviews and Strengthen Your Corporate Reputation',
      es: 'Cómo Responder Reseñas en Google y Fortalecer su Reputación Corporativa'
    },
    desc: {
      en: 'The way your company responds to public reviews demonstrates corporate maturity and directly influences future buyers.',
      es: 'La forma en que su empresa responde reseñas públicas demuestra madurez e influye directamente en futuros compradores.'
    }
  },
  blog_google_search_console_guia_para_empresarios: {
    title: {
      en: 'Google Search Console: Essential Metrics Business Owners Must Track for Growth',
      es: 'Google Search Console: Qué Métricas Deben Monitorear los Empresarios'
    },
    desc: {
      en: 'Understand Google\'s official search data to see exactly how users find your website and which queries drive real business.',
      es: 'Comprenda los datos oficiales de Google sobre cómo los usuarios descubren su sitio web y qué consultas generan ventas.'
    }
  },
  blog_palavras_chave_como_descobrir_pesquisas_clientes: {
    title: {
      en: 'Keyword Research: How to Uncover Exactly What Your Customers Are Searching For',
      es: 'Investigación de Palabras Clave: Cómo Descubrir lo que Buscan sus Clientes'
    },
    desc: {
      en: 'Stop guessing: learn how to map commercial search intent to attract qualified prospects ready to hire your services.',
      es: 'Deje de adivinar: aprenda a mapear la intención de búsqueda comercial para captar prospectos listos para contratar.'
    }
  },
  blog_seo_tecnico_fatores_crescimento_google: {
    title: {
      en: 'Technical SEO: The Core Factors That Drive Google Organic Rankings',
      es: 'SEO Técnico: Los Factores que Impulsan el Crecimiento en Google'
    },
    desc: {
      en: 'Behind-the-scenes web engineering that ensures Google crawls, understands, and indexes your pages with maximum priority.',
      es: 'Ingeniería web que garantiza que Google rastree, interprete e indexe su sitio web con la máxima prioridad.'
    }
  },
  blog_seo_para_prestadores_de_servicos: {
    title: {
      en: 'SEO for Service Providers: How to Rank for High-Converting Local Searches',
      es: 'SEO para Prestadores de Servicios: Cómo Dominar Búsquedas de Alta Conversión'
    },
    desc: {
      en: 'Learn how to position your professional services to be discovered by qualified clients at the exact moment of need.',
      es: 'Aprenda a posicionar sus servicios profesionales para ser encontrado por clientes cualificados en el momento oportuno.'
    }
  },
  blog_site_ou_instagram_qual_mais_importante: {
    title: {
      en: 'Website vs Instagram: Which is More Important for Your Business?',
      es: 'Sitio Web o Instagram: ¿Cuál es Más Importante para su Empresa?'
    },
    desc: {
      en: 'Understand the fundamental difference between building on proprietary digital real estate versus rented algorithm land.',
      es: 'Comprenda la diferencia fundamental entre construir en terreno digital propio o depender de algoritmos ajenos.'
    }
  },
  blog_instagram_substitui_site_profissional: {
    title: {
      en: 'Can Instagram Replace a Professional Website? Risks of Relying on Social Platforms',
      es: '¿Puede Instagram Reemplazar un Sitio Web? Riesgos de Depender de Terceros'
    },
    desc: {
      en: 'Discover why relying solely on social media algorithms creates severe systemic vulnerabilities for your business.',
      es: 'Descubra por qué ceder todo el control comercial a una red social externa representa un riesgo crítico para su empresa.'
    }
  },
  blog_como_criar_autoridade_digital_marca: {
    title: {
      en: 'How to Build Digital Brand Authority and Become an Industry Reference',
      es: 'Cómo Construir Autoridad Digital para su Marca y Convertirse en Referente'
    },
    desc: {
      en: 'Learn how to establish market leadership that justifies premium pricing and attracts top-tier clients.',
      es: 'Aprenda a construir un posicionamiento de liderazgo que justifique tarifas premium y atraiga clientes de alto valor.'
    }
  },
  blog_como_transformar_visitantes_do_site_em_clientes: {
    title: {
      en: 'How to Turn Website Visitors into Clients: Guide to Conversion Rate Optimization (CRO)',
      es: 'Cómo Convertir Visitas Web en Clientes: Guía de Optimización de Conversión (CRO)'
    },
    desc: {
      en: 'Attracting traffic is futile if nobody contacts you. Learn how to optimize on-page elements to maximize customer acquisition.',
      es: 'De nada sirve atraer tráfico si nadie hace contacto. Aprenda a optimizar su página para maximizar oportunidades comerciales.'
    }
  },
  blog_whatsapp_no_site_aumentar_contatos_conversoes: {
    title: {
      en: 'WhatsApp on Your Website: How to Boost Inquiries and Sales Conversions',
      es: 'WhatsApp en el Sitio Web: Cómo Incrementar Contactos y Conversiones'
    },
    desc: {
      en: 'Discover how to integrate WhatsApp to capture qualified leads smoothly without slowing down site performance.',
      es: 'Descubra cómo integrar WhatsApp para captar clientes cualificados de forma inmediata sin afectar la velocidad web.'
    }
  },
  blog_marketing_de_conteudo_atrair_sem_anuncios: {
    title: {
      en: 'Content Marketing: How to Attract Clients Without Relying Solely on Ads',
      es: 'Marketing de Contenido: Cómo Atraer Clientes sin Depender Solo de Anuncios'
    },
    desc: {
      en: 'Build an evergreen organic asset that delivers qualified buyers every month while driving down acquisition costs.',
      es: 'Construya un activo orgánico permanente que genere clientes cualificados cada mes con menor costo de adquisición.'
    }
  },
  blog_blog_empresarial_vale_a_pena_2026: {
    title: {
      en: 'Is a Corporate Blog Still Worth It in 2026? The Real Impact on SEO and Sales',
      es: '¿Vale la Pena un Blog Corporativo en 2026? El Impacto Real en SEO y Ventas'
    },
    desc: {
      en: 'Understand why market leaders invest heavily in strategic editorial content and how blogs fuel the entire digital sales funnel.',
      es: 'Entienda por qué las empresas líderes invierten en contenido editorial estratégico y cómo los blogs nutren el embudo digital.'
    }
  },
  blog_como_criar_estrategia_digital_negocios_locais: {
    title: {
      en: 'How to Create an Integrated Digital Strategy for Local Businesses',
      es: 'Cómo Crear una Estrategia Digital Integrada para Negocios Locales'
    },
    desc: {
      en: 'Connect websites, Google Maps, regional search ads, and WhatsApp to dominate your local metropolitan market.',
      es: 'Conecte sitio web, Google Maps, anuncios geolocalizados y WhatsApp para liderar el mercado en su ciudad.'
    }
  },
  blog_presenca_digital_o_que_empresa_precisa_2026: {
    title: {
      en: 'Digital Presence: What Every Business Must Have in 2026',
      es: 'Presencia Digital: Qué Necesita Toda Empresa en 2026'
    },
    desc: {
      en: 'Discover whether your company possesses the complete digital infrastructure required to project stability and win deals in 2026.',
      es: 'Compruebe si su empresa cuenta con la infraestructura digital completa para transmitir solidez y cerrar contratos hoy.'
    }
  },
  blog_funil_de_vendas_digital_pequenas_empresas: {
    title: {
      en: 'Digital Sales Funnel for Small Businesses: From Click to Contract',
      es: 'Embudo de Ventas Digital para Pequeñas Empresas: Del Clic al Cierre'
    },
    desc: {
      en: 'Structure a predictable, automated commercial pipeline to attract, qualify, and close deals online.',
      es: 'Estructure un proceso comercial predecible y automatizado para atraer, calificar y cerrar contratos por internet.'
    }
  },
  blog_inteligencia_artificial_para_pequenas_empresas: {
    title: {
      en: 'Artificial Intelligence for Small Businesses: Where to Begin?',
      es: 'Inteligencia Artificial para Pequeñas Empresas: ¿Por Dónde Empezar?'
    },
    desc: {
      en: 'Learn how accessible generative AI and automation tools level the playing field between small firms and large corporations.',
      es: 'Descubra cómo herramientas accesibles de IA generativa y automatización nivelan la competencia con grandes corporaciones.'
    }
  },
  blog_como_usar_chatgpt_dia_a_dia_da_empresa: {
    title: {
      en: 'How to Use ChatGPT in Daily Business Operations: Practical Productivity Guide',
      es: 'Cómo Utilizar ChatGPT en el Día a Día de una Empresa: Guía de Productividad'
    },
    desc: {
      en: 'Transform ChatGPT into an executive assistant that accelerates commercial writing, customer support, and administrative routines.',
      es: 'Convierta ChatGPT en un asistente ejecutivo para acelerar redacción comercial, atención y rutinas operativas.'
    }
  },
  blog_15_maneiras_usar_ia_nos_negocios: {
    title: {
      en: '15 Actionable Ways to Use Artificial Intelligence in Business to Boost Profits',
      es: '15 Formas Prácticas de Usar Inteligencia Artificial para Aumentar Ganancias'
    },
    desc: {
      en: 'A practical roadmap of applicable AI workflows to modernize sales, customer support, marketing, and financial workflows.',
      es: 'Catálogo de ideas aplicables para modernizar ventas, atención, marketing y finanzas con Inteligencia Artificial.'
    }
  },
  blog_ia_no_atendimento_ao_cliente_vantagens_cuidados: {
    title: {
      en: 'AI in Customer Service: Crucial Advantages and Essential Guardrails',
      es: 'IA en Atención al Cliente: Ventajas y Cuidados Esenciales'
    },
    desc: {
      en: 'Deliver 24/7 instant responses without sacrificing the genuine human empathy and personalization that close sales.',
      es: 'Aprenda a ofrecer respuestas inmediatas 24/7 sin perder la empatía y personalización que concretan ventas.'
    }
  },
  blog_automacao_de_marketing_economizar_tempo_vender_mais: {
    title: {
      en: 'Marketing Automation: How to Save Time and Increase Sales',
      es: 'Automatización de Marketing: Cómo Ahorrar Tiempo y Vender Más'
    },
    desc: {
      en: 'Put repetitive commercial tasks on autopilot and ensure no qualified sales inquiry slips through the cracks.',
      es: 'Ponga tareas repetitivas en piloto automático y garantice que ningún prospecto sea desatendido por su equipo comercial.'
    }
  },
  blog_inteligencia_artificial_vai_substituir_sites: {
    title: {
      en: 'Will AI Replace Websites? Myths and Realities in 2026',
      es: '¿La Inteligencia Artificial Reemplazará los Sitios Web? Mitos y Realidades'
    },
    desc: {
      en: 'Understand why official websites remain the indispensable source of truth and authority for both human buyers and AI engines.',
      es: 'Entienda por qué los sitios web oficiales seguirán siendo el pilar de verdad y autoridad para usuarios y motores de IA.'
    }
  },
  blog_como_ia_esta_transformando_marketing_digital: {
    title: {
      en: 'How AI is Transforming Digital Marketing: The New Rules of the Game',
      es: 'Cómo la IA está Transformando el Marketing Digital: Nuevas Reglas'
    },
    desc: {
      en: 'Discover how pairing human strategy with AI computational power creates unmatched competitive advantages.',
      es: 'Descubra cómo combinar creatividad humana y poder analítico de IA redefine el crecimiento empresarial.'
    }
  },
  blog_ia_e_seo_mudancas_mecanismos_de_busca: {
    title: {
      en: 'AI and SEO: How Search Engines Are Evolving in 2026',
      es: 'IA y SEO: Cómo Están Evolucionando los Motores de Búsqueda en 2026'
    },
    desc: {
      en: 'Learn how to optimize your content and website to be cited and recommended by AI-powered search overviews and conversational engines.',
      es: 'Aprenda a optimizar su sitio para ser citado y recomendado por las nuevas herramientas de búsqueda impulsadas por IA.'
    }
  },
  blog_como_preparar_empresa_para_era_da_ia: {
    title: {
      en: 'How to Prepare Your Company for the Artificial Intelligence Era',
      es: 'Cómo Preparar su Empresa para la Era de la Inteligencia Artificial'
    },
    desc: {
      en: 'A pragmatic roadmap for business leaders to modernize digital processes, upskill teams, and gain lasting market edge.',
      es: 'Ruta práctica para que líderes modernicen procesos, capaciten equipos y adquieran ventajas competitivas.'
    }
  },
  blog_agentes_de_ia_o_que_sao_como_ajudam_empresas: {
    title: {
      en: 'AI Agents: What They Are and How They Elevate Business Operations',
      es: 'Agentes de IA: Qué Son y Cómo Pueden Ayudar a su Empresa'
    },
    desc: {
      en: 'Explore the new frontier of software automation: intelligent autonomous agents that plan, reason, and execute end-to-end tasks.',
      es: 'Explore la nueva frontera de la automatización: sistemas inteligentes que planifican y ejecutan rutinas operativas complejas.'
    }
  },
  blog_transformacao_digital_pequenas_empresas_guia: {
    title: {
      en: 'Digital Transformation for Small Businesses: Practical Execution Guide',
      es: 'Transformación Digital para Pequeñas Empresas: Guía Práctica'
    },
    desc: {
      en: 'Modernize internal workflows, customer care, and revenue operations without enterprise budgets or convoluted consulting.',
      es: 'Modernice gestión, atención y ventas sin necesidad de presupuestos millonarios ni consultorías complejas.'
    }
  },
  blog_como_profissionalizar_pequena_empresa_com_tecnologia: {
    title: {
      en: 'How to Professionalize a Small Business Using Modern Web Technology',
      es: 'Cómo Profesionalizar una Pequeña Empresa Usando Tecnología Moderna'
    },
    desc: {
      en: 'Elevate brand perception, eliminate amateur impressions, and win larger, higher-margin corporate contracts.',
      es: 'Aprenda a elevar la percepción de valor de su negocio, proyectar solidez y conquistar contratos corporativos mayores.'
    }
  },
  blog_email_profissional_abandonar_enderecos_genericos: {
    title: {
      en: 'Professional Business Email: Why Your Company Must Ditch Generic Free Accounts',
      es: 'Correo Profesional: Por Qué su Empresa Debe Abandonar Cuentas Gratuitas'
    },
    desc: {
      en: 'Discover why sending commercial proposals from generic free webmail undermines trust and scares away serious clients.',
      es: 'Descubra por qué enviar presupuestos desde correos genéricos gratuitos destruye la credibilidad y aleja clientes.'
    }
  },
  blog_como_construir_confianca_marca_ambiente_digital: {
    title: {
      en: 'How to Build Unshakeable Brand Trust in the Digital Space',
      es: 'Cómo Construir Confianza de Marca en el Entorno Digital'
    },
    desc: {
      en: 'Understand the essential authority and security trust signals customers seek before making payments or signing contracts.',
      es: 'Conozca las señales de seguridad y autoridad que los clientes buscan antes de pagar o firmar contratos con su empresa.'
    }
  },
  blog_reputacao_online_como_proteger_imagem_empresa: {
    title: {
      en: 'Online Reputation Management: How to Protect Your Corporate Brand',
      es: 'Reputación Online: Cómo Proteger la Imagen de su Empresa'
    },
    desc: {
      en: 'It takes years to build a reputable brand and minutes to damage it online. Learn how to safeguard your company\'s standing.',
      es: 'Lleva años construir una buena reputación y minutos dañarla en internet. Aprenda a blindar la imagen de su negocio.'
    }
  },
  blog_como_escolher_agencia_de_marketing_digital: {
    title: {
      en: 'How to Choose a Digital Marketing Agency and Avoid Empty Vanity Promises',
      es: 'Cómo Elegir una Agencia de Marketing Digital y Evitar Promesas Vacías'
    },
    desc: {
      en: 'Learn how to separate true strategic partners that drive bottom-line revenue from vendors selling meaningless vanity metrics.',
      es: 'Aprenda a diferenciar socios estratégicos que generan facturación real de proveedores que venden métricas vanidosas.'
    }
  },
  blog_agencia_ou_freelancer_qual_melhor_para_projeto: {
    title: {
      en: 'Agency or Freelancer: Which is the Best Choice for Your Digital Project?',
      es: '¿Agencia o Freelancer? Cuál es la Mejor Elección para su Proyecto Digital'
    },
    desc: {
      en: 'Compare costs, delivery warranties, post-launch support, and technical depth across each model to make the right call.',
      es: 'Compare costos, garantías, soporte técnico y capacidad operativa de cada modelo para tomar la decisión correcta.'
    }
  },
  blog_como_tecnologia_reduz_custos_pequena_empresa: {
    title: {
      en: 'How Technology and Digital Systems Cut Costs for Small Businesses',
      es: 'Cómo la Tecnología Puede Reducir Costos en una Pequeña Empresa'
    },
    desc: {
      en: 'Transform fixed overhead into agile digital systems, freeing capital and boosting your net operating profitability.',
      es: 'Aprenda a transformar costos fijos en procesos digitales ágiles, liberando capital y aumentando el margen neto.'
    }
  },
  blog_digitalizacao_de_processos_como_comecar: {
    title: {
      en: 'Business Process Digitization: How to Start Without Complications',
      es: 'Digitalización de Procesos: Cómo Comenzar sin Complicaciones'
    },
    desc: {
      en: 'Organize and automate operational workflows, banishing scattered spreadsheets and redundant administrative overhead.',
      es: 'Descubra cómo organizar y automatizar flujos operativos, eliminando planillas desorganizadas y retrabajo.'
    }
  },
  blog_tendencias_digitais_pequenas_empresas_acompanhar: {
    title: {
      en: 'Digital Trends Small Businesses Must Watch Closely in 2026',
      es: 'Tendencias Digitales que las Pequeñas Empresas Deben Seguir en 2026'
    },
    desc: {
      en: 'Discover which technological innovations genuinely move the needle for company growth and which are short-lived fads.',
      es: 'Descubra qué innovaciones tecnológicas realmente impulsan el crecimiento y cuáles son solo modas pasajeras.'
    }
  },
  blog_como_conseguir_mais_clientes_pela_internet: {
    title: {
      en: 'How to Win More Clients Online: The Definitive Business Guide',
      es: 'Cómo Conseguir Más Clientes por Internet: La Guía Definitiva'
    },
    desc: {
      en: 'Build a cohesive digital ecosystem that reliably attracts qualified commercial opportunities every day.',
      es: 'Descubra cómo construir un ecosistema digital que atraiga oportunidades comerciales cualificadas todos los días.'
    }
  },
  blog_como_transformar_google_canal_aquisicao_clientes: {
    title: {
      en: 'How to Turn Google into Your Primary Client Acquisition Engine',
      es: 'Cómo Convertir Google en un Canal de Adquisición de Clientes'
    },
    desc: {
      en: 'Learn how to position your business across Google\'s search pillars to capture buyers at the exact moment of decision.',
      es: 'Aprenda a posicionar su empresa en los pilares de búsqueda de Google para captar compradores en el momento de decidir.'
    }
  },
  blog_como_medir_se_site_traz_resultados: {
    title: {
      en: 'How to Measure If Your Website is Truly Delivering Business Results',
      es: 'Cómo Medir si su Sitio Web Realmente Está Generando Resultados'
    },
    desc: {
      en: 'Track the direct correlation between your web traffic, qualified inquiries, client acquisition, and closed revenue.',
      es: 'Descubra cómo rastrear el impacto directo de su página web en la generación de contactos, ventas y nuevos contratos.'
    }
  },
  blog_google_analytics_metricas_que_realmente_importam: {
    title: {
      en: 'Google Analytics (GA4): The Only Metrics That Truly Matter for Business Growth',
      es: 'Google Analytics (GA4): Métricas que Realmente Importan para su Empresa'
    },
    desc: {
      en: 'Cut through reporting complexity and focus on the actionable KPIs that directly impact sales, leads, and ROI.',
      es: 'Elimine informes innecesarios y concéntrese en los números que impactan directamente en la facturación y el retorno de inversión.'
    }
  },
  blog_formulario_ou_whatsapp_qual_gera_mais_contatos: {
    title: {
      en: 'Web Form vs WhatsApp: Which Drives Higher-Converting Inquiries?',
      es: 'Formulario o WhatsApp: ¿Cuál Genera Más Contactos Comerciales?'
    },
    desc: {
      en: 'Examine buyer behavior and learn how to balance speed of response with lead qualification on your website.',
      es: 'Analice el comportamiento del consumidor y aprenda a equilibrar inmediatez y cualificación de prospectos en su sitio web.'
    }
  },
  blog_seguranca_de_sites_como_proteger_empresa_clientes: {
    title: {
      en: 'Website Security: How to Protect Your Company and Client Data',
      es: 'Seguridad en Sitios Web: Cómo Proteger su Empresa y a sus Clientes'
    },
    desc: {
      en: 'Learn how to protect your domain against vulnerabilities, downtime, and browser security warnings that destroy consumer trust.',
      es: 'Descubra cómo proteger su dominio contra intrusiones, caídas del servidor y advertencias de navegadores.'
    }
  },
  blog_lgpd_para_sites_pequenas_empresas: {
    title: {
      en: 'Data Privacy & Compliance for Small Business Websites',
      es: 'Protección de Datos y Privacidad para Sitios Web de Pequeñas Empresas'
    },
    desc: {
      en: 'Bring your corporate website into full legal compliance with data privacy regulations smoothly and without unnecessary friction.',
      es: 'Aprenda a poner su sitio web en total conformidad con la legislación de privacidad de datos de manera ágil y segura.'
    }
  },
  blog_aplicativos_para_empresas_quando_vale_a_pena: {
    title: {
      en: 'Custom Mobile Apps: When is Developing an App Worth the Investment?',
      es: 'Aplicaciones Móviles: ¿Cuándo Vale la Pena Desarrollar una App?'
    },
    desc: {
      en: 'Assess technical costs, business ROI, and user retention to decide whether a native app or modern web platform best serves your goals.',
      es: 'Evalúe costos, beneficios operativos y retorno para decidir entre una aplicación móvil nativa o un sitio web moderno.'
    }
  },
  blog_software_personalizado_quando_empresa_precisa: {
    title: {
      en: 'Custom Software Development: When Does a Business Truly Need It?',
      es: 'Software Personalizado: ¿Cuándo Realmente lo Necesita una Empresa?'
    },
    desc: {
      en: 'Learn to pinpoint the exact moment off-the-shelf software packages bottleneck your growth and custom tools become essential.',
      es: 'Aprenda a identificar el momento exacto en que los programas genéricos enlatados limitan la expansión de su negocio.'
    }
  },
  blog_futuro_negocios_digitais_sites_apps_automacao_ia: {
    title: {
      en: 'The Future of Digital Business: Websites, Mobile Apps, Automation, and AI',
      es: 'El Futuro de los Negocios Digitales: Sitios Web, Apps, Automatización e IA'
    },
    desc: {
      en: 'Discover how modern technological pillars interconnect to attract, engage, and retain clients at scale seamlessly.',
      es: 'Descubra cómo los pilares tecnológicos modernos se integran para atraer, atender y fidelizar clientes a escala.'
    }
  },
  blog_como_colocar_empresa_no_google_sao_jose_dos_pinhais: {
    title: {
      en: 'How to Put Your Business on Google and Attract Local Clients in São José dos Pinhais',
      es: 'Cómo Posicionar su Empresa en Google y Captar Clientes en São José dos Pinhais'
    },
    desc: {
      en: 'Learn proven local SEO strategies to dominate Google Maps, proximity searches, and customer discovery in São José dos Pinhais.',
      es: 'Aprenda estrategias comprobadas de SEO local para liderar Google Maps y búsquedas de proximidad en São José dos Pinhais.'
    }
  },
  blog_como_usar_site_para_atrair_clientes_google: {
    title: {
      en: 'How to Turn Your Website into an Engine for Winning Google Clients',
      es: 'Cómo Convertir su Sitio Web en una Herramienta para Atraer Clientes en Google'
    },
    desc: {
      en: 'Having an address online is useless if nobody finds it. Discover our methodology to turn your website into an active client acquisition asset.',
      es: 'Tener una dirección web no basta si nadie la encuentra. Conozca el método para convertir su sitio en un canal comercial predecible.'
    }
  },
  blog_conexus_guest_hub_guia_digital_para_hospedagens: {
    title: {
      en: 'CONEXUS Guest Hub: A Reimagined Digital Experience for Hospitality Guests',
      es: 'CONEXUS Guest Hub: Una Nueva Experiencia Digital para Huéspedes'
    },
    desc: {
      en: 'A personalized digital guide for vacation rentals and boutique accommodations consolidating arrival info, local dining, and house rules via QR Code.',
      es: 'Guía digital personalizada para alojamientos turísticos que reúne en un solo entorno toda la información que el huésped necesita.'
    }
  },
  blog_importancia_hospedagem_de_qualidade: {
    title: {
      en: 'The Vital Importance of Premium Web Hosting for Your Corporate Website',
      es: 'La Importancia de un Alojamiento Web de Calidad para su Sitio Corporativo'
    },
    desc: {
      en: 'Learn how hosting infrastructure directly influences page loading speed, corporate cybersecurity, and organic Google rankings.',
      es: 'Descubra cómo la infraestructura de servidores impacta en la velocidad de carga, seguridad de datos y posicionamiento en Google.'
    }
  },
  blog_marketing_digital_para_empresas: {
    title: {
      en: 'Digital Marketing for Businesses: Building an Online Presence That Generates Real Opportunities',
      es: 'Marketing Digital para Empresas: Construyendo una Presencia que Genera Oportunidades'
    },
    desc: {
      en: 'A complete framework combining high-performance websites, SEO, branding, and strategic social channels to build lasting commercial authority.',
      es: 'Guía completa uniendo sitios web profesionales, SEO, branding y redes sociales para consolidar la autoridad de su marca.'
    }
  },
  blog_por_que_sua_empresa_precisa_de_um_site: {
    title: {
      en: 'Why Your Business Needs a Website and Cannot Rely Solely on Social Media',
      es: 'Por Qué su Empresa Necesita un Sitio Web Propio y No Debe Depender Solo de Redes Sociales'
    },
    desc: {
      en: 'Social media is valuable for community engagement, but building entirely on rented algorithms is perilous. Learn why a proprietary website is the true anchor of your authority.',
      es: 'Las redes sociales generan conexión, pero construir su negocio únicamente en ellas es como construir en terreno alquilado. Conozca por qué un sitio propio es esencial.'
    }
  },
  blog_quanto_custa_site_profissional_2026: {
    title: {
      en: 'How Much Does a Professional Website Cost in 2026?',
      es: '¿Cuánto Cuesta un Sitio Web Profesional en 2026?'
    },
    desc: {
      en: 'Understand what factors determine the price of a high-performance custom website, the difference between cheap templates and bespoke platforms, and how to choose the right fit.',
      es: 'Comprenda qué factores determinan el valor de un sitio web corporativo de alto rendimiento y cómo elegir la solución ideal para su empresa.'
    }
  },
  blog_redes_sociais_para_empresas: {
    title: {
      en: 'Social Media for Businesses: Strengthening Your Brand and Driving Qualified Sales',
      es: 'Redes Sociales para Empresas: Fortaleciendo su Marca y Atrayendo Clientes Reales'
    },
    desc: {
      en: 'Actionable positioning and content strategies for organizations seeking to turn social engagement into qualified business opportunities.',
      es: 'Estrategias prácticas de posicionamiento y contenido para empresas que desean convertir interacción social en oportunidades reales de negocio.'
    }
  }
};

async function apply() {
  const enMod = await import('../src/i18n/en.js');
  const esMod = await import('../src/i18n/es.js');

  const en = enMod.en;
  const es = esMod.es;

  let count = 0;
  for (const [key, data] of Object.entries(remainingTranslations)) {
    if (!en.autoContent[key]) en.autoContent[key] = {};
    if (!es.autoContent[key]) es.autoContent[key] = {};

    en.autoContent[key].k3 = data.title.en;
    es.autoContent[key].k3 = data.title.es;

    en.autoContent[key].k4 = data.desc.en;
    es.autoContent[key].k4 = data.desc.es;

    count++;
  }

  fs.writeFileSync('src/i18n/en.js', 'export const en = ' + JSON.stringify(en, null, 2) + ';\n', 'utf8');
  fs.writeFileSync('src/i18n/es.js', 'export const es = ' + JSON.stringify(es, null, 2) + ';\n', 'utf8');

  console.log(`Successfully applied ${count} translations to en.js and es.js!`);
}

apply().catch(console.error);
