// -----------------------------------------LOCAL_STORAGE------------------------------------------------------

export const setToLocalStorage = (key, data) => {
  localStorage.setItem(key, JSON.stringify(data));
  return;
};

export const getFromLocalStorage = (key, value = []) => {
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : value;
};

export const removeFromLocalStorage = (key) => {
  return localStorage.removeItem(key);
};

// -----------------------------------------SESSION_STORAGE------------------------------------------------------

export const setToSessionStorage = (key, data) => {
  sessionStorage.setItem(key, JSON.stringify(data));
  return;
};

export const getFromSessionStorage = (key, value = []) => {
  const data = sessionStorage.getItem(key);
  return data ? JSON.parse(data) : value;
};

export const removeFromSessionStorage = (key) => {
  return sessionStorage.removeItem(key);
};
