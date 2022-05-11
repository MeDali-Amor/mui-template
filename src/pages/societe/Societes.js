import { alpha, styled, Typography } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import CompanyForm from "./CompanyForm";
import CompanySearchBox from "./CompanySearchBox";

const Societes = () => {
    const [companyData, setCompanyData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    // useEffect(() => {
    //     console.log(companyData);
    // }, [companyData]);
    const scrapeCompanyInfo = async (el) => {
        // console.log(el);
        try {
            setCompanyData(null);
            setIsLoading(true);

            const data = {
                url: el.url,
            };
            const res = await axios.post(
                "http://localhost:8000/api/scrape-by-url",
                data
            );

            setCompanyData(res.data.company);
            setIsLoading(false);
        } catch (error) {
            console.log(error);
        }

        // setCompanyData(el);
    };
    return (
        <div>
            <StyledGreySection>
                <StyledPaddedSubSection>
                    <Typography variant="h3">Societés</Typography>
                    <Typography
                        variant="subtitle2"
                        sx={{
                            color: "gray",
                        }}
                    >
                        Vous êtes à la recherche des informations sur une
                        entreprise?
                    </Typography>
                </StyledPaddedSubSection>
                <CompanySearchBox
                    // companyData={companyData}
                    setCompanyData={setCompanyData}
                    scrapeCompanyInfo={scrapeCompanyInfo}
                />
            </StyledGreySection>
            <CompanyForm companyData={companyData} />
        </div>
    );
};

export default Societes;
const StyledGreySection = styled("div")(({ theme }) => ({
    // background: alpha(theme.palette.grey[200], 1),
    background: "#f7f7f9",
    // borderBottom: "1px solid gray",
}));
const StyledPaddedSubSection = styled("div")(({ theme }) => ({
    paddingInline: theme.spacing(8),
    paddingBlock: theme.spacing(4),
}));
