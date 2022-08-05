import {
    Table,
    TableBody,
    TableCell,
    TableRow,
    Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import A4SectionHeader from "./components/A4SectionHeader";
import PageIntro from "./components/PageIntro";
import TableHeader4 from "./components/TableHeader4";
import TableRow4 from "./components/TableRow4";

const PagePdf6 = ({ data }) => {
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
            <A4SectionHeader title={"Plan de financement à trois ans"} />
            <PageIntro
                nom_projet={data?.nom_projet}
                nom={data?.nom}
                prenom={data?.prenom}
            />
            <Table>
                <TableHeader4 />
                <TableBody>
                    <TableRow4
                        label="   Immobilisations"
                        //   v1={amortisIncorp || 0}
                        //   v2={amortisIncorp || 0}
                        //   v3={amortisIncorp || 0}
                        //   fontWeight="600"
                    />
                    <TableRow4
                        label="   Acquisition des stocks"
                        //   v1={amortisIncorp || 0}
                        //   v2={amortisIncorp || 0}
                        //   v3={amortisIncorp || 0}
                        //   fontWeight="600"
                    />
                    <TableRow4
                        label="   Variation du Besoin en fonds de roulement"
                        //   v1={amortisIncorp || 0}
                        //   v2={amortisIncorp || 0}
                        //   v3={amortisIncorp || 0}
                        //   fontWeight="600"
                    />
                    <TableRow4
                        label="   Remboursement d'emprunts"
                        //   v1={amortisIncorp || 0}
                        //   v2={amortisIncorp || 0}
                        //   v3={amortisIncorp || 0}
                        //   fontWeight="600"
                    />
                    {/* {amortissementIncorporelsArray.map((el) => (
                      <TableRow4
                          label={el.label}
                          v1={el.value}
                          v2={el.value}
                          v3={el.value}
                          // fontWeight="600"
                      />
                  ))} */}
                    {/* </TableBody>
                <TableBody> */}
                    <TableRow4
                        highlighted
                        label=" Total des besoins"
                        v1={0}
                        v2={0}
                        v3={0}
                        fontWeight="600"
                    />
                    <TableRow4
                        label="Apport personnel"
                        //   v1={amortisIncorp || 0}
                        //   v2={amortisIncorp || 0}
                        //   v3={amortisIncorp || 0}
                        //   fontWeight="600"
                    />
                    <TableRow4
                        label="Emprunts"
                        //   v1={amortisIncorp || 0}
                        //   v2={amortisIncorp || 0}
                        //   v3={amortisIncorp || 0}
                        //   fontWeight="600"
                    />
                    <TableRow4
                        label=" Autres financements"
                        //   v1={amortisIncorp || 0}
                        //   v2={amortisIncorp || 0}
                        //   v3={amortisIncorp || 0}
                        //   fontWeight="600"
                    />
                    <TableRow4
                        label="Capacité d'auto-financement"
                        //   v1={amortisIncorp || 0}
                        //   v2={amortisIncorp || 0}
                        //   v3={amortisIncorp || 0}
                        //   fontWeight="600"
                    />
                    <TableRow4
                        label=" Total des ressources"
                        v1={0}
                        v2={0}
                        v3={0}
                        fontWeight="600"
                        highlighted
                    />
                    <TableRow4
                        label="Variation de trésorerie"
                        //   v1={amortisIncorp || 0}
                        //   v2={amortisIncorp || 0}
                        //   v3={amortisIncorp || 0}
                        //   fontWeight="600"
                    />
                    {/* {amortissementCorporelsArray.map((el) => (
                      <TableRow4
                          label={el.label}
                          v1={el.value}
                          v2={el.value}
                          v3={el.value}
                          // fontWeight="600"
                      />
                  ))} */}

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
                            Excédent de trésorerie
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
                            {/* {Number(amortisCorp) + Number(amortisIncorp) || 0} */}
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
                            {/* {Number(amortisCorp) + Number(amortisIncorp) || 0} */}
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
                            {/* {Number(amortisCorp) + Number(amortisIncorp) || 0} */}
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
            <Typography
                fontWeight={600}
                fontSize={14}
                fontStyle="italic"
                mt={6}
            >
                {" "}
                Rappel trésorerie début année 1 :
            </Typography>
            <Box sx={{ position: "absolute", bottom: "1.25%", right: "5%" }}>
                7
            </Box>
        </Box>
    );
};

export default PagePdf6;
