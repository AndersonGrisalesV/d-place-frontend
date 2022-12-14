import {
  CardContent,
  ImageList,
  ImageListItem,
  Typography,
  Zoom,
} from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LoginContext } from "../../../../../context/login-context";
import { useHttpClient } from "../../../../../hooks/http-hook";

function srcset(image, size, rows = 1, cols = 1) {
  return {
    src: `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format`,
    srcSet: `${image}?w=${size * cols}&h=${
      size * rows
    }&fit=crop&auto=format&dpr=2 2x`,
  };
}

const LatestPhotos = () => {
  const login = useContext(LoginContext);

  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [loadedPlaces, setLoadedPlaces] = useState();

  let navigate = useNavigate();

  useEffect(() => {
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

  let images;
  let count = 0;

  console.log(loadedPlaces);

  const imageLinkHandler = (e, id) => {
    navigate(`/api/places/${id}`);
    login.listItemsNotListed(id);
  };

  return (
    <React.Fragment>
      {!isLoading && loadedPlaces ? (
        <Zoom in={true} style={{ transitionDelay: true ? "200ms" : "0ms" }}>
          <CardContent sx={{ paddingTop: "0px", paddingBottom: "0px" }}>
            <Typography variant="h6" fontWeight={400} mt={2} mb={2}>
              Latest Photos
            </Typography>
            <div>
              <ImageList
                variant="quilted"
                cols={1}
                rowHeight={80}
                gap={5}
                sx={{ width: "330px", height: "250px", paddingRight: "0px" }}
              >
                {loadedPlaces.map((place) => {
                  if (count <= 2) {
                    count++;
                    images = (
                      <ImageListItem
                        key={place._id}
                        id={place._id}
                        cols={count === 1 ? 2 : 1}
                        rows={count === 1 ? 2 : 1}
                        sx={{ borderRadius: "18%", cursor: "pointer" }}
                        onClick={(e) => imageLinkHandler(e, place.id)}
                      >
                        <img
                          style={{ borderRadius: "2.2%" }}
                          {...srcset(
                            place.imageUrl.url,
                            121,
                            place.rows,
                            place.cols
                          )}
                          alt={place.title}
                          loading="lazy"
                        />
                      </ImageListItem>
                    );

                    return images;
                  }
                  return null;
                })}
              </ImageList>
            </div>
          </CardContent>
        </Zoom>
      ) : null}
      {/* //here goes skeleton, inside null */}
    </React.Fragment>
  );
};

export default LatestPhotos;
