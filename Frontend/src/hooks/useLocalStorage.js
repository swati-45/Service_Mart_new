import { useState } from "react";
import { getLocal, setLocal, removeLocal } from "../utils/storage";

const useLocalStorage = (key, initialValue) => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = getLocal(key);
      return item !== null ? item : initialValue;
    } catch (error) {
      console.warn(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  const setValue = (value) => {
    try {
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      setLocal(key, valueToStore);
    } catch (error) {
      console.warn(`Error setting localStorage key "${key}":`, error);
    }
  };

  const removeValue = () => {
    try {
      removeLocal(key);
      setStoredValue(null);
    } catch (error) {
      console.warn(`Error removing localStorage key "${key}":`, error);
    }
  };

  return [storedValue, setValue, removeValue];
};

export default useLocalStorage;
