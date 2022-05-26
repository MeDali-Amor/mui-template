import {
    Button,
    Grid,
    styled,
    Typography,
    useTheme,
    Skeleton,
} from "@mui/material";

const ButtonContainerFloatRight = styled("div")(({ theme }) => ({
    paddingInline: theme.spacing(8),
    // paddingBlock: theme.spacing(16),
    paddingTop: "16px",
    float: "right",
}));

const FormSkeleton = () => {
    const theme = useTheme();
    return (
        <>
            <Grid sx={{ py: 2, px: 8 }}>
                <Skeleton
                    // sx={{ bgcolor: "grey.900" }}
                    variant="text"
                    width={210}
                    height={45}
                />
            </Grid>
            <Grid
                rowSpacing={5}
                columnSpacing={6}
                container
                sx={{ py: 2, px: 8 }}
            >
                <Grid item xs={12} sm={6}>
                    <Skeleton
                        sx={{ borderRadius: 1 }}
                        variant="rectangular"
                        // width={210}
                        height={50}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Skeleton
                        // sx={{ bgcolor: "grey.900" }}
                        variant="rectangular"
                        sx={{ borderRadius: 1 }}
                        // width={210}
                        height={50}
                    />
                </Grid>
            </Grid>
            <Grid sx={{ py: 2, px: 8 }}>
                <Skeleton
                    // sx={{ bgcolor: "grey.900" }}
                    variant="text"
                    width={210}
                    height={45}
                />
            </Grid>
            <Grid
                rowSpacing={5}
                columnSpacing={6}
                container
                sx={{ py: 2, px: 8 }}
            >
                <Grid item xs={12} sm={6}>
                    <Skeleton
                        // sx={{ bgcolor: "grey.900" }}
                        variant="rectangular"
                        sx={{ borderRadius: 1 }}
                        // width={210}
                        height={50}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Skeleton
                        // sx={{ bgcolor: "grey.900" }}
                        variant="rectangular"
                        sx={{ borderRadius: 1 }}
                        // width={210}
                        height={50}
                    />
                </Grid>
            </Grid>
            <Grid sx={{ py: 2, px: 8 }}>
                <Skeleton
                    // sx={{ bgcolor: "grey.900" }}
                    variant="text"
                    width={210}
                    height={45}
                />
            </Grid>
            <Grid
                rowSpacing={5}
                columnSpacing={6}
                container
                sx={{ py: 2, px: 8 }}
            >
                <Grid item xs={12} sm={12}>
                    <Skeleton
                        // sx={{ bgcolor: "grey.900" }}
                        variant="rectangular"
                        sx={{ borderRadius: 1 }}
                        // width={210}
                        height={50}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Skeleton
                        // sx={{ bgcolor: "grey.900" }}
                        variant="rectangular"
                        sx={{ borderRadius: 1 }}
                        // width={210}
                        height={50}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Skeleton
                        // sx={{ bgcolor: "grey.900" }}
                        variant="rectangular"
                        sx={{ borderRadius: 1 }}
                        // width={210}
                        height={50}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Skeleton
                        // sx={{ bgcolor: "grey.900" }}
                        variant="rectangular"
                        sx={{ borderRadius: 1 }}
                        // width={210}
                        height={50}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Skeleton
                        // sx={{ bgcolor: "grey.900" }}
                        variant="rectangular"
                        sx={{ borderRadius: 1 }}
                        // width={210}
                        height={50}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Skeleton
                        // sx={{ bgcolor: "grey.900" }}
                        variant="rectangular"
                        sx={{ borderRadius: 1 }}
                        // width={210}
                        height={50}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Skeleton
                        // sx={{ bgcolor: "grey.900" }}
                        variant="rectangular"
                        sx={{ borderRadius: 1 }}
                        // width={210}
                        height={50}
                    />
                </Grid>
            </Grid>
            <Grid rowSpacing={5} columnSpacing={6} sx={{ py: 2, px: 8 }}>
                <Skeleton
                    // sx={{ bgcolor: "grey.900" }}
                    variant="text"
                    width={210}
                    height={45}
                />
            </Grid>
            <Grid
                rowSpacing={5}
                columnSpacing={6}
                container
                sx={{ py: 2, px: 8 }}
            >
                <Grid item xs={12} sm={2}>
                    <Skeleton
                        // sx={{ bgcolor: "grey.900" }}
                        variant="rectangular"
                        sx={{ borderRadius: 1 }}
                        // width={210}
                        height={50}
                    />
                </Grid>
                <Grid item xs={12} sm={5}>
                    <Skeleton
                        // sx={{ bgcolor: "grey.900" }}
                        variant="rectangular"
                        sx={{ borderRadius: 1 }}
                        // width={210}
                        height={50}
                    />
                </Grid>
                <Grid item xs={12} sm={5}>
                    <Skeleton
                        // sx={{ bgcolor: "grey.900" }}
                        variant="rectangular"
                        sx={{ borderRadius: 1 }}
                        // width={210}
                        height={50}
                    />
                </Grid>
            </Grid>
            <Grid rowSpacing={5} columnSpacing={6} sx={{ py: 2, px: 8 }}>
                <Skeleton
                    // sx={{ bgcolor: "grey.900" }}
                    variant="text"
                    width={210}
                    height={45}
                />
            </Grid>
            <Grid
                rowSpacing={5}
                columnSpacing={6}
                container
                sx={{ py: 2, px: 8 }}
            >
                <Grid item xs={12} sm={4}>
                    <Skeleton
                        // sx={{ bgcolor: "grey.900" }}
                        variant="rectangular"
                        sx={{ borderRadius: 1 }}
                        // width={210}
                        height={50}
                    />
                </Grid>{" "}
                <Grid item xs={12} sm={4}>
                    <Skeleton
                        // sx={{ bgcolor: "grey.900" }}
                        variant="rectangular"
                        sx={{ borderRadius: 1 }}
                        // width={210}
                        height={50}
                    />
                </Grid>{" "}
                <Grid item xs={12} sm={4}>
                    <Skeleton
                        // sx={{ bgcolor: "grey.900" }}
                        variant="rectangular"
                        sx={{ borderRadius: 1 }}
                        // width={210}
                        height={50}
                    />
                </Grid>
            </Grid>
        </>
    );
};

export default FormSkeleton;
