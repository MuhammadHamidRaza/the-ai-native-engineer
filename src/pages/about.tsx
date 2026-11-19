import React from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import { ArrowRight } from 'lucide-react';
import { BOOK_META, LEARNING_PRINCIPLES, getIntroPartRoute } from '@site/src/data/bookData';
import { EmptyContentPlaceholder } from '@site/src/components/EmptyContentPlaceholder';
import { AnimatedSection } from '@site/src/components/AnimatedSection';

export default function AboutBookPage(): React.ReactElement {
  return (
    <Layout title="About the Book" description={`About ${BOOK_META.title} by ${BOOK_META.author}`}>
      <main className="max-w-[900px] mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <AnimatedSection>
          <div className="text-xs font-mono text-[var(--accent)] mb-3">
            Publication Overview
          </div>
          <h1 className="font-display text-3xl sm:text-5xl font-semibold text-[var(--ink-primary)] m-0">
            About the Book
          </h1>
          <p className="mt-4 font-display text-xl text-[var(--accent)] m-0">
            {BOOK_META.title} — {BOOK_META.subtitle}
          </p>
        </AnimatedSection>

        <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-5 rounded-xl border border-[var(--border-hairline)] bg-[var(--bg-surface)]">
            <div className="font-mono text-xs text-[var(--ink-muted)]">Author</div>
            <div className="mt-1 text-base font-semibold text-[var(--ink-primary)]">
              {BOOK_META.author}
            </div>
          </div>
          <div className="p-5 rounded-xl border border-[var(--border-hairline)] bg-[var(--bg-surface)]">
            <div className="font-mono text-xs text-[var(--ink-muted)]">Structure</div>
            <div className="mt-1 text-base font-semibold text-[var(--ink-primary)] tabular-nums">
              Part 00 Intro + {BOOK_META.totalParts} Parts · {BOOK_META.totalChapters} Chapters
            </div>
          </div>
          <div className="p-5 rounded-xl border border-[var(--border-hairline)] bg-[var(--bg-surface)]">
            <div className="font-mono text-xs text-[var(--ink-muted)]">Curriculum Volume</div>
            <div className="mt-1 text-base font-semibold text-[var(--ink-primary)] tabular-nums">
              {BOOK_META.totalHours} Learning Hours
            </div>
          </div>
        </div>

        <section className="mt-10 p-6 rounded-xl border border-[var(--border-hairline)] bg-[var(--bg-surface)]">
          <h2 className="font-display text-xl font-semibold text-[var(--ink-primary)] mb-4">
            Core Philosophy
          </h2>
          <ul className="space-y-2.5 list-none p-0 m-0">
            {LEARNING_PRINCIPLES.map((principle, idx) => (
              <li
                key={principle}
                className="flex items-center gap-3 text-sm text-[var(--ink-secondary)]"
              >
                <span className="font-mono text-xs text-[var(--accent)] tabular-nums">
                  {String(idx + 1).padStart(2, '0')}
                </span>
                <span>{principle}</span>
              </li>
            ))}
          </ul>
        </section>

        <EmptyContentPlaceholder sectionCode="About" title="About the Book" />

        <div className="mt-8 flex flex-wrap items-center gap-5">
          <Link
            to={getIntroPartRoute()}
            className="inline-flex items-center gap-1.5 text-sm font-medium text-[var(--accent)] hover:underline no-underline"
          >
            <span>Open Part 00 — About This Book (Inside Reader)</span>
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </Link>
          <Link
            to="/author"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-[var(--ink-secondary)] hover:text-[var(--ink-primary)] no-underline"
          >
            <span>About the Author</span>
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </Link>
          <Link
            to="/structure"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-[var(--ink-secondary)] hover:text-[var(--ink-primary)] no-underline"
          >
            <span>View Full Structure</span>
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </Link>
        </div>
      </main>
    </Layout>
  );
}
