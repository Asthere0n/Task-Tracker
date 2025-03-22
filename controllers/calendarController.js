import Task from "../models/taskModel.js";
import { generateDateURL } from "../components/dateFormatter.js";
import { requestMonth } from "../components/requestMonth.js";

function calendar_get(req, res) {
    const today = new Date()
    const dateURL = generateDateURL(today, 'YM')
    res.redirect(dateURL)
}

function calendar_year_month_get(req, res) {
    const year = parseInt(req.params.year)
    const month = parseInt(req.params.month) - 1

    const requestedMonth = requestMonth(year, month)
    res.render('calendar', { month: requestedMonth })
}

function calendar_year_month_day_get(req, res) {
    const year = parseInt(req.params.year)
    const month = String(parseInt(req.params.month))
    const day = String(parseInt(req.params.day))
    const requestedDay = `${year}/${month}/${day}`

    Task.find({ dueDate:  requestedDay })
        .then((result) => {
            res.render('dayViewer', { tasks: result, date: new Date(requestedDay) })
        })
        .catch(err=>console.error(err))
}

export {calendar_get, calendar_year_month_get, calendar_year_month_day_get}