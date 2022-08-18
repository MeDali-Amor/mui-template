import {
    Box,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
} from "@mui/material";
import React, { useMemo } from "react";
import { analysePret } from "../computationHandlers/chargeFinancieres";
import { chargesSocialsHandler } from "../computationHandlers/chargesSocials";
import { chiffresAffairesHandler } from "../computationHandlers/chiffresAffaires";
import { amortissementHandler } from "../computationHandlers/Investissement";
import { soldesGestionHandler } from "../computationHandlers/soldesintermediaires";
import A4SectionHeader from "./components/A4SectionHeader";
import PageIntro from "./components/PageIntro";
import TableHeader4 from "./components/TableHeader4";
import TableHeader7 from "./components/TableHeader7";
import TableHilightedRow7 from "./components/TableHilightedRow7";
import TableRow4 from "./components/TableRow4";
import TableRow7 from "./components/TableRow7";

const PagePdf4 = ({
    data,
    // totalVente,
    // totalServices,
    // // chargeExploit,
    // TotalChargesExternes,
    // // impots,
}) => {
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
        totalChargesBancaire,
        totalPrincipaltAnnuel,
    } = chiffresAffairesHandler(
        data.chiffre_affaire_an1,
        data.pourcentage_vente_cout_achat,
        data.charges_fixes,
        analysePrets
    );

    const impots = [
        data.charges_fixes.annee1.impôt_taxes,
        data.charges_fixes.annee2.impôt_taxes,

        data.charges_fixes.annee2.impôt_taxes,
    ];

    const {
        excedentBrute,
        resultat_avant_impot,
        resultat_net,
        chargesPersonnel,
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
    const {
        autofinancement_net,
        resultat_exploitation,
        capacite_autofinancement,
        chiffres_affaire_pourcentage,
        achats_consommes_pourcentage,
        marge_global_pourcentage,
        charges_externes_pourcentage,
        valeur_ajoutee_pourcentage,
        impots_taxes_pourcentage,
        charges_personnel_pourcentage,
        excedent_brute_pourcentage,
        dotation_amortissement_pourcentage,
        resultat_exploitation_pourcentage,
        chiffres_financieres_pourcentage,
        resultat_financier_pourcentage,
        resultat_courant_pourcentage,
        resultat_exercice_pourcentage,
        capacite_autofinancement_pourcentage,
    } = soldesGestionHandler(
        produitsExploit,
        chargeExploit,
        margeBrute,
        totalChargesExternes,
        totalChargesBancaire,
        valeurAjoutee,
        impots,
        chargesPersonnel,
        excedentBrute,
        totalAmortissement,
        resultat_avant_impot,
        resultat_net,
        totalPrincipaltAnnuel
    );
    // const pourcentageArrondi = (a, b) => {
    //     if (
    //         typeof Number(a) == "number" &&
    //         !isNaN(Number(a)) &&
    //         typeof Number(b) == "number" &&
    //         !isNaN(Number(b))
    //     )
    //         return Math.round((Number(a) / Number(b)) * 100);
    //     return 0;
    // };
    // const chiffreAffaires = {
    //     a1: totalVente.a1 + totalServices.a1,
    //     a2: totalVente.a2 + totalServices.a2,
    //     a3: totalVente.a3 + totalServices.a3,
    // };
    // const margeGlobale = {
    //     v1: chiffreAffaires.a1 - chargeExploit.v1,
    //     v2: chiffreAffaires.a2 - chargeExploit.v2,
    //     v3: chiffreAffaires.a3 - chargeExploit.v3,
    // };
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
                        v11={produitsExploit[0] || 0}
                        v21={produitsExploit[1] || 0}
                        v31={produitsExploit[2] || 0}
                        v12={chiffres_affaire_pourcentage[0] + "%"}
                        v22={chiffres_affaire_pourcentage[1] + "%"}
                        v32={chiffres_affaire_pourcentage[2] + "%"}
                    />
                    <TableRow7
                        label={"Ventes + production réelle"}
                        v11={produitsExploit[0] || 0}
                        v21={produitsExploit[1] || 0}
                        v31={produitsExploit[2] || 0}
                        v12={chiffres_affaire_pourcentage[0] + "%"}
                        v22={chiffres_affaire_pourcentage[1] + "%"}
                        v32={chiffres_affaire_pourcentage[2] + "%"}
                    />
                    <TableRow7
                        label={"Achats consommés"}
                        v11={chargeExploit[0]}
                        v21={chargeExploit[1]}
                        v31={chargeExploit[2]}
                        v12={achats_consommes_pourcentage[0] + "%"}
                        v22={achats_consommes_pourcentage[1] + "%"}
                        v32={achats_consommes_pourcentage[2] + "%"}
                    />
                    <TableRow7
                        highlighted
                        label={"Marge globale"}
                        v11={margeBrute[0]}
                        v21={margeBrute[1]}
                        v31={margeBrute[2]}
                        v12={marge_global_pourcentage[0] + "%"}
                        v22={marge_global_pourcentage[1] + "%"}
                        v32={marge_global_pourcentage[2] + "%"}
                    />
                    <TableRow7
                        label={"Charges externes"}
                        v11={totalChargesExternes[0]}
                        v21={totalChargesExternes[1]}
                        v31={totalChargesExternes[2]}
                        v12={charges_externes_pourcentage[0] + "%"}
                        v22={charges_externes_pourcentage[1] + "%"}
                        v32={charges_externes_pourcentage[2] + "%"}
                    />
                    <TableRow7
                        highlighted
                        label={" Valeur ajoutée"}
                        v11={valeurAjoutee[0]}
                        v21={valeurAjoutee[1]}
                        v31={valeurAjoutee[2]}
                        v12={valeur_ajoutee_pourcentage[0] + "%"}
                        v22={valeur_ajoutee_pourcentage[1] + "%"}
                        v32={valeur_ajoutee_pourcentage[2] + "%"}
                    />
                    <TableRow7
                        label={" Impôts et taxes"}
                        v11={impots[0]}
                        v21={impots[1]}
                        v31={impots[2]}
                        v12={impots_taxes_pourcentage[0] + "%"}
                        v22={impots_taxes_pourcentage[1] + "%"}
                        v32={impots_taxes_pourcentage[2] + "%"}
                    />
                    <TableRow7
                        label={"Charges de personnel"}
                        v11={chargesPersonnel[0]}
                        v21={chargesPersonnel[1]}
                        v31={chargesPersonnel[2]}
                        v12={charges_personnel_pourcentage[0] + "%"}
                        v22={charges_personnel_pourcentage[1] + "%"}
                        v32={charges_personnel_pourcentage[2] + "%"}
                    />
                    <TableRow7
                        highlighted
                        label={"Excédent brut d'exploitation"}
                        v11={excedentBrute[0]}
                        v21={excedentBrute[1]}
                        v31={excedentBrute[2]}
                        v12={excedent_brute_pourcentage[0] + "%"}
                        v22={excedent_brute_pourcentage[1] + "%"}
                        v32={excedent_brute_pourcentage[2] + "%"}
                    />
                    <TableRow7
                        label={"Dotation aux amortissements"}
                        v11={totalAmortissement}
                        v21={totalAmortissement}
                        v31={totalAmortissement}
                        v12={dotation_amortissement_pourcentage[0] + "%"}
                        v22={dotation_amortissement_pourcentage[1] + "%"}
                        v32={dotation_amortissement_pourcentage[2] + "%"}
                    />
                    <TableRow7
                        highlighted
                        label={"Résultat d'exploitation"}
                        v11={resultat_exploitation[0]}
                        v21={resultat_exploitation[1]}
                        v31={resultat_exploitation[2]}
                        v12={resultat_exploitation_pourcentage[0] + "%"}
                        v22={resultat_exploitation_pourcentage[1] + "%"}
                        v32={resultat_exploitation_pourcentage[2] + "%"}
                    />
                    <TableRow7
                        label={"Charges financières"}
                        v11={totalChargesBancaire[0]}
                        v21={totalChargesBancaire[1]}
                        v31={totalChargesBancaire[2]}
                        v12={chiffres_financieres_pourcentage[0] + "%"}
                        v22={chiffres_financieres_pourcentage[1] + "%"}
                        v32={chiffres_financieres_pourcentage[2] + "%"}
                    />
                    <TableRow7
                        label={"Résultat financier"}
                        v11={totalChargesBancaire[0] * -1}
                        v21={totalChargesBancaire[1] * -1}
                        v31={totalChargesBancaire[2] * -1}
                        v12={resultat_financier_pourcentage[0] + "%"}
                        v22={resultat_financier_pourcentage[1] + "%"}
                        v32={resultat_financier_pourcentage[2] + "%"}
                    />
                    <TableRow7
                        highlighted
                        label={"Résultat courant"}
                        v11={resultat_avant_impot[0]}
                        v21={resultat_avant_impot[1]}
                        v31={resultat_avant_impot[2]}
                        v12={resultat_courant_pourcentage[0] + "%"}
                        v22={resultat_courant_pourcentage[1] + "%"}
                        v32={resultat_courant_pourcentage[2] + "%"}
                    />
                    <TableRow7
                        highlighted
                        label={"Résultat de l'exercice"}
                        v11={resultat_net[0]}
                        v21={resultat_net[1]}
                        v31={resultat_net[2]}
                        v12={resultat_exercice_pourcentage[0] + "%"}
                        v22={resultat_exercice_pourcentage[1] + "%"}
                        v32={resultat_exercice_pourcentage[2] + "%"}
                    />
                    <TableRow7
                        label={"Capacité d'autofinancement"}
                        v11={capacite_autofinancement[0]}
                        v21={capacite_autofinancement[1]}
                        v31={capacite_autofinancement[2]}
                        v12={capacite_autofinancement_pourcentage[0] + "%"}
                        v22={capacite_autofinancement_pourcentage[1] + "%"}
                        v32={capacite_autofinancement_pourcentage[2] + "%"}
                    />
                </TableBody>
            </Table>
            <A4SectionHeader title={"Capacité d'autofinancement"} />
            <Table sx={{ marginTop: 6, borderBottom: "1px solid black" }}>
                <TableHeader4 />
                <TableRow4
                    label=" Résultat de l'exercice"
                    highlighted
                    v1={resultat_net[0]}
                    v2={resultat_net[1]}
                    v3={resultat_net[2]}
                />
                <TableRow4
                    label=" + Dotation aux amortissements"
                    v1={totalAmortissement}
                    v2={totalAmortissement}
                    v3={totalAmortissement}
                />
                <TableRow4
                    label="Capacité d'autofinancement"
                    highlighted
                    v1={capacite_autofinancement[0]}
                    v2={capacite_autofinancement[1]}
                    v3={capacite_autofinancement[2]}
                />
                <TableRow4
                    label=" - Remboursement des emprunts"
                    v1={totalPrincipaltAnnuel[0]}
                    v2={totalPrincipaltAnnuel[1]}
                    v3={totalPrincipaltAnnuel[2]}
                />
                <TableRow4
                    label="Autofinancement net"
                    highlighted
                    v1={autofinancement_net[0]}
                    v2={autofinancement_net[1]}
                    v3={autofinancement_net[2]}
                />
            </Table>
            <Box sx={{ position: "absolute", bottom: "1.25%", right: "5%" }}>
                5
            </Box>
        </Box>
    );
};

export default PagePdf4;
