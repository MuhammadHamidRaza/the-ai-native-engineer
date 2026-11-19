import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, '..');
const DOCS_DIR = path.join(ROOT, 'docs');

const { PART_ZERO } = await import('../src/data/part00.ts');
const { PARTS_1_TO_5 } = await import('../src/data/parts1to5.ts');
const { PARTS_6_TO_10 } = await import('../src/data/parts6to10.ts');
const { APPENDICES } = await import('../src/data/appendices.ts');
const BOOK_PARTS = [...PARTS_1_TO_5, ...PARTS_6_TO_10];

function ensureDir(dirPath) {
  fs.mkdirSync(dirPath, { recursive: true });
}

function escapeYaml(str) {
  return `"${String(str).replace(/\\/g, '\\\\').replace(/"/g, '\\"')}"`;
}

function writeMdx(filePath, frontmatter, nodeId) {
  ensureDir(path.dirname(filePath));
  if (fs.existsSync(filePath)) {
    const existing = fs.readFileSync(filePath, 'utf8');
    if (existing.includes('</BookNodePage>')) {
      return;
    }
  }
  const lines = ['---'];
  for (const [key, val] of Object.entries(frontmatter)) {
    if (typeof val === 'boolean' || typeof val === 'number') {
      lines.push(`${key}: ${val}`);
    } else {
      lines.push(`${key}: ${escapeYaml(val)}`);
    }
  }
  lines.push('---', '', `<BookNodePage nodeId=${escapeYaml(nodeId)} />`, '');
  fs.writeFileSync(filePath, lines.join('\n'), 'utf8');
}

ensureDir(DOCS_DIR);

let totalFiles = 0;
let totalChapters = 0;
let totalHours = 0;
const sidebarItems = [];

let part00Files = 0;

// ---------------------------------------------------------------------------
// PART 00 — ABOUT THIS BOOK (Introductory part preceding 10-part curriculum)
// ---------------------------------------------------------------------------
const part00Dir = path.join(DOCS_DIR, PART_ZERO.slug);
const part00SlugRoute = `/${PART_ZERO.slug}`;

writeMdx(
  path.join(part00Dir, 'index.mdx'),
  {
    id: 'index',
    title: `${PART_ZERO.code}: ${PART_ZERO.title}`,
    sidebar_label: `${PART_ZERO.code} — ${PART_ZERO.title}`,
    slug: part00SlugRoute,
    hide_title: true,
    hide_table_of_contents: true,
  },
  PART_ZERO.id,
);
totalFiles += 1;
part00Files += 1;

const part00SidebarSections = [];
for (const sec of PART_ZERO.sections) {
  const secDir = path.join(part00Dir, sec.slug);
  const secSlugRoute = `${part00SlugRoute}/${sec.slug}`;

  writeMdx(
    path.join(secDir, 'index.mdx'),
    {
      id: 'index',
      title: `${sec.code} ${sec.title}`,
      sidebar_label: `${sec.code} ${sec.title}`,
      slug: secSlugRoute,
      hide_title: true,
      hide_table_of_contents: true,
    },
    sec.id,
  );
  totalFiles += 1;
  part00Files += 1;

  const topicDocIds = [];
  for (const topic of sec.topics) {
    const topicFile = path.join(secDir, `${topic.slug}.mdx`);
    const topicSlugRoute = `${secSlugRoute}/${topic.slug}`;
    writeMdx(
      topicFile,
      {
        id: topic.slug,
        title: `${topic.code} ${topic.title}`,
        sidebar_label: `${topic.code} ${topic.title}`,
        slug: topicSlugRoute,
        hide_title: true,
        hide_table_of_contents: true,
      },
      topic.id,
    );
    totalFiles += 1;
    part00Files += 1;
    topicDocIds.push(`${PART_ZERO.slug}/${sec.slug}/${topic.slug}`);
  }

  part00SidebarSections.push({
    type: 'category',
    label: `${sec.code} ${sec.title}`,
    link: { type: 'doc', id: `${PART_ZERO.slug}/${sec.slug}/index` },
    items: topicDocIds,
  });
}

sidebarItems.push({
  type: 'category',
  label: `${PART_ZERO.code} — ${PART_ZERO.title}`,
  link: { type: 'doc', id: `${PART_ZERO.slug}/index` },
  items: part00SidebarSections,
});

