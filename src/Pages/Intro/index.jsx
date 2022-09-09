import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  TextField,
  InputAdornment,
  MenuItem,

  Select,
} from "@mui/material";
import { theme } from "../../theme";
import { useNavigate } from "react-router-dom";

import { getGuAddress } from "../../apis/addressApis";
import { setSelectedLocation } from "../../store/slices/locationSlice";
import { changeLangSetting } from "src/store/slices/languageSlice";
import { useDispatch, useSelector } from "react-redux";

const Intro = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { lang } = useSelector((state) => state.lang);
  const { selectedLocation } = useSelector((state) => state.location);

  const [isSearchClicked, setIsSearchClicked] = useState(false);
  const [guList, setGuList] = useState([]);
  const handleCurrentGu = (e) => {
    dispatch(setSelectedLocation(e.target.value));
  };

  const handleLanguage = (e) => {
    dispatch(changeLangSetting(e.target.value));
  };

  if (selectedLocation && lang) {
    navigate("/main");
  }

  useEffect(() => {
    const requestData = async () => {
      try {
        const res = await getGuAddress(1);
        const { data } = res;
        setGuList(data.data);
      } catch (e) {
        console.log(e);
      }
    };

    requestData();
  }, [dispatch]);

  return (
    <Box
      style={{
        backgroundColor: theme.palette.background.default,
        width: "100vw",
        height: "100vh",
      }}
    >
      <Box
        display="flex"
        alignItems="center"
        justifyContent={"center"}
        flexDirection="column"
      >
        <div
          style={{
            padding: "1.105rem 0 0 ",
            width: "6.229rem",
            height: "1.083rem",
          }}
        >
          <Box component={"img"} src="/images/with-local-intro.png" />
        </div>
        <Box />
        <Box />
        <Box
          display="flex"
          alignItems="center"
          justifyCOntnet="center"
          flexDirection={"column"}
        >
          <Typography
            style={{
              width: "17.875rem",
              height: "4.75rem",
              margin: " 5.875rem 2.75rem 2.813rem",
              fontFamily: "NanumSquare",
              fontSize: "1.875rem",
              fontWeight: 800,
              lineHeight: 1.33,
              textAlign: "center",
            }}
          >
            로컬과 함께 <br />
            서울을 여행해봐요!
          </Typography>

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
            onClick={() => setIsSearchClicked(true)}
            placeholder={"오늘은 어디를 여행하시나요??"}
            margin="dense"
            InputProps={{
              endAdornment: (
                <InputAdornment position={"end"}>
                  <Box component={"img"} src={"/images/IC_Search.svg"} />
                </InputAdornment>
              ),
            }}
          />
          {isSearchClicked && (
            <Select
              margin="dense"
              variant="outlined"
              value={selectedLocation}
              onChange={handleCurrentGu}
            >
              {guList.map((list) => (
                <MenuItem key={list.gu} value={list?.gu}>
                  <Typography>{list?.gu}</Typography>
                </MenuItem>
              ))}
            </Select>
          )}
          {selectedLocation && (
            <Select
              onChange={handleLanguage}
              margin="dense"
              variant="outlined"
              value={lang}
              open
            >
              <MenuItem value={"ko"}>한국어 /Korean /韓國語</MenuItem>
              <MenuItem value={"jp"}>일본어 /Japanese /日本語</MenuItem>
              <MenuItem value={"en"}>영어 /English/ 英語</MenuItem>
            </Select>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default Intro;
