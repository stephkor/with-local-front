import React, { useCallback, useEffect, useState } from "react";
import _ from "lodash";
import Topbar from "src/components/Dashboard/Topbar";
import Box from "@mui/material/Box";
import { useSelector } from "react-redux";
import { useSnackbar } from "notistack";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";

import ContentBadge from "../../components/Content/Badge";
import {
  CardActions,
  CardContent,
  Divider,
  Icon,
  IconButton,
  Typography,
  TextField,
  Button,
} from "@mui/material";
import { grey } from "@mui/material/colors";
import { styled } from "@mui/material/styles";
import dayjs from "dayjs";
import {
  getComment,
  postComment,
  postLike,
  postCommentReply,
  getDetail,
} from "../../apis/boardApis";

const StyledBox = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "light" ? "#fff" : grey[800],
}));

const Detail = () => {
  const [effectUpdate, setEffectUpdate] = useState(false);
  const address = useSelector((state) => state.location.selectedLocation);
  const content = useSelector((state) => state.content.content);
  const [detail, setDetail] = useState({});
  const { postId } = content;

  const {
    category,
    description,
    likeCount,
    commentCount,
    createdAt,
    isLiked,
    images,
  } = detail;

  const [open, setOpen] = React.useState(false);
  const [openReply, setOpenReply] = useState(false);
  const [commentText, setCommentText] = useState("");

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };
  const toggleReplyDrawer = (newOpen) => () => {
    setOpenReply(newOpen);
  };
  const drawerBleeding = 53;
  const [userLiked, setUserLiked] = useState(isLiked);
  const [userLikeNum, setUserLikeNum] = useState(likeCount);
  const userCommentNum = commentCount;
  const [comment, setComment] = useState([]);
  const [commentId, setCommentId] = useState("");
  const { enqueueSnackbar } = useSnackbar();
  const { lang } = useSelector((state) => state.lang);

  // const now = dayjs();

  const handleCreatedAt = () => {
    //  = dayjs(createdAt).diff(now, "minutes");
    return dayjs(createdAt).format("YYYY-MM-DD hh:mm");
  };

  const handleEffectUpdate = useCallback(() => {
    setEffectUpdate((effectUpdate) => !effectUpdate);
  }, []);

  const handleSubmit = async () => {
    try {
      toggleDrawer(false);
      await postComment(postId, lang, commentText);

      enqueueSnackbar("댓글이 등록되었습니다", {
        variant: "success",
        autoHideDuration: 3000,
      });

      handleEffectUpdate();
    } catch (e) {
      enqueueSnackbar(e.message, {
        variant: "error",
        autoHideDuration: 3000,
      });
    }
  };
  const handleReplySubmit = async () => {
    toggleDrawer(false);
    try {
      await postCommentReply(postId, lang, commentText, commentId);

      enqueueSnackbar("댓글이 등록되었습니다", {
        variant: "success",
        autoHideDuration: 3000,
      });

      handleEffectUpdate();
      window.location.reload();
    } catch (e) {
      enqueueSnackbar(e.message, {
        variant: "error",
        autoHideDuration: 3000,
      });
    }
  };

  const onClickLike = async () => {
    try {
      const res = await postLike(postId);

      setUserLikeNum(userLiked ? likeCount : likeCount + 1);
      setUserLiked(!userLiked);
      if (res.status !== 201) {
        setUserLiked(userLiked);
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    let mounted = true;
    console.log(mounted);

    const requestPost = async () => {
      try {
        const res = await getDetail(postId, lang);
        setDetail(res.data.data);
      } catch (e) {
        console.log(e);
      }
    };

    const requestComment = async () => {
      try {
        const res = await getComment(postId, "ko");
        const { data } = res;
        setComment(_.get(data, "data", []));
      } catch (e) {
        console.log(e);
        enqueueSnackbar(e.message, {
          variant: "error",
          autoHideDuration: 3000,
        });
      }
    };
    requestPost();
    requestComment();
    return () => {
      mounted = false;
    };
  }, [postId, enqueueSnackbar, effectUpdate, lang]);

  return (
    <Box
      sx={{
        backgroundColor: "#f2f3f8",
        height: "100%",
      }}
    >
      <Topbar address={address} />

      <Box
        sx={{
          width: "21.438rem",
          paddingBottom: 1,
          pt: 1,
          height: "100%",
          paddingLeft: "1rem",
          paddingRight: "1rem",
          backgroundColor: "#f2f3f8",
        }}
      >
        <ContentBadge desc={category} />
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
            width: "inherit",
            height: "23.813rem",
            display: "flex",
            justifyContent: "space-between",
            flexDirection: "column",
          }}
        >
          <div>{description}</div>
          <div>
            {Array.isArray(images) && images.length > 1 ? (
              images.map((image) => (
                <Box key={"img"} component={"img"} src={image.url} />
              ))
            ) : Array.isArray(images) && images.length === 1 ? (
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
            backgroundColor: "#f2f3f8",
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
                  userLiked
                    ? "/images/IC_heart_fill.svg"
                    : "/images/IC_heart.svg"
                }
                alt={"like icon"}
              />
              <Typography>{userLikeNum}</Typography>
            </IconButton>
            <IconButton size={"small"} onClick={toggleDrawer(true)}>
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
        <Divider />
        <Box sx={{ height: 50, backgroundColor: "#f2f3f8" }}>
          {comment &&
            comment.map((comm, i) => (
              <Box sx={{ backgroundColor: "#f2f3f8", width: "100vw" }}>
                <Box sx={{ backgroundColor: "#f2f3f8", padding: 2 }}>
                  <Typography key={i}>{comm.text}</Typography>
                  <Typography variant="caption">{comm.createdAt}</Typography>
                  <Button
                    variant="caption"
                    onClick={() => {
                      setCommentId(comm.commentId);
                      toggleReplyDrawer(true);
                    }}
                  >
                    {" "}
                    reply
                  </Button>
                  {comm.replies?.length >= 1 &&
                    comm.replies.map((repl) => (
                      <Box sx={{ p: 2 }}>
                        <Typography>{repl}</Typography>
                      </Box>
                    ))}
                </Box>
              </Box>
            ))}
        </Box>
        <div>
          {
            <SwipeableDrawer
              anchor="bottom"
              open={open}
              onClose={toggleDrawer(false)}
              onOpen={toggleDrawer(true)}
              swipeAreaWidth={drawerBleeding}
              disableSwipeToOpen={false}
              ModalProps={{
                keepMounted: true,
              }}
            >
              <StyledBox
                sx={{
                  position: "absolute",
                  top: -drawerBleeding,
                  borderTopLeftRadius: 8,
                  borderTopRightRadius: 8,
                  visibility: "visible",
                  right: 0,
                  left: 0,
                }}
              ></StyledBox>
              <StyledBox
                sx={{
                  px: 2,
                  pb: 2,
                  pt: 2,
                  height: 140,
                  overflow: "auto",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <TextField
                  multiline
                  rows={4}
                  placeholder="타인을 존중하는 말 한마디가 상대방에게 큰 힘이 됩니다!"
                  onChange={(e) => setCommentText(e.target.value)}
                />
              </StyledBox>
              <Button
                variant="contained"
                onClick={() => {
                  handleSubmit();
                  toggleDrawer(false);
                }}
              >
                {" "}
                댓글 쓰기
              </Button>
            </SwipeableDrawer>
          }
        </div>
        <div>
          {
            <SwipeableDrawer
              anchor="bottom"
              open={openReply}
              onClose={toggleReplyDrawer(false)}
              onOpen={toggleReplyDrawer(true)}
              swipeAreaWidth={drawerBleeding}
              disableSwipeToOpen={false}
              ModalProps={{
                keepMounted: true,
              }}
            >
              <StyledBox
                sx={{
                  position: "absolute",
                  top: -drawerBleeding,
                  borderTopLeftRadius: 8,
                  borderTopRightRadius: 8,
                  visibility: "visible",
                  right: 0,
                  left: 0,
                }}
              ></StyledBox>
              <StyledBox
                sx={{
                  px: 2,
                  pb: 2,
                  pt: 2,
                  height: 140,
                  overflow: "auto",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <TextField
                  multiline
                  rows={4}
                  placeholder="타인을 존중하는 말 한마디가 상대방에게 큰 힘이 됩니다!"
                  onChange={(e) => setCommentText(e.target.value)}
                />
              </StyledBox>
              <Button variant="contained" onClick={handleReplySubmit}>
                댓글 쓰기
              </Button>
            </SwipeableDrawer>
          }
        </div>
      </Box>
    </Box>
  );
};

export default Detail;
