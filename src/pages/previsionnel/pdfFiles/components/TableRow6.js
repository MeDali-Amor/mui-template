import { TableCell, TableRow } from "@mui/material";
import React from "react";

const TableRow6 = ({
    highlighted = false,
    // label = "titre",
    v1 = "0",
    v2 = "0",
    v3 = "0",
    v4 = "0",
    v5 = "0",
    v6 = "0",
    v7 = "0",
    v8 = "0",
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
            {/* <TableCell
                sx={{
                    width: "25%",
                    paddingInline: 1,
                    paddingBlock: 0,
                    borderLeft: "1px solid black",
                    backgroundColor: highlighted && "lightgray",
                }}
            >
                {label}
            </TableCell> */}
            <TableCell
                sx={{
                    paddingBlock: 0,
                    textAlign: "center",
                    width: "12.5%",
                    paddingInline: 1,
                    borderLeft: "1px solid black",
                    backgroundColor: highlighted && "lightgray",
                }}
            >
                {v1}
            </TableCell>
            <TableCell
                sx={{
                    paddingBlock: 0,
                    textAlign: "center",
                    width: "12.5%",
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
                    width: "12.5%",
                    paddingInline: 1,
                    borderLeft: "1px dashed black",
                    // borderRight: "1px solid black",
                    backgroundColor: highlighted && "lightgray",
                }}
            >
                {v3}{" "}
            </TableCell>
            <TableCell
                sx={{
                    paddingBlock: 0,
                    textAlign: "center",
                    width: "12.5%",
                    paddingInline: 1,
                    borderLeft: "1px dashed black",
                    // borderRight: "1px solid black",
                    backgroundColor: highlighted && "lightgray",
                }}
            >
                {v4}{" "}
            </TableCell>
            <TableCell
                sx={{
                    paddingBlock: 0,
                    textAlign: "center",
                    width: "12.5%",
                    paddingInline: 1,
                    borderLeft: "1px dashed black",
                    // borderRight: "1px solid black",
                    backgroundColor: highlighted && "lightgray",
                }}
            >
                {v5}{" "}
            </TableCell>
            <TableCell
                sx={{
                    paddingBlock: 0,
                    textAlign: "center",
                    width: "12.5%",
                    paddingInline: 1,
                    borderLeft: "1px dashed black",
                    // borderRight: "1px solid black",
                    backgroundColor: highlighted && "lightgray",
                }}
            >
                {v6}{" "}
            </TableCell>
            <TableCell
                sx={{
                    paddingBlock: 0,
                    textAlign: "center",
                    width: "12.5%",
                    paddingInline: 1,
                    borderLeft: "1px dashed black",
                    // borderRight: "1px solid black",
                    backgroundColor: highlighted && "lightgray",
                }}
            >
                {v7}{" "}
            </TableCell>
            <TableCell
                sx={{
                    paddingBlock: 0,
                    textAlign: "center",
                    width: "12.5%",
                    paddingInline: 1,
                    borderLeft: "2px solid black",
                    borderRight: "2px solid black",
                    backgroundColor: highlighted && "lightgray",
                }}
            >
                {v8}{" "}
            </TableCell>
        </TableRow>
    );
};

export default TableRow6;
