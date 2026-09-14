import fs from 'fs';

let html = fs.readFileSync('index.html', 'utf8');

// 1. Add data-i18n-page to body
html = html.replace('<body>', '<body data-i18n-page="home">');

// 2. Nav CTA buttons
html = html.replace(
  '<a href="#" class="btn btn-primary" data-whatsapp-key="homeHero" data-track="whatsapp_click" data-cta-position="header">',
  '<a href="#" class="btn btn-primary" data-whatsapp-key="homeHero" data-track="whatsapp_click" data-cta-position="header" data-i18n="nav.ctaHeader">'
);
html = html.replace(
  '<a href="#" class="btn btn-primary" style="width: 100%;" data-whatsapp-key="homeHero" data-track="whatsapp_click" data-cta-position="mobile_menu">',
  '<a href="#" class="btn btn-primary" style="width: 100%;" data-whatsapp-key="homeHero" data-track="whatsapp_click" data-cta-position="mobile_menu" data-i18n="nav.ctaMobile">'
);

// 3. Hero section
html = html.replace(
  '<span class="hero-badge">ESTRATÉGIA & PRESENÇA DIGITAL INTEGRADA</span>',
  '<span class="hero-badge" data-i18n="hero.badge">ESTRATÉGIA & PRESENÇA DIGITAL INTEGRADA</span>'
);
html = html.replace(
  '<h1 class="hero-title">Marketing digital para transformar presença online em oportunidades</h1>',
  '<h1 class="hero-title" data-i18n="hero.title">Marketing digital para transformar presença online em oportunidades</h1>'
);
html = html.replace(
  '<p class="hero-description">\n            Websites profissionais, SEO, presença no Google, branding e redes sociais para empresas que querem fortalecer sua presença digital e gerar oportunidades.\n          </p>',
  '<p class="hero-description" data-i18n="hero.description">\n            Websites profissionais, SEO, presença no Google, branding e redes sociais para empresas que querem fortalecer sua presença digital e gerar oportunidades.\n          </p>'
);
html = html.replace(
  'Quero fortalecer minha presença digital\n              <svg class="btn-icon"',
  '<span data-i18n="hero.ctaPrimary">Quero fortalecer minha presença digital</span>\n              <svg class="btn-icon"'
);
html = html.replace(
  '<a href="#servicos" class="btn btn-secondary">\n              Conhecer Soluções\n            </a>',
  '<a href="#servicos" class="btn btn-secondary" data-i18n="hero.ctaSecondary">\n              Conhecer Soluções\n            </a>'
);

// 4. Services section
html = html.replace(
  '<span class="tag">SOLUÇÕES ESTRATÉGICAS</span>',
  '<span class="tag" data-i18n="services.tag">SOLUÇÕES ESTRATÉGICAS</span>'
);
html = html.replace(
  '<h2>Serviços que Conectam sua Empresa a Novas Oportunidades</h2>',
  '<h2 data-i18n="services.title">Serviços que Conectam sua Empresa a Novas Oportunidades</h2>'
);
html = html.replace(
  '<p class="section-subtitle">\n            Conheça os pilares da CONEXUS para impulsionar a visibilidade, autoridade e conversão da sua empresa.\n          </p>',
  '<p class="section-subtitle" data-i18n="services.subtitle">\n            Conheça os pilares da CONEXUS para impulsionar a visibilidade, autoridade e conversão da sua empresa.\n          </p>'
);

// Services Items
html = html.replace(
  '<h3>Criação de Sites Profissionais</h3>\n              <span class="card-tag">DESENVOLVIMENTO WEB</span>',
  '<h3 data-i18n="services.s1Title">Criação de Sites Profissionais</h3>\n              <span class="card-tag" data-i18n="services.s1Tag">DESENVOLVIMENTO WEB</span>'
);
html = html.replace(
  '<p class="editorial-service-desc">\n              Websites institucionais e plataformas de alta performance, ultra-rápidos, 100% responsivos e otimizados desde a fundação técnica para os mecanismos de busca.\n            </p>',
  '<p class="editorial-service-desc" data-i18n="services.s1Desc">\n              Websites institucionais e plataformas de alta performance, ultra-rápidos, 100% responsivos e otimizados desde a fundação técnica para os mecanismos de busca.\n            </p>'
);

