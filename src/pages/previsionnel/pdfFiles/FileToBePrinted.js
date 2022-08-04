import { Box } from "@mui/material";
import React from "react";
import PagePdf0 from "./PagePdf0";
import PagePdf1 from "./PagePdf1";
import PagePdf2 from "./PagePdf2";
import PagePdf3 from "./PagePdf3";
import PagePdf4 from "./PagePdf4";
import PagePdf7 from "./PagePdf7";

const FileToBePrinted = ({ data }) => {
    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 1,
                marginBlock: 8,
            }}
        >
            <PagePdf0 data={data} />
            <PagePdf1 data={data} />
            <PagePdf2 data={data} />
            <PagePdf3 data={data} />
            <PagePdf4 data={data} />
            <PagePdf7 data={data} />
        </Box>
    );
};

export default FileToBePrinted;
