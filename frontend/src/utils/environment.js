/**
 * Frontend Environment Detection
 * Browser-compatible version of environment utilities
 */

const isReplit = () => {
  // Check if we're running in Replit based on URL patterns
  if (typeof window !== 'undefined') {
    const hostname = window.location.hostname;
    console.log('🔍 Hostname:', hostname);
    // Check for both repl.co and replit.dev domains
    return hostname.includes('repl.co') || hostname.includes('replit.dev');
  }
  return false;
};

const getEnvironment = () => {
  const env = isReplit() ? 'replit' : 
             (process.env.NODE_ENV === 'production' ? 'production' : 'local');
  console.log('🌍 Environment detected:', env);
  return env;
};

const getBackendUrl = () => {
  const env = getEnvironment();
  let apiUrl;
  
  switch (env) {
    case 'replit':
      // In Replit, always use relative URLs - works for both .repl.co and .replit.dev
      apiUrl = '/api';
      break;
    case 'local':
      apiUrl = 'http://localhost:3001/api';
      break;
    default:
      apiUrl = 'http://localhost:3001/api';
  }
  
  console.log('🎯 API URL:', apiUrl);
  return apiUrl;
};

export {
  isReplit,
  getEnvironment,
  getBackendUrl
};