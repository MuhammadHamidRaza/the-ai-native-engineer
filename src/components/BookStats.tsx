import React, { useEffect, useRef, useState } from 'react';
import { useInView } from 'motion/react';
import { BOOK_META } from '@site/src/data/bookData';

function AnimatedCounter({ target }: { target: number }): React.ReactElement {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-40px' });
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    const prefersReduced =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) {
      setValue(target);
      return;
    }

    let frameId = 0;
    const duration = 700;
    const start = performance.now();

    const tick = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(1, elapsed / duration);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(target * eased));
      if (progress < 1) {
        frameId = requestAnimationFrame(tick);
      }
    };

    frameId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameId);
  }, [isInView, target]);

  return (
    <span ref={ref} className="tabular-nums">
      {value}
    </span>
  );
}

export function BookStats(): React.ReactElement {
  return (
    <section
      aria-label="Book overview metrics"
      className="border-b border-[var(--border-hairline)] bg-[var(--bg-surface)]"
    >
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <div className="font-display text-3xl sm:text-4xl font-semibold text-[var(--ink-primary)] tabular-nums">
              <AnimatedCounter target={BOOK_META.totalParts} />
            </div>
            <div className="mt-1 text-sm font-medium text-[var(--ink-secondary)]">Parts</div>
          </div>

          <div>
            <div className="font-display text-3xl sm:text-4xl font-semibold text-[var(--ink-primary)] tabular-nums">
              <AnimatedCounter target={BOOK_META.totalChapters} />
            </div>
            <div className="mt-1 text-sm font-medium text-[var(--ink-secondary)]">Chapters</div>
          </div>

          <div>
            <div className="font-display text-3xl sm:text-4xl font-semibold text-[var(--accent)] tabular-nums">
              <AnimatedCounter target={BOOK_META.totalHours} />
            </div>
            <div className="mt-1 text-sm font-medium text-[var(--ink-secondary)]">
              Focused Learning Hours
            </div>
          </div>

          <div>
            <div className="font-display text-lg sm:text-xl font-medium text-[var(--ink-primary)] leading-snug">
              Engineering to AI
            </div>
            <div className="mt-1 text-sm text-[var(--ink-secondary)]">
              A practical engineering-to-AI learning journey
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
