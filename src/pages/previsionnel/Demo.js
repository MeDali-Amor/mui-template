// import { Box, Button, styled, useTheme } from "@mui/material";
// import { Form, Formik } from "formik";
// import React from "react";
// import * as yup from "yup";
// import QuikFormMenu from "../../components/QuikFormMenu";
// import Page0 from "./Page0";
// import Page1 from "./Page1";
// import Page2 from "./Page2";
// import Page3 from "./Page3";
// import Page4 from "./Page4";
// import Page5 from "./Page5";
// import Page6 from "./Page6";
// import Page7 from "./Page7";
// import Page8 from "./Page8";
// import Page9 from "./Page9";

// let patternTwoDigisAfterComma = /^\d+(\.\d{0,2})?$/;

// const commonStringValidator = yup
//     .number("montant invalide")
//     .positive("montant invalide")
//     .test(
//         // "is-decimal",
//         "montant invalide",
//         (val) => {
//             if (val !== undefined) {
//                 return patternTwoDigisAfterComma.test(val);
//             }
//             return true;
//         }
//     );

// const besoinDemarageValidation = yup.object({
//     duree_amortissement: yup
//         .number("Durée invalide")
//         .integer("Durée invalide")
//         .positive("Durée invalide")
//         .required("Ce champ est requis"),
//     besoin_demarage: yup.object({
//         frais_etablissement: commonStringValidator,
//     }),
// });

// const ButtonContainerFloatRight = styled("div")(({ theme }) => ({
//     paddingInline: theme.spacing(8),
//     // paddingBlock: theme.spacing(16),
//     paddingTop: "16px",
//     float: "right",
// }));

// const Demo = () => {
//     const theme = useTheme();
//     const handleSubmit = async (values) => {
//         console.log(values);
//     };

