import React, { useState } from 'react';
import Link from '@docusaurus/Link';
import { motion } from 'motion/react';
import { ArrowRight, BookOpen, Compass } from 'lucide-react';
import { BOOK_META, JOURNEY_STAGES } from '@site/src/data/bookData';

export function HeroSection(): React.ReactElement {
  const [activeStageIdx, setActiveStageIdx] = useState<number>(0);
  const activeStage = JOURNEY_STAGES[activeStageIdx];

  return (
    <section className="relative overflow-hidden border-b border-[var(--border-hairline)] editorial-grid-bg">
      {/* Subtle radial atmosphere */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 right-[-10%] w-[640px] h-[640px] rounded-full opacity-25 blur-3xl"
        style={{
          background:
            'radial-gradient(circle, var(--accent) 0%, transparent 68%)',
        }}
      />

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-stretch">
          {/* Left Column: Editorial Hero Title & Primary Actions */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="text-xs font-mono text-[var(--ink-muted)] tracking-wide mb-4"
            >
              Interactive Digital Book · Author: {BOOK_META.author}
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.48, delay: 0.06, ease: [0.16, 1, 0.3, 1] }}
              className="font-display text-4xl sm:text-5xl lg:text-[3.75rem] font-semibold tracking-tight text-[var(--ink-primary)] leading-[1.08] m-0"
            >
              The AI-Native Engineer
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.14, ease: [0.16, 1, 0.3, 1] }}
              className="mt-5 font-display text-xl sm:text-2xl text-[var(--accent)] font-medium m-0"
            >
              {BOOK_META.subtitle}
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="mt-5 text-base text-[var(--ink-secondary)] leading-relaxed max-w-xl"
            >
              A structured engineering-to-AI curriculum spanning software foundations, full-stack
              systems, cloud operations, agentic AI, automation, and independent product delivery.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.26, ease: [0.16, 1, 0.3, 1] }}
              className="mt-8 flex flex-wrap items-center gap-3.5"
            >
              <Link
                to="/start-here"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white text-sm font-medium transition-colors duration-150 no-underline whitespace-nowrap shrink-0"
              >
                <Compass className="w-4 h-4" aria-hidden="true" />
                <span>Start Learning</span>
              </Link>

              <Link
                to="/structure"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-lg border border-[var(--border-strong)] bg-[var(--bg-surface)] hover:border-[var(--accent)] text-[var(--ink-primary)] text-sm font-medium transition-colors duration-150 no-underline whitespace-nowrap shrink-0"
              >
                <BookOpen className="w-4 h-4" aria-hidden="true" />
                <span>Explore the Book</span>
              </Link>
            </motion.div>
          </div>

          {/* Right Column: Interactive Architectural Journey Composition */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 flex"
          >
            <div className="w-full rounded-2xl border border-[var(--border-hairline)] bg-[var(--bg-surface)] p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden">
              <div className="flex items-center justify-between gap-4 pb-5 border-b border-[var(--border-hairline)]">
                <div>
                  <div className="text-xs font-mono text-[var(--ink-muted)]">
                    Curriculum Trajectory
                  </div>
                  <div className="text-sm font-medium text-[var(--ink-primary)] mt-0.5">
                    From First Principles to Production Products
                  </div>
                </div>
                <span className="font-mono text-xs text-[var(--accent)] tabular-nums">
                  {String(activeStageIdx + 1).padStart(2, '0')} / {String(JOURNEY_STAGES.length).padStart(2, '0')}
                </span>
              </div>

              {/* Interactive SVG & Node Matrix */}
              <div className="my-6 relative">
                <svg
                  aria-hidden="true"
                  viewBox="0 0 600 40"
                  className="w-full h-6 mb-3 hidden sm:block"
                >
                  <line
                    x1="20"
                    y1="20"
                    x2="580"
                    y2="20"
                    stroke="var(--border-strong)"
                    strokeWidth="1.5"
                    strokeDasharray="4 4"
                  />
                  <motion.line
                    x1="20"
                    y1="20"
                    x2={20 + (activeStageIdx * 560) / (JOURNEY_STAGES.length - 1)}
                    y2="20"
                    stroke="var(--accent)"
                    strokeWidth="2"
                    initial={false}
                    animate={{
                      x2: 20 + (activeStageIdx * 560) / (JOURNEY_STAGES.length - 1),
                    }}
                    transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                  />
                  {JOURNEY_STAGES.map((_, idx) => {
                    const cx = 20 + (idx * 560) / (JOURNEY_STAGES.length - 1);
                    const isSelected = idx === activeStageIdx;
                    const isPast = idx < activeStageIdx;
                    return (
                      <circle
                        key={idx}
                        cx={cx}
                        cy="20"
                        r={isSelected ? 6 : 4}
                        fill={
                          isSelected
                            ? 'var(--highlight)'
                            : isPast
                              ? 'var(--accent)'
                              : 'var(--bg-subtle)'
                        }
                        stroke={isSelected || isPast ? 'var(--accent)' : 'var(--border-strong)'}
                        strokeWidth="1.5"
                      />
                    );
                  })}
                </svg>

                <div className="grid grid-cols-3 gap-2.5">
                  {JOURNEY_STAGES.map((stage, idx) => {
                    const isActive = idx === activeStageIdx;
                    return (
                      <button
                        key={stage.label}
                        type="button"
                        onClick={() => setActiveStageIdx(idx)}
                        className={`p-3 rounded-xl border text-left transition-all duration-150 cursor-pointer ${
                          isActive
                            ? 'border-[var(--accent)] bg-[var(--accent-soft)]'
                            : 'border-[var(--border-hairline)] bg-[var(--bg-canvas)] hover:border-[var(--border-strong)]'
                        }`}
                      >
                        <div className="font-mono text-[11px] text-[var(--ink-muted)] tabular-nums">
                          {String(idx + 1).padStart(2, '0')}
                        </div>
                        <div
                          className={`text-xs sm:text-sm font-medium mt-1 truncate ${
                            isActive ? 'text-[var(--accent)]' : 'text-[var(--ink-primary)]'
                          }`}
                        >
                          {stage.label}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="pt-4 border-t border-[var(--border-hairline)] flex items-center justify-between gap-4">
                <div className="text-xs text-[var(--ink-secondary)]">
                  Selected stage:{' '}
                  <strong className="text-[var(--ink-primary)] font-medium">
                    {activeStage.label}
                  </strong>{' '}
                  <span className="font-mono text-[var(--ink-muted)]">
                    (Part {String(activeStage.partNumber).padStart(2, '0')})
                  </span>
                </div>
                <Link
                  to={activeStage.route}
                  className="inline-flex items-center gap-1.5 text-xs font-medium text-[var(--accent)] hover:underline no-underline whitespace-nowrap shrink-0"
                >
                  <span>Open stage</span>
                  <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
