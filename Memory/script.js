let fetchInputRadio = document.querySelectorAll("input[type='radio']");
let fetchInputName = document.getElementById('inputName');
let fetchGameTable = document.getElementById('gridDiv');
let form = document.getElementById('form');
let time = document.getElementById('timer');
let btnStartGame = document.getElementById('button');
let inputCreate = document.createElement('input');


let imgArray = [];
let openedCards = 0;
let flippedCards = [];
let flippedCardsId = [];
let countNum = 0;
let timer = null;
let playerStorageSet = [];
let playerStorageGet = [];

inputCreate.setAttribute('type', 'text');
inputCreate.setAttribute('id', 'inputName');
inputCreate.classList.add('col-12');
inputCreate.classList.add('col-md-12');
inputCreate.classList.add('text-center');

form.addEventListener('submit', event => {
    event.preventDefault();
    saveNameStorage(fetchInputName);
    if (fetchInputName.value === '' || fetchInputName.value === null) {
        // alert("Molimo vas unesite sve podatke");
    } else {
        let fetchInputName = document.getElementById('inputName');
        let createNode = document.createTextNode(`${saveNameStorage(fetchInputName)}`);
        inputCreate.value = createNode.data;
        form.removeChild(fetchInputName);
        form.appendChild(inputCreate);
        startScreenWelcome();
    }

});


let resetBoard = () => {
    clearInterval(timer);
    countNum = 0;
    time.innerHTML = '0';
    fetchGameTable.innerHTML = '';
    imgArray = [];
    openedCards = 0;
    timer = null;
}

// startScreenWelcome();

btnStartGame.addEventListener('click', () => {
    if (fetchInputName.value === '' || fetchInputName.value === null) {
        alert("Molimo vas unesite sve podatke");
    } else {
        resetBoard();
        let fetchInputName = document.getElementById('inputName');
        let createNode = document.createTextNode(`${saveNameStorage(fetchInputName)}`);
        inputCreate.value = createNode.data;
        form.removeChild(fetchInputName);
        form.appendChild(inputCreate);

        setTimeout(() => {
            getBoard();
        },200);
    }
    // location.reload();
});

let inputChecked = (array) => {
    for (let i = 0; i < array.length; i++) {
        if (array[i].checked) {
            return array[i].id;
        }
    }
}

let getLevelValue = (array) => {
    for (let i = 0; i < array.length; i++) {
        if (array[i].checked) {
            return Number(array[i].value);
        }
    }
};

let startGameTimer = () => {
    if (timer === null) {
        timer = setInterval(() => {
            countNum++;
            time.innerHTML = countNum;
        }, 1000);
    }
    return countNum;
}

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

function getBoard() {
    getLevelValue(fetchInputRadio);
    let count = getLevelValue(fetchInputRadio) ** 2;
    pushImgArray(count);
    shuffleArray(imgArray);
    fetchGameTable.style.backgroundColor = '#fffbf0';
    fetchGameTable.style.border = '1px solid darkcyan';
    fetchGameTable.style.padding = '5px';
    fetchGameTable.style.margin = '0px auto';


    for (let i = 0; i < imgArray.length; i++) {

        let divCard = document.createElement('div');
        let imgFront = document.createElement('img');
        let imgBack = document.createElement('img');

        if (count === 16) {
            fetchGameTable.style.width = '50%';
            fetchGameTable.style.position = 'relative';
            divCard.style.width = '20%';
            divCard.style.height = '20%';
        } else if (count === 36) {
            fetchGameTable.style.width = '80%';
            fetchGameTable.style.position = 'relative';
            divCard.style.width = '14%';
            // divCard.style.height = 'auto';
        } else if (count === 64) {
            fetchGameTable.style.width = '80%';
            fetchGameTable.style.position = 'relative';
            divCard.style.width = '11%';
        } else {
            fetchGameTable.style.width = '80%';
            fetchGameTable.style.position = 'relative';
            divCard.style.width = '8.5%';
        }

        divCard.style.display = 'inline-block';
        divCard.style.position = 'relative';
        divCard.style.border = '1px solid darkcyan';
        divCard.style.borderRadius = '10px';
        divCard.style.margin = '5px';
        divCard.style.cursor = 'pointer';
        divCard.style.textAlign = 'center';

        imgFront.style.width = '100%';
        imgFront.style.height = '100%';
        imgFront.setAttribute('src', `images/${imgArray[i]}.png`);

        imgBack.style.width = '100%';
        imgBack.style.height = '100%';
        imgBack.style.position = 'absolute';
        imgBack.style.top = '0px';
        imgBack.style.left = '0px';
        imgBack.setAttribute('id', i);
        imgBack.setAttribute('data-id', `data_${imgArray[i]}`);
        imgBack.setAttribute('src', 'images/closedCard.png');



        divCard.appendChild(imgFront);
        divCard.appendChild(imgBack);
        fetchGameTable.appendChild(divCard);

        divCard.addEventListener('click', () => {
            startGameTimer();
            localStorage.setItem('currentUser', inputCreate.value);
        });

        imgBack.addEventListener('click', function () {
            checkCards(this);
        });
    }
}



