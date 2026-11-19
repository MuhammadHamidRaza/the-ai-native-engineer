import React from 'react';
import Link from '@docusaurus/Link';
import { AnimatePresence, motion } from 'motion/react';
import { Search, X } from 'lucide-react';
import { useBookContext } from '@site/src/context/BookContext';
import { BookSidebar } from './BookSidebar';

const DRAWER_LINKS = [
  { label: 'Home', to: '/' },
  { label: 'Start Here', to: '/start-here' },
  { label: 'Learning Roadmap', to: '/roadmap' },
  { label: 'Book Structure', to: '/structure' },
  { label: 'All Parts', to: '/parts' },
  { label: 'All Chapters', to: '/chapters' },
  { label: 'Appendices', to: '/appendix' },
  { label: 'About the Book', to: '/about' },
  { label: 'About the Author', to: '/author' },
];

export function MobileBookNavigation(): React.ReactElement {
  const { isMobileNavOpen, closeMobileNav, openSearch } = useBookContext();

  return (
    <AnimatePresence>
      {isMobileNavOpen && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label="Mobile navigation"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
          className="fixed inset-0 z-50 lg:hidden flex bg-black/60 backdrop-blur-sm"
          onClick={closeMobileNav}
        >
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="w-[88vw] max-w-[360px] h-full bg-[var(--bg-surface)] border-r border-[var(--border-hairline)] flex flex-col overflow-hidden"
          >
            <div className="h-14 px-4 flex items-center justify-between border-b border-[var(--border-hairline)] shrink-0">
              <span className="font-display text-base font-semibold text-[var(--ink-primary)]">
                Navigation
              </span>
              <button
                type="button"
                onClick={closeMobileNav}
                aria-label="Close navigation menu"
                className="w-10 h-10 inline-flex items-center justify-center rounded-lg text-[var(--ink-secondary)] hover:text-[var(--ink-primary)] cursor-pointer"
              >
                <X className="w-5 h-5" aria-hidden="true" />
              </button>
            </div>

            <div className="px-4 py-3 border-b border-[var(--border-hairline)] space-y-2 shrink-0">
              <button
                type="button"
                onClick={() => {
                  closeMobileNav();
                  openSearch();
                }}
                className="w-full h-11 px-3 rounded-lg border border-[var(--border-hairline)] bg-[var(--bg-canvas)] flex items-center gap-2.5 text-sm text-[var(--ink-secondary)] cursor-pointer"
              >
                <Search className="w-4 h-4" aria-hidden="true" />
                <span>Search chapters & topics...</span>
              </button>

              <div className="grid grid-cols-2 gap-1.5 pt-1">
                {DRAWER_LINKS.map((link) => (
                  <Link
                    key={link.to}
                    to={link.to}
                    onClick={closeMobileNav}
                    className="px-2.5 py-2 rounded-md text-xs font-medium text-[var(--ink-secondary)] hover:text-[var(--ink-primary)] hover:bg-[var(--bg-subtle)] no-underline truncate"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>

            <div className="flex-1 min-h-0 overflow-hidden">
              <BookSidebar onSelectLink={closeMobileNav} />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
