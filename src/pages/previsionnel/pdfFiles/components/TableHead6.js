import React from "react";
import { TableCell, TableHead, TableRow } from "@mui/material";

const TableHead6 = () => {
    return (
        <TableHead
            sx={{
                "& th": {
                    borderBottom: "1px solid black",
                },
            }}
        >
            <TableRow>
                {/* <TableCell
                    sx={{
                        width: "25%",
                        paddingInline: 1,
                        paddingBlock: 1,
                    }}
                ></TableCell> */}
                <TableCell
                    sx={{
                        textAlign: "center",
                        width: "12.5%",
                        paddingInline: 1,
                        paddingBlock: 1,
                        borderLeft: "1px solid black",
                        borderTop: "1px solid black",
                        borderRight: "1px dashed black",
                        backgroundColor: "lightgray",
                    }}
                >
                    Mois 6
                </TableCell>
                <TableCell
                    sx={{
                        textAlign: "center",
                        width: "12.5%",
                        paddingInline: 1,
                        paddingBlock: 1,
                        borderTop: "1px solid black",
                        borderRight: "1px dashed black",
                        backgroundColor: "lightgray",
                    }}
                >
                    Mois 7
                </TableCell>
                <TableCell
                    sx={{
                        textAlign: "center",
                        width: "12.5%",
                        paddingInline: 1,
                        paddingBlock: 1,
                        borderTop: "1px solid black",
                        borderRight: "1px dashed black",
                        backgroundColor: "lightgray",
                    }}
                >
                    Mois 8
                </TableCell>
                <TableCell
                    sx={{
                        textAlign: "center",
                        width: "12.5%",
                        paddingInline: 1,
                        paddingBlock: 1,
                        borderTop: "1px solid black",
                        borderRight: "1px dashed black",
                        backgroundColor: "lightgray",
                    }}
                >
                    Mois 9
                </TableCell>
                <TableCell
                    sx={{
                        textAlign: "center",
                        width: "12.5%",
                        paddingInline: 1,
                        paddingBlock: 1,
                        borderRight: "1px dashed black",
                        borderTop: "1px solid black",
                        backgroundColor: "lightgray",
                    }}
                >
                    Mois 10
                </TableCell>
                <TableCell
                    sx={{
                        textAlign: "center",
                        width: "12.5%",
                        paddingInline: 1,
                        paddingBlock: 1,
                        borderRight: "1px dashed black",
                        borderTop: "1px solid black",
                        backgroundColor: "lightgray",
                    }}
                >
                    Mois 11
                </TableCell>
                <TableCell
                    sx={{
                        textAlign: "center",
                        width: "12.5%",
                        paddingInline: 1,
                        paddingBlock: 1,
                        borderRight: "1px solid black",
                        borderTop: "1px solid black",
                        backgroundColor: "lightgray",
                    }}
                >
                    Mois 12
                </TableCell>
                <TableCell
                    sx={{
                        textAlign: "center",
                        width: "12.5%",
                        paddingInline: 1,
                        paddingBlock: 1,
                        borderRight: "2px solid black",
                        borderTop: "2px solid black",
                        borderLeft: "2px solid black",
                        backgroundColor: "lightgray",
                    }}
                >
                    Total
                </TableCell>
            </TableRow>
        </TableHead>
    );
};

export default TableHead6;
