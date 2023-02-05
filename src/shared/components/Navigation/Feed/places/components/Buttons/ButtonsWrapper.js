import React, { useContext, useRef, useState } from "react";

import { LoginContext } from "../../../../../../context/login-context";

import { useHttpClient } from "../../../../../../hooks/http-hook";

import SnackBarResult from "../../../../../LoginRegister/components/SnackBarResult";
import Map from "../../../../../Map/Map";

import ButtonCloseModal from "./ButtonCloseModal";
import CommentButton from "./CommentButton";
import CopyLinkButton from "./CopyLinkButton";
import ButtonDetails from "./ButtonDetails";
import ButtonEdit from "./ButtonEdit";
import ButtonSeeMap from "./ButtonSeeMap";
import FavoriteButton from "./FavoriteButton";
import ShareButton from "./ShareButton";

import {
  FacebookIcon,
  FacebookShareButton,
  LineIcon,
  LineShareButton,
  PinterestIcon,
  PinterestShareButton,
  RedditIcon,
  RedditShareButton,
  TelegramIcon,
  TelegramShareButton,
  TwitterIcon,
  TwitterShareButton,
  WhatsappIcon,
  WhatsappShareButton,
} from "react-share";

import {
  Box,
  CardActions,
  Fade,
  Modal,
  Stack,
  Typography,
  Zoom,
} from "@mui/material";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import styled from "@emotion/styled";

// Styled component and responsive design for menuItems in shareButton
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  // width for different screen sizes
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

// Styled component for MenuItem
const StyleMenuItem = styled(MenuItem)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  backgroundColor: "transparent",
  "&:hover": {
    backgroundColor: theme.palette.mode === "dark" ? "" : "#ffe0e3c7",
    color: theme.palette.mode === "dark" ? "" : "#da4453c7",
  },
}));

