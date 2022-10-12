const btnEqual = document.querySelector('.btnEqual');
const btnClear = document.querySelector('.btnClear');
const btnClearPreviousHistory = document.querySelector('.btnClearPreviousHistory');
const btnOperator = document.querySelectorAll('.btnOperator');
const btnNum = document.querySelectorAll('.btnNum');
const bigNumberDisplay = document.querySelector('.bigNumberDisplay');
const smallNumberDisplay = document.querySelector('.smallNumberDisplay');

let currentNumber = '';
let previousNumber = '';
let total = 0;

// when number click it Append Left_Number
function appendNumber(number) {
    return currentNumber += number;
}

// when operator btn click Append operator to Previous_number.
function appendOperator(operator) {
    return previousNumber += operator;
}


// update BIG DISPLAY function when number click ONLY Left_Number
function updateBigDisplay() {
     return bigNumberDisplay.innerText = currentNumber;
}

// update SMALL DISPLAY function when operator click
function updateSmallDisplay(operator) {
    const operatorArray = ['+', '-', 'x', '/', '%'];

    if (previousNumber !== '') {
        if (operatorArray.includes(previousNumber.slice(-1))) {
            previousNumber = previousNumber.slice(0 , previousNumber.length - 1);
            return smallNumberDisplay.innerText = appendOperator(operator);
        } else {
            return smallNumberDisplay.innerText = appendOperator(operator);
        }
    } else {
        return smallNumberDisplay.innerText = previousNumber;
    }
}

// when btn Number click it will display the Left_Number
btnNum.forEach(num);
function num(btn) {
    btn.addEventListener('click', function(e) {
     
        console.log(e.target.innerText);
        appendNumber(e.target.innerText);
        updateBigDisplay();
    }) 
}

// Clear Display Left_Number function 
function clearDisplay() {
    currentNumber = '';
    previousNumber = '';
    bigNumberDisplay.innerText = '';
    smallNumberDisplay.innerText = '';
}

// when AC btn click the display will clear the Left_Number
btnClear.addEventListener('click', function() {
    clearDisplay();
})

// when <=BACK btn click the display will clear one previous Left_Number digit 
btnClearPreviousHistory.addEventListener('click', function() {
     currentNumber = currentNumber.slice(0 , currentNumber.length - 1);
     updateBigDisplay();

     if (previousNumber !== '') {
        currentNumber = previousNumber.slice(0 , previousNumber.length - 1);
        previousNumber = '';
        updateBigDisplay();
     }

     updateSmallDisplay();
})

// Operator function
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

    smallNumberDisplay.innerText = appendOperator(operator + currentNumber);
 
    currentNumber = total.toString();
    total = 0;
}

// when btn operator click
btnOperator.forEach(function(btn) {
    btn.addEventListener('click', function(e) {
        console.log(e.target.innerText);
        if (previousNumber === '') {
            previousNumber = currentNumber;
            currentNumber = '';
        }
        updateBigDisplay();
        updateSmallDisplay(e.target.innerText);     
    })
});

// when = click calculate & display ANS on Big Display
btnEqual.addEventListener('click', function() {
    const operatorArray = ['+', '-', 'x', '/', '%'];

    if (operatorArray.includes(previousNumber.slice(-1)) && currentNumber !== '') {
        chooseOperator(previousNumber.slice(-1));
        updateBigDisplay();
    }
});


