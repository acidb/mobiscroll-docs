
/**
 * Should be used only client side
 */
export function initializeHideSwitch() {
  const clickHandler = (ev: Event) => {
    const target = ev.target as HTMLElement;
    if (target && target.classList && target.classList.length) {
      if (target.classList.contains('table-hide-switch')) {
        const sw = target as HTMLInputElement;
        const isOn = sw.checked;
        const table = sw.closest('table');
        if (table) {
          table.querySelectorAll('.js-not-applicable').forEach((tr) => {
            if (isOn) {
              tr.classList.add('table-row-hidden');
            } else {
              tr.classList.remove('table-row-hidden');
            }
          });
        }
      }
    }
  }
  window.addEventListener('click', clickHandler);
  return () => { window.removeEventListener('click', clickHandler); }
}