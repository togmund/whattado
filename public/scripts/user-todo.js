$(document).ready(() => {

  $("form.whattado.container").on("submit", function(event) {

    event.preventDefault();

    $(".todos.container").empty();

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
      for (const userTodo of userTodos) {
        const $todoContainer = $(`.todos.container`);

        const $article = $('<article>').addClass(`card horizontal`);
        const $cardStacked = $(`<span>`).addClass(`card-stacked`);

        const $cardContent = $(`<span>`).addClass(`card-content`);
        const $todoName = $(`<p>`).text(userTodo.todo_name);
        const $typeTag = $(`<i>`).addClass(`material-icons`).addClass(`${userTodo.type_color}-text`).addClass(`text-${userTodo.type_color_accent}`).text(userTodo.type_img);
        const $doneCount = $(`<p>`).addClass("right").text(userTodo.done_count);

        const $cardAction = $(`<span>`).addClass(`card-action right`);
        // const $actionLink = $(`<a>`).addClass(`right`).attr(`href`, '#').text('do me');
        const userTodosId = userTodo.user_todo_id;
        const $actionLink = $(`<a>`).addClass(`right`).text('do me').click(() => {
          $.ajax(`/userTodos/${userTodosId}`, {
            method: "PUT",
            data: userTodosId
          }).done(() => {
            // console.log('successfully marked as done', userTodo);
          });
        });

        $article.append($cardStacked);

        $cardStacked.append($cardContent);
        $cardContent.append($todoName);
        $cardContent.append($typeTag);
        $cardContent.append($doneCount);

        $cardStacked.append($cardAction);
        $cardAction.append($actionLink);

        $todoContainer.append($article);
      }
    });
  });
});
