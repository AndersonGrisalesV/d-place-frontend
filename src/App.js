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

const StyleBox = styled(Box)(({ theme }) => ({
  background: theme.palette.mode === "dark" ? "#121212" : "#f2f2f2",
}));

function App() {
  const [newNotification, setNewNotification] = useState(false);

  const { token, login, logout, userId } = useAuth();

  let navigate = useNavigate();

  const [searchBar, setSearchBar] = useState();
  const [storedInputSearch, setStoredInputSearch] = useState(null);
  const [showCloseButton, setShowCloseButton] = useState(false);

  const { isLoading, sendRequest } = useHttpClient();
  const [loadedPlaces, setLoadedPlaces] = useState();

  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/homepage`
        );

        setLoadedPlaces(responseData.places.reverse());
      } catch (err) {}
    };
    fetchPlaces();
  }, [sendRequest]);

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

  let filteredPlaces;
  let count = 0;
  let placeSearched;

  const clearSearchBar = (e) => {
    filteredPlaces = (
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
      </>
    );

    if (count === 0) {
      count--;
    }

    e.target.value = "";
    setSearchBar("");
    setShowCloseButton(false);

    navigate(`/api/places/${placeSearched}`);
    if (placeSearched !== undefined) {
      listItemsNotListed(placeSearched);
    }

    if (placeSearched === undefined) {
      setTimeout(() => {
        navigate(-1);
      }, "2000");
    }
  };

  const handlleSideBarCleanSearchBar = () => {
    setSearchBar("");
    if (storedInputSearch) {
      storedInputSearch.target.value = "";
    }
    setShowCloseButton(false);
  };

  const [clearListItems, setClearListItems] = useState(false);
  const [pidCleanListItems, setPidCleanListItems] = useState(null);
  const [homepageListItems, setHomepageListItems] = useState(null);
  const [newAvatar, setNewAvatar] = useState(null);

  const listItemsNotListed = useCallback((pid) => {
    setClearListItems(true);
    if (pid !== "") {
      setPidCleanListItems(pid);
    }
  }, []);

  const listItemsCleanListed = useCallback(() => {
    setClearListItems(false);
    setPidCleanListItems(null);
  }, []);

  const listItemsCleanHomepage = useCallback((index) => {
    setHomepageListItems(index);
  }, []);

  const notification = useCallback(() => {
    setNewNotification((preNewNotification) => !preNewNotification);
  }, []);

  const refreshAvatar = useCallback(() => {
    setNewAvatar((preNewAvatar) => !preNewAvatar);
  }, []);

  const storedData = JSON.parse(localStorage.getItem("userData")) || null;

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

  const [menuOption, setMenuOption] = useState(true);

  const handleBurgerMenu = () => {
    setMenuOption((prevMenuOption) => !prevMenuOption);
  };

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
                onClearSearchBar={handlleSideBarCleanSearchBar}
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
                      onClearSearchBar={handlleSideBarCleanSearchBar}
                    />
                  ) : (
                    <SideBar
                      menuOption={menuOption}
                      mode={mode}
                      setMode={setMode}
                      onOption={handleBurgerMenu}
                      onClearSearchBar={handlleSideBarCleanSearchBar}
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
