import {
    Table,
    TableBody,
    TableCell,
    TableRow,
    Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { analysePret } from "../computationHandlers/chargeFinancieres";
import { chargesSocialsHandler } from "../computationHandlers/chargesSocials";
import { chiffresAffairesHandler } from "../computationHandlers/chiffresAffaires";
import {
    amortissementHandler,
    financementHandler,
    investissmentHandler,
} from "../computationHandlers/Investissement";
import { planFinancement } from "../computationHandlers/planFinancier";
import {
    besoinFondsRoulementHandler,
    rentabiliteEconomiqueHandler,
} from "../computationHandlers/reantabilite";
import { soldesGestionHandler } from "../computationHandlers/soldesintermediaires";
import A4SectionHeader from "./components/A4SectionHeader";
import PageIntro from "./components/PageIntro";
import TableHeader4 from "./components/TableHeader4";
import TableRow4 from "./components/TableRow4";

const PagePdf6 = ({ data }) => {
    const {
        tableDataIncorporelles,
        tableDataCorporelles,
        totalIncorp,
        totalCorp,
        totalBesoin,
        frais_stock,
        tresorie_de_depart,
        immpbilisation,
    } = investissmentHandler(data.besoin_demarage);
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
    const {
        apport_personnel,
        apports_en_nature,
        prets,
        sommePrets,
        sommeApport,
        subventions,
        autre_financement,
        financement_total,
    } = financementHandler(data.financement_demarage);

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
    const {
        immobilisations_3ans,
        frais_stock_3ans,
        sommeApport_3ans,
        emprunt_3ans,
        subventions_3ans,
        autre_financement_3ans,
        variation_besoin_fonds_roulement,
        total_besoin_financement,
        total_resources,
        variation_tresorie,
        excedent_tresorie,
    } = planFinancement(
        immpbilisation,
        frais_stock,
        besoin_fonds_roulement,
        totalPrincipaltAnnuel,
        sommeApport,
        sommePrets,
        subventions,
        autre_financement,
        capacite_autofinancement
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
            <A4SectionHeader title={"Plan de financement à trois ans"} />
            <PageIntro
                nom_projet={data?.nom_projet}
                nom={data?.nom}
                prenom={data?.prenom}
            />
            <Table>
                <TableHeader4 />
                <TableBody>
                    <TableRow4
                        label="   Immobilisations"
                        v1={immobilisations_3ans[0]}
                        v2={immobilisations_3ans[1]}
                        v3={immobilisations_3ans[2]}
                        //   fontWeight="600"
                    />
                    <TableRow4
                        label="   Acquisition des stocks"
                        v1={frais_stock_3ans[0]}
                        v2={frais_stock_3ans[1]}
                        v3={frais_stock_3ans[2]}
                    />
                    <TableRow4
                        label="   Variation du Besoin en fonds de roulement"
                        v1={variation_besoin_fonds_roulement[0]}
                        v2={variation_besoin_fonds_roulement[1]}
                        v3={variation_besoin_fonds_roulement[2]}
                    />
                    <TableRow4
                        label="   Remboursement d'emprunts"
                        v1={totalPrincipaltAnnuel[0]}
                        v2={totalPrincipaltAnnuel[1]}
                        v3={totalPrincipaltAnnuel[2]}
                    />
                    {/* {amortissementIncorporelsArray.map((el) => (
                      <TableRow4
                          label={el.label}
                          v1={el.value}
                          v2={el.value}
                          v3={el.value}
                          // fontWeight="600"
                      />
                  ))} */}
                    {/* </TableBody>
                <TableBody> */}
                    <TableRow4
                        highlighted
                        label=" Total des besoins"
                        v1={total_besoin_financement[0]}
                        v2={total_besoin_financement[1]}
                        v3={total_besoin_financement[2]}
                        fontWeight="600"
                    />
                    <TableRow4
                        label="Apport personnel"
                        v1={sommeApport_3ans[0]}
                        v2={sommeApport_3ans[1]}
                        v3={sommeApport_3ans[2]}
                    />
                    <TableRow4
                        label="Emprunts"
                        v1={emprunt_3ans[0]}
                        v2={emprunt_3ans[1]}
                        v3={emprunt_3ans[2]}
                    />
                    <TableRow4
                        label="Subventions"
                        v1={subventions_3ans[0]}
                        v2={subventions_3ans[1]}
                        v3={subventions_3ans[2]}
                    />
                    <TableRow4
                        label=" Autres financements"
                        v1={autre_financement_3ans[0]}
                        v2={autre_financement_3ans[1]}
                        v3={autre_financement_3ans[2]}
                    />
                    <TableRow4
                        label="Capacité d'auto-financement"
                        v1={capacite_autofinancement[0]}
                        v2={capacite_autofinancement[1]}
                        v3={capacite_autofinancement[2]}
                    />
                    <TableRow4
                        label=" Total des ressources"
                        fontWeight="600"
                        highlighted
                        v1={total_resources[0]}
                        v2={total_resources[1]}
                        v3={total_resources[2]}
                    />
                    <TableRow4
                        label="Variation de trésorerie"
                        v1={variation_tresorie[0]}
                        v2={variation_tresorie[1]}
                        v3={variation_tresorie[2]}
                    />
                    {/* {amortissementCorporelsArray.map((el) => (
                      <TableRow4
                          label={el.label}
                          v1={el.value}
                          v2={el.value}
                          v3={el.value}
                          // fontWeight="600"
                      />
                  ))} */}
                    <TableRow
                        sx={{
                            "& td": {
                                // borderRight: 0,
                                borderBlock: "1px solid black",
                            },
                        }}
                    >
                        <TableCell
                            sx={{
                                width: "50%",
                                paddingInline: 1,
                                paddingBlock: 0,
                                borderLeft: "1px solid black",
                                fontWeight: "600",
                            }}
                        >
                            Excédent de trésorerie
                        </TableCell>
                        <TableCell
                            sx={{
                                paddingBlock: 1,
                                textAlign: "center",
                                width: "15%",
                                paddingInline: 1,
                                borderLeft: "1px dashed black",
                                fontWeight: "600",
                            }}
                        >
                            {excedent_tresorie[0]}
                        </TableCell>
                        <TableCell
                            sx={{
                                paddingBlock: 1,
                                textAlign: "center",
                                width: "15%",
                                paddingInline: 1,
                                borderLeft: "1px dashed black",
                                fontWeight: "600",
                            }}
                        >
                            {excedent_tresorie[1]}
                        </TableCell>
                        <TableCell
                            sx={{
                                paddingBlock: 1,
                                textAlign: "center",
                                width: "15%",
                                paddingInline: 1,
                                borderLeft: "1px dashed black",
                                borderRight: "1px solid black",
                                fontWeight: "600",
                            }}
                        >
                            {excedent_tresorie[2]}
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
            <Typography
                fontWeight={600}
                fontSize={14}
                fontStyle="italic"
                mt={6}
            >
                {" "}
                Rappel trésorerie début année 1 :{" "}
                {data.besoin_demarage.tresorie_de_depart}
            </Typography>
            <Box sx={{ position: "absolute", bottom: "1.25%", right: "5%" }}>
                7
            </Box>
        </Box>
    );
};

export default PagePdf6;
