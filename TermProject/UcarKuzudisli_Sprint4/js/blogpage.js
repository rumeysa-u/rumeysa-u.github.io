
$(document).ready(function() {
    // Load blog items from JSON
    $.getJSON('json/data.json', function(data) {
        var items = [];
        $.each(data, function(key, val) {
            items.push('<div class="box"><img src="' + val.image + '" alt="">' +
                       '<h4>' + val.title + '</h4>' +
                       '<p>' + val.content + '</p>' +
                       '<a href="' + val.link + '" class="readmore-btn">Read More</a></div>');
        });
        $('#blogContainer').html(items.join(''));
        
        // Apply Readmore.js to loaded content
        $('#blogContainer .box p').readmore({
            speed: 500,
            maxHeight: 120,
            moreLink: '<a href="#">Read More</a>',
            lessLink: '<a href="#">Read Less</a>'
        });
    });

    // Toggle read more/less
    $(document).on('click', '.readmore-btn', function(e) {
        e.preventDefault();
        $(this).parent().find('p').toggleClass("showContent");
        var replaceText = $(this).parent().find('p').hasClass("showContent") ? "Read Less" : "Read More";
        $(this).text(replaceText);
    });

    // Fetch technology news
    fetchTechnologyNews();
});

function fetchTechnologyNews() {
    var apiKey = '5d819d4c78244811b05ad71f370ee48a';
    var url = `https://newsapi.org/v2/top-headlines?country=us&category=technology&apiKey=${apiKey}`;

    $.ajax({
        url: url,
        type: 'GET',
        dataType: 'json',
        success: function(data) {
            if (data.status === "ok") {
                var articles = data.articles;
                articles.forEach(function(article) {
                    var newsItem = `<div class="col-md-4">
                        <div class="card mb-4 shadow-sm">
                            <img src="${article.urlToImage}" class="card-img-top" alt="News Image">
                            <div class="card-body">
                                <h5 class="card-title">${article.title}</h5>
                                <p class="card-text">${article.description}</p>
                                <a href="${article.url}" target="_blank" class="btn btn-primary">Read More</a>
                            </div>
                        </div>
                    </div>`;
                    $('#news-container').append(newsItem);
                });
            } else {
                console.error('An error occurred while loading the news.');
            }
        },
        error: function(error) {
            console.error('An error occurred during the AJAX request', error);
        }
    });
}

