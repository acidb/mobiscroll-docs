// Algolia Crawler configuration for Mobiscroll Docs
// Paste the contents of this file into the Algolia Crawler editor at:
// https://crawler.algolia.com/ -> select your crawler -> Editor tab
//
// Replace YOUR_WRITE_API_KEY with an Algolia API key that has
// addObject, editSettings, and deleteIndex ACLs.

new Crawler({
  appId: "3NDU900UQH",
  apiKey: "YOUR_WRITE_API_KEY",
  rateLimit: 8,
  maxDepth: 10,
  startUrls: ["https://mobiscroll.com/docs/"],
  sitemaps: ["https://mobiscroll.com/docs/sitemap.xml"],
  ignoreCanonicalTo: true,
  discoveryPatterns: ["https://mobiscroll.com/docs/**"],
  // Exclude older versioned docs (only 6.0.0, 5.35.0, 5.34.0 are served)
  exclusionPatterns: [
    "https://mobiscroll.com/docs/5.2[0-9].[0-9]/**",
    "https://mobiscroll.com/docs/5.3[0-3].[0-9]/**",
  ],
  actions: [
    {
      indexName: "docs_mobiscroll",
      pathsToMatch: ["https://mobiscroll.com/docs/**"],
      recordExtractor: ({ $, helpers }) => {
        // priority order: deepest active sub-list header -> navbar active item -> 'Documentation'
        const lvl0 =
          $(
            ".menu__link.menu__link--sublist.menu__link--active, .navbar__item.navbar__link--active",
          )
            .last()
            .text() || "Documentation";

        return helpers.docsearch({
          recordProps: {
            lvl0: {
              selectors: "",
              defaultValue: lvl0,
            },
            lvl1: ["header h1", "article h1"],
            lvl2: "article h2",
            lvl3: "article h3",
            lvl4: "article h4",
            lvl5: "article h5, article td:first-child",
            lvl6: "article h6",
            content: "article p, article li, article td:last-child",
          },
          indexHeadings: true,
          aggregateContent: true,
          recordVersion: "v3",
        });
      },
    },
  ],
  initialIndexSettings: {
    docs_mobiscroll: {
      attributesForFaceting: [
        "type",
        "lang",
        "language",
        "version",
        "docusaurus_tag",
      ],
      attributesToRetrieve: [
        "hierarchy",
        "content",
        "anchor",
        "url",
        "url_without_anchor",
        "type",
      ],
      attributesToHighlight: ["hierarchy", "content"],
      attributesToSnippet: ["content:10"],
      camelCaseAttributes: ["hierarchy", "content"],
      searchableAttributes: [
        "unordered(hierarchy.lvl0)",
        "unordered(hierarchy.lvl1)",
        "unordered(hierarchy.lvl2)",
        "unordered(hierarchy.lvl3)",
        "unordered(hierarchy.lvl4)",
        "unordered(hierarchy.lvl5)",
        "unordered(hierarchy.lvl6)",
        "content",
      ],
      distinct: true,
      attributeForDistinct: "url",
      customRanking: [
        "desc(weight.pageRank)",
        "desc(weight.level)",
        "asc(weight.position)",
      ],
      ranking: [
        "words",
        "filters",
        "typo",
        "attribute",
        "proximity",
        "exact",
        "custom",
      ],
      highlightPreTag: '<span class="algolia-docsearch-suggestion--highlight">',
      highlightPostTag: "</span>",
      minWordSizefor1Typo: 3,
      minWordSizefor2Typos: 7,
      allowTyposOnNumericTokens: false,
      minProximity: 1,
      ignorePlurals: true,
      advancedSyntax: true,
      attributeCriteriaComputedByMinProximity: true,
      removeWordsIfNoResults: "allOptional",
      separatorsToIndex: "_",
    },
  },
});
