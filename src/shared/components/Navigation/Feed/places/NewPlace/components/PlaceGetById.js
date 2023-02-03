import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import Place from "../../Place";

import { useHttpClient } from "../../../../../../hooks/http-hook";
import SnackBarResult from "../../../../../LoginRegister/components/SnackBarResult";

const PlaceGetById = ({ onMap, onShowComments, placeId }) => {
  const [loadedPlace, setLoadedPlace] = useState();
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [refreshpage, setRefreshPage] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [postShowSuccess, setPostSuccess] = useState(false);

  let { state } = useLocation();
  let stateAux = state;
  useEffect(() => {
    if (stateAux) {
      if (stateAux.editPlace === "edited") {
        setPostSuccess(stateAux.editPlace);
      }
    }
  }, [stateAux]);

  setTimeout(() => {
    stateAux = null;
    setPostSuccess(null);
  }, "6000");

  const [showError, setShowError] = useState(false);

  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/places/${placeId}`
        );
        setLoadedPlace(responseData.place);
      } catch (err) {}
    };
    fetchPlaces();
  }, [sendRequest, placeId]);

  useEffect(() => {
    if (refreshpage) {
      const fetchPlaces = async () => {
        try {
          const responseData = await sendRequest(
            `${process.env.REACT_APP_BACKEND_URL}/places/${refreshpage}`
          );
          setLoadedPlace(responseData.place);

          setRefreshPage(false);
        } catch (err) {}
      };
      fetchPlaces();
    }
  }, [sendRequest, refreshpage]);

  const refresPlaceCommentsHandler = (deletedPlaceId) => {
    setRefreshPage(deletedPlaceId);
  };

  const handleErrorDeletingComment = (
    errDatabase = null,
    showErr,
    showSucc,
    msg
  ) => {
    if (
      showSucc === "created" ||
      showSucc === "deleted" ||
      showSucc === "edited"
    ) {
      setShowSuccess(msg);
      setTimeout(() => {
        setShowSuccess(false);
      }, "6000");
    }

    if (
      showErr === "errorCreate" ||
      showErr === "errorDelete" ||
      showErr === "errorEdit"
    ) {
      setShowError(msg);
      setTimeout(() => {
        setShowError(false);
      }, "6000");
    }
  };

  return (
    <>
      {error && !showError && (
        <SnackBarResult error={error} onDuration={6000} onClear={clearError} />
      )}
      {showSuccess && (
        <SnackBarResult
          onSuccess={true}
          onDuration={6000}
          onClear={clearError}
          message={showSuccess}
        />
      )}
      {showError && (
        <SnackBarResult
          onDuration={6000}
          onClear={clearError}
          error={showError}
        />
      )}

      {postShowSuccess && (
        <SnackBarResult
          onSuccess={true}
          onDuration={6000}
          onClear={clearError}
          message={"Your post was updated successfully"}
        />
      )}

      {!isLoading && loadedPlace && (
        <React.Fragment>
          <Place
            onMap={onMap}
            onShowComments={onShowComments}
            loadedPlaces={loadedPlace}
            id={loadedPlace._id}
            key={loadedPlace._id}
            onRefreshPlaceComments={refresPlaceCommentsHandler}
            onErrorDeleteComment={handleErrorDeletingComment}
            onArrangeBigSize={true}
          />
          <br />
        </React.Fragment>
      )}
    </>
  );
};

export default PlaceGetById;
