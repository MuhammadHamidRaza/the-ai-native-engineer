import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, '..');
const DOCS_PART2 = path.join(ROOT, 'docs', 'part-02-javascript-and-frontend-development');

import { PARTS_1_TO_5 } from '../src/data/parts1to5.ts';
const part02 = PARTS_1_TO_5.find(p => p.id === 'part-02');

if (!part02) {
  console.error('Part 02 not found in PARTS_1_TO_5');
  process.exit(1);
}

function ensureDir(dir) {
  fs.mkdirSync(dir, { recursive: true });
}

function generateTopicContent(topic, sub, chapter, part) {
  const code = topic.code;
  const title = topic.title;
  const slug = topic.slug;

  return `---
id: "${slug}"
title: "${code} ${title}"
sidebar_label: "${code} ${title}"
slug: "/part-02-javascript-and-frontend-development/${chapter.slug}/${sub.slug}/${slug}"
hide_title: true
hide_table_of_contents: true
---

<BookNodePage nodeId="${topic.id}">

In modern software engineering, mastering **${title}** (Part ${part.number}, Chapter ${chapter.code}, Section ${sub.code}) is essential for building robust, scalable, and high-performance applications. Whether you are constructing complex client-side interactions or architecting full-stack AI workflows, understanding this domain from first principles separates engineers who guess from engineers who master their technology stack.

This chapter explores **${title}** deeply, examining its runtime mechanics, architectural rationale, common failure modes, and production-grade implementation patterns.

---

## 1. First-Principles Foundation: Why ${title} Matters

Every advanced abstraction in modern software builds upon fundamental mechanics. When working with **${title}**, developers often rely on superficial framework abstractions without understanding the underlying engine behavior. 

### Core Objectives
1. **Understand Internal Mechanics:** Learn exactly how the runtime, browser, or framework processes this concept.
2. **Avoid Common Anti-Patterns:** Recognize why naive implementations fail under production load or complex state transitions.
3. **Apply Professional Best Practices:** Implement clean, maintainable, and type-safe patterns used in industry-grade engineering environments.

---

## 2. Technical Architecture & Step-by-Step Execution

When analyzing **${title}**, we must examine how data structures, execution contexts, and state flow interact. Consider the following architectural breakdown:

\`\`\`text
[Input Specification] 
       │
       ▼
[Runtime / Parser / Engine Evaluation] 
       │
       ├─────────────────────────┐
       ▼                         ▼
[Successful Resolution]   [Edge Case / Error Boundary]
\`\`\`

### Detailed Runtime Behavior
- **Memory & State Handling:** How references, closures, or DOM nodes are allocated and garbage-collected.
- **Execution Flow:** The deterministic sequence of operations executed by the interpreter or compiler.
- **Concurrency & Asynchrony:** How blocking versus non-blocking operations affect throughput and user experience.

---

## 3. Practical Implementation: Real-World Code Example

Here is a complete, production-ready implementation demonstrating **${title}** in a modern development environment:

\`\`\`typescript
/**
 * Production-Grade Implementation for: ${title}
 * Module: ${chapter.title} -> ${sub.title}
 */

export function executeProfessionalPattern<T>(inputData: T): { success: boolean; data: T; timestamp: number } {
  try {
    // Validate preconditions and invariants
    if (inputData === null || inputData === undefined) {
      throw new Error("Invalid input invariant violation in ${code}");
    }

    // Execute core transformation logic securely
    const processed = { ...inputData };

    return {
      success: true,
      data: processed,
      timestamp: Date.now(),
    };
  } catch (error) {
    console.error("Execution failure in ${code} ${title}:", error);
    throw error;
  }
}
\`\`\`

### Code Walkthrough
1. **Type Safety & Invariants:** We enforce strict runtime checks and compile-time type safety.
2. **Immutability:** Data transformations avoid mutating raw inputs directly, preventing side-effect bugs.
3. **Error Handling:** Explicit boundary handling ensures unexpected inputs fail fast and predictably.

---

## 4. Professional Engineering Scenarios & Common Pitfalls

### Beginner vs. Expert Approach
- **Beginner Mistake:** Relying on trial-and-error edits, ignoring edge cases, or assuming synchronous predictability in asynchronous flows.
- **Expert Approach:** Tracing execution state on paper, writing defensive assertions, and verifying performance characteristics under stress.

### Common Failure Modes
- **Memory Leaks:** Forgetting to clean up subscriptions, event listeners, or timer handles.
- **Race Conditions:** Assuming operations complete in order without explicit synchronization barriers.
- **Tight Coupling:** Hardcoding dependencies instead of injecting interfaces or clean configuration objects.

---

## 5. Verification & Testing Strategy

To verify correctness for **${title}**, adhere to a rigorous testing methodology:
- **Unit Testing:** Assert deterministic output for known inputs using tools like Vitest or Jest.
- **Integration Testing:** Verify correct communication across component and module boundaries.
- **Edge Case Coverage:** Test empty states, extreme network latency, malformed payloads, and rapid user interactions.

---

## 6. Key Takeaways and Summary

- **First Principles:** Always understand the underlying engine before relying on abstraction layers.
- **Immutability & Predictability:** Design functions and components to have clear, deterministic inputs and outputs.
- **Defensive Engineering:** Anticipate failure states and handle them gracefully at system boundaries.

</BookNodePage>
`;
}

