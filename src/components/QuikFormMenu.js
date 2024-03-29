import { Box, useTheme, alpha } from "@mui/system";
import React from "react";
import { Link } from "react-router-dom";

const QuikFormMenu = () => {
    const theme = useTheme();
    return (
        <div style={{ position: "relative" }}>
            <Box
                // position={"sticky"}
                sx={{
                    position: "fixed",
                    top: 100,
                    right: 50,
                    width: 250,
                    maxHeight: "100%",
                    borderRadius: 1,
                    padding: 1,
                    background: theme.palette.grey[200],
                    // background: "#EDEDE9",
                    "& ul": {
                        margin: 0,
                        padding: 0,
                        listStyle: "none",
                        "& li": {
                            padding: 1,
                            marginBlock: 0.5,
                            borderRadius: 0.5,
                            "&:hover": {
                                backgroundColor: alpha(
                                    theme.palette.primary.light,
                                    0.1
                                ),
                            },
                            "& a": {
                                fontSize: 14,
                                fontWeight: 600,
                                color: theme.palette.primary.main,
                                textDecoration: "none",
                                "& :active": {
                                    color: theme.palette.primary.dark,
                                },
                            },
                        },
                    },
                }}
            >
                <ul>
                    <li>
                        <a href="#identification">Identification</a>
                    </li>
                    <li>
                        <a href="#besoin_demarage">Besoin de demarage</a>
                    </li>

                    <li>
                        <a href="#financement_besoin_demarage">
                            {" "}
                            Financement des besoins de démarrage
                        </a>
                    </li>
                    <li>
                        <a href="#charges_fixes">Charges fixes</a>
                    </li>
                    <li>
                        <a href="#chiffre_affaire_an1">
                            Chiffre d'affraires 1ere année
                        </a>
                    </li>
                    <li>
                        <a href="#charges-variable">Charges variables</a>
                    </li>
                    <li>
                        <a href="#besoin-fonds-roulement">
                            Besoin en fonds de roulement
                        </a>
                    </li>
                    <li>
                        <a href="#salaires">Salaires et rémunération</a>
                    </li>
                    <li>
                        <a href="#rentabilite">
                            Contrôle de seuil de rentabilité
                        </a>
                    </li>
                    <li>
                        <a href="#niveau_tresorie">
                            Contrôle du niveau de trésorerie de départ
                        </a>
                    </li>
                </ul>
            </Box>
        </div>
    );
};

export default QuikFormMenu;
