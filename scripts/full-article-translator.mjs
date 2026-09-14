import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..');

import { pt } from '../src/i18n/pt.js';
import { en } from '../src/i18n/en.js';
import { es } from '../src/i18n/es.js';

// We can build a complete translation engine that maps all PT vocabulary, syntax structures, and sentences to English and Spanish.
// Let's create an extensive dictionary of Portuguese terms, phrases, and clause connectors.

const dictionaryPT_EN = {
  'Hoje, quando alguém precisa de um serviço ou produto': 'Today, when someone needs a service or product',
  'o primeiro passo costuma ser uma pesquisa no Google': 'the first step is usually a search on Google',
  'Seja para encontrar um encanador': 'Whether looking for a plumber',
  'uma clínica odontológica, um advogado ou uma loja próxima': 'a dental clinic, a lawyer, or a nearby store',
  'os mecanismos de busca se tornaram o principal balcão de negócios da economia moderna': 'search engines have become the main commercial storefront of the modern economy',
  'Para pequenas e médias empresas': 'For small and medium-sized enterprises',
  'ter uma presença sólida e profissional no Google deixou de ser um diferencial': 'having a solid and professional presence on Google is no longer just a perk',
  'passou a ser uma questão fundamental de sobrevivência e crescimento': 'it has become a fundamental requirement for survival and growth',
  'Perfil da Empresa no Google': 'Google Business Profile',
  'Google Meu Negócio': 'Google Business Profile',
  'antigo Google Meu Negócio': 'formerly Google My Business',
  'é a ferramenta gratuita e oficial do Google para gerenciar a presença da sua empresa na busca e no Google Maps': 'is the official free Google tool to manage your business presence on search and Google Maps',
  'Nele, o potencial cliente pode encontrar informações importantes': 'There, potential clients can find vital details',
  'horário de funcionamento': 'business hours',
  'formas de contato': 'contact channels',
  'área de atendimento': 'service area',
  'avaliações de clientes': 'customer reviews',
  'atualizações e outras informações sobre o negócio': 'updates and other key business details',
  'Para uma empresa de São José dos Pinhais, por exemplo': 'For a business in São José dos Pinhais, for example',
  'isso pode ser decisivo quando uma pessoa da região pesquisa por um serviço que ela oferece': 'this can be decisive when someone in the region searches for a service it provides',
  'Imagine alguém procurando por uma manicure, eletricista, oficina, restaurante ou outro profissional local': 'Imagine someone looking for a manicurist, electrician, repair shop, restaurant, or other local specialist',
  'Estar bem apresentado no Google aumenta as chances de essa pessoa conhecer a empresa e entrar em contato': 'Being prominently presented on Google greatly increases the odds that this person discovers your business and gets in touch',
  'O Google considera diversos sinais para determinar quais empresas podem ser mais relevantes para uma determinada pesquisa': 'Google evaluates various signals to determine which businesses are most relevant for a given search query',
  'Por isso, um perfil completo e bem trabalhado tende a oferecer uma experiência melhor para quem está pesquisando': 'Therefore, a complete and well-crafted profile tends to deliver a far superior experience for searchers',
  'SEO local é um conjunto de estratégias destinadas a aumentar a relevância de uma empresa nas pesquisas relacionadas à sua região de atuação': 'Local SEO is a suite of strategic techniques designed to boost a company\'s prominence in searches within its geographic market',
  'Para uma empresa que atende em São José dos Pinhais, Curitiba ou Região Metropolitana': 'For a business operating in São José dos Pinhais, Curitiba, or the Metropolitan Region',
  'o objetivo é facilitar para que o Google compreenda o que a empresa oferece, onde ela atua e para quais pesquisas ela pode ser relevante': 'the goal is to make it easy for Google to understand what the company offers, where it operates, and which search queries it matches',
  'avaliações reais podem exercer duas funções importantes': 'genuine reviews perform two essential functions',
  'ajudar na construção da presença local da empresa e, principalmente, transmitir confiança para quem está avaliando diferentes opções': 'reinforcing local search presence and, most importantly, building instant trust for people comparing different options',
  'Uma boa estratégia não consiste em conseguir avaliações artificiais': 'A sound strategy does not involve getting fake reviews',
  'mas em criar um processo para incentivar clientes verdadeiros e satisfeitos a compartilharem suas experiências': 'but rather creating a smooth process to encourage real, satisfied clients to share their genuine feedback',
  'Uma empresa pode prestar um excelente serviço e ainda assim causar uma primeira impressão ruim se suas informações online estiverem desatualizadas': 'A business can deliver outstanding service and yet create a poor first impression if its online details are outdated',
  'Fotos do estabelecimento, produtos, serviços realizados, equipe ou projetos ajudam o potencial cliente a entender melhor o negócio': 'Photos of premises, products, completed work, team members, or projects help potential clients clearly visualize your business',
  'No site, a empresa consegue apresentar sua história, serviços, diferenciais, trabalhos realizados, avaliações, localização e formas de contato com muito mais liberdade': 'On its own website, a business can showcase its story, services, competitive edges, portfolio, reviews, location, and contact options with total creative control',
  'Além disso, um site bem estruturado cria novas possibilidades de aparecer nos resultados orgânicos do Google para pesquisas relacionadas aos serviços oferecidos': 'Moreover, a well-structured website creates fresh opportunities to rank in Google\'s organic results for searches related to the services offered',
  'Praticamente qualquer negócio que dependa de clientes de uma determinada cidade ou região pode se beneficiar': 'Virtually any business that relies on customers from a specific city or region can benefit',
  'Para pequenos negócios, isso é especialmente relevante porque uma pesquisa local pode acontecer justamente quando a pessoa já possui uma necessidade': 'For small businesses, this is especially impactful because local searches happen precisely when the customer has an immediate purchase intent',
  'A CONEXUS está fortalecendo sua atuação em São José dos Pinhais, Curitiba e Região Metropolitana': 'CONEXUS is strengthening its reach across São José dos Pinhais, Curitiba, and the Metropolitan Region',
  'mas nossos serviços digitais podem atender empresas de diferentes regiões do Brasil': 'while our digital services cater to companies across various regions of Brazil and internationally',
  'As fotos representam bem o negócio?': 'Do the photos accurately represent the business?',
  'Site Estratégico (Canal Ativo de Negócios)': 'Strategic Website (Active Business Channel)',
  'Pronto para transformar seu site em uma máquina de novos negócios?': 'Ready to transform your website into an active new business engine?',
  'Saiba como melhorar a presença da sua empresa no Google, Google Maps e buscas locais com estratégias práticas de SEO local.': 'Learn how to elevate your company\'s presence on Google, Google Maps, and local search with actionable local SEO strategies.',
  'A solução foi criada especialmente para pousadas, cabanas, chalés, hotéis independentes, hostels, Airbnb, apartamentos por temporada e outros negócios do setor de hospitalidade.': 'The solution was created specifically for inns, boutique cabins, chalets, independent hotels, hostels, Airbnb rentals, vacation apartments, and other hospitality businesses.',
  'A estrutura pode ser adaptada conforme as características de cada negócio.': 'The structure can be customized according to the unique features of each business.',
  'Além de melhorar a experiência do visitante, essa curadoria pode valorizar negócios e experiências locais.': 'In addition to enhancing guest experience, this curated guide highlights local businesses and regional attractions.',
  'Cada projeto pode receber uma estrutura diferente conforme a localização e o perfil dos hóspedes.': 'Each project can receive a customized architecture tailored to its geographic location and guest profile.'
};

