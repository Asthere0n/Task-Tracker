import Task from "../models/taskModel.js"
import { getTaskFrequency } from "../components/getTaskFrequency.js";

function new_task_get(req, res) {
    res.render('new-task');
}

function new_task_post(req, res) {
    const frequency = req.body.frequency
    const initialDueDate = req.body.dueDate
    const taskFrequency = getTaskFrequency(initialDueDate, frequency)

    const taskPromises = taskFrequency.map(date => {
        const taskData = req.body
        taskData.dueDate = date

        const task = new Task(taskData)
        return task.save()
            .then(savedTask => {
                console.log('New task created for ', savedTask.dueDate)
            })
    })
    
    Promise.all(taskPromises)
        .then(() => res.redirect('/'))
        .catch(err => next(err))
}


export { new_task_get, new_task_post }