import { TableCell, TableRow } from "@mui/material";
import React from "react";

const TableRow7 = ({
    label = "label",
    v11 = "1",
    v12 = "%",
    v21 = "2",
    v22 = "%",
    v31 = "3",
    v32 = "%",
    highlighted = false,
}) => {
    return (
        <TableRow
            sx={{
                "& td": {
                    // borderRight: 0,
                    borderBlock: highlighted ? "1px solid black" : 0,
                },
            }}
        >
            <TableCell
                sx={{
                    width: "40%",
                    paddingInline: 1,
                    paddingBlock: 0.2,
                    borderLeft: "1px solid black",
                    fontWeight: 600,
                    backgroundColor: highlighted && "lightgray",
                }}
            >
                {label}
            </TableCell>
            <TableCell
                sx={{
                    paddingBlock: 0.2,
                    textAlign: "center",
                    width: "12%",
                    paddingInline: 1,
                    borderLeft: "1px dashed black",
                    backgroundColor: highlighted && "lightgray",
                }}
            >
                {v11}
            </TableCell>
            <TableCell
                sx={{
                    textAlign: "center",
                    width: "7%",
                    paddingInline: 1,
                    paddingBlock: 0.2,
                    borderTop: "1px solid black",
                    borderLeft: "1px dashed black",
                    backgroundColor: highlighted && "lightgray",
                }}
            >
                {v12}
            </TableCell>
            <TableCell
                sx={{
                    paddingBlock: 0.2,
                    textAlign: "center",
                    width: "12%",
                    paddingInline: 1,
                    borderLeft: "1px dashed black",
                    backgroundColor: highlighted && "lightgray",
                }}
            >
                {v21}
            </TableCell>
            <TableCell
                sx={{
                    textAlign: "center",
                    width: "7%",
                    paddingInline: 1,
                    paddingBlock: 0.2,
                    borderTop: "1px solid black",
                    borderLeft: "1px dashed black",
                    backgroundColor: highlighted && "lightgray",
                }}
            >
                {v22}
            </TableCell>
            <TableCell
                sx={{
                    paddingBlock: 0.2,
                    textAlign: "center",
                    width: "12%",
                    paddingInline: 1,
                    borderLeft: "1px dashed black",
                    backgroundColor: highlighted && "lightgray",
                }}
            >
                {v31}
            </TableCell>
            <TableCell
                sx={{
                    textAlign: "center",
                    width: "7%",
                    paddingInline: 1,
                    paddingBlock: 0.2,
                    borderTop: "1px solid black",
                    borderRight: "1px solid black",
                    borderLeft: "1px dashed black",
                    backgroundColor: highlighted && "lightgray",
                }}
            >
                {v32}
            </TableCell>
        </TableRow>
    );
};

export default TableRow7;
