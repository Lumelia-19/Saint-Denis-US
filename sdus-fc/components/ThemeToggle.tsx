'use client';
import { useSyncExternalStore } from 'react';
import Icon from '@/components/Icon';

function subscribe(callback: () => void) {
  window.addEventListener('themechange', callback);
  return () => window.removeEventListener('themechange', callback);
}

function getSnapshot() {
  return document.documentElement.classList.contains('dark');
}

function getServerSnapshot() {
  return false;
}

export default function ThemeToggle({ className = '' }: { className?: string }) {
  const isDark = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const toggle = () => {
    const next = !document.documentElement.classList.contains('dark');
    document.documentElement.classList.toggle('dark', next);
    try {
      localStorage.setItem('theme', next ? 'dark' : 'light');
    } catch {
      /* localStorage unavailable — theme just won't persist */
    }
    window.dispatchEvent(new Event('themechange'));
  };

  return (
    <button
      onClick={toggle}
      aria-label={isDark ? 'Activer le thème clair' : 'Activer le thème sombre'}
      className={`grid place-items-center w-11 h-11 rounded-full border transition-colors ${className}`}
    >
      <Icon name={isDark ? 'sun' : 'moon'} size={19} strokeWidth={2} />
    </button>
  );
}
