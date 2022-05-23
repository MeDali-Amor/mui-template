import { Button } from "@mui/material";
import React from "react";

const FormNavigation = ({ hasPrevious, onBackClick, isLastStep }) => {
    return (
        <div
            style={{
                display: "flex",
                marginBlock: 40,
                justifyContent: "space-between",
                alignItems: "center",
                columnGap: 16,
            }}
        >
            {hasPrevious && (
                <Button
                    variant="contained"
                    onClick={onBackClick}
                    fullWidth
                    size="large"
                >
                    Retour
                </Button>
            )}
            <Button type="submit" variant="contained" fullWidth size="large">
                {isLastStep ? "Continuer" : "Suivant"}
            </Button>
        </div>
    );
};

export default FormNavigation;
