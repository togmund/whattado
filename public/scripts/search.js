$(document).ready(function() {
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
        const $doMeBtn = $("<button>")
          .addClass("do-me btn-large")
          .text("do me")
          .click(() => {
            $.ajax(`/allTodos/new`, {
              method: "POST",
              contentType: "application/json",
              data: JSON.stringify({
                api_id: todo.imdbID,
                name: todo.Title,
                subtype: todo.Type,
                year: todo.Year,
                url: `https://imdb.com/title/` + todo.imdbID,
                img: todo.Poster,
                type_id: 1
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
        if (todo.volumeInfo.imageLinks) {
          $divLeftImg = $("<img>")
            .addClass("image circle")
            .attr("src", todo.volumeInfo.imageLinks.thumbnail);
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
        // const todoId = todo.todo_id;
        const apiId = todo.volumeInfo.industryIdentifiers[0].identifier;
        const bookAuthor = todo.volumeInfo.authors[0];
        const bookUrl = todo.volumeInfo.infoLink;
        const bookName = todo.volumeInfo.title;
        const bookRating = todo.volumeInfo.averageRating;
        const bookImg = todo.volumeInfo.imageLinks.thumbnail;
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
              console.log('WTF');
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
        console.log(todo.images);
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
          .addClass("sub_type")
          .text(todo.type);
        const $divBtn = $("<div>").addClass("right-top-btn");
        const $doMeBtn = $("<button>")
          .addClass("do-me btn-large")
          .text("do me")
          .click(() => {
            $.ajax(`/allTodos/new`, {
              method: "POST",
              contentType: "application/json",
              data: JSON.stringify({
                type_id: 3,
                img: todo.images[0].url,
                url: todo.external_urls.spotify,
                name: todo.name,
                author: todo.artists[0].name,
                year: todo.release_date,
                sub_type: todo.type,
                api_id: todo.id
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
        if (todo.images.length !== 0) {
          $divLeftImg = $("<img>")
            .addClass("image circle")
            .attr("src", todo.images[0].url);
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
        const $doMeBtn = $("<button>")
        .addClass("do-me btn-large")
        .text("do me")
        .click(() => {
          $.ajax(`/allTodos/new`, {
            method: "POST",
            contentType: "application/json",
            data: JSON.stringify({
                type_id: 3,
                img: todo.images[0].url,
                url: todo.external_urls.spotify,
                user_rating: todo.popularity,
                name: todo.name,
                sub_type: todo.type,
                api_id: todo.id
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
        console.log(todo);
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
        const $doMeBtn = $("<button>")
        .addClass("do-me btn-large")
        .text("do me")
        .click(() => {
          $.ajax(`/allTodos/new`, {
            method: "POST",
            contentType: "application/json",
            data: JSON.stringify({
                type_id: 3,
                img: todo.album.images[0].url,
                url: todo.external_urls.spotify,
                user_rating: todo.popularity,
                name: todo.name,
                sub_type: todo.type,
                api_id: todo.id
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
        const $doMeBtn = $("<button>")
        .addClass("do-me btn-large")
        .text("do me")
        .click(() => {
          $.ajax(`/allTodos/new`, {
            method: "POST",
            contentType: "application/json",
            data: JSON.stringify({
                api_id: todo.restaurant.id,
                name: todo.restaurant.name,
                location: todo.restaurant.location.address,
                genre: todo.restaurant.cuisines,
                url: todo.restaurant.url,
                img: todo.restaurant.thumb,
                user_rating:rating,
                type_id: 4
              })
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
