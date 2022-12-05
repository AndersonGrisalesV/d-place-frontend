import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";

import { Box } from "@mui/material";
import ScrollToTop from "../../../util/ScollTop/ScrollToTop";
import Place from "./places/Place";

import { useHttpClient } from "../../../hooks/http-hook";

const FavoritePlaces = ({ onFilterSearch = null }) => {
  const params = useParams();
  const { pathname } = useLocation();

  const { uid } = params;

  const [loadedPlaces, setLoadedPlaces] = useState();
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [dataStatus, setDataStatus] = useState(false);

  useEffect(() => {
    setDataStatus(true);
    const fetchPlaces = async () => {
      try {
        const responseData = await sendRequest(
          `http://localhost:4000/api/users/favorites/${uid}`
        );

        setLoadedPlaces(responseData.places);
      } catch (err) {}
    };
    fetchPlaces();
  }, [sendRequest, uid]);

  useEffect(() => {
    console.log(onFilterSearch);
  }, [onFilterSearch]);

  let filteredPlaces;

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
                filtered = (
                  <React.Fragment key={place._id}>
                    <Place
                      loadedPlaces={place}
                      key={place._id}
                      id={place._id}
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
  }

  let placesFavorites;
  if (loadedPlaces && dataStatus) {
    placesFavorites = (
      <>
        {!isLoading && loadedPlaces && (
          <React.Fragment>
            {loadedPlaces.map((place) => (
              <React.Fragment key={place._id}>
                <Place loadedPlaces={place} key={place._id} id={place._id} />
                <br />
              </React.Fragment>
            ))}
          </React.Fragment>
        )}
      </>
    );
  }

  return (
    <Box flex={4} p={2} style={{ marginBottom: "100%" }}>
      <ScrollToTop pathname={pathname}>
        {onFilterSearch ? (
          filteredPlaces
        ) : (
          <React.Fragment>
            {!isLoading ? (
              <React.Fragment>
                {loadedPlaces ? (
                  placesFavorites
                ) : (
                  <React.Fragment>
                    {dataStatus ? <p>You don't have favorite places</p> : ""}
                  </React.Fragment>
                )}
              </React.Fragment>
            ) : null}
          </React.Fragment>
        )}
      </ScrollToTop>
    </Box>
  );
};

export default FavoritePlaces;
