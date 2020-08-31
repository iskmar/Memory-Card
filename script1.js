// 1. Doms and variables define
// 2. All the functions
// 3. Event Listeners and function calls


//////////////////////////////////////////////////////    DOMS / VARIABLES   //////////////////////////////////////////////////////

let fetchInputRadio = document.querySelectorAll("input[type='radio']");
let fetchInputName = document.getElementById('inputName');
fetchInputName.style.margin = 'auto';
fetchInputName.style.width = '60%';
fetchInputName.style.color = 'darkgreen';
fetchInputName.classList.add('text-center');
fetchInputName.style.width = '50%';
fetchInputName.style.borderRadius = '20px';
fetchInputName.style.height = '40px';
fetchInputName.style.fontSize = '30px';


let fetchGameTable = document.getElementById('gridDiv');
let form = document.getElementById('form');
let time = document.getElementById('timer');

let moves = document.getElementById('moves');
let btnStartGame = document.getElementById('button');
let inputCreate = document.createElement('input');
let btnTable = document.querySelectorAll("button[name='tableButtons']");
let imgArray = [];
let openedCards = 0;
let flippedCards = [];
let flippedCardsId = [];
let countTime = 0;
let countMoves = 0;
let timer = null;
let playerStorageSet = [];

//////////////////////////////////////////////////////    DOMS / VARIABLES   //////////////////////////////////////////////////////




//////////////////////////////////////////////////////    FUNCTIONS   //////////////////////////////////////////////////////
// let upp = (par) => {
//     par.value = par.value.toUpperCase();
//     // console.log(par.value);
//     return par.value;
// }

// replace input with new input
// and call function inside of form event listener
let inputReplace = () => {
    inputCreate.setAttribute('type', 'text');
    inputCreate.setAttribute('id', 'inputName');
    inputCreate.style.color = 'darkgreen';
    inputCreate.classList.add('text-center');
    inputCreate.style.width = '50%';
    inputCreate.style.borderRadius = '20px';
    inputCreate.style.height = '40px';
    inputCreate.style.fontSize = '30px';
    return inputCreate;
}
let startScreenWelcome = () => {

    let fetchGrid = document.getElementById('welcome');
    let fetchP = document.getElementById('welcomeP');
    let name = localStorage.getItem('currentUser');

    // fetchGameTable.innerHTML = '';
    // fetchGrid.innerHTML = '';

    // fetchGrid.style.backgroundImage = "url('images/background.png')"; 
    fetchGrid.style.borderRadius = '30px';
    fetchGrid.style.border = '2px solid darkcyan';
    fetchGrid.style.padding = '5px';
    fetchGrid.style.width = '57vw';
    fetchGrid.style.height = '57vh';
    fetchGrid.style.margin = '0px auto';
    // fetchGrid.style.display = 'flex';
    fetchGrid.style.verticalAlign = 'center';

    fetchP.classList.add('text-info')
    fetchP.innerHTML = `WELCOME <br>`;
    fetchP.innerHTML += `<span style="color: orangered; filter: opacity(100%);">${name.toUpperCase()}</span>`;
    fetchP.style.margin = 'auto';
    fetchP.style.fontSize = '60px';
    fetchGrid.appendChild(fetchP);
}

let getLocalStorage = (diff) => {
    if (!localStorage.getItem(`${diff}`)) {
        let tblBody = document.getElementById('tbody');
        tblBody.innerHTML = '';
        let tblRow = document.createElement("tr");
        tblRow.style.height = '50px';
        // tblRow.style.filter = 'contrast(50%)';
        let tblData1 = document.createElement("td");
        let tblData2 = document.createElement("td");
        let tblData3 = document.createElement("td");
        let tblData4 = document.createElement("td");
        tblRow.appendChild(tblData1);
        tblRow.appendChild(tblData2);
        tblRow.appendChild(tblData3);
        tblRow.appendChild(tblData4);
        tblBody.appendChild(tblRow);

    } else {
        let tblBody = document.getElementById('tbody');
        tblBody.innerHTML = '';
        let countRows = 0;
        let difficultyArray = JSON.parse(localStorage.getItem(`${diff}`));
        // difficultyArray.sort(function (a, b) { return a - b });
        difficultyArray.sort((a, b) => parseFloat(a.time) - parseFloat(b.time));
        let newArray = difficultyArray.slice(0, 5);

        for (let i = 0; i < newArray.length; i++) {
            countRows++;
            let tblRow = document.createElement("tr");;
            let username = newArray[i].username;
            let time = newArray[i].time;
            let movesCount = newArray[i].moves;
            
            let tblData1 = document.createElement("td");
            let tblData2 = document.createElement("td");
            let tblData3 = document.createElement("td");
            let tblData4 = document.createElement("td");
            let td1 = document.createTextNode(`${countRows}`);
            let td2 = document.createTextNode(`${username.toUpperCase()}`);
            let td3 = document.createTextNode(`${secToMin(time)}`);
            let td4 = document.createTextNode(`${movesCount}`);

            tblData1.appendChild(td1);
            tblData2.appendChild(td2);
            tblData3.appendChild(td3);
            tblData4.appendChild(td4);

            tblRow.appendChild(tblData1);
            tblRow.appendChild(tblData2);
            tblRow.appendChild(tblData3);
            tblRow.appendChild(tblData4);

            tblBody.appendChild(tblRow);
        }
    }
}

