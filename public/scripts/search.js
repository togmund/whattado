$(document).ready(function() {
  $(".search-form").hide();
  // $('.fixed-action-btn').floatingActionButton();
  $("#new-search").on("click",() => {
    $(".search-form").slideToggle("slow");
  });
  $(".search-form").submit(() => {
    event.preventDefault();
    $.ajax("/allTodos",{
      method: "GET"
    }).done((allTodos) => {
      console.log(allTodos);
      for (todo of allTodos) {
        const $todoContainer = $(`.todos.container`);

        const $article = $('<article>').addClass(`card horizontal`);
        const $cardStacked = $(`<span>`).addClass(`card-stacked`);

        const $cardContent = $(`<span>`).addClass(`card-content`);
        const $todoName = $(`<p>`).text(todo.todo_name);
        const $typeName = $(`<p>`).text(todo.type_name);

        const $cardAction = $(`<span>`).addClass(`card-action right`);
        const todoId = todo.todo_id;
        const $actionLink = $(`<a>`).addClass(`right`).attr(`data`, `${todo.todo_id}`).text('do me').click(()=> {
          console.log(todoId);
          $.ajax("/userTodos/:id/add", {
            method:"POST",
            data:{todoId: todoId}
          });
        });

        $article.append($cardStacked);
        $cardStacked.append($cardContent);
        $cardContent.append($todoName);
        $cardContent.append($typeName);
        $cardStacked.append($cardAction);
        $cardAction.append($actionLink);


        $todoContainer.append($article);
      }
    });

  });
});
