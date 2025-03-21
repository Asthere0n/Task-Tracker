import express from "express";
import { id_delete, id_get, id_post } from "../controllers/tasksController.js";

const taskRouter = express.Router()

taskRouter.get('/:id', id_get)
taskRouter.post('/:id', id_post)
taskRouter.delete('/:id', id_delete)

export { taskRouter }