html = html.replace(
  '<h3>Site One Page</h3>\n              <span class="card-tag">CONVERSÃO DIRETA</span>',
  '<h3 data-i18n="services.s2Title">Site One Page</h3>\n              <span class="card-tag" data-i18n="services.s2Tag">CONVERSÃO DIRETA</span>'
);
html = html.replace(
  '<p class="editorial-service-desc">\n              Página única objetiva focada em comunicação direta e alta conversão para lançamentos, campanhas de anúncios e empresas em estágio inicial.\n            </p>',
  '<p class="editorial-service-desc" data-i18n="services.s2Desc">\n              Página única objetiva focada em comunicação direta e alta conversão para lançamentos, campanhas de anúncios e empresas em estágio inicial.\n            </p>'
);

html = html.replace(
  '<h3>SEO para Empresas</h3>\n              <span class="card-tag">VISIBILIDADE NO GOOGLE</span>',
  '<h3 data-i18n="services.s3Title">SEO para Empresas</h3>\n              <span class="card-tag" data-i18n="services.s3Tag">VISIBILIDADE NO GOOGLE</span>'
);
html = html.replace(
  '<p class="editorial-service-desc">\n              Estratégias avançadas de otimização orgânica e pesquisa de palavras-chave para posicionar sua empresa nas primeiras páginas do Google sem depender só de anúncios.\n            </p>',
  '<p class="editorial-service-desc" data-i18n="services.s3Desc">\n              Estratégias avançadas de otimização orgânica e pesquisa de palavras-chave para posicionar sua empresa nas primeiras páginas do Google sem depender só de anúncios.\n            </p>'
);

html = html.replace(
  '<h3>SEO Local & Google Meu Negócio</h3>\n              <span class="card-tag">PRESENÇA REGIONAL</span>',
  '<h3 data-i18n="services.s4Title">SEO Local & Google Meu Negócio</h3>\n              <span class="card-tag" data-i18n="services.s4Tag">PRESENÇA REGIONAL</span>'
);
html = html.replace(
  '<p class="editorial-service-desc">\n              Fortalecimento do Perfil da Empresa e presença no Google Maps para que clientes da sua cidade encontrem sua marca no momento exato da pesquisa.\n            </p>',
  '<p class="editorial-service-desc" data-i18n="services.s4Desc">\n              Fortalecimento do Perfil da Empresa e presença no Google Maps para que clientes da sua cidade encontrem sua marca no momento exato da pesquisa.\n            </p>'
);

html = html.replace(
  '<h3>Branding & Identidade Visual</h3>\n              <span class="card-tag">AUTORIDADE DE MARCA</span>',
  '<h3 data-i18n="services.s5Title">Branding & Identidade Visual</h3>\n              <span class="card-tag" data-i18n="services.s5Tag">AUTORIDADE DE MARCA</span>'
);
html = html.replace(
  '<p class="editorial-service-desc">\n              Desenvolvimento de marcas memoráveis, logotipos profissionais e manuais de identidade corporativa alinhados à sua autoridade de mercado.\n            </p>',
  '<p class="editorial-service-desc" data-i18n="services.s5Desc">\n              Desenvolvimento de marcas memoráveis, logotipos profissionais e manuais de identidade corporativa alinhados à sua autoridade de mercado.\n            </p>'
);

html = html.replace(
  '<h3>Gestão de Redes Sociais</h3>\n              <span class="card-tag">ENGAJAMENTO & CONTEÚDO</span>',
  '<h3 data-i18n="services.s6Title">Gestão de Redes Sociais</h3>\n              <span class="card-tag" data-i18n="services.s6Tag">ENGAJAMENTO & CONTEÚDO</span>'
);
html = html.replace(
  '<p class="editorial-service-desc">\n              Planejamento estratégico de conteúdo visual profissional para envolver seu público, fortalecer o posicionamento e alimentar o funil de vendas.\n            </p>',
  '<p class="editorial-service-desc" data-i18n="services.s6Desc">\n              Planejamento estratégico de conteúdo visual profissional para envolver seu público, fortalecer o posicionamento e alimentar o funil de vendas.\n            </p>'
);

