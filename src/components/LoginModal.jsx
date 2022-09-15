import React from "react";
import {
    Dialog,
    DialogContent,
    DialogActions,
    Button,
    Typography,
    Divider,
    ClickAwayListener,
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
      <ClickAwayListener onClickAway={onClose}>
      <Dialog open={open} sx={{ borderRadius: "8px", margin: " 0 0 0 .031rem", }}>
      <DialogContent
        sx={{
              borderRadius: "8px", margin: " 0 0 0 .031rem", width: "21.438rem",padding: "2.25rem 2.25rem 0 2.25rem"
        }}
      >
          <Typography sx={{
              fontFamily: "Noto Sans KR",
              fontSize: "1.125rem",
              fontWeight: "bold",
              lineHeight: 1.44,
              letterSpacing: "-0.09px",
              textAlign: "center",
              color: "#333",
              paddingBottom: "1rem"
          }}>로그인</Typography>

        <Typography sx={{  fontFamily: "Noto Sans KR",
            fontSize: "1rem",
            fontWeight: "normal",
            lineHeight: 1.5,
            letterSpacing: "-0.01px",
            textAlign: "center",
            paddingBottom: "1.875rem",
            color: "#666"}}>
          게시물 작성을 위해 <br /> 로그인을 해주세요
        </Typography>
      </DialogContent>
      <Divider />
      <DialogActions sx={{ justifyContent: "center" }}>
        <Button onClick={onClickLoginButton} sx={{
            fontFamily: "NanumSquare",
            fontSize: "1.125rem",
            fontWeight: 800,
            lineHeight: 1.33,
            letterSpacing: "normal",
            textAlign: "center",
        }}>로그인</Button>
        <Button onClick={onClickRegister} sx={{
            fontFamily: "NanumSquare",
            fontSize: "1.125rem",
            fontWeight: 800,
            lineHeight: 1.33,
            letterSpacing: "normal",
            textAlign: "center",color: "black" }}>
          회원가입
        </Button>
      </DialogActions>
    </Dialog>
      </ClickAwayListener>
  );
};

export default LoginModal;
