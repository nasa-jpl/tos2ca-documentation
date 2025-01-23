import React from 'react';
import ComponentCreator from '@docusaurus/ComponentCreator';

export default [
  {
    path: '/tos2ca-documentation/about',
    component: ComponentCreator('/tos2ca-documentation/about', '3bf'),
    exact: true
  },
  {
    path: '/tos2ca-documentation/code_of_conduct',
    component: ComponentCreator('/tos2ca-documentation/code_of_conduct', 'e1a'),
    exact: true
  },
  {
    path: '/tos2ca-documentation/contributing',
    component: ComponentCreator('/tos2ca-documentation/contributing', 'a31'),
    exact: true
  },
  {
    path: '/tos2ca-documentation/governance',
    component: ComponentCreator('/tos2ca-documentation/governance', 'cb8'),
    exact: true
  },
  {
    path: '/tos2ca-documentation/license',
    component: ComponentCreator('/tos2ca-documentation/license', '4d6'),
    exact: true
  },
  {
    path: '/tos2ca-documentation/markdown-page',
    component: ComponentCreator('/tos2ca-documentation/markdown-page', 'a56'),
    exact: true
  },
  {
    path: '/tos2ca-documentation/notebooks',
    component: ComponentCreator('/tos2ca-documentation/notebooks', 'dd3'),
    exact: true
  },
  {
    path: '/tos2ca-documentation/docs',
    component: ComponentCreator('/tos2ca-documentation/docs', '73d'),
    routes: [
      {
        path: '/tos2ca-documentation/docs',
        component: ComponentCreator('/tos2ca-documentation/docs', 'c73'),
        routes: [
          {
            path: '/tos2ca-documentation/docs',
            component: ComponentCreator('/tos2ca-documentation/docs', '896'),
            routes: [
              {
                path: '/tos2ca-documentation/docs/anomaly-detection',
                component: ComponentCreator('/tos2ca-documentation/docs/anomaly-detection', '5f4'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/tos2ca-documentation/docs/data_access_server',
                component: ComponentCreator('/tos2ca-documentation/docs/data_access_server', '889'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/tos2ca-documentation/docs/data-dictionaries',
                component: ComponentCreator('/tos2ca-documentation/docs/data-dictionaries', 'fa8'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/tos2ca-documentation/docs/fortracc-module',
                component: ComponentCreator('/tos2ca-documentation/docs/fortracc-module', '06f'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/tos2ca-documentation/docs/intro',
                component: ComponentCreator('/tos2ca-documentation/docs/intro', '97b'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/tos2ca-documentation/docs/tos2ca-documentation',
                component: ComponentCreator('/tos2ca-documentation/docs/tos2ca-documentation', '88b'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/tos2ca-documentation/docs/user-interface',
                component: ComponentCreator('/tos2ca-documentation/docs/user-interface', '5fc'),
                exact: true,
                sidebar: "tutorialSidebar"
              }
            ]
          }
        ]
      }
    ]
  },
  {
    path: '/tos2ca-documentation/',
    component: ComponentCreator('/tos2ca-documentation/', '510'),
    exact: true
  },
  {
    path: '*',
    component: ComponentCreator('*'),
  },
];
