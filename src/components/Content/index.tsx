import React, { FC, useState } from "react";
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

interface ContentProps {
  desc: string;
  value: string;
  likeNum: number;
  commentNum: number;
  isLiked: boolean;
  createdAt: string;
}

const Content: FC<ContentProps> = ({
  desc,
  value,
  likeNum,
  commentNum,
  isLiked,
  createdAt,
}) => {
  const [userLiked, setUserLiked] = useState<boolean>(isLiked);
  const [userLikeNum, setUserLikeNum] = useState<number>(likeNum);
  const userCommentNum = commentNum;
  const now = dayjs();

  const handleCreatedAt = () => {
    const diff = dayjs(createdAt).diff(now, "minutes");

    if (diff > 10) {
      return dayjs(createdAt).format("YYYY-MM-DD hh:mm");
    } else {
      return `${diff} 전`;
    }
  };

  return (
    <Card sx={{ padding: "1rem", width: "21.438rem", paddingBottom: 1, mt: 1 }}>
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
        {value}
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
            onClick={() => {
              setUserLikeNum(userLiked ? likeNum : ++likeNum);
              setUserLiked(!userLiked);
            }}
          >
            <img
              src={
                userLiked ? "/images/IC_heart_fill.svg" : "/images/IC_heart.svg"
              }
              alt={"like icon"}
            />
            <Typography>{userLikeNum}</Typography>
          </IconButton>
          <IconButton size={"small"}>
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
