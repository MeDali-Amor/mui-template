import { Button, Grid, Paper } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useState } from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

// Styles
// const Navbar_Mobile = 64;
// const Navbar_Desktop = 92;

const Layout = styled("div")({
    display: "flex",
    minHeight: "100%",
    overflow: "hidden",
});

const MainStyle = styled("div")(({ theme }) => ({
    flexGrow: 1,
    overflow: "auto",
    minHeight: "100%",
    paddingTop: theme.spacing(10),
    paddingBottom: theme.spacing(10),
}));
const Item = styled("div")(({ theme }) => ({
    // backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    // ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    // color: theme.palette.text.secondary,
}));

const DashboardLayout = () => {
    const [open, setOpen] = useState(false);
    return (
        <Layout>
            <Navbar onOpenSidebar={() => setOpen(true)} />
            <Sidebar
                isSidebarOpen={open}
                onSidebarClose={() => setOpen(false)}
            />
            <MainStyle>
                <Grid
                    container
                    rowSpacing={1}
                    columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                >
                    <Grid item xs={4}>
                        <Item>
                            <Button variant="contained">primary</Button>
                        </Item>
                    </Grid>
                    <Grid item xs={4}>
                        <Item>
                            <Button variant="outlined">primary</Button>
                        </Item>
                    </Grid>
                    <Grid item xs={4}>
                        <Item>
                            {" "}
                            <Button variant="text">primary</Button>
                        </Item>
                    </Grid>
                    <Grid item xs={4}>
                        <Item>
                            <Button variant="contained" color="secondary">
                                secondary
                            </Button>
                        </Item>
                    </Grid>
                    <Grid item xs={4}>
                        <Item>
                            <Button variant="outlined" color="secondary">
                                secondary
                            </Button>
                        </Item>
                    </Grid>
                    <Grid item xs={4}>
                        <Item>
                            {" "}
                            <Button variant="text" color="secondary">
                                secondary
                            </Button>
                        </Item>
                    </Grid>
                    <Grid item xs={4}>
                        <Item>
                            <Button variant="contained" color="info">
                                info
                            </Button>
                        </Item>
                    </Grid>
                    <Grid item xs={4}>
                        <Item>
                            <Button variant="outlined" color="info">
                                info
                            </Button>
                        </Item>
                    </Grid>
                    <Grid item xs={4}>
                        <Item>
                            {" "}
                            <Button variant="text" color="info">
                                info
                            </Button>
                        </Item>
                    </Grid>
                    <Grid item xs={4}>
                        <Item>
                            <Button variant="contained" color="success">
                                success
                            </Button>
                        </Item>
                    </Grid>
                    <Grid item xs={4}>
                        <Item>
                            <Button variant="outlined" color="success">
                                success
                            </Button>
                        </Item>
                    </Grid>
                    <Grid item xs={4}>
                        <Item>
                            {" "}
                            <Button variant="text" color="success">
                                success
                            </Button>
                        </Item>
                    </Grid>
                    <Grid item xs={4}>
                        <Item>
                            <Button variant="contained" color="warning">
                                warning
                            </Button>
                        </Item>
                    </Grid>
                    <Grid item xs={4}>
                        <Item>
                            <Button variant="outlined" color="warning">
                                warning
                            </Button>
                        </Item>
                    </Grid>
                    <Grid item xs={4}>
                        <Item>
                            {" "}
                            <Button variant="text" color="warning">
                                warning
                            </Button>
                        </Item>
                    </Grid>
                    <Grid item xs={4}>
                        <Item>
                            <Button variant="contained" color="error">
                                error
                            </Button>
                        </Item>
                    </Grid>
                    <Grid item xs={4}>
                        <Item>
                            <Button variant="outlined" color="error">
                                error
                            </Button>
                        </Item>
                    </Grid>
                    <Grid item xs={4}>
                        <Item>
                            {" "}
                            <Button variant="text" color="error">
                                error
                            </Button>
                        </Item>
                    </Grid>
                </Grid>
            </MainStyle>
        </Layout>
    );
};

export default DashboardLayout;
