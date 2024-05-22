$('#profile-container').find('*').hide();
$('#profile-container').find('*').fadeIn(4000);

$(document).ready(function() {
    $('#darklight').click(function() {
        var currentCSS = $("#styleSheet").attr("href");

        if (currentCSS === "css/profilestylelight.css") {
            $("#styleSheet").attr("href", "css/profile.css"); 
        } else {
            $("#styleSheet").attr("href", "css/profilestylelight.css"); 
        }
    });
});

$(document).ready(function() {
    $('#birthdate').datepicker({
        changeYear: true,
        changeMonth: true,
        yearRange: "1900:2023",
        dateFormat: 'yy-mm-dd'
    });

    $('#editButton').click(function() {
        $('.modal').show();
    });

    $('.close').click(function() {
        $('.modal').hide();
    });

    $('#saveChanges').click(function() {
        var newUsername = $('#username').val();
        var newEmail = $('#email').val();
        var newAbout = $('#about').val();
        var newBirthdate = $('#birthdate').val(); 
    
        $('h1').first().text('Username: ' + newUsername);
        $('h1').first().next('p').text('Email Address: ' + newEmail);
        $('h1').first().next('p').next('p').text('About Me: ' + newAbout);
        $('#userBirthdate').text('Date of Birth: ' + newBirthdate); 
    
        $('.modal').hide(); 
    });
    
    $(window).click(function(event) {
        if ($(event.target).hasClass('modal')) {
            $('.modal').hide();
        }
    });
});



$(document).ready(function() {
    
    $('.view').magnificPopup({
        type: 'image',
        closeOnContentClick: true,
        mainClass: 'mfp-img-mobile',
        image: {
            verticalFit: true
        }
        
    });
});

$(document).ready(function() {
    $('.blog-item p').readmore({
        speed: 500,
        maxHeight: 120,
        moreLink: '<a href="#">Read More</a>',
        lessLink: '<a href="#">Read Less</a>'
    });
});
