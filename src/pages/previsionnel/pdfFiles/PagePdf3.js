import {
    Box,
    Stack,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Typography,
} from "@mui/material";
import React, { useEffect, useMemo } from "react";
import { chargesFixesDataArray } from "../formData";
import A4SectionHeader from "./components/A4SectionHeader";
import PageIntro from "./components/PageIntro";
import TableHeader4 from "./components/TableHeader4";
import TableRow4 from "./components/TableRow4";

const RegulatTableRow = ({ label = "", v1 = "", v2 = "", v3 = "" }) => {
    return (
        <TableRow
            sx={{
                "& td": {
                    // borderRight: 0,
                    borderBlock: 0,
                },
            }}
        >
            <TableCell
                sx={{
                    width: "50%",
                    paddingInline: 1,
                    paddingBlock: 0,
                    borderLeft: "1px solid black",
                }}
            >
                {label}
            </TableCell>
            <TableCell
                sx={{
                    paddingBlock: 1,
                    textAlign: "center",
                    width: "15%",
                    paddingInline: 1,
                    borderLeft: "1px dashed black",
                }}
            >
                {v1}
            </TableCell>
            <TableCell
                sx={{
                    paddingBlock: 1,
                    textAlign: "center",
                    width: "15%",
                    paddingInline: 1,
                    borderLeft: "1px dashed black",
                }}
            >
                {v2}{" "}
            </TableCell>
            <TableCell
                sx={{
                    paddingBlock: 1,
                    textAlign: "center",
                    width: "15%",
                    paddingInline: 1,
                    borderLeft: "1px dashed black",
                    borderRight: "1px solid black",
                }}
            >
                {v3}{" "}
            </TableCell>
        </TableRow>
    );
};

