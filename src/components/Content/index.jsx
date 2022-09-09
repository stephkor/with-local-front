import React, { useState } from "react";
import Card from "@mui/material/Card";
import {
  CardActions,
  CardContent,
  Icon,
  IconButton,
  Typography,
  Box,
  Divider,
} from "@mui/material";

import ContentBadge from "./Badge";
import dayjs from "dayjs";
import { getComment, postLike } from "../../apis/boardApis";

const Content = ({
  desc,
  value,
  likeNum,
  commentNum,
  isLiked,
  createdAt,
  postId,
  onClick,
  images,
}) => {
  const [userLiked, setUserLiked] = useState(isLiked);
  const [userLikeNum, setUserLikeNum] = useState(likeNum);
  const userCommentNum = commentNum;
  const now = dayjs();

  console.log(images);

  const handleCreatedAt = () => {
    const diff = dayjs(createdAt).diff(now, "minutes");
    return dayjs(createdAt).format("YYYY-MM-DD hh:mm");
  };

  const onClickLike = async () => {
    try {
      const res = await postLike(postId);

      setUserLikeNum(userLiked ? likeNum : ++likeNum);
      setUserLiked(!userLiked);
      if (res.status !== 201) {
        setUserLiked(userLiked);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const onClickCommentIcon = async () => {
    try {
      const res = await getComment(postId, "ko");

      console.log(res?.data?.data);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Card
      sx={{ padding: "1rem", width: "21.438rem", paddingBottom: 1, mt: 1 }}
      onClick={onClick}
    >
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
          width: "auto",
          height: "4.813rem",
        }}
      >
        <div>{value}</div>
        <div>
          {images.length > 1 ? (
            images.map((image) => (
              <Box key={"img"} component={"img"} src={image.url} />
            ))
          ) : images.length === 1 ? (
            <Box component={"img"} key={"img"} src={images[0].url} />
          ) : (
            ""
          )}
        </div>
      </CardContent>
      <Divider />
      <CardActions
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          p: 0,
          pt: 0.5,
        }}
      >
        <Box sx={{ p: 0 }}>
          <IconButton
            size={"small"}
            color={isLiked ? "primary" : "default"}
            onClick={onClickLike}
          >
            <img
              src={
                userLiked ? "/images/IC_heart_fill.svg" : "/images/IC_heart.svg"
              }
              alt={"like icon"}
            />
            <Typography>{userLikeNum}</Typography>
          </IconButton>
          <IconButton size={"small"} onClick={onClickCommentIcon}>
            <Icon>
              <img src={"/images/IC_comment_H18.svg"} alt={"comment icon"} />
              <Typography>댓글</Typography>
            </Icon>
            <Typography>{userCommentNum}</Typography>
          </IconButton>
        </Box>
        <Box>
          <Typography>{handleCreatedAt()}</Typography>
        </Box>
      </CardActions>
    </Card>
  );
};

export default Content;
