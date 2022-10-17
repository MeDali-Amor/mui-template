import { FieldArray, useFormikContext } from "formik";
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
import AssociesForm from "./AssociesForm";
import Step0 from "./Step0";
// import DocSouscripteurs from "./DocSouscripteurs";
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
});

const dirigSchema = yup.object({
    dirig: yup.array().of(dirigeantValidationSchema),
});

const CreationSociete = () => {
    // const { values } = useFormikContext();

    const theme = useTheme();

    // console.log(directePleinePropriete, directeNuePropriete);

    const [data, setData] = useState(null);
    const [sign, setSign] = useState(window.innerWidth);

    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [alertType, setAlertType] = useState("info");
    const [msg, setMsg] = useState("");
    const [errorForm, setErrorForm] = useState("");

    const [isDirig, setisDirig] = useState("no");
    const [nature, setNature] = useState("physique");
    const [montantCap, setMontantCap] = useState("");
    const [pourcentageCapital, setpourcentageCapital] = useState(100);
    const [pourcentageVote, setpourcentageVote] = useState(100);

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
        try {
            let dirigList = values.dirig;
            let associesList = values.associes;
            let associesRes = await Promise.all(
                associesList.map(async (el) => {
                    if (el.nature === "physique") delete el.societe;
                    else if (el.nature === "morale") delete el.personne;

                    const res = await axios.post(
                        "http://localhost:8000/api/associe/create",
                        el
                    );
                    return res.data.newAssocie._id;
                    // return el;
                })
            );
            let dirigRes = await Promise.all(
                dirigList.map(async (el) => {
                    const res = await axios.post(
                        "http://localhost:8000/api/dirig/create",
                        el
                    );
                    return res.data.newDirigeant._id;
                })
            );
            // console.log(dirigRes);
            // console.log(associesRes);
            let dataToSubmit = {
                ...values,
                dirig: dirigRes,
                associes: associesRes,
            };
            // console.log(dataToSubmit);

            const res = await axios.post(
                "http://localhost:8000/api/company/create",
                dataToSubmit
            );
            console.log(res);
        } catch (error) {
            console.log(error);
        }
    };

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
                        capital: "",
                        deno: "",
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
                        telephone: "",
                        adresses: [
                            {
                                adresse: {
                                    adresse: "",
                                    code_postal: "",
                                    ville: "",
                                    pays: "",
                                },
                                date_de: "",
                                date_a: "",
                            },
                        ],

                        dirig: [
                            {
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
                                adresse: {
                                    adresse: "",
                                    code_postal: "",
                                    ville: "",
                                    pays: "",
                                },
                                titre: "",
                                date_debut: "",
                                date_fin: "",
                                // images: [{ typeidentite: "", img: null }],
                            },
                        ],
                        associes: [
                            {
                                nature: "physique",
                                detention_capital: pourcentageCapital,
                                detention_droit_vote: pourcentageVote,
                                date_debut: "",
                                date_fin: "",
                                adresse: {
                                    adresse: "",
                                    code_postal: "",
                                    ville: "",
                                    pays: "",
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
                                            adresse: {
                                                adresse: "",
                                                code_postal: "",
                                                ville: "",
                                                pays: "",
                                            },
                                            date_de: "",
                                            date_a: "",
                                        },
                                    ],
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
                        <Step0 />
                    </FormStep>
                    <FormStep
                        sign={sign}
                        stepName="Identification"
                        onSubmit={() => console.log("step 1")}
                        // validationSchema={validationSchema}
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
                                    id="formejur"
                                    name="formejur"
                                    label="Forme Juridique"
                                    fullWidth
                                />
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
                            {/* <Grid item xs={12}>
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
                            </Grid> */}
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
                        stepName="Adresses"
                        onSubmit={() => console.log("step 2")}
                        // validationSchema={validationSchema}
                    >
                        <Grid
                            // rowSpacing={3}
                            // columnSpacing={6}
                            // container
                            sx={{ py: 3 }}
                            // xs={12}
                        >
                            <Typography variant="h6" gutterBottom>
                                Adresses
                            </Typography>
                        </Grid>
                        <Grid container rowSpacing={3} columnSpacing={6}>
                            <FieldArray name="adresses">
                                {(fieldArrayProps) => {
                                    // console.log(fieldArrayProps);
                                    const { push, remove, form } =
                                        fieldArrayProps;
                                    const { values } = form;
                                    const { adresses } = values;
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
                                                    Adresses
                                                </Typography>
                                            </Grid>
                                            {/* {dirig && dirig.length > 0 */}
                                            {/* ?  */}
                                            {adresses.map((el, index) => (
                                                <Grid
                                                    container
                                                    rowSpacing={3}
                                                    columnSpacing={6}
                                                    key={index}
                                                    sx={{
                                                        position: "relative",
                                                        // backgroundColor: "red",
                                                    }}
                                                >
                                                    {/* <Grid item xs={12} sm={12}>
                                                    <Divider>
                                                        <Chip
                                                            label={index + 1}
                                                        />
                                                    </Divider>
                                                </Grid> */}
                                                    <Tooltip title="Supprimer adresse">
                                                        <IconButton
                                                            sx={{
                                                                position:
                                                                    "absolute",
                                                                top: "25%",
                                                                right: -40,
                                                                transform:
                                                                    "translateY(-50%)",
                                                            }}
                                                            color="error"
                                                            ria-label="delete"
                                                            size="small"
                                                            onClick={() =>
                                                                remove(index)
                                                            }
                                                        >
                                                            <DeleteOutlineOutlinedIcon />
                                                        </IconButton>
                                                    </Tooltip>
                                                    <Grid
                                                        item
                                                        xs={12}
                                                        sm={12}
                                                        // rowSpacing={3}
                                                        // columnSpacing={6}
                                                        // container
                                                        sx={{ my: 2 }}
                                                        // xs={12}
                                                    >
                                                        <Typography
                                                            variant="h6"
                                                            gutterBottom
                                                        >
                                                            Ajouter une adresse
                                                        </Typography>
                                                    </Grid>

                                                    <Grid item xs={12} sm={12}>
                                                        <InputFeild
                                                            id="adressesAdresse"
                                                            name={`adresses[${index}].adresse.adresse`}
                                                            label="Adresse"
                                                            fullWidth
                                                        />
                                                    </Grid>
                                                    <Grid item xs={12} sm={6}>
                                                        <InputFeild
                                                            id="adressesAdresse"
                                                            name={`adresses[${index}].adresse.code_postal`}
                                                            label="Code postal"
                                                            fullWidth
                                                        />
                                                    </Grid>
                                                    <Grid item xs={12} sm={6}>
                                                        <InputFeild
                                                            id="adressesAdresse"
                                                            name={`adresses[${index}].adresse.ville`}
                                                            label="Ville"
                                                            fullWidth
                                                        />
                                                    </Grid>
                                                    <Grid item xs={12} sm={12}>
                                                        <InputFeild
                                                            id="adressesAdresse"
                                                            name={`adresses[${index}].adresse.pays`}
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
                                                            name={`adresses[${index}].date_de`}
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
                                                            name={`adresses[${index}].date_a`}
                                                            label="A"
                                                            type="date"
                                                            fullWidth
                                                        />
                                                    </Grid>
                                                </Grid>
                                            ))}

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
                                                variant="outlined"
                                                color="secondary"
                                                onClick={() => {
                                                    push({
                                                        adresse: {
                                                            adresse: "",
                                                            code_postal: "",
                                                            ville: "",
                                                            pays: "",
                                                        },
                                                        date_de: "",
                                                        date_a: "",
                                                    });
                                                }}
                                            >
                                                Ajouter une adresses
                                                {/* <BorderColorIcon fontSize="medium" /> */}
                                            </Button>
                                        </Box>
                                    );
                                }}
                            </FieldArray>
                            {/* <Grid item xs={12}>
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
                            </Grid> */}
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

                    {/* <FormStep
                        sign={sign}
                        stepName="Juridique"
                        onSubmit={() => console.log("step 2")}
                        validationSchema={yup.object({
                            // no: yup
                            //     .string()
                            //     .required()
                            //     .matches(/^[0-9]+$/, "Chiffres uniquement")
                            //     .min(9, "Doit avoir 9 chiffres")
                            //     .max(9, "Doit avoir 9 chiffres"),
                            // psiret: yup
                            //     .string()
                            //     .required()
                            //     .matches(/^[0-9]+$/, "Chiffres uniquement")
                            //     .min(14, "Doit avoir 14 chiffres")
                            //     .max(14, "Doit avoir 14 chiffres"),
                            // formejur: yup.string(),
                            // .required("Ce champ est requis")
                            // greffe: yup.string(),
                            // .required("Ce champ est requis")
                            // tva: yup.string(),
                            // dcren: yup.date(),
                            // daterad: yup.date(),
                            // dateimmat: yup.date(),
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
                    </FormStep> */}
                    {/* <FormStep
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

                        <Grid container rowSpacing={3} columnSpacing={6}></Grid>
                    </FormStep> */}
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
                                                    sx={{
                                                        position: "relative",
                                                        // backgroundColor: "red",
                                                    }}
                                                >
                                                    {/* <Grid item xs={12} sm={12}>
                                                    <Divider>
                                                        <Chip
                                                            label={index + 1}
                                                        />
                                                    </Divider>
                                                </Grid> */}
                                                    <Tooltip title="Supprimer dirigeant">
                                                        <IconButton
                                                            sx={{
                                                                position:
                                                                    "absolute",
                                                                top: "25%",
                                                                right: -40,
                                                                transform:
                                                                    "translateY(-50%)",
                                                            }}
                                                            color="error"
                                                            ria-label="delete"
                                                            size="small"
                                                            onClick={() =>
                                                                remove(index)
                                                            }
                                                        >
                                                            <DeleteOutlineOutlinedIcon />
                                                        </IconButton>
                                                    </Tooltip>
                                                    <Grid
                                                        item
                                                        xs={12}
                                                        sm={12}
                                                        // rowSpacing={3}
                                                        // columnSpacing={6}
                                                        // container
                                                        sx={{ my: 2 }}
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
                                                            name={`dirig[${index}].personne.civilite`}
                                                            label="civilité"
                                                            fullWidth
                                                        />
                                                    </Grid>
                                                    <Grid item xs={12} sm={4.5}>
                                                        <InputFeild
                                                            id="detnomdir"
                                                            name={`dirig[${index}].personne.nom`}
                                                            label="Nom"
                                                            fullWidth
                                                        />
                                                    </Grid>
                                                    <Grid item xs={12} sm={4.5}>
                                                        <InputFeild
                                                            id="detprenomdir"
                                                            name={`dirig[${index}].personne.prenom`}
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
                                                            name={`dirig[${index}].titre`}
                                                            label="Titre"
                                                            fullWidth
                                                        />
                                                    </Grid>
                                                    <Grid item xs={12} sm={6}>
                                                        <InputFeild
                                                            // id="titredirig"
                                                            name={`dirig[${index}].date_debut`}
                                                            label="date debut"
                                                            fullWidth
                                                        />
                                                    </Grid>
                                                    <Grid item xs={12} sm={6}>
                                                        <InputFeild
                                                            // id="titredirig"
                                                            name={`dirig[${index}].date_fin`}
                                                            label="date fin"
                                                            fullWidth
                                                        />
                                                    </Grid>

                                                    <Grid item xs={12} sm={6}>
                                                        <InputFeild
                                                            InputLabelProps={{
                                                                shrink: true,
                                                            }}
                                                            id="datenaissance"
                                                            name={`dirig[${index}].personne.date_naissance`}
                                                            label="Date de naissance"
                                                            type="date"
                                                            fullWidth
                                                        />
                                                    </Grid>
                                                    <Grid item xs={12} sm={6}>
                                                        <AutoCompleteInputField
                                                            autoLabel="Pays"
                                                            id="paysnaissance"
                                                            name={`dirig[${index}].personne.pays_naissance`}
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
                                                        />
                                                    </Grid>

                                                    {/* <Grid item xs={12} sm={6}>
                                                        <InputFeild
                                                            id="codepostalnaissance"
                                                            name={`dirig[${index}].codepostalnaissance`}
                                                            label="Code postal de naissance"
                                                            fullWidth
                                                        />
                                                    </Grid> */}
                                                    <Grid item xs={12} sm={6}>
                                                        <InputFeild
                                                            id="villenaissance"
                                                            name={`dirig[${index}].personne.ville_naissance`}
                                                            label="Ville de naissance"
                                                            fullWidth
                                                        />
                                                    </Grid>

                                                    <Grid item xs={12} sm={6}>
                                                        <AutoCompleteInputField
                                                            autoLabel="Pays"
                                                            id="nationalite"
                                                            name={`dirig[${index}].personne.nationalite`}
                                                            label="Nationalité"
                                                            fullWidth
                                                            // customValue={
                                                            //     nationality
                                                            // }
                                                        />
                                                    </Grid>
                                                    <Grid item xs={12} sm={6}>
                                                        <AutoCompleteInputField
                                                            autoLabel="Pays"
                                                            id="paysresidence"
                                                            name={`dirig[${index}].personne.pays_residence`}
                                                            label="Pays de residence"
                                                            fullWidth
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
                                                            id="dirigTelelphone"
                                                            name={`dirig[${index}].personne.num_tel`}
                                                            label="Téléphone"
                                                            fullWidth
                                                            // customValue={
                                                            //     dirigTel
                                                            // }
                                                            // setCustomValue={
                                                            //     setDirigTel
                                                            // }
                                                        />
                                                    </Grid>
                                                    <Grid item xs={12} sm={12}>
                                                        <InputFeild
                                                            id="adressesAdresse"
                                                            name={`dirig[${index}].adresse.adresse`}
                                                            label="Adresse"
                                                            fullWidth
                                                        />
                                                    </Grid>
                                                    <Grid item xs={12} sm={6}>
                                                        <InputFeild
                                                            id="dirigAdresse"
                                                            name={`dirig[${index}].adresse.code_postal`}
                                                            label="Code postal"
                                                            fullWidth
                                                        />
                                                    </Grid>
                                                    <Grid item xs={12} sm={6}>
                                                        <InputFeild
                                                            id="dirigAdresse"
                                                            name={`dirig[${index}].adresse.ville`}
                                                            label="Ville"
                                                            fullWidth
                                                        />
                                                    </Grid>
                                                    <Grid item xs={12} sm={12}>
                                                        <InputFeild
                                                            id="dirigAdresse"
                                                            name={`dirig[${index}].adresse.pays`}
                                                            label="Pays"
                                                            fullWidth
                                                        />
                                                    </Grid>

                                                    {/* <Grid item xs={12} sm={12}>
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
                                                    </Grid> */}
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
                                                        boxShadow:
                                                            theme.shadows[2],
                                                        borderRadius: 0.3,
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
                                                                    el.personne
                                                                        .civilite
                                                                }
                                                            </Typography>
                                                            <Typography variant="body2">
                                                                {
                                                                    el.personne
                                                                        .nom
                                                                }
                                                            </Typography>
                                                            <Typography variant="body2">
                                                                {
                                                                    el.personne
                                                                        .prenom
                                                                }
                                                            </Typography>
                                                        </Stack>
                                                    </Grid>
                                                    <Grid item xs={12} sm={7}>
                                                        <Typography
                                                            variant="body2"
                                                            sx={{
                                                                fontWeight: 500,
                                                                color: "#364a63",
                                                            }}
                                                        >
                                                            {el.titre}
                                                        </Typography>
                                                    </Grid>
                                                    <Grid item xs={12} sm={1}>
                                                        <Tooltip title="Supprimer dirigeant">
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
                                                                onClick={() =>
                                                                    remove(
                                                                        index
                                                                    )
                                                                }
                                                            >
                                                                <DeleteOutlineOutlinedIcon />
                                                            </IconButton>
                                                        </Tooltip>
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
                                                    .personne.civilite ||
                                                !dirig[dirig.length - 1]
                                                    .personne.nom ||
                                                !dirig[dirig.length - 1]
                                                    .personne.prenom ||
                                                !dirig[dirig.length - 1].titre
                                            }
                                            variant="outlined"
                                            color="secondary"
                                            onClick={() => {
                                                if (
                                                    dirig[dirig.length - 1]
                                                        .personne.civilite &&
                                                    dirig[dirig.length - 1]
                                                        .personne.nom &&
                                                    dirig[dirig.length - 1]
                                                        .personne.prenom &&
                                                    dirig[dirig.length - 1]
                                                        .titre
                                                ) {
                                                    push({
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
                                                        titre: "",
                                                        date_debut: "",
                                                        date_fin: "",
                                                        // images: [],
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
                        o
                        onSubmit={() => console.log("step 6")}
                        // validationSchema={yup.object({{
                        //     capital: yup
                        //         .string()
                        //         .required()
                        //         .matches(/^[0-9]+$/, "Doit avoir 5 chiffres")
                        //         .min(0, "Doit avoir 5 chiffres"),
                        // }})}
                        // validationSchema={yup.object({
                        //     associes: yup.array().of(
                        //         // nature === "yes"
                        //         // ?
                        //         yup.object({
                        //             nature: yup.string(),
                        //             datebeneficiaire: yup.string(),
                        //             nombenefi: yup.string(),
                        //             prenombenefi: yup.string(),
                        //             datenaissancebenefi: yup.string(),
                        //             paysnaissancebenefi: yup.string(),
                        //             codepostalnaissancebenefi: yup.string(),
                        //             villenaissancebenefi: yup.string(),
                        //             nationalitebenefi: yup.string(),
                        //             paysresidencebenefi: yup.string(),
                        //             dirigAdressebenefi: yup.string(),
                        //             raisonsociale: yup.string(),
                        //             siren: yup.string(),
                        //             adresse: yup.string(),
                        //             pays: yup.string(),
                        //             datecreation: yup.string(),
                        //             detentioncapital: yup.number().required(),
                        //             detentionvote: yup.number().required(),
                        //         })
                        //     ),
                        //     capital: yup
                        //         .number()
                        //         .required()
                        //         .moreThan(
                        //             0,
                        //             "le montant doit etre superieur à 0"
                        //         ),
                        //     // restcapital: yup.number().required(),
                        // })}
                    >
                        <AssociesForm
                            isDirig={isDirig}
                            setisDirig={setisDirig}
                            nature={nature}
                            setNature={setNature}
                            montantCap={montantCap}
                            setMontantCap={setMontantCap}
                            pourcentageCapital={pourcentageCapital}
                            pourcentageVote={pourcentageVote}
                            setpourcentageCapital={setpourcentageCapital}
                            setpourcentageVote={setpourcentageVote}
                        />
                    </FormStep>
                </MultiStepForm>{" "}
                {errorForm && (
                    <Typography variant="subtitle1" color="red">
                        {errorForm}
                    </Typography>
                )}
                {/* {data && <DocSouscripteurs data={data} />} */}
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
