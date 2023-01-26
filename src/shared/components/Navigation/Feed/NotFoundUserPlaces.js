import { Box, Card, CardMedia, styled } from "@mui/material";
import React, { useEffect, useState } from "react";

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

const NotFoundUserPlaces = () => {
  const storedData = JSON.parse(localStorage.getItem("userData")) || null;

  const [theme, setTheme] = useState(storedData ? storedData.theme : "light");

  useEffect(() => {
    if (storedData.theme !== theme) {
      setTheme(storedData.theme);
    }
  }, [storedData.theme, theme]);

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
              ? "https://res.cloudinary.com/doa4qiuc2/image/upload/v1674691052/places/NotUserPlacesFound_b9uqml.png"
              : "https://res.cloudinary.com/doa4qiuc2/image/upload/v1674691052/places/NotUserPlacesFoundDarkTheme_s7ufn9.png"
          }
          alt="User do not have own places"
        />
      </Card>
    </BoxStyled>
  );
};

export default NotFoundUserPlaces;
