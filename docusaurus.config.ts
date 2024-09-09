import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: 'TOS2CA Documentation',
  tagline: 'Thematic Observation Search, Segmentation, Collation and Analysis',
  favicon: 'img/nasa.png',

  // Set the production url of your site here
  url: 'https://nasa-jpl.github.io',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/tos2ca-documentation',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'nasa-jpl', // Usually your GitHub org/user name.
  projectName: 'tos2ca-documentation', // Usually your repo name.
  trailingSlash: false,

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          //editUrl:
          //  'https://github.jpl.nasa.gov/TOS2CA/tos2ca-documentation',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    // Replace with your project's social card
    image: 'img/nasa.png',
    navbar: {
      title: 'TOS2CA',
      logo: {
        alt: 'NASA/Caltech/JPL Logo',
        src: 'img/nasa.png',
      },
      items: [
        {to: '/docs/intro', label: 'Docs', position: 'left'},
      	{to: '/about', label: 'About', position: 'left'},
        {to: '/code_of_conduct', label: 'Conduct', position: 'left'},
        {to: '/contributing', label: 'Contributing', position: 'left'},
        {to: '/governance', label: 'Governance', position: 'left'},
        {
          href: 'https://github.com/search?q=org%3Anasa-jpl+tos2ca&type=repositories',
          label: 'NASA-JPL GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Resources',
          items: [
            {
              label: 'Docs',
              to: '/docs/intro',
            },            
            {
              label: 'About',
              to: '/about',
            },
            {
              label: 'Code of Conduct',
              to: '/code_of_conduct',
            },
          ],
        },
        {
          title: 'Community',
          items: [
            {
              label: 'Contributing',
              to: '/contributing',
            },
            {
              label: 'Governance',
              href: '/governance',
            },
            {
              label: 'Notebook Examples',
              href: '/notebooks',
            },
          ],
        },
        {
          title: 'More',
          items: [
            {
              label: 'GitHub',
              href: 'https://github.com/search?q=org%3Anasa-jpl+tos2ca&type=repositories',
            },            {
              label: 'Citation Information',
              href: 'https://zenodo.org/records/13375606',
            },
          ],
        },
      ],
      copyright: `© 2023 California Institute of Technology ("Caltech"). U.S. Government sponsorship acknowledged. Contents licensed under Apache License Version 2.0.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
