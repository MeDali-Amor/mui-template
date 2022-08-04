import {
    Box,
    Stack,
    Typography,
    Grid,
    TableContainer,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
} from "@mui/material";
import React, { useEffect, useMemo, useState } from "react";

const PagePdf1 = ({ data }) => {
    const [immobilisationsIncorporelles, setimmobilisationsIncorporelles] =
        useState(0);
    const [immobilisationsCorporelles, setimmobilisationsCorporelles] =
        useState(0);
    const [apportPersonnel, setApportPersonnel] = useState(0);
    const [emprunt, setEmprunt] = useState(0);
    function sumFunction(array) {
        return array.reduce(
            (previousValue, currentValue) =>
                Number(previousValue) + Number(currentValue),
            0
        );
    }

    useEffect(() => {
        if (data) {
            const besoin_demarage = data.besoin_demarage;
            const financement_demarage = data.financement_demarage;
            const immobilisationsIncorpArray = [
                besoin_demarage.frais_etablissement,
                besoin_demarage.frais_compteurs,
                besoin_demarage.frais_logiciels,
                besoin_demarage.frais_marque,
                besoin_demarage.frais_droit_entree,
                besoin_demarage.achat_fonds_de_commerce,
                besoin_demarage.droit_au_bail,
                besoin_demarage.depot_garantie,
                besoin_demarage.frais_dossier,
                besoin_demarage.frais_avocat,
            ].filter((v) => typeof Number(v) == "number" && !isNaN(v));
            const immobilisationsCorpArray = [
                besoin_demarage.frais_communication,
                besoin_demarage.achat_immobilier,
                besoin_demarage.frais_travaux,
                besoin_demarage.frais_materiel,
                besoin_demarage.frais_materiel_bureau,
            ].filter((v) => typeof Number(v) == "number" && !isNaN(v));
            const empruntArray = [
                financement_demarage.pret_1.montant,
                financement_demarage.pret_2.montant,
                financement_demarage.pret_3.montant,
            ].filter((v) => typeof Number(v) == "number" && !isNaN(v));
            const apportArray = [
                financement_demarage.apport_personnel,
                financement_demarage.apports_en_nature,
            ].filter((v) => typeof Number(v) == "number" && !isNaN(v));
            // .filter((v) => typeof Number(v) == "number" && v !== "NaN");

            const sommeIncorp = sumFunction(immobilisationsIncorpArray);
            setimmobilisationsIncorporelles(sommeIncorp);
            const sommeCorp = sumFunction(immobilisationsCorpArray);
            setimmobilisationsCorporelles(sommeCorp);
            const sommePrets = sumFunction(empruntArray);
            setEmprunt(sommePrets);
            const sommeApport = sumFunction(apportArray);
            setApportPersonnel(sommeApport);
        }
    }, [data]);
    const tableDataIncorporelles = [
        {
            value: data.besoin_demarage.frais_etablissement,
            label: "Frais d’établissement ",
        },
        {
            value: data.besoin_demarage.frais_compteurs,
            label: "Frais d’ouverture de compteurs",
        },
        {
            value: data.besoin_demarage.frais_logiciels,
            label: "Logiciels, formations",
        },
        {
            value: data.besoin_demarage.frais_marque,
            label: "Dépôt marque, brevet, modèle",
        },
        {
            value: data.besoin_demarage.frais_droit_entree,
            label: "Droits d’entrée",
        },
        {
            value: data.besoin_demarage.achat_fonds_de_commerce,
            label: "Achat fonds de commerce ou parts",
        },
        {
            value: data.besoin_demarage.droit_au_bail,
            label: "Droit au bail",
        },
        {
            value: data.besoin_demarage.depot_garantie,
            label: "Caution ou dépôt de garantie",
        },
        {
            value: data.besoin_demarage.frais_dossier,
            label: "Frais de dossier",
        },
        {
            value: data.besoin_demarage.frais_avocat,
            label: "Frais de notaire ou d’avocat",
        },
    ];
    const tableDataCorporelles = [
        {
            value: data.besoin_demarage.frais_communication,
            label: "Enseigne et éléments de communication",
        },
        {
            value: data.besoin_demarage.achat_immobilier,
            label: "Achat immobilier",
        },
        {
            value: data.besoin_demarage.frais_travaux,
            label: "Travaux et aménagements",
        },
        {
            value: data.besoin_demarage.frais_materiel,
            label: "Matériel",
        },
        {
            value: data.besoin_demarage.frais_materiel_bureau,
            label: "Matériel de bureau",
        },
    ];

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
            <Box
                sx={{
                    width: "100%",
                    height: "8%",
                    border: "3px solid black",
                    padding: 2,
                }}
            >
                <Typography
                    sx={{
                        marginBlock: 1,
                        textAlign: "center",
                        fontSize: 24,
                        fontWeight: "700",
                        height: "5%",
                    }}
                >
                    Investissements et financements
                </Typography>
            </Box>
            <Box
                sx={{
                    width: "100%",
                    height: "8%",
                    // border: "3px solid black",
                    padding: 2,
                }}
            >
                <Stack
                    direction={"row"}
                    sx={{
                        width: "100%",
                        height: "50%",
                    }}
                >
                    <Typography
                        sx={{
                            width: "25%",
                            fontSize: 14,
                            fontWeight: "600",
                        }}
                    >
                        Projet :
                    </Typography>
                    <Typography
                        sx={{
                            fontSize: 14,
                            fontWeight: "400",
                            fontStyle: "italic",
                        }}
                    >
                        {data?.nom_projet}
                    </Typography>
                </Stack>

                <Stack
                    direction={"row"}
                    sx={{
                        width: "100%",

                        height: "50%",
                    }}
                >
                    <Typography
                        sx={{
                            width: "25%",
                            fontSize: 14,
                            fontWeight: "600",
                        }}
                    >
                        Porteur de projet :
                    </Typography>
                    <Typography
                        sx={{
                            fontSize: 14,
                            fontWeight: "400",
                            fontStyle: "italic",
                        }}
                    >
                        {data?.prenom || ""} {data?.nom || ""}
                    </Typography>
                </Stack>
            </Box>
            <Box
                sx={{
                    width: "100%",
                    // height: "84%",
                    border: "1px solid black",
                    // padding: 2,
                }}
            >
                {/* <TableContainer> */}
                <Table>
                    <TableHead
                        sx={{
                            backgroundColor: "lightgray",
                        }}
                    >
                        <TableRow>
                            <TableCell
                                sx={{
                                    width: "85%",
                                    paddingInline: 1,
                                    paddingBlock: 0,
                                    borderBottom: "1px solid black",
                                }}
                            >
                                INVESTISSEMENTS
                            </TableCell>
                            <TableCell
                                sx={{
                                    textAlign: "center",
                                    width: "15%",
                                    paddingInline: 1,
                                    paddingBlock: 0,
                                    borderLeft: "1px solid black",
                                    borderBottom: "1px solid black",
                                }}
                            >
                                Montant € hors taxes
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow
                            sx={{
                                "& td": {
                                    borderRight: 0,
                                    borderBlock: 0,
                                },
                            }}
                        >
                            <TableCell
                                sx={{
                                    width: "85%",
                                    paddingInline: 1,
                                    paddingBlock: 0,
                                    borderBottom: "1px solid black",
                                    fontWeight: "600",
                                }}
                            ></TableCell>
                            <TableCell
                                sx={{
                                    paddingBlock: 1,
                                    textAlign: "center",
                                    width: "15%",
                                    paddingInline: 1,
                                    borderLeft: "1px solid black",
                                }}
                            ></TableCell>
                        </TableRow>
                        <TableRow
                            sx={{
                                "& td": {
                                    borderRight: 0,
                                    borderBlock: 0,
                                },
                            }}
                        >
                            <TableCell
                                sx={{
                                    width: "85%",
                                    paddingInline: 1,
                                    paddingBlock: 0,
                                    borderBottom: "1px solid black",
                                    fontWeight: "600",
                                }}
                            >
                                Immobilisations incorporelles
                            </TableCell>
                            <TableCell
                                sx={{
                                    textAlign: "center",
                                    width: "15%",
                                    paddingInline: 1,
                                    paddingBlock: 0,
                                    borderLeft: "1px solid black",
                                    fontWeight: "600",
                                }}
                            >
                                {immobilisationsIncorporelles || 0}
                            </TableCell>
                        </TableRow>
                        {tableDataIncorporelles.map((el) => (
                            <TableRow
                                sx={{
                                    "& td": {
                                        borderRight: 0,
                                        borderBlock: 0,
                                    },
                                }}
                            >
                                <TableCell
                                    sx={{
                                        width: "85%",
                                        paddingInline: 1,
                                        paddingBlock: 0,
                                        // borderBottom: "1px solid black",
                                    }}
                                >
                                    {el.label}
                                </TableCell>
                                <TableCell
                                    sx={{
                                        textAlign: "center",
                                        width: "15%",
                                        paddingInline: 1,
                                        paddingBlock: 0,
                                        borderLeft: "1px solid black",
                                        // borderBottom: "1px solid black",
                                    }}
                                >
                                    {el.value}
                                </TableCell>
                            </TableRow>
                        ))}
                        <TableRow
                            sx={{
                                "& td": {
                                    borderRight: 0,
                                    borderBlock: 0,
                                },
                            }}
                        >
                            <TableCell
                                sx={{
                                    width: "85%",
                                    paddingInline: 1,
                                    paddingBlock: 0,
                                    borderBottom: "1px solid black",
                                    fontWeight: "600",
                                }}
                            >
                                Immobilisations corporelles
                            </TableCell>
                            <TableCell
                                sx={{
                                    textAlign: "center",
                                    width: "15%",
                                    paddingInline: 1,
                                    paddingBlock: 0,
                                    borderLeft: "1px solid black",
                                    fontWeight: "600",
                                }}
                            >
                                {immobilisationsCorporelles || 0}
                            </TableCell>
                        </TableRow>
                        {tableDataCorporelles.map((el) => (
                            <TableRow
                                sx={{
                                    "& td": {
                                        borderRight: 0,
                                        borderBlock: 0,
                                    },
                                }}
                            >
                                <TableCell
                                    sx={{
                                        width: "85%",
                                        paddingInline: 1,
                                        paddingBlock: 0,
                                        // borderBottom: "1px solid black",
                                    }}
                                >
                                    {el.label}
                                </TableCell>
                                <TableCell
                                    sx={{
                                        textAlign: "center",
                                        width: "15%",
                                        paddingInline: 1,
                                        paddingBlock: 0,
                                        borderLeft: "1px solid black",
                                        // borderBottom: "1px solid black",
                                    }}
                                >
                                    {el.value}
                                </TableCell>
                            </TableRow>
                        ))}
                        <TableRow
                            sx={{
                                "& td": {
                                    borderRight: 0,
                                    borderBlock: 0,
                                },
                            }}
                        >
                            <TableCell
                                sx={{
                                    width: "85%",
                                    paddingInline: 1,
                                    paddingBlock: 0,
                                    borderBottom: "1px solid black",
                                    fontWeight: "600",
                                }}
                            ></TableCell>
                            <TableCell
                                sx={{
                                    paddingBlock: 1,
                                    textAlign: "center",
                                    width: "15%",
                                    paddingInline: 1,
                                    borderLeft: "1px solid black",
                                }}
                            ></TableCell>
                        </TableRow>
                        <TableRow
                            sx={{
                                "& td": {
                                    borderRight: 0,
                                    borderBlock: 0,
                                },
                            }}
                        >
                            <TableCell
                                sx={{
                                    width: "85%",
                                    paddingInline: 1,
                                    paddingBlock: 0,
                                    borderBottom: "1px solid black",
                                    fontWeight: "600",
                                }}
                            >
                                Stock de matières et produits
                            </TableCell>
                            <TableCell
                                sx={{
                                    textAlign: "center",
                                    width: "15%",
                                    paddingInline: 1,
                                    paddingBlock: 0,
                                    borderLeft: "1px solid black",
                                    fontWeight: "600",
                                }}
                            >
                                {data.besoin_demarage.frais_stock || ""}
                            </TableCell>
                        </TableRow>
                        <TableRow
                            sx={{
                                "& td": {
                                    borderRight: 0,
                                    borderBlock: 0,
                                },
                            }}
                        >
                            <TableCell
                                sx={{
                                    width: "85%",
                                    paddingInline: 1,
                                    paddingBlock: 0,
                                    borderBottom: "1px solid black",
                                    fontWeight: "600",
                                }}
                            >
                                Trésorerie de départ
                            </TableCell>
                            <TableCell
                                sx={{
                                    textAlign: "center",
                                    width: "15%",
                                    paddingInline: 1,
                                    paddingBlock: 0,
                                    borderLeft: "1px solid black",
                                    fontWeight: "600",
                                }}
                            >
                                {data.besoin_demarage.tresorie_de_depart || ""}
                            </TableCell>
                        </TableRow>
                        <TableRow
                            sx={{
                                "& td": {
                                    borderRight: 0,
                                    borderBlock: 0,
                                },
                            }}
                        >
                            <TableCell
                                sx={{
                                    textAlign: "right",
                                    width: "85%",
                                    paddingInline: 1,
                                    paddingBlock: 0,
                                    borderBottom: "1px solid black",
                                    fontWeight: "600",
                                }}
                            >
                                TOTAL BESOINS
                            </TableCell>
                            <TableCell
                                sx={{
                                    textAlign: "center",
                                    width: "15%",
                                    paddingInline: 1,
                                    paddingBlock: 0,
                                    borderLeft: "1px solid black",
                                    fontWeight: "600",
                                }}
                            >
                                {data.besoin_demarage.total || ""}
                            </TableCell>
                        </TableRow>
                        <TableRow
                            sx={{
                                "& td": {
                                    borderRight: 0,
                                    borderBlock: 0,
                                },
                            }}
                        >
                            <TableCell
                                sx={{
                                    width: "85%",
                                    paddingInline: 1,
                                    paddingBlock: 0,
                                    borderBottom: "1px solid black",
                                    fontWeight: "600",
                                }}
                            ></TableCell>
                            <TableCell
                                sx={{
                                    paddingBlock: 1,
                                    textAlign: "center",
                                    width: "15%",
                                    paddingInline: 1,
                                    borderLeft: "1px solid black",
                                }}
                            ></TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
                <Table>
                    <TableHead
                        sx={{
                            backgroundColor: "lightgray",
                        }}
                    >
                        <TableRow>
                            <TableCell
                                sx={{
                                    width: "85%",
                                    paddingInline: 1,
                                    paddingBlock: 0,
                                    borderBottom: "1px solid black",
                                    borderTop: "1px solid black",
                                }}
                            >
                                FINANCEMENT DES INVESTISSEMENTS
                            </TableCell>
                            <TableCell
                                sx={{
                                    textAlign: "center",
                                    width: "15%",
                                    paddingInline: 1,
                                    paddingBlock: 0,
                                    borderLeft: "1px solid black",
                                    borderBottom: "1px solid black",
                                    borderTop: "1px solid black",
                                }}
                            >
                                Montant € hors taxes
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow
                            sx={{
                                "& td": {
                                    borderRight: 0,
                                    borderBlock: 0,
                                },
                            }}
                        >
                            <TableCell
                                sx={{
                                    width: "85%",
                                    paddingInline: 1,
                                    paddingBlock: 0,
                                    borderBottom: "1px solid black",
                                    fontWeight: "600",
                                }}
                            ></TableCell>
                            <TableCell
                                sx={{
                                    paddingBlock: 1,
                                    textAlign: "center",
                                    width: "15%",
                                    paddingInline: 1,
                                    borderLeft: "1px solid black",
                                }}
                            ></TableCell>
                        </TableRow>
                        <TableRow
                            sx={{
                                "& td": {
                                    borderRight: 0,
                                    borderBlock: 0,
                                },
                            }}
                        >
                            <TableCell
                                sx={{
                                    width: "85%",
                                    paddingInline: 1,
                                    paddingBlock: 0,
                                    borderBottom: "1px solid black",
                                    fontWeight: "600",
                                }}
                            >
                                Apport personnel
                            </TableCell>
                            <TableCell
                                sx={{
                                    textAlign: "center",
                                    width: "15%",
                                    paddingInline: 1,
                                    paddingBlock: 0,
                                    borderLeft: "1px solid black",
                                    fontWeight: "600",
                                }}
                            >
                                {apportPersonnel || ""}
                            </TableCell>
                        </TableRow>
                        <TableRow
                            sx={{
                                "& td": {
                                    borderRight: 0,
                                    borderBlock: 0,
                                },
                            }}
                        >
                            <TableCell
                                sx={{
                                    width: "85%",
                                    paddingInline: 1,
                                    paddingBlock: 0,
                                    // borderBottom: "1px solid black",
                                }}
                            >
                                Apport personnel ou familial
                            </TableCell>
                            <TableCell
                                sx={{
                                    textAlign: "center",
                                    width: "15%",
                                    paddingInline: 1,
                                    paddingBlock: 0,
                                    borderLeft: "1px solid black",
                                    // borderBottom: "1px solid black",
                                }}
                            >
                                {data.financement_demarage.apport_personnel ||
                                    ""}
                            </TableCell>
                        </TableRow>
                        <TableRow
                            sx={{
                                "& td": {
                                    borderRight: 0,
                                    borderBlock: 0,
                                },
                            }}
                        >
                            <TableCell
                                sx={{
                                    width: "85%",
                                    paddingInline: 1,
                                    paddingBlock: 0,
                                    // borderBottom: "1px solid black",
                                }}
                            >
                                Apports en nature (en valeur)
                            </TableCell>
                            <TableCell
                                sx={{
                                    textAlign: "center",
                                    width: "15%",
                                    paddingInline: 1,
                                    paddingBlock: 0,
                                    borderLeft: "1px solid black",
                                    // borderBottom: "1px solid black",
                                }}
                            >
                                {data.financement_demarage.apports_en_nature ||
                                    ""}
                            </TableCell>
                        </TableRow>
                        <TableRow
                            sx={{
                                "& td": {
                                    borderRight: 0,
                                    borderBlock: 0,
                                },
                            }}
                        >
                            <TableCell
                                sx={{
                                    width: "85%",
                                    paddingInline: 1,
                                    paddingBlock: 0,
                                    display: "flex",
                                    // borderBottom: "1px solid black",
                                    // fontWeight: "600",
                                }}
                            >
                                <Typography
                                    fontWeight="600"
                                    fontSize={14}
                                    width={"60%"}
                                >
                                    Emprunt
                                </Typography>
                                <Typography
                                    fontWeight="300"
                                    fontSize={13}
                                    fontStyle="italic"
                                    width={"20%"}
                                >
                                    taux
                                </Typography>
                                <Typography
                                    fontWeight="300"
                                    fontSize={13}
                                    fontStyle="italic"
                                    width={"20%"}
                                >
                                    durée en mois
                                </Typography>
                            </TableCell>
                            <TableCell
                                sx={{
                                    textAlign: "center",
                                    width: "15%",
                                    paddingInline: 1,
                                    paddingBlock: 0,
                                    borderLeft: "1px solid black",
                                    fontWeight: "600",
                                }}
                            >
                                {emprunt || ""}{" "}
                            </TableCell>
                        </TableRow>
                        <TableRow
                            sx={{
                                "& td": {
                                    borderRight: 0,
                                    borderBlock: 0,
                                },
                            }}
                        >
                            <TableCell
                                sx={{
                                    width: "85%",
                                    paddingInline: 1,
                                    display: "flex",
                                    paddingBlock: 0,
                                    // borderBottom: "1px solid black",
                                }}
                            >
                                {" "}
                                <Typography
                                    fontWeight="600"
                                    fontSize={14}
                                    width={"60%"}
                                >
                                    {`Prêt n°1 (${data.financement_demarage.pret_1.nom_banque})` ||
                                        "Prêt n°1 (nom de la banque)"}
                                </Typography>
                                <Typography
                                    fontWeight="400"
                                    fontSize={14}
                                    fontStyle="italic"
                                    width={"20%"}
                                >
                                    {data?.financement_demarage?.pret_1?.taux ||
                                        ""}
                                </Typography>
                                <Typography
                                    fontWeight="400"
                                    fontSize={14}
                                    fontStyle="italic"
                                    width={"20%"}
                                >
                                    {data?.financement_demarage?.pret_1
                                        ?.duree_en_mois || ""}
                                </Typography>
                            </TableCell>
                            <TableCell
                                sx={{
                                    textAlign: "center",
                                    width: "15%",
                                    paddingInline: 1,
                                    paddingBlock: 0,
                                    borderLeft: "1px solid black",
                                    // borderBottom: "1px solid black",
                                }}
                            >
                                {data.financement_demarage.pret_1.montant || ""}
                            </TableCell>
                        </TableRow>
                        <TableRow
                            sx={{
                                "& td": {
                                    borderRight: 0,
                                    borderBlock: 0,
                                },
                            }}
                        >
                            <TableCell
                                sx={{
                                    width: "85%",
                                    paddingInline: 1,
                                    display: "flex",
                                    paddingBlock: 0,
                                    // borderBottom: "1px solid black",
                                }}
                            >
                                {" "}
                                <Typography
                                    fontWeight="600"
                                    fontSize={14}
                                    width={"60%"}
                                >
                                    {`Prêt n°2 (${data.financement_demarage.pret_2.nom_banque})` ||
                                        "Prêt n°2 (nom de la banque)"}
                                </Typography>
                                <Typography
                                    fontWeight="400"
                                    fontSize={14}
                                    fontStyle="italic"
                                    width={"20%"}
                                >
                                    {data?.financement_demarage?.pret_2?.taux ||
                                        ""}
                                </Typography>
                                <Typography
                                    fontWeight="400"
                                    fontSize={14}
                                    fontStyle="italic"
                                    width={"20%"}
                                >
                                    {data?.financement_demarage?.pret_2
                                        ?.duree_en_mois || ""}
                                </Typography>
                            </TableCell>
                            <TableCell
                                sx={{
                                    textAlign: "center",
                                    width: "15%",
                                    paddingInline: 1,
                                    paddingBlock: 0,
                                    borderLeft: "1px solid black",
                                    // borderBottom: "1px solid black",
                                }}
                            >
                                {data.financement_demarage.pret_2.montant || ""}
                            </TableCell>
                        </TableRow>
                        <TableRow
                            sx={{
                                "& td": {
                                    borderRight: 0,
                                    borderBlock: 0,
                                },
                            }}
                        >
                            <TableCell
                                sx={{
                                    width: "85%",
                                    paddingInline: 1,
                                    display: "flex",
                                    paddingBlock: 0,
                                    // borderBottom: "1px solid black",
                                }}
                            >
                                {" "}
                                <Typography
                                    fontWeight="600"
                                    fontSize={14}
                                    width={"60%"}
                                >
                                    {`Prêt n°3 (${data.financement_demarage.pret_3.nom_banque})` ||
                                        "Prêt n°3 (nom de la banque)"}
                                </Typography>
                                <Typography
                                    fontWeight="400"
                                    fontSize={14}
                                    fontStyle="italic"
                                    width={"20%"}
                                >
                                    {data?.financement_demarage?.pret_3?.taux ||
                                        ""}
                                </Typography>
                                <Typography
                                    fontWeight="400"
                                    fontSize={14}
                                    fontStyle="italic"
                                    width={"20%"}
                                >
                                    {data?.financement_demarage?.pret_3
                                        ?.duree_en_mois || ""}
                                </Typography>
                            </TableCell>
                            <TableCell
                                sx={{
                                    textAlign: "center",
                                    width: "15%",
                                    paddingInline: 1,
                                    paddingBlock: 0,
                                    borderLeft: "1px solid black",
                                    // borderBottom: "1px solid black",
                                }}
                            >
                                {data.financement_demarage.pret_3.montant || ""}
                            </TableCell>
                        </TableRow>
                        <TableRow
                            sx={{
                                "& td": {
                                    borderRight: 0,
                                    borderBlock: 0,
                                },
                            }}
                        >
                            <TableCell
                                sx={{
                                    width: "85%",
                                    paddingInline: 1,
                                    paddingBlock: 0,
                                    borderBottom: "1px solid black",
                                    fontWeight: "600",
                                }}
                            >
                                {`Subvention n°1 (${data.financement_demarage.subvention_1.label})` ||
                                    "Subvention n°1 (libellé)"}
                            </TableCell>
                            <TableCell
                                sx={{
                                    textAlign: "center",
                                    width: "15%",
                                    paddingInline: 1,
                                    paddingBlock: 0,
                                    borderLeft: "1px solid black",
                                    fontWeight: "600",
                                }}
                            >
                                {data.financement_demarage.subvention_1
                                    .montant || ""}
                            </TableCell>
                        </TableRow>
                        <TableRow
                            sx={{
                                "& td": {
                                    borderRight: 0,
                                    borderBlock: 0,
                                },
                            }}
                        >
                            <TableCell
                                sx={{
                                    width: "85%",
                                    paddingInline: 1,
                                    paddingBlock: 0,
                                    borderBottom: "1px solid black",
                                    fontWeight: "600",
                                }}
                            >
                                {`Subvention n°2 (${data.financement_demarage.subvention_2.label})` ||
                                    "Subvention n°2 (libellé)"}
                            </TableCell>
                            <TableCell
                                sx={{
                                    textAlign: "center",
                                    width: "15%",
                                    paddingInline: 1,
                                    paddingBlock: 0,
                                    borderLeft: "1px solid black",
                                    fontWeight: "600",
                                }}
                            >
                                {data.financement_demarage.subvention_2
                                    .montant || ""}
                            </TableCell>
                        </TableRow>
                        <TableRow
                            sx={{
                                "& td": {
                                    borderRight: 0,
                                    borderBlock: 0,
                                },
                            }}
                        >
                            <TableCell
                                sx={{
                                    width: "85%",
                                    paddingInline: 1,
                                    paddingBlock: 0,
                                    borderBottom: "1px solid black",
                                    fontWeight: "600",
                                }}
                            >
                                Autre financement (libellé)
                            </TableCell>
                            <TableCell
                                sx={{
                                    textAlign: "center",
                                    width: "15%",
                                    paddingInline: 1,
                                    paddingBlock: 0,
                                    borderLeft: "1px solid black",
                                    fontWeight: "600",
                                }}
                            >
                                {data.financement_demarage.autre_financement
                                    .montant || ""}
                            </TableCell>
                        </TableRow>
                        <TableRow
                            sx={{
                                "& td": {
                                    borderRight: 0,
                                    borderBlock: 0,
                                },
                            }}
                        >
                            <TableCell
                                sx={{
                                    textAlign: "right",
                                    width: "85%",
                                    paddingInline: 1,
                                    paddingBlock: 0,
                                    borderBottom: "1px solid black",
                                    fontWeight: "600",
                                }}
                            >
                                TOTAL RESOURCES
                            </TableCell>
                            <TableCell
                                sx={{
                                    textAlign: "center",
                                    width: "15%",
                                    paddingInline: 1,
                                    paddingBlock: 0,
                                    borderLeft: "1px solid black",
                                    fontWeight: "600",
                                }}
                            >
                                {data.financement_demarage.financement_total ||
                                    ""}
                            </TableCell>
                        </TableRow>

                        {/* {tableDataIncorporelles.map((el) => (
                            <TableRow
                                sx={{
                                    "& td": {
                                        borderRight: 0,
                                        borderBlock: 0,
                                    },
                                }}
                            >
                                <TableCell
                                    sx={{
                                        width: "85%",
                                        paddingInline: 1,
                                        paddingBlock: 0,
                                        // borderBottom: "1px solid black",
                                    }}
                                >
                                    {el.label}
                                </TableCell>
                                <TableCell
                                    sx={{
                                        textAlign: "center",
                                        width: "15%",
                                        paddingInline: 1,
                                        paddingBlock: 0,
                                        borderLeft: "1px solid black",
                                        // borderBottom: "1px solid black",
                                    }}
                                >
                                    {el.value}
                                </TableCell>
                            </TableRow>
                        ))}
                        <TableRow
                            sx={{
                                "& td": {
                                    borderRight: 0,
                                    borderBlock: 0,
                                },
                            }}
                        >
                            <TableCell
                                sx={{
                                    width: "85%",
                                    paddingInline: 1,
                                    paddingBlock: 0,
                                    borderBottom: "1px solid black",
                                    fontWeight: "600",
                                }}
                            >
                                Immobilisations corporelles
                            </TableCell>
                            <TableCell
                                sx={{
                                    textAlign: "center",
                                    width: "15%",
                                    paddingInline: 1,
                                    paddingBlock: 0,
                                    borderLeft: "1px solid black",
                                }}
                            ></TableCell>
                        </TableRow>
                        {tableDataCorporelles.map((el) => (
                            <TableRow
                                sx={{
                                    "& td": {
                                        borderRight: 0,
                                        borderBlock: 0,
                                    },
                                }}
                            >
                                <TableCell
                                    sx={{
                                        width: "85%",
                                        paddingInline: 1,
                                        paddingBlock: 0,
                                        // borderBottom: "1px solid black",
                                    }}
                                >
                                    {el.label}
                                </TableCell>
                                <TableCell
                                    sx={{
                                        textAlign: "center",
                                        width: "15%",
                                        paddingInline: 1,
                                        paddingBlock: 0,
                                        borderLeft: "1px solid black",
                                        // borderBottom: "1px solid black",
                                    }}
                                >
                                    {el.value}
                                </TableCell>
                            </TableRow>
                        ))}
                        <TableRow
                            sx={{
                                "& td": {
                                    borderRight: 0,
                                    borderBlock: 0,
                                },
                            }}
                        >
                            <TableCell
                                sx={{
                                    width: "85%",
                                    paddingInline: 1,
                                    paddingBlock: 0,
                                    borderBottom: "1px solid black",
                                    fontWeight: "600",
                                }}
                            ></TableCell>
                            <TableCell
                                sx={{
                                    paddingBlock: 1,
                                    textAlign: "center",
                                    width: "15%",
                                    paddingInline: 1,
                                    borderLeft: "1px solid black",
                                }}
                            ></TableCell>
                        </TableRow>
                        <TableRow
                            sx={{
                                "& td": {
                                    borderRight: 0,
                                    borderBlock: 0,
                                },
                            }}
                        >
                            <TableCell
                                sx={{
                                    width: "85%",
                                    paddingInline: 1,
                                    paddingBlock: 0,
                                    borderBottom: "1px solid black",
                                    fontWeight: "600",
                                }}
                            >
                                Stock de matières et produits
                            </TableCell>
                            <TableCell
                                sx={{
                                    textAlign: "center",
                                    width: "15%",
                                    paddingInline: 1,
                                    paddingBlock: 0,
                                    borderLeft: "1px solid black",
                                }}
                            ></TableCell>
                        </TableRow>
                        <TableRow
                            sx={{
                                "& td": {
                                    borderRight: 0,
                                    borderBlock: 0,
                                },
                            }}
                        >
                            <TableCell
                                sx={{
                                    width: "85%",
                                    paddingInline: 1,
                                    paddingBlock: 0,
                                    borderBottom: "1px solid black",
                                    fontWeight: "600",
                                }}
                            >
                                Trésorerie de départ
                            </TableCell>
                            <TableCell
                                sx={{
                                    textAlign: "center",
                                    width: "15%",
                                    paddingInline: 1,
                                    paddingBlock: 0,
                                    borderLeft: "1px solid black",
                                }}
                            ></TableCell>
                        </TableRow>
                        <TableRow
                            sx={{
                                "& td": {
                                    borderRight: 0,
                                    borderBlock: 0,
                                },
                            }}
                        >
                            <TableCell
                                sx={{
                                    textAlign: "right",
                                    width: "85%",
                                    paddingInline: 1,
                                    paddingBlock: 0,
                                    borderBottom: "1px solid black",
                                    fontWeight: "600",
                                }}
                            >
                                TOTAL BESOINS
                            </TableCell>
                            <TableCell
                                sx={{
                                    textAlign: "center",
                                    width: "15%",
                                    paddingInline: 1,
                                    paddingBlock: 0,
                                    borderLeft: "1px solid black",
                                }}
                            ></TableCell>
                        </TableRow> */}
                    </TableBody>
                </Table>
                {/* </TableContainer> */}
                {/* <Grid container sx={{ width: "100%", height: "100%" }}>
                    <Grid item sx={{ width: "85%", height: "100%" }}>
                        <Grid
                            sx={{
                                width: "100%",
                                height: "6%",
                                display: "flex",
                                alignItems: "center",
                                paddingInline: 1,
                                backgroundColor: "lightgray",
                                borderBottom: "1px solid black",
                            }}
                        >
                            <Typography
                                sx={{
                                    fontSize: 14,
                                    fontWeight: "700",
                                }}
                            >
                                {" "}
                                INVESTISSEMENTS
                            </Typography>
                        </Grid>
                        <Box
                            sx={{
                                width: "100%",
                                // height: "50%",
                                paddingBlock: 2,
                                paddingInline: 1,
                            }}
                        >
                            <Typography
                                sx={{
                                    fontSize: 14,
                                    fontWeight: "600",
                                    height: "5%",
                                }}
                            >
                                Immobilisations incorporelles
                            </Typography>
                            {tableDataIncorporelles.map((el) => (
                                <Typography
                                    sx={{
                                        height: "5%",
                                        fontSize: 14,
                                        fontWeight: "400",
                                    }}
                                >
                                    {el.label}
                                </Typography>
                            ))}
                            <Typography
                                sx={{
                                    height: "5%",
                                    fontSize: 14,
                                    fontWeight: "600",
                                }}
                            >
                                Immobilisations corporelles
                            </Typography>
                            {tableDataCorporelles.map((el) => (
                                <Typography
                                    sx={{
                                        height: "5%",
                                        fontSize: 14,
                                        fontWeight: "400",
                                    }}
                                >
                                    {el.label}
                                </Typography>
                            ))}
                            <Typography
                                sx={{
                                    height: "5%",
                                    marginTop: 2,
                                    fontSize: 14,
                                    fontWeight: "600",
                                }}
                            >
                                Stock de matières et produits
                            </Typography>
                            <Typography
                                sx={{
                                    height: "5%",
                                    fontSize: 14,
                                    fontWeight: "600",
                                }}
                            >
                                Trésorerie de départ
                            </Typography>
                            <Typography
                                sx={{
                                    height: "5%",
                                    textAlign: "right",
                                    marginRight: 4,
                                    fontSize: 14,
                                    fontWeight: "600",
                                }}
                            >
                                TOTAL BESOINS
                            </Typography>
                        </Box>
                        <Grid
                            sx={{
                                width: "100%",
                                height: "6%",
                                display: "flex",
                                alignItems: "center",
                                paddingInline: 1,
                                backgroundColor: "lightgray",
                                borderTop: "1px solid black",
                                borderBottom: "1px solid black",
                            }}
                        >
                            {" "}
                            <Typography
                                sx={{
                                    fontSize: 14,
                                    fontWeight: "700",
                                }}
                            >
                                FINANCEMENT DES INVESTISSEMENTS
                            </Typography>
                        </Grid>
                        <Box
                            sx={{
                                width: "100%",
                                // height: "50%",
                                paddingBlock: 2,
                                paddingInline: 1,
                            }}
                        >
                            <Typography
                                sx={{
                                    height: "5%",
                                    fontSize: 14,
                                    fontWeight: "600",
                                }}
                            >
                                Apport personnel
                            </Typography>
                            <Typography
                                sx={{
                                    height: "5%",
                                    fontSize: 14,
                                    fontWeight: "400",
                                }}
                            >
                                Apport personnel ou familial
                            </Typography>
                            <Typography
                                sx={{
                                    height: "5%",
                                    fontSize: 14,
                                    fontWeight: "400",
                                }}
                            >
                                Apports en nature (en valeur)
                            </Typography>
                            <Typography
                                sx={{
                                    height: "5%",
                                    fontSize: 14,
                                    fontWeight: "600",
                                }}
                            >
                                Emprunt
                            </Typography>
                            <Typography
                                sx={{
                                    height: "5%",
                                    fontSize: 14,
                                    fontWeight: "400",
                                }}
                            >
                                Prêt n°1 (nom de la banque)
                            </Typography>
                            <Typography
                                sx={{
                                    height: "5%",
                                    fontSize: 14,
                                    fontWeight: "400",
                                }}
                            >
                                Prêt n°2 (nom de la banque)
                            </Typography>
                            <Typography
                                sx={{
                                    height: "5%",
                                    fontSize: 14,
                                    fontWeight: "400",
                                }}
                            >
                                Prêt n°3 (nom de la banque)
                            </Typography>
                            <Typography
                                sx={{
                                    height: "5%",
                                    fontSize: 14,
                                    fontWeight: "600",
                                }}
                            >
                                Subvention n°1 (libellé)
                            </Typography>
                            <Typography
                                sx={{
                                    height: "5%",
                                    fontSize: 14,
                                    fontWeight: "600",
                                }}
                            >
                                Subvention n°2 (libellé)
                            </Typography>
                            <Typography
                                sx={{
                                    height: "5%",
                                    fontSize: 14,
                                    fontWeight: "600",
                                }}
                            >
                                Autre financement (libellé)
                            </Typography>
                            <Typography
                                sx={{
                                    height: "5%",
                                    textAlign: "right",
                                    marginRight: 4,
                                    fontSize: 14,
                                    fontWeight: "600",
                                }}
                            >
                                TOTAL RESSOURCES
                            </Typography>
                        </Box>
                    </Grid>
                    <Grid
                        item
                        sx={{
                            width: "15% ",
                            height: "100%",
                            borderLeft: "1px solid black",
                        }}
                    >
                        <Grid
                            sx={{
                                width: "100%",
                                height: "6%",
                                backgroundColor: "lightgray",
                                borderBottom: "1px solid black",
                                display: "flex",
                                alignItems: "center",
                                textAlign: "center",
                            }}
                        >
                            <Typography
                                sx={{
                                    fontSize: 14,
                                    fontWeight: "700",
                                }}
                            >
                                Montant € hors taxes
                            </Typography>
                        </Grid>
                        <Box
                            sx={{
                                // width: "100%",
                                // height: "50%",
                                paddingBlock: 2,
                                paddingInline: 1,
                            }}
                        >
                            <Typography
                                sx={{
                                    textAlign: "center",

                                    fontSize: 14,
                                    fontWeight: "600",
                                }}
                            ></Typography>
                            {tableDataIncorporelles.map((el) => (
                                <Typography
                                    sx={{
                                        textAlign: "center",

                                        fontSize: 14,
                                        fontWeight: "400",
                                    }}
                                >
                                    {el.value}
                                </Typography>
                            ))}
                            <Typography
                                sx={{
                                    textAlign: "center",

                                    fontSize: 14,
                                    fontWeight: "600",
                                }}
                            ></Typography>
                            {tableDataCorporelles.map((el) => (
                                <Typography
                                    sx={{
                                        textAlign: "center",

                                        fontSize: 14,
                                        fontWeight: "400",
                                    }}
                                >
                                    {el.value}
                                </Typography>
                            ))}
                            <Typography
                                sx={{
                                    textAlign: "center",

                                    marginTop: 2,
                                    fontSize: 14,
                                    fontWeight: "600",
                                }}
                            ></Typography>
                            <Typography
                                sx={{
                                    textAlign: "center",

                                    fontSize: 14,
                                    fontWeight: "600",
                                }}
                            ></Typography>
                            <Typography
                                sx={{
                                    textAlign: "center",

                                    fontSize: 14,
                                    fontWeight: "600",
                                }}
                            ></Typography>
                        </Box>

                        <Box
                            sx={{
                                // width: "100%",
                                // height: "50%",
                                paddingBlock: 2,
                                paddingInline: 1,
                            }}
                        >
                            <Typography
                                sx={{
                                    fontSize: 14,
                                    textAlign: "center",
                                    fontWeight: "600",
                                }}
                            >
                                0
                            </Typography>
                            <Typography
                                sx={{
                                    fontSize: 14,
                                    textAlign: "center",
                                    fontWeight: "400",
                                }}
                            >
                                0
                            </Typography>
                            <Typography
                                sx={{
                                    fontSize: 14,
                                    textAlign: "center",
                                    fontWeight: "400",
                                }}
                            >
                                0
                            </Typography>
                            <Typography
                                sx={{
                                    fontSize: 14,
                                    textAlign: "center",
                                    fontWeight: "600",
                                }}
                            >
                                Emprunt
                            </Typography>
                            <Typography
                                sx={{
                                    fontSize: 14,
                                    textAlign: "center",
                                    fontWeight: "400",
                                }}
                            >
                                1
                            </Typography>
                            <Typography
                                sx={{
                                    fontSize: 14,
                                    textAlign: "center",
                                    fontWeight: "400",
                                }}
                            >
                                2
                            </Typography>
                            <Typography
                                sx={{
                                    fontSize: 14,
                                    textAlign: "center",
                                    fontWeight: "400",
                                }}
                            >
                                3
                            </Typography>
                            <Typography
                                sx={{
                                    fontSize: 14,
                                    textAlign: "center",
                                    fontWeight: "600",
                                }}
                            >
                                4
                            </Typography>
                            <Typography
                                sx={{
                                    fontSize: 14,
                                    textAlign: "center",
                                    fontWeight: "600",
                                }}
                            >
                                5
                            </Typography>
                            <Typography
                                sx={{
                                    textAlign: "center",
                                    fontSize: 14,
                                    fontWeight: "600",
                                }}
                            >
                                autre
                            </Typography>
                            <Typography
                                sx={{
                                    textAlign: "center",
                                    marginRight: 4,
                                    fontSize: 14,
                                    fontWeight: "600",
                                }}
                            >
                                TOT
                            </Typography>
                        </Box>
                    </Grid>
                </Grid> */}
            </Box>
            <Box sx={{ position: "absolute", bottom: "1.25%", right: "5%" }}>
                2
            </Box>
        </Box>
    );
};

export default PagePdf1;
