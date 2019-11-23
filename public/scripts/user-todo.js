$(document).ready(() => {
  $("form.whattado.container").on("submit", function (event) {

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

    const formValues = { oneHour, threeHours, halfDay, allDay, solo, duo, group, family };

    const scoreMatrix = function (toggles, todo) {

      const filterScores = {
        oneHourmovies: -5,
        oneHourbooks: 2,
        oneHourmusic: 5,
        oneHourrestaurants: 2,
        threeHoursmovies: 5,
        threeHoursbooks: 2,
        threeHoursmusic: 3,
        threeHoursrestaurants: 2,
        halfDaymovies: 2,
        halfDaybooks: 1,
        halfDayrestaurants: 1,
        allDaymovies: 2,
        allDaybooks: 1,
        allDaymusic: 1,
        allDayrestaurants: 1,

        solomovies: 1,
        solobooks: 5,
        solomusic: 5,
        solorestaurants: 1,
        duomovies: 2,
        duobooks: -5,
        duomusic: 1,
        duorestaurants: 5,
        groupmovies: 2,
        groupbooks: -5,
        groupmusic: -2,
        grouprestaurants: 5,
        familymovies: -2,
        familybooks: 2,
        familymusic: -2,
        familyrestaurants: 2
      }
      let toggledRes = [];
      for (const toggle in toggles) {
        if (toggles[toggle] === "true") {
          toggledRes.push(toggle);
        }
      }

      const scoreOne = filterScores[`${toggledRes[0]}${todo}`];
      const scoreTwo = filterScores[toggledRes[1] + todo];
      return finalScore = parseInt(scoreOne) + parseInt(scoreTwo) + Math.random();

    }

    $.ajax("/userTodos", {
      method: "GET",
      data: formValues
    }).done((userTodos) => {
      $("#todo-spinner").hide();
      for (const userTodo of userTodos) {
        const $todoContainer = $(`.todos.container`);

        const $article = $("<article>").addClass(
          `card row ${userTodo.type_name}`
        ).attr('data-score', scoreMatrix(formValues, userTodo.type_name));
        if ($(`.types button.${userTodo.type_name}`).val() === "false") {
          $article.hide();
        }
        const $divLeft = $(`<div>`).addClass(`card-stacked col s3`);
        const $divLeftTop = $(`<div>`).addClass(`section`);
        const $divLeftImg = $("<img>")
          .addClass("image circle")
          .attr("src", userTodo.todo_img)
          .attr("style", "height: 95px; width: 95px; object-fit: cover;");
        const $divLeftBottom = $(`<div>`).addClass(`card-action`);
        const $divLeftBottomBtn = $(`<a>`)
          .addClass(`btn url grey lighten-4`)
          .attr({
            href: userTodo.todo_url,
            target: "_blank"
          })
          .attr("style", "border-radius:15px;");

        const $linkIcon = $("<i>").addClass(`${userTodo.type_color}-text text-${userTodo.type_color_accent}  material-icons`).text("link");


        const $divRight = $(`<div>`).addClass(`card-stacked col s9`);
        const $divRightTop = $(`<div>`).addClass(`card-content`);
        const $divRightTopText = $(`<div>`).addClass(`right-top-text`);
        const $todoName = $(`<h5>`)
          .addClass(`todo-name`)
          .text(userTodo.todo_name);
        const $author = $("<span>").addClass("author").text(userTodo.author);
        const $year = $("<span>").addClass("year").text(userTodo.year);
        const $genre = $("<span>").addClass("genre").text(userTodo.genre);
        const $divBtn = $("<div>").addClass("right-top-btn");
        const userTodoId = userTodo.user_todo_id;
        const $doMeBtn = $("<button>")
          .addClass("btn-floating right btn grey lighten-4")
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
                .text("check_box");
              setTimeout(() => { $article.hide("fast") }, 900);
            });
          });
        const $doMeUncheckedIcon = $("<i>").addClass("material-icons pink-text text-darken-3").text(`check_box_outline_blank`);

        const $divRightBottom = $("<div>").addClass("card-action row");
        const $typeBadge = $("<button>").addClass(`btn-floating btn ${userTodo.type_color_accent} ${userTodo.type_color} ${userTodo.type_name}`)
        const $typeBadgeIcon = $("<i>").addClass("material-icons").text(`${userTodo.type_img}`);

        const $scoreBadge = $("<button>").addClass(`btn-floating btn z-depth-0 yellow accent-3 offset-s1`)
        const $scoreBadgeIcon = $("<i>").addClass("material-icons").text("stars");


        $article.append($divLeft);
        $divLeft.append($divLeftTop);
        $divLeftTop.append($divLeftImg);
        $divLeft.append($divLeftBottom);
        $divLeftBottom.append($divLeftBottomBtn);
        $divLeftBottomBtn.append($linkIcon);

        $article.append($divRight);
        $divRight.append($divRightTop);

        $divRightTop.append($divBtn);
        $divRightTop.append($divRightTopText);
        $divRightTopText.append($todoName);
        $divRightTopText.append($author);
        $divRightTopText.append($year);
        $divRightTopText.append($genre);


        $divRight.append($divRightBottom);

        $divRightBottom.append($typeBadge);
        $typeBadge.append($typeBadgeIcon);
        if (userTodo.todo_user_rating > 3) {
          $scoreBadge.append($scoreBadgeIcon);
          $divRightBottom.append($scoreBadge);
        }

        $divBtn.append($doMeBtn);
        $doMeBtn.append($doMeUncheckedIcon);

        $todoContainer.append($article);

        // console.log($article.data("score"));
        $todoContainer
          .find("article")
          .sort(function (a, b) {

            return b.dataset.score - a.dataset.score;
          })
          .appendTo($todoContainer);
      }
      $(".search-form").hide();
      $("div.times").slideToggle("fast");
      $("div.groups").slideToggle("fast");
      $("div.row.submit").slideToggle("fast");
    });
  });
});
