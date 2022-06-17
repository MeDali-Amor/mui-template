import { Checkbox, FormControlLabel, styled, TextField } from "@mui/material";
import { useField, useFormikContext } from "formik";
import { useEffect } from "react";

const CheckBoxField = ({
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
        <FormControlLabel
            label={label}
            onBlur={onBlur}
            name={name}
            value={value}
            control={<Checkbox />}
            labelPlacement="start"
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

export default CheckBoxField;
