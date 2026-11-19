import React, { useMemo, useState } from 'react';
import Layout from '@theme/Layout';
import { Search } from 'lucide-react';
import { ALL_CHAPTERS, BOOK_META, BOOK_PARTS } from '@site/src/data/bookData';
import { ChapterCard } from '@site/src/components/ChapterCard';
import { AnimatedSection } from '@site/src/components/AnimatedSection';

export default function AllChaptersPage(): React.ReactElement {
  const [selectedPart, setSelectedPart] = useState<number | 'all'>('all');
  const [query, setQuery] = useState('');

  const filteredChapters = useMemo(() => {
    const q = query.trim().toLowerCase();
    return ALL_CHAPTERS.filter((ch) => {
      if (selectedPart !== 'all' && ch.partNumber !== selectedPart) return false;
      if (!q) return true;
      return `${ch.code} ${ch.title}`.toLowerCase().includes(q);
    });
  }, [selectedPart, query]);

  return (
    <Layout title="All Chapters" description="Browse all 42 chapters of The AI-Native Engineer">
      <main className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <AnimatedSection>
          <div className="text-xs font-mono text-[var(--accent)] mb-3 tabular-nums">
            {BOOK_META.totalChapters} Chapters · {BOOK_META.totalHours} Total Hours
          </div>
          <h1 className="font-display text-3xl sm:text-5xl font-semibold text-[var(--ink-primary)] m-0">
            All Chapters
          </h1>
        </AnimatedSection>

        {/* Filter & Search Bar */}
        <div className="mt-8 flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b border-[var(--border-hairline)]">
          <div className="flex flex-wrap items-center gap-1.5">
            <button
              type="button"
              onClick={() => setSelectedPart('all')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer whitespace-nowrap ${
                selectedPart === 'all'
                  ? 'bg-[var(--accent)] text-white'
                  : 'bg-[var(--bg-surface)] border border-[var(--border-hairline)] text-[var(--ink-secondary)] hover:text-[var(--ink-primary)]'
              }`}
            >
              All Parts
            </button>
            {BOOK_PARTS.map((part) => (
              <button
                key={part.id}
                type="button"
                onClick={() => setSelectedPart(part.number)}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-colors cursor-pointer whitespace-nowrap tabular-nums ${
                  selectedPart === part.number
                    ? 'bg-[var(--accent)] text-white'
                    : 'bg-[var(--bg-surface)] border border-[var(--border-hairline)] text-[var(--ink-secondary)] hover:text-[var(--ink-primary)]'
                }`}
              >
                P{String(part.number).padStart(2, '0')}
              </button>
            ))}
          </div>

          <div className="relative w-full lg:w-72 shrink-0">
            <Search
              className="w-4 h-4 text-[var(--ink-muted)] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none"
              aria-hidden="true"
            />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Filter chapters..."
              aria-label="Filter chapters by title or number"
              className="w-full h-10 pl-9 pr-4 rounded-lg border border-[var(--border-hairline)] bg-[var(--bg-surface)] text-sm text-[var(--ink-primary)] placeholder:text-[var(--ink-muted)] focus:outline-none focus:border-[var(--accent)]"
            />
          </div>
        </div>

        {filteredChapters.length === 0 ? (
          <div className="py-16 text-center text-sm text-[var(--ink-muted)]">
            No chapters match your current filter.
          </div>
        ) : (
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredChapters.map((chapter) => (
              <ChapterCard key={chapter.id} chapter={chapter} />
            ))}
          </div>
        )}
      </main>
    </Layout>
  );
}
