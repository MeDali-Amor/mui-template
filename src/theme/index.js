import PropTypes from "prop-types";
import { useMemo } from "react";
//
import {
    createTheme,
    CssBaseline,
    StyledEngineProvider,
    ThemeProvider,
} from "@mui/material";
import palette from "./palette";
import typography from "./typography";
import shadows, { customShadows } from "./shadows";

export default function CustomThemeProvider({ children }) {
    const themeOptions = useMemo(
        () => ({
            palette,
            shape: { borderRadius: 8 },
            typography,
            shadows,
            customShadows,
        }),
        []
    );

    const theme = createTheme(themeOptions);

    return (
        <StyledEngineProvider injectFirst>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                {children}
            </ThemeProvider>
        </StyledEngineProvider>
    );
}

CustomThemeProvider.prototypes = {
    children: PropTypes.node,
};
