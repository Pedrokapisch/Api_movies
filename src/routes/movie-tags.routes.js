const { Router } = require("express");
const TagsController = require("../controllers/TagsController");

const tagsRoutes = Router();

function checkMiddleware(request, response, next) {
  console.log("checado")
  next();
}

const tagsController = new TagsController();

tagsRoutes.get("/:user_id", checkMiddleware, tagsController.index);

module.exports = tagsRoutes;