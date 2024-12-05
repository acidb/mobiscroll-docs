
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
          const colNr = cellNr(table.querySelector('tr'));
          table.querySelectorAll('.js-table-temp-cell').forEach(c => { c.remove() });
          if (isOn)
          {
            table.querySelectorAll('tr').forEach(tr => {
              const rLength = cellNr(tr);
              if (hasClass(tr, 'js-not-applicable') && rLength > colNr) {
                const nextAvailTr = getNextAvailableTr(tr, colNr);
                if (nextAvailTr) {
                  const cell = tr.querySelector('th, td');
                  const clone = cell.cloneNode(true) as HTMLElement;
                  clone.classList.add('js-table-temp-cell');
                  const c = countGroupRows(tr, colNr);
                  if (c) {
                    clone.setAttribute('rowspan', c.toString());
                  }
                  // nextAvailTr.appendChild(clone);
                  nextAvailTr.prepend(clone);
                }
              } else if (rLength > colNr) {
                const cell = tr.querySelector('th, td');
                const c = countGroupRows(tr, colNr);
                if (c) {
                  cell.setAttribute('rowspan', c.toString());
                }
              }
              if (hasClass(tr, 'js-not-applicable')) {
                tr.classList.add('table-row-hidden');
              }
            });
          }
          else
          {
            debugger;
            table.querySelectorAll('tr').forEach((tr) => {
              if (hasClass(tr, 'js-not-applicable')) {
                tr.classList.remove('table-row-hidden');
              }
              const cell = tr.querySelector('th, td');
              if (cell.getAttribute('rowspan')) {
                cell.setAttribute('rowspan', countGroupRows(tr, colNr, true).toString());
              }
            });
          }
        }
      }
    }
  }
  window.addEventListener('click', clickHandler);
  return () => { window.removeEventListener('click', clickHandler); }
}

function cellNr(tr: HTMLElement) {
  return tr.querySelectorAll('th, td').length;
}

function hasClass(tr: HTMLElement, cl) {
  return tr.classList.contains(cl);
}

function getNextAvailableTr(tr: HTMLElement, colNr: number) {
  const n = tr.nextSibling as HTMLElement;
  if (n) {
    const l = cellNr(n);
    if (l <= colNr) {
      if (hasClass(n, 'js-not-applicable')) {
        return getNextAvailableTr(n, colNr);
      } else {
        return n;
      }
    }
  }
  return null;
}

function countGroupRows(fromTr: HTMLElement, colNr: number, all = false) {
  let tr = fromTr.nextSibling as HTMLElement;
  let c = 0;
  if (!hasClass(fromTr, 'js-not-applicable') || all) {
    c++;
  }
  while(tr && cellNr(tr) <= colNr) {
    if (!hasClass(tr, 'js-not-applicable') || all) {
      c++; // C++ ^_^
    }
    tr = tr.nextSibling as HTMLElement;
  }
  return c;
}