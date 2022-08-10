import React, { FC } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import history from "history/browser";
import WritingTopbar from "./WritingTopbar";
import { MenuItem, Paper, TextField, Typography } from "@mui/material";

interface WritingProps {
  address?: string;
}

const Writing: FC<WritingProps> = ({ address }) => {
  return (
    <Box
      sx={{
        backgroundColor: "white",
        paddingLeft: "1rem",
        paddingRight: "1rem",
        height: "100vh",
      }}
    >
      <WritingTopbar address={"역삼동"} />
      <Box
        sx={{ bg: "#ffffff", pt: "1.875rem" }}
        display={"flex"}
        flexDirection={"column"}
      >
        <TextField
          select
          variant={"outlined"}
          margin={"dense"}
          sx={{
            height: "2.25rems",
            width: "7.875rem",
            mb: "1.563rem",
            "& .css-18dg0t2-MuiSelect-select-MuiInputBase-input-MuiOutlinedInput-input":
              {
                pl: 2,
                pt: 1,
                pb: 1,
              },
          }}
          defaultValue={"restaurant"}
        >
          <MenuItem value={"restaurant"}>
            <Typography variant={"body2"}>동네맛집</Typography>
          </MenuItem>
        </TextField>
        <TextField
          multiline
          placeholder={"무엇을 공유하고 싶으세요?"}
          fullWidth
          rows={10}
        />
      </Box>
    </Box>
  );
};

export default Writing;
