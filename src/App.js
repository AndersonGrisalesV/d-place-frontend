import React, { useCallback, useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";

import { LoginContext } from "./shared/context/login-context";

import { useAuth } from "./shared/hooks/auth-hook";
import { useHttpClient } from "./shared/hooks/http-hook";

import EditPlace from "./pages/EditPlace";
import FavoritesPage from "./pages/FavoritesPage";
import HomePage from "./pages/HomePage";
import LoginRegister from "./pages/LoginRegister";
import MyPlaces from "./pages/MyPlaces";
import NewPlace from "./pages/NewPlace";
import NotFoundGeneral from "./pages/NotFoundGeneral";
import PlaceDetail from "./pages/PlaceDetail";

import LoadingSpinner from "./shared/components/LoadingSpinner/LoadingSpinner";
import EditProfile from "./shared/components/LoginRegister/EditProfile/EditProfile";
import NavigationBar from "./shared/components/Navigation/Navbar/NavigationBar";
import SideBar from "./shared/components/Navigation/SideBar/SideBar";

import AppStyles from "./App.css";
import { Box, createTheme, Stack, ThemeProvider } from "@mui/material";
import styled from "@emotion/styled";

//* Styled component for StyleBox (background)
const StyleBox = styled(Box)(({ theme }) => ({
  background: theme.palette.mode === "dark" ? "#121212" : "#f2f2f2",
}));

function App() {
  // Declaring state for newNotification
  const [newNotification, setNewNotification] = useState(false);

  // Using the useAuth hook to get the token, login, logout, and userId from the authentication context
  const { token, login, logout, userId } = useAuth();

  let navigate = useNavigate();

  // State to manage the searchBa and the closeIcon of the searchBar
  const [searchBar, setSearchBar] = useState();
  const [showCloseButton, setShowCloseButton] = useState(false);

  // Declaring state for storedInputSearch
  const [storedInputSearch, setStoredInputSearch] = useState(null);

  // Import the `isLoading`, `sendRequest`, from the `useHttpClient` hook
  const { isLoading, sendRequest } = useHttpClient();

  // State variable to store the loaded user
  const [loadedPlaces, setLoadedPlaces] = useState();

  //* useEffect sends an API request to the backend in order to fetch the places to be shown on the homepage
  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/homepage`
        );
        // Setting the state with the fetched places
        setLoadedPlaces(responseData.places.reverse());
      } catch (err) {}
    };
    fetchPlaces();
  }, [sendRequest]);

  // handleSearchBar function to set the state with the search bar value and showIcon states plus checks if the searchBar is to be cleaned
  const handleSearchBar = (e, cleaner = null) => {
    setShowCloseButton(true);
    if (e === null && cleaner === "clean") {
      setSearchBar("");
      storedInputSearch.target.value = "";
      setShowCloseButton(false);
    } else {
      setStoredInputSearch(e);
      setSearchBar(e.target.value);
    }
  };

  // These variables are used to count the number of places
  // that match the search criteria and to store the ID of the
  // first place that matches the search criteria
  let count = 0;
  let placeSearched;

  const clearSearchBar = (e) => {
    // This fragment maps through the loaded places and finds the
    // place that matches the search criteria
    <>
      {!isLoading && loadedPlaces && (
        <React.Fragment>
          {loadedPlaces.map((place) => {
            let filtered;
            if (
              place.title.toLowerCase().includes(e.target.value.toLowerCase())
            ) {
              if (count === 0) {
                placeSearched = place.id;
              }
              count++;
            }
            return filtered;
          })}
        </React.Fragment>
      )}
    </>;
    // If no place matches the search criteria, decrement count
    if (count === 0) {
      count--;
    }
    // Clearing the search bar
    e.target.value = "";
    setSearchBar("");
    setShowCloseButton(false);

    // Navigating to the place that matches the search criteria
    navigate(`/api/places/${placeSearched}`);
    if (placeSearched !== undefined) {
      listItemsNotListed(placeSearched);
    }

    // If no place matches the search criteria, navigate back after 2 seconds
    if (placeSearched === undefined) {
      setTimeout(() => {
        navigate(-1);
      }, "2000");
    }
  };

  // handleSideBarCleanSearchBar function to clear the search bar when the side bar is closed
  const handleSideBarCleanSearchBar = () => {
    setSearchBar("");
    if (storedInputSearch) {
      storedInputSearch.target.value = "";
    }
    setShowCloseButton(false);
  };

  // State hook to store whether the list items should be cleared or not on the LeftSideItems
  const [clearListItems, setClearListItems] = useState(false);

  // State hook to store the id of the place whose list items should be cleared on the LeftSideItems
  const [pidCleanListItems, setPidCleanListItems] = useState(null);

  // State hook to store the index of the list items to be cleared on the LeftSideItems
  const [homepageListItems, setHomepageListItems] = useState(null);

  // State hook to store the new avatar
  const [newAvatar, setNewAvatar] = useState(null);

  //Callback function to change the state of the list items on the LeftSideItems in order to not show any selected menuItem
  const listItemsNotListed = useCallback((pid) => {
    setClearListItems(true);
    if (pid !== "") {
      setPidCleanListItems(pid);
    }
  }, []);

  // Callback function to change the state of the list items on the LeftSideItems back to their original state
  const listItemsCleanListed = useCallback(() => {
    setClearListItems(false);
    setPidCleanListItems(null);
  }, []);

  //Callback function to change the state of the homepage list items and redirect correctly to homepage when the AppNmes is clicked
  const listItemsCleanHomepage = useCallback((index) => {
    setHomepageListItems(index);
  }, []);

  // Callback function to change the state of new notifications to be shown to the user
  const notification = useCallback(() => {
    setNewNotification((preNewNotification) => !preNewNotification);
  }, []);

  // Callback function to refresh the avatar
  const refreshAvatar = useCallback(() => {
    setNewAvatar((preNewAvatar) => !preNewAvatar);
  }, []);

  // Get the user data stored in local storage or set it to null ir order to not have conflict with the theme
  const storedData = JSON.parse(localStorage.getItem("userData")) || null;

  // State to store the mode (light or dark)
  const [mode, setMode] = useState(storedData ? storedData.theme : "light");

  let routes;
  if (token) {
    routes = (
      <React.Fragment>
        <Route
          path="/api/homepage"
          element={<HomePage onFilterSearch={searchBar} />}
        />
        <Route
          path="/api/users/favorites/:uid"
          element={<FavoritesPage onFilterSearch={searchBar} />}
        />
        <Route
          path="/api/users/myplaces/:uid"
          element={<MyPlaces onFilterSearch={searchBar} />}
        />
        <Route
          path="/api/users/profile/:uid"
          element={
            <EditProfile
              onFilterSearch={searchBar}
              bgcolor={"backgroundColor"}
            />
          }
        />
        <Route path="/api/places/newplace" element={<NewPlace />} />
        <Route path="/api/places/editplace/:pid" element={<EditPlace />} />
        <Route
          path="/api/places/:pid"
          element={<PlaceDetail onFilterSearch={searchBar} />}
        />
        <Route path="*" element={<NotFoundGeneral />} />
      </React.Fragment>
    );
  } else {
    routes = (
      <React.Fragment>
        <Route
          path="/api/users/loginregister"
          element={<LoginRegister setMode={setMode} mode={mode} />}
        />
        <Route
          path="/api/places/:pid"
          element={<PlaceDetail onFilterSearch={searchBar} />}
        />
        <Route path="*" element={<NotFoundGeneral />} />
      </React.Fragment>
    );
  }

  //* Theme object for dark mode, with breakpoints and typography values defined
  const darkThemeTypographyAndBreakpoints = createTheme({
    breakpoints: {
      values: {
        sps: 0, // small phone screen
        ps: 350, // phone screen
        ts: 480, // tablet screen
        sls: 481, // small laptop screen
        sms: 680, // small medium screen
        sc: 740, //  small screen
        nsc: 869, // normal small screen
        ns: 900, // normal screen
        msc: 1260, //medium small screen
        mns: 1266, // medium normal screen
        ms: 1366, // medium screen
        lgs: 2570, // large screen
      },
    },
    typography: {
      fontFamily: ["Noto Sans", "sans-serif"].join(","),
    },
    palette: {
      mode,
      ...(mode === "light"
        ? {
            // palette values for light mode
            divider: "#cfcfcfd4",
            backgroundColor: "#0000000f",
            background: {
              main: "##dfdfdf8c",
              secondary: "#da4453c7",
            },
            text: {
              primary: "rgba(0, 0, 0, 0.87)",
              secondary: "rgba(0, 0, 0, 0.6)",
            },
          }
        : {}),
    },
  });

  // state to keep track of the state of the menu option for us to show the correct SideBar depending on the screen size
  const [menuOption, setMenuOption] = useState(true);

  // function to handle the burger menu it flips the menu option by negating the previous state
  const handleBurgerMenu = () => {
    setMenuOption((prevMenuOption) => !prevMenuOption);
  };

  //* A spinner contained within a long margin to keep light/dark themes consistent (if this is not added when a page is loading the background will be shown incorrectly)
  let spinner = "";
  if (isLoading) {
    spinner = (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          marginTop: "14px",
          marginBottom: "100%",
        }}
      >
        <LoadingSpinner asOverlay />
      </Box>
    );
  }

  return (
    <LoginContext.Provider
      value={{
        isLoggedIn: !!token,
        token: token,
        login: login,
        userId: userId,
        logout: logout,
        notification: notification,
        newNotification: newNotification,
        refreshAvatar: refreshAvatar,
        newAvatar: newAvatar,
        listItemsNotListed: listItemsNotListed,
        listItemsCleanListed: listItemsCleanListed,
        pidCleanListItems: pidCleanListItems,
        clearListItems: clearListItems,
        homepageListItems: homepageListItems,
        listItemsCleanHomepage: listItemsCleanHomepage,
      }}
    >
      <ThemeProvider theme={darkThemeTypographyAndBreakpoints}>
        <StyleBox
          className={AppStyles}
          bgcolor={"background.main"}
          sx={{ fontFamily: "Noto Sans" }}
          color={"text.primary"}
          style={{ margin: 0, padding: 0 }}
        >
          {!isLoading ? (
            <React.Fragment>
              <NavigationBar
                setMode={setMode}
                mode={mode}
                onOption={handleBurgerMenu}
                onSearch={handleSearchBar}
                onClear={clearSearchBar}
                onClearSearchBar={handleSideBarCleanSearchBar}
                onShowCloseButton={showCloseButton}
                onCurrent={storedInputSearch}
              />

              <div style={{ margin: 0, padding: 0 }}>
                <Stack
                  direction="row"
                  spacing={2}
                  justifyContent="space-between"
                >
                  {menuOption ? (
                    <SideBar
                      menuOption={menuOption}
                      mode={mode}
                      setMode={setMode}
                      onOption={handleBurgerMenu}
                      onClearSearchBar={handleSideBarCleanSearchBar}
                    />
                  ) : (
                    <SideBar
                      menuOption={menuOption}
                      mode={mode}
                      setMode={setMode}
                      onOption={handleBurgerMenu}
                      onClearSearchBar={handleSideBarCleanSearchBar}
                    />
                  )}

                  <Routes>
                    <Route
                      path="/api/homepage"
                      element={<HomePage onFilterSearch={searchBar} />}
                    />
                    {!isLoading ? (
                      <React.Fragment>{routes}</React.Fragment>
                    ) : null}
                  </Routes>
                </Stack>
              </div>
            </React.Fragment>
          ) : (
            <Box
              flex={5.6}
              p={0}
              style={{
                display: "flex",
                justifyContent: "center",
                paddingBottom: "800px",
                marginBottom: "100%",
              }}
            >
              {spinner}
            </Box>
          )}
        </StyleBox>
      </ThemeProvider>
    </LoginContext.Provider>
  );
}

export default App;
