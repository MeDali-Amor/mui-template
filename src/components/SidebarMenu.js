// import styled from "@emotion/styled";
import { PhotoCamera } from "@mui/icons-material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined";
import {
    alpha,
    Box,
    Collapse,
    IconButton,
    List,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    styled,
    Tooltip,
    useTheme,
} from "@mui/material";
// import { bgcolor } from "@mui/system";

import React from "react";
import { useState } from "react";
import {
    NavLink as RouterLink,
    matchPath,
    useLocation,
    Link,
} from "react-router-dom";

const SidebarMenu = ({ navConfig, ...other }) => {
    const location = useLocation();
    const pathname = location.pathname;
    console.log(pathname);

    const match = (path) =>
        path
            ? matchPath(
                  {
                      path,
                      exact: true,
                      strict: false,
                  },
                  pathname
              )
            : false;

    return (
        <div>
            <Box {...other}>
                <List disablePadding sx={{ p: 1 }}>
                    {navConfig.map((item) => (
                        <MenuItem
                            key={item.title}
                            item={item}
                            isActive={match}
                        />
                    ))}
                </List>
            </Box>
        </div>
    );
};

export default SidebarMenu;

function MenuItem({ item, isActive }) {
    const theme = useTheme();
    const isActiveRoot = isActive(item.path) || isActive(item.plus);
    const { title, icon, path, info, children, plus } = item;
    const [open, setOpen] = useState(isActiveRoot);
    const handleOpen = () => {
        setOpen(!open);
    };

    const activeRootStyle = {
        color: "primary.main",
        fontWeight: "fontWeightMedium",
        bgcolor: alpha(
            theme.palette.primary.main,
            theme.palette.action.selectedOpacity
        ),
    };
    const activeSubStyle = {
        color: "text.primary",
        fontWeight: "fontWeightMedium",
    };

    if (children) {
        <>
            <ListItemStyle
                onClick={handleOpen}
                sx={{
                    ...(isActiveRoot && activeRootStyle),
                }}
            >
                <ListItemText primary={title}>{info && info}</ListItemText>
            </ListItemStyle>
            {/* <Collapse in={open} unmountOnExit> */}
            {/* <List component="div">
                    {children.map((item) => {
                        const { title, path } = item;
                        const isActiveSub = isActive(path);
                        return (
                            <ListItemStyle
                                key={title}
                                component={RouterLink}
                                to={path}
                                sx={{
                                    ...(isActiveSub && activeSubStyle),
                                }}
                            >
                                <ListItemText
                                    disableTypography
                                    primary={title}
                                />
                            </ListItemStyle>
                        );
                    })}
                </List> */}
            {/* </Collapse> */}
        </>;
    }
    return (
        <ListItemStyle
            component={RouterLink}
            to={path}
            sx={{
                ...(isActiveRoot && activeRootStyle),
            }}
        >
            <ListItemIconStyle>{icon && icon}</ListItemIconStyle>
            <ListItemText disableTypography primary={title} />
            {plus && (
                <Link to={plus}>
                    <Tooltip title="Ajouter une nouvelle société">
                        <IconButton
                            sx={{ mr: 1 }}
                            color="primary"
                            aria-label="upload picture"
                            component="span"
                        >
                            <AddBoxOutlinedIcon />
                        </IconButton>
                    </Tooltip>
                </Link>
            )}
            {/* {info && info} */}
        </ListItemStyle>
    );
}
const ListItemStyle = styled((props) => (
    <ListItemButton disableGutters {...props} />
))(({ theme }) => ({
    ...theme.typography.body2,
    height: 48,
    marginBlock: 8,
    position: "relative",
    textTransform: "capitalize",
    color: theme.palette.grey[700],
    borderRadius: theme.shape.borderRadius,
    fontWeight: "600",
}));

const ListItemIconStyle = styled(ListItemIcon)({
    width: 22,
    height: 22,
    color: "inherit",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
});
