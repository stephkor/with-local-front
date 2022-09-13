import React, {useState, useEffect, useCallback} from "react";
import {
    Box,
    Typography,
    TextField,
    InputAdornment,
    MenuItem,
    Select, Popper, InputLabel,
} from "@mui/material";
import { theme } from "../../theme";
import { useNavigate } from "react-router-dom";
import Autocomplete from '@mui/material/Autocomplete';

import { getGuAddress } from "../../apis/addressApis";
import { setSelectedLocation } from "../../store/slices/locationSlice";
import { changeLangSetting } from "src/store/slices/languageSlice";
import { useDispatch, useSelector } from "react-redux";

const Intro = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { lang } = useSelector((state) => state.lang);
  const { selectedLocation } = useSelector((state) => state.location);
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(anchorEl ? null : event.currentTarget);
    };

    const open = Boolean(anchorEl);
  const [isSearchClicked, setIsSearchClicked] = useState(false);
  const [guList, setGuList] = useState([]);
  const handleCurrentGu = useCallback((e, newValue) => {
    dispatch(setSelectedLocation(newValue.gu));
  },[]);

  const handleLanguage = (e) => {
    dispatch(changeLangSetting(e.target.value));
  };



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

  if (selectedLocation && lang) {
    navigate("/main");
  }


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
          <Autocomplete
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
            onChange={(e, newValue) => handleCurrentGu(e, newValue)}
            placeholder={"오늘은 어디를 여행하시나요?"}
            margin="dense"
            options={guList}
            getOptionLabel={(option) => option.gu}
            renderInput={(params) => <TextField {...params} placeholder="오늘은 어디를 여행하시나요?" InputProps={{ ...params.InputProps}} />}
            InputProps={{
              endAdornment: (
                <InputAdornment position={"end"}>
                  <Box component={"img"} src={"/images/IC_Search.svg"} />
                </InputAdornment>
              ),
            }}
          />
          <TextField
            sx={{ width: "45vw", marginTop: "2.063rem", ".css-euzdch-MuiInputBase-root-MuiInput-root:before" : {
                borderBottom: "none"
                }}}
            select id="select"
            label="언어 선택"
            variant={"standard"}
            onChange={handleLanguage}
            InputProps={{
              startAdornment: (
                  <InputAdornment position="start">
                      <Box component={"img"} src={"/images/Location_H24.svg"}/>
                  </InputAdornment>
              ),
          }}>
            <MenuItem value={"ko"}>Korean</MenuItem>
            <MenuItem value={"jp"}>Japanese</MenuItem>
            <MenuItem value={"en"}>English</MenuItem>
          </TextField>
        </Box>
      </Box>
    </Box>
  );
};

export default Intro;
