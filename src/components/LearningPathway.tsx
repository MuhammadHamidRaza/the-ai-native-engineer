import React, { useState } from 'react';
import Link from '@docusaurus/Link';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { BOOK_PARTS, getChapterRoute, getPartRoute } from '@site/src/data/bookData';
import { AnimatedSection } from './AnimatedSection';

export function LearningPathway(): React.ReactElement {
  const [selectedPartNum, setSelectedPartNum] = useState<number>(1);
  const selectedPart = BOOK_PARTS.find((p) => p.number === selectedPartNum) ?? BOOK_PARTS[0];

  return (
    <section className="py-16 sm:py-20 border-b border-[var(--border-hairline)]">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
            <div>
              <div className="text-xs font-mono text-[var(--accent)] mb-2">
                Ten-Part Progression
              </div>
              <h2 className="font-display text-2xl sm:text-3xl font-semibold text-[var(--ink-primary)] m-0">
                The Learning Journey
              </h2>
            </div>
            <Link
              to="/roadmap"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-[var(--accent)] hover:underline no-underline whitespace-nowrap shrink-0"
            >
              <span>View full learning roadmap</span>
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
          </div>
        </AnimatedSection>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Interactive 10-part selector rail */}
          <div className="lg:col-span-5 space-y-1.5">
            {BOOK_PARTS.map((part) => {
              const isSelected = part.number === selectedPartNum;
              return (
                <button
                  key={part.id}
                  type="button"
                  onClick={() => setSelectedPartNum(part.number)}
                  className={`w-full flex items-center justify-between gap-3 px-4 py-3 rounded-xl border text-left transition-all duration-150 cursor-pointer ${
                    isSelected
                      ? 'border-[var(--accent)] bg-[var(--accent-soft)]'
                      : 'border-[var(--border-hairline)] bg-[var(--bg-surface)] hover:border-[var(--border-strong)]'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <span
                      className={`font-mono text-xs tabular-nums shrink-0 ${
                        isSelected ? 'text-[var(--accent)] font-semibold' : 'text-[var(--ink-muted)]'
                      }`}
                    >
                      {String(part.number).padStart(2, '0')}
                    </span>
                    <span
                      className={`text-sm font-medium truncate ${
                        isSelected ? 'text-[var(--ink-primary)]' : 'text-[var(--ink-secondary)]'
                      }`}
                    >
                      {part.title}
                    </span>
                  </div>
                  <span className="font-mono text-xs text-[var(--ink-muted)] tabular-nums shrink-0">
                    {part.totalHours}h
                  </span>
                </button>
              );
            })}
          </div>

          {/* Selected part chapter detail panel */}
          <motion.div
            key={selectedPart.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 p-6 sm:p-8 rounded-2xl border border-[var(--border-hairline)] bg-[var(--bg-surface)]"
          >
            <div className="flex flex-wrap items-center justify-between gap-4 pb-5 border-b border-[var(--border-hairline)]">
              <div>
                <div className="font-mono text-xs text-[var(--accent)] tabular-nums">
                  {selectedPart.code} · {selectedPart.chapters.length}{' '}
                  {selectedPart.chapters.length === 1 ? 'Chapter' : 'Chapters'} ·{' '}
                  {selectedPart.totalHours} Hours
                </div>
                <h3 className="font-display text-2xl font-semibold text-[var(--ink-primary)] mt-1 m-0">
                  {selectedPart.title}
                </h3>
              </div>

              <Link
                to={getPartRoute(selectedPart)}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white text-xs font-medium no-underline transition-colors whitespace-nowrap shrink-0"
              >
                <span>Open {selectedPart.code}</span>
                <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
              </Link>
            </div>

            <div className="mt-5 divide-y divide-[var(--border-hairline)]">
              {selectedPart.chapters.map((chapter) => (
                <Link
                  key={chapter.id}
                  to={getChapterRoute(selectedPart, chapter)}
                  className="group py-3.5 flex items-center justify-between gap-4 no-underline"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <span className="font-mono text-xs text-[var(--accent)] tabular-nums shrink-0">
                      {chapter.code}
                    </span>
                    <span className="text-sm font-medium text-[var(--ink-primary)] group-hover:text-[var(--accent)] transition-colors truncate">
                      {chapter.title}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 shrink-0">
                    <span className="font-mono text-xs text-[var(--ink-muted)] tabular-nums">
                      {chapter.hours}h
                    </span>
                    <ArrowRight
                      className="w-3.5 h-3.5 text-[var(--ink-muted)] group-hover:text-[var(--accent)] group-hover:translate-x-0.5 transition-all"
                      aria-hidden="true"
                    />
                  </div>
                </Link>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
