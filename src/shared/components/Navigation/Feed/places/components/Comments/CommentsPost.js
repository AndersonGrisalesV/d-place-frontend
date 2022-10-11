import React from "react";
import CommentsDisplay from "./CommentsDisplay";

const DUMMY_COMMENTS = [
  {
    commentId: "co1",
    postCommentDate: "September 6, 2022",
    commentText:
      "This is one of the most beautiful places I've ever been to, not only because its architecture is amaizing but all the surrounding areas are just as beautiful, I wish to go back there once more.",
    placeId: "p1",
    title: "Empire State Building",
    creatorId: "u1",
    creatorName: "Anderson",
    creatorImageUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSzHQv_th9wq3ivQ1CVk7UZRxhbPq64oQrg5Q&usqp=CAU",
  },
  {
    commentId: "co2",
    postCommentDate: "September 9, 2022",
    commentText:
      "Interesting place, not my favorite by a long way but at least fastfood or street venderos are as cheap as they come.",
    placeId: "p1",
    title: "Empire State Building",
    creatorId: "u2",
    creatorName: "The bleach himself",
    creatorImageUrl: "",
  },
  {
    commentId: "co3",
    postCommentDate: "September 10, 2022",
    commentText: "You can go there if you like busy streets.",
    placeId: "p1",
    title: "Empire State Building",
    creatorId: "u2",
    creatorName: "The bleach himself",
    creatorImageUrl: "",
  },
  {
    commentId: "co4",
    postCommentDate: "October 9, 2022",
    commentText: "The GOAT is back the shonen is revived fellows.",
    placeId: "p2",
    title: "Bleach",
    creatorId: "u2",
    creatorName: "The bleach himself",
    creatorImageUrl: "",
  },
];

const CommentsPost = ({ DUMMY_PLACES, DUMMY_COMMENTS }) => {
  //   function getDifference(array1, array2) {
  //     return array1.filter((object1) => {
  //       return !array2.some((object2) => {
  //         return object1.placeId === object2.placeId;
  //       });
  //     });
  //   }
  //   const difference = [
  //     ...getDifference(DUMMY_PLACES, DUMMY_COMMENTS),
  //     ...getDifference(DUMMY_COMMENTS, DUMMY_PLACES),
  //   ];
  //   console.log(difference);

  return (
    <React.Fragment>
      <CommentsDisplay DUMMY_COMMENTS={DUMMY_COMMENTS} />
    </React.Fragment>
  );
};

export default CommentsPost;
