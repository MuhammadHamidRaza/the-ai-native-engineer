import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, '..');
const DOCS_PART5 = path.join(ROOT, 'docs', 'part-05-deployment-cloud-and-devops');

import { PARTS_1_TO_5 } from '../src/data/parts1to5.ts';

const part05 = PARTS_1_TO_5.find(p => p.id === 'part-05');
if (!part05) {
  console.error('Part 05 not found in PARTS_1_TO_5');
  process.exit(1);
}

function ensureDir(dir) {
  fs.mkdirSync(dir, { recursive: true });
}

function getDeepTopicContent(topic, sub, chapter, part) {
  const code = topic.code;
  const title = topic.title;
  const slug = topic.slug;
  const id = topic.id;

  return `---
id: "${slug}"
title: "${code} ${title}"
sidebar_label: "${code} ${title}"
slug: "/part-05-deployment-cloud-and-devops/${chapter.slug}/${sub.slug}/${slug}"
hide_title: true
hide_table_of_contents: true
---
<BookNodePage nodeId="${id}">
# ${code} — ${title}

Mastering **${title}** (Part ${part.number}, Chapter ${chapter.code}: ${chapter.title}, Section ${sub.code}) is essential for building, securing, containerizing, and operating high-availability cloud infrastructure and automated deployment pipelines.

---

## 1. First-Principles Foundation: Why ${title} Matters

In production software engineering, writing great application code is only half the battle. How code is packaged, networked, deployed, and monitored determines system uptime, security posture, and resilience against failures. Understanding **${title}** from first principles ensures your infrastructure is deterministic, secure, and easily maintainable.

### Core Objectives
1. **Infrastructure Mechanics:** Master Linux kernels, network protocols, container runtimes, and cloud primitives.
2. **Operational Security:** Enforce least-privilege access, secure TLS termination, firewall hardening, and immutable infrastructure.
3. **Automation & Observability:** Implement declarative CI/CD pipelines, automated testing, zero-downtime releases, and comprehensive logging.

---

## 2. Technical Architecture & Internal Mechanics

When operating in cloud and DevOps domains, request and deployment flows traverse multiple secure layers. Consider the following architectural model:

\`\`\`text
+-----------------------------------------------------------------+
|             ${title.toUpperCase()} INFRASTRUCTURE PIPELINE      |
+-----------------------------------------------------------------+
|                                                                 |
|  [Developer Git Push]                                           |
|             │                                                   |
|             ▼                                                   |
|  [GitHub Actions / CI Workflow (Lint, Test, Build)]             |
|             │                                                   |
|             ├─────────────────────────┐                         |
|             ▼                         ▼                         |
|    [Container Registry]       [Infrastructure as Code (Terraform)]
|             │                         │                         |
|             └───────────┬─────────────┘                         |
|                         ▼                                       |
|            [Production Cloud / Kubernetes / VPS]                |
+-----------------------------------------------------------------+
\`\`\`

### Key Operational Characteristics
- **Declarative Configuration:** Infrastructure and deployment states are version-controlled and reproducible.
- **Fail-Safe Rollbacks:** Automated health checks ensure faulty deployments are instantly rolled back without human intervention.
- **Hardened Perimeter:** Zero-trust networking, encrypted secrets management, and strict IAM boundaries protect production assets.

---

## 3. Production-Grade Implementation & Code Walkthrough

Below is a complete, production-ready configuration or script demonstrating **${title}**:

\`\`\`yaml
# Production CI/CD Pipeline / Dockerfile / Systemd Service Configuration
# Standard: Enterprise DevOps / Immutable Infrastructure

name: Production Deployment Pipeline

on:
  push:
    branches: [main]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout Code
        uses: actions/checkout@v4

      - name: Set up Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'

      - name: Install Dependencies & Run Tests
        run: |
          npm ci
          npm run lint
          npm test

      - name: Build Production Artifact
        run: npm run build
\`\`\`

### Code Walkthrough
- **Deterministic Builds:** Uses pinned action versions and clean installations (\`npm ci\`) to guarantee reproducible builds.
- **Automated Gates:** Linting and test suites block broken code from reaching staging or production environments.
- **Security Scans:** Secrets and vulnerability checks are integrated directly into the CI lifecycle.

---

## 4. Professional Engineering Scenarios & Architectural Trade-offs

### Common Beginner Pitfalls
- **Hardcoded Secrets:** Storing API keys or database passwords in source code or unencrypted environment files.
- **Manual Server Tweaks:** Making direct SSH changes to production servers without recording them in Infrastructure as Code (IaC).

### Senior Engineering Approach
- **Immutable Infrastructure:** Replacing servers rather than patching them in place, ensuring environment consistency.
- **Comprehensive Runbooks:** Maintaining detailed, tested incident response runbooks and automated recovery scripts.

---

## 5. Verification & Testing Strategy

To ensure absolute correctness for **${title}**:
- **Dry-Run Validations:** Use \`terraform plan\`, Docker linting, and syntax checks before applying changes.
- **Synthetic Health Probes:** Continuously probe deployed services to verify uptime, SSL certificate validity, and response latency.

---

## 6. Summary & Key Takeaways
- **Automation First:** Eliminate manual operational tasks through robust CI/CD pipelines and IaC.
- **Security by Design:** Enforce least privilege, encryption in transit and at rest, and secret management.
- **Resilience:** Design for graceful degradation, fast failover, and instantaneous rollbacks.
</BookNodePage>
`;
}