// onMap is a boolean that is passed down by PlaceDetail page
// loadedPlaces are places passed by FavoritePlaces or Feed or ProfilePlaces depending on where place is called
const ButtonsWrapper = ({ onMap = false, loadedPlaces }) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const login = useContext(LoginContext);

  // custom hook to send Http request to the backend
  const { sendRequest, clearError } = useHttpClient();

  const [changeFavorite, setChangeFavorite] = useState(null);

  const [showSuccess, setShowSuccess] = useState(false);

  let isFavorite = false;

  // checks if user is logged in to select favorite user places
  if (login.isLoggedIn) {
    loadedPlaces.favoritesUserIds.map((favorite) => {
      if (favorite === login.userId) {
        return (isFavorite = true);
      }
      return (isFavorite = false);
    });
  }

  const [userLikeValue, setUserLikeValue] = useState(null);

  // favoritehandler function that makes a called to the backend API to change a user place to favorite or to remove from user favorite places
  const favoritehandler = async () => {
    if (login.isLoggedIn) {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/places/favoriteplace/${loadedPlaces._id}`,
          "PATCH",
          JSON.stringify({
            userId: login.userId,
          }),
          {
            Authorization: "Bearer " + login.token,
            "Content-Type": "Application/json",
          }
        );
        setChangeFavorite(responseData);
      } catch (err) {}

      // Makes a requesto to the place in order to count the likes of said place and update the count in real time
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/places/${loadedPlaces._id}`
        );
        setUserLikeValue(responseData.place);
      } catch (err) {}
    } else {
      // Error shown to user when not loggedIn and trying to like a post
      setShowSuccess("You must be logged in to like posts");
      setTimeout(() => {
        setShowSuccess(false);
      }, "4000");
    }
  };

  const [showAllShareLinks, setShowAllShareLinks] = useState(false);

  const [anchorElLinks, setAnchorElLinks] = useState(null);
  const openMenuLinks = Boolean(anchorElLinks);

  // handleClickLinks function that sets the current target for the event after a click on ShareButton
  const handleClickLinks = (event) => {
    setAnchorElLinks(event.currentTarget);
  };

  // handleCloseLinks dunction that hides all sharable links by changing the state showAllShareLinks
  // setShowAllShareLinks resets the the current target for the event
  const handleCloseLinks = () => {
    setAnchorElLinks(null);
    setShowAllShareLinks(false);
  };

  // Boolean state to identify when a post is beign shared
  const [sharedPost, setSharedPost] = useState(false);
  // State to display a message of cuess when a link has been copied
  const [copySuccess, setCopySuccess] = useState(null);
  // State to update the count share count in real time
  const [sendCount, sendSendCount] = useState(0);

  // Links to sharable options
  const facebookLink = useRef(null);
  const lineLink = useRef(null);
  const whatsappLink = useRef(null);
  const twitterLink = useRef(null);
  const redditLink = useRef(null);
  const telegramLink = useRef(null);
  const pinterestLink = useRef(null);

  // handleCloseLinks calls the funtion that closes the sharable links
  // handleCopyLink function that handles the copying of current Url and displays a success or error message
  // shareCountHandler executes the a call to the API  to increase the share count in the DB
  // sendSendCount increases the count of shares to show in real time
  const handleCopyLink = async () => {
    handleCloseLinks();
    try {
      setCopySuccess("Link copied!");
      await navigator.clipboard.writeText(`${String(window.location)}`);
    } catch (err) {
      setCopySuccess("Failed to copy link!");
    }
    setTimeout(() => {
      setCopySuccess(null);
    }, "800");
    setSharedPost(true);
    shareCountHandler();
    sendSendCount(sendCount + 1);
  };

  // handleFacebookLink calls handleCloseLinks funtion that closes the sharable links
  // facebookLink triggers a click stored in that useRef
  // setSharedPost changes the state to a shared post for the ShareButton to update correctly
  // shareCountHandler executes the a call to the API  to increase the share count in the DB
  // sendSendCount increases the count of shares to show in real time
  const handleFacebookLink = () => {
    handleCloseLinks();
    facebookLink.current.click();
    setSharedPost(true);
    shareCountHandler();
    sendSendCount(sendCount + 1);
  };

  const handleWhatsappLink = () => {
    handleCloseLinks();
    whatsappLink.current.click();
    setSharedPost(true);
    shareCountHandler();
    sendSendCount(sendCount + 1);
  };

  const handleTwitterLink = () => {
    handleCloseLinks();
    twitterLink.current.click();
    setSharedPost(true);
    shareCountHandler();
    sendSendCount(sendCount + 1);
  };

  const handleLineLink = () => {
    handleCloseLinks();
    lineLink.current.click();
    setSharedPost(true);
    shareCountHandler();
    sendSendCount(sendCount + 1);
  };

  const handleRedditLink = () => {
    handleCloseLinks();
    redditLink.current.click();
    setSharedPost(true);
    shareCountHandler();
    sendSendCount(sendCount + 1);
  };

  const handleTelegramLink = () => {
    handleCloseLinks();
    telegramLink.current.click();
    setSharedPost(true);
    shareCountHandler();
    sendSendCount(sendCount + 1);
  };

  const handlePinterestLink = () => {
    handleCloseLinks();
    pinterestLink.current.click();
    setSharedPost(true);
    shareCountHandler();
    sendSendCount(sendCount + 1);
  };

  const handleShowMoreLinks = () => {
    setShowAllShareLinks(true);
  };

  const handleShowLessLinks = () => {
    setShowAllShareLinks(false);
  };

  // shareCountHandler function triggers a call to the API to increase the share count in the DB
  const shareCountHandler = async () => {
    try {
      await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/places/shareplace/${loadedPlaces._id}`,
        "PATCH",
        JSON.stringify({
          newShare: 1,
        }),
        {
          "Content-Type": "Application/json",
        }
      );
    } catch (err) {}
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
        {/* This showSucces is indeed a message in green telling the user they must be
        loggedIn to like posts
        */}
        {showSuccess && (
          <SnackBarResult
            onDuration={4000}
            onClear={clearError}
            error={showSuccess}
          />
        )}
        {copySuccess && (
          <SnackBarResult
            onSuccess={true}
            onDuration={800}
            onClear={clearError}
            message={copySuccess}
          />
        )}

        <Stack direction="row" spacing={-2} sx={{ flexFlow: "inherit" }}>
          <FavoriteButton
            onLoadedPlaces={loadedPlaces}
            isFavorite={isFavorite}
            onChangeFavorite={changeFavorite ? changeFavorite : ""}
            onFavoriteHandler={favoritehandler}
            onCount={userLikeValue ? userLikeValue : ""}
          />
          <CommentButton loadedPlaces={loadedPlaces} />

          <div>
            <Menu
              sx={{
                "& .MuiMenu-paper": {
                  borderRadius: "20px 20px 20px 20px",
                },
              }}
              id="basic-menu"
              anchorEl={anchorElLinks}
              open={openMenuLinks}
              onClose={handleCloseLinks}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}
            >
              <StyleMenuItem
                onClick={handleCopyLink}
                sx={{
                  marginLeft: "-7px",
                  // fontSize for different screen sizes
                  fontSize: {
                    sps: "11px",
                    ps: "13px",
                    ts: "13px",
                    sls: "15px",
                    sms: "16px",
                    sc: "16px",
                    nsc: "16px",
                    ns: "16px",
                    msc: "16px",
                    mns: "16px",
                    ms: "16px",
                    lgs: "16px",
                  },
                }}
              >
                <CopyLinkButton />
                Copy Link
              </StyleMenuItem>
              <StyleMenuItem
                onClick={handleFacebookLink}
                sx={{
                  // fontSize for different screen sizes
                  fontSize: {
                    sps: "11px",
                    ps: "13px",
                    ts: "13px",
                    sls: "15px",
                    sms: "16px",
                    sc: "16px",
                    nsc: "16px",
                    ns: "16px",
                    msc: "16px",
                    mns: "16px",
                    ms: "16px",
                    lgs: "16px",
                  },
                }}
              >
                <FacebookShareButton
                  style={{ display: "flex", marginRight: "9px" }}
                  url={`${String(window.location)}`}
                  ref={facebookLink}
                >
                  <FacebookIcon size={26} round />
                </FacebookShareButton>
                Share to Facebook
              </StyleMenuItem>

              <StyleMenuItem
                onClick={handleWhatsappLink}
                sx={{
                  // fontSize for different screen sizes
                  fontSize: {
                    sps: "11px",
                    ps: "13px",
                    ts: "13px",
                    sls: "15px",
                    sms: "16px",
                    sc: "16px",
                    nsc: "16px",
                    ns: "16px",
                    msc: "16px",
                    mns: "16px",
                    ms: "16px",
                    lgs: "16px",
                  },
                }}
              >
                <WhatsappShareButton
                  style={{ display: "flex", marginRight: "9px" }}
                  url={`${String(window.location)}`}
                  ref={whatsappLink}
                >
                  <WhatsappIcon size={26} round />
                </WhatsappShareButton>
                Share to Whatsapp
              </StyleMenuItem>
              <StyleMenuItem
                onClick={handleTwitterLink}
                sx={{
                  // fontSize for different screen sizes
                  fontSize: {
                    sps: "11px",
                    ps: "13px",
                    ts: "13px",
                    sls: "15px",
                    sms: "16px",
                    sc: "16px",
                    nsc: "16px",
                    ns: "16px",
                    msc: "16px",
                    mns: "16px",
                    ms: "16px",
                    lgs: "16px",
                  },
                }}
              >
                <TwitterShareButton
                  style={{ display: "flex", marginRight: "9px" }}
                  url={`${String(window.location)}`}
                  ref={twitterLink}
                >
                  <TwitterIcon size={26} round />
                </TwitterShareButton>
                Share to Twitter
              </StyleMenuItem>
              {!showAllShareLinks ? (
                <StyleMenuItem
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-evenly",
                    minHeight: "0",
                  }}
                  onClick={handleShowMoreLinks}
                >
                  <ExpandMoreIcon sx={{ cursor: "pointer" }} />
                </StyleMenuItem>
              ) : null}
              {showAllShareLinks ? (
                <div>
                  <StyleMenuItem
                    onClick={handleLineLink}
                    sx={{
                      // fontSize for different screen sizes
                      fontSize: {
                        sps: "11px",
                        ps: "13px",
                        ts: "13px",
                        sls: "15px",
                        sms: "16px",
                        sc: "16px",
                        nsc: "16px",
                        ns: "16px",
                        msc: "16px",
                        mns: "16px",
                        ms: "16px",
                        lgs: "16px",
                      },
                    }}
                  >
                    <LineShareButton
                      style={{ display: "flex", marginRight: "9px" }}
                      url={`${String(window.location)}`}
                      ref={lineLink}
                    >
                      <LineIcon size={26} round />
                    </LineShareButton>
                    Share to Line
                  </StyleMenuItem>

                  <StyleMenuItem
                    onClick={handleRedditLink}
                    sx={{
                      // fontSize for different screen sizes
                      fontSize: {
                        sps: "11px",
                        ps: "13px",
                        ts: "13px",
                        sls: "15px",
                        sms: "16px",
                        sc: "16px",
                        nsc: "16px",
                        ns: "16px",
                        msc: "16px",
                        mns: "16px",
                        ms: "16px",
                        lgs: "16px",
                      },
                    }}
                  >
                    <RedditShareButton
                      style={{ display: "flex", marginRight: "9px" }}
                      url={`${String(window.location)}`}
                      ref={redditLink}
                    >
                      <RedditIcon size={26} round />
                    </RedditShareButton>
                    Share to Reddit
                  </StyleMenuItem>

                  <StyleMenuItem
                    onClick={handleTelegramLink}
                    sx={{
                      // fontSize for different screen sizes
                      fontSize: {
                        sps: "11px",
                        ps: "13px",
                        ts: "13px",
                        sls: "15px",
                        sms: "16px",
                        sc: "16px",
                        nsc: "16px",
                        ns: "16px",
                        msc: "16px",
                        mns: "16px",
                        ms: "16px",
                        lgs: "16px",
                      },
                    }}
                  >
                    <TelegramShareButton
                      style={{ display: "flex", marginRight: "9px" }}
                      url={`${String(window.location)}`}
                      ref={telegramLink}
                    >
                      <TelegramIcon size={26} round />
                    </TelegramShareButton>
                    Share to Telegram
                  </StyleMenuItem>
                  <StyleMenuItem
                    onClick={handlePinterestLink}
                    sx={{
                      // fontSize for different screen sizes
                      fontSize: {
                        sps: "11px",
                        ps: "13px",
                        ts: "13px",
                        sls: "15px",
                        sms: "16px",
                        sc: "16px",
                        nsc: "16px",
                        ns: "16px",
                        msc: "16px",
                        mns: "16px",
                        ms: "16px",
                        lgs: "16px",
                      },
                    }}
                  >
                    <PinterestShareButton
                      style={{ display: "flex", marginRight: "9px" }}
                      url={`${String(window.location)}`}
                      media={`${String(window.location)}`}
                      ref={pinterestLink}
                      description=""
                    >
                      <PinterestIcon size={26} round />
                    </PinterestShareButton>
                    Share to Pinterest
                  </StyleMenuItem>

                  {showAllShareLinks ? (
                    <StyleMenuItem
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-evenly",
                        minHeight: "0",
                      }}
                      onClick={handleShowLessLinks}
                    >
                      <ExpandLessIcon sx={{ cursor: "pointer" }} />
                    </StyleMenuItem>
                  ) : null}
                </div>
              ) : null}
            </Menu>

            <ShareButton
              loadedPlaces={loadedPlaces}
              onOpenMenuLinks={openMenuLinks}
              onClickLinks={handleClickLinks}
              onSharePost={sharedPost}
              onChangeShareCount={sendCount}
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
                            // fontSize for different screen sizes
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
                            // fontSize for different screen sizes
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
                    <Zoom
                      in={true}
                      style={{ transitionDelay: true ? "200ms" : "0ms" }}
                    >
                      <Box
                        sx={{
                          // height for different screen sizes
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
                    </Zoom>
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
