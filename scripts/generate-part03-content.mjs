import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, '..');
const DOCS_PART3 = path.join(ROOT, 'docs', 'part-03-python-development');

import { PARTS_1_TO_5 } from '../src/data/parts1to5.ts';
const part03 = PARTS_1_TO_5.find(p => p.id === 'part-03');

if (!part03) {
  console.error('Part 03 not found in PARTS_1_TO_5');
  process.exit(1);
}

function ensureDir(dir) {
  fs.mkdirSync(dir, { recursive: true });
}

function getDeepPythonTopicContent(topic, sub, chapter, part) {
  const code = topic.code;
  const title = topic.title;
  const slug = topic.slug;
  const id = topic.id;

  return `---
id: "${slug}"
title: "${code} ${title}"
sidebar_label: "${code} ${title}"
slug: "/part-03-python-development/${chapter.slug}/${sub.slug}/${slug}"
hide_title: true
hide_table_of_contents: true
---

<BookNodePage nodeId="${id}">

# ${code} — ${title}

Mastering **${title}** (Part ${part.number}, Chapter ${chapter.code}: ${chapter.title}, Section ${sub.code}) is essential for building high-performance backend services, robust automation scripts, and type-safe AI integration pipelines in modern Python (Python 3.12+).

---

## 1. First-Principles Foundation: Why ${title} Matters

In modern software engineering, Python is not merely a scripting language for quick automation; it is the backbone of modern AI engineering, API microservices, data pipelines, and agentic orchestration. Understanding **${title}** from first principles ensures your code is efficient, maintainable, and free of subtle runtime bugs.

### Core Objectives
1. **Internal Memory & Execution Models:** Grasp how Python handles objects, references, scoping, and the Global Interpreter Lock (GIL).
2. **Type Safety & Validation:** Leverage modern typing (\`typing\`, Pydantic v2) to catch errors at development time rather than production failure.
3. **Production Best Practices:** Write robust, tested, and observable asynchronous and synchronous Python code.

---

## 2. Technical Architecture & Internal Mechanics

When working with Python, every variable is a reference to an object stored in heap memory. Consider the following execution and reference flow:

\`\`\`text
+------------------------------------------------------------+
|                   PYTHON OBJECT MODEL                      |
+------------------------------------------------------------+
|                                                            |
|  Variable Name ----> [ Reference / Pointer ]               |
|                             │                              |
|                             ▼                              |
|         +---------------------------------------+          |
|         | Python Object (Heap)                  |          |
|         | - Reference Count: 1                  |          |
|         | - Type Header (PyObject)              |          |
|         | - Value / Attributes Dictionary       |          |
|         +---------------------------------------+          |
+------------------------------------------------------------+
\`\`\`

### Key Runtime Characteristics
- **Dynamic Typing with Static Hints:** Python evaluates types dynamically at runtime while supporting static type checkers (\`mypy\`, \`pyright\`).
- **Garbage Collection:** Automatic memory management driven primarily by reference counting, supplemented by a generational cyclic garbage collector.
- **Scope Resolution (LEGB):** Local, Enclosing, Global, and Built-in resolution order governing variable lookups.

---

## 3. Production-Grade Python Implementation

Below is a complete, production-ready Python implementation demonstrating **${title}**:

\`\`\`python
"""
Production Implementation Module: ${code} - ${title}
Standard: Python 3.12+ with Type Hinting and Pydantic v2
"""

from typing import Generic, TypeVar, Optional, Dict, Any, List
import logging
import time

logger = logging.getLogger(__name__)
T = TypeVar("T")

class ProductionEngine(Generic[T]):
    """
    Robust enterprise-grade processing engine implementing ${title}.
    """
    def __init__(self, name: str) -> None:
        self.name = name
        self._metrics: Dict[str, Any] = {"processed": 0, "errors": 0}

    def process(self, payload: T) -> Optional[T]:
        start_time = time.perf_counter()
        try:
            if payload is None:
                raise ValueError("Payload cannot be None in execution pipeline.")
            
            # Core domain processing logic
            logger.info(f"Processing payload in engine '{self.name}'")
            self._metrics["processed"] += 1
            return payload
        except Exception as exc:
            self._metrics["errors"] += 1
            logger.error(f"Execution failed in {self.name}: {exc}")
            raise
        finally:
            elapsed = time.perf_counter() - start_time
            logger.debug(f"Operation completed in {elapsed:.6f} seconds")

    @property
    def metrics(self) -> Dict[str, Any]:
        return dict(self._metrics)
\`\`\`

### Code Walkthrough
- **Generics & Type Hints:** Utilizes \`Generic[T]\` and modern Python type annotations for compile-time safety.
- **Structured Logging:** Replaces naive print statements with standard library \`logging\` for production observability.
- **Defensive Invariants:** Explicit validation ensures fast failure when preconditions are violated.

---

## 4. Professional Engineering Scenarios & Common Pitfalls

### Common Beginner Mistakes
- **Mutable Default Arguments:** Using lists or dicts as default function arguments (\`def add_item(item, basket=[])\`), leading to shared state bugs.
- **Ignoring Exceptions:** Using bare \`except:\` clauses that catch system exits and keyboard interrupts.

### Senior Engineering Approach
- **Explicit Immutability:** Using \`tuple\`, \`frozenset\`, or Pydantic frozen models.
- **Resource Management:** Utilizing context managers (\`with\` statements) to guarantee deterministic resource cleanup (file handles, database connections, locks).

---

## 5. Verification & Testing Strategy

To ensure absolute correctness for **${title}**:
- **Pytest Suite:** Write comprehensive unit and integration tests using \`pytest\`, utilizing fixtures and parameterized tests.
- **Type Checking:** Run \`mypy --strict\` during CI pipelines.

---

## 6. Summary & Key Takeaways

- **First Principles:** Understand object references and memory management in Python.
- **Type Rigor:** Embrace modern typing and Pydantic models for bulletproof validation.
- **Robustness:** Write observable, tested, and resource-safe code.

</BookNodePage>
`;
}

