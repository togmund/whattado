$(document).ready(() => {

  $(".times button").on("click", function (event) {
    event.preventDefault();
    if ($(this).val() === 'false') {
      $(this).removeClass("red-text text-lighten-3 grey lighten-4 z-depth-0").addClass("red lighten-3").val(true).siblings().addClass("red-text text-lighten-3 grey lighten-4 z-depth-0").removeClass("red lighten-3").val(false);
    }
  });

  $(".groups button").on("click", function (event) {
    event.preventDefault();
    if ($(this).val() === 'false') {
      $(this).removeClass("red-text text-accent-2 grey lighten-4 z-depth-0").addClass("red accent-2").val(true).siblings().addClass("red-text text-accent-2 grey lighten-4 z-depth-0").removeClass("red accent-2").val(false);
    }
  });

  // $(".groups button").on("click", function (event) {
  //   event.preventDefault();
  //   if ($(this).val() === 'false') {
  //     $(this).removeClass("red-text text-accent-2 grey lighten-4 z-depth-0").addClass("red accent-2").val(true).siblings().addClass("red-text text-accent-2 grey lighten-4 z-depth-0").removeClass("red accent-2").val(false);
  //   }
  // });

});
