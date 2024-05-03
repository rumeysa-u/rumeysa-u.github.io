$(document).ready(function() {
    $("#birthday").datepicker();
  
    var languages = ["ActionScript", "AppleScript", "Asp" , "JavaScript", "Lisp", "Perl", "PHP", "Python"];
    $("#proglangs").autocomplete({
      source: languages
    });
  });

$(document).ready(function() {
    $('#proglangs').prop('required', true);
    $('#website').prop('required', true);
    $('#email').prop('required', true);
});



/**
 */




