import React, { useContext } from "react";

import AvatarComponent from "./AvatarComponent";
import ButtonEdit from "../Buttons/ButtonEdit";
import { CardHeader } from "@mui/material";
import { LoginContext } from "../../../../../../context/login-context";

const AvatarWrapper = ({ loadedPlaces }) => {
  const login = useContext(LoginContext);

  const addDays = (date) => {
    let year;
    let month;
    let day;

    const monthName = (month) => {
      if (month == "01") {
        month = "January";
      }
      if (month == "02") {
        month = "February";
      }
      if (month == "03") {
        month = "March";
      }
      if (month == "04") {
        month = "March";
      }
      if (month == "05") {
        month = "June";
      }
      if (month == "06") {
        month = "July";
      }
      if (month == "07") {
        month = "August";
      }
      if (month == "08") {
        month = "September";
      }
      if (month == "09") {
        month = "October";
      }
      if (month == "10") {
        month = "November";
      }
      if (month == "11") {
        month = "December";
      }

      return month;
    };

    month = date.substring(5, 7);
    month = monthName(month);
    day = date.substring(8, 10);
    year = date.substring(0, 4);

    return { month, day, year };
  };

  let fetchedDate = addDays(loadedPlaces.postDate);

  return (
    <CardHeader
      avatar={<AvatarComponent loadedPlaces={loadedPlaces} />}
      action={
        login.isLoggedIn ? <ButtonEdit loadedPlaces={loadedPlaces} /> : ""
      }
      title={loadedPlaces.creatorId.name}
      subheader={`${fetchedDate.month} ${fetchedDate.day}, ${fetchedDate.year}`}
      titleTypographyProps={{
        fontWeight: "500",
        fontSize: {
          sps: "10px",
          ps: "12px",
          ts: "12px",
          sls: "13px",
          sms: "14px",
          sc: "14px",
          nsc: "14px",
          ns: "14px",
          msc: "14px",
          mns: "14px",
          ms: "14px",
          lgs: "14px",
        },
      }}
      subheaderTypographyProps={{
        fontSize: {
          sps: "10px",
          ps: "12px",
          ts: "12px",
          sls: "13px",
          sms: "14px",
          sc: "14px",
          nsc: "14px",
          ns: "14px",
          msc: "14px",
          mns: "14px",
          ms: "14px",
          lgs: "14px",
        },
      }}
    />
  );
};

export default AvatarWrapper;
