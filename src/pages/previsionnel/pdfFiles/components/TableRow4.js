import { TableCell, TableRow } from "@mui/material";
import React from "react";

const TableRow4 = ({
    highlighted = false,
    label = "",
    v1 = "-",
    v2 = "-",
    v3 = "-",
    fontWeight,
}) => {
    return (
        <TableRow
            sx={{
                "& td": {
                    // borderRight: 0,
                    fontSize: 13,
                    borderBlock: highlighted ? "1px solid black" : 0,
                    fontWeight: fontWeight || "400",
                },
            }}
        >
            <TableCell
                sx={{
                    width: "50%",
                    paddingInline: 1,
                    paddingBlock: 0,
                    borderLeft: "1px solid black",
                    backgroundColor: highlighted && "lightgray",
                }}
            >
                {label}
            </TableCell>
            <TableCell
                sx={{
                    paddingBlock: 0,
                    textAlign: "center",
                    width: "15%",
                    paddingInline: 1,
                    borderLeft: "1px dashed black",
                    backgroundColor: highlighted && "lightgray",
                }}
            >
                {v1}
            </TableCell>
            <TableCell
                sx={{
                    paddingBlock: 0,
                    textAlign: "center",
                    width: "15%",
                    paddingInline: 1,
                    borderLeft: "1px dashed black",
                    backgroundColor: highlighted && "lightgray",
                }}
            >
                {v2}{" "}
            </TableCell>
            <TableCell
                sx={{
                    paddingBlock: 0,
                    textAlign: "center",
                    width: "15%",
                    paddingInline: 1,
                    borderLeft: "1px dashed black",
                    borderRight: "1px solid black",
                    backgroundColor: highlighted && "lightgray",
                }}
            >
                {v3}{" "}
            </TableCell>
        </TableRow>
    );
};

export default TableRow4;
