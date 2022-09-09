import React, { useEffect, useRef, useState } from "react";
import Box from "@mui/material/Box";
import Topbar from "src/components/Dashboard/Topbar";
import {
  Button,
  CircularProgress,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import { useSelector } from "react-redux";
import { createBoard, getTabs } from "../../apis/boardApis";
import { useFormik } from "formik";
import * as yup from "yup";
import ErrorModal from "src/components/ErrorModal/ErrorModal";
import history from "history/browser";

export const tabListMap = {
  동네맛집: 1,
  동네질문: 2,
  "도움이 필요해요!": 3,
};

const Writing = () => {
  const [isLoading, setIsLoading] = useState(false);
  const imageRef = useRef();
  const cateogoryRef = useRef();
  const [isErrorDialogOpen, setIsErrorDialogOpen] = useState(false);
  const [image, setImage] = useState();
  const [categoryList, setCategoryList] = useState([
    { categoryId: 1, text: "동네맛집" },
  ]);

  const address = useSelector((state) => state.location.selectedLocation);

  const { lang } = useSelector((state) => state.lang);

  const [selectedCategory, setSelectedCategory] = useState({});

  const formik = useFormik({
    initialValues: {
      value: "",
      categoryId: 1,
    },
    validationSchema: yup.object({
      value: yup.string().min(10, "10글자 이상 입력해 주세요").required(),
    }),
    onSubmit: async (values) => {
      const { value } = values;
      const selected = selectedCategory.categoryId;
      const title = "";

      try {
        setIsLoading(true);
        await createBoard(lang, {
          title: title,
          description: value,
          categoryId: selected,
          files: "",
        });
        history.back();
      } catch (e) {
        console.log(e);
      } finally {
        setIsLoading(false);
      }
    },
  });

  useEffect(() => {
    const requestCategory = async () => {
      try {
        const res = await getTabs(lang);
        const list = res?.data.data;

        setCategoryList(list);
        setSelectedCategory(list[0]);
      } catch (e) {
        console.log(e);
      }
    };
    requestCategory();
  }, [lang]);

  const handleChangeCategory = (e) => {
    const findCategory = categoryList.find((el) => el.text === e.target.value);

    setSelectedCategory({
      categoryId: findCategory.categoryId,
      text: e.target.value,
    });
  };

  const handleError = () => {
    setIsErrorDialogOpen(true);
  };

  const handleOk = () => {
    setIsErrorDialogOpen(false);
  };

  const onImageUploadButtonClick = (e) => {
    e.preventDefault();
    imageRef.current.click();
  };

  return (
    <Box
      sx={{
        backgroundColor: "white",
        paddingLeft: "1rem",
        paddingRight: "1rem",
        height: "100vh",
      }}
    >
      <Topbar address={address} />
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
            width: "fit-content",
            mb: "1.563rem",
            "& .css-18dg0t2-MuiSelect-select-MuiInputBase-input-MuiOutlinedInput-input":
              {
                pl: 2,
                pt: 1,
                pb: 1,
              },
          }}
          value={selectedCategory.text}
          onChange={handleChangeCategory}
        >
          {categoryList.map((list, i) => (
            <MenuItem key={i} value={list.text}>
              <Typography variant={"body2"}>{list.text}</Typography>
            </MenuItem>
          ))}
        </TextField>
        <form onSubmit={formik.handleSubmit} noValidate>
          <TextField
            multiline
            id="value"
            name="value"
            placeholder={"무엇을 공유하고 싶으세요?"}
            fullWidth
            rows={10}
            value={formik.values.value}
            onChange={formik.handleChange}
            error={!!(formik.touched.value && formik.errors.value)}
            helperText={
              formik.touched.value && formik.errors.value
                ? formik.errors.value
                : null
            }
          />
        </form>
        <Box
          sx={{ bg: "grey", width: "auto", height: "2.5rem" }}
          display={"flex"}
          alignItems={"center"}
          justifyContent={"space-between"}
        >
          <Typography>이미지 (15mb)이하</Typography>

          <input
            ref={imageRef}
            type="file"
            accept={"image/*"}
            hidden
            onChange={({ target }) => {
              setImage({
                file: target?.files[0],
                path: target?.value,
              });
            }}
          />
          <Button onClick={onImageUploadButtonClick}>이미지 업로드</Button>
        </Box>
        <Box>
          <Button
            type="submit"
            variant="contained"
            size="large"
            color="primary"
            fullWidth
            onClick={() => {
              if (formik.values.value.length < 10) {
                handleError();
              } else {
                formik.handleSubmit();
              }
            }}
            disabled={isLoading}
            startIcon={isLoading && <CircularProgress />}
          >
            글 올리기
          </Button>
        </Box>
      </Box>
      {isErrorDialogOpen && (
        <ErrorModal open={isErrorDialogOpen} onClose={handleOk} />
      )}
    </Box>
  );
};

export default Writing;
