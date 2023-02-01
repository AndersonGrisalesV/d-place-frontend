import React, { useContext, useEffect, useState } from "react";

import { LoginContext } from "../../../../../context/login-context";

import CloseIcon from "@mui/icons-material/Close";
import SearchIcon from "@mui/icons-material/Search";
import { Box, ListItemIcon, Stack, Zoom } from "@mui/material";
import InputBase from "@mui/material/InputBase";
import { alpha, styled } from "@mui/material/styles";

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

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("ns")]: {
      width: "20ch",
    },
  },
}));

const SearchBar = ({ onSearch, onClear, onShowCloseButton }) => {
  const [erasedDataSearch, setErasedDataSearch] = useState(false);

  const login = useContext(LoginContext);

  useEffect(() => {}, [onShowCloseButton]);

  const handleCloseSearch = () => {
    onSearch(null, "clean");
  };
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
              onKeyPress={(ev) => {
                console.log(`Pressed keyCode ${ev.key}`);
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
