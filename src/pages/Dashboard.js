import {
    Autocomplete,
    Box,
    Button,
    FormControl,
    FormControlLabel,
    FormLabel,
    Grid,
    Paper,
    Radio,
    RadioGroup,
    styled,
    TextField,
    Typography,
} from "@mui/material";
import { useState } from "react";

// const Item = styled("div")(({ theme }) => ({
//     // backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
//     // ...theme.typography.body2,
//     padding: theme.spacing(1),
//     textAlign: "center",
//     // color: theme.palette.text.secondary,
// }));

const Dashboard = () => {
    const [isDirig, setIsDirig] = useState("yes");
    const options = ["1", "2", "3", "4", "5"];
    return (
        <>
            {/* <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}> */}
            {/* <Grid item xs={12} sm={6}> */}
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
                    Le bénéficiare effectif est
                </FormLabel>
                {/* </Grid>
                                                                <Grid */}
                {/* item xs={12}
                                                            sm={6}> */}
                <RadioGroup
                    aria-labelledby="demo-controlled-radio-buttons-group"
                    name="controlled-radio-buttons-group"
                    value={isDirig}
                    row
                    onChange={(e) => {
                        setIsDirig(e.target.value);
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
                                un derigeant actuel
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
                                une autre personne
                            </Typography>
                        }
                    />
                </RadioGroup>
                {/* </Grid> */}
                {/* </Grid> */}
            </FormControl>
            {isDirig}
            {/* </Grid> */}
            {/* <Grid item xs={12} sm={6}> */}
            {isDirig === "yes" ? (
                <Autocomplete
                    fullWidth
                    // disabled={!isDirig}
                    id="dirig-select"
                    options={options}
                    autoHighlight
                    getOptionLabel={(option) => option}
                    renderOption={(props, option) => (
                        <Box component="li" {...props}>
                            {option}
                        </Box>
                    )}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            label=""
                            inputProps={{
                                ...params.inputProps,
                            }}
                        />
                    )}
                />
            ) : (
                <Autocomplete
                    fullWidth
                    disabled={true}
                    id="dirig-select"
                    options={options}
                    autoHighlight
                    getOptionLabel={(option) => option}
                    renderOption={(props, option) => (
                        <Box component="li" {...props}>
                            {option}
                        </Box>
                    )}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            label=""
                            inputProps={{
                                ...params.inputProps,
                            }}
                        />
                    )}
                />
            )}
            {/* </Grid> */}
            {/* </Grid> */}
        </>
    );
};

export default Dashboard;
