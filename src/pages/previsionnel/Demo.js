import {
    Box,
    Button,
    Grid,
    styled,
    Typography,
    useTheme,
    alpha,
    Tooltip,
    IconButton,
    InputLabel,
} from "@mui/material";
import { FieldArray, Form, Formik } from "formik";
import React from "react";
import InlineSelectField from "../../components/InlineSelectField";
import InlineTextField from "../../components/InlineTextFeild";
import * as yup from "yup";
import InputFeild from "../../components/InputFeild";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import InterPhoneInput from "../../components/InterPhoneInput";
import QuikFormMenu from "../../components/QuikFormMenu";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { Link } from "react-router-dom";
import BaseTextInput from "../../components/BaseTextInput";
import TextLikeInput from "../../components/TextLikeInput";

let patternTwoDigisAfterComma = /^\d+(\.\d{0,2})?$/;

const commonStringValidator = yup
    .number("montant invalide")
    .positive("montant invalide")
    .test(
        // "is-decimal",
        "montant invalide",
        (val) => {
            if (val !== undefined) {
                return patternTwoDigisAfterComma.test(val);
            }
            return true;
        }
    );

const besoinDemarageValidation = yup.object({
    duree_amortissement: yup
        .number("Durée invalide")
        .integer("Durée invalide")
        .positive("Durée invalide")
        .required("Ce champ est requis"),
    besoin_demarage: yup.object({
        frais_etablissement: commonStringValidator,
    }),
});

const ButtonContainerFloatRight = styled("div")(({ theme }) => ({
    paddingInline: theme.spacing(8),
    // paddingBlock: theme.spacing(16),
    paddingTop: "16px",
    float: "right",
}));

