# 01 --- PROMPT FUNDAÇÃO + HOME --- ANTIGRAVITY

## PROJETO

Construir a **fundação técnica e somente a Home** do novo website da
**CONEXUS**.

Este é o primeiro checkpoint do projeto. **NÃO construir as demais
páginas completas nesta etapa.** Criar apenas a infraestrutura
necessária para que as rotas futuras possam existir e implementar a Home
com qualidade de produção.

O arquivo `CONEXUS_Briefing_Mestre_Website.md` é a fonte principal de
requisitos do projeto. Em caso de dúvida, não inventar informações.

------------------------------------------------------------------------

## 1. REGRA CRÍTICA DA MARCA

A marca pública é:

**CONEXUS**

A palavra **"Brasil" NÃO faz parte do nome da marca**. É apenas uma
identificação interna do projeto.

Não escrever publicamente: - CONEXUS Brasil - Conexus Brasil - CONEXXUS
Brasil

Não misturar esta marca com a operação **CONEXXUS Digital Marketing
UK**.

Não recriar, redesenhar ou reinterpretar o logo. Usar somente os
arquivos oficiais fornecidos no projeto.

------------------------------------------------------------------------

## 2. OBJETIVO DA HOME

A Home deve:

1.  comunicar profissionalismo imediatamente;
2.  explicar claramente o que a CONEXUS faz;
3.  destacar Websites, SEO, presença no Google, Branding e Social Media;
4.  transmitir confiança;
5.  apresentar projetos/portfólio;
6.  criar caminhos claros para páginas de serviço;
7.  converter visitantes principalmente em conversas pelo WhatsApp;
8.  oferecer e-mail como canal secundário;
9.  possuir excelente experiência mobile;
10. estabelecer uma base técnica forte para SEO e performance.

A prioridade da experiência é:

**SER ENCONTRADO → TRANSMITIR CONFIANÇA → EXPLICAR A SOLUÇÃO → GERAR
CONTATO**

------------------------------------------------------------------------

## 3. NÃO FAZER

Nesta fase:

-   não construir todas as páginas internas;
-   não escrever artigos do Blog;
-   não inventar depoimentos;
-   não inventar reviews;
-   não inventar clientes;
-   não inventar números de projetos;
-   não inventar anos de experiência;
-   não inventar tamanho da equipe;
-   não inventar endereços;
-   não inventar telefone;
-   não mostrar número de celular;
-   não inventar estatísticas;
-   não prometer primeira posição no Google;
-   não criar formulário de contato;
-   não usar imagens aleatórias/stock se existem assets aprovados;
-   não gerar um novo logo;
-   não inserir "Brasil" no nome público;
-   não publicar ou substituir o website atual;
-   não configurar produção antes da aprovação desta fase.

Se algum dado estiver ausente, usar uma variável/placeholder técnico
claramente identificado em vez de inventar.

------------------------------------------------------------------------

# 4. FUNDAÇÃO TÉCNICA

Criar uma arquitetura limpa, modular, reutilizável e preparada para
crescimento.

Separar adequadamente:

-   layout;
-   Header;
-   Footer;
-   navegação;
-   botões/CTAs;
-   cards;
-   seções;
-   dados de serviços;
-   dados de portfólio;
-   metadata/SEO;
-   configuração de contato;
-   assets.

Evitar duplicação de código.

A Home deve ser responsiva desde o início.

Preparar rotas futuras:

-   `/servicos/`
-   `/servicos/criacao-de-sites/`
-   `/servicos/site-one-page/`
-   `/servicos/seo/`
-   `/servicos/seo-local-google-meu-negocio/`
-   `/servicos/branding-identidade-visual/`
-   `/servicos/gestao-redes-sociais/`
-   `/sobre/`
-   `/portfolio/`
-   `/blog/`
-   `/faq/`
-   `/contato/`

Nesta fase, essas rotas podem permanecer não implementadas ou com
placeholder técnico mínimo, conforme a arquitetura utilizada. **Não
produzir conteúdo improvisado para preenchê-las.**

------------------------------------------------------------------------

# 5. DESIGN SYSTEM

A experiência deve ser moderna, tecnológica, premium e limpa.

Direção visual:

-   predominância navy/dark;
-   azul e cyan para interação e destaques;
-   branco/cinza para legibilidade;
-   seções claras estratégicas para quebrar a monotonia;
-   bastante espaço em branco/negative space;
-   hierarquia tipográfica forte;
-   cards sofisticados, sem excesso de efeitos;
-   bordas e sombras discretas;
-   animações mínimas e funcionais;
-   nada excessivamente "futurista", neon ou busy.

