export const sepratePrice = (num: string | undefined | null) => {
    if (num === undefined || num === null || num === '')
        return '0';

    // num = String(num)
    if (typeof num === "string") {
        num = num.split('.')[0]
    }
    num += '';
    num = num.replace(',', '');
    let x;
    let y;
    let z;
    x = num.split('.');
    y = x[0];
    z = x.length > 1 ? '.' + x[1] : '';
    var rgx = /(\d+)(\d{3})/;
    while (rgx.test(y))
        y = y.replace(rgx, '$1' + ',' + '$2');
    if (z === '.0000')
        return y
    else
        return y + z;
};

export const sepratePriceUnFormated = (price: string) => {
    return price.split(',').join('')
}
export const checkNegativeNumberTStr = (num: string) => {
    if (num === undefined || num === null || num === '' || num === '0')
        return false;
    return num.includes('-')
}
export const checkNegativeNumberTNum = (num: number) => {
    if (num === undefined || num === null || num === 0)
        return false;
    return num < 0
}

