import { arraySumFunction, pourcentageArrondi } from "../../utils/math";

export function rentabiliteEconomiqueHandler(
    produitsExploit,
    chargeExploit,
    margeBrute,
    totalChargesExternes,
    impots,
    totalAmortissement,
    chargesPersonnel,
    totalChargesBancaire,
    resultat_avant_impot
) {
    const taux_magrge_cout = margeBrute.map((el, index) =>
        pourcentageArrondi(el, produitsExploit[index])
    );
    // .map((el) => el && el + "%");
    const couts_fixes = [0, 1, 2]
        .map((el, index) =>
            arraySumFunction(
                [
                    totalChargesExternes[index],
                    impots[index],
                    chargesPersonnel[index],
                    totalChargesBancaire[index],
                    totalAmortissement,
                ].filter((v) => typeof Number(v) == "number" && !isNaN(v))
            )
        )
        .map((el) => Number(el).toFixed(2));

    const seuil_rentabilite = couts_fixes
        .map((el, index) => {
            if (
                typeof Number(el) == "number" &&
                !isNaN(Number(el)) &&
                typeof Number(taux_magrge_cout[index]) == "number" &&
                !isNaN(Number(taux_magrge_cout[index])) &&
                Number(taux_magrge_cout[index]) !== 0
            ) {
                console.log(Number(el), Number(taux_magrge_cout[index]));
                return (Number(el) / Number(taux_magrge_cout[index])) * 100;
            }
            return 0;
        })
        .map((el) => Number(el).toFixed(2));
    const excedent_insuffisence = seuil_rentabilite
        .map((el, index) => Number(produitsExploit[index]) - Number(el))
        .map((el) => Number(el).toFixed(2));
    return {
        taux_magrge_cout,
        couts_fixes,
        total_charges: [0, 1, 2]
            .map((el, index) =>
                arraySumFunction(
                    [couts_fixes[index], chargeExploit[index]].filter(
                        (v) => typeof Number(v) == "number" && !isNaN(v)
                    )
                )
            )
            .map((el) => Number(el).toFixed(2)),
        seuil_rentabilite,
        excedent_insuffisence,
        point_mort_chiffres_affaires_jour: seuil_rentabilite
            .map((el, index) => Number(el) / 250)
            .map((el) => Number(el).toFixed(2)),
    };
}
export function besoinFondsRoulementHandler(
    produitsExploit,
    chargeExploit,
    duree_credits_clients,
    duree_dettes_fournisseurs
) {
    let volume_credit_client = produitsExploit
        .map((el) => (Number(el) / 365) * Number(duree_credits_clients))
        .map((el) => Number(el).toFixed(2));
    let volume_dettes_fournisseurs = chargeExploit
        .map((el) => (Number(el) / 365) * Number(duree_dettes_fournisseurs))
        .map((el) => Number(el).toFixed(2));
    const besoin_fonds_roulement = volume_credit_client
        .map((el, index) => Number(el) - volume_dettes_fournisseurs[index])
        .map((el) => Number(el).toFixed(2));

    return {
        volume_credit_client,
        volume_dettes_fournisseurs,
        besoin_fonds_roulement,
    };
}
