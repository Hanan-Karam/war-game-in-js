const deckButton = document.getElementById('deck-btn');
const cardsButton = document.getElementById('cards-btn');
const container = document.getElementById('container');
const title = document.querySelector('.title');
const message = document.querySelector('.message');
const computerScore = document.getElementById('computer-score');
const yourScore = document.getElementById('your-score');

let cardId = "";
let score1 = 0;
let score2 = 0;

function getCardId(){
    const promise = fetch('https://apis.scrimba.com/deckofcards/api/deck/new/shuffle/');
    const response = promise.then( res => res.json());
    response.then(results => {
        console.log(results)
        cardId = results.deck_id;
        message.innerHTML = `Remaining Cards: ${results.remaining}`
        //console.log(cardID)
        //container.innerHTML =  cardId
    })

}

async function getCards(){
    const promise = await fetch(`https://apis.scrimba.com/deckofcards/api/deck/${cardId}/draw/?count=2`)
    const response = await promise.json();
        console.log(response);
        container.children[0].innerHTML = `
        <img src="${response.cards[0].image}" alt="">
        `
        container.children[1].innerHTML = `
        <img src="${response.cards[1].image}" alt="">
        `
        compareCards(response.cards[0], response.cards[1])
        message.innerHTML = `Remaining Cards: ${response.remaining}`
        if(response.remaining == 0){
            cardsButton.disabled = true;
            if(score1 > score2){
            title.textContent = "Computer Has Won! 🥳🥳"
            }else if(score1 < score2){
            title.textContent = "You Have Won! 🥳🥳"
            }else{
            title.textContent = "It's An Event, Play Again!!"
            }

        }

}

//Game Logic function
function compareCards(card1, card2){
    const valuesArr = ["2", "3", "4","5","6", "7", "8", "9","10","JACK", "QUEEN", "KING", "ACE"]
    let value1 = valuesArr.indexOf(card1.value);
    let value2 = valuesArr.indexOf(card2.value);
   
    // console.log(value1,value2 )
    if(value1 > value2){
        score1 ++;
        computerScore.innerHTML =score1;
        title.textContent = "Computer Has Won!"
    }else if(value1 < value2){
        score2 ++;
        yourScore.innerHTML = score2;
        title.textContent = "You Have Won!"
    }else{
        title.textContent = "It's An Even"
    }
}

// const obj1 ={
//     name: "obk1",
//     value:"3"
// }
// const obj2 ={
//     name: "obk2",
//     value:"JACK"
// }

// compareCards(obj1, obj2);

// console.log(cardID);

deckButton.addEventListener('click', getCardId);
cardsButton.addEventListener('click', getCards);