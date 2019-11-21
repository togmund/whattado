$(document).ready(function () {
  $(".search-form").hide();
  // $('.fixed-action-btn').floatingActionButton();
  $("#new-search").on("click", () => {
    $(".search-form").slideToggle("slow");
  });
  $(".search-form").submit(() => {
    event.preventDefault();
    $(`.todos.container`).empty();
    $search = $(".search-form input").val();
    $.ajax("/allTodos", {
      method: "GET",
      data: { $search: $search }
    }).done((allTodos) => {
      for (todo of allTodos[0]) {

        const $todoContainer = $(`.todos.container`);

        const $article = $('<article>').addClass(`card horizontal`);
        const $divLeft = $(`<div>`).addClass(`left`);
        const $divLeftTop = $(`<div>`).addClass(`left-top`);
        const $divLeftImg = $('<img>').addClass('image').attr('src',todo.todo_img);
        const $divLeftBottom = $(`<div>`).addClass(`left-bottom`);
        const $divLeftBottomBtn = $(`<button>`).addClass(`url`);


        const $divRight = $(`<div>`).addClass(`right`);
        const $divRightTop = $(`<div>`).addClass(`right-top`);
        const $divRightTopText = $(`<div>`).addClass(`right-top-text`);
        const $todoName = $(`<div>`).addClass(`todo-name`).text(todo.todo_name);
        const $author = $('<span>').addClass('author');
        const $year = $('<span>').addClass('year');
        const $genre = $('<span>').addClass('genre');
        const $divBtn = $('<div>').addClass('right-top-btn');
        const todoId = todo.todo_id;
        const $doMeBtn = $('<button>').addClass('do-me').click(() => {
          $.ajax(`/userTodos/${userTodosId}`, {
            method: "PUT",
            data: {todoId: todoId}
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
              $divRightTopText.append($genre);
       $todoContainer.append($article);
      }
    });

  });
});
