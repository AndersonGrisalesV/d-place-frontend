import React from "react";
import Card from "@mui/material/Card";

import Skeleton from "@mui/material/Skeleton";

// <Skeleton animation="wave" height={10} style={{ marginBottom: 6 }} />
//             <Skeleton animation="wave" height={10} width="80%" />

const CardSkeletonLogin = () => {
  return (
    <Card sx={{ maxWidth: 345, m: 2 }}>
      <Skeleton sx={{ height: 190 }} animation="wave" variant="rectangular" />
    </Card>
  );
};

export default CardSkeletonLogin;
