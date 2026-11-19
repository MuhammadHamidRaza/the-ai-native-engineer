import React from 'react';
import { LEARNING_PRINCIPLES } from '@site/src/data/bookData';
import { AnimatedSection } from './AnimatedSection';

export function LearningPhilosophy(): React.ReactElement {
  return (
    <section className="py-16 sm:py-20 border-b border-[var(--border-hairline)]">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <div className="max-w-2xl mb-10">
            <div className="text-xs font-mono text-[var(--accent)] mb-2">
              Guiding Principles
            </div>
            <h2 className="font-display text-2xl sm:text-3xl font-semibold text-[var(--ink-primary)] m-0">
              Learning Philosophy
            </h2>
          </div>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {LEARNING_PRINCIPLES.map((statement, idx) => (
            <AnimatedSection key={statement} delay={idx * 0.04}>
              <div className="h-full p-6 rounded-xl border border-[var(--border-hairline)] bg-[var(--bg-surface)] flex flex-col justify-between">
                <div className="font-mono text-xs text-[var(--accent)] tabular-nums mb-4">
                  {String(idx + 1).padStart(2, '0')}
                </div>
                <p className="font-display text-lg font-medium text-[var(--ink-primary)] leading-snug m-0">
                  {statement}
                </p>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
