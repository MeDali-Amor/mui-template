import {
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    styled,
    TextField,
} from "@mui/material";
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

const SelectFeild = ({
    label,
    handleChange,
    customValue,
    options = [],
    ...props
}) => {
    const { setFieldValue } = useFormikContext();
    const [field, meta] = useField(props);
    const { name, value, onBlur, onChange } = field;
    // console.log(name);
    useEffect(() => {
        if (!customValue) return;
        setFieldValue(name, customValue);
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
                if (handleChange) {
                    handleChange(e);
                }
            }}
        >
            {/* <MenuItem value=""></MenuItem> */}
            {options?.map((opt) => (
                <MenuItem value={opt} key={opt}>
                    {opt}
                </MenuItem>
            ))}
        </StyledTextField>
    );
};

export default SelectFeild;
