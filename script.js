let audioTurn = new Audio("beats/ting.mp3");
let gameover = new Audio("beats/gameover.mp3");
let turn = "X";
let isGameOver = false;
let gameMode = "twoPlayer"; // Default mode is two player

// Function to change the turn
const changeTurn = () => {
    return turn === "X" ? "0" : "X";
};

// Function to check for a win
const checkWin = () => {
    const boxtext = document.getElementsByClassName("boxtext");
    const wins = [
        [0, 1, 2, 5, 5, 0],
        [3, 4, 5, 5, 15, 0],
        [6, 7, 8, 5, 25, 0],
        [0, 3, 6, -5, 15, 90],
        [1, 4, 7, 5, 15, 90],
        [2, 5, 8, 15, 15, 90],
        [0, 4, 8, 5, 15, 45],
        [2, 4, 6, 5, 15, 135],
    ];

    wins.forEach((e) => {
        if (
            boxtext[e[0]].innerText === boxtext[e[1]].innerText &&
            boxtext[e[1]].innerText === boxtext[e[2]].innerText &&
            boxtext[e[0]].innerText !== ""
        ) {
            document.querySelector(".info").innerText =
                boxtext[e[0]].innerText + " Won!";
            isGameOver = true;
            gameover.play(); // Play game over sound when a player wins

            // Show winning line with animation
            document.querySelector(".line").style.transform = `translate(${e[3]}vw, ${e[4]}vw) rotate(${e[5]}deg)`;
            document.querySelector(".line").style.width = "20vw";

        }
    });
};

// Function to check for a draw
const checkDraw = () => {
    const boxtext = document.querySelectorAll(".boxtext");
    let filledBoxes = 0;
    boxtext.forEach((box) => {
        if (box.innerText !== "") {
            filledBoxes++;
        }
    });

    // If all boxes are filled and no winner, it's a draw
    if (filledBoxes === 9 && !isGameOver) {
        document.querySelector(".info").innerText = "It's a Draw!";
        isGameOver = true;
        gameover.play(); // Optionally play a sound for a draw
    }
};

// Function to make the computer move
const computerMove = () => {
    const boxtext = document.querySelectorAll(".boxtext");
    let moveMade = false;

    const winningCombinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];

    // Function to check if the computer can win or block
    const findBestMove = (player) => {
        for (let combo of winningCombinations) {
            const [a, b, c] = combo;
            if (
                boxtext[a].innerText === player &&
                boxtext[b].innerText === player &&
                boxtext[c].innerText === ""
            ) {
                return c;
            }
            if (
                boxtext[a].innerText === player &&
                boxtext[c].innerText === player &&
                boxtext[b].innerText === ""
            ) {
                return b;
            }
            if (
                boxtext[b].innerText === player &&
                boxtext[c].innerText === player &&
                boxtext[a].innerText === ""
            ) {
                return a;
            }
        }
        return null;
    };

    // Step 1: Check if the computer can win
    let bestMove = findBestMove("0");
    if (bestMove !== null) {
        boxtext[bestMove].innerText = "0";
        moveMade = true;
    }

    // Step 2: Block the player if they are about to win
    if (!moveMade) {
        bestMove = findBestMove("X");
        if (bestMove !== null) {
            boxtext[bestMove].innerText = "0";
            moveMade = true;
        }
    }

    // Step 3: Take the center if it's available
    if (!moveMade && boxtext[4].innerText === "") {
        boxtext[4].innerText = "0";
        moveMade = true;
    }

    // Step 4: If no strategic move is found, make a random move
    if (!moveMade) {
        const emptyBoxes = [];
        boxtext.forEach((box, index) => {
            if (box.innerText === "") {
                emptyBoxes.push(index);
            }
        });

        const randomIndex = emptyBoxes[Math.floor(Math.random() * emptyBoxes.length)];
        boxtext[randomIndex].innerText = "0";
    }

    // Check if the computer won
    checkWin();
    if (!isGameOver) {
        turn = changeTurn();
        document.querySelector(".info").innerText = "Turn for " + turn;
        checkDraw();
    }
};

// Game logic
const boxes = document.getElementsByClassName("box");
Array.from(boxes).forEach((element) => {
    const boxtext = element.querySelector(".boxtext");

    element.addEventListener("click", () => {
        if (!isGameOver && boxtext.innerText === "") {
            boxtext.innerText = turn;
            audioTurn.play(); // Play turn sound
            checkWin();
            if (!isGameOver) {
                turn = changeTurn();
                document.querySelector(".info").innerText = "Turn for " + turn;
                checkDraw();

                // After the player's turn, if in computer mode, let the computer take a turn
                if (!isGameOver && gameMode === "computer" && turn === "0") {
                    setTimeout(computerMove, 500); // Delay to mimic thinking time
                }
            }
        }
    });
});

// Reset game when reset button is clicked
document.getElementById("reset").addEventListener("click", () => {
    const boxtexts = document.querySelectorAll(".boxtext");
    Array.from(boxtexts).forEach((element) => {
        element.innerText = "";
    });
    turn = "X";
    isGameOver = false;
    document.querySelector(".info").innerText = "Turn for " + turn;

    document.querySelector(".line").style.width = "0"; // Hide winning line
    document.querySelector(".imgbox img").style.width = "0"; // Hide winning image
});

// Switch between game modes
document.getElementById("gameMode").addEventListener("change", (event) => {
    gameMode = event.target.value;
    resetGame(); // Reset the game when the mode changes
});

const resetGame = () => {
    const boxtexts = document.querySelectorAll(".boxtext");
    Array.from(boxtexts).forEach((element) => {
        element.innerText = "";
    });
    turn = "X";
    isGameOver = false;
    document.querySelector(".info").innerText = "Turn for " + turn;
};
