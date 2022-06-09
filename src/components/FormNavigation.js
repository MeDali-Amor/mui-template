import { ArrowBack } from "@mui/icons-material";
import LoadingButton from "@mui/lab/LoadingButton";
import { Button } from "@mui/material";
import React from "react";

const FormNavigation = ({ hasPrevious, onBackClick, isLastStep, loading }) => {
    return (
        <div
            style={{
                display: "flex",
                flexDirection: "row",
                marginBlock: 42,
                // marginInline: isLastStep ? 10 : hasPrevious ? "10%" : 20,
                marginInline: 10,
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
                        width: 160,
                    }}
                    startIcon={<ArrowBack fontSize="small" />}
                >
                    Retour
                </Button>
            )}
            {isLastStep ? (
                <LoadingButton
                    sx={{
                        width: hasPrevious ? 160 : "100%",
                    }}
                    loading={loading}
                    variant="contained"
                    type="submit"
                    // fullWidth
                    size="large"
                >
                    Continuer
                </LoadingButton>
            ) : (
                <Button
                    sx={{
                        width: hasPrevious ? 150 : "100%",
                    }}
                    type="submit"
                    variant="contained"
                    // fullWidth={hasPrevious ? false : true}
                    size="large"
                >
                    Suivant
                </Button>
            )}
        </div>
    );
};

export default FormNavigation;
