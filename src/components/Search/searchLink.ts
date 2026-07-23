import { useCallback, useMemo } from "react";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import type { ThemeConfig as AlgoliaThemeConfig } from "@docusaurus/theme-search-algolia";
import { useLocation } from "@docusaurus/router";
import { getLocationInfo, getDocusaurusTag, useCurrentVersion } from "./util";

const SEARCH_PARAM_QUERY = 'q';
const FRAMEWORK_PARAM = 'framework';
const TAG_PARAM = 'tag';

export function useSearchLinkCreator(): (searchValue: string) => string {
  const {
    siteConfig: { baseUrl, themeConfig },
  } = useDocusaurusContext();
  const {
    algolia: { searchPagePath },
  } = themeConfig as AlgoliaThemeConfig;

  const location = useLocation();
  const currentVersion = useCurrentVersion();
  const { framework, tag } = useMemo(() => {
    const info = getLocationInfo(location, currentVersion);
    const docusaurusTag = getDocusaurusTag(info);
    return {
      framework: info.framework,
      // Encode as a comma-joined string so "See all results" can carry the same
      // docusaurus_tag scope (including the homepage's OR-group of two tags) through
      // to the full /search page, which otherwise has no way to know it.
      tag: Array.isArray(docusaurusTag) ? docusaurusTag.join(',') : docusaurusTag,
    };
  }, [location, currentVersion]);

  return useCallback(
    (searchValue: string) =>
      // Refer to https://github.com/facebook/docusaurus/pull/2838
      // Note: if searchPagePath is falsy, useSearchPage() will not be called
      `${baseUrl}${
        searchPagePath as string
      }?${SEARCH_PARAM_QUERY}=${encodeURIComponent(searchValue)}${framework ? `&${FRAMEWORK_PARAM}=${framework}` : ''}${tag ? `&${TAG_PARAM}=${encodeURIComponent(tag)}` : ''}`,
    [baseUrl, searchPagePath, framework, tag],
  );
}

/**
 *
 * @returns The framework query parameter from the url if there is one
 */
export function getDefaultFramework() {
    const location = useLocation();
    const p = new URLSearchParams(location.search)
    return p.get('framework') || '';
}

/**
 * Returns the docusaurus_tag value(s) carried over from the originating page via the
 * `tag` query param set by useSearchLinkCreator (split back out of its comma-joined
 * form). Empty array if the search page was opened directly, with no originating scope.
 */
export function getDefaultTags(): string[] {
    const location = useLocation();
    const p = new URLSearchParams(location.search)
    const tag = p.get('tag');
    return tag ? tag.split(',') : [];
}