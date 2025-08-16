/**
 * Frontend Environment Detection
 * Browser-compatible version of environment utilities
 */

const isReplit = () => {
  // Check if we're running in Replit based on URL patterns
  if (typeof window !== 'undefined') {
    const hostname = window.location.hostname;
    return hostname.includes('repl.co') || hostname.includes('replit.com');
  }
  return false;
};

const getEnvironment = () => {
  if (isReplit()) return 'replit';
  if (process.env.NODE_ENV === 'production') return 'production';
  return 'local';
};

const getBackendUrl = () => {
  const env = getEnvironment();
  
  switch (env) {
    case 'replit':
      // In Replit, backend and frontend run on same domain
      if (typeof window !== 'undefined') {
        return `${window.location.origin}/api`;
      }
      return '/api';
    case 'local':
      return 'http://localhost:3001/api';
    default:
      return 'http://localhost:3001/api';
  }
};

export {
  isReplit,
  getEnvironment,
  getBackendUrl
};