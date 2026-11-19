import { PARTS_1_TO_5 } from '../src/data/parts1to5.ts';

for (const part of PARTS_1_TO_5.slice(0, 2)) {
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
