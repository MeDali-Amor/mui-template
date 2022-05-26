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
    InputAdornment,
    Popper,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useDebounce } from "../../hooks/debounceHook";
import axios from "axios";
const SearchBarSection = styled(Box)(({ theme }) => ({
    width: "100%",
    // display: "flex",
    // justifyContent: "center",
    paddingInline: theme.spacing(8),
    paddingBottom: theme.spacing(10),
}));

const CompanySearchBox = ({ getCompanyInfo, scrapeCompanyInfo }) => {
    const [companies, setCompanies] = useState([]);
    const [companiesToBeScraped, setCompaniesToBeScraped] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
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
        setIsLoading(true);
        let URL = prepareSearchQuery(
            "http://localhost:8000/api/search?q=",
            searchQuery
        );
        // console.log(URL);
        try {
            let res = await axios.get(URL);
            setCompanies(res.data.companies);
            if (res.data.companies.length === 0) {
                URL = prepareSearchQuery(
                    "http://localhost:8000/api/search-urls?q=",
                    searchQuery
                );
                res = await axios.get(
                    URL
                    // `http://localhost:8000/api//search-urls?q=${query}`
                );
                // setError("");
                setCompaniesToBeScraped(res.data.companies);
            }
            // console.log(res.data);
        } catch (error) {
            // setError("une erreur s'est produite veuillez réessayer");

            console.log(error);
        }
        setIsLoading(false);
    };
    useDebounce(searchQuery, 500, handleSearch);
    // const handleSelect = async (el) => {
    //     setIsLoading(true);
    //     setCompanyData(el);
    //     setIsLoading(false);
    // };

    return (
        // <Container>
        <SearchBarSection>
            <Autocomplete
                loading={isLoading}
                sx={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                }}
                freeSolo
                // autoHighlight
                filterOptions={(x) => x}
                selectOnFocus
                clearOnBlur
                // onChange={(e) => console.log(e)}
                options={
                    companies.length > 0
                        ? companies
                        : companiesToBeScraped.length > 0
                        ? companiesToBeScraped
                        : []
                }
                getOptionLabel={(option) => option.name || ""}
                // PopperComponent={CustomPopper}
                // renderOption={
                //     companies.length > 0 ? (props, option) => option.deno : null
                // }
                renderOption={
                    companies.length > 0
                        ? (props, option) => (
                              <Box
                                  onClick={() => getCompanyInfo(option)}
                                  key={option.no}
                                  sx={{
                                      m: 1,
                                      display: "flex",
                                      py: 1,
                                      px: 2,
                                      transition: "all 400ms ease-in-out",
                                      "&:hover": { background: "#eee" },
                                      borderRadius: "4px",
                                      cursor: "pointer",
                                  }}
                              >
                                  <Stack
                                      direction="row"
                                      divider={
                                          <Divider
                                              orientation="vertical"
                                              flexItem
                                          />
                                      }
                                      spacing={2}
                                  >
                                      <Stack direction="row" spacing={1}>
                                          <Typography variant="subtitle1">
                                              {option.deno}
                                          </Typography>
                                          <Typography variant="subtitle2">
                                              {option.no}
                                          </Typography>
                                      </Stack>
                                      <Stack direction="row" spacing={1}>
                                          <Typography variant="subtitle1">
                                              {option.commune}
                                          </Typography>
                                          <Typography variant="subtitle1">
                                              {option.codepostal}
                                          </Typography>
                                      </Stack>
                                  </Stack>
                              </Box>
                          )
                        : companiesToBeScraped.length > 0
                        ? (props, option) => (
                              <Box
                                  onClick={() => scrapeCompanyInfo(option)}
                                  key={option.no}
                                  sx={{
                                      m: 1,
                                      display: "flex",
                                      py: 1,
                                      px: 2,
                                      transition: "all 400ms ease-in-out",
                                      "&:hover": { background: "#eee" },
                                      borderRadius: "4px",
                                      cursor: "pointer",
                                  }}
                              >
                                  <Stack
                                      direction="row"
                                      divider={
                                          <Divider
                                              orientation="vertical"
                                              flexItem
                                          />
                                      }
                                      spacing={2}
                                  >
                                      <Stack direction="row" spacing={1}>
                                          <Typography variant="subtitle1">
                                              {option.deno}
                                          </Typography>
                                          <Typography variant="subtitle2">
                                              {option.no}
                                          </Typography>
                                      </Stack>
                                      <Stack direction="row" spacing={1}>
                                          <Typography variant="subtitle1">
                                              {option.commune}
                                          </Typography>
                                          <Typography variant="subtitle1">
                                              {option.codepostal}
                                          </Typography>
                                      </Stack>
                                  </Stack>
                              </Box>
                          )
                        : null
                }
                renderInput={(params) => (
                    <TextField
                        {...params}
                        placeholder="Taper le nom de la société ou le numero Siren"
                        InputProps={{
                            ...params.InputProps,
                            startAdornment: (
                                <InputAdornment position="start">
                                    <SearchIcon
                                        sx={{
                                            color: "#bfc8e6",
                                            fontSize: "22px",
                                            fontWeight: "600",
                                        }}
                                    />
                                </InputAdornment>
                            ),
                        }}
                        sx={{
                            width: "100%",
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
                                padding: "8px 24px",
                                background: "#fff",
                                "& > fieldset": {
                                    border: "none",
                                    borderRadius: "6px",

                                    // boxShadow:
                                    // "0px 2px 12px 3px rgba(0, 0, 0, 0.14)",
                                    boxShadow: `0px 1px 8px 0px rgba(0, 0, 0, 0.15)`,

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
        // </Container>
    );
};

export default CompanySearchBox;

// const SearchResult = (el) => {
//     return (
//         <Box
//             sx={{
//                 display: "flex",
//             }}
//         >
//             <Stack
//                 direction="row"
//                 divider={<Divider orientation="vertical" flexItem />}
//                 spacing={2}
//             >
//                 <Stack direction="row" spacing={1}>
//                     <Typography variant="subtitle1">{el.name}</Typography>
//                     <Typography variant="subtitle1">{el.name}</Typography>
//                 </Stack>
//                 <Stack direction="row" spacing={1}>
//                     <Typography variant="subtitle1">{el.name}</Typography>
//                     <Typography variant="subtitle1">{el.name}</Typography>
//                 </Stack>
//             </Stack>
//         </Box>
//     );
// };
// const CustomPopper = () => {
//     return (
//         <Popper
//             sx={{
//                 "& .MuiAutocomplete-listbox": {
//                     "& :hover": {
//                         color: "red",
//                     },
//                 },
//             }}
//         />
//     );
// };
