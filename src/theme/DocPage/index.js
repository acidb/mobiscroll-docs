import React from 'react';
import DocPage from '@theme-original/DocPage';
import { useLocation, useHistory } from '@docusaurus/router';

export default function DocPageWrapper(props) {
  const { pathname, hash, state } = useLocation();
  const history = useHistory();
  React.useEffect(() => {
    if (hash) {
      history.push(pathname);
      setTimeout(() => {
        history.push(pathname + hash);
      });
    }
  }, []);
  return (
    <>
      <DocPage {...props} />
    </>
  );
}
