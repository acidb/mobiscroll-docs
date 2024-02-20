import React from 'react';
import DocPage from '@theme-original/DocPage';
import { useLocation, useHistory } from '@docusaurus/router';

export default function DocPageWrapper(props) {
  const { pathname, hash } = useLocation();
  const history = useHistory();
  React.useEffect(() => {
    if (hash) {
      const noSlashEnd = pathname.replace(/\/$/, '');
      history.push(noSlashEnd + hash);
    }
  }, []);
  return (
    <>
      <DocPage {...props} />
    </>
  );
}
