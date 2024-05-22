import React, { useEffect } from 'react';
// import { useLocation, Switch, Route } from 'react-router-dom';
import { useHistory, useLocation } from '@docusaurus/router';

// Default implementation, that you can customize
export default function Root({children}) {
  const { pathname, hash } = useLocation();
  const hist = useHistory();

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

  return <>{children}</>
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