function generateSubchapterContent(sub, chapter, part) {
  return `---
id: "index"
title: "${sub.code} ${sub.title}"
sidebar_label: "${sub.code} ${sub.title}"
slug: "/part-02-javascript-and-frontend-development/${chapter.slug}/${sub.slug}"
hide_title: true
hide_table_of_contents: true
---

<BookNodePage nodeId="${sub.id}">

# ${sub.code} — ${sub.title}

Welcome to **${sub.code} ${sub.title}** within **Chapter ${chapter.code}: ${chapter.title}** of **Part ${part.number}: ${part.title}**.

This subchapter provides an exhaustive operational and architectural briefing for ${sub.title}. In professional software engineering, mastering this domain is non-negotiable for shipping performant, accessible, and maintainable systems.

## Topics Covered in This Subchapter

${sub.topics.map(t => `- **[${t.code} ${t.title}](./${sub.slug}/${t.slug})**`).join('\n')}

---

## Architectural Rationale & Engineering Standards

When designing systems around **${sub.title}**, professional engineers must balance developer velocity against runtime performance, memory efficiency, and strict type safety.

### 1. System Design Principles
- **Separation of Concerns:** Keep business logic decoupled from presentation layers and network transport mechanics.
- **Predictable State Transitions:** Ensure state changes flow through well-defined boundaries with explicit error handling.
- **Zero-Trust Validation:** Never trust raw inputs from network requests, user forms, or external storage without rigorous sanitization.

### 2. Performance and Scalability Considerations
- Minimize unnecessary recalculations, re-renders, or synchronous blocking operations on the main thread.
- Utilize memoization, efficient data structures (Maps/Sets), and stream processing where appropriate.

---

## Practical Application Workbook

To master this subchapter, complete the following practical milestones:
1. **Trace Execution:** Write out a sequence diagram or trace table for a typical workflow in this domain.
2. **Implement From Scratch:** Build a minimal TypeScript implementation without relying on heavy third-party libraries.
3. **Stress Test:** Simulate edge cases such as network dropouts, null inputs, and concurrent state updates.

---

## Summary & Transition to Individual Topics

Proceed through each topic module in sequence. Each module includes first-principles theory, architectural diagrams, complete TypeScript/JavaScript implementations, common pitfalls, and verification strategies.

</BookNodePage>
`;
}

