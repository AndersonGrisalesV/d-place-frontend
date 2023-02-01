import React, { useContext, useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

import { LoginContext } from "../../../../../../context/login-context";

import AvatarComponent from "./AvatarComponent";

import ButtonEdit from "../Buttons/ButtonEdit";

import { CardHeader, styled } from "@mui/material";

const StyleNavLink = styled(NavLink)(({ theme }) => ({
  textDecoration: "none",
  color:
    theme.palette.mode === "dark" ? "rgba(255, 255, 255, 0.7)" : "#000000de",
  fontWeight: "500",
  "&:hover": {
    backgroundColor: "transparent",
    color: "#9b9b9bc7",
  },
}));

const AvatarWrapper = ({ loadedPlaces }) => {
  const login = useContext(LoginContext);

  let navigate = useNavigate();

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
        month = "April";
      }
      if (month == "05") {
        month = "May";
      }
      if (month == "06") {
        month = "June";
      }
      if (month == "07") {
        month = "July";
      }
      if (month == "08") {
        month = "August";
      }
      if (month == "09") {
        month = "September";
      }
      if (month == "10") {
        month = "October";
      }
      if (month == "11") {
        month = "November";
      }
      if (month == "12") {
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

  const [isEdit, setIsEdit] = useState(false);

  useEffect(() => {
    if (login.isLoggedIn && loadedPlaces.creatorId._id === login.userId) {
      setIsEdit(true);
    }
  }, [loadedPlaces, login]);

  const profileNavigationHandler = () => {
    if (login.isLoggedIn) {
      login.listItemsNotListed(`/api/users/profile/${login.userId}`);
      navigate(`/api/users/profile/${login.userId}`);
    } else {
      login.listItemsNotListed();
      navigate("/api/users/loginregister");
    }
  };

  const handleProfileVisit = () => {
    if (login.isLoggedIn) {
      login.listItemsNotListed(`/api/users/profile/${login.userId}`);
    } else {
      login.listItemsNotListed();
    }
  };

  return (
    <CardHeader
      avatar={
        <AvatarComponent
          loadedPlaces={loadedPlaces}
          onProfileNavigation={profileNavigationHandler}
        />
      }
      action={
        login.isLoggedIn && isEdit ? (
          <ButtonEdit loadedPlaces={loadedPlaces} />
        ) : (
          ""
        )
      }
      title={
        <StyleNavLink
          to={
            login.isLoggedIn
              ? `/api/users/profile/${login.userId}`
              : `/api/users/loginregister`
          }
          onClick={handleProfileVisit}
        >
          {loadedPlaces.creatorId.name}
        </StyleNavLink>
      }
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
