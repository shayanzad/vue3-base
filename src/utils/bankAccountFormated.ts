export const bankAccountFormated = (bankAccount: string) => {
    if (!bankAccount) return ''
    let formatted = bankAccount.replace(/\s/g, '');
    let check = formatted.match(/.{1,4}/g);
    let string = check?.join('-')
    return string ?? '';
}
export const bankAccountUnFormated = (bankAccount: string) => {
    return bankAccount.split('-').join('')
}

export const banknamefinding = (bankAccount: string) => {
    if (bankAccount) {
        let cardnum = bankAccount.substring(0, 6);
        switch (cardnum) {
            case "603799":
                return ' بانک ملی ایران';
            case "589210":
                return 'بانک سپه';
            case "627648":
                return 'بانک توسعه صادرات';
            case "627961":
                return "بانک صنعت و معدن";
            case "603770":
                return "بانک کشاورزی";
            case "628023":
                return "بانک مسکن";
            case "627760":
                return "پست بانک ایران";
            case "502908":
                return "بانک توسعه تعاون";
            case "627412":
                return "بانک اقتصاد نوین";
            case "622106":
                return "بانک پارسیان";
            case "502229":
                return "بانک پاسارگاد";
            case "627488":
                return "بانک کارآفرین";
            case "621986":
                return "بانک سامان";
            case "639346":
                return "بانک سینا";
            case "639607":
                return "بانک سرمایه";
            case "636214":
                return "بانک تات";
            case "502806":
                return "بانک شهر";
            case "502938":
                return "بانک دی";
            case "603769":
                return "بانک صادرات";
            case "610433":
                return "بانک ملت";
            case "627353":
                return "بانک تجارت";
            case "589463":
                return "بانک رفاه";
            case "627381":
                return "بانک انصار";
            case "639370":
                return "بانک مهر اقتصاد";
            case "639599":
                return "بانک قوامین ";
            case "111111":
                return "شماره کارت اشتباه";
            case "222222":
                return "شماره کارت اشتباه";
            case "333333":
                return "شماره کارت اشتباه";
            case "444444":
                return "شماره کارت اشتباه";
            case "555555":
                return "شماره کارت اشتباه";
            case "666666":
                return "شماره کارت اشتباه";
            case "777777":
                return "شماره کارت اشتباه";
            case "888888":
                return "شماره کارت اشتباه";
            case "999999":
                return "شماره کارت اشتباه";
            case "000000":
                return "شماره کارت اشتباه";

        }
    } else return ''
}