Referência de direção:

-   Navy muito escuro: `#061426`
-   Navy: `#0B2340`
-   Azul: `#087EDB`
-   Cyan: `#21B8F6`
-   Branco frio: `#F5F8FC`
-   Cinza claro: `#B8C5D3`
-   Grafite: `#1B2735`

Se os assets/Brand Guide oficial definirem valores diferentes, **o Brand
Guide tem prioridade**.

### Tipografia

Usar tipografia profissional, altamente legível e adequada a uma empresa
de tecnologia/marketing.

Evitar carregar muitas famílias e pesos.

### Botões

Criar sistema consistente:

**Primary CTA:** destaque visual forte.\
**Secondary CTA:** menor hierarquia, mas claramente interativo.

Estados obrigatórios: - default; - hover; - focus; - active; - disabled,
quando aplicável.

Garantir foco visível e acessibilidade por teclado.

------------------------------------------------------------------------

# 6. HEADER

Header profissional e responsivo.

Desktop: - logo oficial à esquerda; - navegação clara; - CTA destacado à
direita.

Navegação prevista: - Início - Serviços - Sobre - Portfólio - Blog -
FAQ - Contato

CTA: **Falar com a CONEXUS**

No mobile: - menu compacto; - navegação fácil por toque; - CTA
acessível; - nenhum elemento cortado; - não ocupar altura excessiva.

Header sticky pode ser usado se melhorar a experiência, sem criar
comportamento intrusivo.

------------------------------------------------------------------------

# 7. HERO --- HOME

A primeira dobra precisa ser forte, limpa e orientada à conversão.

### SEO H1

**Marketing digital para transformar presença online em oportunidades**

### Copy de apoio

Criar um parágrafo curto e profissional explicando que a CONEXUS conecta
websites profissionais, SEO, presença no Google, branding e comunicação
digital para ajudar empresas a construir uma presença mais forte e gerar
novas oportunidades.

Não prometer resultados garantidos.

### CTA principal

**Quero fortalecer minha presença digital**

Destino: WhatsApp.

### CTA secundário

**Conheça nossas soluções**

Destino: seção Serviços da própria Home.

### Visual

Usar a **imagem Hero aprovada existente nos assets do projeto**.

Não gerar imagem nova.

Não inserir texto dentro da imagem.

Não recriar o logo dentro da imagem.

Manter contraste suficiente entre imagem e copy.

No mobile, preservar o assunto principal da imagem e evitar crops ruins.

------------------------------------------------------------------------

# 8. SEÇÃO --- SERVIÇOS

Título sugerido:

**Soluções digitais conectadas para fortalecer sua empresa**

Apresentar cards para:

1.  Criação de Sites
2.  Site One Page
3.  SEO
4.  SEO Local & Google
5.  Branding & Identidade Visual
6.  Gestão de Redes Sociais

Cada card deve: - ter título; - descrição curta; - ícone coerente; -
link para a futura página específica; - possuir estado hover/focus; -
evitar parágrafos longos.

Não colocar todos os serviços como se fossem iguais. Dar maior peso
visual a **Criação de Sites** e **SEO/Google**, pois são pilares
comerciais importantes.

------------------------------------------------------------------------

# 9. SEÇÃO --- DIFERENCIAL / ECOSSISTEMA

Criar uma seção que mostre que a CONEXUS não trabalha elementos digitais
de forma isolada.

Conceito:

**Website + SEO + Google + Branding + Social Media → Presença digital
conectada**

Copy deve explicar que identidade, website, mecanismos de busca e
comunicação precisam trabalhar em conjunto.

Não usar linguagem exagerada.

------------------------------------------------------------------------

# 10. SEÇÃO --- CRIAÇÃO DE SITES

Criar uma seção específica de destaque para websites.

Objetivo: - reforçar um dos principais serviços; - explicar rapidamente
One Page x estruturas mais completas; - destacar responsividade, SEO
técnico e experiência mobile.

CTA:

**Quero criar meu site profissional**

Link futuro: `/servicos/criacao-de-sites/`

Adicionar link secundário para: `/servicos/site-one-page/`

Usar a imagem aprovada correspondente a websites.

------------------------------------------------------------------------

# 11. SEÇÃO --- SEO + GOOGLE

Criar uma seção visualmente forte conectando:

