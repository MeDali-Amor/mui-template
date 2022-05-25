import { FieldArray, Form, Formik } from "formik";
import { Box, Button, Grid, Paper, TextField, Typography } from "@mui/material";
import * as yup from "yup";
import InputFeild from "../../components/InputFeild";
import MultiStepForm, { FormStep } from "../../components/MultiStepForm";
import { useState } from "react";
import axios from "axios";
import { Adddirig } from "./Adddirig";

const validationSchema = yup.object({
    deno: yup.string().required("Ce champ est requis"),
    codepostal: yup
        .string()
        .required()
        .matches(/^[0-9]+$/, "Doit avoir 5 chiffres")
        .min(5, "Doit avoir 5 chiffres")
        .max(5, "Doit avoir 5 chiffres"),
    commune: yup.string().required("Ce champ est requis"),
    // nationalite: yup.string().required("Ce champ est requis"),
    adresse: yup.string(),
});
const dirigeantValidationSchema = yup.object({
    detcivdir: yup.string().required("Ce champ est requis"),
    detnomdir: yup.string().required("Ce champ est requis"),
    titredirig: yup.string().required("Ce champ est requis"),
});

const dirigSchema = yup.object({
    friends: yup.array().of(dirigeantValidationSchema),
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
    const [friends, setFriends] = useState([]);
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
        if (res.data.length) setCityData(...res.data);
        else
            setCityData({
                nom: "",
                code: "",
                codeDepartement: "",
                codeRegion: "",
                codesPostaux: [""],
                population: 0,
            });
        // console.log(...res.data);
    };
    return (
        <div>
            <Box
                sx={{
                    minHeight: "calc(100vh - 170px)",
                    height: "100%",
                    py: 2,
                    px: 16,
                    // display: "flex",
                    // flexDirection: "column",
                    // justifyContent: "center",
                    // alignItems: "center",
                }}
            >
                <MultiStepForm
                    initialValues={{
                        deno: "",
                        // commune: cityData?.nom || "",
                        commune: "",
                        codepostal: "",
                        // nationalite: "",
                        adresse: "",
                        no: "",
                        psiret: "",
                        greffe: "",
                        formejur: "",
                        tva: "",
                        dcren: "",
                        daterad: "",
                        dateimmat: "",
                        apetexte: "",
                        ape: "",
                        dirig: [],
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
                                marginTop: 4,
                                marginBottom: 2,
                            }}
                        >
                            Vous souhaitez ajouter une societé?
                        </Typography>

                        <Typography
                            variant="body1"
                            align="center"
                            sx={{
                                marginBottom: 6,
                            }}
                        >
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
                        <Grid container rowSpacing={3} columnSpacing={6}>
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
                                    customValue={
                                        cityData?.nom ? cityData?.nom : ""
                                    }
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
                                .matches(/^[0-9]+$/, "Chiffres uniquement")
                                .min(9, "Doit avoir 9 chiffres")
                                .max(9, "Doit avoir 9 chiffres"),
                            psiret: yup
                                .string()
                                .required()
                                .matches(/^[0-9]+$/, "Chiffres uniquement")
                                .min(14, "Doit avoir 14 chiffres")
                                .max(14, "Doit avoir 14 chiffres"),
                            formejur: yup
                                .string()
                                .required("Ce champ est requis"),
                            greffe: yup
                                .string()
                                .required("Ce champ est requis"),
                            tva: yup.string(),
                            dcren: yup.date(),
                            daterad: yup.date(),
                            dateimmat: yup.date(),
                        })}
                    >
                        <Grid
                            // rowSpacing={3}
                            // columnSpacing={6}
                            // container
                            sx={{ py: 3 }}
                            // xs={12}
                        >
                            <Typography variant="h6" gutterBottom>
                                Informations Juridique
                            </Typography>
                        </Grid>
                        <Grid container rowSpacing={3} columnSpacing={6}>
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
                    </FormStep>
                    <FormStep
                        stepName="Activité"
                        onSubmit={() => console.log("step 3")}
                        validationSchema={yup.object({
                            apetexte: yup.string(),
                            ape: yup.string(),
                        })}
                    >
                        <Grid
                            // rowSpacing={3}
                            // columnSpacing={6}
                            // container
                            sx={{ py: 3 }}
                            // xs={12}
                        >
                            <Typography variant="h6" gutterBottom>
                                Activité
                            </Typography>
                        </Grid>

                        <Grid container rowSpacing={3} columnSpacing={6}>
                            <Grid item xs={12} sm={6}>
                                <InputFeild
                                    id="apetexte"
                                    name="apetexte"
                                    label="Activité"
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <InputFeild
                                    id="ape"
                                    name="ape"
                                    label="Code APE"
                                    fullWidth
                                />
                            </Grid>
                        </Grid>
                    </FormStep>
                    <FormStep
                        stepName="Dirigeant"
                        onSubmit={() => console.log("step 4")}
                        validationSchema={dirigSchema}
                    >
                        {/* <Adddirig /> */}
                        <FieldArray name="dirig">
                            {(fiedArrayProps) => {
                                // console.log(fiedArrayProps);
                                const { push, remove, form } = fiedArrayProps;
                                const { values } = form;
                                const { dirig } = values;
                                return (
                                    <Box
                                        sx={{
                                            position: "relative",
                                        }}
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
                                                gutterBottom
                                            >
                                                Dirigeants
                                            </Typography>
                                        </Grid>
                                        {dirig && dirig.length > 0
                                            ? dirig.map((el, index) => (
                                                  <Grid
                                                      container
                                                      rowSpacing={3}
                                                      columnSpacing={6}
                                                      key={index}
                                                  >
                                                      <Grid item xs={12} sm={2}>
                                                          <InputFeild
                                                              id="detcivdir"
                                                              name={`dirig[${index}].detcivdir`}
                                                              label="civilité"
                                                              fullWidth
                                                          />
                                                      </Grid>
                                                      <Grid item xs={12} sm={4}>
                                                          <InputFeild
                                                              id="detnomdir"
                                                              name={`dirig[${index}].detnomdir`}
                                                              label="Nom"
                                                              fullWidth
                                                          />
                                                      </Grid>
                                                      <Grid item xs={12} sm={4}>
                                                          <InputFeild
                                                              id="titredirig"
                                                              name={`dirig[${index}].titredirig`}
                                                              label="Type"
                                                              fullWidth
                                                          />
                                                      </Grid>
                                                      <Grid item xs={12} sm={2}>
                                                          <Button
                                                              sx={{
                                                                  "&.MuiButton-outlinedError":
                                                                      {
                                                                          border: "2px solid",
                                                                      },
                                                              }}
                                                              variant="outlined"
                                                              color="error"
                                                              onClick={() =>
                                                                  remove(index)
                                                              } // remove a friend from the list
                                                          >
                                                              -
                                                          </Button>
                                                      </Grid>
                                                  </Grid>
                                              ))
                                            : null}
                                        <Button
                                            size="small"
                                            sx={{
                                                position: "absolute",
                                                marginTop: 3,
                                                top: 0,
                                                right: 0,
                                                "&.MuiButton-outlinedSecondary":
                                                    {
                                                        border: "2px solid",
                                                    },
                                            }}
                                            variant="outlined"
                                            color="secondary"
                                            onClick={() =>
                                                push({
                                                    detcivdir: "",
                                                    detnomdir: "",
                                                    titredirig: "",
                                                })
                                            }
                                        >
                                            {/* show this when user has removed all friends from the list */}
                                            Ajouter un Dirigeant
                                        </Button>
                                    </Box>
                                );
                            }}
                        </FieldArray>
                    </FormStep>
                </MultiStepForm>
            </Box>
        </div>
    );
};
export default CreationSociete;