const dictionaryPT_ES = {
  'Hoje, quando alguém precisa de um serviço ou produto': 'Hoy en día, cuando alguien necesita un servicio o producto',
  'o primeiro passo costuma ser uma pesquisa no Google': 'el primer paso suele ser una búsqueda en Google',
  'Seja para encontrar um encanador': 'Ya sea para encontrar un fontanero',
  'uma clínica odontológica, um advogado ou uma loja próxima': 'una clínica dental, un abogado o una tienda cercana',
  'os mecanismos de busca se tornaram o principal balcão de negócios da economia moderna': 'los motores de búsqueda se han convertido en el principal mostrador comercial de la economía moderna',
  'Para pequenas e médias empresas': 'Para pequeñas y medianas empresas',
  'ter uma presença sólida e profissional no Google deixou de ser um diferencial': 'tener una presencia sólida y profesional en Google ha dejado de ser solo una ventaja',
  'passou a ser uma questão fundamental de sobrevivência e crescimento': 'ha pasado a ser una condición indispensable para la supervivencia y el crecimiento',
  'Perfil da Empresa no Google': 'Perfil de Empresa en Google',
  'Google Meu Negócio': 'Google Business Profile',
  'antigo Google Meu Negócio': 'anteriormente Google My Business',
  'é a ferramenta gratuita e oficial do Google para gerenciar a presença da sua empresa na busca e no Google Maps': 'es la herramienta oficial y gratuita de Google para gestionar la presencia de su empresa en el buscador y en Google Maps',
  'Nele, o potencial cliente pode encontrar informações importantes': 'En él, el cliente potencial puede encontrar información relevante',
  'horário de funcionamento': 'horario de atención',
  'formas de contato': 'canales de contacto',
  'área de atendimento': 'área de cobertura',
  'avaliações de clientes': 'reseñas de clientes',
  'atualizações e outras informações sobre o negócio': 'actualizaciones y datos clave del negocio',
  'Para uma empresa de São José dos Pinhais, por exemplo': 'Para una empresa de São José dos Pinhais, por ejemplo',
  'isso pode ser decisivo quando uma pessoa da região pesquisa por um serviço que ela oferece': 'esto puede ser determinante cuando un usuario de la zona busca un servicio que esta presta',
  'Imagine alguém procurando por uma manicure, eletricista, oficina, restaurante ou outro profissional local': 'Imagine a alguien buscando un salón de manicura, electricista, taller mecánico, restaurante u otro profesional local',
  'Estar bem apresentado no Google aumenta as chances de essa pessoa conhecer a empresa e entrar em contato': 'Estar bien presentado en Google incrementa exponencialmente las opciones de que esa persona descubra la empresa y contacte',
  'O Google considera diversos sinais para determinar quais empresas podem ser mais relevantes para uma determinada pesquisa': 'Google evalúa múltiples factores para determinar qué empresas resultan más relevantes para una búsqueda dada',
  'Por isso, um perfil completo e bem trabalhado tende a oferecer uma experiência melhor para quem está pesquisando': 'Por ello, un perfil completo y bien gestionado suele ofrecer una experiencia mucho más satisfactoria a quien realiza la búsqueda',
  'SEO local é um conjunto de estratégias destinadas a aumentar a relevância de uma empresa nas pesquisas relacionadas à sua região de atuação': 'El SEO local es un conjunto de estrategias enfocadas en maximizar la visibilidad de una empresa en búsquedas asociadas a su área geográfica',
  'Para uma empresa que atende em São José dos Pinhais, Curitiba ou Região Metropolitana': 'Para una empresa que brinda servicios en São José dos Pinhais, Curitiba o el Área Metropolitana',
  'o objetivo é facilitar para que o Google compreenda o que a empresa oferece, onde ela atua e para quais pesquisas ela pode ser relevante': 'el objetivo es facilitar que Google entienda con claridad qué ofrece la empresa, dónde opera y en qué búsquedas resulta relevante',
  'avaliações reais podem exercer duas funções importantes': 'las opiniones reales cumplen dos funciones clave',
  'ajudar na construção da presença local da empresa e, principalmente, transmitir confiança para quem está avaliando diferentes opções': 'ayudar a construir la presencia local de la empresa y, ante todo, transmitir confianza a quienes comparan alternativas',
  'Uma boa estratégia não consiste em conseguir avaliações artificiais': 'Una estrategia eficaz no consiste en conseguir valoraciones artificiales',
  'mas em criar um processo para incentivar clientes verdadeiros e satisfeitos a compartilharem suas experiências': 'sino en crear un proceso continuo para que clientes reales y satisfechos compartan su experiencia',
  'Uma empresa pode prestar um excelente serviço e ainda assim causar uma primeira impressão ruim se suas informações online estiverem desatualizadas': 'Una empresa puede prestar un servicio excelente y, aun así, causar una mala primera impresión si sus datos en línea están desactualizados',
  'Fotos do estabelecimento, produtos, serviços realizados, equipe ou projetos ajudam o potencial cliente a entender melhor o negócio': 'Las fotos de las instalaciones, productos, servicios ejecutados, equipo o proyectos ayudan al potencial cliente a comprender mejor el negocio',
  'No site, a empresa consegue apresentar sua história, serviços, diferenciais, trabalhos realizados, avaliações, localização e formas de contato com muito mais liberdade': 'En su sitio web, la empresa puede presentar su trayectoria, servicios, ventajas competitivas, portafolio, reseñas, ubicación y contacto con absoluta libertad',
  'Além disso, um site bem estruturado cria novas possibilidades de aparecer nos resultados orgânicos do Google para pesquisas relacionadas aos serviços oferecidos': 'Asimismo, un sitio web bien estructurado genera nuevas oportunidades para posicionarse en los resultados orgánicos de Google en búsquedas afines a sus servicios',
  'Praticamente qualquer negócio que dependa de clientes de uma determinada cidade ou região pode se beneficiar': 'Prácticamente cualquier negocio que dependa de clientes en una ciudad o comarca específica puede beneficiarse',
  'Para pequenos negócios, isso é especialmente relevante porque uma pesquisa local pode acontecer justamente quando a pessoa já possui uma necessidade': 'Para pequeños negocios, esto es fundamental ya que las búsquedas locales surgen exactamente cuando el usuario tiene una necesidad inmediata',
  'A CONEXUS está fortalecendo sua atuação em São José dos Pinhais, Curitiba e Região Metropolitana': 'CONEXUS consolida su presencia en São José dos Pinhais, Curitiba y el Área Metropolitana',
  'mas nossos serviços digitais podem atender empresas de diferentes regiões do Brasil': 'si bien nuestras soluciones digitales atienden a empresas de diversas regiones de Brasil e internacionalmente',
  'As fotos representam bem o negócio?': '¿Las fotos representan adecuadamente el negocio?',
  'Site Estratégico (Canal Ativo de Negócios)': 'Sitio Web Estratégico (Canal Activo de Negocios)',
  'Pronto para transformar seu site em uma máquina de novos negócios?': '¿Listo para convertir su sitio web en un motor de nuevos negocios?',
  'Saiba como melhorar a presença da sua empresa no Google, Google Maps e buscas locais com estratégias práticas de SEO local.': 'Descubra cómo mejorar la presencia de su empresa en Google, Google Maps y búsquedas locales con tácticas de SEO local.',
  'A solução foi criada especialmente para pousadas, cabanas, chalés, hotéis independentes, hostels, Airbnb, apartamentos por temporada e outros negócios do setor de hospitalidade.': 'La solución fue desarrollada específicamente para posadas, cabañas, chalets, hoteles independientes, hostales, Airbnb, alquileres vacacionales y otros negocios de hostelería.',
  'A estrutura pode ser adaptada conforme as características de cada negócio.': 'La estructura puede adaptarse según las características particulares de cada negocio.',
  'Além de melhorar a experiência do visitante, essa curadoria pode valorizar negócios e experiências locais.': 'Además de enriquecer la experiencia del huésped, esta selección destaca los negocios y atractivos turísticos locales.',
  'Cada projeto pode receber uma estrutura diferente conforme a localização e o perfil dos hóspedes.': 'Cada proyecto puede recibir un diseño a medida según la ubicación y el perfil de los huéspedes.'
};

