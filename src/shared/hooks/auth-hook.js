import { useCallback, useEffect, useState } from "react";

//* Declare a variable for logout timer
let logoutTimer;

export const useAuth = () => {
  // State for the authentication token
  const [token, setToken] = useState(false);

  // State for the token expiration date
  const [tokenExpirationDate, setTokenExpirationDate] = useState();

  // State for the user id
  const [userId, setUserId] = useState(false);

  // State for the user's preferred theme
  const [theme, setTheme] = useState(false);

  //* Function to handle user login and create a new localStorage Item to handle the user login expiration time and theme
  const login = useCallback((uid, token, expirationDate, theme) => {
    setToken(token);
    setUserId(uid);
    setTheme(theme);
    // Calculate the token expiration date
    const tokenExpirationDate =
      expirationDate || new Date(new Date().getTime() + 1000 * 60 * 60);
    setTokenExpirationDate(tokenExpirationDate);
    // Store the user data in local storage
    localStorage.setItem(
      "userData",
      JSON.stringify({
        userId: uid,
        token: token,
        expiration: tokenExpirationDate.toISOString(),
        theme: theme,
      })
    );
  }, []);

  //* Function to handle user logout
  const logout = useCallback(() => {
    // Clear the token and user id from state
    setToken(null);
    setTokenExpirationDate(null);
    setUserId(null);
    setTheme(null);
    localStorage.removeItem("userData");
  }, []);

  //* Effect to automatically log out the user when the token expires
  useEffect(() => {
    // Calculate the remaining time until the token expires
    if (token && tokenExpirationDate) {
      const remainingTime =
        tokenExpirationDate.getTime() - new Date().getTime();
      logoutTimer = setTimeout(logout, remainingTime);
    } else {
      // Clear the logout timer if the token is not present
      clearTimeout(logoutTimer);
    }
  }, [token, logout, tokenExpirationDate]);

  //* Effect to check if there is stored user data in local storage and log the user in
  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("userData"));
    if (
      storedData &&
      storedData.token &&
      new Date(storedData.expiration) > new Date()
    ) {
      //* Log the user in if there is stored user data and the token has not expired
      login(
        storedData.userId,
        storedData.token,
        new Date(storedData.expiration),
        storedData.theme
      );
    }
  }, [login]);

  // Return the authentication data
  return {
    token,
    login,
    theme,
    logout,
    userId,
  };
};
