import React from "react";
import dayjs from "dayjs";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setContentInfo } from "src/store/slices/contentSlice";
import { Card, CardContent, Typography, Box } from "@mui/material";
import ContentBadge from "src/components/Content/Badge";

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
        padding: "0.5rem",
        width: "90%",
        marginBottom: 3,
      }}
      onClick={(e) => onClickContent(e, post)}
    >
      <Box display="flex">
        <ContentBadge desc={desc} />
        <CardContent
          sx={{
            fontFamily: "NanumSquare",
            fontSize: "0.875rem",
            fontWeight: "bold",
            fontStretch: "normal",
            fontStyle: "normal",
            lineHeight: 1.71,
            letterSpacing: "normal",
            textAlign: "left",
            p: 0,
          }}
        >
          <div>{displayValue} ...</div>
        </CardContent>
      </Box>
      <Box display="flex" alignItems="center" justifyContent={"space-evenly"}>
        <Typography>{handleCreatedAt()}</Typography>
        <Typography> 좋아요 {likeNum}</Typography>
        <Typography>댓글</Typography> <Typography>{commentNum}</Typography>
      </Box>
    </Card>
  );
};

export default MyPageContent;
