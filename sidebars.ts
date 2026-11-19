import type { SidebarsConfig } from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
  bookSidebar: [
  {
    "type": "category",
    "label": "Part 01 — Foundations",
    "link": {
      "type": "doc",
      "id": "part-01-foundations/index"
    },
    "items": [
      {
        "type": "category",
        "label": "01. How Computers, Software & the Internet Work",
        "link": {
          "type": "doc",
          "id": "part-01-foundations/01-how-computers-software-and-the-internet-work/index"
        },
        "items": [
          {
            "type": "category",
            "label": "01.1 Computer Fundamentals",
            "link": {
              "type": "doc",
              "id": "part-01-foundations/01-how-computers-software-and-the-internet-work/01-1-computer-fundamentals/index"
            },
            "items": [
              "part-01-foundations/01-how-computers-software-and-the-internet-work/01-1-computer-fundamentals/01-1-1-what-is-a-computer",
              "part-01-foundations/01-how-computers-software-and-the-internet-work/01-1-computer-fundamentals/01-1-2-hardware-and-software",
              "part-01-foundations/01-how-computers-software-and-the-internet-work/01-1-computer-fundamentals/01-1-3-input-processing-output-and-storage",
              "part-01-foundations/01-how-computers-software-and-the-internet-work/01-1-computer-fundamentals/01-1-4-binary-data-representation-and-memory"
            ]
          },
          {
            "type": "category",
            "label": "01.2 Operating Systems",
            "link": {
              "type": "doc",
              "id": "part-01-foundations/01-how-computers-software-and-the-internet-work/01-2-operating-systems/index"
            },
            "items": [
              "part-01-foundations/01-how-computers-software-and-the-internet-work/01-2-operating-systems/01-2-1-what-an-operating-system-does",
              "part-01-foundations/01-how-computers-software-and-the-internet-work/01-2-operating-systems/01-2-2-files-processes-and-memory",
              "part-01-foundations/01-how-computers-software-and-the-internet-work/01-2-operating-systems/01-2-3-shells-terminals-and-execution-environments"
            ]
          },
          {
            "type": "category",
            "label": "01.3 How the Internet Works",
            "link": {
              "type": "doc",
              "id": "part-01-foundations/01-how-computers-software-and-the-internet-work/01-3-how-the-internet-works/index"
            },
            "items": [
              "part-01-foundations/01-how-computers-software-and-the-internet-work/01-3-how-the-internet-works/01-3-1-networks-and-packets",
              "part-01-foundations/01-how-computers-software-and-the-internet-work/01-3-how-the-internet-works/01-3-2-ip-addresses-and-routing",
              "part-01-foundations/01-how-computers-software-and-the-internet-work/01-3-how-the-internet-works/01-3-3-dns-resolution",
              "part-01-foundations/01-how-computers-software-and-the-internet-work/01-3-how-the-internet-works/01-3-4-http-https-and-browsers"
            ]
          }
        ]
      },
      {
        "type": "category",
        "label": "02. Critical Thinking & Problem Solving",
        "link": {
          "type": "doc",
          "id": "part-01-foundations/02-critical-thinking-and-problem-solving/index"
        },
        "items": [
          {
            "type": "category",
            "label": "02.1 Analytical Thinking for Engineers",
            "link": {
              "type": "doc",
              "id": "part-01-foundations/02-critical-thinking-and-problem-solving/02-1-analytical-thinking-for-engineers/index"
            },
            "items": [
              "part-01-foundations/02-critical-thinking-and-problem-solving/02-1-analytical-thinking-for-engineers/02-1-1-decomposing-ambiguous-problems",
              "part-01-foundations/02-critical-thinking-and-problem-solving/02-1-analytical-thinking-for-engineers/02-1-2-first-principles-reasoning",
              "part-01-foundations/02-critical-thinking-and-problem-solving/02-1-analytical-thinking-for-engineers/02-1-3-constraints-trade-offs-and-root-causes"
            ]
          },
          {
            "type": "category",
            "label": "02.2 Algorithmic & Structured Logic",
            "link": {
              "type": "doc",
              "id": "part-01-foundations/02-critical-thinking-and-problem-solving/02-2-algorithmic-and-structured-logic/index"
            },
            "items": [
              "part-01-foundations/02-critical-thinking-and-problem-solving/02-2-algorithmic-and-structured-logic/02-2-1-state-control-flow-and-edge-cases",
              "part-01-foundations/02-critical-thinking-and-problem-solving/02-2-algorithmic-and-structured-logic/02-2-2-mental-models-and-flow-tracing",
              "part-01-foundations/02-critical-thinking-and-problem-solving/02-2-algorithmic-and-structured-logic/02-2-3-reading-specifications-before-coding"
            ]
          },
          {
            "type": "category",
            "label": "02.3 Engineering Judgment in the AI Era",
            "link": {
              "type": "doc",
              "id": "part-01-foundations/02-critical-thinking-and-problem-solving/02-3-engineering-judgment-in-the-ai-era/index"
            },
            "items": [
              "part-01-foundations/02-critical-thinking-and-problem-solving/02-3-engineering-judgment-in-the-ai-era/02-3-1-evaluating-generated-solutions",
              "part-01-foundations/02-critical-thinking-and-problem-solving/02-3-engineering-judgment-in-the-ai-era/02-3-2-spotting-hidden-assumptions",
              "part-01-foundations/02-critical-thinking-and-problem-solving/02-3-engineering-judgment-in-the-ai-era/02-3-3-verification-habits-and-mental-discipline"
            ]
          }
        ]
      },
      {
        "type": "category",
        "label": "03. Developer Tools, Git, Debugging & AI Learning",
        "link": {
          "type": "doc",
          "id": "part-01-foundations/03-developer-tools-git-debugging-and-ai-learning/index"
        },
        "items": [
          {
            "type": "category",
            "label": "03.1 The Modern Developer Workspace",
            "link": {
              "type": "doc",
              "id": "part-01-foundations/03-developer-tools-git-debugging-and-ai-learning/03-1-the-modern-developer-workspace/index"
            },
            "items": [
              "part-01-foundations/03-developer-tools-git-debugging-and-ai-learning/03-1-the-modern-developer-workspace/03-1-1-editors-extensions-and-shortcuts",
              "part-01-foundations/03-developer-tools-git-debugging-and-ai-learning/03-1-the-modern-developer-workspace/03-1-2-command-line-essentials",
              "part-01-foundations/03-developer-tools-git-debugging-and-ai-learning/03-1-the-modern-developer-workspace/03-1-3-package-managers-and-environments",
              "part-01-foundations/03-developer-tools-git-debugging-and-ai-learning/03-1-the-modern-developer-workspace/03-1-4-installing-nodejs-npm-and-your-first-project"
            ]
          },
          {
            "type": "category",
            "label": "03.2 Version Control with Git",
            "link": {
              "type": "doc",
              "id": "part-01-foundations/03-developer-tools-git-debugging-and-ai-learning/03-2-version-control-with-git/index"
            },
            "items": [
              "part-01-foundations/03-developer-tools-git-debugging-and-ai-learning/03-2-version-control-with-git/03-2-1-repositories-commits-and-history",
              "part-01-foundations/03-developer-tools-git-debugging-and-ai-learning/03-2-version-control-with-git/03-2-2-branching-and-merging",
              "part-01-foundations/03-developer-tools-git-debugging-and-ai-learning/03-2-version-control-with-git/03-2-3-remote-repositories-and-github-basics"
            ]
          },
          {
            "type": "category",
            "label": "03.3 Debugging & AI-Assisted Learning",
            "link": {
              "type": "doc",
              "id": "part-01-foundations/03-developer-tools-git-debugging-and-ai-learning/03-3-debugging-and-ai-assisted-learning/index"
            },
            "items": [
              "part-01-foundations/03-developer-tools-git-debugging-and-ai-learning/03-3-debugging-and-ai-assisted-learning/03-3-1-reading-stack-traces-and-logs",
              "part-01-foundations/03-developer-tools-git-debugging-and-ai-learning/03-3-debugging-and-ai-assisted-learning/03-3-2-systematic-isolation-and-reproduction",
              "part-01-foundations/03-developer-tools-git-debugging-and-ai-learning/03-3-debugging-and-ai-assisted-learning/03-3-3-using-ai-as-a-tutor-without-bypassing-mastery"
            ]
          }
        ]
      }
    ]
  },
  {
    "type": "category",
    "label": "Part 02 — JavaScript & Frontend Development",
    "link": {
      "type": "doc",
      "id": "part-02-javascript-and-frontend-development/index"
    },
    "items": [
      {
        "type": "category",
        "label": "04. JavaScript Fundamentals (Deep)",
        "link": {
          "type": "doc",
          "id": "part-02-javascript-and-frontend-development/04-javascript-fundamentals-deep/index"
        },
        "items": [
          {
            "type": "category",
            "label": "04.1 Language Core & Execution Model",
            "link": {
              "type": "doc",
              "id": "part-02-javascript-and-frontend-development/04-javascript-fundamentals-deep/04-1-language-core-and-execution-model/index"
            },
            "items": [
              "part-02-javascript-and-frontend-development/04-javascript-fundamentals-deep/04-1-language-core-and-execution-model/04-1-1-variables-types-and-coercion",
              "part-02-javascript-and-frontend-development/04-javascript-fundamentals-deep/04-1-language-core-and-execution-model/04-1-2-execution-contexts-and-call-stack",
              "part-02-javascript-and-frontend-development/04-javascript-fundamentals-deep/04-1-language-core-and-execution-model/04-1-3-scope-hoisting-and-closures"
            ]
          },
          {
            "type": "category",
            "label": "04.2 Functions, Objects & Data Structures",
            "link": {
              "type": "doc",
              "id": "part-02-javascript-and-frontend-development/04-javascript-fundamentals-deep/04-2-functions-objects-and-data-structures/index"
            },
            "items": [
              "part-02-javascript-and-frontend-development/04-javascript-fundamentals-deep/04-2-functions-objects-and-data-structures/04-2-1-first-class-functions-and-higher-order-patterns",
              "part-02-javascript-and-frontend-development/04-javascript-fundamentals-deep/04-2-functions-objects-and-data-structures/04-2-2-objects-prototypes-and-references",
              "part-02-javascript-and-frontend-development/04-javascript-fundamentals-deep/04-2-functions-objects-and-data-structures/04-2-3-arrays-maps-sets-and-immutability"
            ]
          },
          {
            "type": "category",
            "label": "04.3 Asynchronous JavaScript & Modules",
            "link": {
              "type": "doc",
              "id": "part-02-javascript-and-frontend-development/04-javascript-fundamentals-deep/04-3-asynchronous-javascript-and-modules/index"
            },
            "items": [
              "part-02-javascript-and-frontend-development/04-javascript-fundamentals-deep/04-3-asynchronous-javascript-and-modules/04-3-1-event-loop-microtasks-and-timers",
              "part-02-javascript-and-frontend-development/04-javascript-fundamentals-deep/04-3-asynchronous-javascript-and-modules/04-3-2-promises-async-await-and-error-handling",
              "part-02-javascript-and-frontend-development/04-javascript-fundamentals-deep/04-3-asynchronous-javascript-and-modules/04-3-3-es-modules-and-modern-syntax"
            ]
          }
        ]
      },
      {
        "type": "category",
        "label": "05. TypeScript for Professional Development",
        "link": {
          "type": "doc",
          "id": "part-02-javascript-and-frontend-development/05-typescript-for-professional-development/index"
        },
        "items": [
          {
            "type": "category",
            "label": "05.1 Static Typing Foundations",
            "link": {
              "type": "doc",
              "id": "part-02-javascript-and-frontend-development/05-typescript-for-professional-development/05-1-static-typing-foundations/index"
            },
            "items": [
              "part-02-javascript-and-frontend-development/05-typescript-for-professional-development/05-1-static-typing-foundations/05-1-1-type-inference-and-annotations",
              "part-02-javascript-and-frontend-development/05-typescript-for-professional-development/05-1-static-typing-foundations/05-1-2-interfaces-type-aliases-and-unions",
              "part-02-javascript-and-frontend-development/05-typescript-for-professional-development/05-1-static-typing-foundations/05-1-3-narrowing-and-type-guards"
            ]
          },
          {
            "type": "category",
            "label": "05.2 Generics & Advanced Patterns",
            "link": {
              "type": "doc",
              "id": "part-02-javascript-and-frontend-development/05-typescript-for-professional-development/05-2-generics-and-advanced-patterns/index"
            },
            "items": [
              "part-02-javascript-and-frontend-development/05-typescript-for-professional-development/05-2-generics-and-advanced-patterns/05-2-1-generic-functions-and-constraints",
              "part-02-javascript-and-frontend-development/05-typescript-for-professional-development/05-2-generics-and-advanced-patterns/05-2-2-utility-types-and-mapped-types",
              "part-02-javascript-and-frontend-development/05-typescript-for-professional-development/05-2-generics-and-advanced-patterns/05-2-3-strict-compiler-configuration"
            ]
          },
          {
            "type": "category",
            "label": "05.3 Type-Safe Application Contracts",
            "link": {
              "type": "doc",
              "id": "part-02-javascript-and-frontend-development/05-typescript-for-professional-development/05-3-type-safe-application-contracts/index"
            },
            "items": [
              "part-02-javascript-and-frontend-development/05-typescript-for-professional-development/05-3-type-safe-application-contracts/05-3-1-typing-api-payloads-and-runtime-validation",
              "part-02-javascript-and-frontend-development/05-typescript-for-professional-development/05-3-type-safe-application-contracts/05-3-2-discriminated-unions-for-domain-state"
            ]
          }
        ]
      },
      {
        "type": "category",
        "label": "06. HTML, CSS & Browser Development",
        "link": {
          "type": "doc",
          "id": "part-02-javascript-and-frontend-development/06-html-css-and-browser-development/index"
        },
        "items": [
          {
            "type": "category",
            "label": "06.1 Semantic HTML & Accessibility",
            "link": {
              "type": "doc",
              "id": "part-02-javascript-and-frontend-development/06-html-css-and-browser-development/06-1-semantic-html-and-accessibility/index"
            },
            "items": [
              "part-02-javascript-and-frontend-development/06-html-css-and-browser-development/06-1-semantic-html-and-accessibility/06-1-1-document-structure-and-landmarks",
              "part-02-javascript-and-frontend-development/06-html-css-and-browser-development/06-1-semantic-html-and-accessibility/06-1-2-forms-validation-and-keyboard-navigation",
              "part-02-javascript-and-frontend-development/06-html-css-and-browser-development/06-1-semantic-html-and-accessibility/06-1-3-aria-semantics-and-screen-readers"
            ]
          },
          {
            "type": "category",
            "label": "06.2 Modern CSS & Responsive Layout",
            "link": {
              "type": "doc",
              "id": "part-02-javascript-and-frontend-development/06-html-css-and-browser-development/06-2-modern-css-and-responsive-layout/index"
            },
            "items": [
              "part-02-javascript-and-frontend-development/06-html-css-and-browser-development/06-2-modern-css-and-responsive-layout/06-2-1-box-model-specificity-and-cascade",
              "part-02-javascript-and-frontend-development/06-html-css-and-browser-development/06-2-modern-css-and-responsive-layout/06-2-2-flexbox-and-css-grid-systems",
              "part-02-javascript-and-frontend-development/06-html-css-and-browser-development/06-2-modern-css-and-responsive-layout/06-2-3-responsive-breakpoints-tokens-and-dark-themes",
              "part-02-javascript-and-frontend-development/06-html-css-and-browser-development/06-2-modern-css-and-responsive-layout/06-2-4-tailwind-css-v4-from-a-clean-setup"
            ]
          },
          {
            "type": "category",
            "label": "06.3 The Browser DOM & Web APIs",
            "link": {
              "type": "doc",
              "id": "part-02-javascript-and-frontend-development/06-html-css-and-browser-development/06-3-the-browser-dom-and-web-apis/index"
            },
            "items": [
              "part-02-javascript-and-frontend-development/06-html-css-and-browser-development/06-3-the-browser-dom-and-web-apis/06-3-1-dom-tree-events-and-delegation",
              "part-02-javascript-and-frontend-development/06-html-css-and-browser-development/06-3-the-browser-dom-and-web-apis/06-3-2-fetch-api-storage-and-browser-devtools",
              "part-02-javascript-and-frontend-development/06-html-css-and-browser-development/06-3-the-browser-dom-and-web-apis/06-3-3-calling-a-real-api-fetch-cors-and-devtools-lab"
            ]
          }
        ]
      },
      {
        "type": "category",
        "label": "07. React Development",
        "link": {
          "type": "doc",
          "id": "part-02-javascript-and-frontend-development/07-react-development/index"
        },
        "items": [
          {
            "type": "category",
            "label": "07.1 Component Architecture & Rendering",
            "link": {
              "type": "doc",
              "id": "part-02-javascript-and-frontend-development/07-react-development/07-1-component-architecture-and-rendering/index"
            },
            "items": [
              "part-02-javascript-and-frontend-development/07-react-development/07-1-component-architecture-and-rendering/07-1-1-jsx-props-and-composition",
              "part-02-javascript-and-frontend-development/07-react-development/07-1-component-architecture-and-rendering/07-1-2-reconciliation-and-rendering-lifecycle",
              "part-02-javascript-and-frontend-development/07-react-development/07-1-component-architecture-and-rendering/07-1-3-lists-keys-and-conditional-ui"
            ]
          },
          {
            "type": "category",
            "label": "07.2 State, Hooks & Effects",
            "link": {
              "type": "doc",
              "id": "part-02-javascript-and-frontend-development/07-react-development/07-2-state-hooks-and-effects/index"
            },
            "items": [
              "part-02-javascript-and-frontend-development/07-react-development/07-2-state-hooks-and-effects/07-2-1-usestate-usereducer-and-derived-state",
              "part-02-javascript-and-frontend-development/07-react-development/07-2-state-hooks-and-effects/07-2-2-useeffect-and-synchronizing-external-systems",
              "part-02-javascript-and-frontend-development/07-react-development/07-2-state-hooks-and-effects/07-2-3-custom-hooks-and-context"
            ]
          },
          {
            "type": "category",
            "label": "07.3 Production React Patterns",
            "link": {
              "type": "doc",
              "id": "part-02-javascript-and-frontend-development/07-react-development/07-3-production-react-patterns/index"
            },
            "items": [
              "part-02-javascript-and-frontend-development/07-react-development/07-3-production-react-patterns/07-3-1-data-fetching-caching-and-mutations",
              "part-02-javascript-and-frontend-development/07-react-development/07-3-production-react-patterns/07-3-2-performance-optimization-and-memoization",
              "part-02-javascript-and-frontend-development/07-react-development/07-3-production-react-patterns/07-3-3-accessible-ui-component-libraries"
            ]
          }
        ]
      },
      {
        "type": "category",
        "label": "08. Next.js & Modern Web Applications",
        "link": {
          "type": "doc",
          "id": "part-02-javascript-and-frontend-development/08-nextjs-and-modern-web-applications/index"
        },
        "items": [
          {
            "type": "category",
            "label": "08.1 App Router & Rendering Strategies",
            "link": {
              "type": "doc",
              "id": "part-02-javascript-and-frontend-development/08-nextjs-and-modern-web-applications/08-1-app-router-and-rendering-strategies/index"
            },
            "items": [
              "part-02-javascript-and-frontend-development/08-nextjs-and-modern-web-applications/08-1-app-router-and-rendering-strategies/08-1-1-file-based-routing-and-layouts",
              "part-02-javascript-and-frontend-development/08-nextjs-and-modern-web-applications/08-1-app-router-and-rendering-strategies/08-1-2-server-components-vs-client-components",
              "part-02-javascript-and-frontend-development/08-nextjs-and-modern-web-applications/08-1-app-router-and-rendering-strategies/08-1-3-ssr-ssg-streaming-and-caching"
            ]
          },
          {
            "type": "category",
            "label": "08.2 Server Actions, Route Handlers & SEO",
            "link": {
              "type": "doc",
              "id": "part-02-javascript-and-frontend-development/08-nextjs-and-modern-web-applications/08-2-server-actions-route-handlers-and-seo/index"
            },
            "items": [
              "part-02-javascript-and-frontend-development/08-nextjs-and-modern-web-applications/08-2-server-actions-route-handlers-and-seo/08-2-1-api-routes-and-server-mutations",
              "part-02-javascript-and-frontend-development/08-nextjs-and-modern-web-applications/08-2-server-actions-route-handlers-and-seo/08-2-2-metadata-fonts-and-asset-optimization",
              "part-02-javascript-and-frontend-development/08-nextjs-and-modern-web-applications/08-2-server-actions-route-handlers-and-seo/08-2-3-middleware-and-edge-considerations"
            ]
          }
        ]
      }
    ]
  },
  {
    "type": "category",
    "label": "Part 03 — Python Development",
    "link": {
      "type": "doc",
      "id": "part-03-python-development/index"
    },
    "items": [
      {
        "type": "category",
        "label": "09. Python Fundamentals (Deep)",
        "link": {
          "type": "doc",
          "id": "part-03-python-development/09-python-fundamentals-deep/index"
        },
        "items": [
          {
            "type": "category",
            "label": "09.1 Core Syntax & Data Model",
            "link": {
              "type": "doc",
              "id": "part-03-python-development/09-python-fundamentals-deep/09-1-core-syntax-and-data-model/index"
            },
            "items": [
              "part-03-python-development/09-python-fundamentals-deep/09-1-core-syntax-and-data-model/09-1-1-objects-references-and-mutability",
              "part-03-python-development/09-python-fundamentals-deep/09-1-core-syntax-and-data-model/09-1-2-lists-tuples-dicts-and-sets",
              "part-03-python-development/09-python-fundamentals-deep/09-1-core-syntax-and-data-model/09-1-3-control-flow-comprehensions-and-generators"
            ]
          },
          {
            "type": "category",
            "label": "09.2 Functions, OOP & Type Hints",
            "link": {
              "type": "doc",
              "id": "part-03-python-development/09-python-fundamentals-deep/09-2-functions-oop-and-type-hints/index"
            },
            "items": [
              "part-03-python-development/09-python-fundamentals-deep/09-2-functions-oop-and-type-hints/09-2-1-functions-decorators-and-context-managers",
              "part-03-python-development/09-python-fundamentals-deep/09-2-functions-oop-and-type-hints/09-2-2-classes-dataclasses-and-inheritance",
              "part-03-python-development/09-python-fundamentals-deep/09-2-functions-oop-and-type-hints/09-2-3-type-annotations-and-pydantic-models"
            ]
          },
          {
            "type": "category",
            "label": "09.3 Packaging, Virtual Environments & Async",
            "link": {
              "type": "doc",
              "id": "part-03-python-development/09-python-fundamentals-deep/09-3-packaging-virtual-environments-and-async/index"
            },
            "items": [
              "part-03-python-development/09-python-fundamentals-deep/09-3-packaging-virtual-environments-and-async/09-3-1-virtual-environments-uv-and-pyproject-toml",
              "part-03-python-development/09-python-fundamentals-deep/09-3-packaging-virtual-environments-and-async/09-3-2-exceptions-logging-and-testing-with-pytest",
              "part-03-python-development/09-python-fundamentals-deep/09-3-packaging-virtual-environments-and-async/09-3-3-asyncio-and-concurrent-io"
            ]
          }
        ]
      },
      {
        "type": "category",
        "label": "10. Python for APIs, Files & Automation",
        "link": {
          "type": "doc",
          "id": "part-03-python-development/10-python-for-apis-files-and-automation/index"
        },
        "items": [
          {
            "type": "category",
            "label": "10.1 Building APIs with FastAPI",
            "link": {
              "type": "doc",
              "id": "part-03-python-development/10-python-for-apis-files-and-automation/10-1-building-apis-with-fastapi/index"
            },
            "items": [
              "part-03-python-development/10-python-for-apis-files-and-automation/10-1-building-apis-with-fastapi/10-1-1-routing-schemas-and-validation",
              "part-03-python-development/10-python-for-apis-files-and-automation/10-1-building-apis-with-fastapi/10-1-2-dependency-injection-and-background-tasks",
              "part-03-python-development/10-python-for-apis-files-and-automation/10-1-building-apis-with-fastapi/10-1-3-consuming-external-rest-apis"
            ]
          },
          {
            "type": "category",
            "label": "10.2 Files, Data Processing & Scripts",
            "link": {
              "type": "doc",
              "id": "part-03-python-development/10-python-for-apis-files-and-automation/10-2-files-data-processing-and-scripts/index"
            },
            "items": [
              "part-03-python-development/10-python-for-apis-files-and-automation/10-2-files-data-processing-and-scripts/10-2-1-working-with-json-csv-and-pdfs",
              "part-03-python-development/10-python-for-apis-files-and-automation/10-2-files-data-processing-and-scripts/10-2-2-cli-tools-and-scheduled-automation",
              "part-03-python-development/10-python-for-apis-files-and-automation/10-2-files-data-processing-and-scripts/10-2-3-reliable-retry-and-error-patterns"
            ]
          }
        ]
      }
    ]
  },
  {
    "type": "category",
    "label": "Part 04 — Databases, Backend & Full-Stack Development",
    "link": {
      "type": "doc",
      "id": "part-04-databases-backend-and-full-stack-development/index"
    },
    "items": [
      {
        "type": "category",
        "label": "11. Database Design & Fundamentals",
        "link": {
          "type": "doc",
          "id": "part-04-databases-backend-and-full-stack-development/11-database-design-and-fundamentals/index"
        },
        "items": [
          {
            "type": "category",
            "label": "11.1 Data Modeling & Relationships",
            "link": {
              "type": "doc",
              "id": "part-04-databases-backend-and-full-stack-development/11-database-design-and-fundamentals/11-1-data-modeling-and-relationships/index"
            },
            "items": [
              "part-04-databases-backend-and-full-stack-development/11-database-design-and-fundamentals/11-1-data-modeling-and-relationships/11-1-1-entities-keys-and-cardinality",
              "part-04-databases-backend-and-full-stack-development/11-database-design-and-fundamentals/11-1-data-modeling-and-relationships/11-1-2-normalization-and-denormalization",
              "part-04-databases-backend-and-full-stack-development/11-database-design-and-fundamentals/11-1-data-modeling-and-relationships/11-1-3-the-shopcore-schema"
            ]
          },
          {
            "type": "category",
            "label": "11.2 Storage Engines, ACID & Choosing Databases",
            "link": {
              "type": "doc",
              "id": "part-04-databases-backend-and-full-stack-development/11-database-design-and-fundamentals/11-2-storage-engines-acid-and-choosing-databases/index"
            },
            "items": [
              "part-04-databases-backend-and-full-stack-development/11-database-design-and-fundamentals/11-2-storage-engines-acid-and-choosing-databases/11-2-1-transactions-and-acid-guarantees",
              "part-04-databases-backend-and-full-stack-development/11-database-design-and-fundamentals/11-2-storage-engines-acid-and-choosing-databases/11-2-2-relational-vs-document-vs-vector-stores"
            ]
          }
        ]
      },
      {
        "type": "category",
        "label": "12. SQL, PostgreSQL & MongoDB",
        "link": {
          "type": "doc",
          "id": "part-04-databases-backend-and-full-stack-development/12-sql-postgresql-and-mongodb/index"
        },
        "items": [
        {
          "type": "category",
          "label": "12.1 Install & Run PostgreSQL",
          "link": {
            "type": "doc",
            "id": "part-04-databases-backend-and-full-stack-development/12-sql-postgresql-and-mongodb/12-1-install-and-run-postgresql/index"
          },
          "items": [
              "part-04-databases-backend-and-full-stack-development/12-sql-postgresql-and-mongodb/12-1-install-and-run-postgresql/12-1-1-what-postgresql-is-and-how-to-install-it",
              "part-04-databases-backend-and-full-stack-development/12-sql-postgresql-and-mongodb/12-1-install-and-run-postgresql/12-1-2-pgadmin-4-from-zero",
              "part-04-databases-backend-and-full-stack-development/12-sql-postgresql-and-mongodb/12-1-install-and-run-postgresql/12-1-3-psql-command-line-essentials",
              "part-04-databases-backend-and-full-stack-development/12-sql-postgresql-and-mongodb/12-1-install-and-run-postgresql/12-1-4-hosted-postgresql-neon-and-supabase"
          ]
        },
        {
          "type": "category",
          "label": "12.2 SQL & Relational Querying",
          "link": {
            "type": "doc",
            "id": "part-04-databases-backend-and-full-stack-development/12-sql-postgresql-and-mongodb/12-2-sql-and-relational-querying/index"
          },
          "items": [
              "part-04-databases-backend-and-full-stack-development/12-sql-postgresql-and-mongodb/12-2-sql-and-relational-querying/12-2-1-select-joins-grouping-and-aggregations",
              "part-04-databases-backend-and-full-stack-development/12-sql-postgresql-and-mongodb/12-2-sql-and-relational-querying/12-2-2-subqueries-ctes-and-window-functions",
              "part-04-databases-backend-and-full-stack-development/12-sql-postgresql-and-mongodb/12-2-sql-and-relational-querying/12-2-3-indexes-and-explain-analyze"
          ]
        },
        {
          "type": "category",
          "label": "12.3 PostgreSQL in Practice",
          "link": {
            "type": "doc",
            "id": "part-04-databases-backend-and-full-stack-development/12-sql-postgresql-and-mongodb/12-3-postgresql-in-practice/index"
          },
          "items": [
              "part-04-databases-backend-and-full-stack-development/12-sql-postgresql-and-mongodb/12-3-postgresql-in-practice/12-3-1-schemas-constraints-and-migrations",
              "part-04-databases-backend-and-full-stack-development/12-sql-postgresql-and-mongodb/12-3-postgresql-in-practice/12-3-2-users-roles-backups-and-restores",
              "part-04-databases-backend-and-full-stack-development/12-sql-postgresql-and-mongodb/12-3-postgresql-in-practice/12-3-3-jsonb-full-text-search-and-pgvector"
          ]
        },
        {
          "type": "category",
          "label": "12.4 MongoDB from Zero to Atlas",
          "link": {
            "type": "doc",
            "id": "part-04-databases-backend-and-full-stack-development/12-sql-postgresql-and-mongodb/12-4-mongodb-from-zero-to-atlas/index"
          },
          "items": [
              "part-04-databases-backend-and-full-stack-development/12-sql-postgresql-and-mongodb/12-4-mongodb-from-zero-to-atlas/12-4-1-what-mongodb-is-and-installing-community-server",
              "part-04-databases-backend-and-full-stack-development/12-sql-postgresql-and-mongodb/12-4-mongodb-from-zero-to-atlas/12-4-2-your-first-database-with-compass-and-mongosh",
              "part-04-databases-backend-and-full-stack-development/12-sql-postgresql-and-mongodb/12-4-mongodb-from-zero-to-atlas/12-4-3-modeling-documents-embedded-vs-referenced",
              "part-04-databases-backend-and-full-stack-development/12-sql-postgresql-and-mongodb/12-4-mongodb-from-zero-to-atlas/12-4-4-indexes-aggregation-pipelines-and-schema-validation",
              "part-04-databases-backend-and-full-stack-development/12-sql-postgresql-and-mongodb/12-4-mongodb-from-zero-to-atlas/12-4-5-mongodb-atlas-from-zero",
              "part-04-databases-backend-and-full-stack-development/12-sql-postgresql-and-mongodb/12-4-mongodb-from-zero-to-atlas/12-4-6-postgresql-vs-mongodb-choosing-for-real-projects"
          ]
        }
        ]
      },
      {
        "type": "category",
        "label": "13. Backend Engineering with Node.js",
        "link": {
          "type": "doc",
          "id": "part-04-databases-backend-and-full-stack-development/13-backend-engineering-with-nodejs/index"
        },
        "items": [
        {
          "type": "category",
          "label": "13.1 Node.js & npm from Zero",
          "link": {
            "type": "doc",
            "id": "part-04-databases-backend-and-full-stack-development/13-backend-engineering-with-nodejs/13-1-nodejs-and-npm-from-zero/index"
          },
          "items": [
              "part-04-databases-backend-and-full-stack-development/13-backend-engineering-with-nodejs/13-1-nodejs-and-npm-from-zero/13-1-1-what-nodejs-is-lts-and-how-to-install-it",
              "part-04-databases-backend-and-full-stack-development/13-backend-engineering-with-nodejs/13-1-nodejs-and-npm-from-zero/13-1-2-npm-package-json-and-your-first-project"
          ]
        },
        {
          "type": "category",
          "label": "13.2 Building APIs with Express",
          "link": {
            "type": "doc",
            "id": "part-04-databases-backend-and-full-stack-development/13-backend-engineering-with-nodejs/13-2-building-apis-with-express/index"
          },
          "items": [
              "part-04-databases-backend-and-full-stack-development/13-backend-engineering-with-nodejs/13-2-building-apis-with-express/13-2-1-your-first-express-server",
              "part-04-databases-backend-and-full-stack-development/13-backend-engineering-with-nodejs/13-2-building-apis-with-express/13-2-2-restful-resource-design-and-status-codes",
              "part-04-databases-backend-and-full-stack-development/13-backend-engineering-with-nodejs/13-2-building-apis-with-express/13-2-3-middleware-validation-and-error-boundaries",
              "part-04-databases-backend-and-full-stack-development/13-backend-engineering-with-nodejs/13-2-building-apis-with-express/13-2-4-connecting-databases-postgresql-and-mongodb",
              "part-04-databases-backend-and-full-stack-development/13-backend-engineering-with-nodejs/13-2-building-apis-with-express/13-2-5-building-a-complete-shopcore-crud-api"
          ]
        },
        {
          "type": "category",
          "label": "13.3 Authentication & Authorization",
          "link": {
            "type": "doc",
            "id": "part-04-databases-backend-and-full-stack-development/13-backend-engineering-with-nodejs/13-3-authentication-and-authorization/index"
          },
          "items": [
              "part-04-databases-backend-and-full-stack-development/13-backend-engineering-with-nodejs/13-3-authentication-and-authorization/13-3-1-sessions-jwts-and-password-hashing",
              "part-04-databases-backend-and-full-stack-development/13-backend-engineering-with-nodejs/13-3-authentication-and-authorization/13-3-2-role-based-access-control-and-ownership",
              "part-04-databases-backend-and-full-stack-development/13-backend-engineering-with-nodejs/13-3-authentication-and-authorization/13-3-3-oauth-2-0-sign-in-with-github"
          ]
        },
        {
          "type": "category",
          "label": "13.4 Production Integrations & Hardening",
          "link": {
            "type": "doc",
            "id": "part-04-databases-backend-and-full-stack-development/13-backend-engineering-with-nodejs/13-4-production-integrations-and-hardening/index"
          },
          "items": [
              "part-04-databases-backend-and-full-stack-development/13-backend-engineering-with-nodejs/13-4-production-integrations-and-hardening/13-4-1-background-jobs-and-idempotency",
              "part-04-databases-backend-and-full-stack-development/13-backend-engineering-with-nodejs/13-4-production-integrations-and-hardening/13-4-2-webhooks-rate-limiting-and-file-uploads",
              "part-04-databases-backend-and-full-stack-development/13-backend-engineering-with-nodejs/13-4-production-integrations-and-hardening/13-4-3-api-security-essentials"
          ]
        }
        ]
      },
      {
        "type": "category",
        "label": "14. Git Teamwork, Testing & Code Review",
        "link": {
          "type": "doc",
          "id": "part-04-databases-backend-and-full-stack-development/14-git-teamwork-testing-and-code-review/index"
        },
        "items": [
        {
          "type": "category",
          "label": "14.1 Git & GitHub from Zero",
          "link": {
            "type": "doc",
            "id": "part-04-databases-backend-and-full-stack-development/14-git-teamwork-testing-and-code-review/14-1-git-and-github-from-zero/index"
          },
          "items": [
              "part-04-databases-backend-and-full-stack-development/14-git-teamwork-testing-and-code-review/14-1-git-and-github-from-zero/14-1-1-installing-git-and-creating-your-github-account",
              "part-04-databases-backend-and-full-stack-development/14-git-teamwork-testing-and-code-review/14-1-git-and-github-from-zero/14-1-2-clone-commit-push-and-your-first-pull-request"
          ]
        },
        {
          "type": "category",
          "label": "14.2 Collaborative Git Workflows",
          "link": {
            "type": "doc",
            "id": "part-04-databases-backend-and-full-stack-development/14-git-teamwork-testing-and-code-review/14-2-collaborative-git-workflows/index"
          },
          "items": [
              "part-04-databases-backend-and-full-stack-development/14-git-teamwork-testing-and-code-review/14-2-collaborative-git-workflows/14-2-1-pull-requests-rebasing-and-conflict-resolution",
              "part-04-databases-backend-and-full-stack-development/14-git-teamwork-testing-and-code-review/14-2-collaborative-git-workflows/14-2-2-commit-conventions-and-release-hygiene"
          ]
        },
        {
          "type": "category",
          "label": "14.3 Automated Testing & Code Review",
          "link": {
            "type": "doc",
            "id": "part-04-databases-backend-and-full-stack-development/14-git-teamwork-testing-and-code-review/14-3-automated-testing-and-code-review/index"
          },
          "items": [
              "part-04-databases-backend-and-full-stack-development/14-git-teamwork-testing-and-code-review/14-3-automated-testing-and-code-review/14-3-1-unit-integration-and-end-to-end-tests",
              "part-04-databases-backend-and-full-stack-development/14-git-teamwork-testing-and-code-review/14-3-automated-testing-and-code-review/14-3-2-constructive-code-review-standards"
          ]
        }
        ]
      },
      {
        "type": "category",
        "label": "15. Complete Full-Stack Application",
        "link": {
          "type": "doc",
          "id": "part-04-databases-backend-and-full-stack-development/15-complete-full-stack-application/index"
        },
        "items": [
        {
          "type": "category",
          "label": "15.1 Foundations & Data Layer",
          "link": {
            "type": "doc",
            "id": "part-04-databases-backend-and-full-stack-development/15-complete-full-stack-application/15-1-foundations-and-data-layer/index"
          },
          "items": [
              "part-04-databases-backend-and-full-stack-development/15-complete-full-stack-application/15-1-foundations-and-data-layer/15-1-1-requirements-architecture-and-repository-layout",
              "part-04-databases-backend-and-full-stack-development/15-complete-full-stack-application/15-1-foundations-and-data-layer/15-1-2-database-design-and-migrations"
          ]
        },
        {
          "type": "category",
          "label": "15.2 Backend Build",
          "link": {
            "type": "doc",
            "id": "part-04-databases-backend-and-full-stack-development/15-complete-full-stack-application/15-2-backend-build/index"
          },
          "items": [
              "part-04-databases-backend-and-full-stack-development/15-complete-full-stack-application/15-2-backend-build/15-2-1-backend-setup-and-database-connection",
              "part-04-databases-backend-and-full-stack-development/15-complete-full-stack-application/15-2-backend-build/15-2-2-authentication-register-login-sessions-and-roles",
              "part-04-databases-backend-and-full-stack-development/15-complete-full-stack-application/15-2-backend-build/15-2-3-shop-api-products-cart-and-orders"
          ]
        },
        {
          "type": "category",
          "label": "15.3 Frontend Build",
          "link": {
            "type": "doc",
            "id": "part-04-databases-backend-and-full-stack-development/15-complete-full-stack-application/15-3-frontend-build/index"
          },
          "items": [
              "part-04-databases-backend-and-full-stack-development/15-complete-full-stack-application/15-3-frontend-build/15-3-1-react-vite-setup-and-api-integration",
              "part-04-databases-backend-and-full-stack-development/15-complete-full-stack-application/15-3-frontend-build/15-3-2-shop-ui-catalog-cart-and-checkout"
          ]
        },
        {
          "type": "category",
          "label": "15.4 Verification & Shipping",
          "link": {
            "type": "doc",
            "id": "part-04-databases-backend-and-full-stack-development/15-complete-full-stack-application/15-4-verification-and-shipping/index"
          },
          "items": [
              "part-04-databases-backend-and-full-stack-development/15-complete-full-stack-application/15-4-verification-and-shipping/15-4-1-testing-the-shopcore-app",
              "part-04-databases-backend-and-full-stack-development/15-complete-full-stack-application/15-4-verification-and-shipping/15-4-2-security-review-documentation-and-final-verification"
          ]
        }
        ]
      }
    ]
  },
  {
    "type": "category",
    "label": "Part 05 — Deployment, Cloud & DevOps",
    "link": {
      "type": "doc",
      "id": "part-05-deployment-cloud-and-devops/index"
    },
    "items": [
      {
        "type": "category",
        "label": "16. Deployment Foundations, Domains, DNS & Hosting",
        "link": {
          "type": "doc",
          "id": "part-05-deployment-cloud-and-devops/16-deployment-foundations-domains-dns-and-hosting/index"
        },
        "items": [
          {
            "type": "category",
            "label": "16.1 Deployment Fundamentals & Hosting Models",
            "link": {
              "type": "doc",
              "id": "part-05-deployment-cloud-and-devops/16-deployment-foundations-domains-dns-and-hosting/16-1-deployment-fundamentals-and-hosting-models/index"
            },
            "items": [
              "part-05-deployment-cloud-and-devops/16-deployment-foundations-domains-dns-and-hosting/16-1-deployment-fundamentals-and-hosting-models/16-1-1-local-to-production-builds-ports-env-vars-and-cors",
              "part-05-deployment-cloud-and-devops/16-deployment-foundations-domains-dns-and-hosting/16-1-deployment-fundamentals-and-hosting-models/16-1-2-hosting-types-and-free-vs-paid-limits"
            ]
          },
          {
            "type": "category",
            "label": "16.2 Domains, Registrars, DNS & HTTPS",
            "link": {
              "type": "doc",
              "id": "part-05-deployment-cloud-and-devops/16-deployment-foundations-domains-dns-and-hosting/16-2-domains-registrars-dns-and-https/index"
            },
            "items": [
              "part-05-deployment-cloud-and-devops/16-deployment-foundations-domains-dns-and-hosting/16-2-domains-registrars-dns-and-https/16-2-1-domain-ownership-registrars-and-transfers",
              "part-05-deployment-cloud-and-devops/16-deployment-foundations-domains-dns-and-hosting/16-2-domains-registrars-dns-and-https/16-2-2-dns-records-nameservers-and-propagation",
              "part-05-deployment-cloud-and-devops/16-deployment-foundations-domains-dns-and-hosting/16-2-domains-registrars-dns-and-https/16-2-3-ssl-tls-automatic-https-and-cdns"
            ]
          },
          {
            "type": "category",
            "label": "16.3 Managed Platform & Full-Stack Deployment",
            "link": {
              "type": "doc",
              "id": "part-05-deployment-cloud-and-devops/16-deployment-foundations-domains-dns-and-hosting/16-3-managed-platform-and-full-stack-deployment/index"
            },
            "items": [
              "part-05-deployment-cloud-and-devops/16-deployment-foundations-domains-dns-and-hosting/16-3-managed-platform-and-full-stack-deployment/16-3-1-deploying-frontend-apps-on-vercel-netlify-and-cloudflare",
              "part-05-deployment-cloud-and-devops/16-deployment-foundations-domains-dns-and-hosting/16-3-managed-platform-and-full-stack-deployment/16-3-2-deploying-node-python-apis-and-hosted-databases"
            ]
          }
        ]
      },
      {
        "type": "category",
        "label": "17. Linux, VPS & Server Administration",
        "link": {
          "type": "doc",
          "id": "part-05-deployment-cloud-and-devops/17-linux-vps-and-server-administration/index"
        },
        "items": [
          {
            "type": "category",
            "label": "17.1 Linux Basics, SSH & System Administration",
            "link": {
              "type": "doc",
              "id": "part-05-deployment-cloud-and-devops/17-linux-vps-and-server-administration/17-1-linux-basics-ssh-and-system-administration/index"
            },
            "items": [
              "part-05-deployment-cloud-and-devops/17-linux-vps-and-server-administration/17-1-linux-basics-ssh-and-system-administration/17-1-1-linux-shell-wsl2-ssh-keys-and-server-access",
              "part-05-deployment-cloud-and-devops/17-linux-vps-and-server-administration/17-1-linux-basics-ssh-and-system-administration/17-1-2-filesystem-users-permissions-and-packages",
              "part-05-deployment-cloud-and-devops/17-linux-vps-and-server-administration/17-1-linux-basics-ssh-and-system-administration/17-1-3-processes-systemd-services-and-journal-logs"
            ]
          },
          {
            "type": "category",
            "label": "17.2 VPS Security, Firewalls & Reverse Proxies",
            "link": {
              "type": "doc",
              "id": "part-05-deployment-cloud-and-devops/17-linux-vps-and-server-administration/17-2-vps-security-firewalls-and-reverse-proxies/index"
            },
            "items": [
              "part-05-deployment-cloud-and-devops/17-linux-vps-and-server-administration/17-2-vps-security-firewalls-and-reverse-proxies/17-2-1-ports-ufw-firewalls-and-ssh-hardening",
              "part-05-deployment-cloud-and-devops/17-linux-vps-and-server-administration/17-2-vps-security-firewalls-and-reverse-proxies/17-2-2-reverse-proxies-with-nginx-and-caddy"
            ]
          },
          {
            "type": "category",
            "label": "17.3 VPS Operations & Real Server Deployment",
            "link": {
              "type": "doc",
              "id": "part-05-deployment-cloud-and-devops/17-linux-vps-and-server-administration/17-3-vps-operations-and-real-server-deployment/index"
            },
            "items": [
              "part-05-deployment-cloud-and-devops/17-linux-vps-and-server-administration/17-3-vps-operations-and-real-server-deployment/17-3-1-vps-providers-updates-backups-and-real-deployment"
            ]
          }
        ]
      },
      {
        "type": "category",
        "label": "18. Docker & Containerized Application Deployment",
        "link": {
          "type": "doc",
          "id": "part-05-deployment-cloud-and-devops/18-docker-and-containerized-application-deployment/index"
        },
        "items": [
          {
            "type": "category",
            "label": "18.1 Docker Setup, Images & Multi-Stage Builds",
            "link": {
              "type": "doc",
              "id": "part-05-deployment-cloud-and-devops/18-docker-and-containerized-application-deployment/18-1-docker-setup-images-and-multi-stage-builds/index"
            },
            "items": [
              "part-05-deployment-cloud-and-devops/18-docker-and-containerized-application-deployment/18-1-docker-setup-images-and-multi-stage-builds/18-1-1-docker-installation-architecture-and-first-containers",
              "part-05-deployment-cloud-and-devops/18-docker-and-containerized-application-deployment/18-1-docker-setup-images-and-multi-stage-builds/18-1-2-dockerfiles-layers-caching-and-multi-stage-builds"
            ]
          },
          {
            "type": "category",
            "label": "18.2 Volumes, Networks, Compose & Registries",
            "link": {
              "type": "doc",
              "id": "part-05-deployment-cloud-and-devops/18-docker-and-containerized-application-deployment/18-2-volumes-networks-compose-and-registries/index"
            },
            "items": [
              "part-05-deployment-cloud-and-devops/18-docker-and-containerized-application-deployment/18-2-volumes-networks-compose-and-registries/18-2-1-volumes-bridge-networks-and-env-injection",
              "part-05-deployment-cloud-and-devops/18-docker-and-containerized-application-deployment/18-2-volumes-networks-compose-and-registries/18-2-2-docker-compose-stacks-and-container-registries"
            ]
          },
          {
            "type": "category",
            "label": "18.3 Container Security & Production VPS Deployment",
            "link": {
              "type": "doc",
              "id": "part-05-deployment-cloud-and-devops/18-docker-and-containerized-application-deployment/18-3-container-security-and-production-vps-deployment/index"
            },
            "items": [
              "part-05-deployment-cloud-and-devops/18-docker-and-containerized-application-deployment/18-3-container-security-and-production-vps-deployment/18-3-1-container-security-and-deploying-docker-to-production-vps"
            ]
          }
        ]
      },
      {
        "type": "category",
        "label": "19. Cloud Engineering, DevOps, CI/CD & IaC",
        "link": {
          "type": "doc",
          "id": "part-05-deployment-cloud-and-devops/19-cloud-engineering-devops-cicd-and-iac/index"
        },
        "items": [
          {
            "type": "category",
            "label": "19.1 Cloud Fundamentals & AWS, Azure, Google Cloud",
            "link": {
              "type": "doc",
              "id": "part-05-deployment-cloud-and-devops/19-cloud-engineering-devops-cicd-and-iac/19-1-cloud-fundamentals-and-aws-azure-google-cloud/index"
            },
            "items": [
              "part-05-deployment-cloud-and-devops/19-cloud-engineering-devops-cicd-and-iac/19-1-cloud-fundamentals-and-aws-azure-google-cloud/19-1-1-cloud-regions-networking-iam-and-billing-controls",
              "part-05-deployment-cloud-and-devops/19-cloud-engineering-devops-cicd-and-iac/19-1-cloud-fundamentals-and-aws-azure-google-cloud/19-1-2-aws-core-infrastructure-and-hands-on-workload-lab",
              "part-05-deployment-cloud-and-devops/19-cloud-engineering-devops-cicd-and-iac/19-1-cloud-fundamentals-and-aws-azure-google-cloud/19-1-3-azure-google-cloud-and-service-equivalents"
            ]
          },
          {
            "type": "category",
            "label": "19.2 DevOps Workflows & CI/CD Pipelines",
            "link": {
              "type": "doc",
              "id": "part-05-deployment-cloud-and-devops/19-cloud-engineering-devops-cicd-and-iac/19-2-devops-workflows-and-cicd-pipelines/index"
            },
            "items": [
              "part-05-deployment-cloud-and-devops/19-cloud-engineering-devops-cicd-and-iac/19-2-devops-workflows-and-cicd-pipelines/19-2-1-git-workflows-and-github-actions-fundamentals",
              "part-05-deployment-cloud-and-devops/19-cloud-engineering-devops-cicd-and-iac/19-2-devops-workflows-and-cicd-pipelines/19-2-2-testing-artifacts-ci-secrets-and-rollback-pipelines"
            ]
          },
          {
            "type": "category",
            "label": "19.3 Infrastructure as Code: Terraform & Ansible",
            "link": {
              "type": "doc",
              "id": "part-05-deployment-cloud-and-devops/19-cloud-engineering-devops-cicd-and-iac/19-3-infrastructure-as-code-terraform-and-ansible/index"
            },
            "items": [
              "part-05-deployment-cloud-and-devops/19-cloud-engineering-devops-cicd-and-iac/19-3-infrastructure-as-code-terraform-and-ansible/19-3-1-terraform-providers-state-modules-and-cloud-provisioning",
              "part-05-deployment-cloud-and-devops/19-cloud-engineering-devops-cicd-and-iac/19-3-infrastructure-as-code-terraform-and-ansible/19-3-2-server-configuration-automation-with-ansible"
            ]
          }
        ]
      },
      {
        "type": "category",
        "label": "20. Kubernetes, Production Scaling & Multi-Cloud",
        "link": {
          "type": "doc",
          "id": "part-05-deployment-cloud-and-devops/20-kubernetes-production-scaling-and-multi-cloud/index"
        },
        "items": [
          {
            "type": "category",
            "label": "20.1 Kubernetes & Helm Fundamentals",
            "link": {
              "type": "doc",
              "id": "part-05-deployment-cloud-and-devops/20-kubernetes-production-scaling-and-multi-cloud/20-1-kubernetes-and-helm-fundamentals/index"
            },
            "items": [
              "part-05-deployment-cloud-and-devops/20-kubernetes-production-scaling-and-multi-cloud/20-1-kubernetes-and-helm-fundamentals/20-1-1-kubernetes-architecture-pods-deployments-services-and-config",
              "part-05-deployment-cloud-and-devops/20-kubernetes-production-scaling-and-multi-cloud/20-1-kubernetes-and-helm-fundamentals/20-1-2-ingress-probes-autoscaling-helm-and-local-cluster-lab"
            ]
          },
          {
            "type": "category",
            "label": "20.2 Production Reliability, Scaling & Observability",
            "link": {
              "type": "doc",
              "id": "part-05-deployment-cloud-and-devops/20-kubernetes-production-scaling-and-multi-cloud/20-2-production-reliability-scaling-and-observability/index"
            },
            "items": [
              "part-05-deployment-cloud-and-devops/20-kubernetes-production-scaling-and-multi-cloud/20-2-production-reliability-scaling-and-observability/20-2-1-scaling-load-balancing-caching-and-database-scaling",
              "part-05-deployment-cloud-and-devops/20-kubernetes-production-scaling-and-multi-cloud/20-2-production-reliability-scaling-and-observability/20-2-2-zero-downtime-releases-feature-flags-and-safe-migrations",
              "part-05-deployment-cloud-and-devops/20-kubernetes-production-scaling-and-multi-cloud/20-2-production-reliability-scaling-and-observability/20-2-3-monitoring-logs-and-alerts-with-prometheus-and-grafana",
              "part-05-deployment-cloud-and-devops/20-kubernetes-production-scaling-and-multi-cloud/20-2-production-reliability-scaling-and-observability/20-2-4-backups-disaster-recovery-incident-triage-and-postmortems"
            ]
          },
          {
            "type": "category",
            "label": "20.3 Multi-Cloud Architecture & Cross-Provider Engineering",
            "link": {
              "type": "doc",
              "id": "part-05-deployment-cloud-and-devops/20-kubernetes-production-scaling-and-multi-cloud/20-3-multi-cloud-architecture-and-cross-provider-engineering/index"
            },
            "items": [
              "part-05-deployment-cloud-and-devops/20-kubernetes-production-scaling-and-multi-cloud/20-3-multi-cloud-architecture-and-cross-provider-engineering/20-3-1-multi-cloud-strategy-portability-egress-and-lock-in",
              "part-05-deployment-cloud-and-devops/20-kubernetes-production-scaling-and-multi-cloud/20-3-multi-cloud-architecture-and-cross-provider-engineering/20-3-2-practical-multi-cloud-deployment-lab"
            ]
          }
        ]
      }
    ]
  },
  {
    "type": "category",
    "label": "Part 06 ? System Design & System Thinking",
    "link": {
      "type": "doc",
      "id": "part-06-system-design-and-production-quality/index"
    },
    "items": [
      {
        "type": "category",
        "label": "21. Systems Thinking, Architecture & Decision-Making",
        "link": {
          "type": "doc",
          "id": "part-06-system-design-and-production-quality/21-systems-thinking-architecture-and-decision-making/index"
        },
        "items": [
        {
          "type": "category",
          "label": "21.1 Systems Thinking & First Principles",
          "link": {
            "type": "doc",
            "id": "part-06-system-design-and-production-quality/21-systems-thinking-architecture-and-decision-making/21-1-systems-thinking-and-first-principles/index"
          },
          "items": [
              "part-06-system-design-and-production-quality/21-systems-thinking-architecture-and-decision-making/21-1-systems-thinking-and-first-principles/21-1-1-what-a-system-is-components-boundaries-feedback-emergence",
              "part-06-system-design-and-production-quality/21-systems-thinking-architecture-and-decision-making/21-1-systems-thinking-and-first-principles/21-1-2-system-thinking-vs-system-design-the-two-moves",
              "part-06-system-design-and-production-quality/21-systems-thinking-architecture-and-decision-making/21-1-systems-thinking-and-first-principles/21-1-3-thinking-toolkit-first-principles-decomposition-abstraction-modeling"
          ]
        },
        {
          "type": "category",
          "label": "21.2 Requirements, Decisions & Domain Modeling",
          "link": {
            "type": "doc",
            "id": "part-06-system-design-and-production-quality/21-systems-thinking-architecture-and-decision-making/21-2-requirements-decisions-and-domain-modeling/index"
          },
          "items": [
              "part-06-system-design-and-production-quality/21-systems-thinking-architecture-and-decision-making/21-2-requirements-decisions-and-domain-modeling/21-2-1-requirements-engineering-from-discovery-to-traceability",
              "part-06-system-design-and-production-quality/21-systems-thinking-architecture-and-decision-making/21-2-requirements-decisions-and-domain-modeling/21-2-2-engineering-decisions-adrs-trade-offs-technical-debt-build-vs-buy",
              "part-06-system-design-and-production-quality/21-systems-thinking-architecture-and-decision-making/21-2-requirements-decisions-and-domain-modeling/21-2-3-domain-modeling-bounded-contexts-coupling-and-cohesion"
          ]
        },
        {
          "type": "category",
          "label": "21.3 Architecture & Distributed Systems",
          "link": {
            "type": "doc",
            "id": "part-06-system-design-and-production-quality/21-systems-thinking-architecture-and-decision-making/21-3-architecture-and-distributed-systems/index"
          },
          "items": [
              "part-06-system-design-and-production-quality/21-systems-thinking-architecture-and-decision-making/21-3-architecture-and-distributed-systems/21-3-1-modular-monoliths-vs-distributed-services",
              "part-06-system-design-and-production-quality/21-systems-thinking-architecture-and-decision-making/21-3-architecture-and-distributed-systems/21-3-2-api-architecture-contracts-versioning-pagination-idempotency",
              "part-06-system-design-and-production-quality/21-systems-thinking-architecture-and-decision-making/21-3-architecture-and-distributed-systems/21-3-3-sync-apis-vs-event-driven-messaging"
          ]
        },
        {
          "type": "category",
          "label": "21.4 Distributed Systems Resilience",
          "link": {
            "type": "doc",
            "id": "part-06-system-design-and-production-quality/21-systems-thinking-architecture-and-decision-making/21-4-distributed-systems-resilience/index"
          },
          "items": [
              "part-06-system-design-and-production-quality/21-systems-thinking-architecture-and-decision-making/21-4-distributed-systems-resilience/21-4-1-consistency-models-transactions-and-cap-trade-offs",
              "part-06-system-design-and-production-quality/21-systems-thinking-architecture-and-decision-making/21-4-distributed-systems-resilience/21-4-2-timeouts-retries-circuit-breakers-queues-and-backpressure"
          ]
        }
        ]
      },
      {
        "type": "category",
        "label": "22. Security, Testing & Observability",
        "link": {
          "type": "doc",
          "id": "part-06-system-design-and-production-quality/22-security-testing-and-observability/index"
        },
        "items": [
        {
          "type": "category",
          "label": "22.1 Application Security Engineering",
          "link": {
            "type": "doc",
            "id": "part-06-system-design-and-production-quality/22-security-testing-and-observability/22-1-application-security-engineering/index"
          },
          "items": [
              "part-06-system-design-and-production-quality/22-security-testing-and-observability/22-1-application-security-engineering/22-1-1-owasp-risks-injection-and-xss-prevention",
              "part-06-system-design-and-production-quality/22-security-testing-and-observability/22-1-application-security-engineering/22-1-2-secrets-management-and-dependency-auditing"
          ]
        },
        {
          "type": "category",
          "label": "22.2 Testing & Quality Engineering",
          "link": {
            "type": "doc",
            "id": "part-06-system-design-and-production-quality/22-security-testing-and-observability/22-2-testing-and-quality-engineering/index"
          },
          "items": [
              "part-06-system-design-and-production-quality/22-security-testing-and-observability/22-2-testing-and-quality-engineering/22-2-1-the-testing-pyramid-contract-tests-and-test-data",
              "part-06-system-design-and-production-quality/22-security-testing-and-observability/22-2-testing-and-quality-engineering/22-2-2-mocking-vs-real-integration-ci-quality-gates-and-mutation-testing"
          ]
        },
        {
          "type": "category",
          "label": "22.3 Observability & Incident Response",
          "link": {
            "type": "doc",
            "id": "part-06-system-design-and-production-quality/22-security-testing-and-observability/22-3-observability-and-incident-response/index"
          },
          "items": [
              "part-06-system-design-and-production-quality/22-security-testing-and-observability/22-3-observability-and-incident-response/22-3-1-structured-logging-and-correlation-ids",
              "part-06-system-design-and-production-quality/22-security-testing-and-observability/22-3-observability-and-incident-response/22-3-2-metrics-tracing-slis-slos-and-incident-response"
          ]
        }
        ]
      },
      {
        "type": "category",
        "label": "23. Performance & Scalability",
        "link": {
          "type": "doc",
          "id": "part-06-system-design-and-production-quality/23-performance-and-scalability/index"
        },
        "items": [
        {
          "type": "category",
          "label": "23.1 Latency, Profiling & Bottlenecks",
          "link": {
            "type": "doc",
            "id": "part-06-system-design-and-production-quality/23-performance-and-scalability/23-1-latency-profiling-and-bottlenecks/index"
          },
          "items": [
              "part-06-system-design-and-production-quality/23-performance-and-scalability/23-1-latency-profiling-and-bottlenecks/23-1-1-core-web-vitals-and-frontend-bundle-budgets",
              "part-06-system-design-and-production-quality/23-performance-and-scalability/23-1-latency-profiling-and-bottlenecks/23-1-2-backend-profiling-and-load-testing"
          ]
        },
        {
          "type": "category",
          "label": "23.2 Caching & Horizontal Scaling",
          "link": {
            "type": "doc",
            "id": "part-06-system-design-and-production-quality/23-performance-and-scalability/23-2-caching-and-horizontal-scaling/index"
          },
          "items": [
              "part-06-system-design-and-production-quality/23-performance-and-scalability/23-2-caching-and-horizontal-scaling/23-2-1-redis-cache-invalidation-and-rate-limiting",
              "part-06-system-design-and-production-quality/23-performance-and-scalability/23-2-caching-and-horizontal-scaling/23-2-2-stateless-services-and-load-balancing"
          ]
        }
        ]
      },
      {
        "type": "category",
        "label": "24. Database Engineering & Scaling",
        "link": {
          "type": "doc",
          "id": "part-06-system-design-and-production-quality/24-database-performance-and-operations/index"
        },
        "items": [
        {
          "type": "category",
          "label": "24.1 Indexing & Query Optimization",
          "link": {
            "type": "doc",
            "id": "part-06-system-design-and-production-quality/24-database-performance-and-operations/24-1-indexing-and-query-optimization/index"
          },
          "items": [
              "part-06-system-design-and-production-quality/24-database-performance-and-operations/24-1-indexing-and-query-optimization/24-1-1-b-tree-gin-and-composite-indexes",
              "part-06-system-design-and-production-quality/24-database-performance-and-operations/24-1-indexing-and-query-optimization/24-1-2-reading-explain-analyze-plans"
          ]
        },
        {
          "type": "category",
          "label": "24.2 Scaling, Pooling & Operational Scale",
          "link": {
            "type": "doc",
            "id": "part-06-system-design-and-production-quality/24-database-performance-and-operations/24-2-connection-pooling-and-operational-scale/index"
          },
          "items": [
              "part-06-system-design-and-production-quality/24-database-performance-and-operations/24-2-connection-pooling-and-operational-scale/24-2-1-connection-limits-locking-and-n-plus-1-queries",
              "part-06-system-design-and-production-quality/24-database-performance-and-operations/24-2-connection-pooling-and-operational-scale/24-2-2-read-replicas-partitioning-and-archiving"
          ]
        }
        ]
      }
    ]
  },
  {
    "type": "category",
    "label": "Part 07 ? AI-Native Development",
    "link": {
      "type": "doc",
      "id": "part-07-ai-native-software-development/index"
    },
    "items": [
      {
        "type": "category",
        "label": "25. AI Assistants & Language Models",
        "link": {
          "type": "doc",
          "id": "part-07-ai-native-software-development/25-ai-assistants-llms-and-model-apis/index"
        },
        "items": [
        {
          "type": "category",
          "label": "25.1 AI Assistants for Everyday Work",
          "link": {
            "type": "doc",
            "id": "part-07-ai-native-software-development/25-ai-assistants-llms-and-model-apis/25-1-ai-assistants-for-everyday-work/index"
          },
          "items": [
              "part-07-ai-native-software-development/25-ai-assistants-llms-and-model-apis/25-1-ai-assistants-for-everyday-work/25-1-1-ai-assistants-vs-ai-coding-assistants-the-category-map",
              "part-07-ai-native-software-development/25-ai-assistants-llms-and-model-apis/25-1-ai-assistants-for-everyday-work/25-1-2-choosing-chatgpt-claude-or-gemini-by-job",
              "part-07-ai-native-software-development/25-ai-assistants-llms-and-model-apis/25-1-ai-assistants-for-everyday-work/25-1-3-everyday-workflows-email-reports-research-translation-summaries",
              "part-07-ai-native-software-development/25-ai-assistants-llms-and-model-apis/25-1-ai-assistants-for-everyday-work/25-1-4-documents-pdfs-spreadsheets-and-presentations-with-ai",
              "part-07-ai-native-software-development/25-ai-assistants-llms-and-model-apis/25-1-ai-assistants-for-everyday-work/25-1-5-privacy-verification-and-hallucination-prevention"
          ]
        },
        {
          "type": "category",
          "label": "25.2 How LLMs Work & Programmatic Access",
          "link": {
            "type": "doc",
            "id": "part-07-ai-native-software-development/25-ai-assistants-llms-and-model-apis/25-2-how-language-models-work-and-programmatic-access/index"
          },
          "items": [
              "part-07-ai-native-software-development/25-ai-assistants-llms-and-model-apis/25-2-how-language-models-work-and-programmatic-access/25-2-1-tokens-context-windows-and-sampling",
              "part-07-ai-native-software-development/25-ai-assistants-llms-and-model-apis/25-2-how-language-models-work-and-programmatic-access/25-2-2-model-capabilities-latency-and-cost-trade-offs",
              "part-07-ai-native-software-development/25-ai-assistants-llms-and-model-apis/25-2-how-language-models-work-and-programmatic-access/25-2-3-structured-outputs-and-json-schemas",
              "part-07-ai-native-software-development/25-ai-assistants-llms-and-model-apis/25-2-how-language-models-work-and-programmatic-access/25-2-4-streaming-tool-calling-and-multimodal-inputs"
          ]
        }
        ]
      },
      {
        "type": "category",
        "label": "26. Prompt & Context Engineering",
        "link": {
          "type": "doc",
          "id": "part-07-ai-native-software-development/26-prompt-and-context-engineering/index"
        },
        "items": [
        {
          "type": "category",
          "label": "26.1 System Instructions & Prompt Architecture",
          "link": {
            "type": "doc",
            "id": "part-07-ai-native-software-development/26-prompt-and-context-engineering/26-1-system-instructions-and-prompt-architecture/index"
          },
          "items": [
              "part-07-ai-native-software-development/26-prompt-and-context-engineering/26-1-system-instructions-and-prompt-architecture/26-1-1-role-constraints-and-output-contracts",
              "part-07-ai-native-software-development/26-prompt-and-context-engineering/26-1-system-instructions-and-prompt-architecture/26-1-2-few-shot-examples-and-reasoning-scaffolds"
          ]
        },
        {
          "type": "category",
          "label": "26.2 Context Assembly & Verification",
          "link": {
            "type": "doc",
            "id": "part-07-ai-native-software-development/26-prompt-and-context-engineering/26-2-context-assembly-and-verification/index"
          },
          "items": [
              "part-07-ai-native-software-development/26-prompt-and-context-engineering/26-2-context-assembly-and-verification/26-2-1-context-budgeting-and-signal-to-noise",
              "part-07-ai-native-software-development/26-prompt-and-context-engineering/26-2-context-assembly-and-verification/26-2-2-prompt-evaluation-suites-and-regression-checks",
              "part-07-ai-native-software-development/26-prompt-and-context-engineering/26-2-context-assembly-and-verification/26-2-3-prompt-injection-fundamentals-and-reusable-prompts"
          ]
        }
        ]
      },
      {
        "type": "category",
        "label": "27. Coding Agents & Agentic Workflows",
        "link": {
          "type": "doc",
          "id": "part-07-ai-native-software-development/27-spec-and-plan-agentic-development/index"
        },
        "items": [
        {
          "type": "category",
          "label": "27.1 Spec-Driven Workflows",
          "link": {
            "type": "doc",
            "id": "part-07-ai-native-software-development/27-spec-and-plan-agentic-development/27-1-spec-driven-workflows/index"
          },
          "items": [
              "part-07-ai-native-software-development/27-spec-and-plan-agentic-development/27-1-spec-driven-workflows/27-1-1-writing-unambiguous-technical-specs",
              "part-07-ai-native-software-development/27-spec-and-plan-agentic-development/27-1-spec-driven-workflows/27-1-2-decomposing-tasks-for-coding-agents",
              "part-07-ai-native-software-development/27-spec-and-plan-agentic-development/27-1-spec-driven-workflows/27-1-3-the-agent-phase-kit-specify-review-plan-gate"
          ]
        },
        {
          "type": "category",
          "label": "27.2 Direct AI Coding Assistants",
          "link": {
            "type": "doc",
            "id": "part-07-ai-native-software-development/27-spec-and-plan-agentic-development/27-2-direct-ai-coding-assistants/index"
          },
          "items": [
              "part-07-ai-native-software-development/27-spec-and-plan-agentic-development/27-2-direct-ai-coding-assistants/27-2-1-claude-code-and-openai-codex-cli",
              "part-07-ai-native-software-development/27-spec-and-plan-agentic-development/27-2-direct-ai-coding-assistants/27-2-2-cursor-opencode-and-gemini-cli-terminal-vs-ide-vs-cloud",
              "part-07-ai-native-software-development/27-spec-and-plan-agentic-development/27-2-direct-ai-coding-assistants/27-2-3-slash-commands-skills-permissions-and-harness-engineering"
          ]
        },
        {
          "type": "category",
          "label": "27.3 Verification & Ownership",
          "link": {
            "type": "doc",
            "id": "part-07-ai-native-software-development/27-spec-and-plan-agentic-development/27-3-verification-review-and-ownership/index"
          },
          "items": [
              "part-07-ai-native-software-development/27-spec-and-plan-agentic-development/27-3-verification-review-and-ownership/27-3-1-auditing-ai-generated-diffs-and-edge-cases",
              "part-07-ai-native-software-development/27-spec-and-plan-agentic-development/27-3-verification-review-and-ownership/27-3-2-tests-as-guardrails-for-rapid-iteration",
              "part-07-ai-native-software-development/27-spec-and-plan-agentic-development/27-3-verification-review-and-ownership/27-3-3-ai-assisted-engineering-production-discipline"
          ]
        }
        ]
      }
    ]
  },
  {
    "type": "category",
    "label": "Part 08 — AI Applications, Agents, MCP & Automation",
    "link": {
      "type": "doc",
      "id": "part-08-ai-applications-agents-mcp-and-automation/index"
    },
    "items": [
      {
        "type": "category",
        "label": "28. AI-Powered Applications & RAG",
        "link": {
          "type": "doc",
          "id": "part-08-ai-applications-agents-mcp-and-automation/28-ai-powered-applications-and-rag/index"
        },
        "items": [
          {
            "type": "category",
            "label": "28.1 Embeddings & Ingestion Pipelines",
            "link": {
              "type": "doc",
              "id": "part-08-ai-applications-agents-mcp-and-automation/28-ai-powered-applications-and-rag/28-1-embeddings-and-ingestion-pipelines/index"
            },
            "items": [
              "part-08-ai-applications-agents-mcp-and-automation/28-ai-powered-applications-and-rag/28-1-embeddings-and-ingestion-pipelines/28-1-1-document-parsing-and-chunking-strategies",
              "part-08-ai-applications-agents-mcp-and-automation/28-ai-powered-applications-and-rag/28-1-embeddings-and-ingestion-pipelines/28-1-2-vector-indexing-and-metadata-filtering"
            ]
          },
          {
            "type": "category",
            "label": "28.2 Retrieval Quality & Grounded Generation",
            "link": {
              "type": "doc",
              "id": "part-08-ai-applications-agents-mcp-and-automation/28-ai-powered-applications-and-rag/28-2-retrieval-quality-and-grounded-generation/index"
            },
            "items": [
              "part-08-ai-applications-agents-mcp-and-automation/28-ai-powered-applications-and-rag/28-2-retrieval-quality-and-grounded-generation/28-2-1-hybrid-search-and-reranking",
              "part-08-ai-applications-agents-mcp-and-automation/28-ai-powered-applications-and-rag/28-2-retrieval-quality-and-grounded-generation/28-2-2-citations-hallucination-mitigation-and-ux"
            ]
          }
        ]
      },
      {
        "type": "category",
        "label": "29. Agent Architecture & Agentic AI",
        "link": {
          "type": "doc",
          "id": "part-08-ai-applications-agents-mcp-and-automation/29-agent-architecture-and-agentic-ai/index"
        },
        "items": [
          {
            "type": "category",
            "label": "29.1 Workflows vs Autonomous Agents",
            "link": {
              "type": "doc",
              "id": "part-08-ai-applications-agents-mcp-and-automation/29-agent-architecture-and-agentic-ai/29-1-workflows-vs-autonomous-agents/index"
            },
            "items": [
              "part-08-ai-applications-agents-mcp-and-automation/29-agent-architecture-and-agentic-ai/29-1-workflows-vs-autonomous-agents/29-1-1-deterministic-pipelines-vs-dynamic-loops",
              "part-08-ai-applications-agents-mcp-and-automation/29-agent-architecture-and-agentic-ai/29-1-workflows-vs-autonomous-agents/29-1-2-planning-reflection-and-tool-selection"
            ]
          },
          {
            "type": "category",
            "label": "29.2 Reliability Boundaries for Agents",
            "link": {
              "type": "doc",
              "id": "part-08-ai-applications-agents-mcp-and-automation/29-agent-architecture-and-agentic-ai/29-2-reliability-boundaries-for-agents/index"
            },
            "items": [
              "part-08-ai-applications-agents-mcp-and-automation/29-agent-architecture-and-agentic-ai/29-2-reliability-boundaries-for-agents/29-2-1-stopping-criteria-budgets-and-human-approvals",
              "part-08-ai-applications-agents-mcp-and-automation/29-agent-architecture-and-agentic-ai/29-2-reliability-boundaries-for-agents/29-2-2-failure-recovery-and-deterministic-fallbacks"
            ]
          }
        ]
      },
      {
        "type": "category",
        "label": "30. OpenAI Agents SDK with Python",
        "link": {
          "type": "doc",
          "id": "part-08-ai-applications-agents-mcp-and-automation/30-openai-agents-sdk-with-python/index"
        },
        "items": [
          {
            "type": "category",
            "label": "30.1 SDK Primitives & Agent Loops",
            "link": {
              "type": "doc",
              "id": "part-08-ai-applications-agents-mcp-and-automation/30-openai-agents-sdk-with-python/30-1-sdk-primitives-and-agent-loops/index"
            },
            "items": [
              "part-08-ai-applications-agents-mcp-and-automation/30-openai-agents-sdk-with-python/30-1-sdk-primitives-and-agent-loops/30-1-1-defining-agents-instructions-and-models",
              "part-08-ai-applications-agents-mcp-and-automation/30-openai-agents-sdk-with-python/30-1-sdk-primitives-and-agent-loops/30-1-2-runners-streaming-events-and-context-objects"
            ]
          },
          {
            "type": "category",
            "label": "30.2 Tools, Handoffs & Tracing",
            "link": {
              "type": "doc",
              "id": "part-08-ai-applications-agents-mcp-and-automation/30-openai-agents-sdk-with-python/30-2-tools-handoffs-and-tracing/index"
            },
            "items": [
              "part-08-ai-applications-agents-mcp-and-automation/30-openai-agents-sdk-with-python/30-2-tools-handoffs-and-tracing/30-2-1-function-tools-and-typed-pydantic-contracts",
              "part-08-ai-applications-agents-mcp-and-automation/30-openai-agents-sdk-with-python/30-2-tools-handoffs-and-tracing/30-2-2-agent-handoffs-and-execution-traces"
            ]
          }
        ]
      },
      {
        "type": "category",
        "label": "31. Agent Tools, State, Memory & Guardrails",
        "link": {
          "type": "doc",
          "id": "part-08-ai-applications-agents-mcp-and-automation/31-agent-tools-state-memory-and-guardrails/index"
        },
        "items": [
          {
            "type": "category",
            "label": "31.1 Tool Design & Persistence",
            "link": {
              "type": "doc",
              "id": "part-08-ai-applications-agents-mcp-and-automation/31-agent-tools-state-memory-and-guardrails/31-1-tool-design-and-persistence/index"
            },
            "items": [
              "part-08-ai-applications-agents-mcp-and-automation/31-agent-tools-state-memory-and-guardrails/31-1-tool-design-and-persistence/31-1-1-designing-idempotent-agent-tools",
              "part-08-ai-applications-agents-mcp-and-automation/31-agent-tools-state-memory-and-guardrails/31-1-tool-design-and-persistence/31-1-2-short-term-state-vs-long-term-memory"
            ]
          },
          {
            "type": "category",
            "label": "31.2 Input & Output Guardrails",
            "link": {
              "type": "doc",
              "id": "part-08-ai-applications-agents-mcp-and-automation/31-agent-tools-state-memory-and-guardrails/31-2-input-and-output-guardrails/index"
            },
            "items": [
              "part-08-ai-applications-agents-mcp-and-automation/31-agent-tools-state-memory-and-guardrails/31-2-input-and-output-guardrails/31-2-1-policy-checks-and-prompt-injection-defense",
              "part-08-ai-applications-agents-mcp-and-automation/31-agent-tools-state-memory-and-guardrails/31-2-input-and-output-guardrails/31-2-2-permission-scopes-and-action-confirmation"
            ]
          }
        ]
      },
      {
        "type": "category",
        "label": "32. Model Context Protocol (MCP)",
        "link": {
          "type": "doc",
          "id": "part-08-ai-applications-agents-mcp-and-automation/32-model-context-protocol-mcp/index"
        },
        "items": [
          {
            "type": "category",
            "label": "32.1 Protocol Architecture & Primitives",
            "link": {
              "type": "doc",
              "id": "part-08-ai-applications-agents-mcp-and-automation/32-model-context-protocol-mcp/32-1-protocol-architecture-and-primitives/index"
            },
            "items": [
              "part-08-ai-applications-agents-mcp-and-automation/32-model-context-protocol-mcp/32-1-protocol-architecture-and-primitives/32-1-1-hosts-clients-servers-and-transports",
              "part-08-ai-applications-agents-mcp-and-automation/32-model-context-protocol-mcp/32-1-protocol-architecture-and-primitives/32-1-2-tools-resources-and-prompt-templates"
            ]
          },
          {
            "type": "category",
            "label": "32.2 Building & Securing MCP Servers",
            "link": {
              "type": "doc",
              "id": "part-08-ai-applications-agents-mcp-and-automation/32-model-context-protocol-mcp/32-2-building-and-securing-mcp-servers/index"
            },
            "items": [
              "part-08-ai-applications-agents-mcp-and-automation/32-model-context-protocol-mcp/32-2-building-and-securing-mcp-servers/32-2-1-implementing-custom-mcp-servers",
              "part-08-ai-applications-agents-mcp-and-automation/32-model-context-protocol-mcp/32-2-building-and-securing-mcp-servers/32-2-2-auth-sandboxing-and-enterprise-integrations"
            ]
          }
        ]
      },
      {
        "type": "category",
        "label": "33. n8n Workflow Automation",
        "link": {
          "type": "doc",
          "id": "part-08-ai-applications-agents-mcp-and-automation/33-n8n-workflow-automation/index"
        },
        "items": [
          {
            "type": "category",
            "label": "33.1 Visual Orchestration & Nodes",
            "link": {
              "type": "doc",
              "id": "part-08-ai-applications-agents-mcp-and-automation/33-n8n-workflow-automation/33-1-visual-orchestration-and-nodes/index"
            },
            "items": [
              "part-08-ai-applications-agents-mcp-and-automation/33-n8n-workflow-automation/33-1-visual-orchestration-and-nodes/33-1-1-triggers-webhooks-and-data-mapping",
              "part-08-ai-applications-agents-mcp-and-automation/33-n8n-workflow-automation/33-1-visual-orchestration-and-nodes/33-1-2-branching-batching-and-custom-code-nodes"
            ]
          },
          {
            "type": "category",
            "label": "33.2 AI Nodes & Reliable Automations",
            "link": {
              "type": "doc",
              "id": "part-08-ai-applications-agents-mcp-and-automation/33-n8n-workflow-automation/33-2-ai-nodes-and-reliable-automations/index"
            },
            "items": [
              "part-08-ai-applications-agents-mcp-and-automation/33-n8n-workflow-automation/33-2-ai-nodes-and-reliable-automations/33-2-1-connecting-llms-to-business-saas-tools",
              "part-08-ai-applications-agents-mcp-and-automation/33-n8n-workflow-automation/33-2-ai-nodes-and-reliable-automations/33-2-2-error-workflows-retries-and-self-hosting"
            ]
          }
        ]
      },
      {
        "type": "category",
        "label": "34. AI Workers",
        "link": {
          "type": "doc",
          "id": "part-08-ai-applications-agents-mcp-and-automation/34-ai-workers/index"
        },
        "items": [
          {
            "type": "category",
            "label": "34.1 Designing Role-Specific AI Workers",
            "link": {
              "type": "doc",
              "id": "part-08-ai-applications-agents-mcp-and-automation/34-ai-workers/34-1-designing-role-specific-ai-workers/index"
            },
            "items": [
              "part-08-ai-applications-agents-mcp-and-automation/34-ai-workers/34-1-designing-role-specific-ai-workers/34-1-1-scoping-operational-boundaries-and-slas",
              "part-08-ai-applications-agents-mcp-and-automation/34-ai-workers/34-1-designing-role-specific-ai-workers/34-1-2-event-driven-vs-scheduled-worker-execution"
            ]
          },
          {
            "type": "category",
            "label": "34.2 End-to-End Business Workers",
            "link": {
              "type": "doc",
              "id": "part-08-ai-applications-agents-mcp-and-automation/34-ai-workers/34-2-end-to-end-business-workers/index"
            },
            "items": [
              "part-08-ai-applications-agents-mcp-and-automation/34-ai-workers/34-2-end-to-end-business-workers/34-2-1-inbox-triage-support-and-research-workers",
              "part-08-ai-applications-agents-mcp-and-automation/34-ai-workers/34-2-end-to-end-business-workers/34-2-2-audit-trails-and-escalation-queues"
            ]
          }
        ]
      },
      {
        "type": "category",
        "label": "35. Multi-Agent Orchestration",
        "link": {
          "type": "doc",
          "id": "part-08-ai-applications-agents-mcp-and-automation/35-multi-agent-orchestration/index"
        },
        "items": [
          {
            "type": "category",
            "label": "35.1 Coordination Topologies",
            "link": {
              "type": "doc",
              "id": "part-08-ai-applications-agents-mcp-and-automation/35-multi-agent-orchestration/35-1-coordination-topologies/index"
            },
            "items": [
              "part-08-ai-applications-agents-mcp-and-automation/35-multi-agent-orchestration/35-1-coordination-topologies/35-1-1-supervisor-router-and-pipeline-patterns",
              "part-08-ai-applications-agents-mcp-and-automation/35-multi-agent-orchestration/35-1-coordination-topologies/35-1-2-shared-state-and-inter-agent-contracts"
            ]
          },
          {
            "type": "category",
            "label": "35.2 Verification & Consensus Patterns",
            "link": {
              "type": "doc",
              "id": "part-08-ai-applications-agents-mcp-and-automation/35-multi-agent-orchestration/35-2-verification-and-consensus-patterns/index"
            },
            "items": [
              "part-08-ai-applications-agents-mcp-and-automation/35-multi-agent-orchestration/35-2-verification-and-consensus-patterns/35-2-1-critics-evaluators-and-quality-gates",
              "part-08-ai-applications-agents-mcp-and-automation/35-multi-agent-orchestration/35-2-verification-and-consensus-patterns/35-2-2-debugging-multi-agent-deadlocks-and-cost"
            ]
          }
        ]
      },
      {
        "type": "category",
        "label": "36. Production AI Systems",
        "link": {
          "type": "doc",
          "id": "part-08-ai-applications-agents-mcp-and-automation/36-production-ai-systems/index"
        },
        "items": [
          {
            "type": "category",
            "label": "36.1 Evaluations, Benchmarks & Telemetry",
            "link": {
              "type": "doc",
              "id": "part-08-ai-applications-agents-mcp-and-automation/36-production-ai-systems/36-1-evaluations-benchmarks-and-telemetry/index"
            },
            "items": [
              "part-08-ai-applications-agents-mcp-and-automation/36-production-ai-systems/36-1-evaluations-benchmarks-and-telemetry/36-1-1-offline-datasets-and-online-quality-signals",
              "part-08-ai-applications-agents-mcp-and-automation/36-production-ai-systems/36-1-evaluations-benchmarks-and-telemetry/36-1-2-latency-token-cost-and-model-routing"
            ]
          },
          {
            "type": "category",
            "label": "36.2 Governance & Continuous Improvement",
            "link": {
              "type": "doc",
              "id": "part-08-ai-applications-agents-mcp-and-automation/36-production-ai-systems/36-2-governance-and-continuous-improvement/index"
            },
            "items": [
              "part-08-ai-applications-agents-mcp-and-automation/36-production-ai-systems/36-2-governance-and-continuous-improvement/36-2-1-safety-compliance-privacy-and-pii-redaction",
              "part-08-ai-applications-agents-mcp-and-automation/36-production-ai-systems/36-2-governance-and-continuous-improvement/36-2-2-feedback-loops-and-model-upgrades"
            ]
          }
        ]
      }
    ]
  },
  {
    "type": "category",
    "label": "Part 09 — Career, Client Work, Products & Startups",
    "link": {
      "type": "doc",
      "id": "part-09-career-client-work-products-and-startups/index"
    },
    "items": [
      {
        "type": "category",
        "label": "37. Teamwork & Professional Engineering",
        "link": {
          "type": "doc",
          "id": "part-09-career-client-work-products-and-startups/37-teamwork-and-professional-engineering/index"
        },
        "items": [
          {
            "type": "category",
            "label": "37.1 Communication & Technical Ownership",
            "link": {
              "type": "doc",
              "id": "part-09-career-client-work-products-and-startups/37-teamwork-and-professional-engineering/37-1-communication-and-technical-ownership/index"
            },
            "items": [
              "part-09-career-client-work-products-and-startups/37-teamwork-and-professional-engineering/37-1-communication-and-technical-ownership/37-1-1-async-writing-rfcs-and-design-docs",
              "part-09-career-client-work-products-and-startups/37-teamwork-and-professional-engineering/37-1-communication-and-technical-ownership/37-1-2-estimating-work-and-managing-expectations"
            ]
          },
          {
            "type": "category",
            "label": "37.2 Operating Inside Engineering Teams",
            "link": {
              "type": "doc",
              "id": "part-09-career-client-work-products-and-startups/37-teamwork-and-professional-engineering/37-2-operating-inside-engineering-teams/index"
            },
            "items": [
              "part-09-career-client-work-products-and-startups/37-teamwork-and-professional-engineering/37-2-operating-inside-engineering-teams/37-2-1-cross-functional-collaboration-with-product-and-design",
              "part-09-career-client-work-products-and-startups/37-teamwork-and-professional-engineering/37-2-operating-inside-engineering-teams/37-2-2-mentorship-and-continuous-engineering-growth",
              "part-09-career-client-work-products-and-startups/37-teamwork-and-professional-engineering/37-2-operating-inside-engineering-teams/37-2-3-code-review-blameless-postmortems-and-incident-collaboration"
            ]
          }
        ]
      },
      {
        "type": "category",
        "label": "38. Jobs & Career Development",
        "link": {
          "type": "doc",
          "id": "part-09-career-client-work-products-and-startups/38-jobs-and-career-development/index"
        },
        "items": [
          {
            "type": "category",
            "label": "38.1 Positioning, Proof & Applications",
            "link": {
              "type": "doc",
              "id": "part-09-career-client-work-products-and-startups/38-jobs-and-career-development/38-1-positioning-proof-and-applications/index"
            },
            "items": [
              "part-09-career-client-work-products-and-startups/38-jobs-and-career-development/38-1-positioning-proof-and-applications/38-1-1-resumes-github-profiles-and-engineering-portfolios",
              "part-09-career-client-work-products-and-startups/38-jobs-and-career-development/38-1-positioning-proof-and-applications/38-1-2-targeted-outbound-and-referrals"
            ]
          },
          {
            "type": "category",
            "label": "38.2 Interviews & Career Progression",
            "link": {
              "type": "doc",
              "id": "part-09-career-client-work-products-and-startups/38-jobs-and-career-development/38-2-interviews-and-career-progression/index"
            },
            "items": [
              "part-09-career-client-work-products-and-startups/38-jobs-and-career-development/38-2-interviews-and-career-progression/38-2-1-coding-system-design-and-behavioral-interviews",
              "part-09-career-client-work-products-and-startups/38-jobs-and-career-development/38-2-interviews-and-career-progression/38-2-2-evaluating-offers-and-long-term-leverage"
            ]
          }
        ]
      },
      {
        "type": "category",
        "label": "39. Client Discovery, Freelancing & Client Acquisition",
        "link": {
          "type": "doc",
          "id": "part-09-career-client-work-products-and-startups/39-client-discovery-freelancing-and-client-acquisition/index"
        },
        "items": [
          {
            "type": "category",
            "label": "39.1 Understanding Freelancing and Independent Work",
            "link": {
              "type": "doc",
              "id": "part-09-career-client-work-products-and-startups/39-client-discovery-freelancing-and-client-acquisition/39-1-understanding-freelancing-and-independent-work/index"
            },
            "items": [
              "part-09-career-client-work-products-and-startups/39-client-discovery-freelancing-and-client-acquisition/39-1-understanding-freelancing-and-independent-work/39-1-1-employee-mindset-vs-independent-consultant-mindset",
              "part-09-career-client-work-products-and-startups/39-client-discovery-freelancing-and-client-acquisition/39-1-understanding-freelancing-and-independent-work/39-1-2-selling-engineering-outcomes-over-hours"
            ]
          },
          {
            "type": "category",
            "label": "39.2 Choosing a Niche and Service",
            "link": {
              "type": "doc",
              "id": "part-09-career-client-work-products-and-startups/39-client-discovery-freelancing-and-client-acquisition/39-2-choosing-a-niche-and-service/index"
            },
            "items": [
              "part-09-career-client-work-products-and-startups/39-client-discovery-freelancing-and-client-acquisition/39-2-choosing-a-niche-and-service/39-2-1-evaluating-high-value-technical-niches",
              "part-09-career-client-work-products-and-startups/39-client-discovery-freelancing-and-client-acquisition/39-2-choosing-a-niche-and-service/39-2-2-packaging-core-ai-and-software-services"
            ]
          },
          {
            "type": "category",
            "label": "39.3 Personal Branding and Portfolio",
            "link": {
              "type": "doc",
              "id": "part-09-career-client-work-products-and-startups/39-client-discovery-freelancing-and-client-acquisition/39-3-personal-branding-and-portfolio/index"
            },
            "items": [
              "part-09-career-client-work-products-and-startups/39-client-discovery-freelancing-and-client-acquisition/39-3-personal-branding-and-portfolio/39-3-1-positioning-profiles-for-buyer-trust",
              "part-09-career-client-work-products-and-startups/39-client-discovery-freelancing-and-client-acquisition/39-3-personal-branding-and-portfolio/39-3-2-case-studies-and-proof-driven-portfolios"
            ]
          },
          {
            "type": "category",
            "label": "39.4 Finding Clients Through Social Media",
            "link": {
              "type": "doc",
              "id": "part-09-career-client-work-products-and-startups/39-client-discovery-freelancing-and-client-acquisition/39-4-finding-clients-through-social-media/index"
            },
            "items": [
              "part-09-career-client-work-products-and-startups/39-client-discovery-freelancing-and-client-acquisition/39-4-finding-clients-through-social-media/39-4-1-linkedin",
              "part-09-career-client-work-products-and-startups/39-client-discovery-freelancing-and-client-acquisition/39-4-finding-clients-through-social-media/39-4-2-facebook",
              "part-09-career-client-work-products-and-startups/39-client-discovery-freelancing-and-client-acquisition/39-4-finding-clients-through-social-media/39-4-3-instagram",
              "part-09-career-client-work-products-and-startups/39-client-discovery-freelancing-and-client-acquisition/39-4-finding-clients-through-social-media/39-4-4-x",
              "part-09-career-client-work-products-and-startups/39-client-discovery-freelancing-and-client-acquisition/39-4-finding-clients-through-social-media/39-4-5-reddit",
              "part-09-career-client-work-products-and-startups/39-client-discovery-freelancing-and-client-acquisition/39-4-finding-clients-through-social-media/39-4-6-youtube",
              "part-09-career-client-work-products-and-startups/39-client-discovery-freelancing-and-client-acquisition/39-4-finding-clients-through-social-media/39-4-7-tiktok",
              "part-09-career-client-work-products-and-startups/39-client-discovery-freelancing-and-client-acquisition/39-4-finding-clients-through-social-media/39-4-8-threads",
              "part-09-career-client-work-products-and-startups/39-client-discovery-freelancing-and-client-acquisition/39-4-finding-clients-through-social-media/39-4-9-discord",
              "part-09-career-client-work-products-and-startups/39-client-discovery-freelancing-and-client-acquisition/39-4-finding-clients-through-social-media/39-4-10-slack",
              "part-09-career-client-work-products-and-startups/39-client-discovery-freelancing-and-client-acquisition/39-4-finding-clients-through-social-media/39-4-11-telegram",
              "part-09-career-client-work-products-and-startups/39-client-discovery-freelancing-and-client-acquisition/39-4-finding-clients-through-social-media/39-4-12-whatsapp-business"
            ]
          },
          {
            "type": "category",
            "label": "39.5 Freelance Marketplaces",
            "link": {
              "type": "doc",
              "id": "part-09-career-client-work-products-and-startups/39-client-discovery-freelancing-and-client-acquisition/39-5-freelance-marketplaces/index"
            },
            "items": [
              "part-09-career-client-work-products-and-startups/39-client-discovery-freelancing-and-client-acquisition/39-5-freelance-marketplaces/39-5-1-upwork",
              "part-09-career-client-work-products-and-startups/39-client-discovery-freelancing-and-client-acquisition/39-5-freelance-marketplaces/39-5-2-fiverr",
              "part-09-career-client-work-products-and-startups/39-client-discovery-freelancing-and-client-acquisition/39-5-freelance-marketplaces/39-5-3-freelancer-com",
              "part-09-career-client-work-products-and-startups/39-client-discovery-freelancing-and-client-acquisition/39-5-freelance-marketplaces/39-5-4-contra",
              "part-09-career-client-work-products-and-startups/39-client-discovery-freelancing-and-client-acquisition/39-5-freelance-marketplaces/39-5-5-peopleperhour",
              "part-09-career-client-work-products-and-startups/39-client-discovery-freelancing-and-client-acquisition/39-5-freelance-marketplaces/39-5-6-guru",
              "part-09-career-client-work-products-and-startups/39-client-discovery-freelancing-and-client-acquisition/39-5-freelance-marketplaces/39-5-7-toptal"
            ]
          },
          {
            "type": "category",
            "label": "39.6 Direct Client Hunting",
            "link": {
              "type": "doc",
              "id": "part-09-career-client-work-products-and-startups/39-client-discovery-freelancing-and-client-acquisition/39-6-direct-client-hunting/index"
            },
            "items": [
              "part-09-career-client-work-products-and-startups/39-client-discovery-freelancing-and-client-acquisition/39-6-direct-client-hunting/39-6-1-cold-email",
              "part-09-career-client-work-products-and-startups/39-client-discovery-freelancing-and-client-acquisition/39-6-direct-client-hunting/39-6-2-direct-outreach",
              "part-09-career-client-work-products-and-startups/39-client-discovery-freelancing-and-client-acquisition/39-6-direct-client-hunting/39-6-3-referrals",
              "part-09-career-client-work-products-and-startups/39-client-discovery-freelancing-and-client-acquisition/39-6-direct-client-hunting/39-6-4-agency-partnerships",
              "part-09-career-client-work-products-and-startups/39-client-discovery-freelancing-and-client-acquisition/39-6-direct-client-hunting/39-6-5-white-label-services"
            ]
          },
          {
            "type": "category",
            "label": "39.7 Understanding and Catching Business Pain Points",
            "link": {
              "type": "doc",
              "id": "part-09-career-client-work-products-and-startups/39-client-discovery-freelancing-and-client-acquisition/39-7-understanding-and-catching-business-pain-points/index"
            },
            "items": [
              "part-09-career-client-work-products-and-startups/39-client-discovery-freelancing-and-client-acquisition/39-7-understanding-and-catching-business-pain-points/39-7-1-business-pain-point-research",
              "part-09-career-client-work-products-and-startups/39-client-discovery-freelancing-and-client-acquisition/39-7-understanding-and-catching-business-pain-points/39-7-2-auditing-operational-bottlenecks-and-lost-revenue"
            ]
          },
          {
            "type": "category",
            "label": "39.8 Lead Generation and Qualification",
            "link": {
              "type": "doc",
              "id": "part-09-career-client-work-products-and-startups/39-client-discovery-freelancing-and-client-acquisition/39-8-lead-generation-and-qualification/index"
            },
            "items": [
              "part-09-career-client-work-products-and-startups/39-client-discovery-freelancing-and-client-acquisition/39-8-lead-generation-and-qualification/39-8-1-qualification",
              "part-09-career-client-work-products-and-startups/39-client-discovery-freelancing-and-client-acquisition/39-8-lead-generation-and-qualification/39-8-2-building-targeted-prospect-lists"
            ]
          },
          {
            "type": "category",
            "label": "39.9 Relationship-First Outreach",
            "link": {
              "type": "doc",
              "id": "part-09-career-client-work-products-and-startups/39-client-discovery-freelancing-and-client-acquisition/39-9-relationship-first-outreach/index"
            },
            "items": [
              "part-09-career-client-work-products-and-startups/39-client-discovery-freelancing-and-client-acquisition/39-9-relationship-first-outreach/39-9-1-relationship-first-engagement",
              "part-09-career-client-work-products-and-startups/39-client-discovery-freelancing-and-client-acquisition/39-9-relationship-first-outreach/39-9-2-comments-and-connections"
            ]
          },
          {
            "type": "category",
            "label": "39.10 Writing Effective Pitches",
            "link": {
              "type": "doc",
              "id": "part-09-career-client-work-products-and-startups/39-client-discovery-freelancing-and-client-acquisition/39-10-writing-effective-pitches/index"
            },
            "items": [
              "part-09-career-client-work-products-and-startups/39-client-discovery-freelancing-and-client-acquisition/39-10-writing-effective-pitches/39-10-1-pitches",
              "part-09-career-client-work-products-and-startups/39-client-discovery-freelancing-and-client-acquisition/39-10-writing-effective-pitches/39-10-2-tailoring-value-hooks-to-decision-makers"
            ]
          },
          {
            "type": "category",
            "label": "39.11 Demonstrations and Proof of Work",
            "link": {
              "type": "doc",
              "id": "part-09-career-client-work-products-and-startups/39-client-discovery-freelancing-and-client-acquisition/39-11-demonstrations-and-proof-of-work/index"
            },
            "items": [
              "part-09-career-client-work-products-and-startups/39-client-discovery-freelancing-and-client-acquisition/39-11-demonstrations-and-proof-of-work/39-11-1-demos",
              "part-09-career-client-work-products-and-startups/39-client-discovery-freelancing-and-client-acquisition/39-11-demonstrations-and-proof-of-work/39-11-2-rapid-tailored-prototypes-and-loom-walkthroughs"
            ]
          },
          {
            "type": "category",
            "label": "39.12 Client Discovery Calls",
            "link": {
              "type": "doc",
              "id": "part-09-career-client-work-products-and-startups/39-client-discovery-freelancing-and-client-acquisition/39-12-client-discovery-calls/index"
            },
            "items": [
              "part-09-career-client-work-products-and-startups/39-client-discovery-freelancing-and-client-acquisition/39-12-client-discovery-calls/39-12-1-discovery-calls",
              "part-09-career-client-work-products-and-startups/39-client-discovery-freelancing-and-client-acquisition/39-12-client-discovery-calls/39-12-2-diagnosing-scope-urgency-and-budget"
            ]
          },
          {
            "type": "category",
            "label": "39.13 Proposals and Pricing",
            "link": {
              "type": "doc",
              "id": "part-09-career-client-work-products-and-startups/39-client-discovery-freelancing-and-client-acquisition/39-13-proposals-and-pricing/index"
            },
            "items": [
              "part-09-career-client-work-products-and-startups/39-client-discovery-freelancing-and-client-acquisition/39-13-proposals-and-pricing/39-13-1-proposals",
              "part-09-career-client-work-products-and-startups/39-client-discovery-freelancing-and-client-acquisition/39-13-proposals-and-pricing/39-13-2-pricing"
            ]
          },
          {
            "type": "category",
            "label": "39.14 Negotiation and Closing",
            "link": {
              "type": "doc",
              "id": "part-09-career-client-work-products-and-startups/39-client-discovery-freelancing-and-client-acquisition/39-14-negotiation-and-closing/index"
            },
            "items": [
              "part-09-career-client-work-products-and-startups/39-client-discovery-freelancing-and-client-acquisition/39-14-negotiation-and-closing/39-14-1-closing",
              "part-09-career-client-work-products-and-startups/39-client-discovery-freelancing-and-client-acquisition/39-14-negotiation-and-closing/39-14-2-handling-objections-and-defining-agreements"
            ]
          },
          {
            "type": "category",
            "label": "39.15 Freelance Project Management",
            "link": {
              "type": "doc",
              "id": "part-09-career-client-work-products-and-startups/39-client-discovery-freelancing-and-client-acquisition/39-15-freelance-project-management/index"
            },
            "items": [
              "part-09-career-client-work-products-and-startups/39-client-discovery-freelancing-and-client-acquisition/39-15-freelance-project-management/39-15-1-client-delivery",
              "part-09-career-client-work-products-and-startups/39-client-discovery-freelancing-and-client-acquisition/39-15-freelance-project-management/39-15-2-milestones-status-updates-and-scope-control"
            ]
          },
          {
            "type": "category",
            "label": "39.16 Retention and Growth",
            "link": {
              "type": "doc",
              "id": "part-09-career-client-work-products-and-startups/39-client-discovery-freelancing-and-client-acquisition/39-16-retention-and-growth/index"
            },
            "items": [
              "part-09-career-client-work-products-and-startups/39-client-discovery-freelancing-and-client-acquisition/39-16-retention-and-growth/39-16-1-retention",
              "part-09-career-client-work-products-and-startups/39-client-discovery-freelancing-and-client-acquisition/39-16-retention-and-growth/39-16-2-retainers-upsells-and-referral-flywheels"
            ]
          },
          {
            "type": "category",
            "label": "39.17 Freelance Business Operations",
            "link": {
              "type": "doc",
              "id": "part-09-career-client-work-products-and-startups/39-client-discovery-freelancing-and-client-acquisition/39-17-freelance-business-operations/index"
            },
            "items": [
              "part-09-career-client-work-products-and-startups/39-client-discovery-freelancing-and-client-acquisition/39-17-freelance-business-operations/39-17-1-contracts-invoicing-and-payment-terms",
              "part-09-career-client-work-products-and-startups/39-client-discovery-freelancing-and-client-acquisition/39-17-freelance-business-operations/39-17-2-time-management-and-pipeline-discipline"
            ]
          },
          {
            "type": "category",
            "label": "39.18 AI-Powered Client Acquisition",
            "link": {
              "type": "doc",
              "id": "part-09-career-client-work-products-and-startups/39-client-discovery-freelancing-and-client-acquisition/39-18-ai-powered-client-acquisition/index"
            },
            "items": [
              "part-09-career-client-work-products-and-startups/39-client-discovery-freelancing-and-client-acquisition/39-18-ai-powered-client-acquisition/39-18-1-ai-assisted-prospect-research-and-enrichment",
              "part-09-career-client-work-products-and-startups/39-client-discovery-freelancing-and-client-acquisition/39-18-ai-powered-client-acquisition/39-18-2-automating-follow-ups-without-losing-authenticity"
            ]
          }
        ]
      },
      {
        "type": "category",
        "label": "40. Product Thinking & MVP Development",
        "link": {
          "type": "doc",
          "id": "part-09-career-client-work-products-and-startups/40-product-thinking-and-mvp-development/index"
        },
        "items": [
          {
            "type": "category",
            "label": "40.1 Problem Validation & Product Scope",
            "link": {
              "type": "doc",
              "id": "part-09-career-client-work-products-and-startups/40-product-thinking-and-mvp-development/40-1-problem-validation-and-product-scope/index"
            },
            "items": [
              "part-09-career-client-work-products-and-startups/40-product-thinking-and-mvp-development/40-1-problem-validation-and-product-scope/40-1-1-validating-demand-before-writing-code",
              "part-09-career-client-work-products-and-startups/40-product-thinking-and-mvp-development/40-1-problem-validation-and-product-scope/40-1-2-defining-the-minimum-viable-product"
            ]
          },
          {
            "type": "category",
            "label": "40.2 Shipping & Iterating With Users",
            "link": {
              "type": "doc",
              "id": "part-09-career-client-work-products-and-startups/40-product-thinking-and-mvp-development/40-2-shipping-and-iterating-with-users/index"
            },
            "items": [
              "part-09-career-client-work-products-and-startups/40-product-thinking-and-mvp-development/40-2-shipping-and-iterating-with-users/40-2-1-onboarding-analytics-and-activation-loops",
              "part-09-career-client-work-products-and-startups/40-product-thinking-and-mvp-development/40-2-shipping-and-iterating-with-users/40-2-2-pricing-models-and-user-feedback-cycles"
            ]
          }
        ]
      },
      {
        "type": "category",
        "label": "41. Startup, Launch & Growth",
        "link": {
          "type": "doc",
          "id": "part-09-career-client-work-products-and-startups/41-startup-launch-and-growth/index"
        },
        "items": [
          {
            "type": "category",
            "label": "41.1 Go-To-Market & Launch Execution",
            "link": {
              "type": "doc",
              "id": "part-09-career-client-work-products-and-startups/41-startup-launch-and-growth/41-1-go-to-market-and-launch-execution/index"
            },
            "items": [
              "part-09-career-client-work-products-and-startups/41-startup-launch-and-growth/41-1-go-to-market-and-launch-execution/41-1-1-launch-positioning-and-distribution-channels",
              "part-09-career-client-work-products-and-startups/41-startup-launch-and-growth/41-1-go-to-market-and-launch-execution/41-1-2-acquiring-early-adopters-and-design-partners"
            ]
          },
          {
            "type": "category",
            "label": "41.2 Unit Economics & Sustainable Growth",
            "link": {
              "type": "doc",
              "id": "part-09-career-client-work-products-and-startups/41-startup-launch-and-growth/41-2-unit-economics-and-sustainable-growth/index"
            },
            "items": [
              "part-09-career-client-work-products-and-startups/41-startup-launch-and-growth/41-2-unit-economics-and-sustainable-growth/41-2-1-retention-churn-and-ai-inference-margins",
              "part-09-career-client-work-products-and-startups/41-startup-launch-and-growth/41-2-unit-economics-and-sustainable-growth/41-2-2-transitioning-from-solo-builder-to-team"
            ]
          }
        ]
      }
    ]
  },
  {
    "type": "category",
    "label": "Part 10 — Integrated Capstone",
    "link": {
      "type": "doc",
      "id": "part-10-integrated-capstone/index"
    },
    "items": [
      {
        "type": "category",
        "label": "42. From Real Problem to Production Product",
        "link": {
          "type": "doc",
          "id": "part-10-integrated-capstone/42-from-real-problem-to-production-product/index"
        },
        "items": [
          {
            "type": "category",
            "label": "42.1 Discovery, Specification & System Blueprint",
            "link": {
              "type": "doc",
              "id": "part-10-integrated-capstone/42-from-real-problem-to-production-product/42-1-discovery-specification-and-system-blueprint/index"
            },
            "items": [
              "part-10-integrated-capstone/42-from-real-problem-to-production-product/42-1-discovery-specification-and-system-blueprint/42-1-1-identifying-a-real-business-problem",
              "part-10-integrated-capstone/42-from-real-problem-to-production-product/42-1-discovery-specification-and-system-blueprint/42-1-2-architecture-data-model-and-ai-agent-spec"
            ]
          },
          {
            "type": "category",
            "label": "42.2 Full-Stack & AI Implementation",
            "link": {
              "type": "doc",
              "id": "part-10-integrated-capstone/42-from-real-problem-to-production-product/42-2-full-stack-and-ai-implementation/index"
            },
            "items": [
              "part-10-integrated-capstone/42-from-real-problem-to-production-product/42-2-full-stack-and-ai-implementation/42-2-1-building-the-core-application-and-backend-services",
              "part-10-integrated-capstone/42-from-real-problem-to-production-product/42-2-full-stack-and-ai-implementation/42-2-2-integrating-agents-mcp-tools-and-guardrails"
            ]
          },
          {
            "type": "category",
            "label": "42.3 Production Deployment & Launch",
            "link": {
              "type": "doc",
              "id": "part-10-integrated-capstone/42-from-real-problem-to-production-product/42-3-production-deployment-and-launch/index"
            },
            "items": [
              "part-10-integrated-capstone/42-from-real-problem-to-production-product/42-3-production-deployment-and-launch/42-3-1-testing-observability-and-security-hardening",
              "part-10-integrated-capstone/42-from-real-problem-to-production-product/42-3-production-deployment-and-launch/42-3-2-shipping-to-production-and-delivering-outcomes"
            ]
          }
        ]
      }
    ]
  },
  {
    "type": "category",
    "label": "Appendices",
    "link": {
      "type": "doc",
      "id": "appendix/index"
    },
    "items": [
      {
        "type": "category",
        "label": "Appendix A — Complete Client Acquisition Playbook",
        "link": {
          "type": "doc",
          "id": "appendix/appendix-a-complete-client-acquisition-playbook/index"
        },
        "items": [
          "appendix/appendix-a-complete-client-acquisition-playbook/a-1-positioning-and-service-selection",
          "appendix/appendix-a-complete-client-acquisition-playbook/a-2-social-media-client-acquisition",
          "appendix/appendix-a-complete-client-acquisition-playbook/a-3-freelance-marketplaces",
          "appendix/appendix-a-complete-client-acquisition-playbook/a-4-direct-client-acquisition",
          "appendix/appendix-a-complete-client-acquisition-playbook/a-5-business-pain-point-research",
          "appendix/appendix-a-complete-client-acquisition-playbook/a-6-relationship-first-outreach",
          "appendix/appendix-a-complete-client-acquisition-playbook/a-7-cold-email-and-calling",
          "appendix/appendix-a-complete-client-acquisition-playbook/a-8-pitches-and-demonstrations",
          "appendix/appendix-a-complete-client-acquisition-playbook/a-9-discovery-proposals-and-closing",
          "appendix/appendix-a-complete-client-acquisition-playbook/a-10-delivery-retention-and-growth"
        ]
      },
      {
        "type": "category",
        "label": "Appendix B — Practical Client Outreach Rules and Templates",
        "link": {
          "type": "doc",
          "id": "appendix/appendix-b-practical-client-outreach-rules-and-templates/index"
        },
        "items": [
          "appendix/appendix-b-practical-client-outreach-rules-and-templates/b-1-value-based-comments",
          "appendix/appendix-b-practical-client-outreach-rules-and-templates/b-2-connection-requests",
          "appendix/appendix-b-practical-client-outreach-rules-and-templates/b-3-first-conversations",
          "appendix/appendix-b-practical-client-outreach-rules-and-templates/b-4-pain-point-confirmation",
          "appendix/appendix-b-practical-client-outreach-rules-and-templates/b-5-personalized-pitches",
          "appendix/appendix-b-practical-client-outreach-rules-and-templates/b-6-demo-invitations",
          "appendix/appendix-b-practical-client-outreach-rules-and-templates/b-7-follow-ups",
          "appendix/appendix-b-practical-client-outreach-rules-and-templates/b-8-proposal-templates",
          "appendix/appendix-b-practical-client-outreach-rules-and-templates/b-9-discovery-call-preparation",
          "appendix/appendix-b-practical-client-outreach-rules-and-templates/b-10-client-communication-rules",
          "appendix/appendix-b-practical-client-outreach-rules-and-templates/b-11-20-practical-outreach-rules"
        ]
      },
      {
        "type": "category",
        "label": "Appendix C — Client Hunting Practice Workbook",
        "link": {
          "type": "doc",
          "id": "appendix/appendix-c-client-hunting-practice-workbook/index"
        },
        "items": [
          "appendix/appendix-c-client-hunting-practice-workbook/c-1-niche-research",
          "appendix/appendix-c-client-hunting-practice-workbook/c-2-business-research",
          "appendix/appendix-c-client-hunting-practice-workbook/c-3-pain-point-identification",
          "appendix/appendix-c-client-hunting-practice-workbook/c-4-lead-qualification",
          "appendix/appendix-c-client-hunting-practice-workbook/c-5-outreach-writing",
          "appendix/appendix-c-client-hunting-practice-workbook/c-6-demo-planning",
          "appendix/appendix-c-client-hunting-practice-workbook/c-7-sales-role-play",
          "appendix/appendix-c-client-hunting-practice-workbook/c-8-client-pipeline",
          "appendix/appendix-c-client-hunting-practice-workbook/c-9-final-client-acquisition-assignment"
        ]
      },
      {
        "type": "category",
        "label": "Appendix D — Job Search and Career Resources",
        "link": {
          "type": "doc",
          "id": "appendix/appendix-d-job-search-and-career-resources/index"
        },
        "items": [
          "appendix/appendix-d-job-search-and-career-resources/d-1-engineering-resume-checklists",
          "appendix/appendix-d-job-search-and-career-resources/d-2-portfolio-and-github-audit-criteria",
          "appendix/appendix-d-job-search-and-career-resources/d-3-interview-preparation-frameworks",
          "appendix/appendix-d-job-search-and-career-resources/d-4-offer-evaluation-and-negotiation-notes"
        ]
      },
      {
        "type": "category",
        "label": "Appendix E — Developer Reference Materials",
        "link": {
          "type": "doc",
          "id": "appendix/appendix-e-developer-reference-materials/index"
        },
        "items": [
          "appendix/appendix-e-developer-reference-materials/e-1-glossary",
          "appendix/appendix-e-developer-reference-materials/e-2-command-reference",
          "appendix/appendix-e-developer-reference-materials/e-3-troubleshooting",
          "appendix/appendix-e-developer-reference-materials/e-4-assessment-rubrics",
          "appendix/appendix-e-developer-reference-materials/e-5-further-learning-resources"
        ]
      }
    ]
  }
],
};

export default sidebars;
