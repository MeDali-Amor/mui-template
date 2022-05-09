import { Drawer, styled, useMediaQuery, useTheme } from "@mui/material";
import React from "react";
import SidebarMenu from "../../components/SidebarMenu";

const RootStyle = styled("div")(({ theme }) => ({
    [theme.breakpoints.up("lg")]: {
        flexShrink: 0,
        minWidth: "280px",
    },
}));

const Sidebar = ({ isSidebarOpen, onSidebarClose }) => {
    const theme = useTheme();
    const isDesktop = useMediaQuery(theme.breakpoints.up("lg"));
    console.log(isDesktop);
    return (
        <RootStyle>
            {!isDesktop && (
                <Drawer
                    open={isSidebarOpen}
                    onClose={onSidebarClose}
                    PaperProps={{
                        sx: {
                            width: "280px",
                            bgcolor: "background.default",
                            borderRightStyle: "dashed",
                        },
                    }}
                >
                    <SidebarMenu navConfig={navConfig} />
                </Drawer>
            )}
            {isDesktop && (
                <Drawer
                    open
                    variant="persistent"
                    PaperProps={{
                        sx: {
                            width: "280px",
                            bgcolor: "background.default",
                            borderRightStyle: "dashed",
                        },
                    }}
                >
                    <SidebarMenu navConfig={navConfig} />
                </Drawer>
            )}
        </RootStyle>
    );
};

export default Sidebar;

const navConfig = [
    {
        title: "dashboard",
        path: "/",
        // icon: getIcon("eva:pie-chart-2-fill"),
    },
    // {
    //     title: "user",
    //     path: "/dashboard/user",
    //     // icon: getIcon("eva:people-fill"),
    // },
    // {
    //     title: "product",
    //     path: "/dashboard/products",
    //     // icon: getIcon("eva:shopping-bag-fill"),
    // },
    // {
    //     title: "blog",
    //     path: "/dashboard/blog",
    //     // icon: getIcon("eva:file-text-fill"),
    // },
    // {
    //     title: "login",
    //     path: "/login",
    //     // icon: getIcon("eva:lock-fill"),
    // },
    // {
    //     title: "register",
    //     path: "/register",
    //     // icon: getIcon("eva:person-add-fill"),
    // },
    // {
    //     title: "Not found",
    //     path: "/404",
    //     // icon: getIcon("eva:alert-triangle-fill"),
    // },
];
