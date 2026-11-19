import React from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import { ArrowRight, BookOpen, Compass, RotateCcw } from 'lucide-react';
import {
  BOOK_META,
  BOOK_PARTS,
  PART_ZERO,
  getIntroPartRoute,
  getPartRoute,
} from '@site/src/data/bookData';
import { useBookContext } from '@site/src/context/BookContext';
import { EmptyContentPlaceholder } from '@site/src/components/EmptyContentPlaceholder';
import { AnimatedSection } from '@site/src/components/AnimatedSection';

export default function StartHerePage(): React.ReactElement {
  const { lastVisitedRoute, overallStats, resetProgress } = useBookContext();

  return (
    <Layout title="Start Here" description={`Begin reading ${BOOK_META.title}`}>
      <main className="max-w-[1100px] mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <AnimatedSection>
          <div className="text-xs font-mono text-[var(--accent)] mb-3">
            Reader Orientation
          </div>
          <h1 className="font-display text-3xl sm:text-5xl font-semibold text-[var(--ink-primary)] m-0">
            Start Here
          </h1>
          <p className="mt-4 text-base text-[var(--ink-secondary)] max-w-2xl leading-relaxed">
            Begin with Part 00 — About This Book for orientation, philosophy, career roles, and
            tooling setup, then progress sequentially through Parts 01–10 across 638 focused
            learning hours.
          </p>
        </AnimatedSection>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-5">
          <Link
            to={getIntroPartRoute()}
            className="group p-6 rounded-xl border border-[var(--border-hairline)] bg-[var(--bg-surface)] hover:border-[var(--accent)] transition-colors no-underline flex flex-col justify-between"
          >
            <div>
              <div className="font-mono text-xs text-[var(--accent)] mb-2">
                Introductory Part · Begin Here
              </div>
              <h2 className="font-display text-xl font-semibold text-[var(--ink-primary)] group-hover:text-[var(--accent)] m-0">
                {PART_ZERO.code} — {PART_ZERO.title}
              </h2>
              <p className="mt-2 text-sm text-[var(--ink-secondary)]">
                {PART_ZERO.sections.length} introductory sections · precedes the 10-part, 638h
                curriculum
              </p>
            </div>
            <div className="mt-6 inline-flex items-center gap-1.5 text-xs font-medium text-[var(--accent)]">
              <span>Open Part 00</span>
              <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
            </div>
          </Link>

          <div className="p-6 rounded-xl border border-[var(--border-hairline)] bg-[var(--bg-surface)] flex flex-col justify-between">
            <div>
              <div className="font-mono text-xs text-[var(--ink-muted)] mb-2 tabular-nums">
                Local Browser Progress
              </div>
              <h2 className="font-display text-xl font-semibold text-[var(--ink-primary)] m-0">
                Reading Status
              </h2>
              <p className="mt-2 text-sm text-[var(--ink-secondary)] tabular-nums">
                {overallStats.visitedCount} visited · {overallStats.completedCount} marked complete
                of {overallStats.totalPages} pages
              </p>
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              {lastVisitedRoute ? (
                <Link
                  to={lastVisitedRoute}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white text-xs font-medium no-underline transition-colors"
                >
                  <Compass className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>Resume last visited</span>
                </Link>
              ) : (
                <Link
                  to="/book/part-01-foundations"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white text-xs font-medium no-underline transition-colors"
                >
                  <BookOpen className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>Jump to Part 01</span>
                </Link>
              )}

              {(overallStats.visitedCount > 0 || overallStats.completedCount > 0) && (
                <button
                  type="button"
                  onClick={resetProgress}
                  className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg border border-[var(--border-hairline)] text-xs text-[var(--ink-secondary)] hover:text-[var(--ink-primary)] cursor-pointer transition-colors"
                >
                  <RotateCcw className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>Reset local progress</span>
                </button>
              )}
            </div>
          </div>
        </div>

        <section className="mt-12">
          <h2 className="font-display text-xl font-semibold text-[var(--ink-primary)] mb-4">
            Quick Entry by Part
          </h2>
          <div className="divide-y divide-[var(--border-hairline)] border border-[var(--border-hairline)] rounded-xl bg-[var(--bg-surface)] overflow-hidden">
            <Link
              to={getIntroPartRoute()}
              className="group flex items-center justify-between gap-4 px-5 py-3.5 bg-[var(--bg-canvas)] hover:bg-[var(--bg-subtle)] transition-colors no-underline"
            >
              <div className="flex items-center gap-3 min-w-0">
                <span className="font-mono text-xs text-[var(--accent)] tabular-nums shrink-0">
                  {PART_ZERO.code}
                </span>
                <span className="text-sm font-medium text-[var(--ink-primary)] group-hover:text-[var(--accent)] truncate">
                  {PART_ZERO.title}
                </span>
              </div>
              <span className="font-mono text-xs text-[var(--ink-muted)] tabular-nums shrink-0">
                {PART_ZERO.sections.length} sections · Intro
              </span>
            </Link>

            {BOOK_PARTS.map((part) => (
              <Link
                key={part.id}
                to={getPartRoute(part)}
                className="group flex items-center justify-between gap-4 px-5 py-3.5 hover:bg-[var(--bg-subtle)] transition-colors no-underline"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <span className="font-mono text-xs text-[var(--accent)] tabular-nums shrink-0">
                    {part.code}
                  </span>
                  <span className="text-sm font-medium text-[var(--ink-primary)] group-hover:text-[var(--accent)] truncate">
                    {part.title}
                  </span>
                </div>
                <span className="font-mono text-xs text-[var(--ink-muted)] tabular-nums shrink-0">
                  {part.chapters.length} ch · {part.totalHours}h
                </span>
              </Link>
            ))}
          </div>
        </section>

        <EmptyContentPlaceholder sectionCode="Start Here" title="Orientation Guide" />
      </main>
    </Layout>
  );
}
