import Task from "../models/taskModel.js"

function new_task_get(req, res) {
        res.render('new-task');
}

function new_task_post(req, res) {
    const task = new Task(req.body)
    task.save()
        .then(() => {
            console.log('New task recorded:', task)
            res.redirect('/')
        })
        .catch((err) => console.error(err))
    }

export {new_task_get, new_task_post}