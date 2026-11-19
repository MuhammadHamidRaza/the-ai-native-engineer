import React from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import { ArrowRight } from 'lucide-react';
import { EmptyContentPlaceholder } from '@site/src/components/EmptyContentPlaceholder';
import { AnimatedSection } from '@site/src/components/AnimatedSection';

export default function ResourcesPage(): React.ReactElement {
  return (
    <Layout title="Resources" description="Reference materials and curated links for The AI-Native Engineer">
      <main className="max-w-[900px] mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <AnimatedSection>
          <div className="text-xs font-mono text-[var(--accent)] mb-3">
            Reference Index · Appendix E.5
          </div>
          <h1 className="font-display text-3xl sm:text-5xl font-semibold text-[var(--ink-primary)] m-0">
            Resources
          </h1>
          <p className="mt-4 text-base text-[var(--ink-secondary)]">
            Curated tools, command references, troubleshooting guides, and further learning paths.
          </p>
        </AnimatedSection>

        <EmptyContentPlaceholder sectionCode="E.5" title="Further Learning Resources" />

        <div className="mt-6 flex flex-wrap items-center gap-5">
          <Link
            to="/book/appendix/appendix-e-developer-reference-materials/e-5-further-learning-resources"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-[var(--accent)] hover:underline no-underline"
          >
            <span>Open Resources inside Book Reader</span>
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </Link>
          <Link
            to="/book/appendix/appendix-e-developer-reference-materials"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-[var(--ink-secondary)] hover:text-[var(--ink-primary)] no-underline"
          >
            <span>All Appendix E Materials</span>
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </Link>
        </div>
      </main>
    </Layout>
  );
}
