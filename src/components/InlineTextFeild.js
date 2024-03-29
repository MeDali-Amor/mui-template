import {
    alpha,
    FormControl,
    FormHelperText,
    Grid,
    InputBase,
    InputLabel,
    styled,
    TextField,
    Typography,
} from "@mui/material";
import { useFormContext } from "react-hook-form";

// import debounce from "lodash.debounce";
import { Box } from "@mui/system";
// import { FastField, useField, useFormikContext } from "formik";
import { useEffect } from "react";
import { useState } from "react";
// import { useDebounce } from "../hooks/debounceHook";

const BootstrapInput = styled(InputBase)(
    ({ theme, align, error, readOnly }) => ({
        "label + &": {
            // marginTop: theme.spacing(3),
        },

        "& .MuiInputBase-input": {
            textAlign: align ? align : "left",
            borderRadius: 4,
            position: "relative",

            backgroundColor: !readOnly
                ? "#fcfcfb"
                : `${alpha(theme.palette.primary.light, 0.15)}`,
            border: "1px solid #ced4da",
            fontSize: 16,
            // width: "60%",
            padding: "10px 12px",
            borderColor: error
                ? theme.palette.error.main
                : theme.palette.grey[300],
            boxShadow:
                error &&
                `${alpha(theme.palette.error.main, 0.25)} 0 0 0 0.2rem`,
            transition: theme.transitions.create([
                "border-color",
                "background-color",
                "box-shadow",
            ]),
            // Use the system font instead of the default Roboto font.
            // fontFamily: [
            //     "-apple-system",
            //     "BlinkMacSystemFont",
            //     '"Segoe UI"',
            //     "Roboto",
            //     '"Helvetica Neue"',
            //     "Arial",
            //     "sans-serif",
            //     '"Apple Color Emoji"',
            //     '"Segoe UI Emoji"',
            //     '"Segoe UI Symbol"',
            // ].join(","),
            "&:focus": {
                boxShadow: error
                    ? `${alpha(theme.palette.error.main, 0.25)} 0 0 0 0.2rem`
                    : readOnly
                    ? "none"
                    : `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 0.2rem`,
                borderColor: error
                    ? theme.palette.error.main
                    : readOnly
                    ? "none"
                    : theme.palette.primary.main,
            },
        },
    })
);
const ErrorMsgDisplayer = styled(FormHelperText)(({ theme }) => ({
    marginLeft: "35%",
    padding: "4px 8px",
    color: theme.palette.error.main,
}));

const InlineTextField = ({
    // setValue,
    // register,
    name,
    label,
    handleChange,
    customValue,
    setCustomValue,
    getCurrentValue,
    textAlign,
    width,
    comment,
    labelAlign,
    readOnly,
    ...props
}) => {
    const [input, setInput] = useState("");
    const [start, setStart] = useState(0);
    // const { setFieldValue } = useFormikContext();
    // const [field, meta] = useField(props);
    // const { name, value, onBlur, onChange } = field;
    // console.log(name);
    // const changeHandler = (e) => {
    //     onChange(e);
    //     setCustomValue &&
    //         customValue !== null &&
    //         customValue !== undefined &&
    //         setCustomValue(e.currentTarget.value);
    //     if (handleChange) {
    //         handleChange(e);
    //     }
    // };
    const { register, setValue } = useFormContext();
    useEffect(() => {
        if (customValue === null || customValue === undefined) return;
        // console.log(customValue);
        setValue(name, customValue);
        // console.log(customValue);
    }, [name, customValue, setValue]);
    // useDebounce(changeHandler, 500);

    return (
        <Box>
            <Box
                // variant="standard"
                sx={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    width: "100%",
                    // backgroundColor: "red",
                }}
            >
                {/* <Grid
                container
                rowSpacing={3}
                columnSpacing={0}
                alignItems={"center"}
                // sx={{ pb: 5 }}
                sx={{
                    // display: "flex",
                    // flexDirection: "row",
                    // alignItems: "center",
                    width: "100%",
                    // backgroundColor: "red",
                }}
            > */}
                {/* <Grid item xs={5}> */}
                <InputLabel
                    // shrink
                    htmlFor="bootstrap-input"
                    sx={{
                        // padding: "0 20px 0 0",
                        // backgroundColor: "red",

                        marginRight: 1,
                        paddingRight: labelAlign && 1,
                        textAlign: labelAlign && labelAlign,
                        fontFamily: "inherit",
                        fontSize: 16,
                        fontWeight: "500",
                        width: "30%",
                        lineHeight: "unset",
                        transformOrigin: "unset",
                        textOverflow: "unset",
                        whiteSpace: "unset",
                        overflow: "unset",
                    }}
                >
                    {label}
                </InputLabel>
                {/* </Grid> */}
                {/* <Grid item xs={width ? 2 : 4}> */}
                {/* <FastField name={name}>
                    {({ field, meta }) => ( */}

                <BootstrapInput
                    {...register(name)}
                    readOnly={readOnly}
                    align={textAlign}
                    sx={{ width: width ? `${width}%` : "40%" }}
                    // onChange={(e) => {
                    //     // setStart(e.target.selectionStart);
                    //     let val = e.target.value;
                    //     val = val.replace(/([^0-9.]+)/, "");
                    //     val = val.replace(/^(0|\.)/, "");
                    //     const match = /(\d{0,7})[^.]*((?:\.\d{0,2})?)/g.exec(
                    //         val
                    //     );
                    //     const value = match[1] + match[2];
                    //     e.target.value = value;
                    //     setInput(value);
                    //     if (val.length > 0) {
                    //         e.target.value = Number(value).toFixed(2);
                    //         e.target.setSelectionRange(start, start);
                    //         setInput(Number(value).toFixed(2));
                    //     }
                    // }}
                    // sx={{ width: "35%" }}
                    // label={label}
                    // onBlur={onBlur}
                    // name={name}
                    // value={value}
                    // {...field}
                    // {...props}
                    // error={meta.touched && Boolean(meta.error)}
                    // onBlur={(e) => {
                    //     let targetValue = e.target.value
                    //         .toString()
                    //         .split(" ")
                    //         .join("");
                    //     let value = new Intl.NumberFormat(
                    //         "fr-FR"
                    //         //     {
                    //         //     style: "currency",
                    //         //     // currency: "EUR",
                    //         // }
                    //     ).format(Number(targetValue));
                    //     setValue(name, value);
                    //     // console.log(targetValue, value);
                    // }}
                />
                {/* <button
                    type="button"
                    onClick={() => {
                        setValue(name, "dali");
                    }}
                >
                    set
                </button> */}
                {/* )}
                </FastField> */}

                {/* </Grid> */}
                {/* <Grid item xs={3}> */}
                <Typography
                    variant="body2"
                    align="left"
                    sx={{
                        fontStyle: "italic",
                        fontSize: "13px",
                        marginLeft: "10px",
                        width: width ? `${60 - Number(width)}%` : "30%",
                        // width: "45%",
                    }}
                >
                    {comment && `(${comment})`}
                </Typography>
                {/* </Grid> */}
                {/* </Grid> */}
            </Box>
            <ErrorMsgDisplayer>
                {/* {meta.touched && Boolean(meta.error) && meta.error} */}
            </ErrorMsgDisplayer>
        </Box>
    );
};

export default InlineTextField;
