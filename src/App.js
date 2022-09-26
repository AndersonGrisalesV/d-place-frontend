import React, { useCallback, useState } from "react";
import { Box, createTheme, Stack, ThemeProvider } from "@mui/material";
import NavigationBar from "./shared/components/Navigation/Navbar/NavigationBar";
import styled from "@emotion/styled";
import HomePage from "./pages/HomePage";
import FavoritesPage from "./pages/FavoritesPage";
import SideBar from "./shared/components/Navigation/SideBar/SideBar";
import { Route, Routes } from "react-router-dom";
import AppStyles from "./App.css";
import Profile from "./pages/Profile";
import { LoginContext } from "./shared/context/login-context";
import LoginRegister from "./pages/LoginRegister";

const StyleBox = styled(Box)(({ theme }) => ({
  background: theme.palette.mode === "dark" ? "#121212" : "#f2f2f2",
}));

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const login = useCallback(() => {
    setIsLoggedIn(true);
  }, []);

  const logout = useCallback(() => {
    setIsLoggedIn(false);
  }, []);

  let routes;
  if (isLoggedIn) {
    routes = (
      <React.Fragment>
        <Route path="/" element={<HomePage />} />
        {/* <Route path="/new" element={<NewPlacePage />} /> */}
        <Route path="/favorites" element={<FavoritesPage />} />
        <Route path="/profile" element={<Profile />} />

        <Route path="*" element={<p>Not Found!</p>} />
      </React.Fragment>
    );
  } else {
    routes = (
      <React.Fragment>
        {/* <Route path="/new" element={<NewPlacePage />} /> */}
        <Route path="/loginregister" element={<LoginRegister />} />
        <Route path="*" element={<p>Not found!</p>} />
      </React.Fragment>
    );
  }

  const [mode, setMode] = useState("light");

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
              main: "#f2f2f2",
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

  return (
    <LoginContext.Provider
      value={{ isLoggedIn: isLoggedIn, login: login, logout: logout }}
    >
      <div>
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
            />

            <div style={{ margin: 0, padding: 0 }}>
              <Stack direction="row" spacing={2} justifyContent="space-between">
                {menuOption ? (
                  <SideBar
                    menuOption={menuOption}
                    mode={mode}
                    setMode={setMode}
                    onOption={handleBurgerMenu}
                  />
                ) : (
                  <SideBar
                    menuOption={menuOption}
                    mode={mode}
                    setMode={setMode}
                    onOption={handleBurgerMenu}
                  />
                )}
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  {routes}
                </Routes>
              </Stack>
            </div>
          </StyleBox>
        </ThemeProvider>
      </div>
    </LoginContext.Provider>
  );
}

export default App;
