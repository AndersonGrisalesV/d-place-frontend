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

const ProfilePlaces = ({ onFilterSearch = null }) => {
  const login = useContext(LoginContext);
  const params = useParams();
  const { pathname } = useLocation();

  const { uid } = params;

  const [loadedPlaces, setLoadedPlaces] = useState();
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [dataStatus, setDataStatus] = useState(false);
  const [emptySearch, setEmptySearch] = useState(false);
  const [counter, setCounter] = useState(false);

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

  useEffect(() => {}, [onFilterSearch]);

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
    if (count === 0) {
      count--;
    }
  }

  useEffect(() => {
    if (count < 0) {
      setCounter(true);
    } else {
      setCounter(false);
    }
    if (counter && count < 0) {
      setEmptySearch(true);
    } else {
      setEmptySearch(false);
    }
  }, [onFilterSearch, counter, count]);

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
