import { FDE_LIFECYCLE, PART_ZERO, ROLE_GROUPS } from './part00';
import { PARTS_1_TO_5 } from './parts1to5';
import { PARTS_6_TO_10 } from './parts6to10';
import { APPENDICES } from './appendices';
import type { BookChapter, BookNode, BookPart } from '../types/book';

export const BOOK_META = {
  title: 'The AI-Native Engineer',
  subtitle: 'Think. Build. Solve. Ship.',
  author: 'Hamid Raza',
  authorShort: 'Hamid Raza',
  totalParts: 10,
  totalChapters: 42,
  totalHours: 638,
  githubRepoPlaceholder: 'https://github.com/YOUR_GITHUB_USERNAME/the-ai-native-engineer',
};

export const LEARNING_PRINCIPLES: string[] = [
  'Understand before building.',
  'Engineering fundamentals matter.',
  'AI should enhance engineering, not replace it.',
  'Build real systems.',
  'Verify what AI produces.',
  'Solve actual business problems.',
  'Deliver measurable outcomes.',
];

export const JOURNEY_STAGES: Array<{ label: string; partNumber: number; route: string }> = [
  { label: 'Foundations', partNumber: 1, route: '/book/part-01-foundations' },
  { label: 'Software Engineering', partNumber: 2, route: '/book/part-02-javascript-and-frontend-development' },
  { label: 'Cloud', partNumber: 5, route: '/book/part-05-deployment-cloud-and-devops' },
  { label: 'Production', partNumber: 6, route: '/book/part-06-system-design-and-production-quality' },
  { label: 'AI', partNumber: 7, route: '/book/part-07-ai-native-software-development' },
  { label: 'Agents', partNumber: 8, route: '/book/part-08-ai-applications-agents-mcp-and-automation' },
  { label: 'Automation', partNumber: 8, route: '/book/part-08-ai-applications-agents-mcp-and-automation/33-n8n-workflow-automation' },
  { label: 'Client Delivery', partNumber: 9, route: '/book/part-09-career-client-work-products-and-startups/39-client-discovery-freelancing-and-client-acquisition' },
  { label: 'Products', partNumber: 10, route: '/book/part-10-integrated-capstone' },
];

export { FDE_LIFECYCLE, PART_ZERO, ROLE_GROUPS };
export const BOOK_PARTS: BookPart[] = [...PARTS_1_TO_5, ...PARTS_6_TO_10];
export { APPENDICES };

export const ALL_CHAPTERS: BookChapter[] = BOOK_PARTS.flatMap((part) => part.chapters);

export const FEATURED_CHAPTER_NUMBERS = [1, 7, 15, 21, 27, 30, 32, 39, 42];
export const FEATURED_CHAPTERS: BookChapter[] = FEATURED_CHAPTER_NUMBERS
  .map((num) => ALL_CHAPTERS.find((c) => c.number === num))
  .filter((c): c is BookChapter => Boolean(c));

