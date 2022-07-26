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
import { Link } from "react-router-dom";

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
            }}
            validationSchema={besoinDemarageValidation}
            onSubmit={(values) => handleSubmit(values)}
        >
            {(formik) => {
                const { total, autres_frais, ...values } =
                    formik.values.besoin_demarage;
                let otherValues = autres_frais
                    ?.map((el) => Number(el.montant))
                    .filter((v) => typeof Number(v) == "number");
                const valuesToBeSummed = Object.values(values)
                    .filter((v) => typeof Number(v) == "number" && v !== NaN)
                    .concat(otherValues);
                console.log(otherValues);

                const sumTotal = valuesToBeSummed.reduce(
                    (previousValue, currentValue) =>
                        Number(previousValue) + Number(currentValue),
                    0
                );
                // console.log(sumTotal);

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
                                                console.log(autres_frais);
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
                                                        {autres_frais.length ? (
                                                            <Grid
                                                                container
                                                                columnGap={2}
                                                                sx={{
                                                                    marginBottom: 2,
                                                                }}
                                                            >
                                                                <Grid
                                                                    item
                                                                    xs={4}
                                                                    // sm={9}
                                                                >
                                                                    <Typography>
                                                                        Libellé
                                                                    </Typography>
                                                                </Grid>
                                                                <Grid
                                                                    item
                                                                    xs={4}
                                                                    // sm={9}
                                                                >
                                                                    <Typography>
                                                                        Montant
                                                                    </Typography>
                                                                </Grid>
                                                            </Grid>
                                                        ) : null}
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
                                                                        <InputFeild
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
                                                                        <InputFeild
                                                                            name={`besoin_demarage.autres_frais[${index}].montant`}
                                                                            // label="civilité"
                                                                            // width={"15"}
                                                                            fullWidth
                                                                        />
                                                                    </Grid>
                                                                    <Grid
                                                                        item
                                                                        // xs={12}
                                                                        // sm={1}
                                                                    >
                                                                        <Tooltip title="Supprimer l'associé">
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
                                                        <ButtonContainerFloatRight>
                                                            <Button
                                                                variant="contained"
                                                                size="medium"
                                                                // color={`${theme.palette.primary.light}`}
                                                                onClick={() => {
                                                                    push({
                                                                        label: "",
                                                                        montant:
                                                                            "",
                                                                    });
                                                                }}
                                                            >
                                                                Ajouter
                                                            </Button>
                                                        </ButtonContainerFloatRight>
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
