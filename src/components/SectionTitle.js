import { Box, Typography } from "@mui/material";
import React from "react";

const SectionTitle = ({ title = "", color = "#0a2669" }) => {
    return (
        <Box
            sx={{
                marginBottom: 3,
                marginTop: 4,
                paddingTop: 2,
                paddingInline: 1,
            }}
        >
            <Typography variant="h4" gutterBottom color={color}>
                {title}
            </Typography>
        </Box>
    );
};

export default SectionTitle;
