import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Place from "../../Place";

import { useHttpClient } from "../../../../../../hooks/http-hook";
import SnackBarResultLogin from "../../../../../LoginRegister/components/SnackBarResultLogin";

const PlaceGetById = ({ onMap, onShowComments, placeId }) => {
  const [loadedPlace, setLoadedPlace] = useState();
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [refreshpage, setRefreshPage] = useState(false);
  const [deletedComment, setDeletedComment] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showSuccessCreating, setShowSuccessCreating] = useState(false);
  const [showErrorCreatingComment, setShowErrorCreatingComment] =
    useState(false);

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
    // setLoadedPlace((prevPlace) =>
    //   prevPlace.filter((place) => place.id === deletedPlaceId)
    // );
  };

  // const handleDeletedComments = (deletedCommentId) => {
  //   setLoadedPlace((prevPlace) =>
  //     prevPlace.comments.filter((place) => place._id !== deletedCommentId)
  //   );
  //   console.log(loadedPlace);
  // };

  const handleErrorDeletingComment = (
    err,
    showErr,
    errorDeletingComment,
    showSucc
  ) => {
    // setDeletedComment(err);
    // if (showErr) {
    //   setShowErrorCreatingComment(err);

    //   setTimeout(() => {
    //     setShowErrorCreatingComment(false);
    //     setDeletedComment(null);
    //   }, "6000");
    // }
    if (showErr === "created") {
      setShowSuccessCreating(true);
      setTimeout(() => {
        setShowSuccessCreating(false);
        setDeletedComment(null);
      }, "6000");
    }

    if (showSucc) {
      setShowSuccess(true);
      setTimeout(() => {
        setShowSuccess(false);
        setDeletedComment(null);
      }, "6000");
    }
    if (errorDeletingComment === "errorDeleting") {
      setDeletedComment(true);
      setTimeout(() => {
        setDeletedComment(false);
        setDeletedComment(null);
      }, "6000");
    }
  };

  return (
    <>
      {error && !showErrorCreatingComment && (
        <SnackBarResultLogin
          error={error}
          onDuration={6000}
          onClear={clearError}
        />
      )}
      {deletedComment && (
        <SnackBarResultLogin
          onDuration={6000}
          error={"Something went wrong, try again"}
          onClear={clearError}
        />
      )}
      {showSuccess && (
        <SnackBarResultLogin
          onSuccess={true}
          onDuration={6000}
          message={"Your comment was deleted successfully"}
        />
      )}
      {showErrorCreatingComment && (
        <SnackBarResultLogin
          onDuration={6000}
          onClear={clearError}
          message={showErrorCreatingComment}
        />
      )}
      {showSuccessCreating && (
        <SnackBarResultLogin
          onSuccess={true}
          onDuration={6000}
          onClear={clearError}
          message={"Your comment was created successfully"}
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
