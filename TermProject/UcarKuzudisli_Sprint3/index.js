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
});


/*
$(function() {
    $("#ball").draggable({
      containment: "parent",
      start: function(event, ui) {
        $(this).data("startPosition", ui.helper.position());
      },
      drag: function(event, ui) {
        var containment = $(this).draggable("option", "containment");
        if (ui.position.left <= containment[0]) {
          ui.position.left = containment[0];
        }
        if (ui.position.top <= containment[1]) {
          ui.position.top = containment[1];
        }
        if (ui.position.left + $(this).width() >= containment[2]) {
          ui.position.left = containment[2] - $(this).width();
        }
        if (ui.position.top + $(this).height() >= containment[3]) {
          ui.position.top = containment[3] - $(this).height();
        }
      }
    });
  });
*/