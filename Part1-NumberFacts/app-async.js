
const body = document.querySelector("body");
const factTypes = ["trivia", "math", "date", "year"];
const BASE_NumURL = `http://numbersapi.com/`;

let fourNumberFactsArr = [];

class NumberFacts {
  constructor(...num) {
    this.number = num;
  }

  async getInfo() {
    const res = await axios.get(`${BASE_NumURL}${this.number}`);

    if (this.number.length === 1) {
      const newDiv = document.createElement("div");
      const para1 = document.createElement("p");
      let textContent = `Number: ${this.number} 
                        Info: ${res.data}`;
      para1.append(textContent);
      newDiv.append(para1);
      body.append(newDiv);
    } else {
      for (res.data.data in res.data) {
        const newDiv = document.createElement("div");

        const para1 = document.createElement("p");
        let textContent = `Number: ${res.data.data} 
                        Info: ${res.data[res.data.data]}`;
        para1.append(textContent);
        newDiv.append(para1);
        body.append(newDiv);
      }
    }
  }

  async getFourFacts() {
    for (let type of factTypes) {
      fourNumberFactsArr.push(
        await axios.get(`${BASE_NumURL}${this.number}/${type}`)
      );
    }
    const numFacts = await Promise.all(fourNumberFactsArr);

    for (let numFact of numFacts) {
      const textContent = numFact.data;
      const newDiv = document.createElement("div");
      const para = document.createElement("p");
      para.append(textContent);
      newDiv.append(para);
      body.append(newDiv);
    }
  }
}
const myFavNum = new NumberFacts(42);
myFavNum.getInfo();

const multipleNums = new NumberFacts(33, 22, 11);
multipleNums.getInfo();

const fourFacts = new NumberFacts(17);
fourFacts.getFourFacts();

