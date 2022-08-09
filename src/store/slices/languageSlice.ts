import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface LanguageConfig {
  lang: string;
}

const LOCAL_STORAGE_KEY = "langConfig";

const defaultState: LanguageConfig = {
  lang: "ko",
};

const getInitialState = (): LanguageConfig => {
  const localLangConfig = localStorage.getItem(LOCAL_STORAGE_KEY);

  if (!localLangConfig) {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(defaultState));

    return defaultState;
  }

  try {
    const langConfig = JSON.parse(localLangConfig) as LanguageConfig;

    return langConfig;
  } catch {
    localStorage.removeItem(LOCAL_STORAGE_KEY);

    return getInitialState();
  }
};

const initialState = getInitialState();

const langConfigSlice = createSlice({
  name: "langSetting",
  initialState,
  reducers: {
    changeLangSetting: (
      state: typeof initialState,
      action: PayloadAction<LanguageConfig>
    ) => {
      const nextState = { ...state, ...action.payload };

      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(nextState));

      return nextState;
    },
  },
});

export const { changeLangSetting } = langConfigSlice.actions;
export default langConfigSlice.reducer;
