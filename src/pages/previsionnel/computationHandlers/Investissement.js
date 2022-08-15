import { arraySumFunction } from "../../utils/math";

export const investissmentHandler = (besoin_demarage) => {
    const immobilisationsIncorpArray = [
        besoin_demarage.frais_etablissement,
        besoin_demarage.frais_compteurs,
        besoin_demarage.frais_logiciels,
        besoin_demarage.frais_marque,
        besoin_demarage.frais_droit_entree,
        besoin_demarage.achat_fonds_de_commerce,
        besoin_demarage.droit_au_bail,
        besoin_demarage.depot_garantie,
        besoin_demarage.frais_dossier,
        besoin_demarage.frais_avocat,
    ].filter((v) => typeof Number(v) == "number" && !isNaN(v));
    const immobilisationsCorpArray = [
        besoin_demarage.frais_communication,
        besoin_demarage.achat_immobilier,
        besoin_demarage.frais_travaux,
        besoin_demarage.frais_materiel,
        besoin_demarage.frais_materiel_bureau,
    ].filter((v) => typeof Number(v) == "number" && !isNaN(v));
    const totalIncorp = arraySumFunction(immobilisationsIncorpArray);
    const totalCorp = arraySumFunction(immobilisationsCorpArray);
    const totalBesoin = arraySumFunction([
        totalCorp,
        totalIncorp,
        besoin_demarage.frais_stock,
        besoin_demarage.tresorie_de_depart,
    ]);

    const tableDataIncorporelles = [
        {
            value: besoin_demarage.frais_etablissement,
            label: "Frais d’établissement ",
        },
        {
            value: besoin_demarage.frais_compteurs,
            label: "Frais d’ouverture de compteurs",
        },
        {
            value: besoin_demarage.frais_logiciels,
            label: "Logiciels, formations",
        },
        {
            value: besoin_demarage.frais_marque,
            label: "Dépôt marque, brevet, modèle",
        },
        {
            value: besoin_demarage.frais_droit_entree,
            label: "Droits d’entrée",
        },
        {
            value: besoin_demarage.achat_fonds_de_commerce,
            label: "Achat fonds de commerce ou parts",
        },
        {
            value: besoin_demarage.droit_au_bail,
            label: "Droit au bail",
        },
        {
            value: besoin_demarage.depot_garantie,
            label: "Caution ou dépôt de garantie",
        },
        {
            value: besoin_demarage.frais_dossier,
            label: "Frais de dossier",
        },
        {
            value: besoin_demarage.frais_avocat,
            label: "Frais de notaire ou d’avocat",
        },
    ];
    const tableDataCorporelles = [
        {
            value: besoin_demarage.frais_communication,
            label: "Enseigne et éléments de communication",
        },
        {
            value: besoin_demarage.achat_immobilier,
            label: "Achat immobilier",
        },
        {
            value: besoin_demarage.frais_travaux,
            label: "Travaux et aménagements",
        },
        {
            value: besoin_demarage.frais_materiel,
            label: "Matériel",
        },
        {
            value: besoin_demarage.frais_materiel_bureau,
            label: "Matériel de bureau",
        },
    ];
    return {
        immobilisationsIncorpArray,
        immobilisationsCorpArray,
        tableDataIncorporelles,
        tableDataCorporelles,
        totalIncorp,
        totalCorp,
        totalBesoin,
        frais_stock: besoin_demarage.frais_stock,
        tresorie_de_depart: besoin_demarage.tresorie_de_depart,
    };
};

