import React from "react";

import CommentsDisplay from "./CommentsDisplay";

const CommentsPost = ({
  loadedPlaces,
  onRefreshPlaceComments,
  onDeletedComments,
  onErrorDeleteComment,
}) => {
  return (
    <React.Fragment>
      <CommentsDisplay
        onPlaceComments={loadedPlaces.comments}
        onPlaceId={loadedPlaces.id}
        onRefreshPlaceComments={onRefreshPlaceComments}
        onDeletedComments={onDeletedComments}
        onErrorDeleteComment={onErrorDeleteComment}
      />
    </React.Fragment>
  );
};

export default CommentsPost;
