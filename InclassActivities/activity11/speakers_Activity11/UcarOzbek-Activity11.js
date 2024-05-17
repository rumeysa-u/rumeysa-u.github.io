$(document).ready(function() {
    function loadData(jsonFile) {
        $.ajax({
            url: jsonFile,
            dataType: 'json',
            success: function(data) {
                $('main').empty();

                var htmlContent = '<h1>' + data.speakers[0].title + '</h1>' +
                                  '<img src="' + data.speakers[0].image + '">' +
                                  '<h2>' + data.speakers[0].month + '<br>' + data.speakers[0].speaker + '</h2>' +
                                  '<p>' + data.speakers[0].text + '</p>';

                $('main').html(htmlContent);
            },
            error: function(xhr, status, error) {
                console.error('Error loading JSON file: ' + error);
            }
        });
    }

    $('#nav_list a').click(function(event) {
        event.preventDefault(); 

        var title = $(this).attr('title');
        
        var jsonFile = 'json_files/' + title + '.json';

        loadData(jsonFile);
    });
}); // end ready
