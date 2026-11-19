export type NodeKind =
  | 'intro-part'
  | 'intro-section'
  | 'intro-topic'
  | 'part'
  | 'chapter'
  | 'subchapter'
  | 'topic'
  | 'appendix-root'
  | 'appendix'
  | 'appendix-section';

export interface BookTopic {
  id: string;
  code: string;
  title: string;
  slug: string;
}

export interface BookSubchapter {
  id: string;
  code: string;
  title: string;
  slug: string;
  topics: BookTopic[];
}

export interface BookChapter {
  id: string;
  number: number;
  code: string;
  title: string;
  hours: number;
  slug: string;
  partNumber: number;
  subchapters: BookSubchapter[];
}

export interface BookPart {
  id: string;
  number: number;
  code: string;
  title: string;
  shortTitle: string;
  slug: string;
  totalHours: number;
  chapters: BookChapter[];
}

export interface IntroSection {
  id: string;
  code: string;
  title: string;
  slug: string;
  topics: BookTopic[];
}

export interface BookIntroPart {
  id: string;
  number: 0;
  code: 'Part 00';
  title: string;
  shortTitle: string;
  slug: string;
  sections: IntroSection[];
}

export interface RoleGroup {
  id: string;
  title: string;
  roleTopicIds: string[];
}

export interface AppendixSection {
  id: string;
  code: string;
  title: string;
  slug: string;
}

export interface BookAppendix {
  id: string;
  letter: string;
  code: string;
  title: string;
  slug: string;
  sections: AppendixSection[];
}

export interface BreadcrumbItem {
  label: string;
  route: string;
}

export interface BookNode {
  id: string;
  kind: NodeKind;
  code: string;
  title: string;
  route: string;
  docId: string;
  isIntro?: boolean;
  partNumber?: number;
  partTitle?: string;
  partRoute?: string;
  chapterNumber?: number;
  chapterTitle?: string;
  chapterHours?: number;
  chapterRoute?: string;
  subchapterCode?: string;
  subchapterTitle?: string;
  subchapterRoute?: string;
  appendixLetter?: string;
  appendixTitle?: string;
  appendixRoute?: string;
  breadcrumbs: BreadcrumbItem[];
  prevId: string | null;
  nextId: string | null;
  orderIndex: number;
  outlineHeadings: Array<{ id: string; text: string; level: 2 | 3 }>;
}
