import React, { useContext, useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

import { LoginContext } from "../../../../../../context/login-context";

import AvatarComponent from "./AvatarComponent";

import ButtonEdit from "../Buttons/ButtonEdit";

import { CardHeader, styled } from "@mui/material";

//* Styled component for NavLink
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

//* loadedPlaces are places passed by FavoritePlaces or Feed or ProfilePlaces depending on where place is called
const AvatarWrapper = ({ loadedPlaces }) => {
  const login = useContext(LoginContext);

  let navigate = useNavigate();

  //* Function to convert the place's postDate to a human readable date
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

  //* The useEffect runs after the first render , and whenever the values of loadedPlaces and login change.
  //* it checks if login.isLoggedIn is true and if the creatorId._id property of loadedPlaces is equal to login.userId. it means the user owns the place and can edit it
  useEffect(() => {
    if (login.isLoggedIn && loadedPlaces.creatorId._id === login.userId) {
      setIsEdit(true);
    }
  }, [loadedPlaces, login]);

  //* Check if user is loggedIn to redirect user to profile or loginregister
  // login.listItemsNotListed cleans the leftSideBar selected menu Item to none
  const profileNavigationHandler = () => {
    if (login.isLoggedIn) {
      login.listItemsNotListed(`/api/users/profile/${login.userId}`);
      navigate(`/api/users/profile/${login.userId}`);
    } else {
      login.listItemsNotListed();
      navigate("/api/users/loginregister");
    }
  };

  //* Checks if user is loggedIn to change the leftSideBar selected menu depending on user status
  // login.listItemsNotListed cleans the leftSideBar selected menu Item to none
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
      //* Checks if user is loggedIn to redirect accordingly
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
        //* fontSize for different screen sizes
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
        //* fontSize for different screen sizes
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
