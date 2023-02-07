import { createContext } from "react";

// Creating a LoginContext to store user login data and associated methods
export const LoginContext = createContext({
  //* State variables for user login data
  isLoggedIn: false,
  userId: null,
  newNotification: false,
  pidCleanListItems: null,
  clearListItems: false,
  homepageListItems: null,
  token: null,
  newAvatar: null,
  //* Login and logout methods for updating the user login data
  login: () => {},
  logout: () => {},
  //* Method for updating the new notification state
  notification: () => {},
  //* Methods for updating the list items data on the LeftSideBar
  listItemsNotListed: () => {},
  listItemsCleanListed: () => {},
  homepageCleanListItems: () => {},
  //* Method for updating the new avatar state
  preNewAvatar: () => {},
});
