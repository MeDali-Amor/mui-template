import { Image } from "@mui/icons-material";
import { Input, Stack, styled, TextField, Typography } from "@mui/material";
import { Box, fontWeight } from "@mui/system";
import React, { useState } from "react";

const UploadContainer = styled(Box)(({ theme }) => ({
    my: 20,
    // height: 50,
    backgroundColor: "#FFF",
    borderRadius: 8,
    boxShadow: theme.shadows[4],
}));
const FileUploadArea = styled(Box)(({ theme }) => ({
    display: "flex",
    gap: 30,
}));
const DragAndDropArea = styled(Box)(({ theme }) => ({
    position: "relative",
    width: 450,
    height: 250,
    border: "2px dashed #d0dce7",
    borderRadius: 8,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
    "&:hover": {
        backgroundColor: "#e6f1ff",
        border: "2px dashed #7ab7ff",
    },
    zIndex: 10,
}));
const DragAndDropLogo = styled(Box)(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    textAlighn: "center",
    color: theme.palette.grey[400],
    fontWeight: 600,
    padding: 10,
    zIndex: 0,
}));
const FileUploadInput = styled(Input)(({ theme }) => ({
    opacity: 0,
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    cursor: "pointer",
}));

const FileUploadDropZone = () => {
    const [fileList, setFileList] = useState(null);
    const [error, setError] = useState("");
    const [dragOver, setDragOver] = useState(false);

    const onFileChange = (e) => {
        const newFile = e.target.files[0];
        // if (!newFile) return setError("Image n'existe pas");
        if (newFile.type !== "image/jpeg" && newFile.type !== "image/png") {
            setError("La format d'image n'est pas valide!");
            setFileList(null);
        }
        // const updatedFileList = [...fileList, newFile];
        else {
            setFileList(newFile);
            setError("");
            console.log(newFile);
            // console.log(newFile);
        }
    };

    return (
        <UploadContainer>
            <FileUploadArea>
                <DragAndDropArea
                    sx={{
                        backgroundColor: dragOver && "#e6f1ff",
                        border: dragOver && "2px dashed #7ab7ff",
                    }}
                    onDragEnter={() => setDragOver(true)}
                    onDragLeave={() => setDragOver(false)}
                    onDrop={() => setDragOver(false)}
                >
                    <DragAndDropLogo>
                        <img
                            src="static/images/cloud-upload-regular-240.png"
                            width={120}
                        />
                        <Stack direction="row">
                            <Typography variant="subtitle1" color={"#305f8e"}>
                                Drag &#38; Drop your images here, or
                            </Typography>
                            {"  "}
                            <Typography variant="subtitle1" color={"#3e97ff"}>
                                browse
                            </Typography>
                        </Stack>
                    </DragAndDropLogo>
                    <FileUploadInput
                        name="files"
                        type="file"
                        id="fileInput"
                        onChange={onFileChange}
                    />
                </DragAndDropArea>
            </FileUploadArea>
        </UploadContainer>
    );
};

export default FileUploadDropZone;
