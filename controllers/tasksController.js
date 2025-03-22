import Task from "../models/taskModel.js"
import { formatDate, generateDateURL } from "../components/dateFormatter.js"

function id_get(req, res) {
    const id = req.params.id
    Task.findById(id)
        .then((result) => {
            res.render('taskViewer', { task: result })
        })
        .catch(err => console.error(err))
}

function id_post(req, res) {
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
        .catch(err => console.error(err))
}

function id_delete(req, res) {
    const id = req.params.id
    Task.findByIdAndDelete(id).then(result => {
        res.json({ redirect: "/" })
    })
}

export{id_get, id_post, id_delete}