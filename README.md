# The AI-Native Engineer

**Think. Build. Solve. Ship.**  
**Author:** Hamid Raza

An interactive, animation-rich digital book platform built with **Docusaurus**, **React**, **TypeScript**, **Motion**, **Lucide React**, and **Tailwind CSS**, configured for static **GitHub Pages** deployment.

## Book Architecture

- **Part 00 — About This Book** (Introductory part with 11 sections and 98 nested topics preceding Part 01)
- **10 Curriculum Parts**
- **42 Chapters**
- **638 Focused Learning Hours**
- **4-Level Hierarchy:** Part → Chapter → Subchapter → Nested Topic
- **5 Appendices (A–E)** including the Client Acquisition Playbook, Outreach Templates, Client Hunting Workbook, Career Resources, and Developer Reference Materials
- **662 content pages** (Parts 00–10 + Appendices, machine-inventoried 2026-11-19)

## Installation

```bash
npm install
```

## Local Development

```bash
npm run dev
```

Starts the Docusaurus development server on `http://localhost:3000`.

## Production Build

```bash
npm run build
```

Generates the static site in `build/`. To preview the production build locally:

```bash
npm run start
```

## Updating GitHub Pages Configuration

Open `docusaurus.config.ts` and update the configuration placeholders at the top of the file (or provide them as environment variables):

```ts
const GITHUB_USERNAME = process.env.GITHUB_USERNAME || 'YOUR_GITHUB_USERNAME';
const REPO_NAME = process.env.REPO_NAME || 'the-ai-native-engineer';
const SITE_URL = process.env.SITE_URL || `https://${GITHUB_USERNAME}.github.io`;
const BASE_URL = process.env.BASE_URL || '/';
```

For project pages (`https://<username>.github.io/<repo-name>/`), set `BASE_URL` to `'/<repo-name>/'`.  
For user/organization root pages or custom domains, keep `BASE_URL` as `'/'`.

Also update `BOOK_META.githubRepoPlaceholder` in `src/data/bookData.ts` with your repository URL.

## Deploying to GitHub Pages

A GitHub Actions workflow is included at `.github/workflows/deploy.yml`:

1. Push this repository to GitHub (`main` branch).
2. In your repository **Settings → Pages**, set **Source** to **GitHub Actions**.
3. On every push to `main`, GitHub Actions automatically builds the static site and deploys it to GitHub Pages.

## Runnable Reference Projects

`examples/` contains the verified reference implementations the book's lessons point at. All run offline with zero API keys:

- **`examples/shopcore/`** — runnable backend for the ShopCore project (Express 5 + zod + pg + scrypt sessions). `npm ci && npm test` boots an in-process PostgreSQL 18 (PGlite), applies the real migrations, and runs **9 integration tests** (register/login/me, catalog search, atomic checkout with stock decrement, idempotency, ownership guards). See [its README](examples/shopcore/README.md).
- **`examples/shopcore-helpbot/`** — the ShopCore HelpBot RAG reference: chunking, hybrid (lexical+vector) retrieval with RRF, citations, refusal behavior, document-level prompt-injection quarantine, and an offline golden-eval harness. `npm run ingest && npm test && node scripts/eval-helpbot.mjs`. Verified results: **14/14 tests, Recall@3 9/10, refusals 5/5** (executed Nov 2026). See [its README](examples/shopcore-helpbot/README.md).
- **`examples/chapterhouse-capstone/`** — the Chapter 42 capstone reference spine (Brightside Yoga reconciliation, deterministic-first): migrations + deterministic seed, pure `reconcile()` engine, cron-gated on-demand run, Stripe webhook HMAC verification. `npm ci && npm test` boots in-process PGlite and runs **14/14 tests**. See [its README](examples/chapterhouse-capstone/README.md).
- **`examples/python-async-lab/`** and **`examples/pytest-harness/`** — runnable versions of the Part 03 async/HTTP and pytest lessons.

Verification status for the whole book is recorded honestly in `PROGRESS.md` and `audit/final-verification-report.md`: what was executed vs. what is documentation-checked only (no Docker daemon, no cloud accounts, no live LLM keys in the authoring environment).

## Adding New Chapters, Subchapters, and Pages

All parts, chapters, subchapters, nested topics, and appendices are driven by a central source of truth:

- `src/data/part00.ts`
- `src/data/parts1to5.ts`
- `src/data/parts6to10.ts`
- `src/data/appendices.ts`
- `src/data/bookData.ts`

After updating the catalog, regenerate the MDX files and `sidebars.ts`:

```bash
npm run generate:book
```

## Writing Future Book Content

Every page under `docs/` is a standard Docusaurus `.mdx` file containing frontmatter and `<BookNodePage nodeId="..." />`.  
To author content for any chapter, subchapter, topic, or appendix section:

1. Open the corresponding `.mdx` file under `docs/`.
2. Write Markdown or MDX content directly below `<BookNodePage nodeId="..." />` (or replace `<BookNodePage />` / `<EmptyContentPlaceholder />` when authoring full prose).
