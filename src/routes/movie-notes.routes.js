const { Router } = require("express");
const MovieNotesController = require("../controllers/MovieNotesController")

const movieNotesRoutes = Router();

function checkMiddleware(request, response, next) {
  console.log("checado")
  
  next();
}

const movieNotesController = new MovieNotesController()

movieNotesRoutes.get("/", checkMiddleware, movieNotesController.index);
movieNotesRoutes.post("/:user_id", checkMiddleware, movieNotesController.create);
movieNotesRoutes.get("/:id", checkMiddleware, movieNotesController.show);
movieNotesRoutes.delete("/:id", checkMiddleware, movieNotesController.delete);

module.exports = movieNotesRoutes;