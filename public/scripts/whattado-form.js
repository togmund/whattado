$(document).ready(() => {

  $(".times button").on("click", function(event) {
    event.preventDefault();
    if ($(this).val() === 'false') {
      $(this)
        .removeClass("pink-text text-darken-1 grey lighten-4 z-depth-0")
        .addClass("pink darken-1")
        .val(true)
      .siblings()
        .addClass("pink-text text-darken-1 grey lighten-4 z-depth-0")
        .removeClass("pink darken-1")
        .val(false);
    }
  });

  $(".groups button").on("click", function(event) {
    event.preventDefault();
    if ($(this).val() === 'false') {
      $(this)
        .removeClass("pink-text text-darken-2 grey lighten-4 z-depth-0")
        .addClass("pink darken-2")
        .val(true)
      .siblings()
        .addClass("pink-text text-darken-2 grey lighten-4 z-depth-0")
        .removeClass("pink darken-2")
        .val(false);
    }
  });

  $(".types button.movies").on("click", function(event) {
    event.preventDefault();
    if ($(this).val() === 'false') {
      $(this)
        .removeClass("grey lighten-4")
        .addClass("red accent-4")
        .val(true)
        .children().removeClass("red-text text-accent-4");
    } else {
      $(this)
        .addClass("grey lighten-4")
        .removeClass("red accent-4")
        .val(false)
        .children().addClass("red-text text-accent-4");
    }
  });

  $(".types button.books").on("click", function(event) {
    event.preventDefault();
    if ($(this).val() === 'false') {
      $(this)
        .removeClass("grey lighten-4")
        .addClass("indigo darken-2")
        .val(true)
        .children().removeClass("indigo-text text-darken-2");
    } else {
      $(this)
        .addClass("grey lighten-4")
        .removeClass("indigo darken-2")
        .val(false)
        .children().addClass("indigo-text text-darken-2");
    }
  });

  $(".types button.music").on("click", function(event) {
    event.preventDefault();
    if ($(this).val() === 'false') {
      $(this)
        .removeClass("grey lighten-4")
        .addClass("teal darken-3")
        .val(true)
        .children().removeClass("teal-text text-darken-3");
    } else {
      $(this)
        .addClass("grey lighten-4")
        .removeClass("teal darken-3")
        .val(false)
        .children().addClass("teal-text text-darken-3");
    }
  });

  $(".types button.restaurants").on("click", function(event) {
    event.preventDefault();
    if ($(this).val() === 'false') {
      $(this)
        .removeClass("grey lighten-4")
        .addClass("amber darken-4")
        .val(true)
        .children().removeClass("amber-text text-darken-4");
    } else {
      $(this)
        .addClass("grey lighten-4")
        .removeClass("amber darken-4")
        .val(false)
        .children().addClass("amber-text text-darken-4");
    }
  });

});
