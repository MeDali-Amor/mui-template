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
            }}
        >
            {hasPrevious && (
                <Button variant="contained" onClick={onBackClick}>
                    Back
                </Button>
            )}
            <Button type="submit" variant="contained">
                {isLastStep ? "Submit" : "Next"}
            </Button>
        </div>
    );
};

export default FormNavigation;
