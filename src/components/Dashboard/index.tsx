import React, { FC, useEffect, useState } from "react";

import { RootState } from "src/store";
import Box from "@mui/material/Box";
import { TOPBAR_HEIGHT } from "src/config/layout";
import { changeLangSetting } from "../../store/slices/languageSlice";
import Topbar from "./Topbar";

interface DashboardProps {
  children: React.ReactNode; 
};


const Dashboard: FC<DashboardProps> = ({ children }) => {

  console.log("dashboard");

  return (
    <>
      <Topbar />
      <Box
        sx={{
          paddingTop: `${TOPBAR_HEIGHT}px`,
          minHeight: `100vh`,
          bgcolor: "background.default",
        }}
      >
        {children}
      </Box>
    </>
  );
};

export default Dashboard;
