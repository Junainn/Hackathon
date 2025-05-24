// Removed setToken and getToken as JWT is handled by cookie
// export const setToken = (token) => { localStorage.setItem('authToken', token); };
// export const getToken = () => { return localStorage.getItem('authToken'); };
// export const removeToken = () => { localStorage.removeItem('authToken'); }; // This function is now unused

export const setUser = (user) => {
  if (user === undefined || user === null) {
    localStorage.removeItem('user');
  } else {
    try {
      localStorage.setItem('user', JSON.stringify(user));
    } catch (e) {
      console.error("Error stringifying user for localStorage:", e);
      localStorage.removeItem('user');
    }
  }
};

export const getUser = () => {
  const userString = localStorage.getItem('user');

  if (userString === null || userString === "") {
    return null;
  }

  try {
    const parsedUser = JSON.parse(userString);
    if (typeof parsedUser === 'object' && parsedUser !== null) {
      return parsedUser;
    } else {
      console.error("Error: User data in localStorage is not a valid object after parsing. Data:", userString);
      removeUser();
      return null;
    }
  } catch (e) {
    console.error("Error parsing user from localStorage:", e);
    removeUser();
    return null;
  }
};

export const removeUser = () => {
  localStorage.removeItem('user');
  // If you had any other local storage items related to auth, clear them here too
};
