import React, { useContext, useState } from "react";
import {
  Box,
  Button,
  CardActions,
  Fade,
  ListItemText,
  Modal,
  Stack,
  Typography,
  Zoom,
} from "@mui/material";
import ButtonDetails from "./ButtonDetails";
import FavoriteButton from "./FavoriteButton";
import ShareButton from "./ShareButton";
import ButtonSeeMap from "./ButtonSeeMap";
import Map from "../../../../../Map/Map";
import ButtonEdit from "./ButtonEdit";
import ButtonDeletePost from "./ButtonDeletePost";
import Backdrop from "@mui/material/Backdrop";

import { LoginContext } from "../../../../../../context/login-context";
import { useParams } from "react-router-dom";
import styled from "@emotion/styled";
import ButtonCloseModal from "./ButtonCloseModal";

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
  padding: "0px",
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

const ButtonsWrapper = ({ onMap = false, loadedPlaces }) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const login = useContext(LoginContext);

  const params = useParams();

  let isFavorite = false;

  if (login.isLoggedIn) {
    loadedPlaces.favoritesUserIds.map((favorite) => {
      if (favorite === login.userId) {
        return (isFavorite = true);
      }
      return (isFavorite = false);
    });
  }
  console.log(loadedPlaces);

  return (
    <CardActions
      disableSpacing
      sx={{ paddingTop: "0px", paddingLeft: "0px", paddingBottom: "0px" }}
    >
      <Stack direction="row" spacing={-3}>
        <FavoriteButton isFavorite={isFavorite} />
        <ShareButton />
      </Stack>
      {!onMap ? (
        <ButtonDetails onPlaceId={loadedPlaces._id} />
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
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
              timeout: 500,
            }}
          >
            <Fade in={open}>
              <Stack>
                <Box sx={style}>
                  <Stack>
                    <ButtonCloseModal handleClose={handleClose} />
                    <Stack
                      direction="row"
                      spacing={2}
                      justifyContent="space-between"
                      alignItems="center"
                    >
                      <Typography
                        sx={{
                          display: "inline",
                          paddingLeft: "24px",
                          fontSize: {
                            sps: "12px",
                            ps: "13px",
                            ts: "15px",
                            sls: "15px",
                            sms: "17px",
                            sc: "17px",
                            nsc: "17px",
                            ns: "17px",
                            msc: "17px",
                            mns: "17px",
                            ms: "17px",
                            lgs: "17px",
                          },
                        }}
                        fontWeight={600}
                        variant="h6"
                        color="text.primary"
                      >
                        {loadedPlaces.title}
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
                          marginBottom: "10px",
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
                        {loadedPlaces.address}
                      </Typography>
                      {login.isLoggedIn &&
                        login.userId === loadedPlaces.creatorId._id && (
                          <ButtonEdit loadedPlaces={loadedPlaces} />
                        )}
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
                    <Map center={loadedPlaces.location} zoom={16} />
                  </Box>
                </Box>
              </Stack>
            </Fade>
          </Modal>
        </div>
      )}
    </CardActions>
  );
};

export default ButtonsWrapper;
