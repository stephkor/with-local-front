import React from "react";
import dayjs from "dayjs";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setContentInfo } from "src/store/slices/contentSlice";
import { Card, CardContent, Typography, Box } from "@mui/material";
import ContentBadge from "src/components/Content/Badge";
import MypageContentBadge from "../MypageContentBadge";

const MyPageContent = ({
  likeNum,
  commentNum,
  createdAt,
  desc,
  value,
  post,
}) => {
  const handleCreatedAt = () => {
    // const diff = dayjs(createdAt).diff(now, "minutes");
    return dayjs(createdAt).format("YYYY-MM-DD");
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onClickContent = (e, post) => {
    e.preventDefault();

    dispatch(setContentInfo(post));

    navigate("/detail");
  };

  const displayValue = value.slice(0, 15);

  return (
    <Card
      sx={{
          padding: "1.2rem",
        width: "34.3rem",
          height: "6.8rem",
        marginBottom: "0.8rem",
      }}
      onClick={(e) => onClickContent(e, post)}
    >
      <Box display="flex" flexDirection={"row"} alignItems={"fs"}>
        <MypageContentBadge desc={desc} sx={{ "& div" : {
            margin: 0
            }}} />
        <div
          style={{
            fontFamily: "NanumSquare",
            fontSize: "1.4rem",
            fontWeight: "bold",
            fontStretch: "normal",
            fontStyle: "normal",
            lineHeight: 1.71,
            letterSpacing: "normal",
            textAlign: "left",
            padding: 0,
              "& .MuiCardContent-root":{
                paddingBottom: 0
              },
              "&  .MuiCardContent-root:last-child": {
                  paddingBottom: 0
              }

          }}
        >
          <div>{displayValue} ...</div>
        </div>
      </Box>
      <Box display="flex" alignItems="center" >
        <Typography sx={{fontSize: "1rem", mr: "0.2rem"}}>{handleCreatedAt()}</Typography>
        <Typography sx={{fontSize: "1rem", mr: "0.2rem"}}> 좋아요 {likeNum}</Typography>
        <Typography sx={{fontSize: "1rem", mr: "0.2rem"}}>댓글 {commentNum}</Typography>
      </Box>
    </Card>
  );
};

export default MyPageContent;
