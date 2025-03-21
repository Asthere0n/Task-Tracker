import express from "express";
import { calendar_get, calendar_year_month_day_get, calendar_year_month_get } from "../controllers/calendarController.js";

const calendarRouter = express.Router()

calendarRouter.get('/', calendar_get)
calendarRouter.get('/:year/:month', calendar_year_month_get)
calendarRouter.get('/:year/:month/:day', calendar_year_month_day_get)

export { calendarRouter }