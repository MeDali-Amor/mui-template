import { Grid } from "@mui/material";
import React from "react";
import InlineTextField from "../../components/InlineTextFeild";
import SectionTitle from "../../components/SectionTitle";

const Page8 = () => {
    return (
        <div id="rentabilite">
            <SectionTitle title="Contrôle de votre seuil de rentabilité" />

            <Grid container columnGap={0.3} alignItems={"center"}>
                <Grid
                    item
                    xs={12}
                    // sm={9}
                >
                    <InlineTextField
                        // id="charge_variables_%"
                        name="rentabilite"
                        label="D'après les éléments que vous avez indiqués, votre projet est "
                        // fullWidth
                        readOnly
                        customValue={"Rentable"}
                        width={"15"}
                    />
                </Grid>
            </Grid>
        </div>
    );
};

export default Page8;
