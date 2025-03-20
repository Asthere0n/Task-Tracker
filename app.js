import express from "express";
import mongoose from "mongoose";
import 'dotenv/config';
import Task from "./models/taskModel.js"
import { requestMonth } from "./public/utils/requestMonth.js";

const app = express();

// middleware
app.use(express.static('public'));
app.use(express.urlencoded())

// view engine
app.set('view engine', 'ejs');

//database connection
const dbURI = process.env.MONGODB_URI;

mongoose.connect(dbURI, {})
  .then(() => {
    console.log('Connected to MongoDB')
    app.listen(3000);
  })
  .then(() => {
    console.log('Server is running on http://localhost:3000')
  })
  .catch(err => console.error('Connection error:', err));

// routes
    //  Home
app.get('/', (req, res) => {
  const currentDate = new Date()
  res.redirect(`/calendar/${currentDate.getFullYear()}/${currentDate.getMonth() + 1}/${currentDate.getDate()}`)
});

    // New Task
app.get('/new-task', (req, res) => {
  res.render('new-task');
});

app.post('/new-task', (req, res) => {
  const task = new Task(req.body)
  task.save()
    .then(() => {
      console.log('New task recorded:', task)
      res.redirect('/')
    })
    .catch((err) => console.error(err))
})

    // Task
app.get('/task/:id', (req, res) => {
  const id = req.params.id
  Task.findById(id)
    .then((result) => {
      res.render('taskViewer', { task: result })
    })
    .catch(err => console.error(err))

})
app.delete('/task/:id', (req, res) => {
  const id = req.params.id

  console.log("Delete: ", id)
  Task.findByIdAndDelete(id).then(result=>{
    res.json({redirect:"/"})
  })
})

    //Calendar
app.get('/calendar', (req, res) => {
  const today = new Date()
  const month = today.getMonth()
  const year = today.getFullYear()
  res.redirect(`/calendar/${year}/${month}`)
})
app.get('/calendar/:year/:month', (req, res) => {
  const year = parseInt(req.params.year)
  const month = parseInt(req.params.month)

  const requestedMonth = requestMonth(year, month)
  res.render('calendar', {month: requestedMonth})
})
app.get('/calendar/:year/:month/:day', (req, res)=>{
  const year = parseInt(req.params.year)
  const month = String(parseInt(req.params.month)).padStart(2, '0')
  const day = String(parseInt(req.params.day)).padStart(2, '0')
  const requestedDay = `${year}-${month}-${day}`

  Task.find({ dueDate: { $in: [requestedDay] } })
  .then((result)=>{
    res.render('dayViewer', {tasks: result, date: new Date(requestedDay)})
  })
})