// 5. Portfolio section
html = html.replace(
  '<span class="tag">CASOS & PORTFÓLIO</span>',
  '<span class="tag" data-i18n="portfolio.tag">CASOS & PORTFÓLIO</span>'
);
html = html.replace(
  '<h2>Projetos Desenvolvidos com Estratégia e Foco em Resultados</h2>',
  '<h2 data-i18n="portfolio.title">Projetos Desenvolvidos com Estratégia e Foco em Resultados</h2>'
);
html = html.replace(
  '<p class="section-subtitle">\n            Conheça alguns dos projetos entregues para empresas no Brasil e no exterior.\n          </p>',
  '<p class="section-subtitle" data-i18n="portfolio.subtitle">\n            Conheça alguns dos projetos entregues para empresas no Brasil e no exterior.\n          </p>'
);

// Portfolio Cards
html = html.replace(
  '<span class="stacked-card-tag">JORNALISMO & COMUNICAÇÃO • BRASIL</span>',
  '<span class="stacked-card-tag" data-i18n="portfolio.c1Tag">JORNALISMO & COMUNICAÇÃO • BRASIL</span>'
);
html = html.replace(
  '<p class="stacked-card-desc">\n                  Portal institucional de comunicação e estratégia de autoridade de marca para o mercado nacional de jornalismo.\n                </p>',
  '<p class="stacked-card-desc" data-i18n="portfolio.c1Desc">\n                  Portal institucional de comunicação e estratégia de autoridade de marca para o mercado nacional de jornalismo.\n                </p>'
);

html = html.replace(
  '<span class="stacked-card-tag">SERVIÇOS ESPECIALIZADOS • PORTUGAL</span>',
  '<span class="stacked-card-tag" data-i18n="portfolio.c2Tag">SERVIÇOS ESPECIALIZADOS • PORTUGAL</span>'
);
html = html.replace(
  '<p class="stacked-card-desc">\n                  Plataforma web responsiva otimizada para atendimento técnico e conversão rápida de contatos diretos no mercado português.\n                </p>',
  '<p class="stacked-card-desc" data-i18n="portfolio.c2Desc">\n                  Plataforma web responsiva otimizada para atendimento técnico e conversão rápida de contatos diretos no mercado português.\n                </p>'
);

html = html.replace(
  '<span class="stacked-card-tag">MARKETING DIGITAL • REINO UNIDO</span>',
  '<span class="stacked-card-tag" data-i18n="portfolio.c3Tag">MARKETING DIGITAL • REINO UNIDO</span>'
);
html = html.replace(
  '<p class="stacked-card-desc">\n                  Projeto digital completo desenvolvido para a operação da CONEXXUS no Reino Unido, reunindo website multipáginas, estrutura de SEO, conteúdo, serviços e presença digital em uma experiência integrada.\n                </p>',
  '<p class="stacked-card-desc" data-i18n="portfolio.c3Desc">\n                  Projeto digital completo desenvolvido para a operação da CONEXXUS no Reino Unido, reunindo website multipáginas, estrutura de SEO, conteúdo, serviços e presença digital em uma experiência integrada.\n                </p>'
);

html = html.replace(
  '<span class="stacked-card-tag">BELEZA & ESTÉTICA • REINO UNIDO</span>',
  '<span class="stacked-card-tag" data-i18n="portfolio.c4Tag">BELEZA & ESTÉTICA • REINO UNIDO</span>'
);
html = html.replace(
  '<p class="stacked-card-desc">\n                  Identidade visual e plataforma web integrada para estúdio especializado em estética e beleza em Swindon, Reino Unido.\n                </p>',
  '<p class="stacked-card-desc" data-i18n="portfolio.c4Desc">\n                  Identidade visual e plataforma web integrada para estúdio especializado em estética e beleza em Swindon, Reino Unido.\n                </p>'
);

