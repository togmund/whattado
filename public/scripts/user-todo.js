$(document).ready(() => {

  $("form.whattado.container").on("submit", function(event) {
    event.preventDefault();

    $.ajax("/userTodos",{
      method: "GET"
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
