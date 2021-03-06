import { Box, Button, Grid, styled, Typography } from "@mui/material";
import { Form, Formik } from "formik";
import React from "react";
import InlineSelectField from "../../components/InlineSelectField";
import InlineTextField from "../../components/InlineTextFeild";
import * as yup from "yup";

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
                },
            }}
            validationSchema={besoinDemarageValidation}
            onSubmit={(values) => handleSubmit(values)}
        >
            {(formik) => {
                const { total, ...values } = formik.values.besoin_demarage;
                const valuesToBeSummed = Object.values(values).filter(
                    (v) => typeof Number(v) === "number"
                );

                const sumTotal = valuesToBeSummed.reduce(
                    (previousValue, currentValue) =>
                        Number(previousValue) + Number(currentValue),
                    0
                );
                console.log(sumTotal);

                return (
                    <Box sx={{ padding: 4 }}>
                        <Form>
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
                            <Grid container rowSpacing={1} columnSpacing={0}>
                                <Grid item xs={12} sm={9}>
                                    <InlineTextField
                                        id="prenom"
                                        name="prenom"
                                        label="Prenom"
                                        // fullWidth
                                    />
                                </Grid>
                                <Grid item xs={12} sm={9}>
                                    <InlineTextField
                                        id="nom"
                                        name="nom"
                                        label="Nom"
                                        // fullWidth
                                    />
                                </Grid>
                                <Grid item xs={12} sm={9}>
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

                                <Grid item xs={12} sm={9}>
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
                                <Grid item xs={12} sm={9}>
                                    <InlineTextField
                                        id="email"
                                        name="email"
                                        label="Email"
                                        // fullWidt
                                    />
                                </Grid>
                                <Grid item xs={12} sm={9}>
                                    <InlineTextField
                                        id="num_telephone"
                                        name="num_telephone"
                                        label="Téléphone"
                                        // fullWidth
                                    />
                                </Grid>
                                <Grid item xs={12} sm={9}>
                                    <InlineTextField
                                        id="code_postal"
                                        name="code_postal"
                                        label="Code Postal"
                                        // fullWidth
                                        autoComplete="billing postal-code"
                                    />
                                </Grid>
                                <Grid item xs={12} sm={9}>
                                    <InlineTextField
                                        id="commune"
                                        name="commune"
                                        label="Votre ville ou commune d'activité"
                                        // fullWidth
                                        autoComplete="billing address-level2"
                                    />
                                </Grid>
                                <Grid item xs={12} sm={9}>
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
                                        marginBottom: 6,
                                    }}
                                >
                                    Listez toutes les dépenses ou
                                    investissements que vous devrez faire avant
                                    même de démarrer l’activité, en hors taxes
                                    (ou TTC si vous n'êtes pas soumis à la TVA)
                                </Typography>
                            </Grid>
                            <Grid container rowSpacing={2} columnSpacing={0}>
                                <Grid item xs={12} sm={2.8}></Grid>
                                <Grid item xs={12} sm={9}>
                                    <Typography variant="subtitle1">
                                        Montant
                                    </Typography>
                                </Grid>
                                {besoinDemarageDataArray.map((item) => (
                                    <Grid
                                        container
                                        rowSpacing={2}
                                        columnSpacing={0}
                                        key={item.name}
                                    >
                                        <Grid item xs={12} sm={9}>
                                            <InlineTextField
                                                textAlign="right"
                                                id={item.name}
                                                name={`besoin_demarage.${item.name}`}
                                                label={item.label}
                                                width={"20"}
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
                                <Grid item xs={12} sm={9}>
                                    <InlineTextField
                                        labelAlign="right"
                                        textAlign="right"
                                        id="total"
                                        name={"besoin_demarage.total"}
                                        label={"Total"}
                                        customValue={sumTotal}
                                        width={"20"}
                                        readOnly
                                        fullWidth
                                    />
                                </Grid>
                                <Grid item xs={12} sm={9}>
                                    <InlineTextField
                                        textAlign="right"
                                        width={"20"}
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
                            <ButtonContainerFloatRight>
                                <Button
                                    variant="contained"
                                    size="large"
                                    type="submit"
                                >
                                    Ajouter
                                </Button>
                            </ButtonContainerFloatRight>
                        </Form>
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
