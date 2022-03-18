//access DOM elements from HTML
const squares = document.querySelectorAll(".square");
console.log(squares);
const strategy = document.querySelector("#strategy");
const text = document.querySelector("#heading");
const restartBtn = document.querySelector("#restart");

const squareSpaces = [];
const letter_O = "O";
const letter_X = "X";
let currentPlayer = letter_O;

//write function that draws board
/*
Our forEach loop will iterate through the array and provide 
the following styles according to the conditions given to it.
index < 3 - border-bottom (0,1)
index /3 = 0 - border-right (3, 6)
index /3 = 2 - border-left (2, 5, 8)
index position > 5 - border-top (6, 7)

*/
const drawBoard = () => {
  squares.forEach((square, i) => {
    let styleSheet = "";
    if (i < 3) {
      styleSheet += "border-bottom: 3px solid var(--text);";
    }
    if (i % 3 === 0) {
      styleSheet += "border-right: 3px solid var(--text);";
    }
    if (i % 3 === 2) {
      styleSheet += "border-left: 3px solid var(--text);";
    }
    if (i > 5) {
      styleSheet += "border-top: 3px solid var(--text);";
    }
    square.style = styleSheet;
    square.addEventListener("click", squaresClicked);
  });
};

/*The squareClicked function will display currentPlayer value
depending on the square clicked.

We must then pass this function to the drawBoard function above within 
the forEach Loop for it to know which square and id is being clicked on
*/

const squaresClicked = (e) => {
  const id = e.target.id;
  if (!squareSpaces[id]) {
    squareSpaces[id] = currentPlayer;
    e.target.innerText = currentPlayer;

    if (playerWon()) {
      text.innerText = `${currentPlayer} has won!`;
      return;
    }
    if (playerDraw()) {
      return;
    }
    currentPlayer = currentPlayer === letter_O ? letter_X : letter_O;
  }
};

/* The win function will determin all possible ways a player can
 win. We'll base these ways on *constant* index positions as listed below. 

 Constant index positon of 0 winning ways
 winning top - [0, 1, 2]
 winning left - [0, 3, 6]
 winning diagonally - [0, 4, 8] vice versa

 Constant index positon of 8 winning ways. 
 winning right - [2, 5, 8]
 winning bottom - [6,7,8]

 Constant index positon of 4 winning ways. 
 winning diagonally - [2,4,6] vice versa
 winning vertically(middle) - [1,4,7] 
 winning horizontally(middle) - [3,4,5]

 This is where we shall also take advantage of our strategy text. We shall
 display it depending on the strategy the player has won. 
 After we pass the function to squaresClicked function.
*/

const playerWon = () => {
  //target squareSpace index position 0
  if (squareSpaces[0] === currentPlayer) {
    if (
      squareSpaces[1] === currentPlayer &&
      squareSpaces[2] === currentPlayer
    ) {
      strategy.innerText = `${currentPlayer} wins game up to top`;
      return true;
    }
    if (
      squareSpaces[3] === currentPlayer &&
      squareSpaces[6] === currentPlayer
    ) {
      strategy.innerText = `${currentPlayer} wins game on left`;
      return true;
    }

    if (
      squareSpaces[4] === currentPlayer &&
      squareSpaces[8] === currentPlayer
    ) {
      strategy.innerText = `${currentPlayer} wins game diagonally`;
      return true;
    }
  }
  //target squareSpace index position 8
  if (squareSpaces[8] === currentPlayer) {
    if (
      squareSpaces[2] === currentPlayer &&
      squareSpaces[5] === currentPlayer
    ) {
      strategy.innerText = `${currentPlayer} wins on the right`;
      return true;
    }
    if (
      squareSpaces[6] === currentPlayer &&
      squareSpaces[7] === currentPlayer
    ) {
      strategy.innerText = `${currentPlayer} wins on the bottom`;
      return true;
    }
  }
  //target squareSpace index position 4
  if (squareSpaces[4] === currentPlayer) {
    if (
      squareSpaces[1] === currentPlayer &&
      squareSpaces[7] === currentPlayer
    ) {
      strategy.innerText = `${currentPlayer} wins vertically on middle`;
      return true;
    }
    if (
      squareSpaces[3] === currentPlayer &&
      squareSpaces[5] === currentPlayer
    ) {
      strategy.innerText = `${currentPlayer} wins horizontally on the middle`;
      return true;
    }
    if (
      squareSpaces[2] === currentPlayer &&
      squareSpaces[6] === currentPlayer
    ) {
      strategy.innerText = `${currentPlayer} wins diagonally`;
      return true;
    }
  }
};

/*The draw function will simply draw a match if all squares
are filled.

We also have to pass this function to squaresClicked function above.
*/

const playerDraw = () => {
  let draw = 0;
  squareSpaces.forEach((square, i) => {
    if (squareSpaces[i] !== null) draw++;
  });
  if (draw === 9) {
    text.innerText = "Draw";
  }
};

/*The restart function reset our squares and texts to default*/
const restart = () => {
  squareSpaces.forEach((square, i) => {
    squareSpaces[i] = null;
  });
  squares.forEach((s) => {
    s.innerText = "";
  });
  text.innerText = "Play";
  strategy.innerText = "";
};

restartBtn.addEventListener("click", restart);
restart();
drawBoard();
