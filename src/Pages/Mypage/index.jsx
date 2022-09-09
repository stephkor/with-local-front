import React from "react";
import { Typography, Box } from "@mui/material";

const Mypage = () => {
  return (
    <Box display={"flex"} flexDirection={"column"}>
      <Box
        sx={{
          mt: "1.5rem",
        }}
      >
        <Typography variant={"h6"}> 서울 로컬</Typography>
      </Box>
      <Box>
        <Typography>내가 받은 리워드</Typography>
      </Box>
      <Box>
        <Typography>저장한 글</Typography>
      </Box>
      <Box>
        <Typography>좋아요 한 글</Typography>
      </Box>
      <Box>
        <Typography>내가 남길 댓글</Typography>
      </Box>
    </Box>
  );
};

export default Mypage;
