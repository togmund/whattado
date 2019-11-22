/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require("express");
const router = express.Router();

module.exports = ({db, axios}) => {
  router.get("/", (req, res) => {

    const queryFormat = `
    SELECT
          td.todo_id       AS todo_id,
          td.name          AS todo_name,
          td.author        AS author,
          td.subtype       AS subtype,
          td.year          AS year,
          td.location      AS todo_location,
          td.api_id        AS api_id,
          td.genre         AS genre,
          td.url           AS todo_url,
          td.img           AS todo_img,
          td.age_rating    AS age_rating,
          td.user_rating   AS todo_user_rating,

          t.name           AS type_name,
          t.color          AS type_color,
          t.color_accent   AS type_color_accent,
          t.img            AS type_img,

          u_t.user_todo_id AS user_todo_id,
          u_t.done         AS done,
          u_t.done_count   AS done_count,
          u_t.user_id      AS user_id

    FROM user_todos u_t
    JOIN todos td ON td.todo_id = u_t.todo_id
    JOIN types t ON t.type_id = td.type_id
    AND u_t.user_id = $1
    ;`
    const injectionProtection = [req.session.userId]
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
    INSERT INTO user_todos (user_id,todo_id)
    VALUES ($1,$2)
    ;`;
    const userIDNo = parseInt(req.session.userId);
    const todoID = req.body.todoId;
    let values = [userIDNo, todoID];
    console.log('******', values);
    db.query(queryString, values)
      // .then(data => {
      //   const allTodos = data.rows;
      //   res.json(allTodos);
      // })
      // .catch(err => {
      //   res
      //     .status(500)
      //     .json({ error: err.message });
      // });
    // }
  });
  return router;
};
