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

export const LEGACY_V5_VERSION = '5.35.0';
export const LEGACY_V5_TAG = `docs-default-${LEGACY_V5_VERSION}`;

/**
 * True on a v5.35.0 framework/component page — the one context that searches v6's index
 * for shared auto-generated content (see getSearchScope) instead of just its own tag.
 */
export function isLegacyV5Page(locInfo) {
    return locInfo.docsBase === 'docs' && locInfo.version === LEGACY_V5_VERSION && !!locInfo.framework;
}

/**
 * The `filters` string (see getSearchScope below) that scopes a search made in v5.35.0
 * context to v5.35.0's own (pruned, unique-only) records OR v6 records tagged
 * `presentInV5` post-crawl (see algolia/tag-present-in-v5.js). Shared by both the search
 * modal (getSearchScope) and the full "See all results" page (SearchPage), which carries
 * its scope across navigation via a URL param rather than re-deriving it from the location.
 */
export function getLegacyV5Filters(currentVersion) {
    return `(docusaurus_tag:"${LEGACY_V5_TAG}" OR (docusaurus_tag:"docs-default-${currentVersion}" AND presentInV5:true))`;
}

/**
 * Returns the facetFilters/filters to include in every search. Algolia's facetFilters
 * treats top-level array entries as AND'd, and any entry that is itself an array as
 * an OR group — used here so the homepage can match "Connect OR current version".
 *
 * On a v5.35.0 page, the scope is instead expressed as a `filters` string: v5.35.0's own
 * (pruned, unique-only) records OR v6 records that are also present in v5.35.0 (tagged
 * `presentInV5` post-crawl, see algolia/tag-present-in-v5.js). That's an OR of an AND,
 * which facetFilters' array/OR-array format can't represent, so it can't be folded into
 * the facetFilters array the way the homepage's OR-group above is.
 * @param locInfo the object returned from getLocationInfo
 * @param currentVersion the current ("latest") UI version's name, from useCurrentVersion()
 * @returns
 */
export function getSearchScope(locInfo, currentVersion) {
    const facetFilters: (string | string[])[] = ['type:content'];
    if (locInfo.docsBase === "docs" && locInfo.framework) {
        facetFilters.push('framework:' + locInfo.framework);
    }
    if (isLegacyV5Page(locInfo)) {
        return {
            facetFilters,
            filters: getLegacyV5Filters(currentVersion),
        };
    }
    const tag = getDocusaurusTag(locInfo);
    if (Array.isArray(tag)) {
        facetFilters.push(tag.map((t) => 'docusaurus_tag:' + t));
    } else if (tag) {
        facetFilters.push('docusaurus_tag:' + tag);
    }
    return { facetFilters, filters: undefined };
}

/**
 * Rewrites a hit's URL back to the equivalent v5.35.0 page when it was sourced from v6's
 * index (via the presentInV5 scope above). Hits already tagged docs-default-5.35.0 already
 * point at the correct v5.35.0 URL and pass through unchanged.
 */
export function rewriteUrlForLegacyV5(url: string): string {
    if (url.includes(`/${LEGACY_V5_VERSION}/`)) {
        return url;
    }
    return url.replace('/docs/', `/docs/${LEGACY_V5_VERSION}/`);
}

/**
 * Applies rewriteUrlForLegacyV5 to every hit when on a v5.35.0 page; passes items through
 * unchanged everywhere else.
 */
export function transformItemsForLocation(items, locInfo) {
    if (!isLegacyV5Page(locInfo)) {
        return items;
    }
    return items.map((item) => ({ ...item, url: rewriteUrlForLegacyV5(item.url) }));
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
