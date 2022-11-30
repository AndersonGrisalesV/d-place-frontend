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

  let errorControl = <SnackBarResultLogin error={error} onClear={clearError} />;

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

  const handleErrorDeletingComment = (err, showErr) => {
    setDeletedComment(err);
    if (showErr) {
      setShowErrorCreatingComment(err);

      setTimeout(() => {
        setShowErrorCreatingComment(false);
      }, "2000");
    } else {
      setShowSuccess(true);

      setTimeout(() => {
        setShowSuccess(false);
      }, "2000");
    }
  };

  return (
    <>
      {error && <SnackBarResultLogin error={error} onClear={clearError} />}
      {deletedComment ? (
        <SnackBarResultLogin error={deletedComment} onClear={clearError} />
      ) : null}
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
          message={showErrorCreatingComment}
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
