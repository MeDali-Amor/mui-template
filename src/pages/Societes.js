import { useState, useEffect } from "react";
import {
    Box,
    Container,
    styled,
    TextField,
    Autocomplete,
    Stack,
    Divider,
    Typography,
} from "@mui/material";
import { useDebounce } from "../hooks/debounceHook";
import axios from "axios";
const SearchBarSection = styled(Box)(({ theme }) => ({
    width: "100%",
    // display: "flex",
    // justifyContent: "center",
    padding: 50,
}));

const Societes = () => {
    const [companies, setCompanies] = useState([]);
    const [companyData, setCompanyData] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");

    const changeHandler = (e) => {
        e.preventDefault();
        setSearchQuery(e.target.value);
        // console.log(e.target.value);
    };
    const prepareSearchQuery = (uri, query) => {
        query = encodeURIComponent(query);
        // query = query.replace("+", "%2B");
        const url = `${uri}${query}`;
        return encodeURI(url);
        // console.log(query);
    };

    const handleSearch = async () => {
        if (!searchQuery || searchQuery.trim === "") return;
        // setIsLoading(true);
        let URL = prepareSearchQuery(
            "http://localhost:8000/api/search?q=",
            searchQuery
        );
        // console.log(URL);
        try {
            let res = await axios.get(URL);
            setCompanies(res.data.companies);
            // if (res.data.companies.length === 0) {
            //     URL = prepareSearchQuery(
            //         "http://localhost:8000/api//search-urls?q=",
            //         searchQuery
            //     );
            //     res = await axios.get(
            //         URL
            //         // `http://localhost:8000/api//search-urls?q=${query}`
            //     );
            //     // setError("");
            //     setCompaniesToBeScraped(res.data.companies);
            // }
            console.log(res.data);
        } catch (error) {
            // setError("une erreur s'est produite veuillez réessayer");

            console.log(error);
        }
        // setIsLoading(false);
    };
    useDebounce(searchQuery, 500, handleSearch);
    // const getCompanyInfo = async (el) => {
    //     // setLoading(true);
    //     setCompanyData(el);
    //     // setLoading(false);
    // };
    return (
        <Container>
            <SearchBarSection>
                <Autocomplete
                    sx={{
                        width: "100%",
                        display: "flex",
                        justifyContent: "center",
                    }}
                    freeSolo
                    // autoHighlight
                    filterOptions={(x) => x}
                    onChange={(e) => console.log(e)}
                    options={companies ? companies : []}
                    getOptionLabel={(option) => option.name || ""}
                    renderOption={(props, option) => (
                        <Box
                            key={option._id}
                            sx={{
                                m: 1,
                                display: "flex",
                                py: 1,
                                px: 2,
                                "&:hover": { background: "#eee" },
                                borderRadius: "6px",
                                cursor: "pointer",
                            }}
                        >
                            <Stack
                                direction="row"
                                divider={
                                    <Divider orientation="vertical" flexItem />
                                }
                                spacing={2}
                            >
                                <Stack direction="row" spacing={1}>
                                    <Typography variant="subtitle1">
                                        {option.name}
                                    </Typography>
                                    <Typography variant="subtitle2">
                                        {option.sirenNumber}
                                    </Typography>
                                </Stack>
                                <Stack direction="row" spacing={1}>
                                    <Typography variant="subtitle1">
                                        {option.address.city}
                                    </Typography>
                                    <Typography variant="subtitle1">
                                        {option.address.zipcode}
                                    </Typography>
                                </Stack>
                            </Stack>
                        </Box>
                    )}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            placeholder="Taper le nom de la société ou le numero Siren"
                            sx={{
                                width: "80%",
                                // "& .MuiOutlinedInput-root.Mui-disabled": {
                                //     "& > fieldset": {
                                //         border: "none",
                                //     },
                                // },
                                // "& .MuiOutlinedInput-root.Mui-focused": {
                                //     "& > fieldset": {
                                //         border: "none",
                                //     },
                                // },
                                // "& .MuiOutlinedInput-root:hover": {
                                //     "& > fieldset": {
                                //         border: "none",
                                //     },
                                // },
                                "& input": {
                                    "&::placeholder": {
                                        fontSize: "15px",
                                        fontWeight: 400,
                                        color: "#bfc8e6",
                                        // padding: "14px 24px",
                                        background: "#fff",
                                    },
                                },
                                "& .MuiOutlinedInput-root": {
                                    padding: "10px 24px",

                                    "& > fieldset": {
                                        border: "none",
                                        borderRadius: "6px",

                                        boxShadow:
                                            "0px 2px 12px 3px rgba(0, 0, 0, 0.14)",
                                        // background: "#fff",
                                    },
                                },
                            }}
                            // label="recherche"
                            onChange={changeHandler}
                            // onChange={handleSelect}
                        />
                    )}
                />
            </SearchBarSection>
        </Container>
    );
};

export default Societes;

const SearchResult = (el) => {
    return (
        <Box
            sx={{
                display: "flex",
            }}
        >
            <Stack
                direction="row"
                divider={<Divider orientation="vertical" flexItem />}
                spacing={2}
            >
                <Stack direction="row" spacing={1}>
                    <Typography variant="subtitle1">{el.name}</Typography>
                    <Typography variant="subtitle1">{el.name}</Typography>
                </Stack>
                <Stack direction="row" spacing={1}>
                    <Typography variant="subtitle1">{el.name}</Typography>
                    <Typography variant="subtitle1">{el.name}</Typography>
                </Stack>
            </Stack>
        </Box>
    );
};
