import {
    alpha,
    FormControl,
    FormHelperText,
    Grid,
    InputBase,
    InputLabel,
    MenuItem,
    NativeSelect,
    Select,
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

const InlineSelectField = ({
    label,
    handleChange,
    customValue,
    options = [],
    textAlign,
    width,
    comment,
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
            >
                <Grid
                    item
                    xs={5}
                    sx={{ backgroundColor: "yellow", margin: 0, padding: 0 }}
                > */}
                <InputLabel
                    // shrink
                    htmlFor="bootstrap-input"
                    sx={{
                        marginRight: 1,
                        fontFamily: "inherit",
                        fontSize: 16,
                        fontWeight: "500",
                        // backgroundColor: "red",
                        width: "40%",
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
                {/* <Grid item xs={4}> */}
                <NativeSelect
                    onBlur={onBlur}
                    name={name}
                    value={value}
                    // sx={{ width: "100%", backgroundColor: "blue" }}
                    align={textAlign}
                    sx={{
                        width: width ? `${width}%` : "35%",
                        overflowX: "hidden",
                        textOverflow: "elipsis",
                        // backgroundColor: "red",
                    }}
                    // {...field}
                    {...props}
                    // error={meta.touched && Boolean(meta.error)}
                    onChange={(e) => {
                        onChange(e);
                        if (handleChange) {
                            handleChange(e);
                        }
                    }}
                    input={<BootstrapInput />}
                >
                    {/* <option aria-label="None" value="" /> */}
                    {options?.map((opt) => (
                        <option
                            value={opt}
                            key={opt}
                            style={{
                                textOverflow: "elipsis",
                                // overflowX: "scroll",
                                // backgroundColor: "red",
                                // width: "50%",
                            }}
                        >
                            {opt}
                        </option>
                    ))}
                </NativeSelect>
                {/* </Grid> */}
                {/* <Grid item xs={3}> */}
                <Typography
                    variant="body2"
                    align="left"
                    sx={{
                        fontStyle: "italic",
                        fontSize: "13px",
                        marginLeft: "10px",
                        width: "25%",
                    }}
                >
                    {comment && `(${comment})`}
                </Typography>
                {/* </Grid> */}
                {/* </Grid> */}
            </Box>
            <ErrorMsgDisplayer>
                {meta.touched && Boolean(meta.error) && meta.error}
            </ErrorMsgDisplayer>
        </Box>
    );
};

export default InlineSelectField;
