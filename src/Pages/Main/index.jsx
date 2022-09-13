import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";

import { theme } from "src/theme";
import { styled } from "@mui/system";
import Content from "../../components/Content";
import { MenuItem, TextField, Typography, IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { getGuAddress } from "../../apis/addressApis";
import { setSelectedLocation } from "../../store/slices/locationSlice";
import { useDispatch, useSelector } from "react-redux";
import { getBoardList, getTabs } from "../../apis/boardApis";
import { setContentInfo } from "../../store/slices/contentSlice";
import LoginModal from "src/components/LoginModal";

const StyledTab = styled(Tab)({
  fontSize: "1rem",
  color: theme.palette.point.browngrey,
  paddingRight: "1.5rem",
  paddingLeft: 0,

  minWidth: "3.725rem",
  textAlign: "left",
});

const Main = () => {
  const dispatch = useDispatch();
  const { lang } = useSelector((state) => state.lang);
  const { selectedLocation } = useSelector((state) => state.location);
  const navigate = useNavigate();
  const [tabList, setTabList] = useState([{ categoryId: 1, text: "동네맛집" }]);
  const [tab, setTab] = React.useState({ categoryId: 1, text: "동네맛집" });
  const [boardList, setBoardList] = useState([]);
  const [guList, setGuList] = useState([]);
  const [currentGu, setCurrentGu] = useState(selectedLocation);
  const { isLoggedIn } = useSelector((state) => state.user);
  // const [content, setContent] = useState({});

  const handleCurrentGu = (e) => {
    setCurrentGu(e.target.value);
    dispatch(setSelectedLocation(e.target.value));
  };

  const onClickWriting = (e) => {
    e.preventDefault();

    if (!isLoggedIn) {
      setIsLoginModalOpen(true);
    } else navigate("/writing");
  };

  const onClickContent = (e, board) => {
    e.preventDefault();

    dispatch(setContentInfo(board));

    navigate("/detail");
  };

  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  useEffect(() => {
    const requestData = async () => {
      try {
        const res = await getGuAddress(1);
        const { data } = res;
        setGuList(data.data);
      } catch (e) {
        console.log(e);
      }
    };
    const returnTabs = async () => {
      try {
        const res = await getTabs(lang);
        setTabList(res?.data.data);
      } catch (e) {
        console.log(e);
      }
    };
    const requestList = async () => {
      try {
        const res = await getBoardList(lang, tab.categoryId);
        setBoardList(res?.data);
      } catch (e) {
        console.log(e);
      }
    };
    returnTabs();
    requestData();
    requestList();
  }, [dispatch, lang, tab.categoryId]);

  return (
    <Card
      sx={{
            backgroundColor: theme.palette.background.default,
            boxShadow: "none",
            paddingLeft: "1rem",
            paddingRight: "1rem",
            height: "100vh",
            overflowY: "scroll",
            paddingTop: "1.875rem",
            pb: 3,
          margin: 0,
        "& ::-webkit-scrollbar": {
              display: "none"
        }
          }}
    >
      <Box
        sx={{
          bg: theme.palette.background.default,
        }}
      >
          <Box
              display={"flex"}
              alignItems={"center"}
              justifyContent={"space-between"}
              sx={{marginBottom: "2.626rem", }}

          >
              <TextField
                  select
                  value={currentGu !== "" ? currentGu : selectedLocation}
                  variant={"standard"}
                  onChange={handleCurrentGu}
                  sx={{
                      borderBottom: "none",
                      "& p": {
                          fontStyle: theme.typography.h3,
                      },
                      "& .css-17o7sbu-MuiInputBase-root-MuiInput-root:before, .css-17o7sbu-MuiInputBase-root-MuiInput-root:after":
                          {
                              borderBottom: "none",
                          },
                  }}
              >
                  {guList.map((list) => (
                      <MenuItem key={list.gu} value={list?.gu}>
                          <Typography>{list?.gu}</Typography>
                      </MenuItem>
                  ))}
              </TextField>
              <IconButton
                  size={"small"}
                  onClick={onClickWriting}
                  sx={{ bg: "#ffffff" }}
              >
                  <Box
                      component={"img"}
                      src={"/images/Bottons_Posting_H27.png"}
                      sx={{ width: "4.313rem", height: "1.5rem" }}
                  />
              </IconButton>
          </Box>

          <Tabs
          sx={{
              minWidth: "100vw",
            padding: 0,
            color: "black",
            "& :after": {
              display: "none"
            },
            ".css-1d5hna4-MuiButtonBase-root-MuiTab-root.Mui-selected" : {
              color: "black"
            },
            "& :last-child": {
              paddingRight: 0,
              paddingLeft: 0,
            },
            "& .MuiTabs-indicator": { display: "none" },
            "& div.MuiInputBase-root.Mui-focused:after": {display: "none"},
            "& div.MuiInputBase-root-MuiInput-root:after": {
              display: "none"
            },
            display: "flex",
              alignItems:"center",
              justifyContent: "space-around"
          }}
          value={tab.text}
          onChange={(e, newValue) => {
            setTab({
              categoryId: parseInt(e.target.id),
              text: newValue,
            });
          }}
          textColor="primary"
        >
          {tabList.map((list) => (
            <StyledTab
              id={list.categoryId.toString()}
              key={list.categoryId}
              value={list.text}
              label={list.text}
            />
          ))}
          <StyledTab
            id={"4"}
            key={4}
            value={"인기"}
            label={"인기"}
            onClick={(e) => setTab({ categoryId: 4, text: "인기" })}
          />
        </Tabs>
      </Box>
      <Box>
        {boardList.map((board) => (
          <Content
            key={board.postId}
            postId={board.postId}
            desc={board.category}
            value={board.description}
            likeNum={board.likeCount}
            commentNum={board.commentCount}
            isLiked={false}
            createdAt={board.createdAt}
            images={board.images}
            onClick={(e) => {
              onClickContent(e, board);
            }}
          />
        ))}
      </Box>
      {isLoginModalOpen && (
        <LoginModal
          open={isLoginModalOpen}
          onClose={() => setIsLoginModalOpen(false)}
        />
      )}
    </Card>
  );
};

export default Main;
