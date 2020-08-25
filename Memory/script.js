let fetchInputRadio = document.querySelectorAll("input[type='radio']");
let form = document.getElementById('form');

let getLevelValue = (array) => {
    for (let i = 0; i < array.length; i++) {
        if(array[i].checked){
            return Number(array[i].value);
        }
    }
};

let count = getLevelValue(fetchInputRadio) ** 2;
console.log(count);
let imgArray = [];

// Push number of images into array depending on which level ** 2
for(let i = 1; i <= count / 2;i++) {
    for (let j = 1; j <= 2; j++) {
        imgArray.push(i);
    }
}

console.log(imgArray);
// Randomize array
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}
shuffleArray(imgArray);
console.log(imgArray);

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
    // divRow.style.position = 'relative';

    if (getLevelValue(fetchInputRadio) === 4) {
        for (let j = i; j < i + 4; j++) {
            fetchGameTable.style.width = '50%';
            let divContainer = document.createElement('div');
            let divCard = document.createElement('div');
            let imgFront = document.createElement('img');
            let imgBack = document.createElement('img');
            let divFront = document.createElement('div');
            let divBack = document.createElement('div');

            divContainer.style.padding = '5px';
            divContainer.classList.add('divContainer');
            divContainer.classList.add('col-sm-3');
            divContainer.classList.add('justify-content-around');
            divContainer.style.width = '100%';
            divContainer.style.height = 'auto';
            divContainer.style.position = 'relative';

            divCard.classList.add('divCard');
            divCard.setAttribute('data-id',`data${imgArray[j]}`);            

            imgFront.style.borderRadius = '25px';
            imgFront.style.border = '1px solid #d7f5fc';
            imgFront.style.width = '100%';
            imgFront.style.height = 'auto';
            imgFront.setAttribute('class','front');
            imgFront.setAttribute('data-id',`card${imgArray[j]}`);
            imgFront.setAttribute('src', `images/${imgArray[j]}.png`);

            imgBack.style.borderRadius = '25px';
            imgBack.style.border = '1px solid #d7f5fc';
            imgBack.style.width = '100%';
            imgBack.style.height = 'auto';
            imgBack.setAttribute('class','back');
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
                let count = 0;
                let array = [];

            })

            // divRow -> divContainer -> divCard -> img img

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
            divCard.setAttribute('data-id',`data${imgArray[j]}`);            

            imgFront.style.borderRadius = '25px';
            imgFront.style.border = '1px solid #d7f5fc';
            imgFront.style.width = '100%';
            imgFront.style.height = 'auto';
            imgFront.setAttribute('class','front');
            imgFront.setAttribute('data-id',`card${imgArray[j]}`);
            imgFront.setAttribute('src', `images/${imgArray[j]}.png`);

            imgBack.style.borderRadius = '25px';
            imgBack.style.border = '1px solid #d7f5fc';
            imgBack.style.width = '100%';
            imgBack.style.height = 'auto';
            imgBack.setAttribute('class','back');
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
                let count = 0;
                let array = [];

            })

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
            divCard.setAttribute('data-id',`data${imgArray[j]}`);            

            imgFront.style.borderRadius = '10px';
            imgFront.style.border = '1px solid #d7f5fc';
            imgFront.style.width = '100%';
            imgFront.style.height = 'auto';
            imgFront.setAttribute('class','front');
            imgFront.setAttribute('data-id',`card${imgArray[j]}`);
            imgFront.setAttribute('src', `images/${imgArray[j]}.png`);

            imgBack.style.borderRadius = '15px';
            imgBack.style.border = '1px solid #d7f5fc';
            imgBack.style.width = '100%';
            imgBack.style.height = 'auto';
            imgBack.setAttribute('class','back');
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
                let count = 0;
                let array = [];

            })
        }
    } else {
        for (let j = i; j < i + 10; j++) {
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
            divCard.setAttribute('data-id',`data${imgArray[j]}`);            

            imgFront.style.borderRadius = '15px';
            imgFront.style.border = '1px solid #d7f5fc';
            imgFront.style.width = '100%';
            imgFront.style.height = 'auto';
            imgFront.style.position = 'relative';
            imgFront.style.zIndex = '0';
            imgFront.setAttribute('class','front');
            imgFront.setAttribute('data-id',`card${imgArray[j]}`);
            imgFront.setAttribute('src', `images/${imgArray[j]}.png`);

            imgBack.style.borderRadius = '15px';
            imgBack.style.border = '1px solid #d7f5fc';
            imgBack.style.width = '100%';
            imgBack.style.position = 'relative';
            imgBack.style.height = 'auto';
            imgBack.style.zIndex = '1';
            imgBack.setAttribute('class','back');
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
                imgFront.style.zIndex = 1;
                let count = 0;
                let array = [];

            })
        }
    }
    fetchGameTable.appendChild(divRow);

}

// Create input name and store it in local storage
// once stored  call a function to retrieve currentName
// and replace input with newly made input
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

