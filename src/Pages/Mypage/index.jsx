import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Typography, Box, Card, Grid } from "@mui/material";
import { getMypage } from "src/apis/authApis";
import { useSnackbar } from "notistack";
import _ from "lodash";
import { Link } from "react-router-dom";
import MypageContent from "./Content";
import { theme } from "src/theme";

import Slider from "react-slick";

const Mypage = () => {
  const settings = {
    dots: true,
    infinite: false,
    rows: 3,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    swipe: true,
    swipeToSlide: true,
    touchMode: true,
  };
  const { lang } = useSelector((state) => state.lang);

  const [myData, setMyData] = useState({
    commentLiked: [],
    marks: [],
    wrote: [],
    postLiked: [],
    reward: [],
  });
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    (async function () {
      try {
        const res = await getMypage(lang);
        const { data } = res;

        setMyData({
          commentLiked: _.get(data.data, "commentLiked", []),
          marks: _.get(data.data, "marks", []),
          wrote: _.get(data.data, "wrote", []),
          postLiked: _.get(data.data, "postLiked", []),
          reward: _.get(data.data, "reward", []),
        });
      } catch (e) {
        enqueueSnackbar(e.message, {
          variant: "error",
          autoHideDuration: 3000,
        });
      }
    })();
  }, [lang, enqueueSnackbar]);

  return (
    <Box
      sx={{
        backgroundColor: theme.palette.background.default,
        paddingLeft: "1rem",
        paddingRight: "1rem",
        height: "100%",
      }}
    >
      <Grid
        item
        xs={12}
        spacing={2}
        sx={{
          pt: "1.5rem",
          pb: 3,
        }}
      >
        <Typography variant={"h6"}> 서울 로컬</Typography>
      </Grid>
      <Grid item xs={12} spacing={3} pb={2}>
        <Typography gutterBottom>내가 받은 리워드</Typography>
        <Grid>
          {Boolean(myData.reward.signUp) && (
            <Card sx={{ width: "fit-content" }}>
              <Box
                component={"img"}
                src="/images/signup-reward.png"
                sx={{ width: "auto", height: 180 }}
              />
            </Card>
          )}
        </Grid>
      </Grid>
      <Grid item xs={12} spacing={2}>
        <Typography gutterBottom>저장한 글</Typography>
        {myData.marks.length < 1 && (
          <Box
            display="flex"
            alignItems={"center"}
            justifyContent="center"
            flexDirection={"column"}
            p={2}
          >
            <Typography variant="caption" gutterBottom>
              저장한 글이 없습니다
            </Typography>
            <Link to="/main">
              <Typography variant="caption">
                {lang === "ko"
                  ? "동네 소식 보러가기"
                  : "Go see neighborhood posts"}
              </Typography>
            </Link>
          </Box>
        )}
        {myData.marks.length >= 1 &&
          myData.marks.map((mark) => (
            <MypageContent
              value={mark.description}
              desc={mark.category}
              likeNum={mark.likeCount}
              createdAt={mark.createdAt}
              postId={mark.postId}
              commentNum={mark.commentCount}
              post={mark}
            />
          ))}
      </Grid>
      <Grid item xs={12} spacing={2}>
        <Typography gutterBottom>좋아요 한 글</Typography>
        {myData.postLiked.length < 1 && (
          <Box
            display="flex"
            alignItems={"center"}
            justifyContent="center"
            flexDirection={"column"}
            p={2}
          >
            <Typography variant="caption" gutterBottom>
              좋아요 한 글이 없습니다
            </Typography>
            <Link to="/main">
              <Typography variant="caption">
                {lang === "ko"
                  ? "좋아요 하러가기"
                  : "let's go find some posts to like"}
              </Typography>
            </Link>
          </Box>
        )}
        <Box p={2}>
          <Slider {...settings}>
            {myData.postLiked.length >= 1 &&
              myData.postLiked.map((mark) => (
                <MypageContent
                  value={mark.description}
                  desc={mark.category}
                  likeNum={mark.likeCount}
                  createdAt={mark.createdAt}
                  commentNum={mark.commentCount}
                  postId={mark.postId}
                  post={mark}
                />
              ))}
          </Slider>
        </Box>
      </Grid>
      <Grid item xs={12} spacing={2}>
        <Typography gutterBottom>내가 남긴 댓글</Typography>
        <Box padding={2}>
          <Slider {...settings}>
            {myData.wrote.length >= 1 &&
              myData.wrote.map((mark) => (
                <MypageContent
                  sx={{ mb: 10 }}
                  value={mark.description}
                  desc={mark.category}
                  likeNum={mark.likeCount}
                  createdAt={mark.createdAt}
                  commentNum={mark.commentCount}
                  postId={mark.postId}
                  post={mark}
                />
              ))}
          </Slider>
        </Box>
        {myData.wrote.length < 1 && (
          <Box
            display="flex"
            alignItems={"center"}
            justifyContent="center"
            flexDirection={"column"}
          >
            <Typography variant="caption" gutterBottom>
              남긴 댓글이 없습니다.
            </Typography>
            <Link to="/main">
              <Typography variant="caption">
                {lang === "ko"
                  ? "뎃글 보러가기"
                  : "let's go find posts to comment"}
              </Typography>
            </Link>
          </Box>
        )}
      </Grid>
    </Box>
  );
};

export default Mypage;
