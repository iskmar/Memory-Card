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
let countTime = 0;
let countMoves = 0;
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
    countTime = 0;
    time.innerHTML = '0';
    fetchGameTable.innerHTML = '';
    imgArray = [];
    openedCards = 0;
    timer = null;
    countMoves = 0;
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
            // console.log(array[i].id);
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
            time.innerHTML = countTime;
        }, 1000);
    }
    return countTime;
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
            countMoves++;
            console.log(countMoves);
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

function setTableStorage(diff) {
    let currentPlayer = localStorage.getItem('currentUser');
    let player = {
        username: currentPlayer,
        time: countTime,
        difficulty: inputChecked(fetchInputRadio),
        moves: countMoves
    }
    // if (localStorage.getItem(`${diff}`) == inputChecked(fetchInputRadio)) {

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
    // }
}
let btnEasy = document.getElementById('easy');
let btnMiddle = document.getElementById('middle');
let btnHard = document.getElementById('hard');
let btnExpert = document.getElementById('expert');
let btnTable = document.querySelectorAll("button[name='tableButtons']");
for (let i = 0; i < btnTable.length; i++) {
    // console.log(btnTable[i]);
    btnTable[i].addEventListener('click', () => {
        // console.log(inputChecked(fetchInputRadio));
        // if(btnTable[i].id === inputChecked(fetchInputRadio)) {
            getLocalStorage(btnTable[i].id);
            // console.log(inputChecked(fetchInputRadio));
            // console.log(btnTable[i].id);
        // }
    })
}

function getLocalStorage(diff) {
    if(diff == null || diff == '') {
        return;
    } else {
    let tblBody = document.getElementById('tbody');
    tblBody.innerHTML = '';
    let countData = 0;
    let difficultyArray = JSON.parse(localStorage.getItem(`${diff}`));
    difficultyArray.sort(function(a, b){return a-b});
    difficultyArray.sort((a, b) => parseFloat(a.time) - parseFloat(b.time));
    let size = 5;
    difficultyArray.slice(0,size);
    console.log(difficultyArray);
    for (let i = 0; i < difficultyArray.length; i++) {
        countData++;
        let tblRow = document.createElement("tr");
        let username = difficultyArray[i].username;
        let time = difficultyArray[i].time;
        let td1 = document.createTextNode(`${countData}`);


            let tblData1 = document.createElement("td");
            let tblData2 = document.createElement("td");
            let tblData3 = document.createElement("td");
            let tblData4 = document.createElement("td");
            let td2 = document.createTextNode(`${username}`);
            let td3 = document.createTextNode(`${time}`);
            let td4 = document.createTextNode(`${countMoves}`);

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
getLocalStorage(inputChecked(fetchInputRadio));
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
/* <tbody>
//     <tr>
//         <th scope="row">1</th>
//         <td>Mark</td>
//         <td>Otto</td>
//         <td>@mdo</td>
//       </tr>
//       <tr>
//         <th scope="row">2</th>
//         <td>Jacob</td>
//         <td>Thornton</td>
//         <td>@fat</td>
//       </tr>
//       <tr>
//         <th scope="row">3</th>
//         <td colspan="2">Larry the Bird</td>
//         <td>@twitter</td>
//       </tr>
//   </tbody> */