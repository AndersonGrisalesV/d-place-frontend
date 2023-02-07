import React, { useEffect, useState } from "react";

import { Box, Card, CardMedia, styled } from "@mui/material";

const BoxStyled = styled(Box)(() => ({
  marginTop: "12%",
  backgroundImage: "none",
  backgroundColor: "transparent",
  boxShadow: "transparent",
  display: "flex",
  justifyContent: "center",
  //* height for different screen sizes
  height: {
    ns: "514px",
    mns: "514px",
    msc: "514px",
    ms: "514px",
    lgs: "514px",
  },
  //* maxWidth for different screen sizes
  maxWidth: {
    ns: "800px",
    msc: "800px",
    mns: "800px",
    ms: "800px",
    lgs: "800px",
  },
}));

const NotFoundGeneral = () => {
  // Retrieves the stored data from localStorage using the key "userData",
  // and uses the JSON.parse method to parse the string value stored in the local storage
  // into a JavaScript object.
  const storedData = JSON.parse(localStorage.getItem("userData")) || null;

  //* Changes the theme according to the information found in storedData
  const [theme, setTheme] = useState(storedData ? storedData.theme : "light");

  //* useEffect hook monitors and chanes the theme depending on the info in storedData
  useEffect(() => {
    if (storedData) {
      if (storedData.theme !== theme) {
        setTheme(storedData.theme);
      }
    }
  }, [storedData, theme]);

  return (
    <Box flex={5.6} p={0} style={{ marginBottom: "100%" }}>
      <BoxStyled>
        <Card
          sx={{
            backgroundColor: "transparent",
            boxShadow: "none",
            backgroundImage: "none",
            borderRadius: "18px",
            paddingBottom: "8px",
            //* maxWidth for different screen sizes
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
                ? "https://res.cloudinary.com/doa4qiuc2/image/upload/v1674765510/places/NotFoundLightTheme_or3vfh.png"
                : "https://res.cloudinary.com/doa4qiuc2/image/upload/v1674765510/places/NotFoundDarkTheme_gm5n7g.png"
            }
            alt="Page not found"
          />
        </Card>
      </BoxStyled>
    </Box>
  );
};

export default NotFoundGeneral;
