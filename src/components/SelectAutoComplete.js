import {
    Autocomplete,
    Box,
    styled,
    TextField,
    Typography,
} from "@mui/material";
import { useField, useFormikContext } from "formik";
import { useEffect, useState } from "react";

const StyledTextField = styled(TextField)(({ theme }) => ({
    width: "100%",
    // margin: 20,

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

const SelectAutoComplete = ({
    options = [],
    autoLabel = "",
    label,
    handleChange,
    customValue,
    ...props
}) => {
    const { setFieldValue } = useFormikContext();
    const [field, meta] = useField(props);
    const { name, value, onBlur, onChange } = field;
    const [inputValue, setInputValue] = useState(value);
    // console.log(name, value);
    // useEffect(() => {
    //     if (!customValue) return;
    //     setFieldValue(name, customValue);
    // }, [customValue]);
    return (
        <Autocomplete
            // label={label}
            onBlur={onBlur}
            name={name}
            options={options}
            // {...field}
            // value={value.label || ""}
            inputValue={inputValue ? inputValue : value}
            onInputChange={(e, input) => {
                setInputValue(input);
            }}
            {...props}
            isOptionEqualToValue={(option, value) =>
                // option.label === value.label || ""
                value.label === option.label || ""
            }
            // error={meta.touched && Boolean(meta.error)}
            // helperText={meta.touched && meta.error}
            onChange={(e, value) => {
                if (value) {
                    setFieldValue(name, value.label);
                    setInputValue(value.label);
                    if (handleChange) {
                        handleChange(value);
                    }
                } else {
                    setFieldValue(name, "");
                    setInputValue("");
                    if (handleChange) {
                        handleChange(null);
                    }
                }
            }}
            // autoHighlight
            getOptionLabel={(option) => option.label || ""}
            renderOption={(props, option) => (
                <Box
                    component="li"
                    sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
                    {...props}
                >
                    <Typography variant="subtitle1">{option.label}</Typography>
                    <Typography variant="body1">
                        {" "}
                        &nbsp;&nbsp;-&nbsp;&nbsp;
                    </Typography>
                    <Typography variant="body2" noWrap>
                        {option.code}
                    </Typography>
                </Box>
            )}
            renderInput={(params) => (
                <StyledTextField
                    {...params}
                    label={label}
                    inputProps={{
                        ...params.inputProps,
                        autoComplete: "new-password", // disable autocomplete and autofill
                    }}
                />
            )}
        />
    );
};

export default SelectAutoComplete;
