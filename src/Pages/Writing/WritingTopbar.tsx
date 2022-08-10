import React, { FC, useState } from "react";

import {
  AppBar,
  IconButton,
  InputAdornment,
  SxProps,
  TextField,
  Typography,
} from "@mui/material";
import { TOPBAR_HEIGHT } from "../../config/layout";
import Box from "@mui/material/Box";
import { SearchOutlined } from "@mui/icons-material";
import { useLocation } from "react-router-dom";
import history from "history/browser";

interface WritingTopbarProps {
  address?: string;
  sx?: SxProps;
}

const WritingTopbar: FC<WritingTopbarProps> = ({ address, ...sx }) => {
  const [isSearchClicked, setIsSearchClicked] = useState<boolean>(false);

  const onClickBack = () => {
    history.back();
  };

  return (
    <AppBar
      sx={{
        backgroundColor: "#f2f3f8",
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
        <Box display={"flex"} alignItems={"center"}>
          <IconButton onClick={onClickBack}>
            <Box
              component={"img"}
              src={"/images/back.svg"}
              alt={"back to Appbar"}
            />
          </IconButton>
          <Typography variant={"h6"} color={"black"} sx={{ ml: 1 }}>
            {address || "역삼동"}
          </Typography>
        </Box>
        <Box>
          <Box
            component={"img"}
            src={"/images/Location_H24.svg"}
            sx={{ mr: "0.875rem" }}
          />
          <SearchOutlined
            sx={{ color: "black", mr: "0.875rem" }}
            onClick={() => setIsSearchClicked(true)}
          />
          <img src={"/images/IC_Hamburger.svg"} />
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
    </AppBar>
  );
};

export default WritingTopbar;
