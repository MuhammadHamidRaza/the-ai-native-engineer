import React, { useEffect, useMemo, useState } from 'react';
import Link from '@docusaurus/Link';
import { useLocation } from '@docusaurus/router';
import { AnimatePresence, motion } from 'motion/react';
import { Check, ChevronRight, Circle, Search, X } from 'lucide-react';
import {
  APPENDICES,
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
import { useBookContext } from '@site/src/context/BookContext';

interface BookSidebarProps {
  collapsed?: boolean;
  onSelectLink?: () => void;
}

export function BookSidebar({ collapsed = false, onSelectLink }: BookSidebarProps): React.ReactElement | null {
  const { pathname } = useLocation();
  const { visitedIds, completedIds } = useBookContext();
  const [filterText, setFilterText] = useState('');

  const [introOpen, setIntroOpen] = useState<boolean>(false);
  const [expandedIntroSections, setExpandedIntroSections] = useState<Record<string, boolean>>({});
  const [expandedParts, setExpandedParts] = useState<Record<string, boolean>>({});
  const [expandedChapters, setExpandedChapters] = useState<Record<string, boolean>>({});
  const [expandedSubs, setExpandedSubs] = useState<Record<string, boolean>>({});
  const [appendixExpanded, setAppendixExpanded] = useState<boolean>(false);
  const [expandedAppendices, setExpandedAppendices] = useState<Record<string, boolean>>({});

  useEffect(() => {
    let matchedAny = false;
    if (pathname.includes(PART_ZERO.slug)) {
      matchedAny = true;
      setIntroOpen(true);
      for (const sec of PART_ZERO.sections) {
        if (pathname.includes(sec.slug)) {
          setExpandedIntroSections((prev) => (prev[sec.id] ? prev : { ...prev, [sec.id]: true }));
        }
      }
    }
    for (const part of BOOK_PARTS) {
      if (pathname.includes(part.slug)) {
        matchedAny = true;
        setExpandedParts((prev) => (prev[part.id] ? prev : { ...prev, [part.id]: true }));
        for (const ch of part.chapters) {
          if (pathname.includes(ch.slug)) {
            setExpandedChapters((prev) => (prev[ch.id] ? prev : { ...prev, [ch.id]: true }));
            for (const sub of ch.subchapters) {
              if (pathname.includes(sub.slug)) {
                setExpandedSubs((prev) => (prev[sub.id] ? prev : { ...prev, [sub.id]: true }));
              }
            }
          }
        }
      }
    }
    if (pathname.includes('/appendix')) {
      matchedAny = true;
      setAppendixExpanded(true);
      for (const app of APPENDICES) {
        if (pathname.includes(app.slug)) {
          setExpandedAppendices((prev) => (prev[app.id] ? prev : { ...prev, [app.id]: true }));
        }
      }
    }
    if (!matchedAny) {
      setIntroOpen(true);
      setExpandedParts((prev) => (Object.keys(prev).length === 0 ? { 'part-01': true } : prev));
    }
  }, [pathname]);

  const normalizedFilter = filterText.trim().toLowerCase();

  const filteredIntro = useMemo(() => {
    if (!normalizedFilter) return PART_ZERO;
    const partMatches = `${PART_ZERO.code} ${PART_ZERO.title}`.toLowerCase().includes(normalizedFilter);
    const matchingSections = PART_ZERO.sections
      .map((sec) => {
        const secMatches = `${sec.code} ${sec.title}`.toLowerCase().includes(normalizedFilter);
        const matchingTopics = sec.topics.filter((t) =>
          `${t.code} ${t.title}`.toLowerCase().includes(normalizedFilter),
        );
        if (secMatches || matchingTopics.length > 0) {
          return {
            ...sec,
            topics: secMatches ? sec.topics : matchingTopics,
          };
        }
        return null;
      })
      .filter((s): s is NonNullable<typeof s> => Boolean(s));

    if (partMatches || matchingSections.length > 0) {
      return {
        ...PART_ZERO,
        sections: partMatches ? PART_ZERO.sections : matchingSections,
      };
    }
    return null;
  }, [normalizedFilter]);

  const filteredParts = useMemo(() => {
    if (!normalizedFilter) return BOOK_PARTS;
    return BOOK_PARTS.map((part) => {
      const partMatches = `${part.code} ${part.title}`.toLowerCase().includes(normalizedFilter);
      const matchingChapters = part.chapters
        .map((ch) => {
          const chMatches = `${ch.code} ${ch.title}`.toLowerCase().includes(normalizedFilter);
          const matchingSubs = ch.subchapters
            .map((sub) => {
              const subMatches = `${sub.code} ${sub.title}`.toLowerCase().includes(normalizedFilter);
              const matchingTopics = sub.topics.filter((t) =>
                `${t.code} ${t.title}`.toLowerCase().includes(normalizedFilter),
              );
              if (subMatches || matchingTopics.length > 0) {
                return {
                  ...sub,
                  topics: subMatches ? sub.topics : matchingTopics,
                };
              }
              return null;
            })
            .filter((s): s is NonNullable<typeof s> => Boolean(s));

          if (chMatches || matchingSubs.length > 0) {
            return {
              ...ch,
              subchapters: chMatches ? ch.subchapters : matchingSubs,
            };
          }
          return null;
        })
        .filter((c): c is NonNullable<typeof c> => Boolean(c));

      if (partMatches || matchingChapters.length > 0) {
        return {
          ...part,
          chapters: partMatches ? part.chapters : matchingChapters,
        };
      }
      return null;
    }).filter((p): p is NonNullable<typeof p> => Boolean(p));
  }, [normalizedFilter]);

  if (collapsed) return null;

  const isRouteActive = (route: string) => {
    const clean = pathname.replace(/\/+$/, '');
    return clean === route || clean.endsWith(route);
  };

  const renderStatusIcon = (id: string) => {
    if (completedIds.has(id)) {
      return <Check className="w-3 h-3 text-[var(--highlight)] shrink-0" aria-label="Completed" />;
    }
    if (visitedIds.has(id)) {
      return <Circle className="w-2 h-2 fill-[var(--accent)] text-[var(--accent)] shrink-0" aria-label="Visited" />;
    }
    return null;
  };

  return (
    <aside aria-label="Book navigation" className="flex flex-col h-full">
      {/* Filter input */}
      <div className="p-3 border-b border-[var(--border-hairline)]">
        <div className="relative flex items-center">
          <Search className="w-3.5 h-3.5 text-[var(--ink-muted)] absolute left-2.5 pointer-events-none" aria-hidden="true" />
          <input
            type="text"
            value={filterText}
            onChange={(e) => setFilterText(e.target.value)}
            placeholder="Filter chapters or topics..."
            aria-label="Filter book navigation"
            className="w-full h-8 pl-8 pr-7 rounded-md border border-[var(--border-hairline)] bg-[var(--bg-canvas)] text-xs text-[var(--ink-primary)] placeholder:text-[var(--ink-muted)] focus:outline-none focus:border-[var(--accent)]"
          />
          {filterText && (
            <button
              type="button"
              onClick={() => setFilterText('')}
              aria-label="Clear filter"
              className="absolute right-2 text-[var(--ink-muted)] hover:text-[var(--ink-primary)] cursor-pointer"
            >
              <X className="w-3 h-3" aria-hidden="true" />
            </button>
          )}
        </div>
      </div>

      {/* Tree */}
      <div className="flex-1 overflow-y-auto px-2.5 py-3 space-y-1.5">
        {/* Part 00 — About This Book (Introductory part before Part 01) */}
        {filteredIntro && (
          <div className="pb-2 mb-2 border-b border-[var(--border-hairline)] space-y-1">
            <div className="px-2 pt-0.5 pb-1 text-[11px] font-mono text-[var(--ink-muted)] tracking-wide">
              Introduction
            </div>
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => setIntroOpen((prev) => !prev)}
                aria-expanded={Boolean(normalizedFilter) || introOpen}
                aria-label={`Toggle ${filteredIntro.code}`}
                className="w-6 h-7 inline-flex items-center justify-center rounded text-[var(--ink-muted)] hover:text-[var(--ink-primary)] hover:bg-[var(--bg-subtle)] cursor-pointer shrink-0"
              >
                <ChevronRight
                  className={`w-3.5 h-3.5 transition-transform duration-150 ${
                    Boolean(normalizedFilter) || introOpen ? 'rotate-90' : ''
                  }`}
                  aria-hidden="true"
                />
              </button>
              <Link
                to={getIntroPartRoute()}
                onClick={onSelectLink}
                className={`flex-1 flex items-center justify-between gap-2 px-2 py-1.5 rounded-md text-xs font-semibold no-underline transition-colors ${
                  isRouteActive(getIntroPartRoute())
                    ? 'bg-[var(--accent-soft)] text-[var(--accent)]'
                    : 'text-[var(--ink-primary)] hover:bg-[var(--bg-subtle)]'
                }`}
              >
                <span className="truncate">
                  <span className="font-mono text-[11px] text-[var(--accent)] mr-1.5">00</span>
                  {filteredIntro.title}
                </span>
                {renderStatusIcon(filteredIntro.id)}
              </Link>
            </div>

            <AnimatePresence initial={false}>
              {(Boolean(normalizedFilter) || introOpen) && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.18 }}
                  className="overflow-hidden pl-4 ml-2.5 border-l border-[var(--border-hairline)] space-y-0.5"
                >
                  {filteredIntro.sections.map((sec) => {
                    const secRoute = getIntroSectionRoute(sec.slug);
                    const isSecOpen =
                      Boolean(normalizedFilter) || Boolean(expandedIntroSections[sec.id]);
                    const secActive = isRouteActive(secRoute);

                    return (
                      <div key={sec.id} className="space-y-0.5">
                        <div className="flex items-center gap-1">
                          <button
                            type="button"
                            onClick={() =>
                              setExpandedIntroSections((prev) => ({
                                ...prev,
                                [sec.id]: !isSecOpen,
                              }))
                            }
                            aria-expanded={isSecOpen}
                            aria-label={`Toggle ${sec.code}`}
                            className="w-5 h-6 inline-flex items-center justify-center rounded text-[var(--ink-muted)] hover:text-[var(--ink-primary)] cursor-pointer shrink-0"
                          >
                            <ChevronRight
                              className={`w-3 h-3 transition-transform duration-150 ${
                                isSecOpen ? 'rotate-90' : ''
                              }`}
                              aria-hidden="true"
                            />
                          </button>
                          <Link
                            to={secRoute}
                            onClick={onSelectLink}
                            className={`flex-1 flex items-center justify-between gap-1.5 px-2 py-1 rounded-md text-xs no-underline transition-colors ${
                              secActive
                                ? 'bg-[var(--accent-soft)] text-[var(--accent)] font-medium'
                                : 'text-[var(--ink-secondary)] hover:text-[var(--ink-primary)] hover:bg-[var(--bg-subtle)]'
                            }`}
                          >
                            <span className="truncate">
                              <span className="font-mono text-[11px] tabular-nums mr-1.5 opacity-75">
                                {sec.code}
                              </span>
                              {sec.title}
                            </span>
                            {renderStatusIcon(sec.id)}
                          </Link>
                        </div>

                        {isSecOpen && (
                          <div className="pl-3.5 ml-2 border-l border-[var(--border-hairline)] space-y-0.5">
                            {sec.topics.map((topic) => {
                              const topicRoute = getIntroTopicRoute(sec.slug, topic.slug);
                              const topicActive = isRouteActive(topicRoute);
                              return (
                                <Link
                                  key={topic.id}
                                  to={topicRoute}
                                  onClick={onSelectLink}
                                  className={`flex items-center justify-between gap-1.5 px-2 py-1 rounded text-[11px] no-underline transition-colors ${
                                    topicActive
                                      ? 'bg-[var(--accent-soft)] text-[var(--accent)] font-medium'
                                      : 'text-[var(--ink-muted)] hover:text-[var(--ink-primary)] hover:bg-[var(--bg-subtle)]'
                                  }`}
                                >
                                  <span className="truncate">
                                    <span className="font-mono tabular-nums mr-1 opacity-75">
                                      {topic.code}
                                    </span>
                                    {topic.title}
                                  </span>
                                  {renderStatusIcon(topic.id)}
                                </Link>
                              );
                            })}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}

        {filteredParts.length > 0 && (
          <div className="px-2 pt-0.5 pb-1 text-[11px] font-mono text-[var(--ink-muted)] tracking-wide">
            Curriculum · Parts 01–10
          </div>
        )}

        {filteredParts.map((part) => {
          const partRoute = getPartRoute(part);
          const isPartOpen = Boolean(normalizedFilter) || Boolean(expandedParts[part.id]);
          const partActive = isRouteActive(partRoute);

          return (
            <div key={part.id} className="space-y-0.5">
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() =>
                    setExpandedParts((prev) => ({ ...prev, [part.id]: !isPartOpen }))
                  }
                  aria-expanded={isPartOpen}
                  aria-label={`Toggle ${part.code}`}
                  className="w-6 h-7 inline-flex items-center justify-center rounded text-[var(--ink-muted)] hover:text-[var(--ink-primary)] hover:bg-[var(--bg-subtle)] cursor-pointer shrink-0"
                >
                  <ChevronRight
                    className={`w-3.5 h-3.5 transition-transform duration-150 ${
                      isPartOpen ? 'rotate-90' : ''
                    }`}
                    aria-hidden="true"
                  />
                </button>
                <Link
                  to={partRoute}
                  onClick={onSelectLink}
                  className={`flex-1 flex items-center justify-between gap-2 px-2 py-1.5 rounded-md text-xs font-semibold no-underline transition-colors ${
                    partActive
                      ? 'bg-[var(--accent-soft)] text-[var(--accent)]'
                      : 'text-[var(--ink-primary)] hover:bg-[var(--bg-subtle)]'
                  }`}
                >
                  <span className="truncate">
                    <span className="font-mono text-[11px] text-[var(--ink-muted)] mr-1.5">
                      {String(part.number).padStart(2, '0')}
                    </span>
                    {part.shortTitle}
                  </span>
                  {renderStatusIcon(part.id)}
                </Link>
              </div>

              <AnimatePresence initial={false}>
                {isPartOpen && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.18 }}
                    className="overflow-hidden pl-4 ml-2.5 border-l border-[var(--border-hairline)] space-y-0.5"
                  >
                    {part.chapters.map((chapter) => {
                      const chRoute = getChapterRoute(part, chapter);
                      const isChOpen =
                        Boolean(normalizedFilter) || Boolean(expandedChapters[chapter.id]);
                      const chActive = isRouteActive(chRoute);

                      return (
                        <div key={chapter.id} className="space-y-0.5">
                          <div className="flex items-center gap-1">
                            <button
                              type="button"
                              onClick={() =>
                                setExpandedChapters((prev) => ({
                                  ...prev,
                                  [chapter.id]: !isChOpen,
                                }))
                              }
                              aria-expanded={isChOpen}
                              aria-label={`Toggle Chapter ${chapter.code}`}
                              className="w-5 h-6 inline-flex items-center justify-center rounded text-[var(--ink-muted)] hover:text-[var(--ink-primary)] cursor-pointer shrink-0"
                            >
                              <ChevronRight
                                className={`w-3 h-3 transition-transform duration-150 ${
                                  isChOpen ? 'rotate-90' : ''
                                }`}
                                aria-hidden="true"
                              />
                            </button>
                            <Link
                              to={chRoute}
                              onClick={onSelectLink}
                              className={`flex-1 flex items-center justify-between gap-1.5 px-2 py-1 rounded-md text-xs no-underline transition-colors ${
                                chActive
                                  ? 'bg-[var(--accent-soft)] text-[var(--accent)] font-medium'
                                  : 'text-[var(--ink-secondary)] hover:text-[var(--ink-primary)] hover:bg-[var(--bg-subtle)]'
                              }`}
                            >
                              <span className="truncate">
                                <span className="font-mono text-[11px] tabular-nums mr-1.5 opacity-75">
                                  {chapter.code}
                                </span>
                                {chapter.title}
                              </span>
                              {renderStatusIcon(chapter.id)}
                            </Link>
                          </div>

                          {isChOpen && (
                            <div className="pl-3.5 ml-2 border-l border-[var(--border-hairline)] space-y-0.5">
                              {chapter.subchapters.map((sub) => {
                                const subRoute = getSubchapterRoute(
                                  part.slug,
                                  chapter.slug,
                                  sub.slug,
                                );
                                const isSubOpen =
                                  Boolean(normalizedFilter) || Boolean(expandedSubs[sub.id]);
                                const subActive = isRouteActive(subRoute);

                                return (
                                  <div key={sub.id} className="space-y-0.5">
                                    <div className="flex items-center gap-0.5">
                                      <button
                                        type="button"
                                        onClick={() =>
                                          setExpandedSubs((prev) => ({
                                            ...prev,
                                            [sub.id]: !isSubOpen,
                                          }))
                                        }
                                        aria-expanded={isSubOpen}
                                        aria-label={`Toggle ${sub.code}`}
                                        className="w-5 h-6 inline-flex items-center justify-center rounded text-[var(--ink-muted)] hover:text-[var(--ink-primary)] cursor-pointer shrink-0"
                                      >
                                        <ChevronRight
                                          className={`w-2.5 h-2.5 transition-transform duration-150 ${
                                            isSubOpen ? 'rotate-90' : ''
                                          }`}
                                          aria-hidden="true"
                                        />
                                      </button>
                                      <Link
                                        to={subRoute}
                                        onClick={onSelectLink}
                                        className={`flex-1 flex items-center justify-between gap-1.5 px-1.5 py-1 rounded text-[11px] no-underline transition-colors ${
                                          subActive
                                            ? 'bg-[var(--accent-soft)] text-[var(--accent)] font-medium'
                                            : 'text-[var(--ink-secondary)] hover:text-[var(--ink-primary)] hover:bg-[var(--bg-subtle)]'
                                        }`}
                                      >
                                        <span className="truncate">
                                          <span className="font-mono tabular-nums mr-1 opacity-70">
                                            {sub.code}
                                          </span>
                                          {sub.title}
                                        </span>
                                        {renderStatusIcon(sub.id)}
                                      </Link>
                                    </div>

                                    {isSubOpen && (
                                      <div className="pl-3.5 ml-2 border-l border-[var(--border-hairline)] space-y-0.5">
                                        {sub.topics.map((topic) => {
                                          const topicRoute = getTopicRoute(
                                            part.slug,
                                            chapter.slug,
                                            sub.slug,
                                            topic.slug,
                                          );
                                          const topicActive = isRouteActive(topicRoute);
                                          return (
                                            <Link
                                              key={topic.id}
                                              to={topicRoute}
                                              onClick={onSelectLink}
                                              className={`flex items-center justify-between gap-1.5 px-2 py-1 rounded text-[11px] no-underline transition-colors ${
                                                topicActive
                                                  ? 'bg-[var(--accent-soft)] text-[var(--accent)] font-medium'
                                                  : 'text-[var(--ink-muted)] hover:text-[var(--ink-primary)] hover:bg-[var(--bg-subtle)]'
                                              }`}
                                            >
                                              <span className="truncate">
                                                <span className="font-mono tabular-nums mr-1 opacity-75">
                                                  {topic.code}
                                                </span>
                                                {topic.title}
                                              </span>
                                              {renderStatusIcon(topic.id)}
                                            </Link>
                                          );
                                        })}
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
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}

        {/* Appendices section */}
        <div className="pt-2 mt-2 border-t border-[var(--border-hairline)] space-y-0.5">
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={() => setAppendixExpanded((prev) => !prev)}
              aria-expanded={appendixExpanded || Boolean(normalizedFilter)}
              aria-label="Toggle Appendices"
              className="w-6 h-7 inline-flex items-center justify-center rounded text-[var(--ink-muted)] hover:text-[var(--ink-primary)] cursor-pointer shrink-0"
            >
              <ChevronRight
                className={`w-3.5 h-3.5 transition-transform duration-150 ${
                  appendixExpanded || Boolean(normalizedFilter) ? 'rotate-90' : ''
                }`}
                aria-hidden="true"
              />
            </button>
            <Link
              to="/book/appendix"
              onClick={onSelectLink}
              className={`flex-1 flex items-center justify-between gap-2 px-2 py-1.5 rounded-md text-xs font-semibold no-underline transition-colors ${
                isRouteActive('/book/appendix')
                  ? 'bg-[var(--accent-soft)] text-[var(--accent)]'
                  : 'text-[var(--ink-primary)] hover:bg-[var(--bg-subtle)]'
              }`}
            >
              <span>Appendices A–E</span>
              {renderStatusIcon('appendix-root')}
            </Link>
          </div>

          {(appendixExpanded || Boolean(normalizedFilter)) && (
            <div className="pl-4 ml-2.5 border-l border-[var(--border-hairline)] space-y-0.5">
              {APPENDICES.map((app) => {
                const appRoute = `/book/appendix/${app.slug}`;
                const open = Boolean(normalizedFilter) || Boolean(expandedAppendices[app.id]);
                return (
                  <div key={app.id} className="space-y-0.5">
                    <div className="flex items-center gap-1">
                      <button
                        type="button"
                        onClick={() =>
                          setExpandedAppendices((prev) => ({ ...prev, [app.id]: !open }))
                        }
                        aria-expanded={open}
                        aria-label={`Toggle ${app.code}`}
                        className="w-5 h-6 inline-flex items-center justify-center rounded text-[var(--ink-muted)] hover:text-[var(--ink-primary)] cursor-pointer shrink-0"
                      >
                        <ChevronRight
                          className={`w-3 h-3 transition-transform duration-150 ${
                            open ? 'rotate-90' : ''
                          }`}
                          aria-hidden="true"
                        />
                      </button>
                      <Link
                        to={appRoute}
                        onClick={onSelectLink}
                        className={`flex-1 flex items-center justify-between gap-1.5 px-2 py-1 rounded-md text-xs no-underline transition-colors ${
                          isRouteActive(appRoute)
                            ? 'bg-[var(--accent-soft)] text-[var(--accent)] font-medium'
                            : 'text-[var(--ink-secondary)] hover:text-[var(--ink-primary)] hover:bg-[var(--bg-subtle)]'
                        }`}
                      >
                        <span className="truncate">
                          <span className="font-mono text-[11px] mr-1 opacity-75">{app.letter}.</span>
                          {app.title}
                        </span>
                        {renderStatusIcon(app.id)}
                      </Link>
                    </div>
                    {open && (
                      <div className="pl-3.5 ml-2 border-l border-[var(--border-hairline)] space-y-0.5">
                        {app.sections.map((sec) => {
                          const secRoute = `${appRoute}/${sec.slug}`;
                          return (
                            <Link
                              key={sec.id}
                              to={secRoute}
                              onClick={onSelectLink}
                              className={`flex items-center justify-between gap-1.5 px-2 py-1 rounded text-[11px] no-underline transition-colors ${
                                isRouteActive(secRoute)
                                  ? 'bg-[var(--accent-soft)] text-[var(--accent)] font-medium'
                                  : 'text-[var(--ink-muted)] hover:text-[var(--ink-primary)] hover:bg-[var(--bg-subtle)]'
                              }`}
                            >
                              <span className="truncate">
                                <span className="font-mono tabular-nums mr-1 opacity-75">
                                  {sec.code}
                                </span>
                                {sec.title}
                              </span>
                              {renderStatusIcon(sec.id)}
                            </Link>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Legend */}
      <div className="px-3 py-2.5 border-t border-[var(--border-hairline)] text-[11px] text-[var(--ink-muted)] flex items-center justify-between">
        <span className="inline-flex items-center gap-1.5">
          <Circle className="w-2 h-2 fill-[var(--accent)] text-[var(--accent)]" aria-hidden="true" />
          Visited
        </span>
        <span className="inline-flex items-center gap-1.5">
          <Check className="w-3 h-3 text-[var(--highlight)]" aria-hidden="true" />
          Marked complete
        </span>
      </div>
    </aside>
  );
}
