import express from "express";
import { new_task_get, new_task_post } from "../controllers/newTaskController.js";

const newTaskRouter = express.Router()

newTaskRouter.get('/', new_task_get)
newTaskRouter.post('/', new_task_post)

export {newTaskRouter}