export function arraySumFunction(array) {
    return array.reduce(
        (previousValue, currentValue) =>
            Number(previousValue) + Number(currentValue),
        0
    );
}

export function checkNumber(value) {
    if (typeof Number(value) === "number" && !isNaN(value))
        return Number(parseFloat(value).toFixed(2));
    else return 0.0;
}
export function checkInteger(value) {
    if (typeof Number(value) === "number" && !isNaN(value))
        return parseInt(value);
    else return 0;
}
