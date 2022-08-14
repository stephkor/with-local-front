import type { FC } from "react";
import React from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  Typography,
  Button,
  Divider,
} from "@mui/material";

interface ErrorModalProps {
  open: boolean;
  onClose: () => void;
}

const ErrorModal: FC<ErrorModalProps> = ({ open, onClose }) => {
  return (
    <Dialog open={open} fullWidth>
      <DialogContent
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          p: 6,
        }}
      >
        <Typography>
          게시물을 <br /> 10글자 이상 입력해 주세요
        </Typography>
      </DialogContent>
      <Divider />
      <DialogActions sx={{ margin: "auto", padding: "auto" }}>
        <Button onClick={onClose}>확인</Button>
      </DialogActions>
    </Dialog>
  );
};

export default ErrorModal;
