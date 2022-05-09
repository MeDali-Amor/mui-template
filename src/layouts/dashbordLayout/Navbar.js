import { AppBar, IconButton, Toolbar } from "@mui/material";
import { alpha, styled } from "@mui/material/styles";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";

// Styles
const Sidebar_width = 280;

const RootStyle = styled(AppBar)(({ theme }) => ({
    boxShadow: `1px 0px 20px 1px ${theme.palette.grey[300]}`,
    backdropFilter: "blur(6px)",
    opacity: 0.8,
    WebkitBackdropFilter: "blur(6px)", // Fix on Mobile
    backgroundColor: alpha(theme.palette.primary.light, 0.1),
    [theme.breakpoints.up("lg")]: {
        width: `calc(100% - ${Sidebar_width + 1}px)`,
    },
}));

const ToolbarStyle = styled(Toolbar)(({ theme }) => ({
    minHeight: 64,
    [theme.breakpoints.up("lg")]: {
        minHeight: 70,
        padding: theme.spacing(0, 5),
    },
}));

const Navbar = ({ onOpenSidebar }) => {
    return (
        <RootStyle>
            <ToolbarStyle>
                <IconButton
                    sx={{ display: { lg: "none" }, mr: 1 }}
                    onClick={onOpenSidebar}
                >
                    <MenuRoundedIcon />
                </IconButton>
            </ToolbarStyle>
        </RootStyle>
    );
};

export default Navbar;
