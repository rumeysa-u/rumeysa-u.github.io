$(".readmore-btn").on('click', function(){ $(this).parent().toggleClass("showContent");
// Shorthand if-else statement var replaceText = $(this).parent().hasClass("showContent") ? "Read Less": "Read More"; $(this).text(replaceText);
});