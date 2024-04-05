/**
 * Brings the active menu item into the view
 */
export function showActiveMenu() {
  const activeItems = document.querySelectorAll("nav.menu .menu__link--active");
  if (activeItems && activeItems.length) {
    activeItems[activeItems.length - 1].scrollIntoView({
      behavior: "smooth",
      block: "center", // bring it to the center along the y axis
      // inline: 'center' // bring it to the center along the x axis
    });
  }
}
