import { FieldArray } from "formik";
import {
    Box,
    Button,
    Chip,
    Divider,
    Grid,
    IconButton,
    Paper,
    Stack,
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
import { apeCodeList } from "../../constantes/apeCodeData";
import SelectAutoComplete from "../../components/SelectAutoComplete";

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
const imageSchema = yup.object({
    image: yup
        .mixed()
        .nullable()
        .notRequired()
        .test("fileSize", "File is too large", (value) =>
            value ? value.size <= 10000000 : true
        )
        .test("fileType", "Format d'image non valide", (value) =>
            value ? SUPPORTED_FORMATS.includes(value?.type) : true
        ),
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
    image: yup
        .mixed()
        .nullable()
        .notRequired()
        .test("fileSize", "File is too large", (value) =>
            value ? value.size <= 10000000 : true
        )
        .test("fileType", "Format d'image non valide", (value) =>
            value ? SUPPORTED_FORMATS.includes(value?.type) : true
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
    const [activité, setActivité] = useState("");
    const [cityData, setCityData] = useState({
        nom: "",
        code: "",
        codeDepartement: "",
        codeRegion: "",
        codesPostaux: [""],
        population: 0,
    });
    const apeList = apeCodeList.map((el) => ({
        code: el.Libellé,
        label: el.Code,
    }));
    console.log(activité);
    // console.log(apeCodeList.map((el) => el.Code));
    const [sirenNo, setSirenNo] = useState("");
    const handleSirenChange = (e) => {
        setSirenNo(e.target.value);
    };
    const handleAdressChange = async (e) => {
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
        const formData = new FormData();
        values.dirig.forEach((el, index) => {
            if (el.images.length) {
                // el.image.name = `${index}-${el.image.name}`;
                formData.append("image", el.image, `${index}-${el.image.name}`);
                // console.log(el.image);
            }
        });
        // formData.append("image", values.image);
        // formData.append("json", values);
        // for (const [key, value] of Object.entries(values)) {
        //     formData.append(key, JSON.stringify(value));
        // }

        // formData.append("image", values.image);
        formData.append("body", JSON.stringify(values));
        // console.log(formData);
        // try {
        //     setLoading(true);
        //     const res = await axios.post(
        //         "http://localhost:8000/api/company/create",
        //         formData
        //     );
        //     console.log(res.data);
        //     setMsg(res.data.msg);
        //     setAlertType(res.data.alert);
        //     setOpen(true);
        //     setLoading(false);
        //     console.log(formData.values);
        // } catch (error) {
        //     setLoading(true);

        //     console.log(error);

        //     setMsg("une erreur s'est produite veuillez réessayer");
        //     setAlertType("error");
        //     setOpen(true);
        //     setLoading(false);
        // }
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
                                images: [{ typeidentite: "", img: null }],
                            },
                        ],
                    }}
                    onSubmit={(values) => handleSubmit(values)}
                >
                    <FormStep
                        stepName="Bonjour"
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
                            <Grid item xs={12}>
                                <InputFeild
                                    id="adresse"
                                    name="adresse"
                                    label="Address"
                                    fullWidth
                                    autoComplete="billing address-line1"
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <InputFeild
                                    id="codepostal"
                                    name="codepostal"
                                    label="Code Postal"
                                    fullWidth
                                    autoComplete="billing postal-code"
                                    handleChange={handleAdressChange}
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
                                    handleChange={handleSirenChange}
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <InputFeild
                                    id="psiret"
                                    name="psiret"
                                    customValue={sirenNo}
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
                            <Grid item xs={12} sm={12}>
                                <SelectAutoComplete
                                    handleChange={(value) =>
                                        value
                                            ? setActivité(value.code)
                                            : setActivité("")
                                    }
                                    options={apeList}
                                    id="ape"
                                    name="ape"
                                    label="Code APE"
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={12} sm={12}>
                                <InputFeild
                                    customValue={
                                        activité.length ? activité : ""
                                    }
                                    multiline
                                    rows={4}
                                    // type="textarea"
                                    id="apetexte"
                                    name="apetexte"
                                    label="Activité"
                                    fullWidth
                                />
                            </Grid>
                        </Grid>
                    </FormStep>
                    <FormStep
                        stepName="Dirigeant"
                        onSubmit={() => console.log("step 4")}
                        // validationSchema={dirigSchema}
                    >
                        {/* <Adddirig /> */}
                        <FieldArray name="dirig">
                            {(fieldArrayProps) => {
                                // console.log(fieldArrayProps);
                                const { push, remove, form } = fieldArrayProps;
                                const { values } = form;
                                const { dirig } = values;
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
                                        {dirig.map((el, index) =>
                                            index === dirig.length - 1 ? (
                                                <Grid
                                                    container
                                                    rowSpacing={3}
                                                    columnSpacing={6}
                                                    key={index}
                                                    sx={{ pb: 5 }}
                                                >
                                                    {/* <Grid item xs={12} sm={12}>
                                                    <Divider>
                                                        <Chip
                                                            label={index + 1}
                                                        />
                                                    </Divider>
                                                </Grid> */}
                                                    <Grid item xs={12} sm={3}>
                                                        <SelectFeild
                                                            select
                                                            options={[
                                                                "M",
                                                                "Mme",
                                                                "Mlle",
                                                            ]}
                                                            id="detcivdir"
                                                            name={`dirig[${index}].detcivdir`}
                                                            label="civilité"
                                                            fullWidth
                                                        />
                                                    </Grid>
                                                    <Grid item xs={12} sm={4.5}>
                                                        <InputFeild
                                                            id="detnomdir"
                                                            name={`dirig[${index}].detnomdir`}
                                                            label="Nom"
                                                            fullWidth
                                                        />
                                                    </Grid>
                                                    <Grid item xs={12} sm={4.5}>
                                                        <InputFeild
                                                            id="detprenomdir"
                                                            name={`dirig[${index}].detprenomdir`}
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
                                                            name={`dirig[${index}].titredirig`}
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
                                                            name={`dirig[${index}].datenaissance`}
                                                            label="Date de naissance"
                                                            type="date"
                                                            fullWidth
                                                        />
                                                    </Grid>
                                                    <Grid item xs={12} sm={6}>
                                                        <AutoCompleteInputField
                                                            autoLabel="Pays"
                                                            id="paysnaissance"
                                                            name={`dirig[${index}].paysnaissance`}
                                                            label="Pays de naissance"
                                                            fullWidth
                                                        />
                                                    </Grid>

                                                    <Grid item xs={12} sm={6}>
                                                        <InputFeild
                                                            id="codepostalnaissance"
                                                            name={`dirig[${index}].codepostalnaissance`}
                                                            label="Code postal de naissance"
                                                            fullWidth
                                                        />
                                                    </Grid>
                                                    <Grid item xs={12} sm={6}>
                                                        <InputFeild
                                                            id="villenaissance"
                                                            name={`dirig[${index}].villenaissance`}
                                                            label="Ville de naissance"
                                                            fullWidth
                                                        />
                                                    </Grid>

                                                    <Grid item xs={12} sm={6}>
                                                        <AutoCompleteInputField
                                                            autoLabel="Pays"
                                                            id="nationalite"
                                                            name={`dirig[${index}].nationalite`}
                                                            label="Nationalité"
                                                            fullWidth
                                                        />
                                                    </Grid>
                                                    <Grid item xs={12} sm={6}>
                                                        <AutoCompleteInputField
                                                            autoLabel="Pays"
                                                            id="paysresidence"
                                                            name={`dirig[${index}].paysresidence`}
                                                            label="Pays de residence"
                                                            fullWidth
                                                        />
                                                    </Grid>
                                                    <Grid item xs={12} sm={12}>
                                                        <FieldArray
                                                            name={`dirig[${index}].images`}
                                                        >
                                                            {(props) => {
                                                                const {
                                                                    push,
                                                                    remove,
                                                                    form,
                                                                } = props;
                                                                const {
                                                                    values,
                                                                } = form;
                                                                const {
                                                                    dirig,
                                                                } = values;
                                                                return (
                                                                    <Box>
                                                                        {dirig[
                                                                            index
                                                                        ].images.map(
                                                                            (
                                                                                el,
                                                                                idx
                                                                            ) => (
                                                                                <Grid
                                                                                    container
                                                                                    rowSpacing={
                                                                                        3
                                                                                    }
                                                                                    columnSpacing={
                                                                                        6
                                                                                    }
                                                                                    key={
                                                                                        index
                                                                                    }
                                                                                    sx={{
                                                                                        pb: 3,
                                                                                    }}
                                                                                >
                                                                                    <Grid
                                                                                        item
                                                                                        xs={
                                                                                            12
                                                                                        }
                                                                                        sm={
                                                                                            6
                                                                                        }
                                                                                    >
                                                                                        <SelectFeild
                                                                                            // placeholder="Sélectionner une pièce d'identité (copie en couleur, recto verso)"
                                                                                            select
                                                                                            options={[
                                                                                                "Carte d'identité nationale",
                                                                                                "Passport",
                                                                                            ]}
                                                                                            id="typeidentite"
                                                                                            name={`dirig[${index}].images[${idx}].typeidentite`}
                                                                                            label="Type de piece d'indentité"
                                                                                            fullWidth
                                                                                        />
                                                                                    </Grid>
                                                                                    <Grid
                                                                                        item
                                                                                        xs={
                                                                                            12
                                                                                        }
                                                                                        sm={
                                                                                            6
                                                                                        }
                                                                                    >
                                                                                        <FileUploadInputField
                                                                                            InputLabelProps={{
                                                                                                shrink: true,
                                                                                            }}
                                                                                            id="img"
                                                                                            name={`dirig[${index}].images[${idx}].img`}
                                                                                            label="Copie d'indentité"
                                                                                            // type="file"
                                                                                            fullWidth
                                                                                        />
                                                                                    </Grid>
                                                                                </Grid>
                                                                            )
                                                                        )}
                                                                        <IconButton
                                                                            size="large"
                                                                            sx={{
                                                                                // position:
                                                                                //     "absolute",
                                                                                // marginTop: 3,
                                                                                // top: 0,
                                                                                // right: 0,
                                                                                "&.MuiButton-outlinedSecondary":
                                                                                    {
                                                                                        border: "2px solid",
                                                                                    },
                                                                            }}
                                                                            variant="outlined"
                                                                            color="success"
                                                                            onClick={() => {
                                                                                push(
                                                                                    {
                                                                                        typeidentite:
                                                                                            "",
                                                                                        img: null,
                                                                                    }
                                                                                );
                                                                            }}
                                                                        >
                                                                            <BorderColorIcon fontSize="medium" />
                                                                        </IconButton>
                                                                    </Box>
                                                                );
                                                            }}
                                                        </FieldArray>
                                                    </Grid>
                                                </Grid>
                                            ) : (
                                                <Grid
                                                    container
                                                    rowSpacing={3}
                                                    columnSpacing={6}
                                                    key={index}
                                                    sx={{ pb: 2, px: 5 }}
                                                >
                                                    <Grid item xs={12} sm={3}>
                                                        <Typography variant="h6">
                                                            {el.titredirig}
                                                        </Typography>
                                                    </Grid>
                                                    <Grid item xs={12} sm={9}>
                                                        <Stack
                                                            direction="row"
                                                            alignItems="center"
                                                            spacing={2}
                                                        >
                                                            <Typography variant="body1">
                                                                {el.detcivdir}
                                                            </Typography>
                                                            <Typography variant="body1">
                                                                {el.detnomdir}
                                                            </Typography>
                                                            <Typography variant="body1">
                                                                {
                                                                    el.detprenomdir
                                                                }
                                                            </Typography>
                                                        </Stack>
                                                    </Grid>
                                                </Grid>
                                            )
                                        )}
                                        <IconButton
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
                                            disabled={
                                                !dirig[dirig.length - 1]
                                                    .detcivdir ||
                                                !dirig[dirig.length - 1]
                                                    .detnomdir ||
                                                !dirig[dirig.length - 1]
                                                    .detprenomdir ||
                                                !dirig[dirig.length - 1]
                                                    .titredirig
                                            }
                                            variant="outlined"
                                            color="success"
                                            onClick={() => {
                                                if (
                                                    dirig[dirig.length - 1]
                                                        .detcivdir &&
                                                    dirig[dirig.length - 1]
                                                        .detnomdir &&
                                                    dirig[dirig.length - 1]
                                                        .detprenomdir &&
                                                    dirig[dirig.length - 1]
                                                        .titredirig
                                                ) {
                                                    push({
                                                        detcivdir: "",
                                                        detnomdir: "",
                                                        detprenomdir: "",
                                                        titredirig: "",
                                                        datenaissance: "",
                                                        paysnaissance: "",
                                                        codepostalnaissance: "",
                                                        villenaissance: "",
                                                        nationalite: "",
                                                        paysresidence: "",
                                                        typeidentite: "",
                                                        images: [],
                                                    });
                                                }
                                                return;
                                            }}
                                        >
                                            <BorderColorIcon fontSize="medium" />
                                        </IconButton>
                                    </Box>
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
