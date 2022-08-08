import { Box, Table, TableBody, Typography } from "@mui/material";
import React from "react";
import A4SectionHeader from "./components/A4SectionHeader";
import PageIntro from "./components/PageIntro";
import TableHead5 from "./components/TableHead5";
import TableRow5 from "./components/TableRow5";

const PagePdf7 = ({ data }) => {
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
            <Typography variant="h6" fontStyle="italic" my={2} mx={1}>
                Première année
            </Typography>
            <Table>
                <TableHead5 />
                <TableBody sx={{ borderBottom: "1px solid black" }}>
                    <TableRow5 label="Apport personnel" />
                    <TableRow5 label="Emprunt" />
                    <TableRow5 label="Subventions" />
                    <TableRow5 label="Autres financements" />
                    <TableRow5 label="Subventions" />
                </TableBody>
                <TableBody sx={{ borderBottom: "1px solid black" }}>
                    <TableRow5 label="Vente de marchandises" />
                    <TableRow5 label="Vente de services" />
                    <TableRow5
                        label="Chiffre d'affaires (total)"
                        highlighted
                        fontWeight={600}
                    />
                    <TableRow5 label="Immobilisations incorporelles" />
                    <TableRow5 label="Immobilisations corporelles" />
                    <TableRow5
                        label="Immobilisations (total)"
                        highlighted
                        fontWeight={600}
                    />
                    <TableRow5 label="Acquisition stocks" />
                    <TableRow5 label="Échéances emprunt" />
                    <TableRow5 label="Achats de marchandises" />
                    <TableRow5 label="Charges externes" />
                    <TableRow5 label="Impots et taxes" />
                </TableBody>
                <TableBody sx={{ borderBottom: "1px solid black" }}>
                    <TableRow5 label="Salaires employés" />

                    <TableRow5 label="Charges sociales employés" />
                    <TableRow5 label="Achats de marchandises" />
                    <TableRow5 label="Prelévèment dirigeant(s)" />
                    <TableRow5 label="Charges sociales dirigeant(s)" />
                    <TableRow5
                        label="Total charges de personnel"
                        highlighted
                        fontWeight={600}
                    />
                    <TableRow5 label="Frais banquaires, charges financières" />
                    <TableRow5
                        label="Total des décaissements"
                        highlighted
                        fontWeight={600}
                    />
                    <TableRow5
                        label="Total des encaissements"
                        highlighted
                        fontWeight={600}
                    />
                    <TableRow5 label="Solde précédent" />
                    <TableRow5 label="Solde du mois" fontWeight={600} />
                    <TableRow5
                        label="Solde de trésorerie (cumul)"
                        highlighted
                        fontWeight={600}
                    />
                </TableBody>
            </Table>{" "}
            <Box sx={{ position: "absolute", bottom: "1.25%", right: "5%" }}>
                8
            </Box>
        </Box>
    );
};

export default PagePdf7;