const PagePdf3 = ({
    data,
    totalVente,
    totalServices,
    chargeExploit,
    margeBrute,
    chargesExternes,
    TotalChargesExternes,
    valerAjoutées,
    impots,
    autres_charges_fixes,
}) => {
    return (
        <Box
            sx={{
                width: "21cm",
                height: "29cm",
                border: "1px solid black",
                padding: "0.8cm 1cm",
                position: "relative",
            }}
        >
            <A4SectionHeader
                title={"Compte de résultats prévisionnel sur 3 ans"}
            />
            <PageIntro
                nom_projet={data?.nom_projet}
                nom={data?.nom}
                prenom={data?.prenom}
            />
            <Table sx={{ borderBottom: "1px solid black" }}>
                <TableHeader4 />
                <TableBody>
                    <TableRow4
                        label="Produits d'exploitation"
                        v1={totalVente.a1 + totalServices.a1 || 0}
                        v2={totalVente.a2 + totalServices.a2 || 0}
                        v3={totalVente.a3 + totalServices.a3 || 0}
                        fontWeight="600"
                    />
                    <TableRow4
                        label="Chiffre d'affaires HT vente de marchandises"
                        v1={totalServices.a1 || 0}
                        v2={totalServices.a2 || 0}
                        v3={totalServices.a3 || 0}
                        // fontWeight=""
                    />
                    <TableRow4
                        label="Chiffre d'affaires HT services"
                        v1={totalVente.a1 || 0}
                        v2={totalVente.a2 || 0}
                        v3={totalVente.a3 || 0}
                        // fontWeight=""
                    />
                    <TableRow4
                        label=" Charges d'exploitation"
                        v1={chargeExploit.v1}
                        v2={chargeExploit.v2}
                        v3={chargeExploit.v3}
                        fontWeight="600"
                    />
                    <TableRow4
                        label="Achats consommés"
                        v1={chargeExploit.v1}
                        v2={chargeExploit.v2}
                        v3={chargeExploit.v3}
                        // fontWeight="600"
                    />
                    <TableRow4
                        highlighted
                        label="Marge brute"
                        v1={margeBrute.v1}
                        v2={margeBrute.v2}
                        v3={margeBrute.v3}
                        fontWeight={"600"}
                    />
                    <TableRow4
                        fontWeight={"600"}
                        label="Charges externes"
                        v1={TotalChargesExternes.v1}
                        v2={TotalChargesExternes.v2}
                        v3={TotalChargesExternes.v3}
                    />
                    {chargesExternes.map((el) => (
                        <TableRow4
                            key={el.label}
                            label={el.label}
                            v1={el.v1}
                            v2={el.v2}
                            v3={el.v3}
                        />
                    ))}
                    {autres_charges_fixes.map((el) => (
                        <TableRow4
                            sx={{ fontSize: 12 }}
                            key={el.name}
                            label={el.name}
                            v1={el.autres_an1}
                            v2={el.autres_an2}
                            v3={el.autres_an3}
                        />
                    ))}
                    <TableRow4
                        highlighted
                        fontWeight={"600"}
                        label="Valeur ajoutée"
                        v1={valerAjoutées.v1}
                        v2={valerAjoutées.v2}
                        v3={valerAjoutées.v3}
                    />
                    <TableRow4
                        // highlighted
                        fontWeight={"600"}
                        label="Impôt et taxes"
                        v1={data.charges_fixes.annee1.impôt_taxes}
                        v2={data.charges_fixes.annee2.impôt_taxes}
                        v3={data.charges_fixes.annee3.impôt_taxes}
                    />
                    <TableRow4
                        // highlighted
                        // fontWeight={"600"}
                        label="Charges sociales employés"
                        v1={data.salaires_employes[1]}
                        v2={data.salaires_employes[2]}
                        v3={data.salaires_employes[3]}
                    />
                    <TableRow4
                        // highlighted
                        fontWeight={"600"}
                        label="Prélèvement dirigeant(s)"
                        // v1={data.salaires_employes[1]}
                        // v2={data.salaires_employes[2]}
                        // v3={data.salaires_employes[3]}
                    />
                    <TableRow4
                        // highlighted
                        fontWeight={"600"}
                        label="Prélèvement dirigeant(s)"
                        // v1={data.salaires_employes[1]}
                        // v2={data.salaires_employes[2]}
                        // v3={data.salaires_employes[3]}
                    />
                    <TableRow4
                        // highlighted
                        // fontWeight={"600"}
                        label="Charges sociales dirigeant(s)"
                        // v1={data.salaires_employes[1]}
                        // v2={data.salaires_employes[2]}
                        // v3={data.salaires_employes[3]}
                    />
                    <TableRow4
                        highlighted
                        fontWeight={"600"}
                        label="Excédent brut d'exploitation"
                        // v1={data.salaires_employes[1]}
                        // v2={data.salaires_employes[2]}
                        // v3={data.salaires_employes[3]}
                    />
                    <TableRow4
                        // highlighted
                        fontWeight={"600"}
                        label="Frais bancaires, charges financières"
                        // v1={data.salaires_employes[1]}
                        // v2={data.salaires_employes[2]}
                        // v3={data.salaires_employes[3]}
                    />
                    <TableRow4
                        // highlighted
                        fontWeight={"600"}
                        label="Dotations aux amortissements"
                        // v1={data.salaires_employes[1]}
                        // v2={data.salaires_employes[2]}
                        // v3={data.salaires_employes[3]}
                    />
                    <TableRow4
                        highlighted
                        fontWeight={"600"}
                        label="Résultat avant impôts"
                        // v1={data.salaires_employes[1]}
                        // v2={data.salaires_employes[2]}
                        // v3={data.salaires_employes[3]}
                    />

                    <RegulatTableRow />
                    <TableRow4
                        highlighted
                        fontWeight={"600"}
                        label="Résultat net comptable (résultat de l'exercice)"
                        // v1={data.salaires_employes[1]}
                        // v2={data.salaires_employes[2]}
                        // v3={data.salaires_employes[3]}
                    />
                    <RegulatTableRow />
                </TableBody>
            </Table>
            <Box
                sx={{
                    position: "absolute",
                    bottom: "1.25%",
                    right: "5%",
                }}
            >
                4
            </Box>
        </Box>
    );
};

export default PagePdf3;
