import { FieldArray } from "formik";
import {
    Autocomplete,
    Box,
    Button,
    Chip,
    Divider,
    FormControl,
    FormControlLabel,
    FormLabel,
    Grid,
    IconButton,
    Paper,
    Radio,
    RadioGroup,
    Stack,
    TextField,
    Tooltip,
    Typography,
    useTheme,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddBoxIcon from "@mui/icons-material/AddBox";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined";
import * as yup from "yup";
import InputFeild from "../../components/InputFeild";
import MultiStepForm, { FormStep } from "../../components/MultiStepForm";
import { useEffect, useState } from "react";
import axios from "axios";
import CustomizedSnackbar from "../../components/Sbackbar";
import SelectFeild from "../../components/SelectFeild";
import AutoCompleteInputField from "../../components/AutoCompleteInputField";
import FileUploadInputField from "../../components/FileUploadInputField";
import { apeCodeList } from "../../constantes/apeCodeData";
import SelectAutoComplete from "../../components/SelectAutoComplete";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import CheckBoxField from "../../components/CheckBoxField";
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
    const theme = useTheme();
    const [capitalPlus25, setCapitalPlus25] = useState(false);
    const [detentionCapDirect, setDetentionCapDirect] = useState(false);
    const [directePleinePropriete, setDirectePleinePropriete] = useState("");
    const [directeNuePropriete, setDirecteNuePropriete] = useState("");
    // console.log(directePleinePropriete, directeNuePropriete);

    const [sign, setSign] = useState(window.innerWidth);
    const [isDirig, setisDirig] = useState("no");
    const [dirigBeneficiaire, setDirigBeneficiaire] = useState(null);
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [alertType, setAlertType] = useState("info");
    const [msg, setMsg] = useState("");
    // const [customValues, setcustomValues] = useState({
    //     city: "",
    //     siren: "",
    //     activité:"",
    // });

    const [city, setCity] = useState("");
    const [dirigTel, setDirigTel] = useState("");
    const [activité, setActivité] = useState("");
    const [sirenNo, setSirenNo] = useState("");
    const [nationality, setNationality] = useState("");
    const [benefOptions, setBenefOptions] = useState([]);
    // console.log(dirigTel);
    // const [cityData, setCityData] = useState({
    //     nom: "",
    //     code: "",
    //     codeDepartement: "",
    //     codeRegion: "",
    //     codesPostaux: [""],
    //     population: 0,
    // });
    const apeList = apeCodeList.map((el) => ({
        code: el.Libellé,
        label: el.Code,
    }));
    const handleSirenChange = (e) => {
        setSirenNo(e.target.value);
    };
    const handleAdressChange = async (e) => {
        const query = e.target.value;
        const res = await axios.get(
            `https://geo.api.gouv.fr/communes?codePostal=${query}`
        );
        // if (res.data.length) setCityData(...res.data);
        const cityName = res.data[0].nom;
        console.log(cityName);
        if (res.data.length) setCity(cityName);
        else setCity("");
        // setCityData({
        //     nom: "",
        //     code: "",
        //     codeDepartement: "",
        //     codeRegion: "",
        //     codesPostaux: [""],
        //     population: 0,
        // });

        // console.log(...res.data);
    };
    const handleSubmit = async (values) => {
        console.log(values);
        // const formData = new FormData();
        // values.dirig.forEach((el, index) => {
        //     if (el.images.length) {
        //         el.images.forEach((img, idx) => {
        //             if (img.img) {
        //                 formData.append(
        //                     "image",
        //                     img.img,
        //                     `${index}-${idx}&${img.img.name}`
        //                 );
        //             }
        //         });
        //     }
        // });
        // formData.append("body", JSON.stringify(values));
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
        //     // console.log(formData.values);
        // } catch (error) {
        //     setLoading(true);
        //     console.log(error);
        //     setMsg("une erreur s'est produite veuillez réessayer");
        //     setAlertType("error");
        //     setOpen(true);
        //     setLoading(false);
        // }
    };
    useEffect(() => {
        if (capitalPlus25 === false) setDetentionCapDirect(false);
    }, [capitalPlus25]);
    useEffect(() => {
        if (detentionCapDirect === false) {
            setDirecteNuePropriete("");
            setDirectePleinePropriete("");
        }
    }, [detentionCapDirect]);
    return (
        <div>
            <Box
                sx={{
                    minHeight: "calc(100vh - 170px)",
                    height: "100%",
                    // maxWidth: 900,
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
                    setSign={setSign}
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
                                dirigTelelphone: "",
                                dirigAdresse: "",
                                images: [{ typeidentite: "", img: null }],
                            },
                        ],
                        beneficiaires: [
                            {
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
                                detentionCapital: {
                                    detentionplus25Capital: false,
                                    detentionCapitalDirect: {
                                        detentionCapitalDirectBoolean: false,
                                        directepleinepropriete: "",
                                        directenuepropriete: "",
                                    },
                                    detentionCapitalIndirect: {
                                        detentionCapitalIndirectBoolean: false,
                                        indirectepleinepropriete: "",
                                        indirectenuepropriete: "",
                                    },
                                },
                            },
                        ],
                    }}
                    onSubmit={(values) => handleSubmit(values)}
                >
                    <FormStep
                        sign={sign}
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
                        sign={sign}
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
                                    customValue={city ? city : ""}
                                    setCustomValue={setCity}
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
                        sign={sign}
                        stepName="Juridique"
                        onSubmit={() => console.log("step 2")}
                        validationSchema={yup.object({
                            no: yup
                                .string()
                                .required()
                                .matches(/^[0-9]+$/, "Chiffres uniquement")
                                .min(9, "Doit avoir 9 chiffres")
                                .max(9, "Doit avoir 9 chiffres"),
                            psiret: yup
                                .string()
                                .required()
                                .matches(/^[0-9]+$/, "Chiffres uniquement")
                                .min(14, "Doit avoir 14 chiffres")
                                .max(14, "Doit avoir 14 chiffres"),
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
                                    setCustomValue={setSirenNo}
                                    label="Numéro SIRET (siège)"
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <InputFeild
                                    id="greffe"
                                    name="greffe"
                                    label="RCS"
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
                        sign={sign}
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
                                    setCustomValue={setActivité}
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
                        sign={sign}
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
                                                variant="h4"
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
                                                    // sx={{ pb: 5 }}
                                                >
                                                    {/* <Grid item xs={12} sm={12}>
                                                    <Divider>
                                                        <Chip
                                                            label={index + 1}
                                                        />
                                                    </Divider>
                                                </Grid> */}
                                                    <Grid
                                                        item
                                                        xs={12}
                                                        sm={12}
                                                        // rowSpacing={3}
                                                        // columnSpacing={6}
                                                        // container
                                                        // sx={{ py: 1 }}
                                                        // xs={12}
                                                    >
                                                        <Typography
                                                            variant="h6"
                                                            gutterBottom
                                                        >
                                                            Ajouter un nouveau
                                                            dirigeant
                                                        </Typography>
                                                    </Grid>
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
                                                            handleChange={(
                                                                value
                                                            ) =>
                                                                value
                                                                    ? setNationality(
                                                                          value.label
                                                                      )
                                                                    : setNationality(
                                                                          ""
                                                                      )
                                                            }
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
                                                            customValue={
                                                                nationality
                                                            }
                                                        />
                                                    </Grid>
                                                    <Grid item xs={12} sm={6}>
                                                        <AutoCompleteInputField
                                                            autoLabel="Pays"
                                                            id="paysresidence"
                                                            name={`dirig[${index}].paysresidence`}
                                                            label="Pays de residence"
                                                            fullWidth
                                                            handleChange={(
                                                                value
                                                            ) =>
                                                                value
                                                                    ? setDirigTel(
                                                                          `+${value.phone}`
                                                                      )
                                                                    : setDirigTel(
                                                                          ""
                                                                      )
                                                            }
                                                        />
                                                    </Grid>
                                                    <Grid item xs={12} sm={6}>
                                                        <InputFeild
                                                            id="dirigTelelphone"
                                                            name={`dirig[${index}].dirigTelelphone`}
                                                            label="Téléphone"
                                                            fullWidth
                                                            customValue={
                                                                dirigTel
                                                            }
                                                            setCustomValue={
                                                                setDirigTel
                                                            }
                                                        />
                                                    </Grid>
                                                    <Grid item xs={12} sm={6}>
                                                        <InputFeild
                                                            id="dirigAdresse"
                                                            name={`dirig[${index}].dirigAdresse`}
                                                            label="Adresse"
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
                                                                    <Box
                                                                        sx={{
                                                                            position:
                                                                                "relative",
                                                                        }}
                                                                    >
                                                                        {dirig[
                                                                            index
                                                                        ].images.map(
                                                                            (
                                                                                el,
                                                                                idx
                                                                            ) => (
                                                                                <Box
                                                                                    key={
                                                                                        idx
                                                                                    }
                                                                                    sx={{
                                                                                        position:
                                                                                            "relative",
                                                                                    }}
                                                                                >
                                                                                    <Grid
                                                                                        container
                                                                                        rowSpacing={
                                                                                            3
                                                                                        }
                                                                                        columnSpacing={
                                                                                            6
                                                                                        }
                                                                                        key={
                                                                                            idx
                                                                                        }
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
                                                                                    <Tooltip title="Supprimer document">
                                                                                        <IconButton
                                                                                            sx={{
                                                                                                position:
                                                                                                    "absolute",
                                                                                                top: "50%",
                                                                                                right: -40,
                                                                                                transform:
                                                                                                    "translateY(-50%)",
                                                                                            }}
                                                                                            color="error"
                                                                                            ria-label="delete"
                                                                                            size="small"
                                                                                            onClick={() =>
                                                                                                remove(
                                                                                                    idx
                                                                                                )
                                                                                            }
                                                                                        >
                                                                                            <DeleteOutlineOutlinedIcon />
                                                                                        </IconButton>
                                                                                    </Tooltip>
                                                                                </Box>
                                                                            )
                                                                        )}
                                                                        <Tooltip title="Ajouter un document">
                                                                            <IconButton
                                                                                size="small"
                                                                                sx={{
                                                                                    position:
                                                                                        "absolute",
                                                                                    // marginTop: 3,
                                                                                    top: "50%",
                                                                                    right: -75,
                                                                                    transform:
                                                                                        "translateY(-50%)",
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
                                                                                <UploadFileIcon fontSize="medium" />
                                                                            </IconButton>
                                                                        </Tooltip>
                                                                    </Box>
                                                                );
                                                            }}
                                                        </FieldArray>
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
                                                        boxShadow:
                                                            theme.shadows[2],
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
                                                                {el.detcivdir}
                                                            </Typography>
                                                            <Typography variant="body2">
                                                                {el.detnomdir}
                                                            </Typography>
                                                            <Typography variant="body2">
                                                                {
                                                                    el.detprenomdir
                                                                }
                                                            </Typography>
                                                        </Stack>
                                                    </Grid>
                                                    <Grid item xs={12} sm={4}>
                                                        <Typography
                                                            variant="body2"
                                                            sx={{
                                                                fontWeight: 500,
                                                                color: "#364a63",
                                                            }}
                                                        >
                                                            {el.titredirig}
                                                        </Typography>
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
                                                transform:
                                                    "translateX(50%) translateY(100%)",
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
                                            color="secondary"
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
                                            Ajouter un dirigeant
                                            {/* <BorderColorIcon fontSize="medium" /> */}
                                        </Button>
                                    </Box>
                                );
                            }}
                        </FieldArray>
                    </FormStep>
                    <FormStep
                        sign={sign}
                        stepName="Bénéficiaires"
                        onSubmit={() => console.log("step 4")}
                        // validationSchema={dirigSchema}
                    >
                        {/* <Adddirig /> */}
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
                                            sx={{ py: 3 }}
                                            // xs={12}
                                        >
                                            <Typography
                                                variant="h4"
                                                gutterBottom
                                            >
                                                Bénéficiaires Effectifs
                                            </Typography>
                                        </Grid>
                                        {/* {dirig && dirig.length > 0 */}
                                        {/* ?  */}
                                        {beneficiaires.map((el, index) =>
                                            index ===
                                            beneficiaires.length - 1 ? (
                                                <Grid
                                                    container
                                                    rowSpacing={3}
                                                    columnSpacing={6}
                                                    key={index}
                                                    // sx={{ pb: 5 }}
                                                >
                                                    <Grid item xs={12} sm={12}>
                                                        <Typography
                                                            variant="h6"
                                                            gutterBottom
                                                        >
                                                            Ajouter un
                                                            bénéficiare effectif
                                                        </Typography>
                                                    </Grid>
                                                    <Grid item xs={12} sm={12}>
                                                        <InputFeild
                                                            InputLabelProps={{
                                                                shrink: true,
                                                            }}
                                                            id="datebeneficiaire"
                                                            name={`beneficiaires[${index}].datebeneficiaire`}
                                                            label="Date à la quelle est devenue bénéficiaire effectif"
                                                            type="date"
                                                            fullWidth
                                                        />
                                                    </Grid>
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
                                                                Le bénéficiare
                                                                effectif est
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
                                                                onChange={(
                                                                    e
                                                                ) => {
                                                                    setisDirig(
                                                                        e.target
                                                                            .value
                                                                    );
                                                                }}
                                                            >
                                                                <FormControlLabel
                                                                    value={
                                                                        "yes"
                                                                    }
                                                                    control={
                                                                        <Radio />
                                                                    }
                                                                    label={
                                                                        <Typography
                                                                            sx={{
                                                                                fontSize: 12,
                                                                                fontWeight: 600,
                                                                            }}
                                                                            variant="body2"
                                                                        >
                                                                            un
                                                                            derigeant
                                                                            actuel
                                                                        </Typography>
                                                                    }
                                                                />
                                                                <FormControlLabel
                                                                    value={"no"}
                                                                    control={
                                                                        <Radio />
                                                                    }
                                                                    label={
                                                                        <Typography
                                                                            sx={{
                                                                                fontSize: 12,
                                                                                fontWeight: 600,
                                                                            }}
                                                                            variant="body2"
                                                                        >
                                                                            une
                                                                            autre
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
                                                            disabled={
                                                                isDirig === "no"
                                                            }
                                                            id="dirig-select"
                                                            options={dirig}
                                                            autoHighlight
                                                            getOptionLabel={(
                                                                option
                                                            ) =>
                                                                option.detnomdir
                                                            }
                                                            onChange={(
                                                                e,
                                                                value
                                                            ) => {
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
                                                                    {
                                                                        option.detnomdir
                                                                    }
                                                                </Box>
                                                            )}
                                                            renderInput={(
                                                                params
                                                            ) => (
                                                                <TextField
                                                                    {...params}
                                                                    label=""
                                                                    inputProps={{
                                                                        ...params.inputProps,
                                                                    }}
                                                                />
                                                            )}
                                                        />
                                                        {/* ) : (
                                                            <Autocomplete
                                                                fullWidth
                                                                disabled
                                                                options={[]}
                                                                autoHighlight
                                                                getOptionLabel={(
                                                                    option
                                                                ) => option}
                                                                renderInput={(
                                                                    params
                                                                ) => (
                                                                    <TextField
                                                                        {...params}
                                                                        label=""
                                                                        inputProps={{
                                                                            ...params.inputProps,
                                                                        }}
                                                                    />
                                                                )}
                                                            />
                                                        )} */}
                                                    </Grid>
                                                    <Grid item xs={12} sm={12}>
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
                                                            autoLabel="Pays"
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
                                                    {/* <Grid item xs={12} sm={12}>
                                                        <CheckBoxField
                                                            // id="initi"
                                                            name={`beneficiaires[${index}].detentionCapital.detentionplus25Capital`}
                                                            label="Detention de plus de 25% du capital"
                                                            // fullWidth
                                                            callbackSetter={
                                                                setCapitalPlus25
                                                            }
                                                        />
                                                    </Grid> */}
                                                    {/* {capitalPlus25 && (
                                                        <Box mx={10} p>
                                                            <Grid
                                                                item
                                                                xs={12}
                                                                sm={12}
                                                            >
                                                                <CheckBoxField
                                                                    // id="initi"
                                                                    name={`beneficiaires[${index}].detentionCapital.detentionCapitalDirect.detentionCapitalDirectBoolean`}
                                                                    label="Detention directe (pourcentage)"
                                                                    // fullWidth
                                                                    callbackSetter={
                                                                        setDetentionCapDirect
                                                                    }
                                                                    customValue={
                                                                        detentionCapDirect
                                                                    }
                                                                    setCustomValue={
                                                                        setDetentionCapDirect
                                                                    }
                                                                />
                                                            </Grid>
                                                            {detentionCapDirect && (
                                                                <Grid
                                                                    container
                                                                    rowSpacing={
                                                                        1
                                                                    }
                                                                    columnSpacing={
                                                                        5
                                                                    }
                                                                    m={1}
                                                                    // xs={12}
                                                                >
                                                                    <Grid
                                                                        item
                                                                        xs={12}
                                                                        sm={2}
                                                                        sx={{
                                                                            display:
                                                                                "flex",
                                                                            alignItems:
                                                                                "center",
                                                                        }}
                                                                    >
                                                                        <Typography>
                                                                            dont
                                                                            :
                                                                        </Typography>
                                                                    </Grid>
                                                                    <Grid
                                                                        item
                                                                        xs={12}
                                                                        sm={5}
                                                                    >
                                                                        <Stack
                                                                            direction="row"
                                                                            alignItems="center"
                                                                            spacing={
                                                                                1
                                                                            }
                                                                        >
                                                                            <InputFeild
                                                                                // id="adressebeneficiaire"
                                                                                name={`beneficiaires[${index}].detentionCapital.detentionCapitalDirect.directepleinepropriete`}
                                                                                label="Pleine propriete"
                                                                                fullWidth
                                                                                customValue={
                                                                                    directePleinePropriete
                                                                                }
                                                                                setCustomValue={
                                                                                    setDirectePleinePropriete
                                                                                }
                                                                            />
                                                                            <Typography>
                                                                                %
                                                                            </Typography>
                                                                        </Stack>
                                                                    </Grid>
                                                                    <Grid
                                                                        item
                                                                        xs={12}
                                                                        sm={5}
                                                                    >
                                                                        <Stack
                                                                            direction="row"
                                                                            alignItems="center"
                                                                            spacing={
                                                                                1
                                                                            }
                                                                        >
                                                                            <InputFeild
                                                                                // id="adressebeneficiaire"
                                                                                name={`beneficiaires[${index}].detentionCapital.detentionCapitalDirect.directenuepropriete`}
                                                                                label="Nue-propriete"
                                                                                fullWidth
                                                                                customValue={
                                                                                    directeNuePropriete
                                                                                }
                                                                                setCustomValue={
                                                                                    setDirecteNuePropriete
                                                                                }
                                                                            />
                                                                            <Typography>
                                                                                %
                                                                            </Typography>
                                                                        </Stack>
                                                                    </Grid>
                                                                </Grid>
                                                            )}
                                                        </Box>
                                                    )} */}
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
                                                        boxShadow:
                                                            theme.shadows[2],
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
                                                                {
                                                                    el.prenombenefi
                                                                }
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
                                                transform:
                                                    "translateX(50%) translateY(100%)",
                                                "&.MuiButton-outlinedSecondary":
                                                    {
                                                        border: "2px solid",
                                                    },
                                            }}
                                            disabled={
                                                !beneficiaires[
                                                    beneficiaires.length - 1
                                                ].nombenefi ||
                                                !beneficiaires[
                                                    beneficiaires.length - 1
                                                ].prenombenefi
                                            }
                                            variant="outlined"
                                            color="secondary"
                                            onClick={() => {
                                                if (
                                                    beneficiaires[
                                                        beneficiaires.length - 1
                                                    ].nombenefi &&
                                                    beneficiaires[
                                                        beneficiaires.length - 1
                                                    ].prenombenefi
                                                ) {
                                                    if (dirigBeneficiaire) {
                                                        const current =
                                                            benefOptions.filter(
                                                                (el) =>
                                                                    el !==
                                                                    dirigBeneficiaire
                                                            );
                                                        setBenefOptions(
                                                            current
                                                        );
                                                    }
                                                    console.log(beneficiaires);
                                                    setisDirig("no");
                                                    setDirigBeneficiaire(null);
                                                    push({
                                                        datebeneficiaire: "",
                                                        nombenefi: "",
                                                        prenombenefi: "",
                                                        datenaissancebenefi: "",
                                                        paysnaissancebenefi: "",
                                                        codepostalnaissancebenefi:
                                                            "",
                                                        villenaissancebenefi:
                                                            "",
                                                        nationalitebenefi: "",
                                                        paysresidencebenefi: "",
                                                        dirigAdressebenefi: "",
                                                    });
                                                }
                                                return;
                                            }}
                                        >
                                            Ajouter un bénéficiaire
                                            {/* <BorderColorIcon fontSize="medium" /> */}
                                        </Button>
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
