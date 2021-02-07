export class UtilitiesUtil {
    GetDateStringYYYMMDD(date: Date) {
        if (typeof date === 'string') {
            return date;
        }
        let dateString = '';
        const day = date.getDate();
        const month = date.getMonth() + 1;
        const year = date.getFullYear();
        const monthString = `${((month < 10) ? '0': '')}${month}`;
        const dayString = `${((day < 10) ? '0': '')}${day}`;
        dateString = `${year}-${monthString}-${dayString}`;
        return dateString;
    }
}