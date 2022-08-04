import React, { FC } from "react";

import { AppBar, Typography } from "@mui/material";
import { TOPBAR_HEIGHT } from "../../config/layout";
import Box from "@mui/material/Box";
import { theme } from "../../theme";

const Topbar: FC = () => {
  return (
    <AppBar sx={{backgroundColor: theme.palette.background.default, boxShadow: "none"}}>
      <Box
        sx={{
          height: TOPBAR_HEIGHT,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "12px 16px 12px 18px",
        }}
      >
        <Box><img className={"logo"} src={'/images/with-local-logo.png'} alt={"logo"} style={{ width: "5.938rem", height: "1.313rem"}}/>

        </Box>
      </Box>
    </AppBar>
  );
};

export default Topbar;
