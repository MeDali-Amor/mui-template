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

    const [sign, setSign] = useState(window.innerWidth);

    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [alertType, setAlertType] = useState("info");
    const [msg, setMsg] = useState("");
    const [errorForm, setErrorForm] = useState("");

    const [isDirig, setisDirig] = useState("no");
    const [isPerson, setIsPerson] = useState("yes");
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
        // console.log(values);
        setErrorForm("");
        let capArray = values.beneficiaires.map((el) =>
            Number(el.detentioncapital)
        );
        let capitalTotal = capArray.reduce(
            (previousValue, currentValue) => previousValue + currentValue
        );
        if (Number(capitalTotal) !== 100) {
            setErrorForm(
                "La repartition de capital doit etre egale à 100% entre touts les associés!"
            );
            // console.log(capitalTotal, capArray);
        } else if (Number(capitalTotal) === 100) {
            setErrorForm("");
            let associes = values.beneficiaires?.map((el) => {
                if (el.person === "yes")
                    return {
                        type: "personne physique",
                        datebeneficiaire: el.datebeneficiaire,
                        nombenefi: el.nombenefi || "",
                        prenombenefi: el.prenombenefi || "",
                        datenaissancebenefi: el.datenaissancebenefi || "",
                        paysnaissancebenefi: el.paysnaissancebenefi || "",
                        codepostalnaissancebenefi:
                            el.codepostalnaissancebenefi || "",
                        villenaissancebenefi: el.villenaissancebenefi || "",
                        nationalitebenefi: el.nationalitebenefi || "",
                        paysresidencebenefi: el.paysresidencebenefi || "",
                        dirigAdressebenefi: el.dirigAdressebenefi || "",
                        detentioncapital: el.detentioncapital || "",
                        detentionvote: el.detentionvote || "",
                    };
                else if (el.person === "no")
                    return {
                        type: "personne morale",
                        raisonsociale: el.raisonsociale || "",
                        siren: el.siren || "",
                        adresse: el.adresse || "",
                        pays: el.pays || "",
                        datebeneficiaire: el.datebeneficiaire || "",
                        datecreation: el.datecreation || "",
                        detentioncapital: el.detentioncapital || "",
                        detentionvote: el.detentionvote || "",
                    };
                else return { ...el, person: el.person };
            });
            values.beneficiaires = associes;
            console.log(values.beneficiaires);
        } else setErrorForm("une erreur s'est produite veuillez réessayer");
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
        // }
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
                        // restcapital: 100,
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
                                person: "yes",
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
                                detentioncapital: pourcentageCapital,
                                detentionvote: pourcentageVote,
                                raisonsociale: "",
                                siren: "",
                                adresse: "",
                                pays: "",
                                datecreation: "",
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
                                                    <Grid item xs={12} sm={7}>
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
                        o
                        onSubmit={() => console.log("step 6")}
                        // validationSchema={yup.object({{
                        //     capital: yup
                        //         .string()
                        //         .required()
                        //         .matches(/^[0-9]+$/, "Doit avoir 5 chiffres")
                        //         .min(0, "Doit avoir 5 chiffres"),
                        // }})}
                        validationSchema={yup.object({
                            beneficiaires: yup.array().of(
                                // isPerson === "yes"
                                // ?
                                yup.object({
                                    person: yup.string(),
                                    datebeneficiaire: yup.string(),
                                    nombenefi: yup.string(),
                                    prenombenefi: yup.string(),
                                    datenaissancebenefi: yup.string(),
                                    paysnaissancebenefi: yup.string(),
                                    codepostalnaissancebenefi: yup.string(),
                                    villenaissancebenefi: yup.string(),
                                    nationalitebenefi: yup.string(),
                                    paysresidencebenefi: yup.string(),
                                    dirigAdressebenefi: yup.string(),
                                    raisonsociale: yup.string(),
                                    siren: yup.string(),
                                    adresse: yup.string(),
                                    pays: yup.string(),
                                    datecreation: yup.string(),
                                    detentioncapital: yup.number().required(),
                                    detentionvote: yup.number().required(),
                                })
                            ),
                            capital: yup
                                .number()
                                .required()
                                .moreThan(
                                    0,
                                    "le montant doit etre superieur à 0"
                                ),
                            // restcapital: yup.number().required(),
                        })}
                    >
                        <AssociesForm
                            isDirig={isDirig}
                            setisDirig={setisDirig}
                            isPerson={isPerson}
                            setIsPerson={setIsPerson}
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
