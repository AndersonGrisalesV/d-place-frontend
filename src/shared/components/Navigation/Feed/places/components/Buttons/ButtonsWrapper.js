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
import Map from "../../../../../Map/Map";

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

const ButtonsWrapper = ({ onMap = false, DUMMY_PLACES }) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <CardActions
      disableSpacing
      sx={{ paddingTop: "0px", paddingLeft: "0px", paddingBottom: "0px" }}
    >
      <Stack direction="row" spacing={-3}>
        <FavoriteButton DUMMY_PLACES={DUMMY_PLACES} />
        <ShareButton />
      </Stack>
      {!onMap ? (
        <ButtonDetails DUMMY_PLACES={DUMMY_PLACES} />
      ) : (
        <ButtonSeeMap onHandleOpen={handleOpen} />
      )}
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
                {DUMMY_PLACES.title}
              </Typography>
              <React.Fragment>
                <p style={{ margin: "8px" }} />
                <Typography
                  variant="h6"
                  fontWeight={400}
                  color="text.secondary"
                  sx={{
                    fontSize: {
                      sps: "8px",
                      ps: "9px",
                      ts: "11px",
                      sls: "11px",
                      sms: "13px",
                      sc: "13px",
                      nsc: "13px",
                      ns: "13px",
                      msc: "13px",
                      mns: "13px",
                      ms: "13px",
                      lgs: "13px",
                    },
                  }}
                >
                  {DUMMY_PLACES.address}
                </Typography>
              </React.Fragment>
              <div>
                <Map center={DUMMY_PLACES.location} zoom={16} />
              </div>
            </Box>
          </Modal>
        </div>
      )}
    </CardActions>
  );
};

export default ButtonsWrapper;
