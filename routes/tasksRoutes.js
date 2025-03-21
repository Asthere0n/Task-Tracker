import express from "express";
import Task from "../models/taskModel.js"


const taskRouter = express.Router()

taskRouter.get('/:id', (req, res) => {
    const id = req.params.id
    Task.findById(id)
        .then((result) => {
            res.render('taskViewer', { task: result })
        })
        .catch(err => console.error(err))
})

taskRouter.post('/:id', (req, res) => {
    const id = req.params.id
    const author = req.body
    const date = new Date
    const completionData = [author.completedBy, formatDate(date, 'YMD'), `${date.getHours()}:${date.getMinutes()}`]

    Task.findById(id)
        .then((result) => {
            result.completedBy = completionData
            result.completed = true
            result.save()
                .then(() => {
                    const dateURL = generateDateURL(new Date(date), 'YMD')
                    res.redirect(dateURL)
                })
                .catch(err => console.error(err))
        })
})

taskRouter.delete('/:id', (req, res) => {
    const id = req.params.id
    Task.findByIdAndDelete(id).then(result => {
        res.json({ redirect: "/" })
    })
})

export { taskRouter }