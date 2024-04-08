import React, { useEffect } from 'react';
// import { useLocation, Switch, Route } from 'react-router-dom';
import { useHistory, useLocation } from '@docusaurus/router';

// Default implementation, that you can customize
export default function Root({children}) {
  const { pathname } = useLocation();
  const hist = useHistory();

  useEffect(() => {
    if (pathname && pathname.length > 1 && !/\/(react|angular|vue|javascript|jquery)/.test(pathname)) {
        const framework = 'javascript';
        hist.push( '/' + framework + pathname);
    }
  }, [pathname, hist])

  return <>{children}</>
}