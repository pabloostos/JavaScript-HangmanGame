var lives;
var my_word;
var counter;

// API to return a random word as a constant variable
const API_URL = "https://random-word-api.herokuapp.com/word?";

async function getAPIWord() {
  try {
    const response = await fetch(API_URL);
    const data = await response.json();
    console.log(data[0]);
    api_word = data[0];
    const palabra = document.getElementById("la_wordy");
    palabra.setAttribute("name", api_word);
    console.log(`The hangman word is: ${api_word}`);

    return api_word;
  } catch (error) {
    console.error(error);
  }
}

// clearGrid() function: whenever you start a game, the previous word has to be scratched,
// as well as the keyboard, they have to be generated again.
function clearGrid() {
  // clearing previous word
  const grid = document.getElementById("la_wordy");
  grid.clearChildren;
  while (grid.childNodes.length > 0) {
    grid.removeChild(grid.lastChild);
  }
  // clearing keyboard to generate a new one (this is done because the buttons are disabled whenever you press one)
  const keyboard = document.getElementById("el_keyboard");
  keyboard.clearChildren;
  while (keyboard.childNodes.length > 0) {
    keyboard.removeChild(keyboard.lastChild);
  }

  const playButton = document.getElementById("main_button");
  while (playButton.childNodes.length > 0) {
    playButton.removeChild(playButton.lastChild);
  }
}

// startGame() function: starts another game and performs all neccessary actions to
// prepare the game.
function startGame() {
  // setting neccessary variables:
  lives = 10;
  counter = 0;
  //clearing grid
  clearGrid();
  //generating the word with API
  getAPIWord().then((api_word) => {
    my_word = api_word;
    console.log(typeof my_word);
    generateWordGrid(my_word);
    generateKeyboard();
    // displaying hangman image:
    var photo = document.getElementById("hangmanPicture");
    photo.src = "10.png";
  });
}

// generateWordGrid() function: generates the grid for the neccessary spaces for the word
// creates one element ('button') for every letter in the word.
function generateWordGrid() {
  grid = document.getElementById("la_wordy");

  // iterating through the word and initialising the space for each letter
  for (var i = 0; i < my_word.length; i++) {
    // creates an html Element 'button' and sets the right attributes
    letter = document.createElement("button");
    letter.setAttribute("type", "button");
    letter.setAttribute("class", "btn btn-outline-secondary");
    letter.setAttribute("id", my_word[i]); // later, this element will be accessed by its 'id'
    letter.innerHTML = "_";

    grid.appendChild(letter);
  }
}

// generateKeyboard() funtion: this function generates a conventional keyboard so that the user
// can make attemps, each letter in the keyboard is represented in a button. When you press this button,
// it will be disabled.
function generateKeyboard() {
  // accessing keyboard space
  keyboardSpace = document.getElementById("el_keyboard");
  // setting letters in the keyboard, one array per row
  const keyboardRow1 = ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"];
  const keyboardRow2 = ["A", "S", "D", "F", "G", "H", "J", "K", "L"];
  const keyboardRow3 = ["Z", "X", "C", "V", "B", "N", "M"];
  const kbRows = [keyboardRow1, keyboardRow2, keyboardRow3];

  keyboardGrid = document.createElement("div");
  keyboardGrid.setAttribute("class", "d-grid gap-2 col-6 mx-auto");

  // iterating through all rows in the keyboard
  for (var i = 0; i < kbRows.length; i++) {
    myRow = document.createElement("div");
    myRow.setAttribute("class", "d-grid gap-2 d-md-block");

    const thisRow = kbRows[i];
    // for each row, iterating through the letters in the row and initialising a space for each letter
    for (var j = 0; j < thisRow.length; j++) {
      letra = thisRow[j];
      tecla = document.createElement("button");
      tecla.setAttribute("class", "btn btn-success");
      tecla.setAttribute("type", "button");
      tecla.setAttribute("id", letra); // later, this element will be accessed by its 'id'
      tecla.setAttribute("onclick", "letterAttempt('" + letra + "')");
      tecla.innerHTML = letra;
      myRow.appendChild(tecla);
    }
    keyboardGrid.appendChild(myRow);
  }
  keyboardSpace.appendChild(keyboardGrid);
}

