import { arraySumFunction } from "../../utils/math";

export function planFinancement(
    immpbilisation,
    frais_stock,
    besoin_fonds_roulement,
    totalPrincipaltAnnuel,
    sommeApport,
    sommePrets,
    subventions,
    autre_financement,
    capacite_autofinancement
) {
    const total_subvention = arraySumFunction(
        subventions
            .map((el) => el.montant)
            .filter((v) => typeof Number(v) == "number" && !isNaN(v))
    );
    const immobilisations_3ans = [immpbilisation, "", ""].map((el) =>
        Number(el).toFixed(2)
    );
    const frais_stock_3ans = [frais_stock, "", ""].map((el) =>
        Number(el).toFixed(2)
    );
    const sommeApport_3ans = [sommeApport, "", ""].map((el) =>
        Number(el).toFixed(2)
    );
    const emprunt_3ans = [sommePrets, "", ""].map((el) =>
        Number(el).toFixed(2)
    );
    const subventions_3ans = [total_subvention, "", ""].map((el) =>
        Number(el).toFixed(2)
    );
    const autre_financement_3ans = [autre_financement.montant, "", ""].map(
        (el) => Number(el).toFixed(2)
    );
    const variation_besoin_fonds_roulement = besoin_fonds_roulement
        .map((el, index) => {
            if (index === 0) return Number(el);
            return Number(el) - Number(besoin_fonds_roulement[index - 1]);
        })
        .map((el) => Number(el).toFixed(2));
    const total_besoin_financement = variation_besoin_fonds_roulement
        .map((el, index) =>
            arraySumFunction(
                [
                    el,
                    immobilisations_3ans[index],
                    frais_stock_3ans[index],
                    totalPrincipaltAnnuel[index],
                ].filter((v) => typeof Number(v) == "number" && !isNaN(v))
            )
        )
        .map((el) => Number(el).toFixed(2));
    const total_resources = capacite_autofinancement
        .map((el, index) =>
            arraySumFunction(
                [
                    el,
                    sommeApport_3ans[index],
                    emprunt_3ans[index],
                    subventions_3ans[index],
                    autre_financement_3ans[index],
                ].filter((v) => typeof Number(v) == "number" && !isNaN(v))
            )
        )
        .map((el) => Number(el).toFixed(2));
    const variation_tresorie = total_resources
        .map((el, index) =>
            arraySumFunction(
                [el, total_besoin_financement[index] * -1].filter(
                    (v) => typeof Number(v) == "number" && !isNaN(v)
                )
            )
        )
        .map((el) => Number(el).toFixed(2));
    const excedent_tresorie = variation_tresorie.map((elem, index) =>
        variation_tresorie
            .slice(0, index + 1)
            .reduce((a, b) => Number(a) + Number(b))
    );
    //     map((el, index) => {
    //     if (index === 0) return Number(el);
    //     return Number(el) + Number(variation_tresorie[index - 1]);
    // });
    return {
        immobilisations_3ans,
        frais_stock_3ans,
        sommeApport_3ans,
        emprunt_3ans,
        subventions_3ans,
        autre_financement_3ans,
        variation_besoin_fonds_roulement,
        total_besoin_financement,
        total_resources,
        variation_tresorie,
        excedent_tresorie,
    };
}
