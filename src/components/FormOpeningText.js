import { Box, Typography } from "@mui/material";
import React from "react";

const FormOpeningText = ({ text = "" }) => {
    return (
        <Box>
            <Typography
                variant="body1"
                fontSize={18}
                fontWeight={500}
                align="center"
                sx={{
                    marginBottom: 6,
                }}
            >
                {text}
            </Typography>
        </Box>
    );
};

export default FormOpeningText;
