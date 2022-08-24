import { arraySumFunction } from "../../utils/math";

export function budgetPrevisionnelHandler(
    sommeApport_3ans,
    emprunt_3ans,
    subventions_3ans,
    autre_financement_3ans,
    chiffre_vente,
    chiffre_services,
    totalIncorp,
    totalCorp,
    immobilisations_3ans,
    frais_stock_3ans,
    totalPrincipaltAnnuel,
    pourcentage_vente_cout_achat,
    totalChargesExternes,
    impots,
    salaires_employes,
    charges_employes,
    remuneration_dirigeants,
    charges_social_dirig,
    totalChargesBancaire
) {
    let emptyarray = new Array(12).join(".").split(".");

    const apoortPresonnel_mois = emptyarray
        .map((el, index) =>
            index === 0 ? (el = sommeApport_3ans[0]) : (el = "")
        )
        .map((el) => Number(el).toFixed(2));
    const emprunt_mois = emptyarray
        .map((el, index) => (index === 0 ? emprunt_3ans[0] : ""))
        .map((el) => Number(el).toFixed(2));
    const subventions_mois = emptyarray
        .map((el, index) => (index === 0 ? subventions_3ans[0] : ""))
        .map((el) => Number(el).toFixed(2));
    const autreFinancement_mois = emptyarray
        .map((el, index) => (index === 0 ? autre_financement_3ans[0] : ""))
        .map((el) => Number(el).toFixed(2));
    const immobilisationIncorp_mois = emptyarray
        .map((el, index) => (index === 0 ? (el = totalIncorp) : (el = "")))
        .map((el) => Number(el).toFixed(2));
    const immobilisationCorp_mois = emptyarray
        .map((el, index) => (index === 0 ? (el = totalCorp) : (el = "")))
        .map((el) => Number(el).toFixed(2));
    const totalImmobilisation_mois = emptyarray
        .map((el, index) =>
            index === 0 ? (el = immobilisations_3ans[0]) : (el = "")
        )
        .map((el) => Number(el).toFixed(2));
    const aquisitionStock_mois = emptyarray
        .map((el, index) =>
            index === 0 ? (el = frais_stock_3ans[0]) : (el = "")
        )
        .map((el) => Number(el).toFixed(2));

    const vente_mois = chiffre_vente
        .map((el) => el.total_chiffre_affaires)
        .map((el) => Number(el).toFixed(2));
    const services_mois = chiffre_services
        .map((el) => el.total_chiffre_affaires)
        .map((el) => Number(el).toFixed(2));
    const chiffre_affaire_mois = vente_mois
        .map((el, index) =>
            arraySumFunction([Number(el), services_mois[index]])
        )
        .map((el) => Number(el).toFixed(2));

    const echeances_emprunt = emptyarray
        .map((el, index) => (el = totalPrincipaltAnnuel[0] / 12))
        .map((el) => Number(el).toFixed(2));
    const achatMarchandises_mois = vente_mois
        .map((el) => (Number(el) * Number(pourcentage_vente_cout_achat)) / 100)
        .map((el) => Number(el).toFixed(2));
    const chargesExterne_mois = emptyarray
        .map((el, index) => (el = totalChargesExternes[0] / 12))
        .map((el) => Number(el).toFixed(2));
    const impotsTaxes_mois = emptyarray
        .map((el, index) => (el = impots[0] / 12))
        .map((el) => Number(el).toFixed(2));
    const chargesBancaires_mois = emptyarray
        .map((el, index) => (el = totalChargesBancaire[0] / 12))
        .map((el) => Number(el).toFixed(2));

    const salairesEmployes_mois = emptyarray
        .map((el, index) => (el = salaires_employes[0] / 12))
        .map((el) => Number(el).toFixed(2));
    const chargeEmployes_mois = emptyarray
        .map((el, index) => (el = charges_employes[0] / 12))
        .map((el) => Number(el).toFixed(2));
    const prelevementDirig_mois = emptyarray
        .map((el, index) => (el = remuneration_dirigeants[0] / 12))
        .map((el) => Number(el).toFixed(2));
    const chargesDirig_mois = emptyarray
        .map((el, index) => (el = charges_social_dirig[0] / 12))
        .map((el) => Number(el).toFixed(2));

    const totalCargesPersonnel_mois = salairesEmployes_mois
        .map((el, index) =>
            arraySumFunction(
                [
                    Number(el),
                    Number(chargeEmployes_mois[index]),
                    Number(prelevementDirig_mois[index]),
                    Number(chargesDirig_mois[index]),
                ].filter((v) => typeof Number(v) == "number" && !isNaN(v))
            )
        )
        .map((el) => Number(el).toFixed(2));
    console.log(totalCargesPersonnel_mois);
    const totalDecaissement_mois = totalImmobilisation_mois
        .map((el, index) =>
            arraySumFunction(
                [
                    Number(el),
                    Number(impotsTaxes_mois[index]),
                    Number(aquisitionStock_mois[index]),
                    Number(echeances_emprunt[index]),
                    Number(achatMarchandises_mois[index]),
                    Number(chargesExterne_mois[index]),
                    Number(totalCargesPersonnel_mois[index]),
                    Number(chargesBancaires_mois[index]),
                ].filter((v) => typeof Number(v) == "number" && !isNaN(v))
            )
        )
        .map((el) => Number(el).toFixed(2));
    const totalEncaissement_mois = apoortPresonnel_mois
        .map((el, index) =>
            arraySumFunction(
                [
                    Number(el),
                    Number(emprunt_mois[index]),
                    Number(subventions_mois[index]),
                    Number(autreFinancement_mois[index]),
                    Number(vente_mois[index]),
                    Number(services_mois[index]),
                ].filter((v) => typeof Number(v) == "number" && !isNaN(v))
            )
        )
        .map((el) => Number(el).toFixed(2));

    const solde_mois = totalEncaissement_mois.map((el, index) =>
        arraySumFunction(
            [Number(el), Number(totalDecaissement_mois[index]) * -1].filter(
                (v) => typeof Number(v) == "number" && !isNaN(v)
            )
        )
    );
    let solde_precedent = [0];
    let solde_tresorie = [];
    calculCumul(solde_tresorie, solde_precedent, solde_mois);
    // console.log(solde_precedent, solde_tresorie);
    const totaux_budget = [
        apoortPresonnel_mois,
        emprunt_mois,
        subventions_mois,
        autreFinancement_mois,
        vente_mois,
        services_mois,
        chiffre_affaire_mois,
        immobilisationIncorp_mois,
        immobilisationCorp_mois,
        totalImmobilisation_mois,
        aquisitionStock_mois,
        echeances_emprunt,
        achatMarchandises_mois,
        chargesExterne_mois,
        impotsTaxes_mois,
        salairesEmployes_mois,
        chargeEmployes_mois,
        prelevementDirig_mois,
        chargesDirig_mois,
        totalCargesPersonnel_mois,
        chargesBancaires_mois,
        totalDecaissement_mois,
        totalEncaissement_mois,
    ].map((el) =>
        arraySumFunction(
            el.filter((v) => typeof Number(v) == "number" && !isNaN(v))
        ).toFixed(2)
    );
    // console.log(totaux_budget);
    return {
        apoortPresonnel_mois,
        emprunt_mois,
        subventions_mois,
        autreFinancement_mois,
        vente_mois,
        services_mois,
        chiffre_affaire_mois,
        immobilisationIncorp_mois,
        immobilisationCorp_mois,
        totalImmobilisation_mois,
        aquisitionStock_mois,
        echeances_emprunt,
        achatMarchandises_mois,
        chargesExterne_mois,
        impotsTaxes_mois,
        salairesEmployes_mois,
        chargeEmployes_mois,
        prelevementDirig_mois,
        chargesDirig_mois,
        totalCargesPersonnel_mois,
        chargesBancaires_mois,
        totalDecaissement_mois,
        totalEncaissement_mois,
        solde_mois: solde_mois.map((el) => Number(el).toFixed(2)),
        solde_precedent: solde_precedent.map((el) => Number(el).toFixed(2)),
        solde_tresorie: solde_tresorie.map((el) => Number(el).toFixed(2)),
        totaux_budget,
    };
}

function calculCumul(ST, SP, SM) {
    let current_SP = 0;
    for (let i = 0; i < SM.length; i++) {
        let current_ST = current_SP + SM[i];
        current_SP = current_ST;
        ST.push(current_ST);
        SP.push(current_SP);
    }
}
