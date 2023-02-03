import React from "react";

import CardWrapper from "../../Navigation/Feed/places/components/CardWrapper";

import { Box, Zoom } from "@mui/material";

// Wraps up the CardContent (entire form ) on LoginRegisterPage
const CardWrapperLogin = (props) => {
  return (
    <Box flex={8}>
      <Zoom in={true} style={{ transitionDelay: true ? "200ms" : "0ms" }}>
        <Box
          sx={{
            marginTop: "30px",
            marginBottom: "100%",
            // marginLeft for different screen sizes
            // onArrangesize comes from LoginRegister, it's needed to correct
            // marginLeft on the page's form becuase it is a smaler card(wrapper) than place's card
            marginLeft: {
              sps: "-22px",
              ps: props.onArrangesize ? "-29px" : "-20px",
              ts: "-36px",
              sls: props.onArrangesize ? "-14px" : "-13px",
              sms: "-18px",
              sc: "-24px",
              nsc: props.onArrangesize ? "-15px" : "10px",
              ns: props.onArrangesize ? "88px" : "27px",
              msc: "11px",
              mns: "11px",
              ms: "53px",
              lgs: "-238px",
            },
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {/* The CardWrapper component needs the "bgcolor" props for it to display 
      the proper background color on LoginRegisterPage */}
          <CardWrapper
            bgcolor={"backgroundColor"}
            sx={{ marginRight: "105px" }}
          >
            {props.children}
          </CardWrapper>
        </Box>
      </Zoom>
    </Box>
  );
};

export default CardWrapperLogin;