function buildGraph(): {
  nodes: BookNode[];
  byId: Record<string, BookNode>;
  byRoute: Record<string, BookNode>;
} {
  const nodes: BookNode[] = [];

  // Part 00 — About This Book (introductory part preceding the 10-part curriculum)
  const introRoute = `/book/${PART_ZERO.slug}`;
  nodes.push({
    id: PART_ZERO.id,
    kind: 'intro-part',
    code: PART_ZERO.code,
    title: PART_ZERO.title,
    route: introRoute,
    docId: `${PART_ZERO.slug}/index`,
    isIntro: true,
    partNumber: 0,
    partTitle: PART_ZERO.title,
    partRoute: introRoute,
    breadcrumbs: [
      { label: 'Book', route: '/parts' },
      { label: `${PART_ZERO.code}: ${PART_ZERO.title}`, route: introRoute },
    ],
    prevId: null,
    nextId: null,
    orderIndex: nodes.length,
    outlineHeadings: [
      { id: 'intro-sections', text: 'Introductory Sections', level: 2 },
      { id: 'content-area', text: 'Introduction Notes', level: 2 },
    ],
  });

  for (const sec of PART_ZERO.sections) {
    const secRoute = `${introRoute}/${sec.slug}`;
    nodes.push({
      id: sec.id,
      kind: 'intro-section',
      code: sec.code,
      title: sec.title,
      route: secRoute,
      docId: `${PART_ZERO.slug}/${sec.slug}/index`,
      isIntro: true,
      partNumber: 0,
      partTitle: PART_ZERO.title,
      partRoute: introRoute,
      subchapterCode: sec.code,
      subchapterTitle: sec.title,
      subchapterRoute: secRoute,
      breadcrumbs: [
        { label: PART_ZERO.code, route: introRoute },
        { label: `${sec.code} ${sec.title}`, route: secRoute },
      ],
      prevId: null,
      nextId: null,
      orderIndex: nodes.length,
      outlineHeadings: [
        { id: 'topics', text: 'Topics in This Section', level: 2 },
        { id: 'content-area', text: 'Section Content', level: 2 },
      ],
    });

    for (const topic of sec.topics) {
      const topicRoute = `${secRoute}/${topic.slug}`;
      const topicOutline =
        topic.id === 'topic-00-11-1'
          ? [
              { id: 'sec-00-11-1-1', text: '00.11.1.1 Development Computer', level: 2 as const },
              { id: 'sec-00-11-1-2', text: '00.11.1.2 Processor (CPU)', level: 2 as const },
              { id: 'sec-00-11-1-3', text: '00.11.1.3 RAM & Memory', level: 2 as const },
              { id: 'sec-00-11-1-4', text: '00.11.1.4 Storage', level: 2 as const },
              { id: 'sec-00-11-1-5', text: '00.11.1.5 Operating Systems', level: 2 as const },
              { id: 'sec-00-11-1-6', text: '00.11.1.6 Internet & Connectivity', level: 2 as const },
              { id: 'sec-00-11-1-7', text: '00.11.1.7 Tools & Software', level: 2 as const },
              { id: 'sec-00-11-1-8', text: '00.11.1.8 Frontend & Full-Stack', level: 2 as const },
              { id: 'sec-00-11-1-9', text: '00.11.1.9 Python & AI', level: 2 as const },
              { id: 'sec-00-11-1-10', text: '00.11.1.10 Docker & Virtualization', level: 2 as const },
              { id: 'sec-00-11-1-11', text: '00.11.1.11 Recommended Specs', level: 2 as const },
              { id: 'sec-00-11-1-12', text: '00.11.1.12 Low-Spec Computers', level: 2 as const },
              { id: 'sec-00-11-1-13', text: '00.11.1.13 Upgrade Priorities', level: 2 as const },
              { id: 'sec-00-11-1-14', text: '00.11.1.14 Readiness Checklist', level: 2 as const },
              { id: 'sec-00-11-1-15', text: '00.11.1.15 Takeaways & Reading', level: 2 as const },
            ]
          : [
              { id: 'content-area', text: 'Topic Content', level: 2 as const },
              { id: 'notes-placeholder', text: 'Authoring Space', level: 3 as const },
            ];
      nodes.push({
        id: topic.id,
        kind: 'intro-topic',
        code: topic.code,
        title: topic.title,
        route: topicRoute,
        docId: `${PART_ZERO.slug}/${sec.slug}/${topic.slug}`,
        isIntro: true,
        partNumber: 0,
        partTitle: PART_ZERO.title,
        partRoute: introRoute,
        subchapterCode: sec.code,
        subchapterTitle: sec.title,
        subchapterRoute: secRoute,
        breadcrumbs: [
          { label: PART_ZERO.code, route: introRoute },
          { label: sec.code, route: secRoute },
          { label: `${topic.code} ${topic.title}`, route: topicRoute },
        ],
        prevId: null,
        nextId: null,
        orderIndex: nodes.length,
        outlineHeadings: topicOutline,
      });
    }
  }

  // Main 10-Part Curriculum
  for (const part of BOOK_PARTS) {
    const partRoute = `/book/${part.slug}`;
    const partDocId = `${part.slug}/index`;

    nodes.push({
      id: part.id,
      kind: 'part',
      code: part.code,
      title: part.title,
      route: partRoute,
      docId: partDocId,
      partNumber: part.number,
      partTitle: part.title,
      partRoute,
      chapterHours: part.totalHours,
      breadcrumbs: [
        { label: 'Book', route: '/parts' },
        { label: `${part.code}: ${part.title}`, route: partRoute },
      ],
      prevId: null,
      nextId: null,
      orderIndex: nodes.length,
      outlineHeadings: [
        { id: 'overview', text: 'Part Overview', level: 2 },
        { id: 'chapters', text: 'Chapters in This Part', level: 2 },
        { id: 'content-area', text: 'Part Notes', level: 2 },
      ],
    });

    for (const chapter of part.chapters) {
      const chapterRoute = `${partRoute}/${chapter.slug}`;
      const chapterDocId = `${part.slug}/${chapter.slug}/index`;

      nodes.push({
        id: chapter.id,
        kind: 'chapter',
        code: `Chapter ${chapter.code}`,
        title: chapter.title,
        route: chapterRoute,
        docId: chapterDocId,
        partNumber: part.number,
        partTitle: part.title,
        partRoute,
        chapterNumber: chapter.number,
        chapterTitle: chapter.title,
        chapterHours: chapter.hours,
        chapterRoute,
        breadcrumbs: [
          { label: 'Book', route: '/parts' },
          { label: `${part.code}: ${part.shortTitle}`, route: partRoute },
          { label: `Chapter ${chapter.code}: ${chapter.title}`, route: chapterRoute },
        ],
        prevId: null,
        nextId: null,
        orderIndex: nodes.length,
        outlineHeadings: [
          { id: 'chapter-outline', text: 'Chapter Structure', level: 2 },
          { id: 'content-area', text: 'Chapter Content', level: 2 },
        ],
      });

      for (const sub of chapter.subchapters) {
        const subRoute = `${chapterRoute}/${sub.slug}`;
        const subDocId = `${part.slug}/${chapter.slug}/${sub.slug}/index`;

        nodes.push({
          id: sub.id,
          kind: 'subchapter',
          code: sub.code,
          title: sub.title,
          route: subRoute,
          docId: subDocId,
          partNumber: part.number,
          partTitle: part.title,
          partRoute,
          chapterNumber: chapter.number,
          chapterTitle: chapter.title,
          chapterHours: chapter.hours,
          chapterRoute,
          subchapterCode: sub.code,
          subchapterTitle: sub.title,
          subchapterRoute: subRoute,
          breadcrumbs: [
            { label: part.code, route: partRoute },
            { label: `Ch. ${chapter.code}`, route: chapterRoute },
            { label: `${sub.code} ${sub.title}`, route: subRoute },
          ],
          prevId: null,
          nextId: null,
          orderIndex: nodes.length,
          outlineHeadings: [
            { id: 'topics', text: 'Topics in This Section', level: 2 },
            { id: 'content-area', text: 'Section Content', level: 2 },
          ],
        });

        for (const topic of sub.topics) {
          const topicRoute = `${subRoute}/${topic.slug}`;
          const topicDocId = `${part.slug}/${chapter.slug}/${sub.slug}/${topic.slug}`;

          nodes.push({
            id: topic.id,
            kind: 'topic',
            code: topic.code,
            title: topic.title,
            route: topicRoute,
            docId: topicDocId,
            partNumber: part.number,
            partTitle: part.title,
            partRoute,
            chapterNumber: chapter.number,
            chapterTitle: chapter.title,
            chapterHours: chapter.hours,
            chapterRoute,
            subchapterCode: sub.code,
            subchapterTitle: sub.title,
            subchapterRoute: subRoute,
            breadcrumbs: [
              { label: part.code, route: partRoute },
              { label: `Ch. ${chapter.code}`, route: chapterRoute },
              { label: sub.code, route: subRoute },
              { label: `${topic.code} ${topic.title}`, route: topicRoute },
            ],
            prevId: null,
            nextId: null,
            orderIndex: nodes.length,
            outlineHeadings: [
              { id: 'content-area', text: 'Topic Content', level: 2 },
              { id: 'notes-placeholder', text: 'Authoring Space', level: 3 },
            ],
          });
        }
      }
    }
  }

  // Appendix root
  nodes.push({
    id: 'appendix-root',
    kind: 'appendix-root',
    code: 'Appendix',
    title: 'Appendices & Reference Materials',
    route: '/book/appendix',
    docId: 'appendix/index',
    breadcrumbs: [
      { label: 'Book', route: '/parts' },
      { label: 'Appendices', route: '/book/appendix' },
    ],
    prevId: null,
    nextId: null,
    orderIndex: nodes.length,
    outlineHeadings: [
      { id: 'appendix-index', text: 'All Appendices', level: 2 },
      { id: 'content-area', text: 'Reference Notes', level: 2 },
    ],
  });

  for (const app of APPENDICES) {
    const appRoute = `/book/appendix/${app.slug}`;
    const appDocId = `appendix/${app.slug}/index`;

    nodes.push({
      id: app.id,
      kind: 'appendix',
      code: app.code,
      title: app.title,
      route: appRoute,
      docId: appDocId,
      appendixLetter: app.letter,
      appendixTitle: app.title,
      appendixRoute: appRoute,
      breadcrumbs: [
        { label: 'Appendices', route: '/book/appendix' },
        { label: `${app.code}: ${app.title}`, route: appRoute },
      ],
      prevId: null,
      nextId: null,
      orderIndex: nodes.length,
      outlineHeadings: [
        { id: 'appendix-sections', text: 'Sections', level: 2 },
        { id: 'content-area', text: 'Appendix Content', level: 2 },
      ],
    });

    for (const sec of app.sections) {
      const secRoute = `${appRoute}/${sec.slug}`;
      const secDocId = `appendix/${app.slug}/${sec.slug}`;

      nodes.push({
        id: sec.id,
        kind: 'appendix-section',
        code: sec.code,
        title: sec.title,
        route: secRoute,
        docId: secDocId,
        appendixLetter: app.letter,
        appendixTitle: app.title,
        appendixRoute: appRoute,
        breadcrumbs: [
          { label: 'Appendices', route: '/book/appendix' },
          { label: app.code, route: appRoute },
          { label: `${sec.code} ${sec.title}`, route: secRoute },
        ],
        prevId: null,
        nextId: null,
        orderIndex: nodes.length,
        outlineHeadings: [
          { id: 'content-area', text: 'Section Content', level: 2 },
        ],
      });
    }
  }

  for (let i = 0; i < nodes.length; i += 1) {
    nodes[i].prevId = i > 0 ? nodes[i - 1].id : null;
    nodes[i].nextId = i < nodes.length - 1 ? nodes[i + 1].id : null;
  }

  const byId: Record<string, BookNode> = {};
  const byRoute: Record<string, BookNode> = {};
  for (const node of nodes) {
    byId[node.id] = node;
    byRoute[node.route] = node;
  }

  return { nodes, byId, byRoute };
}

