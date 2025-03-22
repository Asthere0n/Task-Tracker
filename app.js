import express from "express";
import mongoose from "mongoose";
import 'dotenv/config';
import { newTaskRouter } from "./routes/newTaskRoutes.js";
import {taskRouter} from './routes/tasksRoutes.js'
import { calendarRouter } from "./routes/calendarRoutes.js";
import { index_handler } from "./controllers/indexController.js";

const app = express();

// view engine
app.set('view engine', 'ejs');
// middleware
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }))


//database connection & server initialization
const dbURI = process.env.MONGODB_URI;

mongoose.connect(dbURI, { })
  .then(() => {
    console.log('Connected to MongoDB')
    app.listen(8080);
  })
  .then(() => {
    console.log('Server is running on http://localhost:3000')
  })
  .catch(err => console.error('Connection error:', err));

// routes
    //  /Home
app.get('/', index_handler);

    // /New-Task routes
app.use('/new-task', newTaskRouter)

    // /Task routes
app.use('/task', taskRouter)

    // /Calendar routes
app.use('/calendar', calendarRouter)