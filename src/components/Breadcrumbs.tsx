import React from 'react';
import Link from '@docusaurus/Link';
import { ChevronRight } from 'lucide-react';
import type { BreadcrumbItem } from '@site/src/types/book';

export function Breadcrumbs({ items }: { items: BreadcrumbItem[] }): React.ReactElement {
  return (
    <nav aria-label="Breadcrumb" className="mb-6">
      <ol className="flex flex-wrap items-center gap-1.5 list-none p-0 m-0 text-xs text-[var(--ink-muted)]">
        <li>
          <Link
            to="/"
            className="text-[var(--ink-muted)] hover:text-[var(--ink-primary)] no-underline transition-colors"
          >
            Home
          </Link>
        </li>
        {items.map((item, idx) => {
          const isLast = idx === items.length - 1;
          return (
            <React.Fragment key={item.route}>
              <li aria-hidden="true" className="text-[var(--ink-muted)] opacity-50">
                <ChevronRight className="w-3 h-3" />
              </li>
              <li>
                {isLast ? (
                  <span className="text-[var(--ink-primary)] font-medium">{item.label}</span>
                ) : (
                  <Link
                    to={item.route}
                    className="text-[var(--ink-muted)] hover:text-[var(--ink-primary)] no-underline transition-colors"
                  >
                    {item.label}
                  </Link>
                )}
              </li>
            </React.Fragment>
          );
        })}
      </ol>
    </nav>
  );
}
