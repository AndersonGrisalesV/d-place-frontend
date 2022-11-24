import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Place from "../../Place";

import { useHttpClient } from "../../../../../../hooks/http-hook";
import SnackBarResultLogin from "../../../../../LoginRegister/components/SnackBarResultLogin";

const PlaceGetById = ({ onMap, onShowComments, placeId }) => {
  const [loadedPlace, setLoadedPlace] = useState();
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        const responseData = await sendRequest(
          `http://localhost:4000/api/places/${placeId}`
        );
        setLoadedPlace(responseData.place);
        console.log(responseData.place);
      } catch (err) {}
    };
    fetchPlaces();
  }, [sendRequest, placeId]);

  return (
    <>
      {error && <SnackBarResultLogin error={error} onClear={clearError} />}

      {!isLoading && loadedPlace && (
        <React.Fragment>
          <Place
            onMap={onMap}
            onShowComments={onShowComments}
            loadedPlaces={loadedPlace}
            id={loadedPlace._id}
            key={loadedPlace._id}
          />
          <br />
        </React.Fragment>
      )}
    </>
  );
};

export default PlaceGetById;