export const financementHandler = (financement_demarage) => {
    const prets = [
        financement_demarage.pret_1,
        financement_demarage.pret_2,
        financement_demarage.pret_3,
    ];

    const empruntArray = prets
        .map((el) => Number(el.montant))
        .filter((v) => typeof Number(v) == "number" && !isNaN(v));
    const apportArray = [
        financement_demarage.apport_personnel,
        financement_demarage.apports_en_nature,
    ].filter((v) => typeof Number(v) == "number" && !isNaN(v));
    // .filter((v) => typeof Number(v) == "number" && v !== "NaN");

    // const sommeIncorp = sumFunction(immobilisationsIncorpArray);
    // setimmobilisationsIncorporelles(sommeIncorp);
    // const sommeCorp = sumFunction(immobilisationsCorpArray);
    // setimmobilisationsCorporelles(sommeCorp);
    const sommePrets = arraySumFunction(empruntArray);
    // setEmprunt(sommePrets);
    const sommeApport = arraySumFunction(apportArray);
    // setApportPersonnel(sommeApport);
    return {
        apport_personnel: financement_demarage.apport_personnel,
        apports_en_nature: financement_demarage.apports_en_nature,
        prets,
        sommePrets,
        sommeApport,
        subventions: [
            financement_demarage.subvention_1,
            financement_demarage.subvention_2,
        ],
        autre_financement: financement_demarage.autre_financement,
        financement_total: financement_demarage.financement_total,
    };
};

export const amortissementHandler = (besoin_demarage, duree_amortissement) => {
    const amortissementFunction = (valeurAAmortir, dureeAmortissment) => {
        if (
            typeof Number(valeurAAmortir) == "number" &&
            !isNaN(Number(valeurAAmortir)) &&
            typeof Number(dureeAmortissment) == "number" &&
            !isNaN(Number(dureeAmortissment)) &&
            Number(dureeAmortissment) !== 0
        )
            return valeurAAmortir / dureeAmortissment;
        return 0;
    };
    const amortissementIncorporelsArray = [
        {
            label: "Frais d’établissement",
            value: besoin_demarage.frais_etablissement,
        },
        {
            value: besoin_demarage.frais_logiciels,

            label: "Logiciels, formations",
        },
        {
            value: besoin_demarage.frais_droit_entree,

            label: "Droits d’entrée",
        },
        {
            value: besoin_demarage.frais_dossier,

            label: "Frais de dossier",
        },
        {
            value: besoin_demarage.frais_avocat,

            label: "Frais de notaire ou d’avocat",
        },
    ].map((el) => ({
        ...el,
        value: amortissementFunction(el.value, duree_amortissement),
    }));
    const amortissementCorporelsArray = [
        {
            value: besoin_demarage.frais_communication,
            label: "Enseigne et éléments de communication",
        },
        {
            value: besoin_demarage.achat_immobilier,
            label: "Achat immobilier",
        },
        {
            value: besoin_demarage.frais_travaux,
            label: "Travaux et aménagements",
        },
        {
            value: besoin_demarage.frais_materiel,
            label: "Matériel",
        },
        {
            value: besoin_demarage.frais_materiel_bureau,
            label: "Matériel de bureau",
        },
    ].map((el) => ({
        ...el,
        value: amortissementFunction(el.value, duree_amortissement),
    }));
    const totalAmortissementIncorp = arraySumFunction(
        amortissementIncorporelsArray
            .map((el) => Number(el.value))
            .filter((v) => typeof Number(v) == "number" && !isNaN(v))
    );
    const totalAmortissementCorp = arraySumFunction(
        amortissementCorporelsArray
            .map((el) => Number(el.value))
            .filter((v) => typeof Number(v) == "number" && !isNaN(v))
    );
    const totalAmortissement = arraySumFunction(
        [totalAmortissementIncorp, totalAmortissementCorp]
            .map((el) => Number(el))
            .filter((v) => typeof Number(v) == "number" && !isNaN(v))
    );
    console.log(
        [totalAmortissementIncorp, totalAmortissementCorp],
        [totalAmortissementIncorp, totalAmortissementCorp].map((el) =>
            Number(el)
        )
    );
    return {
        totalAmortissementIncorp,
        amortissementIncorporelsArray,
        totalAmortissementCorp,
        amortissementCorporelsArray,
        totalAmortissement,
    };
};