const Demo = () => {
    const theme = useTheme();
    const handleSubmit = async (values) => {
        console.log(values);
    };

    return (
        <Formik
            initialValues={{
                nom: "",
                prenom: "",
                nom_projet: "",
                form_juridique: "",
                num_telephone: "",
                email: "",
                commune: "",
                code_postal: "",
                activite: "",
                duree_amortissement: "",
                besoin_demarage: {
                    frais_etablissement: "",
                    frais_compteurs: "",
                    frais_logiciels: "",
                    frais_marque: "",
                    frais_droit_entree: "",
                    achat_fonds_de_commerce: "",
                    droit_au_bail: "",
                    depot_garantie: "",
                    frais_dossier: "",
                    frais_avocat: "",
                    frais_communication: "",
                    achat_immobilier: "",
                    frais_travaux: "",
                    frais_materiel: "",
                    frais_materiel_bureau: "",
                    frais_stock: "",
                    tresorie_de_depart: "",
                    total: 0,
                    autres_frais: [
                        {
                            label: "",
                            montant: "",
                        },
                        {
                            label: "",
                            montant: "",
                        },
                        {
                            label: "",
                            montant: "",
                        },
                    ],
                },
                financement_demarage: {
                    apport_personnel: "",
                    apports_en_nature: "",
                    pret_1: {
                        nom_banque: "",
                        montant: "",
                        taux: "",
                        duree_en_mois: "",
                    },
                    pret_2: {
                        nom_banque: "",
                        montant: "",
                        taux: "",
                        duree_en_mois: "",
                    },
                    pret_3: {
                        nom_banque: "",
                        montant: "",
                        taux: "",
                        duree_en_mois: "",
                    },
                    subvention_1: "",
                    subvention_2: "",
                    autre_financement: { label: "", montant: "" },
                    financement_total: 0,
                },
                charges_fixes: {
                    autres_charges_fixes: [
                        {
                            name: "",
                            autres_an1: "",
                            autres_an2: "",
                            autres_an3: "",
                            autres_an4: "",
                            autres_an5: "",
                        },
                        {
                            name: "",
                            autres_an1: "",
                            autres_an2: "",
                            autres_an3: "",
                            autres_an4: "",
                            autres_an5: "",
                        },
                        {
                            name: "",
                            autres_an1: "",
                            autres_an2: "",
                            autres_an3: "",
                            autres_an4: "",
                            autres_an5: "",
                        },
                    ],
                    annee1: {
                        assurances: "",
                        telephone_internet: "",
                        autres_abonnements: "",
                        carburant_transports: "",
                        frais_deplacement_hebergement: "",
                        Eau_electricite_gaz: "",
                        mutuellee: "",
                        entretien_vehicule: "",
                        nettoyage_locaux: "",
                        publicite_communication: "",
                        loyer: "",
                        comptable_avocats: "",
                        frais_bancaires: "",
                        impôt_taxes: "",
                        total_charges_fixes: 0,
                    },
                    annee2: {
                        assurances: "",
                        telephone_internet: "",
                        autres_abonnements: "",
                        carburant_transports: "",
                        frais_deplacement_hebergement: "",
                        Eau_electricite_gaz: "",
                        mutuellee: "",
                        entretien_vehicule: "",
                        nettoyage_locaux: "",
                        publicite_communication: "",
                        loyer: "",
                        comptable_avocats: "",
                        frais_bancaires: "",
                        impôt_taxes: "",
                        total_charges_fixes: 0,
                    },
                    annee3: {
                        assurances: "",
                        telephone_internet: "",
                        autres_abonnements: "",
                        carburant_transports: "",
                        frais_deplacement_hebergement: "",
                        Eau_electricite_gaz: "",
                        mutuellee: "",
                        entretien_vehicule: "",
                        nettoyage_locaux: "",
                        publicite_communication: "",
                        loyer: "",
                        comptable_avocats: "",
                        frais_bancaires: "",
                        impôt_taxes: "",
                        total_charges_fixes: 0,
                    },
                    annee4: {
                        assurances: "",
                        telephone_internet: "",
                        autres_abonnements: "",
                        carburant_transports: "",
                        frais_deplacement_hebergement: "",
                        Eau_electricite_gaz: "",
                        mutuellee: "",
                        entretien_vehicule: "",
                        nettoyage_locaux: "",
                        publicite_communication: "",
                        loyer: "",
                        comptable_avocats: "",
                        frais_bancaires: "",
                        impôt_taxes: "",
                        total_charges_fixes: 0,
                    },
                    annee5: {
                        assurances: "",
                        telephone_internet: "",
                        autres_abonnements: "",
                        carburant_transports: "",
                        frais_deplacement_hebergement: "",
                        Eau_electricite_gaz: "",
                        mutuellee: "",
                        entretien_vehicule: "",
                        nettoyage_locaux: "",
                        publicite_communication: "",
                        loyer: "",
                        comptable_avocats: "",
                        frais_bancaires: "",
                        impôt_taxes: "",
                        total_charges_fixes: 0,
                    },
                },
                chiffre_affaire_an1: {
                    total_vente: 0,
                    total_service: 0,
                    augmentation_vente1: "",
                    augmentation_services1: "",
                    vente: [
                        {
                            name: "Mois 1",
                            nb_jours: 25,
                            chiffre_affaires: "",
                            total_chiffre_affaires: 0,
                        },
                        {
                            name: "Mois 2",
                            nb_jours: 25,
                            chiffre_affaires: "",
                            total_chiffre_affaires: 0,
                        },
                        {
                            name: "Mois 3",
                            nb_jours: 25,
                            chiffre_affaires: "",
                            total_chiffre_affaires: 0,
                        },
                        {
                            name: "Mois 4",
                            nb_jours: 25,
                            chiffre_affaires: "",
                            total_chiffre_affaires: 0,
                        },
                        {
                            name: "Mois 5",
                            nb_jours: 25,
                            chiffre_affaires: "",
                            total_chiffre_affaires: 0,
                        },
                        {
                            name: "Mois 6",
                            nb_jours: 25,
                            chiffre_affaires: "",
                            total_chiffre_affaires: 0,
                        },
                        {
                            name: "Mois 7",
                            nb_jours: 25,
                            chiffre_affaires: "",
                            total_chiffre_affaires: 0,
                        },
                        {
                            name: "Mois 8",
                            nb_jours: 25,
                            chiffre_affaires: "",
                            total_chiffre_affaires: 0,
                        },
                        {
                            name: "Mois 9",
                            nb_jours: 25,
                            chiffre_affaires: "",
                            total_chiffre_affaires: 0,
                        },
                        {
                            name: "Mois 10",
                            nb_jours: 25,
                            chiffre_affaires: "",
                            total_chiffre_affaires: 0,
                        },
                        {
                            name: "Mois 11",
                            nb_jours: 25,
                            chiffre_affaires: "",
                            total_chiffre_affaires: 0,
                        },
                        {
                            name: "Mois 12",
                            nb_jours: 25,
                            chiffre_affaires: "",
                            total_chiffre_affaires: 0,
                        },
                    ],
                    services: [
                        {
                            name: "Mois 1",
                            nb_jours: 25,
                            chiffre_affaires: "",
                            total_chiffre_affaires: 0,
                        },
                        {
                            name: "Mois 2",
                            nb_jours: 25,
                            chiffre_affaires: "",
                            total_chiffre_affaires: 0,
                        },
                        {
                            name: "Mois 3",
                            nb_jours: 25,
                            chiffre_affaires: "",
                            total_chiffre_affaires: 0,
                        },
                        {
                            name: "Mois 4",
                            nb_jours: 25,
                            chiffre_affaires: "",
                            total_chiffre_affaires: 0,
                        },
                        {
                            name: "Mois 5",
                            nb_jours: 25,
                            chiffre_affaires: "",
                            total_chiffre_affaires: 0,
                        },
                        {
                            name: "Mois 6",
                            nb_jours: 25,
                            chiffre_affaires: "",
                            total_chiffre_affaires: 0,
                        },
                        {
                            name: "Mois 7",
                            nb_jours: 25,
                            chiffre_affaires: "",
                            total_chiffre_affaires: 0,
                        },
                        {
                            name: "Mois 8",
                            nb_jours: 25,
                            chiffre_affaires: "",
                            total_chiffre_affaires: 0,
                        },
                        {
                            name: "Mois 9",
                            nb_jours: 25,
                            chiffre_affaires: "",
                            total_chiffre_affaires: 0,
                        },
                        {
                            name: "Mois 10",
                            nb_jours: 25,
                            chiffre_affaires: "",
                            total_chiffre_affaires: 0,
                        },
                        {
                            name: "Mois 11",
                            nb_jours: 25,
                            chiffre_affaires: "",
                            total_chiffre_affaires: 0,
                        },
                        {
                            name: "Mois 12",
                            nb_jours: 25,
                            chiffre_affaires: "",
                            total_chiffre_affaires: 0,
                        },
                    ],
                },
                pourcentage_vente_cout_achat: "",
                duree_credits_clients: "",
                duree_dettes_fournisseurs: "",
                salaires_employes: ["", "", "", "", ""],
                remuneration_dirigeants: ["", "", "", "", ""],
                dir_ACCRE: "Non",
                rentabilite: "",
                niveau_tresorie: "",
            }}
            validationSchema={besoinDemarageValidation}
            onSubmit={(values) => handleSubmit(values)}
        >
            {(formik) => {
                const charges_fixes = formik.values.charges_fixes;
                const { total, autres_frais, ...values } =
                    formik.values.besoin_demarage;
                const { financement_total, ...other } =
                    formik.values.financement_demarage;
                let otherValues = autres_frais
                    ?.map((el) => Number(el.montant))
                    .filter((v) => typeof Number(v) == "number" && !isNaN(v));
                const valuesToBeSummed = Object.values(values)
                    .filter((v) => typeof Number(v) == "number" && !isNaN(v))
                    .concat(otherValues);
                const chiffre_vente_Totals =
                    formik.values.chiffre_affaire_an1.vente.map((el) => {
                        if (
                            !isNaN(Number(el.chiffre_affaires)) &&
                            !isNaN(Number(el.nb_jours))
                        )
                            return (
                                Number(el.chiffre_affaires) *
                                Number(el.nb_jours)
                            );
                        return 0;
                    });
                const chiffre_services_Totals =
                    formik.values.chiffre_affaire_an1.services.map((el) => {
                        if (
                            !isNaN(Number(el.chiffre_affaires)) &&
                            !isNaN(Number(el.nb_jours))
                        )
                            return (
                                Number(el.chiffre_affaires) *
                                Number(el.nb_jours)
                            );
                        return 0;
                    });
                // console.log(otherValues);
                function sumFunction(array) {
                    return array.reduce(
                        (previousValue, currentValue) =>
                            Number(previousValue) + Number(currentValue),
                        0
                    );
                }

                const sumTotal = sumFunction(valuesToBeSummed);

                const finance_values = Object.values(other).map((v) => {
                    if (typeof v === "object") return v.montant;
                    return v;
                });

                // .filter((v) => typeof Number(v) == "number" && v !== "NaN");

                const financement_sum = sumFunction(finance_values);

                const autreCharges = charges_fixes.autres_charges_fixes;
                const yearlyCharges = [
                    {
                        ...charges_fixes.annee1,
                        autres_charges_annuel: autreCharges.map(
                            (el) => el.autres_an1
                        ),
                    },
                    {
                        ...charges_fixes.annee2,
                        autres_charges_annuel: autreCharges.map(
                            (el) => el.autres_an2
                        ),
                    },
                    {
                        ...charges_fixes.annee3,
                        autres_charges_annuel: autreCharges.map(
                            (el) => el.autres_an3
                        ),
                    },
                    {
                        ...charges_fixes.annee4,
                        autres_charges_annuel: autreCharges.map(
                            (el) => el.autres_an4
                        ),
                    },
                    {
                        ...charges_fixes.annee5,
                        autres_charges_annuel: autreCharges.map(
                            (el) => el.autres_an5
                        ),
                    },
                ];
                console.log(yearlyCharges);
                const sumChargesFixes = yearlyCharges.map((el) => {
                    const {
                        total_charges_fixes,
                        autres_charges_annuel,
                        ...rest
                    } = el;
                    const values = Object.values(rest)
                        .concat(autres_charges_annuel)
                        .map((item) => Number(item))
                        .filter(
                            (v) => typeof Number(v) == "number" && !isNaN(v)
                        );
                    return sumFunction(values);
                });
                const totalVente = sumFunction(chiffre_vente_Totals);
                const totalServices = sumFunction(chiffre_services_Totals);

                return (
                    <Box
                        sx={{
                            padding: 4,
                            display: "flex",
                            flexDirection: "row",
                            // scrollBehavior: "smooth",
                            position: "relative",
                        }}
                    >
                        <Box
                            sx={{
                                marginRight: "280px",
                                scrollBehavior: "smooth",
                            }}
                        >
                            <Form>
                                {/* <Typography
                                component="h1"
                                variant="h4"
                                align="center"
                                sx={{
                                    marginTop: 4,
                                    marginBottom: 2,
                                }}
                            >
                                Vous souhaitez ajouter une societé?
                            </Typography> */}
                                <div id="identification">
                                    <Typography
                                        variant="body1"
                                        align="center"
                                        sx={{
                                            marginBottom: 6,
                                        }}
                                    >
                                        Saisissez dans cet onglet toutes les
                                        données de votre projet
                                    </Typography>
                                    <Grid
                                        // rowSpacing={3}
                                        // columnSpacing={6}
                                        // container
                                        sx={{ py: 3 }}
                                        // xs={12}
                                    >
                                        <Typography variant="h6" gutterBottom>
                                            Identification
                                        </Typography>
                                    </Grid>
                                    <Grid
                                        container
                                        rowSpacing={1}
                                        columnSpacing={0}
                                    >
                                        <Grid
                                            item
                                            xs={12}
                                            // sm={9}

                                            //
                                            // sx={{ backgroundColor: "red" }}
                                        >
                                            <InlineTextField
                                                id="prenom"
                                                name="prenom"
                                                label="Prenom"
                                                // fullWidth
                                            />
                                        </Grid>
                                        <Grid
                                            item
                                            xs={12}
                                            // sm={9}
                                        >
                                            <InlineTextField
                                                id="nom"
                                                name="nom"
                                                label="Nom"
                                                // fullWidth
                                            />
                                        </Grid>
                                        <Grid
                                            item
                                            xs={12}
                                            // sm={9}
                                        >
                                            <InlineTextField
                                                id="nom_projet"
                                                name="nom_projet"
                                                label="Intitulé du projet"
                                                // fullWidth
                                                comment={
                                                    "Nom de votre projet ou description de votre activité"
                                                }
                                            />
                                        </Grid>

                                        <Grid
                                            item
                                            xs={12}
                                            // sm={9}
                                        >
                                            <InlineSelectField
                                                options={[
                                                    "SARL (IS)",
                                                    "Micro-entreprise",
                                                    "Entreprise individuelle au réel (IR)",
                                                    "EURL (IS)",
                                                    "SAS (IS)",
                                                    "SASU (IS)",
                                                ]}
                                                id="form_juridique"
                                                name="form_juridique"
                                                label="Statut juridique *"
                                                // fullWidth
                                            />
                                        </Grid>
                                        <Grid
                                            item
                                            xs={12}
                                            // sm={9}
                                        >
                                            <InlineTextField
                                                id="email"
                                                name="email"
                                                label="Email"
                                                // fullWidt
                                            />
                                        </Grid>
                                        <Grid
                                            item
                                            xs={12}
                                            // sm={9}
                                        >
                                            <InterPhoneInput
                                                id="num_telephone"
                                                name="num_telephone"
                                                label="Téléphone"
                                                // fullWidth
                                            />
                                        </Grid>
                                        <Grid
                                            item
                                            xs={12}
                                            // sm={9}
                                        >
                                            <InlineTextField
                                                id="code_postal"
                                                name="code_postal"
                                                label="Code Postal"
                                                // fullWidth
                                                autoComplete="billing postal-code"
                                            />
                                        </Grid>
                                        <Grid
                                            item
                                            xs={12}
                                            // sm={9}
                                        >
                                            <InlineTextField
                                                id="commune"
                                                name="commune"
                                                label="Votre ville ou commune d'activité"
                                                // fullWidth
                                                autoComplete="billing address-level2"
                                            />
                                        </Grid>
                                        <Grid
                                            item
                                            xs={12}
                                            // sm={9}
                                        >
                                            <InlineSelectField
                                                options={[
                                                    "Marchandises (y compris hébergement et restauration)",
                                                    "Services",
                                                    "Mixte",
                                                ]}
                                                id="activite"
                                                name="activite"
                                                label="Vente de marchandises ou de services"
                                                // fullWidth
                                            />
                                        </Grid>
                                    </Grid>
                                </div>{" "}
                                <div id="besoin_demarage">
                                    <Grid
                                        // rowSpacing={3}
                                        // columnSpacing={6}
                                        // container
                                        sx={{ py: 3 }}
                                        // xs={12}
                                    >
                                        <Typography variant="h6" gutterBottom>
                                            Besoins de démarage
                                        </Typography>
                                        <Typography
                                            variant="body1"
                                            align="center"
                                            sx={{
                                                marginInline: 6,
                                                marginTop: 2,
                                                // marginBottom: 6,
                                            }}
                                        >
                                            Listez toutes les dépenses ou
                                            investissements que vous devrez
                                            faire avant même de démarrer
                                            l’activité, en hors taxes (ou TTC si
                                            vous n'êtes pas soumis à la TVA)
                                        </Typography>
                                    </Grid>
                                    <Grid container>
                                        <Grid
                                            container
                                            sx={{
                                                padding: 2,
                                                marginBlock: 2,
                                                marginInline: -1,
                                                borderRadius: 0.5,
                                                background: alpha(
                                                    theme.palette.success.light,
                                                    0.2
                                                ),
                                            }}
                                        >
                                            <Grid item xs={4.3}></Grid>
                                            <Grid
                                                item
                                                // xs={}
                                                // sm={9}
                                            >
                                                <Typography variant="subtitle1">
                                                    Montant
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                        {besoinDemarageDataArray.map((item) => (
                                            <Grid
                                                container
                                                rowSpacing={2}
                                                columnSpacing={0}
                                                key={item.name}
                                            >
                                                <Grid
                                                    item
                                                    xs={12}
                                                    // sm={9}
                                                >
                                                    <InlineTextField
                                                        textAlign="right"
                                                        id={item.name}
                                                        name={`besoin_demarage.${item.name}`}
                                                        label={item.label}
                                                        width={"15"}
                                                        comment={item.comment}
                                                        // fullWidth
                                                        // handleChange={(e) =>
                                                        //     console.log(e.target.value)
                                                        // }
                                                    />
                                                </Grid>
                                            </Grid>
                                            //   Durée d'amortissement des investissements :
                                        ))}
                                        <Grid sx={{ pt: 2 }}>
                                            <Typography
                                                variant="subtitle1"
                                                color={"primary"}
                                            >
                                                Autres Frais (inscrire libellé
                                                ci-dessous) :
                                            </Typography>
                                        </Grid>
                                        <FieldArray name="besoin_demarage.autres_frais">
                                            {(fieldArrayProps) => {
                                                // console.log(fieldArrayProps);
                                                const { push, remove, form } =
                                                    fieldArrayProps;
                                                const { values } = form;
                                                const autres_frais =
                                                    values.besoin_demarage
                                                        .autres_frais;
                                                // console.log(autres_frais);
                                                return (
                                                    <Box
                                                        // rowSpacing={3}
                                                        // columnSpacing={6}
                                                        // container
                                                        sx={{
                                                            py: 3,
                                                            width: "100%",
                                                        }}
                                                        // xs={12}
                                                    >
                                                        {autres_frais?.map(
                                                            (el, index) => (
                                                                <Grid
                                                                    container
                                                                    columnGap={
                                                                        2
                                                                    }
                                                                    alignItems={
                                                                        "center"
                                                                    }
                                                                    sx={
                                                                        {
                                                                            // marginBottom: 2,
                                                                        }
                                                                    }
                                                                    key={
                                                                        el.label
                                                                    }
                                                                >
                                                                    <Grid
                                                                        item
                                                                        xs={3.5}
                                                                        // sm={9}
                                                                    >
                                                                        <BaseTextInput
                                                                            name={`besoin_demarage.autres_frais[${index}].label`}
                                                                            // label="civilité"
                                                                            // width={"15"}
                                                                            fullWidth
                                                                        />
                                                                    </Grid>
                                                                    <Grid
                                                                        item
                                                                        xs={1.9}
                                                                        // sm={9}
                                                                    >
                                                                        <BaseTextInput
                                                                            name={`besoin_demarage.autres_frais[${index}].montant`}
                                                                            // label="civilité"
                                                                            // width={"15"}
                                                                            textAlign="right"
                                                                            fullWidth
                                                                        />
                                                                    </Grid>
                                                                    <Grid
                                                                        item
                                                                        // xs={12}
                                                                        // sm={1}
                                                                    >
                                                                        {index >
                                                                            2 && (
                                                                            <Tooltip title="Supprimer la dépense">
                                                                                <IconButton
                                                                                    // sx={{
                                                                                    //     position:
                                                                                    //         "absolute",
                                                                                    //     top: "25%",
                                                                                    //     right: -40,
                                                                                    //     transform:
                                                                                    //         "translateY(-50%)",
                                                                                    // }}
                                                                                    color="error"
                                                                                    ria-label="delete"
                                                                                    size="small"
                                                                                    onClick={() => {
                                                                                        remove(
                                                                                            index
                                                                                        );
                                                                                    }}
                                                                                >
                                                                                    <DeleteOutlineOutlinedIcon />
                                                                                </IconButton>
                                                                            </Tooltip>
                                                                        )}
                                                                    </Grid>
                                                                </Grid>
                                                            )
                                                        )}
                                                        <Tooltip title="Ajouter une autre dépense">
                                                            <IconButton
                                                                variant="contained"
                                                                size="small"
                                                                // color={`${theme.palette.primary.light}`}
                                                                onClick={() => {
                                                                    push({
                                                                        label: "",
                                                                        montant:
                                                                            "",
                                                                    });
                                                                }}
                                                            >
                                                                <AddCircleIcon
                                                                    color="success"
                                                                    fontSize="large"
                                                                />
                                                            </IconButton>
                                                        </Tooltip>
                                                    </Box>
                                                );
                                            }}
                                        </FieldArray>
                                        <Grid
                                            item
                                            xs={12}
                                            // sm={9}
                                        >
                                            <InlineTextField
                                                labelAlign="right"
                                                textAlign="right"
                                                id="total"
                                                name={"besoin_demarage.total"}
                                                label={"Total"}
                                                customValue={sumTotal}
                                                width={"15"}
                                                readOnly
                                                fullWidth
                                            />
                                        </Grid>

                                        <Grid
                                            item
                                            xs={12}
                                            // sm={9}
                                        >
                                            <InlineTextField
                                                textAlign="right"
                                                width={"15"}
                                                id="duree_amortissement"
                                                name="duree_amortissement"
                                                label={
                                                    "Durée d'amortissement des investissements *"
                                                }
                                                comment="durée de vie des acquisitions de départ, en
                                    années"
                                            />
                                        </Grid>
                                    </Grid>
                                </div>
                                <div id="financement_besoin_demarage">
                                    <Grid
                                        // rowSpacing={3}
                                        // columnSpacing={6}
                                        // container
                                        sx={{ py: 3 }}
                                        // xs={12}
                                    >
                                        <Typography variant="h6" gutterBottom>
                                            Le financement de vos besoins de
                                            démarrage
                                        </Typography>
                                    </Grid>
                                    <Grid
                                        container
                                        sx={{
                                            padding: 2,
                                            marginBlock: 2,
                                            marginInline: -1,
                                            borderRadius: 0.5,
                                            background: alpha(
                                                theme.palette.success.light,
                                                0.2
                                            ),
                                        }}
                                    >
                                        <Grid item xs={4.1}></Grid>
                                        <Grid
                                            item
                                            xs={2.2}
                                            // sm={9}
                                        >
                                            <Typography variant="subtitle1">
                                                Montant
                                            </Typography>
                                        </Grid>
                                        <Grid
                                            item
                                            xs={2.2}
                                            // sm={9}
                                        >
                                            <Typography variant="subtitle1">
                                                Taux
                                            </Typography>
                                        </Grid>
                                        <Grid
                                            item
                                            xs={2}
                                            // sm={9}
                                        >
                                            <Typography variant="subtitle1">
                                                Durée
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                    <Grid
                                        container
                                        // rowSpacing={1}
                                        // columnSpacing={0}
                                    >
                                        <Grid
                                            item
                                            xs={12}
                                            // sm={9}

                                            //
                                            // sx={{ backgroundColor: "red" }}
                                        >
                                            <InlineTextField
                                                id="apport_personnel"
                                                name="financement_demarage.apport_personnel"
                                                label="Apport personnel ou familial"
                                                width={"15"}
                                                textAlign="right"
                                                // fullWidth
                                            />
                                        </Grid>
                                        <Grid
                                            item
                                            xs={12}
                                            // sm={9}
                                        >
                                            <InlineTextField
                                                id="apports_en_nature"
                                                name="financement_demarage.apports_en_nature"
                                                label="Apports en nature(en valeur)"
                                                width={"15"}
                                                textAlign="right"
                                                // fullWidth
                                            />
                                        </Grid>
                                        <Grid
                                            container
                                            columnGap={1.7}
                                            alignItems={"center"}
                                            // sx={{
                                            //     marginBottom: 2,
                                            // }}
                                        >
                                            <Grid
                                                item
                                                xs={3.55}
                                                // sm={9}
                                            >
                                                {" "}
                                                <Typography
                                                    // shrink
                                                    htmlFor="bootstrap-input"
                                                    sx={{
                                                        // padding: "0 20px 0 0",
                                                        // backgroundColor: "red",
                                                        display: "flex",
                                                        alignItems: "center",
                                                        marginRight: 1,
                                                        paddingRight: 1,
                                                        fontFamily: "inherit",
                                                        fontSize: 16,
                                                        fontWeight: "500",
                                                        // width: "30%",
                                                        lineHeight: "unset",
                                                        transformOrigin:
                                                            "unset",
                                                        textOverflow: "unset",
                                                        whiteSpace: "unset",
                                                        overflow: "unset",
                                                    }}
                                                >
                                                    {/* <Typography> */}
                                                    Prêt n°1(
                                                    {/* </Typography> */}
                                                    <TextLikeInput
                                                        id="pret_1"
                                                        name="financement_demarage.pret_1.nom_banque"
                                                        placeholder="nom de la banque"
                                                        // width={"15"}
                                                        // textAlign="right"
                                                        // fullWidth
                                                        // comment={
                                                        //     "Nom de votre projet ou description de votre activité"
                                                        // }
                                                    />
                                                    )
                                                    {/* <Typography>)</Typography> */}
                                                </Typography>
                                            </Grid>
                                            <Grid
                                                item
                                                xs={1.8}
                                                // sm={9}
                                            >
                                                <BaseTextInput
                                                    id="pret_1"
                                                    name="financement_demarage.pret_1.montant"
                                                    label="Prêt n°1 (nom de la banque)"
                                                    width={"15"}
                                                    textAlign="right"
                                                    // fullWidth
                                                    // comment={
                                                    //     "Nom de votre projet ou description de votre activité"
                                                    // }
                                                />
                                            </Grid>
                                            <Grid
                                                item
                                                xs={1.8}
                                                // sm={9}
                                            >
                                                <BaseTextInput
                                                    id="pret_1_t"
                                                    name="financement_demarage.pret_1.taux"
                                                    label="Prêt n°1 (nom de la banque)"
                                                    width={"15"}
                                                    textAlign="right"
                                                    // fullWidth
                                                    // comment={
                                                    //     "Nom de votre projet ou description de votre activité"
                                                    // }
                                                />
                                            </Grid>
                                            <Grid
                                                item
                                                xs={1.8}
                                                // sm={9}
                                            >
                                                <BaseTextInput
                                                    id="pret_1_d"
                                                    name="financement_demarage.pret_1.duree_en_mois"
                                                    label="Prêt n°1 (nom de la banque)"
                                                    width={"15"}
                                                    textAlign="right"
                                                    // fullWidth
                                                    // comment={
                                                    //     "Nom de votre projet ou description de votre activité"
                                                    // }
                                                />
                                            </Grid>
                                        </Grid>{" "}
                                        <Grid
                                            container
                                            columnGap={1.7}
                                            alignItems={"center"}
                                            // sx={{
                                            //     marginBottom: 2,
                                            // }}
                                        >
                                            <Grid
                                                item
                                                xs={3.55}
                                                // sm={9}
                                            >
                                                {" "}
                                                <InputLabel
                                                    // shrink
                                                    htmlFor="bootstrap-input"
                                                    sx={{
                                                        // padding: "0 20px 0 0",
                                                        // backgroundColor: "red",
                                                        display: "flex",
                                                        alignItems: "center",
                                                        marginRight: 1,
                                                        paddingRight: 1,
                                                        fontFamily: "inherit",
                                                        fontSize: 16,
                                                        fontWeight: "500",
                                                        // width: "30%",
                                                        lineHeight: "unset",
                                                        transformOrigin:
                                                            "unset",
                                                        textOverflow: "unset",
                                                        whiteSpace: "unset",
                                                        overflow: "unset",
                                                    }}
                                                >
                                                    {/* <Typography> */}
                                                    Prêt n°1(
                                                    {/* </Typography> */}
                                                    <TextLikeInput
                                                        // id="pret_2"
                                                        name="financement_demarage.pret_2.nom_banque"
                                                        placeholder="nom de la banque"
                                                        // width={"15"}
                                                        // textAlign="right"
                                                        // fullWidth
                                                        // comment={
                                                        //     "Nom de votre projet ou description de votre activité"
                                                        // }
                                                    />
                                                    )
                                                    {/* <Typography>)</Typography> */}
                                                </InputLabel>
                                            </Grid>
                                            <Grid
                                                item
                                                xs={1.8}
                                                // sm={9}
                                            >
                                                <BaseTextInput
                                                    id="pret_2"
                                                    name="financement_demarage.pret_2.montant"
                                                    label="Prêt n°2 (nom de la banque)"
                                                    width={"15"}
                                                    textAlign="right"
                                                    // fullWidth
                                                    // comment={
                                                    //     "Nom de votre projet ou description de votre activité"
                                                    // }
                                                />
                                            </Grid>
                                            <Grid
                                                item
                                                xs={1.8}
                                                // sm={9}
                                            >
                                                <BaseTextInput
                                                    id="pret_2_t"
                                                    name="financement_demarage.pret_2.taux"
                                                    label="Prêt n°2 (nom de la banque)"
                                                    width={"15"}
                                                    textAlign="right"
                                                    // fullWidth
                                                    // comment={
                                                    //     "Nom de votre projet ou description de votre activité"
                                                    // }
                                                />
                                            </Grid>
                                            <Grid
                                                item
                                                xs={1.8}
                                                // sm={9}
                                            >
                                                <BaseTextInput
                                                    id="pret_2_d"
                                                    name="financement_demarage.pret_2.duree_en_mois"
                                                    label="Prêt n°2 (nom de la banque)"
                                                    width={"15"}
                                                    textAlign="right"
                                                    // fullWidth
                                                    // comment={
                                                    //     "Nom de votre projet ou description de votre activité"
                                                    // }
                                                />
                                            </Grid>
                                        </Grid>{" "}
                                        <Grid
                                            container
                                            columnGap={1.8}
                                            alignItems={"center"}
                                            // sx={{
                                            //     marginBottom: 2,
                                            // }}
                                        >
                                            <Grid
                                                item
                                                xs={3.55}
                                                // sm={9}
                                            >
                                                {" "}
                                                <InputLabel
                                                    // shrink
                                                    htmlFor="bootstrap-input"
                                                    sx={{
                                                        // padding: "0 20px 0 0",
                                                        // backgroundColor: "red",
                                                        display: "flex",
                                                        alignItems: "center",
                                                        marginRight: 1,
                                                        paddingRight: 1,
                                                        fontFamily: "inherit",
                                                        fontSize: 16,
                                                        fontWeight: "500",
                                                        // width: "30%",
                                                        lineHeight: "unset",
                                                        transformOrigin:
                                                            "unset",
                                                        textOverflow: "unset",
                                                        whiteSpace: "unset",
                                                        overflow: "unset",
                                                    }}
                                                >
                                                    {/* <Typography> */}
                                                    Prêt n°3(
                                                    {/* </Typography> */}
                                                    <TextLikeInput
                                                        // id="pret_1"
                                                        name="financement_demarage.pret_3.nom_banque"
                                                        placeholder="nom de la banque"
                                                        // width={"15"}
                                                        // textAlign="right"
                                                        // fullWidth
                                                        // comment={
                                                        //     "Nom de votre projet ou description de votre activité"
                                                        // }
                                                    />
                                                    )
                                                </InputLabel>
                                            </Grid>
                                            <Grid
                                                item
                                                xs={1.8}
                                                // sm={9}
                                            >
                                                <BaseTextInput
                                                    id="pret_3"
                                                    name="financement_demarage.pret_3.montant"
                                                    label="Prêt n°3 (nom de la banque)"
                                                    width={"15"}
                                                    textAlign="right"
                                                    // fullWidth
                                                    // comment={
                                                    //     "Nom de votre projet ou description de votre activité"
                                                    // }
                                                />
                                            </Grid>
                                            <Grid
                                                item
                                                xs={1.8}
                                                // sm={9}
                                            >
                                                <BaseTextInput
                                                    id="pret_3_t"
                                                    name="financement_demarage.pret_3.taux"
                                                    label="Prêt n°3 (nom de la banque)"
                                                    width={"15"}
                                                    textAlign="right"
                                                    // fullWidth
                                                    // comment={
                                                    //     "Nom de votre projet ou description de votre activité"
                                                    // }
                                                />
                                            </Grid>
                                            <Grid
                                                item
                                                xs={1.8}
                                                // sm={9}
                                            >
                                                <BaseTextInput
                                                    id="pret_3_d"
                                                    name="financement_demarage.pret_3.duree_en_mois"
                                                    label="Prêt n°3 (nom de la banque)"
                                                    width={"15"}
                                                    textAlign="right"
                                                    // fullWidth
                                                    // comment={
                                                    //     "Nom de votre projet ou description de votre activité"
                                                    // }
                                                />
                                            </Grid>
                                        </Grid>
                                        <Grid
                                            item
                                            xs={12}
                                            // sm={9}
                                        >
                                            <InlineTextField
                                                id="subvention_1"
                                                name="financement_demarage.subvention_1"
                                                label="Subvention n°1"
                                                width={"15"}
                                                textAlign="right"
                                                // fullWidt
                                            />
                                        </Grid>
                                        <Grid
                                            item
                                            xs={12}
                                            // sm={9}
                                        >
                                            <InlineTextField
                                                id="subvention_2"
                                                name="financement_demarage.subvention_2"
                                                label="Subvention n°2"
                                                width={"15"}
                                                textAlign="right"
                                                // fullWidt
                                            />
                                        </Grid>
                                        <Grid
                                            item
                                            xs={12}
                                            // sm={9}
                                        >
                                            <InlineTextField
                                                id="autre_financement"
                                                name="financement_demarage.autre_financement.montant"
                                                label="Autre financement (libellé)"
                                                width={"15"}
                                                textAlign="right"
                                                // fullWidt
                                            />
                                        </Grid>
                                        <Grid
                                            item
                                            xs={12}
                                            // sm={9}
                                        >
                                            <InlineTextField
                                                labelAlign="right"
                                                textAlign="right"
                                                id="financement_demarage_total"
                                                name={
                                                    "financement_demarage.financement_total"
                                                }
                                                label={"Total"}
                                                customValue={financement_sum}
                                                width={"15"}
                                                readOnly
                                                fullWidth
                                            />
                                        </Grid>
                                    </Grid>
                                </div>
                                <div id="charges_fixes">
                                    <Grid
                                        // rowSpacing={3}
                                        // columnSpacing={6}
                                        // container
                                        sx={{ py: 3 }}
                                        // xs={12}
                                    >
                                        <Typography variant="h6" gutterBottom>
                                            Vos charges fixes
                                        </Typography>
                                    </Grid>
                                    <Typography
                                        variant="body1"
                                        align="center"
                                        sx={{
                                            marginBottom: 6,
                                        }}
                                    >
                                        Listez vos charges courantes
                                        récurrentes, en hors taxe (ou TTC si
                                        vous n'êtes pas soumis à la TVA).
                                    </Typography>
                                    <Grid
                                        container
                                        columnGap={0.3}
                                        alignItems={"center"}
                                        sx={{
                                            padding: 2,
                                            marginBlock: 2,
                                            marginInline: -1,
                                            borderRadius: 0.5,
                                            background: alpha(
                                                theme.palette.success.light,
                                                0.2
                                            ),
                                        }}
                                    >
                                        <Grid item xs={3}></Grid>
                                        <Grid
                                            item
                                            xs={1.7}
                                            // sm={9}
                                        >
                                            <Typography
                                                variant="subtitle2"
                                                textAlign={"center"}
                                            >
                                                Montant anneé 1
                                            </Typography>
                                        </Grid>
                                        <Grid
                                            item
                                            xs={1.7}
                                            // sm={9}
                                        >
                                            <Typography
                                                variant="subtitle2"
                                                textAlign={"center"}
                                            >
                                                Montant anneé 2
                                            </Typography>
                                        </Grid>
                                        <Grid
                                            item
                                            xs={1.7}
                                            // sm={9}
                                        >
                                            <Typography
                                                variant="subtitle2"
                                                textAlign={"center"}
                                            >
                                                Montant anneé 3
                                            </Typography>
                                        </Grid>
                                        <Grid
                                            item
                                            xs={1.7}
                                            // sm={9}
                                        >
                                            <Typography
                                                variant="subtitle2"
                                                textAlign={"center"}
                                            >
                                                Montant anneé 4
                                            </Typography>
                                        </Grid>
                                        <Grid
                                            item
                                            xs={1.7}
                                            // sm={9}
                                        >
                                            <Typography
                                                variant="subtitle2"
                                                textAlign={"center"}
                                            >
                                                Montant anneé 5
                                            </Typography>
                                        </Grid>
                                    </Grid>

                                    <Grid
                                        container
                                        // rowSpacing={1}
                                        // columnSpacing={0}
                                    >
                                        {chargesFixesDataArray.map(
                                            ({ name, label }) => (
                                                <Grid
                                                    container
                                                    columnGap={0.2}
                                                    alignItems={"center"}
                                                    key={name}
                                                    // sx={{
                                                    //     marginBottom: 2,
                                                    // }}
                                                >
                                                    <Grid
                                                        item
                                                        xs={3}
                                                        // sm={9}
                                                    >
                                                        <InputLabel
                                                            // shrink
                                                            htmlFor="bootstrap-input"
                                                            sx={{
                                                                // padding: "0 20px 0 0",
                                                                // backgroundColor: "red",
                                                                marginRight: 1,
                                                                paddingRight: 1,
                                                                fontFamily:
                                                                    "inherit",
                                                                fontSize: 16,
                                                                fontWeight:
                                                                    "500",
                                                                // width: "30%",
                                                                lineHeight:
                                                                    "unset",
                                                                transformOrigin:
                                                                    "unset",
                                                                textOverflow:
                                                                    "unset",
                                                                whiteSpace:
                                                                    "unset",
                                                                overflow:
                                                                    "unset",
                                                            }}
                                                        >
                                                            {label}
                                                        </InputLabel>
                                                    </Grid>
                                                    <Grid
                                                        item
                                                        xs={1.7}
                                                        sx={{
                                                            paddingInline: 0.3,
                                                        }}
                                                        // sm={9}
                                                    >
                                                        <BaseTextInput
                                                            id={name}
                                                            name={`charges_fixes.annee1.${name}`}
                                                            // width={"10"}
                                                            textAlign="right"
                                                            // fullWidth
                                                            // comment={
                                                            //     "Nom de votre projet ou description de votre activité"
                                                            // }
                                                        />
                                                    </Grid>
                                                    <Grid
                                                        item
                                                        xs={1.7}
                                                        sx={{
                                                            paddingInline: 0.3,
                                                        }}
                                                        // sm={9}
                                                    >
                                                        <BaseTextInput
                                                            id={name}
                                                            name={`charges_fixes.annee2.${name}`}
                                                            width={"15"}
                                                            textAlign="right"
                                                            // fullWidth
                                                            // comment={
                                                            //     "Nom de votre projet ou description de votre activité"
                                                            // }
                                                        />
                                                    </Grid>{" "}
                                                    <Grid
                                                        item
                                                        xs={1.7}
                                                        sx={{
                                                            paddingInline: 0.3,
                                                        }}
                                                        // sm={9}
                                                    >
                                                        <BaseTextInput
                                                            id={name}
                                                            name={`charges_fixes.annee3.${name}`}
                                                            width={"15"}
                                                            textAlign="right"
                                                            // fullWidth
                                                            // comment={
                                                            //     "Nom de votre projet ou description de votre activité"
                                                            // }
                                                        />
                                                    </Grid>
                                                    <Grid
                                                        item
                                                        xs={1.7}
                                                        sx={{
                                                            paddingInline: 0.3,
                                                        }}
                                                        // sm={9}
                                                    >
                                                        <BaseTextInput
                                                            id={name}
                                                            name={`charges_fixes.annee4.${name}`}
                                                            width={"15"}
                                                            textAlign="right"
                                                            // fullWidth
                                                            // comment={
                                                            //     "Nom de votre projet ou description de votre activité"
                                                            // }
                                                        />
                                                    </Grid>
                                                    <Grid
                                                        item
                                                        xs={1.7}
                                                        sx={{
                                                            paddingInline: 0.3,
                                                        }}
                                                        // sm={9}
                                                    >
                                                        <BaseTextInput
                                                            id={name}
                                                            name={`charges_fixes.annee5.${name}`}
                                                            width={"15"}
                                                            textAlign="right"
                                                            // fullWidth
                                                            // comment={
                                                            //     "Nom de votre projet ou description de votre activité"
                                                            // }
                                                        />
                                                    </Grid>
                                                </Grid>
                                            )
                                        )}
                                        <Grid sx={{ pt: 2 }}>
                                            <Typography
                                                variant="subtitle1"
                                                color={"primary"}
                                            >
                                                Autres charges (inscrire libellé
                                                ci-dessous) :
                                            </Typography>
                                        </Grid>
                                        <FieldArray name="charges_fixes.autres_charges_fixes">
                                            {(fieldArrayProps) => {
                                                // console.log(fieldArrayProps);
                                                const { push, remove, form } =
                                                    fieldArrayProps;
                                                const { values } = form;
                                                const autres_charges_fixes =
                                                    values.charges_fixes
                                                        .autres_charges_fixes;
                                                // console.log(autres_frais);
                                                return (
                                                    <Box
                                                        // rowSpacing={3}
                                                        // columnSpacing={6}
                                                        // container
                                                        sx={{
                                                            py: 3,
                                                            width: "100%",
                                                        }}
                                                        // xs={12}
                                                    >
                                                        {autres_charges_fixes?.map(
                                                            (el, index) => (
                                                                <Grid
                                                                    container
                                                                    columnGap={
                                                                        0.2
                                                                    }
                                                                    alignItems={
                                                                        "center"
                                                                    }
                                                                    key={
                                                                        el.name
                                                                    }
                                                                    // sx={{
                                                                    //     marginBottom: 2,
                                                                    // }}
                                                                >
                                                                    <Grid
                                                                        item
                                                                        xs={3}
                                                                        // sm={9}
                                                                    >
                                                                        <BaseTextInput
                                                                            // id={name}
                                                                            name={`charges_fixes.autres_charges_fixes[${index}].name`}
                                                                            // width={"15"}
                                                                            // textAlign="right"
                                                                            fullWidth
                                                                            // comment={
                                                                            //     "Nom de votre projet ou description de votre activité"
                                                                            // }
                                                                        />
                                                                    </Grid>
                                                                    <Grid
                                                                        item
                                                                        xs={1.7}
                                                                        sx={{
                                                                            paddingInline: 0.3,
                                                                        }}
                                                                        // sm={9}
                                                                    >
                                                                        <BaseTextInput
                                                                            // id={el.name}
                                                                            name={`charges_fixes.autres_charges_fixes[${index}].autres_an1`}
                                                                            // width={"10"}
                                                                            textAlign="right"
                                                                            // fullWidth
                                                                            // comment={
                                                                            //     "Nom de votre projet ou description de votre activité"
                                                                            // }
                                                                        />
                                                                    </Grid>
                                                                    <Grid
                                                                        item
                                                                        xs={1.7}
                                                                        sx={{
                                                                            paddingInline: 0.3,
                                                                        }}
                                                                        // sm={9}
                                                                    >
                                                                        <BaseTextInput
                                                                            // id={name}
                                                                            name={`charges_fixes.autres_charges_fixes[${index}].autres_an2`}
                                                                            width={
                                                                                "15"
                                                                            }
                                                                            textAlign="right"
                                                                            // fullWidth
                                                                            // comment={
                                                                            //     "Nom de votre projet ou description de votre activité"
                                                                            // }
                                                                        />
                                                                    </Grid>{" "}
                                                                    <Grid
                                                                        item
                                                                        xs={1.7}
                                                                        sx={{
                                                                            paddingInline: 0.3,
                                                                        }}
                                                                        // sm={9}
                                                                    >
                                                                        <BaseTextInput
                                                                            // id={name}
                                                                            name={`charges_fixes.autres_charges_fixes[${index}].autres_an3`}
                                                                            width={
                                                                                "15"
                                                                            }
                                                                            textAlign="right"
                                                                            // fullWidth
                                                                            // comment={
                                                                            //     "Nom de votre projet ou description de votre activité"
                                                                            // }
                                                                        />
                                                                    </Grid>
                                                                    <Grid
                                                                        item
                                                                        xs={1.7}
                                                                        sx={{
                                                                            paddingInline: 0.3,
                                                                        }}
                                                                        // sm={9}
                                                                    >
                                                                        <BaseTextInput
                                                                            name={`charges_fixes.autres_charges_fixes[${index}].autres_an4`}
                                                                            width={
                                                                                "15"
                                                                            }
                                                                            textAlign="right"
                                                                            // fullWidth
                                                                            // comment={
                                                                            //     "Nom de votre projet ou description de votre activité"
                                                                            // }
                                                                        />
                                                                    </Grid>
                                                                    <Grid
                                                                        item
                                                                        xs={1.7}
                                                                        sx={{
                                                                            paddingInline: 0.3,
                                                                        }}
                                                                        // sm={9}
                                                                    >
                                                                        <BaseTextInput
                                                                            name={`charges_fixes.autres_charges_fixes[${index}].autres_an5`}
                                                                            width={
                                                                                "15"
                                                                            }
                                                                            textAlign="right"
                                                                            // fullWidth
                                                                            // comment={
                                                                            //     "Nom de votre projet ou description de votre activité"
                                                                            // }
                                                                        />
                                                                    </Grid>
                                                                    <Grid
                                                                        item
                                                                        // xs={12}
                                                                        // sm={1}
                                                                    >
                                                                        {index >
                                                                            2 && (
                                                                            <Tooltip title="Supprimer la dépense">
                                                                                <IconButton
                                                                                    // sx={{
                                                                                    //     position:
                                                                                    //         "absolute",
                                                                                    //     top: "25%",
                                                                                    //     right: -40,
                                                                                    //     transform:
                                                                                    //         "translateY(-50%)",
                                                                                    // }}
                                                                                    color="error"
                                                                                    ria-label="delete"
                                                                                    size="small"
                                                                                    onClick={() => {
                                                                                        remove(
                                                                                            index
                                                                                        );
                                                                                    }}
                                                                                >
                                                                                    <DeleteOutlineOutlinedIcon />
                                                                                </IconButton>
                                                                            </Tooltip>
                                                                        )}
                                                                    </Grid>
                                                                </Grid>
                                                            )
                                                        )}
                                                        <Tooltip title="Ajouter une autre charge">
                                                            <IconButton
                                                                variant="contained"
                                                                size="small"
                                                                // color={`${theme.palette.primary.light}`}
                                                                onClick={() => {
                                                                    push({
                                                                        name: "",
                                                                        autres_an1:
                                                                            "",
                                                                        autres_an2:
                                                                            "",
                                                                        autres_an3:
                                                                            "",
                                                                        autres_an4:
                                                                            "",
                                                                        autres_an5:
                                                                            "",
                                                                    });
                                                                }}
                                                            >
                                                                <AddCircleIcon
                                                                    color="success"
                                                                    fontSize="large"
                                                                />
                                                            </IconButton>
                                                        </Tooltip>
                                                    </Box>
                                                );
                                            }}
                                        </FieldArray>
                                        <Grid
                                            container
                                            columnGap={0.2}
                                            alignItems={"center"}
                                            // sx={{
                                            //     marginBottom: 2,
                                            // }}
                                        >
                                            <Grid
                                                item
                                                xs={3}
                                                // sm={9}
                                            >
                                                <InputLabel
                                                    // shrink
                                                    htmlFor="bootstrap-input"
                                                    sx={{
                                                        textAlign: "right",
                                                        // padding: "0 20px 0 0",
                                                        // backgroundColor: "red",
                                                        marginRight: 1,
                                                        paddingRight: 1,
                                                        fontFamily: "inherit",
                                                        fontSize: 16,
                                                        fontWeight: "500",
                                                        // width: "30%",
                                                        lineHeight: "unset",
                                                        transformOrigin:
                                                            "unset",
                                                        textOverflow: "unset",
                                                        whiteSpace: "unset",
                                                        overflow: "unset",
                                                    }}
                                                >
                                                    Total
                                                </InputLabel>
                                            </Grid>
                                            <Grid
                                                item
                                                xs={1.7}
                                                sx={{
                                                    paddingInline: 0.3,
                                                }}
                                                // sm={9}
                                            >
                                                <BaseTextInput
                                                    // id={name}
                                                    name={`charges_fixes.annee1.total_charges_fixes`}
                                                    width={"15"}
                                                    customValue={
                                                        sumChargesFixes[0]
                                                    }
                                                    readOnly
                                                    textAlign="right"
                                                    // fullWidth
                                                    // comment={
                                                    //     "Nom de votre projet ou description de votre activité"
                                                    // }
                                                />
                                            </Grid>
                                            <Grid
                                                item
                                                xs={1.7}
                                                sx={{
                                                    paddingInline: 0.3,
                                                }}
                                                // sm={9}
                                            >
                                                <BaseTextInput
                                                    // id={name}
                                                    name={`charges_fixes.annee2.total_charges_fixes`}
                                                    width={"15"}
                                                    textAlign="right"
                                                    customValue={
                                                        sumChargesFixes[1]
                                                    }
                                                    readOnly
                                                    // fullWidth
                                                    // comment={
                                                    //     "Nom de votre projet ou description de votre activité"
                                                    // }
                                                />
                                            </Grid>{" "}
                                            <Grid
                                                item
                                                xs={1.7}
                                                sx={{
                                                    paddingInline: 0.3,
                                                }}
                                                // sm={9}
                                            >
                                                <BaseTextInput
                                                    // id={name}
                                                    name={`charges_fixes.annee3.total_charges_fixes`}
                                                    width={"15"}
                                                    textAlign="right"
                                                    customValue={
                                                        sumChargesFixes[2]
                                                    }
                                                    readOnly
                                                    // fullWidth
                                                    // comment={
                                                    //     "Nom de votre projet ou description de votre activité"
                                                    // }
                                                />
                                            </Grid>
                                            <Grid
                                                item
                                                xs={1.7}
                                                sx={{
                                                    paddingInline: 0.3,
                                                }}
                                                // sm={9}
                                            >
                                                <BaseTextInput
                                                    // id={name}
                                                    name={`charges_fixes.annee4.total_charges_fixes`}
                                                    width={"15"}
                                                    textAlign="right"
                                                    customValue={
                                                        sumChargesFixes[3]
                                                    }
                                                    readOnly
                                                    // fullWidth
                                                    // comment={
                                                    //     "Nom de votre projet ou description de votre activité"
                                                    // }
                                                />
                                            </Grid>
                                            <Grid
                                                item
                                                xs={1.7}
                                                sx={{
                                                    paddingInline: 0.3,
                                                }}
                                                // sm={9}
                                            >
                                                <BaseTextInput
                                                    // id={name}
                                                    name={`charges_fixes.annee5.total_charges_fixes`}
                                                    width={"15"}
                                                    textAlign="right"
                                                    customValue={
                                                        sumChargesFixes[4]
                                                    }
                                                    readOnly
                                                    // fullWidth
                                                    // comment={
                                                    //     "Nom de votre projet ou description de votre activité"
                                                    // }
                                                />
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </div>
                                <div id="chiffre_affaire_an1">
                                    <Grid
                                        // rowSpacing={3}
                                        // columnSpacing={6}
                                        // container
                                        sx={{ py: 3 }}
                                        // xs={12}
                                    >
                                        <Typography variant="h6" gutterBottom>
                                            Votre chiffre d'affaires de la
                                            première année
                                        </Typography>
                                    </Grid>
                                    <Typography
                                        variant="body1"
                                        align="center"
                                        sx={{
                                            marginBottom: 6,
                                        }}
                                    >
                                        Prévoyez ici le chiffre d'affaires de
                                        votre activité (hors taxes).
                                    </Typography>
                                    <Grid
                                        container
                                        // rowSpacing={1}
                                        columnSpacing={2}
                                    >
                                        {" "}
                                        <Grid
                                            item
                                            md={12}
                                            lg={6}
                                            //
                                            sx={{ padding: 2 }}
                                        >
                                            <Grid
                                                // rowSpacing={3}
                                                // columnSpacing={6}
                                                // container
                                                sx={{ py: 3 }}
                                                // xs={12}
                                            >
                                                <Typography
                                                    variant="h6"
                                                    // gutterBottom
                                                    sx={{
                                                        marginBottom: 2,
                                                    }}
                                                >
                                                    Année 1 - Vente de
                                                    Marchandises
                                                </Typography>
                                                <Grid
                                                    container
                                                    columnGap={0.3}
                                                    alignItems={"center"}
                                                    sx={{
                                                        padding: 2,
                                                        marginBlock: 2,
                                                        marginInline: -1,
                                                        borderRadius: 0.5,
                                                        background: alpha(
                                                            theme.palette
                                                                .success.light,
                                                            0.2
                                                        ),
                                                    }}
                                                >
                                                    <Grid item xs={3}></Grid>
                                                    <Grid
                                                        item
                                                        xs={2.8}
                                                        // sm={9}
                                                    >
                                                        <Typography
                                                            variant="subtitle2"
                                                            textAlign={"center"}
                                                        >
                                                            Nb de jours
                                                        </Typography>
                                                    </Grid>
                                                    <Grid
                                                        item
                                                        xs={2.8}
                                                        // sm={9}
                                                    >
                                                        <Typography
                                                            variant="subtitle2"
                                                            textAlign={"center"}
                                                        >
                                                            Chiffre d'affaires
                                                        </Typography>
                                                    </Grid>
                                                    <Grid
                                                        item
                                                        xs={2.8}
                                                        // sm={9}
                                                    >
                                                        <Typography
                                                            variant="subtitle2"
                                                            textAlign={"center"}
                                                        >
                                                            Chiffre d'affaires
                                                        </Typography>
                                                    </Grid>
                                                </Grid>
                                                {monthsDataArray.map(
                                                    (
                                                        { name, label },
                                                        index
                                                    ) => (
                                                        <Grid
                                                            container
                                                            columnGap={0.2}
                                                            alignItems={
                                                                "center"
                                                            }
                                                            key={name}
                                                            // sx={{
                                                            //     marginBottom: 2,
                                                            // }}
                                                        >
                                                            <Grid
                                                                item
                                                                xs={3}
                                                                // sm={9}
                                                            >
                                                                <InputLabel
                                                                    // shrink
                                                                    htmlFor="bootstrap-input"
                                                                    sx={{
                                                                        // padding: "0 20px 0 0",
                                                                        // backgroundColor: "red",
                                                                        marginRight: 1,
                                                                        paddingRight: 1,
                                                                        fontFamily:
                                                                            "inherit",
                                                                        fontSize: 16,
                                                                        fontWeight:
                                                                            "500",
                                                                        // width: "30%",
                                                                        lineHeight:
                                                                            "unset",
                                                                        transformOrigin:
                                                                            "unset",
                                                                        textOverflow:
                                                                            "unset",
                                                                        whiteSpace:
                                                                            "unset",
                                                                        overflow:
                                                                            "unset",
                                                                    }}
                                                                >
                                                                    {label}
                                                                </InputLabel>
                                                            </Grid>
                                                            <Grid
                                                                item
                                                                xs={2.8}
                                                                sx={{
                                                                    paddingInline: 0.3,
                                                                }}
                                                                // sm={9}
                                                            >
                                                                <BaseTextInput
                                                                    id={name}
                                                                    name={`chiffre_affaire_an1.vente[${index}].nb_jours`}
                                                                    // width={"10"}
                                                                    textAlign="right"
                                                                    // fullWidth
                                                                    // comment={
                                                                    //     "Nom de votre projet ou description de votre activité"
                                                                    // }
                                                                />
                                                            </Grid>
                                                            <Grid
                                                                item
                                                                xs={2.8}
                                                                sx={{
                                                                    paddingInline: 0.3,
                                                                }}
                                                                // sm={9}
                                                            >
                                                                <BaseTextInput
                                                                    id={name}
                                                                    name={`chiffre_affaire_an1.vente[${index}].chiffre_affaires`}
                                                                    width={"15"}
                                                                    textAlign="right"

                                                                    // fullWidth
                                                                    // comment={
                                                                    //     "Nom de votre projet ou description de votre activité"
                                                                    // }
                                                                />
                                                            </Grid>{" "}
                                                            <Grid
                                                                item
                                                                xs={2.8}
                                                                sx={{
                                                                    paddingInline: 0.3,
                                                                }}
                                                                // sm={9}
                                                            >
                                                                <BaseTextInput
                                                                    readOnly
                                                                    id={name}
                                                                    name={`chiffre_affaire_an1.vente[${index}].total_chiffre_affaires`}
                                                                    customValue={
                                                                        chiffre_vente_Totals[
                                                                            index
                                                                        ]
                                                                    }
                                                                    width={"15"}
                                                                    textAlign="right"
                                                                    // fullWidth
                                                                    // comment={
                                                                    //     "Nom de votre projet ou description de votre activité"
                                                                    // }
                                                                />
                                                            </Grid>
                                                        </Grid>
                                                    )
                                                )}
                                                <Grid
                                                    container
                                                    // direction={"row-reverse"}
                                                    // justifyContent={"start"}
                                                    alignItems={"center"}
                                                    columnGap={0.2}
                                                >
                                                    {" "}
                                                    <Grid
                                                        item
                                                        xs={2.8}
                                                        // sm={9}
                                                        sx={{
                                                            paddingInline: 0.3,
                                                        }}
                                                    ></Grid>
                                                    <Grid
                                                        item
                                                        xs={2.8}
                                                        // sm={9}
                                                        sx={{
                                                            paddingInline: 0.3,
                                                        }}
                                                    ></Grid>
                                                    <Grid item xs={3}>
                                                        <InputLabel
                                                            // shrink
                                                            htmlFor="bootstrap-input"
                                                            sx={{
                                                                textAlign:
                                                                    "right",
                                                                // padding: "0 20px 0 0",
                                                                // backgroundColor: "red",
                                                                marginRight: 1,
                                                                paddingRight: 1,
                                                                fontFamily:
                                                                    "inherit",
                                                                fontSize: 16,
                                                                fontWeight:
                                                                    "500",
                                                                // width: "30%",
                                                                lineHeight:
                                                                    "unset",
                                                                transformOrigin:
                                                                    "unset",
                                                                textOverflow:
                                                                    "unset",
                                                                whiteSpace:
                                                                    "unset",
                                                                overflow:
                                                                    "unset",
                                                            }}
                                                        >
                                                            Total
                                                        </InputLabel>
                                                    </Grid>
                                                    <Grid
                                                        item
                                                        xs={2.8}
                                                        // sm={9}
                                                        sx={{
                                                            paddingInline: 0.3,
                                                        }}
                                                    >
                                                        <BaseTextInput
                                                            textAlign="right"
                                                            // id="total"
                                                            name={
                                                                "chiffre_affaire_an1.total_vente"
                                                            }
                                                            label={"Total"}
                                                            customValue={
                                                                totalVente
                                                            }
                                                            // width={"15"}
                                                            readOnly
                                                        />
                                                    </Grid>
                                                    <Grid item xs={8.7}>
                                                        <InputLabel
                                                            // shrink
                                                            htmlFor="bootstrap-input"
                                                            sx={{
                                                                // padding: "0 20px 0 0",
                                                                // backgroundColor: "red",
                                                                marginRight: 1,
                                                                paddingRight: 1,
                                                                fontFamily:
                                                                    "inherit",
                                                                fontSize: 16,
                                                                fontWeight:
                                                                    "500",
                                                                // width: "30%",
                                                                lineHeight:
                                                                    "unset",
                                                                transformOrigin:
                                                                    "unset",
                                                                textOverflow:
                                                                    "unset",
                                                                whiteSpace:
                                                                    "unset",
                                                                overflow:
                                                                    "unset",
                                                            }}
                                                        >
                                                            % d'augmentation du
                                                            chiffre d'affaire
                                                            entre l'année 1 et
                                                            l'année 2
                                                        </InputLabel>
                                                    </Grid>
                                                    <Grid
                                                        item
                                                        xs={2.8}
                                                        // sm={9}
                                                        sx={{
                                                            paddingInline: 0.3,
                                                        }}
                                                    >
                                                        <BaseTextInput
                                                            textAlign="right"
                                                            // id="total"
                                                            name={
                                                                "chiffre_affaire_an1.augmentation_vente1"
                                                            }
                                                            label={"Total"}
                                                            customValue={
                                                                totalServices
                                                            }
                                                            // width={"15"}
                                                        />
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                        <Grid
                                            item
                                            md={12}
                                            lg={6}
                                            //
                                            sx={{ padding: 2 }}
                                        >
                                            <Grid
                                                // rowSpacing={3}
                                                // columnSpacing={6}
                                                // container
                                                sx={{ py: 3 }}
                                                // xs={12}
                                            >
                                                <Typography
                                                    variant="h6"
                                                    // gutterBottom
                                                    sx={{
                                                        marginBottom: 2,
                                                    }}
                                                >
                                                    Année 1 - Services
                                                </Typography>
                                                <Grid
                                                    container
                                                    columnGap={0.3}
                                                    alignItems={"center"}
                                                    sx={{
                                                        padding: 2,
                                                        marginBlock: 2,
                                                        marginInline: -1,
                                                        borderRadius: 0.5,
                                                        background: alpha(
                                                            theme.palette
                                                                .success.light,
                                                            0.2
                                                        ),
                                                    }}
                                                >
                                                    <Grid item xs={3}></Grid>
                                                    <Grid
                                                        item
                                                        xs={2.8}
                                                        // sm={9}
                                                    >
                                                        <Typography
                                                            variant="subtitle2"
                                                            textAlign={"center"}
                                                        >
                                                            Nb de jours
                                                        </Typography>
                                                    </Grid>
                                                    <Grid
                                                        item
                                                        xs={2.8}
                                                        // sm={9}
                                                    >
                                                        <Typography
                                                            variant="subtitle2"
                                                            textAlign={"center"}
                                                        >
                                                            Chiffre d'affaires
                                                        </Typography>
                                                    </Grid>
                                                    <Grid
                                                        item
                                                        xs={2.8}
                                                        // sm={9}
                                                    >
                                                        <Typography
                                                            variant="subtitle2"
                                                            textAlign={"center"}
                                                        >
                                                            Chiffre d'affaires
                                                        </Typography>
                                                    </Grid>
                                                </Grid>
                                                {monthsDataArray.map(
                                                    (
                                                        { name, label },
                                                        index
                                                    ) => (
                                                        <Grid
                                                            container
                                                            columnGap={0.2}
                                                            alignItems={
                                                                "center"
                                                            }
                                                            key={name}
                                                            // sx={{
                                                            //     marginBottom: 2,
                                                            // }}
                                                        >
                                                            <Grid
                                                                item
                                                                xs={3}
                                                                // sm={9}
                                                            >
                                                                <InputLabel
                                                                    // shrink
                                                                    htmlFor="bootstrap-input"
                                                                    sx={{
                                                                        // padding: "0 20px 0 0",
                                                                        // backgroundColor: "red",
                                                                        marginRight: 1,
                                                                        paddingRight: 1,
                                                                        fontFamily:
                                                                            "inherit",
                                                                        fontSize: 16,
                                                                        fontWeight:
                                                                            "500",
                                                                        // width: "30%",
                                                                        lineHeight:
                                                                            "unset",
                                                                        transformOrigin:
                                                                            "unset",
                                                                        textOverflow:
                                                                            "unset",
                                                                        whiteSpace:
                                                                            "unset",
                                                                        overflow:
                                                                            "unset",
                                                                    }}
                                                                >
                                                                    {label}
                                                                </InputLabel>
                                                            </Grid>
                                                            <Grid
                                                                item
                                                                xs={2.8}
                                                                sx={{
                                                                    paddingInline: 0.3,
                                                                }}
                                                                // sm={9}
                                                            >
                                                                <BaseTextInput
                                                                    id={name}
                                                                    name={`chiffre_affaire_an1.services[${index}].nb_jours`}
                                                                    // width={"10"}
                                                                    textAlign="right"
                                                                    // fullWidth
                                                                    // comment={
                                                                    //     "Nom de votre projet ou description de votre activité"
                                                                    // }
                                                                />
                                                            </Grid>
                                                            <Grid
                                                                item
                                                                xs={2.8}
                                                                sx={{
                                                                    paddingInline: 0.3,
                                                                }}
                                                                // sm={9}
                                                            >
                                                                <BaseTextInput
                                                                    id={name}
                                                                    name={`chiffre_affaire_an1.services[${index}].chiffre_affaires`}
                                                                    width={"15"}
                                                                    textAlign="right"
                                                                    // fullWidth
                                                                    // comment={
                                                                    //     "Nom de votre projet ou description de votre activité"
                                                                    // }
                                                                />
                                                            </Grid>{" "}
                                                            <Grid
                                                                item
                                                                xs={2.8}
                                                                sx={{
                                                                    paddingInline: 0.3,
                                                                }}
                                                                // sm={9}
                                                            >
                                                                <BaseTextInput
                                                                    id={name}
                                                                    readOnly
                                                                    name={`chiffre_affaire_an1.services[${index}].total_chiffre_affaires`}
                                                                    customValue={
                                                                        chiffre_services_Totals[
                                                                            index
                                                                        ]
                                                                    }
                                                                    width={"15"}
                                                                    textAlign="right"
                                                                    // fullWidth
                                                                    // comment={
                                                                    //     "Nom de votre projet ou description de votre activité"
                                                                    // }
                                                                />
                                                            </Grid>
                                                        </Grid>
                                                    )
                                                )}{" "}
                                                <Grid
                                                    container
                                                    // direction={"row-reverse"}
                                                    // justifyContent={"start"}
                                                    alignItems={"center"}
                                                    columnGap={0.2}
                                                >
                                                    {" "}
                                                    <Grid
                                                        item
                                                        xs={2.8}
                                                        // sm={9}
                                                        sx={{
                                                            paddingInline: 0.3,
                                                        }}
                                                    ></Grid>
                                                    <Grid
                                                        item
                                                        xs={2.8}
                                                        // sm={9}
                                                        sx={{
                                                            paddingInline: 0.3,
                                                        }}
                                                    ></Grid>
                                                    <Grid item xs={3}>
                                                        <InputLabel
                                                            // shrink
                                                            htmlFor="bootstrap-input"
                                                            sx={{
                                                                textAlign:
                                                                    "right",
                                                                // padding: "0 20px 0 0",
                                                                // backgroundColor: "red",
                                                                marginRight: 1,
                                                                paddingRight: 1,
                                                                fontFamily:
                                                                    "inherit",
                                                                fontSize: 16,
                                                                fontWeight:
                                                                    "500",
                                                                // width: "30%",
                                                                lineHeight:
                                                                    "unset",
                                                                transformOrigin:
                                                                    "unset",
                                                                textOverflow:
                                                                    "unset",
                                                                whiteSpace:
                                                                    "unset",
                                                                overflow:
                                                                    "unset",
                                                            }}
                                                        >
                                                            Total
                                                        </InputLabel>
                                                    </Grid>
                                                    <Grid
                                                        item
                                                        xs={2.8}
                                                        sx={{
                                                            paddingInline: 0.3,
                                                        }}
                                                        // sm={9}
                                                    >
                                                        <BaseTextInput
                                                            textAlign="right"
                                                            // id="total"
                                                            name={
                                                                "chiffre_affaire_an1.total_service"
                                                            }
                                                            label={"Total"}
                                                            customValue={
                                                                totalServices
                                                            }
                                                            // width={"15"}
                                                            readOnly
                                                        />
                                                    </Grid>
                                                    <Grid item xs={8.7}>
                                                        <InputLabel
                                                            // shrink
                                                            htmlFor="bootstrap-input"
                                                            sx={{
                                                                // padding: "0 20px 0 0",
                                                                // backgroundColor: "red",
                                                                marginRight: 1,
                                                                paddingRight: 1,
                                                                fontFamily:
                                                                    "inherit",
                                                                fontSize: 16,
                                                                fontWeight:
                                                                    "500",
                                                                // width: "30%",
                                                                lineHeight:
                                                                    "unset",
                                                                transformOrigin:
                                                                    "unset",
                                                                textOverflow:
                                                                    "unset",
                                                                whiteSpace:
                                                                    "unset",
                                                                overflow:
                                                                    "unset",
                                                            }}
                                                        >
                                                            % d'augmentation du
                                                            chiffre d'affaire
                                                            entre l'année 1 et
                                                            l'année 2
                                                        </InputLabel>
                                                    </Grid>
                                                    <Grid
                                                        item
                                                        xs={2.8}
                                                        // sm={9}
                                                    >
                                                        <BaseTextInput
                                                            textAlign="right"
                                                            // id="total"
                                                            name={
                                                                "chiffre_affaire_an1.augmentation_services1"
                                                            }
                                                            label={"Total"}
                                                            customValue={
                                                                totalServices
                                                            }
                                                            // width={"15"}
                                                        />
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </div>
                                <div id="charges-variable">
                                    <Grid
                                        // rowSpacing={3}
                                        // columnSpacing={6}
                                        // container
                                        sx={{ py: 3 }}
                                        // xs={12}
                                    >
                                        <Typography variant="h6" gutterBottom>
                                            Vos charges Variables
                                        </Typography>
                                    </Grid>
                                    <Typography
                                        variant="body1"
                                        align="center"
                                        sx={{
                                            marginBottom: 6,
                                        }}
                                    >
                                        Les charges variables sont liées au
                                        niveau d’activité ou à la production. Il
                                        s’agit des achats de marchandises
                                        destinées à être revendues, des achats
                                        de matières destinées à être
                                        transformées, des commissions versées à
                                        des agents commerciaux…
                                    </Typography>
                                    <Grid
                                        container
                                        columnGap={0.3}
                                        alignItems={"center"}
                                        // sx={{
                                        //     padding: 2,
                                        //     marginBlock: 2,
                                        //     marginInline: -1,
                                        //     borderRadius: 0.5,
                                        //     background: alpha(
                                        //         theme.palette.success.light,
                                        //         0.2
                                        //     ),
                                        // }}
                                    >
                                        <Grid
                                            item
                                            xs={12}
                                            // sm={9}
                                        >
                                            <InlineTextField
                                                id="charge_variables_%"
                                                name="pourcentage_vente_cout_achat"
                                                label="% pris de vente, le cout d'achat de marchandises"
                                                // fullWidth
                                                width={"15"}
                                                comment={
                                                    " concerne uniquement le chiffre d'affaires vente de marchandises"
                                                }
                                            />
                                        </Grid>
                                    </Grid>
                                </div>
                                <div id="besoin-fonds-roulement">
                                    <Grid
                                        // rowSpacing={3}
                                        // columnSpacing={6}
                                        // container
                                        sx={{ py: 3 }}
                                        // xs={12}
                                    >
                                        <Typography variant="h6" gutterBottom>
                                            Votre besoin en fonds de roulement :
                                        </Typography>
                                    </Grid>
                                    <Grid
                                        container
                                        columnGap={0.3}
                                        alignItems={"center"}
                                        // sx={{
                                        //     padding: 2,
                                        //     marginBlock: 2,
                                        //     marginInline: -1,
                                        //     borderRadius: 0.5,
                                        //     background: alpha(
                                        //         theme.palette.success.light,
                                        //         0.2
                                        //     ),
                                        // }}
                                    >
                                        <Grid
                                            item
                                            xs={12}
                                            // sm={9}
                                        >
                                            <InlineTextField
                                                // id="charge_variables_%"
                                                name="duree_credits_clients"
                                                label="Durée moyenne des crédits accordés aux clients en jours"
                                                // fullWidth
                                                width={"15"}
                                                comment={
                                                    "temps qu'un client met pour vous payer"
                                                }
                                            />
                                        </Grid>
                                        <Grid
                                            item
                                            xs={12}
                                            // sm={9}
                                        >
                                            <InlineTextField
                                                // id="charge_variables_%"
                                                name="duree_dettes_fournisseurs"
                                                label="Durée moyenne des crédits accordés aux clients en jours"
                                                // fullWidth
                                                width={"15"}
                                                comment={
                                                    "temps que vous mettez pour payer un fournisseur"
                                                }
                                            />
                                        </Grid>
                                    </Grid>
                                </div>
                                <div id="salaires">
                                    <Grid
                                        rowSpacing={3}
                                        // columnSpacing={6}
                                        // container
                                        sx={{ py: 3 }}
                                        // xs={12}
                                    >
                                        <Typography variant="h6" gutterBottom>
                                            Salaires employés et rémunération
                                            chef d'entreprise
                                        </Typography>
                                    </Grid>
                                    <Grid
                                        container
                                        columnGap={0.3}
                                        alignItems={"center"}
                                        sx={{
                                            padding: 2,
                                            marginBlock: 2,
                                            marginInline: -1,
                                            borderRadius: 0.5,
                                            background: alpha(
                                                theme.palette.success.light,
                                                0.2
                                            ),
                                        }}
                                    >
                                        <Grid item xs={3}></Grid>
                                        <Grid
                                            item
                                            xs={1.7}
                                            // sm={9}
                                        >
                                            <Typography
                                                variant="subtitle2"
                                                textAlign={"center"}
                                            >
                                                Anneé 1
                                            </Typography>
                                        </Grid>
                                        <Grid
                                            item
                                            xs={1.7}
                                            // sm={9}
                                        >
                                            <Typography
                                                variant="subtitle2"
                                                textAlign={"center"}
                                            >
                                                Anneé 2
                                            </Typography>
                                        </Grid>
                                        <Grid
                                            item
                                            xs={1.7}
                                            // sm={9}
                                        >
                                            <Typography
                                                variant="subtitle2"
                                                textAlign={"center"}
                                            >
                                                Anneé 3
                                            </Typography>
                                        </Grid>
                                        <Grid
                                            item
                                            xs={1.7}
                                            // sm={9}
                                        >
                                            <Typography
                                                variant="subtitle2"
                                                textAlign={"center"}
                                            >
                                                Anneé 4
                                            </Typography>
                                        </Grid>
                                        <Grid
                                            item
                                            xs={1.7}
                                            // sm={9}
                                        >
                                            <Typography
                                                variant="subtitle2"
                                                textAlign={"center"}
                                            >
                                                Anneé 5
                                            </Typography>
                                        </Grid>
                                    </Grid>

                                    <Grid
                                        container
                                        columnGap={0.2}
                                        rowSpacing={1}
                                        alignItems={"center"}
                                        // key={name}
                                        // sx={{
                                        //     marginBottom: 2,
                                        // }}
                                    >
                                        <Grid
                                            item
                                            xs={3}
                                            // sm={9}
                                        >
                                            <InputLabel
                                                // shrink
                                                htmlFor="bootstrap-input"
                                                sx={{
                                                    // padding: "0 20px 0 0",
                                                    // backgroundColor: "red",
                                                    marginRight: 1,
                                                    paddingRight: 1,
                                                    fontFamily: "inherit",
                                                    fontSize: 16,
                                                    fontWeight: "500",
                                                    // width: "30%",
                                                    lineHeight: "unset",
                                                    transformOrigin: "unset",
                                                    textOverflow: "unset",
                                                    whiteSpace: "unset",
                                                    overflow: "unset",
                                                }}
                                            >
                                                Salaires employés (net)
                                            </InputLabel>
                                        </Grid>
                                        <Grid
                                            item
                                            xs={1.7}
                                            sx={{
                                                paddingInline: 0.3,
                                            }}
                                            // sm={9}
                                        >
                                            <BaseTextInput
                                                // id={n:ame}
                                                name="salaires_employes[0]"
                                                width={"15"}
                                                textAlign="right"
                                                // fullWidth
                                                // comment={
                                                //     "Nom de votre projet ou description de votre activité"
                                                // }
                                            />
                                        </Grid>
                                        <Grid
                                            item
                                            xs={1.7}
                                            sx={{
                                                paddingInline: 0.3,
                                            }}
                                            // sm={9}
                                        >
                                            <BaseTextInput
                                                name="salaires_employes[1]"
                                                width={"15"}
                                                textAlign="right"
                                                // fullWidth
                                                // comment={
                                                //     "Nom de votre projet ou description de votre activité"
                                                // }
                                            />
                                        </Grid>{" "}
                                        <Grid
                                            item
                                            xs={1.7}
                                            sx={{
                                                paddingInline: 0.3,
                                            }}
                                            // sm={9}
                                        >
                                            <BaseTextInput
                                                name="salaires_employes[2]"
                                                width={"15"}
                                                textAlign="right"
                                                // fullWidth
                                                // comment={
                                                //     "Nom de votre projet ou description de votre activité"
                                                // }
                                            />
                                        </Grid>
                                        <Grid
                                            item
                                            xs={1.7}
                                            sx={{
                                                paddingInline: 0.3,
                                            }}
                                            // sm={9}
                                        >
                                            <BaseTextInput
                                                name="salaires_employes[3]"
                                                width={"15"}
                                                textAlign="right"
                                                // fullWidth
                                                // comment={
                                                //     "Nom de votre projet ou description de votre activité"
                                                // }
                                            />
                                        </Grid>
                                        <Grid
                                            item
                                            xs={1.7}
                                            sx={{
                                                paddingInline: 0.3,
                                            }}
                                            // sm={9}
                                        >
                                            <BaseTextInput
                                                name="salaires_employes[4]"
                                                width={"15"}
                                                textAlign="right"
                                                // fullWidth
                                                // comment={
                                                //     "Nom de votre projet ou description de votre activité"
                                                // }
                                            />
                                        </Grid>
                                        <Grid
                                            item
                                            xs={3}
                                            // sm={9}
                                        >
                                            <InputLabel
                                                // shrink
                                                htmlFor="bootstrap-input"
                                                sx={{
                                                    // padding: "0 20px 0 0",
                                                    // backgroundColor: "red",
                                                    marginRight: 1,
                                                    paddingRight: 1,
                                                    fontFamily: "inherit",
                                                    fontSize: 16,
                                                    fontWeight: "500",
                                                    // width: "30%",
                                                    lineHeight: "unset",
                                                    transformOrigin: "unset",
                                                    textOverflow: "unset",
                                                    whiteSpace: "unset",
                                                    overflow: "unset",
                                                }}
                                            >
                                                Rémunération nette dirigeant(s)
                                            </InputLabel>
                                        </Grid>
                                        <Grid
                                            item
                                            xs={1.7}
                                            sx={{
                                                paddingInline: 0.3,
                                            }}
                                            // sm={9}
                                        >
                                            <BaseTextInput
                                                // id={n:ame}
                                                name="remuneration_dirigeants[0]"
                                                width={"15"}
                                                textAlign="right"
                                                // fullWidth
                                                // comment={
                                                //     "Nom de votre projet ou description de votre activité"
                                                // }
                                            />
                                        </Grid>
                                        <Grid
                                            item
                                            xs={1.7}
                                            sx={{
                                                paddingInline: 0.3,
                                            }}
                                            // sm={9}
                                        >
                                            <BaseTextInput
                                                name="remuneration_dirigeants[1]"
                                                width={"15"}
                                                textAlign="right"
                                                // fullWidth
                                                // comment={
                                                //     "Nom de votre projet ou description de votre activité"
                                                // }
                                            />
                                        </Grid>{" "}
                                        <Grid
                                            item
                                            xs={1.7}
                                            sx={{
                                                paddingInline: 0.3,
                                            }}
                                            // sm={9}
                                        >
                                            <BaseTextInput
                                                name="remuneration_dirigeants[2]"
                                                width={"15"}
                                                textAlign="right"
                                                // fullWidth
                                                // comment={
                                                //     "Nom de votre projet ou description de votre activité"
                                                // }
                                            />
                                        </Grid>
                                        <Grid
                                            item
                                            xs={1.7}
                                            sx={{
                                                paddingInline: 0.3,
                                            }}
                                            // sm={9}
                                        >
                                            <BaseTextInput
                                                name="remuneration_dirigeants[3]"
                                                width={"15"}
                                                textAlign="right"
                                                // fullWidth
                                                // comment={
                                                //     "Nom de votre projet ou description de votre activité"
                                                // }
                                            />
                                        </Grid>
                                        <Grid
                                            item
                                            xs={1.7}
                                            sx={{
                                                paddingInline: 0.3,
                                            }}
                                            // sm={9}
                                        >
                                            <BaseTextInput
                                                name="remuneration_dirigeants[5]"
                                                width={"15"}
                                                textAlign="right"
                                                // fullWidth
                                                // comment={
                                                //     "Nom de votre projet ou description de votre activité"
                                                // }
                                            />
                                        </Grid>
                                        <Grid
                                            item
                                            xs={12}
                                            // sm={9}
                                        >
                                            <InlineSelectField
                                                options={["Non", "Oui"]}
                                                id="dir_ACCRE"
                                                name="dir_ACCRE"
                                                label="Le(s) dirigeant(s) bénéficient-ils de l'ACCRE ? *"
                                                width="15"
                                                // fullWidth
                                            />
                                        </Grid>
                                    </Grid>
                                </div>
                                <div id="rentabilite">
                                    <Grid
                                        // rowSpacing={3}
                                        // columnSpacing={6}
                                        // container
                                        sx={{ py: 3 }}
                                        // xs={12}
                                    >
                                        <Typography variant="h6" gutterBottom>
                                            Contrôle de votre seuil de
                                            rentabilité
                                        </Typography>
                                    </Grid>

                                    <Grid
                                        container
                                        columnGap={0.3}
                                        alignItems={"center"}
                                        // sx={{
                                        //     padding: 2,
                                        //     marginBlock: 2,
                                        //     marginInline: -1,
                                        //     borderRadius: 0.5,
                                        //     background: alpha(
                                        //         theme.palette.success.light,
                                        //         0.2
                                        //     ),
                                        // }}
                                    >
                                        <Grid
                                            item
                                            xs={12}
                                            // sm={9}
                                        >
                                            <InlineTextField
                                                // id="charge_variables_%"
                                                name="rentabilite"
                                                label="D'après les éléments que vous avez indiqués, votre projet est "
                                                // fullWidth
                                                readOnly
                                                customValue={"Rentable"}
                                                width={"15"}
                                            />
                                        </Grid>
                                    </Grid>
                                </div>
                                <div id="rentabilite">
                                    <Grid
                                        // rowSpacing={3}
                                        // columnSpacing={6}
                                        // container
                                        sx={{ py: 3 }}
                                        // xs={12}
                                    >
                                        <Typography variant="h6" gutterBottom>
                                            Contrôle du niveau de votre
                                            trésorerie de départ
                                        </Typography>
                                    </Grid>

                                    <Grid
                                        container
                                        columnGap={0.3}
                                        alignItems={"center"}
                                        // sx={{
                                        //     padding: 2,
                                        //     marginBlock: 2,
                                        //     marginInline: -1,
                                        //     borderRadius: 0.5,
                                        //     background: alpha(
                                        //         theme.palette.success.light,
                                        //         0.2
                                        //     ),
                                        // }}
                                    >
                                        <Grid
                                            item
                                            xs={12}
                                            // sm={9}
                                        >
                                            <InlineTextField
                                                // id="charge_variables_%"
                                                name="niveau_tresorie"
                                                label="D'après les éléments que vous avez indiqués, votre trésorerie de départ est"
                                                // fullWidth
                                                readOnly
                                                customValue={"Trop faible"}
                                                width={"15"}
                                            />
                                        </Grid>
                                    </Grid>
                                </div>
                                <ButtonContainerFloatRight>
                                    <Button
                                        variant="contained"
                                        size="large"
                                        type="submit"
                                    >
                                        Submit
                                    </Button>
                                </ButtonContainerFloatRight>
                            </Form>
                        </Box>{" "}
                        <Box>
                            <QuikFormMenu />
                        </Box>
                    </Box>
                );
            }}
        </Formik>
    );
};

export default Demo;

const besoinDemarageDataArray = [
    {
        name: "frais_etablissement",
        label: "Frais d’établissement",
        comment: "Ce sont les frais de création de l’entreprise (formalités)",
    },
    {
        name: "frais_compteurs",
        comment: "Compteurs d'eau, électricité, gaz…",
        label: "Frais d’ouverture de compteurs",
    },
    {
        name: "frais_logiciels",
        comment: "",
        label: "Logiciels, formations",
    },
    {
        name: "frais_marque",
        comment: "Frais de dépôt ou d’enregistrement",
        label: "Dépôt marque, brevet, modèle",
    },
    {
        name: "frais_droit_entree",
        comment: "Par exemple pour intégrer un réseau de franchise",
        label: "Droits d’entrée",
    },
    {
        name: "achat_fonds_de_commerce",
        comment: "Dans le cas d'une reprise",
        label: "Achat fonds de commerce ou parts",
    },
    {
        name: "droit_au_bail",
        comment: "",
        label: "Droit au bail",
    },
    {
        name: "depot_garantie",
        comment: "",
        label: "Caution ou dépôt de garantie",
    },
    {
        name: "frais_dossier",
        comment: "Pour la signature de contrats de prêt",
        label: "Frais de dossier",
    },
    {
        name: "frais_avocat",
        comment: "Pour la signature des contrats et baux commerciaux",
        label: "Frais de notaire ou d’avocat",
    },
    {
        name: "frais_communication",
        comment:
            "Cartes de visite, brochures, logo, site internet, éléments graphiques",
        label: "Enseigne et éléments de communication",
    },
    {
        name: "achat_immobilier",
        comment: "Acquisition d'immeuble",
        label: "Achat immobilier",
    },
    {
        name: "frais_travaux",
        comment: "Pour l'aménagement du local",
        label: "Travaux et aménagements",
    },
    {
        name: "frais_materiel",
        comment: "Matériel, outillage, machines, véhicules…",
        label: "Matériel",
    },
    {
        name: "frais_materiel_bureau",
        comment: "Fournitures, ordinateur, imprimante",
        label: "Matériel de bureau",
    },
    {
        name: "frais_stock",
        comment: "Matières premières, produits finis ou semi-finis",
        label: "Stock de matières et produits",
    },
    {
        name: "tresorie_de_depart",
        comment:
            "Somme d’argent gardée en prévision du démarrage de l’activité pour financer le cycle d'exploitation",
        label: "Trésorerie de départ",
    },
];
const chargesFixesDataArray = [
    {
        name: "assurances",
        label: "Assurances",
        comment: "Ce sont les frais de création de l’entreprise (formalités)",
    },
    {
        name: "telephone_internet",
        comment: "Compteurs d'eau, électricité, gaz…",
        label: "Téléphone, internet",
    },
    {
        name: "autres_abonnements",
        comment: "Frais de dépôt ou d’enregistrement",
        label: "Autres abonnements",
    },
    {
        name: "carburant_transports",
        comment: "Par exemple pour intégrer un réseau de franchise",
        label: "Carburant, transports",
    },
    {
        name: "frais_deplacement_hebergement",
        comment: "Dans le cas d'une reprise",
        label: "Frais de déplacement et hébergement",
    },
    {
        name: "Eau_electricite_gaz",
        comment: "",
        label: "Eau, électricité, gaz",
    },
    {
        name: "mutuellee",
        comment: "",
        label: "Mutuelle",
    },
    {
        name: "entretien_vehicule",
        comment: "Pour la signature de contrats de prêt",
        label: "Entretien du véhicule",
    },
    {
        name: "nettoyage_locaux",
        comment: "Pour la signature des contrats et baux commerciaux",
        label: "Nettoyage des locaux",
    },
    {
        name: "publicite_communication",
        comment: "Acquisition d'immeuble",
        label: "Budget publicité et communication",
    },
    {
        name: "loyer",
        comment: "Pour l'aménagement du local",
        label: "Loyer et charges locatives",
    },
    {
        name: "comptable_avocats",
        comment: "Matériel, outillage, machines, véhicules…",
        label: "Expert comptable, avocats",
    },
    {
        name: "frais_bancaires",
        comment: "Fournitures, ordinateur, imprimante",
        label: "Frais bancaires et terminal carte bleue",
    },
    {
        name: "impôt_taxes",
        comment: "Matières premières, produits finis ou semi-finis",
        label: "Impôt et Taxes, CFE",
    },
];
const monthsDataArray = [
    {
        label: "Mois 1",
        name: "mois1",
    },
    {
        name: "Mois 2",
        label: "mois2",
    },
    {
        label: "Mois 3",
        name: "mois3",
    },
    {
        label: "Mois 4",
        name: "mois4",
    },
    {
        label: "Mois 5",
        name: "mois5",
    },
    {
        label: "Mois 6",
        name: "mois6",
    },
    {
        label: "Mois 7",
        name: "mois7",
    },
    {
        label: "Mois 8",
        name: "mois8",
    },
    {
        label: "Mois 9",
        name: "mois9",
    },
    {
        label: "Mois 10",
        name: "mois10",
    },
    {
        label: "Mois 11",
        name: "mois11",
    },
    {
        label: "Mois 12",
        name: "mois12",
    },
];
