const { Router } = require("express");


function checkMiddleware(request, response, next) {
  console.log();
  next();
}

const tagsRoutes = Router();

tagsRoutes.post("/", (request, response) => {
  const { name } = request.body;

  response.json({ name });
});

module.exports = tagsRoutes;