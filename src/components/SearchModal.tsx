import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useHistory } from '@docusaurus/router';
import { useBaseUrlUtils } from '@docusaurus/useBaseUrl';
import { AnimatePresence, motion } from 'motion/react';
import { ArrowRight, BookOpen, Compass, FileText, Hash, Layers, Search, X } from 'lucide-react';
import { ALL_NODES } from '@site/src/data/bookData';
import { useBookContext } from '@site/src/context/BookContext';
import type { NodeKind } from '@site/src/types/book';

interface SearchResultItem {
  id: string;
  group: string;
  code: string;
  title: string;
  subtitle: string;
  route: string;
  kind: NodeKind | 'page';
}

const SITE_PAGES: SearchResultItem[] = [
  { id: 'page-home', group: 'Pages', code: 'Home', title: 'The AI-Native Engineer', subtitle: 'Landing page & overview', route: '/', kind: 'page' },
  { id: 'page-start', group: 'Pages', code: 'Guide', title: 'Start Here', subtitle: 'How to read and navigate the book', route: '/start-here', kind: 'page' },
  { id: 'page-roadmap', group: 'Pages', code: 'Pathway', title: 'Learning Roadmap', subtitle: '10-part progression across 638 hours', route: '/roadmap', kind: 'page' },
  { id: 'page-structure', group: 'Pages', code: 'Outline', title: 'Book Structure', subtitle: 'Interactive full-book hierarchy', route: '/structure', kind: 'page' },
  { id: 'page-parts', group: 'Pages', code: 'Index', title: 'All Parts', subtitle: 'Browse Parts 01 through 10', route: '/parts', kind: 'page' },
  { id: 'page-chapters', group: 'Pages', code: 'Index', title: 'All Chapters', subtitle: 'Browse all 42 chapters', route: '/chapters', kind: 'page' },
  { id: 'page-appendix', group: 'Pages', code: 'Index', title: 'Appendices', subtitle: 'Appendices A through E', route: '/appendix', kind: 'page' },
  { id: 'page-glossary', group: 'Pages', code: 'Reference', title: 'Glossary', subtitle: 'Engineering & AI terminology index', route: '/glossary', kind: 'page' },
  { id: 'page-resources', group: 'Pages', code: 'Reference', title: 'Resources', subtitle: 'Curated tools & reading links', route: '/resources', kind: 'page' },
  { id: 'page-about', group: 'Pages', code: 'Book', title: 'About the Book', subtitle: 'Philosophy, scope & reading approach', route: '/about', kind: 'page' },
  { id: 'page-author', group: 'Pages', code: 'Author', title: 'About the Author', subtitle: 'Hamid Raza', route: '/author', kind: 'page' },
];

function kindToGroup(kind: NodeKind): string {
  switch (kind) {
    case 'intro-part':
    case 'intro-section':
    case 'intro-topic':
      return 'Part 00 — Introduction';
    case 'part':
      return 'Parts';
    case 'chapter':
      return 'Chapters';
    case 'subchapter':
      return 'Subchapters';
    case 'topic':
      return 'Topics';
    case 'appendix-root':
    case 'appendix':
    case 'appendix-section':
      return 'Appendices';
  }
}

const ALL_SEARCH_ITEMS: SearchResultItem[] = [
  ...SITE_PAGES,
  ...ALL_NODES.map((node) => ({
    id: node.id,
    group: kindToGroup(node.kind),
    code: node.code,
    title: node.title,
    subtitle: node.breadcrumbs.map((b) => b.label).join(' / '),
    route: node.route,
    kind: node.kind,
  })),
];

const SUGGESTED_ROUTES: SearchResultItem[] = [
  ALL_SEARCH_ITEMS.find((i) => i.id === 'part-00')!,
  ALL_SEARCH_ITEMS.find((i) => i.id === 'sec-00-3')!,
  ALL_SEARCH_ITEMS.find((i) => i.id === 'ch-01')!,
  ALL_SEARCH_ITEMS.find((i) => i.id === 'ch-30')!,
  ALL_SEARCH_ITEMS.find((i) => i.id === 'ch-32')!,
  ALL_SEARCH_ITEMS.find((i) => i.id === 'ch-39')!,
  ALL_SEARCH_ITEMS.find((i) => i.id === 'app-a')!,
  ALL_SEARCH_ITEMS.find((i) => i.id === 'ch-42')!,
].filter(Boolean);

