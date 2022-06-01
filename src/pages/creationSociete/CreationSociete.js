import { FieldArray } from "formik";
import {
    Box,
    Button,
    Grid,
    IconButton,
    Paper,
    TextField,
    Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddBoxIcon from "@mui/icons-material/AddBox";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined";
import * as yup from "yup";
import InputFeild from "../../components/InputFeild";
import MultiStepForm, { FormStep } from "../../components/MultiStepForm";
import { useState } from "react";
import axios from "axios";
import CustomizedSnackbar from "../../components/Sbackbar";
import SelectFeild from "../../components/SelectFeild";
import AutoCompleteInputField from "../../components/AutoCompleteInputField";
import FileUploadInputField from "../../components/FileUploadInputField";

const SUPPORTED_FORMATS = ["image/jpg", "image/jpeg", "image/gif", "image/png"];
const validationSchema = yup.object({
    deno: yup.string().required("Ce champ est requis"),
    codepostal: yup
        .string()
        .required()
        .matches(/^[0-9]+$/, "Doit avoir 5 chiffres")
        .min(5, "Doit avoir 5 chiffres")
        .max(5, "Doit avoir 5 chiffres"),
    commune: yup.string().required("Ce champ est requis"),
    // nationalite: yup.string().required("Ce champ est requis"),
    adresse: yup.string(),
});
const dirigeantValidationSchema = yup.object({
    detcivdir: yup.string(),
    // .required("Ce champ est requis")
    detnomdir: yup.string().required("Ce champ est requis"),
    detprenomdir: yup.string().required("Ce champ est requis"),
    titredirig: yup.string(),
    // .required("Ce champ est requis")
    datenaissance: yup.string(),
    paysnaissance: yup.string(),
    codepostalnaissance: yup.string(),
    villenaissance: yup.string(),
    nationalite: yup.string(),
    paysresidence: yup.string(),
    typeidentite: yup.string(),
    imageidentite: yup

        .mixed()
        .nullable()
        .test(
            "fileSize",
            "File is too large",
            (value) => value?.size <= 1000000
        )
        .test("fileType", "Format d'image non valide", (value) =>
            SUPPORTED_FORMATS.includes(value?.type)
        ),
    // yup
    // .mixed()
    // .nullable()
    // .test("FILE_SIZE", "uploaded file is too large", (value) => {
    //     console.log(value?.size);
    //     return value?.size > 10000000;
    // })
    // .test(
    //     "FILE_FORMAT",
    //     "uploaded file has unsupported file format",
    //     (value) => !value || SUPPORTED_FORMATS.includes(value?.type)
    // ),
    //     yup.object({
    //     name: yup.string(),
    //     lastModified: yup.date(),
    //     lastModifiedDate: yup().object(),
    //     size: yup.number(),
    //     type:yup.string(),
    // }),
});

const dirigSchema = yup.object({
    dirig: yup.array().of(dirigeantValidationSchema),
});

const CreationSociete = () => {
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [alertType, setAlertType] = useState("info");
    const [msg, setMsg] = useState("");
    const [cityData, setCityData] = useState({
        nom: "",
        code: "",
        codeDepartement: "",
        codeRegion: "",
        codesPostaux: [""],
        population: 0,
    });
    const handleChange = async (e) => {
        const query = e.target.value;
        console.log(query);
        const res = await axios.get(
            `https://geo.api.gouv.fr/communes?codePostal=${query}`
        );
        if (res.data.length) setCityData(...res.data);
        else
            setCityData({
                nom: "",
                code: "",
                codeDepartement: "",
                codeRegion: "",
                codesPostaux: [""],
                population: 0,
            });
        // console.log(...res.data);
    };
    const handleSubmit = async (values) => {
        console.log(values);
        try {
            setLoading(true);
            const res = await axios.post(
                "http://localhost:8000/api/company/create",
                values
            );
            // console.log(res.data);
            setMsg(res.data.msg);
            setAlertType(res.data.alert);
            setOpen(true);
            setLoading(false);
        } catch (error) {
            setLoading(true);

            console.log(error);

            setMsg("une erreur s'est produite veuillez réessayer");
            setAlertType("error");
            setOpen(true);
            setLoading(false);
        }
    };
    return (
        <div>
            <Box
                sx={{
                    minHeight: "calc(100vh - 170px)",
                    height: "100%",
                    maxWidth: 900,
                    margin: "auto",
                    py: 2,
                    px: 16,
                    // display: "flex",
                    // flexDirection: "column",
                    // justifyContent: "center",
                    // alignItems: "center",
                }}
            >
                <MultiStepForm
                    loading={loading}
                    initialValues={{
                        deno: "",
                        // commune: cityData?.nom || "",
                        commune: "",
                        codepostal: "",
                        // nationalite: "",
                        adresse: "",
                        no: "",
                        psiret: "",
                        greffe: "",
                        formejur: "",
                        tva: "",
                        dcren: "",
                        daterad: "",
                        dateimmat: "",
                        apetexte: "",
                        ape: "",
                        dirig: [
                            {
                                detcivdir: "",
                                detnomdir: "",
                                detprenomdir: "",
                                titredirig: "",
                                datenaissance: "",
                                paysnaissance: "",
                                codepostalnaissance: "",
                                nationalite: "",
                                paysresidence: "",
                                typeidentite: "",
                                villenaissance: "",
                                imageidentite: null,
                            },
                        ],
                    }}
                    onSubmit={(values) => handleSubmit(values)}
                >
                    <FormStep
                        stepName="Person"
                        onSubmit={() => console.log("step 0")}
                        // validationSchema={validationSchema}
                    >
                        <Typography
                            component="h1"
                            variant="h4"
                            align="center"
                            sx={{
                                marginTop: 4,
                                marginBottom: 2,
                            }}
                        >
                            Vous souhaitez ajouter une societé?
                        </Typography>

                        <Typography
                            variant="body1"
                            align="center"
                            sx={{
                                marginBottom: 6,
                            }}
                        >
                            Pour vous accompagner au mieux dans l'ajout de votre
                            societé suivez les etapes suivantes!
                        </Typography>
                    </FormStep>
                    <FormStep
                        stepName="Identification"
                        onSubmit={() => console.log("step 1")}
                        validationSchema={validationSchema}
                    >
                        <Grid
                            // rowSpacing={3}
                            // columnSpacing={6}
                            // container
                            sx={{ py: 3 }}
                            // xs={12}
                        >
                            <Typography variant="h6" gutterBottom>
                                Identification
                            </Typography>
                        </Grid>
                        <Grid container rowSpacing={3} columnSpacing={6}>
                            <Grid item xs={12}>
                                <InputFeild
                                    id="deno"
                                    name="deno"
                                    label="Denomination Sociale"
                                    fullWidth
                                    autoComplete="deno"
                                />
                            </Grid>

                            <Grid item xs={12} sm={6}>
                                <InputFeild
                                    id="codepostal"
                                    name="codepostal"
                                    label="Code Postal"
                                    fullWidth
                                    autoComplete="billing postal-code"
                                    handleChange={handleChange}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <InputFeild
                                    id="commune"
                                    name="commune"
                                    label="Ville"
                                    customValue={
                                        cityData?.nom ? cityData?.nom : ""
                                    }
                                    fullWidth
                                    autoComplete="billing address-level2"
                                />
                            </Grid>
                            {/* <Grid item xs={12} sm={4}>
                                <InputFeild
                                    id="nationalite"
                                    name="nationalite"
                                    label="Pays"
                                    fullWidth
                                    autoComplete="billing country"
                                />
                            </Grid> */}
                            <Grid item xs={12}>
                                <InputFeild
                                    id="adresse"
                                    name="adresse"
                                    label="Address"
                                    fullWidth
                                    autoComplete="billing address-line1"
                                />
                            </Grid>
                        </Grid>
                    </FormStep>

                    <FormStep
                        stepName="Juridique"
                        onSubmit={() => console.log("step 2")}
                        validationSchema={yup.object({
                            no: yup.string(),
                            // .required()
                            // .matches(/^[0-9]+$/, "Chiffres uniquement")
                            // .min(9, "Doit avoir 9 chiffres")
                            // .max(9, "Doit avoir 9 chiffres")
                            psiret: yup.string(),
                            // .required()
                            // .matches(/^[0-9]+$/, "Chiffres uniquement")
                            // .min(14, "Doit avoir 14 chiffres")
                            // .max(14, "Doit avoir 14 chiffres")
                            formejur: yup.string(),
                            // .required("Ce champ est requis")
                            greffe: yup.string(),
                            // .required("Ce champ est requis")
                            tva: yup.string(),
                            dcren: yup.date(),
                            daterad: yup.date(),
                            dateimmat: yup.date(),
                        })}
                    >
                        <Grid
                            // rowSpacing={3}
                            // columnSpacing={6}
                            // container
                            sx={{ py: 3 }}
                            // xs={12}
                        >
                            <Typography variant="h6" gutterBottom>
                                Informations Juridique
                            </Typography>
                        </Grid>
                        <Grid container rowSpacing={3} columnSpacing={6}>
                            <Grid item xs={12} sm={6}>
                                <InputFeild
                                    id="formejur"
                                    name="formejur"
                                    label="Forme Juridique"
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <InputFeild
                                    InputLabelProps={{ shrink: true }}
                                    type={"date"}
                                    id="dcren"
                                    name="dcren"
                                    label="Date de création"
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <InputFeild
                                    id="no"
                                    name="no"
                                    label="Numero Siren"
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <InputFeild
                                    id="psiret"
                                    name="psiret"
                                    label="Numéro SIRET (siège)"
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <InputFeild
                                    id="greffe"
                                    name="greffe"
                                    label="Numéro RCS"
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <InputFeild
                                    id="tva"
                                    name="tva"
                                    label="Numéro TVA"
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <InputFeild
                                    InputLabelProps={{ shrink: true }}
                                    type={"date"}
                                    id="dateimmat"
                                    name="dateimmat"
                                    label="Date d'immatriculation RCS"
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <InputFeild
                                    InputLabelProps={{ shrink: true }}
                                    type={"date"}
                                    id="daterad"
                                    name="daterad"
                                    label="Date d'enregistrement INSEE"
                                />
                            </Grid>
                        </Grid>
                    </FormStep>
                    <FormStep
                        stepName="Activité"
                        onSubmit={() => console.log("step 3")}
                        validationSchema={yup.object({
                            apetexte: yup.string(),
                            ape: yup.string(),
                        })}
                    >
                        <Grid
                            // rowSpacing={3}
                            // columnSpacing={6}
                            // container
                            sx={{ py: 3 }}
                            // xs={12}
                        >
                            <Typography variant="h6" gutterBottom>
                                Activité
                            </Typography>
                        </Grid>

                        <Grid container rowSpacing={3} columnSpacing={6}>
                            <Grid item xs={12} sm={6}>
                                <InputFeild
                                    id="apetexte"
                                    name="apetexte"
                                    label="Activité"
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <InputFeild
                                    id="ape"
                                    name="ape"
                                    label="Code APE"
                                    fullWidth
                                />
                            </Grid>
                        </Grid>
                    </FormStep>
                    <FormStep
                        stepName="Dirigeant"
                        onSubmit={() => console.log("step 4")}
                        validationSchema={dirigSchema}
                    >
                        {/* <Adddirig /> */}
                        <FieldArray name="dirig">
                            {(fiedArrayProps) => {
                                // console.log(fiedArrayProps);
                                const { push, remove, form } = fiedArrayProps;
                                const { values } = form;
                                const { dirig } = values;
                                return (
                                    // <Box
                                    //     sx={{
                                    //         position: "relative",
                                    //     }}
                                    // >
                                    <>
                                        <Grid
                                            // rowSpacing={3}
                                            // columnSpacing={6}
                                            // container
                                            sx={{ py: 3 }}
                                            // xs={12}
                                        >
                                            <Typography
                                                variant="h6"
                                                gutterBottom
                                            >
                                                Dirigeants
                                            </Typography>
                                        </Grid>
                                        {/* {dirig && dirig.length > 0 */}
                                        {/* ?  */}
                                        {/* {dirig.map((el, index) => ( */}
                                        <Grid
                                            container
                                            rowSpacing={3}
                                            columnSpacing={6}
                                        >
                                            <Grid item xs={12} sm={3}>
                                                <SelectFeild
                                                    select
                                                    options={[
                                                        "M",
                                                        "Mme",
                                                        "Mlle",
                                                    ]}
                                                    id="detcivdir"
                                                    name={`dirig[${0}].detcivdir`}
                                                    label="civilité"
                                                    fullWidth
                                                />
                                            </Grid>
                                            <Grid item xs={12} sm={4.5}>
                                                <InputFeild
                                                    id="detnomdir"
                                                    name={`dirig[${0}].detnomdir`}
                                                    label="Nom"
                                                    fullWidth
                                                />
                                            </Grid>
                                            <Grid item xs={12} sm={4.5}>
                                                <InputFeild
                                                    id="detprenomdir"
                                                    name={`dirig[${0}].detprenomdir`}
                                                    label="Prénom"
                                                    fullWidth
                                                />
                                            </Grid>

                                            {/* <Grid item xs={12} sm={1}>
                                                          <IconButton
                                                              color="error"
                                                              ria-label="delete"
                                                              size="small"
                                                              onClick={() =>
                                                                  remove(index)
                                                              }
                                                          >
                                                              <DeleteOutlineOutlinedIcon />
                                                          </IconButton>
                                                      </Grid> */}

                                            <Grid item xs={12} sm={12}>
                                                <InputFeild
                                                    id="titredirig"
                                                    name={`dirig[${0}].titredirig`}
                                                    label="Type"
                                                    fullWidth
                                                />
                                            </Grid>

                                            <Grid item xs={12} sm={6}>
                                                <InputFeild
                                                    InputLabelProps={{
                                                        shrink: true,
                                                    }}
                                                    id="datenaissance"
                                                    name={`dirig[${0}].datenaissance`}
                                                    label="Date de naissance"
                                                    type="date"
                                                    fullWidth
                                                />
                                            </Grid>
                                            <Grid item xs={12} sm={6}>
                                                <AutoCompleteInputField
                                                    autoLabel="Pays"
                                                    id="paysnaissance"
                                                    name={`dirig[${0}].paysnaissance`}
                                                    label="Pays de naissance"
                                                    fullWidth
                                                />
                                            </Grid>

                                            <Grid item xs={12} sm={6}>
                                                <InputFeild
                                                    id="codepostalnaissance"
                                                    name={`dirig[${0}].codepostalnaissance`}
                                                    label="Code postal de naissance"
                                                    fullWidth
                                                />
                                            </Grid>
                                            <Grid item xs={12} sm={6}>
                                                <InputFeild
                                                    id="villenaissance"
                                                    name={`dirig[${0}].villenaissance`}
                                                    label="Ville de naissance"
                                                    fullWidth
                                                />
                                            </Grid>

                                            <Grid item xs={12} sm={6}>
                                                <AutoCompleteInputField
                                                    autoLabel="Pays"
                                                    id="nationalite"
                                                    name={`dirig[${0}].nationalite`}
                                                    label="Nationalité"
                                                    fullWidth
                                                />
                                            </Grid>
                                            <Grid item xs={12} sm={6}>
                                                <AutoCompleteInputField
                                                    autoLabel="Pays"
                                                    id="paysresidence"
                                                    name={`dirig[${0}].paysresidence`}
                                                    label="Pays de residence"
                                                    fullWidth
                                                />
                                            </Grid>

                                            <Grid item xs={12} sm={12}>
                                                <SelectFeild
                                                    // placeholder="Sélectionner une pièce d'identité (copie en couleur, recto verso)"
                                                    select
                                                    options={[
                                                        "Carte d'identité nationale",
                                                        "Passport",
                                                    ]}
                                                    id="typeidentite"
                                                    name={`dirig[${0}].typeidentite`}
                                                    label="Type de piece d'indentité"
                                                    fullWidth
                                                />
                                            </Grid>
                                            <Grid item xs={12} sm={12}>
                                                <FileUploadInputField
                                                    InputLabelProps={{
                                                        shrink: true,
                                                    }}
                                                    id="imageidentite"
                                                    name={`dirig[${0}].imageidentite`}
                                                    label="Copie d'indentité"
                                                    // type="file"
                                                    fullWidth
                                                />
                                            </Grid>
                                        </Grid>
                                        {/* //   ))
                                            // : null} */}
                                        {/* <IconButton
                                            size="large"
                                            sx={{
                                                position: "absolute",
                                                marginTop: 3,
                                                top: 0,
                                                right: 0,
                                                "&.MuiButton-outlinedSecondary":
                                                    {
                                                        border: "2px solid",
                                                    },
                                            }}
                                            variant="outlined"
                                            color="success"
                                            onClick={() =>
                                                push({
                                                    detcivdir: "",
                                                    detnomdir: "",
                                                    detprenomdir: "",
                                                    titredirig: "",
                                                })
                                            }
                                        >
                                            <BorderColorIcon fontSize="medium" />
                                        </IconButton> */}
                                        {/* </Box> */}
                                    </>
                                );
                            }}
                        </FieldArray>
                    </FormStep>
                </MultiStepForm>
            </Box>
            <CustomizedSnackbar
                open={open}
                setOpen={setOpen}
                alertType={alertType}
                msg={msg}
            />
        </div>
    );
};
export default CreationSociete;
