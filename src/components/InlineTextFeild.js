import {
    alpha,
    FormControl,
    FormHelperText,
    InputBase,
    InputLabel,
    styled,
    TextField,
    Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { useField, useFormikContext } from "formik";
import { useEffect } from "react";

const BootstrapInput = styled(InputBase)(({ theme, align, error }) => ({
    "label + &": {
        // marginTop: theme.spacing(3),
    },

    "& .MuiInputBase-input": {
        textAlign: align ? align : "left",
        borderRadius: 4,
        position: "relative",
        backgroundColor: theme.palette.mode === "light" ? "#fcfcfb" : "#2b2b2b",
        border: "1px solid #ced4da",
        fontSize: 16,
        // width: "60%",
        padding: "10px 12px",
        borderColor: error ? theme.palette.error.main : theme.palette.grey[300],
        boxShadow:
            error && `${alpha(theme.palette.error.main, 0.25)} 0 0 0 0.2rem`,
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
                : `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 0.2rem`,
            borderColor: error
                ? theme.palette.error.main
                : theme.palette.primary.main,
        },
    },
}));
const ErrorMsgDisplayer = styled(FormHelperText)(({ theme }) => ({
    marginLeft: "35%",
    padding: "4px 8px",
    color: theme.palette.error.main,
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
    width: "60%",
    // margin: 20,
    "& .MuiFormControl-root ": {
        display: "flex",
        flexDirection: "row",
    },

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

const InlineTextField = ({
    label,
    handleChange,
    customValue,
    setCustomValue,
    getCurrentValue,
    textAlign,
    width,
    comment,
    labelAlign,
    ...props
}) => {
    const { setFieldValue } = useFormikContext();
    const [field, meta] = useField(props);
    const { name, value, onBlur, onChange } = field;
    // console.log(name);
    useEffect(() => {
        if (customValue === null || customValue === undefined) return;
        setFieldValue(name, customValue);
        // console.log(customValue);
    }, [customValue]);

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
                <InputLabel
                    shrink
                    htmlFor="bootstrap-input"
                    sx={{
                        // padding: "0 20px 0 0",
                        textAlign: labelAlign && labelAlign,
                        fontFamily: "inherit",
                        fontSize: 20,
                        fontWeight: "500",
                        width: "25%",
                        lineHeight: "unset",
                        transformOrigin: "unset",
                        textOverflow: "unset",
                        whiteSpace: "unset",
                        overflow: "unset",
                    }}
                >
                    {label}
                </InputLabel>
                <BootstrapInput
                    align={textAlign}
                    sx={{ width: width ? `${width}%` : "40%" }}
                    // label={label}
                    onBlur={onBlur}
                    name={name}
                    value={value}
                    {...field}
                    {...props}
                    error={meta.touched && Boolean(meta.error)}
                    onChange={(e) => {
                        onChange(e);
                        setCustomValue &&
                            customValue !== null &&
                            customValue !== undefined &&
                            setCustomValue(e.currentTarget.value);
                        if (handleChange) {
                            handleChange(e);
                        }
                    }}
                />
                {/* <Grid item xs={12} sm={4}> */}
                <Typography
                    variant="body2"
                    align="left"
                    sx={{
                        fontStyle: "italic",
                        fontSize: "13px",
                        marginLeft: "10px",
                        width: "35%",
                    }}
                >
                    {comment && `(${comment})`}
                </Typography>
                {/* </Grid> */}
            </Box>
            <ErrorMsgDisplayer>
                {meta.touched && Boolean(meta.error) && meta.error}
            </ErrorMsgDisplayer>
        </Box>
    );
};

export default InlineTextField;
