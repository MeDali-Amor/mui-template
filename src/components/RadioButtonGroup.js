import {
    FormControl,
    FormControlLabel,
    FormLabel,
    Radio,
    RadioGroup,
    Typography,
} from "@mui/material";
import React from "react";
import { useField, useFormikContext } from "formik";
import { useEffect, useState } from "react";

const RadioButtonGroup = ({
    condition,
    label,
    label1,
    label2,
    setCondition,
    ...props
}) => {
    const { setFieldValue } = useFormikContext();
    const [field, meta] = useField(props);
    const { name, value, onBlur, onChange } = field;
    return (
        <FormControl>
            {/* <Grid
                                                                container
                                                                rowSpacing={3}
                                                                columnSpacing={
                                                                    6
                                                                }
                                                                key={index}
                                                                // sx={{ pb: 5 }}
                                                            >
                                                                <Grid
                                                                    item
                                                                    xs={12}
                                                                    sm={6}
                                                                > */}
            <FormLabel id="demo-controlled-radio-buttons-group">
                {label}
            </FormLabel>
            <RadioGroup
                aria-labelledby="controlled-radio-buttons-group"
                // name="controlled-radio-buttons-group1"
                name={name}
                value={condition}
                row
                onChange={(e) => {
                    onChange(e);
                    setCondition(e.target.value);
                }}
            >
                <FormControlLabel
                    value={"yes"}
                    control={<Radio />}
                    label={
                        <Typography
                            sx={{
                                fontSize: 12,
                                fontWeight: 600,
                            }}
                            variant="body2"
                        >
                            {label1}
                        </Typography>
                    }
                />
                <FormControlLabel
                    value={"no"}
                    control={<Radio />}
                    label={
                        <Typography
                            sx={{
                                fontSize: 12,
                                fontWeight: 600,
                            }}
                            variant="body2"
                        >
                            {label2}
                        </Typography>
                    }
                />
            </RadioGroup>
        </FormControl>
    );
};

export default RadioButtonGroup;
