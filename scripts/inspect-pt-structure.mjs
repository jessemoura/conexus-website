import { pt } from '../src/i18n/pt.js';

console.log('Top level keys in pt.js:');
for (const k in pt) {
  if (typeof pt[k] === 'object' && pt[k] !== null) {
    if (k === 'autoContent') {
      console.log(`  - autoContent (${Object.keys(pt.autoContent).length} groups):`);
      for (const g in pt.autoContent) {
        console.log(`      * ${g}: ${Object.keys(pt.autoContent[g]).length} keys`);
      }
    } else {
      console.log(`  - ${k}: ${Object.keys(pt[k]).length} keys`);
    }
  } else {
    console.log(`  - ${k} = "${pt[k]}"`);
  }
}
