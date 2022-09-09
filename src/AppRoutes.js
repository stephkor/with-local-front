import React from "react";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";

import Dashboard from "./components/Dashboard";
import Main from "./Pages/Main";
import { ROUTES } from "./config/appConfig";
import Writing from "./Pages/Writing";
import Detail from "./Pages/Detail";
import Mypage from "./Pages/Mypage";
import Intro from "./Pages/Intro";
import Register from "./Pages/Register";
import Login from "./Pages/Login";
import AboutPage from "./components/Dashboard/AboutPage";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={ROUTES.INTRO} element={<Intro />} />
        <Route path={ROUTES.ABOUT} element={<AboutPage />} />
        <Route
          path={"/"}
          element={
            <Dashboard>
              <Outlet />
            </Dashboard>
          }
        >
          <Route index element={<Intro />} />

          <Route path={ROUTES.REGISTER} element={<Register />} />
          <Route path={ROUTES.LOGIN} element={<Login />} />
          <Route path={ROUTES.MAIN} element={<Main />} />
          <Route path={ROUTES.WRITING} element={<Writing />} />
          <Route path={ROUTES.DETAIL} element={<Detail />} />
          <Route path={ROUTES.MYPAGE} element={<Mypage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
