import React, { useState } from "react";

import CloseIcon from "@mui/icons-material/Close";
import SearchIcon from "@mui/icons-material/Search";
import { Box, ListItemIcon, Stack, Zoom } from "@mui/material";
import InputBase from "@mui/material/InputBase";
import { alpha, styled } from "@mui/material/styles";

//* Styled component for SearchBar
const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sls")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));
//* Styled component for SearchIconWrapper
const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));
//* Styled component for StyledInputBase
const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("ns")]: {
      width: "20ch",
    },
  },
}));

//* onSearch is a pointer to a function that handles the funcitonality in the searchbar on NavigationBar > App
//* onClear is a pointer to a function that handles the funcitonality in to clear the searchBar on NavigationBar > App
//* showCloseButton is a boolean that indicates when is neccesary toi show the close button on the serach bar
const SearchBar = ({ onSearch, onClear, onShowCloseButton }) => {
  const [erasedDataSearch, setErasedDataSearch] = useState(false);

  // handleCloseSearch function to trigger onSearch and clean the searchBar on App
  const handleCloseSearch = () => {
    onSearch(null, "clean");
  };

  //  changeHandler funciton to sheck when the searchBar is empty to set a state and not show the close button on the searchBar
  const changeHandler = (e) => {
    if (e.target.value === "") {
      setErasedDataSearch(true);
    } else {
      setErasedDataSearch(false);
    }
  };

  return (
    <Zoom in={true} style={{ transitionDelay: true ? "200ms" : "0ms" }}>
      <Box
        display="flex"
        width={"100%"}
        alignItems="center"
        justifyContent="center"
        sx={{
          //* display for different screen sizes
          display: {
            sps: "flex",
            ps: "flex",
            ts: "flex",
            sls: "flex",
            sms: "flex",
            sc: "flex",
            nsc: "flex",
            ns: "flex",
            msc: "flex",
            mns: "flex",
            ms: "flex",
            lgs: "flex",
          },
        }}
      >
        <Search
          sx={{
            minwidth: "40%",
          }}
        >
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
          <Stack
            spacing={0}
            sx={{
              display: "flex",
              alignItems: "center",
              flexDirection: "row",
            }}
          >
            <StyledInputBase
              placeholder="Search"
              onChange={(e) => {
                onSearch(e, null);
                changeHandler(e);
              }}
              // Checks if enter is pressed on the searchBar and triggers the onClear funciton to clear the searchBar
              onKeyPress={(ev) => {
                if (ev.key === "Enter") {
                  onClear(ev);
                  ev.preventDefault();
                }
              }}
            />
            <ListItemIcon sx={{ minWidth: "37px" }}>
              {onShowCloseButton && !erasedDataSearch ? (
                <CloseIcon
                  onClick={handleCloseSearch}
                  sx={{ cursor: "pointer", color: "#fff" }}
                />
              ) : null}
            </ListItemIcon>
          </Stack>
        </Search>
      </Box>
    </Zoom>
  );
};

export default SearchBar;
