import React, { FC, useEffect, useState } from "react";

import Box from "@mui/material/Box";
import { TOPBAR_HEIGHT } from "src/config/layout";
import { changeLangSetting } from "../../store/slices/languageSlice";
import { theme } from 'src/theme'
import Topbar from "./Topbar";

interface DashboardProps {
  children: React.ReactNode; 
};


const Dashboard: FC<DashboardProps> = ({ children }) => {



  return (
    <>
      <Topbar />
      <Box
        sx={{
          paddingTop: `${TOPBAR_HEIGHT}px`,
          minHeight: `100vh`,
          backgroundColor: theme.palette.background.default,
          paddingLeft: "1rem",
          paddingRight: "1rem"
        }}
      >
        {children}
      </Box>
    </>
  );
};

export default Dashboard;
