import { Checkbox, FormControlLabel, styled, TextField } from "@mui/material";
import { useField, useFormikContext } from "formik";
import { useEffect, useState } from "react";

const CheckBoxField = ({
    label,
    handleChange,
    customValue,
    setCustomValue,
    callbackSetter,
    ...props
}) => {
    const { setFieldValue } = useFormikContext();
    const [field, meta] = useField(props);
    const { name, value, onBlur, onChange } = field;
    // console.log(name);
    const [checked, setChecked] = useState(value);
    useEffect(() => {
        if (customValue === null || customValue === undefined) return;
        setFieldValue(name, customValue);
        // console.log(customValue);
    }, [customValue]);
    useEffect(() => {
        callbackSetter(value);
    }, [value]);
    const handleChecked = (event) => {
        setChecked(event.target.checked);
    };
    return (
        <FormControlLabel
            label={label}
            control={<Checkbox checked={value} />}
            onBlur={onBlur}
            name={name}
            value={value}
            {...props}
            // error={meta.touched && Boolean(meta.error)}
            // helperText={meta.touched && meta.error}
            // onChange={(e) => {
            //     setChecked(e.currentTarget.checked);
            //     setFieldValue(checked);
            //     console.log(checked, value);
            // console.log(e.currentTarget.checked);
            // setCustomValue &&
            //     customValue &&
            //     setCustomValue(e.currentTarget.checked);
            // if (handleChange) {
            //     handleChange(e);
            // }
            // }}
            // onChange={onChange}
            onChange={(e) => {
                onChange(e);
                setCustomValue &&
                    customValue !== null &&
                    customValue !== undefined &&
                    setCustomValue(e.currentTarget.checked);
                if (handleChange) {
                    handleChange(e);
                }
            }}
            labelPlacement="end"
            // {...field}
        />
    );
};

export default CheckBoxField;
