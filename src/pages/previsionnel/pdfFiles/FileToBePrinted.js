import { Box } from "@mui/material";
import React, { useMemo, useState } from "react";
import PagePdf0 from "./PagePdf0";
import PagePdf1 from "./PagePdf1";
import PagePdf2 from "./PagePdf2";
import PagePdf3 from "./PagePdf3";
import PagePdf4 from "./PagePdf4";
import PagePdf5 from "./PagePdf5";
import PagePdf6 from "./PagePdf6";
import PagePdf7 from "./PagePdf7";
import PagePdf8 from "./PagePdf8";

const FileToBePrinted = ({ data }) => {
    const financement_demarage = data.financement_demarage;
    const chiffre_affaire_an1 = data.chiffre_affaire_an1;
    const chiffres_vente = chiffre_affaire_an1.vente;
    const chiffres_services = chiffre_affaire_an1.services;
    function sumFunction(array) {
        return array.reduce(
            (previousValue, currentValue) =>
                Number(previousValue) + Number(currentValue),
            0
        );
    }
    function tauxAugmentation(a, b) {
        if (
            typeof Number(a) == "number" &&
            !isNaN(Number(a)) &&
            typeof Number(b) == "number" &&
            !isNaN(Number(b))
        )
            return (Number(a) / 100) * Number(b) + Number(a);
        return 0;
    }
    function pourcentage(a, b) {
        if (
            typeof Number(a) == "number" &&
            !isNaN(Number(a)) &&
            typeof Number(b) == "number" &&
            !isNaN(Number(b))
        )
            return (Number(a) / 100) * Number(b);
        return 0;
    }
    const totalVenteAn1 = chiffre_affaire_an1.total_vente;
    const totalVenteAn2 = tauxAugmentation(
        totalVenteAn1,
        chiffre_affaire_an1.augmentation_vente1
    );
    const totalVenteAn3 = tauxAugmentation(
        totalVenteAn2,
        chiffre_affaire_an1.augmentation_vente2
    );
    const totalServicesAn1 = chiffre_affaire_an1.total_service;
    const totalServicesAn2 = tauxAugmentation(
        totalServicesAn1,
        chiffre_affaire_an1.augmentation_services1
    );
    const totalServicesAn3 = tauxAugmentation(
        totalServicesAn2,
        chiffre_affaire_an1.augmentation_services2
    );
    const chargesExternes = [
        {
            label: "Assurances",
            v1: data.charges_fixes.annee1.assurances,
            v2: data.charges_fixes.annee2.assurances,
            v3: data.charges_fixes.annee3.assurances,
        },
        {
            v1: data.charges_fixes.annee1.telephone_internet,
            v2: data.charges_fixes.annee2.telephone_internet,
            v3: data.charges_fixes.annee3.telephone_internet,
            label: "Téléphone, internet",
        },
        {
            v1: data.charges_fixes.annee1.autres_abonnements,
            v2: data.charges_fixes.annee2.autres_abonnements,
            v3: data.charges_fixes.annee3.autres_abonnements,
            label: "Autres abonnements",
        },
        {
            v1: data.charges_fixes.annee1.carburant_transports,
            v2: data.charges_fixes.annee2.carburant_transports,
            v3: data.charges_fixes.annee3.carburant_transports,
            label: "Carburant, transports",
        },
        {
            v1: data.charges_fixes.annee1.frais_deplacement_hebergement,
            v2: data.charges_fixes.annee2.frais_deplacement_hebergement,
            v3: data.charges_fixes.annee3.frais_deplacement_hebergement,
            label: "Frais de déplacement et hébergement",
        },
        {
            v1: data.charges_fixes.annee1.Eau_electricite_gaz,
            v2: data.charges_fixes.annee2.Eau_electricite_gaz,
            v3: data.charges_fixes.annee3.Eau_electricite_gaz,
            label: "Eau, électricité, gaz",
        },
        {
            v1: data.charges_fixes.annee1.mutuellee,
            v2: data.charges_fixes.annee2.mutuellee,
            v3: data.charges_fixes.annee3.mutuellee,
            label: "Mutuelle",
        },
        {
            v1: data.charges_fixes.annee1.entretien_vehicule,
            v2: data.charges_fixes.annee2.entretien_vehicule,
            v3: data.charges_fixes.annee3.entretien_vehicule,
            label: "Entretien du véhicule",
        },
        {
            v1: data.charges_fixes.annee1.nettoyage_locaux,
            v2: data.charges_fixes.annee2.nettoyage_locaux,
            v3: data.charges_fixes.annee3.nettoyage_locaux,
            label: "Nettoyage des locaux",
        },
        {
            v1: data.charges_fixes.annee1.publicite_communication,
            v2: data.charges_fixes.annee2.publicite_communication,
            v3: data.charges_fixes.annee3.publicite_communication,
            label: "Budget publicité et communication",
        },
        {
            v1: data.charges_fixes.annee1.loyer,
            v2: data.charges_fixes.annee2.loyer,
            v3: data.charges_fixes.annee3.loyer,
            label: "Loyer et charges locatives",
        },
        {
            v1: data.charges_fixes.annee1.comptable_avocats,
            v2: data.charges_fixes.annee2.comptable_avocats,
            v3: data.charges_fixes.annee3.comptable_avocats,
            label: "Expert comptable, avocats",
        },
    ];
    const valeurMoyenne = (mt, taux, d) => {
        if (
            typeof Number(mt) == "number" &&
            !isNaN(Number(mt)) &&
            typeof Number(taux) == "number" &&
            !isNaN(Number(taux)) &&
            typeof Number(d) == "number" &&
            !isNaN(Number(d))
        )
            return (
                (Number(mt) * (Number(taux) / 100)) / Number(d) +
                Number(mt) / Number(d)
            );
        return 0;
    };
    const autres_charges_fixes = data.charges_fixes.autres_charges_fixes;
    const chargesExterne1 = useMemo(
        () =>
            sumFunction(
                chargesExternes
                    .map((el) => Number(el.v1))
                    .concat(
                        autres_charges_fixes.map((elm) =>
                            Number(elm.autres_an1)
                        )
                    )
                    .filter((v) => typeof Number(v) == "number" && !isNaN(v))
            ),
        [chargesExternes]
    );
    const chargesExterne3 = useMemo(
        () =>
            sumFunction(
                chargesExternes
                    .map((el) => Number(el.v3))
                    .concat(
                        autres_charges_fixes.map((elm) =>
                            Number(elm.autres_an3)
                        )
                    )
                    .filter((v) => typeof Number(v) == "number" && !isNaN(v))
            ),
        [chargesExternes]
    );
    const chargesExterne2 = useMemo(
        () =>
            sumFunction(
                chargesExternes
                    .map((el) => Number(el.v2))
                    .concat(
                        autres_charges_fixes.map((elm) =>
                            Number(elm.autres_an2)
                        )
                    )
                    .filter((v) => typeof Number(v) == "number" && !isNaN(v))
            ),
        [chargesExternes]
    );
    const mensualite1 = valeurMoyenne(
        financement_demarage.pret_1.montant,
        financement_demarage.pret_1.taux,
        financement_demarage.pret_1.duree_en_mois
    );
    const mensualite2 = valeurMoyenne(
        financement_demarage.pret_2.montant,
        financement_demarage.pret_2.taux,
        financement_demarage.pret_2.duree_en_mois
    );
    const mensualite3 = valeurMoyenne(
        financement_demarage.pret_3.montant,
        financement_demarage.pret_3.taux,
        financement_demarage.pret_3.duree_en_mois
    );
    // console.log(mensualite1);
    const totalRemboursement1 =
        mensualite1 * Number(financement_demarage.pret_1.duree_en_mois);
    const totalRemboursement2 =
        mensualite2 * Number(financement_demarage.pret_2.duree_en_mois);
    const totalRemboursement3 =
        mensualite3 * Number(financement_demarage.pret_3.duree_en_mois);
    // console.log(totalRemboursement1);
    const principalMensuel1 =
        Number(financement_demarage.pret_1.montant) /
        Number(financement_demarage.pret_1.duree_en_mois);
    const principalMensuel2 =
        Number(financement_demarage.pret_2.montant) /
        Number(financement_demarage.pret_2.duree_en_mois);
    const principalMensuel3 =
        Number(financement_demarage.pret_3.montant) /
        Number(financement_demarage.pret_3.duree_en_mois);
    // console.log(principalMensuel1);
    const interetMois1 = mensualite1 - principalMensuel1;
    const interetMois2 = mensualite2 - principalMensuel2;
    const interetMois3 = mensualite3 - principalMensuel3;
    // console.log(interetMois1);
    const interetDuree1 =
        Number(interetMois1) *
        Number(financement_demarage.pret_1.duree_en_mois);
    const interetDuree2 =
        Number(interetMois2) *
        Number(financement_demarage.pret_2.duree_en_mois);
    const interetDuree3 =
        Number(interetMois3) *
        Number(financement_demarage.pret_3.duree_en_mois);
    // console.log(interetDuree1);
    const interetAnnuelle = (duree, interetDuree) => {
        return {
            an1:
                Number(duree) > 12
                    ? Number(interetDuree) * 12
                    : Number(interetDuree) * Number(duree),
            an2:
                Number(duree) - 12 > 12
                    ? Number(interetDuree) * 12
                    : Number(interetDuree) * (Number(duree) - 12),
            an3:
                Number(duree) - 24 > 12
                    ? Number(interetDuree) * 12
                    : Number(interetDuree) * (Number(duree) - 24),
        };
    };
    const interetAnnuelPret1 = interetAnnuelle(
        financement_demarage.pret_1.duree_en_mois,
        interetDuree1
    );
    const interetAnnuelPret2 = interetAnnuelle(
        financement_demarage.pret_2.duree_en_mois,
        interetDuree2
    );
    const interetAnnuelPret3 = interetAnnuelle(
        financement_demarage.pret_3.duree_en_mois,
        interetDuree3
    );
    // console.log(interetAnnuelPret1);
    const margeBrute1 =
        totalVenteAn1 +
        totalServicesAn1 -
        pourcentage(totalVenteAn1, data.pourcentage_vente_cout_achat);
    const margeBrute2 =
        totalVenteAn2 +
        totalServicesAn2 -
        pourcentage(totalVenteAn2, data.pourcentage_vente_cout_achat);
    const margeBrute3 =
        totalVenteAn3 +
        totalServicesAn3 -
        pourcentage(totalVenteAn3, data.pourcentage_vente_cout_achat);
    const valerAjoutée1 = margeBrute1 - chargesExterne1;
    const valerAjoutée2 = margeBrute2 - chargesExterne2;
    const valerAjoutée3 = margeBrute3 - chargesExterne3;
    const interetPrets = {
        pret1: {
            mensualite: mensualite1,
            totalRemboursement: totalRemboursement1,
            principalMensuel: principalMensuel1,
            interetMois: interetMois1,
            interetDuree: interetDuree1,
            interetAn1: interetAnnuelPret1.an1,
            interetAn2: interetAnnuelPret1.an2,
            interetAn3: interetAnnuelPret1.an3,
        },
        pret2: {
            mensualite: mensualite2,
            totalRemboursement: totalRemboursement2,
            principalMensuel: principalMensuel2,
            interetMois: interetMois2,
            interetDuree: interetDuree2,
            interetAn1: interetAnnuelPret2.an1,
            interetAn2: interetAnnuelPret2.an2,
            interetAn3: interetAnnuelPret2.an3,
        },
        pret3: {
            mensualite: mensualite3,
            totalRemboursement: totalRemboursement3,
            principalMensuel: principalMensuel3,
            interetMois: interetMois3,
            interetDuree: interetDuree3,
            interetAn1: interetAnnuelPret3.an1,
            interetAn2: interetAnnuelPret3.an2,
            interetAn3: interetAnnuelPret3.an3,
        },
    };
    const charges_bancaires1 = sumFunction(
        [
            data.charges_fixes.annee1.frais_bancaires,
            interetPrets.pret1.interetAn1,
            interetPrets.pret2.interetAn1,
            interetPrets.pret2.interetAn1,
        ]
            .map((el) => Number(el))
            .filter((v) => typeof Number(v) == "number" && !isNaN(v))
    );
    // console.log(
    //     data.charges_fixes.annee1.frais_bancaires,
    //     interetPrets.pret1.interetAn1
    // );
    const charges_bancaires2 = sumFunction(
        [
            data.charges_fixes.annee2.frais_bancaires,
            interetPrets.pret1.interetAn2,
            interetPrets.pret2.interetAn2,
            interetPrets.pret3.interetAn2,
        ]
            .map((el) => Number(el))
            .filter((v) => typeof Number(v) == "number" && !isNaN(v))
    );
    const charges_bancaires3 = sumFunction(
        [
            data.charges_fixes.annee3.frais_bancaires,
            interetPrets.pret1.interetAn3,
            interetPrets.pret2.interetAn3,
            interetPrets.pret3.interetAn3,
        ]
            .map((el) => Number(el))
            .filter((v) => typeof Number(v) == "number" && !isNaN(v))
    );
    const ChargesACCREEURL1 =
        Number(data.remuneration_dirigeants[0]) * 0.45 < 1103
            ? 1103
            : Number(data.remuneration_dirigeants[0]) * 0.45;
    const ChargesACCREEURL2 =
        Number(data.remuneration_dirigeants[1]) * 0.45 < 1103
            ? 1103
            : Number(data.remuneration_dirigeants[1]) * 0.45;
    const ChargesACCREEURL3 =
        Number(data.remuneration_dirigeants[2]) * 0.45 < 1103
            ? 1103
            : Number(data.remuneration_dirigeants[2]) * 0.45;
    const RSI_RI1 =
        valerAjoutée1 -
        (Number(data.charges_fixes.annee1.impôt_taxes) +
            Number(data.salaires_employes[0]) +
            Number(data.salaires_employes[0]) * 0.72 +
            charges_bancaires1 +
            data.besoin_demarage.total / data.duree_amortissement);

    const RSI_RI2 =
        valerAjoutée2 -
        (Number(data.charges_fixes.annee2.impôt_taxes) +
            Number(data.salaires_employes[1]) +
            Number(data.salaires_employes[1]) * 0.72 +
            charges_bancaires2 +
            data.besoin_demarage.total / data.duree_amortissement);
    const RSI_RI3 =
        valerAjoutée3 -
        (Number(data.charges_fixes.annee3.impôt_taxes) +
            Number(data.salaires_employes[2]) +
            Number(data.salaires_employes[2]) * 0.72 +
            charges_bancaires3 +
            data.besoin_demarage.total / data.duree_amortissement);
    const csEIR1SansAccre = RSI_RI1 * 0.3 < 1103 ? 1103 : RSI_RI1;
    const csEIR2SansAccre = RSI_RI2 * 0.3 < 1103 ? 1103 : RSI_RI2;
    const csEIR3SansAccre = RSI_RI3 * 0.3 < 1103 ? 1103 : RSI_RI3;
    const csEIR1AvecAccre = RSI_RI1 * 0.32 < 1103 ? 1103 : RSI_RI1;
    const csEIR2AvecAccre = RSI_RI2 * 0.32 < 1103 ? 1103 : RSI_RI2;
    const csEIR3AvecAccre = RSI_RI3 * 0.32 < 1103 ? 1103 : RSI_RI3;
    const chargesSocialesSansACCRE = {
        annee1: {
            cs_employes: Number(data.salaires_employes[0]) * 0.72,
            cs_micro_entreprise_ventes: (Number(totalVenteAn1) / 100) * 12.8,
            cs_micro_entreprise_services:
                (Number(totalServicesAn1) / 100) * 12.8,
            cs_EIR: csEIR1SansAccre,
            sc_EURL: ChargesACCREEURL1,
            sc_SARL: ChargesACCREEURL1,
            sc_SAS: (Number(data.remuneration_dirigeants[0]) / 100) * 70,
            sc_SASU: (Number(data.remuneration_dirigeants[0]) / 100) * 70,
            total_charges_dirig:
                data.form_juridique === "SAS (IS)"
                    ? (Number(data.remuneration_dirigeants[1]) / 100) * 70
                    : data.form_juridique === "SASU (IS)"
                    ? (Number(data.remuneration_dirigeants[1]) / 100) * 70
                    : data.form_juridique === "EURL (IS)"
                    ? ChargesACCREEURL1
                    : data.form_juridique === "SARL (IS)"
                    ? ChargesACCREEURL1
                    : data.form_juridique ===
                      "Entreprise individuelle au réel (IR)"
                    ? csEIR1SansAccre
                    : data.form_juridique === "Micro-entreprise"
                    ? Number((Number(totalVenteAn1) / 100) * 12.8) +
                      Number((Number(totalServicesAn1) / 100) * 12.8)
                    : 0,
        },
        annee2: {
            cs_employes: Number(data.salaires_employes[1]) * 0.72,
            cs_micro_entreprise_ventes: (Number(totalVenteAn2) / 100) * 12.8,
            cs_micro_entreprise_services:
                (Number(totalServicesAn2) / 100) * 12.8,
            cs_EIR: csEIR2SansAccre,
            sc_EURL: ChargesACCREEURL2,
            sc_SARL: ChargesACCREEURL2,
            sc_SAS: (Number(data.remuneration_dirigeants[1]) / 100) * 70,
            sc_SASU: (Number(data.remuneration_dirigeants[1]) / 100) * 70,
            total_charges_dirig:
                data.form_juridique === "SAS (IS)"
                    ? (Number(data.remuneration_dirigeants[1]) / 100) * 70
                    : data.form_juridique === "SASU (IS)"
                    ? (Number(data.remuneration_dirigeants[1]) / 100) * 70
                    : data.form_juridique === "EURL (IS)"
                    ? ChargesACCREEURL2
                    : data.form_juridique === "SARL (IS)"
                    ? ChargesACCREEURL2
                    : data.form_juridique ===
                      "Entreprise individuelle au réel (IR)"
                    ? csEIR2SansAccre
                    : data.form_juridique === "Micro-entreprise"
                    ? Number((Number(totalVenteAn2) / 100) * 12.8) +
                      Number((Number(totalServicesAn2) / 100) * 12.8)
                    : 0,
        },
        annee3: {
            cs_employes: Number(data.salaires_employes[2]) * 0.72,
            cs_micro_entreprise_ventes: (Number(totalVenteAn3) / 100) * 12.8,
            cs_micro_entreprise_services:
                (Number(totalServicesAn3) / 100) * 12.8,
            cs_EIR: csEIR3SansAccre,
            sc_EURL: ChargesACCREEURL3,
            sc_SARL: ChargesACCREEURL3,
            sc_SAS: (Number(data.remuneration_dirigeants[2]) / 100) * 70,
            sc_SASU: (Number(data.remuneration_dirigeants[2]) / 100) * 70,
            total_charges_dirig:
                data.form_juridique === "SAS (IS)"
                    ? (Number(data.remuneration_dirigeants[1]) / 100) * 70
                    : data.form_juridique === "SASU (IS)"
                    ? (Number(data.remuneration_dirigeants[1]) / 100) * 70
                    : data.form_juridique === "EURL (IS)"
                    ? ChargesACCREEURL3
                    : data.form_juridique === "SARL (IS)"
                    ? ChargesACCREEURL3
                    : data.form_juridique ===
                      "Entreprise individuelle au réel (IR)"
                    ? csEIR3SansAccre
                    : data.form_juridique === "Micro-entreprise"
                    ? Number((Number(totalVenteAn3) / 100) * 12.8) +
                      Number((Number(totalServicesAn3) / 100) * 12.8)
                    : 0,
        },
    };

    const chargesSocialesACCRE = {
        annee1: {
            cs_employes: Number(data.salaires_employes[0]) * 0.72,
            cs_micro_entreprise_ventes: Number(totalVenteAn1) * 0.032,
            cs_micro_entreprise_services: Number(totalServicesAn1) * 0.055,
            cs_EIR: csEIR1AvecAccre,
            sc_EURL: ChargesACCREEURL1,
            sc_SARL: ChargesACCREEURL1,
            sc_SAS: (Number(data.remuneration_dirigeants[0]) / 100) * 33,
            sc_SASU: (Number(data.remuneration_dirigeants[0]) / 100) * 33,
            total_charges_dirig:
                data.form_juridique === "SAS (IS)"
                    ? (Number(data.remuneration_dirigeants[0]) / 100) * 33
                    : data.form_juridique === "SASU (IS)"
                    ? (Number(data.remuneration_dirigeants[0]) / 100) * 33
                    : data.form_juridique === "EURL (IS)"
                    ? ChargesACCREEURL1
                    : data.form_juridique === "SARL (IS)"
                    ? ChargesACCREEURL1
                    : data.form_juridique ===
                      "Entreprise individuelle au réel (IR)"
                    ? csEIR1AvecAccre
                    : data.form_juridique === "Micro-entreprise"
                    ? Number(totalVenteAn1) * 0.032 +
                      Number(totalServicesAn1) * 0.055
                    : 0,
        },
        annee2: {
            cs_employes: Number(data.salaires_employes[1]) * 0.72,
            cs_micro_entreprise_ventes: Number(totalVenteAn2) * 0.064,
            cs_micro_entreprise_services: Number(totalServicesAn2) * 0.11,
            cs_EIR: csEIR2AvecAccre,
            sc_EURL: ChargesACCREEURL2,
            sc_SARL: ChargesACCREEURL2,
            sc_SAS: (Number(data.remuneration_dirigeants[1]) / 100) * 70,
            sc_SASU: (Number(data.remuneration_dirigeants[1]) / 100) * 70,
            total_charges_dirig:
                data.form_juridique === "SAS (IS)"
                    ? (Number(data.remuneration_dirigeants[1]) / 100) * 70
                    : data.form_juridique === "SASU (IS)"
                    ? (Number(data.remuneration_dirigeants[1]) / 100) * 70
                    : data.form_juridique === "EURL (IS)"
                    ? ChargesACCREEURL2
                    : data.form_juridique === "SARL (IS)"
                    ? ChargesACCREEURL2
                    : data.form_juridique ===
                      "Entreprise individuelle au réel (IR)"
                    ? csEIR2AvecAccre
                    : data.form_juridique === "Micro-entreprise"
                    ? Number(totalVenteAn2) * 0.064 +
                      Number(totalServicesAn2) * 0.11
                    : 0,
        },
        annee3: {
            cs_employes: Number(data.salaires_employes[2]) * 0.72,
            cs_micro_entreprise_ventes: Number(totalVenteAn3) * 0.095,
            cs_micro_entreprise_services: Number(totalServicesAn3) * 0.165,
            cs_EIR: csEIR3AvecAccre,
            sc_EURL: ChargesACCREEURL3,
            sc_SARL: ChargesACCREEURL3,
            sc_SAS: (Number(data.remuneration_dirigeants[2]) / 100) * 70,
            sc_SASU: (Number(data.remuneration_dirigeants[2]) / 100) * 70,
            total_charges_dirig:
                data.form_juridique === "SAS (IS)"
                    ? (Number(data.remuneration_dirigeants[2]) / 100) * 70
                    : data.form_juridique === "SASU (IS)"
                    ? (Number(data.remuneration_dirigeants[2]) / 100) * 70
                    : data.form_juridique === "EURL (IS)"
                    ? ChargesACCREEURL3
                    : data.form_juridique === "SARL (IS)"
                    ? ChargesACCREEURL3
                    : data.form_juridique ===
                      "Entreprise individuelle au réel (IR)"
                    ? csEIR3AvecAccre
                    : data.form_juridique === "Micro-entreprise"
                    ? Number(totalVenteAn3) * 0.095 +
                      Number(totalServicesAn3) * 0.165
                    : 0,
        },
    };

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 1,
                marginBlock: 8,
            }}
        >
            <PagePdf0 data={data} />
            <PagePdf1 data={data} />
            <PagePdf2 data={data} />
            <PagePdf3
                data={data}
                totalVente={{
                    a1: totalVenteAn1,
                    a2: totalVenteAn2,
                    a3: totalVenteAn3,
                }}
                totalServices={{
                    a1: totalServicesAn1,
                    a2: totalServicesAn2,
                    a3: totalServicesAn3,
                }}
                chargeExploit={{
                    v1: pourcentage(
                        totalVenteAn1,
                        data.pourcentage_vente_cout_achat
                    ),
                    v2: pourcentage(
                        totalVenteAn2,
                        data.pourcentage_vente_cout_achat
                    ),
                    v3: pourcentage(
                        totalVenteAn3,
                        data.pourcentage_vente_cout_achat
                    ),
                }}
                margeBrute={{
                    v1: margeBrute1,
                    v2: margeBrute2,
                    v3: margeBrute3,
                }}
                chargesExternes={chargesExternes}
                TotalChargesExternes={{
                    v1: chargesExterne1,
                    v2: chargesExterne2,
                    v3: chargesExterne3,
                }}
                valerAjoutées={{
                    v1: valerAjoutée1,
                    v2: valerAjoutée2,
                    v3: valerAjoutée3,
                }}
                impots={{
                    v1: data.charges_fixes.annee1.impôt_taxes,
                    v2: data.charges_fixes.annee2.impôt_taxes,
                    v3: data.charges_fixes.annee3.impôt_taxes,
                }}
                autres_charges_fixes={autres_charges_fixes}
                // setproduitExploitation={setproduitExploitation}
                // setchargesExploitation={setchargesExploitation}
                // setchargesExternes={setchargesExternes}
                chargesSociales={
                    data.dir_ACCRE === "Oui"
                        ? chargesSocialesACCRE
                        : chargesSocialesSansACCRE
                }
                interetPrets={interetPrets}
                charges_bancaires={{
                    charges_bancaires1,
                    charges_bancaires2,
                    charges_bancaires3,
                }}
            />
            <PagePdf4
                data={data}
                totalVente={{
                    a1: totalVenteAn1,
                    a2: totalVenteAn2,
                    a3: totalVenteAn1,
                }}
                totalServices={{
                    a1: totalServicesAn1,
                    a2: totalServicesAn2,
                    a3: totalServicesAn3,
                }}
                chargeExploit={{
                    v1: pourcentage(
                        totalVenteAn1,
                        data.pourcentage_vente_cout_achat
                    ),
                    v2: pourcentage(
                        totalVenteAn2,
                        data.pourcentage_vente_cout_achat
                    ),
                    v3: pourcentage(
                        totalVenteAn3,
                        data.pourcentage_vente_cout_achat
                    ),
                }}
                TotalChargesExternes={{
                    v1: chargesExterne1,
                    v2: chargesExterne2,
                    v3: chargesExterne3,
                }}
                impots={{
                    v1: data.charges_fixes.annee1.impôt_taxes,
                    v2: data.charges_fixes.annee2.impôt_taxes,
                    v3: data.charges_fixes.annee3.impôt_taxes,
                }}
            />
            <PagePdf5 data={data} />
            <PagePdf6 data={data} />
            <PagePdf7 data={data} />
            <PagePdf8 data={data} />
        </Box>
    );
};

export default FileToBePrinted;
