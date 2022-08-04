import { Box, Typography } from "@mui/material";
import React from "react";

const A4SectionHeader = ({ title }) => {
    return (
        <Box
            sx={{
                width: "100%",
                height: "8%",
                border: "3px solid black",
                padding: 2,
            }}
        >
            <Typography
                sx={{
                    marginBlock: 1,
                    textAlign: "center",
                    fontSize: 24,
                    fontWeight: "700",
                    height: "5%",
                }}
            >
                {title}
            </Typography>
        </Box>
    );
};

export default A4SectionHeader;
