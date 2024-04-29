import React, { useEffect } from 'react';
// import { useLocation, Switch, Route } from 'react-router-dom';
import { useHistory, useLocation } from '@docusaurus/router';

// Default implementation, that you can customize
export default function Root({children}) {
  const { pathname } = useLocation();
  const hist = useHistory();

  useEffect(() => {
    if (pathname && pathname.length > 1 && !/\/(react|angular|vue|javascript|jquery)/.test(pathname)) {
        const framework = getCookie('mbsc-framework') || 'javascript';
        hist.push( '/' + framework + pathname);
    }
  }, [pathname, hist])

  return <>{children}</>
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