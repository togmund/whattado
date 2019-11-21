$(document).ready(function() {
  $('.modal').modal();
  $(".modal-trigger").on("click", () =>{
    event.preventDefault();
    $('.trigger-modal').modal();
  })
  $("#login-modal button").on("click",() => {
    const $loginId = $("#login-id").val();
    console.log("on click",$loginId);
    $.ajax("/login/", {
      method:"POST",
      data:{ loginId:$loginId }
    }).then(() => {
      $('#login-modal').modal("close");
      $('.modal-trigger').text("Frank Rosé")
    });
  });
});
