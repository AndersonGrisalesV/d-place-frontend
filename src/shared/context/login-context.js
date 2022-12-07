import { createContext } from "react";

export const LoginContext = createContext({
  isLoggedIn: false,
  userId: null,
  newNotification: false,
  login: () => {},
  createAccount: () => {},
  logout: () => {},
  notification: () => {},
});
