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
const port = process.env.PORT

mongoose.connect(dbURI, { })
  .then(() => {
    console.log('Connected to MongoDB')
    app.listen(port);
  })
  .then(() => {
    console.log(`Server is running on http://localhost:${port}`)
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