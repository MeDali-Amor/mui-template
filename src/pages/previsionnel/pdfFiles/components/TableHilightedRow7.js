import { TableCell, TableRow } from "@mui/material";
import React from "react";

const TableHilightedRow7 = ({
    label = "label",
    v11 = "1",
    v12 = "%",
    v21 = "2",
    v22 = "%",
    v31 = "3",
    v32 = "%",
}) => {
    return (
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
                    width: "40%",
                    paddingInline: 1,
                    paddingBlock: 0,
                    borderLeft: "1px solid black",
                    fontWeight: "600",
                    backgroundColor: "lightgray",
                }}
            >
                {label}
            </TableCell>
            <TableCell
                sx={{
                    paddingBlock: 0,
                    textAlign: "center",
                    width: "12%",
                    paddingInline: 1,
                    // borderLeft: "1px dashed black",
                    fontWeight: "600",
                    backgroundColor: "lightgray",
                }}
            >
                {v11}
            </TableCell>
            <TableCell
                sx={{
                    paddingBlock: 0,
                    textAlign: "center",
                    width: "12%",
                    paddingInline: 1,
                    backgroundColor: "lightgray",
                }}
            >
                {v12}
            </TableCell>
            <TableCell
                sx={{
                    paddingBlock: 0,
                    textAlign: "center",
                    width: "12%",
                    paddingInline: 1,
                    // borderLeft: "1px dashed black",
                    fontWeight: "600",
                    backgroundColor: "lightgray",
                }}
            >
                {v21}
            </TableCell>
            <TableCell
                sx={{
                    paddingBlock: 0,
                    textAlign: "center",
                    width: "12%",
                    paddingInline: 1,
                    backgroundColor: "lightgray",
                }}
            >
                {v22}
            </TableCell>
            <TableCell
                sx={{
                    paddingBlock: 0,
                    textAlign: "center",
                    width: "12%",
                    paddingInline: 1,
                    // borderLeft: "1px dashed black",

                    fontWeight: "600",
                    backgroundColor: "lightgray",
                }}
            >
                {v31}
            </TableCell>
            <TableCell
                sx={{
                    paddingBlock: 0,
                    textAlign: "center",
                    width: "12%",
                    paddingInline: 1,
                    borderLeft: "1px dashed black",
                    borderRight: "1px solid black",
                    backgroundColor: "lightgray",
                }}
            >
                {v32}
            </TableCell>
        </TableRow>
    );
};

export default TableHilightedRow7;
