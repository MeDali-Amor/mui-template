import {
    Avatar,
    Box,
    Drawer,
    Link,
    styled,
    Typography,
    useMediaQuery,
    useTheme,
} from "@mui/material";
import React from "react";
import { NavLink } from "react-router-dom";
import Iconify from "../../components/Iconify";
import SidebarMenu from "../../components/SidebarMenu";

const DRAWER_WIDTH = 260;
const RootStyle = styled("div")(({ theme }) => ({
    [theme.breakpoints.up("md")]: {
        flexShrink: 0,
        minWidth: DRAWER_WIDTH,
    },
}));
const UserAccountStyle = styled("div")(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(2, 2.5),
    borderRadius: Number(theme.shape.borderRadius) * 1.5,
    backgroundColor: theme.palette.grey[500_12],
}));
const SideBarLogoStyle = styled("img")({
    width: 140,
});

const Sidebar = ({ isSidebarOpen, onSidebarClose }) => {
    const theme = useTheme();
    const isDesktop = useMediaQuery(theme.breakpoints.up("md"));
    // console.log(isDesktop);
    return (
        <RootStyle>
            {!isDesktop && (
                <Drawer
                    open={isSidebarOpen}
                    onClose={onSidebarClose}
                    // BackdropComponent
                    // elevation={16}
                    PaperProps={{
                        sx: {
                            width: DRAWER_WIDTH,
                            bgcolor: "background.default",
                            // borderRightStyle: "dashed",
                            borderRight: `1px dashed  ${theme.palette.grey[300]}`,
                        },
                    }}
                >
                    <Box
                        sx={{
                            px: 2.5,
                            py: 3,
                            display: "inline-flex",
                            justifyContent: "center",
                        }}
                    >
                        <SideBarLogoStyle src="static/images/logo-bimatech.png" />
                    </Box>
                    <Box sx={{ mb: 5, mx: 2.5 }}>
                        <Link underline="none" component={NavLink} to="#">
                            <UserAccountStyle>
                                <Avatar />
                                <Box sx={{ ml: 2 }}>
                                    <Typography
                                        variant="subtitle2"
                                        sx={{ color: "text.primary" }}
                                    >
                                        {userAccount.displayName}
                                    </Typography>
                                    <Typography
                                        variant="body2"
                                        sx={{ color: "text.secondary" }}
                                    >
                                        {userAccount.email}
                                    </Typography>
                                </Box>
                            </UserAccountStyle>
                        </Link>
                    </Box>
                    <SidebarMenu navConfig={navConfig} />
                </Drawer>
            )}
            {isDesktop && (
                <Drawer
                    open
                    variant="persistent"
                    PaperProps={{
                        sx: {
                            width: DRAWER_WIDTH,
                            bgcolor: "background.default",
                            borderRightStyle: "dashed",
                        },
                    }}
                >
                    <Box
                        sx={{
                            px: 2.5,
                            py: 3,
                            display: "inline-flex",
                            justifyContent: "center",
                        }}
                    >
                        <SideBarLogoStyle src="static/images/logo-bimatech.png" />
                    </Box>
                    <Box sx={{ mb: 5, mx: 2.5 }}>
                        <Link underline="none" component={NavLink} to="#">
                            <UserAccountStyle>
                                <Avatar />
                                <Box sx={{ ml: 2 }}>
                                    <Typography
                                        variant="subtitle2"
                                        sx={{ color: "text.primary" }}
                                    >
                                        {userAccount.displayName}
                                    </Typography>
                                    <Typography
                                        variant="body2"
                                        sx={{ color: "text.secondary" }}
                                    >
                                        {userAccount.email}
                                    </Typography>
                                </Box>
                            </UserAccountStyle>
                        </Link>
                    </Box>
                    <SidebarMenu navConfig={navConfig} />
                </Drawer>
            )}
        </RootStyle>
    );
};

export default Sidebar;
const getIcon = (name) => <Iconify icon={name} width={22} height={22} />;
const navConfig = [
    {
        title: "dashboard",
        path: "/",
        icon: getIcon("bxs:dashboard"),
    },
    {
        title: "document",
        path: "/documents",
        icon: getIcon("carbon:document"),
    },
    {
        title: "societés",
        path: "/societes",
        icon: getIcon("bxs:business"),
    },
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
const userAccount = {
    displayName: "Dali Amor",
    email: "text@user.com",
    photoURL: "/static/images/user-avatar.png",
};
