import { ArrowBack } from "@mui/icons-material";
import LoadingButton from "@mui/lab/LoadingButton";
import { Button } from "@mui/material";
import React from "react";

const FormNavigation = ({ hasPrevious, onBackClick, isLastStep, loading }) => {
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
                    color="info"
                    size="large"
                    sx={{
                        width: 120,
                    }}
                    startIcon={<ArrowBack fontSize="small" />}
                >
                    Retour
                </Button>
            )}
            {isLastStep ? (
                <LoadingButton
                    loading={loading}
                    variant="contained"
                    type="submit"
                    fullWidth
                    size="large"
                >
                    Continuer
                </LoadingButton>
            ) : (
                <Button
                    type="submit"
                    variant="contained"
                    fullWidth
                    size="large"
                >
                    Suivant
                </Button>
            )}
        </div>
    );
};

export default FormNavigation;
