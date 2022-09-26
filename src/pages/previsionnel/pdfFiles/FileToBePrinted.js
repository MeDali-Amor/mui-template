import { Box } from "@mui/material";
import React, { useMemo, useState } from "react";
import PagePdf0 from "./PagePdf0";
import PagePdf1 from "./PagePdf1";
import PagePdf2 from "./PagePdf2";
import PagePdf3 from "./PagePdf3";
import PagePdf4 from "./PagePdf4";
import PagePdf5 from "./PagePdf5";
import PagePdf6 from "./PagePdf6";
import PagePdf7 from "./PagePdf7";
import PagePdf8 from "./PagePdf8";

const FileToBePrinted = ({ data }) => {
    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 1,
                marginBlock: 8,
                // fontSize: 11,
            }}
        >
            <PagePdf0 data={data} />
            <PagePdf1 data={data} />
            <PagePdf2 data={data} />
            <PagePdf3 data={data} />
            <PagePdf4 data={data} />
            <PagePdf5 data={data} />
            <PagePdf6 data={data} />
            <PagePdf7 data={data} />
            <PagePdf8 data={data} />
        </Box>
    );
};

export default FileToBePrinted;
