$('#profile-container').find('*').hide();
$('#profile-container').find('*').fadeIn(4000);

$(document).ready(function() {
    $('#darklight').click(function() {
        // Mevcut CSS dosyası hangisi kontrol et
        var currentCSS = $("#styleSheet").attr("href");

        // Şu anda hangi CSS yüklüyse ona göre değiştir
        if (currentCSS === "profilestylelight.css") {
            $("#styleSheet").attr("href", "profile.css"); // Eski tema
        } else {
            $("#styleSheet").attr("href", "profilestylelight.css"); // Yeni tema
        }
    });
});

$(document).ready(function() {
    // Datepicker başlatma
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
        var newBirthdate = $('#birthdate').val(); // Doğum tarihi değerini al
    
        $('h1').first().text('Username: ' + newUsername);
        $('h1').first().next('p').text('Email Address: ' + newEmail);
        $('h1').first().next('p').next('p').text('About Me: ' + newAbout);
        $('#userBirthdate').text('Date of Birth: ' + newBirthdate); // ID kullanarak doğrudan güncelleme
    
        $('.modal').hide(); // Modal kapat
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