// ---------------------------------------------------------------------------
// PARTS 01–10 — MAIN CURRICULUM (42 Chapters | 592 Hours)
// ---------------------------------------------------------------------------
for (const part of BOOK_PARTS) {
  const partDir = path.join(DOCS_DIR, part.slug);
  const partSlugRoute = `/${part.slug}`;

  writeMdx(
    path.join(partDir, 'index.mdx'),
    {
      id: 'index',
      title: `${part.code}: ${part.title}`,
      sidebar_label: `${part.code} — ${part.title}`,
      slug: partSlugRoute,
      hide_title: true,
      hide_table_of_contents: true,
    },
    part.id,
  );
  totalFiles += 1;

  const chapterSidebarItems = [];

  for (const chapter of part.chapters) {
    totalChapters += 1;
    totalHours += chapter.hours;

    const chapterDir = path.join(partDir, chapter.slug);
    const chapterSlugRoute = `${partSlugRoute}/${chapter.slug}`;

    writeMdx(
      path.join(chapterDir, 'index.mdx'),
      {
        id: 'index',
        title: `${chapter.code}. ${chapter.title}`,
        sidebar_label: `${chapter.code}. ${chapter.title}`,
        slug: chapterSlugRoute,
        hide_title: true,
        hide_table_of_contents: true,
      },
      chapter.id,
    );
    totalFiles += 1;

    const subSidebarItems = [];

    for (const sub of chapter.subchapters) {
      const subDir = path.join(chapterDir, sub.slug);
      const subSlugRoute = `${chapterSlugRoute}/${sub.slug}`;

      writeMdx(
        path.join(subDir, 'index.mdx'),
        {
          id: 'index',
          title: `${sub.code} ${sub.title}`,
          sidebar_label: `${sub.code} ${sub.title}`,
          slug: subSlugRoute,
          hide_title: true,
          hide_table_of_contents: true,
        },
        sub.id,
      );
      totalFiles += 1;

      const topicDocIds = [];

      for (const topic of sub.topics) {
        const topicFile = path.join(subDir, `${topic.slug}.mdx`);
        const topicSlugRoute = `${subSlugRoute}/${topic.slug}`;

        writeMdx(
          topicFile,
          {
            id: topic.slug,
            title: `${topic.code} ${topic.title}`,
            sidebar_label: `${topic.code} ${topic.title}`,
            slug: topicSlugRoute,
            hide_title: true,
            hide_table_of_contents: true,
          },
          topic.id,
        );
        totalFiles += 1;
        topicDocIds.push(`${part.slug}/${chapter.slug}/${sub.slug}/${topic.slug}`);
      }

      subSidebarItems.push({
        type: 'category',
        label: `${sub.code} ${sub.title}`,
        link: { type: 'doc', id: `${part.slug}/${chapter.slug}/${sub.slug}/index` },
        items: topicDocIds,
      });
    }

    chapterSidebarItems.push({
      type: 'category',
      label: `${chapter.code}. ${chapter.title}`,
      link: { type: 'doc', id: `${part.slug}/${chapter.slug}/index` },
      items: subSidebarItems,
    });
  }

  sidebarItems.push({
    type: 'category',
    label: `${part.code} — ${part.title}`,
    link: { type: 'doc', id: `${part.slug}/index` },
    items: chapterSidebarItems,
  });
}

// ---------------------------------------------------------------------------
// APPENDICES A–E
// ---------------------------------------------------------------------------
const appendixDir = path.join(DOCS_DIR, 'appendix');
writeMdx(
  path.join(appendixDir, 'index.mdx'),
  {
    id: 'index',
    title: 'Appendices & Reference Materials',
    sidebar_label: 'Appendices',
    slug: '/appendix',
    hide_title: true,
    hide_table_of_contents: true,
  },
  'appendix-root',
);
totalFiles += 1;

const appendixSidebarItems = [];
for (const app of APPENDICES) {
  const appDir = path.join(appendixDir, app.slug);
  const appSlugRoute = `/appendix/${app.slug}`;

  writeMdx(
    path.join(appDir, 'index.mdx'),
    {
      id: 'index',
      title: `${app.code}: ${app.title}`,
      sidebar_label: `${app.code} — ${app.title}`,
      slug: appSlugRoute,
      hide_title: true,
      hide_table_of_contents: true,
    },
    app.id,
  );
  totalFiles += 1;

  const sectionIds = [];
  for (const sec of app.sections) {
    const secFile = path.join(appDir, `${sec.slug}.mdx`);
    const secSlugRoute = `${appSlugRoute}/${sec.slug}`;
    writeMdx(
      secFile,
      {
        id: sec.slug,
        title: `${sec.code} ${sec.title}`,
        sidebar_label: `${sec.code} ${sec.title}`,
        slug: secSlugRoute,
        hide_title: true,
        hide_table_of_contents: true,
      },
      sec.id,
    );
    totalFiles += 1;
    sectionIds.push(`appendix/${app.slug}/${sec.slug}`);
  }

  appendixSidebarItems.push({
    type: 'category',
    label: `${app.code} — ${app.title}`,
    link: { type: 'doc', id: `appendix/${app.slug}/index` },
    items: sectionIds,
  });
}

sidebarItems.push({
  type: 'category',
  label: 'Appendices',
  link: { type: 'doc', id: 'appendix/index' },
  items: appendixSidebarItems,
});

const sidebarsContent = `import type { SidebarsConfig } from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
  bookSidebar: ${JSON.stringify(sidebarItems, null, 2)},
};

export default sidebars;
`;

fs.writeFileSync(path.join(ROOT, 'sidebars.ts'), sidebarsContent, 'utf8');

console.log(
  `Generated ${totalFiles} MDX book pages (${part00Files} Part 00 intro pages + ${BOOK_PARTS.length} curriculum parts, ${totalChapters} chapters, ${totalHours} total hours, and ${APPENDICES.length} appendices).`,
);
