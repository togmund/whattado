/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router = express.Router();

module.exports = ({ db, axios }) => {

  // Temp Tokens
  const musicAccessToken = 'BQA3oXus_qu_EMaKQFxVktLbXKF6uNlyKRL2fE4wLYuTiCVQVg2QV8_bhd1BcnHLbW-NaztnAdrrnLqYg4EYiz-Ga_hNILiJzjQhyjB5he3pWUUMIqJ9LdZckt7TMcw3k0UuErgKHb7i9MQyopoyg6wUf0GqapY'

  router.get("/", (req, res) => {

    // Sanitize
    const searchText = req.query.$search;

    // DB Query
    const queryString = `
    SELECT *,todos.img as todo_img, todos.name as todo_name,types.name as type_name,todos.todo_id
    FROM todos
    JOIN types ON todos.type_id = types.type_id
    WHERE todos.name ILIKE $1
    ;`;
    const values = ['%' + searchText + '%']
    const todoEndpoint = db.query(queryString, values)

    // API Endpoint Function Delclarations
    const movieEndPoint = axios.get('http://www.omdbapi.com/?apikey=8dae3cd2&s=' + searchText);
    const bookEndPoint = axios.get(`https://www.googleapis.com/books/v1/volumes?q=${searchText}&key=AIzaSyBi1b3U6fVBvIo4VwCylsVDkDY-Aph6BX8`);
    const musicEndPoint = axios.get(`https://api.spotify.com/v1/search?q=${searchText}&type=track%2Cartist%2Calbum`, {
      headers: {
        'Authorization': 'Bearer ' + musicAccessToken
      }
    });
    const restaurantEndPoint = axios.get('https://developers.zomato.com/api/v2.1/search?q=' + searchText, {
      headers: {
        'user-key': '15be3dc7caf28a0303ceb8251bf19cec'
      }
    });

    // Promise to return API results
    Promise.all([todoEndpoint, movieEndPoint, bookEndPoint, musicEndPoint, restaurantEndPoint])
      .then(finalVals => {

        const todoRes = finalVals[0].rows;
        const movieRes = finalVals[1].data.Search;
        const booksRes = finalVals[2].data.items;
        const albumRes = finalVals[3].data.albums.items;
        const artistRes = finalVals[3].data.artists.items;
        const trackRes = finalVals[3].data.tracks.items;
        const restaurantRes = finalVals[4].data.restaurants;

        res.json([
          todoRes,
          movieRes,
          booksRes,
          albumRes,
          artistRes,
          trackRes,
          restaurantRes
        ])
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });

  });
  return router;
};
