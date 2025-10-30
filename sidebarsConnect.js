/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.
 */

// @ts-check

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
// By default, Docusaurus generates a sidebar from the docs folder structure
const sidebars = {
  homeSidebar: [
    "getting-started",
    {
      type: "category",
      label: "API Reference",
      link: {
        type: "doc",
        id: "api",
      },
      items: ["api/oauth", "api/events", "api/calendars"],
    },
  ],
};

module.exports = sidebars;
