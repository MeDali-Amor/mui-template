import {
    Autocomplete,
    Button,
    FormControl,
    FormControlLabel,
    FormLabel,
    Grid,
    Radio,
    RadioGroup,
    Stack,
    TextField,
    Typography,
    useTheme,
} from "@mui/material";
import { Box } from "@mui/system";
import { FieldArray } from "formik";
import React, { useEffect, useState } from "react";
import AutoCompleteInputField from "../../components/AutoCompleteInputField";
import InputFeild from "../../components/InputFeild";
import RadioButtonGroup from "../../components/RadioButtonGroup";

const AssociesForm = ({
    isDirig,
    setisDirig,
    isPerson,
    setIsPerson,
    montantCap,
    setMontantCap,
    pourcentageCapital,
    setpourcentageCapital,
    pourcentageVote,
    setpourcentageVote,
}) => {
    const theme = useTheme();
    const [capitalPlus25, setCapitalPlus25] = useState(false);
    const [detentionCapDirect, setDetentionCapDirect] = useState(false);
    const [directePleinePropriete, setDirectePleinePropriete] = useState("");
    const [directeNuePropriete, setDirecteNuePropriete] = useState("");

    const [dirigBeneficiaire, setDirigBeneficiaire] = useState(null);
    const [benefOptions, setBenefOptions] = useState([]);
    const [nationality, setNationality] = useState("");

    useEffect(() => {
        if (capitalPlus25 === false) setDetentionCapDirect(false);
    }, [capitalPlus25]);
    useEffect(() => {
        if (detentionCapDirect === false) {
            setDirecteNuePropriete("");
            setDirectePleinePropriete("");
        }
    }, [detentionCapDirect]);
    const capitalpourcentagesetter = (value) => {
        console.log(value);
    };
    return (
        <FieldArray name="beneficiaires">
            {(fieldArrayProps) => {
                // console.log(fieldArrayProps);
                const { push, remove, form } = fieldArrayProps;
                const { values } = form;
                const { dirig, beneficiaires } = values;
                // const options = isDirig
                //     ? dirig.filter((el) => {
                //           return beneficiaires.some((f) => {
                //               return (
                //                   f.prenombenefi !==
                //                       el.detprenomdir &&
                //                   f.nombenefi !== el.detnomdir
                //               );
                //           });
                //       })
                //     : [];
                // setBenefOptions(dirig);
                return (
                    <Box
                        sx={{
                            position: "relative",
                        }}
                    >
                        <Grid
                            // rowSpacing={3}
                            // columnSpacing={6}
                            // container
                            sx={{ py: 2 }}
                            // xs={12}
                        >
                            <Typography variant="h4" gutterBottom>
                                Associés
                            </Typography>
                        </Grid>
                        <Grid
                            container
                            rowSpacing={3}
                            columnSpacing={6}
                            // sx={{ pb: 5 }}
                        >
                            <Grid item xs={12} sm={6}>
                                <InputFeild
                                    id="capmont"
                                    name="capital"
                                    label="Capital"
                                    fullWidth
                                    customValue={montantCap}
                                    setCustomValue={setMontantCap}
                                />
                                <InputFeild
                                    // type="hidden"
                                    id="cappercent"
                                    name="restcapital"
                                    // label="reste Capital"
                                    hiddenLabel
                                    height={0}
                                    fullWidth
                                    customValue={pourcentageCapital}
                                    // setCustomValue={setMontantCap}
                                />
                            </Grid>
                        </Grid>
                        {/* {dirig && dirig.length > 0 */}
                        {/* ?  */}
                        {beneficiaires.map((el, index) =>
                            index === beneficiaires.length - 1 ? (
                                <Grid
                                    container
                                    rowSpacing={3}
                                    columnSpacing={6}
                                    key={index}
                                    sx={{ py: 5 }}
                                >
                                    <Grid item xs={12} sm={12}>
                                        <Typography variant="h6" gutterBottom>
                                            Ajouter un Associé
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={12} sm={12}>
                                        <RadioButtonGroup
                                            name={`beneficiaires[${index}].isPerson`}
                                            label=" L'associé est"
                                            label1="une personne physique"
                                            label2="une personne morale"
                                            condition={isPerson}
                                            setCondition={setIsPerson}
                                        />
                                    </Grid>
                                    {/* <Grid item xs={12} sm={6}></Grid> */}
                                    {isPerson === "yes" ? (
                                        <>
                                            <Grid item xs={12} sm={6}>
                                                <FormControl>
                                                    {/* <Grid
                                                                container
                                                                rowSpacing={3}
                                                                columnSpacing={
                                                                    6
                                                                }
                                                                key={index}
                                                                // sx={{ pb: 5 }}
                                                            >
                                                                <Grid
                                                                    item
                                                                    xs={12}
                                                                    sm={6}
                                                                > */}
                                                    <FormLabel id="demo-controlled-radio-buttons-group">
                                                        L'associé est
                                                    </FormLabel>
                                                    {/* </Grid>
                                                                <Grid */}
                                                    {/* item xs={12}
                                                            sm={6}> */}
                                                    <RadioGroup
                                                        aria-labelledby="demo-controlled-radio-buttons-group"
                                                        name="controlled-radio-buttons-group"
                                                        value={isDirig}
                                                        row
                                                        onChange={(e) => {
                                                            setisDirig(
                                                                e.target.value
                                                            );
                                                        }}
                                                    >
                                                        <FormControlLabel
                                                            value={"yes"}
                                                            control={<Radio />}
                                                            label={
                                                                <Typography
                                                                    sx={{
                                                                        fontSize: 12,
                                                                        fontWeight: 600,
                                                                    }}
                                                                    variant="body2"
                                                                >
                                                                    un derigeant
                                                                    actuel
                                                                </Typography>
                                                            }
                                                        />
                                                        <FormControlLabel
                                                            value={"no"}
                                                            control={<Radio />}
                                                            label={
                                                                <Typography
                                                                    sx={{
                                                                        fontSize: 12,
                                                                        fontWeight: 600,
                                                                    }}
                                                                    variant="body2"
                                                                >
                                                                    une autre
                                                                    personne
                                                                </Typography>
                                                            }
                                                        />
                                                    </RadioGroup>
                                                    {/* </Grid> */}
                                                    {/* </Grid> */}
                                                </FormControl>
                                            </Grid>
                                            <Grid item xs={12} sm={6}>
                                                {/* {isDirig == ? ( */}
                                                <Autocomplete
                                                    // sx={{
                                                    //     width: "100%",
                                                    // }}
                                                    fullWidth
                                                    disabled={isDirig === "no"}
                                                    id="dirig-select"
                                                    options={dirig}
                                                    autoHighlight
                                                    getOptionLabel={(option) =>
                                                        option.detnomdir
                                                    }
                                                    onChange={(e, value) => {
                                                        setDirigBeneficiaire(
                                                            value
                                                        );
                                                        // console.log(
                                                        //     e.target
                                                        // );
                                                    }}
                                                    renderOption={(
                                                        props,
                                                        option
                                                    ) => (
                                                        <Box
                                                            component="li"
                                                            {...props}
                                                        >
                                                            {
                                                                option.detprenomdir
                                                            }{" "}
                                                            {option.detnomdir}
                                                        </Box>
                                                    )}
                                                    renderInput={(params) => (
                                                        <TextField
                                                            {...params}
                                                            label=""
                                                            inputProps={{
                                                                ...params.inputProps,
                                                            }}
                                                        />
                                                    )}
                                                />
                                            </Grid>
                                            <Grid item xs={12} sm={6}>
                                                <InputFeild
                                                    id="nombeneficiaire"
                                                    name={`beneficiaires[${index}].nombenefi`}
                                                    label="Nom"
                                                    fullWidth
                                                    customValue={
                                                        dirigBeneficiaire &&
                                                        dirigBeneficiaire.detnomdir
                                                    }
                                                />
                                            </Grid>
                                            <Grid item xs={12} sm={6}>
                                                <InputFeild
                                                    id="prenombeneficiaire"
                                                    name={`beneficiaires[${index}].prenombenefi`}
                                                    label="Prénom"
                                                    fullWidth
                                                    customValue={
                                                        dirigBeneficiaire &&
                                                        dirigBeneficiaire.detprenomdir
                                                    }
                                                />
                                            </Grid>
                                            <Grid item xs={12} sm={6}>
                                                <InputFeild
                                                    InputLabelProps={{
                                                        shrink: true,
                                                    }}
                                                    id="datebeneficiaire"
                                                    name={`beneficiaires[${index}].datebeneficiaire`}
                                                    label="Date à la quelle est devenue associé effectif"
                                                    type="date"
                                                    fullWidth
                                                />
                                            </Grid>
                                            <Grid item xs={12} sm={6}>
                                                <InputFeild
                                                    InputLabelProps={{
                                                        shrink: true,
                                                    }}
                                                    id="datenaissancebeneficiaire"
                                                    name={`beneficiaires[${index}].datenaissancebenefi`}
                                                    label="Date de naissance"
                                                    type="date"
                                                    fullWidth
                                                    customValue={
                                                        dirigBeneficiaire &&
                                                        dirigBeneficiaire.datenaissance
                                                    }
                                                />
                                            </Grid>
                                            <Grid item xs={12} sm={6}>
                                                <AutoCompleteInputField
                                                    // autoLabel="Pays"
                                                    id="paysnaissancebeneficiaire"
                                                    name={`beneficiaires[${index}].paysnaissancebenefi`}
                                                    label="Pays de naissance"
                                                    fullWidth
                                                    // handleChange={(
                                                    //     value
                                                    // ) =>
                                                    //     value
                                                    //         ? setNationality(
                                                    //               value.label
                                                    //           )
                                                    //         : setNationality(
                                                    //               ""
                                                    //           )
                                                    // }
                                                    customValue={
                                                        dirigBeneficiaire &&
                                                        dirigBeneficiaire.paysnaissance
                                                    }
                                                />
                                            </Grid>
                                            <Grid item xs={12} sm={6}>
                                                <InputFeild
                                                    id="codepostalnaissancebeneficiaire"
                                                    name={`beneficiaires[${index}].codepostalnaissancebenefi`}
                                                    label="Code postal de naissance"
                                                    fullWidth
                                                    customValue={
                                                        dirigBeneficiaire &&
                                                        dirigBeneficiaire.codepostalnaissance
                                                    }
                                                />
                                            </Grid>
                                            <Grid item xs={12} sm={6}>
                                                <InputFeild
                                                    id="villenaissancebeneficiaire"
                                                    name={`beneficiaires[${index}].villenaissancebenefi`}
                                                    label="Ville de naissance"
                                                    fullWidth
                                                    customValue={
                                                        dirigBeneficiaire &&
                                                        dirigBeneficiaire.villenaissance
                                                    }
                                                />
                                            </Grid>
                                            <Grid item xs={12} sm={6}>
                                                <AutoCompleteInputField
                                                    autoLabel="Pays"
                                                    id="nationalitebeneficiaire"
                                                    name={`beneficiaires[${index}].nationalitebenefi`}
                                                    label="Nationalité"
                                                    fullWidth
                                                    customValue={
                                                        dirigBeneficiaire &&
                                                        dirigBeneficiaire.nationalite
                                                    }
                                                />
                                            </Grid>
                                            <Grid item xs={12} sm={6}>
                                                <AutoCompleteInputField
                                                    autoLabel="Pays"
                                                    id="paysresidencebeneficiaire"
                                                    name={`beneficiaires[${index}].paysresidencebenefi`}
                                                    label="Pays de residence"
                                                    fullWidth
                                                    customValue={
                                                        dirigBeneficiaire &&
                                                        dirigBeneficiaire.paysresidence
                                                    }
                                                    // handleChange={(
                                                    //     value
                                                    // ) =>
                                                    //     value
                                                    //         ? setDirigTel(
                                                    //               `+${value.phone}`
                                                    //           )
                                                    //         : setDirigTel(
                                                    //               ""
                                                    //           )
                                                    // }
                                                />
                                            </Grid>
                                            <Grid item xs={12} sm={6}>
                                                <InputFeild
                                                    id="adressebeneficiaire"
                                                    name={`beneficiaires[${index}].dirigAdressebenefi`}
                                                    label="Adresse"
                                                    fullWidth
                                                    customValue={
                                                        dirigBeneficiaire &&
                                                        dirigBeneficiaire.dirigAdresse
                                                    }
                                                />
                                            </Grid>
                                        </>
                                    ) : (
                                        <>
                                            <Grid item xs={12} sm={6}>
                                                <InputFeild
                                                    id="raisonsocialeassocie"
                                                    name={`beneficiaires[${index}].raisonsociale`}
                                                    label="Raison Sociale"
                                                    fullWidth
                                                />
                                            </Grid>
                                            <Grid item xs={12} sm={6}>
                                                <InputFeild
                                                    id="sirenassocie"
                                                    name={`beneficiaires[${index}].siren`}
                                                    label="Siren"
                                                    fullWidth
                                                />
                                            </Grid>
                                            <Grid item xs={12} sm={6}>
                                                <InputFeild
                                                    InputLabelProps={{
                                                        shrink: true,
                                                    }}
                                                    id="datebeneficiaire"
                                                    name={`beneficiaires[${index}].datebeneficiaire`}
                                                    label="Date à la quelle est devenue un associé"
                                                    type="date"
                                                    fullWidth
                                                />
                                            </Grid>
                                            <Grid item xs={12} sm={6}>
                                                <InputFeild
                                                    InputLabelProps={{
                                                        shrink: true,
                                                    }}
                                                    id="datecreationassocie"
                                                    name={`beneficiaires[${index}].datecreation`}
                                                    label="Date de creation"
                                                    type="date"
                                                    fullWidth
                                                    customValue={
                                                        dirigBeneficiaire &&
                                                        dirigBeneficiaire.datenaissance
                                                    }
                                                />
                                            </Grid>
                                            <Grid item xs={12} sm={6}>
                                                <AutoCompleteInputField
                                                    autoLabel="Pays"
                                                    id="paysassocie"
                                                    name={`beneficiaires[${index}].pays`}
                                                    label="Nationalité"
                                                    fullWidth
                                                    customValue={
                                                        dirigBeneficiaire &&
                                                        dirigBeneficiaire.nationalite
                                                    }
                                                />
                                            </Grid>
                                            <Grid item xs={12} sm={6}>
                                                <InputFeild
                                                    id="adresseassocie"
                                                    name={`beneficiaires[${index}].adresse`}
                                                    label="Adresse"
                                                    fullWidth
                                                    // customValue={
                                                    //     dirigBeneficiaire &&
                                                    //     dirigBeneficiaire.dirigAdresse
                                                    // }
                                                />
                                            </Grid>
                                        </>
                                    )}
                                    <Grid item xs={12} sm={12}>
                                        <Typography variant="h6" gutterBottom>
                                            Modalité de controle exercé par
                                            l'associé
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <Stack
                                            direction="row"
                                            spacing={1}
                                            alignItems="center"
                                        >
                                            <InputFeild
                                                id="adresseassocie"
                                                name={`beneficiaires[${index}].detentioncapital`}
                                                label="Détention du capital"
                                                fullWidth
                                                // customValue={
                                                //     dirigBeneficiaire &&
                                                //     dirigBeneficiaire.dirigAdresse
                                                // }
                                            />
                                            <Typography>%</Typography>
                                        </Stack>
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <Stack
                                            direction="row"
                                            spacing={1}
                                            alignItems="center"
                                        >
                                            <InputFeild
                                                id="adresseassocie"
                                                name={`beneficiaires[${index}].detentionvote`}
                                                label="Détention du droit de vote"
                                                fullWidth
                                            />{" "}
                                            <Typography>%</Typography>
                                        </Stack>
                                    </Grid>
                                </Grid>
                            ) : (
                                <Grid
                                    container
                                    rowSpacing={1}
                                    columnSpacing={2}
                                    key={index}
                                    sx={{
                                        mx: 1,
                                        my: 2,
                                        px: 1,
                                        py: 1,
                                        pb: 1,
                                        backgroundColor: "#fff",
                                        boxShadow: theme.shadows[2],
                                        borderRadius: 0.5,
                                    }}
                                >
                                    <Grid item xs={12} sm={4}>
                                        <Stack
                                            direction="row"
                                            alignItems="center"
                                            spacing={2}
                                        >
                                            <Typography variant="body2">
                                                {el.prenombenefi}
                                            </Typography>
                                            <Typography variant="body2">
                                                {el.nombenefi}
                                            </Typography>
                                        </Stack>
                                    </Grid>
                                </Grid>
                            )
                        )}

                        <Button
                            size="large"
                            sx={{
                                position: "absolute",
                                marginTop: 3,
                                bottom: -42,
                                right: "50%",
                                transform: "translateX(50%) translateY(100%)",
                                "&.MuiButton-outlinedSecondary": {
                                    border: "2px solid",
                                },
                            }}
                            disabled={
                                isPerson === "yes"
                                    ? !beneficiaires[beneficiaires.length - 1]
                                          .nombenefi ||
                                      !beneficiaires[beneficiaires.length - 1]
                                          .prenombenefi ||
                                      Number(
                                          beneficiaires[
                                              beneficiaires.length - 1
                                          ].detentioncapital
                                      ) < 0 ||
                                      !beneficiaires[beneficiaires.length - 1]
                                          .detentioncapital ||
                                      !beneficiaires[beneficiaires.length - 1]
                                          .detentionvote ||
                                      Number(
                                          beneficiaires[
                                              beneficiaires.length - 1
                                          ].detentioncapital
                                      ) > pourcentageCapital
                                    : !beneficiaires[beneficiaires.length - 1]
                                          .raisonsociale ||
                                      !beneficiaires[beneficiaires.length - 1]
                                          .siren ||
                                      Number(
                                          beneficiaires[
                                              beneficiaires.length - 1
                                          ].detentioncapital
                                      ) < 0 ||
                                      Number(
                                          beneficiaires[
                                              beneficiaires.length - 1
                                          ].detentioncapital
                                      ) > pourcentageCapital ||
                                      Number(
                                          beneficiaires[
                                              beneficiaires.length - 1
                                          ].detentionvote
                                      ) < 0 ||
                                      Number(
                                          beneficiaires[
                                              beneficiaires.length - 1
                                          ].detentionvote
                                      ) > pourcentageVote
                            }
                            variant="outlined"
                            color="secondary"
                            onClick={() => {
                                if (isPerson === "yes") {
                                    if (
                                        beneficiaires[beneficiaires.length - 1]
                                            .nombenefi &&
                                        beneficiaires[beneficiaires.length - 1]
                                            .prenombenefi &&
                                        Number(
                                            beneficiaires[
                                                beneficiaires.length - 1
                                            ].detentioncapital
                                        ) > 0 &&
                                        Number(
                                            beneficiaires[
                                                beneficiaires.length - 1
                                            ].detentioncapital
                                        ) < pourcentageCapital &&
                                        Number(
                                            beneficiaires[
                                                beneficiaires.length - 1
                                            ].detentionvote
                                        ) > 0 &&
                                        Number(
                                            beneficiaires[
                                                beneficiaires.length - 1
                                            ].detentionvote
                                        ) < pourcentageVote
                                    ) {
                                        // if (dirigBeneficiaire) {
                                        //     const current = benefOptions.filter(
                                        //         (el) => el !== dirigBeneficiaire
                                        //     );
                                        //     setBenefOptions(current);
                                        // }
                                        const currentVote =
                                            pourcentageVote -
                                            beneficiaires[
                                                beneficiaires.length - 1
                                            ].detentionvote;
                                        const currentCap =
                                            pourcentageCapital -
                                            beneficiaires[
                                                beneficiaires.length - 1
                                            ].detentioncapital;
                                        setpourcentageCapital(currentCap);
                                        setpourcentageVote(currentVote);

                                        // console.log(beneficiaires);
                                        setisDirig("no");
                                        setDirigBeneficiaire(null);
                                        push({
                                            datebeneficiaire: "",
                                            nombenefi: "",
                                            prenombenefi: "",
                                            datenaissancebenefi: "",
                                            paysnaissancebenefi: "",
                                            codepostalnaissancebenefi: "",
                                            villenaissancebenefi: "",
                                            nationalitebenefi: "",
                                            paysresidencebenefi: "",
                                            dirigAdressebenefi: "",
                                            detentioncapital: "",
                                            detentionvote: "",
                                            // raisonsociale: "",
                                            // siren: "",
                                            // adresse: "",
                                            // pays: "",
                                            // datecreation: "",
                                        });
                                    }
                                    return;
                                } else {
                                    if (
                                        beneficiaires[beneficiaires.length - 1]
                                            .raisonsociale &&
                                        beneficiaires[beneficiaires.length - 1]
                                            .siren &&
                                        Number(
                                            beneficiaires[
                                                beneficiaires.length - 1
                                            ].detentioncapital
                                        ) > 0 &&
                                        Number(
                                            beneficiaires[
                                                beneficiaires.length - 1
                                            ].detentioncapital
                                        ) > pourcentageCapital &&
                                        Number(
                                            beneficiaires[
                                                beneficiaires.length - 1
                                            ].detentionvote
                                        ) > 0 &&
                                        Number(
                                            beneficiaires[
                                                beneficiaires.length - 1
                                            ].detentionvote
                                        ) < pourcentageVote
                                    ) {
                                        setisDirig("no");
                                        setDirigBeneficiaire(null);

                                        const currentVote =
                                            pourcentageVote -
                                            beneficiaires[
                                                beneficiaires.length - 1
                                            ].detentionvote;
                                        const currentCap =
                                            pourcentageCapital -
                                            beneficiaires[
                                                beneficiaires.length - 1
                                            ].detentioncapital;
                                        setpourcentageCapital(currentCap);
                                        setpourcentageVote(currentVote);
                                        push({
                                            datebeneficiaire: "",
                                            // nombenefi: "",
                                            // prenombenefi: "",
                                            // datenaissancebenefi: "",
                                            // paysnaissancebenefi: "",
                                            // codepostalnaissancebenefi: "",
                                            // villenaissancebenefi: "",
                                            // nationalitebenefi: "",
                                            // paysresidencebenefi: "",
                                            // dirigAdressebenefi: "",
                                            raisonsociale: "",
                                            siren: "",
                                            adresse: "",
                                            pays: "",
                                            datecreation: "",
                                            detentioncapital: "",
                                            detentionvote: "",
                                        });
                                    }
                                }
                            }}
                        >
                            Ajouter un Associé
                            {/* <BorderColorIcon fontSize="medium" /> */}
                        </Button>
                    </Box>
                );
            }}
        </FieldArray>
    );
};

export default AssociesForm;
