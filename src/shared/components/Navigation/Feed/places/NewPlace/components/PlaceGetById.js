import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import Place from "../../Place";

import { useHttpClient } from "../../../../../../hooks/http-hook";
import SnackBarResult from "../../../../../LoginRegister/components/SnackBarResult";

//* onMap is a boolean that is passed down by PlaceDetail page
//* onShowComments is a boolean that is passed down by Feed page
//* placeId is a boolean that is passed down by Feed page
const PlaceGetById = ({ onMap, onShowComments, placeId }) => {
  // State to store the loaded place details
  const [loadedPlace, setLoadedPlace] = useState();
  // useHttpClient hook is used to send requests to the backend
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  // State to refresh the place details
  const [refreshpage, setRefreshPage] = useState(false);
  // State to show success message for comments
  const [showSuccess, setShowSuccess] = useState(false);
  // State to show success message for places
  const [postShowSuccess, setPostSuccess] = useState(false);

  // Use useLocation hook to get the state from location
  // This is necessary to tell the success message which one to correctly display
  let { state } = useLocation();
  let stateAux = state;
  useEffect(() => {
    if (stateAux) {
      if (stateAux.editPlace === "edited") {
        setPostSuccess(stateAux.editPlace);
      }
    }
  }, [stateAux]);

  // Reset stateAux and postShowSuccess after 6 seconds
  setTimeout(() => {
    stateAux = null;
    setPostSuccess(null);
  }, "6000");

  const [showError, setShowError] = useState(false);

  // useEffect to fetch the place details based on placeId
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

  // useEffect to refresh the place details if refreshpage is true
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

  // Function to refresh the place comments
  const refresPlaceCommentsHandler = (deletedPlaceId) => {
    setRefreshPage(deletedPlaceId);
  };

  // Function to handle the incoming error/success messages
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
      // Timer for message to be shown
      setShowSuccess(msg);
      setTimeout(() => {
        setShowSuccess(false);
      }, "6000");
    }
    // Timer for message to be shown
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
      {/* Places error related messages (editing, deleting) */}
      {error && !showError && (
        <SnackBarResult error={error} onDuration={6000} onClear={clearError} />
      )}
      {/* Comments success related messages (editing, deleting) */}
      {showSuccess && (
        <SnackBarResult
          onSuccess={true}
          onDuration={6000}
          onClear={clearError}
          message={showSuccess}
        />
      )}
      {/* Comments error related messages (editing, deleting) */}
      {showError && (
        <SnackBarResult
          onDuration={6000}
          onClear={clearError}
          error={showError}
        />
      )}
      {/* Places success related messages (editing, deleting) */}
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
          {/* Space correction */}
          <br />
        </React.Fragment>
      )}
    </>
  );
};

export default PlaceGetById;
