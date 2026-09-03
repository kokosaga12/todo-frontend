'use client';

import { useSyncExternalStore, useCallback } from 'react';

function subscribe(callback: () => void) {
  window.addEventListener('storage', callback);
  window.addEventListener('local-storage-update', callback);

  return () => {
    window.removeEventListener('storage', callback);
    window.removeEventListener(
      'local-storage-update',
      callback
    );
  };
}

function getSnapshot(
  key: string,
  initialValue: string
) {
  if (typeof window === 'undefined') {
    return initialValue;
  }

  const rawValue = window.localStorage.getItem(key);

  return rawValue !== null
    ? rawValue
    : initialValue;
}

function getServerSnapshot(initialValue: string) {
  return initialValue;
}

export function useLocalStorage<T>(
  key: string,
  initialValue: T
): [
  T,
  (value: T | ((current: T) => T)) => void
] {
  const storedValue = useSyncExternalStore(
    subscribe,
    () => getSnapshot(key, JSON.stringify(initialValue)),
    () => getServerSnapshot(JSON.stringify(initialValue))
  );

  const value: T = (() => {
    try {
      return JSON.parse(storedValue);
    } catch {
      return initialValue;
    }
  })();

  const setValue = useCallback(
    (val: T | ((current: T) => T)) => {
      try {
        const item = window.localStorage.getItem(key);

        const current: T =
          item !== null
            ? JSON.parse(item)
            : initialValue;

        const nextValue =
          val instanceof Function
            ? val(current)
            : val;

        window.localStorage.setItem(
          key,
          JSON.stringify(nextValue)
        );

        window.dispatchEvent(
          new Event('local-storage-update')
        );
      } catch (error) {
        console.warn(
          `${key} localStorage update gagal`,
          error
        );
      }
    },
    [key, initialValue]
  );

  return [value, setValue];
}