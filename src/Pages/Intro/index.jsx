import React, {useState, useEffect, useCallback} from "react";
import {
    Box,
    Typography,
    TextField,
    InputAdornment,
    MenuItem,

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

  const [guList, setGuList] = useState([]);
  const handleCurrentGu = useCallback((e, newValue) => {
    dispatch(setSelectedLocation(newValue.gu));
  },[dispatch]);

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

          <Box component={"img"} src="/images/with-local-intro.png"
               sx={{
                   mt: "1.786rem",
                   width: "9.967rem" ,
                   height: "1.732rem"}}/>
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
              width: "28.6rem",
              height: "7.6rem",
              margin: " 5.875rem 2.75rem 2.813rem",
              fontFamily: "NanumSquare",
              fontSize: "3rem",
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
              width: "75vw",mt: "3.2rem",
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
                  <Box component={"img"} src={"/images/IC_Search.png"} />
                </InputAdornment>
              ),
            }}
          />
          <TextField
            sx={{ width: "45vw", marginTop: "3.2rem", ".css-euzdch-MuiInputBase-root-MuiInput-root:before" : {
                borderBottom: "none"
                }}}
            select id="select"
            label="언어 선택"
            defaultValue={"언어 선택"}
            variant={"standard"}
            onChange={handleLanguage}
            InputProps={{
              startAdornment: (
                  <InputAdornment position="start">
                      <Box component={"img"} src={"/images/Location_H24.svg"}/>
                  </InputAdornment>
              ),
          }}
          >
              <MenuItem value={"언어 선택"}>언어선택</MenuItem>
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
