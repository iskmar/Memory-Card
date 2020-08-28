let fetchInputRadio = document.querySelectorAll("input[type='radio']");
let form = document.getElementById('form');
let btnStartGame = document.getElementById('button');
let imgArray = [];
let openedCards = 0;
let flippedCards = [];
let flippedCardsId = [];

let getLevelValue = (array) => {
    for (let i = 0; i < array.length; i++) {
        if (array[i].checked) {
            return Number(array[i].value);
        }
    };
}
getLevelValue(fetchInputRadio);
let count = getLevelValue(fetchInputRadio) ** 2;

// Push number of images into array depending on which level ** 2
function pushImgArray(count) {
    for (let i = 1; i <= count / 2; i++) {
        for (let j = 1; j <= 2; j++) {
            imgArray.push(i);
        }
    }
}
// Randomize array
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}
pushImgArray(count);
shuffleArray(imgArray);

// btnStartGame.addEventListener('click', () => {
//     location.reload();
// })
getBoard();
function getBoard() {
    let fetchGameTable = document.getElementById('gridDiv');
    fetchGameTable.style.position = 'relative';
    fetchGameTable.style.width = '100%';
    fetchGameTable.style.height = '100%';

    for (let i = 0; i <= imgArray.length - 1; i += getLevelValue(fetchInputRadio)) {
        let divRow = document.createElement('div');
        divRow.classList.add('row');
        divRow.classList.add('no-gutters');
        divRow.classList.add('justify-content-around');
        divRow.style.margin = 0;
        divRow.style.padding = 0;
        divRow.style.position = 'relative';
        if (getLevelValue(fetchInputRadio) === 4) {
            for (let j = i; j < i + 4; j++) {
                fetchGameTable.style.width = '50%';

                let divCard = document.createElement('div');
                let imgFront = document.createElement('img');
                let imgBack = document.createElement('img');
                let divFront = document.createElement('div');
                let divBack = document.createElement('div');

                divCard.classList.add('divCard');
                divCard.style.position = 'relative';
                divCard.classList.add('justify-content-around');
                divCard.classList.add('col-sm-3');
                divCard.style.width = '100%';
                divCard.style.height = '100%';
                // divCard.setAttribute('id', `data${imgArray[j]}`);
                // divCard.setAttribute('data-id', `data_${imgArray[j]}`);
                // divCard.setAttribute('id', `${imgArray[j]}`);

                imgFront.style.borderRadius = '25px';
                imgFront.style.border = '1px solid #d7f5fc';
                imgFront.style.width = '100%';
                imgFront.style.height = '100%';
                // imgFront.style.position = 'absolute';
                imgFront.setAttribute('class', 'front');
                imgFront.setAttribute('src', `images/${imgArray[j]}.png`);

                imgBack.style.borderRadius = '25px';
                imgBack.style.border = '1px solid #d7f5fc';
                imgBack.style.width = '100%';
                imgBack.style.height = '100%';
                imgBack.style.position = 'absolute';
                imgBack.style.float = 'left';
                imgBack.setAttribute('class', 'back');
                imgBack.setAttribute('src', `images/closedCard.png`);
                imgBack.setAttribute('data-id', `data_${imgArray[j]}`);
                imgBack.setAttribute('id', `${imgArray[j]}`);



                divCard.appendChild(imgBack);
                divCard.appendChild(imgFront);

                // divContainer.appendChild(divCard)
                divRow.appendChild(divCard);

                imgBack.addEventListener('click', function () {
                    // divCard.removeChild(divBack);
                    // imgFront.classList.toggle('flipped');
                    // setTimeout(() => {
                    //     divCard.appendChild(divBack);
                    //     divCard.appendChild(divFront);
                    //     imgFront.classList.toggle('flipped');
                    // }, 1000);
                    // divBack.classList.toggle('flipped');
                    if(!this.classList.contains('flipped')) {
                        this.classList.toggle('flipped');
                        this.style.zIndex = -1;
                    }
                    checkCards(this);

                });
                // btnStartGame.addEventListener('click', (event) => {
                //     // event.preventDefault();
                //     imgArray = [];
                //     // newGame.re
                // })

                // divRow -> divContainer -> divCard -> divFront -> imgFront
                // -> divBack -> imgBack

            }
        }
        else if (getLevelValue(fetchInputRadio) === 6) {
            for (let j = i; j < i + 6; j++) {
                fetchGameTable.style.width = '70%';
                let divContainer = document.createElement('div');
                let divCard = document.createElement('div');
                let imgFront = document.createElement('img');
                let imgBack = document.createElement('img');
                let divFront = document.createElement('div');
                let divBack = document.createElement('div');

                divContainer.style.padding = '5px';
                divContainer.classList.add('divContainer');
                divContainer.classList.add('col-2');
                divContainer.classList.add('justify-content-around');
                divContainer.style.width = '100%';
                divContainer.style.height = 'auto';
                divContainer.style.position = 'relative';

                divCard.classList.add('divCard');
                divCard.setAttribute('data-id', `data${imgArray[j]}`);
                divCard.style.position = 'relative';

                imgFront.style.borderRadius = '25px';
                imgFront.style.border = '1px solid #d7f5fc';
                imgFront.style.width = '100%';
                imgFront.style.height = '100%';
                imgFront.setAttribute('class', 'front');
                imgFront.classList.add('divFront');
                imgFront.setAttribute('data-id', `card${imgArray[j]}`);
                imgFront.setAttribute('src', `images/${imgArray[j]}.png`);

                imgBack.style.borderRadius = '25px';
                imgBack.style.border = '1px solid #d7f5fc';
                imgBack.style.width = '100%';
                imgBack.style.height = '100%';
                imgBack.setAttribute('class', 'back');
                imgBack.classList.add('divBack');
                imgBack.setAttribute('src', `images/closedCard.png`);

                divFront.style.width = '100%';
                divFront.style.height = '100%';
                divFront.classList.add('divFront');

                divBack.style.width = '100%';
                divBack.style.height = '100%';
                divBack.style.position = 'absolute';
                divBack.classList.add('divBack');
                divBack.style.top = 0;
                divBack.style.left = 0;

                divBack.appendChild(imgBack);
                divFront.appendChild(imgFront);

                divCard.appendChild(divBack);
                divCard.appendChild(divFront);

                divContainer.appendChild(divCard)
                divRow.appendChild(divContainer);
                
                divCard.addEventListener('click', function () {
                    checkCards(this);
                }) 

                // checkCards();

            }
        } else if (getLevelValue(fetchInputRadio) === 8) {
            for (let j = i; j < i + 8; j++) {
                fetchGameTable.style.width = '90%';
                let divContainer = document.createElement('div');
                let divCard = document.createElement('div');
                let imgFront = document.createElement('img');
                let imgBack = document.createElement('img');
                let divFront = document.createElement('div');
                let divBack = document.createElement('div');

                divContainer.style.paddingLeft = '2px';
                divContainer.style.paddingBottom = '10px';
                divContainer.classList.add('divContainer');
                divContainer.classList.add('col-1');
                divContainer.classList.add('justify-content-around');
                divContainer.style.width = '100%';
                divContainer.style.height = 'auto';
                divContainer.style.position = 'relative';

                divCard.classList.add('divCard');
                divCard.setAttribute('data-id', `data${imgArray[j]}`);

                imgFront.style.borderRadius = '10px';
                imgFront.style.border = '1px solid #d7f5fc';
                imgFront.style.width = '100%';
                imgFront.style.height = 'auto';
                imgFront.setAttribute('class', 'front');
                imgFront.setAttribute('data-id', `card${imgArray[j]}`);
                imgFront.setAttribute('src', `images/${imgArray[j]}.png`);

                imgBack.style.borderRadius = '15px';
                imgBack.style.border = '1px solid #d7f5fc';
                imgBack.style.width = '100%';
                imgBack.style.height = 'auto';
                imgBack.setAttribute('class', 'back');
                imgBack.setAttribute('src', `images/closedCard.png`);

                divFront.style.width = '100%';
                divFront.style.height = '100%';

                divBack.style.width = '100%';
                divBack.style.height = '100%';
                divBack.style.position = 'absolute';
                divBack.style.top = 0;
                divBack.style.left = 0;

                divBack.appendChild(imgBack);
                divFront.appendChild(imgFront);

                divCard.appendChild(divBack);
                divCard.appendChild(divFront);

                divContainer.appendChild(divCard)
                divRow.appendChild(divContainer);

                divCard.addEventListener('click', () => {
                    divCard.removeChild(divBack);
                    imgFront.classList.add('flipped');


                })
            }
        } else {
            for (let j = i; j < i + 10; j++) {
                fetchGameTable.style.width = '90%';
                // let divContainer = document.createElement('div');
                let divCard = document.createElement('div');
                let imgFront = document.createElement('img');
                let imgBack = document.createElement('img');
                let divFront = document.createElement('div');
                let divBack = document.createElement('div');

                // divContainer.style.paddingLeft = '2px';
                // divContainer.style.paddingBottom = '10px';
                // divContainer.classList.add('divContainer');
                // divContainer.classList.add('col-1');
                // divContainer.classList.add('justify-content-around');
                // divContainer.style.width = '100%';
                // divContainer.style.height = 'auto';
                // divContainer.style.position = 'relative';

                divCard.classList.add('divCard');
                divCard.setAttribute('data-id', `data${imgArray[j]}`);

                imgFront.style.borderRadius = '15px';
                imgFront.style.border = '1px solid #d7f5fc';
                imgFront.style.width = '100%';
                imgFront.style.height = 'auto';
                imgFront.style.position = 'relative';
                imgFront.style.zIndex = '0';
                imgFront.setAttribute('class', 'front');
                imgFront.setAttribute('data-id', `card${imgArray[j]}`);
                imgFront.setAttribute('src', `images/${imgArray[j]}.png`);

                imgBack.style.borderRadius = '15px';
                imgBack.style.border = '1px solid #d7f5fc';
                imgBack.style.width = '100%';
                imgBack.style.position = 'relative';
                imgBack.style.height = 'auto';
                imgBack.style.zIndex = '1';
                imgBack.setAttribute('class', 'back');
                imgBack.setAttribute('src', `images/closedCard.png`);

                divFront.style.width = '100%';
                divFront.style.height = '100%';
                divFront.style.color = 'blue';

                divBack.style.width = '100%';
                divBack.style.height = '100%';
                divBack.style.position = 'absolute';
                divBack.style.top = 0;
                divBack.style.left = 0;

                divBack.appendChild(imgBack);
                divFront.appendChild(imgFront);

                divCard.appendChild(divBack);
                divCard.appendChild(divFront);

                // divContainer.appendChild(divCard)
                divRow.appendChild(divCard);

                divCard.addEventListener('click', () => {
                    imgFront.style.zIndex = 1;

                })
            }
        }
        fetchGameTable.appendChild(divRow);
    }
}


