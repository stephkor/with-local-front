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
    <Card sx={{ padding: "1.6rem 1.15rem 1.2rem 1.2rem" ,  mt: "1.2rem", boxShadow: "none", borderRadius: "none", height: "17.8rem", }} onClick={onClick} >
      <ContentBadge desc={desc} />
      <CardContent
        sx={{
          fontFamily: "NanumSquare",
          fontSize: "14px",
          fontWeight: "bold",
          fontStretch: "normal",
          fontStyle: "normal",
          lineHeight: 1.71,
          letterSpacing: "normal",
          textAlign: "left", height:"7.7rem",
          p: 0,
          width: "28.6rem",
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
          height: "4.2rem",
            padding: 0
        }}
      >

        <Box  display={"flex"} alignItems={"center"} p={0}>
            <Box display={"flex"} alignItems={"center"} p={0}>
            <img
                style={{width: "1.8rem",
                    height: "1.8rem",
                    objectFit: "contain"}}
              src={
                userLiked ? "/images/IC_heart_fill.svg" : "/images/IC_heart.svg"
              }
              alt={"like icon"}
            />
                <Typography fontSize={"1rem"} sx={{ marginRight: "0.125rem"}}>좋아요</Typography>
            <Typography fontSize={"1rem"}>{userLikeNum}</Typography>
        </Box>
            <Box display={"flex"} alignItems={"center"}>

              <img src={"/images/IC_comment_H18.svg"} alt={"comment icon"} onClick={onClickCommentIcon} style={{width: "1.8rem",
                  height: "1.8rem",
                  margin: "0 0.125rem 0 0",
                  objectFit: "contain"}} />

              <Typography fontSize={"1rem"} sx={{ marginRight: "0.125rem"}}>댓글</Typography>
            <Typography fontSize={"1rem"}>{userCommentNum}</Typography>
            </Box>
        </Box>
        <Box>
          <Typography fontSize={"1rem"}>{handleCreatedAt()}</Typography>
        </Box>

      </CardActions>
    </Card>
  );
};

export default Content;
