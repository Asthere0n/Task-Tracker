export function formatDate(date, format){
    
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()

    switch (format) {
        case 'YM':
            return `${year}/${month}`
            break;

        case 'YMD':
            return `${year}/${month}/${day}`
            break;

        default:
            break;
    }

}

export function generateDateURL(date, format) {
    return `/calendar/${formatDate(date, format)}`
}