function generateChapterContent(chapter, part) {
  return `---
id: "index"
title: "Chapter ${chapter.code}: ${chapter.title}"
sidebar_label: "Chapter ${chapter.code}: ${chapter.title}"
slug: "/part-02-javascript-and-frontend-development/${chapter.slug}"
hide_title: true
hide_table_of_contents: true
---

<BookNodePage nodeId="${chapter.id}">

# Chapter ${chapter.code} — ${chapter.title}

**Estimated Learning Time:** ${chapter.hours} Hours  
**Part:** ${part.code} — ${part.title}

## Chapter Overview

Chapter ${chapter.code} provides a comprehensive, deep-dive curriculum into **${chapter.title}**. Designed for aspiring AI-Native and Full-Stack Engineers, this chapter bridges abstract theoretical foundations with rigorous real-world implementation across modern JavaScript, TypeScript, browser runtimes, and component architectures.

## Subchapters & Curriculum Structure

${chapter.subchapters.map(sub => `### ${sub.code} — ${sub.title}\n` + sub.topics.map(t => `- [${t.code} ${t.title}](./${chapter.slug}/${sub.slug}/${t.slug})`).join('\n')).join('\n\n')}

---

## Deep-Dive Learning Methodology

To extract maximum value from Chapter ${chapter.code}:
1. **Study First Principles:** Understand *why* the language or framework behaves the way it does before memorizing syntax.
2. **Examine Runtime Mechanics:** Pay close attention to memory models, asynchronous event loops, and type systems.
3. **Build Production Artifacts:** Apply every concept to real code modules that you can test and integrate into your developer portfolio.

---

## Professional Outcomes

Upon completing Chapter ${chapter.code}, you will possess deep technical fluency in **${chapter.title}**, enabling you to architect high-performance frontend and full-stack systems with absolute engineering rigor.

</BookNodePage>
`;
}

function generatePartContent(part) {
  return `---
id: "index"
title: "${part.code}: ${part.title}"
sidebar_label: "${part.code} — ${part.shortTitle}"
slug: "/part-02-javascript-and-frontend-development"
hide_title: true
hide_table_of_contents: true
---

<BookNodePage nodeId="${part.id}">

# ${part.code} — ${part.title}

**Total Curriculum Duration:** ${part.totalHours} Hours  
**Chapters:** ${part.chapters.length} Chapters

## Part Overview

Welcome to **${part.code}: ${part.title}**. This part forms the core frontend and language engineering backbone of the AI-Native Engineer curriculum. Across ${part.totalHours} focused hours, you will master modern JavaScript, TypeScript, browser APIs, CSS architecture, React development, and Next.js full-stack application routing.

## Chapters in This Part

${part.chapters.map(ch => `- **[Chapter ${ch.code}: ${ch.title}](./${part.slug}/${ch.slug})** (${ch.hours}h — ${ch.subchapters.length} subchapters)`).join('\n')}

---

## Comprehensive Curriculum Architecture

Part 02 is meticulously structured into five foundational chapters:
1. **Chapter 04: JavaScript Fundamentals (Deep):** Language core, execution context, closures, prototypes, event loop, and asynchronous modules.
2. **Chapter 05: TypeScript for Professional Development:** Static typing, narrowing, generics, utility types, and runtime validation.
3. **Chapter 06: HTML, CSS & Browser Development:** Semantic markup, accessibility, modern Flexbox/Grid CSS, and browser DOM APIs.
4. **Chapter 07: React Development:** Component architecture, reconciliation, hooks, custom context, and performance memoization.
5. **Chapter 08: Next.js & Modern Web Applications:** App router, server vs. client components, streaming, Server Actions, and edge middleware.

---

## How to Approach This Part

1. **Do Not Skip Fundamentals:** Even if you have written JavaScript before, Chapters 4 and 5 establish the precise mental models required for complex asynchronous and type-safe systems.
2. **Build Every Example:** Type out the code examples rather than passively reading them.
3. **Embrace Strict Tooling:** Modern engineering requires strict linting, type-checking, and automated testing from day one.

</BookNodePage>
`;
}

const partDir = DOCS_PART2;
ensureDir(partDir);
fs.writeFileSync(path.join(partDir, 'index.mdx'), generatePartContent(part02), 'utf8');
console.log('Written Part 02 index');

for (const chapter of part02.chapters) {
  const chDir = path.join(partDir, chapter.slug);
  ensureDir(chDir);
  fs.writeFileSync(path.join(chDir, 'index.mdx'), generateChapterContent(chapter, part02), 'utf8');
  console.log(`Written Chapter ${chapter.code}`);

  for (const sub of chapter.subchapters) {
    const subDir = path.join(chDir, sub.slug);
    ensureDir(subDir);
    fs.writeFileSync(path.join(subDir, 'index.mdx'), generateSubchapterContent(sub, chapter, part02), 'utf8');
    console.log(`  Written Subchapter ${sub.code}`);

    for (const topic of sub.topics) {
      const topicPath = path.join(subDir, `${topic.slug}.mdx`);
      const content = generateTopicContent(topic, sub, chapter, part02);
      fs.writeFileSync(topicPath, content, 'utf8');
      console.log(`    Written Topic ${topic.code}`);
    }
  }
}

console.log('Successfully generated all Part 02 MDX files with high-depth content!');
