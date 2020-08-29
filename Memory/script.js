

//////////////////////////////////////////////////////    DOMS / VARIABLES   //////////////////////////////////////////////////////

let fetchInputRadio = document.querySelectorAll("input[type='radio']");
let fetchInputName = document.getElementById('inputName');
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

// replace input name field with new one 
let inputReplace = () => {
    inputCreate.setAttribute('type', 'text');
    inputCreate.setAttribute('id', 'inputName');
    inputCreate.style.color = 'red';
    inputCreate.classList.add('col-12');
    inputCreate.classList.add('col-md-12');
    inputCreate.classList.add('text-center');
    return inputCreate;
}
let startScreenWelcome = () => {
    let fetchGrid = document.getElementById('welcome');
    let fetchP = document.getElementById('welcomeP');

    fetchGrid.innerHTML = '';
    // let p = document.createElement('p');
    // fetchP.style.filter = 'none';
    let name = localStorage.getItem('currentUser');
    fetchGrid.style.backgroundImage = "url('images/sky.jpg')"; 
    fetchGrid.style.borderRadius = '30px';
    fetchGrid.style.border = '1px solid darkcyan';
    fetchGrid.style.filter = "opacity(30%)";
    fetchGrid.style.padding = '5px';
    fetchGrid.style.width = '57vw';
    fetchGrid.style.height = '57vh';
    fetchGrid.style.margin = '0px auto';
    fetchGrid.style.display = 'flex';
    fetchGrid.style.verticalAlign = 'center';
    fetchP.style.zIndex = 9999;
    fetchP.innerHTML = `WELCOME <br>`;
    fetchP.innerHTML += `<span style="color: red; filter: opacity(100%);">${name.toUpperCase()}</span>`;
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
        difficultyArray.sort(function (a, b) { return a - b });
        difficultyArray.sort((a, b) => parseFloat(a.time) - parseFloat(b.time));
        let newArray = difficultyArray.slice(0, 5);

        for (let i = 0; i < newArray.length; i++) {
            countRows++;
            let tblRow = document.createElement("tr");
            let username = newArray[i].username;
            let time = newArray[i].time;
            let movesCount = newArray[i].moves;
            


            let tblData1 = document.createElement("td");
            let tblData2 = document.createElement("td");
            let tblData3 = document.createElement("td");
            let tblData4 = document.createElement("td");
            let td1 = document.createTextNode(`${countRows}`);
            let td2 = document.createTextNode(`${username}`);
            let td3 = document.createTextNode(`${secToMin(time)}`);
            let td4 = document.createTextNode(`${movesCount}`);
            tblData2.style.color = 'red';
            tblData3.style.color = 'green';
            tblData4.style.color = 'blue';

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

    let player = {
        username: currentPlayer,
        time: countTime,
        difficulty: inputChecked(fetchInputRadio),
        moves: countMoves
    }

    if (!localStorage.getItem(`${diff}`)) {
        playerStorageSet.push(player);
        localStorage.setItem(`${diff}`, JSON.stringify(playerStorageSet));
    } else {
        let getPlayers = JSON.parse(localStorage.getItem(`${diff}`));
        for (let i = 0; i < getPlayers.length; i++) {
            playerStorageSet.push(getPlayers[i]);
        }
        playerStorageSet.push(player);
        localStorage.setItem(`${diff}`, JSON.stringify(playerStorageSet));
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
                    // countMoves = 0;
                    console.log(countMoves);
                    clearInterval(timer);
                    setTableStorage(inputChecked(fetchInputRadio));
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

let saveNameStorage = (name) => {
    let inputName = name.value;
    if (!inputName || inputName === "") {
        alert("Molimo vas unesite sve podatke");
    } else {
        let currentName = inputName;
        localStorage.setItem('currentUser', inputName);
        return localStorage.getItem('currentUser');
    }
}

let getBoard = () => {
    getLevelValue(fetchInputRadio);
    let count = getLevelValue(fetchInputRadio) ** 2;
    pushImgArray(count);
    shuffleArray(imgArray);
    fetchGameTable.style.backgroundImage = "url('images/sky.jpg')"; 
    // let bkGrImage = document.createElement('img');
    // bkGrImage.style.filter = 'opacity(30%)';
    // bkGrImage.style.width = '100%';
    // bkGrImage.style.height = '100vh';
    // bkGrImage.setAttribute('src','images/sky.jpg');
    // fetchGameTable.style.filter = 'drop-shadow(16px 16px 20px red) invert(75%)';
    fetchGameTable.style.border = '1px solid darkcyan';
    fetchGameTable.style.padding = '5px';
    fetchGameTable.style.margin = '0px auto';
    fetchGameTable.style.borderRadius = '30px';


    for (let i = 0; i < imgArray.length; i++) {

        let divCard = document.createElement('div');
        let imgFront = document.createElement('img');
        let imgBack = document.createElement('img');

        if (count === 16) {
            fetchGameTable.style.width = '70%';
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
    moves.style.color = 'blue';
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
    clearInterval(timer);
    countTime = 0;
    time.style.color = 'green';
    time.innerHTML = 'Time: ';
    moves.style.color = 'blue';
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
            time.style.color = 'green';
            time.style.borderRadius = '20px';
            time.innerHTML = 'Time: ';
            time.innerHTML += countTime;
        }, 1000);
    }
    return countTime;
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
//////////////////////////////////////////////////////    FUNCTION CALLS  //////////////////////////////////////////////////////




//////////////////////////////////////////////////////    EVENT LISTENERS   //////////////////////////////////////////////////////



// event listener on enter
// replace original input field with new one
// created by fetching name from localStorage
form.addEventListener('submit', event => {
    event.preventDefault();
    saveNameStorage(fetchInputName);
    if (fetchInputName.value === '' || fetchInputName.value === null) {
    } else {
        let fetchInputName = document.getElementById('inputName');
        inputReplace();
        let createNode = document.createTextNode(`${saveNameStorage(fetchInputName)}`);
        inputCreate.value = createNode.data;
        form.removeChild(fetchInputName);
        form.appendChild(inputCreate);
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
        }, 200);
        // setTimeout(() => {
        //     window.location.href = '#gridDiv';
        // }, 500);
    }
});

//////////////////////////////////////////////////////    EVENT LISTENERS   //////////////////////////////////////////////////////


// Known bugs
// 1. Fix infinite array.length inside of localstorage
// 2. Fix footer
// 3. Fix input name replacing
// 4. Fix fetchGrid error on name change when game starts
