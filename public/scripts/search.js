$(document).ready(function () {
  $(".search-form").hide();
  // $('.fixed-action-btn').floatingActionButton();
  $("#new-search").on("click",() => {
    $(".search-form").slideToggle("slow");
  })
  $(".search-form").on("submit",() => {
    event.preventDefault();
    $.ajax("/allTodos",{
      method: "GET",
      data: $(this).serialize()
    })
  })
});
