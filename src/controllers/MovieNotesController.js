/*const knex = require("../database/knex");*/
const AppError = require("../utils/AppError")

class MovieNotesController {
  async create(request, response) {
    const { title, description, rating } = request.body;
  
    if(!Number.isInteger(rating)) {
      throw new AppError("A nota deve um número");
    }
  
    if(rating < 1 || rating > 5) {
      throw new AppError("A nota deve ser de 1 a 5");
    }

    response.status(201).json({ title, description, rating });
  }
}

module.exports = MovieNotesController