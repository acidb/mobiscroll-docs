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
  let framework = "";
  let component = null;
  const frMatches = frRegex.exec(location.pathname);
  if (frMatches !== null && frMatches.length > 0) {
    framework = frMatches[1];
  }
  const compMatches = compRegex.exec(location.pathname);
  if (compMatches !== null && compMatches.length > 0) {
    component = compMatches[1];
  }

  const docsBase = connectRegex.test(location.pathname) ? "connect" : "docs";

  return {
    framework,
    component,
    docsBase,
  };
}

/**
 * Returns a facets array depending on the location info
 * @param locInfo the object returned from the getLocationInfo
 * @returns
 */
export function getFacetsFromLocationInfo(locInfo) {
    const facets = [];
    // if (locInfo.component) {
    //     facets.push('component:' + locInfo.component);
    // }
    if (locInfo.framework) {
        facets.push('framework:' + locInfo.framework);
    }
    return facets;
}

/**
 * Returns a custom facets array to include in every search
 * @param locInfo the object returned from the getLocationInfo
 * @returns
 */
export function getCustomFacets(locInfo) {
    const locationFacets = getFacetsFromLocationInfo(locInfo);
    locationFacets.push('type:content');
    return locationFacets;
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