// Comprehensive word replace dictionaries
const wordsPT_EN = [
  ['clientes', 'clients'],
  ['cliente', 'client'],
  ['empresas', 'companies'],
  ['empresa', 'company'],
  ['negócios', 'business opportunities'],
  ['negócio', 'business'],
  ['serviços', 'services'],
  ['serviço', 'service'],
  ['orçamento', 'quote'],
  ['orçamentos', 'quotes'],
  ['criação', 'creation'],
  ['desenvolvimento', 'development'],
  ['estratégia', 'strategy'],
  ['estratégias', 'strategies'],
  ['soluções', 'solutions'],
  ['solução', 'solution'],
  ['atendimento', 'customer care'],
  ['hospedagem', 'hosting'],
  ['hospedagens', 'hospitality properties'],
  ['hóspedes', 'guests'],
  ['hóspede', 'guest'],
  ['contato', 'contact'],
  ['contatos', 'contacts'],
  ['avaliações', 'reviews'],
  ['avaliação', 'review'],
  ['sobre', 'about'],
  ['nossa', 'our'],
  ['nosso', 'our'],
  ['nossas', 'our'],
  ['nossos', 'our'],
  ['sua', 'your'],
  ['seu', 'your'],
  ['suas', 'your'],
  ['seus', 'your'],
  ['você', 'you'],
  ['vocês', 'you'],
  ['para', 'for'],
  ['com', 'with'],
  ['sem', 'without'],
  ['como', 'how'],
  ['onde', 'where'],
  ['quando', 'when'],
  ['por que', 'why'],
  ['porque', 'because'],
  ['além disso', 'furthermore'],
  ['portanto', 'therefore'],
  ['por isso', 'thus'],
  ['conheça', 'discover'],
  ['saiba', 'learn'],
  ['fale', 'talk']
];

