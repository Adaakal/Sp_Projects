const btnContainer = document.querySelector("#btn-container");
const drawCardBtn = document.createElement("button");
drawCardBtn.setAttribute("class", "btn");
drawCardBtn.textContent = "Draw a Card";

btnContainer.appendChild(drawCardBtn);
const cardImg = document.createElement("img");
const cardContainer = document.querySelector("#card-container");
document.body.appendChild(btnContainer);
document.body.appendChild(cardContainer);

const cardDescription = document.createElement("p");
window.onload = (e) => {
  console.log("Page is loaded");

  

  const shuffleDeckURL =
    "https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1";
  axios.get(shuffleDeckURL).then((res) => {
    // console.log(res);
    const deckId = res.data.deck_id;
    const drawCardURL = `https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`;
    drawCardBtn.addEventListener("click", (e) => {
      e.preventDefault();
      axios.get(drawCardURL).then((res) => {
        console.log(res);
        const cardCode = res.data.cards[0].code;
        cardImg.src = `https://deckofcardsapi.com/static/img/${cardCode}.png`;
        cardContainer.appendChild(cardImg);
        cardDescription.setHTML(
          `${res.data.cards[0].value} of ${res.data.cards[0].suit}`
        );
        document.body.appendChild(cardDescription);

      });

  
    });
  });
};
