$(document).ready(function() {
    // Initialize form validation
    $('#contactForm').validate({
        rules: {
            name: {
                required: true
            },
            email: {
                required: true,
                email: true
            },
            subject: {
                required: true
            },
            message: {
                required: true
            }
        },
        messages: {
            name: {
                required: "Please enter your name."
            },
            email: {
                required: "Please enter your email address.",
                email: "Please enter a valid email address."
            },
            subject: {
                required: "Please enter the subject."
            },
            message: {
                required: "Please enter your message."
            }
        },
        // Handle form submission
        submitHandler: function(form) {
            // Form is valid, submit the form using AJAX etc / But I will show a modal
            // Show success modal
            $('#successModal').css('display', 'block');
            // Reset the form after successful submission
            form.reset();
            return false; // Prevent default form submission
        }
    });

    // Close the modal when the close button is clicked
    $('.close').on('click', function() {
        $('#successModal').css('display', 'none');
    });

});


$( function() {
    $( document ).tooltip();
  } );

