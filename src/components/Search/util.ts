import { useLatestVersion } from "@docusaurus/plugin-content-docs/client";

/**
 * Returns the current ("latest") UI version's name, read from Docusaurus's own version
 * metadata for the `default` docs plugin instance (whichever version is configured as
 * `lastVersion` in docusaurus.config.js for the environment currently being built/served —
 * never a hardcoded string, so it stays correct across version bumps and differs safely
 * between environments, e.g. testing a newer version on dev before it's live on prod).
 * @returns
 */
export function useCurrentVersion(): string {
  return useLatestVersion("default").name;
}

/**
 * Returns an object containing information on the current location
 * @param location the object returned from useLocation()
 * @param currentVersion the "latest" UI version's name, from Docusaurus's own version
 *   metadata (see useCurrentVersion below) — never hardcoded, so this file needs no edit
 *   when a new UI version becomes current.
 * @returns
 */
export function getLocationInfo(location, currentVersion) {
  const frRegex = /(jquery|angular|javascript|react|vue)/g;
  const compRegex =
    /(eventcalendar|datepicker|select|popup|input|textarea|dropdown|segmented|button|stepper|radio|switch|checkbox)/g;
  const connectRegex = /\/connect/g;
  // 5.35.0 is intentionally hardcoded: v5 is frozen at this version going forward, unlike
  // the current UI version which keeps advancing (see currentVersion above).
  const versionRegex = /\/5\.35\.0\//;
  let framework = "";
  let component = null;

  const docsBase = connectRegex.test(location.pathname) ? "connect" : "docs";
  const version = versionRegex.test(location.pathname) ? "5.35.0" : currentVersion;

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
    // Homepage: Connect + current UI version, excluding 5.35.0. locInfo.version already
    // resolves to the current version here (the 5.35.0 URL segment wasn't matched).
    return ["docs-connect-current", `docs-default-${locInfo.version}`];
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
