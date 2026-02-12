const bar = {
  title: "",
  logo: {
    alt: "Mobiscroll Logo",
    src: "img/mobiscroll-logo.svg",
    srcDark: "img/mobiscroll-logo-dark.svg",
  },
  items: [
    {
      type: "custom-baseDropdown",
      className: "mobiscroll-ui-nav mobiscroll-connect-nav",
      label: "Docs",
      position: "left",
      items: [
        {
          label: "Mobiscroll UI",
          href: "/javascript",
        },
        {
          label: "Mobiscroll Connect",
          href: "/connect",
        },
      ],
    },
    {
      type: "docsVersionDropdown",
      className: "mobiscroll-ui-nav",
    },
    {
      type: "custom-frameworkDropdown",
      className: "mobiscroll-ui-nav",
      label: "Framework",
      items: [
        {
          type: "doc",
          label: "Angular",
          // href: 'https://docs.mobiscrollprod.com/angular',
          docId: "angular/getting-started/overview",
          framework: "angular",
        },
        {
          type: "doc",
          label: "JavaScript",
          // href: 'https://docs.mobiscrollprod.com/javascript',
          docId: "javascript/getting-started/overview",
          framework: "javascript",
        },
        {
          type: "doc",
          label: "jQuery",
          // href: 'https://docs.mobiscrollprod.com/jquery',
          docId: "jquery/getting-started/overview",
          framework: "jquery",
        },
        {
          type: "doc",
          label: "React",
          // href: 'https://docs.mobiscrollprod.com/react',
          docId: "react/getting-started/overview",
          framework: "react",
        },
        {
          type: "doc",
          label: "Vue",
          docId: "vue/getting-started/overview",
          framework: "vue",
        },
      ],
    },
    {
      type: "dropdown",
      className: "mobiscroll-ui-nav",
      label: "Older versions",
      position: "right",
      items: [
        {
          label: "Version 4.10.10",
          href: "https://docs.mobiscroll.com/4-10-10/javascript/getting-started",
        },
        {
          label: "Version 3.2.6",
          href: "https://docs.mobiscroll.com/3-2-6/javascript/getting-started",
        },
      ],
    },
    // {
    //   href: 'https://docs.mobiscroll.com/cli',
    //   label: 'CLI',
    //   position: 'right',
    // },
    {
      className: "mobiscroll-ui-nav",
      type: "dropdown",
      label: "Community",
      items: [
        {
          label: "Forum",
          href: "https://forum.mobiscroll.com/",
        },
        {
          label: "Blog",
          href: "https://blog.mobiscroll.com/",
        },
        {
          href: "https://github.com/acidb/mobiscroll/issues",
          label: "GitHub",
        },
      ],
      position: "right",
    },
    {
      type: "dropdown",
      label: "Support",
      items: [
        {
          href: "https://mobiscroll.com/account/supporttickets",
          label: "Support tickets",
        },
        {
          label: "Help Center",
          href: "http://help.mobiscroll.com",
        },
      ],
      position: "right",
    },
  ],
};

module.exports = bar;
