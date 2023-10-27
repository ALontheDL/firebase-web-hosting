const ball = document.getElementById("ball");
const leftPaddle = document.getElementById("leftPaddle");
const rightPaddle = document.getElementById("rightPaddle");
const leftScoreDisplay = document.getElementById("leftScore");
const rightScoreDisplay = document.getElementById("rightScore");

let ballX = 400;
let ballY = 200;
let ballSpeedX = 5;
let ballSpeedY = 5;

let leftPaddleY = 150;
let rightPaddleY = 150;

let leftScore = 0;
let rightScore = 0;

// Set the sensitivity for the right paddle control
const rightPaddleSensitivity = 20;

// Control the left paddle with mouse
document.addEventListener("mousemove", (event) => {
    leftPaddleY = event.clientY - 50;
    leftPaddle.style.top = leftPaddleY + "px";
});

// Control the right paddle with the keyboard
document.addEventListener("keydown", (event) => {
    if (event.key === "ArrowUp" && rightPaddleY > 0) {
        rightPaddleY -= rightPaddleSensitivity;
    }
    if (event.key === "ArrowDown" && rightPaddleY < (window.innerHeight - 100)) {
        rightPaddleY += rightPaddleSensitivity;
    }
    rightPaddle.style top = rightPaddleY + "px";
});

setInterval(updateGameArea, 20);
moveBall();

function updateGameArea() {
    // Move the ball
    ballX += ballSpeedX;
    ballY += ballSpeedY;

    // Ball collisions with top and bottom walls
    if (ballY <= 0 || ballY >= (window.innerHeight - 40)) {
        ballSpeedY = -ballSpeedY;
    }

    // Ball collisions with paddles
    if (ballX <= 40) {
        if (ballY > leftPaddleY && ballY < leftPaddleY + 100) {
            ballSpeedX = -ballSpeedX;
        } else if (ballX <= 0) {
            // Ball passed the left paddle
            rightScore++;
            rightScoreDisplay.innerText = rightScore;
            resetBall();
            endGameSession(rightScore, db);
        }
    }

    if (ballX >= (window.innerWidth - 40)) {
        if (ballY > rightPaddleY && ballY < rightPaddleY + 100) {
            ballSpeedX = -ballSpeedX;
        } else if (ballX >= window.innerWidth) {
            // Ball passed the right paddle
            leftScore++;
            leftScoreDisplay.innerText = leftScore;
            resetBall();
            endGameSession(leftScore, db);
        }
    }
}

function resetBall() {
    ballX = 400;
    ballY = 200;
    ballSpeedX = -ballSpeedX;
}

// Initialize Firebase
const firebaseConfig = {
    apiKey: "AIzaSyAE-9l7AuNQwjLkTWau6etVg3c1KYrr3PY",
    authDomain: "alexlee-f0d54.firebaseapp.com",
    projectId: "alexlee-f0d54",
    storageBucket: "alexlee-f0d54.appspot.com",
    messagingSenderId: "1011114170501",
    appId: "1:1011114170501:web:d8f9473019ea5df967f1ec",
    measurementId: "G-5VQM91T0KG"
};

const app = firebase.initializeApp(firebaseConfig);
const db = app.firestore();

// Save the user's score to Firestore
function saveScore(userInitials, userScore, db) {
    if (userScore > 0) {
        db.collection("scores")
            .add({
                initials: userInitials,
                score: userScore,
            })
            .then(() => {
                console.log("Score submitted successfully.");
                updateScoreList();
            })
            .catch((error) => {
                console.error("Error submitting score: ", error);
            });
    }
}

// Update the score list from Firestore
function updateScoreList() {
    db.collection("scores")
        .get()
        .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                console.log(`${doc.id} => ${doc.data().initials}: ${doc.data().score}`);
            });
        });
}

function endGameSession(score, db) {
    if (score === 7) {
        const userInitials = prompt("Enter your initials (3 letters):");
        if (userInitials) {
            saveScore(userInitials, score, db);
        }

        // Reset the scores to 0-0
        leftScore = 0;
        rightScore = 0;
        leftScoreDisplay.innerText = "0";
        rightScoreDisplay.innerText = "0";

        // Reset the game area
        resetBall();
    }
}

updateGameArea();
