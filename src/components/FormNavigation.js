import { ArrowBack } from "@mui/icons-material";
import { Button } from "@mui/material";
import React from "react";

const FormNavigation = ({ hasPrevious, onBackClick, isLastStep }) => {
    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column-reverse",
                marginBlock: 24,
                justifyContent: "space-between",
                alignItems: "center",
                rowGap: 16,
            }}
        >
            {hasPrevious && (
                <Button
                    variant="text"
                    onClick={onBackClick}
                    // fullWidth
                    size="large"
                    sx={{
                        width: 120,
                    }}
                    startIcon={<ArrowBack fontSize="small" />}
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
