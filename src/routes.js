import React from "react";
import { useRoutes } from "react-router-dom";
import DashboardLayout from "./layouts/dashbordLayout";
import Dashboard from "./pages/Dashboard";
// import Document from "./pages/Document";
import Societes from "./pages/societe/Societes";
import CreationSociete from "./pages/creationSociete/CreationSociete";
// import { Adddirig } from "./pages/creationSociete/Adddirig";
// import AttestationHebergement from "./pages/cerfas/AttestationHebergement";
// import PrevisionnelForm from "./pages/previsionnel/PrevisionnelForm";
// import Demo from "./pages/previsionnel/Demo";

function Router() {
    return useRoutes([
        {
            path: "/",
            element: <DashboardLayout />,
            children: [
                {
                    path: "/",
                    element: <Dashboard />,
                },
                // {
                //     path: "/documents",
                //     element: <Document />,
                // },
                {
                    path: "/societes",
                    element: <Societes />,
                },
                {
                    path: "/societes/nouvelle-societe",
                    element: <CreationSociete />,
                },
                // {
                //     path: "/societes/add",
                //     element: <Adddirig />,
                // },
                // {
                //     path: "/cerfa",
                //     element: <AttestationHebergement />,
                // },
                // {
                //     path: "/previsionnel",
                //     // element: <Demo />,
                //     element: <PrevisionnelForm />,
                // },
            ],
        },
    ]);
}

export default Router;
