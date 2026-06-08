import React from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import styles from './styles.module.css';

interface ConnectDashboardLinkProps {
  path?: string;
  children: React.ReactNode;
}

export function ConnectDashboardLink({ path = '/connect', children }: ConnectDashboardLinkProps) {
  const { siteConfig } = useDocusaurusContext();
  const docsUrl = new URL(siteConfig.url);
  const hostname = docsUrl.hostname;
  const appHostname = hostname === 'localhost' ? 'app.mobiscroll.com' : `app.${hostname}`;
  const href = `https://${appHostname}${path}`;
  return <a href={href} target="_blank" rel="noopener noreferrer">{children}</a>;
}

interface ParameterProps {
  name: string;
  type: string;
  defaultValue?: React.ReactNode;
  required?: boolean;
  children: React.ReactNode;
  id?: string;
  isObject?: boolean;
}

export function Parameter({ name, type, defaultValue, required, children, id, isObject }: ParameterProps) {
  const containerClass = isObject ? styles.parameterObject : styles.parameter;
  
  return (
    <div className={containerClass} id={id}>
      <div className={styles.header}>
        <span className={styles.name}>{name}</span>
        <span className={styles.type}>{type}</span>
        {required && <span className={styles.required}>Required</span>}
      </div>
      <div className={styles.description}>{children}</div>
      {defaultValue && (
        <div className={styles.defaultValue}>
          <strong>Default: </strong>
          {defaultValue}
        </div>
      )}
    </div>
  );
}
