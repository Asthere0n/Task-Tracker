import express from "express";
import mongoose from "mongoose";
import 'dotenv/config';
import { newTaskRouter } from "./routes/newTaskRoutes.js";
import {taskRouter} from './routes/tasksRoutes.js'
import { calendarRouter } from "./routes/calendarRoutes.js";
import { generateDateURL } from "./public/utils/dateFormatter.js";

const app = express();

// view engine
app.set('view engine', 'ejs');
// middleware
app.use(express.static('public'));
app.use(express.urlencoded())


//database connection & server initialization
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
    //  /Home
app.get('/', (req, res) => {
  const dateURL = generateDateURL(new Date(), 'YMD')
  res.redirect(dateURL)
});

    // /New-Task routes
app.use('/new-task', newTaskRouter)

    // /Task routes
app.use('/task', taskRouter)

    // /Calendar routes
app.use('/calendar', calendarRouter)