export const getLocal = (key) => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  } catch (error) {
    console.error("Error getting local storage", error);
    return null;
  }
};

export const setLocal = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error("Error setting local storage", error);
  }
};

export const removeLocal = (key) => {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error("Error removing local storage", error);
  }
};

export const getSession = (key) => {
  try {
    const item = sessionStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  } catch (error) {
    console.error("Error getting session storage", error);
    return null;
  }
};

export const setSession = (key, value) => {
  try {
    sessionStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error("Error setting session storage", error);
  }
};

export const removeSession = (key) => {
  try {
    sessionStorage.removeItem(key);
  } catch (error) {
    console.error("Error removing session storage", error);
  }
};

export const clearAll = () => {
  try {
    localStorage.clear();
    sessionStorage.clear();
  } catch (error) {
    console.error("Error clearing storage", error);
  }
};
