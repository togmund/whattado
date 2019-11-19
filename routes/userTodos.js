/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require("express");
const router = express.Router();

module.exports = db => {
  router.get("/", (req, res) => {
    const requestQuery = req.query;
    const formArray = [];
    for (let queryValue in requestQuery) {
      if (requestQuery[queryValue] === 'true')
      formArray.push(queryValue);
    }
    const psFriendly = `'${formArray.join("', '")}'`
    const queryFormat = `
    SELECT u_t.user_todo_id,
           td.name AS todo_name,
           u_t.done AS done,
           t.name AS type_name,
           t.color AS type_color,
           t.color_accent AS type_color_accent,
           t.img as type_img,
           done_count
    FROM user_todos u_t
    JOIN todos td ON td.todo_id = u_t.user_todo_id
    JOIN types t ON t.type_id = td.type_id
    WHERE t.name IN (${psFriendly})
    AND u_t.user_id = $1
    ORDER BY todo_name DESC
    ;`
    console.log(req.session.user_id);
    const injectionProtection = [req.session.user_id]
    db.query(queryFormat, injectionProtection)
      .then(data => {
        const userTodos = data.rows;
        res.json(userTodos);
      })
      .catch(err => {
        res.status(500).json({ error: err.message });
      });
  });
  router.put("/:id", (req, res) => {
    const id = `${req.params.id}`;
    db.query(`
      UPDATE user_todos
      SET done = 'true'
      WHERE user_todo_id = $1;`,
      [id]
    )
    .then(data => {
      res.json({success: true});
    })
    .catch(err => {
      res.status(500).json({ error: err.message });
    });

  });

  router.post("/:id/add", (req, res) => {
    // console.log(req.body.todoId);
    // if (req.session.user_id) {
    let queryString =`
    INSERT INTO user_todos (user_id,todo_id,done)
    VALUES ($1,$2,$3)
    ;`;
    let values = [1,req.body.todoId,false]
    db.query(queryString,values)
      // .then(data => {
      //   const allTodos = data.rows;
      //   res.json(allTodos);
      // })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
    // }
  });
  return router;
};
