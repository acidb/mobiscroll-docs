/**
 * Brings the active menu item into the view
 */
export function showActiveMenu() {
  const activeItems = document.querySelectorAll("nav.menu .menu__link--active");
  const navCont = document.querySelector("nav.menu") as HTMLElement;
  if (activeItems && activeItems.length) {
    const aItem = activeItems[activeItems.length - 1] as HTMLElement;
    const itemTop = aItem.offsetTop || (aItem.offsetParent && (aItem.offsetParent as HTMLElement).offsetTop) || 0;
    const scrollY = itemTop - (navCont.clientHeight / 2);
    navCont.scroll({
      top: scrollY,
      behavior: 'smooth',
    });
  }
}

let tocPositions: Array<{element: HTMLElement, targetPosition: number }> = [];

/**
 * Reads the TOC links and calculates the scroll positions
 */
export function captureTOCPositions() {
  tocPositions = [];
  const toc = document.querySelectorAll<HTMLElement>(".table-of-contents__link");
  for (let i = 0; i < toc.length; i++) {
    const el = toc[i];
    const target = document.getElementById(
      el.getAttribute("href").replace("#", ""),
    );
    if (target) {
      tocPositions.push({
        element: el,
        targetPosition: target.offsetTop,
      });
    }
  }
}

/**
 * Highlights the active item in the TOC based on the scroll position
 * @param scrollY The scroll position based on which the active item is calculated
 */
export function highlightTOC(scrollY) {
  const topNavHeight = 62;
  for (let i = 0; i < tocPositions.length; i++) {
    tocPositions[i].element.classList.remove("table-of-contents__link--active");
  }
  let activeIndex = -1;
  if (
    tocPositions.length > 0 &&
    tocPositions[tocPositions.length - 1].targetPosition - topNavHeight < scrollY
  ) {
    activeIndex = tocPositions.length - 1;
  } else {
    for (let i = 0; i < tocPositions.length; i++) {
      if (tocPositions[i].targetPosition - topNavHeight > scrollY) {
        activeIndex = i - 1;
        break;
      }
    }
  }
  if (activeIndex > -1 && activeIndex < tocPositions.length) {
    tocPositions[activeIndex].element.classList.add(
      "table-of-contents__link--active",
    );
  }
}
