import React, { useState } from 'react';
import Link from '@docusaurus/Link';
import { AnimatePresence, motion } from 'motion/react';
import { ArrowRight, ChevronRight } from 'lucide-react';
import {
  BOOK_PARTS,
  PART_ZERO,
  getChapterRoute,
  getIntroPartRoute,
  getIntroSectionRoute,
  getIntroTopicRoute,
  getPartRoute,
  getSubchapterRoute,
  getTopicRoute,
} from '@site/src/data/bookData';

export function BookOutline(): React.ReactElement {
  const [introOpen, setIntroOpen] = useState<boolean>(false);
  const [openIntroSections, setOpenIntroSections] = useState<Record<string, boolean>>({});
  const [openParts, setOpenParts] = useState<Record<string, boolean>>({ 'part-01': true });
  const [openChapters, setOpenChapters] = useState<Record<string, boolean>>({ 'ch-01': true });
  const [openSubs, setOpenSubs] = useState<Record<string, boolean>>({ 'ch-01-s1': true });

  const expandAll = () => {
    const introSecs: Record<string, boolean> = {};
    for (const sec of PART_ZERO.sections) {
      introSecs[sec.id] = true;
    }
    const p: Record<string, boolean> = {};
    const c: Record<string, boolean> = {};
    const s: Record<string, boolean> = {};
    for (const part of BOOK_PARTS) {
      p[part.id] = true;
      for (const ch of part.chapters) {
        c[ch.id] = true;
        for (const sub of ch.subchapters) {
          s[sub.id] = true;
        }
      }
    }
    setIntroOpen(true);
    setOpenIntroSections(introSecs);
    setOpenParts(p);
    setOpenChapters(c);
    setOpenSubs(s);
  };

  const collapseAll = () => {
    setIntroOpen(false);
    setOpenIntroSections({});
    setOpenParts({});
    setOpenChapters({});
    setOpenSubs({});
  };

  return (
    <div className="rounded-2xl border border-[var(--border-hairline)] bg-[var(--bg-surface)] overflow-hidden">
      <div className="px-5 py-4 border-b border-[var(--border-hairline)] flex flex-wrap items-center justify-between gap-3">
        <div className="text-xs font-mono text-[var(--ink-muted)] tabular-nums">
          Interactive Outline · Part 00 Intro + 10 Curriculum Parts · 42 Chapters
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={expandAll}
            className="px-3 py-1.5 rounded-md border border-[var(--border-hairline)] text-xs font-medium text-[var(--ink-secondary)] hover:text-[var(--ink-primary)] hover:border-[var(--border-strong)] cursor-pointer transition-colors"
          >
            Expand all
          </button>
          <button
            type="button"
            onClick={collapseAll}
            className="px-3 py-1.5 rounded-md border border-[var(--border-hairline)] text-xs font-medium text-[var(--ink-secondary)] hover:text-[var(--ink-primary)] hover:border-[var(--border-strong)] cursor-pointer transition-colors"
          >
            Collapse all
          </button>
        </div>
      </div>

      <div className="divide-y divide-[var(--border-hairline)]">
        {/* Part 00 — About This Book (Introductory Part before Part 01) */}
        <div className="bg-[var(--bg-subtle)]/30">
          <div className="px-5 py-3.5 flex items-center justify-between gap-4 hover:bg-[var(--bg-subtle)] transition-colors">
            <button
              type="button"
              onClick={() => setIntroOpen((prev) => !prev)}
              aria-expanded={introOpen}
              className="flex items-center gap-3 text-left bg-transparent border-0 p-0 cursor-pointer min-w-0 flex-1"
            >
              <ChevronRight
                className={`w-4 h-4 text-[var(--ink-muted)] transition-transform duration-150 shrink-0 ${
                  introOpen ? 'rotate-90 text-[var(--accent)]' : ''
                }`}
                aria-hidden="true"
              />
              <span className="font-mono text-xs text-[var(--accent)] tabular-nums shrink-0">
                {PART_ZERO.code}
              </span>
              <span className="font-display text-base font-semibold text-[var(--ink-primary)] truncate">
                {PART_ZERO.title}
              </span>
              <span className="hidden md:inline text-xs font-mono text-[var(--ink-muted)] shrink-0">
                · Introductory Part
              </span>
            </button>

            <div className="flex items-center gap-4 shrink-0">
              <span className="hidden sm:inline font-mono text-xs text-[var(--ink-muted)] tabular-nums">
                {PART_ZERO.sections.length} sections
              </span>
              <Link
                to={getIntroPartRoute()}
                className="inline-flex items-center gap-1 text-xs font-medium text-[var(--accent)] hover:underline no-underline"
              >
                <span>Open</span>
                <ArrowRight className="w-3 h-3" aria-hidden="true" />
              </Link>
            </div>
          </div>

          <AnimatePresence initial={false}>
            {introOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.2 }}
                className="overflow-hidden bg-[var(--bg-canvas)] border-t border-[var(--border-hairline)]"
              >
                <div className="px-6 sm:px-10 py-3 space-y-2">
                  {PART_ZERO.sections.map((sec) => {
                    const secOpen = Boolean(openIntroSections[sec.id]);
                    const secRoute = getIntroSectionRoute(sec.slug);

                    return (
                      <div
                        key={sec.id}
                        className="rounded-xl border border-[var(--border-hairline)] bg-[var(--bg-surface)] overflow-hidden"
                      >
                        <div className="px-4 py-2.5 flex items-center justify-between gap-3">
                          <button
                            type="button"
                            onClick={() =>
                              setOpenIntroSections((prev) => ({
                                ...prev,
                                [sec.id]: !secOpen,
                              }))
                            }
                            aria-expanded={secOpen}
                            className="flex items-center gap-2.5 text-left bg-transparent border-0 p-0 cursor-pointer min-w-0 flex-1"
                          >
                            <ChevronRight
                              className={`w-3.5 h-3.5 text-[var(--ink-muted)] transition-transform duration-150 shrink-0 ${
                                secOpen ? 'rotate-90 text-[var(--accent)]' : ''
                              }`}
                              aria-hidden="true"
                            />
                            <span className="font-mono text-xs text-[var(--accent)] tabular-nums shrink-0">
                              {sec.code}
                            </span>
                            <span className="text-sm font-medium text-[var(--ink-primary)] truncate">
                              {sec.title}
                            </span>
                          </button>

                          <div className="flex items-center gap-3 shrink-0">
                            <span className="font-mono text-xs text-[var(--ink-muted)] tabular-nums">
                              {sec.topics.length} topics
                            </span>
                            <Link
                              to={secRoute}
                              className="text-xs font-medium text-[var(--accent)] hover:underline no-underline"
                            >
                              Open
                            </Link>
                          </div>
                        </div>

                        {secOpen && (
                          <div className="px-4 pb-3 pt-2 border-t border-[var(--border-hairline)] grid grid-cols-1 sm:grid-cols-2 gap-1">
                            {sec.topics.map((topic) => (
                              <Link
                                key={topic.id}
                                to={getIntroTopicRoute(sec.slug, topic.slug)}
                                className="px-2.5 py-1.5 rounded text-xs text-[var(--ink-secondary)] hover:text-[var(--ink-primary)] hover:bg-[var(--bg-subtle)] no-underline flex items-center gap-1.5 transition-colors"
                              >
                                <span className="font-mono text-[11px] opacity-70 tabular-nums shrink-0">
                                  {topic.code}
                                </span>
                                <span className="truncate">{topic.title}</span>
                              </Link>
                            ))}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {BOOK_PARTS.map((part) => {
          const partOpen = Boolean(openParts[part.id]);
          const partRoute = getPartRoute(part);

          return (
            <div key={part.id}>
              <div className="px-5 py-3.5 flex items-center justify-between gap-4 hover:bg-[var(--bg-subtle)] transition-colors">
                <button
                  type="button"
                  onClick={() =>
                    setOpenParts((prev) => ({ ...prev, [part.id]: !partOpen }))
                  }
                  aria-expanded={partOpen}
                  className="flex items-center gap-3 text-left bg-transparent border-0 p-0 cursor-pointer min-w-0 flex-1"
                >
                  <ChevronRight
                    className={`w-4 h-4 text-[var(--ink-muted)] transition-transform duration-150 shrink-0 ${
                      partOpen ? 'rotate-90 text-[var(--accent)]' : ''
                    }`}
                    aria-hidden="true"
                  />
                  <span className="font-mono text-xs text-[var(--accent)] tabular-nums shrink-0">
                    {part.code}
                  </span>
                  <span className="font-display text-base font-semibold text-[var(--ink-primary)] truncate">
                    {part.title}
                  </span>
                </button>

                <div className="flex items-center gap-4 shrink-0">
                  <span className="hidden sm:inline font-mono text-xs text-[var(--ink-muted)] tabular-nums">
                    {part.chapters.length} ch · {part.totalHours}h
                  </span>
                  <Link
                    to={partRoute}
                    className="inline-flex items-center gap-1 text-xs font-medium text-[var(--accent)] hover:underline no-underline"
                  >
                    <span>Open</span>
                    <ArrowRight className="w-3 h-3" aria-hidden="true" />
                  </Link>
                </div>
              </div>

              <AnimatePresence initial={false}>
                {partOpen && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden bg-[var(--bg-canvas)] border-t border-[var(--border-hairline)]"
                  >
                    <div className="px-6 sm:px-10 py-3 space-y-2">
                      {part.chapters.map((chapter) => {
                        const chOpen = Boolean(openChapters[chapter.id]);
                        const chRoute = getChapterRoute(part, chapter);

                        return (
                          <div
                            key={chapter.id}
                            className="rounded-xl border border-[var(--border-hairline)] bg-[var(--bg-surface)] overflow-hidden"
                          >
                            <div className="px-4 py-2.5 flex items-center justify-between gap-3">
                              <button
                                type="button"
                                onClick={() =>
                                  setOpenChapters((prev) => ({
                                    ...prev,
                                    [chapter.id]: !chOpen,
                                  }))
                                }
                                aria-expanded={chOpen}
                                className="flex items-center gap-2.5 text-left bg-transparent border-0 p-0 cursor-pointer min-w-0 flex-1"
                              >
                                <ChevronRight
                                  className={`w-3.5 h-3.5 text-[var(--ink-muted)] transition-transform duration-150 shrink-0 ${
                                    chOpen ? 'rotate-90 text-[var(--accent)]' : ''
                                  }`}
                                  aria-hidden="true"
                                />
                                <span className="font-mono text-xs text-[var(--accent)] tabular-nums shrink-0">
                                  {chapter.code}
                                </span>
                                <span className="text-sm font-medium text-[var(--ink-primary)] truncate">
                                  {chapter.title}
                                </span>
                              </button>

                              <div className="flex items-center gap-3 shrink-0">
                                <span className="font-mono text-xs text-[var(--ink-muted)] tabular-nums">
                                  {chapter.hours}h
                                </span>
                                <Link
                                  to={chRoute}
                                  className="text-xs font-medium text-[var(--accent)] hover:underline no-underline"
                                >
                                  Open
                                </Link>
                              </div>
                            </div>

                            {chOpen && (
                              <div className="px-4 pb-3 pt-1 border-t border-[var(--border-hairline)] space-y-1.5">
                                {chapter.subchapters.map((sub) => {
                                  const subOpen = Boolean(openSubs[sub.id]);
                                  const subRoute = getSubchapterRoute(
                                    part.slug,
                                    chapter.slug,
                                    sub.slug,
                                  );

                                  return (
                                    <div key={sub.id} className="pl-2">
                                      <div className="flex items-center justify-between gap-2 py-1">
                                        <button
                                          type="button"
                                          onClick={() =>
                                            setOpenSubs((prev) => ({
                                              ...prev,
                                              [sub.id]: !subOpen,
                                            }))
                                          }
                                          aria-expanded={subOpen}
                                          className="flex items-center gap-2 text-left bg-transparent border-0 p-0 cursor-pointer min-w-0 flex-1"
                                        >
                                          <ChevronRight
                                            className={`w-3 h-3 text-[var(--ink-muted)] transition-transform duration-150 shrink-0 ${
                                              subOpen ? 'rotate-90' : ''
                                            }`}
                                            aria-hidden="true"
                                          />
                                          <span className="font-mono text-[11px] text-[var(--ink-muted)] tabular-nums shrink-0">
                                            {sub.code}
                                          </span>
                                          <span className="text-xs font-medium text-[var(--ink-secondary)] truncate">
                                            {sub.title}
                                          </span>
                                        </button>

                                        <Link
                                          to={subRoute}
                                          className="text-[11px] text-[var(--accent)] hover:underline no-underline shrink-0"
                                        >
                                          View section
                                        </Link>
                                      </div>

                                      {subOpen && (
                                        <div className="pl-6 py-1 grid grid-cols-1 sm:grid-cols-2 gap-1">
                                          {sub.topics.map((topic) => (
                                            <Link
                                              key={topic.id}
                                              to={getTopicRoute(
                                                part.slug,
                                                chapter.slug,
                                                sub.slug,
                                                topic.slug,
                                              )}
                                              className="px-2.5 py-1 rounded text-[11px] text-[var(--ink-muted)] hover:text-[var(--ink-primary)] hover:bg-[var(--bg-subtle)] no-underline flex items-center gap-1.5 transition-colors"
                                            >
                                              <span className="font-mono opacity-70 tabular-nums shrink-0">
                                                {topic.code}
                                              </span>
                                              <span className="truncate">{topic.title}</span>
                                            </Link>
                                          ))}
                                        </div>
                                      )}
                                    </div>
                                  );
                                })}
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </div>
  );
}
