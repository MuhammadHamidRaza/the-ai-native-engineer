import React from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import { ArrowRight } from 'lucide-react';
import { APPENDICES, BOOK_META } from '@site/src/data/bookData';
import { BookOutline } from '@site/src/components/BookOutline';
import { AnimatedSection } from '@site/src/components/AnimatedSection';

export default function StructurePage(): React.ReactElement {
  return (
    <Layout title="Book Structure" description="Complete hierarchical outline of The AI-Native Engineer">
      <main className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <AnimatedSection>
          <div className="text-xs font-mono text-[var(--accent)] mb-3 tabular-nums">
            Complete Architecture · Part 00 Intro + {BOOK_META.totalParts} Curriculum Parts ·{' '}
            {BOOK_META.totalChapters} Chapters · {BOOK_META.totalHours} Hours
          </div>
          <h1 className="font-display text-3xl sm:text-5xl font-semibold text-[var(--ink-primary)] m-0">
            Book Structure
          </h1>
          <p className="mt-4 text-base text-[var(--ink-secondary)] max-w-2xl leading-relaxed">
            Expand any part, chapter, or subchapter below to inspect the full four-level hierarchy
            and jump directly to any page.
          </p>
        </AnimatedSection>

        <div className="mt-10">
          <BookOutline />
        </div>

        <section className="mt-14">
          <h2 className="font-display text-2xl font-semibold text-[var(--ink-primary)] mb-5">
            Appendices Structure
          </h2>
          <div className="space-y-4">
            {APPENDICES.map((app) => (
              <div
                key={app.id}
                className="p-6 rounded-xl border border-[var(--border-hairline)] bg-[var(--bg-surface)]"
              >
                <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-[var(--border-hairline)]">
                  <div>
                    <div className="font-mono text-xs text-[var(--accent)]">{app.code}</div>
                    <h3 className="font-display text-lg font-semibold text-[var(--ink-primary)] m-0 mt-0.5">
                      {app.title}
                    </h3>
                  </div>
                  <Link
                    to={`/book/appendix/${app.slug}`}
                    className="inline-flex items-center gap-1.5 text-xs font-medium text-[var(--accent)] hover:underline no-underline"
                  >
                    <span>Open appendix</span>
                    <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                  </Link>
                </div>

                <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                  {app.sections.map((sec) => (
                    <Link
                      key={sec.id}
                      to={`/book/appendix/${app.slug}/${sec.slug}`}
                      className="px-3 py-2 rounded-lg text-xs text-[var(--ink-secondary)] hover:text-[var(--ink-primary)] hover:bg-[var(--bg-subtle)] no-underline transition-colors flex items-center gap-2"
                    >
                      <span className="font-mono text-[11px] text-[var(--accent)] tabular-nums shrink-0">
                        {sec.code}
                      </span>
                      <span className="truncate">{sec.title}</span>
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </Layout>
  );
}
