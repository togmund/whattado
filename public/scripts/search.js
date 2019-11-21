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
    }).done((allTodos) => {
      $("#todo-spinner").hide();
      // for (todo of allTodos[0]) {
      //   const $todoContainer = $(`.todos.container`);

      //   const $article = $('<article>').addClass(`card horizontal`);
      //   const $divLeft = $(`<div>`).addClass(`left`);
      //   const $divLeftTop = $(`<div>`).addClass(`left-top`);
      //   const $divLeftImg = $('<img>').addClass('image').attr('src', todo.todo_img);
      //   const $divLeftBottom = $(`<div>`).addClass(`left-bottom`);
      //   const $divLeftBottomBtn = $(`<button>`).addClass(`url`);


      //   const $divRight = $(`<div>`).addClass(`right`);
      //   const $divRightTop = $(`<div>`).addClass(`right-top`);
      //   const $divRightTopText = $(`<div>`).addClass(`right-top-text`);
      //   const $todoName = $(`<div>`).addClass(`todo-name`).text(todo.todo_name);
      //   const $author = $('<span>').addClass('author');
      //   const $year = $('<span>').addClass('year');
      //   const $genre = $('<span>').addClass('genre');
      //   const $divBtn = $('<div>').addClass('right-top-btn');
      //   const todoId = todo.todo_id;
      //   const $doMeBtn = $('<button>').addClass('do-me').click(() => {
      //     $.ajax(`/userTodos/${userTodosId}`, {
      //       method: "PUT",
      //       data: { todoId: todoId }
      //     }).done(() => {
      //       // console.log('successfully marked as done', userTodo);
      //     });
      //   });
      //   const $divRightBottom = $('<div>').addClass('right-bottom');


      //   $article.append($divLeft);
      //   $divLeft.append($divLeftTop);
      //   $divLeftTop.append($divLeftImg);
      //   $divLeft.append($divLeftBottom);
      //   $divLeftBottom.append($divLeftBottomBtn);
      //   $article.append($divRight);
      //   $divRight.append($divRightBottom);
      //   $divRight.append($divRightTop);
      //   $divRightTop.append($divRightTopText);
      //   $divRightTop.append($divBtn);
      //   $divBtn.append($doMeBtn);
      //   $divRightTop.append($divRightTopText);
      //   $divRightTopText.append($todoName);
      //   $divRightTopText.append($author);
      //   $divRightTopText.append($year);
      //   $divRightTopText.append($genre);
      //   $todoContainer.append($article);
      // }
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

      // Album Card Builder
      for (todo of allTodos[0]) {

        const $todoContainer = $(`.todos.container`);

        const $article = $('<article>').addClass(`card horizontal music`);
        const $divLeft = $(`<div>`).addClass(`left`);
        const $divLeftTop = $(`<div>`).addClass(`left-top`);
        const $divLeftImg = $('<img>').addClass('image circle').attr('src', todo.images[0].url);
        const $divLeftBottom = $(`<div>`).addClass(`left-bottom`);
        const $divLeftBottomBtn = $(`<a>`).addClass(`url`).text(todo.external_urls.spotify);


        const $divRight = $(`<div>`).addClass(`right`);
        const $divRightTop = $(`<div>`).addClass(`right-top`);
        const $divRightTopText = $(`<div>`).addClass(`right-top-text`);
        const $todoName = $(`<div>`).addClass(`todo-name`).text(todo.name);
        const $author = $('<span>').addClass('author').text(todo.artists[0].name);
        const $year = $('<span>').addClass('year').text(todo.release_date);
        const $subType = $('<span>').addClass('sub_type').text(todo.type);
        const $divBtn = $('<div>').addClass('right-top-btn');
        const $doMeBtn = $('<button>').addClass('do-me').click(() => {
          $.ajax(`/allTodos/new`, {
            method: "PUT",
            data: {
              user_id: req.session.userId,
              type_id: 3,
              img: todo.images[0].url,
              url: todo.external_urls.spotify,
              name: todo.name,
              author: todo.artists[0].name,
              year: todo.release_date,
              sub_type: todo.type,
              api_id: todo.id
            }
          }).done(() => {
            // console.log('successfully marked as done', userTodo);
          });
        });
        const $divRightBottom = $('<div>').addClass('right-bottom');


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
      for (todo of allTodos[1]) {
        const $todoContainer = $(`.todos.container`);

        const $article = $('<article>').addClass(`card horizontal music`);
        const $divLeft = $(`<div>`).addClass(`left`);
        const $divLeftTop = $(`<div>`).addClass(`left-top`);
        const $divLeftImg = $('<img>').addClass('image circle').attr('src', todo.images[0].url);
        const $divLeftBottom = $(`<div>`).addClass(`left-bottom`);
        const $divLeftBottomBtn = $(`<a>`).addClass(`url`).text(todo.external_urls.spotify);


        const $divRight = $(`<div>`).addClass(`right`);
        const $divRightTop = $(`<div>`).addClass(`right-top`);

        const $divRightTopText = $(`<div>`).addClass(`right-top-text`);
        const $todoName = $(`<div>`).addClass(`todo-name`).text(todo.name);
        const $subType = $('<span>').addClass('year').text(todo.type);
        const $genre = $('<span>').addClass('genre').text(todo.genres[0]);

        const $divBtn = $('<div>').addClass('right-top-btn');
        const $doMeBtn = $('<button>').addClass('do-me').click(() => {
          $.ajax(`/allTodos/new`, {
            method: "PUT",
            data: {
              user_id: req.session.userId,
              type_id: 3,
              img: todo.images[0].url,
              url: todo.external_urls.spotify,
              user_rating: todo.popularity,
              name: todo.name,
              sub_type: todo.type,
              api_id: todo.id
            }
          }).done(() => {
            // console.log('successfully marked as done', userTodo);
          });
        });
        const $divRightBottom = $('<div>').addClass('right-bottom').text(todo.popularity);


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
      for (todo of allTodos[2]) {
        console.log(todo);
        const $todoContainer = $(`.todos.container`);

        const $article = $('<article>').addClass(`card horizontal music`);
        const $divLeft = $(`<div>`).addClass(`left`);
        const $divLeftTop = $(`<div>`).addClass(`left-top`);
        const $divLeftImg = $('<img>').addClass('image circle').attr('src', todo.album.images[0].url);
        const $divLeftBottom = $(`<div>`).addClass(`left-bottom`);
        const $divLeftBottomBtn = $(`<a>`).addClass(`url`).text(todo.external_urls.spotify);


        const $divRight = $(`<div>`).addClass(`right`);
        const $divRightTop = $(`<div>`).addClass(`right-top`);

        const $divRightTopText = $(`<div>`).addClass(`right-top-text`);
        const $todoName = $(`<div>`).addClass(`todo-name`).text(todo.name);
        const $subType = $('<span>').addClass('year').text(todo.type);

        const $divBtn = $('<div>').addClass('right-top-btn');
        const $doMeBtn = $('<button>').addClass('do-me').click(() => {
          $.ajax(`/allTodos/new`, {
            method: "PUT",
            data: {
              user_id: req.session.userId,
              type_id: 3,
              img: todo.album.images[0].url,
              url: todo.external_urls.spotify,
              user_rating: todo.popularity,
              name: todo.name,
              sub_type: todo.type,
              api_id: todo.id
            }
          }).done(() => {
            // console.log('successfully marked as done', userTodo);
          });
        });
        const $divRightBottom = $('<div>').addClass('right-bottom').text(todo.popularity);


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

    })


  });
});
