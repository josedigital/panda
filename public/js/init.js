(function($){
  $(function(){

    $('.button-collapse').sideNav();
    $('.parallax').parallax();



  // Fade-in onLoad
  /*----------------------------------------------------------------*/  
  var $window = $(window);
  var $wrapper = $('.page-wrapper');
  var $loader = $('.preloader-wrapper');

    // Disable animations/transitions until the page has loaded.
    	$wrapper.addClass('animated');

    	$window.on('load', function() {
    		window.setTimeout(function() {
    			$wrapper.addClass('fadeIn');
          $loader.remove();
    		}, 750);
    	});



  }); // end of document ready
})(jQuery); // end of jQuery name space
