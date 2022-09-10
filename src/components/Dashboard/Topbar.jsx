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
  Select,
} from "@mui/material";
import { TOPBAR_HEIGHT } from "../../config/layout";
import Box from "@mui/material/Box";
import history from "history/browser";
import { theme } from "../../theme";
import { SearchOutlined } from "@mui/icons-material";
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

  const onClickBack = () => {
    history.back();
  };
  console.log(isHamburgerClicked);

  const { isLoggedIn } = useSelector((state) => state.user);

  const handleLangCLick = useCallback((e) => {
    setIsLangClicked(true);
  }, []);

  const handleLanguage = (e) => {
    dispatch(changeLangSetting(e.target.value));
    setIsLangClicked(false);
  };
  const handleHamburgerClicked = useCallback((e) => {
    setIsHamburgerClicked((isHamburgerClicked) => !isHamburgerClicked);
    handleClick(e);
  }, []);

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
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
          padding: "12px 16px 12px 18px",
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
                />
              </IconButton>
              <Typography variant={"h6"} color={"black"} sx={{ ml: 1 }}>
                {selectedLocation || "역삼동"}
              </Typography>
            </Box>
          ) : (
            <img
              className={"logo"}
              src={"/images/with-local-logo.png"}
              alt={"logo"}
              onClick={() => navigate("/")}
              style={{ width: "5.938rem", height: "1.313rem" }}
            />
          )}
        </Box>
        <Box>
          <Box
            component={"img"}
            src={"/images/Location_H24.svg"}
            sx={{ mr: "0.875rem" }}
            onClick={handleLangCLick}
          />
          <SearchOutlined
            sx={{ color: "black", mr: "0.875rem" }}
            onClick={() => setIsSearchClicked(true)}
          />
          <img
            src={"/images/IC_Hamburger.svg"}
            onClick={handleHamburgerClicked}
            alt="hamburger menu"
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
            />
          </IconButton>
          <TextField
            autoFocus
            sx={{
              width: "75vw",
              "& .css-17s7jup-MuiInputBase-root-MuiOutlinedInput-root": {
                borderRadius: "40px",
                backgroundColor: "#FFFFFF",
              },
            }}
            size={"small"}
            placeholder={"무엇이 궁금하신가요?"}
            margin="dense"
            InputProps={{
              endAdornment: (
                <InputAdornment position={"end"}>
                  <Box component={"img"} src={"/images/IC_Search.svg"} />
                </InputAdornment>
              ),
            }}
          />
        </Box>
      )}
      {isLangClicked && (
        <Select
          open={isLangClicked}
          onChange={handleLanguage}
          sx={{ display: "none" }}
        >
          {LangMap.map((el) => (
            <MenuItem value={el.value}>{el.title}</MenuItem>
          ))}
        </Select>
      )}
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
