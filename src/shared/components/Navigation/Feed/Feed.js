import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";

import Place from "./places/Place";
import PlaceGetById from "./places/NewPlace/components/PlaceGetById";
import ScrollToTop from "../../../util/ScollTop/ScrollToTop";
import { Box } from "@mui/material";

import { useHttpClient } from "../../../hooks/http-hook";

const Feed = ({ onDetail = false, onMap = false, onFilterSearch = null }) => {
  const params = useParams();
  const { pathname } = useLocation();

  const { pid } = params;

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
          "http://localhost:4000/homepage"
        );

        setLoadedPlaces(responseData.places.reverse());
      } catch (err) {}
    };
    fetchPlaces();
  }, [sendRequest]);

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

  return (
    <Box flex={4} p={2} style={{ marginBottom: "100%" }}>
      <ScrollToTop pathname={pathname}>
        {onDetail && !onMap ? (
          <React.Fragment>
            {/* <Place />
          <br /> */}
          </React.Fragment>
        ) : onDetail && onMap ? (
          <PlaceGetById onMap={true} onShowComments={onDetail} placeId={pid} />
        ) : (
          <React.Fragment>
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
                      places
                    ) : (
                      <React.Fragment>
                        {dataStatus ? <p>There are not places to show</p> : ""}
                      </React.Fragment>
                    )}
                  </React.Fragment>
                ) : null}
              </React.Fragment>
            )}
          </React.Fragment>
        )}
      </ScrollToTop>
    </Box>
  );
};

export default Feed;
