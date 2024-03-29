import {
    alpha,
    Box,
    FormHelperText,
    InputLabel,
    styled,
    TextField,
    Typography,
} from "@mui/material";
// import { useField, useFormikContext } from "formik";
import MuiPhoneNumber from "material-ui-phone-number";
import React, { useEffect } from "react";
import { useFormContext } from "react-hook-form";

// import IntlTelInput from "react-intl-tel-input";
// import "react-intl-tel-input/dist/main.css";
import "./telInput.css";

const BootstrapInput = styled(MuiPhoneNumber)(
    ({ theme, align, error, focused }) => ({
        "& .MuiOutlinedInput-root": {
            // textAlign: align ? align : "left",
            borderRadius: 4,
            outline: "none",
            position: "relative",
            backgroundColor:
                theme.palette.mode === "light" ? "#fcfcfb" : "#2b2b2b",
            border: "1px solid #ced4da",
            fontSize: 16,
            width: "100%",
            height: "50px",
            padding: "10px 12px",

            fieldset: {
                border: "none",
                // backgroundColor: "red",
                // height: "30px",
                // borderColor: error ? theme.palette.error.main : "#ced4da",
            },
            // "& input:focus": {
            input: {
                height: "50%",
            },
            transition: theme.transitions.create([
                "border-color",
                "background-color",
                "box-shadow",
            ]),
            boxShadow:
                focused &&
                `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 0.2rem`,
            borderColor: focused && theme.palette.primary.main,
            // },
        },
    })
);

const ErrorMsgDisplayer = styled(FormHelperText)(({ theme }) => ({
    marginLeft: "35%",
    padding: "4px 8px",
    color: theme.palette.error.main,
}));

const InterPhoneInput = ({
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
    ...props
}) => {
    // const { setFieldValue } = useFormikContext();
    // const [field, meta] = useField(props);
    // const { name, value, onBlur, onChange } = field;*

    // console.log(name);
    const { register, setValue } = useFormContext();
    useEffect(() => {
        if (customValue === null || customValue === undefined) return;
        // console.log(customValue);
        setValue(name, customValue);
        // console.log(customValue);
    }, [name, customValue, setValue]);
    return (
        <Box>
            <Box
                // variant="standard"
                sx={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    // width: "100%",
                }}
            >
                <Box sx={{ width: "54%" }}>
                    <InputLabel
                        // shrink
                        htmlFor="bootstrap-input"
                        sx={{
                            marginRight: 1,
                            fontFamily: "inherit",
                            fontSize: 16,
                            fontWeight: "500",

                            lineHeight: "unset",
                            transformOrigin: "unset",
                            textOverflow: "unset",
                            whiteSpace: "unset",
                            overflow: "unset",
                        }}
                    >
                        {label}
                    </InputLabel>
                </Box>
                <Box
                    sx={{
                        width: width ? `${width}%` : "60%",
                        // backgroundColor: "yellow",
                    }}
                >
                    <BootstrapInput
                        variant="outlined"
                        defaultCountry="fr"
                        fullWidth
                        // name={name}
                        // // value={value}
                        // {...field}
                        {...props}
                        // error={meta.touched && Boolean(meta.error)}
                        // onChange={(e) => {
                        //     onChange(e);
                        //     setCustomValue &&
                        //         customValue !== null &&
                        //         customValue !== undefined &&
                        //         setCustomValue(e.currentTarget.value);
                        //     if (handleChange) {
                        //         handleChange(e);
                        //     }
                        // }}
                        onChange={(v) => {
                            // console.log(name, v);
                            setValue(name, v);
                            // console.log(v);
                        }}
                    />
                    {/* <IntlTelInput
                        preferredCountries={["fr"]}
                        onPhoneNumberChange={(value, countryData, number, id) =>
                            console.log(value, countryData, number, id)
                        }
                        // onPhoneNumberBlur={onBlur}
                        // align={textAlign}
                        // sx={{ width: width ? `${width}%` : "40%" }}
                        // sx={{ width: "35%" }}
                        // label={label}
                        // onBlur={onBlur}
                        name={name}
                        // value={value}
                        // {...field}
                        // {...props}
                        error={meta.touched && Boolean(meta.error)}
                        // onChange={(e) => {
                        //     onChange(e);
                        //     setCustomValue &&
                        //         customValue !== null &&
                        //         customValue !== undefined &&
                        //         setCustomValue(e.currentTarget.value);
                        //     if (handleChange) {
                        //         handleChange(e);
                        //     }
                        // }}
                    /> */}
                </Box>
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
                />
                {/* </Grid> */}
                {/* <Grid item xs={3}> */}
                <Typography
                    variant="body2"
                    align="left"
                    sx={{
                        fontStyle: "italic",
                        fontSize: "13px",
                        marginLeft: "10px",
                        width: "30%",
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

export default InterPhoneInput;
