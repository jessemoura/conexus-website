import { pt } from '../src/i18n/pt.js';
import { en } from '../src/i18n/en.js';

console.log('=== CHECKING FOR MISALIGNMENTS ===');
for (const group in pt.autoContent) {
  const ptG = pt.autoContent[group];
  const enG = en.autoContent ? en.autoContent[group] : null;
  if (!enG) {
    console.log('Missing EN group:', group);
    continue;
  }

  let misaligned = false;
  const issues = [];
  for (const k in ptG) {
    const ptVal = (ptG[k] || '').trim();
    const enVal = (enG[k] || '').trim();
    
    // Check heuristics:
    // 1. PT is very short (< 30) but EN is long (> 70)
    // 2. PT is long (> 70) but EN is short (< 30)
    // 3. Question in PT (ends in '?') but EN does not, or vice versa
    if ((ptVal.length < 25 && enVal.length > 60) || (ptVal.length > 60 && enVal.length < 25)) {
      misaligned = true;
      issues.push(`  ${k}: [PT length ${ptVal.length}] "${ptVal.substring(0, 40)}..." vs [EN length ${enVal.length}] "${enVal.substring(0, 40)}..."`);
    }
  }

  if (misaligned) {
    console.log(`\nGroup [${group}] has misalignments (${issues.length} detected):`);
    issues.slice(0, 8).forEach(iss => console.log(iss));
  }
}
