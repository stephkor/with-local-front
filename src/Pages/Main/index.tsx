import React, { FC } from "react";
import Card from "@mui/material/Card";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";

import { theme } from "src/theme";
import { styled } from "@mui/system";
import Content from "../../components/Content";
import { MenuItem, TextField, Typography } from "@mui/material";

const StyledTab = styled(Tab)({
  fontSize: "1rem",
  color: theme.palette.point.browngrey,
  paddingRight: "1.25rem",
  paddingLeft: 0,
  maxWidth: "7rem",
  minWidth: "3.625rem",
  textAlign: "left",
});

const Main: FC = () => {
  const [tab, setTab] = React.useState("popular");

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setTab(newValue);
  };

  return (
    <Card
      sx={{
        backgroundColor: theme.palette.background.default,
        boxShadow: "none",
      }}
    >
      <Box sx={{ width: "21.438rem" }}>
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
          value={tab}
          onChange={handleChange}
          textColor="primary"
        >
          <StyledTab value="popular" label="인기" />
          <StyledTab value="question" label="동네질문" />
          <StyledTab value="restaurant" label="동네맛집" />
          <StyledTab value="help" label="도움이 필요해요!" />
        </Tabs>
      </Box>
      <Box>
        <Box>
          {/*<TextField select value={"yeoksam"} variant={"standard"}>*/}
          {/*    <MenuItem value={"yeoksam"} >*/}
          {/*        <Typography sx={{ fontSize: "1.5rem", fontWeight: 700}}>역삼동</Typography>*/}
          {/*    </MenuItem>*/}
          {/*</TextField>*/}
          <TextField
            select
            value={"yeoksam"}
            variant={"standard"}
            sx={{
              borderBottom: "none",
              "& input": { fontSize: 24, fontWeight: 700 },
              "& .css-17o7sbu-MuiInputBase-root-MuiInput-root:before, .css-17o7sbu-MuiInputBase-root-MuiInput-root:after":
                {
                  borderBottom: "none",
                },
            }}
          >
            <MenuItem value={"yeoksam"}>
              <Typography variant={"h3"}>역삼동</Typography>
            </MenuItem>
          </TextField>
        </Box>
        <Content
          desc={"restaurant"}
          value={"오늘 역삼동 처음 방문하는데 추천맛집 있을까요?"}
          likeNum={90}
          commentNum={999}
          isLiked={false}
          createdAt={"10분전"}
        />
      </Box>
    </Card>
  );
};

export default Main;
