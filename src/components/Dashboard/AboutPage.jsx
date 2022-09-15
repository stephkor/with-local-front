import React from "react";
import { Box, AppBar, IconButton } from "@mui/material";
import history from "history/browser";
import { TOPBAR_HEIGHT } from "src/config/layout";
import { theme } from "src/theme";

const AboutPage = () => {
  return (
    <Box sx={{ width: "100vw", height: "100vh" }}>
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
            display: "flex",
          }}
        >
          <Box>
            <IconButton onClick={() => history.back()}>
              <Box
                component={"img"}
                src={"/images/back.svg"}
                alt={"back to Appbar"}
              />
            </IconButton>
          </Box>
        </Box>
      </AppBar>
      <Box>
        <Box sx={{ width: "100vw" }} component="img" src="/images/with-local-intro.png" />
      </Box>
    </Box>
  );
};

export default AboutPage;
