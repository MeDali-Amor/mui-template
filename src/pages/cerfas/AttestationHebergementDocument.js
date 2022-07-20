import { Button, Paper, Typography, useTheme } from "@mui/material";
import React, { useState } from "react";
import { useRef } from "react";
import { dateFormatterFr } from "../utils/dates";
import { capitalizeString } from "../utils/stringsUtils";
import Pdf from "react-to-pdf";

const HighlitedText = ({ children }) => {
    const theme = useTheme();
    return (
        <Typography
            variant="body1"
            color={theme.palette.primary.main}
            sx={{
                fontWeight: "600",
                fontSize: 16,
                px: 0.8,
                transform: "translateY(2px)",
            }}
        >
            {" "}
            {children}{" "}
        </Typography>
    );
};

const AttestationHebergementDocument = ({ data }) => {
    const printRef = useRef();
    const theme = useTheme();

    // const deepCloneWithStyles = (node) => {
    //     const style = document.defaultView.getComputedStyle(node, null);
    //     const clone = node.cloneNode(false);
    //     if (clone.style && style.cssText) clone.style.cssText = style.cssText;
    //     for (let child of node.childNodes) {
    //         if (child.nodeType === 1)
    //             clone.appendChild(deepCloneWithStyles(child));
    //         else clone.appendChild(child.cloneNode(false));
    //     }
    //     return clone;
    // };

    // const printPdf = () => {
    //     const refsToPrint = [printRef];
    //     const printWindow = window.open("", "", "height=400,width=800");
    //     printWindow.document.write(
    //         "<html><head><title>Page Title</title></head><body id='print-body'>"
    //     );
    //     const body = printWindow.document.getElementById("print-body");
    //     refsToPrint.map((ref) => {
    //         const clone = deepCloneWithStyles(ref.current);
    //         return body.appendChild(clone);
    //     });
    //     printWindow.document.write("</body></html>");
    //     printWindow.document.close();
    //     printWindow.print();
    // };

    return (
        <div>
            <Paper
                ref={printRef}
                elevation={3}
                sx={{
                    paddingTop: 6,
                    paddingBottom: 10,
                    paddingInline: 6,
                    borderRadius: 0.5,
                    border: `0.5px solid ${theme.palette.grey[300]} `,
                }}
            >
                <h2 style={{ textAlign: "center", marginBlock: 32 }}>
                    Attestation d'Hebergement
                </h2>
                <div
                    style={{
                        display: "flex",
                        flexWrap: "wrap",
                        lineHeight: 1.8,
                        padding: 12,
                    }}
                >
                    Je{" "}
                    {data?.Sexe_hebergeant === "feminin"
                        ? "soussignée"
                        : data?.Sexe_hebergeant === "masculin"
                        ? "soussigné"
                        : "soussigné(e)"}
                    <HighlitedText>
                        {data?.prenom
                            ? capitalizeString(data.prenom)
                            : "[Prénom]"}
                    </HighlitedText>
                    <HighlitedText>
                        {data?.nom ? data.nom.toUpperCase() : "[Nom]"}
                    </HighlitedText>
                    ,{" "}
                    {data?.Sexe_hebergeant === "feminin"
                        ? "née"
                        : data?.Sexe_hebergeant === "masculin"
                        ? "né"
                        : "né(e)"}{" "}
                    le
                    <HighlitedText>
                        {data?.DateDeNaissance
                            ? dateFormatterFr(data.DateDeNaissance)
                            : "[Date de naissance]"}
                    </HighlitedText>
                    à
                    <HighlitedText>
                        {data?.LieuDeNaissance
                            ? capitalizeString(data.LieuDeNaissance)
                            : "[Ville de naissance]"}
                    </HighlitedText>
                    , déclare sur l'honneur héberger à mon domicile
                    <HighlitedText>
                        {data?.personneaccueilliePrenom
                            ? capitalizeString(data.personneaccueilliePrenom)
                            : "[Prenom]"}
                    </HighlitedText>
                    <HighlitedText>
                        {" "}
                        {data?.personneaccueillienom
                            ? data.personneaccueillienom.toUpperCase()
                            : "[Nom de l'hébergé]"}
                    </HighlitedText>
                    ,{" "}
                    {data?.Sexe_heberge === "feminin"
                        ? "née "
                        : data?.Sexe_heberge === "masculin"
                        ? "né "
                        : "né(e) "}
                    le
                    <HighlitedText>
                        {data?.personneAccueillieDTN
                            ? dateFormatterFr(data.personneAccueillieDTN)
                            : "[Date de naissance]"}
                    </HighlitedText>
                    à
                    <HighlitedText>
                        {data?.personneaccueillieLieuDeNaissance
                            ? data.personneaccueillieLieuDeNaissance
                            : "[Ville de naissance]"}{" "}
                    </HighlitedText>
                    , depuis le
                    <HighlitedText>
                        {data?.Date_Debut_Hebergement
                            ? dateFormatterFr(data.Date_Debut_Hebergement)
                            : "[Date de début d'hébergement]"}{" "}
                    </HighlitedText>
                    à l'adresse suivante :
                </div>
                <div
                    style={{
                        marginBlock: 12,
                    }}
                >
                    <HighlitedText>
                        {data?.Adresse ? data.Adresse : "[Adresse]"}
                    </HighlitedText>

                    <HighlitedText>
                        {data?.Comp_Adresse && data.Comp_Adresse}
                    </HighlitedText>

                    <div
                        style={{
                            display: "flex",
                            flexWrap: "wrap",
                            marginBlock: 12,
                        }}
                    >
                        <HighlitedText>
                            {data?.CP_Hebergement
                                ? data.CP_Hebergement
                                : "[Code Postal]"}
                        </HighlitedText>

                        <HighlitedText>
                            {data?.Commune
                                ? capitalizeString(data.Commune)
                                : "[Commune]"}
                        </HighlitedText>
                    </div>
                </div>
                <div
                    style={{
                        display: "flex",
                        flexWrap: "wrap",
                        flexDirection: "row-reverse",
                        marginRight: "20%",
                        marginBlock: 32,
                    }}
                >
                    <HighlitedText>
                        {data?.CommuneAttestation
                            ? capitalizeString(data.CommuneAttestation)
                            : "[Commune]"}
                    </HighlitedText>
                    , le
                    <HighlitedText>
                        {data?.DateDuJour
                            ? dateFormatterFr(data.DateDuJour)
                            : " [Date]"}
                    </HighlitedText>
                </div>
                <div
                    style={{
                        fontWeight: "lighter",
                        fontSize: 16,
                        fontStyle: "italic",
                        display: "flex",
                        flexWrap: "wrap",
                        flexDirection: "row-reverse",
                        marginRight: "20%",
                        marginBlock: 32,
                    }}
                >
                    [Signez ici ]
                </div>
                <div
                    style={{
                        fontWeight: "lighter",
                        fontSize: 16,
                        fontStyle: "italic",
                        display: "flex",
                        flexWrap: "wrap",
                        flexDirection: "row-reverse",
                        marginRight: "20%",
                        marginBlock: 32,
                    }}
                >
                    <HighlitedText>
                        {data?.prenom
                            ? capitalizeString(data.prenom)
                            : "[Prénom]"}
                    </HighlitedText>

                    <HighlitedText>
                        {data?.nom ? data.nom.toUpperCase() : "[Nom]"}
                    </HighlitedText>
                </div>
            </Paper>

            <Pdf targetRef={printRef}>
                {({ toPdf }) => (
                    <Button variant="contained" size="large" onClick={toPdf}>
                        Sauvegarder
                    </Button>
                )}
            </Pdf>
        </div>
    );
};

export default AttestationHebergementDocument;