html = html.replace(
  '<span class="stacked-card-tag">HOME IMPROVEMENTS • REINO UNIDO</span>',
  '<span class="stacked-card-tag" data-i18n="portfolio.c5Tag">HOME IMPROVEMENTS • REINO UNIDO</span>'
);
html = html.replace(
  '<p class="stacked-card-desc">\n                  Desenvolvimento de website institucional e posicionamento digital para empresa especializada em manutenção, reformas e melhorias residenciais no Reino Unido.\n                </p>',
  '<p class="stacked-card-desc" data-i18n="portfolio.c5Desc">\n                  Desenvolvimento de website institucional e posicionamento digital para empresa especializada em manutenção, reformas e melhorias residenciais no Reino Unido.\n                </p>'
);

html = html.replace(
  '<span class="stacked-card-tag">CLEANING SERVICES • REINO UNIDO</span>',
  '<span class="stacked-card-tag" data-i18n="portfolio.c6Tag">CLEANING SERVICES • REINO UNIDO</span>'
);
html = html.replace(
  '<p class="stacked-card-desc">\n                  Desenvolvimento de website One Page responsivo e estratégia de SEO local no Google para serviços de limpeza residencial e comercial.\n                </p>',
  '<p class="stacked-card-desc" data-i18n="portfolio.c6Desc">\n                  Desenvolvimento de website One Page responsivo e estratégia de SEO local no Google para serviços de limpeza residencial e comercial.\n                </p>'
);

html = html.replace(
  '<span class="stacked-card-tag">BARBER SHOP • REINO UNIDO</span>',
  '<span class="stacked-card-tag" data-i18n="portfolio.c7Tag">BARBER SHOP • REINO UNIDO</span>'
);
html = html.replace(
  '<p class="stacked-card-desc">\n                  Presença digital de alto padrão e identidade corporativa para barbearia tradicional em Oxford, Reino Unido.\n                </p>',
  '<p class="stacked-card-desc" data-i18n="portfolio.c7Desc">\n                  Presença digital de alto padrão e identidade corporativa para barbearia tradicional em Oxford, Reino Unido.\n                </p>'
);

// Portfolio buttons
html = html.replace(
  /Visualizar Projeto\s*<svg class="btn-icon"/g,
  '<span data-i18n="portfolio.viewProject">Visualizar Projeto</span>\n                    <svg class="btn-icon"'
);

// 6. About section
html = html.replace(
  '<span class="tag">SOBRE A CONEXUS</span>',
  '<span class="tag" data-i18n="about.tag">SOBRE A CONEXUS</span>'
);
html = html.replace(
  '<h2>Estratégia e Inteligência Digital Orientadas ao Seu Negócio</h2>',
  '<h2 data-i18n="about.title">Estratégia e Inteligência Digital Orientadas ao Seu Negócio</h2>'
);
html = html.replace(
  '<p class="lead">\n            Conectamos tecnologia web, otimização no Google, identidade visual e redes sociais em uma estratégia coerente e orientada a resultados.\n          </p>',
  '<p class="lead" data-i18n="about.lead">\n            Conectamos tecnologia web, otimização no Google, identidade visual e redes sociais em uma estratégia coerente e orientada a resultados.\n          </p>'
);
html = html.replace(
  'Conhecer a CONEXUS\n              <svg class="btn-icon"',
  '<span data-i18n="about.btn">Conhecer a CONEXUS</span>\n              <svg class="btn-icon"'
);

// 7. Process section
html = html.replace(
  '<span class="tag">NOSSO MÉTODO</span>',
  '<span class="tag" data-i18n="process.tag">NOSSO MÉTODO</span>'
);
html = html.replace(
  '<h2>Como Transformamos Sua Presença Digital em 5 Etapas</h2>',
  '<h2 data-i18n="process.title">Como Transformamos Sua Presença Digital em 5 Etapas</h2>'
);
html = html.replace(
  '<p class="section-subtitle">\n            Conheça o processo estruturado da CONEXUS para construir soluções de alto impacto.\n          </p>',
  '<p class="section-subtitle" data-i18n="process.subtitle">\n            Conheça o processo estruturado da CONEXUS para construir soluções de alto impacto.\n          </p>'
);

