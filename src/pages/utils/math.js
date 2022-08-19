export function arraySumFunction(array) {
    return array.reduce(
        (previousValue, currentValue) =>
            Number(previousValue) + Number(currentValue),
        0
    );
}

export function checkNumber(value) {
    if (typeof Number(value) === "number" && !isNaN(value))
        return Number(Number(value).toFixed(2));
    else return 0.0;
}
export function checkInteger(value) {
    if (typeof Number(value) === "number" && !isNaN(value))
        return parseInt(value);
    else return 0;
}
export const pourcentageArrondi = (a, b) => {
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
