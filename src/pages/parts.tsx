import React from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import { ArrowRight } from 'lucide-react';
import {
  BOOK_META,
  BOOK_PARTS,
  PART_ZERO,
  getIntroPartRoute,
  getIntroSectionRoute,
} from '@site/src/data/bookData';
import { PartCard } from '@site/src/components/PartCard';
import { AnimatedSection } from '@site/src/components/AnimatedSection';

export default function AllPartsPage(): React.ReactElement {
  return (
    <Layout
      title="All Parts"
      description="Browse Part 00 introduction and all 10 curriculum parts of The AI-Native Engineer"
    >
      <main className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <AnimatedSection>
          <div className="text-xs font-mono text-[var(--accent)] mb-3 tabular-nums">
            Part 00 Intro + {BOOK_META.totalParts} Curriculum Parts · {BOOK_META.totalHours} Total
            Hours
          </div>
          <h1 className="font-display text-3xl sm:text-5xl font-semibold text-[var(--ink-primary)] m-0">
            All Parts
          </h1>
          <p className="mt-4 text-base text-[var(--ink-secondary)] max-w-2xl">
            Begin with Part 00 to understand the philosophy, landscape, career roles, and
            tooling, then progress through Parts 01–10 from computing foundations to production AI
            engineering.
          </p>
        </AnimatedSection>

        <AnimatedSection className="mt-10" delay={0.02}>
          <div className="p-6 sm:p-8 rounded-2xl border border-[var(--border-hairline)] bg-[var(--bg-surface)]">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-[var(--border-hairline)]">
              <div>
                <div className="font-mono text-xs text-[var(--accent)] mb-1">
                  Introductory Part · Precedes Part 01
                </div>
                <h2 className="font-display text-2xl font-semibold text-[var(--ink-primary)] m-0">
                  {PART_ZERO.code} — {PART_ZERO.title}
                </h2>
                <p className="mt-1.5 text-sm text-[var(--ink-secondary)] m-0">
                  {PART_ZERO.sections.length} orientation sections covering book philosophy,
                  engineering roles, learning paths, FDE lifecycle, and setup.
                </p>
              </div>
              <Link
                to={getIntroPartRoute()}
                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-lg bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white text-xs font-medium no-underline transition-colors whitespace-nowrap shrink-0"
              >
                <span>Open Part 00</span>
                <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
              </Link>
            </div>

            <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
              {PART_ZERO.sections.map((sec) => (
                <Link
                  key={sec.id}
                  to={getIntroSectionRoute(sec.slug)}
                  className="group px-3.5 py-2.5 rounded-lg border border-[var(--border-hairline)] bg-[var(--bg-canvas)] hover:border-[var(--accent)] transition-colors no-underline flex items-center justify-between gap-2"
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <span className="font-mono text-xs text-[var(--accent)] tabular-nums shrink-0">
                      {sec.code}
                    </span>
                    <span className="text-xs font-medium text-[var(--ink-primary)] group-hover:text-[var(--accent)] truncate">
                      {sec.title}
                    </span>
                  </div>
                  <span className="font-mono text-[11px] text-[var(--ink-muted)] tabular-nums shrink-0">
                    {sec.topics.length}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </AnimatedSection>

        <div className="mt-10 mb-5 text-xs font-mono text-[var(--ink-muted)] tabular-nums">
          Core Curriculum · {BOOK_META.totalParts} Parts · {BOOK_META.totalChapters} Chapters ·{' '}
          {BOOK_META.totalHours} Hours
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {BOOK_PARTS.map((part, idx) => (
            <AnimatedSection key={part.id} delay={idx * 0.03}>
              <PartCard part={part} />
            </AnimatedSection>
          ))}
        </div>
      </main>
    </Layout>
  );
}
