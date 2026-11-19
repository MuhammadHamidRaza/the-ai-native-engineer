import React, { useEffect, useState } from 'react';
import { useLocation } from '@docusaurus/router';
import { motion } from 'motion/react';
import { ArrowUp, PanelLeftClose, PanelLeftOpen } from 'lucide-react';
import { findNodeByPermalink } from '@site/src/data/bookData';
import { BookSidebar } from './BookSidebar';
import { TableOfContents } from './TableOfContents';

export function ReadingLayout({ children }: { children: React.ReactNode }): React.ReactElement {
  const { pathname } = useLocation();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [showTopBtn, setShowTopBtn] = useState(false);

  const currentNode = findNodeByPermalink(pathname);

  useEffect(() => {
    const onScroll = () => {
      setShowTopBtn(window.scrollY > 360);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className="max-w-[1440px] mx-auto w-full flex-1 flex items-start px-4 sm:px-6 lg:px-8 gap-8">
      {/* Left: Collapsible Book Navigation */}
      <div
        className={`hidden lg:block shrink-0 transition-all duration-200 ${
          sidebarCollapsed ? 'w-0 overflow-hidden' : 'w-72'
        }`}
      >
        <div className="sticky top-14 h-[calc(100vh-3.5rem)] border-r border-[var(--border-hairline)] bg-[var(--bg-canvas)]">
          <BookSidebar collapsed={sidebarCollapsed} />
        </div>
      </div>

      {/* Center: Main Reading Column */}
      <div className="flex-1 min-w-0 py-8 lg:py-10">
        <div className="hidden lg:flex items-center mb-4">
          <button
            type="button"
            onClick={() => setSidebarCollapsed((p) => !p)}
            aria-label={sidebarCollapsed ? 'Expand book navigation' : 'Collapse book navigation'}
            className="inline-flex items-center gap-2 px-2.5 py-1.5 rounded-lg border border-[var(--border-hairline)] bg-[var(--bg-surface)] text-xs text-[var(--ink-secondary)] hover:text-[var(--ink-primary)] hover:border-[var(--border-strong)] transition-colors cursor-pointer"
          >
            {sidebarCollapsed ? (
              <>
                <PanelLeftOpen className="w-3.5 h-3.5" aria-hidden="true" />
                <span>Show contents</span>
              </>
            ) : (
              <>
                <PanelLeftClose className="w-3.5 h-3.5" aria-hidden="true" />
                <span>Hide contents</span>
              </>
            )}
          </button>
        </div>

        <motion.div
          key={pathname}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-[760px] mx-auto"
        >
          {children}
        </motion.div>
      </div>

      {/* Right: Table of Contents Outline */}
      {currentNode && <TableOfContents node={currentNode} />}

      {/* Smooth Back-to-Top Floating Action */}
      {showTopBtn && (
        <button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          aria-label="Scroll back to top"
          className="fixed bottom-6 right-6 z-30 w-10 h-10 rounded-full border border-[var(--border-strong)] bg-[var(--bg-surface)] text-[var(--ink-primary)] shadow-lg flex items-center justify-center hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors cursor-pointer"
        >
          <ArrowUp className="w-4 h-4" aria-hidden="true" />
        </button>
      )}
    </div>
  );
}
