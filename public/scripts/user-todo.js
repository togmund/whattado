$(document).ready(() => {
  $("form.whattado.container").on("submit", function(event) {

    event.preventDefault();

    $(".todos.container").empty();
    $("#todo-spinner").show();
    const oneHour = $(this).find(".1h").val();
    const threeHours = $(this).find(".3h").val();
    const halfDay = $(this).find(".6h").val();
    const allDay = $(this).find(".24h").val();

    const solo = $(this).find(".solo").val();
    const duo = $(this).find(".duo").val();
    const group = $(this).find(".group").val();
    const family = $(this).find(".family").val();

    const movies = $(this).find(".movies").val();
    const books = $(this).find(".books").val();
    const music = $(this).find(".music").val();
    const restaurants = $(this).find(".restaurants").val();

    const $formValues = { oneHour, threeHours, halfDay, allDay, solo, duo, group, family, movies, books, music, restaurants };

    $.ajax("/userTodos",{
      method: "GET",
      data: $formValues
    }).done((userTodos) => {
      $("#todo-spinner").hide();
      for (const userTodo of userTodos) {
        const $todoContainer = $(`.todos.container`);

        const $article = $("<article>").addClass(
          `card horizontal ${userTodo.type_name}`
        );
        if ($(`.types button.${userTodo.type_name}`).val() === "false") {
          $article.hide();
        }
        const $divLeft = $(`<div>`).addClass(`card-stacked`);
        const $divLeftTop = $(`<div>`).addClass(`card-image`);
        const $divLeftImg = $("<img>")
          .addClass("image")
          .attr("src", userTodo.todo_img);
        const $divLeftBottom = $(`<div>`).addClass(`card-action`);
        const $divLeftBottomBtn = $(`<a>`)
        .addClass(`url`)
          .attr({
            href: userTodo.todo_url,
            target: "_blank"
          })
          .text(userTodo.type_name + ' link');;

        const $divRight = $(`<div>`).addClass(`card-stacked`);
        const $divRightTop = $(`<div>`).addClass(`card-content`);
        const $divRightTopText = $(`<div>`).addClass(`right-top-text`);
        const $todoName = $(`<div>`)
          .addClass(`todo-name`)
          .text(userTodo.todo_name);
        const $author = $("<span>").addClass("author").text(userTodo.author);
        const $year = $("<span>").addClass("year").text(userTodo.year);
        const $genre = $("<span>").addClass("genre").text(userTodo.genre);
        const $divBtn = $("<div>").addClass("right-top-btn");
        const userTodoId = userTodo.user_todo_id;
        const $doMeBtn = $("<button>")
          .addClass("btn-floating btn grey lighten-4")
          .click(() => {
            event.preventDefault();
            $.ajax(`/userTodos/${userTodoId}`, {
              method: "put",
              contentType: "application/json",
              data: JSON.stringify({
                userTodoId: userTodoId
              })
            }).done(() => {
              $doMeBtn
                .removeClass("grey lighten-4")
                .addClass("pink darken-3")
              .children()
                .removeClass("pink-text text-darken-3")
                .text(check_box);
              setTimeout(() => {$article.hide("fast")},2000);
            });
          });
        const $doMeUncheckedIcon = $("<i>").addClass("material-icons pink-text text-darken-3").text(`check_box_outline_blank`);

        const $divRightBottom = $("<div>").addClass("card-action").text(userTodo.todo_user_rating);
        const $typeBadge = $("<button>").addClass(`btn-floating btn ${userTodo.type_color_accent} ${userTodo.type_color} ${userTodo.type_name}`)
        const $typeBadgeIcon = $("<i>").addClass("material-icons").text(`${userTodo.type_img}`);


        $article.append($divLeft);
        $divLeft.append($divLeftTop);
        $divLeftTop.append($divLeftImg);
        $divLeft.append($divLeftBottom);
        $divLeftBottom.append($divLeftBottomBtn);
        $article.append($divRight);
        $divRight.append($divRightBottom);
        $divRightBottom.append($typeBadge);
        $typeBadge.append($typeBadgeIcon);
        $divRight.append($divRightTop);
        $divRightTop.append($divRightTopText);
        $divRightTop.append($divBtn);
        $divBtn.append($doMeBtn);
        $doMeBtn.append($doMeUncheckedIcon);
        $divRightTop.append($divRightTopText);
        $divRightTopText.append($todoName);
        $divRightTopText.append($author);
        $divRightTopText.append($year);
        $divRightTopText.append($genre);
        $todoContainer.append($article);
      }

      $(".search-form").hide();
      $("div.times").slideToggle("fast");
      $("div.groups").slideToggle("fast");
      $("div.row.section.submit").slideToggle("fast");
    });
  });
});
