import React from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import { ArrowRight } from 'lucide-react';
import {
  BOOK_META,
  BOOK_PARTS,
  PART_ZERO,
  getChapterRoute,
  getIntroPartRoute,
  getPartRoute,
} from '@site/src/data/bookData';
import { AnimatedSection } from '@site/src/components/AnimatedSection';

export default function RoadmapPage(): React.ReactElement {
  return (
    <Layout title="Learning Roadmap" description="10-part progression across 638 focused hours">
      <main className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <AnimatedSection>
          <div className="text-xs font-mono text-[var(--accent)] mb-3 tabular-nums">
            {BOOK_META.totalParts} Parts · {BOOK_META.totalChapters} Chapters ·{' '}
            {BOOK_META.totalHours} Hours
          </div>
          <h1 className="font-display text-3xl sm:text-5xl font-semibold text-[var(--ink-primary)] m-0">
            Learning Roadmap
          </h1>
          <p className="mt-4 text-base text-[var(--ink-secondary)] max-w-2xl leading-relaxed">
            Begin with Part 00 orientation before entering the sequential 10-part curriculum from
            computing fundamentals through full-stack systems, cloud operations, AI agents, client
            acquisition, and capstone delivery.
          </p>
        </AnimatedSection>

        <AnimatedSection delay={0.02} className="mt-10">
          <div className="p-5 sm:p-6 rounded-2xl border border-[var(--border-hairline)] bg-[var(--bg-surface)] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="font-mono text-xs text-[var(--accent)] mb-1">
                Pre-Curriculum Orientation · {PART_ZERO.code}
              </div>
              <h2 className="font-display text-lg font-semibold text-[var(--ink-primary)] m-0">
                {PART_ZERO.title}
              </h2>
              <p className="mt-1 text-sm text-[var(--ink-secondary)] m-0">
                {PART_ZERO.sections.length} introductory sections covering landscape, 15 roles,
                learning paths, FDE lifecycle, and tooling setup.
              </p>
            </div>
            <Link
              to={getIntroPartRoute()}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg border border-[var(--border-strong)] hover:border-[var(--accent)] text-xs font-medium text-[var(--ink-primary)] no-underline transition-colors whitespace-nowrap shrink-0"
            >
              <span>Open {PART_ZERO.code}</span>
              <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
            </Link>
          </div>
        </AnimatedSection>

        <div className="mt-6 space-y-6">
          {BOOK_PARTS.map((part, idx) => {
            const pct = Math.round((part.totalHours / BOOK_META.totalHours) * 100);
            return (
              <AnimatedSection key={part.id} delay={idx * 0.03}>
                <div className="p-6 sm:p-8 rounded-2xl border border-[var(--border-hairline)] bg-[var(--bg-surface)]">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-[var(--border-hairline)]">
                    <div>
                      <div className="font-mono text-xs text-[var(--accent)] tabular-nums mb-1">
                        {part.code} · {part.chapters.length}{' '}
                        {part.chapters.length === 1 ? 'chapter' : 'chapters'} · {part.totalHours}h (
                        {pct}% of curriculum)
                      </div>
                      <h2 className="font-display text-2xl font-semibold text-[var(--ink-primary)] m-0">
                        {part.title}
                      </h2>
                    </div>
                    <Link
                      to={getPartRoute(part)}
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg border border-[var(--border-strong)] hover:border-[var(--accent)] text-xs font-medium text-[var(--ink-primary)] no-underline transition-colors whitespace-nowrap shrink-0"
                    >
                      <span>Open {part.code}</span>
                      <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                    </Link>
                  </div>

                  {/* Proportional time bar */}
                  <div className="mt-4 mb-5 h-1.5 rounded-full bg-[var(--bg-subtle)] overflow-hidden">
                    <div
                      className="h-full rounded-full bg-[var(--accent)]"
                      style={{ width: `${Math.max(4, pct * 3)}%` }}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                    {part.chapters.map((ch) => (
                      <Link
                        key={ch.id}
                        to={getChapterRoute(part, ch)}
                        className="group p-4 rounded-xl border border-[var(--border-hairline)] bg-[var(--bg-canvas)] hover:border-[var(--accent)] transition-colors no-underline flex flex-col justify-between"
                      >
                        <div>
                          <div className="font-mono text-xs text-[var(--ink-muted)] tabular-nums mb-1.5">
                            Chapter {ch.code} · {ch.hours}h
                          </div>
                          <div className="text-sm font-medium text-[var(--ink-primary)] group-hover:text-[var(--accent)] transition-colors">
                            {ch.title}
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              </AnimatedSection>
            );
          })}
        </div>
      </main>
    </Layout>
  );
}
