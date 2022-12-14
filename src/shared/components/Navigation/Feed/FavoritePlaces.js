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
  const [emptySearch, setEmptySearch] = useState(false);
  const [counter, setCounter] = useState(false);

  useEffect(() => {
    setDataStatus(true);
    const fetchPlaces = async () => {
      try {
        const responseData = await sendRequest(
          `http://localhost:4000/api/users/favorites/${uid}`
        );

        setLoadedPlaces(responseData.places.reverse());
      } catch (err) {}
    };
    fetchPlaces();
  }, [sendRequest, uid]);

  useEffect(() => {
    console.log(onFilterSearch);
  }, [onFilterSearch]);

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
      console.log("empty");
    } else {
      setEmptySearch(false);
    }
  }, [onFilterSearch, counter, count]);

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
          <React.Fragment>
            {filteredPlaces && !emptySearch ? (
              filteredPlaces
            ) : (
              <p>No places found!</p>
            )}
          </React.Fragment>
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
