import { alpha, Grid, InputLabel, Typography, useTheme } from "@mui/material";
import { useFormContext, useFieldArray, useWatch } from "react-hook-form";

import React, { useMemo } from "react";
import BaseTextInput from "../../components/BaseTextInput";
import InlineTextField from "../../components/InlineTextFeild";
import SectionTitle from "../../components/SectionTitle";
import TextLikeInput from "../../components/TextLikeInput";

const Page2 = () => {
    const theme = useTheme();
    const watchedValues = useWatch({
        name: "financement_demarage",
    });
    const { getValues, control } = useFormContext();

    const formValues = getValues();

    const { financement_total, ...other } = formValues.financement_demarage;
    const finance_values = Object.values(other)
        .map((v) => {
            if (typeof v === "object") return Number(v.montant);
            return Number(v);
        })
        .filter((v) => typeof Number(v) == "number" && !isNaN(v));
    function sumFunction(array) {
        return array.reduce(
            (previousValue, currentValue) =>
                Number(previousValue) + Number(currentValue),
            0
        );
    }
    // .filter((v) => typeof Number(v) == "number" && v !== "NaN");

    const financement_sum = useMemo(
        () => sumFunction(finance_values),
        [finance_values]
    );
    return (
        <div id="financement_besoin_demarage">
            <SectionTitle title=" Le financement de vos besoins de démarrage" />
            <Grid
                container
                sx={{
                    padding: 2,
                    marginBlock: 2,
                    marginInline: -1,
                    borderRadius: 0.5,
                    background: alpha(theme.palette.success.light, 0.2),
                }}
            >
                <Grid item xs={4.1}></Grid>
                <Grid
                    item
                    xs={2.2}
                    // sm={9}
                >
                    <Typography variant="subtitle1">Montant</Typography>
                </Grid>
                <Grid
                    item
                    xs={2.2}
                    // sm={9}
                >
                    <Typography variant="subtitle1">Taux</Typography>
                </Grid>
                <Grid
                    item
                    xs={2}
                    // sm={9}
                >
                    <Typography variant="subtitle1">Durée</Typography>
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
                                transformOrigin: "unset",
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
                            ){/* <Typography>)</Typography> */}
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
                                transformOrigin: "unset",
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
                            ){/* <Typography>)</Typography> */}
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
                                transformOrigin: "unset",
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
                        name={"financement_demarage.financement_total"}
                        label={"Total"}
                        customValue={financement_sum}
                        width={"15"}
                        readOnly
                        fullWidth
                    />
                </Grid>
            </Grid>
        </div>
    );
};

export default Page2;
