import {
    Box,
    Table,
    TableBody,
    TableCell,
    TableRow,
    Typography,
} from "@mui/material";
import React from "react";
import { analysePret } from "../computationHandlers/chargeFinancieres";
import { chargesSocialsHandler } from "../computationHandlers/chargesSocials";
import { chiffresAffairesHandler } from "../computationHandlers/chiffresAffaires";
import { amortissementHandler } from "../computationHandlers/Investissement";
import {
    besoinFondsRoulementHandler,
    rentabiliteEconomiqueHandler,
} from "../computationHandlers/reantabilite";
import { soldesGestionHandler } from "../computationHandlers/soldesintermediaires";
import A4SectionHeader from "./components/A4SectionHeader";
import PageIntro from "./components/PageIntro";
import TableHeader4 from "./components/TableHeader4";
import TableRow4 from "./components/TableRow4";

const PagePdf5 = ({ data }) => {
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

        data.charges_fixes.annee3.impôt_taxes,
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
    //
    const {
        taux_magrge_cout,
        couts_fixes,
        total_charges,
        seuil_rentabilite,
        excedent_insuffisence,
        point_mort_chiffres_affaires_jour,
    } = rentabiliteEconomiqueHandler(
        produitsExploit,
        chargeExploit,
        margeBrute,
        totalChargesExternes,
        impots,
        totalAmortissement,
        chargesPersonnel,
        totalChargesBancaire,
        resultat_avant_impot
    );
    const {
        volume_credit_client,
        volume_dettes_fournisseurs,
        besoin_fonds_roulement,
    } = besoinFondsRoulementHandler(
        produitsExploit,
        chargeExploit,
        data.duree_credits_clients,
        data.duree_dettes_fournisseurs
    );
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
                        v1={produitsExploit[0]}
                        v2={produitsExploit[1]}
                        v3={produitsExploit[2]}
                        //   fontWeight="600"
                    />
                    <TableRow4
                        label="Achats consommés"
                        v1={chargeExploit[0]}
                        v2={chargeExploit[1]}
                        v3={chargeExploit[2]}
                        //   fontWeight="600"
                    />
                    <TableRow4
                        label="Total des coûts variables"
                        v1={chargeExploit[0]}
                        v2={chargeExploit[1]}
                        v3={chargeExploit[2]}
                        //   fontWeight="600"
                    />
                    <TableRow4
                        label="Marge sur coûts variables"
                        v1={margeBrute[0]}
                        v2={margeBrute[1]}
                        v3={margeBrute[2]}
                        //   fontWeight="600"
                    />
                    <TableRow4
                        label="Taux de marge sur coûts variables"
                        highlighted
                        fontWeight="600"
                        v1={Number(taux_magrge_cout[0]).toFixed(0)}
                        v2={Number(taux_magrge_cout[1]).toFixed(0)}
                        v3={Number(taux_magrge_cout[2]).toFixed(0)}
                    />
                    <TableRow4
                        label="coûts fixes"
                        v1={couts_fixes[0]}
                        v2={couts_fixes[1]}
                        v3={couts_fixes[2]}
                        //   fontWeight="600"
                    />
                    <TableRow4
                        label=" Total des charges"
                        v1={total_charges[0]}
                        v2={total_charges[1]}
                        v3={total_charges[2]}
                        fontWeight="600"
                        highlighted
                    />
                    <TableRow4
                        label="Résultat courant avant impôts"
                        v1={resultat_avant_impot[0]}
                        v2={resultat_avant_impot[1]}
                        v3={resultat_avant_impot[2]}
                    />
                    <TableRow4
                        label=" Seuil de rentabilité (chiffre d'affaires)"
                        v1={seuil_rentabilite[0]}
                        v2={seuil_rentabilite[1]}
                        v3={seuil_rentabilite[2]}
                        fontWeight="600"
                        highlighted
                    />
                    <TableRow4
                        label="Excédent / insuffisance"
                        v1={excedent_insuffisence[0]}
                        v2={excedent_insuffisence[1]}
                        v3={excedent_insuffisence[2]}
                    />
                    <TableRow4
                        label=" Point mort en chiffre d'affaires par jour ouvré"
                        v1={point_mort_chiffres_affaires_jour[0]}
                        v2={point_mort_chiffres_affaires_jour[1]}
                        v3={point_mort_chiffres_affaires_jour[2]}
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
                        v1={""}
                        v2={""}
                        v3={""}
                    />
                    <TableRow4
                        label="Volume crédit client HT"
                        v1={volume_credit_client[0]}
                        v2={volume_credit_client[1]}
                        v3={volume_credit_client[2]}
                        //   fontWeight="600"
                    />
                    <TableRow4
                        label=" Ressources"
                        v1={""}
                        v2={""}
                        v3={""}
                        highlighted
                        fontWeight="600"
                    />
                    <TableRow4
                        label="Volume dettes fournisseurs HT"
                        v1={volume_dettes_fournisseurs[0]}
                        v2={volume_dettes_fournisseurs[1]}
                        v3={volume_dettes_fournisseurs[2]}
                        //   fontWeight="600"
                    />
                    <TableRow4
                        label=" Besoin en fonds de roulement"
                        highlighted
                        fontWeight="600"
                        v1={besoin_fonds_roulement[0]}
                        v2={besoin_fonds_roulement[1]}
                        v3={besoin_fonds_roulement[2]}
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
