console.log("Welcome to Tic Tac Toe");

let music = new Audio("music.mp3");
let audioTurn = new Audio("ting.mp3");
let gameover = new Audio("gameover.mp3");
let turn = "X";
let isGameOver = false;

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

      // Show winning image
      document.querySelector(".imgbox img").style.width = "200px";
    }
  });
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

      // If game is not over, continue the game
      if (!isGameOver) {
        turn = changeTurn();
        document.querySelector(".info").innerText = "Turn for " + turn;
      }
    }
  });
});

// Reset game
document.getElementById("reset").addEventListener("click", () => {
  const boxtexts = document.querySelectorAll(".boxtext");
  Array.from(boxtexts).forEach((element) => {
    element.innerText = "";
  });

  // Reset game state
  turn = "X";
  isGameOver = false;
  document.querySelector(".line").style.width = "0vw";
  document.querySelector(".info").innerText = "Turn for " + turn;
  document.querySelector(".imgbox img").style.width = "0px"; // Hide winning image

  // Reset sound effect (optional, play background music again)
  music.play();
});
