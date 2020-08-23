// let divCreateResult = document.querySelector('result');
let fetchInputRadioName = document.querySelectorAll("input[type='radio']");
// let fetchInputName = document.getElementById('inputName');
let form = document.getElementById('form');
let fetchGameTable = document.getElementById('gameTable');


let getLevelValue = (array) => {
    for (let i = 0; i < array.length; i++) {
        if(array[i].checked){
            return Number(array[i].value);
        }
    }
};
let count = getLevelValue(fetchInputRadioName) ** 2;
console.log(count);
let imgArray = [];

// Push number of images into array depending on which level ** 2
for(let i = 1; i <= count / 2;i++) {
    for (let j = 1; j <= 2; j++) {
        imgArray.push(i);
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
shuffleArray(imgArray);
console.log(shuffleArray(imgArray));


// let imagesData = document.querySelectorAll('img#id');
// console.log(imagesHTML);
// for (let i = 0; i < imagesHTML.length; i++) {
//     console.log(imagesHTML[i]);
// }
// function matched(id) {
//     if(){
//         matchedCards.push()
//     }
// }

// let divContainer = document.createElement('div');
// divContainer.style.position = 'relative';
let tableCreate = document.createElement('table');
for (let i = 0; i <= imgArray.length - 1; i += getLevelValue(fetchInputRadioName)) {
    let createTableRow = document.createElement('tr');
    if (getLevelValue(fetchInputRadioName) === 4) {
        for (let j = i; j < i + 4; j++) {
            createTableData = document.createElement('td');
            divCreate = document.createElement('div');
            divCreate.style.position = 'relative';
            divCreate.style.display = 'inline-block';
            createImg = document.createElement('img');
            createImgClose = document.createElement('img');
            createImg.setAttribute('width', '100px');
            createImg.setAttribute('height', '100px');
            createImg.setAttribute('class','front');
            createImg.setAttribute('src', `images/${imgArray[j]}.png`);
            // createImg.style.cssFloat = 'left';
            // createImg.style.position = 'absolute';
            createImg.style.zIndex = '1';
            createImgClose.setAttribute('width', '100px');
            createImgClose.setAttribute('height', '100px');
            createImgClose.setAttribute('data-id', `${imgArray[j]}`);
            createImgClose.setAttribute('class', 'back');
            createImgClose.setAttribute('src','images/closedCard.png');
            // createImgClose.style.cssFloat = 'left';
            // createImgClose.style.position = 'absolute';
            createImgClose.style.zIndex = '0';
            // divCreate.appendChild(createImgClose);
            // divCreate.appendChild(createImg);

            divCreate.appendChild(createImgClose);
            divCreate.appendChild(createImg);
            createTableData.appendChild(divCreate);
            createTableRow.appendChild(createTableData);

        }
    }
    // else if (getLevelValue(fetchInputRadioName) === 6) {
    //     for (let j = i; j < i + 6; j++) {
    //         let createTableData = document.createElement('td');
    //         let createImg = document.createElement('img');
    //         let createImgClose = document.createElement('img');
    //         createImg.setAttribute('width', '100px');
    //         createImg.setAttribute('height', '100px');
    //         createImg.setAttribute('class','front');
    //         createImg.setAttribute('src', `images/${imgArray[j]}.png`);
    //         createImgClose.setAttribute('width', '100px');
    //         createImgClose.setAttribute('height', '100px');
    //         createImgClose.setAttribute('class', 'back');
    //         createImgClose.setAttribute('src','images/closedCard.png');
    //         createImgClose.style.zIndex = '1';
    //         createTableData.appendChild(createImgClose);
    //         createTableData.appendChild(createImg);
    //         createTableRow.appendChild(createTableData);
    //     }
    // } else if (getLevelValue(fetchInputRadioName) === 8) {
    //     for (let j = i; j < i + 8; j++) {
    //         let createTableData = document.createElement('td');
    //         let createImg = document.createElement('img');
    //         let createImgClose = document.createElement('img');
    //         createImg.setAttribute('width', '90px');
    //         createImg.setAttribute('height', '90px');
    //         createImg.setAttribute('class','front');
    //         createImg.setAttribute('src', `images/${imgArray[j]}.png`);
    //         createImgClose.setAttribute('width', '90px');
    //         createImgClose.setAttribute('height', '90px');
    //         createImgClose.setAttribute('class', 'back');
    //         createImgClose.setAttribute('src','images/closedCard.png');
    //         createTableData.appendChild(createImgClose);
    //         createTableData.appendChild(createImg);
    //         createTableRow.appendChild(createTableData);
    //     }
    // } else {
    //     for (let j = i; j < i + 10; j++) {
    //         let createTableData = document.createElement('td');
    //         let createImg = document.createElement('img');
    //         let createImgClose = document.createElement('img');
    //         createImg.setAttribute('width', '80px');
    //         createImg.setAttribute('height', '80px');
    //         createImg.setAttribute('class','front');
    //         createImg.setAttribute('src', `images/${imgArray[j]}.png`);
    //         createImgClose.setAttribute('width', '80px');
    //         createImgClose.setAttribute('height', '80px');
    //         createImgClose.setAttribute('class', 'back');
    //         createImgClose.setAttribute('src','images/closedCard.png');
    //         createTableData.appendChild(createImgClose);
    //         createTableData.appendChild(createImg);
    //         createTableRow.appendChild(createTableData);
    //     }
    // }

    // divContainer.appendChild(divCreate);
    tableCreate.append(createTableRow);
}
fetchGameTable.appendChild(tableCreate);


let inputCreate = document.createElement('input');
inputCreate.setAttribute('type','text');
inputCreate.setAttribute('id','inputName');
form.appendChild(inputCreate);

form.addEventListener('submit', event => {
    event.preventDefault();
    let fetchInputName = document.getElementById('inputName');
    let createNode = document.createTextNode(`${saveNameStorage(inputCreate)}`);
    fetchInputName.value = createNode.data;
    console.log(fetchInputName.value);
    form.removeChild(inputCreate);
    form.appendChild(fetchInputName);
});

function saveNameStorage(name) {
    let inputName = name.value;
    if(!inputName || inputName === "" ) {
        alert("Molimo vas unesite sve podatke");
    }
    else {
        localStorage.setItem('name', inputName);
        return localStorage.getItem('name');
        }
}


let imagesHTML = document.querySelectorAll('img');
// function flipCard() {
//     this.classList.toggle('flip');
//     console.log('i flipped it');
// }

    matchedCards = [];
    for (let i = 0; i < imagesHTML.length ; i++) {
        imagesHTML[i].addEventListener('click',event => {
            event.preventDefault();
            createImgClose.style.zIndex = '0';
            createImg.style.zIndex = '1';
            // flipCard();
            // imagesHTML[i].parentNode.removeChild(imagesHTML[i]);
            // imagesHTML[i].parentNode.replaceChild(createImg, imagesHTML[i]);
            // matchedCards.push(imagesHTML[i].dataset.id);
        // console.log(imagesHTML[i].dataset.id);
        console.log(matchedCards);
        })
    }
