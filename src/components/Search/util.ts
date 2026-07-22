/**
 * Returns an object containing information on the current location
 * @param location the object returned from useLocation()
 * @returns
 */
// Current ("latest") UI version — kept in sync with docusaurus.config.js's lastVersion.
const CURRENT_VERSION = "6.1.0";

export function getLocationInfo(location) {
  const frRegex = /(jquery|angular|javascript|react|vue)/g;
  const compRegex =
    /(eventcalendar|datepicker|select|popup|input|textarea|dropdown|segmented|button|stepper|radio|switch|checkbox)/g;
  const connectRegex = /\/connect/g;
  const versionRegex = /\/5\.35\.0\//;
  let framework = "";
  let component = null;

  const docsBase = connectRegex.test(location.pathname) ? "connect" : "docs";
  const version = versionRegex.test(location.pathname) ? "5.35.0" : CURRENT_VERSION;

  if (docsBase === "docs") {
    const frMatches = frRegex.exec(location.pathname);
    if (frMatches !== null && frMatches.length > 0) {
      framework = frMatches[1];
    }
    const compMatches = compRegex.exec(location.pathname);
    if (compMatches !== null && compMatches.length > 0) {
      component = compMatches[1];
    }
  }

  return {
    framework,
    component,
    docsBase,
    version,
  };
}

/**
 * Returns the docusaurus_tag facet value(s) for the current location, matching the
 * `docs-<pluginId>-<versionName>` convention Docusaurus itself uses for the
 * `docsearch:docusaurus_tag` meta tag (see getDocsVersionSearchTag in
 * @docusaurus/plugin-content-docs).
 * - A single string means "must match this exact tag".
 * - An array of strings means "must match any one of these tags" (OR) — used for the
 *   homepage, which should search Connect + the current UI version, but not 5.35.0.
 * @param locInfo the object returned from getLocationInfo
 * @returns
 */
export function getDocusaurusTag(locInfo) {
    if (locInfo.docsBase === "connect") {
        return "docs-connect-current";
    }
    if (locInfo.framework) {
        return `docs-default-${locInfo.version}`;
    }
    // Homepage: Connect + current UI version, excluding 5.35.0.
    return ["docs-connect-current", `docs-default-${CURRENT_VERSION}`];
}

/**
 * Returns a custom facets array to include in every search. Algolia's facetFilters
 * treats top-level array entries as AND'd, and any entry that is itself an array as
 * an OR group — used here so the homepage can match "Connect OR current version".
 * @param locInfo the object returned from getLocationInfo
 * @returns
 */
export function getCustomFacets(locInfo) {
    const facets: (string | string[])[] = ['type:content'];
    const tag = getDocusaurusTag(locInfo);
    if (Array.isArray(tag)) {
        facets.push(tag.map((t) => 'docusaurus_tag:' + t));
    } else if (tag) {
        facets.push('docusaurus_tag:' + tag);
    }
    if (locInfo.docsBase === "docs" && locInfo.framework) {
        facets.push('framework:' + locInfo.framework);
    }
    return facets;
}

// /**
//  * Transforms the algolia search result objects
//  * @param items search result items
//  * @returns js objects
//  */
// export function transformItems(items) {
//   return items.map((item) => {
//     return { ...item, content: item.content || "mycontent" };
//   });
// }
