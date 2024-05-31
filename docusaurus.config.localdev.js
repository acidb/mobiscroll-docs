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
  url: 'https://mobiscrollprod.com',
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

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          routeBasePath: '/',
          includeCurrentVersion: false,
          lastVersion: '5.30.0',
        },
        blog: false,
        theme: {
          customCss: [require.resolve('./src/css/custom.css'), require.resolve('./src/css/footer.css')],
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
            type: 'dropdown',
            label: 'Legacy docs',
            items: [
              {
                label: 'Version 4.10.10',
                href: 'https://docs.mobiscrollprod.com/4-10-10/javascript/getting-started'
              },
              {
                label: 'Version 3.2.6',
                href: 'https://docs.mobiscrollprod.com/3-2-6/javascript/getting-started'
              },
            ]
          },
          {
            href: 'https://docs.mobiscroll.com/cli',
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
                href: 'https://blog.mobiscroll.com/',
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
        appId: 'K01Y8I3I2D',
        apiKey: '587e2708d07f2d26787dff9093a4ef83',
        indexName: 'dev_docs_mobiscroll',
        contextualSearch: true,
      },
    }),
};

module.exports = config;