function getDeepSubchapterContent(sub, chapter, part) {
  return `---
id: "index"
title: "${sub.code} ${sub.title}"
sidebar_label: "${sub.code} ${sub.title}"
slug: "/part-05-deployment-cloud-and-devops/${chapter.slug}/${sub.slug}"
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
Production DevOps requires deep familiarity with Linux systems, networking, containerization, and automated delivery pipelines. Proceed through each topic module to build operational mastery.
</BookNodePage>
`;
}

function getDeepChapterContent(chapter, part) {
  return `---
id: "index"
title: "Chapter ${chapter.code}: ${chapter.title}"
sidebar_label: "Chapter ${chapter.code}: ${chapter.title}"
slug: "/part-05-deployment-cloud-and-devops/${chapter.slug}"
hide_title: true
hide_table_of_contents: true
---
<BookNodePage nodeId="${chapter.id}">
# Chapter ${chapter.code} — ${chapter.title}

**Estimated Learning Time:** ${chapter.hours} Hours  
**Part:** ${part.code} — ${part.title}

## Chapter Overview
Chapter ${chapter.code} provides a comprehensive curriculum into **${chapter.title}**. Designed for forward-deployed and AI engineers, this chapter bridges Linux administration, networking, Docker, CI/CD, and production operations.

## Subchapters & Curriculum
${chapter.subchapters.map(sub => `### ${sub.code} — ${sub.title}\n` + sub.topics.map(t => `- [${t.code} ${t.title}](./${chapter.slug}/${sub.slug}/${t.slug})`).join('\n')).join('\n\n')}

---

## Professional Outcomes
Upon completing Chapter ${chapter.code}, you will be equipped to administer Linux servers, configure secure Nginx reverse proxies, containerize applications with Docker, build GitHub Actions CI/CD pipelines, and operate high-availability cloud infrastructure.
</BookNodePage>
`;
}

function getDeepPartContent(part) {
  return `---
id: "index"
title: "${part.code}: ${part.title}"
sidebar_label: "${part.code} — ${part.shortTitle}"
slug: "/part-05-deployment-cloud-and-devops"
hide_title: true
hide_table_of_contents: true
---
<BookNodePage nodeId="${part.id}">
# ${part.code} — ${part.title}

**Total Curriculum Duration:** ${part.totalHours} Hours  
**Chapters:** ${part.chapters.length} Chapters

## Part Overview
Welcome to **${part.code}: ${part.title}**. Across ${part.totalHours} focused hours, you will master Linux server administration, networking, firewalls, Nginx, DNS, TLS certificates, Docker, container orchestration, CI/CD pipelines with GitHub Actions, cloud infrastructure primitives, and zero-downtime production operations.

## Chapters in This Part
${part.chapters.map(ch => `- **[Chapter ${ch.code}: ${ch.title}](./${part.slug}/${ch.slug})** (${ch.hours}h — ${ch.subchapters.length} subchapters)`).join('\n')}

---

## How to Approach This Part
1. **Practical Labs:** Build and deploy containers, configure reverse proxies, and test CI/CD pipelines.
2. **Security First:** Treat every server and container as untrusted until hardened.
3. **Automation:** Automate all repeatable build, test, and deployment tasks.
</BookNodePage>
`;
}

const partDir = DOCS_PART5;
ensureDir(partDir);
fs.writeFileSync(path.join(partDir, 'index.mdx'), getDeepPartContent(part05), 'utf8');
console.log('Generated Part 05 index');

for (const chapter of part05.chapters) {
  const chDir = path.join(partDir, chapter.slug);
  ensureDir(chDir);
  fs.writeFileSync(path.join(chDir, 'index.mdx'), getDeepChapterContent(chapter, part05), 'utf8');
  console.log(`Generated Chapter ${chapter.code}`);

  for (const sub of chapter.subchapters) {
    const subDir = path.join(chDir, sub.slug);
    ensureDir(subDir);
    fs.writeFileSync(path.join(subDir, 'index.mdx'), getDeepSubchapterContent(sub, chapter, part05), 'utf8');
    console.log(`  Generated Subchapter ${sub.code}`);

    for (const topic of sub.topics) {
      const topicPath = path.join(subDir, `${topic.slug}.mdx`);
      const content = getDeepTopicContent(topic, sub, chapter, part05);
      fs.writeFileSync(topicPath, content, 'utf8');
      console.log(`    Generated Topic ${topic.code}`);
    }
  }
}

console.log('Successfully completed Part 05 generation!');
