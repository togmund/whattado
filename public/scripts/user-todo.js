$(document).ready(() => {

  $("form.whattado.container").on("submit", function(event) {
    event.preventDefault();
    const $1h = $(this).children().children(".1h").val()
    const $3h = $(this).children().children(".3h").val()
    const $6h = $(this).children().children(".6h").val()
    const $24h = $(this).children().children(".24h").val()

    const $solo = $(this).children().children(".solo").val()
    const $duo = $(this).children().children(".duo").val()
    const $group = $(this).children().children(".group").val()
    const $family = $(this).children().children(".family").val()

    const $formValues = { $1h, $3h, $6h, $24h, $solo, $duo, $group, $family };
    console.log($formValues)

    $.ajax("/userTodos",{
      method: "GET",
      data: $formValues
    }).done((userTodos) => {
      const toBeDone = userTodos.filter( u => !u.done );

      for(const userTodo of toBeDone) {
        const $todoContainer = $(`.todos.container`);

        const $article = $('<article>').addClass(`card horizontal`);
        const $cardStacked = $(`<span>`).addClass(`card-stacked`);

        const $cardContent = $(`<span>`).addClass(`card-content`);
        const $todoName = $(`<p>`).text(userTodo.todo_name);
        const $typeName = $(`<p>`).text(userTodo.type_name);
        const $doneCount = $(`<p>`).text(userTodo.done_count);

        const $cardAction = $(`<span>`).addClass(`card-action right`);
        const $actionLink = $(`<a>`).addClass(`right`).attr(`href`, '#').text('do me');

        $article.append($cardStacked);

        $cardStacked.append($cardContent);
        $cardContent.append($todoName);
        $cardContent.append($typeName);
        $cardContent.append($doneCount);

        $cardStacked.append($cardAction);
        $cardAction.append($actionLink);

        $todoContainer.append($article);
      }
    });
  });
});
