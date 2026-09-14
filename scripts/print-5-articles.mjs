import fs from 'fs';
import { pt } from '../src/i18n/pt.js';

// Let's write a script to inspect every key of the 5 articles and provide exact 1-to-1 translations
const targetArticles = [
  'blog_como_colocar_empresa_no_google_sao_jose_dos_pinhais',
  'blog_como_usar_site_para_atrair_clientes_google',
  'blog_conexus_guest_hub_guia_digital_para_hospedagens',
  'blog_por_que_sua_empresa_precisa_de_um_site',
  'blog_quanto_custa_site_profissional_2026'
];

for (const art of targetArticles) {
  const ptGroup = pt.autoContent[art];
  console.log(`\n================== ${art} (${Object.keys(ptGroup).length} keys) ==================`);
  for (const k in ptGroup) {
    console.log(`${k}: ${ptGroup[k]}`);
  }
}
