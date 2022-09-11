import React from "react";
import {
  Dialog,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Divider,
  Box,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const LoginModal = ({ open, onClose }) => {
  const navigate = useNavigate();
  const onClickLoginButton = () => {
    navigate("/login");
  };
  const onClickRegister = () => {
    navigate("/register");
  };

  return (
    <Dialog open={open} fullWidth>
      <DialogContent
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        <Box p={1}>
          <Typography variant="body">로그인</Typography>
        </Box>
        <Typography variant="body2">
          게시물 작성을 위해 <br /> 로그인을 해주세요
        </Typography>
      </DialogContent>
      <Divider />
      <DialogActions sx={{ justifyContent: "center" }}>
        <Button onClick={onClickLoginButton}>로그인</Button>
        <Button onClick={onClickRegister} sx={{ color: "black" }}>
          회원가입
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default LoginModal;
