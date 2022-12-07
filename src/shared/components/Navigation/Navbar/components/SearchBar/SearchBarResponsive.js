import React, { useEffect, useState } from "react";
import { Box, Stack, Zoom } from "@mui/material";
import { styled, alpha } from "@mui/material/styles";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import InputBase from "@mui/material/InputBase";

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
  [theme.breakpoints.up("sms")]: {
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

const SearchBarResponsive = ({ onSearch, onClear, onShowCloseButton }) => {
  const [erasedDataSearch, setErasedDataSearch] = useState(false);
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
            ns: "none",
            msc: "none",
            mns: "none",
            ms: "none",
            lgs: "none",
          },
        }}
      >
        <Search>
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
              // sx={{ margin: "0px", padding: "0px" }}
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
            {onShowCloseButton && !erasedDataSearch ? (
              <CloseIcon
                onClick={handleCloseSearch}
                sx={{ cursor: "pointer" }}
              />
            ) : null}
          </Stack>
        </Search>
      </Box>
    </Zoom>
  );
};

export default SearchBarResponsive;
