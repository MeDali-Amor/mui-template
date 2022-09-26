import {
    Box,
    Stack,
    Typography,
    Grid,
    TableContainer,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
} from "@mui/material";
import {
    financementHandler,
    investissmentHandler,
} from "../computationHandlers/Investissement";
import A4SectionHeader from "./components/A4SectionHeader";
import PageIntro from "./components/PageIntro";

const PagePdf1 = ({ data }) => {
    const {
        tableDataIncorporelles,
        tableDataCorporelles,
        totalIncorp,
        totalCorp,
        totalBesoin,
        frais_stock,
        tresorie_de_depart,
    } = investissmentHandler(data.besoin_demarage);

    const {
        apport_personnel,
        apports_en_nature,
        prets,
        sommePrets,
        sommeApport,
        subventions,
        autre_financement,
        financement_total,
    } = financementHandler(data.financement_demarage);
    return (
        <Box
            sx={{
                width: "21cm",
                height: "29cm",
                border: "1px solid black",
                padding: "1.2cm 1cm",
                position: "relative",
            }}
        >
            <A4SectionHeader title={"Investissements et financements"} />
            <PageIntro
                nom_projet={data?.nom_projet}
                nom={data?.nom}
                prenom={data?.prenom}
            />
            <Box
                sx={{
                    width: "100%",
                    // height: "84%",
                    border: "1px solid black",
                    // padding: 2,
                }}
            >
                <Table>
                    <TableHead
                        sx={{
                            backgroundColor: "lightgray",
                        }}
                    >
                        <TableRow>
                            <TableCell
                                sx={{
                                    width: "85%",
                                    paddingInline: 1,
                                    paddingBlock: 0,
                                    borderBottom: "1px solid black",
                                }}
                            >
                                INVESTISSEMENTS
                            </TableCell>
                            <TableCell
                                sx={{
                                    textAlign: "center",
                                    width: "15%",
                                    paddingInline: 1,
                                    paddingBlock: 0,
                                    borderLeft: "1px solid black",
                                    borderBottom: "1px solid black",
                                }}
                            >
                                Montant € hors taxes
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow
                            sx={{
                                "& td": {
                                    borderRight: 0,
                                    borderBlock: 0,
                                },
                            }}
                        >
                            <TableCell
                                sx={{
                                    width: "85%",
                                    paddingInline: 1,
                                    paddingBlock: 0,
                                    borderBottom: "1px solid black",
                                    fontWeight: "600",
                                }}
                            ></TableCell>
                            <TableCell
                                sx={{
                                    paddingBlock: 1,
                                    textAlign: "center",
                                    width: "15%",
                                    paddingInline: 1,
                                    borderLeft: "1px solid black",
                                }}
                            ></TableCell>
                        </TableRow>
                        <TableRow
                            sx={{
                                "& td": {
                                    borderRight: 0,
                                    borderBlock: 0,
                                },
                            }}
                        >
                            <TableCell
                                sx={{
                                    width: "85%",
                                    paddingInline: 1,
                                    paddingBlock: 0,
                                    borderBottom: "1px solid black",
                                    fontWeight: "600",
                                }}
                            >
                                Immobilisations incorporelles
                            </TableCell>
                            <TableCell
                                sx={{
                                    textAlign: "center",
                                    width: "15%",
                                    paddingInline: 1,
                                    paddingBlock: 0,
                                    borderLeft: "1px solid black",
                                    fontWeight: "600",
                                }}
                            >
                                {new Intl.NumberFormat("fr-FR").format(
                                    Number(totalIncorp)
                                )}
                            </TableCell>
                        </TableRow>
                        {tableDataIncorporelles.map((el) => (
                            <TableRow
                                sx={{
                                    "& td": {
                                        borderRight: 0,
                                        borderBlock: 0,
                                    },
                                }}
                            >
                                <TableCell
                                    sx={{
                                        width: "85%",
                                        paddingInline: 1,
                                        paddingBlock: 0,
                                        // borderBottom: "1px solid black",
                                    }}
                                >
                                    {el.label}
                                </TableCell>
                                <TableCell
                                    sx={{
                                        textAlign: "center",
                                        width: "15%",
                                        paddingInline: 1,
                                        paddingBlock: 0,
                                        borderLeft: "1px solid black",
                                        // borderBottom: "1px solid black",
                                    }}
                                >
                                    {el.value}
                                </TableCell>
                            </TableRow>
                        ))}
                        <TableRow
                            sx={{
                                "& td": {
                                    borderRight: 0,
                                    borderBlock: 0,
                                },
                            }}
                        >
                            <TableCell
                                sx={{
                                    width: "85%",
                                    paddingInline: 1,
                                    paddingBlock: 0,
                                    borderBottom: "1px solid black",
                                    fontWeight: "600",
                                }}
                            >
                                Immobilisations corporelles
                            </TableCell>
                            <TableCell
                                sx={{
                                    textAlign: "center",
                                    width: "15%",
                                    paddingInline: 1,
                                    paddingBlock: 0,
                                    borderLeft: "1px solid black",
                                    fontWeight: "600",
                                }}
                            >
                                {totalCorp || 0}
                            </TableCell>
                        </TableRow>
                        {tableDataCorporelles.map((el) => (
                            <TableRow
                                sx={{
                                    "& td": {
                                        borderRight: 0,
                                        borderBlock: 0,
                                    },
                                }}
                            >
                                <TableCell
                                    sx={{
                                        width: "85%",
                                        paddingInline: 1,
                                        paddingBlock: 0,
                                        // borderBottom: "1px solid black",
                                    }}
                                >
                                    {el.label}
                                </TableCell>
                                <TableCell
                                    sx={{
                                        textAlign: "center",
                                        width: "15%",
                                        paddingInline: 1,
                                        paddingBlock: 0,
                                        borderLeft: "1px solid black",
                                        // borderBottom: "1px solid black",
                                    }}
                                >
                                    {el.value}
                                </TableCell>
                            </TableRow>
                        ))}
                        <TableRow
                            sx={{
                                "& td": {
                                    borderRight: 0,
                                    borderBlock: 0,
                                },
                            }}
                        >
                            <TableCell
                                sx={{
                                    width: "85%",
                                    paddingInline: 1,
                                    paddingBlock: 0,
                                    borderBottom: "1px solid black",
                                    fontWeight: "600",
                                }}
                            ></TableCell>
                            <TableCell
                                sx={{
                                    paddingBlock: 1,
                                    textAlign: "center",
                                    width: "15%",
                                    paddingInline: 1,
                                    borderLeft: "1px solid black",
                                }}
                            ></TableCell>
                        </TableRow>
                        <TableRow
                            sx={{
                                "& td": {
                                    borderRight: 0,
                                    borderBlock: 0,
                                },
                            }}
                        >
                            <TableCell
                                sx={{
                                    width: "85%",
                                    paddingInline: 1,
                                    paddingBlock: 0,
                                    borderBottom: "1px solid black",
                                    fontWeight: "600",
                                }}
                            >
                                Stock de matières et produits
                            </TableCell>
                            <TableCell
                                sx={{
                                    textAlign: "center",
                                    width: "15%",
                                    paddingInline: 1,
                                    paddingBlock: 0,
                                    borderLeft: "1px solid black",
                                    fontWeight: "600",
                                }}
                            >
                                {frais_stock || ""}
                            </TableCell>
                        </TableRow>
                        <TableRow
                            sx={{
                                "& td": {
                                    borderRight: 0,
                                    borderBlock: 0,
                                },
                            }}
                        >
                            <TableCell
                                sx={{
                                    width: "85%",
                                    paddingInline: 1,
                                    paddingBlock: 0,
                                    borderBottom: "1px solid black",
                                    fontWeight: "600",
                                }}
                            >
                                Trésorerie de départ
                            </TableCell>
                            <TableCell
                                sx={{
                                    textAlign: "center",
                                    width: "15%",
                                    paddingInline: 1,
                                    paddingBlock: 0,
                                    borderLeft: "1px solid black",
                                    fontWeight: "600",
                                }}
                            >
                                {tresorie_de_depart || ""}
                            </TableCell>
                        </TableRow>
                        <TableRow
                            sx={{
                                "& td": {
                                    borderRight: 0,
                                    borderBlock: 0,
                                },
                            }}
                        >
                            <TableCell
                                sx={{
                                    textAlign: "right",
                                    width: "85%",
                                    paddingInline: 1,
                                    paddingBlock: 0,
                                    borderBottom: "1px solid black",
                                    fontWeight: "600",
                                }}
                            >
                                TOTAL BESOINS
                            </TableCell>
                            <TableCell
                                sx={{
                                    textAlign: "center",
                                    width: "15%",
                                    paddingInline: 1,
                                    paddingBlock: 0,
                                    borderLeft: "1px solid black",
                                    fontWeight: "600",
                                }}
                            >
                                {/* {data.besoin_demarage.total || ""} */}
                                {totalBesoin || ""}
                            </TableCell>
                        </TableRow>
                        <TableRow
                            sx={{
                                "& td": {
                                    borderRight: 0,
                                    borderBlock: 0,
                                },
                            }}
                        >
                            <TableCell
                                sx={{
                                    width: "85%",
                                    paddingInline: 1,
                                    paddingBlock: 0,
                                    borderBottom: "1px solid black",
                                    fontWeight: "600",
                                }}
                            ></TableCell>
                            <TableCell
                                sx={{
                                    paddingBlock: 1,
                                    textAlign: "center",
                                    width: "15%",
                                    paddingInline: 1,
                                    borderLeft: "1px solid black",
                                }}
                            ></TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
                <Table>
                    <TableHead
                        sx={{
                            backgroundColor: "lightgray",
                        }}
                    >
                        <TableRow>
                            <TableCell
                                sx={{
                                    width: "85%",
                                    paddingInline: 1,
                                    paddingBlock: 0,
                                    borderBottom: "1px solid black",
                                    borderTop: "1px solid black",
                                }}
                            >
                                FINANCEMENT DES INVESTISSEMENTS
                            </TableCell>
                            <TableCell
                                sx={{
                                    textAlign: "center",
                                    width: "15%",
                                    paddingInline: 1,
                                    paddingBlock: 0,
                                    borderLeft: "1px solid black",
                                    borderBottom: "1px solid black",
                                    borderTop: "1px solid black",
                                }}
                            >
                                Montant € hors taxes
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow
                            sx={{
                                "& td": {
                                    borderRight: 0,
                                    borderBlock: 0,
                                },
                            }}
                        >
                            <TableCell
                                sx={{
                                    width: "85%",
                                    paddingInline: 1,
                                    paddingBlock: 0,
                                    borderBottom: "1px solid black",
                                    fontWeight: "600",
                                }}
                            ></TableCell>
                            <TableCell
                                sx={{
                                    paddingBlock: 1,
                                    textAlign: "center",
                                    width: "15%",
                                    paddingInline: 1,
                                    borderLeft: "1px solid black",
                                }}
                            ></TableCell>
                        </TableRow>
                        <TableRow
                            sx={{
                                "& td": {
                                    borderRight: 0,
                                    borderBlock: 0,
                                },
                            }}
                        >
                            <TableCell
                                sx={{
                                    width: "85%",
                                    paddingInline: 1,
                                    paddingBlock: 0,
                                    borderBottom: "1px solid black",
                                    fontWeight: "600",
                                }}
                            >
                                Apport personnel
                            </TableCell>
                            <TableCell
                                sx={{
                                    textAlign: "center",
                                    width: "15%",
                                    paddingInline: 1,
                                    paddingBlock: 0,
                                    borderLeft: "1px solid black",
                                    fontWeight: "600",
                                }}
                            >
                                {sommeApport || ""}
                            </TableCell>
                        </TableRow>
                        <TableRow
                            sx={{
                                "& td": {
                                    borderRight: 0,
                                    borderBlock: 0,
                                },
                            }}
                        >
                            <TableCell
                                sx={{
                                    width: "85%",
                                    paddingInline: 1,
                                    paddingBlock: 0,
                                    // borderBottom: "1px solid black",
                                }}
                            >
                                Apport personnel ou familial
                            </TableCell>
                            <TableCell
                                sx={{
                                    textAlign: "center",
                                    width: "15%",
                                    paddingInline: 1,
                                    paddingBlock: 0,
                                    borderLeft: "1px solid black",
                                    // borderBottom: "1px solid black",
                                }}
                            >
                                {apport_personnel || ""}
                            </TableCell>
                        </TableRow>
                        <TableRow
                            sx={{
                                "& td": {
                                    borderRight: 0,
                                    borderBlock: 0,
                                },
                            }}
                        >
                            <TableCell
                                sx={{
                                    width: "85%",
                                    paddingInline: 1,
                                    paddingBlock: 0,
                                    // borderBottom: "1px solid black",
                                }}
                            >
                                Apports en nature (en valeur)
                            </TableCell>
                            <TableCell
                                sx={{
                                    textAlign: "center",
                                    width: "15%",
                                    paddingInline: 1,
                                    paddingBlock: 0,
                                    borderLeft: "1px solid black",
                                    // borderBottom: "1px solid black",
                                }}
                            >
                                {apports_en_nature || ""}
                            </TableCell>
                        </TableRow>
                        <TableRow
                            sx={{
                                "& td": {
                                    borderRight: 0,
                                    borderBlock: 0,
                                },
                            }}
                        >
                            <TableCell
                                sx={{
                                    width: "85%",
                                    paddingInline: 1,
                                    paddingBlock: 0,
                                    display: "flex",
                                    // borderBottom: "1px solid black",
                                    // fontWeight: "600",
                                }}
                            >
                                <Typography
                                    fontWeight="600"
                                    fontSize={14}
                                    width={"60%"}
                                >
                                    Emprunt
                                </Typography>
                                <Typography
                                    fontWeight="300"
                                    fontSize={13}
                                    fontStyle="italic"
                                    width={"20%"}
                                >
                                    taux
                                </Typography>
                                <Typography
                                    fontWeight="300"
                                    fontSize={13}
                                    fontStyle="italic"
                                    width={"20%"}
                                >
                                    durée en mois
                                </Typography>
                            </TableCell>
                            <TableCell
                                sx={{
                                    textAlign: "center",
                                    width: "15%",
                                    paddingInline: 1,
                                    paddingBlock: 0,
                                    borderLeft: "1px solid black",
                                    fontWeight: "600",
                                }}
                            >
                                {sommePrets || ""}{" "}
                            </TableCell>
                        </TableRow>
                        {prets.map((pret, index) => (
                            <TableRow
                                sx={{
                                    "& td": {
                                        borderRight: 0,
                                        borderBlock: 0,
                                    },
                                }}
                            >
                                <TableCell
                                    sx={{
                                        width: "85%",
                                        paddingInline: 1,
                                        display: "flex",
                                        paddingBlock: 0,
                                        // borderBottom: "1px solid black",
                                    }}
                                >
                                    {" "}
                                    <Typography
                                        fontWeight="600"
                                        fontSize={14}
                                        width={"60%"}
                                    >
                                        {pret.nom_banque
                                            ? `Prêt n°${index + 1} (${
                                                  pret.nom_banque
                                              })`
                                            : `Prêt n°${
                                                  index + 1
                                              } (nom de la banque)`}
                                    </Typography>
                                    <Typography
                                        fontWeight="400"
                                        fontSize={14}
                                        fontStyle="italic"
                                        width={"20%"}
                                    >
                                        {pret?.taux || ""}
                                    </Typography>
                                    <Typography
                                        fontWeight="400"
                                        fontSize={14}
                                        fontStyle="italic"
                                        width={"20%"}
                                    >
                                        {pret?.duree_en_mois || ""}
                                    </Typography>
                                </TableCell>
                                <TableCell
                                    sx={{
                                        textAlign: "center",
                                        width: "15%",
                                        paddingInline: 1,
                                        paddingBlock: 0,
                                        borderLeft: "1px solid black",
                                        // borderBottom: "1px solid black",
                                    }}
                                >
                                    {pret.montant || ""}
                                </TableCell>
                            </TableRow>
                        ))}
                        {subventions.map((subvention, index) => (
                            <TableRow
                                sx={{
                                    "& td": {
                                        borderRight: 0,
                                        borderBlock: 0,
                                    },
                                }}
                            >
                                <TableCell
                                    sx={{
                                        width: "85%",
                                        paddingInline: 1,
                                        paddingBlock: 0,
                                        borderBottom: "1px solid black",
                                        fontWeight: "600",
                                    }}
                                >
                                    {subvention.label
                                        ? `Subvention n°${index} (${subvention.label})`
                                        : `Subvention n°${index})`}
                                </TableCell>
                                <TableCell
                                    sx={{
                                        textAlign: "center",
                                        width: "15%",
                                        paddingInline: 1,
                                        paddingBlock: 0,
                                        borderLeft: "1px solid black",
                                        fontWeight: "600",
                                    }}
                                >
                                    {subvention.montant || ""}
                                </TableCell>
                            </TableRow>
                        ))}
                        <TableRow
                            sx={{
                                "& td": {
                                    borderRight: 0,
                                    borderBlock: 0,
                                },
                            }}
                        >
                            <TableCell
                                sx={{
                                    width: "85%",
                                    paddingInline: 1,
                                    paddingBlock: 0,
                                    borderBottom: "1px solid black",
                                    fontWeight: "600",
                                }}
                            >
                                {autre_financement.label
                                    ? `Autre financement (${autre_financement.label})`
                                    : "Autre financement (libellé)"}
                            </TableCell>
                            <TableCell
                                sx={{
                                    textAlign: "center",
                                    width: "15%",
                                    paddingInline: 1,
                                    paddingBlock: 0,
                                    borderLeft: "1px solid black",
                                    fontWeight: "600",
                                }}
                            >
                                {autre_financement.montant || ""}
                            </TableCell>
                        </TableRow>
                        <TableRow
                            sx={{
                                "& td": {
                                    borderRight: 0,
                                    borderBlock: 0,
                                },
                            }}
                        >
                            <TableCell
                                sx={{
                                    textAlign: "right",
                                    width: "85%",
                                    paddingInline: 1,
                                    paddingBlock: 0,
                                    borderBottom: "1px solid black",
                                    fontWeight: "600",
                                }}
                            >
                                TOTAL RESOURCES
                            </TableCell>
                            <TableCell
                                sx={{
                                    textAlign: "center",
                                    width: "15%",
                                    paddingInline: 1,
                                    paddingBlock: 0,
                                    borderLeft: "1px solid black",
                                    fontWeight: "600",
                                }}
                            >
                                {financement_total || ""}
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </Box>
            <Box sx={{ position: "absolute", bottom: "1.25%", right: "5%" }}>
                2
            </Box>
        </Box>
    );
};

export default PagePdf1;