-   SEO;
-   estrutura do website;
-   conteúdo;
-   Google;
-   SEO Local;
-   Perfil da Empresa no Google.

Título deve comunicar visibilidade sem prometer ranking.

Exemplo de direção:

**Sua empresa precisa ser encontrada por quem já está procurando**

CTA:

**Quero melhorar minha presença no Google**

Link futuro: `/servicos/seo/`

Criar também caminho contextual para:
`/servicos/seo-local-google-meu-negocio/`

------------------------------------------------------------------------

# 12. SEÇÃO --- PROCESSO

Mostrar um processo simples e profissional.

Sugestão:

1.  Entender
2.  Planejar
3.  Construir
4.  Revisar
5.  Publicar
6.  Evoluir

Não criar timeline complicada.

Usar a imagem de processo aprovada se ela estiver disponível nos assets.

A mensagem deve reforçar que o website atual não precisa ser retirado do
ar enquanto o novo é desenvolvido.

------------------------------------------------------------------------

# 13. PORTFÓLIO --- PREVIEW NA HOME

Criar uma seção de prova visual com alguns projetos.

Título:

**Projetos construídos para diferentes negócios e mercados**

Projetos disponíveis no portfólio mestre:

-   Michelly Corrêa --- projeto real
-   SOS Aberturas --- projeto real
-   Nikki Studio --- projeto real
-   CONEXXUS Digital Marketing UK --- projeto próprio
-   Crafix --- projeto conceito/demonstração
-   Lumora Cleaning Services --- projeto real

### Regras

Não chamar Crafix de cliente.

Não chamar CONEXXUS UK de cliente.

Não inventar resultados.

Não inventar escopo para SOS Aberturas.

Na Home, usar uma seleção enxuta de projetos, com visual premium.

CTA: **Ver Portfólio**

Destino: `/portfolio/`

Usar `conexus-portfolio-projects-13.png` quando adequado.

------------------------------------------------------------------------

# 14. CONTEÚDO / BLOG --- PREVIEW

Criar apenas uma seção de preview do Blog.

Não implementar ainda o Blog completo.

Título sugerido:

**Conteúdo para fortalecer sua presença digital**

Mostrar cards preparados para artigos.

Podem ser utilizados os títulos já aprovados no briefing, sem inventar
novos artigos.

CTA: **Ver conteúdos**

Destino: `/blog/`

Usar `conexus-blog-content-14.png` quando apropriado.

------------------------------------------------------------------------

# 15. CTA FINAL

A seção final deve ser mais forte que um simples "Entre em contato".

Título sugerido:

**Pronto para fortalecer a presença digital da sua empresa?**

Texto curto, orientado à conversa.

CTA principal: **Conversar sobre meu projeto**

→ WhatsApp.

CTA secundário: **Prefere e-mail? Fale com a CONEXUS**

→ `mailto:comercial@conexus.press`

Não exibir número de telefone.

------------------------------------------------------------------------

# 16. FOOTER

Footer limpo e profissional.

Incluir: - logo oficial; - breve descrição; - navegação; - serviços; -
Blog; - FAQ; - Contato; - e-mail; - Instagram; - LinkedIn; - links
legais preparados para Política de Privacidade e, quando aplicável,
Cookies/Termos.

Não exibir telefone.

Não inserir endereço que não esteja confirmado.

Não usar "CONEXUS Brasil".

------------------------------------------------------------------------

# 17. WHATSAPP

Centralizar o número em configuração/variável, para que possa ser
alterado antes do go-live sem procurar links manualmente.

Enquanto o número definitivo não estiver confirmado, **não inventar um
número**.

Preparar suporte para mensagens pré-preenchidas por contexto.

Exemplo para Home:

**Olá! Conheci a CONEXUS pelo website e gostaria de conversar sobre a
presença digital da minha empresa.**

Implementar estrutura para tracking futuro.

------------------------------------------------------------------------

# 18. SEO DA HOME

Implementar:

### Title

**Agência de Marketing Digital para Empresas \| CONEXUS**

### Meta Description

**Websites profissionais, SEO, presença no Google, branding e redes
sociais para empresas que querem fortalecer sua presença digital e gerar
oportunidades.**

### H1

Somente um H1: **Marketing digital para transformar presença online em
oportunidades**

### Keyword principal

`agência de marketing digital`

### Cluster secundário

-   marketing digital para empresas
-   agência digital
-   presença digital para empresas
-   sites e SEO
-   marketing para pequenas empresas

Usar naturalmente. **Não fazer keyword stuffing.**

### Outros requisitos

