/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router = express.Router();

module.exports = ({db, axios}) => {

  // Temp Tokens
  const musicAccessToken = 'BQBqkrN8I-sTtFEKrxeUfD9ETbfElAEm8OQnKvSQ0CoHp-POM-UDhjlshu4BLjNUIUwWuV09YYy-o3n81ElQRqm2yDbT1GMWfEfNNPesnQ5BlM0TToVuhPgeyBoHvEmOCY-2fJONl1VdSJ8J9BtW4tG00DSYCZ4'

  router.get("/", (req, res) => {

    // Sanitize
    const searchText = req.query.$search;

    // API Endpoint Function Delclarations
    const movieEndPoint = axios.get('http://www.omdbapi.com/?apikey=8dae3cd2&s='+searchText);
    const restaurantEndPoint = axios.get('https://developers.zomato.com/api/v2.1/search?q='+searchText,{
      headers: {
        'user-key': '15be3dc7caf28a0303ceb8251bf19cec'
    }});
    const musicEndPoint = axios.get(`https://api.spotify.com/v1/search?q=${searchText}&type=track%2Cartist%2Calbum`,{
      headers: {
        'Authorization': 'Bearer ' + musicAccessToken
    }});
    const bookEndPoint = axios.get(`https://www.googleapis.com/books/v1/volumes?q=${searchText}&key=AIzaSyBi1b3U6fVBvIo4VwCylsVDkDY-Aph6BX8`);

    // Promise to return API results
    Promise.all([movieEndPoint, restaurantEndPoint, musicEndPoint, bookEndPoint])
    .then(finalVals => {
      const movieRes = finalVals[0];
      const restaurantRes = finalVals[1];
      const musicRes = finalVals[2];
      const booksRes = finalVals[3];
      // console.log(movieRes.data);
      // console.log(restaurantRes.data.restaurants[0].restaurant.name);
      // console.log(musicRes);
      console.log(booksRes.data.items[3].volumeInfo.title);

      // DB Query
    const queryString =`
    SELECT todos.name as todo_name,types.name as type_name,todos.todo_id
    FROM todos
    JOIN types ON todos.type_id = types.type_id
    WHERE todos.name ILIKE $1
    ;`;
    const values = ['%' + req.query.$search + '%']
    db.query(queryString,values)
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
  });
  return router;
};
