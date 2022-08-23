import { Box, Table, TableBody, Typography } from "@mui/material";
import React from "react";
import { budgetPrevisionnelHandler } from "../computationHandlers/budgetPrevisionnelTresorie";
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
import TableHead5 from "./components/TableHead5";
import TableRow5 from "./components/TableRow5";

const PagePdf7 = ({ data }) => {
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

        data.charges_fixes.annee2.impôt_taxes,
    ];

    const {
        charges_employes,
        charges_social_dirig,
        excedentBrute,
        resultat_avant_impot,
        impot_societes,
        chargesPersonnel,
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
    const {
        apoortPresonnel_mois,
        emprunt_mois,
        subventions_mois,
        autreFinancement_mois,
        vente_mois,
        services_mois,
        chiffre_affaire_mois,
        immobilisationIncorp_mois,
        immobilisationCorp_mois,
        totalImmobilisation_mois,
        aquisitionStock_mois,
        echeances_emprunt,
        achatMarchandises_mois,
        chargesExterne_mois,
        impotsTaxes_mois,
        salairesEmployes_mois,
        chargeEmployes_mois,
        prelevementDirig_mois,
        chargesDirig_mois,
        totalCargesPersonnel_mois,
        chargesBancaires_mois,
        totalDecaissement_mois,
        totalEncaissement_mois,
        solde_mois,
        solde_precedent,
        solde_tresorie,
    } = budgetPrevisionnelHandler(
        sommeApport_3ans,
        emprunt_3ans,
        subventions_3ans,
        autre_financement_3ans,
        data.chiffre_affaire_an1.vente,
        data.chiffre_affaire_an1.services,
        totalIncorp,
        totalCorp,
        immobilisations_3ans,
        frais_stock_3ans,
        totalPrincipaltAnnuel,
        data.pourcentage_vente_cout_achat,
        totalChargesExternes,
        impots,
        data.salaires_employes,
        charges_employes,
        data.remuneration_dirigeants,
        charges_social_dirig,
        totalChargesBancaire
    );
    // console.log(totalEncaissement_mois);
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
                    <TableRow5
                        label="Apport personnel"
                        v1={apoortPresonnel_mois[0]}
                        v2={apoortPresonnel_mois[1]}
                        v3={apoortPresonnel_mois[2]}
                        v4={apoortPresonnel_mois[3]}
                        v5={apoortPresonnel_mois[4]}
                    />
                    <TableRow5
                        label="Emprunt"
                        v1={emprunt_mois[0]}
                        v2={emprunt_mois[1]}
                        v3={emprunt_mois[2]}
                        v4={emprunt_mois[3]}
                        v5={emprunt_mois[4]}
                    />
                    <TableRow5
                        label="Subventions"
                        v1={subventions_mois[0]}
                        v2={subventions_mois[1]}
                        v3={subventions_mois[2]}
                        v4={subventions_mois[3]}
                        v5={subventions_mois[4]}
                    />
                    <TableRow5
                        label="Autres financements"
                        v1={autreFinancement_mois[0]}
                        v2={autreFinancement_mois[1]}
                        v3={autreFinancement_mois[2]}
                        v4={autreFinancement_mois[3]}
                        v5={autreFinancement_mois[4]}
                    />
                </TableBody>
                <TableBody sx={{ borderBottom: "1px solid black" }}>
                    <TableRow5
                        label="Vente de marchandises"
                        v1={vente_mois[0]}
                        v2={vente_mois[1]}
                        v3={vente_mois[2]}
                        v4={vente_mois[3]}
                        v5={vente_mois[4]}
                    />
                    <TableRow5
                        label="Vente de services"
                        v1={services_mois[0]}
                        v2={services_mois[1]}
                        v3={services_mois[2]}
                        v4={services_mois[3]}
                        v5={services_mois[4]}
                    />
                    <TableRow5
                        label="Chiffre d'affaires (total)"
                        highlighted
                        fontWeight={600}
                        v1={chiffre_affaire_mois[0]}
                        v2={chiffre_affaire_mois[1]}
                        v3={chiffre_affaire_mois[2]}
                        v4={chiffre_affaire_mois[3]}
                        v5={chiffre_affaire_mois[4]}
                    />
                    <TableRow5
                        label="Immobilisations incorporelles"
                        v1={immobilisationIncorp_mois[0]}
                        v2={immobilisationIncorp_mois[1]}
                        v3={immobilisationIncorp_mois[2]}
                        v4={immobilisationIncorp_mois[3]}
                        v5={immobilisationIncorp_mois[4]}
                    />
                    <TableRow5
                        label="Immobilisations corporelles"
                        v1={immobilisationCorp_mois[0]}
                        v2={immobilisationCorp_mois[1]}
                        v3={immobilisationCorp_mois[2]}
                        v4={immobilisationCorp_mois[3]}
                        v5={immobilisationCorp_mois[4]}
                    />
                    <TableRow5
                        label="Immobilisations (total)"
                        highlighted
                        fontWeight={600}
                        v1={totalImmobilisation_mois[0]}
                        v2={totalImmobilisation_mois[1]}
                        v3={totalImmobilisation_mois[2]}
                        v4={totalImmobilisation_mois[3]}
                        v5={totalImmobilisation_mois[4]}
                    />
                    <TableRow5
                        label="Acquisition stocks"
                        v1={aquisitionStock_mois[0]}
                        v2={aquisitionStock_mois[1]}
                        v3={aquisitionStock_mois[2]}
                        v4={aquisitionStock_mois[3]}
                        v5={aquisitionStock_mois[4]}
                    />
                    <TableRow5
                        label="Échéances emprunt"
                        v1={echeances_emprunt[0]}
                        v2={echeances_emprunt[1]}
                        v3={echeances_emprunt[2]}
                        v4={echeances_emprunt[3]}
                        v5={echeances_emprunt[4]}
                    />
                    <TableRow5
                        label="Achats de marchandises"
                        v1={achatMarchandises_mois[0]}
                        v2={achatMarchandises_mois[1]}
                        v3={achatMarchandises_mois[2]}
                        v4={achatMarchandises_mois[3]}
                        v5={achatMarchandises_mois[4]}
                    />
                    <TableRow5
                        label="Charges externes"
                        v1={chargesExterne_mois[0]}
                        v2={chargesExterne_mois[1]}
                        v3={chargesExterne_mois[2]}
                        v4={chargesExterne_mois[3]}
                        v5={chargesExterne_mois[4]}
                    />
                    <TableRow5
                        label="Impots et taxes"
                        v1={impotsTaxes_mois[0]}
                        v2={impotsTaxes_mois[1]}
                        v3={impotsTaxes_mois[2]}
                        v4={impotsTaxes_mois[3]}
                        v5={impotsTaxes_mois[4]}
                    />
                </TableBody>
                <TableBody sx={{ borderBottom: "1px solid black" }}>
                    <TableRow5
                        label="Salaires employés"
                        v1={salairesEmployes_mois[0]}
                        v2={salairesEmployes_mois[1]}
                        v3={salairesEmployes_mois[2]}
                        v4={salairesEmployes_mois[3]}
                        v5={salairesEmployes_mois[4]}
                    />

                    <TableRow5
                        label="Charges sociales employés"
                        v1={chargeEmployes_mois[0]}
                        v2={chargeEmployes_mois[1]}
                        v3={chargeEmployes_mois[2]}
                        v4={chargeEmployes_mois[3]}
                        v5={chargeEmployes_mois[4]}
                    />
                    {/* <TableRow5
                        label="Achats de marchandises"
                        v1={achatMarchandises_mois[0]}
                        v2={achatMarchandises_mois[1]}
                        v3={achatMarchandises_mois[2]}
                        v4={achatMarchandises_mois[3]}
                        v5={achatMarchandises_mois[4]}
                    /> */}
                    <TableRow5
                        label="Prelévèment dirigeant(s)"
                        v1={prelevementDirig_mois[0]}
                        v2={prelevementDirig_mois[1]}
                        v3={prelevementDirig_mois[2]}
                        v4={prelevementDirig_mois[3]}
                        v5={prelevementDirig_mois[4]}
                    />
                    <TableRow5
                        label="Charges sociales dirigeant(s)"
                        v1={chargesDirig_mois[0]}
                        v2={chargesDirig_mois[1]}
                        v3={chargesDirig_mois[2]}
                        v4={chargesDirig_mois[3]}
                        v5={chargesDirig_mois[4]}
                    />
                    <TableRow5
                        label="Total charges de personnel"
                        highlighted
                        fontWeight={600}
                        v1={totalCargesPersonnel_mois[0]}
                        v2={totalCargesPersonnel_mois[1]}
                        v3={totalCargesPersonnel_mois[2]}
                        v4={totalCargesPersonnel_mois[3]}
                        v5={totalCargesPersonnel_mois[4]}
                    />
                    <TableRow5
                        label="Frais banquaires, charges financières"
                        v1={chargesBancaires_mois[0]}
                        v2={chargesBancaires_mois[1]}
                        v3={chargesBancaires_mois[2]}
                        v4={chargesBancaires_mois[3]}
                        v5={chargesBancaires_mois[4]}
                    />
                    <TableRow5
                        label="Total des décaissements"
                        highlighted
                        fontWeight={600}
                        v1={totalDecaissement_mois[0]}
                        v2={totalDecaissement_mois[1]}
                        v3={totalDecaissement_mois[2]}
                        v4={totalDecaissement_mois[3]}
                        v5={totalDecaissement_mois[4]}
                    />
                    <TableRow5
                        label="Total des encaissements"
                        highlighted
                        fontWeight={600}
                        v1={totalEncaissement_mois[0]}
                        v2={totalEncaissement_mois[1]}
                        v3={totalEncaissement_mois[2]}
                        v4={totalEncaissement_mois[3]}
                        v5={totalEncaissement_mois[4]}
                    />
                    <TableRow5
                        label="Solde précédent"
                        v1={solde_precedent[0]}
                        v2={solde_precedent[1]}
                        v3={solde_precedent[2]}
                        v4={solde_precedent[3]}
                        v5={solde_precedent[4]}
                    />
                    <TableRow5
                        label="Solde du mois"
                        fontWeight={600}
                        v1={solde_mois[0]}
                        v2={solde_mois[1]}
                        v3={solde_mois[2]}
                        v4={solde_mois[3]}
                        v5={solde_mois[4]}
                    />
                    <TableRow5
                        label="Solde de trésorerie (cumul)"
                        highlighted
                        fontWeight={600}
                        v1={solde_tresorie[0]}
                        v2={solde_tresorie[1]}
                        v3={solde_tresorie[2]}
                        v4={solde_tresorie[3]}
                        v5={solde_tresorie[4]}
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
