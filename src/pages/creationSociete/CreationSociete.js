import { Formik } from "formik";
import { Box, Button, Grid, Paper, TextField, Typography } from "@mui/material";
import * as yup from "yup";
import InputFeild from "../../components/InputFeild";
import MultiStepForm, { FormStep } from "../../components/MultiStepForm";
import { useState } from "react";
import axios from "axios";

const validationSchema = yup.object({
    deno: yup.string().required("This field is required"),
    codepostal: yup
        .string()
        .required()
        .matches(/^[0-9]+$/, "Must be only digits")
        .min(5, "Must be exactly 5 digits")
        .max(5, "Must be exactly 5 digits"),
    commune: yup.string().required("This field is required"),
    // nationalite: yup.string().required("This field is required"),
    adresse: yup.string(),
});

const styles = (theme) => ({
    formLayout: {
        width: "auto",
        height: "100%",
        backgroundColor: "red",

        marginLeft: theme.spacing.unit * 2,
        marginRight: theme.spacing.unit * 2,
        [theme.breakpoints.up(600 + theme.spacing.unit * 2)]: {
            with: 600,
            marginLeft: "auto",
            marginRight: "auto",
        },
    },
    paper: {
        marginTop: theme.spacing.unit * 3,
        marginBottom: theme.spacing.unit * 3,
        padding: theme.spacing.unit * 2,
        [theme.breakpoints.up(600 + theme.spacing.unit * 3 * 2)]: {
            marginTop: theme.spacing.unit * 6,
            marginBottom: theme.spacing.unit * 6,
            padding: theme.spacing.unit * 3,
        },
    },
});

const CreationSociete = () => {
    const [cityData, setCityData] = useState({
        nom: "",
        code: "",
        codeDepartement: "",
        codeRegion: "",
        codesPostaux: [""],
        population: 0,
    });
    const handleChange = async (e) => {
        const query = e.target.value;
        console.log(query);
        const res = await axios.get(
            `https://geo.api.gouv.fr/communes?codePostal=${query}`
        );
        setCityData(...res.data);
        console.log(...res.data);
    };
    return (
        <div>
            <Box
                sx={{
                    minHeight: "calc(100vh - 150px)",
                    height: "100%",
                    py: 2,
                    px: 16,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <MultiStepForm
                    initialValues={{
                        deno: "",
                        commune: cityData.nom,
                        codepostal: "",
                        // nationalite: "",
                        adresse: "",
                        no: "",
                        psiret: "",
                        formejur: "",
                        tva: "",
                        dcren: "",
                        daterad: "",
                        dateimmat: "",
                    }}
                    onSubmit={(values) => {
                        console.log(values);
                    }}
                >
                    <FormStep
                        stepName="Person"
                        onSubmit={() => console.log("step 0")}
                        // validationSchema={validationSchema}
                    >
                        <Typography
                            component="h1"
                            variant="h4"
                            align="center"
                            sx={{
                                marginBlock: 4,
                            }}
                        >
                            Vous souhaitez ajouter une societé?
                        </Typography>
                        <Typography variant="body1" align="center">
                            Pour vous accompagner au mieux dans l'ajout de votre
                            societé suivez les etapes suivantes!
                        </Typography>
                    </FormStep>
                    <FormStep
                        stepName="Identification"
                        onSubmit={() => console.log("step 1")}
                        validationSchema={validationSchema}
                    >
                        <Grid
                            // rowSpacing={5}
                            // columnSpacing={6}
                            // container
                            sx={{ py: 3 }}
                            // xs={12}
                        >
                            <Typography variant="h6" gutterBottom>
                                Identification
                            </Typography>
                        </Grid>
                        <Grid container rowSpacing={5} columnSpacing={6}>
                            <Grid item xs={12}>
                                <InputFeild
                                    id="deno"
                                    name="deno"
                                    label="Denomination Sociale"
                                    fullWidth
                                    autoComplete="deno"
                                />
                            </Grid>

                            <Grid item xs={12} sm={6}>
                                <InputFeild
                                    id="codepostal"
                                    name="codepostal"
                                    label="Code Postal"
                                    fullWidth
                                    autoComplete="billing postal-code"
                                    handleChange={handleChange}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <InputFeild
                                    id="commune"
                                    name="commune"
                                    label="Ville"
                                    customValue={cityData.nom}
                                    fullWidth
                                    autoComplete="billing address-level2"
                                />
                            </Grid>
                            {/* <Grid item xs={12} sm={4}>
                                <InputFeild
                                    id="nationalite"
                                    name="nationalite"
                                    label="Pays"
                                    fullWidth
                                    autoComplete="billing country"
                                />
                            </Grid> */}
                            <Grid item xs={12}>
                                <InputFeild
                                    id="adresse"
                                    name="adresse"
                                    label="Address"
                                    fullWidth
                                    autoComplete="billing address-line1"
                                />
                            </Grid>
                        </Grid>
                    </FormStep>

                    <FormStep
                        stepName="Juridique"
                        onSubmit={() => console.log("step 2")}
                        validationSchema={yup.object({
                            no: yup
                                .string()
                                .required()
                                .matches(/^[0-9]+$/, "Must be only digits")
                                .min(9, "Must be exactly 9 digits")
                                .max(9, "Must be exactly 9 digits"),
                            psiret: yup
                                .string()
                                .required()
                                .matches(/^[0-9]+$/, "Must be only digits")
                                .min(14, "Must be exactly 14 digits")
                                .max(14, "Must be exactly 14 digits"),
                            formejur: yup
                                .string()
                                .required("This field is required"),
                            greffe: yup
                                .string()
                                .required("This field is required"),
                            tva: yup.string(),
                            dcren: yup.date(),
                            daterad: yup.date(),
                            dateimmat: yup.date(),
                        })}
                    >
                        <Typography variant="h6" gutterBottom>
                            Informations Juridique
                        </Typography>
                        <Grid container rowSpacing={5} columnSpacing={6}>
                            <Grid item xs={12} sm={6}>
                                <InputFeild
                                    id="formejur"
                                    name="formejur"
                                    label="Forme Juridique"
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <InputFeild
                                    InputLabelProps={{ shrink: true }}
                                    type={"date"}
                                    id="dcren"
                                    name="dcren"
                                    label="Date de création"
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <InputFeild
                                    id="no"
                                    name="no"
                                    label="Numero Siren"
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <InputFeild
                                    id="psiret"
                                    name="psiret"
                                    label="Numéro SIRET (siège)"
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <InputFeild
                                    id="greffe"
                                    name="greffe"
                                    label="Numéro RCS"
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <InputFeild
                                    id="tva"
                                    name="tva"
                                    label="Numéro TVA"
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <InputFeild
                                    InputLabelProps={{ shrink: true }}
                                    type={"date"}
                                    id="dateimmat"
                                    name="dateimmat"
                                    label="Date d'immatriculation RCS"
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <InputFeild
                                    InputLabelProps={{ shrink: true }}
                                    type={"date"}
                                    id="daterad"
                                    name="daterad"
                                    label="Date d'enregistrement INSEE"
                                />
                            </Grid>
                        </Grid>
                        {/* <InputFeild id="ville" name="ville" label="Ville" /> */}
                    </FormStep>
                </MultiStepForm>
            </Box>
        </div>
    );
};

export default CreationSociete;
