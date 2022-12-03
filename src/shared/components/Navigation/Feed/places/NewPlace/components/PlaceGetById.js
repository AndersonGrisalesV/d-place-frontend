import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import Place from "../../Place";

import { useHttpClient } from "../../../../../../hooks/http-hook";
import SnackBarResultLogin from "../../../../../LoginRegister/components/SnackBarResultLogin";

const PlaceGetById = ({ onMap, onShowComments, placeId }) => {
  const [loadedPlace, setLoadedPlace] = useState();
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [refreshpage, setRefreshPage] = useState(false);
  const [deletedComment, setDeletedComment] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [postShowSuccess, setPostSuccess] = useState(false);

  let { state } = useLocation();
  let stateAux = state;
  useEffect(() => {
    if (stateAux) {
      if (stateAux.editPlace === "edited") {
        // setPostSuccess(postShowSuccess.editPlace);
        setPostSuccess(stateAux.editPlace);
      }
    }
    // if (postShowSuccess === "edited") {
    //   setPostSuccess(postShowSuccess.editPlace);
    // } else {
    //   setPostSuccess(null);
    // }
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
          `http://localhost:4000/api/places/${placeId}`
        );
        setLoadedPlace(responseData.place);
        console.log(responseData.place);
      } catch (err) {}
    };
    fetchPlaces();
  }, [sendRequest, placeId]);

  useEffect(() => {
    if (refreshpage) {
      const fetchPlaces = async () => {
        try {
          const responseData = await sendRequest(
            `http://localhost:4000/api/places/${refreshpage}`
          );
          setLoadedPlace(responseData.place);
          console.log(responseData.place);
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
    // console.log(errDatabase);

    if (
      showSucc === "created" ||
      showSucc === "deleted" ||
      showSucc === "edited"
    ) {
      setShowSuccess(msg);
      setTimeout(() => {
        setShowSuccess(false);
        setDeletedComment(null);
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
        setDeletedComment(null);
      }, "6000");
    }
  };

  return (
    <>
      {error && !showError && (
        <SnackBarResultLogin
          error={error}
          onDuration={6000}
          onClear={clearError}
        />
      )}
      {showSuccess && (
        <SnackBarResultLogin
          onSuccess={true}
          onDuration={6000}
          onClear={clearError}
          message={showSuccess}
        />
      )}
      {showError && (
        <SnackBarResultLogin
          onDuration={6000}
          onClear={clearError}
          error={showError}
        />
      )}

      {postShowSuccess && (
        <SnackBarResultLogin
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
            // onDeletedComments={handleDeletedComments}
            onErrorDeleteComment={handleErrorDeletingComment}
          />
          <br />
        </React.Fragment>
      )}
    </>
  );
};

export default PlaceGetById;
