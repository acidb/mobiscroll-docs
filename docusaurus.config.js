// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

const navbar = require('./navbar.config');

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Mobiscroll Documentation',
  // tagline: 'Dinosaurs are cool',
  favicon: 'img/favicon-light-32x32.png',

  // Set the production url of your site here
  url: 'https://mobiscroll.com',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/docs',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'acidb', // Usually your GitHub org/user name.
  projectName: 'mobiscroll-docs', // Usually your repo name.

  onBrokenLinks: 'warn',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internalization, you can use this field to set useful
  // metadata like html lang. For example, if your site is Chinese, you may want
  // to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  plugins: [
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'connect',
        path: 'connect',
        routeBasePath: 'connect',
        sidebarPath: './sidebarsConnect.js',
      },
    ],
  ],

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          routeBasePath: '/',
          includeCurrentVersion: false,
          lastVersion: '5.35.0',
          versions: {
            "5.35.0": {
              badge: false,
            },
          },
          onlyIncludeVersions: ['5.35.0', '5.34.0', '5.33.0'],
        },
        blog: false,
        theme: {
          customCss: [
            require.resolve('./src/css/custom.css'),
            require.resolve('./src/css/footer.css'),
            require.resolve('./src/css/mbsc-grid.css'),
            require.resolve('./src/css/mbsc-icons.css'),
          ],
        },
        googleTagManager: {
          containerId: 'GTM-NDRKTM9',
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      // Replace with your project's social card
      image: 'img/fb-home.png',
      navbar: navbar,
      footer: {
        style: 'dark',
        copyright: `Copyright © ${new Date().getFullYear()} Acid Media LLC. Built with Docusaurus.`,
      },
      prism: {
        additionalLanguages: ['csharp', 'php'],
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
      algolia: {
        appId: '3NDU900UQH',
        apiKey: '63af4c8805116c77b6f64c291d3953c3',
        indexName: 'docs_mobiscroll',
      },
    }),

  scripts: [
    {
      src: 'https://www.google.com/recaptcha/api.js?render=6LeyvR0pAAAAAKU93ZTvIe2-5-XOiLnbcOHLWbwz',
      async: true,
    }
  ]
};

module.exports = config;
