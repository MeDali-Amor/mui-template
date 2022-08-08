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
