import { formatDate } from "./dateFormatter.js";

function getTaskFrequency(date, frequency) {
    const initialDate = new Date(date)
    const finalDate = new Date(initialDate);
    const days = []
    
    
    switch (frequency) {
        case 'Once': {
            days.push(formatDate(initialDate, 'YMD'));
            return days;
            break;
        }
            
            case 'Daily':
            finalDate.setMonth(initialDate.getMonth() + 3);
            let currentDate = new Date(initialDate);
            while(currentDate <= finalDate){
                days.push(formatDate(currentDate, 'YMD'))
                currentDate = new Date(currentDate);
                currentDate.setDate(currentDate.getDate() + 1)
            }
            return days
            break;

        case 'Weekly': {
            finalDate.setMonth(initialDate.getMonth() + 6);
            let weeklyDate = new Date(initialDate);
            while(weeklyDate <= finalDate) {
                days.push(formatDate(weeklyDate, 'YMD'));
                weeklyDate = new Date(weeklyDate);
                weeklyDate.setDate(weeklyDate.getDate() + 7);
            }
            return days;
        }

        case 'Monthly':
            finalDate.setMonth(initialDate.getMonth() + 12)
            while(initialDate > finalDate){
                days.push(formatDate(initialDate, 'YMD'))
                initialDate.setMonth(initialDate.getMonth() + 1)
            }
            return days;

        default:
            return [date]
            break;
    }
}

export { getTaskFrequency }