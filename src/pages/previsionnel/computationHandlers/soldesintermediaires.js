export function soldesGestion() {
    const pourcentageArrondi = (a, b) => {
        if (
            typeof Number(a) == "number" &&
            !isNaN(Number(a)) &&
            typeof Number(b) == "number" &&
            !isNaN(Number(b))
        )
            return Math.round((Number(a) / Number(b)) * 100);
        return 0;
    };
}
