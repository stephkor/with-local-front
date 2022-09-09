import React, { useEffect } from "react";

import Box from "@mui/material/Box";
import { TOPBAR_HEIGHT } from "src/config/layout";
import Topbar from "./Topbar";
import { fetchRewardApi } from "../../apis/rewardsApis";
import { useDispatch } from "react-redux";
import { setReward } from "../../store/slices/userSlice";

const Dashboard = ({ children }) => {


  
  const dispatch = useDispatch();

  useEffect(() => {
    const requestReward = async () => {
      const res = await fetchRewardApi();
      console.log(res?.data.data);
      dispatch(setReward(res?.data.data));
    };
    requestReward();
  }, []);

  return (
    <>
      <Topbar />
      <Box
        sx={{
          paddingTop: `${TOPBAR_HEIGHT}px`,
          minHeight: `100vh`,
        }}
      >
        {children}
      </Box>
    </>
  );
};

export default Dashboard;