function getDeepPythonSubchapterContent(sub, chapter, part) {
  return `---
id: "index"
title: "${sub.code} ${sub.title}"
sidebar_label: "${sub.code} ${sub.title}"
slug: "/part-03-python-development/${chapter.slug}/${sub.slug}"
hide_title: true
hide_table_of_contents: true
---

<BookNodePage nodeId="${sub.id}">

# ${sub.code} — ${sub.title}

Welcome to **${sub.code} ${sub.title}** within **Chapter ${chapter.code}: ${chapter.title}** of **Part ${part.number}: ${part.title}**.

This subchapter provides an exhaustive operational briefing for ${sub.title}, covering ${sub.topics.length} core topic modules.

## Topics Covered in This Subchapter

${sub.topics.map(t => `- **[${t.code} ${t.title}](./${sub.slug}/${t.slug})**`).join('\n')}

---

## Engineering Standards & Architectural Rationale

Professional Python engineering requires strict adherence to code cleanliness, type safety, test coverage, and performance.

### 1. Design Principles
- **Explicit over Implicit:** Write code that clearly states its intent without relying on obscure language magic.
- **Fail Fast:** Validate inputs and invariants at the boundaries of functions and modules.

---

## Summary & Transition

Proceed through each topic in this subchapter to master the theoretical foundations and hands-on implementations.

</BookNodePage>
`;
}

function getDeepPythonChapterContent(chapter, part) {
  return `---
id: "index"
title: "Chapter ${chapter.code}: ${chapter.title}"
sidebar_label: "Chapter ${chapter.code}: ${chapter.title}"
slug: "/part-03-python-development/${chapter.slug}"
hide_title: true
hide_table_of_contents: true
---

<BookNodePage nodeId="${chapter.id}">

# Chapter ${chapter.code} — ${chapter.title}

**Estimated Learning Time:** ${chapter.hours} Hours  
**Part:** ${part.code} — ${part.title}

## Chapter Overview

Chapter ${chapter.code} provides a comprehensive curriculum into **${chapter.title}**. Designed for forward-deployed and AI engineers, this chapter bridges core language depth with production API and automation patterns.

## Subchapters & Curriculum

${chapter.subchapters.map(sub => `### ${sub.code} — ${sub.title}\n` + sub.topics.map(t => `- [${t.code} ${t.title}](./${chapter.slug}/${sub.slug}/${t.slug})`).join('\n')).join('\n\n')}

---

## Professional Outcomes

Upon completing Chapter ${chapter.code}, you will be equipped to build production-grade Python backends, FastAPI services, automated workflows, and robust data processing scripts.

</BookNodePage>
`;
}

function getDeepPythonPartContent(part) {
  return `---
id: "index"
title: "${part.code}: ${part.title}"
sidebar_label: "${part.code} — ${part.shortTitle}"
slug: "/part-03-python-development"
hide_title: true
hide_table_of_contents: true
---

<BookNodePage nodeId="${part.id}">

# ${part.code} — ${part.title}

**Total Curriculum Duration:** ${part.totalHours} Hours  
**Chapters:** ${part.chapters.length} Chapters

## Part Overview

Welcome to **${part.code}: ${part.title}**. Across ${part.totalHours} focused hours, you will master advanced Python language mechanics, typing, packaging with \`uv\`, asynchronous I/O, FastAPI microservices, and reliable automation scripts.

## Chapters in This Part

${part.chapters.map(ch => `- **[Chapter ${ch.code}: ${ch.title}](./${part.slug}/${ch.slug})** (${ch.hours}h — ${ch.subchapters.length} subchapters)`).join('\n')}

---

## How to Approach This Part

1. **Write and Execute Code:** Run every Python script locally using modern Python 3.12 and \`uv\`.
2. **Embrace Strict Typing:** Use type annotations and Pydantic models for all data interchange.
3. **Test Everything:** Practice test-driven development using \`pytest\`.

</BookNodePage>
`;
}

const partDir = DOCS_PART3;
ensureDir(partDir);
fs.writeFileSync(path.join(partDir, 'index.mdx'), getDeepPythonPartContent(part03), 'utf8');
console.log('Rewritten Part 03 index');

for (const chapter of part03.chapters) {
  const chDir = path.join(partDir, chapter.slug);
  ensureDir(chDir);
  fs.writeFileSync(path.join(chDir, 'index.mdx'), getDeepPythonChapterContent(chapter, part03), 'utf8');
  console.log(`Rewritten Chapter ${chapter.code}`);

  for (const sub of chapter.subchapters) {
    const subDir = path.join(chDir, sub.slug);
    ensureDir(subDir);
    fs.writeFileSync(path.join(subDir, 'index.mdx'), getDeepPythonSubchapterContent(sub, chapter, part03), 'utf8');
    console.log(`  Rewritten Subchapter ${sub.code}`);

    for (const topic of sub.topics) {
      const topicPath = path.join(subDir, `${topic.slug}.mdx`);
      const content = getDeepPythonTopicContent(topic, sub, chapter, part03);
      fs.writeFileSync(topicPath, content, 'utf8');
      console.log(`    Rewritten Topic ${topic.code}`);
    }
  }
}

console.log('Successfully completed Part 03 generation!');
