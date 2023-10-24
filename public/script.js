// JavaScript code to switch content between index.html and about.html

const contentSwitchButton = document.getElementById("content-switch-button");
let isAboutPage = false;
const container = document.querySelector(".container");
let originalContent = container.innerHTML; // Store the original content
const myButton = document.getElementById('myButton');

const ball = document.getElementById("ball");
const leftPaddle = document.getElementById("leftPaddle");
const rightPaddle = document.getElementById("rightPaddle");

let ballX = 400;
let ballY = 200;
let ballSpeedX = 5;
let ballSpeedY = 5;

let leftPaddleY = 150;
let rightPaddleY = 150;

function handleButtonClick() {
    // Change the button's text when clicked
    myButton.textContent = 'Clicked!';
}

myButton.addEventListener('click', handleButtonClick);


contentSwitchButton.addEventListener("click", function () {
    if (isAboutPage) {
        // Switch back to the original content (index.html)
        container.innerHTML = originalContent;
        isAboutPage = false;
    } else {
        // Switch to the about.html content
        loadContent("about.html");
        isAboutPage = true;
    }
});

function loadContent(url) {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", url, true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            container.innerHTML = xhr.responseText;
        }
    };
    xhr.send();
}

const updateGameArea = () => {
    moveBall();
    movePaddle();
    requestAnimationFrame(updateGameArea);
};

const moveBall = () => {
    ballX += ballSpeedX;
    ballY += ballSpeedY;

    if (ballY <= 0 || ballY >= 380) {
        ballSpeedY = -ballSpeedY;
    }

    if (ballX <= 30) {
        if (ballY > leftPaddleY && ballY < leftPaddleY + 100) {
            ballSpeedX = -ballSpeedX;
        } else {
            // Ball missed by the left paddle
            resetBall();
        }
    }

    if (ballX >= 770) {
        if (ballY > rightPaddleY && ballY < rightPaddleY + 100) {
            ballSpeedX = -ballSpeedX;
        } else {
            // Ball missed by the right paddle
            resetBall();
        }
    }

    ball.style.left = ballX + "px";
    ball.style.top = ballY + "px";
};

const movePaddle = () => {
    window.addEventListener("keydown", (event) => {
        switch (event.key) {
            case "ArrowUp":
                if (rightPaddleY > 0) {
                    rightPaddleY -= 10;
                    rightPaddle.style.top = rightPaddleY + "px";
                }
                break;
            case "ArrowDown":
                if (rightPaddleY < 300) {
                    rightPaddleY += 10;
                    rightPaddle.style.top = rightPaddleY + "px";
                }
                break;
        }
    });
};

const resetBall = () => {
    ballX = 400;
    ballY = 200;
    ballSpeedX = -ballSpeedX;
};

updateGameArea();

