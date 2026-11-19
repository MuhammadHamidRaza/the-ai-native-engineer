import React from 'react';
import Link from '@docusaurus/Link';
import { ArrowRight, BookOpen, Home, Search } from 'lucide-react';
import { useBookContext } from '@site/src/context/BookContext';

export default function NotFoundContent(): React.ReactElement {
  const { openSearch } = useBookContext();

  return (
    <main className="max-w-[820px] mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
      <div className="text-xs font-mono text-[var(--accent)] mb-3">
        404 · Page Not Found
      </div>
      <h1 className="font-display text-3xl sm:text-5xl font-semibold text-[var(--ink-primary)] m-0">
        This section could not be found
      </h1>
      <p className="mt-4 text-base text-[var(--ink-secondary)] leading-relaxed max-w-xl">
        The requested book page or route may have moved. Use search or return to the book index
        to navigate across all 10 parts, 42 chapters, and 5 appendices.
      </p>

      <div className="mt-8 flex flex-wrap items-center gap-3">
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white text-sm font-medium no-underline transition-colors"
        >
          <Home className="w-4 h-4" aria-hidden="true" />
          <span>Return Home</span>
        </Link>

        <Link
          to="/structure"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-[var(--border-strong)] bg-[var(--bg-surface)] hover:border-[var(--accent)] text-[var(--ink-primary)] text-sm font-medium no-underline transition-colors"
        >
          <BookOpen className="w-4 h-4" aria-hidden="true" />
          <span>Book Structure</span>
          <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
        </Link>

        <button
          type="button"
          onClick={openSearch}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-[var(--border-hairline)] bg-[var(--bg-surface)] hover:border-[var(--border-strong)] text-[var(--ink-secondary)] hover:text-[var(--ink-primary)] text-sm font-medium cursor-pointer transition-colors"
        >
          <Search className="w-4 h-4" aria-hidden="true" />
          <span>Search Book</span>
        </button>
      </div>
    </main>
  );
}
