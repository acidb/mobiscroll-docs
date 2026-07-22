/**
 * Returns an object containing information on the current location
 * @param location the object returned from useLocation()
 * @returns
 */
export function getLocationInfo(location) {
  const frRegex = /(jquery|angular|javascript|react|vue)/g;
  const compRegex =
    /(eventcalendar|datepicker|select|popup|input|textarea|dropdown|segmented|button|stepper|radio|switch|checkbox)/g;
  const connectRegex = /\/connect/g;
  const versionRegex = /\/5\.35\.0\//;
  let framework = "";
  let component = null;

  const docsBase = connectRegex.test(location.pathname) ? "connect" : "docs";
  const version = versionRegex.test(location.pathname) ? "5.35.0" : "6.1.0";

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
 * Returns the docusaurus_tag facet value for the current location, matching the
 * `docs-<pluginId>-<versionName>` convention Docusaurus itself uses for the
 * `docsearch:docusaurus_tag` meta tag (see getDocsVersionSearchTag in
 * @docusaurus/plugin-content-docs). Returns null when the location has no specific
 * scope (e.g. the homepage), meaning no tag restriction should be applied.
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
    return null;
}

/**
 * Returns a custom facets array to include in every search
 * @param locInfo the object returned from the getLocationInfo
 * @returns
 */
export function getCustomFacets(locInfo) {
    const facets = ['type:content'];
    const tag = getDocusaurusTag(locInfo);
    if (tag) {
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
