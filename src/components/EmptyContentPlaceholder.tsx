import React from 'react';
import { BookOpen } from 'lucide-react';

interface EmptyContentPlaceholderProps {
  title?: string;
  sectionCode?: string;
}

export function EmptyContentPlaceholder({
  title,
  sectionCode,
}: EmptyContentPlaceholderProps): React.ReactElement {
  return (
    <section
      id="content-area"
      aria-label="Content placeholder"
      className="my-8 py-14 px-6 sm:px-10 rounded-xl border border-dashed border-[var(--border-strong)] bg-[var(--bg-surface)] text-center"
    >
      <div className="w-10 h-10 rounded-lg border border-[var(--border-hairline)] bg-[var(--bg-subtle)] mx-auto flex items-center justify-center text-[var(--accent)] mb-4">
        <BookOpen className="w-4 h-4" aria-hidden="true" />
      </div>
      {sectionCode && (
        <div className="font-mono text-xs text-[var(--ink-muted)] mb-1.5 tabular-nums">
          {sectionCode}
        </div>
      )}
      <h2 className="font-display text-lg font-medium text-[var(--ink-primary)] m-0">
        {title ? `${title} — Content coming soon` : 'Content coming soon'}
      </h2>
      <p className="mt-2 text-sm text-[var(--ink-muted)] max-w-md mx-auto leading-relaxed">
        Content will be added here. This structural template is ready for future authoring in MDX.
      </p>
    </section>
  );
}
