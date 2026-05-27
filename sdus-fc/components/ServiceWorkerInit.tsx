'use client';
import { useEffect } from 'react';
import { registerServiceWorker } from '@/lib/sw-register';

/** Enregistre le Service Worker au montage. Ne rend rien. */
export default function ServiceWorkerInit() {
  useEffect(() => {
    void registerServiceWorker();
  }, []);
  return null;
}
