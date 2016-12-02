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
    		$wrapper.addClass('fadeIn');
          $loader.remove();
        if($window.width() < 992) {
          $wrapper.removeClass('page-wrapper animated fadeIn');
        }
    	});
  

  // Disable Checkboxes after 4 are chosen
  /*----------------------------------------------------------------*/
  var checkedBoxes = $(document).find('.checkbox');
  checkedBoxes.on('change', function () {
    var j = $( "input:checked" ).length;
    if(j >= 4) {
      for(var i = 0; i < checkedBoxes.length; i++) {
        if( checkedBoxes[i].checked === false) {
          checkedBoxes[i].disabled = true;
        }
      }
    } else {
      for(var i = 0; i < checkedBoxes.length; i++) {
        checkedBoxes[i].disabled = false;
      }
      
    }
  });


  }); // end of document ready
})(jQuery); // end of jQuery name space
