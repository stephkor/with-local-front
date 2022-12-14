import React, { useEffect } from "react";

import Box from "@mui/material/Box";
import { TOPBAR_HEIGHT } from "src/config/layout";
import Topbar from "./Topbar";
import { fetchRewardApi } from "../../apis/rewardsApis";
import {useDispatch} from "react-redux";
import { setReward } from "../../store/slices/userSlice";

const Dashboard = ({ children }) => {
  const dispatch = useDispatch();



  useEffect(() => {
    const requestReward = async () => {
      const res = await fetchRewardApi();

      dispatch(setReward(res?.data.data));
    };
    requestReward();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Topbar />
      <Box
        sx={{
          paddingTop: `${TOPBAR_HEIGHT}px`,
            width: "100%",
            height: "100%",
            overflow: "hidden",

        }}
      >
        {children}
      </Box>
    </>
  );
};

export default Dashboard;
