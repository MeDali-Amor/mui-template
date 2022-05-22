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
        backgroundColor: "#f7f7f9",
    },
    "& .MuiOutlinedInput-root": {
        "& > fieldset": {
            border: `1px solid ${theme.palette.grey[300]}`,
            // backgroundColor: theme.palette.grey[200],
            // boxShadow: `0px 2px 6px 0px ${theme.palette.grey[300]}`,
            boxShadow: `0px 2px 6px 0px #eeeeee`,
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
    // console.log(companyData);

    const theme = useTheme();
    // const classes = useStyle();
    const [data, setData] = useState(companyData);
    const handleAddresseChange = (e) => {
        const { name, value } = e.target;
        const address = { ...companyData.address, [name]: value };
        // console.log(address);
        const companyAlt = { ...companyData, address };
        setData(companyAlt);
        // console.log(data);
    };
    const handleFieldChange = (e) => {
        const { name, value } = e.target;
        const companyAlt = { ...companyData, [name]: value };
        // console.log(companyAlt);
        setData(companyAlt);
        // console.log(data);
    };
    const handleSaveData = async (e) => {
        e.preventDefault();
        // console.log(data);
        try {
            let submittedData = { ...data };
            const res = await axios.patch(
                `http://localhost:8000/api/company/update/${submittedData._id}`,
                submittedData
            );
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        // setData(null);
        setData(companyData);
        // console.log(companyData);
    }, [companyData, setData]);
    return (
        <form>
            {/* <Grid
                // rowSpacing={5}
                // columnSpacing={6}
                // container
                // sx={{ py: 2, px: 8 }}
            > */}
            <Grid
                // rowSpacing={5}
                // columnSpacing={6}
                // container
                sx={{ py: 2, px: 8 }}
                // xs={12}
            >
                <Typography variant="h5" color={theme.palette.text.primary}>
                    General
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
                        label="Dénomination Sociale"
                        name="name"
                        // defaultValue={data?.name || ""}
                        value={data?.name || ""}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <StyledTextField
                        onChange={(e) => handleFieldChange(e)}
                        variant="outlined"
                        InputLabelProps={{ shrink: true }}
                        type={"date"}
                        name="creationDate"
                        label="Date de création"
                        value={data?.creationDate || ""}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <StyledTextField
                        onChange={(e) => handleFieldChange(e)}
                        variant="outlined"
                        name="sirenNumber"
                        label="Siren"
                        value={data?.sirenNumber || ""}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <StyledTextField
                        onChange={(e) => handleFieldChange(e)}
                        variant="outlined"
                        name="rcsNumber"
                        label="RCS"
                        value={data?.rcsNumber || ""}
                    />
                </Grid>
            </Grid>
            <Grid
                rowSpacing={5}
                columnSpacing={6}
                // container
                sx={{ py: 2, px: 8 }}
            >
                <Typography variant="h5" color={theme.palette.text.primary}>
                    Derigant
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
                        name="representativeName"
                        label="Nom"
                        value={data?.representativeName || ""}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <StyledTextField
                        onChange={(e) => handleFieldChange(e)}
                        variant="outlined"
                        name="representativeType"
                        label="Type"
                        value={data?.representativeType || ""}
                    />
                </Grid>
            </Grid>
            <Grid
                rowSpacing={5}
                columnSpacing={6}
                // container
                sx={{ py: 2, px: 8 }}
            >
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
                        onChange={(e) => (e) => handleAddresseChange(e)}
                        variant="outlined"
                        name="adresse"
                        label="Adresse"
                        value={data?.address?.adresse || ""}
                    />
                </Grid>{" "}
                <Grid item xs={12} sm={4}>
                    <StyledTextField
                        onChange={(e) => (e) => handleAddresseChange(e)}
                        variant="outlined"
                        name="city"
                        label="Ville"
                        value={data?.address?.city || ""}
                    />
                </Grid>{" "}
                <Grid item xs={12} sm={4}>
                    <StyledTextField
                        onChange={(e) => handleAddresseChange(e)}
                        variant="outlined"
                        name="zipcode"
                        label="Code Postal"
                        value={data?.address?.zipcode || ""}
                    />
                </Grid>
            </Grid>
            {/* </Grid> */}
            <ButtonContainerFloatRight>
                <Button variant="contained" size="large">
                    Sauvegarder
                </Button>
            </ButtonContainerFloatRight>
        </form>
    );
};

export default CompanyForm;
