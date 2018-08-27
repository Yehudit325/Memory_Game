let symbols = ['&#127804', '&#127804', '&#127856', '&#127856', '&#127880',
               '&#127880','&#127928', '&#127928', '&#127969', '&#127969',
               '&#128059', '&#128059','&#128151', '&#128151', '&#127752', '&#127752'];

let opened = [];

assign();

document.getElementsByClassName("restart")[0].addEventListener("click", assign);

for (let i = 0; i < symbols.length; i++) {
  let currCard = document.getElementsByClassName("card")[i];
  currCard.addEventListener("click", flip);
}

function assign() {
  shuffle();
  for (let i = 0; i < symbols.length; i++) {
    document.getElementsByClassName("card")[i].innerHTML = symbols[i];
  }
}

function shuffle() {
  for (let i = symbols.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [symbols[i], symbols[j]] = [symbols[j], symbols[i]]; // eslint-disable-line no-param-reassign
    }
}

 function flip(x) {
  if (x.target.classList.length === 1) {
      x.target.classList.add("open");
  } else {
      x.target.classList.remove("open");
  }
 }

function addCard(x) {
  if (opened.length <= 1) {
    opened.push(x);
  }

}


function checkMatch(x) {
  if (opened[0] === opened[1]) {
    opened[0].removeEventListener("click", flip);
    opened[1].removeEventListener("click", flip);
  }
}
