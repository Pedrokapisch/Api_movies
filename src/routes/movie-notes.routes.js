const { Router } = require("express");
const MovieNotesController = require("../controllers/MovieNotesController")

const movieNotesRoutes = Router();

function checkMiddleware(request, response, next) {
  console.log("checado")
  
  next();
}

const movieNotesController = new MovieNotesController()

movieNotesRoutes.post("/", checkMiddleware, movieNotesController.create);

module.exports = movieNotesRoutes;