import { useEffect, useState } from "react";

/**
 * Safely parse JSON; returns fallback on error.
 * @param {string|null} value
 * @param {any} fallback
 * @returns {any}
 */
function safeJsonParse(value, fallback) {
  if (value == null) return fallback;
  try {
    return JSON.parse(value);
  } catch {
    return fallback;
  }
}

/**
 * Create a stable initial value, supporting lazy initializer functions.
 * @param {any|(() => any)} initialValue
 * @returns {any}
 */
function resolveInitialValue(initialValue) {
  return typeof initialValue === "function" ? initialValue() : initialValue;
}

// PUBLIC_INTERFACE
export function useLocalStorage(key, initialValue) {
  /** Persist a piece of React state to localStorage.
   *
   * @param {string} key localStorage key to use
   * @param {any|(() => any)} initialValue initial value (or lazy initializer)
   * @returns {[any, Function]} state and setState
   */
  const [state, setState] = useState(() => {
    // During SSR this would be undefined; CRA runs in browser but guard anyway.
    if (typeof window === "undefined") return resolveInitialValue(initialValue);
    const raw = window.localStorage.getItem(key);
    const fallback = resolveInitialValue(initialValue);
    return safeJsonParse(raw, fallback);
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(state));
    } catch {
      // If storage is blocked/quota exceeded, fail silently to avoid breaking UX.
    }
  }, [key, state]);

  return [state, setState];
}
