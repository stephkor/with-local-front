import React, { FC } from "react";

import { AppBar } from "@mui/material";
import { TOPBAR_HEIGHT } from "../../config/layout";
import Box from "@mui/material/Box";
import { theme } from "../../theme";
import { SearchOutlined } from "@mui/icons-material";

const Topbar: FC = () => {
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
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "12px 16px 12px 18px",
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
          <img src={"/images/icons/Location_H24.png"} />
          <SearchOutlined sx={{ color: "black" }} />
          <img src={"/images/icons/IC_Hamburger.png"} />
        </Box>
      </Box>
    </AppBar>
  );
};

export default Topbar;
