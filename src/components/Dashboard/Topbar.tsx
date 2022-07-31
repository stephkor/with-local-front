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
        <Box>
          <Typography sx={{
            fontFamily: "FuturaBdCnBT",
            color: theme.palette.text.primary,
            fontSize: "1.125rem",
            fontWeight: "bold",
            fontStyle: "italic",
            lineHeight: 2.22,
            textAlign: "left"
          }}>
            WITH LOCAL
          </Typography>
        </Box>
      </Box>
    </AppBar>
  );
};

export default Topbar;