//     return (
//         <Formik
//             initialValues={{
//                 nom: "",
//                 prenom: "",
//                 nom_projet: "",
//                 form_juridique: "",
//                 num_telephone: "",
//                 email: "",
//                 commune: "",
//                 code_postal: "",
//                 activite: "",
//                 duree_amortissement: "",
//                 besoin_demarage: {
//                     frais_etablissement: "",
//                     frais_compteurs: "",
//                     frais_logiciels: "",
//                     frais_marque: "",
//                     frais_droit_entree: "",
//                     achat_fonds_de_commerce: "",
//                     droit_au_bail: "",
//                     depot_garantie: "",
//                     frais_dossier: "",
//                     frais_avocat: "",
//                     frais_communication: "",
//                     achat_immobilier: "",
//                     frais_travaux: "",
//                     frais_materiel: "",
//                     frais_materiel_bureau: "",
//                     frais_stock: "",
//                     tresorie_de_depart: "",
//                     total: 0,
//                     autres_frais: [
//                         {
//                             label: "",
//                             montant: "",
//                         },
//                         {
//                             label: "",
//                             montant: "",
//                         },
//                         {
//                             label: "",
//                             montant: "",
//                         },
//                     ],
//                 },
//                 financement_demarage: {
//                     apport_personnel: "",
//                     apports_en_nature: "",
//                     pret_1: {
//                         nom_banque: "",
//                         montant: "",
//                         taux: "",
//                         duree_en_mois: "",
//                     },
//                     pret_2: {
//                         nom_banque: "",
//                         montant: "",
//                         taux: "",
//                         duree_en_mois: "",
//                     },
//                     pret_3: {
//                         nom_banque: "",
//                         montant: "",
//                         taux: "",
//                         duree_en_mois: "",
//                     },
//                     subvention_1: "",
//                     subvention_2: "",
//                     autre_financement: { label: "", montant: "" },
//                     financement_total: 0,
//                 },
//                 charges_fixes: {
//                     autres_charges_fixes: [
//                         {
//                             name: "",
//                             autres_an1: "",
//                             autres_an2: "",
//                             autres_an3: "",
//                             autres_an4: "",
//                             autres_an5: "",
//                         },
//                         {
//                             name: "",
//                             autres_an1: "",
//                             autres_an2: "",
//                             autres_an3: "",
//                             autres_an4: "",
//                             autres_an5: "",
//                         },
//                         {
//                             name: "",
//                             autres_an1: "",
//                             autres_an2: "",
//                             autres_an3: "",
//                             autres_an4: "",
//                             autres_an5: "",
//                         },
//                     ],
//                     annee1: {
//                         assurances: "",
//                         telephone_internet: "",
//                         autres_abonnements: "",
//                         carburant_transports: "",
//                         frais_deplacement_hebergement: "",
//                         Eau_electricite_gaz: "",
//                         mutuellee: "",
//                         entretien_vehicule: "",
//                         nettoyage_locaux: "",
//                         publicite_communication: "",
//                         loyer: "",
//                         comptable_avocats: "",
//                         frais_bancaires: "",
//                         impôt_taxes: "",
//                         total_charges_fixes: 0,
//                     },
//                     annee2: {
//                         assurances: "",
//                         telephone_internet: "",
//                         autres_abonnements: "",
//                         carburant_transports: "",
//                         frais_deplacement_hebergement: "",
//                         Eau_electricite_gaz: "",
//                         mutuellee: "",
//                         entretien_vehicule: "",
//                         nettoyage_locaux: "",
//                         publicite_communication: "",
//                         loyer: "",
//                         comptable_avocats: "",
//                         frais_bancaires: "",
//                         impôt_taxes: "",
//                         total_charges_fixes: 0,
//                     },
//                     annee3: {
//                         assurances: "",
//                         telephone_internet: "",
//                         autres_abonnements: "",
//                         carburant_transports: "",
//                         frais_deplacement_hebergement: "",
//                         Eau_electricite_gaz: "",
//                         mutuellee: "",
//                         entretien_vehicule: "",
//                         nettoyage_locaux: "",
//                         publicite_communication: "",
//                         loyer: "",
//                         comptable_avocats: "",
//                         frais_bancaires: "",
//                         impôt_taxes: "",
//                         total_charges_fixes: 0,
//                     },
//                     annee4: {
//                         assurances: "",
//                         telephone_internet: "",
//                         autres_abonnements: "",
//                         carburant_transports: "",
//                         frais_deplacement_hebergement: "",
//                         Eau_electricite_gaz: "",
//                         mutuellee: "",
//                         entretien_vehicule: "",
//                         nettoyage_locaux: "",
//                         publicite_communication: "",
//                         loyer: "",
//                         comptable_avocats: "",
//                         frais_bancaires: "",
//                         impôt_taxes: "",
//                         total_charges_fixes: 0,
//                     },
//                     annee5: {
//                         assurances: "",
//                         telephone_internet: "",
//                         autres_abonnements: "",
//                         carburant_transports: "",
//                         frais_deplacement_hebergement: "",
//                         Eau_electricite_gaz: "",
//                         mutuellee: "",
//                         entretien_vehicule: "",
//                         nettoyage_locaux: "",
//                         publicite_communication: "",
//                         loyer: "",
//                         comptable_avocats: "",
//                         frais_bancaires: "",
//                         impôt_taxes: "",
//                         total_charges_fixes: 0,
//                     },
//                 },
//                 chiffre_affaire_an1: {
//                     total_vente: 0,
//                     total_service: 0,
//                     augmentation_vente1: "",
//                     augmentation_services1: "",
//                     vente: [
//                         {
//                             name: "Mois 1",
//                             nb_jours: 25,
//                             chiffre_affaires: "",
//                             total_chiffre_affaires: 0,
//                         },
//                         {
//                             name: "Mois 2",
//                             nb_jours: 25,
//                             chiffre_affaires: "",
//                             total_chiffre_affaires: 0,
//                         },
//                         {
//                             name: "Mois 3",
//                             nb_jours: 25,
//                             chiffre_affaires: "",
//                             total_chiffre_affaires: 0,
//                         },
//                         {
//                             name: "Mois 4",
//                             nb_jours: 25,
//                             chiffre_affaires: "",
//                             total_chiffre_affaires: 0,
//                         },
//                         {
//                             name: "Mois 5",
//                             nb_jours: 25,
//                             chiffre_affaires: "",
//                             total_chiffre_affaires: 0,
//                         },
//                         {
//                             name: "Mois 6",
//                             nb_jours: 25,
//                             chiffre_affaires: "",
//                             total_chiffre_affaires: 0,
//                         },
//                         {
//                             name: "Mois 7",
//                             nb_jours: 25,
//                             chiffre_affaires: "",
//                             total_chiffre_affaires: 0,
//                         },
//                         {
//                             name: "Mois 8",
//                             nb_jours: 25,
//                             chiffre_affaires: "",
//                             total_chiffre_affaires: 0,
//                         },
//                         {
//                             name: "Mois 9",
//                             nb_jours: 25,
//                             chiffre_affaires: "",
//                             total_chiffre_affaires: 0,
//                         },
//                         {
//                             name: "Mois 10",
//                             nb_jours: 25,
//                             chiffre_affaires: "",
//                             total_chiffre_affaires: 0,
//                         },
//                         {
//                             name: "Mois 11",
//                             nb_jours: 25,
//                             chiffre_affaires: "",
//                             total_chiffre_affaires: 0,
//                         },
//                         {
//                             name: "Mois 12",
//                             nb_jours: 25,
//                             chiffre_affaires: "",
//                             total_chiffre_affaires: 0,
//                         },
//                     ],
//                     services: [
//                         {
//                             name: "Mois 1",
//                             nb_jours: 25,
//                             chiffre_affaires: "",
//                             total_chiffre_affaires: 0,
//                         },
//                         {
//                             name: "Mois 2",
//                             nb_jours: 25,
//                             chiffre_affaires: "",
//                             total_chiffre_affaires: 0,
//                         },
//                         {
//                             name: "Mois 3",
//                             nb_jours: 25,
//                             chiffre_affaires: "",
//                             total_chiffre_affaires: 0,
//                         },
//                         {
//                             name: "Mois 4",
//                             nb_jours: 25,
//                             chiffre_affaires: "",
//                             total_chiffre_affaires: 0,
//                         },
//                         {
//                             name: "Mois 5",
//                             nb_jours: 25,
//                             chiffre_affaires: "",
//                             total_chiffre_affaires: 0,
//                         },
//                         {
//                             name: "Mois 6",
//                             nb_jours: 25,
//                             chiffre_affaires: "",
//                             total_chiffre_affaires: 0,
//                         },
//                         {
//                             name: "Mois 7",
//                             nb_jours: 25,
//                             chiffre_affaires: "",
//                             total_chiffre_affaires: 0,
//                         },
//                         {
//                             name: "Mois 8",
//                             nb_jours: 25,
//                             chiffre_affaires: "",
//                             total_chiffre_affaires: 0,
//                         },
//                         {
//                             name: "Mois 9",
//                             nb_jours: 25,
//                             chiffre_affaires: "",
//                             total_chiffre_affaires: 0,
//                         },
//                         {
//                             name: "Mois 10",
//                             nb_jours: 25,
//                             chiffre_affaires: "",
//                             total_chiffre_affaires: 0,
//                         },
//                         {
//                             name: "Mois 11",
//                             nb_jours: 25,
//                             chiffre_affaires: "",
//                             total_chiffre_affaires: 0,
//                         },
//                         {
//                             name: "Mois 12",
//                             nb_jours: 25,
//                             chiffre_affaires: "",
//                             total_chiffre_affaires: 0,
//                         },
//                     ],
//                 },
//                 pourcentage_vente_cout_achat: "",
//                 duree_credits_clients: "",
//                 duree_dettes_fournisseurs: "",
//                 salaires_employes: ["", "", "", "", ""],
//                 remuneration_dirigeants: ["", "", "", "", ""],
//                 dir_ACCRE: "Non",
//                 rentabilite: "",
//                 niveau_tresorie: "",
//             }}
//             validationSchema={besoinDemarageValidation}
//             onSubmit={(values) => handleSubmit(values)}
//         >
//             {(formik) => {
//                 return (
//                     <Box
//                         sx={{
//                             padding: 4,
//                             display: "flex",
//                             flexDirection: "row",
//                             // scrollBehavior: "smooth",
//                             position: "relative",
//                         }}
//                     >
//                         <Box
//                             sx={{
//                                 marginRight: "280px",
//                                 scrollBehavior: "smooth",
//                             }}
//                         >
//                             <Form>
//                                 {/* <Typography
//                                 component="h1"
//                                 variant="h4"
//                                 align="center"
//                                 sx={{
//                                     marginTop: 4,
//                                     marginBottom: 2,
//                                 }}
//                             >
//                                 Vous souhaitez ajouter une societé?
//                             </Typography> */}
//                                 <Page0 />
//                                 <Page1
//                                     formik={formik}
//                                     besoinDemarageDataArray={
//                                         besoinDemarageDataArray
//                                     }
//                                     // sumTotal={sumTotal}
//                                 />
//                                 <Page2 formik={formik} />
//                                 <Page3
//                                     formik={formik}
//                                     chargesFixesDataArray={
//                                         chargesFixesDataArray
//                                     }
//                                 />
//                                 <Page4
//                                     formik={formik}
//                                     monthsDataArray={monthsDataArray}
//                                 />
//                                 <Page5 />
//                                 <Page6 />
//                                 <Page7 />

