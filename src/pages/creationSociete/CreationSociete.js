import { Formik } from "formik";
import { Box, Button, Grid, Paper, TextField, Typography } from "@mui/material";
import * as yup from "yup";
import InputFeild from "../../components/InputFeild";
import MultiStepForm, { FormStep } from "../../components/MultiStepForm";

const validationSchema = yup.object({
    deno: yup.string().required("This field is required"),
    email: yup.string().email().required("This field is required"),
});

const styles = (theme) => ({
    formLayout: {
        width: "auto",
        marginLeft: theme.spacing.unit * 2,
        marginRight: theme.spacing.unit * 2,
        [theme.breakpoints.up(600 + theme.spacing.unit * 2)]: {
            with: 600,
            marginLeft: "auto",
            marginRight: "auto",
        },
    },
    paper: {
        marginTop: theme.spacing.unit * 3,
        marginBottom: theme.spacing.unit * 3,
        padding: theme.spacing.unit * 2,
        [theme.breakpoints.up(600 + theme.spacing.unit * 3 * 2)]: {
            marginTop: theme.spacing.unit * 6,
            marginBottom: theme.spacing.unit * 6,
            padding: theme.spacing.unit * 3,
        },
    },
});

const CreationSociete = () => {
    return (
        <div className={styles.formLayout}>
            <Box sx={{ py: 2, px: 8 }}>
                <Typography component="h1" variant="h4" align="center">
                    Checkout
                </Typography>
                <MultiStepForm
                    initialValues={{
                        deno: "",
                        email: "",
                        codepostal: "",
                        ville: "",
                    }}
                    onSubmit={(values) => {
                        console.log(values);
                    }}
                >
                    <FormStep
                        stepName="Person"
                        onSubmit={() => console.log("step 2")}
                        validationSchema={validationSchema}
                    >
                        <Typography variant="h6" gutterBottom>
                            Shipping address
                        </Typography>
                        <Grid container rowSpacing={5} columnSpacing={6}>
                            <Grid item xs={12} sm={6}>
                                <InputFeild
                                    id="firstName"
                                    name="firstName"
                                    label="First name"
                                    fullWidth
                                    autoComplete="fname"
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <InputFeild
                                    id="lastName"
                                    name="lastName"
                                    label="Last name"
                                    fullWidth
                                    autoComplete="lname"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <InputFeild
                                    id="address1"
                                    name="address1"
                                    label="Address line 1"
                                    fullWidth
                                    autoComplete="billing address-line1"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <InputFeild
                                    id="address2"
                                    name="address2"
                                    label="Address line 2"
                                    fullWidth
                                    autoComplete="billing address-line2"
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <InputFeild
                                    id="city"
                                    name="city"
                                    label="City"
                                    fullWidth
                                    autoComplete="billing address-level2"
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <InputFeild
                                    id="state"
                                    name="state"
                                    label="State/Province/Region"
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <InputFeild
                                    id="zip"
                                    name="zip"
                                    label="Zip / Postal code"
                                    fullWidth
                                    autoComplete="billing postal-code"
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <InputFeild
                                    id="country"
                                    name="country"
                                    label="Country"
                                    fullWidth
                                    autoComplete="billing country"
                                />
                            </Grid>
                        </Grid>
                        <InputFeild
                            id="deno"
                            name="deno"
                            label="Denomination sociale"
                        />
                        <InputFeild id="email" name="email" label="Email" />
                    </FormStep>

                    <FormStep
                        stepName="adresse"
                        onSubmit={() => console.log("step 1")}
                        validationSchema={yup.object({
                            codepostal: yup
                                .string()
                                .required("This field is required"),
                            ville: yup
                                .string()
                                .required("This field is required"),
                        })}
                    >
                        <InputFeild
                            id="codepostal"
                            name="codepostal"
                            label="Code Postal"
                        />
                        <InputFeild id="ville" name="ville" label="Ville" />
                    </FormStep>
                </MultiStepForm>
            </Box>
        </div>
    );
};

export default CreationSociete;
