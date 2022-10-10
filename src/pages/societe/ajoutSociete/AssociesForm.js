import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Autocomplete,
    Button,
    FormControl,
    FormControlLabel,
    FormLabel,
    Grid,
    IconButton,
    Radio,
    RadioGroup,
    Stack,
    TextField,
    Tooltip,
    Typography,
    useTheme,
} from "@mui/material";
import { Box } from "@mui/system";
import { Field, FieldArray } from "formik";
import React, { useEffect, useState } from "react";
import AutoCompleteInputField from "../../components/AutoCompleteInputField";
import InputFeild from "../../components/InputFeild";
import RadioButtonGroup from "../../components/RadioButtonGroup";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

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
                const { values, errors, touched } = form;
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
                            <Grid item xs={12} sm={12}>
                                <Typography variant="h6" gutterBottom>
                                    Montant du capital
                                </Typography>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <InputFeild
                                    id="capmont"
                                    name="capital"
                                    label="Capital"
                                    fullWidth
                                    customValue={montantCap}
                                    setCustomValue={setMontantCap}
                                />
                                {/* <InputFeild
                                    // type="hidden"
                                    id="cappercent"
                                    name="restcapital"
                                    // label="reste Capital"
                                    hiddenLabel
                                    height={0}
                                    fullWidth
                                    customValue={pourcentageCapital}
                                    // setCustomValue={setMontantCap}
                                /> */}
                            </Grid>
                            {beneficiaires.length - 1 > 0 && (
                                <Grid item xs={12} sm={12}>
                                    <Typography variant="h6" gutterBottom>
                                        Liste des associés ajoutés
                                    </Typography>
                                </Grid>
                            )}
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
                                            name={`beneficiaires[${index}].person`}
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
                                            {/* <InputFeild
                                                id="adresseassocie"
                                                name={`beneficiaires[${index}].detentioncapital`}
                                                label="Détention du capital"
                                                fullWidth
                                                // customValue={
                                                //     dirigBeneficiaire &&
                                                //     dirigBeneficiaire.dirigAdresse
                                                // }
                                            /> */}
                                            <Field
                                                as={InputFeild}
                                                name={`beneficiaires[${index}].detentioncapital`}
                                                validate={(value) => {
                                                    let error;
                                                    const rest =
                                                        Number(
                                                            pourcentageCapital
                                                        ) - Number(value);
                                                    if (rest < 0) {
                                                        error = `ne doit pas depasser ${pourcentageCapital}%`;
                                                    }
                                                    return error;
                                                }}
                                                error={
                                                    touched[
                                                        `beneficiaires[${index}].detentioncapital`
                                                    ] &&
                                                    Boolean(
                                                        errors[
                                                            `beneficiaires[${index}].detentioncapital`
                                                        ]
                                                    )
                                                }
                                                helperText={
                                                    touched[
                                                        `beneficiaires[${index}].detentioncapital`
                                                    ] &&
                                                    errors[
                                                        `beneficiaires[${index}].detentioncapital`
                                                    ]
                                                }
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
                                            <Field
                                                as={InputFeild}
                                                name={`beneficiaires[${index}].detentionvote`}
                                                label="Détention du droit de vote"
                                                fullWidth
                                                validate={(value) => {
                                                    let error;
                                                    const rest =
                                                        Number(
                                                            pourcentageVote
                                                        ) - Number(value);
                                                    if (rest < 0) {
                                                        error = `ne doit pas depasser ${pourcentageVote}%`;
                                                    }
                                                    return error;
                                                }}
                                                error={
                                                    touched[
                                                        `beneficiaires[${index}].detentionvote`
                                                    ] &&
                                                    Boolean(
                                                        errors[
                                                            `beneficiaires[${index}].detentionvote`
                                                        ]
                                                    )
                                                }
                                                helperText={
                                                    touched[
                                                        `beneficiaires[${index}].detentionvote`
                                                    ] &&
                                                    errors[
                                                        `beneficiaires[${index}].detentionvote`
                                                    ]
                                                }
                                            />
                                            {/* <InputFeild
                                                id="adresseassocie"
                                                name={`beneficiaires[${index}].detentionvote`}
                                                
                                            />{" "} */}
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
                                        my: 0.1,
                                        px: 1,
                                        py: 1,
                                        pb: 1,
                                        backgroundColor: "#fff",
                                        boxShadow: theme.shadows[2],
                                        borderRadius: 0.3,
                                    }}
                                >
                                    <Grid item xs={12} sm={2}>
                                        <Typography variant="body2">
                                            {el.person === "yes"
                                                ? el.prenombenefi
                                                : el.raisonsociale}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={12} sm={2}>
                                        <Typography variant="body2">
                                            {el.person === "yes"
                                                ? el.nombenefi
                                                : el.siren}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={12} sm={2}>
                                        <Typography variant="body2">
                                            {el.person === "yes"
                                                ? "Personne Physique"
                                                : "Personne Morale"}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={12} sm={2}>
                                        <Typography variant="body2">
                                            {`${el.detentioncapital}% du capital`}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={12} sm={2}>
                                        <Typography variant="body2">
                                            {`${el.detentionvote}% du droit de vote`}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={12} sm={1}>
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
                                                    const currentVote =
                                                        Number(
                                                            pourcentageVote
                                                        ) +
                                                        Number(
                                                            beneficiaires[index]
                                                                .detentionvote
                                                        );
                                                    const currentCap =
                                                        Number(
                                                            pourcentageCapital
                                                        ) +
                                                        Number(
                                                            beneficiaires[index]
                                                                .detentioncapital
                                                        );
                                                    setpourcentageCapital(
                                                        currentCap
                                                    );
                                                    setpourcentageVote(
                                                        currentVote
                                                    );
                                                    remove(index);
                                                }}
                                            >
                                                <DeleteOutlineOutlinedIcon />
                                            </IconButton>
                                        </Tooltip>
                                    </Grid>
                                </Grid>
                                // <Accordion
                                //     // expanded={expanded === "panel1"}
                                //     // onChange={handle("panel1")}
                                //     sx={{
                                //         borderRadius: 0.5,
                                //     }}
                                // >
                                //     <AccordionSummary
                                //         expandIcon={<ExpandMoreIcon />}
                                //         aria-controls="panel1bh-content"
                                //         id="panel1bh-header"
                                //         sx={{
                                //             width: "100%",
                                //         }}
                                //     >
                                //         <Grid
                                //             container
                                //             rowSpacing={1}
                                //             columnSpacing={2}
                                //             key={index}
                                //             sx={{
                                //                 pt: 1,
                                //             }}
                                //         >
                                //             <Grid item xs={12} sm={6}>
                                //                 <Typography variant="body2">
                                //                     {el.person === "yes"
                                //                         ? el.prenombenefi + " "
                                //                         : el.raisonsociale +
                                //                           " "}
                                //                 </Typography>
                                //                 <Typography variant="body2">
                                //                     {el.person === "yes"
                                //                         ? el.nombenefi + " "
                                //                         : el.siren + " "}
                                //                 </Typography>
                                //             </Grid>
                                //             <Grid item xs={12} sm={5}>
                                //                 <Typography variant="body2">
                                //                     {el.person === "yes"
                                //                         ? "Personne Physique"
                                //                         : "Personne Morale"}
                                //                 </Typography>
                                //             </Grid>
                                //             <Grid item xs={12} sm={1}>
                                //                 <Tooltip title="Supprimer dirigeant">
                                //                     <IconButton
                                //                         // sx={{
                                //                         //     position:
                                //                         //         "absolute",
                                //                         //     top: "25%",
                                //                         //     right: -40,
                                //                         //     transform:
                                //                         //         "translateY(-50%)",
                                //                         // }}
                                //                         color="error"
                                //                         ria-label="delete"
                                //                         size="small"
                                //                         onClick={() =>
                                //                             remove(index)
                                //                         }
                                //                     >
                                //                         <DeleteOutlineOutlinedIcon />
                                //                     </IconButton>
                                //                 </Tooltip>
                                //             </Grid>
                                //         </Grid>
                                //     </AccordionSummary>
                                //     <AccordionDetails>
                                //         <Typography>
                                //             Nulla facilisi. Phasellus
                                //             sollicitudin nulla et quam mattis
                                //             feugiat. Aliquam eget maximus est,
                                //             id dignissim quam.
                                //         </Typography>
                                //     </AccordionDetails>
                                // </Accordion>
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
                                      !beneficiaires[beneficiaires.length - 1]
                                          .detentioncapital ||
                                      !beneficiaires[beneficiaires.length - 1]
                                          .detentionvote ||
                                      Number(
                                          beneficiaires[
                                              beneficiaires.length - 1
                                          ].detentioncapital
                                      ) < 0 ||
                                      Number(
                                          beneficiaires[
                                              beneficiaires.length - 1
                                          ].detentioncapital
                                      ) > pourcentageCapital
                                    : isPerson === "no"
                                    ? !beneficiaires[beneficiaires.length - 1]
                                          .raisonsociale ||
                                      !beneficiaires[beneficiaires.length - 1]
                                          .siren ||
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
                                    : false
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
                                            Number(pourcentageVote) -
                                            Number(
                                                beneficiaires[
                                                    beneficiaires.length - 1
                                                ].detentionvote
                                            );
                                        const currentCap =
                                            Number(pourcentageCapital) -
                                            Number(
                                                beneficiaires[
                                                    beneficiaires.length - 1
                                                ].detentioncapital
                                            );
                                        setpourcentageCapital(currentCap);
                                        setpourcentageVote(currentVote);
                                        // setIsPerson("yes");
                                        setisDirig("no");
                                        // console.log(beneficiaires);
                                        setDirigBeneficiaire(null);
                                        push({
                                            person: "yes",
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
                                            detentioncapital:
                                                pourcentageCapital -
                                                Number(
                                                    beneficiaires[
                                                        beneficiaires.length - 1
                                                    ].detentioncapital
                                                ),
                                            detentionvote:
                                                pourcentageVote -
                                                Number(
                                                    beneficiaires[
                                                        beneficiaires.length - 1
                                                    ].detentionvote
                                                ),
                                            raisonsociale: "",
                                            siren: "",
                                            adresse: "",
                                            pays: "",
                                            datecreation: "",
                                        });
                                    }
                                    // else console.log("error");
                                } else if (isPerson === "no") {
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
                                        setIsPerson("yes");
                                        setisDirig("no");
                                        setDirigBeneficiaire(null);

                                        const currentVote =
                                            Number(pourcentageVote) -
                                            Number(
                                                beneficiaires[
                                                    beneficiaires.length - 1
                                                ].detentionvote
                                            );
                                        const currentCap =
                                            Number(pourcentageCapital) -
                                            Number(
                                                beneficiaires[
                                                    beneficiaires.length - 1
                                                ].detentioncapital
                                            );
                                        setpourcentageCapital(currentCap);
                                        setpourcentageVote(currentVote);
                                        push({
                                            person: "yes",
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
                                            raisonsociale: "",
                                            siren: "",
                                            adresse: "",
                                            pays: "",
                                            datecreation: "",
                                        });
                                    }
                                    // else console.log("error");
                                } else return;
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
