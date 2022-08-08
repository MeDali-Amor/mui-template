import { Box, Table, TableBody, Typography } from "@mui/material";
import React from "react";
import A4SectionHeader from "./components/A4SectionHeader";
import PageIntro from "./components/PageIntro";
import TableHead5 from "./components/TableHead5";
import TableHead6 from "./components/TableHead6";
import TableRow6 from "./components/TableRow6";

const PagePdf8 = ({ data }) => {
    return (
        <Box
            sx={{
                width: "21cm",
                height: "29cm",
                border: "1px solid black",
                padding: "1.2cm 1cm",
                position: "relative",
            }}
        >
            <A4SectionHeader title={"Budget prévisionnel de trésorerie"} />
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <PageIntro
                    nom_projet={data?.nom_projet}
                    nom={data?.nom}
                    prenom={data?.prenom}
                />
                <Typography variant="subtitle1" fontStyle={"italic"} py={2}>
                    Hors TVA
                </Typography>
            </Box>
            <Typography
                variant="h6"
                fontStyle="italic"
                my={2}
                mx={1}
            ></Typography>
            <Table>
                <TableHead6 />
                <TableBody sx={{ borderBottom: "1px solid black" }}>
                    <TableRow6 />
                    <TableRow6 />
                    <TableRow6 />
                    <TableRow6 />
                    <TableRow6 />
                </TableBody>
                <TableBody sx={{ borderBottom: "1px solid black" }}>
                    <TableRow6 />
                    <TableRow6 />
                    <TableRow6 highlighted fontWeight={600} />
                    <TableRow6 />
                    <TableRow6 />
                    <TableRow6 highlighted fontWeight={600} />
                    <TableRow6 />
                    <TableRow6 />
                    <TableRow6 />
                    <TableRow6 />
                    <TableRow6 />
                </TableBody>
                <TableBody sx={{ borderBottom: "1px solid black" }}>
                    <TableRow6 />

                    <TableRow6 />
                    <TableRow6 />
                    <TableRow6 />
                    <TableRow6 />
                    <TableRow6 highlighted fontWeight={600} />
                    <TableRow6 />
                    <TableRow6 highlighted fontWeight={600} />
                    <TableRow6 highlighted fontWeight={600} />
                    <TableRow6 />
                    <TableRow6 fontWeight={600} />
                    <TableRow6 highlighted fontWeight={600} />
                </TableBody>
            </Table>
            <Box sx={{ position: "absolute", bottom: "1.25%", right: "5%" }}>
                9
            </Box>
        </Box>
    );
};

export default PagePdf8;
