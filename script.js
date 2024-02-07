const gameContainer = document.getElementById("game");
let card1 = null;
let card2 = null;
let cardsFlipped = 0;
let noClicking = false;

const ALPHABET = [
  "Aa", "Bb", "Cc", "Dd", "Ee","Ff","Gg","Hh","Ii","Jj","Kk","Ll","Mm",
  "Nn","Oo","Pp","Qq","Rr","Ss","Tt","Uu","Vv","Ww","Xx","Yy","Zz",

  "Aa", "Bb", "Cc", "Dd", "Ee","Ff","Gg","Hh","Ii","Jj","Kk","Ll","Mm",
  "Nn","Oo","Pp","Qq","Rr","Ss","Tt","Uu","Vv","Ww","Xx","Yy","Zz",
];

function shuffle(array) {
  let counter = array.length;

  while (counter > 0) {
    let index = Math.floor(Math.random() * counter);
    counter--;
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

let shuffledAlphabet = shuffle(ALPHABET);

function createDivsForAlphabet(alphabetArray) {
  alphabetArray.forEach((letter) => {
    const newDiv = document.createElement("div");
    newDiv.classList.add("card");

    const cover = document.createElement("div");
    cover.classList.add("cover");
    cover.textContent = "?¿?¿?";

    const back = document.createElement("div");
    back.classList.add("back");
    back.textContent = letter;

    newDiv.appendChild(cover);
    newDiv.appendChild(back);

    newDiv.addEventListener("click", handleCardClick);

    gameContainer.appendChild(newDiv);
  });
}

function handleCardClick(e) {
  if (noClicking) return;
  if (e.currentTarget.classList.contains("flipped")) return;

  let currentCard = e.currentTarget;
  currentCard.classList.toggle("flipped");

  if (!card1 || !card2) {
    currentCard.classList.add("flipped");
    card1 = card1 || currentCard;
    card2 = currentCard === card1 ? null : currentCard;
  }

  if (card1 && card2) {
    noClicking = true;

    let letter1 = card1.textContent;
    let letter2 = card2.textContent;

    if (letter1 === letter2) {
      cardsFlipped += 2;
      card1.removeEventListener("click", handleCardClick);
      card2.removeEventListener("click", handleCardClick);
      card1 = null;
      card2 = null;
      noClicking = false;
    } else {
      setTimeout(function () {
        card1.classList.remove("flipped");
        card2.classList.remove("flipped");
        card1 = null;
        card2 = null;
        noClicking = false;
      }, 1000);
    }
  }

  const totalAlphabetCards = ALPHABET.length;

// Check if all cards are flipped before showing the "Game Over" alert
if (cardsFlipped === totalAlphabetCards) {
  setTimeout(function () {
    alert("Game over! You have won the game! CONGRATULATIONS!!!");
  }, 500); // Adjust the delay duration as needed
}

}

createDivsForAlphabet(shuffledAlphabet);


document.addEventListener('DOMContentLoaded', function () {
  document.addEventListener('mousemove', function (event) {
    const mouseX = event.clientX / window.innerWidth;
    const mouseY = event.clientY / window.innerHeight;

    const backgroundColor = getColor(mouseX, mouseY);

    document.body.style.backgroundColor = backgroundColor;
  });

  function getColor(x, y) {
    const pink = [255, 182, 193]; // RGB values for pink
    const teal = [90, 250, 221];  // RGB values for teal
  
    const red = Math.round(pink[0] + x * (teal[0] - pink[0]));
    const green = Math.round(pink[1] + y * (teal[1] - pink[1]));
    const blue = Math.round(pink[2] + (x + y) * (teal[2] - pink[2]));
  
    return `rgb(${red}, ${green}, ${blue})`;
  }
  
  
});


function randomRGB (){
  const r = Math.floor (Math.random() * 256);
  const g = Math.floor (Math.random() * 256);
  const b = Math.floor (Math.random() * 256);
  return `rgb(${r},${g},${b})`
}

