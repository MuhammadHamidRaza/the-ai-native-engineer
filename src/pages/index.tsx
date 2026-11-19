import React from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import { ArrowRight } from 'lucide-react';
import { APPENDICES, BOOK_META, FEATURED_CHAPTERS } from '@site/src/data/bookData';
import { HeroSection } from '@site/src/components/HeroSection';
import { BookStats } from '@site/src/components/BookStats';
import { LearningPathway } from '@site/src/components/LearningPathway';
import { ChapterCard } from '@site/src/components/ChapterCard';
import { BookOutline } from '@site/src/components/BookOutline';
import { LearningPhilosophy } from '@site/src/components/LearningPhilosophy';
import { AnimatedSection } from '@site/src/components/AnimatedSection';

export default function Home(): React.ReactElement {
  return (
    <Layout
      title={BOOK_META.title}
      description={`${BOOK_META.subtitle} — ${BOOK_META.title} by ${BOOK_META.author}`}
    >
      <main>
        <HeroSection />
        <BookStats />
        <LearningPathway />

        {/* Featured Chapters */}
        <section className="py-16 sm:py-20 border-b border-[var(--border-hairline)]">
          <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
            <AnimatedSection>
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
                <div>
                  <div className="text-xs font-mono text-[var(--accent)] mb-2">
                    Selected Chapters
                  </div>
                  <h2 className="font-display text-2xl sm:text-3xl font-semibold text-[var(--ink-primary)] m-0">
                    Featured Chapters
                  </h2>
                </div>
                <Link
                  to="/chapters"
                  className="inline-flex items-center gap-1.5 text-sm font-medium text-[var(--accent)] hover:underline no-underline whitespace-nowrap shrink-0"
                >
                  <span>Browse all 42 chapters</span>
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </Link>
              </div>
            </AnimatedSection>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {FEATURED_CHAPTERS.map((chapter, idx) => (
                <AnimatedSection key={chapter.id} delay={idx * 0.03}>
                  <ChapterCard chapter={chapter} />
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>

        {/* Interactive Book Structure Preview */}
        <section className="py-16 sm:py-20 border-b border-[var(--border-hairline)]">
          <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
            <AnimatedSection>
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
                <div>
                  <div className="text-xs font-mono text-[var(--accent)] mb-2">
                    Complete Hierarchy
                  </div>
                  <h2 className="font-display text-2xl sm:text-3xl font-semibold text-[var(--ink-primary)] m-0">
                    Book Structure Preview
                  </h2>
                </div>
                <Link
                  to="/structure"
                  className="inline-flex items-center gap-1.5 text-sm font-medium text-[var(--accent)] hover:underline no-underline whitespace-nowrap shrink-0"
                >
                  <span>Open dedicated structure view</span>
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </Link>
              </div>
            </AnimatedSection>

            <AnimatedSection>
              <BookOutline />
            </AnimatedSection>
          </div>
        </section>

        <LearningPhilosophy />

        {/* Appendices & Reference Preview */}
        <section className="py-16 sm:py-20">
          <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
            <AnimatedSection>
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
                <div>
                  <div className="text-xs font-mono text-[var(--accent)] mb-2">
                    Playbooks, Templates & Reference
                  </div>
                  <h2 className="font-display text-2xl sm:text-3xl font-semibold text-[var(--ink-primary)] m-0">
                    Appendices A–E
                  </h2>
                </div>
                <Link
                  to="/appendix"
                  className="inline-flex items-center gap-1.5 text-sm font-medium text-[var(--accent)] hover:underline no-underline whitespace-nowrap shrink-0"
                >
                  <span>Explore all appendices</span>
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </Link>
              </div>
            </AnimatedSection>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {APPENDICES.map((app, idx) => (
                <AnimatedSection key={app.id} delay={idx * 0.04}>
                  <Link
                    to={`/book/appendix/${app.slug}`}
                    className="group h-full p-6 rounded-xl border border-[var(--border-hairline)] bg-[var(--bg-surface)] hover:border-[var(--accent)] transition-colors no-underline flex flex-col justify-between"
                  >
                    <div>
                      <div className="font-mono text-xs text-[var(--accent)] tabular-nums mb-2">
                        {app.code} · {app.sections.length} sections
                      </div>
                      <h3 className="font-display text-lg font-semibold text-[var(--ink-primary)] group-hover:text-[var(--accent)] transition-colors m-0">
                        {app.title}
                      </h3>
                    </div>
                    <div className="mt-5 pt-3 border-t border-[var(--border-hairline)] flex items-center justify-between text-xs font-medium text-[var(--ink-secondary)] group-hover:text-[var(--accent)]">
                      <span>Open appendix</span>
                      <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                    </div>
                  </Link>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}
