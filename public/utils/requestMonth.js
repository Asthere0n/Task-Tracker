export function requestMonth(year, month) {
    // Get first day of month (UTC midday avoids timezone issues)
    const firstDay = new Date(Date.UTC(year, month, 1));
    
    // Get last day of month by going to next month's 0th day
    const lastDay = new Date(Date.UTC(year, month + 1, 0));

    let requestedMonth = []
    for (let dayNumber = 1; dayNumber <= lastDay.getDate(); dayNumber++) {
        requestedMonth.push(new Date(Date.UTC(year, month, dayNumber)));
    }
    return requestedMonth
}