const graph = buildGraph();

export const ALL_NODES = graph.nodes;
export const NODE_BY_ID = graph.byId;
export const NODE_BY_ROUTE = graph.byRoute;

export function getIntroPartRoute(): string {
  return `/book/${PART_ZERO.slug}`;
}

export function getIntroSectionRoute(secSlug: string): string {
  return `/book/${PART_ZERO.slug}/${secSlug}`;
}

export function getIntroTopicRoute(secSlug: string, topicSlug: string): string {
  return `/book/${PART_ZERO.slug}/${secSlug}/${topicSlug}`;
}

export function getPartRoute(part: BookPart): string {
  return `/book/${part.slug}`;
}

export function getChapterRoute(part: BookPart, chapter: BookChapter): string {
  return `/book/${part.slug}/${chapter.slug}`;
}

export function getSubchapterRoute(partSlug: string, chapterSlug: string, subSlug: string): string {
  return `/book/${partSlug}/${chapterSlug}/${subSlug}`;
}

export function getTopicRoute(partSlug: string, chapterSlug: string, subSlug: string, topicSlug: string): string {
  return `/book/${partSlug}/${chapterSlug}/${subSlug}/${topicSlug}`;
}

export function findNodeByPermalink(permalink: string): BookNode | undefined {
  const normalized = permalink.replace(/\/+$/, '') || '/';
  const bookIdx = normalized.indexOf('/book/');
  const candidate = bookIdx >= 0 ? normalized.slice(bookIdx) : normalized;
  return NODE_BY_ROUTE[candidate];
}
