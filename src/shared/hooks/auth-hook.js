import { useCallback, useEffect, useState } from "react";

let logoutTimer;

export const useAuth = () => {
  const [token, setToken] = useState(false);
  const [tokenExpirationDate, setTokenExpirationDate] = useState();
  const [userId, setUserId] = useState(false);
  const [theme, setTheme] = useState(false);

  const [newNotification, setNewNotification] = useState(false);
  //   const [mode, setMode] = useState("light");

  const login = useCallback((uid, token, expirationDate, theme) => {
    setToken(token);
    setUserId(uid);
    setTheme(theme);
    setNewNotification(true);
    const tokenExpirationDate =
      expirationDate || new Date(new Date().getTime() + 1000 * 60 * 60);
    setTokenExpirationDate(tokenExpirationDate);
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

  //   const createAccount = useCallback((uid, token, expirationDate) => {
  //     setToken(token);
  //     setUserId(uid);
  //     setNewNotification(true);
  //     const tokenExpirationDate =
  //       expirationDate || new Date(new Date().getTime() + 1000 * 60 * 60);
  //     setTokenExpirationDate(tokenExpirationDate);
  //     localStorage.setItem(
  //       "userData",
  //       JSON.stringify({
  //         userId: uid,
  //         token: token,
  //         expiration: tokenExpirationDate.toISOString(),
  //       })
  //     );
  //   }, []);

  const logout = useCallback(() => {
    setToken(null);
    setTokenExpirationDate(null);
    setUserId(null);
    setTheme(null);
    localStorage.removeItem("userData");
  }, []);

  const notification = useCallback(() => {
    setNewNotification((preNewNotification) => !preNewNotification);
  }, []);

  //   const modeWebsite = useCallback((modeName) => {
  //     if (modeName === "light") {
  //       setMode("light");
  //     } else {
  //       setMode("dark");
  //     }
  //     // setToken(null);
  //     // setTokenExpirationDate(null);
  //     // setUserId(null);
  //     // localStorage.removeItem("userData");
  //   }, []);

  useEffect(() => {
    if (token && tokenExpirationDate) {
      const remainingTime =
        tokenExpirationDate.getTime() - new Date().getTime();
      logoutTimer = setTimeout(logout, remainingTime);
    } else {
      clearTimeout(logoutTimer);
    }
  }, [token, logout, tokenExpirationDate]);

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("userData"));
    if (
      storedData &&
      storedData.token &&
      new Date(storedData.expiration) > new Date()
    ) {
      login(
        storedData.userId,
        storedData.token,
        new Date(storedData.expiration),
        storedData.theme
      );
    }
  }, [login]);

  return {
    token,
    login,
    theme,
    logout,
    userId,
    notification,
    newNotification,
  };
};
