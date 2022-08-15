export const chiffresAffairesHandler = (
    chiffres_affaire,
    pourcentage_vente_cout_achat
) => {
    function tauxAugmentation(a, b) {
        if (
            typeof Number(a) == "number" &&
            !isNaN(Number(a)) &&
            typeof Number(b) == "number" &&
            !isNaN(Number(b))
        )
            return (Number(a) / 100) * Number(b) + Number(a);
        return 0;
    }
    function pourcentage(a, b) {
        if (
            typeof Number(a) == "number" &&
            !isNaN(Number(a)) &&
            typeof Number(b) == "number" &&
            !isNaN(Number(b))
        )
            return (Number(a) / 100) * Number(b);
        return 0;
    }

    const totalVenteAnnuel = [
        chiffres_affaire.total_vente,
        tauxAugmentation(
            chiffres_affaire.total_vente,
            chiffres_affaire.augmentation_vente1
        ),
        tauxAugmentation(
            tauxAugmentation(
                chiffres_affaire.total_vente,
                chiffres_affaire.augmentation_vente1
            ),
            chiffres_affaire.augmentation_vente2
        ),
    ];
    const totalServicesAnnuel = [
        chiffres_affaire.total_service,
        tauxAugmentation(
            chiffres_affaire.total_service,
            chiffres_affaire.augmentation_services1
        ),
        tauxAugmentation(
            tauxAugmentation(
                chiffres_affaire.total_service,
                chiffres_affaire.augmentation_services1
            ),
            chiffres_affaire.augmentation_services2
        ),
    ];
    const chargeExploit = [
        pourcentage(totalVenteAnnuel[1], pourcentage_vente_cout_achat),
        pourcentage(totalVenteAnnuel[2], pourcentage_vente_cout_achat),
        pourcentage(totalVenteAnnuel[3], pourcentage_vente_cout_achat),
    ];

    // const totalVenteAn1 = chiffres_affaire.total_vente;

    // const totalVenteAn2 = tauxAugmentation(
    //     totalVenteAn1,
    //     chiffres_affaire.augmentation_vente1
    // );
    // const totalVenteAn3 = tauxAugmentation(
    //     totalVenteAn2,
    //     chiffres_affaire.augmentation_vente2
    // );
    return {
        totalVenteAnnuel,
        totalServicesAnnuel,
        chargeExploit,
    };
};
