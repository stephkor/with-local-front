import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  CircularProgress,
} from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { login } from "../../apis/authApis";
import { useDispatch } from "react-redux";
import { userSlice } from "../../store/slices/userSlice";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import { TOPBAR_HEIGHT } from "src/config/layout";

const Login = () => {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  /* 유효성 체크 */
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .max(50, "최대 50자 까지 입력할 수 있습니다.")
        .required("아이디를 입력해주세요."),
      password: Yup.string()
        .max(50, "최대 50자 까지 입력할 수 있습니다.")
        .required("비밀번호를 입력해주세요."),
    }),

    // eslint-disable-next-line consistent-return
    onSubmit: async (values) => {
      const { email, password } = values;
      // 로그인 성공, 실패 동작
      try {
        setIsLoading(true);

        const res = await login(email, password);

        dispatch(userSlice.actions.login());
        navigate("/main");
        enqueueSnackbar("로그인에 성공했습니다. 메인화면으로 이동합니다.", {
          variant: "success",
          autoHideDuration: 3000,
        });

        navigate("/main");
      } catch (error) {
        enqueueSnackbar(error.message, {
          variant: "error",
          autoHideDuration: 3000,
        });
      } finally {
        setIsLoading(false);
      }
    },
  });

  return (
    <Box sx={{ padding: 3 }}>
      <Box sx={{ textAlign: "center", paddingBottom: 3 }}>
        <Typography variant="h5">로그인</Typography>
      </Box>
      <form onSubmit={formik.handleSubmit} noValidate>
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          flexDirection={"column"}
        >
          <TextField
            variant="outlined"
            required
            fullWidth
            id="email"
            name="email"
            type="email"
            label="아이디"
            autoComplete="email"
            autoFocus
            error={!!(formik.touched.email && formik.errors.email)}
            helperText={
              formik.touched.email && formik.errors.email
                ? formik.errors.email
                : null
            }
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
          />
          <TextField
            variant="outlined"
            required
            fullWidth
            id="password"
            name="password"
            type="password"
            label="비밀번호"
            autoComplete="current-password"
            error={!!(formik.touched.password && formik.errors.password)}
            helperText={
              formik.touched.password && formik.errors.password
                ? formik.errors.password
                : null
            }
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
          />
        </Box>
        <Box position="relative" mt={2}>
          <Button
            type="submit"
            variant="contained"
            size="large"
            color="primary"
            fullWidth
            disabled={isLoading}
            startIcon={isLoading && <CircularProgress size={"small"} />}
          >
            로그인
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default Login;