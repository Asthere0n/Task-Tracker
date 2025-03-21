import express from "express";
import Task from "../models/taskModel.js";
import { generateDateURL } from "../public/utils/dateFormatter.js";
import { requestMonth } from "../public/utils/requestMonth.js";

const calendarRouter = express.Router()

calendarRouter.get('/calendar', (req, res) => {
    const today = new Date()
    const dateURL = generateDateURL(today, 'YM')
    res.redirect(dateURL)
})

calendarRouter.get('/calendar/:year/:month', (req, res) => {
    const year = parseInt(req.params.year)
    const month = parseInt(req.params.month) - 1

    const requestedMonth = requestMonth(year, month)
    res.render('calendar', { month: requestedMonth })
})

calendarRouter.get('/calendar/:year/:month/:day', (req, res) => {
    const year = parseInt(req.params.year)
    const month = String(parseInt(req.params.month)).padStart(2, '0')
    const day = String(parseInt(req.params.day)).padStart(2, '0')
    const requestedDay = `${year}-${month}-${day}`

    Task.find({ dueDate: { $in: [requestedDay] } })
        .then((result) => {
            res.render('dayViewer', { tasks: result, date: new Date(requestedDay) })
        })
})

export { calendarRouter }