// 8. Reviews section
html = html.replace(
  '<span class="tag">DEPOIMENTOS & AVALIAÇÕES</span>',
  '<span class="tag" data-i18n="reviews.tag">DEPOIMENTOS & AVALIAÇÕES</span>'
);
html = html.replace(
  '<h2>O que nossos clientes dizem</h2>',
  '<h2 data-i18n="reviews.title">O que nossos clientes dizem</h2>'
);
html = html.replace(
  '<p class="section-subtitle">\n            Avaliações reais de clientes que confiaram na CONEXUS para fortalecer sua presença digital e impulsionar seus negócios.\n          </p>',
  '<p class="section-subtitle" data-i18n="reviews.subtitle">\n            Avaliações reais de clientes que confiaram na CONEXUS para fortalecer sua presença digital e impulsionar seus negócios.\n          </p>'
);

// Review badge google
html = html.replace(
  /Avaliação no Google\s*<\/span>/g,
  '<span data-i18n="reviews.googleBadge">Avaliação no Google</span></span>'
);

// Review texts
html = html.replace(
  '<p class="review-text">\n                    Eu contratei para meu site e ele além de entregar antes do prazo, conseguiu otimizar tanto o SEO que no segundo dia que o site estava no ar já tinha contatos comerciais vindos por lá. Super recomendo o trabalho da Conexus! Agilizado e preço justo.\n                  </p>',
  '<p class="review-text" data-i18n="reviews.r1Text">\n                    Eu contratei para meu site e ele além de entregar antes do prazo, conseguiu otimizar tanto o SEO que no segundo dia que o site estava no ar já tinha contatos comerciais vindos por lá. Super recomendo o trabalho da Conexus! Agilizado e preço justo.\n                  </p>'
);
html = html.replace(
  '<p class="review-text">\n                    ótimo serviço, bem-feito e com muita qualidade! Site bonito, rápido e o gerenciamento no Google melhorou muito minha visibilidade. Profissionais sinceros, atenciosos e que entregam resultado de verdade. Super recomendo!\n                  </p>',
  '<p class="review-text" data-i18n="reviews.r2Text">\n                    ótimo serviço, bem-feito e com muita qualidade! Site bonito, rápido e o gerenciamento no Google melhorou muito minha visibilidade. Profissionais sinceros, atenciosos e que entregam resultado de verdade. Super recomendo!\n                  </p>'
);

// Nikki truncated & full
html = html.replace(
  '<p class="review-text review-text-truncated">\n                    Sou muito grata pelo site que ele criou para o meu negócio de manicure. Ter um site com design profissional realmente elevou meu negócio a outro patamar, de uma forma que eu não esperava. O site tem um visual limpo, moderno e sofisticado...\n                  </p>',
  '<p class="review-text review-text-truncated" data-i18n="reviews.r3Trunc">\n                    Sou muito grata pelo site que ele criou para o meu negócio de manicure. Ter um site com design profissional realmente elevou meu negócio a outro patamar, de uma forma que eu não esperava. O site tem um visual limpo, moderno e sofisticado...\n                  </p>'
);
html = html.replace(
  '<p>Sou muito grata pelo site que ele criou para o meu negócio de manicure. Ter um site com design profissional realmente elevou meu negócio a outro patamar, de uma forma que eu não esperava. O site tem um visual limpo, moderno e sofisticado.</p>',
  '<p data-i18n="reviews.r3P1">Sou muito grata pelo site que ele criou para o meu negócio de manicure. Ter um site com design profissional realmente elevou meu negócio a outro patamar, de uma forma que eu não esperava. O site tem um visual limpo, moderno e sofisticado.</p>'
);
html = html.replace(
  '<p>Eu não esperava que minha clientela crescesse tanto e tão rápido depois de colocar o site no Google. O número de agendamentos aumentou drasticamente logo após o lançamento, proporcionando ao meu negócio uma visibilidade que eu nunca tinha tido antes. O crescimento foi tão expressivo que já investi em produtos e materiais melhores para atender à demanda crescente.</p>',
  '<p data-i18n="reviews.r3P2">Eu não esperava que minha clientela crescesse tanto e tão rápido depois de colocar o site no Google. O número de agendamentos aumentou drasticamente logo após o lançamento, proporcionando ao meu negócio uma visibilidade que eu nunca tinha tido antes. O crescimento foi tão expressivo que já investi em produtos e materiais melhores para atender à demanda crescente.</p>'
);
html = html.replace(
  '<p>Embora ele esteja apenas começando, a qualidade do seu trabalho e o impacto que ele gerou no meu negócio são realmente impressionantes. Se você quer ampliar sua clientela e busca um site com visual premium que realmente atraia clientes, recomendo fortemente os serviços dele.</p>',
  '<p data-i18n="reviews.r3P3">Embora ele esteja apenas começando, a qualidade do seu trabalho e o impacto que ele gerou no meu negócio são realmente impressionantes. Se você quer ampliar sua clientela e busca um site com visual premium que realmente atraia clientes, recomendo fortemente os serviços dele.</p>'
);

