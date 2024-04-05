import React from "react";
import DocPage from "@theme-original/DocPage";
import { useLocation, useHistory } from "@docusaurus/router";
import { showActiveMenu } from "@site/src/util/menuscroll";

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
  return (
    <>
      <DocPage {...props} />
    </>
  );
}
