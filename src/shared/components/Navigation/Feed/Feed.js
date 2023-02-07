import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";

import { useHttpClient } from "../../../hooks/http-hook";

import Place from "./places/Place";
import PlaceGetById from "./places/NewPlace/components/PlaceGetById";
import ScrollToTop from "../../../util/ScollTop/ScrollToTop";
import LoadingSpinner from "../../LoadingSpinner/LoadingSpinner";
import NotFoundPlaces from "./NotFoundPlaces";

import { Box } from "@mui/material";

//* onDetail is a boolean that is passed down by PlaceDetail page
//* onMap is a boolean that is passed down by PlaceDetail page
//* onFilterSearch is a boolean that indicates a state for when the user searches a place on App
const Feed = ({ onDetail = false, onMap = false, onFilterSearch = null }) => {
  const params = useParams();
  const { pathname } = useLocation();

  const { pid } = params;

  const [loadedPlaces, setLoadedPlaces] = useState();
  const { isLoading, sendRequest } = useHttpClient();
  const [dataStatus, setDataStatus] = useState(false);
  // State variables to track the display of the counter and empty search message
  const [emptySearch, setEmptySearch] = useState(false);
  const [counter, setCounter] = useState(false);

  // useEffect to make an API call to the backend to fetch all places
  useEffect(() => {
    setDataStatus(true);
    const fetchPlaces = async () => {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/homepage`
        );

        setLoadedPlaces(responseData.places.reverse());
      } catch (err) {}
    };
    fetchPlaces();
  }, [sendRequest]);

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

  // Loads and sends the places to be shown
  let places;
  if (loadedPlaces && dataStatus) {
    places = (
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

  //* A spinner contained within a long margin to keep light/dark themes consistent (if this is not added when a page is loading the background will be shown incorrectly)
  let spinner = "";
  if (isLoading) {
    spinner = (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          marginBottom: "100%",
          paddingBottom: "800px",
        }}
      >
        <LoadingSpinner asOverlay />
      </Box>
    );
  }

  return (
    <Box
      flex={4}
      p={2}
      style={{
        marginBottom: "100%",
      }}
    >
      {isLoading ? (
        spinner
      ) : (
        <ScrollToTop pathname={pathname}>
          {onDetail && onMap ? (
            <PlaceGetById
              onMap={true}
              onShowComments={onDetail}
              placeId={pid}
            />
          ) : (
            <React.Fragment>
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
                      {loadedPlaces && loadedPlaces.length > 0 ? (
                        places
                      ) : (
                        <React.Fragment>
                          {dataStatus ? <NotFoundPlaces /> : null}
                        </React.Fragment>
                      )}
                    </React.Fragment>
                  ) : null}
                </React.Fragment>
              )}
            </React.Fragment>
          )}
        </ScrollToTop>
      )}
    </Box>
  );
};

export default Feed;
