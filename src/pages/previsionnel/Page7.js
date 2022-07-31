import { Grid, Typography, useTheme, alpha, InputLabel } from "@mui/material";
import React from "react";
import BaseTextInput from "../../components/BaseTextInput";
import InlineSelectField from "../../components/InlineSelectField";
import SectionTitle from "../../components/SectionTitle";

const Page7 = () => {
    const theme = useTheme();

    return (
        <div id="salaires">
            <SectionTitle title="Salaires employés et rémunération chef d'entreprise" />
            <Grid
                container
                columnGap={0.3}
                alignItems={"center"}
                sx={{
                    padding: 2,
                    marginBlock: 2,
                    marginInline: -1,
                    borderRadius: 0.5,
                    background: alpha(theme.palette.success.light, 0.2),
                }}
            >
                <Grid item xs={3}></Grid>
                <Grid
                    item
                    xs={1.7}
                    // sm={9}
                >
                    <Typography variant="subtitle2" textAlign={"center"}>
                        Anneé 1
                    </Typography>
                </Grid>
                <Grid
                    item
                    xs={1.7}
                    // sm={9}
                >
                    <Typography variant="subtitle2" textAlign={"center"}>
                        Anneé 2
                    </Typography>
                </Grid>
                <Grid
                    item
                    xs={1.7}
                    // sm={9}
                >
                    <Typography variant="subtitle2" textAlign={"center"}>
                        Anneé 3
                    </Typography>
                </Grid>
                <Grid
                    item
                    xs={1.7}
                    // sm={9}
                >
                    <Typography variant="subtitle2" textAlign={"center"}>
                        Anneé 4
                    </Typography>
                </Grid>
                <Grid
                    item
                    xs={1.7}
                    // sm={9}
                >
                    <Typography variant="subtitle2" textAlign={"center"}>
                        Anneé 5
                    </Typography>
                </Grid>
            </Grid>

            <Grid
                container
                columnGap={0.2}
                rowSpacing={1}
                alignItems={"center"}
                // key={name}
                // sx={{
                //     marginBottom: 2,
                // }}
            >
                <Grid
                    item
                    xs={3}
                    // sm={9}
                >
                    <InputLabel
                        // shrink
                        htmlFor="bootstrap-input"
                        sx={{
                            // padding: "0 20px 0 0",
                            // backgroundColor: "red",
                            marginRight: 1,
                            paddingRight: 1,
                            fontFamily: "inherit",
                            fontSize: 16,
                            fontWeight: "500",
                            // width: "30%",
                            lineHeight: "unset",
                            transformOrigin: "unset",
                            textOverflow: "unset",
                            whiteSpace: "unset",
                            overflow: "unset",
                        }}
                    >
                        Salaires employés (net)
                    </InputLabel>
                </Grid>
                <Grid
                    item
                    xs={1.7}
                    sx={{
                        paddingInline: 0.3,
                    }}
                    // sm={9}
                >
                    <BaseTextInput
                        // id={n:ame}
                        name="salaires_employes[0]"
                        width={"15"}
                        textAlign="right"
                        // fullWidth
                        // comment={
                        //     "Nom de votre projet ou description de votre activité"
                        // }
                    />
                </Grid>
                <Grid
                    item
                    xs={1.7}
                    sx={{
                        paddingInline: 0.3,
                    }}
                    // sm={9}
                >
                    <BaseTextInput
                        name="salaires_employes[1]"
                        width={"15"}
                        textAlign="right"
                        // fullWidth
                        // comment={
                        //     "Nom de votre projet ou description de votre activité"
                        // }
                    />
                </Grid>{" "}
                <Grid
                    item
                    xs={1.7}
                    sx={{
                        paddingInline: 0.3,
                    }}
                    // sm={9}
                >
                    <BaseTextInput
                        name="salaires_employes[2]"
                        width={"15"}
                        textAlign="right"
                        // fullWidth
                        // comment={
                        //     "Nom de votre projet ou description de votre activité"
                        // }
                    />
                </Grid>
                <Grid
                    item
                    xs={1.7}
                    sx={{
                        paddingInline: 0.3,
                    }}
                    // sm={9}
                >
                    <BaseTextInput
                        name="salaires_employes[3]"
                        width={"15"}
                        textAlign="right"
                        // fullWidth
                        // comment={
                        //     "Nom de votre projet ou description de votre activité"
                        // }
                    />
                </Grid>
                <Grid
                    item
                    xs={1.7}
                    sx={{
                        paddingInline: 0.3,
                    }}
                    // sm={9}
                >
                    <BaseTextInput
                        name="salaires_employes[4]"
                        width={"15"}
                        textAlign="right"
                        // fullWidth
                        // comment={
                        //     "Nom de votre projet ou description de votre activité"
                        // }
                    />
                </Grid>
                <Grid
                    item
                    xs={3}
                    // sm={9}
                >
                    <InputLabel
                        // shrink
                        htmlFor="bootstrap-input"
                        sx={{
                            // padding: "0 20px 0 0",
                            // backgroundColor: "red",
                            marginRight: 1,
                            paddingRight: 1,
                            fontFamily: "inherit",
                            fontSize: 16,
                            fontWeight: "500",
                            // width: "30%",
                            lineHeight: "unset",
                            transformOrigin: "unset",
                            textOverflow: "unset",
                            whiteSpace: "unset",
                            overflow: "unset",
                        }}
                    >
                        Rémunération nette dirigeant(s)
                    </InputLabel>
                </Grid>
                <Grid
                    item
                    xs={1.7}
                    sx={{
                        paddingInline: 0.3,
                    }}
                    // sm={9}
                >
                    <BaseTextInput
                        // id={n:ame}
                        name="remuneration_dirigeants[0]"
                        width={"15"}
                        textAlign="right"
                        // fullWidth
                        // comment={
                        //     "Nom de votre projet ou description de votre activité"
                        // }
                    />
                </Grid>
                <Grid
                    item
                    xs={1.7}
                    sx={{
                        paddingInline: 0.3,
                    }}
                    // sm={9}
                >
                    <BaseTextInput
                        name="remuneration_dirigeants[1]"
                        width={"15"}
                        textAlign="right"
                        // fullWidth
                        // comment={
                        //     "Nom de votre projet ou description de votre activité"
                        // }
                    />
                </Grid>{" "}
                <Grid
                    item
                    xs={1.7}
                    sx={{
                        paddingInline: 0.3,
                    }}
                    // sm={9}
                >
                    <BaseTextInput
                        name="remuneration_dirigeants[2]"
                        width={"15"}
                        textAlign="right"
                        // fullWidth
                        // comment={
                        //     "Nom de votre projet ou description de votre activité"
                        // }
                    />
                </Grid>
                <Grid
                    item
                    xs={1.7}
                    sx={{
                        paddingInline: 0.3,
                    }}
                    // sm={9}
                >
                    <BaseTextInput
                        name="remuneration_dirigeants[3]"
                        width={"15"}
                        textAlign="right"
                        // fullWidth
                        // comment={
                        //     "Nom de votre projet ou description de votre activité"
                        // }
                    />
                </Grid>
                <Grid
                    item
                    xs={1.7}
                    sx={{
                        paddingInline: 0.3,
                    }}
                    // sm={9}
                >
                    <BaseTextInput
                        name="remuneration_dirigeants[5]"
                        width={"15"}
                        textAlign="right"
                        // fullWidth
                        // comment={
                        //     "Nom de votre projet ou description de votre activité"
                        // }
                    />
                </Grid>
                <Grid
                    item
                    xs={12}
                    // sm={9}
                >
                    <InlineSelectField
                        options={["Non", "Oui"]}
                        id="dir_ACCRE"
                        name="dir_ACCRE"
                        label="Le(s) dirigeant(s) bénéficient-ils de l'ACCRE ? *"
                        width="15"
                        // fullWidth
                    />
                </Grid>
            </Grid>
        </div>
    );
};

export default Page7;
