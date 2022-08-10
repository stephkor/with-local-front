import React, { FC } from "react";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";

import Dashboard from "./components/Dashboard";
import Main from "./Pages/Main";
import { ROUTES } from "./config/app";
import Writing from "./Pages/Writing";

const AppRoutes: FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path={"/"}
          element={
            <Dashboard>
              <Outlet />
            </Dashboard>
          }
        >
          <Route path={ROUTES.MAIN} element={<Main />} />
          <Route path={ROUTES.WRITING} element={<Writing />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
