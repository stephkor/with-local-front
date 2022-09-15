import React from "react";
import { styled } from "@mui/system";

import { theme } from "src/theme";

const StyledDiv = styled("div")({
  width: "fit-content",
  height: "2rem",
  margin: "0 3rem 1.2rem 0",
  padding: "0.15rem",
  border: "solid 1px",
  fontWeight: "bold",
  borderColor: theme.palette.point.marigold,
  color: theme.palette.point.marigold,
  backgroundColor: theme.palette.background.white,
});

const ContentBadge = ({ desc }) => {
  return <StyledDiv>{desc}</StyledDiv>;
};


export default ContentBadge;
