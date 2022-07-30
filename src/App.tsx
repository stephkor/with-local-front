import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Provider } from "react-redux";
import { store } from "./store";
import { CssBaseline } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "./theme";
import { SnackbarProvider } from "notistack";
//import { ReactQueryDevtools } from "react-query/devtools";
import { ROUTES } from './config/routes';
import { BrowserRouter, Routes, Router, Route, Outlet, } from 'react-router-dom'
import Dashboard from "./components/Dashboard";

function App() {
  return (
      <Provider store={store}>
      {/*<QueryClientProvider client={queryClient}>*/}
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
      <BrowserRouter>
        <Routes>
            <Route path={"/"} element={<Dashboard><Outlet/></Dashboard>}>
          <Route path={ROUTES.MAIN}  element={<div>메인페이지</div>} />
            </Route>
        </Routes>
        </BrowserRouter>
             </SnackbarProvider>
      </ThemeProvider>
      {/*<ReactQueryDevtools position="bottom-right" />*/}
      {/*</QueryClientProvider>*/}
    </Provider>
  );
}

export default App;

