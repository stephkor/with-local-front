import React, { useCallback, useState } from "react";
import {
  AppBar,
  Button,
  IconButton,
  InputAdornment,
  Menu,
  TextField,
  Typography,
  MenuItem,
} from "@mui/material";

import { TOPBAR_HEIGHT } from "../../config/layout";
import Box from "@mui/material/Box";
import history from "history/browser";
import { theme } from "../../theme";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "src/store/slices/userSlice";
import { changeLangSetting } from "src/store/slices/languageSlice";
import { useLocation } from "react-router-dom";

const LangMap = [
  { title: "한국어 /Korean", value: "ko" },
  { title: "일본어 / Japanese", value: "jp" },
  { title: "영어 / English", value: "en" },
];

const Topbar = () => {
  const [isSearchClicked, setIsSearchClicked] = useState(false);
  const [isLangClicked, setIsLangClicked] = useState(false);
  const { selectedLocation } = useSelector((state) => state.location);
  const [isHamburgerClicked, setIsHamburgerClicked] = useState(false);
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  console.log(isLangClicked, isHamburgerClicked);
  const onClickBack = () => {
    history.back();
  };

  const { isLoggedIn } = useSelector((state) => state.user);

  const handleLanguage = (newValue) => {
    dispatch(changeLangSetting(newValue));
    setIsLangClicked(false);
    handleLangClose();
  };
  const handleHamburgerClicked = useCallback((e) => {
    setIsHamburgerClicked((isHamburgerClicked) => !isHamburgerClicked);
    handleClick(e);
  }, []);

  const [anchorEl, setAnchorEl] = useState(null);
  const [anchorLangEl, setAnchorLangEl] = useState(null);
  const open = Boolean(anchorEl);
  const langOpen = Boolean(anchorLangEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleLangClick = (event) => {
    setAnchorLangEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleLangClose = () => {
    setAnchorLangEl(null);
  };

  return (
    <AppBar
      sx={{
        backgroundColor: theme.palette.background.default,
        boxShadow: "none",
      }}
    >
      <Box
        sx={{
          height: TOPBAR_HEIGHT,
          alignItems: "center",
          justifyContent: "space-between",
          paddingLeft: "1rem",
          paddingRight: "1rem",
          width: "100vw",
          display: isSearchClicked ? "none" : "flex",
        }}
      >
        <Box>
          {location.pathname === "/writing" ||
          location.pathname === "/detail" ? (
            <Box display={"flex"} alignItems={"center"}>
              <IconButton onClick={onClickBack}>
                <Box
                  component={"img"}
                  src={"/images/back.svg"}
                  alt={"back to Appbar"}
sx={{
  width: "0.8rem",
  height: "1.4rem",
  margin: "0.5rem 2.4rem 0.5rem 0",
  objectFit: "contain",

}}
                />
              </IconButton>
              <Typography sx={{
                fontFamily: "NanumSquare",
                fontSize: "1.8rem",
                fontWeight: "bold",
                fontStretch: "normal",
                fontStyle: "normal",
                lineHeight: "normal",
                letterSpacing: "normal",
                textAlign: "left"
              }}>
                {selectedLocation}
              </Typography>
            </Box>
          ) : (
            <img
              className={"logo"}
              src={"/images/with-local-logo.png"}
              alt={"logo"}
              onClick={() => navigate("/")}
              style={{ width: "9.5rem", height: "2.1rem" }}
            />
          )}
        </Box>
        <Box>
          <Box
            component={"img"}
            src={"/images/Location_H24.svg"}
            style={{ width: "2.5rem",
              marginRight: "1.2rem"}}
            onClick={(e) => handleLangClick(e)}
          />
            <img src={"/images/IC_Search.png"} alt={"search icon"}
                 style={{width: "2.5rem",
              height: "2.5rem",
              marginRight: "1.2rem"}}
              onClick={()=> setIsSearchClicked(true)}
            />

          <img
            src={"/images/IC_Hamburger.svg"}
            onClick={handleHamburgerClicked}
            alt="hamburger menu"
            style={{width: "2.5rem",
              height: "2.5rem",
              }}
          />
        </Box>
      </Box>
      {isSearchClicked && (
        <Box
          display={"flex"}
          alignItems={"center"}
          justifyContent={"space-evenly"}
        >
          <IconButton onClick={() => setIsSearchClicked(false)}>
            <Box
              component={"img"}
              src={"/images/back.svg"}
              alt={"back to Appbar"}
              sx={{
                width: "0.8rem",
                height: "1.4rem",
                margin: "0.5rem 2.4rem 0.5rem 0",
                objectFit: "contain",

              }}

            />
          </IconButton>
          <TextField
            autoFocus
            sx={{
              width: "75vw",
              backgroundColor: "white",
              borderRadius: 40,
              "& .css-1h28jlc-MuiOutlinedInput-notchedOutline" : {
                borderRadius: 40,

              },
              "& MuiBox-root.css-1vr2anf": {
                borderRadius: 40,
              }
            }}
            size={"small"}
            placeholder={"무엇이 궁금하신가요?"}
            margin="dense"
            InputProps={{
              endAdornment: (
                <InputAdornment position={"end"}>
                  <Box component={"img"} src={"/images/IC_Search.png"} sx={{width: "1.5rem",
                    height: "1.5rem",}} />
                </InputAdornment>
              ),
            }}
          />
        </Box>
      )}

      <Menu open={langOpen} onClose={handleLangClose} anchorEl={anchorLangEl}>
        {LangMap.map((el) => (
          <MenuItem value={el.value} onClick={() => handleLanguage(el.value)}>
            {el.title}
          </MenuItem>
        ))}
      </Menu>

      <Menu open={open} onClose={handleClose} anchorEl={anchorEl}>
        <Box>
          {!isLoggedIn ? (
            <Box
              sx={{ width: "80vw", height: "80vh" }}
              display="flex"
              alignItems={"center"}
              justifyContent="center"
              flexDirection={"column"}
            >
              <Typography>로그인 후 커뮤니티에 참여하세요</Typography>
              <Button>
                <Link to="/login">LOGIN</Link>
              </Button>
              <Button>
                <Link to="/register">REGISTER</Link>
              </Button>
              <Button>
                <Link to="/about"> 사이트 소개</Link>
              </Button>
            </Box>
          ) : (
            <Box
              sx={{ width: "80vw", height: "80vh" }}
              display="flex"
              alignItems={"center"}
              justifyContent="center"
              flexDirection={"column"}
            >
              <Button>
                <Link to="/mypage"> 마이 페이지 </Link>
              </Button>
              <Button onClick={() => dispatch(logout())}>로그아웃</Button>
              <Button>
                <Link to="/about"> 사이트 소개</Link>
              </Button>
            </Box>
          )}
        </Box>
      </Menu>
    </AppBar>
  );
};

export default Topbar;
