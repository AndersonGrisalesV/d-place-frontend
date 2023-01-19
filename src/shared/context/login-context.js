import { createContext } from "react";

export const LoginContext = createContext({
  isLoggedIn: false,
  userId: null,
  newNotification: false,
  pidCleanListItems: null,
  clearListItems: false,
  homepageListItems: null,
  token: null,
  login: () => {},
  createAccount: () => {},
  logout: () => {},
  notification: () => {},
  listItemsNotListed: () => {},
  listItemsCleanListed: () => {},
  homepageCleanListItems: () => {},
});
