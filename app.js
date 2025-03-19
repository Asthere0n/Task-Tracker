import express from "express";
import mongoose from "mongoose";
import 'dotenv/config';
import Task from "./models/taskModel.js"

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
  Task.find()
    .then(result => {
      res.render('index', { tasks: result });
    })
    .catch(err => {
      console.log(err);
    });
});

    // New Task
app.get('/new-task', (req, res) => {
  res.render('new-task');
});

app.post('/new-task', (req, res) => {
  const task = new Task(req.body)
  task.save()
    .then(() => {
      console.log('New task recorded')
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
  const month = parseInt(req.params.month) - 1

  const requestedDate = new Date(year, month, 1)
  res.render('calendar', {date: requestedDate})
})