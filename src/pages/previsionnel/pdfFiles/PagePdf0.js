import { Box, Typography } from "@mui/material";
import React from "react";

const PagePdf0 = ({ data }) => {
    return (
        <Box
            sx={{
                width: "21cm",
                height: "29cm",
                border: "1px solid black",
                padding: "1.5cm 1cm",
                position: "relative",
            }}
        >
            <Box
                sx={{
                    width: "100%",
                    height: "16%",
                    border: "3px solid black",
                    padding: 2,
                }}
            >
                <Box sx={{ marginLeft: "45%" }}>
                    <Typography sx={{ fontSize: 14, fontWeight: "500" }}>
                        Conseil
                    </Typography>
                    <Typography sx={{ fontSize: 14, fontWeight: "500" }}>
                        Accompagnement
                    </Typography>
                    <Typography sx={{ fontSize: 14, fontWeight: "500" }}>
                        Marketing digitale
                    </Typography>
                </Box>
                <Typography
                    sx={{
                        marginBlock: 1,
                        textAlign: "center",
                        fontSize: 24,
                        fontWeight: "700",
                        fontStyle: "italic",
                    }}
                >
                    Création d'entreprise
                </Typography>
            </Box>
            <Box
                sx={{
                    width: "100%",
                    height: "55%",
                    border: "3px solid black",
                    paddingBlock: 8,
                    paddingInline: 8,
                    marginBlock: 8,
                }}
            >
                <Typography
                    sx={{
                        fontSize: 42,
                        fontWeight: "700",
                        textAlign: "center",
                        marginBottom: 4,
                        height: "30%",
                    }}
                >
                    Etude financière prévisionnelle sur 3 ans
                </Typography>
                <Typography
                    sx={{
                        fontSize: 20,
                        fontWeight: "600",
                        textAlign: "center",
                        height: "10%",

                        // marginBottom: 12,
                        // color: "#D1512D",
                        textTransform: "capitalize",
                        marginBottom: 4,
                    }}
                >
                    {data?.prenom || ""} {data?.nom || ""}
                </Typography>
                <Typography
                    sx={{
                        fontSize: 28,
                        fontWeight: "600",
                        textAlign: "center",
                        height: "30%",

                        // marginBottom: 12,
                        color: "#D1512D",
                        textTransform: "uppercase",
                        marginBottom: 4,
                        paddingBlock: 4,
                    }}
                >
                    {data?.nom_projet || ""}
                </Typography>
                <Typography
                    sx={{
                        fontSize: 20,
                        fontWeight: "600",
                        textAlign: "center",
                        fontStyle: "italic",
                        height: "10%",

                        // marginBottom: 12,
                        // color: "#D1512D",
                        // textTransform: "capitalize",
                        marginBottom: 4,
                    }}
                >
                    {data?.form_juridique || ""}
                </Typography>
            </Box>
            <Box
                sx={{
                    width: "100%",
                    height: "16%",
                    border: "3px solid black",
                    padding: 2,
                    textAlign: "center",
                }}
            >
                <Typography sx={{ height: "20%", fontSize: 14 }}>
                    {data?.num_telephone || ""}
                </Typography>
                <Typography sx={{ height: "20%", fontSize: 14 }}>
                    {data?.email || ""}
                </Typography>
                <Typography
                    sx={{
                        height: "20%",
                        fontSize: 14,
                        textTransform: "uppercase",
                    }}
                >
                    {data?.code_postal || ""} {data?.commune || ""}
                </Typography>
                <Typography
                    sx={{
                        height: "30%",
                        fontSize: 14,
                        fontWeight: 600,
                        marginTop: 3,
                    }}
                >
                    2/8/2022
                </Typography>
            </Box>
            <Box sx={{ position: "absolute", bottom: "1.25%", right: "5%" }}>
                1
            </Box>
        </Box>
    );
};

export default PagePdf0;
