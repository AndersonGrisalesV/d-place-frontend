import React, { useContext, useEffect, useState } from "react";
import { Box } from "@mui/material";
import { useLocation, useParams } from "react-router-dom";
import Place from "./places/Place";
import ScrollToTop from "../../../util/ScollTop/ScrollToTop";
import { useHttpClient } from "../../../hooks/http-hook";
import PlaceGetById from "./places/NewPlace/components/PlaceGetById";
import { LoginContext } from "../../../context/login-context";

// const DUMMY_PLACES = [
//   {
//     placeId: "p1",
//     title: "Empire State Building",
//     description:
//       "One of the most famous skycrapers in the world, I had never seen something as impressive as this I will probably remember it until I die.",
//     imageUrl:
//       "https://www.esbnyc.com/sites/default/files/2020-01/thumbnail5M2VW4ZF.jpg",
//     address: "20 W 24th St, New York, NY 10001",
//     favorite: false,
//     location: {
//       lat: 40.7484405,
//       lng: -73.9878584,
//     },
//     postDate: "September 6, 2022",
//     creatorId: "u1",
//     creatorName: "Anderson",
//     creatorImageUrl:
//       "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSzHQv_th9wq3ivQ1CVk7UZRxhbPq64oQrg5Q&usqp=CAU",
//   },
//   {
//     placeId: "p2",
//     title: "Bleach",
//     description:
//       "The number 1 the GOAT is back, one of the big three this series carries one of the biggest fandoms in anime Today, definetly the best of them all.",
//     imageUrl:
//       "https://areajugones.sport.es/wp-content/uploads/2022/09/bleach-tybw-akksakls.jpg",
//     address: "3-chōme-20 Horifune, Kita City, Tokyo 114-0004, Japan",
//     favorite: true,
//     location: {
//       lat: 35.7538209,
//       lng: 139.748037,
//     },
//     postDate: "October 9, 2022",
//     creatorId: "u2",
//     creatorName: "The bleach himself",
//     creatorImageUrl: "",
//   },
//   {
//     placeId: "p3",
//     title: "France",
//     description:
//       "Known as the land of liberty, equality, fraternity, A legacy of the Age of Enlightenment, the motto 'Liberté, Egalité, Fraternité' first appeared during the French Revolution",
//     imageUrl:
//       "https://i.insider.com/58d919eaf2d0331b008b4bbd?width=1000&format=jpeg&auto=webp",
//     address: "Champ de Mars, 5 Av. Anatole France, 75007 Paris, France",
//     favorite: false,
//     location: {
//       lat: 48.8804446,
//       lng: 2.2017446,
//     },
//     postDate: "October 14, 2022",
//     creatorId: "u1",
//     creatorName: "Anderson",
//     creatorImageUrl:
//       "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSzHQv_th9wq3ivQ1CVk7UZRxhbPq64oQrg5Q&usqp=CAU",
//   },
// ];

const Feed = ({ onDetail = false, onMap = false, onProfile = false }) => {
  const login = useContext(LoginContext);
  const params = useParams();
  const { pathname } = useLocation();

  const { pid } = params;
  // console.log(placeId);

  const [loadedPlaces, setLoadedPlaces] = useState();
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        const responseData = await sendRequest(
          "http://localhost:4000/homepage"
        );

        setLoadedPlaces(responseData.places.reverse());
        console.log(responseData.places);
      } catch (err) {}
    };
    fetchPlaces();
  }, [sendRequest]);

  let placesProfileSearching;

  if (onProfile) {
    placesProfileSearching = (
      <>
        {!isLoading && loadedPlaces && (
          <React.Fragment>
            {loadedPlaces.map((place) => {
              let userPlaces;
              if (place.creatorId._id === login.userId) {
                userPlaces = (
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
              return userPlaces;
            })}
          </React.Fragment>
        )}
      </>
    );
  }

  let places;

  if (!onProfile) {
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
          <PlaceGetById
            onMap={true}
            onShowComments={onDetail}
            placeId={pid}
            //loadedPlaces={filterLoadedPlaces[0]}
            //id={filterLoadedPlaces[0]._id}
            //key={filterLoadedPlaces[0]._id}
          />
        ) : (
          <React.Fragment>
            {!placesProfileSearching && onProfile ? (
              <p>You don't have places</p>
            ) : (
              placesProfileSearching
            )}
          </React.Fragment>
        )}
      </ScrollToTop>
    </Box>
  );
};

export default Feed;
