const BASE_URL = "https://deckofcardsapi.com/api/deck/";
const SHUFFLE_AND_DRAW = "https://deckofcardsapi.com/api/deck/new/draw/";
const drawCardURLEndPoint = "/draw/";

const btnContainer = document.querySelector("#btn-container");
// const cardContainer = document.querySelector("#card-container");
const drawCardBtn = document.querySelector("#draw");

const cardImg = document.createElement("img");
const cardDescription = document.createElement("p");

async function partOne() {
  let res = await axios.get(`${SHUFFLE_AND_DRAW}`);
  let deck = res.data;
  let deckId = deck.deck_id;
  console.log("Part One draw ", deck);
  console.log("deck ID", deckId);
  let { value, suit } = deck.cards[0];

  console.log(`${value} of ${suit}`);
}
partOne();

async function partTwo() {
  let drawOne = await axios.get(`${SHUFFLE_AND_DRAW}`);
  let deckId = drawOne.data.deck_id;
  let cardOne = drawOne.data.cards[0];
  console.log("Part 2 draw 1", cardOne);
  console.log("deck ID", deckId);
  let drawTwo = await axios.get(`${BASE_URL}${deckId}${drawCardURLEndPoint}`);
  let cardTwo = drawTwo.data.cards[0];
  console.log("Part 2 draw 2", cardTwo);
  [cardOne, cardTwo].forEach((card) => {
    console.log(`${card.code}: ${card.value} of ${card.suit}`);
  });
}
partTwo();

// function rotateImg() {
//   let rand = Math.floor(Math.random());
//   return rotate(rand);
// }

let draw = {
  async drawCard() {
    let cardContainer = document.querySelector("#card-container");
    let res = await axios.get(`${BASE_URL}new/shuffle/`);
    drawCardBtn.addEventListener("click", async function (e) {
      let cardData = await axios.get(
        `${BASE_URL}${res.data.deck_id}${drawCardURLEndPoint}`
      );
      console.log(cardData.data);
      const cardCode = cardData.data.cards[0].code;

      cardImg.src = `https://deckofcardsapi.com/static/img/${cardCode}.png`;
      // cardImg.style.transform = `rotate(${Math.random()})`;
      cardContainer.append(cardImg);
    });
  },
};
draw.drawCard();
