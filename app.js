import express from "express";
import mongoose from "mongoose";
import 'dotenv/config';

const app = express();

// middleware
app.use(express.static('public'));

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
app.get('/', (req, res) => {
    res.render('index');
});

app.get('/new-task', (req, res) => {
    res.render('new-task');
});

