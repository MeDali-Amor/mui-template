import { checkInteger, checkNumber } from "../../utils/math";

export const analysePret = (pret) => {
    const montant = checkNumber(pret.montant);
    const taux = checkNumber(pret.taux) / 100;
    const duree = checkInteger(pret.duree_en_mois);
    const mensualite = VPM(montant, taux, duree);
    const principal_mois = Number(montant / duree).toFixed(2);
    const total_a_rembourser = mensualite * duree;
    const intert_mois = mensualite - principal_mois;
    const intert_duree = intert_mois * duree;
    const intretAnnuel = [1, 2, 3].map((el) =>
        analyseAnnuel(duree, el, intert_mois)
    );
    const principalAnnuel = [1, 2, 3]
        .map((el) => analyseAnnuel(duree, el, principal_mois))
        .map((el) => Number(el).toFixed(2));
    // console.log(mensualite);
    console.log(intert_mois, intretAnnuel);
    return {
        intretAnnuel,
        principalAnnuel,
    };
};

function VPM(montant, taux, duree) {
    const tauxMensuel = taux / 12;
    const denominateur = 1 - Math.pow(1 + tauxMensuel, duree * -1);
    if (denominateur === 0) return 0.0;
    return (
        (montant * tauxMensuel) / (1 - Math.pow(1 + tauxMensuel, duree * -1))
    );
}

function analyseAnnuel(duree, an, valeur) {
    const dn = duree - (an - 1) * 12;
    if (dn > 12) return Number((valeur * 12).toFixed(2));
    else return Number((dn * valeur).toFixed(2));
}
