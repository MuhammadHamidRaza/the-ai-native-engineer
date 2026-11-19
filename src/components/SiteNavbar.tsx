import React from 'react';
import Link from '@docusaurus/Link';
import { useLocation } from '@docusaurus/router';
import { Menu, Search } from 'lucide-react';
import { useBookContext } from '@site/src/context/BookContext';
import { ThemeToggle } from './ThemeToggle';

const NAV_LINKS = [
  { label: 'Start Here', to: '/start-here' },
  { label: 'Roadmap', to: '/roadmap' },
  { label: 'Structure', to: '/structure' },
  { label: 'Book', to: '/parts' },
  { label: 'Appendix', to: '/appendix' },
];

export function SiteNavbar(): React.ReactElement {
  const { pathname } = useLocation();
  const { openSearch, openMobileNav } = useBookContext();

  const isActive = (to: string) => {
    if (to === '/parts' && pathname.includes('/book/part-')) return true;
    if (to === '/appendix' && pathname.includes('/appendix')) return true;
    return pathname === to || pathname.endsWith(to);
  };

  return (
    <header className="sticky top-0 z-40 h-14 border-b border-[var(--border-hairline)] glass-surface">
      <div className="max-w-[1440px] mx-auto h-full px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-8">
        {/* Zone 1: Single-line Brand Wordmark */}
        <Link
          to="/"
          className="font-display text-base sm:text-lg font-semibold tracking-tight text-[var(--ink-primary)] hover:text-[var(--accent)] transition-colors whitespace-nowrap shrink-0 no-underline"
        >
          The AI-Native Engineer
        </Link>

        {/* Zone 2: 5 concise single-line text navigation links */}
        <nav
          aria-label="Primary navigation"
          className="hidden lg:flex items-center gap-6 text-sm font-medium"
        >
          {NAV_LINKS.map((item) => {
            const active = isActive(item.to);
            return (
              <Link
                key={item.to}
                to={item.to}
                className={`relative py-1 whitespace-nowrap shrink-0 no-underline transition-colors duration-150 ${
                  active
                    ? 'text-[var(--ink-primary)]'
                    : 'text-[var(--ink-secondary)] hover:text-[var(--ink-primary)]'
                }`}
              >
                {item.label}
                {active && (
                  <span
                    aria-hidden="true"
                    className="absolute inset-x-0 -bottom-[17px] h-[2px] bg-[var(--accent)]"
                  />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Zone 3: Search, Theme & Mobile Menu */}
        <div className="flex items-center gap-2.5 shrink-0">
          <button
            type="button"
            onClick={openSearch}
            aria-label="Open book search"
            className="inline-flex items-center gap-2 h-9 px-3 rounded-lg border border-[var(--border-hairline)] bg-[var(--bg-surface)] text-xs font-medium text-[var(--ink-secondary)] hover:text-[var(--ink-primary)] hover:border-[var(--border-strong)] transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer"
          >
            <Search className="w-3.5 h-3.5" aria-hidden="true" />
            <span className="hidden sm:inline">Search</span>
            <kbd className="hidden md:inline font-mono text-[11px] text-[var(--ink-muted)]">
              ⌘K
            </kbd>
          </button>

          <ThemeToggle />

          <button
            type="button"
            onClick={openMobileNav}
            aria-label="Open navigation menu"
            className="lg:hidden inline-flex items-center justify-center w-9 h-9 rounded-lg border border-[var(--border-hairline)] bg-[var(--bg-surface)] text-[var(--ink-secondary)] hover:text-[var(--ink-primary)] transition-colors cursor-pointer shrink-0"
          >
            <Menu className="w-4 h-4" aria-hidden="true" />
          </button>
        </div>
      </div>
    </header>
  );
}
