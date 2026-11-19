import React from 'react';
import Link from '@docusaurus/Link';
import { ArrowRight } from 'lucide-react';
import { getPartRoute } from '@site/src/data/bookData';
import type { BookPart } from '@site/src/types/book';

export function PartCard({ part }: { part: BookPart }): React.ReactElement {
  return (
    <Link
      to={getPartRoute(part)}
      className="group p-6 rounded-xl border border-[var(--border-hairline)] bg-[var(--bg-surface)] hover:border-[var(--accent)] transition-all duration-150 no-underline flex flex-col justify-between"
    >
      <div>
        <div className="flex items-center justify-between gap-2 text-xs font-mono text-[var(--ink-muted)] tabular-nums mb-3">
          <span className="text-[var(--accent)] font-medium">{part.code}</span>
          <span>
            {part.chapters.length} {part.chapters.length === 1 ? 'chapter' : 'chapters'} ·{' '}
            {part.totalHours}h
          </span>
        </div>

        <h3 className="font-display text-lg font-semibold text-[var(--ink-primary)] group-hover:text-[var(--accent)] transition-colors m-0 leading-snug">
          {part.title}
        </h3>

        <ul className="mt-4 space-y-1.5 list-none p-0 m-0">
          {part.chapters.slice(0, 3).map((ch) => (
            <li
              key={ch.id}
              className="text-xs text-[var(--ink-secondary)] truncate flex items-center gap-2"
            >
              <span className="font-mono text-[11px] text-[var(--ink-muted)] tabular-nums">
                {ch.code}
              </span>
              <span className="truncate">{ch.title}</span>
            </li>
          ))}
          {part.chapters.length > 3 && (
            <li className="text-xs text-[var(--ink-muted)]">
              + {part.chapters.length - 3} more chapters
            </li>
          )}
        </ul>
      </div>

      <div className="mt-6 pt-4 border-t border-[var(--border-hairline)] flex items-center justify-between text-xs font-medium text-[var(--ink-secondary)] group-hover:text-[var(--accent)] transition-colors">
        <span>Open part</span>
        <ArrowRight
          className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5"
          aria-hidden="true"
        />
      </div>
    </Link>
  );
}
