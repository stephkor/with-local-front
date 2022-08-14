import React, { FC, useEffect, useState } from "react";
import Box from "@mui/material/Box";
import WritingTopbar from "./WritingTopbar";
import {
  Button,
  CircularProgress,
  MenuItem,
  SelectChangeEvent,
  TextField,
  Typography,
} from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { createBoard, getTabs } from "../../apis/boardApis";
import { useFormik } from "formik";
import * as yup from "yup";
import ErrorModal from "src/components/ErrorModal/ErrorModal";

interface WritingProps {
  address?: string;
}

export const tabListMap = {
  동네맛집: 1,
  동네질문: 2,
  "도움이 필요해요!": 3,
  인기: 4,
};

const Writing: FC<WritingProps> = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isErrorDialogOpen, setIsErrorDialogOpen] = useState<boolean>(false);
  const [categoryList, setCategoryList] = useState([
    { categoryId: 1, text: "동네맛집" },
  ]);
  const address = useSelector(
    (state: RootState) => state.location.selectedLocation
  );

  const { lang } = useSelector((state: RootState) => state.lang);

  const [selectedCategory, setSelectedCategory] = useState({
    categoryId: 1,
    text: "동네맛집",
  });

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
        setCategoryList(res?.data.data);
      } catch (e) {
        console.log(e);
      }
    };
    requestCategory();
  }, [lang]);

  const handleChangeCategory = (e: SelectChangeEvent) => {
    setSelectedCategory({
      categoryId: tabListMap[e.target.value],
      text: e.target.value,
    });
  };

  const handleError = () => {
    setIsErrorDialogOpen(true);
  };

  const handleOk = () => {
    setIsErrorDialogOpen(false);
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
      <WritingTopbar address={address} />
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
          defaultValue={selectedCategory.text}
          onChange={handleChangeCategory}
        >
          {categoryList.map((list: TabListResponse, i) => (
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
