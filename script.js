// // ---------- USE AN API AND FETCH IT RO RECIEVE A RANDOM 5 LETTER WORD ----------

// I save the API that returns a 5 letter word as a constant variable
const API_URL = "https://random-word-api.herokuapp.com/word?length=5";

// I use an async funtion to fetch the word to guess
async function getSecretWord() {
  try {
    const response = await fetch(API_URL);
    const data = await response.json();
    const secret_word = data[0];
    const secret_word_with_underscores = secret_word.replace(/./g, "_ ");
    document.getElementById("secret").textContent = secret_word_with_underscores;
    // document.getElementById("secret").textContent = secret_word;
    console.log(`The secret word is: ${secret_word}`);
    return secret_word;
  } catch (error) {
    console.error(error);
  }
}

// When I have the word to guess (secret_word) I create a button for
// every letter in the alphabet. When a letter is clicked is becomes disabled
// and I also check if it's in the secret word.
getSecretWord().then(secret_word => {
  const alphabet = ["A", "B", "C", "D", "E", "F", "G", "H", "I", 
                "J", "K", "L", "M", "N", "O", "P", "Q", "R", 
                "S", "T", "U", "V", "W", "X", "Y", "Z"]

  const container = document.getElementById("button-container");

  let lives = 10; // The number of lives
  const livesElement = document.getElementById("lives");
  livesElement.textContent += ` ${lives}`;

  let guessedLetters = [];
  const secretWordElement = document.getElementById("secret");

  for (let i = 0; i < alphabet.length; i++){
    const button = document.createElement("button");
    button.textContent = alphabet[i];

    // Add an event listener to the button
    button.addEventListener("click", function() {
      // Disable the button when it is clicked
      button.disabled = true;

      // Check if the letter of the button is in secret_word
      if (secret_word.includes(button.textContent.toLowerCase())) {
        console.log(`The letter '${button.textContent}' is in the secret word!`);
        guessedLetters.push(button.textContent.toLowerCase());
        let newSecretWord = "";
        for (let i = 0; i < secret_word.length; i++){
          if (guessedLetters.includes(secret_word[i])){
            newSecretWord += secret_word[i].toUpperCase();
          }
          else{
            newSecretWord += "_ ";
          }
        }

        secretWordElement.textContent = newSecretWord;

        // Check if they match (word has been guessed).
        if (secretWordElement.textContent === secret_word.toUpperCase()) {
          console.log("All letters guessed!");
          const buttons = document.querySelectorAll("button");
          for (let i = 0; i < buttons.length; i++) {
            buttons[i].disabled = true;
          }
        }

      } else {
        console.log(`The letter '${button.textContent}' is not in the secret word.`);
        lives -= 1;
        livesElement.textContent = `Life counter: ${lives}`;
      }
      if (lives <= 0){
        console.log('GAME OVER');
        const buttons = document.querySelectorAll("button");

        for (let i = 0; i < buttons.length; i++) {
          buttons[i].disabled = true;
        }
      }
    });
    container.appendChild(button);
  }
  
});
// -------------------------------------------------------------------------------------------