let inputCreate = document.createElement('input');
inputCreate.setAttribute('type','text');
inputCreate.setAttribute('id','inputName');
inputCreate.classList.add('col-12');
inputCreate.classList.add('col-md-12');
inputCreate.classList.add('text-center');

form.addEventListener('submit', event => {
event.preventDefault();
let fetchInputName = document.getElementById('inputName');
let createNode = document.createTextNode(`${saveNameStorage(fetchInputName)}`);
// console.log(createNode);
inputCreate.value = createNode.data;
form.removeChild(fetchInputName);
form.appendChild(inputCreate);
});

function saveNameStorage(name) {
let inputName = name.value;
if(!inputName || inputName === "" ) {
    alert("Molimo vas unesite sve podatke");
}
else {
    let currentName = inputName;
    localStorage.setItem('name', currentName);
    return localStorage.getItem('name');
    }
}

// Create input name and store it in local storage
// once stored  call a function to retrieve currentName
// and replace input with newly made input
let lockBoard = false;
let firstCard, secondCard;
// checkCards();
function checkCards(card) {

    
    if(flippedCards.length < 2) {

        if(flippedCards.length === 0 ) {
            // input card
            flippedCards.push(card.dataset.id);
            flippedCardsId.push(card.id);

        } else if (flippedCards.length == 1 ) {
            // input card value
            flippedCards.push(card.dataset.id);
            flippedCardsId.push(card.id);

            if( flippedCards[0] == flippedCards[1]) {

                console.log('same');
                openedCards += 2;
                console.log(flippedCards);
                console.log(flippedCardsId);

                flippedCards = [];
                flippedCardsId = [];
                if(openedCards === imgArray.length ) {
                    console.log('goodbye');
                }
            } else {
                // close the cards and reset styles
                function closeCard() {
                    let card1 = document.getElementById(`${flippedCardsId[0]}`);
                    let card2 = document.getElementById(`${flippedCardsId[1]}`);
                    console.log(card1,card2);
                    console.log(flippedCards);
                    console.log(card1);
                    let cardClass = document.getElementsByClassName('flipped');
                    let x = Array.from(cardClass);
                    console.log(cardClass.length);
                    for (let i = 0; i < array.length; i++) {
                        if(array[i].classList.contains("flipped")) {
                            console.log(array[i]);
                            setTimeout(() => {
                                for (let index = 0; index < array.length; index++) {
                                    const element = array[index];
                                    
                                }

                                // for (let i = 0; i < flippedCardsId.length; i++) {
                                    // let cardUnflip = document.getElementById(`${flippedCardsId[i]}`);
                                    // cardUnflip.style.zIndex = 2;
                                    if(card1.classList.contains('flipped')) {
                                        card1.classList.toggle('flipped');
                                        card1.style.zIndex = 2;
                                    }
                                    if(card2.classList.contains('flipped')) {
                                        card2.classList.toggle('flipped');
                                        card2.style.zIndex = 2;
                                    }
                                    
                                }

                                console.log('1');
                                card.style.zIndex = 2;
                                card.classList.toggle('flipped');
                                cardClass[i].style.zIndex = 2;
                            }, 700);
                    //     }
                        

                    // }
                    
                    // console.log(array);
                    // console.log(flippedCards);
                    console.log(card1);
                    console.log(card2);
                    flippedCards = [];
                    flippedCardsId = [];
                    console.log(flippedCards);
                    // array = [];
                }
                setTimeout(closeCard,800);
            }
        }
    } else {

    }
}
}