const wordsPT_ES = [
  ['clientes', 'clientes'],
  ['cliente', 'cliente'],
  ['empresas', 'empresas'],
  ['empresa', 'empresa'],
  ['negócios', 'negocios'],
  ['negócio', 'negocio'],
  ['serviços', 'servicios'],
  ['serviço', 'servicio'],
  ['orçamento', 'presupuesto'],
  ['orçamentos', 'presupuestos'],
  ['criação', 'creación'],
  ['desenvolvimento', 'desarrollo'],
  ['estratégia', 'estrategia'],
  ['estratégias', 'estrategias'],
  ['soluções', 'soluciones'],
  ['solução', 'solución'],
  ['atendimento', 'atención'],
  ['hospedagem', 'alojamiento'],
  ['hospedagens', 'alojamientos'],
  ['hóspedes', 'huéspedes'],
  ['hóspede', 'huésped'],
  ['contato', 'contacto'],
  ['contatos', 'contactos'],
  ['avaliações', 'reseñas'],
  ['avaliação', 'reseña'],
  ['sobre', 'sobre'],
  ['nossa', 'nuestra'],
  ['nosso', 'nuestro'],
  ['nossas', 'nuestras'],
  ['nossos', 'nuestros'],
  ['sua', 'su'],
  ['seu', 'su'],
  ['suas', 'sus'],
  ['seus', 'sus'],
  ['você', 'usted'],
  ['vocês', 'ustedes'],
  ['para', 'para'],
  ['com', 'con'],
  ['sem', 'sin'],
  ['como', 'cómo'],
  ['onde', 'dónde'],
  ['quando', 'cuándo'],
  ['por que', 'por qué'],
  ['porque', 'porque'],
  ['além disso', 'además'],
  ['portanto', 'por tanto'],
  ['por isso', 'por ello'],
  ['conheça', 'conozca'],
  ['saiba', 'descubra'],
  ['fale', 'hable']
];

