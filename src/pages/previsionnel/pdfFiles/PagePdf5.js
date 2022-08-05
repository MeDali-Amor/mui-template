import {
    Box,
    Table,
    TableBody,
    TableCell,
    TableRow,
    Typography,
} from "@mui/material";
import React from "react";
import A4SectionHeader from "./components/A4SectionHeader";
import PageIntro from "./components/PageIntro";
import TableHeader4 from "./components/TableHeader4";
import TableRow4 from "./components/TableRow4";

const PagePdf5 = ({ data }) => {
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
            <A4SectionHeader title={"Seuil de rentabilité économique"} />
            <PageIntro
                nom_projet={data?.nom_projet}
                nom={data?.nom}
                prenom={data?.prenom}
            />
            <Table sx={{ mb: 8, borderBottom: "1px solid black" }}>
                <TableHeader4 />
                <TableBody>
                    <TableRow4
                        label=" Ventes + Production réelle"
                        highlighted
                        fontWeight="600"
                        //   v1={amortisIncorp || 0}
                        //   v2={amortisIncorp || 0}
                        //   v3={amortisIncorp || 0}
                        //   fontWeight="600"
                    />
                    <TableRow4
                        label="Achats consommés"
                        //   v1={amortisIncorp || 0}
                        //   v2={amortisIncorp || 0}
                        //   v3={amortisIncorp || 0}
                        //   fontWeight="600"
                    />
                    <TableRow4
                        label="Total des coûts variables"
                        //   v1={amortisIncorp || 0}
                        //   v2={amortisIncorp || 0}
                        //   v3={amortisIncorp || 0}
                        //   fontWeight="600"
                    />
                    <TableRow4
                        label="Marge sur coûts variables"
                        //   v1={amortisIncorp || 0}
                        //   v2={amortisIncorp || 0}
                        //   v3={amortisIncorp || 0}
                        //   fontWeight="600"
                    />
                    <TableRow4
                        label="Taux de marge sur coûts variables"
                        highlighted
                        fontWeight="600"
                        //   v1={amortisIncorp || 0}
                        //   v2={amortisIncorp || 0}
                        //   v3={amortisIncorp || 0}
                        //   fontWeight="600"
                    />

                    <TableRow4 label="Coûts fixes" v1={0} v2={0} v3={0} />
                    <TableRow4
                        label=" Total des charges"
                        //   v1={amortisIncorp || 0}
                        //   v2={amortisIncorp || 0}
                        //   v3={amortisIncorp || 0}
                        fontWeight="600"
                        highlighted
                    />
                    <TableRow4
                        label="Résultat courant avant impôts"
                        //   v1={amortisIncorp || 0}
                        //   v2={amortisIncorp || 0}
                        //   v3={amortisIncorp || 0}
                        //   fontWeight="600"
                    />
                    <TableRow4
                        label=" Seuil de rentabilité (chiffre d'affaires)"
                        //   v1={amortisIncorp || 0}
                        //   v2={amortisIncorp || 0}
                        //   v3={amortisIncorp || 0}
                        fontWeight="600"
                        highlighted
                    />
                    <TableRow4
                        label="Excédent / insuffisance"
                        //   v1={amortisIncorp || 0}
                        //   v2={amortisIncorp || 0}
                        //   v3={amortisIncorp || 0}
                        //   fontWeight="600"
                    />
                    <TableRow4
                        label=" Point mort en chiffre d'affaires par jour ouvré"
                        v1={0}
                        v2={0}
                        v3={0}
                    />
                </TableBody>
            </Table>
            <A4SectionHeader title={"Besoin en fonds de roulement"} />
            <Typography
                fontWeight={500}
                fontSize={14}
                fontStyle="italic"
                mt={6}
            >
                {" "}
                Analyse clients / fournisseurs : :
            </Typography>
            <Table>
                <TableHeader4 />
                <TableBody>
                    <TableRow4
                        label="Besoins"
                        highlighted
                        fontWeight="600"
                        //   v1={amortisIncorp || 0}
                        //   v2={amortisIncorp || 0}
                        //   v3={amortisIncorp || 0}
                        //   fontWeight="600"
                    />
                    <TableRow4
                        label="Volume crédit client HT"
                        //   v1={amortisIncorp || 0}
                        //   v2={amortisIncorp || 0}
                        //   v3={amortisIncorp || 0}
                        //   fontWeight="600"
                    />
                    <TableRow4
                        label=" Ressources"
                        //   v1={amortisIncorp || 0}
                        //   v2={amortisIncorp || 0}
                        //   v3={amortisIncorp || 0}
                        highlighted
                        fontWeight="600"
                    />
                    <TableRow4
                        label="Volume dettes fournisseurs HT"
                        //   v1={amortisIncorp || 0}
                        //   v2={amortisIncorp || 0}
                        //   v3={amortisIncorp || 0}
                        //   fontWeight="600"
                    />
                    <TableRow4
                        label=" Besoin en fonds de roulement"
                        highlighted
                        fontWeight="600"
                        //   v1={amortisIncorp || 0}
                        //   v2={amortisIncorp || 0}
                        //   v3={amortisIncorp || 0}
                        //   fontWeight="600"
                    />
                </TableBody>
            </Table>

            <Box sx={{ position: "absolute", bottom: "1.25%", right: "5%" }}>
                6
            </Box>
        </Box>
    );
};

export default PagePdf5;
