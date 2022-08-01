import {
    alpha,
    Box,
    Grid,
    IconButton,
    Tooltip,
    Typography,
    useTheme,
} from "@mui/material";
// import { FieldArray } from "formik";
import { useFormContext, useFieldArray, useWatch } from "react-hook-form";
import React, { useMemo } from "react";
import BaseTextInput from "../../components/BaseTextInput";
import InlineTextField from "../../components/InlineTextFeild";

import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import SectionTitle from "../../components/SectionTitle";
import FormOpeningText from "../../components/FormOpeningText";

const Page1 = ({ besoinDemarageDataArray }) => {
    const watchedValues = useWatch({
        name: "besoin_demarage",
    });
    const theme = useTheme();
    const { getValues, control } = useFormContext();
    const { fields, append, remove } = useFieldArray({
        control,
        name: "besoin_demarage.autres_frais",
    });
    const formValues = getValues();

    const { total, autres_frais, ...values } = formValues.besoin_demarage;
    let otherValues = autres_frais
        ?.map((el) => Number(el.montant))
        .filter((v) => typeof Number(v) == "number" && !isNaN(v));
    const valuesToBeSummed = Object.values(values)
        .filter((v) => typeof Number(v) == "number" && !isNaN(v))
        .concat(otherValues);
    function sumFunction(array) {
        return array.reduce(
            (previousValue, currentValue) =>
                Number(previousValue) + Number(currentValue),
            0
        );
    }
    const sumTotal = useMemo(
        () => sumFunction(valuesToBeSummed),
        [valuesToBeSummed]
    );
    // console.log(sumTotal);

    return (
        <div id="besoin_demarage">
            <SectionTitle title="Besoins de démarage" />
            <FormOpeningText
                text=" Listez toutes les dépenses ou investissements que vous
                    devrez faire avant même de démarrer l’activité, en hors
                    taxes (ou TTC si vous n'êtes pas soumis à la TVA)"
            />
            <Grid container>
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
                    <Grid item xs={4.3}></Grid>
                    <Grid
                        item
                        // xs={}
                        // sm={9}
                    >
                        <Typography variant="subtitle1">Montant</Typography>
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
                <Grid sx={{ pt: 2 }}>
                    <Typography variant="subtitle1" color={"primary"}>
                        Autres Frais (inscrire libellé ci-dessous) :
                    </Typography>
                </Grid>

                {fields?.map((el, index) => (
                    <Grid
                        container
                        columnGap={2}
                        alignItems={"center"}
                        sx={
                            {
                                // marginBottom: 2,
                            }
                        }
                        key={`${el.label}${index}`}
                    >
                        <Grid
                            item
                            xs={3.5}
                            // sm={9}
                        >
                            <BaseTextInput
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
                            <BaseTextInput
                                name={`besoin_demarage.autres_frais[${index}].montant`}
                                // label="civilité"
                                // width={"15"}
                                textAlign="right"
                                fullWidth
                            />
                        </Grid>
                        <Grid
                            item
                            // xs={12}
                            // sm={1}
                        >
                            {index > 2 && (
                                <Tooltip title="Supprimer la dépense">
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
                                            remove(index);
                                        }}
                                    >
                                        <DeleteOutlineOutlinedIcon />
                                    </IconButton>
                                </Tooltip>
                            )}
                        </Grid>
                    </Grid>
                ))}
                <Tooltip title="Ajouter une autre dépense">
                    <IconButton
                        variant="contained"
                        size="small"
                        // color={`${theme.palette.primary.light}`}
                        onClick={() => {
                            append({
                                label: "",
                                montant: "",
                            });
                        }}
                    >
                        <AddCircleIcon color="success" fontSize="large" />
                    </IconButton>
                </Tooltip>

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
                        label={"Durée d'amortissement des investissements *"}
                        comment="durée de vie des acquisitions de départ, en
                                    années"
                    />
                </Grid>
            </Grid>
        </div>
    );
};

export default Page1;
