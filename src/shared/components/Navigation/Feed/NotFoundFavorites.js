import React, { useEffect, useState } from "react";

import { Box, Card, CardMedia, styled } from "@mui/material";

const BoxStyled = styled(Box)(() => ({
  marginTop: "12%",
  backgroundImage: "none",
  backgroundColor: "transparent",
  boxShadow: "transparent",
  display: "flex",
  justifyContent: "center",
  height: {
    ns: "514px",
    mns: "514px",
    msc: "514px",
    ms: "514px",
    lgs: "514px",
  },
  maxWidth: {
    ns: "800px",
    msc: "800px",
    mns: "800px",
    ms: "800px",
    lgs: "800px",
  },
}));

const NotFoundFavorites = () => {
  const storedData = JSON.parse(localStorage.getItem("userData")) || null;

  const [theme, setTheme] = useState(storedData ? storedData.theme : "light");

  useEffect(() => {
    if (storedData) {
      if (storedData.theme !== theme) {
        setTheme(storedData.theme);
      }
    }
  }, [storedData, theme]);

  return (
    <BoxStyled>
      <Card
        sx={{
          backgroundColor: "transparent",
          boxShadow: "none",
          backgroundImage: "none",
          borderRadius: "18px",
          paddingBottom: "8px",
          maxWidth: {
            sps: "200px",
            ps: "285px",
            ts: "350px",
            sls: "400px",
            sms: "618px",
            sc: "618px",
            nsc: "618px",
            ns: "618px",
            msc: "618px",
            mns: "618px",
            ms: "618px",
            lgs: "618px",
          },
        }}
      >
        <CardMedia
          sx={{ height: "100%", objectFit: "contain" }}
          component="img"
          height="194"
          image={
            theme === "light"
              ? "https://res.cloudinary.com/doa4qiuc2/image/upload/v1674765035/places/NotFoundFavoritePlacesLightTheme_l6rn4g.png"
              : "https://res.cloudinary.com/doa4qiuc2/image/upload/v1674765034/places/NotFoundFavoritePlacesDarkTheme_zvym3t.png"
          }
          alt="User do not have favorite places"
        />
      </Card>
    </BoxStyled>
  );
};

export default NotFoundFavorites;
