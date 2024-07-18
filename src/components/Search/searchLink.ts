import { useCallback, useMemo } from "react";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import type { ThemeConfig as AlgoliaThemeConfig } from "@docusaurus/theme-search-algolia";
import { useLocation } from "@docusaurus/router";
import { getLocationInfo } from "./util";

const SEARCH_PARAM_QUERY = 'q';
const FRAMEWORK_PARAM = 'framework';

export function useSearchLinkCreator(): (searchValue: string) => string {
  const {
    siteConfig: { baseUrl, themeConfig },
  } = useDocusaurusContext();
  const {
    algolia: { searchPagePath },
  } = themeConfig as AlgoliaThemeConfig;

  const location = useLocation();
  const framework = useMemo(() => {
    const info = getLocationInfo(location);
    return info.framework;
  }, [location]);

  return useCallback(
    (searchValue: string) =>
      // Refer to https://github.com/facebook/docusaurus/pull/2838
      // Note: if searchPagePath is falsy, useSearchPage() will not be called
      `${baseUrl}${
        searchPagePath as string
      }?${SEARCH_PARAM_QUERY}=${encodeURIComponent(searchValue)}${framework ? `&${FRAMEWORK_PARAM}=${framework}` : ''}`,
    [baseUrl, searchPagePath, framework],
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