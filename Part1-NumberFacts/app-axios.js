// first promise
// let url = "http://numbersapi.com/random?json";
// let ourFirstPromise = axios.get(url);
// console.log(ourFirstPromise);
// Promise {<pending>}
const body = document.querySelector("body");
const para = document.createElement("p");
const faveNum = 42;
// promise to be resolved (hopefully)
const validURL = "http://numbersapi.com/random?json";
const faveNumURL = `http://numbersapi.com/${faveNum}`;

// futureResolvedPromise
//   .then(data => console.log(data))
//   .catch(err => console.log(err));

// Figure out how to get data on multiple numbers in a single request
/** This would be done via Promise chaining? */

// // promise chaining

axios
  .get(validURL)
  .then((randNum1) => {
    const para1 = document.createElement("p");
    let textContent = `The first number is ${randNum1.data.number}  & info is ${randNum1.data.text}`;
    para1.append(textContent);
    body.append(para1);
    return axios.get(validURL);
  })
  .then((randNum2) => {
    const para2 = document.createElement("p");
    let textContent = `The second number is ${randNum2.data.number} & info is ${randNum2.data.text}`;
    para2.append(textContent);
    body.append(para2);
    return axios.get(validURL);
  })
  .then((randNum3) => {
    const para3 = document.createElement("p");
    let textContent = `The third number is ${randNum3.data.number} & info is ${randNum3.data.text}`;
    para3.append(textContent);
    body.append(para3);
  })
  .catch((err) => {
    console.log(`Oops, there was a problem :( ${err}`);
  });

// end promise chaining example

let fourNumberFactsArr = [];
const factTypes = ["trivia", "math", "date", "year"];

for (let type of factTypes) {
  console.log(type);
  fourNumberFactsArr.push(axios.get(`${faveNumURL}/${type}`));
}

Promise.all(fourNumberFactsArr)
  .then((numberArr) =>
    numberArr.forEach((num) => {
      console.log(num.data);
      const para = document.createElement("p");
      let textContent = num.data;
      para.append(textContent);
      body.append(para);
    })
  )
  .catch((err) => console.log(err));
// // end Promise.all example

// let fourPokemonRace = [];

// for (let i = 1; i < 5; i++) {
//   fourPokemonRace.push(
//     axios.get(`https://pokeapi.co/api/v2/pokemon/${i}/`)
//   );
// }

// Promise.race(fourPokemonRace)
//   .then(pokemon => console.log(`${pokemon.name} won!`))
//   .catch(err => console.log(err));
// // end Promise.race example
// Request for shuffling cards
const shuffleDeckURL =
  "https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1";
axios
  .get(shuffleDeckURL)
  .then((res) => {
    // console.log(res.data.deck_id);

    const drawCardURL = `https://deckofcardsapi.com/api/deck/${res.data.deck_id}/draw/?count=1`;
    return axios.get(drawCardURL);
  })
  .then((res) => {
    console.log(`${res.data.cards[0].value} of ${res.data.cards[0].suit}`);
  });
axios.get(shuffleDeckURL).then((res) => {
  console.log("#2", res.data.deck_id);

  const drawFirstCardURL = `https://deckofcardsapi.com/api/deck/${res.data.deck_id}/draw/?count=1`;
  const drawSecondCardURL = `https://deckofcardsapi.com/api/deck/${res.data.deck_id}/draw/`;

  axios.get(drawFirstCardURL).then((res) => {
    const firstRes = res;
    console.log(
      `${firstRes.data.cards[0].value} of ${firstRes.data.cards[0].suit}`
    );
  });
  axios.get(drawSecondCardURL).then((res) => {
    const secondRes = res;
    console.log(
      `${secondRes.data.cards[0].value} of ${secondRes.data.cards[0].suit}`
    );
  });

  
});
