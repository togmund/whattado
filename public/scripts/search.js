$(document).ready(function () {
  $(".search-form").hide();
  // $('.fixed-action-btn').floatingActionButton();
  $("#new-search").on("click",() => {
    $(".search-form").slideToggle("slow");
  })
});
