


export function formatDateBr(originalDate) {
    let newDate = new Date(originalDate);
    return `${newDate.getDate()+1}/${newDate.getMonth()+1}/${newDate.getFullYear()}`;
}

export function formatDateEng(originalDate) {
    let newDate = new Date(originalDate);
    return `${newDate.getFullYear()}-${newDate.getMonth()}-${newDate.getDate()}`;
}


export function stringToDate(stringDate) {
    stringDate = stringDate.split('/');
    let date = new Date(stringDate[2], stringDate[1], stringDate[0]);
    return date;
}