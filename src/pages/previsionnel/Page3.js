import {
    alpha,
    Box,
    Grid,
    IconButton,
    InputLabel,
    Tooltip,
    Typography,
    useTheme,
} from "@mui/material";
import { FieldArray } from "formik";
import React from "react";
import BaseTextInput from "../../components/BaseTextInput";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import SectionTitle from "../../components/SectionTitle";
import FormOpeningText from "../../components/FormOpeningText";
import { useMemo } from "react";
import { useRef } from "react";
import useIsInView from "../../hooks/isInViewHook";

const Page3 = ({ formik, chargesFixesDataArray }) => {
    const theme = useTheme();
    const charges_fixes = formik.values.charges_fixes;
    const autreCharges = charges_fixes.autres_charges_fixes;
    const yearlyCharges = useMemo(
        () => [
            {
                ...charges_fixes.annee1,
                autres_charges_annuel: autreCharges.map((el) => el.autres_an1),
            },
            {
                ...charges_fixes.annee2,
                autres_charges_annuel: autreCharges.map((el) => el.autres_an2),
            },
            {
                ...charges_fixes.annee3,
                autres_charges_annuel: autreCharges.map((el) => el.autres_an3),
            },
            {
                ...charges_fixes.annee4,
                autres_charges_annuel: autreCharges.map((el) => el.autres_an4),
            },
            {
                ...charges_fixes.annee5,
                autres_charges_annuel: autreCharges.map((el) => el.autres_an5),
            },
        ],
        [autreCharges, charges_fixes]
    );
    function sumFunction(array) {
        return array.reduce(
            (previousValue, currentValue) =>
                Number(previousValue) + Number(currentValue),
            0
        );
    }

    const sumChargesFixes = useMemo(
        () =>
            yearlyCharges.map((el) => {
                const { total_charges_fixes, autres_charges_annuel, ...rest } =
                    el;
                const values = Object.values(rest)
                    .concat(autres_charges_annuel)
                    .map((item) => Number(item))
                    .filter((v) => typeof Number(v) == "number" && !isNaN(v));
                return sumFunction(values);
            }),
        [yearlyCharges]
    );

    return (
        <div id="charges_fixes">
            <SectionTitle title="Vos charges fixes" />
            <FormOpeningText
                text="Listez vos charges courantes récurrentes, en hors taxe (ou TTC
                si vous n'êtes pas soumis à la TVA)."
            />
            <Grid
                container
                columnGap={0.3}
                alignItems={"center"}
                sx={{
                    padding: 2,
                    marginBlock: 2,
                    marginInline: -1,
                    borderRadius: 0.5,
                    background: alpha(theme.palette.success.light, 0.2),
                }}
            >
                <Grid item xs={3}></Grid>
                <Grid
                    item
                    xs={1.7}
                    // sm={9}
                >
                    <Typography variant="subtitle2" textAlign={"center"}>
                        Montant anneé 1
                    </Typography>
                </Grid>
                <Grid
                    item
                    xs={1.7}
                    // sm={9}
                >
                    <Typography variant="subtitle2" textAlign={"center"}>
                        Montant anneé 2
                    </Typography>
                </Grid>
                <Grid
                    item
                    xs={1.7}
                    // sm={9}
                >
                    <Typography variant="subtitle2" textAlign={"center"}>
                        Montant anneé 3
                    </Typography>
                </Grid>
                <Grid
                    item
                    xs={1.7}
                    // sm={9}
                >
                    <Typography variant="subtitle2" textAlign={"center"}>
                        Montant anneé 4
                    </Typography>
                </Grid>
                <Grid
                    item
                    xs={1.7}
                    // sm={9}
                >
                    <Typography variant="subtitle2" textAlign={"center"}>
                        Montant anneé 5
                    </Typography>
                </Grid>
            </Grid>

            <Grid
                container
                // rowSpacing={1}
                // columnSpacing={0}
            >
                {chargesFixesDataArray.map(({ name, label }) => (
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
                            xs={1.7}
                            sx={{
                                paddingInline: 0.3,
                            }}
                            // sm={9}
                        >
                            <BaseTextInput
                                id={name}
                                name={`charges_fixes.annee1.${name}`}
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
                            xs={1.7}
                            sx={{
                                paddingInline: 0.3,
                            }}
                            // sm={9}
                        >
                            <BaseTextInput
                                id={name}
                                name={`charges_fixes.annee2.${name}`}
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
                            xs={1.7}
                            sx={{
                                paddingInline: 0.3,
                            }}
                            // sm={9}
                        >
                            <BaseTextInput
                                id={name}
                                name={`charges_fixes.annee3.${name}`}
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
                            xs={1.7}
                            sx={{
                                paddingInline: 0.3,
                            }}
                            // sm={9}
                        >
                            <BaseTextInput
                                id={name}
                                name={`charges_fixes.annee4.${name}`}
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
                            xs={1.7}
                            sx={{
                                paddingInline: 0.3,
                            }}
                            // sm={9}
                        >
                            <BaseTextInput
                                id={name}
                                name={`charges_fixes.annee5.${name}`}
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
                <Grid sx={{ pt: 2 }}>
                    <Typography variant="subtitle1" color={"primary"}>
                        Autres charges (inscrire libellé ci-dessous) :
                    </Typography>
                </Grid>
                <FieldArray name="charges_fixes.autres_charges_fixes">
                    {(fieldArrayProps) => {
                        // console.log(fieldArrayProps);
                        const { push, remove, form } = fieldArrayProps;
                        const { values } = form;
                        const autres_charges_fixes =
                            values.charges_fixes.autres_charges_fixes;
                        // console.log(autres_frais);
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
                                {autres_charges_fixes?.map((el, index) => (
                                    <Grid
                                        container
                                        columnGap={0.2}
                                        alignItems={"center"}
                                        key={`${el.name}${index}`}
                                        // sx={{
                                        //     marginBottom: 2,
                                        // }}
                                    >
                                        <Grid
                                            item
                                            xs={3}
                                            // sm={9}
                                        >
                                            <BaseTextInput
                                                // id={name}
                                                name={`charges_fixes.autres_charges_fixes[${index}].name`}
                                                // width={"15"}
                                                // textAlign="right"
                                                fullWidth
                                                // comment={
                                                //     "Nom de votre projet ou description de votre activité"
                                                // }
                                            />
                                        </Grid>
                                        <Grid
                                            item
                                            xs={1.7}
                                            sx={{
                                                paddingInline: 0.3,
                                            }}
                                            // sm={9}
                                        >
                                            <BaseTextInput
                                                // id={el.name}
                                                name={`charges_fixes.autres_charges_fixes[${index}].autres_an1`}
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
                                            xs={1.7}
                                            sx={{
                                                paddingInline: 0.3,
                                            }}
                                            // sm={9}
                                        >
                                            <BaseTextInput
                                                // id={name}
                                                name={`charges_fixes.autres_charges_fixes[${index}].autres_an2`}
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
                                            xs={1.7}
                                            sx={{
                                                paddingInline: 0.3,
                                            }}
                                            // sm={9}
                                        >
                                            <BaseTextInput
                                                // id={name}
                                                name={`charges_fixes.autres_charges_fixes[${index}].autres_an3`}
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
                                            xs={1.7}
                                            sx={{
                                                paddingInline: 0.3,
                                            }}
                                            // sm={9}
                                        >
                                            <BaseTextInput
                                                name={`charges_fixes.autres_charges_fixes[${index}].autres_an4`}
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
                                            xs={1.7}
                                            sx={{
                                                paddingInline: 0.3,
                                            }}
                                            // sm={9}
                                        >
                                            <BaseTextInput
                                                name={`charges_fixes.autres_charges_fixes[${index}].autres_an5`}
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
                                <Tooltip title="Ajouter une autre charge">
                                    <IconButton
                                        variant="contained"
                                        size="small"
                                        // color={`${theme.palette.primary.light}`}
                                        onClick={() => {
                                            push({
                                                name: "",
                                                autres_an1: "",
                                                autres_an2: "",
                                                autres_an3: "",
                                                autres_an4: "",
                                                autres_an5: "",
                                            });
                                        }}
                                    >
                                        <AddCircleIcon
                                            color="success"
                                            fontSize="large"
                                        />
                                    </IconButton>
                                </Tooltip>
                            </Box>
                        );
                    }}
                </FieldArray>
                <Grid
                    container
                    columnGap={0.2}
                    alignItems={"center"}
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
                        xs={1.7}
                        sx={{
                            paddingInline: 0.3,
                        }}
                        // sm={9}
                    >
                        <BaseTextInput
                            // id={name}
                            name={`charges_fixes.annee1.total_charges_fixes`}
                            width={"15"}
                            customValue={sumChargesFixes[0]}
                            readOnly
                            textAlign="right"
                            // fullWidth
                            // comment={
                            //     "Nom de votre projet ou description de votre activité"
                            // }
                        />
                    </Grid>
                    <Grid
                        item
                        xs={1.7}
                        sx={{
                            paddingInline: 0.3,
                        }}
                        // sm={9}
                    >
                        <BaseTextInput
                            // id={name}
                            name={`charges_fixes.annee2.total_charges_fixes`}
                            width={"15"}
                            textAlign="right"
                            customValue={sumChargesFixes[1]}
                            readOnly
                            // fullWidth
                            // comment={
                            //     "Nom de votre projet ou description de votre activité"
                            // }
                        />
                    </Grid>{" "}
                    <Grid
                        item
                        xs={1.7}
                        sx={{
                            paddingInline: 0.3,
                        }}
                        // sm={9}
                    >
                        <BaseTextInput
                            // id={name}
                            name={`charges_fixes.annee3.total_charges_fixes`}
                            width={"15"}
                            textAlign="right"
                            customValue={sumChargesFixes[2]}
                            readOnly
                            // fullWidth
                            // comment={
                            //     "Nom de votre projet ou description de votre activité"
                            // }
                        />
                    </Grid>
                    <Grid
                        item
                        xs={1.7}
                        sx={{
                            paddingInline: 0.3,
                        }}
                        // sm={9}
                    >
                        <BaseTextInput
                            // id={name}
                            name={`charges_fixes.annee4.total_charges_fixes`}
                            width={"15"}
                            textAlign="right"
                            customValue={sumChargesFixes[3]}
                            readOnly
                            // fullWidth
                            // comment={
                            //     "Nom de votre projet ou description de votre activité"
                            // }
                        />
                    </Grid>
                    <Grid
                        item
                        xs={1.7}
                        sx={{
                            paddingInline: 0.3,
                        }}
                        // sm={9}
                    >
                        <BaseTextInput
                            // id={name}
                            name={`charges_fixes.annee5.total_charges_fixes`}
                            width={"15"}
                            textAlign="right"
                            customValue={sumChargesFixes[4]}
                            readOnly
                            // fullWidth
                            // comment={
                            //     "Nom de votre projet ou description de votre activité"
                            // }
                        />
                    </Grid>
                </Grid>
            </Grid>
        </div>
    );
};

export default Page3;
