import { TableCell, TableHead, TableRow } from "@mui/material";
import React from "react";

const TableHeader7 = () => {
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
                        width: "40%",
                        paddingInline: 1,
                        paddingBlock: 1,
                    }}
                ></TableCell>
                <TableCell
                    sx={{
                        textAlign: "center",
                        width: "12%",
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
                        width: "7%",
                        paddingInline: 1,
                        paddingBlock: 1,

                        borderTop: "1px solid black",
                        backgroundColor: "lightgray",
                    }}
                >
                    %
                </TableCell>
                <TableCell
                    sx={{
                        textAlign: "center",
                        width: "12%",
                        paddingInline: 1,
                        paddingBlock: 1,
                        borderTop: "1px solid black",
                        // borderBottom: "1px solid black",
                        borderLeft: "1px dashed black",
                        backgroundColor: "lightgray",
                    }}
                >
                    Année 2
                </TableCell>
                <TableCell
                    sx={{
                        textAlign: "center",
                        width: "7%",
                        paddingInline: 1,
                        paddingBlock: 1,
                        borderTop: "1px solid black",
                        backgroundColor: "lightgray",
                    }}
                >
                    %
                </TableCell>
                <TableCell
                    sx={{
                        textAlign: "center",
                        width: "12%",
                        paddingInline: 1,
                        paddingBlock: 1,

                        borderLeft: "1px dashed black",
                        borderTop: "1px solid black",
                        backgroundColor: "lightgray",
                    }}
                >
                    Année 3
                </TableCell>
                <TableCell
                    sx={{
                        textAlign: "center",
                        width: "7%",
                        paddingInline: 1,
                        paddingBlock: 1,
                        borderTop: "1px solid black",
                        borderRight: "1px solid black",
                        backgroundColor: "lightgray",
                    }}
                >
                    %
                </TableCell>
            </TableRow>
        </TableHead>
    );
};

export default TableHeader7;
