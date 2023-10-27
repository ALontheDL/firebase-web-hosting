import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

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
const rightPaddleSensitivity = 25;

startGame();

function startGame() {
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
        if (event.key === "ArrowDown" && rightPaddleY < (window.innerHeight - 100)) { // Adjust the limit
            rightPaddleY += rightPaddleSensitivity;
        }
        rightPaddle.style.top = rightPaddleY + "px";
    });

    const firebaseConfig = {
        apiKey: "AIzaSyAE-9l7AuNQwjLkTWau6etVg3c1KYrr3PY",
        authDomain: "alexlee-f0d54.firebaseapp.com",
        projectId: "alexlee-f0d54",
        storageBucket: "alexlee-f0d54.appspot.com",
        messagingSenderId: "1011114170501",
        appId: "1:1011114170501:web:d8f9473019ea5df967f1ec",
        measurementId: "G-5VQM91T0KG"
      };
    
    const app = initializeApp(firebaseConfig);
    const analytics = getAnalytics(app);

    this.db = app.firestore(app);

    setInterval(updateGameArea, 20);
    moveBall();
}

function updateGameArea() {
    // Move the ball
    ballX += ballSpeedX;
    ballY += ballSpeedY;

    // Ball collisions with top and bottom walls
    if (ballY <= 0 || ballY >= (window.innerHeight - 40)) {
        ballSpeedY = -ballSpeedY;
    }

    // Ball collisions with paddles
    if (ballX <= 50) { // Adjust for more accurate collision detection
        if (ballY + 20 > leftPaddleY && ballY < leftPaddleY + 100) { // Adjust for ball radius
            ballSpeedX = -ballSpeedX;
        } else if (ballX <= 0) {
            // Ball passed the left paddle
            rightScore++;
            rightScoreDisplay.innerText = rightScore;
            resetBall();
        }
    }

    if (ballX >= (window.innerWidth - 50)) { // Adjust for more accurate collision detection
        if (ballY + 20 > rightPaddleY && ballY < rightPaddleY + 100) { // Adjust for ball radius
            ballSpeedX = -ballSpeedX;
        } else if (ballX >= window.innerWidth) {
            // Ball passed the right paddle
            leftScore++;
            leftScoreDisplay.innerText = leftScore;
            resetBall();
        }
    }

    // Update ball position
    ball.style.left = ballX + "px";
    ball.style.top = ballY + "px";
}

function resetBall() {
    ballX = 400;
    ballY = 200;
    ballSpeedX = -ballSpeedX;
}

// Update the score list from Firestore
updateScoreList() ; {
    this.db.collection("scores").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            console.log(`${doc.id} => ${doc.data().score}`);
        });
    }); }

// Save the user's score to Firestore
saveScore(userOrUserIP, score); {
    if (score > 0) {
        console.log("save score:  TODO grab userOrUserIP: " + userOrUserIP + " " + score);
        this.db.collection("scores").add({
            user: userOrUserIP,
            score: score
        })
        .then((docRef) => {
            console.log("Document written with ID: ", docRef.id);
            updateScoreList();
        })
        .catch((error) => {
            console.error("Error adding document: ", error);
        });
    }
}

updateGameArea();