function HighlightText({ text, query }: { text: string; query: string }): React.ReactElement {
  const trimmed = query.trim();
  if (!trimmed) return <>{text}</>;
  const escaped = trimmed.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const regex = new RegExp(`(${escaped})`, 'gi');
  const parts = text.split(regex);
  const lowerTrimmed = trimmed.toLowerCase();
  return (
    <>
      {parts.map((part, idx) =>
        part.toLowerCase() === lowerTrimmed ? (
          <mark
            key={idx}
            className="bg-[var(--accent-soft)] text-[var(--accent)] rounded px-0.5 font-medium"
          >
            {part}
          </mark>
        ) : (
          <React.Fragment key={idx}>{part}</React.Fragment>
        ),
      )}
    </>
  );
}

function ResultIcon({ kind }: { kind: NodeKind | 'page' }): React.ReactElement {
  switch (kind) {
    case 'intro-part':
    case 'part':
      return <Layers className="w-4 h-4 shrink-0" aria-hidden="true" />;
    case 'intro-section':
    case 'chapter':
      return <BookOpen className="w-4 h-4 shrink-0" aria-hidden="true" />;
    case 'subchapter':
      return <Hash className="w-4 h-4 shrink-0" aria-hidden="true" />;
    case 'page':
      return <Compass className="w-4 h-4 shrink-0" aria-hidden="true" />;
    default:
      return <FileText className="w-4 h-4 shrink-0" aria-hidden="true" />;
  }
}

