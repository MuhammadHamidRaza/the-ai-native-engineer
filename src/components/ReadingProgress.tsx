import React, { useEffect, useState } from 'react';
import { useBookContext } from '@site/src/context/BookContext';
import type { BookNode } from '@site/src/types/book';

export function ReadingProgress({ node }: { node?: BookNode }): React.ReactElement {
  const [scrollPct, setScrollPct] = useState(0);
  const { overallStats, getChapterProgress, getIntroSectionProgress } = useBookContext();

  useEffect(() => {
    const updateScroll = () => {
      const doc = document.documentElement;
      const scrollTop = doc.scrollTop || document.body.scrollTop;
      const scrollHeight = doc.scrollHeight - doc.clientHeight;
      if (scrollHeight <= 0) {
        setScrollPct(0);
      } else {
        setScrollPct(Math.min(100, Math.max(0, Math.round((scrollTop / scrollHeight) * 100))));
      }
    };

    updateScroll();
    window.addEventListener('scroll', updateScroll, { passive: true });
    return () => window.removeEventListener('scroll', updateScroll);
  }, [node?.id]);

  const chapterProgress =
    node?.chapterNumber !== undefined
      ? getChapterProgress(`ch-${String(node.chapterNumber).padStart(2, '0')}`)
      : null;

  const introProgress =
    node?.isIntro && node.subchapterCode
      ? getIntroSectionProgress(node.subchapterCode)
      : null;

  const overallVisitedPct =
    overallStats.totalPages > 0
      ? Math.round((overallStats.visitedCount / overallStats.totalPages) * 100)
      : 0;

  return (
    <>
      {/* Fixed hairline reading scroll progress bar */}
      <div
        aria-hidden="true"
        className="fixed top-14 left-0 right-0 z-30 h-[2px] bg-transparent pointer-events-none"
      >
        <div
          className="h-full bg-[var(--accent)] transition-[width] duration-100 ease-out"
          style={{ width: `${scrollPct}%` }}
        />
      </div>

      {/* Inline progress context strip inside reading column */}
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4 py-2.5 px-3.5 rounded-lg border border-[var(--border-hairline)] bg-[var(--bg-surface)] text-xs text-[var(--ink-muted)] tabular-nums">
        <div className="flex flex-wrap items-center gap-4">
          {chapterProgress && chapterProgress.total > 0 && (
            <span>
              Chapter progress:{' '}
              <strong className="text-[var(--ink-primary)] font-medium">
                {chapterProgress.visited}/{chapterProgress.total} visited
              </strong>
              {' · '}
              <span className="text-[var(--highlight)]">
                {chapterProgress.completed} completed
              </span>
            </span>
          )}
          {introProgress && introProgress.total > 0 && (
            <span>
              Section progress:{' '}
              <strong className="text-[var(--ink-primary)] font-medium">
                {introProgress.visited}/{introProgress.total} visited
              </strong>
              {' · '}
              <span className="text-[var(--highlight)]">
                {introProgress.completed} completed
              </span>
            </span>
          )}
          <span>
            Book coverage:{' '}
            <strong className="text-[var(--ink-primary)] font-medium">
              {overallStats.visitedCount}/{overallStats.totalPages} pages ({overallVisitedPct}%)
            </strong>
          </span>
        </div>
        <span className="font-mono">{scrollPct}% scroll</span>
      </div>
    </>
  );
}
