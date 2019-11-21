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
  const musicAccessToken = 'BQDSpM44GfIT4lOzTn3vVl-2eUqWYAZiP5w29TZvOWzzLN_732-RuZbQUY65JMOpC9gf_sR8NlUD6hZsyGbgC8Cutb3Vu0cPnCOjXROqFsBr2FWAXBJNSoEzm2NPrnE2Teo8xjvpyVJ5s-Z2d_aZHofLwoHn6MI'

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
    Promise.all([todoEndpoint, movieEndPoint, /* bookEndPoint, */ /*musicEndPoint,*/ restaurantEndPoint])
      .then(finalVals => {

        const todoRes = finalVals[0].rows;
        // const movieRes = finalVals[1];
        // // const booksRes = finalVals[2];
        // const albumRes = finalVals[2].data.albums.items;
        // const artistRes = finalVals[2].data.albums.items;
        // const trackRes = finalVals[2].data.albums.items;
        // const restaurantRes = finalVals[3];

        // console.log([
        //   todoRes,
        //   movieRes,
        //   /* booksRes, */
        //   albumRes,
        //   artistRes,
        //   trackRes,
        //   restaurantRes
        // ])

        res.json([
          todoRes
          // movieRes,
          // /* booksRes, */
          // albumRes,
          // artistRes,
          // trackRes,
          // restaurantRes
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
