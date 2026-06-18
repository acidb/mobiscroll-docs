if (typeof window !== 'undefined') {
  const originalError = console.error.bind(console);
  console.error = (...args) => {
    if (typeof args[0] === 'string' && args[0].includes('Docusaurus React Root onRecoverableError')) {
      return;
    }
    originalError(...args);
  };
}
