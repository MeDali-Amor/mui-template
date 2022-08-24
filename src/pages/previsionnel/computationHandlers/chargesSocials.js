import { arraySumFunction, pourcentageArrondi } from "../../utils/math";

export const chargesSocialsHandler = (
    form_juridique,
    salaires_employes,
    remuneration_dirigeants,
    dir_ACCRE,
    impots,
    totalAmortissement,
    totalChargesBancaire,
    valeurAjoutee,
    totalVenteAnnuel,
    totalServicesAnnuel
) => {
    const charges_employes = salaires_employes.map((el) =>
        !isNaN(Number(el)) ? Number(el) * 0.72 : 0
    );
    const RSI_EI = [0, 1, 2].map(
        (el) =>
            valeurAjoutee[el] -
            arraySumFunction(
                [
                    impots[el],
                    salaires_employes[el],
                    charges_employes[el],
                    totalChargesBancaire[el],
                    totalAmortissement,
                ].filter((v) => typeof Number(v) == "number" && !isNaN(v))
            )
    );
    const augmentation_remuneration_dirig = remuneration_dirigeants.map(
        (el, index) =>
            index > 0
                ? !isNaN(
                      (Number(el) -
                          Number(remuneration_dirigeants[index - 1])) /
                          Number(remuneration_dirigeants[index - 1])
                  )
                    ? pourcentageArrondi(
                          Number(el) -
                              Number(remuneration_dirigeants[index - 1]),
                          Number(remuneration_dirigeants[index - 1])
                      ) + "%"
                    : ""
                : ""
    );
    const augmentation_salaires_employes = salaires_employes.map((el, index) =>
        index > 0
            ? !isNaN(
                  (Number(el) - Number(salaires_employes[index - 1])) /
                      Number(salaires_employes[index - 1])
              )
                ? pourcentageArrondi(
                      Number(el) - Number(salaires_employes[index - 1]),
                      Number(salaires_employes[index - 1])
                  ) + "%"
                : ""
            : ""
    );
    const charges_social_dirig = determinationChargeDirig(
        remuneration_dirigeants,
        form_juridique,
        dir_ACCRE,
        RSI_EI,
        totalVenteAnnuel,
        totalServicesAnnuel
    );
    const excedentBrute = valeurAjoutee.map(
        (el, index) =>
            Number(el) -
            arraySumFunction(
                [
                    impots[index],
                    salaires_employes[index],
                    charges_employes[index],
                    remuneration_dirigeants[index],
                    charges_social_dirig[index],
                ].filter((v) => typeof Number(v) == "number" && !isNaN(v))
            ).toFixed(2)
    );
    const resultat_avant_impot = excedentBrute.map(
        (el, index) =>
            Number(el) -
            arraySumFunction(
                [totalChargesBancaire[index], totalAmortissement].filter(
                    (v) => typeof Number(v) == "number" && !isNaN(v)
                )
            ).toFixed(2)
    );
    const impot_societes =
        form_juridique === "Micro-entreprise" ||
        form_juridique === "Entreprise individuelle au réel (IR)"
            ? null
            : resultat_avant_impot.map((el, index) =>
                  Number(el) < 0
                      ? 0
                      : Number(el) > 38120
                      ? (38120 * 0.15 + (Number(el) - 38120) * 0.28).toFixed(2)
                      : (Number(el) * 0.15).toFixed(2)
              );
    const resultat_net = resultat_avant_impot.map((el, index) =>
        impot_societes ? Number(el) - Number(impot_societes[index]) : Number(el)
    );
    const chargesPersonnel = [0, 1, 2].map((el, index) =>
        arraySumFunction(
            [
                salaires_employes[index],
                charges_employes[index],
                remuneration_dirigeants[index],
                charges_social_dirig[index],
            ].filter((v) => typeof Number(v) == "number" && !isNaN(v))
        )
    );
    console.log(chargesPersonnel[0] / 12);
    return {
        charges_employes,
        charges_social_dirig,
        excedentBrute,
        resultat_avant_impot,
        impot_societes,
        chargesPersonnel,
        resultat_net,
        augmentation_remuneration_dirig,
        augmentation_salaires_employes,
    };
};

const determinationChargeDirig = (
    remu_dirig,
    fj,
    accre,
    RSI_EI,
    totalVenteAnnuel,
    totalServicesAnnuel
) => {
    if (fj === "Micro-entreprise") {
        if (accre === "Oui")
            return totalVenteAnnuel.map(
                (el, index) =>
                    Number(el) * 0.032 * (index + 1) +
                    totalServicesAnnuel[index] * 0.055 * (index + 1)
            );
        return totalVenteAnnuel.map(
            (el, index) =>
                Number(el) * 0.128 + totalServicesAnnuel[index] * 0.22
        );
    } else if (fj === "Entreprise individuelle au réel (IR)") {
        if (accre === "Oui")
            return RSI_EI.map((el, index) =>
                el * 0.32 > 1103 ? Number(el) * 0.32 : 1103
            );
        return RSI_EI.map((el, index) =>
            el * 0.3 > 1103 ? Number(el) * 0.3 : 1103
        );
    } else if (fj === "EURL (IS)" || fj === "SARL (IS)") {
        return remu_dirig.map((el, index) =>
            el * 0.45 > 1103 ? Number(el) * 0.45 : 1103
        );
    } else if (fj === "SAS (IS)" || fj === "SASU (IS)") {
        if (accre === "Oui")
            return remu_dirig.map((el, index) =>
                index === 0 ? Number(el) * 0.33 : Number(el) * 0.7
            );
        return remu_dirig.map((el, index) => Number(el) * 0.7);
    }
};
