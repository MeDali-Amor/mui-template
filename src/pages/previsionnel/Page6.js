import { Grid, Typography } from "@mui/material";
import React from "react";
import InlineTextField from "../../components/InlineTextFeild";
import SectionTitle from "../../components/SectionTitle";

const Page6 = () => {
    return (
        <div id="besoin-fonds-roulement">
            <SectionTitle title="Votre besoin en fonds de roulement" />
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
                        // id="charge_variables_%"
                        name="duree_credits_clients"
                        label="Durée moyenne des crédits accordés aux clients en jours"
                        // fullWidth
                        width={"15"}
                        comment={"temps qu'un client met pour vous payer"}
                    />
                </Grid>
                <Grid
                    item
                    xs={12}
                    // sm={9}
                >
                    <InlineTextField
                        // id="charge_variables_%"
                        name="duree_dettes_fournisseurs"
                        label="Durée moyenne des crédits accordés aux clients en jours"
                        // fullWidth
                        width={"15"}
                        comment={
                            "temps que vous mettez pour payer un fournisseur"
                        }
                    />
                </Grid>
            </Grid>
        </div>
    );
};

export default Page6;
