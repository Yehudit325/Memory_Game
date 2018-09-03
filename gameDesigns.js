let symbols = ['&#127804', '&#127804', '&#127856', '&#127856', '&#127880',
               '&#127880','&#127928', '&#127928', '&#127969', '&#127969',
               '&#128059', '&#128059','&#128151', '&#128151', '&#127752', '&#127752'];

let opened = [];

let allOpen = 0;
let moves = 0;

assign();

document.getElementsByClassName("restart")[0].addEventListener("click", assign);

function addClick() {
  for (let i = 0; i < symbols.length; i++) {
    let currCard = document.getElementsByClassName("card")[i];
    currCard.addEventListener("click", flip);
  }
}

function reset() {
  for (let i = 0; i < symbols.length; i++) {
    let currCard = document.getElementsByClassName("card")[i];
    currCard.innerHTML = symbols[i];
    currCard.classList.remove("open");
    currCard.classList.remove("match");
  }
  document.getElementById("star3").innerHTML = "★";
  document.getElementById("star2").innerHTML = "★";

  for (let i = 0; i < 16; i++) {
    document.getElementsByClassName("card")[i].style.display = "visible";
  }
}

function assign() {
  shuffle();
  moves = 0;
  document.getElementById("moves").innerHTML = moves;
  addClick();
  reset();
}

function shuffle() {
  for (let i = symbols.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [symbols[i], symbols[j]] = [symbols[j], symbols[i]]; // eslint-disable-line no-param-reassign
    }
}

 function flip(x) {
   let currCard = x.target;
   if (opened.length <= 1 && currCard != opened[0]) {
     opened.push(currCard);
     currCard.classList.add("open");
   }

/*** BUG - IF 2 CARDS ARE OPENED AND CLICKED TWICE BEFORE CLOSED, MOVES IS COUNTED ***/
/** console error when trying to click something when 2 cards are opened **/

   if (opened.length === 2) {
     ++moves;
     document.getElementById("moves").innerHTML = moves;
     setTimeout(checkMatch, 500);
     stars();
   }
 }



function checkMatch() {
  if (opened[0].innerHTML === opened[1].innerHTML) {
    foundMatch();
  }
  else {
    //animation + red color
    opened[0].classList.remove("open");
    opened[1].classList.remove("open");
  }
  opened.length = 0;
}

function winGame() {
  for (let i = 0; i < 16; i++) {
    document.getElementsByClassName("card")[i].style.visibility = "hidden";
  }

}

/**** BUG - DOUBLE CLICK ON CARD TURNS GREEN -fixed******/

function foundMatch() {
  // animation
  // change color
  opened[0].removeEventListener("click", flip);
  opened[1].removeEventListener("click", flip);

  opened[0].classList.add("match");
  opened[1].classList.add("match");
  ++allOpen;

  if (allOpen === 8) {
    winGame();
  }
}

function stars() {
  if (moves > 12) {
    document.getElementById("star3").innerHTML = "☆";
  }

  if (moves > 20) {
    document.getElementById("star2").innerHTML = "☆";
  }
}
