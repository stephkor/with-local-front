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

interface ContentProps {
  desc: desc;
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
  const [userCommentNum, setUserCommentNum] = useState<number>(commentNum);

  if (commentNum === 0) {
    setUserCommentNum(999);
  }

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
          paddingBottom: 0,
        }}
      >
        <Box>
          <IconButton
            color={isLiked ? "primary" : "default"}
            onClick={() => {
              setUserLikeNum(userLiked ? likeNum : likeNum++);
              setUserLiked(!userLiked);
            }}
          >
            <img
              src={
                userLiked
                  ? "/images/icons/heart_fill.png"
                  : "/images/icons/heart.png"
              }
              alt={"like icon"}
            />
            <Typography>{userLikeNum}</Typography>
          </IconButton>
          <IconButton>
            <Icon>
              <img src={"/images/icons/comment.png"} alt={"comment icon"} />
              <Typography>댓글</Typography>
            </Icon>
            <Typography>{userCommentNum}</Typography>
          </IconButton>
        </Box>
        <Box>
          <Typography>{createdAt}</Typography>
        </Box>
      </CardActions>
    </Card>
  );
};

export default Content;
