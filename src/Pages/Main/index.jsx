import React, { useEffect, useState , useCallback} from "react";
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
    width: "5.8rem",
    height: "1.8rem",
    fontFamily: "NanumSquare",
    fontSize: "1.6rem",
    fontWeight: "bold",
    fontStretch: "normal",
    fontStyle: "normal",
    lineHeight: "normal",
    letterSpacing: "normal",
    textAlign: "left",
   // pr: "1.875rem",
    padding: 0
});

const Main = () => {
  const dispatch = useDispatch();
  const { lang } = useSelector((state) => state.lang);
  const { selectedLocation } = useSelector((state) => state.location);
  const navigate = useNavigate();
  const [tabList, setTabList] = useState([{ categoryId: 1, text: "동네맛집" }]);
  const [tab, setTab] = React.useState({ categoryId: 4, text: "인기" });
  const [boardList, setBoardList] = useState([]);
  const [guList, setGuList] = useState([]);
  const [currentGu, setCurrentGu] = useState(selectedLocation);
  const { isLoggedIn } = useSelector((state) => state.user);




  const handleCurrentGu = (e) => {
    setCurrentGu(e.target.value);
    dispatch(setSelectedLocation(e.target.value));
  };

  const onClickWriting = (e) => {
    e.preventDefault();

    if (!isLoggedIn) {
      setIsLoginModalOpen(true);
    } else
    navigate("/writing");
  };

  const onClickContent = (e, board) => {
    e.preventDefault();

    dispatch(setContentInfo(board));

    navigate("/detail");
  };

  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  const renderCategory = useCallback((tabList, tab) => {
       if(tabList.length === 3)  tabList.unshift({categoryId: 4, text: "인기"})

      const selected = tabList.length === 4 && tabList.find((list)=> list.categoryId === tab.categoryId)


      return (
          <Box sx={{ width: '100%' }}>

          <Tabs
                  sx={{
                      padding: 0,
                      minHeight: "1.75rem",
                      color: "black",
                      textAlign: "left",
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
                      "& .MuiTabs-scroller MuiTabs-fixed css-jpln7h-MuiTabs-scroller": {
                          width: "100%"
                      },

                      "& .MuiTabs-indicator": { display: "none" },
                      "& div.MuiInputBase-root.Mui-focused:after": {display: "none"},
                      "& div.MuiInputBase-root-MuiInput-root:after": {
                          display: "none"
                      },
                      "& button" : {
                          minWidth: "fit-content"
                      },
                      "& div.MuiTabs-flexContainer css-heg063-MuiTabs-flexContainer": {
                          width: "100%",
                      }
                  }}
                  value={tab.text}
                  onChange={(e, newValue) => {
                      setTab({
                          categoryId: parseInt(e.target.id),
                          text: newValue,
                      });
                  }}
                  textColor="primary"
                  variant="fullWidth"

          >
                {tabList.map((list) =>{
                    return  (selected.categoryId === list.categoryId) ? (
                        <>
                        <div style={{
                            textAlign: "bottom",
                            width: "0.7rem",
                            height: "0.7rem",
                            backgroundColor: theme.palette.primary.main,
                            margin: "0"}}
                         />
                        <Tab
                            class="selectedTab"
                            id={list.categoryId.toString()}
                              key={list.categoryId}
                              value={list.text}
                              label={list.text} />
                        </>):
                  (<StyledTab
                      id={list.categoryId.toString()}
                      key={list.categoryId}
                      value={list.text}
                      label={list.text}>{list.text}</StyledTab>)}
         )}
              </Tabs>
          </Box>
      )
  },[])







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
                      "& .css-euzdch-MuiInputBase-root-MuiInput-root:before" :{
                          borderBottom: "none"
                  },
                      "& p": {
                          fontStyle: theme.typography.h3,
                          fontSize: "2.4rem"
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
                  onClick={onClickWriting}
                  sx={{ bg: "#ffffff" ,     width: "6.9rem",
                      height: "2.4rem"}}
              >
                  <Box
                      component={"img"}
                      src={"/images/Bottons_Posting_H27.png"}
                      sx={{  width: "6.9rem",
                          height: "2.4rem" }}
                  />
              </IconButton>
          </Box>

          {renderCategory(tabList, tab)}
      </Box>
        <Box paddingTop={"1.5rem"}>
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
