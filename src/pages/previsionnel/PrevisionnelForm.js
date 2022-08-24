import { Box } from "@mui/system";
import React, { useState } from "react";
import * as yup from "yup";
import { useForm, FormProvider } from "react-hook-form";
import Page0 from "./Page0";
import { Button, styled } from "@mui/material";
import Page1 from "./Page1";
import Page2 from "./Page2";
import Page3 from "./Page3";
import Page4 from "./Page4";
import Page5 from "./Page5";
import Page6 from "./Page6";
import Page7 from "./Page7";
import Page8 from "./Page8";
import Page9 from "./Page9";
import QuikFormMenu from "../../components/QuikFormMenu";
import {
    besoinDemarageDataArray,
    chargesFixesDataArray,
    formInitialValues,
    monthsDataArray,
} from "./formData";
import FileToBePrinted from "./pdfFiles/FileToBePrinted";

let patternTwoDigisAfterComma = /^\d+(\.\d{0,2})?$/;
const commonStringValidator = yup
    .number("montant invalide")
    .positive("montant invalide")
    .test(
        // "is-decimal",
        "montant invalide",
        (val) => {
            if (val !== undefined) {
                return patternTwoDigisAfterComma.test(val);
            }
            return true;
        }
    );
const dureeAmortissementValidation = yup.object({
    duree_amortissement: yup
        .number()
        .integer("Durée invalide")
        .positive("Durée invalide"),
});
const validationSchema = yup.object({
    nom: yup.string(),
    prenom: yup.string(),
    email: yup.string(),
    num_telephone: yup
        .string()
        .matches(
            /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,
            "Numerp de téléphone invalide"
        ),
    activite: yup.string(),
    form_juridique: yup.string().required("Ce champ est requis"),
    nom_projet: yup.string().required("Ce champ est requis"),
    code_postal: yup
        .string()
        .matches(/^[0-9]+$/, "Doit avoir 5 chiffres")
        .min(5, "Doit avoir 5 chiffres")
        .max(5, "Doit avoir 5 chiffres"),
    commune: yup.string(),
    // nationalite: yup.string().required("Ce champ est requis"),
    adresse: yup.string(),
});
const besoinDemarageValidation = yup.object({
    duree_amortissement: yup
        .number("Durée invalide")
        .integer("Durée invalide")
        .positive("Durée invalide")
        .required("Ce champ est requis"),
    besoin_demarage: yup.object({
        frais_etablissement: commonStringValidator,
    }),
});

const PrevisionnelForm = () => {
    const [data, setData] = useState(null);
    const methods = useForm({
        defaultValues: formInitialValues,
    });

    // const { values } = useFormikContext();
    const [sign, setSign] = useState(window.innerWidth);
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [alertType, setAlertType] = useState("info");
    const [msg, setMsg] = useState("");
    const [total, setTotal] = useState(0);
    const [errorForm, setErrorForm] = useState("");

    const sumValues = (value) => {
        let sum = total;
        if (Number(value)) sum += Number(value);
        setTotal(sum);
    };
    const submitForm = async (values) => {
        console.log(values);
        setData(values);
    };
    return (
        <Box
            sx={{
                // backgroundColor: "red",
                height: "100%",
                // maxWidth: 900,
                // margin: "auto",

                // py: 2,
                // px: 16,
                padding: 4,
            }}
        >
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "row",
                    // scrollBehavior: "smooth",
                    position: "relative",
                }}
            >
                <Box
                    sx={{
                        marginRight: "280px",
                        scrollBehavior: "smooth",
                    }}
                >
                    <FormProvider {...methods}>
                        <form onSubmit={methods.handleSubmit(submitForm)}>
                            <Page0 />
                            <Page1
                                // formik={formik}
                                besoinDemarageDataArray={
                                    besoinDemarageDataArray
                                }
                                // sumTotal={sumTotal}
                            />
                            <Page2 />
                            <Page3
                                chargesFixesDataArray={chargesFixesDataArray}
                            />
                            <Page4 monthsDataArray={monthsDataArray} />
                            <Page5 />
                            <Page6 />
                            <Page7 />
                            <Page8 />
                            <Page9 />

                            <ButtonContainerFloatRight>
                                <Button
                                    variant="contained"
                                    size="large"
                                    type="submit"
                                >
                                    Submit
                                </Button>
                            </ButtonContainerFloatRight>
                        </form>
                    </FormProvider>
                </Box>
                <Box>{/* <QuikFormMenu /> */}</Box>
            </Box>
            {data && <FileToBePrinted data={data} />}
        </Box>
    );
};

export default PrevisionnelForm;
const ButtonContainerFloatRight = styled("div")(({ theme }) => ({
    paddingInline: theme.spacing(8),
    // paddingBlock: theme.spacing(16),
    paddingTop: "16px",
    float: "right",
}));
