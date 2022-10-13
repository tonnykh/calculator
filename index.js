const btnNum = document.querySelectorAll('.btnNum');
const btnEqual = document.querySelector('.btnEqual');
const btnClear = document.querySelector('.btnClear');
const largeInput = document.querySelector('.largeInput');
const smallInput = document.querySelector('.smallInput');
const btnOperator = document.querySelectorAll('.btnOperator');
const btnClearPreviousHistory = document.querySelector('.btnClearPreviousHistory');

const operatorArray = ['+', '-', 'x', '/'];
let currentNumber = '';
let previousNumber = '';
let total = 0;

function appendNumber(number) {
    return currentNumber += number;
}

function appendOperator(operator) {
    return previousNumber += operator;
}

function updateBigDisplay() {
     return largeInput.value = currentNumber;
}

function updateSmallDisplay(operator) {
    if (previousNumber !== '' && currentNumber === '') {
        if (operatorArray.includes(previousNumber.slice(-1))) {
            previousNumber = previousNumber.slice(0 , previousNumber.length - 1);
            smallInput.value = appendOperator(operator);
        } else {
            smallInput.value = appendOperator(operator);
        }
    } else {
        smallInput.value = previousNumber;   
    }
}


btnNum.forEach(num);
function num(btn) {
    btn.addEventListener('click', function(e) {

        console.log(e.target.innerText);
        appendNumber(e.target.innerText);
        updateBigDisplay();

        if (operatorArray.includes(previousNumber.slice(-1)) === false && previousNumber !== '') {
            previousNumber = '';
            updateSmallDisplay();
        }
    }) 
}


function clearDisplay() {
    currentNumber = '';
    previousNumber = '';
    largeInput.value = '';
    smallInput.value = '';
}

btnClear.addEventListener('click', function() {
    clearDisplay();
})


btnClearPreviousHistory.addEventListener('click', function() {     
    if (previousNumber === '') {
        currentNumber = currentNumber.slice(0 , currentNumber.length - 1);
        updateBigDisplay();

    } else if (currentNumber === '') {
        currentNumber = previousNumber.slice(0 , previousNumber.length - 1);
        previousNumber = '';
        updateBigDisplay();
        updateSmallDisplay();

    } else if (currentNumber !== '' && previousNumber !== '') {
        currentNumber = currentNumber.slice(0 , currentNumber.length - 1);
        updateBigDisplay();

        if (operatorArray.includes(previousNumber.slice(-1)) === false) {
            previousNumber = '';
            updateSmallDisplay();
        }
    }
})


function chooseOperator(operator) {
    if (currentNumber === '') {
        return;
    }
    previousNumber = parseInt(previousNumber.slice(0 , previousNumber.length - 1));
    currentNumber = parseInt(currentNumber);

    switch(operator) {
        case '+':
            total = previousNumber + currentNumber;
            break;
        case '-':
            total = previousNumber - currentNumber;
            break;
        case 'x':
            total = previousNumber * currentNumber;
            break;
        case '/':
            total = previousNumber / currentNumber;
            break;
    }
    currentNumber = currentNumber.toString();
}


btnOperator.forEach(function(btn) {
    btn.addEventListener('click', function(e) {
        console.log(e.target.innerText);
        if (previousNumber === '') {
            previousNumber = currentNumber;
            currentNumber = '';
            updateBigDisplay();
            updateSmallDisplay(e.target.innerText);   

        } else if (currentNumber === '') {
            updateSmallDisplay(e.target.innerText);

        } else if (currentNumber !== '' && previousNumber !== '') {
            chooseOperator(previousNumber.slice(-1));
            previousNumber = total + e.target.innerText;
            updateSmallDisplay()
            currentNumber = '';
            updateBigDisplay();
        }
    })
});

btnEqual.addEventListener('click', function() {
    if (operatorArray.includes(previousNumber.slice(-1)) && currentNumber !== '') {
        let operator = previousNumber.slice(-1);
        chooseOperator(operator);
        smallInput.value = appendOperator(operator + currentNumber);
        currentNumber = total.toString();
        updateBigDisplay();        
    }
});