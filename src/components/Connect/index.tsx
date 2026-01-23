import React from 'react';
import styles from './styles.module.css';

interface ParameterProps {
  name: string;
  type: string;
  defaultValue?: React.ReactNode;
  required?: boolean;
  children: React.ReactNode;
  id?: string;
}

export function Parameter({ name, type, defaultValue, required, children, id }: ParameterProps) {
  return (
    <div className={styles.parameter} id={id}>
      <div className={styles.header}>
        <span className={styles.name}>{name}</span>
        <span className={styles.type}>{type}</span>
        {required && <span className={styles.required}>Required</span>}
      </div>
      {defaultValue && (
        <div className={styles.defaultValue}>
          <strong>Default: </strong>
          {defaultValue}
        </div>
      )}
      <div className={styles.description}>{children}</div>
    </div>
  );
}
