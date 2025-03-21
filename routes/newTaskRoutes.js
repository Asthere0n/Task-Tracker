import express from "express";
import Task from "../models/taskModel.js"

const newTaskRouter = express.Router()


newTaskRouter.get('/', (req, res) => {
    res.render('new-task');
});

newTaskRouter.post('/', (req, res) => {
    const task = new Task(req.body)
    task.save()
        .then(() => {
            console.log('New task recorded:', task)
            res.redirect('/')
        })
        .catch((err) => console.error(err))
})

export {newTaskRouter}