import { Grid } from "@mui/material";
import React from "react";
import InlineTextField from "../../components/InlineTextFeild";
import SectionTitle from "../../components/SectionTitle";

const Page9 = () => {
    return (
        <div id="niveau_tresorie">
            <SectionTitle title="Contrôle du niveau de votre trésorerie de départ" />

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
                        name="niveau_tresorie"
                        label="D'après les éléments que vous avez indiqués, votre trésorerie de départ est"
                        // fullWidth
                        readOnly
                        customValue={"Trop faible"}
                        width={"15"}
                    />
                </Grid>
            </Grid>
        </div>
    );
};

export default Page9;
