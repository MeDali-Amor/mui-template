import { Box } from "@mui/material";
import React from "react";
import FileUploadDropZone from "../components/FileUploadDropZone";

const Document = () => {
    return (
        <Box>
            <Box>
                <FileUploadDropZone />
            </Box>
        </Box>
    );
};

export default Document;