let setTableStorage = (diff) => {

    let currentPlayer = localStorage.getItem('currentUser');
    // get all the data inside of an object
    let player = {
        username: currentPlayer,
        time: countTime,
        difficulty: inputChecked(fetchInputRadio),
        moves: countMoves
    }
    // check to see if key already exists
    // if not, set new one with current player settings
    if (!localStorage.getItem(`${diff}`)) {
        playerStorageSet.push(player);
        localStorage.setItem(`${diff}`, JSON.stringify(playerStorageSet));
    } else {
        // if exists,fetch the array
        // let getPlayers = JSON.parse(localStorage.getItem(`${diff}`));
        let getPlayers = JSON.parse(localStorage.getItem(`${diff}`));
        getPlayers.sort((a, b) => parseFloat(a.time) - parseFloat(b.time));

        for (let i = 0; i < getPlayers.length; i++) {
            highestTime = getPlayers[0].time;
            if (highestTime < getPlayers[i].time) {
                highestTime = getPlayers[i].time;
            }
        }
        if (getPlayers.length > 4) {
            if (player.time < highestTime) {
                getPlayers.pop(highestTime);
                getPlayers.push(player)
            }
        } else {
            getPlayers.push(player);
        }

        getPlayers.sort((a, b) => parseFloat(a.time) - parseFloat(b.time));

        localStorage.setItem(`${diff}`, JSON.stringify(getPlayers));
    }
}
let checkCards = (card) => {
    if (flippedCards.length < 2) {
        // flip  the card if flippedCards array is explicitly less then 2
        card.classList.toggle('flipped');

        if (flippedCards.length === 0) {
            // input card
            flippedCards.push(card.dataset.id);
            flippedCardsId.push(card.id);

        } else if (flippedCards.length === 1) {
            // input card value
            countMoves++;
            startGameMoves();
            flippedCards.push(card.dataset.id);
            flippedCardsId.push(card.id);
            if (flippedCards[0] === flippedCards[1]) {

                openedCards += 2;
                flippedCards = [];
                flippedCardsId = [];

                if (openedCards === imgArray.length) {
                    console.log('goodbye');
                    clearInterval(timer);
                    setTableStorage(inputChecked(fetchInputRadio));
                    setTimeout(() => {
                        let answer = confirm("Da li zelite novu igru?");
                        if (answer) {
                            location.reload();
                            // resetBoard();
                            // setTimeout(() => {
                            //     getBoard();
                            // }, 200);
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

let saveNameStorage = (name) => {
    let inputName = name.value;
    if (!inputName || inputName === "") {
        alert("Molimo vas unesite sve podatke");
    } else {
        let currentName = inputName;
        localStorage.setItem('currentUser', inputName);
        return localStorage.getItem('currentUser').toUpperCase();
    }
}

let getBoard = () => {
    getLevelValue(fetchInputRadio);
    let count = getLevelValue(fetchInputRadio) ** 2;
    pushImgArray(count);
    shuffleArray(imgArray);
    fetchGameTable.style.backgroundImage = "url('images/background.png')"; 
    fetchGameTable.style.border = '2px solid darkcyan';
    fetchGameTable.style.padding = '5px';
    fetchGameTable.style.margin = '0px auto';
    fetchGameTable.style.borderRadius = '30px';


    for (let i = 0; i < imgArray.length; i++) {

        let divCard = document.createElement('div');
        let imgFront = document.createElement('img');
        let imgBack = document.createElement('img');

        if (count === 16) {
            fetchGameTable.style.width = '60%';
            fetchGameTable.style.position = 'relative';
            divCard.style.width = '20%';
            divCard.style.height = '20%';
        } else if (count === 36) {
            fetchGameTable.style.width = '60%';
            fetchGameTable.style.position = 'relative';
            divCard.style.width = '14%';
            // divCard.style.height = 'auto';
        } else if (count === 64) {
            fetchGameTable.style.width = '70%';
            fetchGameTable.style.position = 'relative';
            divCard.style.width = '11%';
        } else {
            fetchGameTable.style.width = '70%';
            fetchGameTable.style.position = 'relative';
            divCard.style.width = '8.5%';
        }

        divCard.style.display = 'inline-block';
        divCard.style.position = 'relative';
        divCard.style.border = '3px solid darkcyan';
        divCard.style.borderRadius = '15px';
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
        // fetchGameTable.appendChild(bkGrImage);

        divCard.addEventListener('click', () => {
            startGameTimer();
            localStorage.setItem('currentUser', inputCreate.value);
        });

        imgBack.addEventListener('click', function () {
            checkCards(this);
        });
    }
}

let startGameMoves = () => {
    moves.innerHTML = `Moves: `;
    moves.style.color = 'cyan';
    moves.innerHTML += countMoves;
}
// Push number of images into array depending on which level ** 2
let pushImgArray = (count) => {
    for (let i = 1; i <= count / 2; i++) {
        for (let j = 1; j <= 2; j++) {
            imgArray.push(i);
        }
    }
}

/* Randomize array in-place using Durstenfeld shuffle algorithm */
let shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}
let resetBoard = () => {
    let allDivs = document.querySelectorAll('div');
    for (let i = 0; i < allDivs.length; i++) {
        if(allDivs[i].classList.contains('flipped')) {
            allDivs[i].classList.remove('flipped');
        }
    }
    clearInterval(timer);
    countTime = 0;
    time.style.color = 'cyan';
    time.style.fontSize = '20px';
    time.innerHTML = 'Time: ';
    moves.style.color = 'cyan';
    moves.style.fontSize = '20px';
    moves.innerHTML = 'Moves: '
    fetchGameTable.innerHTML = '';
    imgArray = [];
    openedCards = 0;
    timer = null;
    countMoves = 0;
}


let secToMin = (par) => {
    let mins = Math.floor(par / 60);
    let sec = par % 60;
    if (mins === 0) {
        return `${sec} sec`;
    } else {
        return `${mins} min : ${sec} sec`;
    }
}


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
            countTime++;
            time.style.color = 'cyan';
            time.style.borderRadius = '20px';
            time.innerHTML = 'Time: ';
            time.innerHTML += countTime;
        }, 1000);
    }
    return countTime;
}
// disable input field after submit
// called on form submit
function disableForm(boolean) {
    inputName.disabled = boolean;
    // btnSubmitName.disabled = boolean;
}
//////////////////////////////////////////////////////    FUNCTIONS   //////////////////////////////////////////////////////




//////////////////////////////////////////////////////    FUNCTION CALLS  //////////////////////////////////////////////////////
getLocalStorage(inputChecked(fetchInputRadio));

for (let i = 0; i < btnTable.length; i++) {
    btnTable[i].addEventListener('click', () => {
        getLocalStorage(btnTable[i].id);
        btnTable[i].classList.toggle('clicked');
        btnTable[i].classList.add('btn-outline-dark');
        if(btnTable[i].classList.contains('clicked')) {
            btnTable[i].classList.remove('btn-outline-dark');
            btnTable[i].classList.toggle('clicked');
        } 
    })
}
// window.onload = getBoard();
//////////////////////////////////////////////////////    FUNCTION CALLS  //////////////////////////////////////////////////////




//////////////////////////////////////////////////////    EVENT LISTENERS   //////////////////////////////////////////////////////

// event listener on enter
// replace original input field with new one
// created by fetching name from localStorage
form.addEventListener('submit', event => {
    // event.preventDefault();
    saveNameStorage(fetchInputName);
    if (fetchInputName.value === '' || fetchInputName.value === null) {
    } else {
        disableForm(true);
        resetBoard();
        startScreenWelcome();
    }

});


btnStartGame.addEventListener('click', () => {
    if (fetchInputName.value === '' || fetchInputName.value === null) {
        alert("Molimo vas unesite sve podatke");
    } else {
        resetBoard();
        let fetchInputName = document.getElementById('inputName');
        inputReplace();
        let createNode = document.createTextNode(`${saveNameStorage(fetchInputName)}`);
        inputCreate.value = createNode.data;
        form.removeChild(fetchInputName);
        form.appendChild(inputCreate);
        setTimeout(() => {
            getBoard();
        });
        setTimeout(() => {
            window.location.href = '#gridDiv';
        },500);
    }
});

//////////////////////////////////////////////////////    EVENT LISTENERS   //////////////////////////////////////////////////////


// Known bugs
// Fixed 1. Fix infinite array.length inside of localstorage
// Fixed 2. Fix footer
// Fixed 3. Fix input name replacing and uppercasing
// 4. Fix fetchGrid error on name change when game starts
// 5. Add reset button to the table to reset diff score 
