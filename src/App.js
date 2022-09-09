import React from "react";
import { Provider } from "react-redux";
import { store } from "./store/slices";
import { CssBaseline } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "./theme";
import { SnackbarProvider } from "notistack";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import "./app.css";
import AppRoutes from "./AppRoutes";

const queryClient = new QueryClient({
  defaultOptions: { queries: { refetchOnWindowFocus: false, retry: 1 } },
});

let persistor = persistStore(store);

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <QueryClientProvider client={queryClient}>
          <CssBaseline />
          <ThemeProvider theme={theme}>
            <SnackbarProvider
              maxSnack={3}
              anchorOrigin={{
                vertical: "top",
                horizontal: "center",
              }}
              autoHideDuration={3000}
              preventDuplicate
              disableWindowBlurListener
            >
              <AppRoutes />
            </SnackbarProvider>
          </ThemeProvider>

          <ReactQueryDevtools position="bottom-right" />
        </QueryClientProvider>
      </PersistGate>
    </Provider>
  );
}

export default App;
