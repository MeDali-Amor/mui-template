import { styled } from "@mui/material/styles";
import { useState } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

// Styles
// const Navbar_Mobile = 64;
// const Navbar_Desktop = 92;

const Layout = styled("div")({
    display: "flex",
    minHeight: "100%",
    overflow: "hidden",
});

const MainStyle = styled("div")(({ theme }) => ({
    flexGrow: 1,
    overflow: "auto",
    minHeight: "100%",
    paddingTop: theme.spacing(10),
    paddingBottom: theme.spacing(10),
}));

const DashboardLayout = () => {
    const [open, setOpen] = useState(false);
    return (
        <Layout>
            <Navbar onOpenSidebar={() => setOpen(true)} />
            <Sidebar
                isSidebarOpen={open}
                onSidebarClose={() => setOpen(false)}
            />
            <MainStyle>
                <Outlet />
            </MainStyle>
        </Layout>
    );
};

export default DashboardLayout;
