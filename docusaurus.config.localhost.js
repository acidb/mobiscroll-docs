// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Mobiscroll Documentation',
  // tagline: 'Dinosaurs are cool',
  favicon: 'img/favicon-light-32x32.png',

  // Set the production url of your site here
  url: 'https://localhost',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

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

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          routeBasePath: '/',
          includeCurrentVersion: true,
          lastVersion: 'current',
          versions: {
            current: {
              banner: 'none',
            },
          },
        },
        blog: false,
        theme: {
          customCss: [require.resolve('./src/css/custom.css'), require.resolve('./src/css/footer.css')],
        },
        googleTagManager: {
          containerId: 'GTM-12345',
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      // Replace with your project's social card
      image: 'img/fb-home.png',
      navbar: {
        title: '',
        logo: {
          alt: 'Mobiscroll Logo',
          src: 'img/mobiscroll-logo.svg',
          srcDark: 'img/mobiscroll-logo-dark.svg',
        },
        items: [
          {
            type: 'docsVersionDropdown',
          },
          {
            type: 'dropdown',
            label: 'Framework',
            items: [
              {
                type: 'doc',
                label: 'Angular',
                // href: 'https://docs.mobiscrollprod.com/angular',
                docId: 'angular/getting-started/overview',
              },
              {
                type: 'doc',
                label: 'JavaScript',
                // href: 'https://docs.mobiscrollprod.com/javascript',
                docId: 'javascript/getting-started/overview',
              },
              {
                type: 'doc',
                label: 'jQuery',
                // href: 'https://docs.mobiscrollprod.com/jquery',
                docId: 'jquery/getting-started/overview',
              },
              {
                type: 'doc',
                label: 'React',
                // href: 'https://docs.mobiscrollprod.com/react',
                docId: 'react/getting-started/overview',
              },
              {
                type: 'doc',
                label: 'Vue',
                docId: 'vue/getting-started/overview',
              },
            ],
          },
          {
            href: 'https://docs.mobiscrollprod.com/cli',
            label: 'CLI',
            position: 'right',
          },
          {
            type: 'dropdown',
            label: 'Community',
            items: [
              {
                label: 'Forum',
                href: 'https://forum.mobiscroll.com/',
              },
              {
                label: 'Blog',
                href: ' https://blog.mobiscroll.com/',
              },
              {
                href: 'https://github.com/acidb/mobiscroll/issues',
                label: 'GitHub',
              },
            ],
            position: 'right',
          },
          {
            type: 'dropdown',
            label: 'Support',
            items: [
              {
                href: 'https://mobiscroll.com/account/supporttickets',
                label: 'Support tickets',
              },
              {
                label: 'Help Center',
                href: 'http://help.mobiscroll.com',
              },
            ],
            position: 'right',
          },
        ],
      },
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
      src: 'https://www.google.com/recaptcha/api.js?render=6Leu6BgpAAAAALbw6w2g5wS6qQDPMWGJ7kQXNXAx',
      async: true,
    }
  ]
};

module.exports = config;