//                                 <Page8 />
//                                 <Page9 />

//                                 <ButtonContainerFloatRight>
//                                     <Button
//                                         variant="contained"
//                                         size="large"
//                                         type="submit"
//                                     >
//                                         Submit
//                                     </Button>
//                                 </ButtonContainerFloatRight>
//                             </Form>
//                         </Box>{" "}
//                         <Box>
//                             <QuikFormMenu />
//                         </Box>
//                     </Box>
//                 );
//             }}
//         </Formik>
//     );
// };

// export default Demo;

// const besoinDemarageDataArray = [
//     {
//         name: "frais_etablissement",
//         label: "Frais d’établissement",
//         comment: "Ce sont les frais de création de l’entreprise (formalités)",
//     },
//     {
//         name: "frais_compteurs",
//         comment: "Compteurs d'eau, électricité, gaz…",
//         label: "Frais d’ouverture de compteurs",
//     },
//     {
//         name: "frais_logiciels",
//         comment: "",
//         label: "Logiciels, formations",
//     },
//     {
//         name: "frais_marque",
//         comment: "Frais de dépôt ou d’enregistrement",
//         label: "Dépôt marque, brevet, modèle",
//     },
//     {
//         name: "frais_droit_entree",
//         comment: "Par exemple pour intégrer un réseau de franchise",
//         label: "Droits d’entrée",
//     },
//     {
//         name: "achat_fonds_de_commerce",
//         comment: "Dans le cas d'une reprise",
//         label: "Achat fonds de commerce ou parts",
//     },
//     {
//         name: "droit_au_bail",
//         comment: "",
//         label: "Droit au bail",
//     },
//     {
//         name: "depot_garantie",
//         comment: "",
//         label: "Caution ou dépôt de garantie",
//     },
//     {
//         name: "frais_dossier",
//         comment: "Pour la signature de contrats de prêt",
//         label: "Frais de dossier",
//     },
//     {
//         name: "frais_avocat",
//         comment: "Pour la signature des contrats et baux commerciaux",
//         label: "Frais de notaire ou d’avocat",
//     },
//     {
//         name: "frais_communication",
//         comment:
//             "Cartes de visite, brochures, logo, site internet, éléments graphiques",
//         label: "Enseigne et éléments de communication",
//     },
//     {
//         name: "achat_immobilier",
//         comment: "Acquisition d'immeuble",
//         label: "Achat immobilier",
//     },
//     {
//         name: "frais_travaux",
//         comment: "Pour l'aménagement du local",
//         label: "Travaux et aménagements",
//     },
//     {
//         name: "frais_materiel",
//         comment: "Matériel, outillage, machines, véhicules…",
//         label: "Matériel",
//     },
//     {
//         name: "frais_materiel_bureau",
//         comment: "Fournitures, ordinateur, imprimante",
//         label: "Matériel de bureau",
//     },
//     {
//         name: "frais_stock",
//         comment: "Matières premières, produits finis ou semi-finis",
//         label: "Stock de matières et produits",
//     },
//     {
//         name: "tresorie_de_depart",
//         comment:
//             "Somme d’argent gardée en prévision du démarrage de l’activité pour financer le cycle d'exploitation",
//         label: "Trésorerie de départ",
//     },
// ];
// const chargesFixesDataArray = [
//     {
//         name: "assurances",
//         label: "Assurances",
//         comment: "Ce sont les frais de création de l’entreprise (formalités)",
//     },
//     {
//         name: "telephone_internet",
//         comment: "Compteurs d'eau, électricité, gaz…",
//         label: "Téléphone, internet",
//     },
//     {
//         name: "autres_abonnements",
//         comment: "Frais de dépôt ou d’enregistrement",
//         label: "Autres abonnements",
//     },
//     {
//         name: "carburant_transports",
//         comment: "Par exemple pour intégrer un réseau de franchise",
//         label: "Carburant, transports",
//     },
//     {
//         name: "frais_deplacement_hebergement",
//         comment: "Dans le cas d'une reprise",
//         label: "Frais de déplacement et hébergement",
//     },
//     {
//         name: "Eau_electricite_gaz",
//         comment: "",
//         label: "Eau, électricité, gaz",
//     },
//     {
//         name: "mutuellee",
//         comment: "",
//         label: "Mutuelle",
//     },
//     {
//         name: "entretien_vehicule",
//         comment: "Pour la signature de contrats de prêt",
//         label: "Entretien du véhicule",
//     },
//     {
//         name: "nettoyage_locaux",
//         comment: "Pour la signature des contrats et baux commerciaux",
//         label: "Nettoyage des locaux",
//     },
//     {
//         name: "publicite_communication",
//         comment: "Acquisition d'immeuble",
//         label: "Budget publicité et communication",
//     },
//     {
//         name: "loyer",
//         comment: "Pour l'aménagement du local",
//         label: "Loyer et charges locatives",
//     },
//     {
//         name: "comptable_avocats",
//         comment: "Matériel, outillage, machines, véhicules…",
//         label: "Expert comptable, avocats",
//     },
//     {
//         name: "frais_bancaires",
//         comment: "Fournitures, ordinateur, imprimante",
//         label: "Frais bancaires et terminal carte bleue",
//     },
//     {
//         name: "impôt_taxes",
//         comment: "Matières premières, produits finis ou semi-finis",
//         label: "Impôt et Taxes, CFE",
//     },
// ];
// const monthsDataArray = [
//     {
//         label: "Mois 1",
//         name: "mois1",
//     },
//     {
//         name: "Mois 2",
//         label: "mois2",
//     },
//     {
//         label: "Mois 3",
//         name: "mois3",
//     },
//     {
//         label: "Mois 4",
//         name: "mois4",
//     },
//     {
//         label: "Mois 5",
//         name: "mois5",
//     },
//     {
//         label: "Mois 6",
//         name: "mois6",
//     },
//     {
//         label: "Mois 7",
//         name: "mois7",
//     },
//     {
//         label: "Mois 8",
//         name: "mois8",
//     },
//     {
//         label: "Mois 9",
//         name: "mois9",
//     },
//     {
//         label: "Mois 10",
//         name: "mois10",
//     },
//     {
//         label: "Mois 11",
//         name: "mois11",
//     },
//     {
//         label: "Mois 12",
//         name: "mois12",
//     },
// ];
