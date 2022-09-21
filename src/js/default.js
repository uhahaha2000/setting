$(window).scroll(function() {
  
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
  
}).scroll();
