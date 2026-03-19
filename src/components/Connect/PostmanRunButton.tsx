import React, { useEffect } from 'react';

const POSTMAN_COLLECTION_UID = '36449189-25b1b785-a0f3-484f-bb75-39f7a4682ea2';
const POSTMAN_WORKSPACE_ID = '7234d326-907c-4419-9c94-9eecc5b58d7c';
const POSTMAN_ENV_PARAM =
  'env%5BMobiscroll%20Connect%20API%20Environment%5D=W3sia2V5IjoiYmFzZVVybCIsInZhbHVlIjoiaHR0cHM6Ly9jb25uZWN0Lm1vYmlzY3JvbGwuY29tL2FwaSIsInR5cGUiOiJkZWZhdWx0IiwiZW5hYmxlZCI6dHJ1ZX0seyJrZXkiOiJjbGllbnRJZCIsInZhbHVlIjoieW91ci1jbGllbnQtaWQiLCJ0eXBlIjoiZGVmYXVsdCIsImVuYWJsZWQiOnRydWV9LHsia2V5IjoiY2xpZW50U2VjcmV0IiwidmFsdWUiOiJ5b3VyLWNsaWVudC1zZWNyZXQiLCJ0eXBlIjoic2VjcmV0IiwiZW5hYmxlZCI6dHJ1ZX0seyJrZXkiOiJyZWRpcmVjdFVyaSIsInZhbHVlIjoiaHR0cHM6Ly9vYXV0aC5wc3Rtbi5pby92MS9jYWxsYmFjayIsInR5cGUiOiJkZWZhdWx0IiwiZW5hYmxlZCI6dHJ1ZX0seyJrZXkiOiJ1c2VySWQiLCJ2YWx1ZSI6InlvdXItZ2VvLXVzZXItaWQiLCJ0eXBlIjoiZGVmYXVsdCIsImVuYWJsZWQiOnRydWV9LHsia2V5Ijoic2NvcGUiLCJ2YWx1ZSI6InJlYWQtd3JpdGUiLCJ0eXBlIjoiZGVmYXVsdCIsImVuYWJsZWQiOnRydWV9LHsia2V5IjoiYWNjZXNzVG9rZW4iLCJ2YWx1ZSI6IiIsInR5cGUiOiJkZWZhdWx0IiwiZW5hYmxlZCI6dHJ1ZX0seyJrZXkiOiJyZWZyZXNoVG9rZW4iLCJ2YWx1ZSI6IiIsInR5cGUiOiJkZWZhdWx0IiwiZW5hYmxlZCI6dHJ1ZX1d';

export function PostmanRunButton() {
  useEffect(() => {
    (function (p: any, o: Document, s: string, t: string, m: string) {
      if (!p[s]) {
        p[s] = function () {
          (p[t] || (p[t] = [])).push(arguments);
        };
      }

      if (!o.getElementById(s + t)) {
        const script = o.createElement('script');
        script.id = s + t;
        script.async = true;
        script.src = m;
        o.getElementsByTagName('head')[0].appendChild(script);
      }
    })(window as any, document, '_pm', 'PostmanRunObject', 'https://run.pstmn.io/button.js');
  }, []);

  return (
    <div
      className="postman-run-button"
      data-postman-action="collection/fork"
      data-postman-visibility="public"
      data-postman-var-1={POSTMAN_COLLECTION_UID}
      data-postman-collection-url={`entityId=${POSTMAN_COLLECTION_UID}&entityType=collection&workspaceId=${POSTMAN_WORKSPACE_ID}`}
      data-postman-param={POSTMAN_ENV_PARAM}
    />
  );
}
