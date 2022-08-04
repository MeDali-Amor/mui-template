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
import React, { useMemo } from "react";
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
                        v1={totalVenteAn1 + totalServicesAn1 || 0}
                        v2={totalVenteAn2 + totalServicesAn2 || 0}
                        v3={totalVenteAn3 + totalServicesAn3 || 0}
                        fontWeight="600"
                    />
                    <TableRow4
                        label="Chiffre d'affaires HT vente de marchandises"
                        v1={totalServicesAn1 || 0}
                        v2={totalServicesAn2 || 0}
                        v3={totalServicesAn3 || 0}
                        // fontWeight=""
                    />
                    <TableRow4
                        label="Chiffre d'affaires HT services"
                        v1={totalVenteAn1 || 0}
                        v2={totalVenteAn2 || 0}
                        v3={totalVenteAn3 || 0}
                        // fontWeight=""
                    />
                    <TableRow4
                        label=" Charges d'exploitation"
                        v1={pourcentage(
                            totalVenteAn1,
                            data.pourcentage_vente_cout_achat
                        )}
                        v2={pourcentage(
                            totalVenteAn2,
                            data.pourcentage_vente_cout_achat
                        )}
                        v3={pourcentage(
                            totalVenteAn3,
                            data.pourcentage_vente_cout_achat
                        )}
                        fontWeight="600"
                    />
                    <TableRow4
                        label="Achats consommés"
                        v1={pourcentage(
                            totalVenteAn1,
                            data.pourcentage_vente_cout_achat
                        )}
                        v2={pourcentage(
                            totalVenteAn2,
                            data.pourcentage_vente_cout_achat
                        )}
                        v3={pourcentage(
                            totalVenteAn3,
                            data.pourcentage_vente_cout_achat
                        )}
                        // fontWeight="600"
                    />
                    <TableRow4
                        highlighted
                        label="Marge brute"
                        v1={margeBrute1}
                        v2={margeBrute2}
                        v3={margeBrute3}
                        fontWeight={"600"}
                    />
                    <TableRow4
                        fontWeight={"600"}
                        label="Charges externes"
                        v1={valerAjoutée1}
                        v2={valerAjoutée2}
                        v3={valerAjoutée3}
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
                        v1={chargesExterne1}
                        v2={chargesExterne2}
                        v3={chargesExterne3}
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
