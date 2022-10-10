import { Typography } from "@mui/material";
import React from "react";

const Step0 = () => {
    return (
        <>
            <Typography
                component="h1"
                variant="h4"
                align="center"
                sx={{
                    marginTop: 4,
                    marginBottom: 2,
                }}
            >
                Vous souhaitez ajouter une societé?
            </Typography>

            <Typography
                variant="body1"
                align="center"
                sx={{
                    marginBottom: 6,
                }}
            >
                Pour vous accompagner au mieux dans l'ajout de votre societé
                suivez les etapes suivantes!
            </Typography>
        </>
    );
};

export default Step0;
