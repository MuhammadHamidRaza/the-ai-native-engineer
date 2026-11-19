import { PART_ZERO } from '../src/data/part00.ts';
import { PARTS_1_TO_5 } from '../src/data/parts1to5.ts';

console.log('# Part 00: ' + PART_ZERO.title);
for (const sec of PART_ZERO.sections) {
  console.log(`  ## Section ${sec.code}: ${sec.title}`);
  for (const t of sec.topics) {
    console.log(`    - [${t.code}] ${t.title}`);
  }
}

for (const part of PARTS_1_TO_5) {
  console.log(`\n# ${part.code}: ${part.title} (${part.totalHours} Hours, ${part.chapters.length} Chapters)`);
  for (const ch of part.chapters) {
    console.log(`  ## Chapter ${ch.code}: ${ch.title} (${ch.hours}h)`);
    for (const sub of ch.subchapters) {
      console.log(`    ### Subchapter ${sub.code}: ${sub.title}`);
      for (const t of sub.topics) {
        console.log(`      - [${t.code}] ${t.title}`);
      }
    }
  }
}
