import { Box, Stack, Typography } from "@mui/material";
import React from "react";

const PageIntro = ({ nom_projet = "", nom = "", prenom = "" }) => {
    return (
        <Box
            sx={{
                width: "90%",
                height: "8%",
                // border: "3px solid black",
                padding: 2,
            }}
        >
            <Stack
                direction={"row"}
                sx={{
                    width: "100%",
                    height: "50%",
                }}
            >
                <Typography
                    sx={{
                        width: "25%",
                        fontSize: 14,
                        fontWeight: "600",
                    }}
                >
                    Projet :
                </Typography>
                <Typography
                    sx={{
                        fontSize: 14,
                        fontWeight: "400",
                        fontStyle: "italic",
                    }}
                >
                    {nom_projet ? nom_projet : ""}
                </Typography>
            </Stack>

            <Stack
                direction={"row"}
                sx={{
                    width: "100%",

                    height: "50%",
                }}
            >
                <Typography
                    sx={{
                        width: "25%",
                        fontSize: 14,
                        fontWeight: "600",
                    }}
                >
                    Porteur de projet :
                </Typography>
                <Typography
                    sx={{
                        fontSize: 14,
                        fontWeight: "400",
                        fontStyle: "italic",
                    }}
                >
                    {prenom ? prenom : ""} {nom ? nom : ""}
                </Typography>
            </Stack>
        </Box>
    );
};

export default PageIntro;
