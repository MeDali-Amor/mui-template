import {
    FormControl,
    Grid,
    InputLabel,
    Stack,
    styled,
    TextField,
    Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import InputFeild from "../../components/InputFeild";
import MultiStepForm, { FormStep } from "../../components/MultiStepForm";
import CustomizedSnackbar from "../../components/Sbackbar";
import * as yup from "yup";
import SelectFeild from "../../components/SelectFeild";
import InlineTextField from "../../components/InlineTextFeild";

const besoinDemarageDataArray = [
    { name: "frais_etablissement", label: "Frais d’établissement" },
    { name: "frais_compteurs", label: "Frais d’ouverture de compteurs" },
    { name: "frais_logiciels", label: "Logiciels, formations" },
    { name: "frais_marque", label: "Dépôt marque, brevet, modèle" },
    { name: "frais_droit_entree", label: "Droits d’entrée" },
    {
        name: "achat_fonds_de_commerce",
        label: "Achat fonds de commerce ou parts",
    },
    { name: "droit_au_bail", label: "Droit au bail" },
    { name: "depot_garantie", label: "Caution ou dépôt de garantie" },
    { name: "frais_dossier", label: "Frais de dossier" },
    { name: "frais_avocat", label: "Frais de notaire ou d’avocat" },
    {
        name: "frais_communication",
        label: "Enseigne et éléments de communication",
    },
    { name: "achat_immobilier", label: "Achat immobilier" },
    { name: "frais_travaux", label: "Travaux et aménagements" },
    { name: "frais_materiel", label: "Matériel" },
    { name: "frais_materiel_bureau", label: "Matériel de bureau" },
    { name: "frais_stock", label: "Stock de matières et produits" },
    { name: "tresorie_de_depart", label: "Trésorerie de départ" },
];
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
const dureeAmortissementValidation = yup.object({
    duree_amortissement: yup
        .number()
        .integer("Durée invalide")
        .positive("Durée invalide"),
});
const validationSchema = yup.object({
    nom: yup.string(),
    prenom: yup.string(),
    email: yup.string(),
    num_telephone: yup
        .string()
        .matches(
            /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,
            "Numerp de téléphone invalide"
        ),
    activite: yup.string(),
    form_juridique: yup.string().required("Ce champ est requis"),
    nom_projet: yup.string().required("Ce champ est requis"),
    code_postal: yup
        .string()
        .matches(/^[0-9]+$/, "Doit avoir 5 chiffres")
        .min(5, "Doit avoir 5 chiffres")
        .max(5, "Doit avoir 5 chiffres"),
    commune: yup.string(),
    // nationalite: yup.string().required("Ce champ est requis"),
    adresse: yup.string(),
});
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

const PrevisionnelForm = () => {
    const [sign, setSign] = useState(window.innerWidth);
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [alertType, setAlertType] = useState("info");
    const [msg, setMsg] = useState("");
    const [errorForm, setErrorForm] = useState("");
    const handleSubmit = async (values) => {
        console.log(values);
    };
    return (
        <div>
            <Box
                sx={{
                    minHeight: "calc(100vh - 170px)",
                    height: "100%",
                    // maxWidth: 900,
                    margin: "auto",
                    py: 2,
                    px: 16,
                }}
            >
                <MultiStepForm
                    setSign={setSign}
                    loading={loading}
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
                        },
                    }}
                    onSubmit={(values) => handleSubmit(values)}
                >
                    <FormStep
                        sign={sign}
                        stepName="Bonjour"
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
                            Saisissez dans cet onglet toutes les données de
                            votre projet
                        </Typography>
                    </FormStep>
                    <FormStep
                        sign={sign}
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
                            <Grid item xs={12} sm={6}>
                                <InputFeild
                                    id="prenom"
                                    name="prenom"
                                    label="Prenom"
                                    fullWidth
                                    autoComplete="billing address-line1"
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <InlineTextField
                                    id="nom"
                                    name="nom"
                                    label="Nom"
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <InlineTextField
                                    id="nom_projet"
                                    name="nom_projet"
                                    label="Intitulé du projet"
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <SelectFeild
                                    select
                                    options={[
                                        "Micro-entreprise",
                                        "Entreprise individuelle au réel (IR)",
                                        "EURL (IS)",
                                        "SARL (IS)",
                                        "SAS (IS)",
                                        "SASU (IS)",
                                    ]}
                                    id="form_juridique"
                                    name="form_juridique"
                                    label="Statut juridique *"
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <InlineTextField
                                    id="email"
                                    name="email"
                                    label="Email"
                                    fullWidth
                                    //   customValue={dirigTel}
                                    //   setCustomValue={setDirigTel}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <InlineTextField
                                    id="num_telephone"
                                    name="num_telephone"
                                    label="Téléphone"
                                    fullWidth
                                    //   customValue={dirigTel}
                                    //   setCustomValue={setDirigTel}
                                />
                            </Grid>

                            <Grid item xs={12} sm={6}>
                                <InlineTextField
                                    id="code_postal"
                                    name="code_postal"
                                    label="Code Postal"
                                    fullWidth
                                    autoComplete="billing postal-code"
                                    //   handleChange={handleAdressChange}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <InlineTextField
                                    id="commune"
                                    name="commune"
                                    label="Votre ville ou commune d'activité"
                                    //   customValue={city ? city : ""}
                                    //   setCustomValue={setCity}
                                    fullWidth
                                    autoComplete="billing address-level2"
                                />
                            </Grid>
                            <Grid item xs={12} sm={12}>
                                <SelectFeild
                                    select
                                    options={[
                                        "Marchandises (y compris hébergement et restauration)",
                                        "Services",
                                        "Mixte",
                                    ]}
                                    id="activite"
                                    name="activite"
                                    label="Vente de marchandises ou de services"
                                    fullWidth
                                />
                            </Grid>
                            {/* <Grid item xs={12} sm={4}>
                                <InlineTextField
                                    id="nationalite"
                                    name="nationalite"
                                    label="Pays"
                                    fullWidth
                                    autoComplete="billing country"
                                />
                            </Grid> */}
                        </Grid>
                    </FormStep>
                    <FormStep
                        sign={sign}
                        stepName="Besoins de démarage"
                        onSubmit={() => console.log("step 2")}
                        validationSchema={besoinDemarageValidation}
                    >
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
                                    marginBottom: 6,
                                }}
                            >
                                Listez toutes les dépenses ou investissements
                                que vous devrez faire avant même de démarrer
                                l’activité, en hors taxes (ou TTC si vous n'êtes
                                pas soumis à la TVA)
                            </Typography>
                        </Grid>
                        <Grid container rowSpacing={3} columnSpacing={6}>
                            <Grid item xs={12} sm={12}>
                                <Stack
                                    direction="row"
                                    spacing={2}
                                    justifyContent="space-evenly"
                                    alignItems="center"
                                >
                                    <InputFeild
                                        id="duree_amortissement"
                                        name="duree_amortissement"
                                        label={
                                            "Durée d'amortissement des investissements *"
                                        }
                                    />

                                    <Typography
                                        variant="body2"
                                        align="left"
                                        sx={{
                                            width: "50%",
                                        }}
                                    >
                                        (durée de vie des acquisitions de
                                        départ, en années)
                                    </Typography>
                                </Stack>
                            </Grid>
                            {besoinDemarageDataArray.map((item) => (
                                <Grid
                                    item
                                    xs={12}
                                    sm={6}
                                    md={4}
                                    key={item.name}
                                >
                                    <InputFeild
                                        id={item.name}
                                        name={`besoin_demarage.${item.name}`}
                                        label={item.label}
                                        fullWidth
                                    />
                                </Grid>
                                //   Durée d'amortissement des investissements :
                            ))}
                        </Grid>
                    </FormStep>
                </MultiStepForm>{" "}
                {/* {errorForm && (
                  <Typography variant="subtitle1" color="red">
                      {errorForm}
                  </Typography>
              )} */}
            </Box>
            <CustomizedSnackbar
                open={open}
                setOpen={setOpen}
                alertType={alertType}
                msg={msg}
            />
        </div>
    );
};

export default PrevisionnelForm;
