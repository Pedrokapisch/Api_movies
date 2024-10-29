const { Router } = require("express");
const UsersController = require("../controllers/UsersController")

const usersRoutes = Router();

function checkMiddleware(request, response, next) {
  console.log("checado")
  
  next();
}

const usersController = new UsersController();

usersRoutes.post("/", checkMiddleware, usersController.create)
usersRoutes.put("/:id", checkMiddleware, usersController.update)

module.exports = usersRoutes;