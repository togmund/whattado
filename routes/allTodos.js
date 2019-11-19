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
    let queryString =`
    SELECT todos.name as todo_name,types.name as type_name,todos.todo_id
    FROM todos
    JOIN types ON todos.type_id = types.type_id
    ;`;
    // let values = [req.body]
    // console.log(values);
    db.query(queryString)
      .then(data => {
        const allTodos = data.rows;
        res.json(allTodos);
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });
  return router;
};
