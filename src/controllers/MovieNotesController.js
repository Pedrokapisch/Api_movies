const AppError = require("../utils/AppError")

class MovieNotesController {
  create(request, response) {
    const { title, description, rating } = request.body;

    response.status(201).json({ title, description, rating });
  }
}

module.exports = MovieNotesController