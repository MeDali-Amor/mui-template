import {
    Button,
    Grid,
    styled,
    TextField,
    Typography,
    useTheme,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";

const StyledTextField = styled(TextField)(({ theme }) => ({
    width: "100%",
    // margin: 20,

    "& .MuiInputBase-root": {
        backgroundColor: "#fdfdfd",
    },
    "& .MuiOutlinedInput-root": {
        "& > fieldset": {
            border: `1px solid ${theme.palette.grey[300]}`,
            // backgroundColor: theme.palette.grey[200],
            // boxShadow: `0px 2px 6px 0px ${theme.palette.grey[300]}`,
            boxShadow: `0px 1px 3px 0px #eeeeee`,
        },
    },
    "& .MuiOutlinedInput-root:hover": {
        "& > fieldset": {
            border: `1px solid ${theme.palette.grey[300]}`,
        },
    },
    "& .MuiOutlinedInput-root.Mui-focused": {
        "& > fieldset": {
            border: `2px solid ${theme.palette.primary.main}`,
            // boxShadow: `0 0 0 3px ${theme.palette.primary.lighter}`,
        },
    },
}));
const ButtonContainerFloatRight = styled("div")(({ theme }) => ({
    paddingInline: theme.spacing(8),
    // paddingBlock: theme.spacing(16),
    paddingTop: "16px",
    float: "right",
}));

const CompanyForm = ({ companyData }) => {
    const theme = useTheme();
    const [data, setData] = useState(companyData);
    const handleDirigChange = (e, index) => {
        const { name, value } = e.target;
        let dirigeant = { ...companyData.dirig[index], [name]: value };
        const dirigList = companyData.dirig;
        dirigList[index] = dirigeant;
        const companyAlt = { ...companyData, dirig: dirigList };
        setData(companyAlt);
        console.log(companyAlt);
    };
    const handleFieldChange = (e) => {
        const { name, value } = e.target;
        const companyAlt = { ...companyData, [name]: value };
        setData(companyAlt);
        // console.log(data);
    };
    const handleSaveData = async (e) => {
        e.preventDefault();
        // console.log(data);
        // try {
        //     let submittedData = { ...data };
        //     const res = await axios.patch(
        //         `http://localhost:8000/api/company/update/${submittedData._id}`,
        //         submittedData
        //     );
        // } catch (error) {
        //     console.log(error);
        // }
        console.log(data);
    };
    useEffect(() => {
        // setData(null);
        setData(companyData);
    }, [companyData, setData]);
    return (
        <form onSubmit={handleSaveData}>
            <Grid sx={{ py: 2, px: 8 }}>
                <Typography variant="h5" color={theme.palette.text.primary}>
                    Identit?? de l'entreprise
                </Typography>
            </Grid>
            <Grid
                rowSpacing={5}
                columnSpacing={6}
                container
                sx={{ py: 2, px: 8 }}
            >
                <Grid item xs={12} sm={6}>
                    <StyledTextField
                        onChange={(e) => handleFieldChange(e)}
                        sx={
                            {
                                // "& .MuiFormControl-root": {
                                // },
                            }
                        }
                        variant="outlined"
                        label="D??nomination Sociale"
                        name="deno"
                        // defaultValue={data?.name || ""}
                        value={data?.deno || ""}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <StyledTextField
                        onChange={(e) => handleFieldChange(e)}
                        variant="outlined"
                        InputLabelProps={{ shrink: true }}
                        type={"date"}
                        name="dcren"
                        label="Date de cr??ation"
                        value={data?.dcren || ""}
                    />
                </Grid>
            </Grid>
            <Grid sx={{ py: 2, px: 8 }}>
                <Typography variant="h5" color={theme.palette.text.primary}>
                    Activit??
                </Typography>
            </Grid>
            <Grid
                rowSpacing={5}
                columnSpacing={6}
                container
                sx={{ py: 2, px: 8 }}
            >
                <Grid item xs={12} sm={6}>
                    <StyledTextField
                        onChange={(e) => handleFieldChange(e)}
                        variant="outlined"
                        name="apetexte"
                        label="Activit??"
                        value={data?.apetexte || ""}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <StyledTextField
                        onChange={(e) => handleFieldChange(e)}
                        variant="outlined"
                        name="ape"
                        label="Code APE"
                        value={data?.ape || ""}
                    />
                </Grid>
            </Grid>
            <Grid sx={{ py: 2, px: 8 }}>
                <Typography variant="h5" color={theme.palette.text.primary}>
                    Renseignements juridiques
                </Typography>
            </Grid>
            <Grid
                rowSpacing={5}
                columnSpacing={6}
                container
                sx={{ py: 2, px: 8 }}
            >
                <Grid item xs={12} sm={12}>
                    <StyledTextField
                        onChange={(e) => handleFieldChange(e)}
                        variant="outlined"
                        name="formejur"
                        label="Forme Juridique"
                        value={data?.formejur || ""}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <StyledTextField
                        onChange={(e) => handleFieldChange(e)}
                        variant="outlined"
                        name="psiret"
                        label="Num??ro SIRET (si??ge)"
                        value={data?.psiret || ""}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <StyledTextField
                        onChange={(e) => handleFieldChange(e)}
                        variant="outlined"
                        name="no"
                        label="Siren"
                        value={data?.no || ""}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <StyledTextField
                        onChange={(e) => handleFieldChange(e)}
                        variant="outlined"
                        name="greffe"
                        label="RCS"
                        value={data?.greffe || ""}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <StyledTextField
                        onChange={(e) => handleFieldChange(e)}
                        variant="outlined"
                        name="tva"
                        label="Num??ro TVA"
                        value={data?.tva || ""}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <StyledTextField
                        onChange={(e) => handleFieldChange(e)}
                        variant="outlined"
                        name="dateimmat"
                        label="Date d'immatriculation"
                        value={data?.dateimmat || ""}
                        InputLabelProps={{ shrink: true }}
                        type={"date"}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <StyledTextField
                        onChange={(e) => handleFieldChange(e)}
                        variant="outlined"
                        name="daterad"
                        label="Date d'enregistrement"
                        value={data?.daterad || ""}
                        InputLabelProps={{ shrink: true }}
                        type={"date"}
                    />
                </Grid>
            </Grid>
            <Grid rowSpacing={5} columnSpacing={6} sx={{ py: 2, px: 8 }}>
                <Typography variant="h5" color={theme.palette.text.primary}>
                    Dirigeants
                </Typography>
            </Grid>
            {data?.dirig?.map((el, index) => (
                <Grid
                    rowSpacing={5}
                    columnSpacing={6}
                    container
                    sx={{ py: 2, px: 8 }}
                    key={el._id}
                >
                    <Grid item xs={12} sm={2}>
                        <StyledTextField
                            onChange={(e) => handleDirigChange(e, index)}
                            variant="outlined"
                            name="detcivdir"
                            // label="Nom"
                            value={el.detcivdir || ""}
                        />
                    </Grid>
                    <Grid item xs={12} sm={3}>
                        <StyledTextField
                            onChange={(e) => handleDirigChange(e, index)}
                            variant="outlined"
                            name="detnomdir"
                            label="Nom"
                            value={el.detnomdir || ""}
                        />
                    </Grid>
                    <Grid item xs={12} sm={3}>
                        <StyledTextField
                            onChange={(e) => handleDirigChange(e, index)}
                            variant="outlined"
                            name="detprenomdir"
                            label="Pr??nom"
                            value={el.detprenomdir || ""}
                        />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <StyledTextField
                            onChange={(e) => handleDirigChange(e, index)}
                            variant="outlined"
                            name="titredirig"
                            label="Type"
                            value={el.titredirig || ""}
                        />
                    </Grid>
                </Grid>
            ))}
            <Grid rowSpacing={5} columnSpacing={6} sx={{ py: 2, px: 8 }}>
                <Typography variant="h5" color={theme.palette.text.primary}>
                    Adresse
                </Typography>
            </Grid>
            <Grid
                rowSpacing={5}
                columnSpacing={6}
                container
                sx={{ py: 2, px: 8 }}
            >
                <Grid item xs={12} sm={4}>
                    <StyledTextField
                        onChange={(e) => handleFieldChange(e)}
                        variant="outlined"
                        name="adresse"
                        label="Adresse"
                        value={data?.adresse || ""}
                    />
                </Grid>{" "}
                <Grid item xs={12} sm={4}>
                    <StyledTextField
                        onChange={(e) => handleFieldChange(e)}
                        variant="outlined"
                        name="commune"
                        label="Ville"
                        value={data?.commune || ""}
                    />
                </Grid>{" "}
                <Grid item xs={12} sm={4}>
                    <StyledTextField
                        onChange={(e) => handleFieldChange(e)}
                        variant="outlined"
                        name="codepostal"
                        label="Code Postal"
                        value={data?.codepostal || ""}
                    />
                </Grid>
            </Grid>
            <ButtonContainerFloatRight>
                <Button variant="contained" size="large" type="submit">
                    Sauvegarder
                </Button>
            </ButtonContainerFloatRight>
        </form>
    );
};

export default CompanyForm;
