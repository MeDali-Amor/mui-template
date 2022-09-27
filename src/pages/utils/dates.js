export function dateFormatterFr(date) {
    let [year, month, day] = date.split("-");
    // month = getMonthName(month);
    // return day + " " + month + " " + year;

    const dateObj = new Date(date);
    const dateString = dateObj.toLocaleString();
    const enDateString = dateObj.toLocaleString("fr");
    const monthNameLong = dateObj.toLocaleString("fr", { month: "long" });
    const monthNameShort = dateObj.toLocaleString("fr", { month: "short" });
    return day + " " + monthNameLong + " " + year;
}
export function getCurrentDate(separator = "/") {
    let newDate = new Date();
    let date = newDate.getDate();
    let month = newDate.getMonth() + 1;
    let year = newDate.getFullYear();

    return `${date}${separator}${
        month < 10 ? `0${month}` : `${month}`
    }${separator}${year}`;
}

// function getMonthName(monthNum) {
//     const monthNames = [
//         "January",
//         "February",
//         "March",
//         "April",
//         "May",
//         "June",
//         "July",
//         "August",
//         "September",
//         "October",
//         "November",
//         "December",
//     ];
//     return monthNames[monthNum - 1];
// }
