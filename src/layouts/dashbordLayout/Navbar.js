import { AppBar, IconButton, Toolbar } from "@mui/material";
import { alpha, styled } from "@mui/material/styles";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";

// Styles
const Sidebar_width = 260;

const RootStyle = styled(AppBar)(({ theme }) => ({
    // boxShadow: `1px 0px 20px 1px ${theme.palette.grey[300]}`,
    boxShadow: `0px 2px 6px 0px #eeeeee`,
    backdropFilter: "blur(8px) ",
    // opacity: 0.9,
    WebkitBackdropFilter: "blur(20px)", // Fix on Mobile
    background: alpha(theme.palette.grey[100], 0.125),
    // background: "rgba(255, 255, 255, 1)",
    [theme.breakpoints.up("md")]: {
        width: `calc(100% - ${Sidebar_width + 1}px)`,
    },
}));

const ToolbarStyle = styled(Toolbar)(({ theme }) => ({
    minHeight: 70,
    [theme.breakpoints.up("md")]: {
        minHeight: 70,
        padding: theme.spacing(0, 5),
    },
}));

const Navbar = ({ onOpenSidebar }) => {
    return (
        <RootStyle>
            <ToolbarStyle>
                <IconButton
                    sx={{ display: { md: "none" }, mr: 1 }}
                    onClick={onOpenSidebar}
                >
                    <MenuRoundedIcon />
                </IconButton>
            </ToolbarStyle>
        </RootStyle>
    );
};

export default Navbar;