// letterAttempt() function: every time a letter is pressed, this function checks if the word contains the letter,
// if it exists in the word, the letters are displayed, if not, a life is reduced
function letterAttempt(letter) {
  var lett = document.getElementById(letter);
  lett.className = "btn btn-success disabled";

  var flag = false;

  var my_letter = letter.toLowerCase();
  var the_word = document.getElementById("la_wordy");
  var wordLetters = the_word.children;

  // iterating thourgh word, and checking if the attempt matches
  for (var i = 0; i < wordLetters.length; i++) {
    if (wordLetters[i].id == my_letter) {
      wordLetters[i].innerHTML = letter;
      flag = true;
      counter++;
    }
  }

  // if the letter does not exist in the word, reduce life
  if (flag == false) {
    reduceLife();
  }

  // check if the player has won the game
  if (counter == my_word.length) {
    wonGame();
  }
}

//reduceLife() function: reduces a life and changes the hangman picture
function reduceLife() {
  lives--;
  // all sources for pictures
  var photoSources = {
    0: "0.png",
    1: "1.png",
    2: "2.png",
    3: "3.png",
    4: "4.png",
    5: "5.png",
    6: "6.png",
    7: "7.png",
    8: "8.png",
    9: "9.png",
    10: "10.png",
  };
  var photo = document.getElementById("hangmanPicture");

  // if life == 0, the game is over
  if (lives < 1) {
    photo.src = "0.png";
    endGame();
  } else {
    var newSource = photoSources[lives];
    photo.src = newSource;
  }
}

// endGame() function: this function displays the word so that the user know what the word was.
function endGame() {
  // clearing grid, letter + keyboard
  clearGrid();

  grid = document.getElementById("la_wordy");
  game_is_over = document.createElement("h1");
  game_is_over.setAttribute("class", "display-5 text-success");
  game_is_over.innerHTML = "Game Over! the word was:";
  grid.appendChild(game_is_over);

  // iterating through the word and initialising the space for each letter
  for (var i = 0; i < my_word.length; i++) {
    // creates an html Element 'button' and sets the right attributes
    letter = document.createElement("button");
    letter.setAttribute("type", "button");
    letter.setAttribute("class", "btn btn-success");
    letter.setAttribute("id", my_word[i]); // later, this element will be accessed by its 'id'
    letter.innerHTML = my_word[i];
    grid.appendChild(letter);
  }

  const playButton = document.getElementById("main_button");
  const my_button = document.createElement("button");
  my_button.setAttribute("type", "button");
  my_button.setAttribute("class", "btn btn-outline-success btn-lg");
  my_button.setAttribute("id", "PlayAgainButton");
  my_button.setAttribute("onclick", "startGame()");
  my_button.innerHTML = "PLAY AGAIN";

  playButton.appendChild(my_button);
}

// wonGame() function: tells the user he has one, in case all letters are guessed
function wonGame() {
  // clearing grid, letter + keyboard
  clearGrid();

  grid = document.getElementById("la_wordy");
  won_game = document.createElement("h1");
  won_game.setAttribute("class", "display-5 text-success");
  won_game.innerHTML = "You won! the word was:";
  grid.appendChild(won_game);

  // iterating through the word and initialising the space for each letter
  for (var i = 0; i < my_word.length; i++) {
    // creates an html Element 'button' and sets the right attributes
    letter = document.createElement("button");
    letter.setAttribute("type", "button");
    letter.setAttribute("class", "btn btn-success");
    letter.setAttribute("id", my_word[i]); // later, this element will be accessed by its 'id'
    letter.innerHTML = my_word[i];
    grid.appendChild(letter);
  }

  const playButton = document.getElementById("main_button");
  const my_button = document.createElement("button");
  my_button.setAttribute("type", "button");
  my_button.setAttribute("class", "btn btn-outline-success btn-lg");
  my_button.setAttribute("id", "PlayAgainButton");
  my_button.setAttribute("onclick", "startGame()");
  my_button.innerHTML = "PLAY AGAIN";

  playButton.appendChild(my_button);

  // displaying WIN image:
  var photo = document.getElementById("hangmanPicture");
  photo.src = "WIN.png";
}
