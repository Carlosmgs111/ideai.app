import { useState, useCallback } from "react";

export const useLocalStorage = (key: string, initialValue: any) => {
  const getValue = useCallback(() => {
    try {
      const item = localStorage.getItem(key);
      return item !== null ? JSON.parse(item) : initialValue;
    } catch (e) {
      return initialValue;
    }
  }, [initialValue, key]);

  const [storedValue, setValue] = useState(getValue());

  const setLocalStorage = (value: any) => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      setValue(value);
    } catch (e) {
      console.error(e);
    }
  };

  return [storedValue, setLocalStorage];
};
