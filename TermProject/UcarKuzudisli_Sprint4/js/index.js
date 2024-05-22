$(function() {
    var velocity = { x: 0, y: 0 };
    var friction = 0.95; // Adjust friction for desired effect
    var deceleration = 0.98; // Adjust deceleration for desired effect
    var container = $("#ballcontainer");
    var ball = $("#ball");
    var ballWidth = ball.width();
    var ballHeight = ball.height();
    var initialPosition = ball.offset(); // Store initial position
    var isDragging = false;

    $("#ball").draggable({
        start: function(event, ui) {
            isDragging = true;
            velocity = { x: 0, y: 0 };
        },
        drag: function(event, ui) {
            velocity = {
                x: ui.position.left - ui.originalPosition.left,
                y: ui.position.top - ui.originalPosition.top
            };
        },
        stop: function(event, ui) {
            isDragging = false;
            // Move the ball
            moveBall();
        }
    });

    function moveBall() {
        if (!isDragging) {
            // Apply friction
            velocity.x *= friction;
            velocity.y *= friction;

            // Apply deceleration
            velocity.x *= deceleration;
            velocity.y *= deceleration;

            var offset = ball.offset();
            var newPosition = {
                left: offset.left + velocity.x,
                top: offset.top + velocity.y
            };

            // Detect collisions with container boundaries
            if (newPosition.left < container.offset().left) {
                velocity.x = Math.abs(velocity.x); // Reverse horizontal velocity
                newPosition.left = container.offset().left;
            } else if (newPosition.left + ballWidth > container.offset().left + container.width()) {
                velocity.x = -Math.abs(velocity.x); // Reverse horizontal velocity
                newPosition.left = container.offset().left + container.width() - ballWidth;
            }
            
            if (newPosition.top < container.offset().top) {
                velocity.y = Math.abs(velocity.y); // Reverse vertical velocity
                newPosition.top = container.offset().top;
            } else if (newPosition.top + ballHeight > container.offset().top + container.height()) {
                velocity.y = -Math.abs(velocity.y); // Reverse vertical velocity
                newPosition.top = container.offset().top + container.height() - ballHeight;
            }

            // Apply new position
            ball.offset(newPosition);

            // Recursively move the ball if velocity is not negligible
            if (Math.abs(velocity.x) > 0.1 || Math.abs(velocity.y) > 0.1) {
                requestAnimationFrame(moveBall);
            }
        }
    }

  // Fetch weather data
  //fetchApiData();

  // Call the function to get the user's location and fetch weather data
  getUserLocation();

});



// Function to get the user's location
function getUserLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            function(position) {
                const latitude = position.coords.latitude;
                const longitude = position.coords.longitude;
                getCityFromCoordinates(latitude, longitude);
            },
            function(error) {
                console.error("Failed to get user's location.", error);
                //$('#weather-api-data').text("Failed to get user's location.");
                $('#weather-api-data').html("Failed to get<br>user's location.");
            }
        );
    } else {
        console.error("Geolocation is not supported by this browser.");
        $('#weather-api-data').text("Geolocation is not supported by this browser.");
    }
}

// Function to get city from coordinates
function getCityFromCoordinates(latitude, longitude) {
    const apiKey = '1820d6f3b06a1f4fda3596c543f74e11'; // Replace with your actual API key
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}`;

    $.ajax({
        url: url,
        method: 'GET',
        dataType: 'json',
        success: function(data) {
            const cityName = data.name;
            fetchWeatherData(cityName);
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.error("Failed to fetch weather data.", textStatus, errorThrown);
            $('#weather-api-data').text("Failed to fetch weather data.");
        }
    });
}

// Function to fetch weather data for a given city
function fetchWeatherData(city) {
    const apiKey = '1820d6f3b06a1f4fda3596c543f74e11'; // Replace with your actual API key
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

    $.ajax({
        url: url,
        method: 'GET',
        dataType: 'json',
        success: function(data) {
            const weatherInfo = `Weather in ${data.name}:<br>${data.weather[0].description},<br>Temperature: ${(data.main.temp - 273.15).toFixed(2)}°C`;
            $('#weather-api-data').html(weatherInfo);
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.error("Failed to fetch weather data.", textStatus, errorThrown);
            $('#weather-api-data').text("Failed to fetch weather data.");
        }
    });
}


// old function to fetch weather data to Ankara weather
function fetchApiData() {
    const apiKey = '1820d6f3b06a1f4fda3596c543f74e11'; // Replace with your actual API key
    const city = 'Ankara';
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
  
    $.ajax({
        url: url,
        method: 'GET',
        dataType: 'json',
        success: function(data) {
          console.log(data);
          const weatherInfo = `Weather in ${data.name}:<br>${data.weather[0].description},<br>Temperature: ${(data.main.temp - 273.15).toFixed(2)}°C`;
          //$('#weather-api-data').text(weatherInfo);
          $('#weather-api-data').html(weatherInfo);
          
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.error("Failed to fetch API data.", textStatus, errorThrown);
            $('#weather-api-data').text("Failed to fetch API data.");
        }
    });
  }


  $(document).ready(function() {
    // Function to fetch and append random images to the slideshow
    function getRandomImages(count) {
        const slideshow = $('.slideshow');

        for (let i = 0; i < count; i++) {
            // Picsum URL with a random parameter to avoid caching
            const url = `https://picsum.photos/400/600?random=${Math.random()}`;

            // Create a new image element and set its source
            const imgElement = $('<img>').attr('src', url);
            slideshow.append(imgElement);
        }
    }

    // Fetch and display 5 random images
    getRandomImages(15);

    // Initialize the slideshow plugin
    $('.slideshow').cycle({
        fx: 'fade',
        timeout: 2000
    });
});


