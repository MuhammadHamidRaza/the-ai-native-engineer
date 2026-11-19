import React from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import { ArrowRight } from 'lucide-react';
import { BOOK_META } from '@site/src/data/bookData';
import { EmptyContentPlaceholder } from '@site/src/components/EmptyContentPlaceholder';
import { AnimatedSection } from '@site/src/components/AnimatedSection';

export default function AboutAuthorPage(): React.ReactElement {
  return (
    <Layout title="About the Author" description={`${BOOK_META.author} — Author of ${BOOK_META.title}`}>
      <main className="max-w-[900px] mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <AnimatedSection>
          <div className="text-xs font-mono text-[var(--accent)] mb-3">
            Author
          </div>
          <h1 className="font-display text-3xl sm:text-5xl font-semibold text-[var(--ink-primary)] m-0">
            {BOOK_META.author}
          </h1>
          <p className="mt-3 text-base text-[var(--ink-secondary)]">
            Author of {BOOK_META.title} ({BOOK_META.subtitle})
          </p>
        </AnimatedSection>

        <EmptyContentPlaceholder sectionCode="Author" title="Author Biography" />

        <div className="mt-8 flex flex-wrap items-center gap-4">
          <Link
            to="/about"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-[var(--accent)] hover:underline no-underline"
          >
            <span>About the Book</span>
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </Link>
          <Link
            to="/start-here"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-[var(--ink-secondary)] hover:text-[var(--ink-primary)] no-underline"
          >
            <span>Start Reading</span>
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </Link>
        </div>
      </main>
    </Layout>
  );
}
