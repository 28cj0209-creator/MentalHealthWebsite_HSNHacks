const cards = document.querySelectorAll(".card");
const flipCounter = document.getElementById("flips");

const emojis = ["🍎", "🍌", "🍇", "🍓", "🍍", "🥝", "🍑", "🍒"];
let cardValues = [...emojis, ...emojis];

let firstCard = null;
let secondCard = null;
let lockBoard = false;
let flips = 0;

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

shuffle(cardValues);

cards.forEach((card, index) => {
  const value = cardValues[index];
  card.dataset.card = value;
  card.querySelector(".card-front").textContent = value;

  card.addEventListener("click", () => {
    if (lockBoard) return;
    if (card === firstCard) return;
    if (card.classList.contains("matched")) return;

    card.classList.add("flipped");

    if (!firstCard) {
      firstCard = card;
      return;
    }

    secondCard = card;
    flips++;
    flipCounter.textContent = flips;

    checkMatch();
  });
});

function checkMatch() {
  const isMatch =
    firstCard.dataset.card === secondCard.dataset.card;

  if (isMatch) {
    firstCard.classList.add("matched");
    secondCard.classList.add("matched");
    resetTurn();
  } else {
    lockBoard = true;
    setTimeout(() => {
      firstCard.classList.remove("flipped");
      secondCard.classList.remove("flipped");
      resetTurn();
    }, 1000);
  }
}

function resetTurn() {
  firstCard = null;
  secondCard = null;
  lockBoard = false;
}

