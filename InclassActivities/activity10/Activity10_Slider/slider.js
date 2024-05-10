$(document).ready(function() {
    var slider = $("#slider").bxSlider({
        randomStart: true, // Random start
        mode: 'horizontal', // One slide at a time
        auto: true,
        pause: 3000, // Time between transitions
        pagerCustom: '#pager', // Pager
		minSlides: 1, // Display only one slide at a time
        maxSlides: 1, // Display only one slide at a time
		onSliderLoad: function(currentIndex) {
            var currentSlide = currentIndex + 1;
            var totalSlides = $('#slider > li:not(.bx-clone)').length; //$('#slider li').length; //slider.getSlideCount();
            $('#pager').text(currentSlide + '/' + totalSlides);
        },
        onSlideAfter: function($slideElement, oldIndex, newIndex) {
            var currentSlide = newIndex + 1;
            var totalSlides = $('#slider > li:not(.bx-clone)').length; //$('#slider li').length; //slider.getSlideCount();
            $('#pager').text(currentSlide + '/' + totalSlides);
        }
    });
});