import type { Config } from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

/**
 * GitHub Pages deployment configuration.
 * The project publishes to https://MuhammadHamidRaza.github.io/the-ai-native-engineer/
 * Override any of these with the GITHUB_USERNAME / REPO_NAME / SITE_URL / BASE_URL
 * environment variables if the project ever moves.
 */
const GITHUB_USERNAME = process.env.GITHUB_USERNAME || 'MuhammadHamidRaza';
const REPO_NAME = process.env.REPO_NAME || 'the-ai-native-engineer';
const SITE_URL = process.env.SITE_URL || 'https://muhammadhamidraza.github.io';
const BASE_URL = process.env.BASE_URL || '/the-ai-native-engineer/';

const config: Config = {
  title: 'The AI-Native Engineer',
  tagline: 'Think. Build. Solve. Ship.',
  favicon: 'img/favicon.svg',

  future: {
    faster: {
      swcJsLoader: true,
      swcJsMinimizer: true,
      swcHtmlMinimizer: true,
      lightningCssMinimizer: true,
      mdxCrossCompilerCache: true,
      rspackBundler: true,
      rspackPersistentCache: true,
      ssgWorkerThreads: false,
    },
  },

  url: SITE_URL,
  baseUrl: BASE_URL,

  organizationName: GITHUB_USERNAME,
  projectName: REPO_NAME,
  // GitHub Pages serves extensionless .html paths — flat HTML output works
  // reliably there; keep the setting explicit.
  trailingSlash: false,

  onBrokenLinks: 'throw',
  markdown: {
    hooks: {
      onBrokenMarkdownLinks: 'warn',
    },
  },

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  headTags: [
    {
      tagName: 'meta',
      attributes: {
        name: 'description',
        content:
          'Think. Build. Solve. Ship. An interactive digital book and engineering learning platform by Hamid Raza.',
      },
    },
    {
      tagName: 'meta',
      attributes: {
        property: 'og:title',
        content: 'The AI-Native Engineer — Hamid Raza',
      },
    },
    {
      tagName: 'meta',
      attributes: {
        property: 'og:description',
        content:
          'Think. Build. Solve. Ship. 10 Parts, 42 Chapters, 638 Focused Learning Hours from Foundations to Production AI Systems and Client Delivery.',
      },
    },
    {
      tagName: 'link',
      attributes: {
        rel: 'preconnect',
        href: 'https://fonts.googleapis.com',
      },
    },
    {
      tagName: 'link',
      attributes: {
        rel: 'preconnect',
        href: 'https://fonts.gstatic.com',
        crossorigin: 'anonymous',
      },
    },
    {
      tagName: 'link',
      attributes: {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,400..700;1,9..144,400..600&family=JetBrains+Mono:wght@400;500;600&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap',
      },
    },
  ],

  plugins: [
    function tailwindAndDevServerPlugin() {
      return {
        name: 'tailwind-and-devserver-plugin',
        configurePostCss(postcssOptions) {
          postcssOptions.plugins.push(require('@tailwindcss/postcss'));
          return postcssOptions;
        },
        configureWebpack() {
          return {
            devServer: {
              allowedHosts: 'all',
            },
            watchOptions: {
              ignored: [
                '**/node_modules/**',
                '**/build/**',
                '**/.git/**',
                '**/scripts/**',
                '**/public/**',
              ],
            },
          } as Record<string, unknown>;
        },
      };
    },
  ],

  presets: [
    [
      'classic',
      {
        docs: {
          path: 'docs',
          routeBasePath: 'book',
          sidebarPath: './sidebars.ts',
          breadcrumbs: false,
          numberPrefixParser: false,
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    colorMode: {
      defaultMode: 'dark',
      disableSwitch: false,
      respectPrefersColorScheme: false,
    },
    navbar: {
      title: 'The AI-Native Engineer',
      items: [],
    },
    footer: {
      style: 'dark',
      links: [],
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