// Curitidoce
html = html.replace(
  '<p class="review-text review-text-truncated">\n                    Contratamos a Conexus para o desenvolvimento do site de uma cliente e tivemos uma ótima experiência em todo o processo. O trabalho foi conduzido com profissionalismo, atenção aos detalhes e muita agilidade, desde o entendimento do projeto até a entrega final...\n                  </p>',
  '<p class="review-text review-text-truncated" data-i18n="reviews.r4Trunc">\n                    Contratamos a Conexus para o desenvolvimento do site de uma cliente e tivemos uma ótima experiência em todo o processo. O trabalho foi conduzido com profissionalismo, atenção aos detalhes e muita agilidade, desde o entendimento do projeto até a entrega final...\n                  </p>'
);
html = html.replace(
  '<p>Contratamos a Conexus para o desenvolvimento do site de uma cliente e tivemos uma ótima experiência em todo o processo. O trabalho foi conduzido com profissionalismo, atenção aos detalhes e muita agilidade, desde o entendimento do projeto até a entrega final. Gostamos tanto do resultado que indicamos a empresa para uma conhecida, que também precisava desenvolver seu site.</p>',
  '<p data-i18n="reviews.r4P1">Contratamos a Conexus para o desenvolvimento do site de uma cliente e tivemos uma ótima experiência em todo o processo. O trabalho foi conduzido com profissionalismo, atenção aos detalhes e muita agilidade, desde o entendimento do projeto até a entrega final. Gostamos tanto do resultado que indicamos a empresa para uma conhecida, que também precisava desenvolver seu site.</p>'
);
html = html.replace(
  '<p>Mais uma vez, a entrega surpreendeu: o projeto ficou muito bem feito e foi concluído em tempo recorde. É muito bom poder indicar um fornecedor com a segurança de saber que o trabalho será bem executado. Recomendamos!</p>',
  '<p data-i18n="reviews.r4P2">Mais uma vez, a entrega surpreendeu: o projeto ficou muito bem feito e foi concluído em tempo recorde. É muito bom poder indicar um fornecedor com a segurança de saber que o trabalho será bem executado. Recomendamos!</p>'
);

