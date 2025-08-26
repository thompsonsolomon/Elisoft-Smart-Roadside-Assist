import { useState, useEffect } from "react";

export function useLocalStorage(key, initialValue) {
  // Read from localStorage safely
  const readValue = () => {
    if (typeof window === "undefined") return initialValue; // SSR safe
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  };

  const [value, setValue] = useState(readValue);

  // Write value to localStorage whenever it changes
  useEffect(() => {
    try {
      if (value === undefined) {
        window.localStorage.removeItem(key);
      } else {
        window.localStorage.setItem(key, JSON.stringify(value));
      }
    } catch (error) {
      console.error(`Error setting localStorage key "${key}":`, error);
    }
  }, [key, value]);

  // Allow functional updates (like useState)
  const setStoredValue = (val) => {
    setValue((prev) => (val instanceof Function ? val(prev) : val));
  };

  // Clear storage
  const remove = () => {
    try {
      window.localStorage.removeItem(key);
      setValue(initialValue);
    } catch (error) {
      console.error(`Error removing localStorage key "${key}":`, error);
    }
  };

  return [value, setStoredValue, remove];
}
