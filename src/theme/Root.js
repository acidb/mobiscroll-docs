import React, { useEffect, useState } from 'react';
// import { useLocation, Switch, Route } from 'react-router-dom';
import { useHistory, useLocation } from '@docusaurus/router';
import { captureTOCPositions } from "@site/src/util/menuscroll";


// Default implementation, that you can customize
export default function Root({children}) {
  const { pathname, hash } = useLocation();
  const hist = useHistory();
  const [targeting, setTargeting] = useState(!!hash);

  useEffect(() => {
    reachTarget(hash, false);
    setTimeout(() => setTargeting(false), 3000);
  }, [pathname, hash]);

  useEffect(() => {
    if (pathname && pathname.length > 1 && !skipUrls(pathname) && !/\/(react|angular|vue|javascript|jquery)/.test(pathname)) {
        const rest = /(\/docs)?(\/[0-9]+\.[0-9]+\.[0-9]+)?\/(.*)/.exec(pathname);
        const redir = rest != null;
        if (redir) {
          const version = rest[2] ? rest[2] : '';
          const framework = getCookie('mbsc-framework') || 'javascript';
          const lead = rest[1] ? '/docs' : '';
          hist.push(lead + version + '/' + framework + '/' + rest[3] + hash);
        }
    }
  }, [pathname, hist])

  useEffect(() => {
    if (PerformanceObserver !== undefined) {
      // the function is called whenever there is a layout shift on the page
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (!entry.hadRecentInput || targeting) {
            reachTarget(hash);
            captureTOCPositions();
          }
        }
      });
      observer.observe({ type: "layout-shift", buffered: true });

      return () => {
        observer.disconnect();
      }
    }
  }, [pathname, hist, hash])

  return <>{children}</>
}

/**
 * Checks if the element targeted by the hash in location is at the top of the page
 * If not, it will scroll the target element into the view
 * @param {*} hash
 * @returns
 */
function reachTarget(hash) {
  if (!hash)
    return true;
  const id = hash.replace('#', '');
  const el = document.getElementById(id);
  if (!el) {
    return false;
  }
  const threshold = 100;
  const reachedTarget = Math.abs(window.scrollY - el.offsetTop) < threshold;
  if (!reachedTarget) {
    el.scrollIntoView({
      behavior: "smooth",
      block: "start", // bring it to the top
    });
  }
  return reachedTarget;
}

function skipUrls(pathname) {
  const patterns = [
    '/docs/?$',
    '/search/?$',
    '(/[0-9]+\.[0-9]+\.[0-9]+)/?$'
  ];
  const reg = patterns.map((pattern) => `(${pattern})`).join('|');
  const skip = new RegExp(reg).test(pathname);
  return skip;
}

function getCookie(cname) {
  let name = cname + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(';');
  for(let i = 0; i <ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}