// Jessiel
html = html.replace(
  '<p class="review-text review-text-truncated">\n                    Excelente trabalho! Não tenho palavras para expressar o quanto fiquei satisfeito com o resultado do Guest Hub criado para o meu apartamento que disponibilizo no Booking. O trabalho ficou simplesmente incrível, muito completo e pensado em cada detalhe...\n                  </p>',
  '<p class="review-text review-text-truncated" data-i18n="reviews.r5Trunc">\n                    Excelente trabalho! Não tenho palavras para expressar o quanto fiquei satisfeito com o resultado do Guest Hub criado para o meu apartamento que disponibilizo no Booking. O trabalho ficou simplesmente incrível, muito completo e pensado em cada detalhe...\n                  </p>'
);
html = html.replace(
  '<p>Excelente trabalho! Não tenho palavras para expressar o quanto fiquei satisfeito com o resultado do Guest Hub criado para o meu apartamento que disponibilizo no Booking.</p>',
  '<p data-i18n="reviews.r5P1">Excelente trabalho! Não tenho palavras para expressar o quanto fiquei satisfeito com o resultado do Guest Hub criado para o meu apartamento que disponibilizo no Booking.</p>'
);
html = html.replace(
  '<p>O trabalho ficou simplesmente incrível, muito completo e pensado em cada detalhe. O material em 3 idiomas, informações importantes sobre a hospedagem, pontos turísticos próximos, além das ótimas recomendações de restaurantes e locais para refeições, fizeram toda a diferença.</p>',
  '<p data-i18n="reviews.r5P2">O trabalho ficou simplesmente incrível, muito completo e pensado em cada detalhe. O material em 3 idiomas, informações importantes sobre a hospedagem, pontos turísticos próximos, além das ótimas recomendações de restaurantes e locais para refeições, fizeram toda a diferença.</p>'
);
html = html.replace(
  '<p>Mais do que um simples guia, ficou um verdadeiro site completo para proporcionar uma experiência muito melhor aos hóspedes. O resultado superou completamente minhas expectativas e agregou muito valor ao meu imóvel e à experiência de quem se hospeda.</p>',
  '<p data-i18n="reviews.r5P3">Mais do que um simples guia, ficou um verdadeiro site completo para proporcionar uma experiência muito melhor aos hóspedes. O resultado superou completamente minhas expectativas e agregou muito valor ao meu imóvel e à experiência de quem se hospeda.</p>'
);
html = html.replace(
  '<p>Parabéns pelo profissionalismo, atenção aos detalhes e pela qualidade do trabalho! Recomendo de olhos fechados. Excelente serviço! 👏🏻</p>',
  '<p data-i18n="reviews.r5P4">Parabéns pelo profissionalismo, atenção aos detalhes e pela qualidade do trabalho! Recomendo de olhos fechados. Excelente serviço! 👏🏻</p>'
);

// Karine
html = html.replace(
  '<p class="review-text review-text-truncated">\n                    Tivemos uma experiência excepcional com a Conexus! Contratamos para criar a página do nosso Welcome Book para nossos hóspedes e ficamos muito satisfeitos com o resultado. O Jesse foi o nosso guia e foi muito atencioso, paciente e sempre disponível...\n                  </p>',
  '<p class="review-text review-text-truncated" data-i18n="reviews.r6Trunc">\n                    Tivemos uma experiência excepcional com a Conexus! Contratamos para criar a página do nosso Welcome Book para nossos hóspedes e ficamos muito satisfeitos com o resultado. O Jesse foi o nosso guia e foi muito atencioso, paciente e sempre disponível...\n                  </p>'
);
html = html.replace(
  '<p>Tivemos uma experiência excepcional com a Conexus! Contratamos para criar a página do nosso Welcome Book para nossos hóspedes e ficamos muito satisfeitos com o resultado.</p>',
  '<p data-i18n="reviews.r6P1">Tivemos uma experiência excepcional com a Conexus! Contratamos para criar a página do nosso Welcome Book para nossos hóspedes e ficamos muito satisfeitos com o resultado.</p>'
);
html = html.replace(
  '<p>O Jesse foi o nosso guia e foi muito atencioso, paciente e sempre disponível para tirar nossas dúvidas e fazer os ajustes necessários. Mesmo quando mudamos alguns detalhes no meio do caminho, ele sempre nos atendeu prontamente.</p>',
  '<p data-i18n="reviews.r6P2">O Jesse foi o nosso guia e foi muito atencioso, paciente e sempre disponível para tirar nossas dúvidas e fazer os ajustes necessários. Mesmo quando mudamos alguns detalhes no meio do caminho, ele sempre nos atendeu prontamente.</p>'
);
html = html.replace(
  '<p>A página ficou esteticamente linda, organizada e, acima de tudo, muito fácil de usar, que era exatamente o que buscávamos para facilitar a experiência dos nossos hóspedes.</p>',
  '<p data-i18n="reviews.r6P3">A página ficou esteticamente linda, organizada e, acima de tudo, muito fácil de usar, que era exatamente o que buscávamos para facilitar a experiência dos nossos hóspedes.</p>'
);
html = html.replace(
  '<p>Além disso, ter o Welcome Book disponível em português, inglês e espanhol com apenas um clique foi uma grande vantagem para nós, principalmente porque recebemos hóspedes de diferentes lugares.</p>',
  '<p data-i18n="reviews.r6P4">Além disso, ter o Welcome Book disponível em português, inglês e espanhol com apenas um clique foi uma grande vantagem para nós, principalmente porque recebemos hóspedes de diferentes lugares.</p>'
);
html = html.replace(
  '<p>Gostamos muito do resultado e do atendimento. Recomendamos a Conexus com certeza! 😊</p>',
  '<p data-i18n="reviews.r6P5">Gostamos muito do resultado e do atendimento. Recomendamos a Conexus com certeza! 😊</p>'
);

