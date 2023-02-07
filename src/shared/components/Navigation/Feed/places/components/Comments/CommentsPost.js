import React from "react";

import CommentsDisplay from "./CommentsDisplay";

//* loadedPlaces are the places passed down by PlaceGetById > CommentsPost
//* onRefreshPlaceComments is a pointer to a function that triggers a state that refreshes the places and their comments once one of them is edited or deleted PlaceGetById > CommentsPost where only comments are selected and then passed down
//* onErrorDeleteComment is a pointer to a function that manages error/success messages when creating, editing, deleting a message PlaceGetById > CommentsPost > CommentsDisplay
const CommentsPost = ({
  loadedPlaces,
  onRefreshPlaceComments,
  onErrorDeleteComment,
}) => {
  return (
    <React.Fragment>
      <CommentsDisplay
        onPlaceComments={loadedPlaces.comments}
        onPlaceId={loadedPlaces.id}
        onRefreshPlaceComments={onRefreshPlaceComments}
        onErrorDeleteComment={onErrorDeleteComment}
      />
    </React.Fragment>
  );
};

export default CommentsPost;
