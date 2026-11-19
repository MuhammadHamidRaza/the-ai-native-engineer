import React from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import { ArrowRight } from 'lucide-react';
import { APPENDICES } from '@site/src/data/bookData';
import { AnimatedSection } from '@site/src/components/AnimatedSection';

export default function AppendixIndexPage(): React.ReactElement {
  return (
    <Layout title="Appendices" description="Appendices A through E — Playbooks, Templates, Workbooks & Reference Materials">
      <main className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <AnimatedSection>
          <div className="text-xs font-mono text-[var(--accent)] mb-3">
            Reference & Field Guides · 5 Appendices
          </div>
          <h1 className="font-display text-3xl sm:text-5xl font-semibold text-[var(--ink-primary)] m-0">
            Appendices
          </h1>
          <p className="mt-4 text-base text-[var(--ink-secondary)] max-w-2xl leading-relaxed">
            Client acquisition playbooks, outreach templates, practice workbooks, career guides,
            and developer reference materials.
          </p>
        </AnimatedSection>

        <div className="mt-10 space-y-6">
          {APPENDICES.map((app, idx) => (
            <AnimatedSection key={app.id} delay={idx * 0.04}>
              <div className="p-6 sm:p-8 rounded-2xl border border-[var(--border-hairline)] bg-[var(--bg-surface)]">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-[var(--border-hairline)]">
                  <div>
                    <div className="font-mono text-xs text-[var(--accent)] mb-1">
                      {app.code} · {app.sections.length} sections
                    </div>
                    <h2 className="font-display text-2xl font-semibold text-[var(--ink-primary)] m-0">
                      {app.title}
                    </h2>
                  </div>
                  <Link
                    to={`/book/appendix/${app.slug}`}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg border border-[var(--border-strong)] hover:border-[var(--accent)] text-xs font-medium text-[var(--ink-primary)] no-underline transition-colors whitespace-nowrap shrink-0"
                  >
                    <span>Open {app.code}</span>
                    <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                  </Link>
                </div>

                <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
                  {app.sections.map((sec) => (
                    <Link
                      key={sec.id}
                      to={`/book/appendix/${app.slug}/${sec.slug}`}
                      className="px-3.5 py-2.5 rounded-lg border border-[var(--border-hairline)] bg-[var(--bg-canvas)] hover:border-[var(--accent)] text-xs text-[var(--ink-secondary)] hover:text-[var(--ink-primary)] no-underline transition-colors flex items-center gap-2.5"
                    >
                      <span className="font-mono text-[11px] text-[var(--accent)] tabular-nums shrink-0">
                        {sec.code}
                      </span>
                      <span className="truncate">{sec.title}</span>
                    </Link>
                  ))}
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </main>
    </Layout>
  );
}
