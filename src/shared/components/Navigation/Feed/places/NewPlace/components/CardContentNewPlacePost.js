import React from "react";

import { CardContent } from "@mui/material";

const CardContentNewPlacePost = (props) => {
  return (
    <CardContent
      sx={{
        //* width for different screen sizes
        width: {
          sps: "95px",
          ps: "107px",
          ts: "244px",
          sls: "245px",
          sms: "445px",
          sc: "505px",
          nsc: "505px",
          ns: "540px",
          msc: "540px",
          mns: "540px",
          ms: "540px",
          lgs: "540px",
        },
      }}
    >
      {props.children}
    </CardContent>
  );
};

export default CardContentNewPlacePost;
