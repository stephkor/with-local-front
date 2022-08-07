import React, {FC} from "react";
import { BrowserRouter, Routes, Router, Route, Outlet, } from 'react-router-dom'

import Dashboard from "./components/Dashboard";
import Main from './Pages/Main'
import { ROUTES } from './config/app';


const AppRoutes: FC = () => {
    return (
    <BrowserRouter>
        <Routes>
            <Route path={"/"} element={<Dashboard><Outlet/></Dashboard>}>
                <Route  path={ROUTES.MAIN}  element={<Main />} />
            </Route>
        </Routes>
    </BrowserRouter>
    )
}

export default AppRoutes