function saveNameStorage(name) {
    let inputName = name.value;
    if (!inputName || inputName === "") {
        alert("Molimo vas unesite sve podatke");
    } else {
        let currentName = inputName;
        localStorage.setItem('currentUser', inputName);
        return localStorage.getItem('currentUser');

    }


}

// Create input name and store it in local storage
// once stored  call a function to retrieve currentName
// and replace input with newly made input

function checkCards(card) {
    if (flippedCards.length < 2) {
        // flip  the card if flippedCards array is explicitly less then 2
        card.classList.toggle('flipped');

        if (flippedCards.length === 0) {
            // input card
            flippedCards.push(card.dataset.id);
            flippedCardsId.push(card.id);

        } else if (flippedCards.length === 1) {
            // input card value
            flippedCards.push(card.dataset.id);
            flippedCardsId.push(card.id);
            if (flippedCards[0] === flippedCards[1]) {
                openedCards += 2;

                flippedCards = [];
                flippedCardsId = [];
                if (openedCards === imgArray.length) {
                    console.log('goodbye');
                    clearInterval(timer);
                    // setTableStorage();
                    setTimeout(() => {
                        let answer = confirm("Da li zelite novu igru?");
                        if (answer) {
                            location.reload();
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
                }
                setTimeout(closeCard, 700);
            }
        }
    }
}

// function setTableStorage(diff) {
//     let currentPlayer = localStorage.getItem('currentUser');
//     let player = {
//         username: currentPlayer,
//         time: countNum,
//         difficulty: inputChecked(fetchInputRadio)
//     }
//     if (!localStorage.getItem(`diff${diff}`)) {
//         playerStorageSet.push(player);
//         localStorage.setItem(`diff${diff}`, JSON.stringify(playerStorageSet));
//     } else {
//         let getPlayers = JSON.parse(localStorage.getItem(`diff${diff}`));
//         for (let i = 0; i < getPlayers.length; i++) {
//             console.log(playerStorageSet);
//             playerStorageSet.push(getPlayers[i]);
//         }
//         playerStorageSet.push(player);
//         localStorage.setItem('allPlayers', JSON.stringify(playerStorageSet));
//     }
// }

function getLocalStorage() {
    if (!localStorage.getItem('allPlayers')) {
        // alert('Array empty');
    }
    // let getPlayers = JSON.parse(localStorage.getItem('allPlayers')) || [];
    // playerStorageGet.push(getPlayers);
    // for (let i = 0; i < getPlayers.length; i++) {
    //     console.log(getPlayers[i]);

    // }

}

// getLocalStorage();
let startScreenWelcome = () => {
    let fetchGrid = document.getElementById('welcome');
    fetchGrid.style.backgroundColor = '#fffbf0';
    fetchGrid.style.border = '1px solid darkcyan';
    fetchGrid.style.position = 'relative';
    fetchGrid.style.padding = '5px';
    fetchGrid.style.width = '57vw';
    fetchGrid.style.height = '57vh';
    fetchGrid.style.margin = '0px auto';
    fetchGrid.style.display = 'flex';
    fetchGrid.style.verticalAlign = 'center';
    let p = document.createElement('p');
    p.innerHTML = 'WELCOME';
    p.style.margin = 'auto';
    p.style.fontSize = '60px';
    fetchGrid.append(p);
}