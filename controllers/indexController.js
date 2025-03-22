import { generateDateURL } from "../components/dateFormatter.js";

function index_handler(req, res) {
    const dateURL = generateDateURL(new Date(), 'YMD')
    res.redirect(dateURL)
  }

export{ index_handler }