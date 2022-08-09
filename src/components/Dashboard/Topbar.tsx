import React, { FC, Fragment, useState } from "react";

import { AppBar, IconButton, InputAdornment, TextField } from "@mui/material";
import { TOPBAR_HEIGHT } from "../../config/layout";
import Box from "@mui/material/Box";
import { theme } from "../../theme";
import { SearchOutlined } from "@mui/icons-material";

const Topbar: FC = () => {
  const [isSearchClicked, setIsSearchClicked] = useState<boolean>(false);

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
          <img
            className={"logo"}
            src={"/images/with-local-logo.png"}
            alt={"logo"}
            style={{ width: "5.938rem", height: "1.313rem" }}
          />
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

export default Topbar;
