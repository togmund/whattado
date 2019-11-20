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
    let searchText = req.query.$search;
    let movieEndPoint = axios.get('http://www.omdbapi.com/?apikey=8dae3cd2&s='+searchText);
    let restaurantEndPoint = axios.get('https://developers.zomato.com/api/v2.1/search?q='+searchText,{
      headers: {
        'user-key': '15be3dc7caf28a0303ceb8251bf19cec'
    }});
    Promise.all([movieEndPoint, restaurantEndPoint])
    .then(values => Promise.all(values.map(value => value.json())))
    .then(finalVals => {
      let movieRes = finalVals[0];
      let restaurantRes = finalVals[1];
      console.log(movieRes);
      console.log(restaurantRes);      // .then((res) => {
        // .then((res) => {
      //   const movies = res.data.search;
      // })
    // let queryString =`
    // SELECT todos.name as todo_name,types.name as type_name,todos.todo_id
    // FROM todos
    // JOIN types ON todos.type_id = types.type_id
    // WHERE todos.name ILIKE $1
    // ;`;
    // let values = ['%' + req.query.$search + '%']
    // db.query(queryString,values)
    //   .then(data => {
    //     const allTodos = data.rows;
    //     res.json(allTodos);
    //   })
    //   .catch(err => {
    //     res
    //       .status(500)
    //       .json({ error: err.message });
    //   });
    });
  });
  return router;
};
