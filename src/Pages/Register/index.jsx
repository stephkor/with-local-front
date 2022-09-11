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
import { register } from "../../apis/authApis";
import { useDispatch } from "react-redux";
import { userSlice } from "../../store/slices/userSlice";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";

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

        await register(email, password);

        dispatch(userSlice.actions.login());
        navigate("/login");
        enqueueSnackbar(
          "회원가입에 성공했습니다. 로그인 페이지로 이동합니다.",
          {
            variant: "success",
            autoHideDuration: 3000,
          }
        );
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
        <Typography variant="h5">회원가입 / Register</Typography>
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
            sx={{ paddingBottom: 2 }}
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
            sx={{ color: "black" }}
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
