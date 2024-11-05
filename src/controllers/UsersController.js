const { request, response } = require("express");
const sqliteConnection = require("../database/sqlite");
const knex = require("../database/knex");
const { hash, compare } = require("bcrypt");
const AppError = require("../utils/AppError");

class UsersController {
  async create(request, response) {
    const { name, email, password } = request.body;
    
    const database = await sqliteConnection();
    const checkUserExists = await database.get("SELECT * FROM users WHERE email = (?)", [email]);
  
    if(checkUserExists) {
      throw new AppError('Este e-mail já esta em uso')
    };

    if(!name) {
      throw new AppError("Nome é obrigatório.")
    };

    const hashedPassword = await hash(password, 8);

    await database.run(
      "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",[ name, email, hashedPassword]
    );

    response.status(201).json("conferir database");
  };

  async update(request, response) {
    const { name, email, password, old_password } = request.body;
    const { id } = request.params;

    const database = await sqliteConnection();
    const user = await database.get("SELECT * FROM users WHERE id = (?)", [id]);

    if(!user) {
      throw new AppError("Usuário não encontrado")
    };

    const checkUserEmail = await database.get("SELECT * FROM users WHERE email = (?)", [email]);
    if(checkUserEmail && checkUserEmail.id !== user.id) {
      throw new AppError("Este email já esta em uso")
    };

    user.name = name ?? user.name;
    user.email = email ?? user.email;

    if( password && !old_password ) {
      throw new AppError("Informe a senha antiga.")
    };

    if(password && old_password) {
      const checkOldPassword = await compare(old_password, user.password);
      
      if(!checkOldPassword) {
        throw new AppError("Senha antiga está errada.")
      };

      user.password = await hash(password, 8);
    };

    await database.run(`
      UPDATE users SET
      name = ?,
      email = ?,
      password = ?,
      updated_at = DATETIME('now')
      Where id = ?
      `,[user.name, user.email, user.password, id]
    );
    
    return response.json("conferir database");
  };

  async delete(request, response) {
    const { id } = request.params;

    await knex("users").where({ id }).delete();

    return response.json();
  };
};

module.exports = UsersController;