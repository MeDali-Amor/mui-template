export function soldesGestionHandler(
    produitsExploit,
    chargeExploit,
    margeBrute,
    totalChargesExternes,
    totalChargesBancaire,
    valeurAjoutee,
    impots,
    chargesPersonnel,
    excedentBrute,
    totalAmortissement,
    resultat_avant_impot,
    resultat_net,
    totalPrincipaltAnnuel
) {
    const pourcentageArrondi = (a, b) => {
        if (
            typeof Number(a) == "number" &&
            !isNaN(Number(a)) &&
            typeof Number(b) == "number" &&
            !isNaN(Number(b)) &&
            Number(b) !== 0
        )
            return Math.round((Number(a) / Number(b)) * 100);
        return 0;
    };
    const resultat_exploitation = excedentBrute
        .map((el) => Number(el) - totalAmortissement)
        .map((el) => Number(el).toFixed(2));
    const capacite_autofinancement = resultat_net
        .map((el) => Number(el) + totalAmortissement)
        .map((el) => Number(el).toFixed(2));

    const autofinancement_net = capacite_autofinancement
        .map((el, index) => Number(el) - totalPrincipaltAnnuel[index])
        .map((el) => Number(el).toFixed(2));

    return {
        resultat_exploitation,
        capacite_autofinancement,
        autofinancement_net,
        chiffres_affaire_pourcentage: produitsExploit.map((el, index) =>
            pourcentageArrondi(el, produitsExploit[index])
        ),
        achats_consommes_pourcentage: chargeExploit.map((el, index) =>
            pourcentageArrondi(el, produitsExploit[index])
        ),
        marge_global_pourcentage: margeBrute.map((el, index) =>
            pourcentageArrondi(el, produitsExploit[index])
        ),
        charges_externes_pourcentage: totalChargesExternes.map((el, index) =>
            pourcentageArrondi(el, produitsExploit[index])
        ),
        valeur_ajoutee_pourcentage: valeurAjoutee.map((el, index) =>
            pourcentageArrondi(el, produitsExploit[index])
        ),
        impots_taxes_pourcentage: impots.map((el, index) =>
            pourcentageArrondi(el, produitsExploit[index])
        ),
        charges_personnel_pourcentage: chargesPersonnel.map((el, index) =>
            pourcentageArrondi(el, produitsExploit[index])
        ),
        excedent_brute_pourcentage: excedentBrute.map((el, index) =>
            pourcentageArrondi(el, produitsExploit[index])
        ),
        dotation_amortissement_pourcentage: produitsExploit.map((el, index) =>
            pourcentageArrondi(totalAmortissement, el)
        ),
        resultat_exploitation_pourcentage: resultat_exploitation.map(
            (el, index) => pourcentageArrondi(el, produitsExploit[index])
        ),
        chiffres_financieres_pourcentage: totalChargesBancaire.map(
            (el, index) => pourcentageArrondi(el, produitsExploit[index])
        ),
        resultat_financier_pourcentage: totalChargesBancaire.map(
            (el, index) => pourcentageArrondi(el, produitsExploit[index]) * -1
        ),
        resultat_courant_pourcentage: resultat_avant_impot.map((el, index) =>
            pourcentageArrondi(el, produitsExploit[index])
        ),

        resultat_exercice_pourcentage: resultat_net.map((el, index) =>
            pourcentageArrondi(el, produitsExploit[index])
        ),
        capacite_autofinancement_pourcentage: capacite_autofinancement.map(
            (el, index) => pourcentageArrondi(el, produitsExploit[index])
        ),
    };
}
