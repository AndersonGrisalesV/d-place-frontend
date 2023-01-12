import { createContext } from "react";

export const LoginContext = createContext({
  isLoggedIn: false,
  userId: null,
  newNotification: false,
  pidCleanListItems: null,
  clearListItems: false,
  homepageListItems: null,
  login: () => {},
  createAccount: () => {},
  logout: () => {},
  notification: () => {},
  listItemsNotListed: () => {},
  listItemsCleanListed: () => {},
  homepageCleanListItems: () => {},
});
