export function arraySumFunction(array) {
    return array.reduce(
        (previousValue, currentValue) =>
            Number(previousValue) + Number(currentValue),
        0
    );
}
