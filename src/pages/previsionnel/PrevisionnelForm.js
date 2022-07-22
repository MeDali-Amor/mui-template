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
import InlineSelectField from "../../components/InlineSelectField";
import InlineTextField from "../../components/InlineTextFeild";
import { useFormikContext } from "formik";
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
    // const { values } = useFormikContext();
    const [sign, setSign] = useState(window.innerWidth);
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [alertType, setAlertType] = useState("info");
    const [msg, setMsg] = useState("");
    const [total, setTotal] = useState(0);
    const [errorForm, setErrorForm] = useState("");

    const sumValues = (value) => {
        let sum = total;
        if (Number(value)) sum += Number(value);
        setTotal(sum);
    };
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
                            total: 0,
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
                        <Grid container rowSpacing={2} columnSpacing={0}>
                            <Grid item xs={12} sm={8}>
                                <InlineTextField
                                    id="prenom"
                                    name="prenom"
                                    label="Prenom"
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={12} sm={8}>
                                <InlineTextField
                                    id="nom"
                                    name="nom"
                                    label="Nom"
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={12} sm={8}>
                                <InlineTextField
                                    id="nom_projet"
                                    name="nom_projet"
                                    label="Intitulé du projet"
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <Typography
                                    variant="body2"
                                    align="left"
                                    sx={{ marginTop: "10px" }}
                                >
                                    (Nom de votre projet ou description de votre
                                    activité )
                                </Typography>
                            </Grid>
                            {/* */}
                            <Grid item xs={12} sm={8}>
                                <InlineSelectField
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
                            <Grid item xs={12} sm={8}>
                                <InlineTextField
                                    id="email"
                                    name="email"
                                    label="Email"
                                    fullWidth
                                    //   customValue={dirigTel}
                                    //   setCustomValue={setDirigTel}
                                />
                            </Grid>
                            <Grid item xs={12} sm={8}>
                                <InlineTextField
                                    id="num_telephone"
                                    name="num_telephone"
                                    label="Téléphone"
                                    fullWidth
                                    //   customValue={dirigTel}
                                    //   setCustomValue={setDirigTel}
                                />
                            </Grid>
                            <Grid item xs={12} sm={8}>
                                <InlineTextField
                                    id="code_postal"
                                    name="code_postal"
                                    label="Code Postal"
                                    fullWidth
                                    autoComplete="billing postal-code"
                                    //   handleChange={handleAdressChange}
                                />
                            </Grid>
                            <Grid item xs={12} sm={8}>
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
                            <Grid item xs={12} sm={8}>
                                <InlineSelectField
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
                        <Grid container rowSpacing={2} columnSpacing={0}>
                            {besoinDemarageDataArray.map((item) => (
                                <Grid
                                    container
                                    rowSpacing={2}
                                    columnSpacing={0}
                                    key={item.name}
                                >
                                    <Grid item xs={12} sm={8}>
                                        <InlineTextField
                                            id={item.name}
                                            name={`besoin_demarage.${item.name}`}
                                            label={item.label}
                                            fullWidth
                                            handleChange={(e) =>
                                                sumValues(e.target.value)
                                            }
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={4}>
                                        <Typography
                                            variant="body2"
                                            align="left"
                                            sx={{ marginTop: "10px" }}
                                        >
                                            {item.comment &&
                                                `(${item.comment})`}
                                        </Typography>
                                    </Grid>
                                </Grid>
                                //   Durée d'amortissement des investissements :
                            ))}
                            <Grid item xs={12} sm={8}>
                                <InlineTextField
                                    id="total"
                                    name={"besoin_demarage.total"}
                                    label={"Total"}
                                    customValue={total}
                                    readOnly
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={12} sm={8}>
                                <InlineTextField
                                    id="duree_amortissement"
                                    name="duree_amortissement"
                                    label={
                                        "Durée d'amortissement des investissements *"
                                    }
                                />
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <Typography
                                    variant="body2"
                                    align="left"
                                    sx={{ marginTop: "10px" }}
                                >
                                    (durée de vie des acquisitions de départ, en
                                    années)
                                </Typography>
                            </Grid>
                        </Grid>
                    </FormStep>
                </MultiStepForm>
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
