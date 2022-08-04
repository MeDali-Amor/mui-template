import { alpha, Grid, InputLabel, Typography, useTheme } from "@mui/material";
import React, { useMemo, useRef } from "react";
import BaseTextInput from "../../components/BaseTextInput";
import FormOpeningText from "../../components/FormOpeningText";
import SectionTitle from "../../components/SectionTitle";
// import useIsInView from "../../hooks/isInViewHook";
import { useFormContext, useWatch } from "react-hook-form";

const Page4 = ({ monthsDataArray }) => {
    const watchedValues = useWatch({
        name: "chiffre_affaire_an1",
    });
    const theme = useTheme();
    const { getValues, control } = useFormContext();
    const formValues = getValues();

    const chiffre_vente_Totals = formValues.chiffre_affaire_an1.vente.map(
        (el) => {
            if (
                !isNaN(Number(el.chiffre_affaires)) &&
                !isNaN(Number(el.nb_jours))
            )
                return Number(el.chiffre_affaires) * Number(el.nb_jours);
            return 0;
        }
    );
    const chiffre_services_Totals = formValues.chiffre_affaire_an1.services.map(
        (el) => {
            if (
                !isNaN(Number(el.chiffre_affaires)) &&
                !isNaN(Number(el.nb_jours))
            )
                return Number(el.chiffre_affaires) * Number(el.nb_jours);
            return 0;
        }
    );
    // console.log(otherValues);
    function sumFunction(array) {
        return array.reduce(
            (previousValue, currentValue) =>
                Number(previousValue) + Number(currentValue),
            0
        );
    }

    // console.log(yearlyCharges);

    const totalVente = useMemo(
        () => sumFunction(chiffre_vente_Totals),
        [chiffre_vente_Totals]
    );
    const totalServices = useMemo(
        () => sumFunction(chiffre_services_Totals),
        [chiffre_services_Totals]
    );

    return (
        <div id="chiffre_affaire_an1">
            <SectionTitle title=" Votre chiffre d'affaires de la première année" />
            <FormOpeningText
                text="Prévoyez ici le chiffre d'affaires de votre activité (hors
                taxes)"
            />
            <Grid
                container
                // rowSpacing={1}
                columnSpacing={2}
            >
                {" "}
                <Grid
                    item
                    md={12}
                    lg={6}
                    //
                    sx={{ padding: 2 }}
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
                            // gutterBottom
                            sx={{
                                marginBottom: 2,
                            }}
                        >
                            Année 1 - Vente de Marchandises
                        </Typography>
                        <Grid
                            container
                            columnGap={0.3}
                            alignItems={"center"}
                            sx={{
                                padding: 2,
                                marginBlock: 2,
                                marginInline: -1,
                                borderRadius: 0.5,
                                background: alpha(
                                    theme.palette.success.light,
                                    0.2
                                ),
                            }}
                        >
                            <Grid item xs={3}></Grid>
                            <Grid
                                item
                                xs={2.8}
                                // sm={9}
                            >
                                <Typography
                                    variant="subtitle2"
                                    textAlign={"center"}
                                >
                                    Nb de jours
                                </Typography>
                            </Grid>
                            <Grid
                                item
                                xs={2.8}
                                // sm={9}
                            >
                                <Typography
                                    variant="subtitle2"
                                    textAlign={"center"}
                                >
                                    Chiffre d'affaires
                                </Typography>
                            </Grid>
                            <Grid
                                item
                                xs={2.8}
                                // sm={9}
                            >
                                <Typography
                                    variant="subtitle2"
                                    textAlign={"center"}
                                >
                                    Chiffre d'affaires
                                </Typography>
                            </Grid>
                        </Grid>
                        {monthsDataArray.map(({ name, label }, index) => (
                            <Grid
                                container
                                columnGap={0.2}
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
                                        {label}
                                    </InputLabel>
                                </Grid>
                                <Grid
                                    item
                                    xs={2.8}
                                    sx={{
                                        paddingInline: 0.3,
                                    }}
                                    // sm={9}
                                >
                                    <BaseTextInput
                                        id={name}
                                        name={`chiffre_affaire_an1.vente[${index}].nb_jours`}
                                        // width={"10"}
                                        textAlign="right"
                                        // fullWidth
                                        // comment={
                                        //     "Nom de votre projet ou description de votre activité"
                                        // }
                                    />
                                </Grid>
                                <Grid
                                    item
                                    xs={2.8}
                                    sx={{
                                        paddingInline: 0.3,
                                    }}
                                    // sm={9}
                                >
                                    <BaseTextInput
                                        id={name}
                                        name={`chiffre_affaire_an1.vente[${index}].chiffre_affaires`}
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
                                    xs={2.8}
                                    sx={{
                                        paddingInline: 0.3,
                                    }}
                                    // sm={9}
                                >
                                    <BaseTextInput
                                        readOnly
                                        id={name}
                                        name={`chiffre_affaire_an1.vente[${index}].total_chiffre_affaires`}
                                        customValue={
                                            chiffre_vente_Totals[index]
                                        }
                                        width={"15"}
                                        textAlign="right"
                                        // fullWidth
                                        // comment={
                                        //     "Nom de votre projet ou description de votre activité"
                                        // }
                                    />
                                </Grid>
                            </Grid>
                        ))}
                        <Grid
                            container
                            // direction={"row-reverse"}
                            // justifyContent={"start"}
                            alignItems={"center"}
                            columnGap={0.2}
                        >
                            {" "}
                            <Grid
                                item
                                xs={2.8}
                                // sm={9}
                                sx={{
                                    paddingInline: 0.3,
                                }}
                            ></Grid>
                            <Grid
                                item
                                xs={2.8}
                                // sm={9}
                                sx={{
                                    paddingInline: 0.3,
                                }}
                            ></Grid>
                            <Grid item xs={3}>
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
                                        transformOrigin: "unset",
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
                                xs={2.8}
                                // sm={9}
                                sx={{
                                    paddingInline: 0.3,
                                }}
                            >
                                <BaseTextInput
                                    textAlign="right"
                                    // id="total"
                                    name={"chiffre_affaire_an1.total_vente"}
                                    label={"Total"}
                                    customValue={totalVente}
                                    // width={"15"}
                                    readOnly
                                />
                            </Grid>
                            <Grid item xs={8.7}>
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
                                        transformOrigin: "unset",
                                        textOverflow: "unset",
                                        whiteSpace: "unset",
                                        overflow: "unset",
                                    }}
                                >
                                    % d'augmentation du chiffre d'affaire entre
                                    l'année 1 et l'année 2
                                </InputLabel>
                            </Grid>
                            <Grid
                                item
                                xs={2.8}
                                // sm={9}
                                sx={{
                                    paddingInline: 0.3,
                                }}
                            >
                                <BaseTextInput
                                    textAlign="right"
                                    // id="total"
                                    name={
                                        "chiffre_affaire_an1.augmentation_vente1"
                                    }
                                    label={"Total"}

                                    // width={"15"}
                                />
                            </Grid>
                            <Grid item xs={8.7}>
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
                                        transformOrigin: "unset",
                                        textOverflow: "unset",
                                        whiteSpace: "unset",
                                        overflow: "unset",
                                    }}
                                >
                                    % d'augmentation du chiffre d'affaire entre
                                    l'année 2 et l'année 3
                                </InputLabel>
                            </Grid>
                            <Grid
                                item
                                xs={2.8}
                                // sm={9}
                                sx={{
                                    paddingInline: 0.3,
                                }}
                            >
                                <BaseTextInput
                                    textAlign="right"
                                    // id="total"
                                    name={
                                        "chiffre_affaire_an1.augmentation_vente2"
                                    }
                                    label={"Total"}
                                    // width={"15"}
                                />
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid
                    item
                    md={12}
                    lg={6}
                    //
                    sx={{ padding: 2 }}
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
                            // gutterBottom
                            sx={{
                                marginBottom: 2,
                            }}
                        >
                            Année 1 - Services
                        </Typography>
                        <Grid
                            container
                            columnGap={0.3}
                            alignItems={"center"}
                            sx={{
                                padding: 2,
                                marginBlock: 2,
                                marginInline: -1,
                                borderRadius: 0.5,
                                background: alpha(
                                    theme.palette.success.light,
                                    0.2
                                ),
                            }}
                        >
                            <Grid item xs={3}></Grid>
                            <Grid
                                item
                                xs={2.8}
                                // sm={9}
                            >
                                <Typography
                                    variant="subtitle2"
                                    textAlign={"center"}
                                >
                                    Nb de jours
                                </Typography>
                            </Grid>
                            <Grid
                                item
                                xs={2.8}
                                // sm={9}
                            >
                                <Typography
                                    variant="subtitle2"
                                    textAlign={"center"}
                                >
                                    Chiffre d'affaires
                                </Typography>
                            </Grid>
                            <Grid
                                item
                                xs={2.8}
                                // sm={9}
                            >
                                <Typography
                                    variant="subtitle2"
                                    textAlign={"center"}
                                >
                                    Chiffre d'affaires
                                </Typography>
                            </Grid>
                        </Grid>
                        {monthsDataArray.map(({ name, label }, index) => (
                            <Grid
                                container
                                columnGap={0.2}
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
                                        {label}
                                    </InputLabel>
                                </Grid>
                                <Grid
                                    item
                                    xs={2.8}
                                    sx={{
                                        paddingInline: 0.3,
                                    }}
                                    // sm={9}
                                >
                                    <BaseTextInput
                                        id={name}
                                        name={`chiffre_affaire_an1.services[${index}].nb_jours`}
                                        // width={"10"}
                                        textAlign="right"
                                        // fullWidth
                                        // comment={
                                        //     "Nom de votre projet ou description de votre activité"
                                        // }
                                    />
                                </Grid>
                                <Grid
                                    item
                                    xs={2.8}
                                    sx={{
                                        paddingInline: 0.3,
                                    }}
                                    // sm={9}
                                >
                                    <BaseTextInput
                                        id={name}
                                        name={`chiffre_affaire_an1.services[${index}].chiffre_affaires`}
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
                                    xs={2.8}
                                    sx={{
                                        paddingInline: 0.3,
                                    }}
                                    // sm={9}
                                >
                                    <BaseTextInput
                                        id={name}
                                        readOnly
                                        name={`chiffre_affaire_an1.services[${index}].total_chiffre_affaires`}
                                        customValue={
                                            chiffre_services_Totals[index]
                                        }
                                        width={"15"}
                                        textAlign="right"
                                        // fullWidth
                                        // comment={
                                        //     "Nom de votre projet ou description de votre activité"
                                        // }
                                    />
                                </Grid>
                            </Grid>
                        ))}{" "}
                        <Grid
                            container
                            // direction={"row-reverse"}
                            // justifyContent={"start"}
                            alignItems={"center"}
                            columnGap={0.2}
                        >
                            {" "}
                            <Grid
                                item
                                xs={2.8}
                                // sm={9}
                                sx={{
                                    paddingInline: 0.3,
                                }}
                            ></Grid>
                            <Grid
                                item
                                xs={2.8}
                                // sm={9}
                                sx={{
                                    paddingInline: 0.3,
                                }}
                            ></Grid>
                            <Grid item xs={3}>
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
                                        transformOrigin: "unset",
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
                                xs={2.8}
                                sx={{
                                    paddingInline: 0.3,
                                }}
                                // sm={9}
                            >
                                <BaseTextInput
                                    textAlign="right"
                                    // id="total"
                                    name={"chiffre_affaire_an1.total_service"}
                                    label={"Total"}
                                    customValue={totalServices}
                                    // width={"15"}
                                    readOnly
                                />
                            </Grid>
                            <Grid item xs={8.7}>
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
                                        transformOrigin: "unset",
                                        textOverflow: "unset",
                                        whiteSpace: "unset",
                                        overflow: "unset",
                                    }}
                                >
                                    % d'augmentation du chiffre d'affaire entre
                                    l'année 1 et l'année 2
                                </InputLabel>
                            </Grid>
                            <Grid
                                item
                                xs={2.8}
                                // sm={9}
                            >
                                <BaseTextInput
                                    textAlign="right"
                                    // id="total"
                                    name={
                                        "chiffre_affaire_an1.augmentation_services1"
                                    }
                                    label={"Total"}
                                    // width={"15"}
                                />
                            </Grid>
                            <Grid item xs={8.7}>
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
                                        transformOrigin: "unset",
                                        textOverflow: "unset",
                                        whiteSpace: "unset",
                                        overflow: "unset",
                                    }}
                                >
                                    % d'augmentation du chiffre d'affaire entre
                                    l'année 2 et l'année 3
                                </InputLabel>
                            </Grid>
                            <Grid
                                item
                                xs={2.8}
                                // sm={9}
                            >
                                <BaseTextInput
                                    textAlign="right"
                                    // id="total"
                                    name={
                                        "chiffre_affaire_an1.augmentation_services2"
                                    }
                                    label={"Total"}
                                    // width={"15"}
                                />
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </div>
    );
};

export default Page4;
