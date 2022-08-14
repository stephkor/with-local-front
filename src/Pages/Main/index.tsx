import React, {
  ChangeEvent,
  FC,
  SyntheticEvent,
  useEffect,
  useState,
} from "react";
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
import { RootState } from "../../store";
import { getBoardList, getTabs } from "../../apis/boardApis";

const StyledTab = styled(Tab)({
  fontSize: "0.9rem",
  color: theme.palette.point.browngrey,
  paddingRight: "1.25rem",
  paddingLeft: 0,
  maxWidth: "8rem",
  minWidth: "3.725rem",
  textAlign: "left",
});

const Main: FC = () => {
  const dispatch = useDispatch();
  const { lang } = useSelector((state: RootState) => state.lang);
  const navigate = useNavigate();
  const [tabList, setTabList] = useState([{ categoryId: 1, text: "동네맛집" }]);
  const [tab, setTab] = React.useState({ categoryId: 1, text: "동네맛집" });
  const [boardList, setBoardList] = useState([]);
  const [guList, setGuList] = useState([]);
  const [currentGu, setCurrentGu] = useState("");

  const handleCurrentGu = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setCurrentGu(e.target.value);
    dispatch(setSelectedLocation(e.target.value));
  };

  const onClickWriting = (e: SyntheticEvent) => {
    e.preventDefault();
    navigate("/writing");
  };

  useEffect(() => {
    const requestData = async () => {
      try {
        const res = await getGuAddress(1);
        const { data } = res;
        setGuList(data.data);
        dispatch(setSelectedLocation(data.data[0].gu));
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
        overflow: "scroll",
        pb: 3,
      }}
    >
      <Box
        sx={{
          width: "21.438rem",
          bg: theme.palette.background.default,
          overflowY: "scroll",
        }}
      >
        <Tabs
          sx={{
            padding: 0,
            margin: 0,
            "& :last-child": {
              paddingRight: 0,
              paddingLeft: 0,
            },
            ".MuiTabs-indicator": { display: "none" },
          }}
          value={tab.text}
          onChange={(e, newValue) => {
            setTab({
              categoryId: parseInt((e.target as HTMLMenuElement).id),
              text: newValue,
            });
          }}
          textColor="primary"
        >
          {tabList.map((list: TabListResponse) => (
            <StyledTab
              id={list.categoryId.toString()}
              key={list.categoryId}
              value={list.text}
              label={list.text}
            />
          ))}
        </Tabs>
      </Box>
      <Box>
        <Box
          display={"flex"}
          alignItems={"center"}
          justifyContent={"space-between"}
          p={1}
          sx={{
            overflow: "scroll",
          }}
        >
          <TextField
            select
            value={currentGu !== "" ? currentGu : "강남구"}
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
            {guList.map((list: guListResponse) => (
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

        {boardList.map((board: BoardResponse) => (
          <Content
            key={board.postId}
            postId={board.postId}
            desc={board.category}
            value={board.description}
            likeNum={board.likeCount}
            commentNum={board.commentCount}
            isLiked={false}
            createdAt={board.createdAt}
          />
        ))}
      </Box>
    </Card>
  );
};

export default Main;
