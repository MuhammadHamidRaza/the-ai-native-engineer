import React, { useEffect, useState } from 'react';
import type { BookNode } from '@site/src/types/book';

export function TableOfContents({ node }: { node: BookNode }): React.ReactElement {
  const [headings, setHeadings] = useState(node.outlineHeadings);
  const [activeId, setActiveId] = useState<string>(node.outlineHeadings[0]?.id ?? '');

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const contentArea = document.getElementById('content-area');
    const domHeadings = contentArea
      ? Array.from(contentArea.querySelectorAll('h2[id], h3[id]'))
          .map((el) => ({
            id: el.id,
            text: (el.textContent || '').trim(),
            level: (el.tagName === 'H3' ? 3 : 2) as 2 | 3,
          }))
          .filter((h) => h.id && h.text)
      : [];

    const nextHeadings = domHeadings.length > 0 ? domHeadings : node.outlineHeadings;
    setHeadings(nextHeadings);
    setActiveId(nextHeadings[0]?.id ?? '');

    if (nextHeadings.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        }
      },
      { rootMargin: '-80px 0px -65% 0px', threshold: 0.1 },
    );

    for (const h of nextHeadings) {
      const el = document.getElementById(h.id);
      if (el) observer.observe(el);
    }

    return () => observer.disconnect();
  }, [node.id, node.outlineHeadings]);

  const handleScrollTo = (id: string) => {
    const target = document.getElementById(id);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setActiveId(id);
    }
  };

  return (
    <aside aria-label="Page outline" className="hidden xl:block w-56 shrink-0">
      <div className="sticky top-24 max-h-[calc(100vh-7.5rem)] overflow-y-auto pl-4 pr-1 border-l border-[var(--border-hairline)]">
        <div className="text-xs font-medium text-[var(--ink-muted)] mb-3">
          On this page
        </div>
        <ul className="space-y-2 list-none p-0 m-0">
          {headings.map((heading) => {
            const isActive = activeId === heading.id;
            return (
              <li key={heading.id} className={heading.level === 3 ? 'pl-3' : ''}>
                <button
                  type="button"
                  onClick={() => handleScrollTo(heading.id)}
                  className={`text-left text-xs leading-snug transition-colors cursor-pointer bg-transparent border-0 p-0 ${
                    isActive
                      ? 'text-[var(--accent)] font-medium'
                      : 'text-[var(--ink-muted)] hover:text-[var(--ink-primary)]'
                  }`}
                >
                  {heading.text}
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </aside>
  );
}
