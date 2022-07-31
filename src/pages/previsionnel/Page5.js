import { Grid, Typography } from "@mui/material";
import React from "react";
import FormOpeningText from "../../components/FormOpeningText";
import InlineTextField from "../../components/InlineTextFeild";
import SectionTitle from "../../components/SectionTitle";

const Page5 = () => {
    return (
        <div id="charges-variable">
            <SectionTitle title=" Vos charges Variables" />
            <FormOpeningText
                text="Les charges variables sont liées au niveau d’activité ou à la
                production. Il s’agit des achats de marchandises destinées à
                être revendues, des achats de matières destinées à être
                transformées, des commissions versées à des agents commerciaux…"
            />
            <Grid
                container
                columnGap={0.3}
                alignItems={"center"}
                // sx={{
                //     padding: 2,
                //     marginBlock: 2,
                //     marginInline: -1,
                //     borderRadius: 0.5,
                //     background: alpha(
                //         theme.palette.success.light,
                //         0.2
                //     ),
                // }}
            >
                <Grid
                    item
                    xs={12}
                    // sm={9}
                >
                    <InlineTextField
                        id="charge_variables_%"
                        name="pourcentage_vente_cout_achat"
                        label="% pris de vente, le cout d'achat de marchandises"
                        // fullWidth
                        width={"15"}
                        comment={
                            " concerne uniquement le chiffre d'affaires vente de marchandises"
                        }
                    />
                </Grid>
            </Grid>
        </div>
    );
};

export default Page5;
