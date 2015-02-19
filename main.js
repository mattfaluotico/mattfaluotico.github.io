jQuery(document).ready(function($) {
	
	var $about = $(".about");
	var $work = $(".work");
	var $header = $(".intro");
	var headerOffser = $(".hello").offset().top;

	$(window).scroll(function(event) {
		
		var pos = $(window).scrollTop();	
		var margin = 500 - pos*0.6;

		if (margin > 70) {
			$about.css('margin-top', margin);
		} 


	});

});