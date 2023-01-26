import React, { useCallback, useEffect, useState } from "react";
import { Box, createTheme, Stack, ThemeProvider } from "@mui/material";
import NavigationBar from "./shared/components/Navigation/Navbar/NavigationBar";
import styled from "@emotion/styled";
import HomePage from "./pages/HomePage";
import FavoritesPage from "./pages/FavoritesPage";
import SideBar from "./shared/components/Navigation/SideBar/SideBar";
import { Route, Routes, useNavigate } from "react-router-dom";
import AppStyles from "./App.css";
import MyPlaces from "./pages/MyPlaces";
import { LoginContext } from "./shared/context/login-context";
import LoginRegister from "./pages/LoginRegister";
import PlaceDetail from "./pages/PlaceDetail";
import NewPlace from "./pages/NewPlace";
import EditPlace from "./pages/EditPlace";
import { useHttpClient } from "./shared/hooks/http-hook";
import EditProfile from "./shared/components/LoginRegister/EditProfile/EditProfile";
import { useAuth } from "./shared/hooks/auth-hook";

const StyleBox = styled(Box)(({ theme }) => ({
  background: theme.palette.mode === "dark" ? "#121212" : "#f2f2f2",
}));

function App() {
  // const [token, setToken] = useState(false);
  // const [userId, setUserId] = useState(false);

  const [newNotification, setNewNotification] = useState(false);

  const { token, login, logout, userId } = useAuth();

  let navigate = useNavigate();

  const [searchBar, setSearchBar] = useState();
  const [storedInputSearch, setStoredInputSearch] = useState(null);
  const [showCloseButton, setShowCloseButton] = useState(false);

  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [loadedPlaces, setLoadedPlaces] = useState();

  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        const responseData = await sendRequest(
          "http://localhost:4000/homepage"
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
    // console.log("here" + e.target.value);
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
    // navigate("/homepage");
    setSearchBar("");
    if (storedInputSearch) {
      storedInputSearch.target.value = "";
    }
    setShowCloseButton(false);

    // setClearSBar(true);
  };

  // const login = useCallback((uid, token) => {
  //   setToken(token);
  //   setUserId(uid);

  //   setNewNotification(true);
  // }, []);

  // const createAccount = useCallback((uid, token) => {
  //   setToken(token);
  //   setUserId(uid);
  //   setNewNotification(true);
  // }, []);

  // const logout = useCallback(() => {
  //   setToken(null);
  //   setUserId(null);
  // }, []);

  // const notification = useCallback(() => {
  //   setNewNotification((preNewNotification) => !preNewNotification);
  // }, []);

  const [clearListItems, setClearListItems] = useState(false);
  const [pidCleanListItems, setPidCleanListItems] = useState(null);
  const [homepageListItems, setHomepageListItems] = useState(null);

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

  // useEffect(() => {
  //   const fetchPlaces = async () => {
  //     try {
  //       const responseData = await sendRequest(
  //         `http://localhost:4000/api/users/profile/${userId}`
  //       );

  //       setMode(responseData.user.themePreference);
  //     } catch (err) {}
  //   };
  //   fetchPlaces();
  // }, [sendRequest, userId]);

  // const [themeUser, setThemeUser] = useState(false);

  // const themeUserHandler = useCallback((theme) => {
  //   setThemeUser(theme);
  // }, []);

  const storedData = JSON.parse(localStorage.getItem("userData")) || null;

  const [mode, setMode] = useState(storedData ? storedData.theme : "light");

  let routes;
  if (token) {
    routes = (
      <React.Fragment>
        <Route
          path="/homepage"
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
        <Route path="*" element={<p>Not Found!</p>} />
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
        <Route path="*" element={<p>Not found!</p>} />
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

  // useEffect(() => {
  //   if (login.isLoggedIn) {
  //     const updateTheme = async () => {
  //       try {
  //         await sendRequest(
  //           `http://localhost:4000/api/users/updatetheme/${login.userId}`,
  //           "PATCH",
  //           JSON.stringify({
  //             theme: mode === "light" ? "dark" : "light",
  //           }),
  //           {
  //             "Content-Type": "Application/json",
  //           }
  //         );
  //       } catch (err) {}
  //     };
  //     updateTheme();
  //   }
  // }, [mode, login.isLoggedIn, sendRequest, login.userId]);

  // const themeUpdate = useCallback(() => {
  //   updateTheme();
  // }, []);

  const [menuOption, setMenuOption] = useState(true);

  const handleBurgerMenu = () => {
    setMenuOption((prevMenuOption) => !prevMenuOption);
  };

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
        listItemsNotListed: listItemsNotListed,
        listItemsCleanListed: listItemsCleanListed,
        pidCleanListItems: pidCleanListItems,
        clearListItems: clearListItems,
        homepageListItems: homepageListItems,
        listItemsCleanHomepage: listItemsCleanHomepage,
      }}
    >
      {/* <GoBackRefreshMenu> */}

      <ThemeProvider theme={darkThemeTypographyAndBreakpoints}>
        <StyleBox
          className={AppStyles}
          bgcolor={"background.main"}
          sx={{ fontFamily: "Noto Sans" }}
          color={"text.primary"}
          style={{ margin: 0, padding: 0 }}
        >
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
            <Stack direction="row" spacing={2} justifyContent="space-between">
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
              {!isLoading ? (
                <Routes>
                  <Route
                    path="/homepage"
                    element={<HomePage onFilterSearch={searchBar} />}
                  />
                  {routes}
                </Routes>
              ) : null}
            </Stack>
          </div>
        </StyleBox>
      </ThemeProvider>

      {/* </GoBackRefreshMenu> */}
    </LoginContext.Provider>
  );
}

export default App;
