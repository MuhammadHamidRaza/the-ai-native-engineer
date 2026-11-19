import React from 'react';
import Link from '@docusaurus/Link';
import { Check, Circle } from 'lucide-react';
import { ALL_NODES, BOOK_META } from '@site/src/data/bookData';
import { useBookContext } from '@site/src/context/BookContext';
import type { BookNode } from '@site/src/types/book';

export function ChapterHeader({ node }: { node: BookNode }): React.ReactElement {
  const { visitedIds, completedIds, toggleCompleted } = useBookContext();
  const isCompleted = completedIds.has(node.id);
  const isVisited = visitedIds.has(node.id);

  return (
    <header className="pb-8 mb-8 border-b border-[var(--border-hairline)]">
      {/* Unboxed editorial metadata line (zero pills) */}
      <div className="flex flex-wrap items-center gap-2 text-xs text-[var(--ink-muted)] font-mono tabular-nums mb-3">
        {node.isIntro && node.partRoute ? (
          <>
            <Link
              to={node.partRoute}
              className="text-[var(--accent)] hover:underline no-underline font-medium"
            >
              Introductory Part · Part 00 · {node.partTitle}
            </Link>
            <span aria-hidden="true">/</span>
          </>
        ) : (
          node.partNumber !== undefined &&
          node.partRoute && (
            <>
              <Link
                to={node.partRoute}
                className="text-[var(--accent)] hover:underline no-underline font-medium"
              >
                Part {String(node.partNumber).padStart(2, '0')} · {node.partTitle}
              </Link>
              <span aria-hidden="true">/</span>
            </>
          )
        )}

        {node.kind === 'intro-topic' && node.subchapterRoute && node.subchapterCode && (
          <>
            <Link
              to={node.subchapterRoute}
              className="text-[var(--ink-secondary)] hover:text-[var(--ink-primary)] no-underline"
            >
              {node.subchapterCode} {node.subchapterTitle}
            </Link>
            <span aria-hidden="true">/</span>
          </>
        )}

        {node.chapterNumber !== undefined && node.chapterRoute && node.kind !== 'chapter' && (
          <>
            <Link
              to={node.chapterRoute}
              className="text-[var(--ink-secondary)] hover:text-[var(--ink-primary)] no-underline"
            >
              Chapter {String(node.chapterNumber).padStart(2, '0')}
            </Link>
            <span aria-hidden="true">/</span>
          </>
        )}

        {node.appendixLetter && node.appendixRoute && node.kind !== 'appendix' && (
          <>
            <Link
              to={node.appendixRoute}
              className="text-[var(--accent)] hover:underline no-underline font-medium"
            >
              Appendix {node.appendixLetter}
            </Link>
            <span aria-hidden="true">/</span>
          </>
        )}

        <span>{node.code}</span>

        {node.chapterHours !== undefined && (
          <>
            <span aria-hidden="true">·</span>
            <span>{node.chapterHours}h estimated</span>
          </>
        )}

        {node.chapterNumber !== undefined && (
          <>
            <span aria-hidden="true">·</span>
            <span>
              Chapter {node.chapterNumber} of {BOOK_META.totalChapters}
            </span>
          </>
        )}

        <span aria-hidden="true">·</span>
        <span>
          Page {node.orderIndex + 1} of {ALL_NODES.length}
        </span>
      </div>

      <h1 className="font-display text-3xl sm:text-4xl lg:text-[2.65rem] font-semibold tracking-tight text-[var(--ink-primary)] leading-[1.15] m-0">
        {node.title}
      </h1>

      <div className="mt-5 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-4 text-xs text-[var(--ink-muted)]">
          <span className="inline-flex items-center gap-1.5">
            <Circle
              className={`w-2 h-2 ${
                isVisited
                  ? 'fill-[var(--accent)] text-[var(--accent)]'
                  : 'text-[var(--ink-muted)]'
              }`}
              aria-hidden="true"
            />
            <span>{isVisited ? 'Visited in this browser' : 'Not yet visited'}</span>
          </span>
          {isCompleted && (
            <span className="inline-flex items-center gap-1 text-[var(--highlight)] font-medium">
              <Check className="w-3.5 h-3.5" aria-hidden="true" />
              <span>Marked complete</span>
            </span>
          )}
        </div>

        <button
          type="button"
          onClick={() => toggleCompleted(node.id)}
          className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg border text-xs font-medium transition-colors duration-150 cursor-pointer whitespace-nowrap shrink-0 ${
            isCompleted
              ? 'border-[var(--highlight)] bg-[var(--highlight-soft)] text-[var(--highlight)]'
              : 'border-[var(--border-hairline)] bg-[var(--bg-surface)] text-[var(--ink-secondary)] hover:text-[var(--ink-primary)] hover:border-[var(--border-strong)]'
          }`}
        >
          <Check className="w-3.5 h-3.5" aria-hidden="true" />
          <span>{isCompleted ? 'Completed' : 'Mark page complete'}</span>
        </button>
      </div>
    </header>
  );
}