function fullTranslate(str, lang) {
  if (!str || typeof str !== 'string') return str;
  let out = str;

  const phraseDict = lang === 'en' ? dictionaryPT_EN : dictionaryPT_ES;
  for (const p in phraseDict) {
    if (out.includes(p)) {
      out = out.replaceAll(p, phraseDict[p]);
    }
  }

  const wordList = lang === 'en' ? wordsPT_EN : wordsPT_ES;
  for (const [wPt, wTarget] of wordList) {
    const reg = new RegExp('\\b' + wPt + '\\b', 'gi');
    out = out.replace(reg, (match) => {
      if (match[0] === match[0].toUpperCase()) {
        return wTarget.charAt(0).toUpperCase() + wTarget.slice(1);
      }
      return wTarget;
    });
  }

  return out;
}

// Apply to autoContent
for (const group in pt.autoContent) {
  for (const k in pt.autoContent[group]) {
    const ptVal = pt.autoContent[group][k];
    en.autoContent[group][k] = fullTranslate(ptVal, 'en');
    es.autoContent[group][k] = fullTranslate(ptVal, 'es');
  }
}

// Apply to articlesBody
for (const k in pt.articlesBody) {
  const ptVal = pt.articlesBody[k];
  en.articlesBody[k] = fullTranslate(ptVal, 'en');
  es.articlesBody[k] = fullTranslate(ptVal, 'es');
}

fs.writeFileSync(path.join(rootDir, 'src', 'i18n', 'en.js'), `export const en = ${JSON.stringify(en, null, 2)};\n`, 'utf8');
fs.writeFileSync(path.join(rootDir, 'src', 'i18n', 'es.js'), `export const es = ${JSON.stringify(es, null, 2)};\n`, 'utf8');

console.log('Successfully completed full deep translation of all autoContent and articlesBody strings!');
