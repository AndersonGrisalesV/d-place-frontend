import React, { useContext, useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";

import { LoginContext } from "../../../context/login-context";

import { useHttpClient } from "../../../hooks/http-hook";

import Place from "./places/Place";
import ScrollToTop from "../../../util/ScollTop/ScrollToTop";
import LoadingSpinner from "../../LoadingSpinner/LoadingSpinner";
import NotFoundPlaces from "./NotFoundPlaces";
import NotFoundUserPlaces from "./NotFoundUserPlaces";

import { Box } from "@mui/material";

//* onFilterSearch is a boolean that indicates a state for when the user searches a place on App
const ProfilePlaces = ({ onFilterSearch = null }) => {
  const login = useContext(LoginContext);
  const params = useParams();
  const { pathname } = useLocation();

  const { uid } = params;

  const [loadedPlaces, setLoadedPlaces] = useState();
  const { isLoading, sendRequest } = useHttpClient();
  const [dataStatus, setDataStatus] = useState(false);
  // State variables to track the display of the counter and empty search message
  const [emptySearch, setEmptySearch] = useState(false);
  const [counter, setCounter] = useState(false);

  // useEffect to make an API call to the backend to fetch the user places for the loggedIn user
  useEffect(() => {
    setDataStatus(true);
    const fetchPlaces = async () => {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/users/myplaces/${uid}`,
          "GET",
          null,
          {
            Authorization: "Bearer " + login.token,
          }
        );

        setLoadedPlaces(responseData.places.reverse());
      } catch (err) {}
    };
    fetchPlaces();
  }, [sendRequest, uid, login.token]);

  // Filtering the places based on user's search input
  let filteredPlaces;
  let count = 0;
  if (onFilterSearch) {
    filteredPlaces = (
      <>
        {!isLoading && loadedPlaces && (
          <React.Fragment>
            {loadedPlaces.map((place) => {
              let filtered;
              if (
                place.title.toLowerCase().includes(onFilterSearch.toLowerCase())
              ) {
                count++;
                filtered = (
                  <React.Fragment key={place._id}>
                    <Place
                      loadedPlaces={place}
                      key={place._id}
                      id={place._id}
                      onArrangeBigSize={true}
                    />
                    <br />
                  </React.Fragment>
                );
              }
              return filtered;
            })}
          </React.Fragment>
        )}
      </>
    );
    // If no matches are found, decreasing the count by 1
    if (count === 0) {
      count--;
    }
  }

  //* useEffect to control the display of counter and empty search message
  //* When the value of onFilterSearch or count changes, the useEffect hook will re-run and update the state accordingly.
  useEffect(() => {
    if (count < 0) {
      setCounter(true);
    } else {
      setCounter(false);
    }
    //* Checks if user's search is empty or not
    if (counter && count < 0) {
      setEmptySearch(true);
    } else {
      setEmptySearch(false);
    }
  }, [onFilterSearch, counter, count]);

  // Loads and sends the FavoritePlaces to be shown
  let placesProfile;
  if (loadedPlaces && dataStatus) {
    placesProfile = (
      <>
        {!isLoading && loadedPlaces && (
          <React.Fragment>
            {loadedPlaces.map((place) => (
              <React.Fragment key={place._id}>
                <Place
                  loadedPlaces={place}
                  key={place._id}
                  id={place._id}
                  onArrangeBigSize={true}
                />
                <br />
              </React.Fragment>
            ))}
          </React.Fragment>
        )}
      </>
    );
  }

  //* A spinner contained within a long margin to keep light/dark themes consistent (if this is not added when a page is loading the background will be shown incorrectly)
  let spinner = "";
  if (isLoading) {
    spinner = (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          marginTop: "14px",
          marginBottom: "100%",
        }}
      >
        <LoadingSpinner asOverlay />
      </Box>
    );
  }

  return (
    <Box flex={5.6} p={0} style={{ marginBottom: "100%" }}>
      {isLoading ? (
        spinner
      ) : (
        <ScrollToTop pathname={pathname}>
          {onFilterSearch ? (
            <React.Fragment>
              {filteredPlaces && !emptySearch ? (
                filteredPlaces
              ) : (
                <NotFoundPlaces />
              )}
            </React.Fragment>
          ) : (
            <React.Fragment>
              {!isLoading ? (
                <React.Fragment>
                  {loadedPlaces ? (
                    placesProfile
                  ) : (
                    <React.Fragment>
                      {dataStatus ? <NotFoundUserPlaces /> : null}
                    </React.Fragment>
                  )}
                </React.Fragment>
              ) : null}
            </React.Fragment>
          )}
        </ScrollToTop>
      )}
    </Box>
  );
};

export default ProfilePlaces;
