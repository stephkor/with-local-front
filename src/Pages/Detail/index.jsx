import React, { useCallback, useEffect, useState } from "react";
import _ from "lodash";
import Topbar from "src/components/Dashboard/Topbar";
import Box from "@mui/material/Box";
import { useSelector } from "react-redux";
import { useSnackbar } from "notistack";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import LoginModal from "src/components/LoginModal";
import SubdirectoryArrowRightIcon from "@mui/icons-material/SubdirectoryArrowRight";
import BookmarkIcon from "@mui/icons-material/Bookmark";
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
  postMark,
  postCommentLike,
} from "../../apis/boardApis";
import {theme} from "../../theme";

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
    isMarked,
  } = detail;

  const [open, setOpen] = React.useState(false);
  const [openReply, setOpenReply] = React.useState(false);
  const [commentText, setCommentText] = useState("");
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  const toggleDrawer = (newOpen) => () => {
    if (!isLoggedIn) {
      setIsLoginModalOpen(true);
    } else setOpen(newOpen);
  };
  const onClickReply = (newOpen, id) => () => {
    if (!isLoggedIn) {
      setIsLoginModalOpen(true);
    } else setOpen(newOpen);
    setCommentId(id);
    setOpenReply(true);
  };

  const drawerBleeding = 50;
  const [userLiked, setUserLiked] = useState(isLiked);
  const [userLikeNum, setUserLikeNum] = useState(likeCount);
  const userCommentNum = commentCount;
  const [comment, setComment] = useState([]);
  const [commentId, setCommentId] = useState("");
  const { enqueueSnackbar } = useSnackbar();
  const { lang } = useSelector((state) => state.lang);
  const { isLoggedIn } = useSelector((state) => state.user);

  // const now = dayjs();

  const handleCreatedAt = () => {
    //  = dayjs(createdAt).diff(now, "minutes");
    return dayjs(createdAt).format("YYYY-MM-DD");
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
    if (!isLoggedIn) setIsLoginModalOpen(true)
    else
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

  const onClickCommentLike = async (postId, commentId) => {
    if (!isLoggedIn) setIsLoginModalOpen(true)
    else
    try {
      await postCommentLike(postId, commentId);
      setEffectUpdate((effectUpdate) => !effectUpdate);
      setCommentId("");
    } catch (e) {
      console.log(e);
    }
  };

  const onClickMark = async () => {
    if (!isLoggedIn) setIsLoginModalOpen(true)
    else
    try {
      await postMark(postId);

      setEffectUpdate((effectUpdate) => !effectUpdate);
      enqueueSnackbar("글이 저장되었습니다.", {
        varaint: "success",
        autoHideDuration: 2000,
      });
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
        height: "100%",
        backgroundColor: "#f2f3f8",
      }}
    >
      <Topbar address={address} />
      <Box
        sx={{
          padding: "1.6rem",
        }}
      >
        <ContentBadge desc={category} />
        <CardContent
          sx={{
            fontFamily: "NanumSquare",
            fontSize: "1.4rem",
            fontWeight: "bold",
            fontStretch: "normal",
            fontStyle: "normal",
            lineHeight: 1.71,
            letterSpacing: "normal",
            textAlign: "left",
            p: 0,
            minHeight: "16.3rem",
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
            height: "4rem",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <IconButton
              sx={{width: "2.4rem", height: "2.4rem"}}
              color={isLiked ? "primary" : "default"}
              onClick={onClickLike}
            >
              <img
                src={
                  userLiked
                    ? "/images/IC_heart_fill.svg"
                    : "/images/IC_heart.svg"
                } style={{
                width: "1.8rem",
                height: "1.575rem"
              }}
                alt={"like icon"}
              />
            </IconButton>
            <Typography sx={{ fontSize: "1rem"}}>{userLikeNum}</Typography>
            <IconButton sx={{width: "2.4rem", height: "1.4rem"}} onClick={toggleDrawer(true)}>
                <img src={"/images/IC_comment_H18.svg"} alt={"comment icon"} style={{
                  width: "1.8rem",
                  height: "1.575rem"
                }} />
            </IconButton>
            <Typography sx={{ fontSize: "1rem"}}>{userCommentNum}</Typography>
          </Box>
          <Box display="flex" alignItems="center">
            <Typography sx={{fontSize: "1rem"}}>{handleCreatedAt()}</Typography>
            <IconButton onClick={onClickMark}>
              <BookmarkIcon color={isMarked ? "primary" : "disabled"} />
              <Typography sx={{fontSize: "1rem"}}>저장하기</Typography>
            </IconButton>
          </Box>
        </CardActions>
        <Divider />
        <Box  sx={{ backgroundColor: theme.palette.background.default,
        }}>
          <Box padding={"1rem"}>
          {comment &&
            comment.map((comm, i) => (
              <Box>
                <Box p={0}>
                  <Typography key={i}  sx={{ fontSize: "1.4rem", lineHeight: 1.43 }}>{comm.text}</Typography>
                  <Typography key={i}  sx={{ fontSize: "1.4rem", fontWeight: "bold", lineHeight:  1.43}}>{comm.username}</Typography>
                  <Box display={"flex"} alignItems={"center"} justifyContent={"space-between"} p={0}>
                    <Box>
                      <Typography variant="caption"  sx={{ fontSize: "1.4rem", lineHeight: 1.43}}>{comm.createdAt}</Typography>
                      <Button variant="caption" sx={{ fontSize: "1.4rem", padding : 0}} onClick={onClickReply(true, comm.commentId)}>
                        reply
                      </Button>
                    </Box>
                    <IconButton
                      sx={{p:0}}
                      onClick={() => {
                        onClickCommentLike(postId, comm.commentId);
                      }}
                    >
                      <img
                        src={
                          comm.isLiked
                            ? "/images/IC_heart_fill.svg"
                            : "/images/IC_heart.svg"
                        }
                        alt={"like icon"}
                        style={{
                          width: "1.327rem",
                          height: "1.161rem"
                        }}
                      />
                    </IconButton>
                  </Box>
                  {comm.replies?.length >= 1 &&
                    comm.replies.map((repl) => (
                      <Box
                        sx={{ pl: 2, display: "flex", alignItems: "center" }}
                      >
                        <SubdirectoryArrowRightIcon fontSize="small" />
                        <Typography pr={1}  sx={{ fontSize: "1.4rem"}}>{repl.text}</Typography>
                        <Typography variant="caption"  sx={{ fontSize: "1rem"}}>
                          {repl.createdAt}
                        </Typography>
                      </Box>
                    ))}
                </Box>
              </Box>
            ))}
          </Box>
        </Box>
        <Box sx={{  display: "fixed", position: "absolute", bottom: 1,  borderRadius: "8px", paddingTop: 2, pb: 2,
          boxShadow: "0 -20px 10px 0 rgba(0, 0, 0, 0.03)"}}>
          <Box display={"flex"} alignItems={"center"} sx={{width: "100%",  }}>
          <IconButton
              sx={{ width: "2.4rem",
                height: "2.4rem",
             }}
              color={isLiked ? "primary" : "default"}
              onClick={onClickLike}
          >
            <img
                src={
                  userLiked
                      ? "/images/IC_heart_fill.svg"
                      : "/images/IC_heart.svg"
                } style={{
              width: "2.4rem",
              height: "2.4rem",
            }}
                alt={"like icon"}
            />
          </IconButton>
          <Button
              sx={{width: "31rem",
                height:" 4.8rem",
                margin: "0 0 0 0.8rem",
                borderRadius: "8px",
                backgroundColor: "#6088f6"}}
              variant="contained"
              onClick={toggleDrawer(true)}
          >
            댓글 쓰기
          </Button>
          </Box>
        </Box>
        <div>
          {open && (
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
              sx={{ ".MuiPaper-root": {
                  borderTopLeftRadius: "8px",
                  borderTopRightRadius: "8px",
                },
                "& .MuiBox-root css-1mq41j": {
                height: "25.5rem"
                }
            }}
            >
              <StyledBox
                sx={{
                  position: "absolute",
                  top: -drawerBleeding,
                  visibility: "visible",
                  right: 0,
                  left: 0,
                }}
              ></StyledBox>
              <StyledBox
                sx={{
                  p: "1rem",
                  overflow: "auto",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <TextField
                  multiline
                  rows={4}
                  sx={{ fontSize: "1.2rem", p: "1.2rem"
                  }}
                  placeholder="타인을 존중하는 말 한마디가 상대방에게 큰 힘이 됩니다!"
                  onChange={(e) => setCommentText(e.target.value)}
                />
                <Box sx={{ paddingTop: "1rem"}}>
                  <Button
                    sx={{height: "4.8rem", margin: "auto", width: "100%", backgroundColor: "#6088f6"}}
                    variant="contained"
                    onClick={() => {
                    if (openReply) {
                      handleReplySubmit();
                      } else {
                      handleSubmit();
                      }
                    toggleDrawer(false);
                    }}
                    >
                      댓글 쓰기
                  </Button>
                </Box>
              </StyledBox>
            </SwipeableDrawer>
          )}
        </div>
      </Box>
      {isLoginModalOpen && (
        <LoginModal
          open={isLoginModalOpen}
          onClose={() => setIsLoginModalOpen(false)}
        />
      )}
    </Box>
  );
};

export default Detail;
