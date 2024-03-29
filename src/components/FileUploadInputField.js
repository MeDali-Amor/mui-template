import {
    Box,
    Chip,
    styled,
    TextField,
    Typography,
    useTheme,
} from "@mui/material";
import { useField, useFormikContext } from "formik";
import { useEffect, useRef, useState } from "react";

const StyledTextField = styled(TextField)(({ theme }) => ({
    width: "100%",
    // margin: 20,

    "& .MuiInputBase-root": {
        backgroundColor: "#fdfdfd",
        opacity: 0,
        height: 50,
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

const FileUploadInputField = ({
    label,
    handleChange,
    customValue,
    ...props
}) => {
    const theme = useTheme();
    const [dragOver, setdragOver] = useState(false);
    const { setFieldValue, resetForm } = useFormikContext();
    const [field, meta] = useField(props);
    const { name, value, onBlur, onChange } = field;
    // console.log(value);
    const fileInput = useRef();
    useEffect(() => {
        if (!customValue) return;
        setFieldValue(name, customValue);
    }, [customValue]);
    const handleDelete = () => {
        // console.log(fileInput.current);
        const currentDiv = fileInput.current;
        const input = currentDiv
            // .getElementsByTagName("div")[0]
            // .getElementById("image");
            .getElementsByTagName("input")[0];
        input.value = "";
        // console.log(input.value);
        setFieldValue(name, meta.initialValue);
        // resetForm(name, "");
    };
    return (
        <Box
            // onDragEnter={() => setdragOver(true)}
            // onDragLeave={() => setdragOver(false)}
            // onDrop={() => setdragOver(false)}
            // ref={dragAndDropRef}

            // onDrop={(event) => {
            //     setFieldValue(name, event.currentTarget.files[0]);
            // }}
            sx={{
                zIndex: 10,
                position: "relative",
                border: dragOver
                    ? `2px dashed ${theme.palette.info.light} `
                    : `2px dashed ${theme.palette.grey[600]}`,
                borderRadius: 0.5,
                backgroundColor: dragOver && "#e6f1ff",
            }}
        >
            {value ? (
                <Chip
                    sx={{
                        // color: theme.palette.grey[600],
                        maxWidth: "80%",
                        position: "absolute",
                        top: "50%",
                        left: 50,
                        transform: "translateY(-50%)",
                        zIndex: 20,
                    }}
                    label={value?.name}
                    color="primary"
                    // variant="con"
                    onDelete={handleDelete}
                />
            ) : (
                <Typography
                    variant="subtitle2"
                    sx={{
                        color: theme.palette.grey[600],
                        position: "absolute",
                        top: "50%",
                        left: 50,
                        transform: "translateY(-50%)",
                    }}
                >
                    Telécharger un document
                    {/* pour selectioner votre fichier ou Glisser-les dans
                cette zone. */}
                </Typography>
            )}
            <StyledTextField
                type="file"
                ref={fileInput}
                // id="file-input"
                // label={label}
                onBlur={onBlur}
                name={name}
                // value={value}
                // {...field}
                {...props}
                error={meta.touched && Boolean(meta.error)}
                helperText={meta.touched && meta.error}
                onChange={(event) => {
                    // const newFile = event.currentTarget.files[0];
                    // if (
                    //     newFile.type !== "image/jpeg" &&
                    //     newFile.type !== "image/png"
                    // ) {
                    //     meta.error = "La format d'image n'est pas valide!";
                    // }
                    // resetForm(name, meta.initialValue);
                    // console.log(event.currentTarget.files);
                    // console.log();
                    setFieldValue(name, event.currentTarget.files[0]);
                }}
            />
        </Box>
    );
};

export default FileUploadInputField;
