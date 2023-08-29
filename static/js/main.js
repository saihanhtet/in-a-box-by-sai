$(window).scroll(function () {
  $("nav").toggleClass("scrolled", $(this).scrollTop() > 0);
  $(".footer").toggleClass("scrolled", $(this).scrollTop() > 0);
});
