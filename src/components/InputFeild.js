import { styled, TextField } from "@mui/material";
import { useField, useFormikContext } from "formik";
import { useEffect } from "react";

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

const InputFeild = ({
    label,
    handleChange,
    customValue,
    setCustomValue,
    ...props
}) => {
    const { setFieldValue } = useFormikContext();
    const [field, meta] = useField(props);
    const { name, value, onBlur, onChange } = field;
    // console.log(name);
    useEffect(() => {
        if (customValue === null || customValue === undefined) return;
        setFieldValue(name, customValue);
        console.log(customValue);
    }, [customValue]);
    return (
        <StyledTextField
            label={label}
            onBlur={onBlur}
            name={name}
            value={value}
            // {...field}
            {...props}
            error={meta.touched && Boolean(meta.error)}
            helperText={meta.touched && meta.error}
            onChange={(e) => {
                onChange(e);
                setCustomValue &&
                    customValue &&
                    setCustomValue(e.currentTarget.value);
                if (handleChange) {
                    handleChange(e);
                }
            }}
        />
    );
};

export default InputFeild;
