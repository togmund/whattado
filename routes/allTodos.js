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
  const musicAccessToken = 'BQBQhlUTLrkdCYxhxrJhLTcIqLnnxbZjA8m1uHecnFP36YSFa3yC8v8rzpkFDnnXmRxnsqZHQrbxPrJupgxRizx6ps0MooLr2sAZpXOUqHns9gv90oaV3nkJ8X3v1xdDjTZjpK2r3rWf';

  router.get("/", (req, res) => {

    // Sanitize
    const searchText = req.query.$search;

    // DB Query
    const queryString = `
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
    t.img            AS type_img
    FROM todos td
    JOIN types t ON td.type_id = t.type_id
    WHERE td.name ILIKE $1
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
  router.post("/new", (req, res) => {
    const todoObject = req.body;
    insertObj(todoObject, `todos`, db).then ((data) => {
      res.json(data);
    })
  })

  return router;
};

function insertObj(obj, table, db) {
  const objArr = Object.entries(obj);
  const objKeys = objArr.map(e => e[0]);
  const objVals = objArr.map((e) => {
    if(typeof e[1] === 'string') {
      return `'${e[1]}'`;
    }
    return e[1];
  });
  return db.query(`INSERT INTO
  ${table}
  ( ${objKeys})
  VALUES ( ${objVals} )
  RETURNING todo_id;`);
}
