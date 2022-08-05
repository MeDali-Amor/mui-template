import {
    Box,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
} from "@mui/material";
import React, { useMemo } from "react";
import A4SectionHeader from "./components/A4SectionHeader";
import PageIntro from "./components/PageIntro";
import TableHeader4 from "./components/TableHeader4";
import TableHeader7 from "./components/TableHeader7";
import TableHilightedRow7 from "./components/TableHilightedRow7";
import TableRow4 from "./components/TableRow4";
import TableRow7 from "./components/TableRow7";

const PagePdf4 = ({
    data,
    totalVente,
    totalServices,
    chargeExploit,
    TotalChargesExternes,
    impots,
}) => {
    const pourcentageArrondi = (a, b) => {
        if (
            typeof Number(a) == "number" &&
            !isNaN(Number(a)) &&
            typeof Number(b) == "number" &&
            !isNaN(Number(b))
        )
            return Math.round((Number(a) / Number(b)) * 100);
        return 0;
    };
    const chiffreAffaires = {
        a1: totalVente.a1 + totalServices.a1,
        a2: totalVente.a2 + totalServices.a2,
        a3: totalVente.a3 + totalServices.a3,
    };
    const margeGlobale = {
        v1: chiffreAffaires.a1 - chargeExploit.v1,
        v2: chiffreAffaires.a2 - chargeExploit.v2,
        v3: chiffreAffaires.a3 - chargeExploit.v3,
    };
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
            <A4SectionHeader title={"Soldes intermédiaires de gestion"} />
            <PageIntro />
            <Table sx={{ marginBottom: 8, borderBottom: "1px solid black" }}>
                <TableHeader7 />
                <TableBody>
                    <TableRow7
                        label={"Chiffre d'affaires"}
                        v11={chiffreAffaires.a1 || 0}
                        v21={chiffreAffaires.a2 || 0}
                        v31={chiffreAffaires.a3 || 0}
                        v12="100%"
                        v22={"100%"}
                        v32="100%"
                    />
                    <TableRow7
                        label={"Ventes + production réelle"}
                        v11={chiffreAffaires.a1 || 0}
                        v21={chiffreAffaires.a2 || 0}
                        v31={chiffreAffaires.a3 || 0}
                        v12="100%"
                        v22={"100%"}
                        v32="100%"
                    />
                    <TableRow7
                        label={"Achats consommés"}
                        v11={chargeExploit.v1}
                        v21={chargeExploit.v2}
                        v31={chargeExploit.v3}
                        v12={
                            pourcentageArrondi(
                                chargeExploit.v1,
                                chiffreAffaires.a1
                            ) + "%"
                        }
                        v22={
                            pourcentageArrondi(
                                chargeExploit.v2,
                                chiffreAffaires.a2
                            ) + "%"
                        }
                        v32={
                            pourcentageArrondi(
                                chargeExploit.v3,
                                chiffreAffaires.a3
                            ) + "%"
                        }
                    />
                    <TableRow7
                        highlighted
                        label={"Marge globale"}
                        v11={margeGlobale.v1}
                        v21={margeGlobale.v2}
                        v31={margeGlobale.v3}
                        v12={
                            100 -
                            pourcentageArrondi(
                                chargeExploit.v1,
                                chiffreAffaires.a1
                            ) +
                            "%"
                        }
                        v22={
                            100 -
                            pourcentageArrondi(
                                chargeExploit.v2,
                                chiffreAffaires.a2
                            ) +
                            "%"
                        }
                        v32={
                            100 -
                            pourcentageArrondi(
                                chargeExploit.v3,
                                chiffreAffaires.a3
                            ) +
                            "%"
                        }
                    />
                    <TableRow7
                        label={"Charges externes"}
                        v11={TotalChargesExternes.v1}
                        v21={TotalChargesExternes.v2}
                        v31={TotalChargesExternes.v3}
                        v12={
                            pourcentageArrondi(
                                TotalChargesExternes.v1,
                                chiffreAffaires.a1
                            ) + "%"
                        }
                        v22={
                            pourcentageArrondi(
                                TotalChargesExternes.v2,
                                chiffreAffaires.a2
                            ) + "%"
                        }
                        v32={
                            pourcentageArrondi(
                                TotalChargesExternes.v3,
                                chiffreAffaires.a3
                            ) + "%"
                        }
                    />
                    <TableRow7
                        highlighted
                        label={" Valeur ajoutée"}
                        v11={margeGlobale.v1 - TotalChargesExternes.v1}
                        v21={margeGlobale.v2 - TotalChargesExternes.v2}
                        v31={margeGlobale.v3 - TotalChargesExternes.v3}
                        v12={
                            pourcentageArrondi(
                                margeGlobale.v1,
                                chiffreAffaires.a1
                            ) + "%"
                        }
                        v22={
                            pourcentageArrondi(
                                margeGlobale.v2,
                                chiffreAffaires.a2
                            ) + "%"
                        }
                        v32={
                            pourcentageArrondi(
                                margeGlobale.v3,
                                chiffreAffaires.a3
                            ) + "%"
                        }
                    />
                    <TableRow7
                        label={" Impôts et taxes"}
                        v11={impots.v1}
                        v21={impots.v2}
                        v31={impots.v3}
                        v12={
                            pourcentageArrondi(impots.v1, chiffreAffaires.a1) +
                            "%"
                        }
                        v22={
                            pourcentageArrondi(impots.v2, chiffreAffaires.a2) +
                            "%"
                        }
                        v32={
                            pourcentageArrondi(impots.v3, chiffreAffaires.a3) +
                            "%"
                        }
                    />
                    <TableRow7
                        label={"Charges de personnel"}
                        v11="1"
                        v12="0%"
                        v31="3"
                        v21="0%"
                        v22="2"
                        v32="0%"
                    />
                    <TableRow7
                        highlighted
                        label={"Excédent brut d'exploitation"}
                        v11="1"
                        v12="0%"
                        v31="3"
                        v21="0%"
                        v22="2"
                        v32="0%"
                    />
                    <TableRow7
                        label={"Dotation aux amortissements"}
                        v11="1"
                        v12="0%"
                        v31="3"
                        v21="0%"
                        v22="2"
                        v32="0%"
                    />
                    <TableRow7
                        highlighted
                        label={"Résultat d'exploitation"}
                        v11="1"
                        v12="0%"
                        v31="3"
                        v21="0%"
                        v22="2"
                        v32="0%"
                    />
                    <TableRow7
                        label={"Charges financières"}
                        v11="1"
                        v12="0%"
                        v31="3"
                        v21="0%"
                        v22="2"
                        v32="0%"
                    />
                    <TableRow7
                        label={"Résultat financier"}
                        v11="1"
                        v12="0%"
                        v31="3"
                        v21="0%"
                        v22="2"
                        v32="0%"
                    />
                    <TableRow7
                        highlighted
                        label={"Résultat courant"}
                        v11="1"
                        v12="0%"
                        v31="3"
                        v21="0%"
                        v22="2"
                        v32="0%"
                    />
                    <TableRow7
                        highlighted
                        label={"Résultat de l'exercice"}
                        v11="1"
                        v12="0%"
                        v31="3"
                        v21="0%"
                        v22="2"
                        v32="0%"
                    />
                    <TableRow7
                        label={"Capacité d'autofinancement"}
                        v11="1"
                        v12="0%"
                        v31="3"
                        v21="0%"
                        v22="2"
                        v32="0%"
                    />
                </TableBody>
            </Table>
            <A4SectionHeader title={"Capacité d'autofinancement"} />
            <Table sx={{ marginTop: 6, borderBottom: "1px solid black" }}>
                <TableHeader4 />
                <TableRow4 label=" Résultat de l'exercice" highlighted />
                <TableRow4 label=" + Dotation aux amortissements" />
                <TableRow4 label="Capacité d'autofinancement" highlighted />
                <TableRow4 label=" - Remboursement des emprunts" />
                <TableRow4 label="Autofinancement net" highlighted />
            </Table>
            <Box sx={{ position: "absolute", bottom: "1.25%", right: "5%" }}>
                5
            </Box>
        </Box>
    );
};

export default PagePdf4;
