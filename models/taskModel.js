import mongoose from "mongoose";

const Schema = mongoose.Schema({
    title:{
        type: String,
        required: true
    },
    category:{
        type: String,
        required: true
    },
    dueTime: {
        type: String,
        required: true
    },
    dueDate:{
        type: Array,
        required: true
    },
    description: {
        type: String,
        required: false
    },
    completed: {
        type:Boolean,
        required: false
    },
    completedBy: {
        type: String,
        required: false
    }
})

const Task = mongoose.model('Task', Schema)
export default Task
