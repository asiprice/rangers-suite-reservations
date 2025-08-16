/**
 * Mobile App Environment Detection
 * React Native compatible version
 */

import { Platform } from 'react-native';
import Constants from 'expo-constants';

const isExpoGo = () => {
  return Constants.appOwnership === 'expo';
};

const isReplit = () => {
  // Check if we're connecting to a Replit backend
  return !!(global.__DEV__ && process.env.EXPO_PUBLIC_REPLIT_URL);
};

const getEnvironment = () => {
  if (isReplit()) return 'replit';
  if (__DEV__) return 'local';
  return 'production';
};

const getBackendUrl = () => {
  const env = getEnvironment();
  
  switch (env) {
    case 'replit':
      // Use environment variable for Replit URL
      return `${process.env.EXPO_PUBLIC_REPLIT_URL}/api`;
    case 'local':
      if (Platform.OS === 'ios') {
        // iOS Simulator can use localhost
        return 'http://localhost:3001/api';
      } else if (Platform.OS === 'android') {
        // Android emulator uses 10.0.2.2 for localhost
        return 'http://10.0.2.2:3001/api';
      } else {
        // For physical devices, you'll need your computer's IP
        // You can set this in .env.local: EXPO_PUBLIC_LOCAL_IP=192.168.1.100
        const localIP = process.env.EXPO_PUBLIC_LOCAL_IP || 'localhost';
        return `http://${localIP}:3001/api`;
      }
    default:
      return 'http://localhost:3001/api';
  }
};

export {
  isExpoGo,
  isReplit,
  getEnvironment,
  getBackendUrl
};