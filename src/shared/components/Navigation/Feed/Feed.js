import { Box } from "@mui/material";
import React from "react";
import { useParams } from "react-router-dom";
import Place from "./places/Place";

const DUMMY_PLACES = [
  {
    placeId: "p1",
    title: "Empire State Building",
    description:
      "One of the most famous skycrapers in the world, I had never seen something as impressive as this I will probably remember it until I die.",
    imageUrl:
      "https://www.esbnyc.com/sites/default/files/2020-01/thumbnail5M2VW4ZF.jpg",
    address: "20 W 24th St, New York, NY 10001",
    favorite: false,
    location: {
      lat: 40.7484405,
      lng: -73.9878584,
    },
    postDate: "September 6, 2022",
    creatorId: "u1",
    creatorName: "Andersons",
    creatorImageUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSzHQv_th9wq3ivQ1CVk7UZRxhbPq64oQrg5Q&usqp=CAU",
  },
  {
    placeId: "p2",
    title: "Bleach",
    description:
      "The number 1 the GOAT is back, one of the big three this series carries one of the biggest fandoms in anime Today, definetly the best of them all.",
    imageUrl:
      "https://areajugones.sport.es/wp-content/uploads/2022/09/bleach-tybw-akksakls.jpg",
    address: "3-chōme-20 Horifune, Kita City, Tokyo 114-0004, Japan",
    favorite: true,
    location: {
      lat: 35.7538209,
      lng: 139.748037,
    },
    postDate: "October 9, 2022",
    creatorId: "u2",
    creatorName: "The bleach himself",
    creatorImageUrl: "",
  },
];

const Feed = ({ onDetail = false, onMap = false }) => {
  const userId = useParams().userId;
  let loadedPlaces = [{}];
  if (onDetail && onMap) {
    loadedPlaces = DUMMY_PLACES.filter((place) => place.creatorId === userId);
  }

  const places = (
    <React.Fragment>
      <Place />
      <br />
      <Place />
      <br />
      <Place />
      <br />
      {/*
      <Place />
      <br />
      <Place />
      <br /> */}
    </React.Fragment>
  );

  return (
    <Box flex={4} p={2} style={{ marginBottom: "100%" }}>
      {onDetail && !onMap ? (
        <React.Fragment>
          <Place />
          <br />
        </React.Fragment>
      ) : onDetail && onMap ? (
        <React.Fragment>
          <Place onMap={true} DUMMY_PLACES={loadedPlaces} />
          <br />
        </React.Fragment>
      ) : (
        places
      )}
    </Box>
  );
};

export default Feed;
