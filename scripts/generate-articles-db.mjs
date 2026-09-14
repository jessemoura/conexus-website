import fs from 'fs';
import { pt } from '../src/i18n/pt.js';

// Let's generate the database for all 5 articles
const articles = [
  'blog_como_colocar_empresa_no_google_sao_jose_dos_pinhais',
  'blog_como_usar_site_para_atrair_clientes_google',
  'blog_conexus_guest_hub_guia_digital_para_hospedagens',
  'blog_por_que_sua_empresa_precisa_de_um_site',
  'blog_quanto_custa_site_profissional_2026'
];

console.log('Building articles translation database...');
// We will write the database with all 344 keys cleanly translated
