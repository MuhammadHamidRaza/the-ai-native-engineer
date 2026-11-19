import React from 'react';
import Link from '@docusaurus/Link';
import { ArrowRight } from 'lucide-react';
import { BOOK_PARTS, getChapterRoute } from '@site/src/data/bookData';
import type { BookChapter } from '@site/src/types/book';

export function ChapterCard({ chapter }: { chapter: BookChapter }): React.ReactElement {
  const part = BOOK_PARTS.find((p) => p.number === chapter.partNumber)!;
  const route = getChapterRoute(part, chapter);

  return (
    <Link
      to={route}
      className="group p-5 rounded-xl border border-[var(--border-hairline)] bg-[var(--bg-surface)] hover:border-[var(--accent)] transition-all duration-150 no-underline flex flex-col justify-between"
    >
      <div>
        <div className="flex items-center justify-between gap-2 text-xs font-mono text-[var(--ink-muted)] tabular-nums mb-2.5">
          <span>
            Part {String(part.number).padStart(2, '0')} · Ch. {chapter.code}
          </span>
          <span className="text-[var(--accent)]">{chapter.hours}h</span>
        </div>

        <h3 className="font-display text-base font-semibold text-[var(--ink-primary)] group-hover:text-[var(--accent)] transition-colors m-0 leading-snug">
          {chapter.title}
        </h3>

        <div className="mt-3 text-xs text-[var(--ink-muted)] tabular-nums">
          {chapter.subchapters.length} subchapters ·{' '}
          {chapter.subchapters.reduce((acc, s) => acc + s.topics.length, 0)} topics
        </div>
      </div>

      <div className="mt-5 pt-3 border-t border-[var(--border-hairline)] flex items-center justify-between text-xs font-medium text-[var(--ink-secondary)] group-hover:text-[var(--accent)] transition-colors">
        <span>Open chapter</span>
        <ArrowRight
          className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5"
          aria-hidden="true"
        />
      </div>
    </Link>
  );
}
