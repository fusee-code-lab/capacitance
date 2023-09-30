import { Capacitor } from '@capacitor/core';

export const getPlatform = () => {
  // @ts-ignore
  return window.ipc ? window.environment.platform : Capacitor.getPlatform() || 'web';
};
