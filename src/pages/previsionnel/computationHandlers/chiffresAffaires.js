import { arraySumFunction } from "../../utils/math";
import { analysePret } from "./chargeFinancieres";

export const chiffresAffairesHandler = (
    chiffres_affaire,
    pourcentage_vente_cout_achat,
    charges_fixes,
    analysePrets
) => {
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

    const totalVenteAnnuel = [
        chiffres_affaire.total_vente,
        tauxAugmentation(
            chiffres_affaire.total_vente,
            chiffres_affaire.augmentation_vente1
        ),
        tauxAugmentation(
            tauxAugmentation(
                chiffres_affaire.total_vente,
                chiffres_affaire.augmentation_vente1
            ),
            chiffres_affaire.augmentation_vente2
        ),
    ];
    const totalServicesAnnuel = [
        chiffres_affaire.total_service,
        tauxAugmentation(
            chiffres_affaire.total_service,
            chiffres_affaire.augmentation_services1
        ),
        tauxAugmentation(
            tauxAugmentation(
                chiffres_affaire.total_service,
                chiffres_affaire.augmentation_services1
            ),
            chiffres_affaire.augmentation_services2
        ),
    ];
    const chargeExploit = totalVenteAnnuel.map((value) =>
        pourcentage(value, pourcentage_vente_cout_achat)
    );
    const margeBrute = totalVenteAnnuel.map(
        (el, index) =>
            Number(el) +
            Number(totalServicesAnnuel[index]) -
            Number(chargeExploit[index])
    );
    const chargesExternes = [
        {
            label: "Assurances",
            v1: charges_fixes.annee1.assurances,
            v2: charges_fixes.annee2.assurances,
            v3: charges_fixes.annee3.assurances,
        },
        {
            v1: charges_fixes.annee1.telephone_internet,
            v2: charges_fixes.annee2.telephone_internet,
            v3: charges_fixes.annee3.telephone_internet,
            label: "Téléphone, internet",
        },
        {
            v1: charges_fixes.annee1.autres_abonnements,
            v2: charges_fixes.annee2.autres_abonnements,
            v3: charges_fixes.annee3.autres_abonnements,
            label: "Autres abonnements",
        },
        {
            v1: charges_fixes.annee1.carburant_transports,
            v2: charges_fixes.annee2.carburant_transports,
            v3: charges_fixes.annee3.carburant_transports,
            label: "Carburant, transports",
        },
        {
            v1: charges_fixes.annee1.frais_deplacement_hebergement,
            v2: charges_fixes.annee2.frais_deplacement_hebergement,
            v3: charges_fixes.annee3.frais_deplacement_hebergement,
            label: "Frais de déplacement et hébergement",
        },
        {
            v1: charges_fixes.annee1.Eau_electricite_gaz,
            v2: charges_fixes.annee2.Eau_electricite_gaz,
            v3: charges_fixes.annee3.Eau_electricite_gaz,
            label: "Eau, électricité, gaz",
        },
        {
            v1: charges_fixes.annee1.mutuellee,
            v2: charges_fixes.annee2.mutuellee,
            v3: charges_fixes.annee3.mutuellee,
            label: "Mutuelle",
        },
        {
            v1: charges_fixes.annee1.entretien_vehicule,
            v2: charges_fixes.annee2.entretien_vehicule,
            v3: charges_fixes.annee3.entretien_vehicule,
            label: "Entretien du véhicule",
        },
        {
            v1: charges_fixes.annee1.nettoyage_locaux,
            v2: charges_fixes.annee2.nettoyage_locaux,
            v3: charges_fixes.annee3.nettoyage_locaux,
            label: "Nettoyage des locaux",
        },
        {
            v1: charges_fixes.annee1.publicite_communication,
            v2: charges_fixes.annee2.publicite_communication,
            v3: charges_fixes.annee3.publicite_communication,
            label: "Budget publicité et communication",
        },
        {
            v1: charges_fixes.annee1.loyer,
            v2: charges_fixes.annee2.loyer,
            v3: charges_fixes.annee3.loyer,
            label: "Loyer et charges locatives",
        },
        {
            v1: charges_fixes.annee1.comptable_avocats,
            v2: charges_fixes.annee2.comptable_avocats,
            v3: charges_fixes.annee3.comptable_avocats,
            label: "Expert comptable, avocats",
        },
    ];
    const autres_charges_fixes = charges_fixes.autres_charges_fixes;
    const totalChargesExternes = [1, 2, 3].map((n) =>
        arraySumFunction(
            chargesExternes
                .map((el) => Number(el[`v${n}`]))
                .concat(
                    autres_charges_fixes.map((elm) =>
                        Number(elm[`autres_an${n}`])
                    )
                )
                .filter((v) => typeof Number(v) == "number" && !isNaN(v))
        )
    );
    const impots = [
        charges_fixes.annee1.impôt_taxes,
        charges_fixes.annee2.impôt_taxes,
        charges_fixes.annee3.impôt_taxes,
    ];
    const fraisBancaires = [
        charges_fixes.annee1.frais_bancaires,
        charges_fixes.annee2.frais_bancaires,
        charges_fixes.annee3.frais_bancaires,
    ];
    const totalInteretAnnuel = [0, 1, 2].map((el) =>
        arraySumFunction(
            [
                analysePrets[0].intretAnnuel[el],
                analysePrets[1].intretAnnuel[el],
                analysePrets[2].intretAnnuel[el],
            ].filter((v) => typeof Number(v) == "number" && !isNaN(v))
        )
    );
    const totalPrincipaltAnnuel = [0, 1, 2].map((el) =>
        arraySumFunction(
            [
                analysePrets[0].principalAnnuel[el],
                analysePrets[1].principalAnnuel[el],
                analysePrets[2].principalAnnuel[el],
            ].filter((v) => typeof Number(v) == "number" && !isNaN(v))
        )
    );
    const valeurAjoutee = margeBrute.map(
        (el, index) => Number(el) - totalChargesExternes[index]
    );
    const totalChargesBancaire = fraisBancaires.map(
        (el, index) => Number(el) + totalInteretAnnuel[index]
    );
    // totalVenteAn1 +
    // totalServicesAn1 -
    // pourcentage(totalVenteAn1, data.pourcentage_vente_cout_achat);

    // );
    // console.log(totalChargesBancaire, totalInteretAnnuel);
    const produitsExploit = totalVenteAnnuel.map(
        (el, index) => Number(el) + Number(totalServicesAnnuel[index])
    );
    return {
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
        totalPrincipaltAnnuel,
    };
};
