$(document).ready(function() {
	
	var $body = $("body");

	$(".il").hover(function into() {
		var id = $(this).attr("id");
		$(".il").addClass("hide");
		$(this).removeClass("hide");
		$body.addClass(id);
	}, function out() {
		$body.removeClass($(this).attr("id"));
		var id = $(this).attr("id");
		$(".il").removeClass("hide");
	})

	$(".links").hover(function() {
		$("header, .hmu").addClass("hide");
	}, function() {
		$("header, .hmu").removeClass("hide");
	});

});