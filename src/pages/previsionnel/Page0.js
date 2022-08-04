import { Grid, Typography } from "@mui/material";
import React from "react";
import FormOpeningText from "../../components/FormOpeningText";
import InlineSelectField from "../../components/InlineSelectField";
import InlineTextField from "../../components/InlineTextFeild";
import InterPhoneInput from "../../components/InterPhoneInput";
import SectionTitle from "../../components/SectionTitle";

const Page0 = () => {
    return (
        <div id="identification">
            <FormOpeningText text="Saisissez dans cet onglet toutes les données de votre projet" />
            <SectionTitle title="Identification" />
            <Grid container rowSpacing={1} columnSpacing={0}>
                <Grid item xs={12}>
                    <InlineTextField
                        id="prenom"
                        name="prenom"
                        label="Prenom"
                        // customValue={"dali"}
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
        </div>
    );
};

export default Page0;
