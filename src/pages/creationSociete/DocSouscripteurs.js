import {
    Box,
    Stack,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Typography,
} from "@mui/material";
import React from "react";
import A4SectionHeader from "../previsionnel/pdfFiles/components/A4SectionHeader";
import TableHeader4 from "../previsionnel/pdfFiles/components/TableHeader4";
import TableHeader7 from "../previsionnel/pdfFiles/components/TableHeader7";
import TableRow4 from "../previsionnel/pdfFiles/components/TableRow4";
import TableRow7 from "../previsionnel/pdfFiles/components/TableRow7";
import { getCurrentDate } from "../utils/dates";

const DocSouscripteurs = ({ data }) => {
    console.log(data);
    return (
        <Box
            sx={{
                width: "21cm",
                height: "29cm",
                border: "1px solid black",
                padding: "1.2cm 1cm",
                position: "relative",
            }}
        >
            {/* <A4SectionHeader title={data?.deno.toUpperCase()} /> */}
            <Box
                sx={{
                    width: "100%",
                    height: "16%",
                    border: "3px solid black",
                    padding: 1,
                }}
            >
                <Box sx={{ marginLeft: "45%" }}></Box>
                <Typography
                    sx={{
                        // marginBlock: 1,
                        textAlign: "center",
                        fontSize: 32,
                        fontWeight: "900",
                        // fontStyle: "italic",
                    }}
                >
                    {data?.deno.toUpperCase()}
                </Typography>
                <Typography
                    sx={{
                        // marginBlock: 1,
                        textAlign: "center",
                        fontSize: 24,
                        fontWeight: "700",
                        // fontStyle: "italic",
                    }}
                >
                    {data?.formejur} au capital de {data?.capital} €
                </Typography>
                <Typography
                    sx={{
                        // marginBlock: 1,
                        textAlign: "center",
                        fontSize: 18,
                        fontWeight: "600",
                        // fontStyle: "italic",
                    }}
                >
                    Siège social : {data?.adresse} - {data?.codepostal}{" "}
                    {data?.commune}
                </Typography>
            </Box>
            <Typography
                sx={{
                    marginTop: 4,
                    marginInline: 2,
                    // textAlign: "center",
                    fontSize: 24,
                    fontWeight: "700",
                    // fontStyle: "italic",
                }}
            >
                LISTE DES SOUSCRIPTEURS D’ACTIONS
            </Typography>
            <Table
                sx={{
                    marginBottom: 8,
                    marginTop: 2,
                    // borderBottom: "1px solid black",
                }}
            >
                <TableHead
                    sx={{
                        "& th": {
                            borderBottom: "1px solid black",
                        },
                    }}
                >
                    <TableRow>
                        <TableCell
                            sx={{
                                width: "50%",
                                paddingInline: 1,
                                paddingBlock: 1,
                                borderLeft: "1px solid black",
                                borderTop: "1px solid black",
                            }}
                        >
                            Non, prénom, adresse ou dénomination, siège des
                            souscripteurs
                        </TableCell>
                        <TableCell
                            sx={{
                                textAlign: "center",
                                width: "15%",
                                paddingInline: 1,
                                paddingBlock: 1,
                                borderLeft: "1px solid black",
                                // borderLeft: "1px dashed black",
                                borderTop: "1px solid black",
                                backgroundColor: "lightgray",
                            }}
                        >
                            Nombre des actions souscrites
                        </TableCell>
                        <TableCell
                            sx={{
                                textAlign: "center",
                                width: "15%",
                                paddingInline: 1,
                                paddingBlock: 1,
                                borderTop: "1px solid black",
                                // borderBottom: "1px solid black",
                                borderLeft: "1px dashed black",
                                backgroundColor: "lightgray",
                            }}
                        >
                            Montant total des souscriptions
                        </TableCell>
                        <TableCell
                            sx={{
                                textAlign: "center",
                                width: "15%",
                                paddingInline: 1,
                                paddingBlock: 1,
                                borderRight: "1px solid black",
                                borderTop: "1px solid black",
                                borderLeft: "1px dashed black",
                                backgroundColor: "lightgray",
                            }}
                        >
                            Montant des versements effectués
                        </TableCell>
                    </TableRow>
                </TableHead>

                <TableBody
                    sx={{
                        "& th": {
                            borderBottom: "1px solid black",
                        },
                    }}
                >
                    {data?.beneficiaires?.length > 0 ? (
                        data.beneficiaires.map((el) => (
                            <TableRow
                                sx={{
                                    "& th": {
                                        borderBottom: "1px solid black",
                                    },
                                }}
                            >
                                <TableCell
                                    sx={{
                                        width: "50%",
                                        paddingInline: 1,
                                        paddingBlock: 1,
                                        borderLeft: "1px solid black",
                                        borderTop: "1px solid black",
                                        borderBottom: "1px solid black",
                                    }}
                                >
                                    <Typography
                                        sx={{
                                            // marginTop: 4,
                                            // marginInline: 2,
                                            // textAlign: "center",
                                            fontSize: 16,
                                            fontWeight: "700",
                                            // fontStyle: "italic",
                                        }}
                                    >
                                        {el?.prenombenefi}{" "}
                                        {el?.nombenefi.toUpperCase()}
                                    </Typography>
                                    <Typography
                                        sx={{
                                            // marginTop: 4,
                                            // marginInline: 2,
                                            // textAlign: "center",
                                            fontSize: 16,
                                            fontWeight: "700",
                                            // fontStyle: "italic",
                                        }}
                                    >
                                        Né
                                        {el?.datenaissancebenefi &&
                                            ` le ${el?.datenaissancebenefi}`}{" "}
                                        à {el?.villenaissancebenefi}
                                        {el?.paysnaissancebenefi &&
                                            `(${el?.paysnaissancebenefi})`}
                                    </Typography>
                                    <Typography
                                        sx={{
                                            // marginTop: 4,
                                            // marginInline: 2,
                                            // textAlign: "center",
                                            fontSize: 16,
                                            fontWeight: "700",
                                            // fontStyle: "italic",
                                        }}
                                    >
                                        de nationalité : {el?.nationalitebenefi}
                                    </Typography>
                                    <Typography
                                        sx={{
                                            // marginTop: 4,
                                            // marginInline: 2,
                                            // textAlign: "center",
                                            fontSize: 16,
                                            fontWeight: "700",
                                            // fontStyle: "italic",
                                        }}
                                    >
                                        Demeurant: {el?.dirigAdressebenefi} -{" "}
                                        {el?.codepostalnaissancebenefi}{" "}
                                        {el?.villenaissancebenefi}
                                    </Typography>
                                </TableCell>
                                <TableCell
                                    sx={{
                                        textAlign: "center",
                                        width: "15%",
                                        paddingInline: 1,
                                        paddingBlock: 1,
                                        borderLeft: "1px solid black",
                                        // borderLeft: "1px dashed black",
                                        borderBottom: "1px solid black",
                                        borderTop: "1px solid black",
                                        // backgroundColor: "lightgray",
                                    }}
                                >
                                    {el?.detentioncapital}
                                </TableCell>
                                <TableCell
                                    sx={{
                                        textAlign: "center",
                                        width: "15%",
                                        paddingInline: 1,
                                        paddingBlock: 1,
                                        borderTop: "1px solid black",
                                        borderBottom: "1px solid black",
                                        borderLeft: "1px dashed black",
                                        // backgroundColor: "lightgray",
                                    }}
                                >
                                    {(el?.detentioncapital * data.capital) /
                                        100}
                                </TableCell>
                                <TableCell
                                    sx={{
                                        textAlign: "center",
                                        width: "15%",
                                        paddingInline: 1,
                                        paddingBlock: 1,
                                        borderRight: "1px solid black",
                                        borderTop: "1px solid black",
                                        borderLeft: "1px dashed black",
                                        // backgroundColor: "lightgray",
                                        borderBottom: "1px solid black",
                                    }}
                                >
                                    {(el?.detentioncapital * data.capital) /
                                        100}
                                </TableCell>
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell
                                sx={{
                                    width: "50%",
                                    paddingInline: 1,
                                    paddingBlock: 1,
                                    borderLeft: "1px solid black",
                                    borderTop: "1px solid black",
                                }}
                            ></TableCell>
                            <TableCell
                                sx={{
                                    textAlign: "center",
                                    width: "15%",
                                    paddingInline: 1,
                                    paddingBlock: 1,
                                    borderLeft: "1px solid black",
                                    // borderLeft: "1px dashed black",
                                    borderTop: "1px solid black",
                                    // backgroundColor: "lightgray",
                                }}
                            >
                                -
                            </TableCell>
                            <TableCell
                                sx={{
                                    textAlign: "center",
                                    width: "15%",
                                    paddingInline: 1,
                                    paddingBlock: 1,
                                    borderTop: "1px solid black",
                                    // borderBottom: "1px solid black",
                                    borderLeft: "1px dashed black",
                                    // backgroundColor: "lightgray",
                                }}
                            >
                                -
                            </TableCell>
                            <TableCell
                                sx={{
                                    textAlign: "center",
                                    width: "15%",
                                    paddingInline: 1,
                                    paddingBlock: 1,
                                    borderRight: "1px solid black",
                                    borderTop: "1px solid black",
                                    borderLeft: "1px dashed black",
                                    // backgroundColor: "lightgray",
                                }}
                            >
                                -
                            </TableCell>
                        </TableRow>
                    )}
                    <TableRow>
                        <TableCell
                            sx={{
                                width: "50%",
                                paddingInline: 1,
                                paddingBlock: 1,
                                borderLeft: "1px solid black",
                                borderTop: "1px solid black",
                                borderBottom: "1px solid black",
                            }}
                        >
                            Total
                        </TableCell>
                        <TableCell
                            sx={{
                                textAlign: "center",
                                width: "15%",
                                paddingInline: 1,
                                paddingBlock: 1,
                                borderLeft: "1px solid black",
                                // borderLeft: "1px dashed black",
                                borderTop: "1px solid black",
                                borderBottom: "1px solid black",

                                // backgroundColor: "lightgray",
                            }}
                        >
                            100
                        </TableCell>
                        <TableCell
                            sx={{
                                textAlign: "center",
                                width: "15%",
                                paddingInline: 1,
                                paddingBlock: 1,
                                borderTop: "1px solid black",
                                // borderBottom: "1px solid black",
                                borderLeft: "1px dashed black",
                                borderBottom: "1px solid black",

                                // backgroundColor: "lightgray",
                            }}
                        >
                            {data.capital}
                        </TableCell>
                        <TableCell
                            sx={{
                                textAlign: "center",
                                width: "15%",
                                paddingInline: 1,
                                paddingBlock: 1,
                                borderRight: "1px solid black",
                                borderTop: "1px solid black",
                                borderBottom: "1px solid black",

                                borderLeft: "1px dashed black",
                                // backgroundColor: "lightgray",
                            }}
                        >
                            {data.capital}
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
            <Box
                sx={{
                    position: "absolute",
                    bottom: "8%",
                    left: "5%",
                    right: "5%",
                }}
            >
                {" "}
                <Box>
                    <Typography style={{ display: "inline" }}>
                        Certifié exact, sincère et véritable par{" "}
                    </Typography>
                    {data?.dirig?.map((el) => (
                        <Typography
                            style={{ display: "inline" }}
                            sx={{
                                // marginBlock: 1,
                                // textAlign: "center",
                                fontSize: 18,
                                fontWeight: "600",
                                // fontStyle: "italic",
                            }}
                        >
                            {el.detcivdir} {el.detprenomdir} {el.detnomdir}{" "}
                            <Typography style={{ display: "inline" }}>
                                {el.titredirig},{" "}
                            </Typography>
                        </Typography>
                    ))}{" "}
                    {data?.beneficiaires?.map((el) => (
                        <span>
                            {el.prenombenefi} {el.nombenefi} associé ,{" "}
                        </span>
                    ))}{" "}
                    de la société{" "}
                    <Typography
                        style={{ display: "inline" }}
                        sx={{
                            // marginBlock: 1,
                            // textAlign: "center",
                            fontSize: 18,
                            fontWeight: "600",
                            // fontStyle: "italic",
                        }}
                    >
                        {" "}
                        {data?.deno.toUpperCase()}
                    </Typography>
                    {data?.formejur && `, ${data?.formejur}`}.
                </Box>
                <Box sx={{ marginBlock: 2 }}>
                    <Typography>
                        Fait à ..... le{" "}
                        <Typography
                            style={{ display: "inline" }}
                            sx={{
                                // marginBlock: 1,
                                // textAlign: "center",
                                fontSize: 18,
                                fontWeight: "600",
                                // fontStyle: "italic",
                            }}
                        >
                            {" "}
                            {getCurrentDate()}{" "}
                        </Typography>
                        en deux exemplaires.
                    </Typography>
                </Box>
                <Box textAlign={"right"}>
                    <Typography>
                        {data?.dirig?.map((el) => (
                            <Typography
                                style={{ display: "inline" }}
                                sx={{
                                    // marginBlock: 1,
                                    // textAlign: "center",
                                    fontSize: 18,
                                    fontWeight: "600",
                                    // fontStyle: "italic",
                                }}
                            >
                                {el.detcivdir} {el.detprenomdir} {el.detnomdir}{" "}
                                ,{" "}
                            </Typography>
                        ))}{" "}
                        {data?.beneficiaires?.map((el) => (
                            <Typography
                                style={{ display: "inline" }}
                                sx={{
                                    // marginBlock: 1,
                                    // textAlign: "center",
                                    fontSize: 18,
                                    fontWeight: "600",
                                    // fontStyle: "italic",
                                }}
                            >
                                {el.prenombenefi} {el.nombenefi} associé ,{" "}
                            </Typography>
                        ))}
                    </Typography>
                </Box>
            </Box>
        </Box>
    );
};

export default DocSouscripteurs;
