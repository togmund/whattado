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

    const $formValues = {oneHour, threeHours, halfDay, allDay, solo, duo, group, family};

    const scoreMatrix = function (toggles, todo) {
      const filterScores = {
        oneHourmovies: -5,
        oneHourbooks: 2,
        oneHourmusic: 5,
        oneHoursestaurants: 2,
        threeHoursmovies: 5,
        threeHoursbooks: 2,
        threeHoursmusic: 3,
        threeHoursrestaurants: 2,
        sixHoursmovies: 2,
        sixHoursbooks: 1,
        sixHoursrestaurants: 1,
        oneDaymovies: 2,
        oneDaysbooks: 1,
        oneDaymusic: 1,
        oneDayrestaurants: 1,

        solomovies: 1,
        solomooks: 5,
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
        if(toggles[toggle]) {
          toggledRes.push(toggle);
        }
      }
      const scoreOne = filterScores[toggledRes[0] + todo];
      const scoreTwo = filterScores[toggledRes[1] + todo];

      return finalScore = scoreOne + scoreTwo;
      //loop through form values and retreive keys with the value of true
      //Using those two criteria we calculate the score in relation to todo.type_id
      //return a number and assign the number as a class to the article container
      //we'll sort the containers based on the scores
      //we'll hide the ones with the lowest score
    }

    $.ajax("/userTodos",{
      method: "GET",
      data: $formValues
    }).done((userTodos) => {
      $("#todo-spinner").hide();
      for (const userTodo of userTodos) {
        const $todoContainer = $(`.todos.container`);

        const $article = $("<article>").addClass(
          `card row ${userTodo.type_name}`
        );
        if ($(`.types button.${userTodo.type_name}`).val() === "false") {
          $article.hide();
        }
        const $divLeft = $(`<div>`).addClass(`card-stacked col s3`);
        const $divLeftTop = $(`<div>`).addClass(`section`);
        const $divLeftImg = $("<img>")
          .addClass("image circle")
          .attr("src", userTodo.todo_img)
          .attr("style","height: 95px; width: 95px; object-fit: cover;");
        const $divLeftBottom = $(`<div>`).addClass(`card-action`);
        const $divLeftBottomBtn = $(`<a>`)
        .addClass(`btn url`)
          .attr({
            href: userTodo.todo_url,
            target: "_blank"
          })
          .attr("style","border-radius:10px;")
          .text(userTodo.type_name + ' link');;

        const $divRight = $(`<div>`).addClass(`card-stacked col s9`);
        const $divRightTop = $(`<div>`).addClass(`card-content`);
        const $divRightTopText = $(`<div>`).addClass(`right-top-text`);
        const $todoName = $(`<h4>`)
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
              setTimeout(() => {$article.hide("fast")},900);
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

        $divBtn.append($doMeBtn);
        $doMeBtn.append($doMeUncheckedIcon);

        $todoContainer.append($article);
      }

      $(".search-form").hide();
      $("div.times").slideToggle("fast");
      $("div.groups").slideToggle("fast");
      $("div.row.section.submit").slideToggle("fast");
    });
  });
});
