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
import { analysePret } from "../computationHandlers/chargeFinancieres";
import { chargesSocialsHandler } from "../computationHandlers/chargesSocials";
import { chiffresAffairesHandler } from "../computationHandlers/chiffresAffaires";
import { amortissementHandler } from "../computationHandlers/Investissement";
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

const PagePdf3 = ({ data }) => {
    const { totalAmortissement } = amortissementHandler(
        data?.besoin_demarage,
        data?.duree_amortissement
    );

    const analysePrets = [
        data.financement_demarage.pret_1,
        data.financement_demarage.pret_2,
        data.financement_demarage.pret_3,
    ].map((el) => analysePret(el));
    const {
        totalVenteAnnuel,
        totalServicesAnnuel,
        chargeExploit,
        margeBrute,
        totalChargesExternes,
        valeurAjoutee,
        produitsExploit,
        chargesExternes,
        autres_charges_fixes,
        totalChargesBancaire,
    } = chiffresAffairesHandler(
        data.chiffre_affaire_an1,
        data.pourcentage_vente_cout_achat,
        data.charges_fixes,
        analysePrets
    );
    const impots = [
        data.charges_fixes.annee1.impôt_taxes,
        data.charges_fixes.annee2.impôt_taxes,

        data.charges_fixes.annee3.impôt_taxes,
    ];

    const {
        charges_employes,
        charges_social_dirig,
        excedentBrute,
        resultat_avant_impot,
        impot_societes,
        resultat_net,
    } = chargesSocialsHandler(
        data.form_juridique,
        data.salaires_employes,
        data.remuneration_dirigeants,
        data.dir_ACCRE,
        impots,
        totalAmortissement,
        totalChargesBancaire,
        valeurAjoutee,
        totalVenteAnnuel,
        totalServicesAnnuel
    );
    // console.log(charges_employes);
    // console.log(
    //     analysePrets
    //     // totalVenteAnnuel,
    //     // totalServicesAnnuel,
    //     // chargeExploit,
    //     // margeBrute,
    //     // totalChargesExternes,
    //     // valeurAjoutee
    // );

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
                        v1={produitsExploit[0] || 0}
                        v2={produitsExploit[1] || 0}
                        v3={produitsExploit[2] || 0}
                        fontWeight="600"
                    />
                    <TableRow4
                        label="Chiffre d'affaires HT vente de marchandises"
                        v1={totalVenteAnnuel[0] || 0}
                        v2={totalVenteAnnuel[1] || 0}
                        v3={totalVenteAnnuel[2] || 0}
                    />
                    <TableRow4
                        label="Chiffre d'affaires HT services"
                        v1={totalServicesAnnuel[0] || 0}
                        v2={totalServicesAnnuel[1] || 0}
                        v3={totalServicesAnnuel[2] || 0}
                        // fontWeight=""
                    />
                    <TableRow4
                        label=" Charges d'exploitation"
                        v1={chargeExploit[0] || 0}
                        v2={chargeExploit[1] || 0}
                        v3={chargeExploit[2] || 0}
                        fontWeight="600"
                    />
                    <TableRow4
                        label="Achats consommés"
                        v1={chargeExploit[0] || 0}
                        v2={chargeExploit[1] || 0}
                        v3={chargeExploit[2] || 0}
                    />
                    <TableRow4
                        highlighted
                        label="Marge brute"
                        v1={margeBrute[0] || 0}
                        v2={margeBrute[1] || 0}
                        v3={margeBrute[2] || 0}
                        fontWeight={"600"}
                    />
                    <TableRow4
                        fontWeight={"600"}
                        label="Charges externes"
                        v1={totalChargesExternes[0] || 0}
                        v2={totalChargesExternes[1] || 0}
                        v3={totalChargesExternes[2] || 0}
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
                        v1={valeurAjoutee[0]}
                        v2={valeurAjoutee[1]}
                        v3={valeurAjoutee[2]}
                    />
                    <TableRow4
                        // highlighted
                        fontWeight={"600"}
                        label="Impôt et taxes"
                        v1={impots[0]}
                        v2={impots[1]}
                        v3={impots[2]}
                    />
                    <TableRow4
                        // highlighted
                        // fontWeight={"600"}
                        label="Salaires employés"
                        v1={data.salaires_employes[0]}
                        v2={data.salaires_employes[1]}
                        v3={data.salaires_employes[2]}
                    />
                    <TableRow4
                        // highlighted
                        // fontWeight={"600"}
                        label="Charges sociales employés"
                        v1={charges_employes[0]}
                        v2={charges_employes[1]}
                        v3={charges_employes[2]}
                    />
                    <TableRow4
                        // highlighted
                        fontWeight={"600"}
                        label="Prélèvement dirigeant(s)"
                        v1={data.remuneration_dirigeants[0]}
                        v2={data.remuneration_dirigeants[1]}
                        v3={data.remuneration_dirigeants[2]}
                    />
                    <TableRow4
                        // highlighted
                        // fontWeight={"600"}
                        label="Charges sociales dirigeant(s)"
                        v1={charges_social_dirig[0]}
                        v2={charges_social_dirig[1]}
                        v3={charges_social_dirig[2]}
                    />
                    <TableRow4
                        highlighted
                        fontWeight={"600"}
                        label="Excédent brut d'exploitation"
                        v1={excedentBrute[0]}
                        v2={excedentBrute[1]}
                        v3={excedentBrute[2]}
                    />
                    <TableRow4
                        // highlighted
                        fontWeight={"600"}
                        label="Frais bancaires, charges financières"
                        v1={totalChargesBancaire[0]}
                        v2={totalChargesBancaire[1]}
                        v3={totalChargesBancaire[2]}
                    />
                    <TableRow4
                        // highlighted
                        fontWeight={"600"}
                        label="Dotations aux amortissements"
                        v1={totalAmortissement}
                        v2={totalAmortissement}
                        v3={totalAmortissement}
                    />
                    <TableRow4
                        highlighted
                        fontWeight={"600"}
                        label="Résultat avant impôts"
                        v1={resultat_avant_impot[0]}
                        v2={resultat_avant_impot[1]}
                        v3={resultat_avant_impot[2]}
                    />
                    {impot_societes && (
                        <TableRow4
                            // highlighted
                            fontWeight={"500"}
                            label="Impôts sur les sociétés"
                            v1={impot_societes[0]}
                            v2={impot_societes[1]}
                            v3={impot_societes[2]}
                        />
                    )}

                    <RegulatTableRow />
                    <TableRow4
                        highlighted
                        fontWeight={"600"}
                        label="Résultat net comptable (résultat de l'exercice)"
                        v1={resultat_net[0]}
                        v2={resultat_net[1]}
                        v3={resultat_net[2]}
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
