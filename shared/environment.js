/**
 * Environment Detection Utility
 * Works across backend, frontend, and mobile apps
 */

const isReplit = () => {
  return !!(process.env.REPL_SLUG && process.env.REPL_OWNER);
};

const isBrowser = () => {
  return typeof window !== 'undefined';
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
      // In Replit, backend runs on same domain with different port or path
      if (isBrowser()) {
        // Frontend calling backend in browser
        return window.location.origin.replace(':3000', ':3001');
      } else {
        // Server-side or mobile app
        return `https://${process.env.REPL_SLUG}.${process.env.REPL_OWNER}.repl.co`;
      }
    case 'local':
      return 'http://localhost:3001';
    default:
      return 'http://localhost:3001';
  }
};

const getFrontendUrl = () => {
  const env = getEnvironment();
  
  switch (env) {
    case 'replit':
      if (isBrowser()) {
        return window.location.origin;
      } else {
        return `https://${process.env.REPL_SLUG}.${process.env.REPL_OWNER}.repl.co`;
      }
    case 'local':
      return 'http://localhost:3000';
    default:
      return 'http://localhost:3000';
  }
};

const getPort = (defaultPort) => {
  return process.env.PORT || defaultPort;
};

const getDatabasePath = () => {
  const env = getEnvironment();
  
  switch (env) {
    case 'replit':
      // Replit has persistent storage in specific directories
      return '/home/runner/data/rangers_suite.db';
    case 'local':
      return './rangers_suite.db';
    default:
      return './rangers_suite.db';
  }
};

const getCorsOrigins = () => {
  const env = getEnvironment();
  
  switch (env) {
    case 'replit':
      return [
        `https://${process.env.REPL_SLUG}.${process.env.REPL_OWNER}.repl.co`,
        `https://${process.env.REPL_SLUG}--3000.${process.env.REPL_OWNER}.repl.co`,
        'http://localhost:3000',
        'http://localhost:19006' // Expo web
      ];
    case 'local':
      return [
        'http://localhost:3000',
        'http://localhost:19006', // Expo web
        'http://localhost:8081',  // Expo dev
        'http://localhost:8082'   // Expo dev alt port
      ];
    default:
      return ['http://localhost:3000'];
  }
};

module.exports = {
  isReplit,
  isBrowser,
  getEnvironment,
  getBackendUrl,
  getFrontendUrl,
  getPort,
  getDatabasePath,
  getCorsOrigins
};