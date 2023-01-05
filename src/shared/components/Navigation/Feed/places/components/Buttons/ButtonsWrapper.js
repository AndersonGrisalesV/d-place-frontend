import React, { useContext, useState } from "react";
import {
  Box,
  CardActions,
  Divider,
  Fade,
  IconButton,
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
import { useNavigate, useParams } from "react-router-dom";
import styled from "@emotion/styled";
import ButtonCloseModal from "./ButtonCloseModal";
import { useHttpClient } from "../../../../../../hooks/http-hook";
import CommentButton from "./CommentButton";
import SnackBarResultLogin from "../../../../../LoginRegister/components/SnackBarResultLogin";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

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

const StyleMenuItem = styled(MenuItem)(({ theme }) => ({
  backgroundColor: "transparent",
  "&:hover": {
    backgroundColor: theme.palette.mode === "dark" ? "" : "#ffe0e3c7",
    color: theme.palette.mode === "dark" ? "" : "#da4453c7",
    // [`${FavoriteBorderOutlined}`]: {
    //   color: theme.palette.mode === "dark" ? "" : "#da4453c7",
    // },
    // [`${AccountCircleOutlined}`]: {
    //   color: theme.palette.mode === "dark" ? "" : "#da4453c7",
    // },
  },
}));

const ButtonsWrapper = ({ onMap = false, loadedPlaces }) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const login = useContext(LoginContext);

  let navigate = useNavigate();

  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const [changeFavorite, setChangeFavorite] = useState(null);
  // const [showComments, setshowComments] = useState(null);

  const [showSuccess, setShowSuccess] = useState(false);

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

  const favoritehandler = async () => {
    if (login.isLoggedIn) {
      try {
        // await sendRequest(
        //   `http://localhost:4000/api/places/favoriteplace/${loadedPlaces._id}`,
        //   "PATCH"
        // );

        const responseData = await sendRequest(
          `http://localhost:4000/api/places/favoriteplace/${loadedPlaces._id}`,
          "PATCH",
          JSON.stringify({
            userId: login.userId,
          }),
          {
            "Content-Type": "Application/json",
          }
        );
        setChangeFavorite(responseData);
      } catch (err) {
        console.log(err);
      }
    } else {
      setShowSuccess("You must be logged in to like posts");

      setTimeout(() => {
        // navigate("/api/users/loginregister");
        setShowSuccess(false);
      }, "4000");
    }
  };
  console.log(loadedPlaces);

  // const [anchorEl, setAnchorEl] = useState(null);

  // const isMenuOpen = Boolean(anchorEl);

  // const handleMenuClose = () => {
  //   setAnchorEl(null);
  // };

  // const handleProfileMenuClose = () => {
  //   setAnchorEl(null);
  // };

  // const handleMenuCloseAndLogout = () => {
  //   setAnchorEl(null);
  // };

  // const menuId = "primary-search-account-menu";
  // const renderMenu = (
  //   <Menu
  //     sx={{
  //       marginLleft: "406px",
  //       marginTop: "218px",
  //     }}
  //     anchorEl={anchorEl}
  //     anchorOrigin={{
  //       vertical: "10",
  //       horizontal: "center",
  //     }}
  //     id={menuId}
  //     keepMounted
  //     transformOrigin={{
  //       vertical: "bottom",
  //       horizontal: "right",
  //     }}
  //     open={isMenuOpen}
  //     onClose={handleMenuClose}
  //   >
  //     <StyleMenuItem onClick={handleProfileMenuClose}>Profile</StyleMenuItem>
  //     <StyleMenuItem onClick={handleMenuCloseAndLogout}>Logout</StyleMenuItem>
  //   </Menu>
  // );

  // const handleSocialMediaLinksToShare = () => {
  //   setAnchorEl(true);
  // };

  // const handleSocialMediaLinksToShareDisable = () => {
  //   setAnchorEl(false);
  // };

  const [anchorElLinks, setAnchorElLinks] = React.useState(null);
  const openMenuLinks = Boolean(anchorElLinks);
  const handleClickLinks = (event) => {
    setAnchorElLinks(event.currentTarget);
  };
  const handleCloseLinks = () => {
    setAnchorElLinks(null);
  };

  return (
    <React.Fragment>
      <CardActions
        disableSpacing
        sx={{
          paddingTop: "0px",
          paddingLeft: "0px",
          paddingBottom: "0px",
          paddinRight: "0px",
        }}
      >
        {showSuccess && (
          <SnackBarResultLogin
            onDuration={5000}
            onClear={clearError}
            error={showSuccess}
          />
        )}

        <Stack direction="row" spacing={-2} sx={{ flexFlow: "inherit" }}>
          <FavoriteButton
            onLoadedPlaces={loadedPlaces}
            isFavorite={isFavorite}
            onChangeFavorite={changeFavorite ? changeFavorite : ""}
            onFavoriteHandler={favoritehandler}
          />
          <CommentButton onLoadedPlaces={loadedPlaces} />

          <div>
            <Menu
              id="basic-menu"
              anchorEl={anchorElLinks}
              open={openMenuLinks}
              onClose={handleCloseLinks}
              MenuListProps={{
                "aria-labelledby": "basic-button",
                role: "listbox",
              }}
            >
              <StyleMenuItem onClick={handleCloseLinks}>Profile</StyleMenuItem>
              <StyleMenuItem onClick={handleCloseLinks}>
                My account
              </StyleMenuItem>
              <StyleMenuItem onClick={handleCloseLinks}>Logout</StyleMenuItem>
            </Menu>

            <ShareButton
              onLoadedPlaces={loadedPlaces}
              onOpenMenuLinks={openMenuLinks}
              onClickLinks={handleClickLinks}
            />
          </div>
        </Stack>
      </CardActions>
      <Stack sx={{ display: "flex", justifyContent: "center" }}>
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
      </Stack>
    </React.Fragment>
  );
};

export default ButtonsWrapper;
