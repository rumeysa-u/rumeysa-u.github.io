$(document).ready(function() {
    // preload images
    $("#image_list a").each(function() {
        var swappedImage = new Image();
        swappedImage.src = $(this).attr("href");
    });

    // set up event handlers for links    
    $("#image_list a").click(function(evt) {
        evt.preventDefault(); // cancel the default action of the link

        var imageURL = $(this).attr("href");
        var caption = $(this).attr("title");

        // Fade out image and caption
        $("#image, #caption").fadeOut(1000, function() {
            // Update image source and caption text
            $("#image").attr("src", imageURL);
            $("#caption").text(caption);

            // Fade in image and caption
            $("#image, #caption").fadeIn(1000);
        });
    });

    // move focus to first thumbnail
    $("li:first-child a").focus();
});