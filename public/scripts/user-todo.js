$(document).ready(() => {

  $("form.whattado.container").on("submit", function(event) {
    console.log(event);

    event.preventDefault();

    $.ajax("/userTodos",{
      method: "GET",
      data: $(this).serialize()
    }).done((userTodos) => {
      for(userTodo of userTodos) {
        $(`"<article class="card horizontal ${userTodo.user_todo_id}">"`).appendTo($(".todo.container"));

          $(`"<span class="card-stacked">"`).appendTo($(`".${userTodo.user_todo_id}"`));

            $(`"<span class="card-content">"`).appendTo($(`".${userTodo.user_todo_id} .card-stacked"`));

              $("<p>").text(userTodo.todo_name).appendTo($(".${userTodo.user_todo_id} .card-content"));
              $("<p>").text(userTodo.type_name).appendTo($(".${userTodo.user_todo_id} .card-content"));
              $("<p>").text(userTodo.done_count).appendTo($(".${userTodo.user_todo_id} .card-content"));

            $(`"<span class="card-action right">"`).appendTo($(`".${userTodo.user_todo_id}"`));
              $(`"<a class="right" href="# right">do me</a>"`).appendTo($(`".${userTodo.user_todo_id} .card-action"`));
      }
    });
  });
});
