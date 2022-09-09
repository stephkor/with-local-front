import React from "react";
import { styled } from "@mui/system";

import { theme } from "src/theme";

const StyledDiv = styled("div")({
  width: "fit-content",
  height: "1.25rem",
  margin: "0 1.875rem 0.75rem 0",
  padding: "0.15rem",
  border: "solid 1px",
  fontSize: "0.625rem",
  fontWeight: "bold",
  borderColor: theme.palette.point.marigold,
  color: theme.palette.point.marigold,
  backgroundColor: theme.palette.background.white,
});

const ContentBadge = ({ desc }) => {
  return <StyledDiv>{desc}</StyledDiv>;
};

export default ContentBadge;
