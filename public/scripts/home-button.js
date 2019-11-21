$(document).ready(function() {
  $("#todo-spinner").hide();
  $(".search-form").hide();
  $(".brand-logo").on("click", () =>{
    event.preventDefault();
    $(".todos.container").empty();
    $(".search-form").hide();
    $("div.times").slideDown("fast");
    $("div.groups").slideDown("fast");
    $("div.row.section.submit").slideDown("fast");
  })
});
