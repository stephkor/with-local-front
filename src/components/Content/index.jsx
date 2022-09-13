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
  // const now = dayjs();

  const handleCreatedAt = () => {
    // const diff = dayjs(createdAt).diff(now, "minutes");
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
      await getComment(postId, "ko");
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Card sx={{ padding: "1rem", paddingBottom: 1, mt: 1, boxShadow: "none", borderRadius: "none", height: "10.25rem", }} onClick={onClick} >
      <ContentBadge desc={desc} />
      <CardContent
        sx={{
          fontFamily: "NanumSquare",
          fontSize: "0.75rem",
          fontWeight: "bold",
          fontStretch: "normal",
          fontStyle: "normal",
          lineHeight: 1.71,
          letterSpacing: "normal",
          textAlign: "left",
          p: 0,
          width: "auto",
          height: "4.813rem",
          overflow: "hidden"
        }}
      >
        <div sx={{ overflow: "hidden"}}>{value}</div>
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
          height: "2.625rem",
            padding: 0
        }}
      >

        <Box  display={"flex"} alignItems={"center"} p={0}>
            <Box display={"flex"} alignItems={"center"} p={0}>
            <img
                style={{width: "1.125rem",
                    height: "1.125rem",
                    margin: "0 0.125rem 0 0",
                    objectFit: "contain"}}
              src={
                userLiked ? "/images/IC_heart_fill.svg" : "/images/IC_heart.svg"
              }
              alt={"like icon"}
            />
                <Typography fontSize={"0.625rem"} sx={{ marginRight: "0.125rem"}}>좋아요</Typography>
            <Typography fontSize={"0.625rem"}>{userLikeNum}</Typography>
        </Box>
            <Box display={"flex"} alignItems={"center"}>

              <img src={"/images/IC_comment_H18.svg"} alt={"comment icon"} onClick={onClickCommentIcon} style={{width: "1.125rem",
                  height: "1.125rem",
                  margin: "0 0.125rem 0 0",

                  objectFit: "contain"}} />

              <Typography fontSize={"0.625rem"} sx={{ marginRight: "0.125rem"}}>댓글</Typography>
            <Typography fontSize={"0.625rem"}>{userCommentNum}</Typography>
            </Box>
        </Box>
        <Box>
          <Typography fontSize={"0.625rem"}>{handleCreatedAt()}</Typography>
        </Box>

      </CardActions>
    </Card>
  );
};

export default Content;
