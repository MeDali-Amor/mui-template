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
                    autres_frais: [],
                },
                financement_demarage: {
                    apport_personnel: "",
                    apports_en_nature: "",
                    pret_1: { montant: "", taux: "", duree_en_mois: "" },
                    pret_2: { montant: "", taux: "", duree_en_mois: "" },
                    pret_3: { montant: "", taux: "", duree_en_mois: "" },
                    subvention_1: "",
                    subvention_2: "",
                    financement_total: 0,
                },
                charges_fixes: {
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
                    total_charges_fixes: 0,
                },
            }}
            validationSchema={besoinDemarageValidation}
            onSubmit={(values) => handleSubmit(values)}
        >
            {(formik) => {
                const { total, autres_frais, ...values } =
                    formik.values.besoin_demarage;
                const { financement_total, ...other } =
                    formik.values.financement_demarage;
                let otherValues = autres_frais
                    ?.map((el) => Number(el.montant))
                    .filter((v) => typeof Number(v) == "number");
                const valuesToBeSummed = Object.values(values)
                    .filter((v) => typeof Number(v) == "number" && v !== NaN)
                    .concat(otherValues);
                // console.log(otherValues);

                const sumTotal = valuesToBeSummed.reduce(
                    (previousValue, currentValue) =>
                        Number(previousValue) + Number(currentValue),
                    0
                );
                const finance_values = Object.values(other).map((v) => {
                    if (typeof v === "object") return v.montant;
                    return v;
                });
                console.log(finance_values, valuesToBeSummed);
                // .filter((v) => typeof Number(v) == "number" && v !== "NaN");

                const financement_sum = finance_values.reduce(
                    (previousValue, currentValue) =>
                        Number(previousValue) + Number(currentValue),
                    0
                );
                console.log(other);

                return (
                    <Box
                        sx={{
                            padding: 4,
                            display: "flex",
                            flexDirection: "row",
                            scrollBehavior: "smooth",
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
                                                    theme.palette.primary.light,
                                                    0.3
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
                                                                    sx={{
                                                                        marginBottom: 2,
                                                                    }}
                                                                    key={index}
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
                                                theme.palette.primary.light,
                                                0.3
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
                                                xs={3.5}
                                                // sm={9}
                                            >
                                                {" "}
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
                                                        transformOrigin:
                                                            "unset",
                                                        textOverflow: "unset",
                                                        whiteSpace: "unset",
                                                        overflow: "unset",
                                                    }}
                                                >
                                                    Prêt n°1(nom de la banque)
                                                </InputLabel>
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
                                            columnGap={1.8}
                                            alignItems={"center"}
                                            // sx={{
                                            //     marginBottom: 2,
                                            // }}
                                        >
                                            <Grid
                                                item
                                                xs={3.5}
                                                // sm={9}
                                            >
                                                {" "}
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
                                                        transformOrigin:
                                                            "unset",
                                                        textOverflow: "unset",
                                                        whiteSpace: "unset",
                                                        overflow: "unset",
                                                    }}
                                                >
                                                    Prêt n°2(nom de la banque)
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
                                                xs={3.5}
                                                // sm={9}
                                            >
                                                {" "}
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
                                                        transformOrigin:
                                                            "unset",
                                                        textOverflow: "unset",
                                                        whiteSpace: "unset",
                                                        overflow: "unset",
                                                    }}
                                                >
                                                    Prêt n°3 (nom de la banque)
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
                                        sx={{
                                            padding: 2,
                                            marginBlock: 2,
                                            marginInline: -1,
                                            borderRadius: 0.5,
                                            background: alpha(
                                                theme.palette.primary.light,
                                                0.3
                                            ),
                                        }}
                                    >
                                        <Grid item xs={3}></Grid>
                                        <Grid
                                            item
                                            xs={1.8}
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
                                            xs={1.8}
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
                                            xs={1.8}
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
                                            xs={1.8}
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
                                            xs={1.8}
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
                                                    columnGap={1}
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
                                                        // sm={9}
                                                    >
                                                        <BaseTextInput
                                                            id={name}
                                                            name={`charges_fixes.annee1.${name}`}
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
                                        <Grid
                                            container
                                            columnGap={1}
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
                                                // sm={9}
                                            >
                                                <BaseTextInput
                                                    // id={name}
                                                    name={`charges_fixes.annee1.total_charges_fixes`}
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
                                                // sm={9}
                                            >
                                                <BaseTextInput
                                                    // id={name}
                                                    name={`charges_fixes.annee2.total_charges_fixes`}
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
                                                // sm={9}
                                            >
                                                <BaseTextInput
                                                    // id={name}
                                                    name={`charges_fixes.annee3.total_charges_fixes`}
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
                                                // sm={9}
                                            >
                                                <BaseTextInput
                                                    // id={name}
                                                    name={`charges_fixes.annee4.total_charges_fixes`}
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
                                                // sm={9}
                                            >
                                                <BaseTextInput
                                                    // id={name}
                                                    name={`charges_fixes.annee5.total_charges_fixes`}
                                                    width={"15"}
                                                    textAlign="right"
                                                    // fullWidth
                                                    // comment={
                                                    //     "Nom de votre projet ou description de votre activité"
                                                    // }
                                                />
                                            </Grid>
                                        </Grid>
                                        {/* <Grid
                                            item
                                            xs={12}
                                            // sm={9}
                                        >
                                            <InlineTextField
                                                labelAlign="right"
                                                textAlign="right"
                                                id="total_charges_fixes"
                                                name={
                                                    "charges_fixes.total_charges_fixes"
                                                }
                                                label={"Total"}
                                                customValue={financement_sum}
                                                width={"15"}
                                                readOnly
                                                fullWidth
                                            />
                                        </Grid> */}
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
