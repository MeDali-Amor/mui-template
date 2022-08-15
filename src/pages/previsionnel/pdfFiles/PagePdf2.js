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
import React, { useMemo } from "react";
import { amortissementHandler } from "../computationHandlers/Investissement";
import A4SectionHeader from "./components/A4SectionHeader";
import PageIntro from "./components/PageIntro";
import TableHeader4 from "./components/TableHeader4";
import TableRow4 from "./components/TableRow4";

const PagePdf2 = ({ data }) => {
    const besoin_demarage = data?.besoin_demarage;
    const duree_amortissement = data?.duree_amortissement;
    const {
        totalAmortissementIncorp,
        amortissementIncorporelsArray,
        totalAmortissementCorp,
        amortissementCorporelsArray,
        totalAmortissement,
    } = amortissementHandler(besoin_demarage, duree_amortissement);

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
            <A4SectionHeader title={"Salaires et charges sociales"} />
            <PageIntro
                nom_projet={data?.nom_projet}
                nom={data?.nom}
                prenom={data?.prenom}
            />
            <Box
                sx={{
                    width: "100%",
                    height: "10%",
                    // border: "3px solid black",
                    paddingBlock: 2,
                    paddingInline: "15%",
                }}
            >
                <Stack
                    direction={"row"}
                    sx={{
                        width: "100%",
                        height: "33%",
                    }}
                >
                    <Typography
                        sx={{
                            width: "50%",
                            fontSize: 14,
                            fontWeight: "600",
                        }}
                    >
                        Statut juridique :
                    </Typography>
                    <Typography
                        sx={{
                            fontSize: 14,
                            fontWeight: "400",
                            ml: 2,
                        }}
                    >
                        {data?.form_juridique || ""}
                    </Typography>
                </Stack>

                <Stack
                    direction={"row"}
                    sx={{
                        width: "100%",

                        height: "33%",
                    }}
                >
                    <Typography
                        sx={{
                            width: "50%",
                            fontSize: 14,

                            fontWeight: "600",
                        }}
                    >
                        Bénéfice de l'Accre :
                    </Typography>
                    <Typography
                        sx={{
                            fontSize: 14,
                            fontWeight: "400",
                            ml: 2,
                        }}
                    >
                        {data?.dir_ACCRE || ""}
                    </Typography>
                </Stack>
                <Stack
                    direction={"row"}
                    sx={{
                        width: "100%",

                        height: "33%",
                    }}
                >
                    <Typography
                        sx={{
                            width: "50%",
                            fontSize: 14,
                            fontWeight: "600",
                        }}
                    >
                        Statut social du (des) dirigeant(s) :
                    </Typography>
                    <Typography
                        sx={{
                            fontSize: 14,
                            fontWeight: "400",
                            ml: 2,
                        }}
                    >
                        {data?.form_juridique == "SAS (IS)" ||
                        data?.form_juridique == "SASU (IS)"
                            ? "Assimilé-salarié"
                            : "Travailleur non salarié"}
                    </Typography>
                </Stack>
            </Box>
            <Table>
                <TableHead
                    sx={{
                        "& th": {
                            borderBottom: 0,
                        },
                    }}
                >
                    <TableRow>
                        <TableCell
                            sx={{
                                width: "50%",
                                paddingInline: 1,
                                paddingBlock: 1,
                                // borderBottom: "1px solid black",
                            }}
                        ></TableCell>
                        <TableCell
                            sx={{
                                textAlign: "center",
                                width: "15%",
                                paddingInline: 1,
                                paddingBlock: 1,
                                borderLeft: "1px solid black",
                                borderTop: "1px solid black",
                                backgroundColor: "lightgray",
                            }}
                        >
                            Année 1
                        </TableCell>
                        <TableCell
                            sx={{
                                textAlign: "center",
                                width: "15%",
                                paddingInline: 1,
                                paddingBlock: 1,
                                borderTop: "1px solid black",
                                // borderBottom: "1px solid black",
                                backgroundColor: "lightgray",
                            }}
                        >
                            Année 2
                        </TableCell>
                        <TableCell
                            sx={{
                                textAlign: "center",
                                width: "15%",
                                paddingInline: 1,
                                paddingBlock: 1,
                                borderRight: "1px solid black",
                                borderTop: "1px solid black",
                                backgroundColor: "lightgray",
                            }}
                        >
                            Année 3
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    <TableRow
                        sx={{
                            "& td": {
                                border: "1px solid black",
                            },
                        }}
                    >
                        <TableCell
                            sx={{
                                width: "50%",
                                paddingInline: 2,
                                paddingBlock: 2,
                                borderBottom: "1px solid black",
                                borderTop: "1px solid black",
                                borderLeft: "1px solid black",
                                fontWeight: "600",
                            }}
                        >
                            Rémunération du (des) dirigeants <br />
                            <Box
                                textAlign={"center"}
                                fontWeight={300}
                                sx={{ margin: 0, padding: 0 }}
                            >
                                % augmentation
                            </Box>
                            {/* <br /> */}
                            Charges sociales du (des) dirigeant(s)
                        </TableCell>
                        <TableCell
                            sx={{
                                textAlign: "center",
                                width: "15%",
                                paddingInline: 1,
                                paddingBlock: 2,
                                borderLeft: "1px solid black",
                                fontWeight: "600",
                            }}
                        ></TableCell>
                        <TableCell
                            sx={{
                                textAlign: "center",
                                width: "15%",
                                paddingInline: 1,
                                paddingBlock: 2,
                                borderLeft: "1px solid black",
                                fontWeight: "600",
                            }}
                        ></TableCell>
                        <TableCell
                            sx={{
                                textAlign: "center",
                                width: "15%",
                                paddingInline: 1,
                                paddingBlock: 2,
                                borderLeft: "1px solid black",
                                fontWeight: "600",
                            }}
                        ></TableCell>
                    </TableRow>
                    <TableRow
                        sx={{
                            "& td": {
                                border: "1px solid black",
                            },
                        }}
                    >
                        <TableCell
                            sx={{
                                width: "50%",
                                paddingInline: 2,
                                paddingBlock: 2,
                                borderBottom: "1px solid black",
                                borderTop: "1px solid black",
                                borderLeft: "1px solid black",
                                fontWeight: "600",
                            }}
                        >
                            Salaires des employés <br />
                            <Box
                                textAlign={"center"}
                                fontWeight={300}
                                sx={{ margin: 0, padding: 0 }}
                            >
                                % augmentation
                            </Box>
                            {/* <br /> */}
                            Charges sociales employés
                        </TableCell>
                        <TableCell
                            sx={{
                                textAlign: "center",
                                width: "15%",
                                paddingInline: 1,
                                paddingBlock: 2,
                                borderLeft: "1px solid black",
                                fontWeight: "600",
                            }}
                        ></TableCell>
                        <TableCell
                            sx={{
                                textAlign: "center",
                                width: "15%",
                                paddingInline: 1,
                                paddingBlock: 2,
                                borderLeft: "1px solid black",
                                fontWeight: "600",
                            }}
                        ></TableCell>
                        <TableCell
                            sx={{
                                textAlign: "center",
                                width: "15%",
                                paddingInline: 1,
                                paddingBlock: 2,
                                borderLeft: "1px solid black",
                                fontWeight: "600",
                            }}
                        ></TableCell>
                    </TableRow>
                </TableBody>
            </Table>
            <Box
                sx={{
                    mt: 4,
                    mb: 2,
                    width: "100%",
                    height: "8%",
                    border: "3px solid black",
                    padding: 2,
                }}
            >
                <Typography
                    sx={{
                        marginBlock: 1,
                        textAlign: "center",
                        fontSize: 24,
                        fontWeight: "700",
                        height: "5%",
                    }}
                >
                    Détail des amortissements
                </Typography>
            </Box>
            <Table>
                <TableHeader4 />
                <TableBody>
                    <TableRow4
                        label="Amortissements incorporels"
                        v1={totalAmortissementIncorp || 0}
                        v2={totalAmortissementIncorp || 0}
                        v3={totalAmortissementIncorp || 0}
                        fontWeight="600"
                    />
                    {amortissementIncorporelsArray.map((el) => (
                        <TableRow4
                            label={el.label}
                            v1={el.value}
                            v2={el.value}
                            v3={el.value}
                            // fontWeight="600"
                        />
                    ))}
                    {/* </TableBody>
                <TableBody> */}
                    <TableRow4
                        label="Amortissements corporels"
                        v1={totalAmortissementCorp}
                        v2={totalAmortissementCorp}
                        v3={totalAmortissementCorp}
                        fontWeight="600"
                    />
                    {amortissementCorporelsArray.map((el) => (
                        <TableRow4
                            label={el.label}
                            v1={el.value}
                            v2={el.value}
                            v3={el.value}
                            // fontWeight="600"
                        />
                    ))}

                    <TableRow
                        sx={{
                            "& td": {
                                // borderRight: 0,
                                borderBlock: "1px solid black",
                            },
                        }}
                    >
                        <TableCell
                            sx={{
                                width: "50%",
                                paddingInline: 1,
                                paddingBlock: 0,
                                borderLeft: "1px solid black",
                                fontWeight: "600",
                            }}
                        >
                            Total Amortissement
                        </TableCell>
                        <TableCell
                            sx={{
                                paddingBlock: 1,
                                textAlign: "center",
                                width: "15%",
                                paddingInline: 1,
                                borderLeft: "1px dashed black",
                                fontWeight: "600",
                            }}
                        >
                            {totalAmortissement || 0}
                        </TableCell>
                        <TableCell
                            sx={{
                                paddingBlock: 1,
                                textAlign: "center",
                                width: "15%",
                                paddingInline: 1,
                                borderLeft: "1px dashed black",
                                fontWeight: "600",
                            }}
                        >
                            {totalAmortissement || 0}
                        </TableCell>
                        <TableCell
                            sx={{
                                paddingBlock: 1,
                                textAlign: "center",
                                width: "15%",
                                paddingInline: 1,
                                borderLeft: "1px dashed black",
                                borderRight: "1px solid black",
                                fontWeight: "600",
                            }}
                        >
                            {totalAmortissement || 0}
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
            <Box sx={{ position: "absolute", bottom: "1.25%", right: "5%" }}>
                3
            </Box>
        </Box>
    );
};

export default PagePdf2;