// Review expand buttons
html = html.replace(
  /<span>Ler avaliação completa<\/span>/g,
  '<span data-i18n="reviews.readMore">Ler avaliação completa</span>'
);

// Review Google CTA
html = html.replace(
  'Ver avaliações no Google\n            <svg class="btn-icon"',
  '<span data-i18n="reviews.viewAllGoogle">Ver avaliações no Google</span>\n            <svg class="btn-icon"'
);

// 9. Final CTA
html = html.replace(
  '<span class="tag">Pronto para Começar?</span>',
  '<span class="tag" data-i18n="ctaFinal.tag">Pronto para Começar?</span>'
);
html = html.replace(
  '<h2>Pronto para fortalecer a presença digital da sua empresa?</h2>',
  '<h2 data-i18n="ctaFinal.title">Pronto para fortalecer a presença digital da sua empresa?</h2>'
);
html = html.replace(
  '<p class="lead">\n            Entre em contato com nossa equipe para avaliar as necessidades da sua empresa e estruturar a solução mais eficiente para seu negócio.\n          </p>',
  '<p class="lead" data-i18n="ctaFinal.lead">\n            Entre em contato com nossa equipe para avaliar as necessidades da sua empresa e estruturar a solução mais eficiente para seu negócio.\n          </p>'
);
html = html.replace(
  '<a href="#" class="btn btn-primary" data-whatsapp-key="homeHero" data-track="whatsapp_click" data-cta-position="final_cta_primary">\n              Quero fortalecer minha presença digital\n              <svg class="btn-icon"',
  '<a href="#" class="btn btn-primary" data-whatsapp-key="homeHero" data-track="whatsapp_click" data-cta-position="final_cta_primary">\n              <span data-i18n="ctaFinal.ctaPrimary">Quero fortalecer minha presença digital</span>\n              <svg class="btn-icon"'
);
html = html.replace(
  '<a href="mailto:comercial@conexus.press" class="btn btn-secondary" data-track="email_click" data-cta-position="final_cta_secondary">\n              Prefere e-mail? Fale com a CONEXUS\n            </a>',
  '<a href="mailto:comercial@conexus.press" class="btn btn-secondary" data-track="email_click" data-cta-position="final_cta_secondary" data-i18n="ctaFinal.ctaSecondary">\n              Prefere e-mail? Fale com a CONEXUS\n            </a>'
);

// 10. Footer
html = html.replace(
  '<p>\n            Estratégia e marketing digital conectando websites profissionais, SEO, branding e redes sociais para fortalecer empresas.\n          </p>',
  '<p data-i18n="footer.tagline">\n            Estratégia e marketing digital conectando websites profissionais, SEO, branding e redes sociais para fortalecer empresas.\n          </p>'
);
html = html.replace(
  '© 2026 CONEXUS. Todos os direitos reservados.',
  '<span data-i18n="footer.rights">© 2026 CONEXUS. Todos os direitos reservados.</span>'
);
html = html.replace(
  'Desenvolvido por <a href="/" class="signature-link">CONEXUS</a>',
  '<span data-i18n="footer.devBy">Desenvolvido por</span> <a href="/" class="signature-link">CONEXUS</a>'
);
html = html.replace(
  '<a href="#" style="color: var(--color-text-muted);">Política de Privacidade</a>',
  '<a href="#" style="color: var(--color-text-muted);" data-i18n="footer.privacy">Política de Privacidade</a>'
);
html = html.replace(
  '<a href="#" style="color: var(--color-text-muted);">Termos de Uso</a>',
  '<a href="#" style="color: var(--color-text-muted);" data-i18n="footer.terms">Termos de Uso</a>'
);

fs.writeFileSync('index.html', html, 'utf8');
console.log('Successfully tagged index.html with all i18n attributes!');
