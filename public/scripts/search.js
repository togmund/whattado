$(document).ready(function () {
  // $('.fixed-action-btn').floatingActionButton();
  $("#new-search").on("click", () => {
    $(`.todos.container`).empty();
    $(".search-form").slideToggle("fast");
    $("div.times").slideToggle("fast");
    $("div.groups").slideToggle("fast");
    $("div.row.section.submit").slideToggle("fast");
  });
  $(".search-form").submit(() => {
    event.preventDefault();
    $("div.times").slideUp("fast");
    $("div.groups").slideUp("fast");
    $("div.row.section.submit").slideUp("fast");
    $(`.todos.container`).empty();
    $("#todo-spinner").show();
    $search = $(".search-form input").val();
    $.ajax("/allTodos", {
      method: "GET",
      data: { $search: $search }
    }).done(allTodos => {
      $("#todo-spinner").hide();

      // DB Result
      for (todo of allTodos[0]) {
        const $todoContainer = $(`.todos.container`);

        const $article = $("<article>").addClass(
          `card horizontal ${todo.type_name}`
        );
        if ($(`.types button.${todo.type_name}`).val() === "false") {
          $article.hide();
        }
        const $divLeft = $(`<div>`).addClass(`left`);
        const $divLeftTop = $(`<div>`).addClass(`left-top`);
        const $divLeftImg = $("<img>")
          .addClass("image")
          .attr("src", todo.todo_img);
        const $divLeftBottom = $(`<div>`).addClass(`left-bottom`);
        const $divLeftBottomBtn = $(`<button>`).addClass(`url`);

        const $divRight = $(`<div>`).addClass(`right`);
        const $divRightTop = $(`<div>`).addClass(`right-top`);
        const $divRightTopText = $(`<div>`).addClass(`right-top-text`);
        const $todoName = $(`<div>`)
          .addClass(`todo-name`)
          .text(todo.todo_name);
        const $author = $("<span>").addClass("author");
        const $year = $("<span>").addClass("year");
        const $genre = $("<span>").addClass("genre");
        const $divBtn = $("<div>").addClass("right-top-btn");
        const todoId = todo.todo_id;
        const $doMeBtn = $("<button>")
          .addClass("do-me btn-large")
          .text("do me")
          .click(() => {
            $.ajax(`/userTodos/${todoId}/add`, {
              method: "POST",
              contentType: "application/json",
              data: JSON.stringify({
                todoId: todoId
              })
            });
          });
        const $divRightBottom = $("<div>").addClass("right-bottom");

        $article.append($divLeft);
        $divLeft.append($divLeftTop);
        $divLeftTop.append($divLeftImg);
        $divLeft.append($divLeftBottom);
        $divLeftBottom.append($divLeftBottomBtn);
        $article.append($divRight);
        $divRight.append($divRightBottom);
        $divRight.append($divRightTop);
        $divRightTop.append($divRightTopText);
        $divRightTop.append($divBtn);
        $divBtn.append($doMeBtn);
        $divRightTop.append($divRightTopText);
        $divRightTopText.append($todoName);
        $divRightTopText.append($author);
        $divRightTopText.append($year);
        $divRightTopText.append($genre);
        $todoContainer.append($article);
      }

      // Movie API result

      for (todo of allTodos[1]) {
        const $todoContainer = $(`.todos.container`);

        const $article = $("<article>").addClass(`card horizontal movies`);
        if ($(".types button.movies").val() === "false") {
          $article.hide();
        }
        const $divLeft = $(`<div>`).addClass(`left`);
        const $divLeftTop = $(`<div>`).addClass(`left-top`);
        const $divLeftImg = $("<img>")
          .addClass("image")
          .attr("src", todo.Poster);
        const $divLeftBottom = $(`<div>`).addClass(`left-bottom`);
        const $divLeftBottomBtn = $(`<a>`)
          .addClass(`url`)
          .attr({
            href: `https://imdb.com/title/` + todo.imdbID,
            target: "_blank"
          })
          .text("IMDB");

        const $divRight = $(`<div>`).addClass(`right`);
        const $divRightTop = $(`<div>`).addClass(`right-top`);
        const $divRightTopText = $(`<div>`).addClass(`right-top-text`);
        const $todoName = $(`<div>`)
          .addClass(`todo-name`)
          .text(todo.Title);
        const $author = $("<span>")
          .addClass("author")
          .text(todo.Type);
        const $year = $("<span>")
          .addClass("year")
          .text(todo.Year);
        const $genre = $("<span>").addClass("genre");
        const $divBtn = $("<div>").addClass("right-top-btn");

        const parsedApiId = todo.imdbID
        const parsedName = todo.Title
        const parsedSubtype = todo.Type
        const parsedYear = todo.Year
        const parsedUrl = `https://imdb.com/title/` + todo.imdbID
        const parsedImg = todo.Poster
        const parsedTypeId = 1

        const $doMeBtn = $("<button>")
          .addClass("do-me btn-large")
          .text("do me")
          .click(() => {
            $.ajax(`/allTodos/new`, {
              method: "POST",
              contentType: "application/json",
              data: JSON.stringify({
                api_id: parsedApiId,
                name: parsedName,
                subtype: parsedSubtype,
                year: parsedYear,
                url: parsedUrl,
                img: parsedImg,
                type_id: parsedTypeId
              })
            }).done((data) => {
              $.ajax(`/userTodos/${data.rows[0].todo_id}/add`, {
                method: "POST",
                contentType: "application/json",
                data: JSON.stringify({
                  todoId: data.rows[0].todo_id
                })
              });
            });
          });

        const $divRightBottom = $("<div>").addClass("right-bottom");

        $article.append($divLeft);
        $divLeft.append($divLeftTop);
        $divLeftTop.append($divLeftImg);
        $divLeft.append($divLeftBottom);

        $divLeftBottom.append($divLeftBottomBtn);

        $article.append($divRight);
        $divRight.append($divRightBottom);
        $divRight.append($divRightTop);
        $divRightTop.append($divRightTopText);
        $divRightTop.append($divBtn);

        $divBtn.append($doMeBtn);

        $divRightTop.append($divRightTopText);
        $divRightTopText.append($todoName);
        $divRightTopText.append($author);
        $divRightTopText.append($year);
        $divRightTopText.append($genre);
        $todoContainer.append($article);
      }

      // Books api
      for (todo of allTodos[2]) {
        const $todoContainer = $(`.todos.container`);
        const $article = $("<article>").addClass(`card horizontal books`);
        if ($(".types button.books").val() === "false") {
          $article.hide();
        }
        const $divLeft = $(`<div>`).addClass(`left`);
        const $divLeftTop = $(`<div>`).addClass(`left-top`);
        let $divLeftImg = $("<img>").addClass("image circle");
        let bookImg = "";
        if (todo.volumeInfo.imageLinks) {
          $divLeftImg = $("<img>")
            .addClass("image circle")
            .attr("src", todo.volumeInfo.imageLinks.thumbnail);
            let bookImg = todo.volumeInfo.imageLinks.thumbnail;
        } else {
          $divLeftImg = $("<img>")
            .addClass("image circle")
            .text("NO IMAGE");
        }
        const $divLeftBottom = $(`<div>`).addClass(`left-bottom`);
        const $divLeftBottomBtn = $(`<a>`)
          .addClass(`url`)
          .attr({ href: todo.volumeInfo.infoLink, target: "_blank" })
          .text("click");
        const $divRight = $(`<div>`).addClass(`right`);
        const $divRightTop = $(`<div>`).addClass(`right-top`);
        const $divRightTopText = $(`<div>`).addClass(`right-top-text`);
        const $todoName = $(`<div>`)
          .addClass(`todo-name`)
          .text(todo.volumeInfo.title);
        const $author = $("<span>")
          .addClass("author")
          .text(todo.volumeInfo.authors);
        const $year = $("<span>")
          .addClass("year")
          .text(todo.volumeInfo.publishedDate);
        const $genre = $("<span>")
          .addClass("genre")
          .text(todo.volumeInfo.categories);
        const $divBtn = $("<div>").addClass("right-top-btn");


        const apiId = todo.volumeInfo.industryIdentifiers[0].identifier;
        const bookAuthor = todo.volumeInfo.authors[0];
        const bookUrl = todo.volumeInfo.infoLink;
        const bookName = todo.volumeInfo.title;
        const bookRating = todo.volumeInfo.averageRating;

        const $doMeBtn = $("<button>")
          .addClass("do-me btn-large")
          .text("do me")
          .click(() => {
            $.ajax(`/allTodos/new`, {
              method: "POST",
              contentType: "application/json",
              data: JSON.stringify({
                type_id: 2,
                api_id: apiId,
                author: bookAuthor,
                url: bookUrl,
                name: bookName,
                user_rating: bookRating,
                img: bookImg
              })
            })
              .done((data) => {

                $.ajax(`/userTodos/${data.rows[0].todo_id}/add`, {
                  method: "POST",
                  contentType: "application/json",
                  data: JSON.stringify({
                    todoId: data.rows[0].todo_id
                  })
                });
              });
          })

        const $divRightBottom = $("<div>")
          .addClass("right-bottom")
          .text(todo.volumeInfo.averageRating);
        $article.append($divLeft);
        $divLeft.append($divLeftTop);
        $divLeftTop.append($divLeftImg);
        $divLeft.append($divLeftBottom);
        $divLeftBottom.append($divLeftBottomBtn);
        $article.append($divRight);
        $divRight.append($divRightBottom);
        $divRight.append($divRightTop);
        $divRightTop.append($divRightTopText);
        $divRightTop.append($divBtn);
        $divBtn.append($doMeBtn);
        $divRightTop.append($divRightTopText);
        $divRightTopText.append($todoName);
        $divRightTopText.append($author);
        $divRightTopText.append($year);
        $divRightTopText.append($genre);
        $todoContainer.append($article);
      }

      // Album Card Builder
      for (todo of allTodos[3]) {
        const $todoContainer = $(`.todos.container`);
        const $article = $("<article>").addClass(`card horizontal music`);
        if ($(".types button.music").val() === "false") {
          $article.hide();
        }
        const $divLeft = $(`<div>`).addClass(`left`);
        const $divLeftTop = $(`<div>`).addClass(`left-top`);
        const $divLeftImg = $("<img>")
          .addClass("image circle")
          .attr("src", todo.images[0].url);
        const $divLeftBottom = $(`<div>`).addClass(`left-bottom`);
        const $divLeftBottomBtn = $(`<a>`)
          .addClass(`url`)
          .text(todo.external_urls.spotify);

        const $divRight = $(`<div>`).addClass(`right`);
        const $divRightTop = $(`<div>`).addClass(`right-top`);
        const $divRightTopText = $(`<div>`).addClass(`right-top-text`);
        const $todoName = $(`<div>`)
          .addClass(`todo-name`)
          .text(todo.name);
        const $author = $("<span>")
          .addClass("author")
          .text(todo.artists[0].name);
        const $year = $("<span>")
          .addClass("year")
          .text(todo.release_date);
        const $subType = $("<span>")
          .addClass("subtype")
          .text(todo.type);
        const $divBtn = $("<div>").addClass("right-top-btn");

        const ____type_id = 3;
        const ____img = todo.images[0].url;
        const ____url = todo.external_urls.spotify;
        const ____name = todo.name;
        const ____author = todo.artists[0].name;
        const ____year = todo.release_date;
        const ____sub_type = todo.type;
        const ____api_id = todo.i;

        const $doMeBtn = $("<button>")
          .addClass("do-me btn-large")
          .text("do me")
          .click(() => {
            $.ajax(`/allTodos/new`, {
              method: "POST",
              contentType: "application/json",
              data: JSON.stringify({
                type_id: ____type_id,
                img: ____img,
                url: ____url,
                name: ____name,
                author: ____author,
                year: ____year,
                subtype: ____sub_type,
                api_id: ____api_id
              })
            }).done((data) => {
              $.ajax(`/userTodos/${data.rows[0].todo_id}/add`, {
                method: "POST",
                contentType: "application/json",
                data: JSON.stringify({
                  todoId: data.rows[0].todo_id
                })
              });
            });
          });
        const $divRightBottom = $("<div>").addClass("right-bottom");

        $article.append($divLeft);
        $divLeft.append($divLeftTop);
        $divLeftTop.append($divLeftImg);
        $divLeft.append($divLeftBottom);
        $divLeftBottom.append($divLeftBottomBtn);
        $article.append($divRight);
        $divRight.append($divRightBottom);
        $divRight.append($divRightTop);
        $divRightTop.append($divRightTopText);
        $divRightTop.append($divBtn);
        $divBtn.append($doMeBtn);
        $divRightTop.append($divRightTopText);
        $divRightTopText.append($todoName);
        $divRightTopText.append($author);
        $divRightTopText.append($year);
        $divRightTopText.append($subType);
        $todoContainer.append($article);
      }

      // Artist Card Builder
      for (todo of allTodos[4]) {
        const $todoContainer = $(`.todos.container`);

        const $article = $("<article>").addClass(`card horizontal music`);
        if ($(".types button.music").val() === "false") {
          $article.hide();
        }
        const $divLeft = $(`<div>`).addClass(`left`);
        const $divLeftTop = $(`<div>`).addClass(`left-top`);
        let $divLeftImg = $("<img>").addClass("image circle");
        let ___img;
        if (todo.images.length !== 0) {
          $divLeftImg = $("<img>")
            .addClass("image circle")
            .attr("src", todo.images[0].url);
            let ___img = todo.images[0].url;
        } else {
          $divLeftImg = $("<img>")
            .addClass("image circle")
            .text("NO IMAGE");
        }
        const $divLeftBottom = $(`<div>`).addClass(`left-bottom`);
        const $divLeftBottomBtn = $(`<a>`)
          .addClass(`url`)
          .text(todo.external_urls.spotify);

        const $divRight = $(`<div>`).addClass(`right`);
        const $divRightTop = $(`<div>`).addClass(`right-top`);

        const $divRightTopText = $(`<div>`).addClass(`right-top-text`);
        const $todoName = $(`<div>`)
          .addClass(`todo-name`)
          .text(todo.name);
        const $subType = $("<span>")
          .addClass("year")
          .text(todo.type);
        const $genre = $("<span>")
          .addClass("genre")
          .text(todo.genres[0]);

        const $divBtn = $("<div>").addClass("right-top-btn");

        const ___type_i = 3;

        const ___url = todo.external_urls.spotify;
        const ___user_rating = todo.popularity;
        const ___name = todo.name;
        const ___sub_type = todo.type;
        const ___api_id = todo.id;

        const $doMeBtn = $("<button>")
          .addClass("do-me btn-large")
          .text("do me")
          .click(() => {
            $.ajax(`/allTodos/new`, {
              method: "POST",
              contentType: "application/json",
              data: JSON.stringify({
                type_id: ___type_i,
                img: ___img,
                url: ___url,
                user_rating: ___user_rating,
                name: ___name,
                subtype: ___sub_type,
                api_id: ___api_id
              })
            });
          });
        const $divRightBottom = $("<div>")
          .addClass("right-bottom")
          .text(todo.popularity);

        $article.append($divLeft);
        $divLeft.append($divLeftTop);
        $divLeftTop.append($divLeftImg);
        $divLeft.append($divLeftBottom);
        $divLeftBottom.append($divLeftBottomBtn);
        $article.append($divRight);
        $divRight.append($divRightBottom);
        $divRight.append($divRightTop);
        $divRightTop.append($divRightTopText);
        $divRightTop.append($divBtn);
        $divBtn.append($doMeBtn);
        $divRightTop.append($divRightTopText);
        $divRightTopText.append($todoName);
        $divRightTopText.append($subType);
        $divRightTopText.append($genre);
        $todoContainer.append($article);
      }

      // Track Card Builder
      for (todo of allTodos[5]) {
        const $todoContainer = $(`.todos.container`);

        const $article = $("<article>").addClass(`card horizontal music`);
        if ($(".types button.music").val() === "false") {
          $article.hide();
        }
        const $divLeft = $(`<div>`).addClass(`left`);
        const $divLeftTop = $(`<div>`).addClass(`left-top`);
        const $divLeftImg = $("<img>")
          .addClass("image circle")
          .attr("src", todo.album.images[0].url);
        const $divLeftBottom = $(`<div>`).addClass(`left-bottom`);
        const $divLeftBottomBtn = $(`<a>`)
          .addClass(`url`)
          .text(todo.external_urls.spotify);

        const $divRight = $(`<div>`).addClass(`right`);
        const $divRightTop = $(`<div>`).addClass(`right-top`);

        const $divRightTopText = $(`<div>`).addClass(`right-top-text`);
        const $todoName = $(`<div>`)
          .addClass(`todo-name`)
          .text(todo.name);
        const $subType = $("<span>")
          .addClass("year")
          .text(todo.type);

        const $divBtn = $("<div>").addClass("right-top-btn");

        const __type_id = 3;
        const __img = todo.album.images[0].url;
        const __url = todo.external_urls.spotify;
        const __user_rating = todo.popularity;
        const __name = todo.name;
        const __sub_type = todo.type;
        const __api_id = todo.id;

        const $doMeBtn = $("<button>")
          .addClass("do-me btn-large")
          .text("do me")
          .click(() => {
            $.ajax(`/allTodos/new`, {
              method: "POST",
              contentType: "application/json",
              data: JSON.stringify({
                type_id: __type_id,
                img: __img,
                url: __url,
                user_rating: __user_rating,
                name: __name,
                subtype: __sub_type,
                api_id: __api_id
              })
            }).done((data) => {
              $.ajax(`/userTodos/${data.rows[0].todo_id}/add`, {
                method: "POST",
                contentType: "application/json",
                data: JSON.stringify({
                  todoId: data.rows[0].todo_id
                })
              });
            });
          });
        const $divRightBottom = $("<div>")
          .addClass("right-bottom")
          .text(todo.popularity);

        $article.append($divLeft);
        $divLeft.append($divLeftTop);
        $divLeftTop.append($divLeftImg);
        $divLeft.append($divLeftBottom);
        $divLeftBottom.append($divLeftBottomBtn);
        $article.append($divRight);
        $divRight.append($divRightBottom);
        $divRight.append($divRightTop);
        $divRightTop.append($divRightTopText);
        $divRightTop.append($divBtn);
        $divBtn.append($doMeBtn);
        $divRightTop.append($divRightTopText);
        $divRightTopText.append($todoName);
        $divRightTopText.append($subType);
        $todoContainer.append($article);
      }

      // Restaurant API results
      for (todo of allTodos[6]) {

        let rating = ''
        if (todo.restaurant.user_ratings) {
          rating = todo.restaurant.user_ratings.aggregate_rating
        } else { rating = '' }
        const $todoContainer = $(`.todos.container`);

        const $article = $("<article>").addClass(`card horizontal restaurants`);
        if ($(".types button.restaurants").val() === "false") {
          $article.hide();
        }
        const $divLeft = $(`<div>`).addClass(`left`);
        const $divLeftTop = $(`<div>`).addClass(`left-top`);
        const $divLeftImg = $("<img>")
          .addClass("image")
          .attr("src", todo.restaurant.thumb);
        const $divLeftBottom = $(`<div>`).addClass(`left-bottom`);
        const $divLeftBottomBtn = $(`<a>`)
          .addClass(`url`)
          .attr({ href: todo.restaurant.url, target: "_blank" })
          .text("Zomato");

        const $divRight = $(`<div>`).addClass(`right`);
        const $divRightTop = $(`<div>`).addClass(`right-top`);
        const $divRightTopText = $(`<div>`).addClass(`right-top-text`);
        const $todoName = $(`<div>`)
          .addClass(`todo-name`)
          .text(todo.restaurant.name);
        const $author = $("<span>")
          .addClass("author")
          .text(todo.restaurant.location.address);
        const $year = $("<span>").addClass("year");
        const $genre = $("<span>")
          .addClass("genre")
          .text(todo.restaurant.cuisines);
        const $divBtn = $("<div>").addClass("right-top-btn");

        const _parsed_api_id = todo.restaurant.id;
        const _parsed_name = todo.restaurant.name;
        const _parsed_location = todo.restaurant.location.address;
        const _parsed_genre = todo.restaurant.cuisines;
        const _parsed_url = todo.restaurant.url;
        const _parsed_img = todo.restaurant.thumb;
        const _parsed_user_rating = rating;
        const _parsed_type_id = 4;

        const $doMeBtn = $("<button>")
          .addClass("do-me btn-large")
          .text("do me")
          .click(() => {
            $.ajax(`/allTodos/new`, {
              method: "POST",
              contentType: "application/json",
              data: JSON.stringify({
                api_id: _parsed_api_id,
                name: _parsed_name,
                location: _parsed_location,
                genre: _parsed_genre,
                url: _parsed_url,
                img: _parsed_img,
                user_rating: _parsed_user_rating,
                type_id: _parsed_type_id
              })
            }).done((data) => {
              $.ajax(`/userTodos/${data.rows[0].todo_id}/add`, {
                method: "POST",
                contentType: "application/json",
                data: JSON.stringify({
                  todoId: data.rows[0].todo_id
                })
              });
            });
          });
        const $divRightBottom = $("<div>").addClass("right-bottom").text(rating);

        $article.append($divLeft);
        $divLeft.append($divLeftTop);
        $divLeftTop.append($divLeftImg);
        $divLeft.append($divLeftBottom);
        $divLeftBottom.append($divLeftBottomBtn);
        $article.append($divRight);
        $divRight.append($divRightBottom);
        $divRight.append($divRightTop);
        $divRightTop.append($divRightTopText);
        $divRightTop.append($divBtn);
        $divBtn.append($doMeBtn);
        $divRightTop.append($divRightTopText);
        $divRightTopText.append($todoName);
        $divRightTopText.append($author);
        $divRightTopText.append($year);
        $divRightTopText.append($genre);
        $todoContainer.append($article);
      }
    });
  });
});
