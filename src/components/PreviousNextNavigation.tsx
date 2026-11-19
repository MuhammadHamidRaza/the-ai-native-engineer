import React from 'react';
import Link from '@docusaurus/Link';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { NODE_BY_ID } from '@site/src/data/bookData';
import type { BookNode } from '@site/src/types/book';

export function PreviousNextNavigation({ node }: { node: BookNode }): React.ReactElement {
  const prevNode = node.prevId ? NODE_BY_ID[node.prevId] : null;
  const nextNode = node.nextId ? NODE_BY_ID[node.nextId] : null;

  return (
    <nav
      aria-label="Chapter and section pagination"
      className="mt-14 pt-8 border-t border-[var(--border-hairline)] grid grid-cols-1 sm:grid-cols-2 gap-4"
    >
      {prevNode ? (
        <Link
          to={prevNode.route}
          className="group p-4 rounded-xl border border-[var(--border-hairline)] bg-[var(--bg-surface)] hover:border-[var(--border-strong)] transition-all duration-150 no-underline flex flex-col justify-between"
        >
          <span className="inline-flex items-center gap-1.5 text-xs text-[var(--ink-muted)] mb-2">
            <ArrowLeft
              className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-0.5"
              aria-hidden="true"
            />
            <span>Previous</span>
          </span>
          <span className="text-sm font-medium text-[var(--ink-primary)] group-hover:text-[var(--accent)] transition-colors line-clamp-2">
            <span className="font-mono text-xs text-[var(--ink-muted)] mr-1.5">
              {prevNode.code}
            </span>
            {prevNode.title}
          </span>
        </Link>
      ) : (
        <div />
      )}

      {nextNode ? (
        <Link
          to={nextNode.route}
          className="group p-4 rounded-xl border border-[var(--border-hairline)] bg-[var(--bg-surface)] hover:border-[var(--border-strong)] transition-all duration-150 no-underline flex flex-col justify-between sm:items-end sm:text-right"
        >
          <span className="inline-flex items-center gap-1.5 text-xs text-[var(--ink-muted)] mb-2">
            <span>Next</span>
            <ArrowRight
              className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5"
              aria-hidden="true"
            />
          </span>
          <span className="text-sm font-medium text-[var(--ink-primary)] group-hover:text-[var(--accent)] transition-colors line-clamp-2">
            <span className="font-mono text-xs text-[var(--ink-muted)] mr-1.5">
              {nextNode.code}
            </span>
            {nextNode.title}
          </span>
        </Link>
      ) : (
        <div />
      )}
    </nav>
  );
}
