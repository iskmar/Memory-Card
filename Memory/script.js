let fetchInputRadio = document.querySelectorAll("input[type='radio']");
let form = document.getElementById('form');
let time = document.getElementById('timer');
let btnStartGame = document.getElementById('button');
let fetchGameTable = document.getElementById('gridDiv');
let imgArray = [];
let openedCards = 0;
let flippedCards = [];
let flippedCardsId = [];
let countNum = 0;
let timer = null;

let getLevelValue = (array) => {
    for (let i = 0; i < array.length; i++) {
        // array[i].addEventListener('click', () => {
        //     location.reload();
        // })
        if (array[i].checked) {
            return Number(array[i].value);
        }
    };
}




let startGameTimer = () => {
    if (timer == null) {
        timer = setInterval(() => {
            countNum++;
            time.innerHTML = countNum;
        }, 1000);
    }
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
btnStartGame.addEventListener('click', () => {
    location.reload();
    // getBoard();
});
getBoard();
function getBoard() {
    

    shuffleArray(imgArray);

    for (let i = 0; i < imgArray.length; i++) {
        let divCard = document.createElement('div');
        let imgFront = document.createElement('img');
        let divContainer = document.createElement('div');
        divContainer.style.position = 'relative';
        let imgBack = document.createElement('img');

        if(count == 16 ) {
            fetchGameTable.style.width = '50%';
            fetchGameTable.style.position = 'relative';
            divCard.style.width = '20%';
            divCard.style.height = '20%';
        } else if (count == 36) {
            fetchGameTable.style.width = '70%';
            fetchGameTable.style.position = 'relative';
            divCard.style.width = '14%';
            // divCard.style.height = 'auto';
        } else if (count == 64 ) {
            divCard.style.width = '10%';
        } else {
            divCard.style.width = '8%';
        }

        
        // divCard.style.backgroundColor = 'orange';
        divCard.style.display = 'inline-block';
        divCard.style.position = 'relative';
        imgFront.setAttribute('src',`images/${imgArray[i]}.png`);
        imgFront.style.width = '100%';
        imgFront.style.height = '100%';
        imgBack.setAttribute('src','images/closedCard.png');
        imgBack.style.width = '100%';
        imgBack.style.height = '100%';
        imgBack.style.position = 'absolute';
        imgBack.style.top = '0px';
        imgBack.style.left = '0px';
        imgBack.setAttribute('id',i);
        imgBack.setAttribute('data-id',`data_${imgArray[i]}`);
        imgBack.addEventListener('click', function() {
            checkCards(this);
            this.classList.toggle('flipped');
            
        });
        divCard.appendChild(imgFront);
        divCard.appendChild(imgBack);
        fetchGameTable.appendChild(divCard);

        divCard.classList.add('timer');
        divCard.addEventListener('click', () => {
            if(divCard.classList.contains('timer')){
                startGameTimer();
                divCard.classList.remove('timer');
            }
        })
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
function checkCards(card) {

if (card.classList.contains('flipped') > 2) {
    return;
 }
    if(flippedCards.length <= 1) {
        
        if(flippedCards.length === 0 ) {
            // input card
            flippedCards.push(card.dataset.id);
            flippedCardsId.push(card.id);

        } else if (flippedCards.length == 1 ) {
            // input card value
            isProcessing = true; // SET IS PROCESSING BEFORE TIME
            flippedCards.push(card.dataset.id);
            flippedCardsId.push(card.id);
            if( flippedCards[0] == flippedCards[1]) {
                
                console.log('same');
                openedCards += 2;

                flippedCards = [];
                flippedCardsId = [];
                if(openedCards === imgArray.length ) {
                    console.log('goodbye');
                    clearInterval(startGameTimer());
                    setTimeout(() => {
                        let answer = confirm("Da li zelite novu igru?");
                        if (answer) {
                            location.reload();
                        } else {
                            return;
                        }
                    }, 500);
                    
                }
            } else {
                // close the cards and reset styles

                function closeCard() {
                    let card1 = document.getElementById(`${flippedCardsId[0]}`);
                    let card2 = document.getElementById(`${flippedCardsId[1]}`);

                    if (card1.classList.contains('flipped')) {
                        card1.classList.toggle('flipped');
                    }
                    if (card2.classList.contains('flipped')) {
                        card2.classList.toggle('flipped');
                    }
                    
                    flippedCards = [];
                    flippedCardsId = [];
                    isProcessing = false;
                }
                setTimeout(closeCard,600);
            }
        }
    }
} 



