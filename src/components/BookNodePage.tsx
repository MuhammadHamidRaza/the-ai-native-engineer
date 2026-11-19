import React, { useEffect } from 'react';
import Link from '@docusaurus/Link';
import { ArrowRight } from 'lucide-react';
import {
  APPENDICES,
  BOOK_PARTS,
  FDE_LIFECYCLE,
  NODE_BY_ID,
  PART_ZERO,
  ROLE_GROUPS,
  getChapterRoute,
  getIntroSectionRoute,
  getIntroTopicRoute,
  getSubchapterRoute,
  getTopicRoute,
} from '@site/src/data/bookData';
import { useBookContext } from '@site/src/context/BookContext';
import { Breadcrumbs } from './Breadcrumbs';
import { ChapterHeader } from './ChapterHeader';
import { EmptyContentPlaceholder } from './EmptyContentPlaceholder';
import { PreviousNextNavigation } from './PreviousNextNavigation';
import { ReadingProgress } from './ReadingProgress';

export function BookNodePage({
  nodeId,
  children,
}: {
  nodeId: string;
  children?: React.ReactNode;
}): React.ReactElement {
  const node = NODE_BY_ID[nodeId];
  const { markVisited } = useBookContext();

  useEffect(() => {
    if (node) {
      markVisited(node.id, node.route);
    }
  }, [node, markVisited]);

  if (!node) {
    return <EmptyContentPlaceholder title="Page" />;
  }

  const introSecObj =
    node.isIntro && node.subchapterCode
      ? PART_ZERO.sections.find((s) => s.code === node.subchapterCode)
      : undefined;

  const partObj =
    !node.isIntro && node.partNumber !== undefined
      ? BOOK_PARTS.find((p) => p.number === node.partNumber)
      : undefined;
  const chapterObj =
    partObj && node.chapterNumber !== undefined
      ? partObj.chapters.find((c) => c.number === node.chapterNumber)
      : undefined;
  const subObj =
    chapterObj && node.subchapterCode
      ? chapterObj.subchapters.find((s) => s.code === node.subchapterCode)
      : undefined;
  const appendixObj = node.appendixLetter
    ? APPENDICES.find((a) => a.letter === node.appendixLetter)
    : undefined;

  const showFdeLifecycle =
    node.id === 'sec-00-8' || node.id === 'topic-00-8-8';

  return (
    <article className="min-w-0">
      <ReadingProgress node={node} />
      <Breadcrumbs items={node.breadcrumbs} />
      <ChapterHeader node={node} />

      {/* Introductory Part 00 Landing Directory */}
      {node.kind === 'intro-part' && (
        <section id="intro-sections" className="mb-10">
          <div className="mb-6 p-4 rounded-xl border border-[var(--border-hairline)] bg-[var(--bg-surface)] text-xs text-[var(--ink-secondary)] leading-relaxed">
            <strong className="text-[var(--ink-primary)] font-medium">
              Introductory Part (Precedes Part 01):
            </strong>{' '}
            Part 00 establishes the framing, landscape, roles, philosophy, and reading workflow
            before the 10-part, 42-chapter, 638-hour core curriculum begins.
          </div>

          <h2 className="font-display text-xl font-semibold text-[var(--ink-primary)] mb-4">
            Sections in Part 00 ({PART_ZERO.sections.length} Sections)
          </h2>
          <div className="space-y-4">
            {PART_ZERO.sections.map((sec) => {
              const secRoute = getIntroSectionRoute(sec.slug);
              return (
                <div
                  key={sec.id}
                  className="p-5 rounded-xl border border-[var(--border-hairline)] bg-[var(--bg-surface)]"
                >
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <Link
                      to={secRoute}
                      className="group inline-flex items-center gap-2 text-base font-semibold text-[var(--ink-primary)] hover:text-[var(--accent)] no-underline transition-colors"
                    >
                      <span className="font-mono text-xs text-[var(--accent)] tabular-nums">
                        {sec.code}
                      </span>
                      <span>{sec.title}</span>
                      <ArrowRight
                        className="w-3.5 h-3.5 opacity-60 group-hover:translate-x-0.5 transition-transform"
                        aria-hidden="true"
                      />
                    </Link>
                    <span className="font-mono text-xs text-[var(--ink-muted)] tabular-nums">
                      {sec.topics.length} topics
                    </span>
                  </div>

                  <div className="mt-3 pt-3 border-t border-[var(--border-hairline)] grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {sec.topics.map((topic) => (
                      <Link
                        key={topic.id}
                        to={getIntroTopicRoute(sec.slug, topic.slug)}
                        className="px-3 py-2 rounded-lg text-xs text-[var(--ink-secondary)] hover:text-[var(--ink-primary)] hover:bg-[var(--bg-subtle)] no-underline transition-colors flex items-center gap-2"
                      >
                        <span className="font-mono text-[11px] text-[var(--ink-muted)] tabular-nums shrink-0">
                          {topic.code}
                        </span>
                        <span className="truncate">{topic.title}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* Introductory Section Topics Directory */}
      {node.kind === 'intro-section' && introSecObj && (
        <section id="topics" className="mb-10 space-y-6">
          {showFdeLifecycle && (
            <div className="p-5 rounded-xl border border-[var(--border-hairline)] bg-[var(--bg-surface)]">
              <div className="text-xs font-mono text-[var(--accent)] mb-3">
                FDE Delivery Lifecycle
              </div>
              <div className="flex flex-wrap items-center gap-2 text-sm font-medium text-[var(--ink-primary)]">
                {FDE_LIFECYCLE.map((step, idx) => (
                  <React.Fragment key={step}>
                    <span>{step}</span>
                    {idx < FDE_LIFECYCLE.length - 1 && (
                      <span aria-hidden="true" className="text-[var(--accent)]">
                        →
                      </span>
                    )}
                  </React.Fragment>
                ))}
              </div>
            </div>
          )}

          {introSecObj.id === 'sec-00-3' && (
            <div className="space-y-4">
              <h2 className="font-display text-xl font-semibold text-[var(--ink-primary)] m-0">
                Role Groupings (15 Professional Roles)
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {ROLE_GROUPS.map((group) => (
                  <div
                    key={group.id}
                    className="p-4 rounded-xl border border-[var(--border-hairline)] bg-[var(--bg-surface)]"
                  >
                    <div className="text-xs font-mono text-[var(--accent)] mb-2.5">
                      {group.title}
                    </div>
                    <ul className="space-y-1.5 list-none p-0 m-0">
                      {group.roleTopicIds.map((tId) => {
                        const topic = introSecObj.topics.find((t) => t.id === tId);
                        if (!topic) return null;
                        return (
                          <li key={topic.id}>
                            <Link
                              to={getIntroTopicRoute(introSecObj.slug, topic.slug)}
                              className="text-xs text-[var(--ink-secondary)] hover:text-[var(--accent)] no-underline flex items-center gap-2 py-0.5"
                            >
                              <span className="font-mono text-[11px] text-[var(--ink-muted)] tabular-nums shrink-0">
                                {topic.code}
                              </span>
                              <span className="truncate">{topic.title}</span>
                            </Link>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div>
            <h2 className="font-display text-xl font-semibold text-[var(--ink-primary)] mb-4">
              Topics in {introSecObj.code}
            </h2>
            <div className="divide-y divide-[var(--border-hairline)] border border-[var(--border-hairline)] rounded-xl bg-[var(--bg-surface)] overflow-hidden">
              {introSecObj.topics.map((topic) => (
                <Link
                  key={topic.id}
                  to={getIntroTopicRoute(introSecObj.slug, topic.slug)}
                  className="group flex items-center justify-between gap-4 px-5 py-3.5 hover:bg-[var(--bg-subtle)] transition-colors no-underline"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <span className="font-mono text-xs text-[var(--accent)] tabular-nums shrink-0">
                      {topic.code}
                    </span>
                    <span className="text-sm font-medium text-[var(--ink-primary)] group-hover:text-[var(--accent)] transition-colors truncate">
                      {topic.title}
                    </span>
                  </div>
                  <ArrowRight
                    className="w-4 h-4 text-[var(--ink-muted)] group-hover:text-[var(--accent)] group-hover:translate-x-0.5 transition-all shrink-0"
                    aria-hidden="true"
                  />
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* FDE Delivery Lifecycle on 00.8.8 Topic Page */}
      {node.kind === 'intro-topic' && showFdeLifecycle && (
        <section className="mb-8 p-5 rounded-xl border border-[var(--border-hairline)] bg-[var(--bg-surface)]">
          <div className="text-xs font-mono text-[var(--accent)] mb-3">
            FDE Delivery Lifecycle
          </div>
          <div className="flex flex-wrap items-center gap-2 text-sm font-medium text-[var(--ink-primary)]">
            {FDE_LIFECYCLE.map((step, idx) => (
              <React.Fragment key={step}>
                <span>{step}</span>
                {idx < FDE_LIFECYCLE.length - 1 && (
                  <span aria-hidden="true" className="text-[var(--accent)]">
                    →
                  </span>
                )}
              </React.Fragment>
            ))}
          </div>
        </section>
      )}

      {/* Structural Child Directory for Part / Chapter / Subchapter / Appendix pages */}
      {node.kind === 'part' && partObj && (
        <section id="chapters" className="mb-10">
          <h2 id="overview" className="font-display text-xl font-semibold text-[var(--ink-primary)] mb-4">
            Chapters in {partObj.code}
          </h2>
          <div className="divide-y divide-[var(--border-hairline)] border border-[var(--border-hairline)] rounded-xl bg-[var(--bg-surface)] overflow-hidden">
            {partObj.chapters.map((ch) => (
              <Link
                key={ch.id}
                to={getChapterRoute(partObj, ch)}
                className="group flex items-center justify-between gap-4 px-5 py-4 hover:bg-[var(--bg-subtle)] transition-colors no-underline"
              >
                <div className="min-w-0">
                  <div className="text-xs font-mono text-[var(--accent)] tabular-nums mb-0.5">
                    Chapter {ch.code} · {ch.hours}h · {ch.subchapters.length} sections
                  </div>
                  <div className="text-base font-medium text-[var(--ink-primary)] group-hover:text-[var(--accent)] transition-colors truncate">
                    {ch.title}
                  </div>
                </div>
                <ArrowRight
                  className="w-4 h-4 text-[var(--ink-muted)] group-hover:text-[var(--accent)] group-hover:translate-x-0.5 transition-all shrink-0"
                  aria-hidden="true"
                />
              </Link>
            ))}
          </div>
        </section>
      )}

      {node.kind === 'chapter' && partObj && chapterObj && (
        <section id="chapter-outline" className="mb-10">
          <h2 className="font-display text-xl font-semibold text-[var(--ink-primary)] mb-4">
            Chapter Structure
          </h2>
          <div className="space-y-4">
            {chapterObj.subchapters.map((sub) => {
              const subRoute = getSubchapterRoute(partObj.slug, chapterObj.slug, sub.slug);
              return (
                <div
                  key={sub.id}
                  className="p-5 rounded-xl border border-[var(--border-hairline)] bg-[var(--bg-surface)]"
                >
                  <Link
                    to={subRoute}
                    className="group inline-flex items-center gap-2 text-base font-semibold text-[var(--ink-primary)] hover:text-[var(--accent)] no-underline transition-colors"
                  >
                    <span className="font-mono text-xs text-[var(--accent)] tabular-nums">
                      {sub.code}
                    </span>
                    <span>{sub.title}</span>
                    <ArrowRight
                      className="w-3.5 h-3.5 opacity-60 group-hover:translate-x-0.5 transition-transform"
                      aria-hidden="true"
                    />
                  </Link>

                  <div className="mt-3 pt-3 border-t border-[var(--border-hairline)] grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {sub.topics.map((topic) => (
                      <Link
                        key={topic.id}
                        to={getTopicRoute(partObj.slug, chapterObj.slug, sub.slug, topic.slug)}
                        className="px-3 py-2 rounded-lg text-xs text-[var(--ink-secondary)] hover:text-[var(--ink-primary)] hover:bg-[var(--bg-subtle)] no-underline transition-colors flex items-center gap-2"
                      >
                        <span className="font-mono text-[11px] text-[var(--ink-muted)] tabular-nums shrink-0">
                          {topic.code}
                        </span>
                        <span className="truncate">{topic.title}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {node.kind === 'subchapter' && partObj && chapterObj && subObj && (
        <section id="topics" className="mb-10">
          <h2 className="font-display text-xl font-semibold text-[var(--ink-primary)] mb-4">
            Topics in {subObj.code}
          </h2>
          <div className="divide-y divide-[var(--border-hairline)] border border-[var(--border-hairline)] rounded-xl bg-[var(--bg-surface)] overflow-hidden">
            {subObj.topics.map((topic) => (
              <Link
                key={topic.id}
                to={getTopicRoute(partObj.slug, chapterObj.slug, subObj.slug, topic.slug)}
                className="group flex items-center justify-between gap-4 px-5 py-3.5 hover:bg-[var(--bg-subtle)] transition-colors no-underline"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <span className="font-mono text-xs text-[var(--accent)] tabular-nums shrink-0">
                    {topic.code}
                  </span>
                  <span className="text-sm font-medium text-[var(--ink-primary)] group-hover:text-[var(--accent)] transition-colors truncate">
                    {topic.title}
                  </span>
                </div>
                <ArrowRight
                  className="w-4 h-4 text-[var(--ink-muted)] group-hover:text-[var(--accent)] group-hover:translate-x-0.5 transition-all shrink-0"
                  aria-hidden="true"
                />
              </Link>
            ))}
          </div>
        </section>
      )}

      {node.kind === 'appendix-root' && (
        <section id="appendix-index" className="mb-10">
          <h2 className="font-display text-xl font-semibold text-[var(--ink-primary)] mb-4">
            All Appendices
          </h2>
          <div className="divide-y divide-[var(--border-hairline)] border border-[var(--border-hairline)] rounded-xl bg-[var(--bg-surface)] overflow-hidden">
            {APPENDICES.map((app) => (
              <Link
                key={app.id}
                to={`/book/appendix/${app.slug}`}
                className="group flex items-center justify-between gap-4 px-5 py-4 hover:bg-[var(--bg-subtle)] transition-colors no-underline"
              >
                <div className="min-w-0">
                  <div className="text-xs font-mono text-[var(--accent)] mb-0.5">
                    {app.code} · {app.sections.length} sections
                  </div>
                  <div className="text-base font-medium text-[var(--ink-primary)] group-hover:text-[var(--accent)] transition-colors truncate">
                    {app.title}
                  </div>
                </div>
                <ArrowRight
                  className="w-4 h-4 text-[var(--ink-muted)] group-hover:text-[var(--accent)] group-hover:translate-x-0.5 transition-all shrink-0"
                  aria-hidden="true"
                />
              </Link>
            ))}
          </div>
        </section>
      )}

      {node.kind === 'appendix' && appendixObj && (
        <section id="appendix-sections" className="mb-10">
          <h2 className="font-display text-xl font-semibold text-[var(--ink-primary)] mb-4">
            Sections in {appendixObj.code}
          </h2>
          <div className="divide-y divide-[var(--border-hairline)] border border-[var(--border-hairline)] rounded-xl bg-[var(--bg-surface)] overflow-hidden">
            {appendixObj.sections.map((sec) => (
              <Link
                key={sec.id}
                to={`/book/appendix/${appendixObj.slug}/${sec.slug}`}
                className="group flex items-center justify-between gap-4 px-5 py-3.5 hover:bg-[var(--bg-subtle)] transition-colors no-underline"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <span className="font-mono text-xs text-[var(--accent)] tabular-nums shrink-0">
                    {sec.code}
                  </span>
                  <span className="text-sm font-medium text-[var(--ink-primary)] group-hover:text-[var(--accent)] transition-colors truncate">
                    {sec.title}
                  </span>
                </div>
                <ArrowRight
                  className="w-4 h-4 text-[var(--ink-muted)] group-hover:text-[var(--accent)] group-hover:translate-x-0.5 transition-all shrink-0"
                  aria-hidden="true"
                />
              </Link>
            ))}
          </div>
        </section>
      )}

      {children ? (
        <div id="content-area" className="prose-editorial my-8">
          {children}
        </div>
      ) : (
        <div id="notes-placeholder">
          <EmptyContentPlaceholder sectionCode={node.code} title={node.title} />
        </div>
      )}

      <PreviousNextNavigation node={node} />
    </article>
  );
}
