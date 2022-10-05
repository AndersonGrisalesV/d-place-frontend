import React, { useState } from "react";
import {
  Box,
  Button,
  CardActions,
  ListItemText,
  Modal,
  Stack,
  Typography,
} from "@mui/material";
import ButtonDetails from "./ButtonDetails";
import FavoriteButton from "./FavoriteButton";
import ShareButton from "./ShareButton";
import ButtonSeeMap from "./ButtonSeeMap";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const ButtonsWrapper = ({ onMap = false }) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <CardActions
      disableSpacing
      sx={{ paddingTop: "0px", paddingLeft: "0px", paddingBottom: "0px" }}
    >
      <Stack direction="row" spacing={-3}>
        <FavoriteButton />
        <ShareButton />
      </Stack>
      {!onMap ? <ButtonDetails /> : <ButtonSeeMap onHandleOpen={handleOpen} />}
      {onMap && (
        <div>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-map"
            aria-describedby="modal-modal-map-location"
          >
            <Box sx={style}>
              <Typography
                sx={{ display: "inline" }}
                fontSize={17}
                fontWeight={600}
                variant="h6"
                color="text.primary"
              >
                Ali Connors
              </Typography>

              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
              </Typography>
            </Box>
          </Modal>
        </div>
      )}
    </CardActions>
  );
};

export default ButtonsWrapper;
