import React from 'react';
import Link from '@docusaurus/Link';
import { ArrowUp, ExternalLink } from 'lucide-react';
import { BOOK_META } from '@site/src/data/bookData';

export function Footer(): React.ReactElement {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-[var(--border-hairline)] bg-[var(--bg-surface)] mt-auto">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-10 border-b border-[var(--border-hairline)]">
          <div className="md:col-span-5">
            <div className="font-display text-xl font-semibold text-[var(--ink-primary)]">
              {BOOK_META.title}
            </div>
            <p className="mt-1.5 text-sm text-[var(--ink-secondary)]">
              {BOOK_META.subtitle}
            </p>
            <p className="mt-3 text-xs text-[var(--ink-muted)]">
              Written by {BOOK_META.author} · {BOOK_META.totalParts} Parts ·{' '}
              {BOOK_META.totalChapters} Chapters · {BOOK_META.totalHours} Hours
            </p>
          </div>

          <div className="md:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-8 text-sm">
            <div>
              <div className="text-xs font-medium text-[var(--ink-muted)] mb-3">
                Reading Guide
              </div>
              <ul className="space-y-2 list-none p-0 m-0">
                <li>
                  <Link to="/start-here" className="text-[var(--ink-secondary)] hover:text-[var(--ink-primary)] no-underline">
                    Start Here
                  </Link>
                </li>
                <li>
                  <Link to="/roadmap" className="text-[var(--ink-secondary)] hover:text-[var(--ink-primary)] no-underline">
                    Learning Roadmap
                  </Link>
                </li>
                <li>
                  <Link to="/structure" className="text-[var(--ink-secondary)] hover:text-[var(--ink-primary)] no-underline">
                    Book Structure
                  </Link>
                </li>
                <li>
                  <Link to="/parts" className="text-[var(--ink-secondary)] hover:text-[var(--ink-primary)] no-underline">
                    All Parts
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <div className="text-xs font-medium text-[var(--ink-muted)] mb-3">
                Index & Reference
              </div>
              <ul className="space-y-2 list-none p-0 m-0">
                <li>
                  <Link to="/chapters" className="text-[var(--ink-secondary)] hover:text-[var(--ink-primary)] no-underline">
                    All Chapters
                  </Link>
                </li>
                <li>
                  <Link to="/appendix" className="text-[var(--ink-secondary)] hover:text-[var(--ink-primary)] no-underline">
                    Appendices
                  </Link>
                </li>
                <li>
                  <Link to="/glossary" className="text-[var(--ink-secondary)] hover:text-[var(--ink-primary)] no-underline">
                    Glossary
                  </Link>
                </li>
                <li>
                  <Link to="/resources" className="text-[var(--ink-secondary)] hover:text-[var(--ink-primary)] no-underline">
                    Resources
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <div className="text-xs font-medium text-[var(--ink-muted)] mb-3">
                Publication
              </div>
              <ul className="space-y-2 list-none p-0 m-0">
                <li>
                  <Link to="/about" className="text-[var(--ink-secondary)] hover:text-[var(--ink-primary)] no-underline">
                    About the Book
                  </Link>
                </li>
                <li>
                  <Link to="/author" className="text-[var(--ink-secondary)] hover:text-[var(--ink-primary)] no-underline">
                    About the Author
                  </Link>
                </li>
                <li>
                  <a
                    href={BOOK_META.githubRepo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-[var(--ink-secondary)] hover:text-[var(--ink-primary)] no-underline"
                  >
                    <span>GitHub Repository</span>
                    <ExternalLink className="w-3 h-3" aria-hidden="true" />
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-[var(--ink-muted)]">
          <p className="m-0">
            © {new Date().getFullYear()} {BOOK_META.author}. All rights reserved.
          </p>

          <button
            type="button"
            onClick={scrollToTop}
            aria-label="Back to top"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[var(--border-hairline)] text-[var(--ink-secondary)] hover:text-[var(--ink-primary)] hover:border-[var(--border-strong)] transition-colors cursor-pointer"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5" aria-hidden="true" />
          </button>
        </div>
      </div>
    </footer>
  );
}
