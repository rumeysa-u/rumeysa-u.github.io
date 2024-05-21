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
  fetchApiData();

});


function fetchApiData() {
  const apiKey = '1820d6f82c85728b20d6888811ee2b96'; // Replace with your actual API key
  const city = 'London';
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

  $.ajax({
      url: url,
      method: 'GET',
      dataType: 'json',
      success: function(data) {
          const weatherInfo = `Weather in ${data.name}: ${data.weather[0].description}, Temperature: ${(data.main.temp - 273.15).toFixed(2)}°C`;
          $('#weather-api-data').text(weatherInfo);
      },
      error: function(jqXHR, textStatus, errorThrown) {
          console.error("Failed to fetch API data.", textStatus, errorThrown);
          $('#weather-api-data').text("Failed to fetch API data.");
      }
  });
}






