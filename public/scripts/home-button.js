$(document).ready(function() {
  $(".brand-logo").on("click", () =>{
    event.preventDefault();
    $(".todos.container").empty();
    $(".search-form").hide();
    $("div.times").slideDown("fast");
    $("div.groups").slideDown("fast");
    $("div.row.section.submit").slideDown("fast");
  })
});
