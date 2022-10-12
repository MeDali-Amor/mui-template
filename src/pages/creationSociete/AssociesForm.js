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
    nature,
    setNature,
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
        <FieldArray name="associes">
            {(fieldArrayProps) => {
                // console.log(fieldArrayProps);
                const { push, remove, form } = fieldArrayProps;
                const { values, errors, touched } = form;
                const { dirig, associes } = values;
                // const options = isDirig
                //     ? dirig.filter((el) => {
                //           return associes.some((f) => {
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
                            {associes.length - 1 > 0 && (
                                <Grid item xs={12} sm={12}>
                                    <Typography variant="h6" gutterBottom>
                                        Liste des associés ajoutés
                                    </Typography>
                                </Grid>
                            )}
                        </Grid>
                        {associes.map((el, index) =>
                            index === associes.length - 1 ? (
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
                                            name={`associes[${index}].nature`}
                                            label=" L'associé est"
                                            label1="une personne physique"
                                            label2="une personne morale"
                                            // value1="physique"
                                            // value2="morale"
                                            condition={nature}
                                            setCondition={setNature}
                                        />
                                    </Grid>
                                    {/* <Grid item xs={12} sm={6}></Grid> */}
                                    {nature === "physique" ? (
                                        <>
                                            <Grid item xs={12} sm={6}>
                                                <FormControl>
                                                    <FormLabel id="demo-controlled-radio-buttons-group">
                                                        L'associé est
                                                    </FormLabel>
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
                                                        option.personne.nom
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
                                                                option.personne
                                                                    .prenom
                                                            }{" "}
                                                            {
                                                                option.personne
                                                                    .nom
                                                            }
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
                                                    name={`associes[${index}].personne.nom`}
                                                    label="Nom"
                                                    fullWidth
                                                    customValue={
                                                        dirigBeneficiaire &&
                                                        dirigBeneficiaire
                                                            .personne.nom
                                                    }
                                                />
                                            </Grid>
                                            <Grid item xs={12} sm={6}>
                                                <InputFeild
                                                    id="prenombeneficiaire"
                                                    name={`associes[${index}].personne.prenom`}
                                                    label="Prénom"
                                                    fullWidth
                                                    customValue={
                                                        dirigBeneficiaire &&
                                                        dirigBeneficiaire
                                                            .personne.prenom
                                                    }
                                                />
                                            </Grid>
                                            <Grid item xs={12} sm={6}>
                                                <InputFeild
                                                    InputLabelProps={{
                                                        shrink: true,
                                                    }}
                                                    id="datebeneficiaire"
                                                    name={`associes[${index}].date_debut`}
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
                                                    name={`associes[${index}].personne.date_naissance`}
                                                    label="Date de naissance"
                                                    type="date"
                                                    fullWidth
                                                    customValue={
                                                        dirigBeneficiaire &&
                                                        dirigBeneficiaire
                                                            .personne
                                                            .date_naissance
                                                    }
                                                />
                                            </Grid>
                                            <Grid item xs={12} sm={6}>
                                                <AutoCompleteInputField
                                                    // autoLabel="Pays"
                                                    id="paysnaissancebeneficiaire"
                                                    name={`associes[${index}].personne.pays_naissance`}
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
                                                        dirigBeneficiaire
                                                            .personne
                                                            .pays_naissance
                                                    }
                                                />
                                            </Grid>

                                            <Grid item xs={12} sm={6}>
                                                <InputFeild
                                                    id="villenaissancebeneficiaire"
                                                    name={`associes[${index}].personne.ville_naissance`}
                                                    label="Ville de naissance"
                                                    fullWidth
                                                    customValue={
                                                        dirigBeneficiaire &&
                                                        dirigBeneficiaire
                                                            .personne
                                                            .ville_naissance
                                                    }
                                                />
                                            </Grid>
                                            <Grid item xs={12} sm={6}>
                                                <AutoCompleteInputField
                                                    autoLabel="Pays"
                                                    id="nationalitebeneficiaire"
                                                    name={`associes[${index}].personne.nationalite`}
                                                    label="Nationalité"
                                                    fullWidth
                                                    customValue={
                                                        dirigBeneficiaire &&
                                                        dirigBeneficiaire
                                                            .personne
                                                            .nationalite
                                                    }
                                                />
                                            </Grid>
                                            <Grid item xs={12} sm={6}>
                                                <AutoCompleteInputField
                                                    autoLabel="Pays"
                                                    id="paysresidencebeneficiaire"
                                                    name={`associes[${index}].personne.pays_residence`}
                                                    label="Pays de residence"
                                                    fullWidth
                                                    customValue={
                                                        dirigBeneficiaire &&
                                                        dirigBeneficiaire
                                                            .personne
                                                            .pays_residence
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
                                            <Grid item xs={12} sm={12}>
                                                <InputFeild
                                                    id="adressesAdresse"
                                                    name={`associes[${index}].adresse.adresse`}
                                                    label="Adresse"
                                                    fullWidth
                                                    customValue={
                                                        dirigBeneficiaire &&
                                                        dirigBeneficiaire
                                                            .adresse.adresse
                                                    }
                                                />
                                            </Grid>
                                            <Grid item xs={12} sm={6}>
                                                <InputFeild
                                                    id="associesAdresse"
                                                    name={`associes[${index}].adresse.code_postal`}
                                                    label="Code postal"
                                                    fullWidth
                                                    customValue={
                                                        dirigBeneficiaire &&
                                                        dirigBeneficiaire
                                                            .adresse.code_postal
                                                    }
                                                />
                                            </Grid>
                                            <Grid item xs={12} sm={6}>
                                                <InputFeild
                                                    id="associesAdresse"
                                                    name={`associes[${index}].adresse.ville`}
                                                    label="Ville"
                                                    fullWidth
                                                    customValue={
                                                        dirigBeneficiaire &&
                                                        dirigBeneficiaire
                                                            .adresse.ville
                                                    }
                                                />
                                            </Grid>
                                            <Grid item xs={12} sm={12}>
                                                <InputFeild
                                                    id="associesAdresse"
                                                    name={`associes[${index}].adresse.pays`}
                                                    label="Pays"
                                                    fullWidth
                                                    customValue={
                                                        dirigBeneficiaire &&
                                                        dirigBeneficiaire
                                                            .adresse.pays
                                                    }
                                                />
                                            </Grid>
                                        </>
                                    ) : (
                                        <>
                                            <Grid item xs={12} sm={6}>
                                                <InputFeild
                                                    id="raisonsocialeassocie"
                                                    name={`associes[${index}].societe.deno`}
                                                    label="Raison Sociale"
                                                    fullWidth
                                                />
                                            </Grid>
                                            <Grid item xs={12} sm={6}>
                                                <InputFeild
                                                    id="sirenassocie"
                                                    name={`associes[${index}].societe.no`}
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
                                                    name={`associes[${index}].date_debut`}
                                                    label="Date à la quelle est devenue associé effectif"
                                                    type="date"
                                                    fullWidth
                                                />
                                            </Grid>
                                            <Grid item xs={12} sm={12}>
                                                <InputFeild
                                                    id="adressesAdresse"
                                                    name={`associes[${index}].societe.adresses[0].adresse`}
                                                    label="Adresse"
                                                    fullWidth
                                                />
                                            </Grid>
                                            <Grid item xs={12} sm={6}>
                                                <InputFeild
                                                    id="dirigAdresse"
                                                    name={`associes[${index}].societe.adresses[0].code_postal`}
                                                    label="Code postal"
                                                    fullWidth
                                                />
                                            </Grid>
                                            <Grid item xs={12} sm={6}>
                                                <InputFeild
                                                    id="dirigAdresse"
                                                    name={`associes[${index}].societe.adresses[0].ville`}
                                                    label="Ville"
                                                    fullWidth
                                                />
                                            </Grid>
                                            <Grid item xs={12} sm={12}>
                                                <InputFeild
                                                    id="dirigAdresse"
                                                    name={`associes[${index}].societe.adresses[0].pays`}
                                                    label="Pays"
                                                    fullWidth
                                                />
                                            </Grid>
                                            <Grid item xs={12} sm={6}>
                                                <InputFeild
                                                    InputLabelProps={{
                                                        shrink: true,
                                                    }}
                                                    id="datenaissance"
                                                    name={`associes[${index}].societe.adresses[0].date_de`}
                                                    label="De"
                                                    type="date"
                                                    fullWidth
                                                />
                                            </Grid>
                                            <Grid item xs={12} sm={6}>
                                                <InputFeild
                                                    InputLabelProps={{
                                                        shrink: true,
                                                    }}
                                                    id="datenaissance"
                                                    name={`associes[${index}].societe.adresses[0].date_a`}
                                                    label="A"
                                                    type="date"
                                                    fullWidth
                                                />
                                            </Grid>
                                            {/* <Grid item xs={12} sm={6}>
                                                <InputFeild
                                                    InputLabelProps={{
                                                        shrink: true,
                                                    }}
                                                    id="datecreationassocie"
                                                    name={`associes[${index}].datecreation`}
                                                    label="Date de creation"
                                                    type="date"
                                                    fullWidth
                                                    customValue={
                                                        dirigBeneficiaire &&
                                                        dirigBeneficiaire.datenaissance
                                                    }
                                                />
                                            </Grid> */}
                                            {/* <Grid item xs={12} sm={6}>
                                                <AutoCompleteInputField
                                                    autoLabel="Pays"
                                                    id="paysassocie"
                                                    name={`associes[${index}].pays`}
                                                    label="Nationalité"
                                                    fullWidth
                                                    customValue={
                                                        dirigBeneficiaire &&
                                                        dirigBeneficiaire.nationalite
                                                    }
                                                />
                                            </Grid> */}
                                            {/* <Grid item xs={12} sm={6}>
                                                <InputFeild
                                                    id="adresseassocie"
                                                    name={`associes[${index}].adresse`}
                                                    label="Adresse"
                                                    fullWidth
                                                    // customValue={
                                                    //     dirigBeneficiaire &&
                                                    //     dirigBeneficiaire.dirigAdresse
                                                    // }
                                                />
                                            </Grid> */}
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
                                                name={`associes[${index}].detention_capital`}
                                                label="Détention du capital"
                                                fullWidth
                                                // customValue={
                                                //     dirigBeneficiaire &&
                                                //     dirigBeneficiaire.dirigAdresse
                                                // }
                                            /> */}
                                            <Field
                                                as={InputFeild}
                                                name={`associes[${index}].detention_capital`}
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
                                                        `associes[${index}].detention_capital`
                                                    ] &&
                                                    Boolean(
                                                        errors[
                                                            `associes[${index}].detention_capital`
                                                        ]
                                                    )
                                                }
                                                helperText={
                                                    touched[
                                                        `associes[${index}].detention_capital`
                                                    ] &&
                                                    errors[
                                                        `associes[${index}].detention_capital`
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
                                                name={`associes[${index}].detention_droit_vote`}
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
                                                        `associes[${index}].detention_droit_vote`
                                                    ] &&
                                                    Boolean(
                                                        errors[
                                                            `associes[${index}].detention_droit_vote`
                                                        ]
                                                    )
                                                }
                                                helperText={
                                                    touched[
                                                        `associes[${index}].detention_droit_vote`
                                                    ] &&
                                                    errors[
                                                        `associes[${index}].detention_droit_vote`
                                                    ]
                                                }
                                            />
                                            {/* <InputFeild
                                                id="adresseassocie"
                                                name={`associes[${index}].detention_droit_vote`}
                                                
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
                                            {el.nature === "physique"
                                                ? el.personne.nom
                                                : el.societe.no}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={12} sm={2}>
                                        <Typography variant="body2">
                                            {el.nature === "physique"
                                                ? el.personne.nom
                                                : el.societe.no}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={12} sm={2}>
                                        <Typography variant="body2">
                                            {el.nature === "physique"
                                                ? "Personne Physique"
                                                : "Personne Morale"}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={12} sm={2}>
                                        <Typography variant="body2">
                                            {`${el.detention_capital}% du capital`}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={12} sm={2}>
                                        <Typography variant="body2">
                                            {`${el.detention_droit_vote}% du droit de vote`}
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
                                                            associes[index]
                                                                .detention_droit_vote
                                                        );
                                                    const currentCap =
                                                        Number(
                                                            pourcentageCapital
                                                        ) +
                                                        Number(
                                                            associes[index]
                                                                .detention_capital
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
                                nature === "physique"
                                    ? !associes[associes.length - 1].personne
                                          .nom ||
                                      !associes[associes.length - 1].personne
                                          .prenom ||
                                      !associes[associes.length - 1]
                                          .detention_capital ||
                                      !associes[associes.length - 1]
                                          .detention_droit_vote ||
                                      Number(
                                          associes[associes.length - 1]
                                              .detention_capital
                                      ) < 0 ||
                                      Number(
                                          associes[associes.length - 1]
                                              .detention_capital
                                      ) > pourcentageCapital
                                    : nature === "morale"
                                    ? !associes[associes.length - 1].societe
                                          .deno ||
                                      !associes[associes.length - 1].societe
                                          .no ||
                                      Number(
                                          associes[associes.length - 1]
                                              .detention_capital
                                      ) < 0 ||
                                      !associes[associes.length - 1]
                                          .detention_capital ||
                                      !associes[associes.length - 1]
                                          .detention_droit_vote ||
                                      Number(
                                          associes[associes.length - 1]
                                              .detention_capital
                                      ) > pourcentageCapital
                                    : false
                            }
                            variant="outlined"
                            color="secondary"
                            onClick={() => {
                                if (nature === "physique") {
                                    if (
                                        associes[associes.length - 1].personne
                                            .nom &&
                                        associes[associes.length - 1].personne
                                            .prenom &&
                                        Number(
                                            associes[associes.length - 1]
                                                .detention_capital
                                        ) > 0 &&
                                        Number(
                                            associes[associes.length - 1]
                                                .detention_capital
                                        ) < pourcentageCapital &&
                                        Number(
                                            associes[associes.length - 1]
                                                .detention_droit_vote
                                        ) > 0 &&
                                        Number(
                                            associes[associes.length - 1]
                                                .detention_droit_vote
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
                                                associes[associes.length - 1]
                                                    .detention_droit_vote
                                            );
                                        const currentCap =
                                            Number(pourcentageCapital) -
                                            Number(
                                                associes[associes.length - 1]
                                                    .detention_capital
                                            );
                                        setpourcentageCapital(currentCap);
                                        setpourcentageVote(currentVote);
                                        // setNature("yes");
                                        setisDirig("no");
                                        // console.log(associes);
                                        setDirigBeneficiaire(null);
                                        push({
                                            nature: "physique",
                                            date_debut: "",
                                            date_fin: "",
                                            adresse: {
                                                adresse: "",
                                                code_postal: "",
                                                ville: "",
                                                pays: "",
                                                date_de: "",
                                                date_a: "",
                                            },
                                            personne: {
                                                nom: "",
                                                prenom: "",
                                                civilite: "",
                                                date_naissance: "",
                                                ville_naissance: "",
                                                pays_naissance: "",
                                                nationalite: "",
                                                pays_residence: "",
                                                num_tel: "",
                                            },
                                            societe: {
                                                deno: "",
                                                no: "",
                                                adresses: [
                                                    {
                                                        adresse: "",
                                                        code_postal: "",
                                                        ville: "",
                                                        pays: "",
                                                        date_de: "",
                                                        date_a: "",
                                                    },
                                                ],
                                            },
                                            detention_capital:
                                                pourcentageCapital -
                                                Number(
                                                    associes[
                                                        associes.length - 1
                                                    ].detention_capital
                                                ),
                                            detention_droit_vote:
                                                pourcentageVote -
                                                Number(
                                                    associes[
                                                        associes.length - 1
                                                    ].detention_droit_vote
                                                ),
                                        });
                                    }
                                    // else console.log("error");
                                } else if (nature === "morale") {
                                    if (
                                        associes[associes.length - 1].societe
                                            .deno &&
                                        associes[associes.length - 1].societe
                                            .no &&
                                        Number(
                                            associes[associes.length - 1]
                                                .detention_capital
                                        ) > 0 &&
                                        Number(
                                            associes[associes.length - 1]
                                                .detention_capital
                                        ) < pourcentageCapital &&
                                        Number(
                                            associes[associes.length - 1]
                                                .detention_droit_vote
                                        ) > 0 &&
                                        Number(
                                            associes[associes.length - 1]
                                                .detention_droit_vote
                                        ) < pourcentageVote
                                    ) {
                                        setNature("physique");
                                        setisDirig("no");
                                        setDirigBeneficiaire(null);

                                        const currentVote =
                                            Number(pourcentageVote) -
                                            Number(
                                                associes[associes.length - 1]
                                                    .detention_droit_vote
                                            );
                                        const currentCap =
                                            Number(pourcentageCapital) -
                                            Number(
                                                associes[associes.length - 1]
                                                    .detention_capital
                                            );
                                        setpourcentageCapital(currentCap);
                                        setpourcentageVote(currentVote);
                                        push({
                                            nature: "physique",
                                            date_debut: "",
                                            date_fin: "",
                                            adresse: {
                                                adresse: "",
                                                code_postal: "",
                                                ville: "",
                                                pays: "",
                                                date_de: "",
                                                date_a: "",
                                            },
                                            personne: {
                                                nom: "",
                                                prenom: "",
                                                civilite: "",
                                                date_naissance: "",
                                                ville_naissance: "",
                                                pays_naissance: "",
                                                nationalite: "",
                                                pays_residence: "",
                                                num_tel: "",
                                            },
                                            societe: {
                                                deno: "",
                                                no: "",
                                                adresses: [
                                                    {
                                                        adresse: "",
                                                        code_postal: "",
                                                        ville: "",
                                                        pays: "",
                                                        date_de: "",
                                                        date_a: "",
                                                    },
                                                ],
                                            },
                                            detention_capital:
                                                pourcentageCapital -
                                                Number(
                                                    associes[
                                                        associes.length - 1
                                                    ].detention_capital
                                                ),
                                            detention_droit_vote:
                                                pourcentageVote -
                                                Number(
                                                    associes[
                                                        associes.length - 1
                                                    ].detention_droit_vote
                                                ),
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
