"use strict";

/* $(window).scroll(function() {
  
  // selectors
  const $window = $(window),
      $header = $('.header'),
      $section = $('.section');
  const scroll = $window.scrollTop() + ($header.height() / 1);
 
  $section.each(function () {
    var $this = $(this);
    if  (!$this.data('color')) return;
    
    if ($this.position().top <= scroll && $this.position().top + $this.height() > scroll) {
      // Remove all classes on body with color-
      $header.removeClass(function (index, css) {
        return (css.match (/(^|\s)color-\S+/g) || []).join(' ');
      });
      // Add class of currently active div
      $header.addClass('color-' + $this.data('color'));
    }
  });    
  
}).scroll(); */
var $window = window,
    $header = document.querySelector("header"),
    $section = document.querySelectorAll("section");
window.addEventListener("scroll", function () {
  var scroll = window.pageYOffset
  /* || document.documentElement.scrollTop || document.body.scrollTop */
  + $header.getBoundingClientRect().height / 1;
  $section.forEach(function (section, i) {
    if (!section.dataset.color) return;

    if (section.offsetTop <= scroll && section.offsetTop + section.getBoundingClientRect().height > scroll) {
      var hasHeaderClassLength = $header.classList.length;

      for (var _i = 0; _i < hasHeaderClassLength; _i++) {
        if ($header.classList.item(_i).match(/(^|\s)color-\S+/g)) {
          $header.classList.remove($header.classList.item(_i));
        }
      } //console.log(hasHeaderClass);

      /* $header.removeClass(function (index, css) {
      		return (css.match(/(^|\s)color-\S+/g) || []).join(" ");
      	}); */


      $header.classList.add("color-" + section.dataset.color);
    }
  });
});
//# sourceMappingURL=default.js.map
