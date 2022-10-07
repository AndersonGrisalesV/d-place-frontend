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
import styled from "@emotion/styled";
import ButtonEdit from "./ButtonEdit";
import ButtonDeletePost from "./ButtonDeletePost";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: {
    sps: "210px",
    ps: "290px",
    ts: "351px",
    sls: "400px",
    sms: "600px",
    sc: "652px",
    nsc: "652px",
    ns: "652px",
    msc: "652px",
    mns: "652px",
    ms: "652px",
    lgs: "652px",
  },
  bgcolor: "background.paper",
  borderRadius: "8px",
  boxShadow: 24,
  p: 4,
  paddingLeft: "0px",
  paddingRight: "0px",
  paddingBottom: "0px",
};

const StyleContainerMap = styled(Box)(({ theme }) => ({
  height: {
    sps: "210px",
    ps: "290px",
    ts: "351px",
    sls: "400px",
    sms: "600px",
    sc: "652px",
    nsc: "652px",
    ns: "652px",
    msc: "652px",
    mns: "652px",
    ms: "652px",
    lgs: "652px",
  },
  width: "100%",
}));

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
            <Stack>
              <Box sx={style}>
                <Stack>
                  <Stack
                    direction="row"
                    spacing={2}
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <Typography
                      sx={{ display: "inline", paddingLeft: "24px" }}
                      fontSize={17}
                      fontWeight={600}
                      variant="h6"
                      color="text.primary"
                    >
                      {DUMMY_PLACES.title}
                    </Typography>
                  </Stack>

                  <p style={{ margin: "1px" }} />
                  <Stack
                    direction="row"
                    spacing={2}
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <Typography
                      variant="h6"
                      fontWeight={400}
                      color="text.secondary"
                      sx={{
                        paddingLeft: "24px",
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
                    <ButtonEdit />
                  </Stack>
                </Stack>
                <Box
                  sx={{
                    height: {
                      sps: "15rem",
                      ps: "20rem",
                      ts: "22rem",
                      sls: "23rem",
                      sms: "24rem",
                      sc: "25rem",
                      nsc: "25rem",
                      ns: "25rem",
                      msc: "25rem",
                      mns: "25rem",
                      ms: "25rem",
                      lgs: "25rem",
                    },
                    width: "100%",
                  }}
                >
                  <Map center={DUMMY_PLACES.location} zoom={16} />
                </Box>
              </Box>
            </Stack>
          </Modal>
        </div>
      )}
    </CardActions>
  );
};

export default ButtonsWrapper;
