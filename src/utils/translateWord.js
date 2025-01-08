export const translateWord = (word: string) => {
    switch (word) {
        case 'BDS':
            return 'بی صاحاب';
        case 'INACTIVE':
            return 'غیر فعال';
        case 'ACCOUNT_TO_ACCOUNT':
            return 'کارت به کارت';
        case 'CUSTOMER_PAY':
            return 'پرداختی مشتری';
        case 'DRIVER_FARE_PAYMENT':
            return 'تسویه کرایه راننده';
        case 'EXPENSE':
            return 'ثبت هزینه';
        case 'WAYBILL':
            return 'صدور حواله';
        case 'UNPAID':
            return 'پرداخت نشده';
        case 'PAID':
            return 'پرداخت شده';
        case 'HAJMI':
            return 'حجمی';
        case 'MASHIN':
            return 'ماشین';
        case '0':
            return 'پرداخت نشده';
        case '1':
            return 'پرداخت شده';
        case 'ACTIVE':
            return 'فعال';
        case 'WITHDRAW':
            return 'برداشت';
        case 'DEPOSIT':
            return 'واریز';
        case 'ARCHIVE':
            return 'تایید مدیر';
        case 'REJECTED':
            return 'رد شده';
        case 'PENDING':
            return 'در انتظار';
        default:
            return word;
    }
} 