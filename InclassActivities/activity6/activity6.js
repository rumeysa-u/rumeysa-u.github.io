let level = 1;
let clicks = 0;
let timeout = 500;
let maxWidth, maxHeight;
let mouseOverTimeout;

const button = document.getElementById('movingButton');

function moveButton() {
    const newMarginLeft = Math.random() * maxWidth;
    const newMarginTop = Math.random() * maxHeight;

    // Ensure button stays within visible area
    const buttonRect = button.getBoundingClientRect();
    const buttonWidth = buttonRect.width;
    const buttonHeight = buttonRect.height;
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;

    let left = newMarginLeft;
    let top = newMarginTop;

    if (newMarginLeft + buttonWidth > windowWidth) {
        left = windowWidth - buttonWidth;
    }

    if (newMarginTop + buttonHeight > windowHeight) {
        top = windowHeight - buttonHeight;
    }

    button.style.marginLeft = left + 'px';
    button.style.marginTop = top + 'px';
}

function buttonClicked() {
    clicks++;
    if (clicks === 3) {
        level++;
        alert("Next level! " + level);
        clicks = 0;
        if (level <= 5) {
            timeout -= 100;
            setTimeout(() => {
                moveButton();
                button.onclick = buttonClicked;
            }, timeout);
        } else {
            alert("Congratulations! You've completed all levels!");
            button.onclick = null; // Disable button click after completing all levels
        }
    }
}

function setMaxDimensions() {
    maxWidth = window.innerWidth;
    maxHeight = window.innerHeight;
}

function handleMouseOver() {
    mouseOverTimeout = setTimeout(() => {
        moveButton();
        button.onclick = buttonClicked;
    }, timeout);
}

function handleMouseOut() {
    clearTimeout(mouseOverTimeout);
}

setMaxDimensions();

button.onmouseover = handleMouseOver;
button.onmouseout = handleMouseOut;
button.onclick = buttonClicked;

window.addEventListener('resize', setMaxDimensions);
