import {
  CardContent,
  ImageList,
  ImageListItem,
  Typography,
} from "@mui/material";
import React from "react";

function srcset(image, size, rows = 1, cols = 1) {
  return {
    src: `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format`,
    srcSet: `${image}?w=${size * cols}&h=${
      size * rows
    }&fit=crop&auto=format&dpr=2 2x`,
  };
}

const itemData = [
  {
    img: "https://sportshub.cbsistatic.com/i/2022/08/06/0f0ba3a3-6248-40e9-93de-3fab636b15aa/bleach-thousand-poster.png",
    title: "Bleach",
    rows: 2,
    cols: 2,
  },
  {
    img: "https://image-cdn.hypb.st/https%3A%2F%2Fhypebeast.com%2Fimage%2F2021%2F08%2Fbleach-20th-anniversary-special-manga-chapter-new-details-info-000.jpg?w=960&cbr=1&q=90&fit=max",
    title: "IchigoAndRukia",
  },
  {
    img: "https://animenewsandfacts.com/wp-content/uploads/2020/03/bleach_kurosaki_ichigo_hollow_mask_6426_by_afran67_d7yrxg9-fullview-1.jpg?ezimgfmt=rs:372x225/rscb186/ngcb186/notWebP",
    title: "Hollow mask",
  },
];

const LatestPhotos = () => {
  return (
    <CardContent sx={{ paddingTop: "0px", paddingBottom: "0px" }}>
      <Typography variant="h6" fontWeight={400} mt={2} mb={2}>
        Latest Photos
      </Typography>
      <div>
        <ImageList
          variant="quilted"
          cols={1}
          rowHeight={80}
          gap={5}
          sx={{ width: "330px", height: "250px", paddingRight: "0px" }}
        >
          {itemData.map((item) => (
            <ImageListItem
              key={item.img}
              cols={item.cols || 1}
              rows={item.rows || 1}
              sx={{ borderRadius: "18%" }}
            >
              <img
                style={{ borderRadius: "2.2%" }}
                {...srcset(item.img, 121, item.rows, item.cols)}
                alt={item.title}
                loading="lazy"
              />
            </ImageListItem>
          ))}
        </ImageList>
      </div>
    </CardContent>
  );
};

export default LatestPhotos;
