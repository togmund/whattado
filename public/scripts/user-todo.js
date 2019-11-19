$(document).ready(() => {

  $("form.whattado.container").on("submit", function(event) {
    event.preventDefault();

    $.ajax("/userTodos",{
      method: "GET"
    }).done((userTodos) => {
      console.log(userTodos);
      for(userTodo of userTodos) {
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

        // $(`<article class="card horizontal ${userTodo.user_todo_id}">`).appendTo($(".todos.container"));

          // $(`<span class="card-stacked">`).appendTo($(`.${userTodo.user_todo_id}`));

            // $(`<span class="card-content">`).appendTo($(`.${userTodo.user_todo_id} .card-stacked`));

              // $("<p>").text(userTodo.todo_name).appendTo($(".${userTodo.user_todo_id} .card-content"));
              // $("<p>").text(userTodo.type_name).appendTo($(".${userTodo.user_todo_id} .card-content"));
              // $("<p>").text(userTodo.done_count).appendTo($(".${userTodo.user_todo_id} .card-content"));

            // $(`"<span class="card-action right">"`).appendTo($(`".${userTodo.user_todo_id}"`));
            //   $(`"<a class="right" href="# right">do me</a>"`).appendTo($(`".${userTodo.user_todo_id} .card-action"`));
      }
    });
  });
});
