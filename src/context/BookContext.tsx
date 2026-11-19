import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { ALL_NODES, BOOK_PARTS, PART_ZERO } from '@site/src/data/bookData';

const STORAGE_KEY = 'ainative_book_progress_v1';

interface ProgressState {
  visitedIds: string[];
  completedIds: string[];
  lastVisitedRoute: string | null;
}

interface BookContextValue {
  visitedIds: Set<string>;
  completedIds: Set<string>;
  lastVisitedRoute: string | null;
  markVisited: (id: string, route?: string) => void;
  toggleCompleted: (id: string) => void;
  resetProgress: () => void;
  getChapterProgress: (chapterId: string) => {
    total: number;
    visited: number;
    completed: number;
  };
  getIntroSectionProgress: (sectionCode: string) => {
    total: number;
    visited: number;
    completed: number;
  };
  overallStats: {
    totalPages: number;
    visitedCount: number;
    completedCount: number;
  };
  isSearchOpen: boolean;
  openSearch: () => void;
  closeSearch: () => void;
  isMobileNavOpen: boolean;
  openMobileNav: () => void;
  closeMobileNav: () => void;
  toggleMobileNav: () => void;
}

const BookContext = createContext<BookContextValue | null>(null);

export function BookProvider({ children }: { children: React.ReactNode }): React.ReactElement {
  const [progress, setProgress] = useState<ProgressState>({
    visitedIds: [],
    completedIds: [],
    lastVisitedRoute: null,
  });
  const [hydrated, setHydrated] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  // Load persisted local reading progress (browser-only, no backend)
  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as Partial<ProgressState>;
        setProgress({
          visitedIds: Array.isArray(parsed.visitedIds) ? parsed.visitedIds : [],
          completedIds: Array.isArray(parsed.completedIds) ? parsed.completedIds : [],
          lastVisitedRoute:
            typeof parsed.lastVisitedRoute === 'string' ? parsed.lastVisitedRoute : null,
        });
      }
    } catch {
      // Ignore storage read errors in restricted browsers
    } finally {
      setHydrated(true);
    }
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
    } catch {
      // Ignore storage write errors
    }
  }, [progress, hydrated]);

  // Global Cmd+K / Ctrl+K shortcut for search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsSearchOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const markVisited = useCallback((id: string, route?: string) => {
    setProgress((prev) => {
      const alreadyVisited = prev.visitedIds.includes(id);
      const nextRoute = route ?? prev.lastVisitedRoute;
      if (alreadyVisited && prev.lastVisitedRoute === nextRoute) {
        return prev;
      }
      return {
        ...prev,
        visitedIds: alreadyVisited ? prev.visitedIds : [...prev.visitedIds, id],
        lastVisitedRoute: nextRoute,
      };
    });
  }, []);

  const toggleCompleted = useCallback((id: string) => {
    setProgress((prev) => {
      const exists = prev.completedIds.includes(id);
      const nextCompleted = exists
        ? prev.completedIds.filter((item) => item !== id)
        : [...prev.completedIds, id];
      const nextVisited = prev.visitedIds.includes(id)
        ? prev.visitedIds
        : [...prev.visitedIds, id];
      return {
        ...prev,
        visitedIds: nextVisited,
        completedIds: nextCompleted,
      };
    });
  }, []);

  const resetProgress = useCallback(() => {
    setProgress({ visitedIds: [], completedIds: [], lastVisitedRoute: null });
  }, []);

  const visitedIds = useMemo(() => new Set(progress.visitedIds), [progress.visitedIds]);
  const completedIds = useMemo(() => new Set(progress.completedIds), [progress.completedIds]);

  const getChapterProgress = useCallback(
    (chapterId: string) => {
      for (const part of BOOK_PARTS) {
        const chapter = part.chapters.find((c) => c.id === chapterId);
        if (chapter) {
          const ids: string[] = [chapter.id];
          for (const sub of chapter.subchapters) {
            ids.push(sub.id);
            for (const topic of sub.topics) {
              ids.push(topic.id);
            }
          }
          const visited = ids.filter((id) => visitedIds.has(id)).length;
          const completed = ids.filter((id) => completedIds.has(id)).length;
          return { total: ids.length, visited, completed };
        }
      }
      return { total: 0, visited: 0, completed: 0 };
    },
    [visitedIds, completedIds],
  );

  const getIntroSectionProgress = useCallback(
    (sectionCode: string) => {
      const sec = PART_ZERO.sections.find((s) => s.code === sectionCode);
      if (!sec) return { total: 0, visited: 0, completed: 0 };
      const ids: string[] = [sec.id, ...sec.topics.map((t) => t.id)];
      const visited = ids.filter((id) => visitedIds.has(id)).length;
      const completed = ids.filter((id) => completedIds.has(id)).length;
      return { total: ids.length, visited, completed };
    },
    [visitedIds, completedIds],
  );

  const overallStats = useMemo(
    () => ({
      totalPages: ALL_NODES.length,
      visitedCount: progress.visitedIds.length,
      completedCount: progress.completedIds.length,
    }),
    [progress.visitedIds.length, progress.completedIds.length],
  );

  const value = useMemo<BookContextValue>(
    () => ({
      visitedIds,
      completedIds,
      lastVisitedRoute: progress.lastVisitedRoute,
      markVisited,
      toggleCompleted,
      resetProgress,
      getChapterProgress,
      getIntroSectionProgress,
      overallStats,
      isSearchOpen,
      openSearch: () => setIsSearchOpen(true),
      closeSearch: () => setIsSearchOpen(false),
      isMobileNavOpen,
      openMobileNav: () => setIsMobileNavOpen(true),
      closeMobileNav: () => setIsMobileNavOpen(false),
      toggleMobileNav: () => setIsMobileNavOpen((p) => !p),
    }),
    [
      visitedIds,
      completedIds,
      progress.lastVisitedRoute,
      markVisited,
      toggleCompleted,
      resetProgress,
      getChapterProgress,
      getIntroSectionProgress,
      overallStats,
      isSearchOpen,
      isMobileNavOpen,
    ],
  );

  return <BookContext.Provider value={value}>{children}</BookContext.Provider>;
}

export function useBookContext(): BookContextValue {
  const ctx = useContext(BookContext);
  if (!ctx) {
    throw new Error('useBookContext must be used inside BookProvider');
  }
  return ctx;
}
