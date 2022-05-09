import React from "react";
import { useRoutes } from "react-router-dom";
import DashboardLayout from "./layouts/dashbordLayout";

function Router() {
    return useRoutes([{ path: "/", element: <DashboardLayout /> }]);
}

export default Router;
