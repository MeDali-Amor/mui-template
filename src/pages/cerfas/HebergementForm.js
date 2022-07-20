import React, { useState } from "react";
import {
    Box,
    Button,
    FormControl,
    FormControlLabel,
    FormLabel,
    Grid,
    Radio,
    RadioGroup,
    TextField,
    Typography,
    useTheme,
} from "@mui/material";
import { alpha, styled } from "@mui/material/styles";

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

const FormSectionTitle = ({ children }) => {
    const theme = useTheme();
    return (
        <Grid sx={{ py: 2, px: 8 }}>
            <Box
                sx={{
                    background: alpha(theme.palette.grey[300], 0.7),
                    marginTop: 2,
                    paddingBlock: 1,
                    paddingInline: 2,
                    boxShadow: 2,
                    borderRadius: 1,
                }}
            >
                <Typography variant="h5" color="#002F6C">
                    {children}
                </Typography>
            </Box>
        </Grid>
    );
};

const HebergementForm = ({ data, setData }) => {
    const theme = useTheme();

    const handleFieldChange = (e) => {
        const { name, value } = e.target;
        const companyAlt = { ...data, [name]: value };
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
        //     );<
        // } catch (error) {
        //     console.log(error);
        // }
        console.log(data);
    };
    return (
        <div>
            <form onSubmit={handleSaveData}>
                <FormSectionTitle>Qui héberge ?</FormSectionTitle>
                <Grid
                    rowSpacing={2}
                    columnSpacing={3}
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
                            label="Prenom"
                            name="prenom"
                            // defaultValue={data?.name || ""}
                            value={data?.prenom}
                        />
                    </Grid>
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
                            label="Nom"
                            name="nom"
                            // defaultValue={data?.name || ""}
                            value={data?.nom}
                        />
                    </Grid>
                    <Grid item xs={12} sm={12}>
                        <FormControl sx={{ marginBlock: 2 }}>
                            <FormLabel id="demo-controlled-radio-buttons-group">
                                Genre
                            </FormLabel>
                            <RadioGroup
                                aria-labelledby="controlled-radio-buttons-group"
                                name="Sexe_hebergeant"
                                value={data.Sexe_hebergeant}
                                row
                                onChange={(e) => handleFieldChange(e)}
                            >
                                <FormControlLabel
                                    value="feminin"
                                    control={<Radio />}
                                    label={
                                        <Typography
                                            sx={{
                                                fontSize: 12,
                                                fontWeight: 600,
                                            }}
                                            variant="body2"
                                        >
                                            Madame
                                        </Typography>
                                    }
                                />
                                <FormControlLabel
                                    value="masculin"
                                    control={<Radio />}
                                    label={
                                        <Typography
                                            sx={{
                                                fontSize: 12,
                                                fontWeight: 600,
                                            }}
                                            variant="body2"
                                        >
                                            Monsieur
                                        </Typography>
                                    }
                                />
                            </RadioGroup>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <StyledTextField
                            onChange={(e) => handleFieldChange(e)}
                            variant="outlined"
                            InputLabelProps={{ shrink: true }}
                            type={"date"}
                            name="DateDeNaissance"
                            label="Date de naissance"
                            value={data?.DateDeNaissance}
                        />
                    </Grid>
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
                            label="Lieu de naissance"
                            name="LieuDeNaissance"
                            // defaultValue={data?.name || ""}
                            value={data?.LieuDeNaissance}
                        />
                    </Grid>
                </Grid>
                <FormSectionTitle>Qui est hébergé ?</FormSectionTitle>
                <Grid
                    rowSpacing={3}
                    columnSpacing={4}
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
                            label="Prenom"
                            name="personneaccueilliePrenom"
                            // defaultValue={data?.name || ""}
                            value={data?.personneaccueilliePrenom}
                        />
                    </Grid>
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
                            label="Nom"
                            name="personneaccueillienom"
                            // defaultValue={data?.name || ""}
                            value={data?.personneaccueillienom}
                        />
                    </Grid>
                    <Grid item xs={12} sm={12}>
                        <FormControl>
                            <FormLabel id="demo-controlled-radio-buttons-group">
                                Genre
                            </FormLabel>
                            <RadioGroup
                                aria-labelledby="controlled-radio-buttons-group"
                                name="Sexe_heberge"
                                value={data.Sexe_heberge}
                                row
                                onChange={(e) => handleFieldChange(e)}
                            >
                                <FormControlLabel
                                    value="feminin"
                                    control={<Radio />}
                                    label={
                                        <Typography
                                            sx={{
                                                fontSize: 12,
                                                fontWeight: 600,
                                            }}
                                            variant="body2"
                                        >
                                            Madame
                                        </Typography>
                                    }
                                />
                                <FormControlLabel
                                    value="masculin"
                                    control={<Radio />}
                                    label={
                                        <Typography
                                            sx={{
                                                fontSize: 12,
                                                fontWeight: 600,
                                            }}
                                            variant="body2"
                                        >
                                            Monsieur
                                        </Typography>
                                    }
                                />
                            </RadioGroup>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <StyledTextField
                            onChange={(e) => handleFieldChange(e)}
                            variant="outlined"
                            InputLabelProps={{ shrink: true }}
                            type={"date"}
                            name="personneAccueillieDTN"
                            label="Date de naissance"
                            value={data?.personneAccueillieDTN}
                        />
                    </Grid>
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
                            label="Lieu de naissance"
                            name="personneaccueillieLieuDeNaissance"
                            // defaultValue={data?.name || ""}
                            value={data?.personneaccueillieLieuDeNaissance}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <StyledTextField
                            onChange={(e) => handleFieldChange(e)}
                            variant="outlined"
                            InputLabelProps={{ shrink: true }}
                            type={"date"}
                            name="Date_Debut_Hebergement"
                            label="Date du début de l'hébergement"
                            value={data?.Date_Debut_Hebergement}
                        />
                    </Grid>
                </Grid>
                <FormSectionTitle>
                    Où est situé l'hébergement ?
                </FormSectionTitle>
                <Grid
                    rowSpacing={3}
                    columnSpacing={4}
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
                            label="Adresse"
                            name="Adresse"
                            // defaultValue={data?.name || ""}
                            value={data?.Adresse}
                        />
                    </Grid>
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
                            label="Complément d'adresse"
                            name="Comp_Adresse"
                            // defaultValue={data?.name || ""}
                            value={data?.Comp_Adresse}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <StyledTextField
                            onChange={(e) => handleFieldChange(e)}
                            variant="outlined"
                            name="CP_Hebergement"
                            label="Code postal"
                            value={data?.CP_Hebergement}
                        />
                    </Grid>
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
                            label="Commune "
                            name="Commune"
                            // defaultValue={data?.name || ""}
                            value={data?.Commune}
                        />
                    </Grid>
                </Grid>
                <FormSectionTitle>
                    Où et quand est rédigée l'attestation?
                </FormSectionTitle>
                <Grid
                    rowSpacing={3}
                    columnSpacing={4}
                    container
                    sx={{ py: 2, px: 8 }}
                >
                    <Grid item xs={12} sm={6}>
                        <StyledTextField
                            onChange={(e) => handleFieldChange(e)}
                            variant="outlined"
                            InputLabelProps={{ shrink: true }}
                            type={"date"}
                            name="DateDuJour"
                            label="Date de l'attestation "
                            value={data?.DateDuJour}
                        />
                    </Grid>
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
                            label="Fait à (nom de la commune)"
                            name="CommuneAttestation"
                            // defaultValue={data?.name || ""}
                            value={data?.CommuneAttestation}
                        />
                    </Grid>
                </Grid>

                <ButtonContainerFloatRight>
                    <Button variant="contained" size="large" type="submit">
                        Sauvegarder
                    </Button>
                </ButtonContainerFloatRight>
            </form>
        </div>
    );
};

export default HebergementForm;
