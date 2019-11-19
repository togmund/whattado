$(document).ready(function() {
  $("nav .login-clicker").on("click",() => {
    const $loginId = $(this).find("#id_inline").val();
    console.log("on click",$loginId);
    $.ajax("/login/", {
      method:"POST",
      data:{ loginId:$loginId }
    }).then(() => {
    });
  });
});
