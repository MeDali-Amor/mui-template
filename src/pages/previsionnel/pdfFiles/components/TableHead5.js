import React from "react";
import { TableCell, TableHead, TableRow } from "@mui/material";

const TableHead5 = () => {
    return (
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
                        width: "37.5%",
                        paddingInline: 1,
                        paddingBlock: 1,
                    }}
                ></TableCell>
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
                    Mois 1
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
                    Mois 2
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
                    Mois 3
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
                    Mois 4
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
                    Mois 5
                </TableCell>
            </TableRow>
        </TableHead>
    );
};

export default TableHead5;
