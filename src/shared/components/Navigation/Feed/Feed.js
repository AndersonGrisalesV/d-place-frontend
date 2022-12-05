import React, { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

import Place from "./places/Place";
import PlaceGetById from "./places/NewPlace/components/PlaceGetById";
import ScrollToTop from "../../../util/ScollTop/ScrollToTop";
import { Box } from "@mui/material";

import { useHttpClient } from "../../../hooks/http-hook";

import { LoginContext } from "../../../context/login-context";

const Feed = ({ onDetail = false, onMap = false, onFilterSearch = null }) => {
  const login = useContext(LoginContext);
  const params = useParams();
  const { pathname } = useLocation();

  const { pid } = params;

  const [loadedPlaces, setLoadedPlaces] = useState();
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [dataStatus, setDataStatus] = useState(false);
  const [emptySearch, setEmptySearch] = useState(false);

  let navigate = useNavigate();

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

  useEffect(() => {
    console.log(onFilterSearch);
    // if (onFilterSearch === "") {
    //   setEmptySearch(true);
    // }
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
              console.log(filtered);
              return filtered;
            })}
          </React.Fragment>
        )}
      </>
    );
  }

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
              filteredPlaces
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
