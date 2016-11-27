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

  // Disable Checkboxes after 4 are chosen
  /*----------------------------------------------------------------*/
  function disableSelectionIfReposFull() {
    
  }

  var checkedBoxes = $(document).find('.checkbox');
  checkedBoxes.on('change', function () {
    var j = $( "input:checked" ).length;
    if(j == 4) {
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
    // $(document).find('input.checkbox:checked"]').length;
    // if ( titles.length > 2 ) {
    //   for(var i = 0; i < checkedBoxes.length; i++) {
    //     if( checkedBoxes[i].checked == false) {
    //       checkedBoxes[i].disabled = true;
    //     }
    //   }
    // }
  


  }); // end of document ready
})(jQuery); // end of jQuery name space