-   canonical preparado;
-   Open Graph;
-   metadata social;
-   favicon oficial;
-   headings semânticos;
-   alt text contextual;
-   links internos;
-   HTML semântico;
-   preparação para Schema.

------------------------------------------------------------------------

# 19. SCHEMA / JSON-LD --- FASE 1

Preparar somente marcações justificadas pelo conteúdo real.

Na Home, avaliar: - `Organization` - `WebSite`

Não inventar: - endereço; - telefone público; - foundingDate; - número
de funcionários; - avaliações; - rating; - preço; - localização não
confirmada.

------------------------------------------------------------------------

# 20. PERFORMANCE

A Home deve ser construída com Core Web Vitals em mente.

Priorizar: - LCP; - INP; - CLS.

Requisitos: - imagens otimizadas; - `srcset` quando adequado; - formatos
modernos; - dimensões explícitas; - lazy loading abaixo da dobra; - Hero
sem lazy loading inadequado; - evitar JavaScript desnecessário; - evitar
bibliotecas pesadas para efeitos simples; - fontes otimizadas; - CSS
organizado; - evitar vídeo pesado no Hero; - evitar carrosséis
automáticos desnecessários.

------------------------------------------------------------------------

# 21. ACESSIBILIDADE

Implementar no mínimo: - landmarks semânticos; - contraste adequado; -
navegação por teclado; - foco visível; - labels/aria quando
necessários; - alt text; - botões e links semanticamente corretos; -
tamanho adequado para toque no mobile; - respeito a
`prefers-reduced-motion` para animações.

------------------------------------------------------------------------

# 22. TRACKING --- PREPARAÇÃO

Não inventar IDs de GA4 ou GTM.

Preparar o código/componentes para instrumentação futura.

Eventos planejados: - `whatsapp_click` - `email_click` -
`service_cta_click` - `portfolio_click` - `blog_to_service_click` -
`social_click`

Parâmetros: - `page_location` - `service_name` - `cta_position` -
`cta_text`

A arquitetura deve permitir adicionar GTM/GA4 posteriormente sem refazer
os componentes.

------------------------------------------------------------------------

# 23. STAGING E INDEXAÇÃO

Esta fase é desenvolvimento/staging.

Não substituir o website atual.

Enquanto estiver em staging: - impedir indexação; - não enviar sitemap
para Google; - não configurar Search Console como se fosse produção; -
não criar canonical apontando incorretamente para staging como URL
definitiva.

O domínio definitivo será confirmado antes do go-live.

------------------------------------------------------------------------

# 24. CHECKPOINT OBRIGATÓRIO

Ao terminar esta fase:

**PARE. NÃO avance para as demais páginas.**

Entregar para revisão:

1.  Home desktop;
2.  Home mobile;
3.  Header;
4.  Footer;
5.  todas as seções;
6.  CTAs;
7.  utilização dos assets;
8.  SEO da Home;
9.  relatório curto do que foi implementado;
10. lista de placeholders/dados ainda pendentes.

Não começar automaticamente Serviços, Sobre, Portfólio completo, Blog
completo, FAQ ou Contato.

A próxima fase só começa depois da aprovação visual e funcional da Home.

------------------------------------------------------------------------

# 25. CRITÉRIOS DE APROVAÇÃO DA FASE 1

A fase será considerada aprovada quando:

-   logo estiver correto;
-   identidade estiver coerente;
-   Home tiver aparência premium e profissional;
-   mobile estiver bem resolvido;
-   nenhuma informação tiver sido inventada;
-   não aparecer "CONEXUS Brasil";
-   WhatsApp não exibir número;
-   CTAs estiverem claros;
-   navegação estiver funcionando;
-   imagens aprovadas estiverem corretamente utilizadas;
-   SEO da Home estiver implementado;
-   não houver conteúdo duplicado;
-   performance não estiver sendo prejudicada por efeitos
    desnecessários;
-   estrutura estiver preparada para as próximas páginas.

------------------------------------------------------------------------

## INSTRUÇÃO FINAL AO ANTIGRAVITY

Construa **somente a fundação + Home** seguindo estas especificações e o
`CONEXUS_Briefing_Mestre_Website.md`.

Priorize qualidade sobre velocidade.

Não improvise dados.

Não altere a identidade.

Não avance para a próxima fase sem revisão.

Ao finalizar, execute os testes disponíveis do projeto, informe qualquer
erro real encontrado e apresente uma lista objetiva dos
arquivos/componentes criados ou modificados.