function getUserChoice(userInput) {
    userInput = userInput.toLowerCase();
    if (userInput === "bear" || userInput === "human" || userInput === "gun") {
    return userInput;
  }  else {
    return "Please enter a valid option ";
  }
 }
 
 function getComputerChoice() {
     let randomNumber = Math.floor(Math.random() * 3);
     if (randomNumber === 0) {
         return "bear";
     } else if (randomNumber === 1) {
         return "gun";
     } else {
         return "human";
     }
 }
 
 function determineWinner(userChoice, computerChoice) {
     if (userChoice === computerChoice) {
         return "It is a tie!"
     }
     if (userChoice === "human") {
         if (computerChoice === "bear") {
          return "You have been mauled by bear!"   
         } else {
             return "You have disarmed a gun";
         }
     }
 
     if (userChoice === "bear") {
         if (computerChoice === "human") {
          return "You ate human!"   
         } else {
             return "You have been shooted by a gun!";
         }
     }
 
     if (userChoice === "gun") {
         if (computerChoice === "bear") {
          return "You have shoot a bear!"   
         } else {
             return "Your gun have been disarmed";
         }
     }
 }
 
 function playGame() {
   let promptUserChoice = prompt("Please choose bear, human or gun");
   let userChoice = getUserChoice(promptUserChoice);
   let computerChoice = getComputerChoice();
   console.log(userChoice);
   console.log(computerChoice);
   console.log(determineWinner(userChoice, computerChoice));
 }
 
 playGame();