import {
    alpha,
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

const BaseTextInput = ({
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
                <BootstrapInput
                    align={textAlign}
                    // sx={{ width: width ? `${width}%` : "40%" }}
                    // sx={{ width: "35%" }}
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
            </Box>
            <ErrorMsgDisplayer>
                {meta.touched && Boolean(meta.error) && meta.error}
            </ErrorMsgDisplayer>
        </Box>
    );
};

export default BaseTextInput;
