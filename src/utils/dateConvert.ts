import moment from "jalali-moment";
import starkString from "starkstring";
export const convertDateClock = (date: string | any) => {
    const year = date.includes('/') ? date.split('/')[0] : date.split('-')[0]
    if(+year > 1800){
        if (date.includes(' ')) {
            date = date.replace(' ', 'T')
            date = date + '.000000Z'
        }
        date = new Date(date)
        const hour = date.getHours() - 3;
        date.setHours(hour);
        date = moment(date).format('YYYY-MM-DD HH:mm:ss');
        date = starkString(moment(date).format('YYYY/MM/DD HH:mm:ss ')).englishNumber().toString()
        let dateTime = new Date((typeof date === "string" ? new Date(date) : date).toLocaleString("en-US", { timeZone: "Asia/Tehran" }))
        return moment(dateTime).locale('fa').format('HH:mm _ jYYYY/jMM/jDD');
    } else {
        return date
    }
};

export const checkMiladi = (date: string | undefined) => {
    if(!date) return false
    const year = date.includes('/') ? date.split('/')[0] : date.split('-')[0]
    if(+year > 1800) return true
    return false
}
export const convertDateOnly = (date: string | any) => {
    const year = date.includes('/') ? date.split('/')[0] : date.split('-')[0]
    if(+year > 1800){
        date = new Date(date)
        const hour = date.getHours() - 3;
        date.setHours(hour);
        date = moment(date).format('YYYY-MM-DD HH:mm:ss');
        date = starkString(moment(date).format('YYYY/MM/DD HH:mm:ss +0000')).englishNumber().toString()
        let dateTime = new Date((typeof date === "string" ? new Date(date) : date).toLocaleString("en-US", { timeZone: "Asia/Tehran" }))
        var result = moment(dateTime).locale('fa').format('jYYYY/jMM/jDD')
        return result;
    } else {
        return date
    }
};
export const getDayAgo = (day: number) => {
  const result = [];
  const today = moment();
  for (let i = 0; i < day; i++) {
    const date = today.subtract(i, "days");
    result.push(date.format("YYYY-MM-DD"));
  }
  return result[result.length - 1];
};
