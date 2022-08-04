import { Box, Grid, Typography } from "@mui/material";
import React, { useState } from "react";
import PagePdf0 from "../previsionnel/pdfFiles/PagePdf0";
import AttestationHebergementDocument from "./AttestationHebergementDocument";
import HebergementForm from "./HebergementForm";

const AttestationHebergement = () => {
    const [data, setData] = useState({
        prenom: "",
        nom: "",
        Sexe_hebergeant: "",
        DateDeNaissance: "",
        LieuDeNaissance: "",
        personneaccueilliePrenom: "",
        personneaccueillienom: "",
        Sexe_heberge: "",
        personneAccueillieDTN: "",
        personneaccueillieLieuDeNaissance: "",
        Date_Debut_Hebergement: "",
        Adresse: "",
        Comp_Adresse: "",
        CP_Hebergement: "",
        Commune: "",
        DateDuJour: "",
        CommuneAttestation: "",
    });
    return (
        // <Box
        //     sx={{
        //         minHeight: "calc(100vh - 170px)",
        //         height: "100%",
        //         // maxWidth: 900,
        //         margin: "auto",
        //         py: 2,
        //         px: 8,
        //         // display: "flex",
        //         // flexDirection: "column",
        //         // justifyContent: "center",
        //         // alignItems: "center",
        //     }}
        // >
        //     <h1>Attestation Hebergement</h1>

        //     <Grid
        //         rowSpacing={5}
        //         columnSpacing={3}
        //         container
        //         sx={{ py: 2, px: 2 }}
        //     >
        //         <Grid item md={12} lg={6}>
        //             <HebergementForm setData={setData} data={data} />
        //         </Grid>
        //         <Grid item md={12} lg={6}>

        <>
            <PagePdf0 />
        </>
        //         </Grid>
        //     </Grid>
        // </Box>
    );
};

export default AttestationHebergement;
