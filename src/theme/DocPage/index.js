import React from "react";
import DocPage from "@theme-original/DocPage";
import { useLocation, useHistory } from "@docusaurus/router";
import useIsBrowser from "@docusaurus/useIsBrowser";
import { captureTOCPositions, highlightTOC, showActiveMenu } from "@site/src/util/menuscroll";

export default function DocPageWrapper(props) {
  const { pathname, hash } = useLocation();
  const history = useHistory();
  React.useEffect(() => {
    if (hash) {
      const noSlashEnd = pathname.replace(/\/$/, "");
      history.push(noSlashEnd + hash);
    }

    setTimeout(() => showActiveMenu(), 50);
  }, []);

  const isBrowser = useIsBrowser();

  React.useEffect(() => {
    // reload TOC's on every page navigation
    captureTOCPositions();
  }, [pathname]);

  // Scroll listener
  React.useEffect(() => {
    let requestRunning = null;
    function handleScroll() {
      if (isBrowser && requestRunning === null) {
        requestRunning = window.requestAnimationFrame(() => {
          // highlight the right TOC item based on the window scroll
          highlightTOC(window.scrollY);
          requestRunning = null;
        });
      }
    }

    if (isBrowser) {
      window.addEventListener("scroll", handleScroll, { passive: true });
      return () => window.removeEventListener("scroll", handleScroll, { passive: true });
    }
  }, [isBrowser]);

  return (
    <>
      <DocPage {...props} />
    </>
  );
}
