import { TableCell, TableHead, TableRow } from "@mui/material";
import React from "react";

const TableHeader4 = (tableHhead = ["1", "2", "3"]) => {
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
                        width: "50%",
                        paddingInline: 1,
                        paddingBlock: 1,
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
    );
};

export default TableHeader4;
