/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router = express.Router();

module.exports = (db) => {
  router.get("/", (req, res) => {
    db.query(`
    SELECT u_t.user_todo_id, td.name AS todo_name, u_t.done AS done, t.name AS type_name, done_count
    FROM user_todos u_t
    JOIN todos td ON td.todo_id = u_t.user_todo_id
    JOIN types t ON t.type_id = td.todo_id
    ;`)
      .then(data => {
        const userTodos = data.rows;
        res.json(userTodos);
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });

  // router.put('userTodos/:id', (req, res) => {
  //   db.query(`
  //   `)
  // });
  return router;
};