export function SearchModal(): React.ReactElement {
  const { isSearchOpen, closeSearch } = useBookContext();
  const [query, setQuery] = useState('');
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const history = useHistory();
  const { withBaseUrl } = useBaseUrlUtils();

  useEffect(() => {
    if (isSearchOpen) {
      setQuery('');
      setActiveIndex(0);
      const timer = setTimeout(() => inputRef.current?.focus(), 40);
      return () => clearTimeout(timer);
    }
  }, [isSearchOpen]);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return SUGGESTED_ROUTES;
    const tokens = q.split(/\s+/).filter(Boolean);
    const matched = ALL_SEARCH_ITEMS.filter((item) => {
      const haystack = `${item.code} ${item.title} ${item.subtitle}`.toLowerCase();
      return tokens.every((t) => haystack.includes(t));
    });
    return matched.slice(0, 36);
  }, [query]);

  const groupedResults = useMemo(() => {
    const order = ['Pages', 'Part 00 — Introduction', 'Parts', 'Chapters', 'Subchapters', 'Topics', 'Appendices'];
    const map = new Map<string, SearchResultItem[]>();
    for (const item of results) {
      const key = query.trim() ? item.group : 'Quick Jumps';
      const arr = map.get(key) ?? [];
      arr.push(item);
      map.set(key, arr);
    }
    if (!query.trim()) {
      return Array.from(map.entries());
    }
    return order
      .filter((k) => map.has(k))
      .map((k) => [k, map.get(k)!] as [string, SearchResultItem[]]);
  }, [results, query]);

  const flatResults = useMemo(
    () => groupedResults.flatMap(([, items]) => items),
    [groupedResults],
  );

  useEffect(() => {
    setActiveIndex(0);
  }, [query]);

  const handleSelect = (item: SearchResultItem) => {
    closeSearch();
    history.push(withBaseUrl(item.route));
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      e.preventDefault();
      closeSearch();
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (flatResults.length > 0) {
        setActiveIndex((prev) => (prev + 1) % flatResults.length);
      }
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (flatResults.length > 0) {
        setActiveIndex((prev) => (prev - 1 + flatResults.length) % flatResults.length);
      }
    } else if (e.key === 'Enter' && flatResults[activeIndex]) {
      e.preventDefault();
      handleSelect(flatResults[activeIndex]);
    }
  };

  return (
    <AnimatePresence>
      {isSearchOpen && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label="Search the book"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.16 }}
          className="fixed inset-0 z-50 flex items-start justify-center pt-[10vh] px-4 bg-black/60 backdrop-blur-sm"
          onClick={closeSearch}
          onKeyDown={handleKeyDown}
        >
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-2xl rounded-xl border border-[var(--border-strong)] bg-[var(--bg-surface)] shadow-2xl overflow-hidden"
          >
            <div className="flex items-center gap-3 px-4 py-3.5 border-b border-[var(--border-hairline)]">
              <Search className="w-4 h-4 text-[var(--ink-muted)] shrink-0" aria-hidden="true" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search parts, chapters, subchapters, topics, or appendices..."
                aria-label="Search book contents"
                className="flex-1 bg-transparent border-0 text-sm text-[var(--ink-primary)] placeholder:text-[var(--ink-muted)] focus:outline-none"
              />
              {query && (
                <button
                  type="button"
                  onClick={() => setQuery('')}
                  aria-label="Clear search query"
                  className="p-1 rounded text-[var(--ink-muted)] hover:text-[var(--ink-primary)] cursor-pointer"
                >
                  <X className="w-3.5 h-3.5" aria-hidden="true" />
                </button>
              )}
              <button
                type="button"
                onClick={closeSearch}
                aria-label="Close search"
                className="px-2 py-1 text-xs font-mono text-[var(--ink-muted)] border border-[var(--border-hairline)] rounded hover:text-[var(--ink-primary)] cursor-pointer"
              >
                Esc
              </button>
            </div>

            <div className="max-h-[60vh] overflow-y-auto p-2">
              {flatResults.length === 0 ? (
                <div className="py-12 px-6 text-center">
                  <p className="text-sm font-medium text-[var(--ink-primary)]">
                    No matching chapters or topics found
                  </p>
                  <p className="mt-1 text-xs text-[var(--ink-muted)]">
                    Try searching for a part, chapter number, LinkedIn, MCP, Docker, or Appendix.
                  </p>
                </div>
              ) : (
                groupedResults.map(([group, items]) => (
                  <div key={group} className="mb-3 last:mb-0">
                    <div className="px-3 py-1.5 text-xs font-medium text-[var(--ink-muted)] tracking-wide">
                      {group}
                    </div>
                    <div className="space-y-0.5">
                      {items.map((item) => {
                        const globalIdx = flatResults.findIndex((r) => r.id === item.id);
                        const isActive = globalIdx === activeIndex;
                        return (
                          <button
                            key={item.id}
                            type="button"
                            onClick={() => handleSelect(item)}
                            onMouseEnter={() => setActiveIndex(globalIdx)}
                            className={`w-full flex items-center justify-between gap-3 px-3 py-2.5 rounded-lg text-left transition-colors duration-100 cursor-pointer ${
                              isActive
                                ? 'bg-[var(--accent-soft)] text-[var(--ink-primary)]'
                                : 'text-[var(--ink-secondary)] hover:bg-[var(--bg-subtle)]'
                            }`}
                          >
                            <div className="flex items-center gap-3 min-w-0">
                              <span className={isActive ? 'text-[var(--accent)]' : 'text-[var(--ink-muted)]'}>
                                <ResultIcon kind={item.kind} />
                              </span>
                              <div className="min-w-0">
                                <div className="text-sm font-medium text-[var(--ink-primary)] truncate">
                                  <span className="font-mono text-xs text-[var(--accent)] mr-2 tabular-nums">
                                    {item.code}
                                  </span>
                                  <HighlightText text={item.title} query={query} />
                                </div>
                                <div className="text-xs text-[var(--ink-muted)] truncate mt-0.5">
                                  <HighlightText text={item.subtitle} query={query} />
                                </div>
                              </div>
                            </div>
                            <ArrowRight
                              className={`w-3.5 h-3.5 shrink-0 transition-transform ${
                                isActive ? 'text-[var(--accent)] translate-x-0.5' : 'text-[var(--ink-muted)] opacity-40'
                              }`}
                              aria-hidden="true"
                            />
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))
              )}
            </div>

            <div className="flex items-center justify-between px-4 py-2.5 border-t border-[var(--border-hairline)] bg-[var(--bg-subtle)] text-xs text-[var(--ink-muted)]">
              <div className="flex items-center gap-4">
                <span>
                  <kbd className="font-mono">↑↓</kbd> Navigate
                </span>
                <span>
                  <kbd className="font-mono">↵</kbd> Open
                </span>
                <span>
                  <kbd className="font-mono">Esc</kbd> Close
                </span>
              </div>
              <span className="font-mono tabular-nums">{ALL_SEARCH_ITEMS.length} indexed pages</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
